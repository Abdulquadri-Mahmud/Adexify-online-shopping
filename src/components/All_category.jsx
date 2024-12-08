import React, { useContext, useEffect, useRef, useState } from 'react'
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { LiaTimesSolid } from 'react-icons/lia';
import { RiMenu5Line } from 'react-icons/ri';
import { IoCallOutline, IoLocationOutline } from 'react-icons/io5';
import { FaHandSparkles, FaRegStar } from 'react-icons/fa';
import { CiShoppingTag } from 'react-icons/ci';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';

export default function All_category() {
    const { items } = useSelector((state) => state.cart);
    const [cartLength, setCartLength] = useState(0);
    const [open, setOpen] = useState(false);
    
    const { isOpen, onOpen, onClose } = useDisclosure();

    const firstField = useRef();

    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (items.length >= 1) {
            setCartLength(items.length);
            return;
        }else{
            setCartLength(0);
        }
    }, []);

  return (
    <div className="">
        <Button bg={'transparent'} _hover={{bg: 'transparent'}} onClick={onOpen} px={0} className="flex items-center flex-col md:flex-row cursor-pointer md:hover:text-black hover:text-pink-600">
            <HiOutlineMenuAlt2 className='text-xl' />
            <h2 className="md:text-[15px] hidden md:block text-[10px] font-normal">Browse All</h2>
            <h2 className="md:text-[15px] block md:hidden text-[10px] font-normal">Categories</h2>
        </Button>
        <Drawer isOpen={isOpen} placement='left' initialFocusRef={firstField} onClose={onClose} size={'md'}>
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton top={3}/>
                <DrawerHeader borderBottomWidth={{md:'0px', base: '1px'}}>
                    <Box  className=' flex justify-between items-center text-black'>
                        {
                            currentUser && (
                                <Link to={`/profile/${currentUser._id}`} className='md: block'>
                                    <Box className='flex items-center gap-1'>
                                        <Text>Hi {currentUser.firstname}</Text>
                                        <FaHandSparkles className='text-pink-600' />
                                    </Box>
                                </Link>
                            )
                        }
                        <div className="pr-9">
                            <Link to={'/view-carts'}>
                                <div className="md: block text-xl relative">
                                    <MdOutlineShoppingCart className='text-black'/>
                                    <div className="absolute -top-3 right-0 text-black text-sm">
                                        <p>{cartLength}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </Box>
                </DrawerHeader>
                <DrawerBody>
                    <Box display={{md: '', base: 'block'}}>
                        {
                            currentUser ? (
                                ''
                            ) : (

                                <Flex justifyContent={'space-between'} alignItems={'center'} mt={5}>
                                    <Flex justifyContent={'center'} alignItems={'center'} textTransform={'uppercase'} fontWeight={500} width={'47%'} py={2} rounded={'md'} color={'black'} borderWidth={1} borderColor={'pink.300'}>
                                        <Link to={'/signin'}>Signin</Link>
                                    </Flex>
                                    <Flex justifyContent={'center'} alignItems={'center'} textTransform={'uppercase'} fontWeight={500} width={'47%'} py={2} rounded={'md'} color={'black'} borderWidth={1} borderColor={'pink.300'}>
                                        <Link to={'/signup'}>Signup</Link>
                                    </Flex>
                                </Flex>
                            )
                        }
                        </Box>
                        <Box display={{md: '', base: 'block'}} mt={{md:5, base: 3}} >
                            <Box className='grid grid-cols-2 grid-rows-2'>
                                <div className="flex items-center gap-3 border-[1px] py-2 border-r-0 border-l-0 px-2 border-pink-300">
                                    <div className="w-9 h-9 bg-pink-200 rounded-full flex justify-center items-center text-pink-600 ">
                                        <IoLocationOutline className='text-xl'/>
                                    </div>
                                    <div className="text-black">
                                        <Text className='text-sm'>Track Orders</Text>
                                        <Text className='text-[10px] text-gray-400'>View Order Status</Text>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 border-[1px] py-2 border-r-0 border-l-0 px-2 border-pink-300">
                                    <div className="w-9 h-9 bg-pink-200 rounded-full flex justify-center items-center text-pink-600 ">
                                        <FaRegStar className='text-xl'/>
                                    </div>
                                    <div className="text-black">
                                        <Text className='text-sm'>Pending</Text>
                                        <Text className='text-[10px] text-gray-400'>View Pending Items</Text>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 border-[1px] py-2 border-t-0 border-r-0 border-l-0 px-2 border-pink-300">
                                    <div className="w-9 h-9 bg-pink-200 rounded-full flex justify-center items-center text-pink-600 ">
                                        <CiShoppingTag className='text-xl'/>
                                    </div>
                                    <div className="text-black">
                                        <Text className='text-sm'>All Deals</Text>
                                        <Text className='text-[10px] text-gray-400'>View All Deals</Text>
                                    </div>
                                </div>
                            <div className="flex items-center gap-3 border-[1px] py-2 border-t-0 border-r-0 border-l-0 px-2 border-pink-300">
                                <div className="w-9 h-9 bg-pink-200 rounded-full flex justify-center items-center text-pink-600 ">
                                </div>
                                <div className="text-black">
                                    <Text className='text-sm'>Track Orders</Text>
                                    <Text className='text-[10px] text-gray-400'>View Order Status</Text>
                                </div>
                            </div>
                        </Box>
                    </Box>
                    {/* <Box> */}
                    <Box mt={8} rounded={'lg'} p={0} bg={'white'}>
                        <Text mb={{md: 0, base: 5}} display={{md: 'none', base: 'block'}} fontWeight={'500'} fontSize={20}>Categories</Text>
                        <div className="flex justify-start flex-col items-start gap-1 font-">
                            <Box className='border-[1px] py-3 border-t-1 border-r-0 border-l-0 border-b-0 px-2 hover:translate-x-3 duration-200 border-pink-200 w-full'>
                                <Link to={'/fashion'} className='text-md hover:text-pink-500 duration-200 text-[14px]'>Fashions</Link>
                            </Box>
                            <Box className='border-[1px] py-3 border-t-1 border-r-0 border-l-0 px-2 hover:translate-x-3 duration-200 border-pink-200 w-full'>
                                <Link to={'/'} className='text-md hover:text-pink-500 duration-200 text-[14px]'>Men's Wear</Link>
                            </Box>
                            <Box className='border-[1px] py-3 border-t-0 border-r-0 border-l-0 px-2 hover:translate-x-3 duration-200 border-pink-200 w-full'>
                                <Link to={'/'} className='text-md hover:text-pink-500 duration-200 text-[14px]'>Men's Bags</Link>
                            </Box>
                            <Box className='border-[1px] py-3 border-t-0 border-r-0 border-l-0 px-2 hover:translate-x-3 duration-200 border-pink-200 w-full'>
                                <Link to={'/'} className='text-md hover:text-pink-500 duration-200 text-[14px]'>Men's Shoes</Link>
                            </Box>
                            <Box className='border-[1px] py-3 border-t-0 border-r-0 border-l-0 px-2 hover:translate-x-3 duration-200 border-pink-200 w-full'>
                                <Link to={'/'} className='text-md hover:text-pink-500 duration-200 text-[14px]'>Women's Wear</Link>
                            </Box>
                            <Box className='border-[1px] py-3 border-t-0 border-r-0 border-l-0 px-2 hover:translate-x-3 duration-200 border-pink-200 w-full'>
                                <Link to={'/'} className='text-md hover:text-pink-500 duration-200 text-[14px]'>Women's Bags</Link>
                            </Box>
                            <Box className='border-[1px] py-3 border-t-0 border-r-0 border-l-0 px-2 hover:translate-x-3 duration-200 border-pink-200 w-full'>
                                <Link to={'/'} className='text-md hover:text-pink-500 duration-200 text-[14px]'>Women's Men's Shoes</Link>
                            </Box>
                            <Box className='border-[1px] py-3 border-t-0 border-r-0 border-l-0 px-2 hover:translate-x-3 duration-200 border-pink-200 w-full'>
                                <Link to={'/'} className='text-md hover:text-pink-500 duration-200 text-[14px]'>Jwelleries</Link>
                            </Box>
                            <Box className='border-[1px] py-3 border-t-0 border-r-0 border-l-0 px-2 hover:translate-x-3 duration-200 border-pink-200 w-full'>
                                <Link to={'/'} className='text-md hover:text-pink-500 duration-200 text-[14px]'>Sandals</Link>
                            </Box>
                        </div>
                    </Box>
                    <Box my={4} py={3} bg={'white'} px={3} rounded={'md'}>
                        <Link to={'/contact'} className='flex items-center gap-2 text-sm'><IoCallOutline/> Contact Us</Link>
                    </Box>
                </DrawerBody>
                <DrawerFooter borderTopWidth='1px'>
                    {/* <Button variant='outline' mr={3} onClick={onClose}>
                    Cancel
                    </Button>
                    <Button colorScheme='blue'>Submit</Button> */}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
        <div className={`${open ? 'md:w-[100%] w-[100%] p-3' : 'w-[0%]'} text-black text-sm duration-200 overflow-y-auto fixed md:top-[20vh] left-0 bg-gray-100 md:h-[500px] h-[550px]`}>
            <div className=''>
                <Box>
                    
                    
                </Box>
                <Box>
                    <Flex gap={3} pt={10}>
                        <Box width={{md:'300px', base: '100%'}} rounded={'lg'} p={3} bg={'white'}>
                            <Text mb={{md: 0, base: 5}} display={{md: 'none', base: 'block'}} fontWeight={'500'} fontSize={20}>Categories</Text>
                            <div className="flex justify-start flex-col items-start gap-1 font-">
                                <Box className='border-[1px] py-3 border-t-1 border-r-0 border-l-0 px-2 hover:translate-x-3 duration-200 border-pink-200 w-full'>
                                    <Link to={'/'} className='text-md hover:text-pink-500 duration-200'>Men's Wear</Link>
                                </Box>
                                <Box className='border-[1px] py-3 border-t-0 border-r-0 border-l-0 px-2 hover:translate-x-3 duration-200 border-pink-200 w-full'>
                                    <Link to={'/'} className='text-md hover:text-pink-500 duration-200'>Men's Bags</Link>
                                </Box>
                                <Box className='border-[1px] py-3 border-t-0 border-r-0 border-l-0 px-2 hover:translate-x-3 duration-200 border-pink-200 w-full'>
                                    <Link to={'/'} className='text-md hover:text-pink-500 duration-200'>Men's Shoes</Link>
                                </Box>
                                <Box className='border-[1px] py-3 border-t-0 border-r-0 border-l-0 px-2 hover:translate-x-3 duration-200 border-pink-200 w-full'>
                                    <Link to={'/'} className='text-md hover:text-pink-500 duration-200'>Women's Wear</Link>
                                </Box>
                                <Box className='border-[1px] py-3 border-t-0 border-r-0 border-l-0 px-2 hover:translate-x-3 duration-200 border-pink-200 w-full'>
                                    <Link to={'/'} className='text-md hover:text-pink-500 duration-200'>Women's Bags</Link>
                                </Box>
                                <Box className='border-[1px] py-3 border-t-0 border-r-0 border-l-0 px-2 hover:translate-x-3 duration-200 border-pink-200 w-full'>
                                    <Link to={'/'} className='text-md hover:text-pink-500 duration-200'>Women's Men's Shoes</Link>
                                </Box>
                                <Box className='border-[1px] py-3 border-t-0 border-r-0 border-l-0 px-2 hover:translate-x-3 duration-200 border-pink-200 w-full'>
                                    <Link to={'/'} className='text-md hover:text-pink-500 duration-200'>Jwelleries</Link>
                                </Box>
                                <Box className='border-[1px] py-3 border-t-0 border-r-0 border-l-0 px-2 hover:translate-x-3 duration-200 border-pink-200 w-full'>
                                    <Link to={'/'} className='text-md hover:text-pink-500 duration-200'>Sandals</Link>
                                </Box>
                            </div>
                        </Box>
                        <Box flex={1} p={3} height={'100%'} bg={'white'} display={{md: 'block', base: 'none'}}>

                        </Box>
                    </Flex>
                    <Box my={4} py={3} bg={'white'} px={3} rounded={'md'}>
                        <Link to={'/contact'} className='flex items-center gap-2 text-sm'><IoCallOutline/> Contact Us</Link>
                    </Box>
                </Box>
            </div>
        </div>
    </div>
  )
}
