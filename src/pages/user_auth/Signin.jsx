import { Box, Button, Flex, Heading, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { FaSmileBeam } from 'react-icons/fa'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdRemoveRedEye } from "react-icons/md";
import { IoEyeOff } from "react-icons/io5";

import {
    Alert,
    AlertIcon,
    AlertDescription,
} from '@chakra-ui/react'

import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signinFailure, signinStart, signinSuccess } from '../../store/userReducers';
import Header from '../../components/Header';

export default function Signin() {

    const getLockPassIcon = useRef(null);
    const password = useRef(null);
    const email = useRef(null);

    const [formData, setFormData] = useState({});

    const {loading, error} = useSelector((state) => state.user);

    let navigate = useNavigate();
    let dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id] : e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(signinStart());
            
            if (email.current.value === '' || email.current.value === null) {
                dispatch(signinFailure('Email is Required!'));
                return;
            }
            if (password.current.value === '' || password.current.value === null) {
                dispatch(signinFailure('Password is Required!'));
                return;
            }

            const signin_api = 'https://adexify-api.vercel.app/api/user/auth/signin';
    
            const res = await fetch('https://adexify-api.vercel.app/api/user/auth/signin', {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify(formData),
            });
    
            const data = await res.json();
    
            if (data.success === false) {
                dispatch(signinFailure(data.message));
                return;
            }

            dispatch(signinSuccess(data));
            navigate('/');
            
        } catch (error) {
            console.log(error);
            dispatch(signinFailure(error));
        }
    }

    const handlePassword = () => {
        let currentPassword = password.current.type;
        let passIcon = getLockPassIcon.current;

        if (currentPassword === 'password') {
            password.current.type = 'text';
            if (password.current.type === 'text') {
                passIcon.innerHTML = `
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path>
                    </svg>`
            }
        }
        if (currentPassword === 'text') {
            password.current.type = 'password';
            if (password.current.type === 'password') {
                passIcon.innerHTML = `
                     <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"></path>
                    </svg>`
            }
        }
    }
    
  return (
    <Box>
      <Header/>
        <Box className='bg-zinc-100 md:py-10 pt-6 pb-20 flex justify-center items-center px-2'>
            <Box bg={'white'} px={3} py={6} rounded={'md'} maxW={{md: '50%',base:'100%'}} mx={'auto'} className="flex-1 w-full xl:mt-0 mt-5 xl:px-5">
                <Box className="flex items-center justify-center mx-auto bg-pink-200 py-1 px-2 rounded-2xl w-[140px]">
                    <MdOutlineShoppingCart className='md:text-xl animate text-pink-600'/>
                    <h1 className='md:text-xl font-medium uppercase'>Ade<span className="text-pink-600">X</span>ify</h1>
                </Box>
                <Box className="mt-5">
                    <Heading textAlign={'center'} fontWeight={500} fontSize={{md:30, base: 25}}>Welcome Back</Heading>
                    <p className='text-center text-gray-400 text-sm mt-1'>We are here to save your time and money</p>
                </Box>
                <form className='flex w-full flex-col gap-5 mt-5' onSubmit={handleSubmit}>
                    <Box className="relative">
                        <input onChange={handleChange} type="email" id='email' ref={email} className='placeholder:text-gray-400 outline-none border-none font-medium bg-slate-200 w-full p-3 rounded-lg pl-10' placeholder='Example@gmail.com' />
                        <Box className="absolute top-4 left-3">
                            <MdEmail/>
                        </Box>                    
                    </Box>
                    <Box className="relative">
                        <input onChange={handleChange} type="password" id='password' ref={password} className='placeholder:text-gray-400 outline-none border-none font-medium bg-slate-200 w-full p-3 rounded-lg pl-10' placeholder='Enter Your Password' />
                        <Box className="absolute top-4 left-3">
                            <RiLockPasswordFill/>
                        </Box>                    
                        <Box className="absolute top-4 right-3">
                            <button type='button' className='outline-none border-none' onClick={handlePassword} ref={getLockPassIcon}><MdRemoveRedEye/></button>
                        </Box>                    
                    </Box>
                    <Box>
                        {
                            error && (
                                <>
                                    <Alert status='error' rounded={'8px'}>
                                        <AlertIcon />
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                </>
                            )
                        }
                    </Box>
                    <Box className="mx-auto w-full">
                        <button className='bg-slate-800 text-white w-full py-3 rounded-lg font-medium uppercase'>
                        {
                            loading ? (
                                <Flex justifyContent={'center'} alignItems={'center'} gap={2}>
                                    <Spinner color='pink.600' />
                                    <Text color={'pink.600'}>Loading...</Text>
                                </Flex>
                            ) : 'Login'
                        }
                        </button>
                    </Box>
                    <Box className="flex justify-center items-center">
                        <p className="w-[100px] p-[1px] bg-pink-300"></p>
                        <p className="text-gray-400 text-sm">Or Login With</p>
                        <p className="w-[100px] p-[1px] bg-pink-300"></p>
                    </Box>
                    <Box className="mx-auto w-full">
                        <button className='bg-slate-800 text-white w-full py-3 rounded-lg flex items-center justify-center gap-2 font-medium'><FaGoogle className='text-red-500'/> Google</button>
                    </Box>
                    <Box className="flex justify-start items-center gap-1 text-gray-400">
                        <p className='text-sm'>Don't have an account?</p>
                        <Link to={'/signup'} className='text-red-500 font-medium'>Signup</Link>
                    </Box>
                </form>
                <Flex mt={1} justifyContent={'start'} width={'full'}>
                    <Link to={'/forgot-password'} className='text-red-500 text-sm underline'>Forgot Your Password?</Link>
                </Flex>
            </Box>
        </Box>
    </Box>
  )
}
