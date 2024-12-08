import { Box, Flex, Heading, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { FaSmileBeam } from 'react-icons/fa';
import { MdEmail, MdOutlineShoppingCart } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useDispatch,useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { adminSigninFailure, adminSigninStart, adminSigninSuccess } from '../../store/adminReducer';
import Header from '../../components/Header';

export default function Admin_Login() {
  const toast = useToast();

  // const getLockPassIcon = useRef(null);
  const password = useRef(null);
  const email = useRef(null);
  
  const [formData, setFormData] = useState([]);

  const { loading, error } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }  

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      dispatch(adminSigninStart());

      if (email.current.value === '' || email.current.value === null) {
        dispatch(adminSigninFailure('Email is Required!'));
        toast({
          description: 'Email is Required!',
          duration: 5000,
          isClosable: true,
          status: 'error',
        });
        return;
      }
      
      if (password.current.value === '' || password.current.value === null) {
        dispatch(adminSigninFailure('Password is Required!'));
        toast({
          description: 'Password is Required!', duration: 5000, isClosable: true,
          status: 'error',
        });
        return;
      }

      const url = `https://adexify-api.vercel.app/api/admin/auth/admin-login`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(adminSigninFailure(data.message));
        toast({
          description: data.message,
          duration: 5000,
          isClosable: true,
          status: 'error',
        });
        return;
      }

      dispatch(adminSigninSuccess(data));
      navigate('/admin-dashboard');

    } catch (error) {
      dispatch(adminSigninFailure(error));
      toast({
        description: error,
        duration: 5000,
        isClosable: true,
        status: 'error',
      });
    }
  }

  return (
    <Box>
      <Header/>
      <Box py={10} className='bg-zinc-100'>
        <Box maxW={'350px'} mx={'auto'} rounded={'md'} px={3} py={5} bg={'white'}>
          <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
            <div className="flex items-center justify-center gap-1 bg-pink-200 py-1 px-2 rounded-xl w-[130px]">
              <Heading fontSize={13} fontFamily={'revert'} className='font-medium uppercase'>Ade<span className="text-pink-600">X</span>ify <span className="black">Now</span></Heading>
              <MdOutlineShoppingCart className='text-[15px] text-pink-600'/>
            </div>
            <Heading mt={3} textAlign={'center'} fontSize={26} fontWeight={500}>Admin Login</Heading>
            <Text fontSize={12} className='text-gray-400'>Welcome To Adexify Online Store</Text>
          </Flex>
          <Box>
            <form onSubmit={handleSubmit}>
              <Box mb={6} mt={6} className='relative'>
                <Text fontSize={15} fontWeight={500} mb={1}>Email Address</Text>
                <input onChange={handleChange} ref={email} id='email' type="email" placeholder='Email address' className='py-2 w-full px-3 rounded-md placeholder:text-sm hover:outline-1 hover:outline-slate-200 focus:outline-1 focus:outline-slate-200 border-b-slate-300 border-b'/>
                <Box className="absolute top-12 right-2">
                  <MdEmail/>
                </Box> 
              </Box>
              <Box mb={6} className='relative'>
              <Text fontSize={15} fontWeight={500} mb={1}>Password</Text>
                <input onChange={handleChange} ref={password}  id='password' type="password" placeholder='Password' className='py-2 w-full px-3 rounded-md placeholder:text-sm hover:outline-1 hover:outline-slate-200 focus:outline-1 focus:outline-slate-200 border-b-slate-300 border-b'/>
                <Box className="absolute top-12 right-2">
                  <RiLockPasswordFill/>
                </Box>    
              </Box>
              <Flex justifyContent={'center'} my={5} width={'full'}>
                <Link to={'/admin-login/forgot-password'} className='text-sm underline'>Forgot Your Password?</Link>
              </Flex>
              <Box>
                <button type='submit' className='uppercase font-medium w-full py-2 bg-pink-600 text-white text-[17px] rounded-md'>
                  {
                    loading ? (
                      <Flex justifyContent={'center'} alignItems={'center'} gap={2}>
                        <Spinner color='white' />
                        <Text color={'white'}>Loading...</Text>
                      </Flex>
                    ) : 'Login'
                  }
                </button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
