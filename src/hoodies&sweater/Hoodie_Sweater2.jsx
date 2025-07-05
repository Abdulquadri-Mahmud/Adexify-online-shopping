import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaCartShopping, FaNairaSign } from 'react-icons/fa6';
import { IoHeart } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Box, Button, Flex, Image, Text, useToast, VStack } from '@chakra-ui/react';
// import { addToCart } from '../store/cart/cartsReucer';
import { addWishlist } from '../store/wishlists/Wishlists';
import { Hoodie_Sweater2_Context } from '../pages/clothing_page/Women_Clothing_page';

export default function Hoodie_Sweater2() {
    const product = useContext(Hoodie_Sweater2_Context);
    const dispatch = useDispatch();
    const toast = useToast();
    
    // Handle Add to Cart
    const handleCart = (product) => {
        dispatch(
            addToCart({
            productID: product._id,
            productName: product.name,
            productImage: product.image?.[0],
            productPrice: product.price,
            items: {},
            })
        );
        toast({
            title: 'Added to cart!',
            description: 'Your selection has been added successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    // Handle Add to Wishlist
    const handleWishlistItem = (product) => {
        dispatch(
            addWishlist({
            productID: product._id,
            productName: product.name,
            productImage: product.image?.[0],
            productPrice: product.price,
            quantity: 1,
            })
        );
        toast({
            title: 'Added to wishlist.',
            description: 'Your selection has been added successfully.',
            status: 'info',
            duration: 3000,
            isClosable: true,
        });
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
    <Box px={1}>
        <Box borderWidth="1px" borderRadius="xl" className="bg-white p-2 rounded-xl shadow-md relative">
        <VStack spacing={2} align="stretch">
            <Link to={`/product-details/${product._id}`}>
                <Image mx="auto" src={product.image?.[0] || 'https://via.placeholder.com/150'} alt={product.name} width={'100%'} objectFit="cover" borderRadius="md"/>
            </Link>

            <button onClick={() => handleWishlistItem(product)} className="absolute top-2 right-2 w-[30px] h-[30px] bg-gray-200 flex justify-center items-center rounded-full">
            <IoHeart className="text-xl text-white hover:text-gray-600" />
            </button>

            <Box>
                <Text fontWeight="500" isTruncated>
                    {product.name}
                </Text>
                <Badge bg="gray.200" fontSize="10px" p={1} px={2} color="gray.800">
                    {product.category}
                </Badge>
                <Text my={2} fontSize="sm" color="gray.600" isTruncated>
                    {product.description}
                </Text>

                <Flex justifyContent={'space-between'}>
                    <Text display="flex" alignItems="center">
                    <FaNairaSign />
                    <span className="font-medium">{product.price.toLocaleString()}.00</span>
                    </Text>
        
                    {product.oldprice && (
                    <Text fontSize="sm" color="gray.400" textDecoration="line-through">
                        <FaNairaSign className="inline-block text-sm" />
                        {product.oldprice}
                    </Text>
                    )}
                </Flex>

                <Button _hover={{ bg: 'pink.800' }} onClick={() => handleCart(product)} w="full" mt={3} bg="pink.500" color="white">
                    Add To Cart
                </Button>
            </Box>
        </VStack>
        </Box>
    </Box>
  )
}
