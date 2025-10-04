import React, { useEffect, useState } from 'react';
import { FaBookmark, FaNairaSign } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Box,Button,Container,Flex, Heading, HStack, Image, Radio, RadioGroup, SimpleGrid, Stack, Text } from '@chakra-ui/react';
// import { toast } from 'react-toastify';
import {
  Grid,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { FaArrowRight, FaRegBookmark } from 'react-icons/fa';
import Header from '../../../components/Header';
import Footer from '../../../components/footer/Footer';
import addresses from '../../../data/address';

const paymentMethods = [
  {
    id: "Pay on Delivery",
    name: "Pay on Delivery",
    description: "Pay with cash or POS when your order is delivered",
  },
  {
    id: "online",
    name: "Pay Online",
    description: "Secure payment with card, transfer, or USSD",
  },
];

export default function CheckOutPage() {
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] };

  const { currentUser } = useSelector((state) => state.user);

  // console.log("Current User:", currentUser);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [editCustomerAddress, setEditCustomerAddress] = useState(false);
  const [editPickUpStation, setEditPickUpStation] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [item, setItem] = useState({});

  let total = 0;

  useEffect(() => {
    cartItems.map((item) => {
      setItem(item)
    })
  },[]);

  const [selectedMethod, setSelectedMethod] = useState("Pay on Delivery"); // default to COD
  
  const [formData, setFormData] = useState({
    firstname: currentUser?.firstname || '',
    lastname: currentUser?.lastname || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    address: currentUser?.address || '',
    deliveryMethod: 'Standard',
    items: cartItems || [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.defaultValue,
    });
  };

  const handleCustomerAddressSubmit = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);

        const payload = {
          ...formData,
          region: selectedRegion,
          city: selectedCity,
        };

        console.log("Submitting customer address:", payload);
        // const url = `https://hardayfunkeh-apis.vercel.app/api/order/create_orders`;

        // const res = await fetch(url, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData),
        // });

        // const data = await res.json();

        // if (data.success === false) {
        //     setError(data.message || 'Something went wrong');
        //     // toast.error(data.message || 'Something went wrong');
        //     setLoading(false);
        //     return;
        // }

        // // Success
        // setSuccess(data.message);
        // setShowModal(true); // Show modal on success
        // //   toast.success('Order created successfully!');
        // setError('');
        // setLoading(false);
    } catch (error) {
      setError(error.message || 'An unexpected error occurred');
    //   toast.error(`Error: ${error.message || 'Failed to create gadget'}`);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const cancelOrder = async () => {
    await deleteOrder()
  }

  let navigate = useNavigate();

  const handleBack = () => navigate(-1);

  const handleEditCustomerAddress = () => {
    setEditCustomerAddress(true);
    console.log(editCustomerAddress);
    
  }

  cartItems.forEach((item) => {
    total += item.price;
  });

  // Whenever user changes payment method, we just update state
  const handlePaymentChange = (id) => {
    setSelectedMethod(id);
  };

  const handleOrder = () => {
    const payload = {
      ...formData,
      paymentMethod: selectedMethod, // always synced here
    };
    console.log("Submitting order:", payload);
    // 👉 send payload to backend
  }

  return (
    <Box className="bg-zinc-100">
      <Header/>
      <Box maxW={{ base: '100%', xl: '95%', '2xl': '80%' }} px={2} mx="auto" mt="4">
        <Box>
          <Box  border="1px solid"  borderColor="gray.50"  bg="white"  borderRadius="xl">
            {/* Breadcrumb + Back */}
            <Flex justify="space-between" align="center" flexWrap="wrap" mb={3}>
              <HStack bg={'pink.200'} roundedTopLeft={'xl'} roundedBottomRight={'xl'} py={2} px={4} spacing={1} fontSize="12px" color="gray.600">
                <Link to="/">
                  <Text _hover={{ color: "pink.100", textDecor: "underline" }}>Home</Text>
                </Link>
                <Text>/</Text>
                <Link to="/cart">
                  <Text _hover={{ color: "pink.100", textDecor: "underline" }}>My Cart</Text>
                </Link>
                <Text>/</Text>
                <Link to="/create-order">
                  <Text _hover={{ color: "pink.100", textDecor: "underline" }}>Checkout</Text>
                </Link>
              </HStack>

              <Button onClick={handleBack} roundedTopRight={'xl'} roundedBottomLeft={'xl'} color={'gray.600'} size="sm" bg="pink.200" leftIcon={<span>←</span>}>
                Back
              </Button>
            </Flex>

            {/* Title */}
            <Box textAlign="center" pb={3}>
              <Heading  fontSize={{ base: "2xl", md: "4xl" }}  fontWeight="bold"  color="pink.600" letterSpacing="tight">
                Checkout
              </Heading>
              <Text mt={2} fontSize="sm" color="gray.500">
                Complete your order in just a few steps
              </Text>
            </Box>
          </Box>
          {/* Basic Info */}
          <Box maxW={{'2xl' : '80%', xl : '100%', lg : '100%', base: '97%'}} mx={'auto'} py={2} px={{md:0, base: 0}}>
            <Box mb={2} p={2} bg="white" borderRadius="xl">
              <Heading as="h2" fontSize="2xl" fontWeight="medium" color="gray.600">
                Basic Information
              </Heading>
            </Box>
            <Flex color={'gray.800'} justify="space-between" gap={3} flexWrap="wrap">
              <Box flex={'1'} minW={'0'}>
                {/* Customer Address */}
                <Box width={'full'} bg={'white'} p={4} rounded={'lg'} pos={'relative'}>
                  <Flex alignItems={'center'} gap={2}>
                    <Box className='animate-pulse' bg={'pink.300'} w={4} h={4} rounded={'full'} display={'flex'} justifyContent={'center'} alignItems={'center'}></Box>
                    <Heading as={'h3'} fontSize={'md'} fontWeight={600} color={'gray.600'}>1.CUSTOMER ADDRESS</Heading>
                  </Flex>
                  <Box mt={3} px={3}>
                    <Heading as={'h5'} fontSize={'md'} fontWeight={600} color={'gray.500'}>{currentUser.firstname} {currentUser.lastname}</Heading>
                    <Text pt={3} color={'gray.500'}>{currentUser.address} | {currentUser.phone}</Text>
                  </Box>
                  <Button onClick={handleEditCustomerAddress} position={'absolute'} top={2} right={2} bg={'transparent'} fontSize={'sm'} color={'gray.500'}>Change <FaArrowRight/></Button>
                </Box>
                {/* FORM SECTION */}
                {
                  editCustomerAddress && (
                    <Box position={'fixed'} inset={0} bg={'blackAlpha.700'} zIndex={50} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                      <Box bg={'white'} p={{md:5, base:3}} rounded={'lg'} maxW={'2xl'} w={'full'} className="" pos={'relative'}>
                        <Flex alignItems={'center'} gap={2}>
                          <Box className='animate-pulse' bg={'pink.300'} w={4} h={4} rounded={'full'} display={'flex'} justifyContent={'center'} alignItems={'center'}></Box>
                          <Heading as={'h3'} fontSize={'md'} fontWeight={600} color={'gray.600'}>1.CUSTOMER ADDRESS</Heading>
                        </Flex>
                        <form onSubmit={handleCustomerAddressSubmit} style={{ fontWeight: 500, width: '100%', maxWidth: '100%', backgroundColor: 'white', paddingTop: '12px', borderBottomLeftRadius: '0.375rem', borderBottomRightRadius: '0.375rem', flexBasis: '55%'}}>
                          <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }} gap={3} p={3}>
                            <Input onChange={handleChange} defaultValue={formData.firstname} id="firstname" type="text" placeholder="First Name" fontWeight="normal" fontSize="sm" color="gray.500" border="1px solid" borderColor="gray.200" rounded="md" p={2}/>
                            <Input onChange={handleChange} defaultValue={formData.lastname} id="lastname" type="text" placeholder="Last Name" fontWeight="normal" fontSize="sm" color="gray.500" border="1px solid" borderColor="gray.200" rounded="md" p={2}/>
                          </Grid>

                          <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }} gap={3} p={3}>
                            <Input onChange={handleChange} defaultValue={formData.phone} id="phone" type="text" placeholder="Phone Number" fontWeight="normal" fontSize="sm" color="gray.500" border="1px solid" borderColor="gray.200" rounded="md" p={2}/>
                            <Input onChange={handleChange} defaultValue={formData.email} id="email" type="email" placeholder="Email Address" fontWeight="normal" fontSize="sm" color="gray.500" border="1px solid" borderColor="gray.200" rounded="md" p={2}/>
                          </Grid>

                          {/* Region (State) */}
                          <Box p={3} fontSize={'14px'} color={'gray.600'} fontWeight={500}>
                            <Text mb={1}>Select State</Text>
                            <Select fontSize={'14px'} placeholder="Select State" value={selectedRegion} onChange={(e) => {(setSelectedRegion(e.target.value));
                                setSelectedCity(""); // reset city when region changes
                              }}
                            >
                              {addresses.map((addr) => (
                                <option key={addr.region} value={addr.region}>
                                  {addr.region}
                                </option>
                              ))}
                            </Select>
                          </Box>

                          {/* City (District) */}
                          <Box p={3} fontSize={'14px'} color={'gray.600'} fontWeight={500}>
                            <Text mb={1}>Select City</Text>
                            <Select fontSize={'14px'} placeholder="Select City" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} isDisabled={!selectedRegion}>
                              {addresses
                                .find((addr) => addr.region === selectedRegion)
                                ?.cities.map((city) => (
                                  <option key={city} value={city}>
                                    {city}
                                  </option>
                                ))}
                            </Select>
                          </Box>

                          {/* Full Address */}
                          <Box p={3}>
                            <Text mb={1}>Full Address</Text>
                            <Textarea
                              id="address"
                              onChange={handleChange}
                              defaultValue={formData.address}
                              placeholder="Street, House number, Landmark"
                              fontWeight="normal"
                              fontSize="sm"
                              color="gray.500"
                              h="80px"
                              border="1px solid"
                              borderColor="gray.200"
                              rounded="md"
                              p={2}
                            />
                          </Box>
                          <Flex justify="space-between" p={3} w={'full'}>
                            <Button onClick={() => setEditCustomerAddress(false)} bg={'red.500'} color={'white'}>Close</Button>
                            <Button type="submit" bg="pink.600" _hover={{ bg: 'red.800' }} color="white" py={3} px={4} rounded="md" transition="background-color 0.2s" isLoading={loading} loadingText="Placing Order..." >
                              Update Address
                            </Button>
                          </Flex>
                        </form>
                      </Box>
                    </Box>
                  )
                }

                {/* Products */}
                <Box bg={'white'} p={4} rounded={'lg'} pos={'relative'} mt={5}>
                  <Flex alignItems={'center'} gap={2}>
                    <Box className='animate-pulse' bg={'pink.300'} w={4} h={4} rounded={'full'} display={'flex'} justifyContent={'center'} alignItems={'center'}></Box>
                    <Heading as={'h3'} fontSize={'md'} fontWeight={600} color={'gray.600'}>2.PRODUCTS</Heading>
                  </Flex>
                  <SimpleGrid columns={{ base: 1,md: 1 }} spacing={1} mt={3} px={3} py={3} bg={'gray.100'} rounded={'lg'} borderBottom={'1px solid'} borderColor={'gray.200'}>
                    {
                      cartItems.length > 0 && (
                        cartItems.map((item) => {
                          return(
                            <Box key={item._id} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} gap={2} bg={'white'}  p={1} rounded={'lg'} border={'1px solid'}  borderColor={'gray.200'}>
                              <Box bg={'white'} p={1} rounded={'lg'}>
                                <Image src={item?.image?.[0]} alt={item?.name} border={2} borderColor={'pink.500'} width={{md: '70px', base: '80px'}} rounded={'lg'}/>
                              </Box>
                              <Text fontSize={'sm'} color={'gray.600'} isTruncated width={'full'}>{item?.name}</Text>
                              <Flex fontSize={'13px'} justifyContent={'space-between'} alignItems={'center'} width={'full'} gap={1}>
                                <Text roundedTopLeft={'md'} fontWeight={'bold'} bg={'white'} px={2} fontSize={'12px'} color={'gray.600'} display={'flex'} alignItems={'center'} gap={1}>
                                  <span className="text-pink-500">QTY:</span> {item?.quantity}
                                </Text>
                                
                                <Text roundedTopLeft={'md'} fontWeight={'bold'} bg={'white'} px={2} fontSize={'12px'} color={'gray.600'} display={'flex'} alignItems={'center'} gap={1}>
                                  <span className="text-pink-500">Price:</span> <FaNairaSign className='text-[10px]'/>{item?.price.toLocaleString()}
                                </Text>

                                <Text roundedTopLeft={'md'} fontWeight={'bold'} bg={'white'} px={2} fontSize={'12px'} color={'gray.600'} display={'flex'} alignItems={'center'} gap={1}>
                                  <span className="text-pink-500">Size:</span> {item?.selectedSize}
                                </Text>
                              </Flex>
                            </Box>
                          )
                        }
                      ) )
                    }
                  </SimpleGrid>
                  <Flex justifyContent={'center'} alignItems={'center'} pt={3} color={'pink.500'} fontWeight={'500'}>
                    <Link to={'/view-carts'}>Modify Cart</Link>
                  </Flex>
                </Box>

                {/* Payment Method */}
                <Box bg={"white"} p={4} rounded={"lg"} pos={"relative"} mt={5}>
                  <Flex alignItems={"center"} gap={2}>
                    <Box className='animate-pulse' bg={"pink.300"} w={4} h={4} rounded={"full"} display={"flex"} justifyContent={"center"} alignItems={"center"}></Box>
                    <Heading as={"h3"} fontSize={"md"} fontWeight={600} color={"gray.600"}>
                      3. PAYMENT METHOD
                    </Heading>
                  </Flex>

                  {/* Radio buttons for payment methods */}
                  {paymentMethods.map((method) => (
                    <Box key={method.id} mt={3} px={3} py={2} bg={selectedMethod === method.id ? "pink.100" : "gray.100"} rounded="md" border={selectedMethod === method.id ? "1px solid" : "1px solid transparent"} borderColor={selectedMethod === method.id ? "pink.200" : "gray.200"} cursor="pointer" onClick={() => handlePaymentChange(method.id)}>
                      <label style={{ display: "block", marginBottom: "10px" }}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={selectedMethod === method.id}
                          onChange={() => handlePaymentChange(method.id)}
                          className='mr-2'
                        />
                        <strong className='font-semibold'>{method.name}</strong> <br /><span className="text-sm text-gray-600">{method.description}</span>
                      </label>
                    </Box>
                  ))}

                  {/* Footer link */}
                  <Box mt={3} px={3} textAlign={'center'}>
                    <Text color={"pink.400"} textDecor={"underline"}>
                      <Link to={"/fashion"}>Go back & continue shopping</Link>
                    </Text>
                  </Box>

                  {/* Change button */}
                  {/* <Button onClick={handleEditCustomerAddress} position={"absolute"} top={2} right={2} bg={"transparent"} fontSize={"sm"} color={"gray.500"}>
                    Change <FaArrowRight />
                  </Button> */}
                </Box>
                
                {/* Pick-up Station Address */}

              </Box>

              {/* ORDER TABLE SECTION */}
              <Box w={{md: '350px', base: 'full'}} h={{md: '300px', base: 'full'}} bg="white" rounded="md" p={4}>
                <Box maxW="90vw" mx="auto" overflowX="auto">
                  <Heading fontSize={'md'} color={'gray.600'}>Order Summary</Heading>
                  <Box borderBottom={'1px solid'} borderColor={'gray.300'} pb={3}>
                    <Flex justifyContent={'space-between'} alignItems={'center'}>
                      <Text>Item's total ({item?.quantity})</Text>
                      <Text display={'flex'} alignItems={'center'} gap={1} fontWeight={600}>
                        <FaNairaSign style={{ fontSize: '14px' }} />
                        {total.toLocaleString()}.00
                      </Text>
                    </Flex>
                    <Flex justifyContent={'space-between'} alignItems={'center'} pt={5}>
                      <Text>Delivery fees</Text>
                      <Text></Text>
                    </Flex>
                  </Box>

                  <Flex justifyContent={'space-between'} alignItems={'center'} py={3}>
                    <Text fontSize="xl" fontWeight="medium">Grand Total</Text>
                    <Flex justify="flex-end" align="center" px={2} fontWeight={600}>
                      <FaNairaSign style={{ fontSize: '14px' }} />
                      {total.toLocaleString()}.00
                    </Flex>
                  </Flex>

                  <Box borderTop={'1px solid'} borderColor={'gray.300'} pt={2}>
                    <Flex alignItems={'cente'} gap={4}>
                      <Text color={'pink.500'}>
                        <FaBookmark/>
                      </Text>
                      <Text fontSize={'sm'} color={'gray.500'}>You will be able to add a voucher when selecting yout payment method.</Text>
                    </Flex>
                  </Box>
                  {
                    error && (
                      <Box my={2} p={2} bg={'red.500'} color={'white'} fontSize={'14px'} textAlign={'center'} rounded={'md'}>
                        {error}
                      </Box>
                    )
                  }
                  <Flex justify="flex-end" p={3}>
                    <Button bg="pink.600" onClick={handleOrder} _hover={{ bg: 'pink.800' }} color="white" py={3} px={4} w={'full'} rounded="md" transition="background-color 0.2s" isLoading={loading} loadingText="Placing Order..." >
                      Confirm Order
                    </Button>
                  </Flex>

                  <Text color={'gray.500'} fontSize={'13px'} textAlign={'center'} pt={2}>By proceeding, you are automatically accepted our <Link to={'/'}>Terms & Conditions</Link></Text>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-medium mb-4">Order Successful</h2>
            <p className="text-sm mb-4 leading-8 font-medium">
              {success}. <br /> Click to <Link to={'/payment'} className="text-blue-600 underline">Proceed to Payment</Link>
              <br /> If paying on delivery click the close button
            </p>
            <p className="text-blue-800 font-medium underline pb-4"><Link to={'/cart'}>Continue shopping</Link></p>
            <div className="flex justify-between items-center">
              <button onClick={closeModal}
                className="py-2 px-4 font-medium bg-blue-900 text-white rounded-md hover:bg-blue-800">
                Close
              </button>
              {/* <button onClick={cancelOrder} className='bg-blue-900 text-white px-5 py-2 rounded-md font-medium'>Cancel order</button> */}
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </Box>
  );
}
