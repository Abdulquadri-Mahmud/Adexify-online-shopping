import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { PiGreaterThan } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { CgMathMinus } from 'react-icons/cg';
import { RiAddFill } from 'react-icons/ri';
import { FaNairaSign } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/footer/Footer';

// Lazy load image
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { getCartToken } from '../../store/cart/utils/cartToken';
import { useCart } from '../../Context_APIs/CartCountContext';
import UpdateSizeModal from '../../components/modals/UpdateSizeModal';
import { MdDelete } from 'react-icons/md';

export default function Carts_Page() {
  const { currentUser } = useSelector((state) => state.user);
  const [cartItems, setCartItems] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  const cartItemsToRender = currentUser ? cartItems : cartItems;

  const navigate = useNavigate();

  // Modal for alert messages
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const { isOpen: isOpenUpdateSize, onOpen: onOpenUpdateSize, onClose: onCloseUpdateSize } = useDisclosure();

  const [selectedItem, setSelectedItem] = useState(null);
  const[updateLoading, setUpdateLoading] = useState(false);
  const[deleteLoading, setDeleteLoading] = useState(false);
  const[sizeIncrementLoading, setSizeIncrementLoading] = useState(false);
  const[sizeDecrementLoading, setSizeDecrementLoading] = useState(false);
  
  const[loading, setLoading] = useState(false);
  // Inside your Carts_Page component, after fetchCart() and before return
  const [itemsToShow, setItemsToShow] = useState(3); // initially show 5 items
  const [loadingMore, setLoadingMore] = useState(false);


  const { updateCart } = useCart();

  // Fetch cart items from backend
  const fetchCart = async () => {
    setLoading(true);
    try {
      const payload = currentUser?._id
      ? { userId: currentUser._id }
      : { cartToken: getCartToken() };
      
      const query = new URLSearchParams(payload).toString();
      
      const res = await fetch(`https://adexify-api.vercel.app/api/cart/get?${query}`);

      const data = await res.json();

      if (res.ok && data.success) {
        setCartItems(data.cart.products || []);
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
  }, [currentUser]);

  const loadMoreItems = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setItemsToShow((prev) => prev + 3); // show 5 more items
      setLoadingMore(false);
    }, 300); // small delay to show spinner
  };

  const displayedItems = cartItemsToRender.slice(0, itemsToShow);

  // Update cart item (size and/or quantity)
  const updateCartItem = async (productId, oldSize, newSize, quantity, actionType) => {
    if (quantity < 1) return;

     // Only set the specific loading state
    if (actionType === "increment") {
      setSizeIncrementLoading(`${productId}-${oldSize}`);
    } else if (actionType === "decrement") {
      setSizeDecrementLoading(`${productId}-${oldSize}`);
    }
    
    setUpdateLoading(`${productId}-${oldSize}`);
    try {
      const payload = currentUser?._id
      ? { 
        userId: currentUser._id, 
        productId, 
        oldSize,        // 🔑 send old size
            newSize,        // 🔑 send new size
            quantity 
          }
        : { 
          cartToken: getCartToken(), 
            productId, 
            oldSize, 
            newSize, 
            quantity 
          };
          
      const res = await fetch('https://adexify-api.vercel.app/api/cart/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        fetchCart(); 
        onCloseUpdateSize();
      } else {
        console.error('Update failed:', data.message);
      }
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      // Reset only the one that was set
      if (actionType === "increment") {
        setSizeIncrementLoading(null);
      } else if (actionType === "decrement") {
        setSizeDecrementLoading(null);
      }
      setUpdateLoading(false);
    }
  };

  // Delete cart item by productId (and size if needed)
  const deleteCartItem = async (productId, size) => {
    setDeleteLoading(productId);

    try {
      const payload = currentUser?._id
        ? { userId: currentUser._id, productId, selectedSize: size }
        : { cartToken: getCartToken(), productId, selectedSize: size };

      const res = await fetch('https://adexify-api.vercel.app/api/cart/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        updateCart(data.cart); //instantly updates count everywhere
        fetchCart(); // refresh UI
      } else {
        console.error('Delete failed:', data.message);
      }
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setDeleteLoading(null);
    }
  };

  // when clicking "Update Size" button on cart item
  const openOnlySizeModal = (item) => {
    setSelectedItem(item);
    onOpenUpdateSize();
  };
  // Redirect to checkout or show alert
  const handleRedirect = (cartItems) => {
    if (cartItems.length <= 0) {
      setAlertMessage("You need at least one item in your cart.");
      onOpen2();
      return;
    }

    if (!currentUser) {
      // ✅ Redirect to login with "redirect" param
      navigate("/signin", { state: { from: "/checkout/summary", cartItems } });
      return;
    }

    // ✅ User is logged in, go straight to checkout
    navigate("/checkout/summary", { state: { cartItems } });
  };

  // Calculate total price and total item count (including sizes)
  let total = 0;
  let itemCount = 0;

  cartItems.forEach((item) => {
    if (item.selectedSize) {
      // Single size item
      total += item.price * item.quantity;
      itemCount += item.quantity;
    } else if (item.items) {
      // Item with multiple sizes stored as items object (size -> quantity)
      Object.entries(item.items).forEach(([size, qty]) => {
        total += item.price * qty;
        itemCount += qty;
      });
    } else {
      // Item with no size info
      total += item.price * item.quantity;
      itemCount += item.quantity;
    }
  });

  return (
    <Box>
      <Header />

      <Box pb={10} pt={5} className="bg-zinc-200">
        <Box maxW={{ '2xl': '80%', xl: '95%', lg: '97%', base: '97%' }} mx="auto" className="py-2" bg="white" py={4} px={6} rounded="md">
          <Box className="flex gap-1 items-center">
            <Link to="/" className="text-[13px]">Home</Link>
            <PiGreaterThan className="text-[13px] pt-1 text-gray-500" />
            <Link to="/view-carts" className="text-[13px] text-gray-500">Shopping Cart</Link>
          </Box>
        </Box>
        <Box borderWidth={'1px'} borderBottomColor={'gray.300'} bg="white" maxW={{ '2xl': '80%', xl: '95%', lg: '97%', base: '97%' }} mx={'auto'} py={2} px={2} rounded="md" mt={4}>
          <Flex borderBottomWidth={'1px'} borderBottomColor={'gray.200'} pb={2} justifyContent={'space-between'} alignItems={''} bg="white">
            <Box>
              <Heading fontSize={{ md: 25, base: 20 }} fontWeight={500} color="black">
                My Carts
                <Text fontSize={'12px'} color={'gray.400'} pt={2}>You have ( {cartItems.length >= 1 ? cartItems.length : 0} ) in your cart</Text>
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

        <Box maxW={{ '2xl': '80%', xl: '95%', lg: '97%', base: '97%' }} mx="auto" mt={3}>
          {/* Flex container: left = cart items, right = order summary */}
          <Flex justifyContent="space-between" flexWrap={{ md: 'nowrap', base: 'wrap' }} gap={{ md: 5, base: 4 }}>
            {/* Left side: Cart Items */}
            <Box flex={1} bg="white" color="gray.800" p={{ lg: 4, base: 2 }} rounded="md" minW="0">
              <VStack spacing={4}>
                {displayedItems.length === 0 ? (
                  <Box textAlign="center" py={10}>
                    <Text color="gray.500" fontSize="lg">Your cart is empty.</Text>
                    <Button mt={4} bg="pink.600" color="white" _hover={{ bg: "pink.700" }} onClick={() => navigate("/fashion")}>
                      Go to Shop
                    </Button>
                  </Box>
                ) : (
                  displayedItems.map((item) => {
                    const size = item.selectedSize;
                    const qty = item.quantity;

                    return (
                      <Flex key={`${item.productId}-${size || 'nosize'}`} bg="gray.100" border="1px solid" borderColor="gray.300" rounded="md" p={4} w="full" justify="space-between" align="center" wrap="wrap" gap={4}>
                        <Flex gap={3} align="center" as={Link} to={`/product-details/${item.productId}`}>
                          <LazyLoadImage
                            src={Array.isArray(item.image) ? item.image[0] : item.image}
                            width="50px"
                            height="50px"
                            effect="blur"
                            style={{ borderRadius: '6px', objectFit: 'cover' }}
                          />
                          <Box>
                            <Text fontSize="sm">{item.name?.slice(0, 20)}...</Text>
                            {size && <Text fontSize="xs" color="gray.500">Size: {size}</Text>}
                          </Box>
                        </Flex>

                        <Flex align="center" gap={2}>
                          {/* Decrement button */}
                          <Button h="30px" w="30px" bg="pink.500" _hover={{ bg: "pink.800" }} color="white" onClick={() => updateCartItem(item.productId, size, size, qty - 1, "decrement")} isDisabled={qty <= 1 || sizeDecrementLoading === `${item.productId}-${size}`}>
                            {sizeDecrementLoading === `${item.productId}-${size}` ? (
                              <Spinner size="sm" />
                            ) : (
                              <CgMathMinus />
                            )}
                          </Button>

                          <Text>{qty}</Text>

                          {/* Increment button */}
                          <Button h="30px" w="30px" bg="pink.500" _hover={{ bg: "pink.800" }} color="white" onClick={() => updateCartItem(item.productId, size, size, qty + 1, "increment")} isDisabled={sizeIncrementLoading === `${item.productId}-${size}`}>
                            {sizeIncrementLoading === `${item.productId}-${size}` ? (
                              <Spinner size="sm" />
                            ) : (
                              <RiAddFill />
                            )}
                          </Button>
                        </Flex>

                        <Flex align="center">
                          <Text fontWeight="medium" ml={1}>{(item.price * qty).toLocaleString()}.00</Text>
                        </Flex>

                        {
                          item.selectedSize && (
                            <Button size="sm" bg="green.500" _hover={{bg: 'green.800'}} color="white" onClick={() => openOnlySizeModal(item)}>
                              Update Size
                            </Button>
                          )
                        }

                        <button className='bg-red-500 p-2 rounded-md text-lg text-white'  onClick={() => deleteCartItem(item.productId, size)}>
                          {deleteLoading === item.productId ? <Spinner size="sm" /> : <MdDelete />}
                        </button>
                      </Flex>
                    );
                  })
                )}

                {/* Load More Button */}
                {itemsToShow < cartItemsToRender.length && (
                  <Button onClick={loadMoreItems} isLoading={loadingMore} colorScheme="pink" variant="outline">
                    Load More
                  </Button>
                )}
              </VStack>
            </Box>

            {/* Right side: Order Summary */}
            <Box width={{ md: '350px', base: '100%' }} height={'350px'} p={{ md: 3, base: 2 }} bg={'white'} rounded={'md'}>
              <Flex justifyContent={'space-between'} alignItems={'center'} pb={3} borderBottomWidth={1} borderBottomColor={'gray.100'}>
                <Heading fontSize={16} fontWeight={500}>Order Summary</Heading>
                <Text fontWeight={500} fontSize={15}>
                  Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})
                </Text>
              </Flex>
              <Flex justifyContent={'space-between'} alignItems={'center'} py={5} borderBottomWidth={1} borderBottomColor={'gray.100'}>
                <Text fontSize={14} fontWeight={500}>Delivery Charges:</Text>
                <Text fontWeight={500} fontSize={'11px'} textAlign={'end'} className="text-gray-400">
                  Add your Delivery address at checkout to see delivery charges
                </Text>
              </Flex>
              <Flex justifyContent={'space-between'} alignItems={'center'} py={4} borderBottomWidth={1} borderBottomColor={'gray.100'}>
                <Heading fontSize={16} fontWeight={500}>Subtotal</Heading>
                <Box>
                  <Text fontWeight={500} className="flex items-center">
                    <FaNairaSign />
                    <Text>{total.toLocaleString()}.00</Text>
                  </Text>
                </Box>
              </Flex>
              <Flex justifyContent={'space-between'} alignItems={'center'} py={4} borderBottomWidth={1} borderBottomColor={'gray.100'}>
                <Heading fontSize={16} fontWeight={500}>Total</Heading>
                <Text fontWeight={500} className="flex items-center">
                  <FaNairaSign />
                  <Text>{total.toLocaleString()}.00</Text>
                </Text>
              </Flex>
              <Text className="text-[12px] text-yellow-600 text-end py-2">Excluding delivery charges</Text>
              <Box borderBottomWidth={1} borderBottomColor={'gray.100'}>
                <Button
                  bg={'green.500'}
                  color={'white'}
                  _hover={{ bg: 'green.700' }}
                  onClick={() => handleRedirect(cartItems)}
                  className="w-full my-3 rounded-md py-2 font-medium"
                >
                  Continue to Checkout
                </Button>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>

      {/* Update only size modal */}
      <UpdateSizeModal
        isOpen={isOpenUpdateSize}
        onClose={onCloseUpdateSize}
        selectedItem={selectedItem}
        updateCartItem={updateCartItem}
        updateLoading={updateLoading}
      />

      <Footer />
    </Box>
  );
}
