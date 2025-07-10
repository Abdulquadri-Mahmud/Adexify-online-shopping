import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaCartShopping, FaNairaSign } from 'react-icons/fa6';
import { IoHeart } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Box, Button, Flex, Image, Spinner, Text, useToast, VStack } from '@chakra-ui/react';
// import { addToCart } from '../store/cart/cartsReucer';
import { addWishlist } from '../store/wishlists/Wishlists';
import { Hoodie_Sweater2_Context } from '../pages/clothing_page/Women_Clothing_page';
import { setCartCount } from '../store/cart/cartActions';

import {motion} from 'framer-motion';

const MotionButton = motion.create(Button);

export default function Hoodie_Sweater2() {
    const product = useContext(Hoodie_Sweater2_Context);
    const dispatch = useDispatch();
    const toast = useToast();
        
    const [loadingProductId, setLoadingProductId] = useState(null);
    const [loadingWishlistProductId, setLoadingWishlistProductId] = useState(null);
    const { currentUser } = useSelector((state) => state.user);
    
    // =====================
    // Handle Add to Cart
    // =====================
    const handleCart = async (product) => {
        // Show loading only for the current product
        setLoadingProductId(product._id);
    
        // Construct the payload to send to the backend
        const payload = {
        userId: currentUser._id || '',
        product: {
            productId: product._id,
            name: product.name,
            stock: product.stock || 0,
            price: product.price,
            discount: product.discount || 0,
            oldprice: product.oldprice || 0,
            deal: product.deal || '',
            category: product.category || '',
            image: product.image || [],
            description: product.description || '',
            discountType: product.discountType || '',
            trackingId: product.trackingId || '',
            size: product.size || [],
            selectedSize: product.size?.[0] || '', // Default to first size if any
            quantity: 1, // Quantity is always 1 (no quantity selection logic anymore)
            gender: product.gender || 'unisex',
            brand: product.brand || '',
        },
        };
    
        try {
        // Send the product to backend to add to user's cart
        const res = await fetch('https://adexify-api.vercel.app/api/cart/add', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
    
        const data = await res.json();
    
        // If item added successfully
        if (res.ok && data.success === true) {
            toast({
            title: 'Added to cart!',
            description: 'Item added successfully.', 
            status: 'success',
            duration: 3000,
            isClosable: true,
            });
    
            // Fetch updated cart from backend to get latest product count
            const cartRes = await fetch('https://adexify-api.vercel.app/api/cart/get-user-cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: currentUser._id }),
            });
    
            const cartData = await cartRes.json();
    
            if (cartRes.ok && cartData.success === true) {
            // Get the count of products in the cart
            const count = cartData.cart?.products?.length || 0;
    
            // Dispatch count to Redux so header badge can update immediately
            dispatch(setCartCount(count));
            }
        } else {
            // If adding to cart failed
            throw new Error(data.message || 'Failed to add to cart');
        }
        } catch (error) {
        // Handle network or server error
        toast({
            title: 'Error',
            description: error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
        } finally {
        //Stop loading state for this product
        setLoadingProductId(null);
        }
    };
    
    // Handle Add to Wishlist
    const handleWishlistItem = async (product) => {
    // Show loading for this product (optional, but consistent with cart)
    setLoadingWishlistProductId(product._id);
    
    // Construct payload
    const payload = {
        userId: currentUser._id,
        product: {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image || [],
        category: product.category || '',
        brand: product.brand || '',
        gender: product.gender || '',
        description: product.description || '',
        },
    };
    
    try {
        // Send product to backend
        const res = await fetch('https://adexify-api.vercel.app/api/wishlist/add-to-wishlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        });
    
        const data = await res.json();
    
        if (res.ok && data.success === true) {
        toast({
            title: 'Added to wishlist!',
            description: 'Item saved to your wishlist.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    
        // Fetch updated wishlist to get count
        const wishlistRes = await fetch('https://adexify-api.vercel.app/api/wishlist/get-wishlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: currentUser._id }),
        });
    
        const wishlistData = await wishlistRes.json();
    
        console.log('Wishlist Data:', wishlistData);
    
        if (wishlistRes.ok && wishlistData.success === true) {
            const count = wishlistData.wishlist?.products?.length || 0;
            console.log("Wishlist count:", count); // ✅ DEBUG
            dispatch(setWishlistCount(count)); // Send to Redux
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
        setLoadingWishlistProductId(null); // Stop loading
    }
    };
    
    // Fix focus inside aria-hidden slick slides (react-slick)
    useEffect(() => {
        const interval = setInterval(() => {
        const hiddenSlides = document.querySelectorAll('[aria-hidden="true"]');
        hiddenSlides.forEach((slide) => {
            slide.querySelectorAll('a, button, input, [tabindex]').forEach((el) => {
            el.setAttribute('tabindex', '-1');
            });
        });
    
        const visibleSlides = document.querySelectorAll('[aria-hidden="false"]');
        visibleSlides.forEach((slide) => {
            slide.querySelectorAll('[tabindex="-1"]').forEach((el) => {
            el.removeAttribute('tabindex');
            });
        });
        }, 300); // Check frequently in case carousel slides
    
        return () => clearInterval(interval);
    }, []);
    
    return (
        <Box key={product._id} position="relative" borderWidth="1px" borderRadius="xl" p={2} bg="white">
        <VStack spacing={2} m={1} align="stretch">
        <Link to={`/product-details/${product?._id}`}>
            <Image mx="auto" src={product.image?.[0] || "https://via.placeholder.com/150"} alt={product.name} height={'200px'} width={'full'} objectFit="cover" borderRadius="md"/>
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

            <Text display="flex" alignItems="center">
            <FaNairaSign />
            <span className="font-medium">{product.price.toLocaleString()}.00</span>
            </Text>

            {product.oldprice && (
            <Text fontSize="sm" color="gray.400" textDecoration="line-through">
                <FaNairaSign className="inline-block text-sm" />{product.oldprice}
            </Text>
            )}

            {/* <MotionButton
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
            </MotionButton> */}

        </Box>
        </VStack>
    </Box>
  )
}
