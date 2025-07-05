import { Alert, AlertDescription, AlertIcon, Box, Button, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { PiGreaterThan } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { IoBagHandle } from 'react-icons/io5';
import { FiUserX } from 'react-icons/fi';
import { updateFailure, updateStart, updateSuccess } from '../../store/userReducers';
import Header from '../../components/Header';
import Footer from '../../components/footer/Footer';
import UserLogout from '../../pages_routes/user/UserLogout';

import {Image } from '@chakra-ui/react';
import { IoCallOutline, } from 'react-icons/io5';
import { FaHandSparkles } from 'react-icons/fa';

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
                          <Image src='/Logo.png' alt='logo' w={'150px'}/>
                      </Link>
                  </Box>
              </DrawerHeader>
              <DrawerBody>
                <Flex gap={2} mt={12} width={'full'}>
                  <Box>
                    <FaRegUserCircle className='text-xl text-pink-600'/>
                  </Box>
                  <Box width={'full'}>
                    <Heading fontWeight={500} fontSize={18}>My Profile</Heading>
                    <Box my={2} ml={3} p={2} rounded={'md'} bg={'pink.50'} _hover={{bg: 'pink.200'}} transitionDuration={'0.3s'} width={'full'}>
                      <Link to={'/'} fontWeight={500} py={2} color={'red.500'}>Account Information</Link>
                    </Box>
                    <Box my={2} ml={3} p={2} rounded={'md'} bg={'pink.50'} _hover={{bg: 'pink.200'}} transitionDuration={'0.3s'} width={'full'}>
                      <Link to={'/'} fontWeight={500} color={'gray.600'} fontSize={15}>Delivery Address</Link>
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


export default function UserProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [updateError, setUpdateError] = useState(false);

  const dispatch = useDispatch();

  const { userID } = useParams();

  const [updateInfo, setUpdateInfo] = useState({});

  const handleChange = (e) => {
    setUpdateInfo({
      ...updateInfo,
      [e.target.id] : e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateStart());

      const res = await fetch(`https://adexify-api.vercel.app/api/user/auth/update/${userID}`, {
        method : 'PATCH',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(updateInfo),
      });

      const data = await res.json();
      dispatch(updateSuccess(data));

    } catch (error) {
      dispatch(updateFailure(error));
      setUpdateError(error);
    }
  }

  return (
    <Box>
      <Header/>

      <Box pb={'4vh'} className='bg-zinc-200' pt={5}>
          <Flex justifyContent={'space-between'} bg={'white'} rounded={'md'} py={3} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} className=" p-2">
              <Box className="flex gap-1 items-center">
                <Link to={'/'} className='text-[13px]'>Home</Link>
                <PiGreaterThan className='text-[13px] pt-1'/>
                <Link to={'/view-carts'} className='text-[13px]'>cart page</Link>
                <PiGreaterThan className='text-[13px] pt-1'/>
                <Link to={'/view-wishlist'} className='text-[13px]'>My wishlist</Link>
                <PiGreaterThan className='text-[13px] pt-1'/>
                <Link to={`/profile/${currentUser._id}`} className='text-[13px]'>Account Information</Link>
              </Box>
              <Box display={{md: 'none', base: 'block'}}>
                <UserMenu/>
              </Box>
          </Flex>
          <Flex justifyContent={'center'} mt={{md: 0, base: 5}} flexWrap={'wrap'} py={{md: 5, base:0}} gap={5} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={{md:'auto', base: 3}}>
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
                    <Heading fontSize={20}>Account Information</Heading>
                  </Box>
                  <form className='mt-6' onSubmit={handleSubmit}>
                      <Box width={'full'} mb={3}>
                        <p className='text-gray-600 font-medium pb-2'>First Name:</p>
                          <input onChange={handleChange} id='firstname' type="text" className='p-3 border-2 border-gray-200 placeholder:text-sm outline-none w-full rounded-md text-sm' defaultValue={currentUser.firstname}/>
                      </Box>
                      <Box width={'full'} mb={3}>
                          <p className='text-gray-600 font-medium pb-2'>Last Name:</p>
                          <input onChange={handleChange} id='lastname' type="text" className='p-3 border-2 border-gray-200 placeholder:text-sm outline-none w-full rounded-md text-sm' defaultValue={currentUser.lastname}/>
                      </Box>
                      <Box width={'full'} mb={3}>
                          <p className='text-gray-600 font-medium pb-2'>Email Address:</p>
                          <input onChange={handleChange} id='email' type="email" className='p-3 border-2 border-gray-200 placeholder:text-sm outline-none w-full rounded-md text-sm' defaultValue={currentUser.email}/>
                      </Box>
                      <Box width={'full'} mt={5} mb={3}>
                          <p className='text-gray-600 font-medium pb-2'>Address:</p>
                          <input onChange={handleChange} id='address' type="text" className='p-3 border-2 border-gray-200 placeholder:text-sm outline-none w-full rounded-md text-sm' defaultValue={currentUser.address}/>
                      </Box>
                      <Box width={'full'} mt={5} mb={3}>
                          <p className='text-gray-600 font-medium pb-2'>Password:</p>
                          <input onChange={handleChange} id='password' type="password" className='p-3 border-2 border-gray-200 placeholder:text-sm outline-none w-full rounded-md text-sm'/>
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
                              loading ? 'Loading...' : 'Save Changes'
                            }
                          </button>
                          <UserLogout/>
                      </Flex>
                  </form>
              </Box>
          </Flex>
      </Box>
      <Footer/>
    </Box>
  )
}
