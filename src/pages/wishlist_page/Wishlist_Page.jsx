import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  SimpleGrid,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { PiGreaterThan } from 'react-icons/pi';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { FaNairaSign } from 'react-icons/fa6';
import { MdDelete, MdShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/footer/Footer';
// import { addToCart } from '../../store/cart/cartsReucer';
import { deleteWishlist } from '../../store/wishlists/Wishlists';
import { setCartCount } from '../../store/cart/cartActions';

export default function Wishlist_Page() {
  const { wishlists } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [cartItems, setCartItems] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const[loading, setLoading] = useState(false);
  const[deleteLoading, setDeleteLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  // Fetch cart items from backend
  const fetchCart = async () => {
    if (!currentUser?._id) return;
    setLoading(true);
    try {
      const res = await fetch('https://adexify-api.vercel.app/api/cart/get-user-wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser._id }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLoading(false);
        setCartItems(data.cart.products);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCart();
  },[currentUser]);

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

  // Delete cart item by productId (and size if needed)
    const handleRemoveItem = async (productId, size) => {
      setDeleteLoading(productId);
      try {
        const res = await fetch('https://adexify-api.vercel.app/api/cart/delete-wishlist-item', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: currentUser._id, productId }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          fetchCart();
          // Fetch updated cart from backend to get latest product count
          const cartRes = await fetch('https://adexify-api.vercel.app/api/cart/get-user-wislist', {
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
          setDeleteLoading(false);
        } else {
          console.error('Delete failed:', data.message);
          setDeleteLoading(false);
        }
      } catch (error) {
        console.error('Delete error:', error);
        setDeleteLoading(false);
      }
    };

  return (
    <Box>
      <Header />

      <Box pb={10} pt={7} bg="gray.100">
        {/* Breadcrumb */}
        <Box maxW={{ '2xl': '80%', xl: '95%', lg: '97%', base: '97%' }} mx="auto" py={2} bg="white" px={6} rounded="md">
          <Flex align="center" gap={1}>
            <Link to="/" className="text-[13px]">Home</Link>
            <PiGreaterThan className="text-[13px] pt-1 text-gray.500" />
            <Text fontSize="13px" color="gray.500">Wishlist</Text>
          </Flex>
        </Box>

        {/* Wishlist Heading */}
        <Box borderWidth={'1px'} borderBottomColor={'gray.300'} bg="white" maxW={{ '2xl': '80%', xl: '95%', lg: '97%', base: '97%' }} mx={'auto'} py={2} px={2} rounded="md" mt={4}>
          <Flex borderBottomWidth={'1px'} borderBottomColor={'gray.200'} pb={2} justifyContent={'space-between'} alignItems={''} bg="white">
            <Box>
              <Heading fontSize={{ md: 25, base: 20 }} fontWeight={500} color="black">
                My Wishlist
                <Text fontSize={'12px'} color={'gray.400'} pt={2}>You have ( {cartItems.length >= 1 ? cartItems.length : 0} ) in your wshlist</Text>
              </Heading>
            </Box>
            <Box>
              <Button onClick={fetchCart} ml={4} bg="pink.500" color="white" py={5} _hover={{ bg: 'pink.600' }} size="sm">
                {loading ? <><Spinner size="sm" mr={2} /> Refreshing...</> : 'Refresh Cart'}
              </Button>
            </Box>
          </Flex>

          <Flex justifyContent={'center'} mt={0} width={'full'} py={1} rounded="md">
            <Box width="200px" bg={''} py={2} rounded={'md'} color={'gray.800'} fontWeight={'600'}>
              <Link to="/fashion" fontWeight={500} className="text- flex items-center justify-center gap-2">
                <BiLeftArrowAlt /> Continue Shopping
              </Link>
            </Box>
          </Flex>
        </Box>

        {/* Wishlist Items */}
        <Box maxW={{ '2xl': '80%', xl: '95%', lg: '97%', base: '97%' }} mx="auto" mt={6}>
          <Box bg="white" p={4} rounded="md">
            {cartItems.length === 0 ? (
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
                {cartItems.map((item, index) => (
                  <Box key={index} bg="gray.50" border="1px solid" borderColor="gray.200" borderRadius="lg" overflow="hidden" transition="all 0.2s ease" _hover={{ shadow: 'md', transform: 'scale(1.02)' }}>
                    <Link to={`/product-details/${item.productId}`}>
                      <Image src={item.image || item?.image[0]} alt={item.name} height="150px" width="100%" objectFit="cover"/>
                    </Link>
                    <Box p={4}>
                      <Text fontWeight={500} mb={2} isTruncated>
                        {tem.name}
                      </Text>
                      <Flex align="center" mb={3}>
                        <FaNairaSign />
                        <Text ml={1} fontWeight="semibold">
                          {item.price?.toLocaleString()}.00
                        </Text>
                      </Flex>

                      <Flex direction="column" gap={2}>
                        <Button size="sm" colorScheme="green" leftIcon={<MdShoppingCart />} onClick={() => handleCart(productId)} width="full">
                          Add to Cart
                        </Button>
                        <Button size="sm" colorScheme="red" leftIcon={<MdDelete />} onClick={() => handleRemoveItem(item.productId)} width="full">
                          {deleteLoading === item.productId ? <Spinner size="sm" /> : 'Delete'}
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
