import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Select,
  NumberInput,
  NumberInputField,
  Spinner,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { PiGreaterThan } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { CgMathMinus } from 'react-icons/cg';
import { RiAddFill } from 'react-icons/ri';
import { FaNairaSign } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/footer/Footer';
import { setCartCount } from '../../store/cart/cartActions';

export default function Carts_Page() {
  const { currentUser } = useSelector((state) => state.user);
  const [cartItems, setCartItems] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  const navigate = useNavigate();

  // Modal for selecting size & quantity on no-size items
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Modal for alert messages
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const { isOpen: isOpenUpdateSize, onOpen: onOpenUpdateSize, onClose: onCloseUpdateSize } = useDisclosure();

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQty, setSelectedQty] = useState(1);
  const[updateLoading, setUpdateLoading] = useState(false);
  const[deleteLoading, setDeleteLoading] = useState(false);
  const[loading, setLoading] = useState(false);

  const dispatch = useDispatch();


  // Fetch cart items from backend
  const fetchCart = async () => {
    if (!currentUser?._id) return;
    setLoading(true);
    try {
      const res = await fetch('https://adexify-api.vercel.app/api/cart/get-user-cart', {
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
  }, [currentUser]);

  // Update cart item quantity or size
  const updateCartItem = async (productId, size, quantity) => {
    if (quantity < 1) return;

    setUpdateLoading(`${productId}-${size}`);

    try {
      const res = await fetch('https://adexify-api.vercel.app/api/cart/update-user-cart', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser._id, productId, selectedSize: size, quantity }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok && data.success === true) {
        fetchCart();
        onCloseUpdateSize();
      } else {
        console.error('Update failed:', data.message);
      }
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setUpdateLoading(null);
    }
  };

  // Delete cart item by productId (and size if needed)
  const deleteCartItem = async (productId, size) => {
    setDeleteLoading(productId);
    try {
      const res = await fetch('https://adexify-api.vercel.app/api/cart/delete-cart-item', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser._id, productId }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        fetchCart();
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

  // Open modal for selecting size & quantity for items without size
  const openSizeModal = (item) => {
    setSelectedItem(item);
    setSelectedSize('');
    setSelectedQty(1);
    onOpen();
  };
  const openOnlySizeModal = (item) => {
    setSelectedItem(item);
    setSelectedSize('');
    onOpenUpdateSize();
  };

  // Confirm adding size & quantity on modal
  const handleAddSizeToCart = () => {
    if (!selectedItem || !selectedSize || selectedQty < 1) return;
    updateCartItem(selectedItem.productId, selectedSize, selectedQty);
    onClose();
  };

  // Redirect to checkout or show alert
  const handleRedirect = () => {
    if (cartItems.length <= 0) {
      setAlertMessage('You need at least one item in your cart.');
      onOpen2();
      return;
    }
    if (!currentUser) {
      setAlertMessage('You must be logged in to proceed.');
      onOpen2();
      return;
    }
    navigate('/checkout/summary');
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

      <Box pb={10} pt={7} className="bg-zinc-200">
        <Box maxW={{ '2xl': '80%', xl: '95%', lg: '97%', base: '97%' }} mx="auto" className="py-2" bg="white" py={4} px={6} rounded="md">
          <Box className="flex gap-1 items-center">
            <Link to="/" className="text-[13px]">Home</Link>
            <PiGreaterThan className="text-[13px] pt-1 text-gray-500" />
            <Link to="/view-carts" className="text-[13px] text-gray-500">Shopping Cart</Link>
          </Box>
        </Box>

        <Flex justifyContent={'space-between'} alignItems={''} bg="white" py={3} px={2} rounded="md" maxW={{ '2xl': '80%', xl: '95%', lg: '97%', base: '97%' }} mx="auto" mt={4}>
          <Box>
            <Heading fontSize={{ md: 30, base: 25 }} fontWeight={500} color="black">
              Shopping Cart
            </Heading>
            <Box mt={4} width="200px" py={1} rounded="md" className="border border-gray-300">
              <Link to="/fashion" fontWeight={500} className="text- flex items-center justify-center gap-2">
                <BiLeftArrowAlt /> Continue Shopping
              </Link>
            </Box>
          </Box>
          <Box>
            <Button onClick={fetchCart} ml={4} bg="pink.500" color="white" py={5} _hover={{ bg: 'pink.600' }} size="sm">
              {loading ? <><Spinner size="sm" mr={2} /> Refreshing...</> : 'Refresh Cart'}
            </Button>
          </Box>
        </Flex>

        <Box maxW={{ '2xl': '80%', xl: '95%', lg: '97%', base: '97%' }} mx="auto" mt={6}>
          {/* Flex container: left = cart items, right = order summary */}
          <Flex justifyContent="space-between" flexWrap={{ md: 'nowrap', base: 'wrap' }} gap={{ md: 5, base: 4 }}>
            {/* Left side: Cart Items */}
            <Box flex={1} bg="white" color="gray.800" p={{ lg: 4 }} rounded="md" minW="0">
              <VStack spacing={4}>
                {
                  cartItems.length === 0 ? (
                    <Box textAlign="center" py={10}>
                      <Text color="gray.500" fontSize="lg">Your cart is empty.</Text>
                      <Button mt={4} bg="green.600" color="white" _hover={{ bg: 'green.700' }} onClick={() => navigate('/fashion')}>
                        Go to Shop
                      </Button>
                    </Box>
                    ) : (
                      cartItems.map((item) => {
                        const size = item.selectedSize;
                        const qty = item.quantity;
                        if (item.selectedSize) {
                          return (
                            <Flex key={`${item.productId}-${size}`} bg="gray.100" border="1px solid" borderColor="gray.300" rounded="md" p={4} w="full" justify="space-between" align="center" wrap="wrap" gap={4}>
                              <Flex gap={3} align="center" as={Link} to={`/product-details/${item.productId}`}>
                                <Image src={item.image?.[0]} boxSize="50px" objectFit="cover" rounded="md" />
                                <Box>
                                  <Text fontSize="sm">{item.name?.slice(0, 20)}...</Text>
                                  <Text fontSize="xs" color="gray.500">Size: {size}</Text>
                                </Box>
                              </Flex>

                              <Flex align="center" gap={2}>
                                <Button h="30px" w="30px" bg="pink.500" _hover={{bg: 'pink.800'}} color="white" size="" onClick={() => updateCartItem(item.productId, size, qty - 1)} isDisabled={qty <= 1 || updateLoading === `${item.productId}-${size}`}>
                                  {updateLoading === `${item.productId}-${size}` ? <Spinner size="sm" /> : <CgMathMinus />}
                                </Button>
                                <Text>{qty}</Text>
                                <Button h="30px" w="30px" bg="pink.500" _hover={{bg: 'pink.800'}} color="white" size="" onClick={() => updateCartItem(item.productId, size, qty + 1)} isDisabled={updateLoading === `${item.productId}-${size}`}>
                                  {updateLoading === `${item.productId}-${size}` ? <Spinner size="sm" /> : <RiAddFill />}
                                </Button>
                              </Flex>

                              <Flex align="center">
                                <FaNairaSign />
                                <Text fontWeight="medium" ml={1}>{(item.price * qty).toLocaleString()}.00</Text>
                              </Flex>

                              <Button size="sm" bg="green.500" _hover={{bg: 'green.800'}} color="white" onClick={() => openOnlySizeModal(item)}>
                                Update Size
                              </Button>

                              <Button size="sm" colorScheme="red" onClick={() => deleteCartItem(item.productId, size)} isDisabled={deleteLoading === item.productId}>
                                {deleteLoading === item.productId ? <Spinner size="sm" /> : <MdDelete />}
                              </Button>
                            </Flex>
                          );
                        }

                        return (
                          <Flex key={`no-size-${item.productId}`} bg="gray.50" border="1px solid" borderColor="gray.200" rounded="md" p={4} w="full" justify="space-between" align="center" wrap="wrap" gap={4}>
                            <Flex gap={3} align="center" as={Link} to={`/product-details/${item.productId}`}>
                              <Image src={item.image?.[0]} boxSize="50px" objectFit="cover" rounded="md" />
                              <Box>
                                <Text fontSize="sm">{item.name?.slice(0, 20)}...</Text>
                                <Text fontSize="xs" color="orange.500">No size selected yet.</Text>
                              </Box>
                            </Flex>

                            <Flex align="center" gap={2}>
                              <FaNairaSign />
                              <Text fontWeight="medium" ml={1}>{item.price.toLocaleString()}.00</Text>
                            </Flex>

                            <Button size="sm" bg="green.500" _hover={{bg: 'green.800'}} color="white" onClick={() => openSizeModal(item)}>
                              Select Size
                            </Button>

                            <Button size="sm" colorScheme="red" onClick={() => deleteCartItem(item.productId, null)}>
                              {deleteLoading === item.productId ? <Spinner size="sm" /> : <MdDelete />}
                            </Button>
                          </Flex>
                        );
                      })
                    )
                }
              </VStack>
            </Box>

            {/* Right side: Order Summary */}
            <Box
              width={{ md: '350px', base: '100%' }}
              height={'350px'}
              p={{ md: 3, base: 2 }}
              bg={'white'}
              rounded={'md'}
            >
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
                    {total.toLocaleString()}.00
                  </Text>
                </Box>
              </Flex>
              <Flex justifyContent={'space-between'} alignItems={'center'} py={4} borderBottomWidth={1} borderBottomColor={'gray.100'}>
                <Heading fontSize={16} fontWeight={500}>Total</Heading>
                <Text fontWeight={500} className="flex items-center">
                  <FaNairaSign />
                  {total.toLocaleString()}.00
                </Text>
              </Flex>
              <Text className="text-[12px] text-yellow-600 text-end py-2">Excluding delivery charges</Text>
              <Box borderBottomWidth={1} borderBottomColor={'gray.100'}>
                <Link to={currentUser && !(cartItems.length <= 0) ? "/checkout/summary" : "/view-carts"}>
                  <Button
                    bg={'green.500'}
                    color={'white'}
                    _hover={{ bg: 'green.700' }}
                    onClick={handleRedirect}
                    className="w-full my-3 rounded-md py-2 font-medium"
                  >
                    Continue to Checkout
                  </Button>
                </Link>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>

      {/* The modals remain unchanged */}

      {/* Modal for selecting size & quantity */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Size & Quantity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={500}>{selectedItem?.name}</Text>
            <Select
              mt={4}
              placeholder="Select size"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            > 
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </Select>
            <NumberInput
              mt={3}
              min={1}
              value={selectedQty}
              onChange={(val) => setSelectedQty(parseInt(val) || 1)}
            >
              <NumberInputField />
            </NumberInput>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={handleAddSizeToCart} isDisabled={!selectedSize}>
              Add to Cart
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Update only size modal */}
      <Modal isOpen={isOpenUpdateSize} onClose={onCloseUpdateSize} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Size</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={500}>{selectedItem?.name}</Text>
            <Text mt={3} fontWeight={'600'} color={'pink.500'} bg={'pink.100'} width={'130px'} px={2} py={1} rounded={'5px'}>{selectedItem?.selectedSize ? `Current size: ${selectedItem.selectedSize}` : "Select size"}</Text>
            <Select
              mt={4}
              placeholder={selectedItem?.selectedSize ? `Current size: ${selectedItem.selectedSize}` : "Select size"}
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            > 
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={handleAddSizeToCart} isDisabled={!selectedSize} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              {loading ? <><Spinner size="sm" mr={2} /> Updating...</> : 'Add to Cart'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal to alert user to sign in or cart empty */}
      <Modal isOpen={isOpen2} onClose={onClose2} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Box bg="red.50" py={2} rounded="md" textAlign="center">
              Error Message
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={500}>{alertMessage}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose2}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Footer />
    </Box>
  );
}
