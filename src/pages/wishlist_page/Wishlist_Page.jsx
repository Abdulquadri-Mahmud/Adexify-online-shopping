import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { PiGreaterThan } from 'react-icons/pi';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { FaNairaSign } from 'react-icons/fa6';
import { MdDelete, MdShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/footer/Footer';
import { addToCart } from '../../store/cart/cartsReucer';
import { deleteWishlist } from '../../store/wishlists/Wishlists';

export default function Wishlist_Page() {
  const { wishlists } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  // Handle Add to Cart
  const handleCart = (product) => {
    dispatch(
      addToCart({
        productID: product.productID || product._id,
        productName: product.productName || product.name,
        productImage: product.productImage || product.image?.[0],
        productPrice: product.productPrice || product.price,
        items: {},
      })
    );
    toast({
      title: 'Added to cart!',
      description: 'Product added successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleRemoveItem = (id) => {
    dispatch(deleteWishlist({ productID: id }));
  };

  return (
    <Box>
      <Header />

      <Box pb={10} pt={7} bg="gray.100">
        {/* Breadcrumb */}
        <Box maxW="90%" mx="auto" py={2} bg="white" px={6} rounded="md">
          <Flex align="center" gap={1}>
            <Link to="/" className="text-[13px]">Home</Link>
            <PiGreaterThan className="text-[13px] pt-1 text-gray.500" />
            <Text fontSize="13px" color="gray.500">Wishlist</Text>
          </Flex>
        </Box>

        {/* Wishlist Heading */}
        <Box bg="white" py={3} px={2} rounded="md" maxW="90%" mx="auto" mt={4}>
          <Heading fontSize={{ md: 30, base: 25 }} fontWeight={500} color="black">
            Your Wishlist
          </Heading>
          <Box mt={4} width="200px" py={1} rounded="md" border="1px solid" borderColor="gray.300">
            <Link to="/fashion" className="flex items-center justify-center gap-2 text-sm">
              <BiLeftArrowAlt /> Continue Shopping
            </Link>
          </Box>
        </Box>

        {/* Wishlist Items */}
        <Box maxW="90%" mx="auto" mt={6}>
          <Box bg="white" p={4} rounded="md">
            {wishlists.length === 0 ? (
              <Box textAlign="center" py={10}>
                <Text color="gray.500" fontSize="lg">
                  Your wishlist is empty.
                </Text>
                <Button mt={4} bg="pink.600" color="white" _hover={{ bg: 'pink.800' }} onClick={() => navigate('/fashion')}>
                  Go to Shop
                </Button>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={3}>
                {wishlists.map((item, index) => (
                  <Box key={index} bg="gray.50" border="1px solid" borderColor="gray.200" borderRadius="lg" overflow="hidden" transition="all 0.2s ease" _hover={{ shadow: 'md', transform: 'scale(1.02)' }}>
                    <Link to={`/product-details/${item.productID}`}>
                      <Image
                        src={item.productImage || item?.productImage[0]}
                        alt={item.productName || item.name}
                        height="150px"
                        width="100%"
                        objectFit="cover"
                      />
                    </Link>
                    <Box p={4}>
                      <Text fontWeight={500} mb={2} isTruncated>
                        {item.productName || item.name}
                      </Text>
                      <Flex align="center" mb={3}>
                        <FaNairaSign />
                        <Text ml={1} fontWeight="semibold">
                          {(item.productPrice || item.price)?.toLocaleString()}.00
                        </Text>
                      </Flex>

                      <Flex direction="column" gap={2}>
                        <Button size="sm" colorScheme="green" leftIcon={<MdShoppingCart />} onClick={() => handleCart(item)} width="full">
                          Add to Cart
                        </Button>
                        <Button size="sm" colorScheme="red" leftIcon={<MdDelete />} onClick={() => handleRemoveItem(item.productID)} width="full">
                          Remove
                        </Button>
                      </Flex>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
