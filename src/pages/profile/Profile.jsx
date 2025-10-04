import { Alert, AlertDescription, AlertIcon, Box, Button, Flex, Heading, Image, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FiUserX } from "react-icons/fi";
import { IoBagHandle } from "react-icons/io5";
import { PiGreaterThan } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useApi } from "../../Context_APIs/ApiContext";
import Header from "../../components/Header";
import Footer from "../../components/footer/Footer";


import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { useUserQuery } from '../../hooks/GetUserQuery';
import UserLogout from "../../pages_routes/user/UserLogout";
import { updateFailure, updateStart, updateSuccess } from "../../store/userReducers";

function UserMenu() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  return (
    <div className="">
        <Button bg={'pink.100'} rounded={'full'} color={'gray.800'} _hover={{ bg: 'transparent' }} onClick={onOpen} px={0} className="flex items-center flex-col md:flex-row cursor-pointer md:hover:text-black hover:text-pink-600">
            <HiOutlineMenuAlt2 className='text-xl' />
        </Button>
        <Drawer isOpen={isOpen} placement='left' initialFocusRef={firstField} onClose={onClose} size={'md'}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton top={3} />
              <DrawerHeader borderBottomWidth={{ md: '0px', base: '1px' }}>
                  <Box className='flex justify-between items-center text-black'>
                      <Link to={'/'} className='bg-white rounded-md flex items-center gap-2'>
                          <Image src='/Logo.png' alt='logo' w={'100px'}/>
                      </Link>
                  </Box>
              </DrawerHeader>
              <DrawerBody>
                <Flex gap={2} mt={6} width={'full'}>
                  <Box>
                    <FaRegUserCircle className='text-xl text-pink-600'/>
                  </Box>
                  <Box width={'full'}>
                    <Heading fontWeight={500} fontSize={18}>My Profile</Heading>
                    <Box my={2} ml={3} p={2} rounded={'md'} bg={'pink.50'} _hover={{bg: 'pink.200'}} transitionDuration={'0.3s'} width={'full'}>
                      <Link to={'/profile'} fontWeight={500} py={2} color={'red.500'}>Account Information</Link>
                    </Box>
                    <Box my={2} ml={3} p={2} rounded={'md'} bg={'pink.50'} _hover={{bg: 'pink.200'}} transitionDuration={'0.3s'} width={'full'}>
                      <Link to={'/address'} fontWeight={500} color={'gray.600'} fontSize={15}>Delivery Address</Link>
                    </Box>
                  </Box>
                  </Flex>
                  <Flex gap={2} mt={10}>
                    <Box>
                      <IoBagHandle className='text-xl text-pink-600'/>
                    </Box>
                    <Box width={'full'}>
                      <Heading fontWeight={500} fontSize={18}>My Order</Heading>
                      <Box my={2} ml={3} p={2} rounded={'md'} bg={'pink.50'} _hover={{bg: 'pink.200'}} transitionDuration={'0.3s'} width={'full'}>
                        <Link to={'/'} fontWeight={500} py={2} color={'red.500'}>Order History</Link>
                      </Box>
                      <Box my={2} ml={3} p={2} rounded={'md'} bg={'pink.50'} _hover={{bg: 'pink.200'}} transitionDuration={'0.3s'} width={'full'}>
                        <Link to={'/'} fontWeight={500} color={'gray.600'} fontSize={15}>Pending Rating</Link>
                      </Box>
                    </Box>
                  </Flex>
                  <Flex gap={2} mt={10}>
                    <Box>
                      <FiUserX className='text-xl text-pink-600'/>
                    </Box>
                    <Box width={'full'}>
                      <Heading fontWeight={500} fontSize={18}>Delete Account</Heading>
                      <Box my={2} ml={3} p={2} rounded={'md'} bg={'pink.50'} _hover={{bg: 'pink.200'}} transitionDuration={'0.3s'} width={'full'}>
                        <Link to={'/'} fontWeight={500} color={'gray.600'} fontSize={15}>Delete Account</Link>
                      </Box>
                    </Box>
                  </Flex>
                </DrawerBody>
              <DrawerFooter borderTopWidth='1px'></DrawerFooter>
            </DrawerContent>
        </Drawer>
    </div>
  );
}

