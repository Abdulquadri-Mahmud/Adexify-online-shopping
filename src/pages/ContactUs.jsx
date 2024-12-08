import { Box, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineYoutube } from 'react-icons/ai'
import { FaFacebookF } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { IoLogoInstagram } from 'react-icons/io5'
import { PiGreaterThan } from 'react-icons/pi'
import { Link } from 'react-router-dom'

export default function ContactUs() {
  return (
    <Box>

        <Box pb={'4vh'}>
            <Box className="bg-white p-2 shadow-md">
                <Box className="flex gap-1 items-center">
                <Link to={'/'} className='text-[13px]'>Home</Link>
                <PiGreaterThan className='text-[13px] pt-1'/>
                <Link to={'/'} className='text-[13px]'>Help</Link>
                <PiGreaterThan className='text-[13px] pt-1'/>
                <Link to={'/contact'} className='text-[13px]'>contact us</Link>
                </Box>
                <Box className="mt-2">
                    <Heading fontSize={{md:30, base: 25}} fontWeight={500} color={'black'}>Connect With Us</Heading>
                </Box>
            </Box>
            <Flex justifyContent={'center'} flexWrap={'wrap'} mt={'5vh'} bg={'white'} p={{md: 5, base:3}} gap={5} maxW={{'2xl': '65%',md: '75%', base: '100%'}} mx={{md:'auto', base: 3}} rounded={'10px'} shadow={'md'}>
                <Box width={{md: '45%', base: '100%'}}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d572.4005057785837!2d3.526450360675873!3d6.588530659005038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bee441f9ce615%3A0x6d7b8e4c69bd797e!2sAkin%20Ogunlewe%20Rd%2C%20Ikorodu%2C%20Lagos!5e0!3m2!1sen!2sng!4v1727883271031!5m2!1sen!2sng" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className='iframe'></iframe>
                    <Flex alignItems={'center'} justifyContent={'center'} gap={5} mt={5}>
                        <div className="w-9 h-9 bg-pink-200 rounded-full hover:bg-pink-300 duration-200 cursor-pointer flex justify-center items-center text-pink-600">
                            <Link to={'/'}>
                                <FaFacebookF className='text-xl'/>
                            </Link>
                        </div>
                        <div className="w-9 h-9 bg-pink-200 rounded-full hover:bg-pink-300 duration-200 cursor-pointer translate-y-5 flex justify-center items-center text-pink-600">
                            <Link to={'/'}>
                                <FaXTwitter className='text-xl'/>
                            </Link>
                        </div>
                        <div className="w-9 h-9 bg-pink-200 rounded-full hover:bg-pink-300 duration-200 cursor-pointer translate-y-5 flex justify-center items-center text-pink-600">
                            <Link to={'/'}>
                                <IoLogoInstagram className='text-xl'/>
                            </Link>
                        </div>
                        <div className="w-9 h-9 bg-pink-200 rounded-full hover:bg-pink-300 duration-200 cursor-pointer flex justify-center items-center text-pink-600">
                            <Link to={'/'}>
                                <AiOutlineYoutube className='text-xl'/>
                            </Link>
                        </div>
                    </Flex>
                </Box>
                <Box flex={1} mt={{md: 0, base: '5'}}>
                    <form>
                        <Box width={'full'}>
                            <p className='font-medium pb-1'>Email Address:</p>
                            <input type="email" placeholder='Email Address' className='bg-slate-200 p-3 border-none outline-none w-full rounded-md'/>
                        </Box>
                        <Box width={'full'} mt={5}>
                            <p className='font-medium pb-1'>How Can We Help You:</p>
                            <textarea type="email" placeholder='How Can We Help You' className='bg-slate-200 p-3 border-none outline-none w-full rounded-md'/>
                        </Box>
                        <Box width={'full'} mt={5}>
                            <p className='font-medium pb-1'>Message:</p>
                            <textarea type="email" placeholder='Type Your Message Here...' className='bg-slate-200 p-3 border-none outline-none w-full rounded-md h-[20vh]'/>
                        </Box>
                        <Flex justifyContent={'center'} my={3}>
                            <button type='submit' className='w-[200px] py-3 bg-pink-600 text-white uppercase font-medium rounded-md'>Submit</button>
                        </Flex>
                    </form>
                </Box>
            </Flex>
        </Box>
    </Box>
  )
}
