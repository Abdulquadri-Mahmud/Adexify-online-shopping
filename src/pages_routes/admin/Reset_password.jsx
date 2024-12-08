import { useParams } from 'react-router-dom'
import { Box, Flex, Heading, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { MdOutlineShoppingCart, MdRemoveRedEye } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { RiLockPasswordFill } from 'react-icons/ri'
import Header from '../../components/Header'

export default function Reset_password() {
    const { token } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState([]);
    const [success, setSuccess] = useState(false);

    const getLockPassIcon = useRef(null);
    const getLockPassIcon2 = useRef(null);
    const password = useRef(null);
    const confirmPassword = useRef(null);
    const email = useRef(null);

    const toast = useToast();

    let navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id] : e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (password.current.value === '' || password.current.value === null) {
                toast({
                  description: 'Password is Required!',
                  duration: 5000,
                  isClosable: true,
                  status: 'error',
                });
                setLoading(false);
                return;
            }

            if (confirmPassword.current.value === '' || confirmPassword.current.value === null) {
                toast({
                  description: 'Confirm Password is Required!',
                  duration: 5000,
                  isClosable: true,
                  status: 'error',
                });
                setLoading(false);
                return;
            }
            if (password.current.value !== confirmPassword.current.value) {
                toast({
                  description: 'Password not matched!',
                  duration: 5000,
                  isClosable: true,
                  status: 'error',
                });
                setLoading(false);
                return;
            }

            const end_point = `https://adexify-api.vercel.app/api/admin/auth/reset-password/${token}`;

            const res = await fetch(end_point, {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (data.success === false) {
                toast({
                    description: data.message,
                    duration: 9000,
                    isClosable: true,
                    status: 'error',
                });
                setLoading(false);
                return;
            }

            setLoading(false);
            setError(false);            
            navigate('/admin-login');

        } catch (error) {
            toast({
                description: error,
                duration: 5000,
                isClosable: true,
                status: 'error',
            });
            setLoading(false)
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
    const handlePassword2 = () => {
        let currentPassword = confirmPassword.current.type;
        let passIcon = getLockPassIcon2.current;

        if (currentPassword === 'password') {
            confirmPassword.current.type = 'text';
            if (confirmPassword.current.type === 'text') {
                passIcon.innerHTML = `
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path>
                    </svg>`
            }
        }
        if (currentPassword === 'text') {
            confirmPassword.current.type = 'password';
            if (confirmPassword.current.type === 'password') {
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
        <Box py={20} className='bg-zinc-100'>
            <Box maxW={'350px'} mx={'auto'} py={5} px={3} bg={'white'} rounded={'md'}>
                <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'} gap={1}>
                    <div className="flex items-center justify-center gap-1 bg-pink-200 py-1 px-2 rounded-xl w-[130px]">
                        <Heading fontSize={13} fontFamily={'revert'} className='font-medium uppercase'>Ade<span className="text-pink-600">X</span>ify <span className="black">Now</span></Heading>
                        <MdOutlineShoppingCart className='text-[15px] text-pink-600'/>
                    </div>
                    <Heading textAlign={'center'} fontSize={25} fontWeight={500}>Reset Password?</Heading>
                </Flex>
                <Text fontSize={'12'} color={'gray.400'} textAlign={'center'} mt={2}>Enter your new password</Text>
                <form onSubmit={handleSubmit} className='mt-6'>
                    <Box position={'relative'}>
                        <input type="password" ref={password} onChange={handleChange} className='py-2 w-full px-3 rounded-md placeholder:text-sm bg-zinc-200 pl-8 outline-none' placeholder='Password'/>
                        <Box className="absolute top-3 left-3">
                            <RiLockPasswordFill/>
                        </Box>  
                        <Box className="absolute top-3 right-3">
                            <button type='button' className='outline-none border-none' onClick={handlePassword} ref={getLockPassIcon}><MdRemoveRedEye/></button>
                        </Box>  
                    </Box>
                    <Box mt={5} position={'relative'}>
                        <input type="password" id='password' ref={confirmPassword} onChange={handleChange} className='py-2 w-full px-3 rounded-md placeholder:text-sm bg-zinc-200 pl-8 outline-none' placeholder='Confirm password'/>
                        <Box className="absolute top-3 left-3">
                            <RiLockPasswordFill/>
                        </Box>  
                        <Box className="absolute top-3 right-3">
                            <button type='button' className='outline-none border-none' onClick={handlePassword2} ref={getLockPassIcon2}><MdRemoveRedEye/></button>
                        </Box>    
                    </Box>
                    <Box mt={5}>
                        <button type='submit' className='uppercase font-medium w-full py-2 bg-pink-600 text-white text-[17px] rounded-md'>
                        {
                            loading ? (
                                <Flex justifyContent={'center'} alignItems={'center'} gap={2}>
                                    <Spinner color='white' />
                                    <Text color={'white'}>Loading...</Text>
                                </Flex>
                            ) : 'Continue'
                        }
                    </button>
                    </Box>
                </form>
                <Flex justifyContent={'center'} mt={2}>
                    <Link to={'/admin-login'} className='text-pink-600 text-[13px] pt-3 text-center'>Back To Admin Login</Link>
                </Flex>
            </Box>
        </Box>
    </Box>
  )
}
