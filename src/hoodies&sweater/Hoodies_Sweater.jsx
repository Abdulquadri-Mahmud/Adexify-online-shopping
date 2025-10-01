import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaCartShopping, FaNairaSign } from 'react-icons/fa6';
import { IoHeart } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Box, Button, Flex, Image, Spinner, Text, useToast, VStack } from '@chakra-ui/react';
import { Hoodies_Sweater_Context } from '../pages/clothing_page/Men_Clothing_page';
import {motion} from 'framer-motion';
import { addToCart } from '../store/cart/cartSlice';
import { setCartCount } from '../store/cart/cartActions';
import { addToWishlist, clearWishlistError } from '../store/cart/wishlistSlice';
import { setWishlistCount } from '../store/cart/wishlishActions';
import { useCart } from '../pages/cartsPage/CartCountContext';
import { getCartToken } from '../store/cart/utils/cartToken';

const MotionButton = motion.create(Button);

export default function Hoodies_Sweater() {
    const product = useContext(Hoodies_Sweater_Context);
    const dispatch = useDispatch();
    const toast = useToast();
        
    const [loadingProductId, setLoadingProductId] = useState(null);
    const [loadingWishlistProductId, setLoadingWishlistProductId] = useState(null);
    const { currentUser } = useSelector((state) => state.user);
    const guestWishlist = useSelector((state) => state.guestWishlist);
    const { updateCart } = useCart();

    const handleCart = async (product, size, qty) => {
      setLoadingProductId(product._id);
  
      const cartItem = {
        productId: product._id,
        name: product.name,
        stock: product.stock || 0,
        price: product.price,
        discount: product.discount || 0,
        oldprice: product.oldprice || 0,
        deal: product.deal || "",
        category: product.category || "",
        image: product.image || [],
        description: product.description || "",
        discountType: product.discountType || "",
        trackingId: product.trackingId || "",
        size: product.size || [],
        selectedSize: size || product.size?.[0] || "",
        quantity: qty || 1,
        gender: product.gender || "unisex",
      };
  
      try {
        const payload = {
          userId: currentUser?._id || null,
          cartToken: currentUser?._id ? null : getCartToken(),
          product: cartItem,
        };
  
        const res = await fetch("https://adexify-api.vercel.app/api/cart/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
  
        const data = await res.json();
  
        if (res.ok && data.success) {
          updateCart(data.cart); //instantly updates count everywhere
          // ✅ Backend already merges or increments item if exists
          toast({
            title: "Success",
            description: "Item added to cart.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        } else {
          if (data.message?.includes("already")) {
            toast({
              title: "Notice",
              description: "Item already in cart.",
              status: "info",
              duration: 2000,
              isClosable: true,
            });
          } else {
            throw new Error(data.message);
          }
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoadingProductId(null);
      }
    };
    
    // Handle Add to Wishlist
    const handleWishlistItem = async (product) => {
        setLoadingWishlistProductId(product._id);
    
        const wishlistItem = {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image || [],
          category: product.category || '',
          brand: product.brand || '',
          gender: product.gender || '',
          description: product.description || '',
        };
    
        try {
          // =======================
          // Guest Wishlist
          // =======================
          if (!currentUser?._id) {
            dispatch(addToWishlist(wishlistItem));
            const count = guestWishlist.items.length;
            dispatch(setWishlistCount(count));
    
            if (guestWishlist.error) {
              toast({
                title: "Error",
                description: guestWishlist.error,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
              dispatch(clearWishlistError());
            } else {
              toast({
                title: "Added to wishlist!",
                description: "Item saved locally. Log in to save permanently.",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            }
            return;
          }
    
          // =======================
          // Logged-in Wishlist
          // =======================
          // 1. Merge guest wishlist if exists
          if (guestWishlist.items.length > 0) {
            const res = await fetch("https://adexify-api.vercel.app/api/wishlist/merge", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userId: currentUser._id, products: guestWishlist.items }),
            });
    
            const data = await res.json();
            if (!res.ok || data.success === false) {
              toast({
                title: "Error",
                description: data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
              return;
            }
    
            dispatch(clearWishlist()); // clear guest wishlist after merging
          }
    
          // 2. Add current product to DB wishlist
          const payload = { userId: currentUser._id, product: wishlistItem };
    
          const res = await fetch('https://adexify-api.vercel.app/api/wishlist/add-to-wishlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
    
          const data = await res.json();
    
          if (res.ok && data.success === true) {
            toast({
              title: 'Added to wishlist!',
              description: 'Item saved successfully.',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
    
            // Refresh wishlist count
            const wishlistRes = await fetch('https://adexify-api.vercel.app/api/wishlist/get-wishlist', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId: currentUser._id }),
            });
    
            const wishlistData = await wishlistRes.json();
            if (wishlistRes.ok && wishlistData.success === true) {
              const count = wishlistData.wishlist?.products?.length || 0;
              dispatch(setWishlistCount(count));
            }
          } else {
            throw new Error(data.message || 'Failed to add to wishlist');
          }
    
        } catch (error) {
          toast({
            title: 'Error',
            description: error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } finally {
          setLoadingWishlistProductId(null);
        }
    };
    
    return (
      <Box key={product._id} position="relative" borderWidth="1px" borderRadius="xl" p={1} bg="white">
        <VStack spacing={2} m={1} align="stretch">
            {/* <Link to={'/'} className='absolute top-0 left-0 bg-pink-200 md:px-2 md:py-0 px-1 py-1 rounded-br-md rounded-tl-md flex items-center gap-2'>
                <Image src='/Logo.png' alt='logo' w={{md:'80px', base:'65px'}}/>
            </Link> */}

            <Link to={`/product-details/${product?._id}`}>
                <Image mx="auto" src={product?.image?.[0] || "https://via.placeholder.com/150"} alt={product?.name} height={'200px'} width={'full'} objectFit="cover" borderRadius="md"/>
            </Link>

            {loadingWishlistProductId === product._id ? (
                <Flex justifyContent='center' alignItems='center' bg={'pink.600'} rounded={'full'} className="absolute top-2 right-2 w-[30px] h-[30px]">
                    <Spinner color="gray.50" size="sm" mr={2} />
                </Flex>
                ) : (
                <button onClick={() => handleWishlistItem(product)} className="absolute top-2 right-2 w-[30px] h-[30px] bg-gray-200 flex justify-center items-center rounded-full">
                    <IoHeart className="text-xl text-white hover:text-gray-600" />
                </button>
            )}

            <Box>
                <Text fontWeight="500" fontSize={'sm'} isTruncated>{product.name}</Text>
                <Badge bg="gray.200" fontSize="10px" my={'2'} p={1} px={2} color="gray.800">
                    {product.category}
                </Badge>
                {product.oldprice && (
                  <Box bg={'white'} pos={'absolute'} left={2} top={2} fontSize="xs" px={2} py={1} roundedRight="full" w={'60px'} color="pink.500" fontWeight="medium" display="flex" alignItems="center">
                      {((product.oldprice - product.price) / product.oldprice * 100).toFixed(2)}%
                  </Box>
                )}
                <Flex justifyContent={'space-between'} alignItems={'center'} mt={1}>
                  <Text display="flex" fontSize={'sm'} alignItems="center">
                      <FaNairaSign />
                      <span className="font-medium">{product.price.toLocaleString()}.00</span>
                  </Text>

                  {product.oldprice && (
                      <Text fontSize="12px" color="gray.400" textDecoration="line-through">
                          <FaNairaSign className="inline-block text-[10px]" />{product.oldprice}
                      </Text>
                  )}
                </Flex>

            <MotionButton
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 1 }}
                animate={{ opacity: loadingProductId === product._id ? 0.7 : 1 }}
                transition={{ duration: 0.2 }}
                disabled={loadingProductId === product._id}
                _hover={{ bg: 'pink.600', color: 'white' }}
                onClick={() => handleCart(product)}
                w="full"
                mt={3}
                border={'1px solid'}
                bg={'pink.500'}
                color="white">
                {loadingProductId === product._id ? (
                    <>
                    <Spinner size="sm" mr={2} /> Adding...
                    </>
                ) : (
                    'Add to Cart'
                )}
            </MotionButton>
        </Box>
    </VStack>
</Box>
  )
}
