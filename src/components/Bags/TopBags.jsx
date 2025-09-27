import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaNairaSign } from 'react-icons/fa6';
import { IoHeart } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Box, Button, Flex, Image, Spinner, Text, useToast, VStack } from '@chakra-ui/react';
import { TopBags_Context } from '../../pages/clothing_page/Women_Clothing_page';

import { setWishlistCount } from '../../store/cart/wishlishActions';
import { setCartCount } from '../../store/cart/cartActions';

import {motion} from 'framer-motion';
import { addToCart, clearError } from '../../store/cart/cartSlice';
import { addToWishlist, clearWishlist, clearWishlistError } from '../../store/cart/wishlistSlice';

const MotionButton = motion.create(Button);

export default function TopBags() {
    const product = useContext(TopBags_Context);
  
    const toast = useToast();
    const dispatch = useDispatch();
    
    const [loadingProductId, setLoadingProductId] = useState(null);
    const [loadingWishlistProductId, setLoadingWishlistProductId] = useState(null);
    const { currentUser } = useSelector((state) => state.user);
    const guestCart = useSelector((state) => state.guestCart);
    const error = useSelector((state) => state.guestCart.error);
    const guestWishlist = useSelector((state) => state.guestWishlist);

    console.log(guestWishlist);
    
    useEffect(() => {
        dispatch(setCartCount(guestCart.items.length));
    }, [guestCart.items, dispatch]);

    const handleCart = async (product) => {
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
            selectedSize: product.size?.[0] || "",
            quantity: 1,
            gender: product.gender || "unisex",
            brand: product.brand || "",
        };

        try {
            if (!currentUser?._id) {
                // =======================
                // Guest Cart (Redux/localStorage)
                // =======================
                dispatch(addToCart(cartItem));
                const count = guestCart.items.length;
    
                dispatch(setCartCount(count));
                
                if (error) {
                    toast({
                        title: "Error",
                        description: error,
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                    
                    // reset error for next action
                    dispatch(clearError());
                } else {
                    toast({
                        title: "Added to cart!",
                        description: "Item added locally. Log in to save permanently.",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                    // dispatch(clearError());
                }
            } else {
                
            // =======================
            // Logged-in Cart
            // =======================

            // 1. If guest cart exists, merge first

            if (guestCart.length > 0) {
                    const res = await fetch("https://adexify-api.vercel.app/api/cart/merge", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: currentUser._id, products: guestCart }),
                });

                if (!res || data.success === false) {
                    toast({
                        title: "Error",
                        description: data.message,
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                    return;
                };

                dispatch(setCartCount(count));

                dispatch(clearCart()); // clear guest cart after merging
            }

            // 2. Add current product to DB cart
            const payload = { userId: currentUser._id, product: cartItem };

            const res = await fetch("https://adexify-api.vercel.app/api/cart/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok && data.success === true) {
                toast({
                    title: "Added to cart!",
                    description: "Item added successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

                // Refresh backend cart count
                const cartRes = await fetch(
                "https://adexify-api.vercel.app/api/cart/get-user-cart",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: currentUser._id }),
                }
                );

                const cartData = await cartRes.json();
                if (cartRes.ok && cartData.success === true) {
                    const count = cartData.cart?.products?.length || 0;
                    dispatch(setCartCount(count));
                }
            } else {
                throw new Error(data.message || "Failed to add to cart");
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
        <Box key={product._id} position="relative" borderWidth="1px" borderRadius="xl" p={2} bg="white">
            <VStack spacing={2} m={1} align="stretch">
                <Link to={`/product-details/${product?._id}`}>
                    <Image mx="auto" src={product?.image?.[0] || "https://via.placeholder.com/150"} alt={product.name} height={'150px'} width={'full'} objectFit="cover" borderRadius="md"/>
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
                <Text fontWeight="500" isTruncated>{product.name}</Text>
                <Badge bg="gray.200" fontSize="10px" p={1} px={2} color="gray.800">
                    {product.category}
                </Badge>
                <Text fontSize="sm" color="gray.600" isTruncated>
                    {product.description}
                </Text>

                <Flex justifyContent={'space-between'} alignItems={'center'}>
                    <Text display="flex" alignItems="center">
                        <FaNairaSign />
                        <span className="font-medium">{product.price.toLocaleString()}.00</span>
                    </Text>

                    {product.oldprice && (
                        <Text fontSize="sm" color="gray.400" textDecoration="line-through">
                            <FaNairaSign className="inline-block text-sm" />{product.oldprice}
                        </Text>
                    )}
                </Flex>

                <MotionButton
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: loadingProductId === product._id ? 0.7 : 1 }}
                    transition={{ duration: 0.2 }}
                    disabled={loadingProductId === product._id}
                    _hover={{ bg: 'pink.800' }}
                    onClick={() => handleCart(product)}
                    w="full"
                    mt={3}
                    bg="pink.500"
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
