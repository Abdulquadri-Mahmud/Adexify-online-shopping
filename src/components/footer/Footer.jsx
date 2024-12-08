import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { MdEmail } from "react-icons/md";
import { FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6';
import { IoLogoInstagram } from 'react-icons/io5';
import { AiOutlineYoutube } from 'react-icons/ai';

export default function Footer() {
  return (
    <Box bg={'gray.800'} className=''>
        <Flex justifyContent={'space-between'} flexWrap={'wrap'} gap={{md:0, base: 5}} px={3} bg={'gray.700'} color={'white'} className="py-5">
            <div className="flex items-center gap-1">
                <div className="w-9 h-9 bg-white rounded-full flex justify-center items-center text-pink-600">
                    <MdEmail className='text-xl'/>
                </div>
                <div className="text-gray-300">
                    <Text className='font-medium'>EMAIL SUPPORT</Text>
                    <Link className='text-sm pt-2' to={'mailto:help@adexify.com'}>help@adexify.com</Link>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <div className="w-9 h-9 bg-white rounded-full flex justify-center items-center text-pink-600">
                    <FaPhoneAlt className='text-xl'/>
                </div>
                <div className="text-gray-300">
                    <Text className='font-medium'>PHONE SUPPORT</Text>
                    <Link className='text-sm pt-2' to={'tel:07047594667'}>07047594667</Link>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <div className="w-9 h-9 bg-white rounded-full flex justify-center items-center text-pink-600">
                    <FaWhatsapp className='text-xl'/>
                </div>
                <div className="text-gray-300">
                    <Text className='font-medium'>WHATSAPP</Text>
                    <Link className='text-sm pt-2' to={'mailto:help@adexify.com'}>07047594667</Link>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <div className="text-gray-300">
                    <Text className='font-medium'>GET LATEST DEALS</Text>
                    <Text className='text-sm'>Our best promotions sent to you inbox</Text>
                </div>
            </div>
            <form className="flex items-center">
                <input type="text" placeholder='Email Address' className='md:py-3 py-2 w-full bg-white text-black px-2 outline-none border-none'/>
                <button type='submit' className='px-5 md:py-3 py-2 bg-pink-600 font-medium'>Subscribe</button>
            </form>
        </Flex>
        <Box py={8}>
            <Flex px={4} justifyContent={'space-between'} flexWrap={'wrap'} gap={5} color={'white'}>
                <Box>
                    <Box>
                        <Heading fontSize={20} fontWeight={500}>ABOUT ADEXIFY</Heading>
                    </Box>
                    <div className="flex flex-col gap-2 mt-5">
                        <Link to={'/'} className='text-sm '>Contact Us</Link>
                        <Link to={'/'} className='text-sm '>Aboout Us</Link>
                        <Link to={'/'} className='text-sm '>Our Blog</Link>
                        <Link to={'/'} className='text-sm '></Link>
                        <Link to={'/'} className='text-sm '>Terms & Conditions</Link>
                    </div>
                </Box>
                <Box>
                    <Box>
                        <Heading fontSize={20} fontWeight={500}>BUYING ON ADEXIFY</Heading>
                    </Box>
                    <div className="flex flex-col gap-2 mt-5">
                        <Link to={'/'} className='text-sm '>Buyer Safety Centre</Link>
                        <Link to={'/'} className='text-sm '>FAQs</Link>
                        <Link to={'/'} className='text-sm '>Delivery</Link>
                        <Link to={'/'} className='text-sm '>ADEXIFY Return Policy</Link>
                        <Link to={'/'} className='text-sm '>Bulk Purchase</Link>
                    </div>
                </Box>
                <Box>
                    <Box>
                        <Heading fontSize={20} fontWeight={500}>MORE INFO</Heading>
                    </Box>
                    <div className="flex flex-col gap-2 mt-5">
                        {/* <Link to={'/'} className='text-sm '>Site Map</Link> */}
                        <Link to={'/'} className='text-sm '>Track My Order</Link>
                        <Link to={'/'} className='text-sm '>Privacy Policy</Link>
                        {/* <Link to={'/'} className='text-sm '></Link> */}
                    </div>
                </Box>
                <Box>
                    <Box>
                        <Heading fontSize={20} fontWeight={500}>CONNECT WITH US</Heading>
                    </Box>
                    <Flex alignItems={'center'} gap={5} mt={5}>
                        <div className="w-9 h-9 bg-white rounded-full hover:bg-pink-300 duration-200 cursor-pointer flex justify-center items-center text-pink-600">
                            <Link to={'/'}>
                                <FaFacebookF className='text-xl'/>
                            </Link>
                        </div>
                        <div className="w-9 h-9 bg-white rounded-full hover:bg-pink-300 duration-200 cursor-pointer translate-y-5 flex justify-center items-center text-pink-600">
                            <Link to={'/'}>
                                <FaXTwitter className='text-xl'/>
                            </Link>
                        </div>
                        <div className="w-9 h-9 bg-white rounded-full hover:bg-pink-300 duration-200 cursor-pointer translate-y-5 flex justify-center items-center text-pink-600">
                            <Link to={'/'}>
                                <IoLogoInstagram className='text-xl'/>
                            </Link>
                        </div>
                        <div className="w-9 h-9 bg-white rounded-full hover:bg-pink-300 duration-200 cursor-pointer flex justify-center items-center text-pink-600">
                            <Link to={'/'}>
                                <AiOutlineYoutube className='text-xl'/>
                            </Link>
                        </div>
                    </Flex>
                </Box>
            </Flex>
            <Box pt={7} className="flex justify-center gap-1 items-center">
                <p className="w-[40%] p-[1px] bg-gray-500"></p>
                <p className="text-gray-400 text-[12px]">Copyright &copy; 2024 Adexify.com All right reserved</p>
                <p className="w-[40%] p-[1px] bg-gray-500"></p>
            </Box>
        </Box>
    </Box>
  )
}
