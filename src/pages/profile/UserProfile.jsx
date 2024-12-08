import { Alert, AlertDescription, AlertIcon, Box, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { PiGreaterThan } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { IoBagHandle } from 'react-icons/io5';
import { FiUserX } from 'react-icons/fi';
import { updateFailure, updateStart, updateSuccess } from '../../store/userReducers';
import Header from '../../components/Header';
import Footer from '../../components/footer/Footer';

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

      <Box pb={'4vh'} className='bg-zinc-200'>
          <Box maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'} className=" p-2">
              <Box className="flex gap-1 items-center">
              <Link to={'/'} className='text-[13px]'>Home</Link>
              <PiGreaterThan className='text-[13px] pt-1'/>
              <Link to={'/view-carts'} className='text-[13px]'>cart page</Link>
              <PiGreaterThan className='text-[13px] pt-1'/>
              <Link to={'/view-wishlist'} className='text-[13px]'>My wishlist</Link>
              <PiGreaterThan className='text-[13px] pt-1'/>
              <Link to={`/profile/${currentUser._id}`} className='text-[13px]'>Account Information</Link>
              </Box>
          </Box>
          <Flex justifyContent={'center'} flexWrap={'wrap'} p={{md: 5, base:0}} gap={5} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={{md:'auto', base: 3}}>
              <Box display={{md: 'block', base: 'none'}} width={{md: '300px', base: '100%'}} bg={'white'} p={{md: 5, base: 3}} rounded={10}>
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
                      <Flex justifyContent={'center'} my={3}>
                          <button type='submit' className='w-full py-2 bg-pink-600 text-white uppercase font-medium rounded-md'>
                            {
                              loading ? 'Loading...' : 'Save Changes'
                            }
                          </button>
                      </Flex>
                  </form>
              </Box>
          </Flex>
      </Box>
      <Footer/>
    </Box>
  )
}