export default function Profile() {
    const {baseUrl} = useApi();
    const { currentUser } = useSelector((state) => state.user);
    const [updateError, setUpdateError] = useState(false);
    const [loading, setLoading] = useState(false);
    const userId = currentUser?._id;

    const { data, isLoading, isError, error } = useUserQuery(userId);

    const user = data?.user;

    useEffect(() => {
        if (user && !isLoading) {
            setUpdateInfo({
                firstname: user.firstname || "",
                lastname: user.lastname || "",
                email: user.email || "",
                phone: user.phone || "",
                password: ""
            });
        }
    }, [user]);

    const [updateInfo, setUpdateInfo] = useState({
        firstname: user?.firstname || '',
        lastname : user?.lastname || '',
        email: user?.email || '',
        phone: user?.phone || '',
        password: ''
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setUpdateInfo({
        ...updateInfo,
        [e.target.id] : e.target.value
        });
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateStart());
            setLoading(true);
            
            const res = await fetch(`${baseUrl}/api/user/auth/update?userId=${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateInfo),
            });

            const data = await res.json();
            
            console.log(data);
            
            if (!res.ok) {
                throw new Error(data.message || "Failed to update user");
            }

            // ✅ update redux state
            dispatch(updateSuccess(data));

            // ✅ also update local form state so UI refreshes immediately
            setUpdateInfo({
                firstname: data.firstname || "",
                lastname: data.lastname || "",
                email: data.email || "",
                phone: data.phone || "",
                password: "", // reset password field
            });

            setUpdateError(false);
        } catch (error) {
            dispatch(updateFailure(error.message));
            setUpdateError(error.message);
        } finally {
            setLoading(false);
        }
        };


  return (
    <Box>
      <Header/>

      <Box pb={'4vh'} className='bg-zinc-200' pt={2}>
          <Flex justifyContent={'space-between'} bg={'white'} rounded={'md'} py={3} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} className=" p-2">
              <Box className="flex gap-1 items-center">
                <Link to={'/'} className='text-[13px]'>Home</Link>
                <PiGreaterThan className='text-[13px] pt-1'/>
                <Link to={`/profile/${currentUser._id}`} className='text-[13px]'>Account Information</Link>
              </Box>
              <Box display={{md: 'none', base: 'block'}}>
                <UserMenu/>
              </Box>
          </Flex>

          {
            isError ? (
                <Box textAlign={'center'} mt={10}>
                    <Heading fontSize={20} color={'red.500'}>Error: {error.message}</Heading>
                </Box>
            ) : (
            <Flex justifyContent={'center'} mt={{md: 0, base: 2}} flexWrap={'wrap'} py={{md: 5, base:0}} gap={5} maxW={{'2xl' : '80%', xl : '95%', lg : '97%', base: '100%'}} mx={{md:'auto', base: 2}}>
                <Box display={{md: 'block', base: 'none'}} width={{md: '350px', base: '100%'}} bg={'white'} p={{md: 5, base: 3}} rounded={10}>
                    <Flex gap={2}>
                        <Box>
                        <FaRegUserCircle className='text-xl text-pink-600'/>
                        </Box>
                        <Box>
                        <Heading fontWeight={500} fontSize={18}>My Profile</Heading>
                        <Box my={2}>
                            <Link to={'/'} fontWeight={500} py={2} color={'red.500'}>Account Information</Link>
                        </Box>
                        <Box my={2}>
                            <Link to={'/'} fontWeight={500} color={'gray.600'} fontSize={15}>Delivery Address</Link>
                        </Box>
                        </Box>
                    </Flex>
                    <Flex gap={2} mt={10}>
                        <Box>
                        <IoBagHandle className='text-xl text-pink-600'/>
                        </Box>
                        <Box>
                        <Heading fontWeight={500} fontSize={18}>My Order</Heading>
                        <Box my={2}>
                            <Link to={'/'} fontWeight={500} py={2} color={'red.500'}>Order History</Link>
                        </Box>
                        <Box my={2}>
                            <Link to={'/'} fontWeight={500} color={'gray.600'} fontSize={15}>Pending Rating</Link>
                        </Box>
                        </Box>
                    </Flex>
                    <Flex gap={2} mt={10}>
                        <Box>
                        <FiUserX className='text-xl text-pink-600'/>
                        </Box>
                        <Box>
                        <Heading fontWeight={500} fontSize={18}>Delete Account</Heading>
                        <Box my={2}>
                            <Link to={'/'} fontWeight={500} color={'gray.600'} fontSize={15}>Delete Account</Link>
                        </Box>
                        </Box>
                    </Flex>
                </Box>
                <Box flex={1} mt={{md: 0, base: ''}} bg={'white'} p={{md: 5, base: 3}} rounded={10}>
                    <Box pb={2}>
                        <Heading fontSize={20} color={'gray.700'} fontWeight={500}>Account Information</Heading>
                    </Box>
                    <form className='mt-3' onSubmit={handleSubmit}>
                        <SimpleGrid spacing={3} mb={3} gap={1} columns={{md: 2, base: 2}}>
                        <Box width={'full'} mb={2}>
                            <p className='text-sm text-gray-607 font-medium pb-2'>First Name:</p>
                            <input onChange={handleChange} id='firstname' type="text"
                                className={`${isLoading ? 'bg-zinc-100 animate-pulse' : 'bg-gray-50'} p-3 border border-gray-200 text-gray-500 placeholder:text-sm outline-none w-full rounded-md text-sm`}
                                defaultValue={isLoading ? '' : updateInfo?.firstname}/>
                        </Box>
                        <Box width={'full'} mb={2}>
                            <p className='text-sm text-gray-700 font-medium pb-2'>Last Name:</p>
                            <input onChange={handleChange} id='lastname' type="text"
                                className={`${isLoading ? 'bg-zinc-100 animate-pulse' : 'bg-gray-50'} p-3 border border-gray-200 text-gray-500 placeholder:text-sm outline-none w-full rounded-md text-sm`}
                                defaultValue={isLoading ? '' : updateInfo?.lastname}/>
                        </Box>
                        </SimpleGrid>
                        <Box width={'full'} mb={2}>
                            <p className='text-sm text-gray-700 font-medium pb-2'>Email Address:</p>
                            <input onChange={handleChange} id='email' type="email"
                                className={`${isLoading ? 'bg-zinc-100 animate-pulse' : 'bg-gray-50'} p-3 border border-gray-200 text-gray-500 placeholder:text-sm outline-none w-full rounded-md text-sm`}
                                defaultValue={isLoading ? '' : updateInfo?.email}/>
                        </Box>
                        <Box width={'full'} mb={2}>
                            <p className='text-sm text-gray-700 font-medium pb-2'>Email Address:</p>
                            <input onChange={handleChange} id='phone' type="text"
                                className={`${isLoading ? 'bg-zinc-100 animate-pulse' : 'bg-gray-50'} p-3 border border-gray-200 text-gray-500 placeholder:text-sm outline-none w-full rounded-md text-sm`}
                                defaultValue={isLoading ? '' : updateInfo?.phone}/>
                        </Box>
                        <Box width={'full'} mt={2} mb={3}>
                            <p className='text-sm text-gray-700 font-medium pb-2'>Password:</p>
                            <input onChange={handleChange} id='password' type="password" placeholder="Enter new password to change"
                                className={`${isLoading ? 'bg-zinc-100 animate-pulse' : 'bg-gray-50'} p-3 border border-gray-200 text-gray-500 placeholder:text-sm outline-none w-full rounded-md text-sm`}
                                />
                        </Box>
                        <Box>
                            {
                                updateError && (
                                    <>
                                    <Alert status='error' rounded={'8px'}>
                                        <AlertIcon />
                                        <AlertDescription>{updateError}</AlertDescription>
                                    </Alert>
                                    </>
                                )
                            }
                        </Box>
                        <Flex justifyContent={'space-between'} my={3}>
                            <button type='submit' className='px-4 py-2 bg-green-500 text-white uppercase font-medium rounded-md'>
                                {
                                    loading ? 'Updating...' : 'Save Changes'
                                }
                            </button>
                            <UserLogout/>
                        </Flex>
                    </form>
                </Box>
            </Flex>
            )
          }
      </Box>
      <Footer/>
    </Box>
  )
}
