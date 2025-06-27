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
} from '@chakra-ui/react';
import React, { useState } from 'react';
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
import { changeQuantity, removeItem } from '../../store/cart/cartsReucer';

export default function Carts_Page() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQty, setSelectedQty] = useState(0);

  // Calculate total and item count
  let total = 0;
  const itemCount = items.reduce((acc, item) => {
    return acc + Object.values(item.items || {}).reduce((sum, qty) => sum + qty, 0);
  }, 0);

  // Open modal to select size/qty for no-size items
  const openSizeModal = (item) => {
    setSelectedItem(item);
    setSelectedSize('');
    setSelectedQty(1);
    onOpen();
  };

  // Handle adding size and qty to cart item
  const handleAddSizeToCart = () => {
    if (!selectedItem || !selectedSize || selectedQty < 0) return;

    dispatch(changeQuantity(selectedItem.productID, selectedSize, selectedQty));
    onClose();
  };

  return (
    <Box>
      <Header />
      <Box pb={10} pt={7} className="bg-zinc-200">
        <Box>
          <Box maxW={{ '2xl': '80%', xl: '95%', lg: '100%', base: '97%' }} mx={'auto'} className="py-2" bg={'white'} py={4} px={6} rounded={'md'}>
            <Box className="flex gap-1 items-center">
              <Link to={'/'} className="text-[13px]">
                Home
              </Link>
              <PiGreaterThan className="text-[13px] pt-1 text-gray-500" />
              <Link to={'/view-carts'} className="text-[13px] text-gray-500">
                Shopping Cart
              </Link>
            </Box>
          </Box>

          <Box bg={'white'} py={3} px={2} rounded={'md'} maxW={{ '2xl': '80%', xl: '95%', lg: '100%', base: '97%' }} mx={'auto'} mt={4}>
            <Heading fontSize={{ md: 30, base: 25 }} fontWeight={500} color={'black'}>
              Shopping Cart
            </Heading>
            <Box mt={4} width={'200px'} py={1} rounded={'md'} className="border border-gray-300">
              <Link to={'/fashion'} fontWeight={500} className="text- flex items-center justify-center gap-2">
                <BiLeftArrowAlt /> Continue Shopping
              </Link>
            </Box>
          </Box>

          <Box maxW={{ '2xl': '80%', xl: '95%', lg: '100%', base: '97%' }} mx={'auto'}>
            <Flex justifyContent={'space-between'} flexWrap={{ md: 'no-wrap', base: 'wrap' }} gap={{ md: 5, base: 2 }} mt={6}>
              <Box flex={1} bg="white" color={'gray.800'} p={{ lg: 4 }} rounded="md">
                <VStack spacing={4}>
                  {items.length === 0 ? (
                    <Box textAlign="center" py={10}>
                      <Text color="gray.500" fontSize="lg">
                        Your cart is empty.
                      </Text>
                      <Button mt={4} bg="green.600" color="white" _hover={{bg: 'green.700'}} onClick={() => navigate('/fashion')}> 
                        Go to Shop
                      </Button>
                    </Box>
                  ) : (
                    items.map((item, index) => {
                      const sizes = Object.entries(item.items || {});

                      if (sizes.length === 0) {
                        // Item with no sizes/quantities
                        return (
                          <Flex key={`empty-${index}`} bg={'yellow.50'} border="1px solid" borderColor="yellow.200" rounded="md" p={4} w="full" justify="space-between" align="center" wrap="wrap" gap={4}>
                            <Flex gap={3} align="center" as={Link} to={`/product-details/${item.productID}`}>
                              <Image src={item.productImage} boxSize="50px" objectFit="cover" rounded="md"/>
                              <Box>
                                <Text fontSize="sm">{item.productName?.slice(0, 20)}...</Text>
                                <Text fontSize="xs" color="orange.500">
                                  No size selected yet.
                                </Text>
                              </Box>
                            </Flex>

                            <Flex align="center">
                              <FaNairaSign />
                              <Text fontWeight="medium" ml={1}>
                                {item.productPrice.toLocaleString()}.00
                              </Text>
                            </Flex>

                            <Button size="sm" colorScheme="green" onClick={() => openSizeModal(item)}
                            >
                              Select Size
                            </Button>

                            <Button size="sm" colorScheme="red" onClick={() => dispatch(removeItem(item.productID))}
                            >
                              <MdDelete />
                            </Button>
                          </Flex>
                        );
                      }

                      // Item with selected sizes/quantities
                      return sizes.map(([size, quantity]) => {
                        const subTotal = item.productPrice * quantity;
                        total += subTotal;

                        return (
                          <Flex key={`${index}-${size}`} bg={'gray.100'} border="1px solid" borderColor="gray.300" rounded="md" p={4} w="full" justify="space-between" align="center" wrap="wrap" gap={4}
                          >
                            <Flex gap={3} align="center" as={Link} to={`/product-details/${item.productID}`}
                            >
                              <Image src={item.productImage} boxSize="50px" objectFit="cover" rounded="md"
                              />
                              <Box>
                                <Text fontSize="sm">{item.productName?.slice(0, 20)}...</Text>
                                <Text fontSize="xs" color="gray.500">
                                  Size: {size}
                                </Text>
                              </Box>
                            </Flex>

                            <Flex align="center" gap={2}>
                              <Button h="30px" w="30px" bg="green.500" color="white" size="sm" onClick={() =>
                                  dispatch(changeQuantity(item.productID, size, quantity - 1))
                                }
                                isDisabled={quantity <= 1}
                              >
                                <CgMathMinus />
                              </Button>
                              <Text>{quantity}</Text>
                              <Button h="30px" w="30px" bg="green.500" color="white" size="sm" onClick={() =>
                                  dispatch(changeQuantity(item.productID, size, quantity + 1))
                                }
                              >
                                <RiAddFill />
                              </Button>
                            </Flex>

                            <Flex align="center">
                              <FaNairaSign />
                              <Text fontWeight="medium" ml={1}>
                                {subTotal.toLocaleString()}.00
                              </Text>
                            </Flex>

                            <Button size={'large'} h={{ md: '35px', base: '30px' }} w={{ md: '35px', base: '30px' }} colorScheme="red" border="1px solid" borderColor="gray.300" onClick={() => dispatch(removeItem(item.productID))}
                            >
                              <MdDelete color="white" />
                            </Button>
                          </Flex>
                        );
                      });
                    })
                  )}
                </VStack>
              </Box>

              <Box width={{ md: '350px', base: '100%' }} height={'350px'} p={{ md: 3, base: 2 }} bg={'white'} rounded={'md'}
              >
                <Flex justifyContent={'space-between'} alignItems={'center'} pb={3} borderBottomWidth={1} borderBottomColor={'gray.100'}
                >
                  <Heading fontSize={16} fontWeight={500}>
                    Order Summary
                  </Heading>
                  <Text fontWeight={500} fontSize={15}>
                    Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})
                  </Text>
                </Flex>
                <Flex justifyContent={'space-between'} alignItems={'center'} py={5} borderBottomWidth={1} borderBottomColor={'gray.100'}>
                  <Text fontSize={14} fontWeight={500}>
                    Delivery Charges:
                  </Text>
                  <Text fontWeight={500} fontSize={'11px'} textAlign={'end'} className="text-gray-400">
                    Add your Delivery address at checkout to see delivery charges
                  </Text>
                </Flex>
                <Flex justifyContent={'space-between'} alignItems={'center'} py={4} borderBottomWidth={1} borderBottomColor={'gray.100'}
                >
                  <Heading fontSize={16} fontWeight={500}>
                    Subtotal
                  </Heading>
                  <Box>
                    <Text fontWeight={500} className="flex items-center">
                      <FaNairaSign />
                      {total.toLocaleString()}.00
                    </Text>
                  </Box>
                </Flex>
                <Flex justifyContent={'space-between'} alignItems={'center'} py={4} borderBottomWidth={1} borderBottomColor={'gray.100'}
                >
                  <Heading fontSize={16} fontWeight={500}>
                    Total
                  </Heading>
                  <Text fontWeight={500} className="flex items-center">
                    <FaNairaSign />
                    {total.toLocaleString()}.00
                  </Text>
                </Flex>
                <Text className="text-[12px] text-yellow-600 text-end py-2">
                  Excluding delivery charges
                </Text>
                <Box borderBottomWidth={1} borderBottomColor={'gray.100'}>
                  <button className="bg-green-600 text-white w-full my-3 rounded-md py-2 font-medium">
                    Continue to Checkout
                  </button>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>

      {/* Modal for selecting size & quantity */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Size & Quantity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={500}>{selectedItem?.productName}</Text>

            <Select mt={4} placeholder="Select size" onChange={(e) => setSelectedSize(e.target.value)} value={selectedSize}> 
            <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </Select>

            <NumberInput mt={3} min={0} value={selectedQty} onChange={(val) => setSelectedQty(parseInt(val) || 0)}>
              <NumberInputField />
            </NumberInput>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              onClick={handleAddSizeToCart}
              isDisabled={!selectedSize}
            >
              Add to Cart
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Footer />
    </Box>
  );
}
