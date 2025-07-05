import React, { useEffect, useState } from 'react';
import { FaBookmark, FaNairaSign } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Box,Button,Container,Flex, Heading, HStack, Image, Text } from '@chakra-ui/react';
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

export default function CheckOutPage() {
  const { items } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [editCustomerAddress, setEditCustomerAddress] = useState(false);
  const [editPickUpStation, setEditPickUpStation] = useState(false);

  const [item, setItem] = useState({});

  let total = 0;

  useEffect(() => {
    items.map((item) => {
      setItem(item)
    })
  },[]);

  // console.log(item);

  const [formData, setFormData] = useState({
    firstname: currentUser?.firstname || '',
    lastname: currentUser?.lastname || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    address: currentUser?.address || '',
    deliveryMethod: 'Standard',
    paymentMethod: 'Cash on Delivery',
    items: items || [],
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

        const url = `https://hardayfunkeh-apis.vercel.app/api/order/create_orders`;

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.success === false) {
            setError(data.message || 'Something went wrong');
            // toast.error(data.message || 'Something went wrong');
            setLoading(false);
            return;
        }

        // Success
        setSuccess(data.message);
        setShowModal(true); // Show modal on success
        //   toast.success('Order created successfully!');
        setError('');
        setLoading(false);
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

  const banks = [
    {
      name: 'Opay',
      logo: 'image',
      accountInfo: {
        name: 'Abdul-Quadri Mahmud',
        acountNumber: 9134831368,
      }
    }
  ]

  return (
    <Box className="bg-zinc-100">
        <Header/>
      <Box maxW={{ base: '100%', xl: '95%', '2xl': '80%' }} mx="auto" my="8">
        <Box>
          <Box border={'1px solid'} borderColor={'gray.200'} bg="white" p={4} mx={{md:0, base: 2}} borderRadius="lg" boxShadow="" mb={6}>
            <Flex justify="space-between" align="center" mb={4}>
              <HStack spacing={1} align="center">
                <Text fontSize="13px" color="gray.500">
                  <Link to="/">Home / </Link>
                </Text>
                <Text fontSize="13px" color="gray.500">
                  <Link to="/cart">My Carts / </Link>
                </Text>
                <Text fontSize="13px" color="gray.500">
                  <Link to="/create-order">Checkout</Link>
                </Text>
              </HStack>
              <Button onClick={handleBack} bg="pink.600" color={'white'}>Back</Button>
            </Flex>
            <Box mt={4}>
              <Heading fontSize={'5xl'} color={'pink.600'}>Checkout</Heading>
            </Box>
          </Box>
          {/* Basic Info */}
          <Box maxW={{'2xl' : '80%', xl : '100%', lg : '100%', base: '97%'}} mx={'auto'} py={2} px={{md:0, base: 0}}>
            <Box mb={2} p={2} bg="pink.600" borderTopRadius="md">
              <Heading as="h2" fontSize="2xl" fontWeight="medium" color="white">
                Basic Information
              </Heading>
            </Box>
            <Flex color={'gray.800'} justify="space-between" gap={3} flexWrap="wrap">
              <Box flex={'1'} minW={'0'}>
                {/* Customer Address */}
                <Box width={'full'} bg={'white'} p={4} rounded={'lg'} pos={'relative'}>
                  <Flex alignItems={'center'} gap={2}>
                    <Box bg={'green.500'} w={6} h={6} rounded={'full'} display={'flex'} justifyContent={'center'} alignItems={'center'}></Box>
                    <Heading as={'h3'} fontSize={'md'} fontWeight={600} color={'gray.600'}>1.CUSTOMER ADDRESS</Heading>
                  </Flex>
                  <Box mt={3} px={3}>
                    <Heading as={'h5'} fontSize={'md'} fontWeight={600} color={'gray.500'}>{currentUser.firstname} {currentUser.lastname}</Heading>
                    <Text pt={3} color={'gray.500'}>{currentUser.address} | {currentUser.phone}</Text>
                  </Box>
                  <Button onClick={handleEditCustomerAddress} position={'absolute'} top={2} right={0} bg={'transparent'} fontSize={'sm'} color={'gray.500'}>Change <FaArrowRight/></Button>
                </Box>
                {/* FORM SECTION */}
                {
                  editCustomerAddress && (
                    <Box position={'fixed'} inset={0} bg={'blackAlpha.700'} zIndex={50} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                      <Box bg={'white'} p={5} rounded={'lg'} maxW={'md'} w={'full'} className="" pos={'relative'}>
                        
                        <form onSubmit={handleCustomerAddressSubmit} style={{ fontWeight: 500, width: '100%', maxWidth: '100%', backgroundColor: 'white', paddingTop: '12px', paddingBottom: '12px', borderBottomLeftRadius: '0.375rem', borderBottomRightRadius: '0.375rem', flexBasis: '55%'}}>
                          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={3} p={3}>
                            <Input onChange={handleChange} defaultValue={formData.firstname} id="firstname" type="text" placeholder="First Name" fontWeight="normal" fontSize="sm" color="gray.500" border="1px solid" borderColor="gray.200" rounded="md" p={2}/>
                            <Input onChange={handleChange} defaultValue={formData.lastname} id="lastname" type="text" placeholder="Last Name" fontWeight="normal" fontSize="sm" color="gray.500" border="1px solid" borderColor="gray.200" rounded="md" p={2}/>
                          </Grid>

                          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={3} p={3}>
                            <Input onChange={handleChange} defaultValue={formData.phone} id="phone" type="text" placeholder="Phone Number" fontWeight="normal" fontSize="sm" color="gray.500" border="1px solid" borderColor="gray.200" rounded="md" p={2}/>
                            <Input onChange={handleChange} defaultValue={formData.email} id="email" type="email" placeholder="Email Address" fontWeight="normal" fontSize="sm" color="gray.500" border="1px solid" borderColor="gray.200" rounded="md" p={2}/>
                          </Grid>
                          <Box p={3}>
                            <Text mb={1}>Full Address</Text>
                            <Textarea id="address" onChange={handleChange} defaultValue={formData.address} placeholder="Full Address" fontWeight="normal" fontSize="sm" color="gray.500" h="80px" border="1px solid" borderColor="gray.200" rounded="md" p={2}/>
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
                    <Box bg={'green.500'} w={6} h={6} rounded={'full'} display={'flex'} justifyContent={'center'} alignItems={'center'}></Box>
                    <Heading as={'h3'} fontSize={'md'} fontWeight={600} color={'gray.600'}>2.PRODUCTS</Heading>
                  </Flex>
                  <Flex alignItems={'center'} gap={3} mt={3} px={3} py={3} bg={'gray.200'} rounded={'lg'} borderBottom={'1px solid'} borderColor={'gray.300'}>
                    <Box bg={'white'} p={1} rounded={'lg'}>
                      <Image src={item.productImage} alt={item.productName} boxSize={50} rounded={'lg'}/>
                    </Box>
                    <Text fontSize={'sm'} color={'gray.600'}>{item.productName}</Text>
                  </Flex>
                  <Flex justifyContent={'center'} alignItems={'center'} pt={3} color={'pink.500'} fontWeight={'500'}>
                    <Link to={'/view-carts'}>Modify Cart</Link>
                  </Flex>
                </Box>

                {/* Payment Method */}
                <Box bg={'white'} p={4} rounded={'lg'} pos={'relative'} mt={5}>
                  <Flex alignItems={'center'} gap={2}>
                    <Box bg={'green.500'} w={6} h={6} rounded={'full'} display={'flex'} justifyContent={'center'} alignItems={'center'}></Box>
                    <Heading as={'h3'} fontSize={'md'} fontWeight={600} color={'gray.600'}>3.PAYMENT METHOD</Heading>
                  </Flex>
                  <Box mt={3} px={3}>
                    <Heading as={'h5'} fontSize={'md'} fontWeight={600} color={'gray.500'}>Opay</Heading>
                    <Text py={3} color={'gray.500'}>To use this option, you must be registered with opay</Text>
                    <Text color={'pink.400'} textDecor={'underline'}><Link to={'/fashion'}>Go back & continue shopping</Link></Text>
                  </Box>
                  <Button onClick={handleEditCustomerAddress} position={'absolute'} top={2} right={0} bg={'transparent'} fontSize={'sm'} color={'gray.500'}>Change <FaArrowRight/></Button>
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
                        {item.productPrice?.toLocaleString()}.00
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
                      {(item?.productPrice * item?.quantity).toLocaleString()}.00
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

                  <Flex justify="flex-end" p={3}>
                    <Button bg="pink.600" _hover={{ bg: 'pink.800' }} color="white" py={3} px={4} w={'full'} rounded="md" transition="background-color 0.2s" isLoading={loading} loadingText="Placing Order..." >
                      <Link to={'/order'}>Confirm Order</Link>
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
