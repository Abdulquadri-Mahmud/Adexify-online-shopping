import { Box, Flex, Heading, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header';

export default function User_forgotten_password() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState([]);
    const [success, setSuccess] = useState(false);

    const toast = useToast();

    let naviate = useNavigate();

    const email = useRef(null);

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

            if (email.current.value === '' || email.current.value === null) {
                toast({
                  description: 'Email is Required!',
                  duration: 5000,
                  isClosable: true,
                  status: 'error',
                });
                setLoading(false);
                return;
            }

            const end_point = 'https://adexify-api.vercel.app/api/user/auth/forgot-password';

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
            setSuccess(data);
            toast({
                description: data,
                duration: 8000,
                isClosable: true,
                status: 'success',
            });
            setLoading(false);
            setError(false);

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

  return (
    <Box>
        <Header/>
        <Box className='bg-zinc-100' py={20}>
            <Box maxW={'350px'} mx={'auto'} py={5} px={3} bg={'white'} rounded={'md'}>
                <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'} gap={1}>
                    <div className="flex items-center justify-center gap-1 bg-pink-200 py-1 px-2 rounded-xl w-[130px]">
                        <Heading fontSize={13} fontFamily={'revert'} className='font-medium uppercase'>Ade<span className="text-pink-600">X</span>ify <span className="black">Now</span></Heading>
                        <MdOutlineShoppingCart className='text-[15px] text-pink-600'/>
                    </div>
                    <Heading textAlign={'center'} fontSize={25} fontWeight={500}>Forgotten Password?</Heading>
                </Flex>
                <Text fontSize={'12'} color={'gray.400'} textAlign={'center'} mt={2}>Enter the registered admin email to reset the admin password</Text>
                <form onSubmit={handleSubmit} className='mt-6'>
                    <Box>
                        <input type="email" id='email' ref={email} onChange={handleChange} className='py-2 w-full px-3 rounded-md placeholder:text-sm bg-zinc-200 outline-none' placeholder='Email address'/>
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
                    <Link to={'/signin'} className='text-pink-600 text-[13px] pt-3 text-center'>Back To Login</Link>
                </Flex>
            </Box>
        </Box>
    </Box>
  )
}
