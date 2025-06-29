import React, { useContext, useEffect, useRef, useState } from 'react'
import { Box, Button, Flex, Image, Text, useDisclosure } from '@chakra-ui/react';
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
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { BsCart4 } from 'react-icons/bs';

export default function All_category() {
    const { items } = useSelector((state) => state.cart);
    const [cartLength, setCartLength] = useState(0);
    const [open, setOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const firstField = useRef();
    const { currentUser } = useSelector((state) => state.user);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (items.length >= 1) {
            setCartLength(items.length);
        } else {
            setCartLength(0);
        }
    }, [items]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('https://adexify-api.vercel.app/api/products/all-products');
                const data = await res.json();
                const uniqueCategories = [...new Set(data.map((item) => item.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="">
            <Button bg={'transparent'} _hover={{ bg: 'transparent' }} onClick={onOpen} px={0} className="flex items-center flex-col md:flex-row cursor-pointer md:hover:text-black hover:text-pink-600">
                <HiOutlineMenuAlt2 className='text-xl' />
                <h2 className="md:text-[15px] hidden md:block text-[10px] font-normal">Browse All</h2>
                <h2 className="md:text-[15px] block md:hidden text-[10px] font-normal">Categories</h2>
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
                            
                            <div className="pr-6">
                                <Link to={'/view-carts'}>
                                    <Flex gap={0} alignItems={'center'}>
                                        <Text fontWeight={500} fontSize={'sm'} color={'gray.100'} px={3} roundedLeft={'full'} mr={-2} bg={'pink.500'}>My Cart</Text>
                                        <Box bg={'pink.500'} p={2} zIndex={2} rounded={'full'} color={'white'} className="md:block text-xl relative">
                                            <BsCart4 />
                                            <Box bg={'pink.500'} p={2} rounded={'full'} color={'white'} zIndex={-1} className="absolute -top-3 right-0 text-sm">
                                                <Text fontWeight={'600'}>{cartLength}</Text>
                                            </Box>
                                        </Box>
                                    </Flex>
                                </Link>
                            </div>
                        </Box>
                    </DrawerHeader>
                    <DrawerBody>
                        {currentUser && (
                                <Link to={`/profile/${currentUser._id}`} className='md:block'>
                                    <Flex justifyContent={'center'} fontWeight={'600'} pb={3} className='flex items-center gap-1'>
                                        <Text className='capitalize' >Hi {currentUser.firstname}</Text>
                                        <FaHandSparkles className='text-pink-600' />,
                                        <Text>Wlecome to Adexify!</Text>
                                    </Flex>
                                </Link>
                            )}
                        {!currentUser && (
                            <Flex justifyContent={'space-between'} alignItems={'center'} mt={2} borderBottom={'1px solid #e2e8f0'} pb={3}>
                                <Flex justifyContent={'center'} alignItems={'center'} textTransform={'uppercase'} fontWeight={500} width={'47%'} py={2} rounded={'md'} bg={'gray.800'} color={'white'} _hover={{ bg: 'gray.800' }}>
                                    <Link to={'/signup'}>Signup</Link>
                                </Flex>
                                <Flex justifyContent={'center'} alignItems={'center'} textTransform={'uppercase'} fontWeight={500} width={'47%'} py={2} rounded={'md'} bg={'pink.500'} color='white' _hover={{bg: ''}}>
                                    <Link to={'/signin'}>Signin</Link>
                                </Flex>
                            </Flex>
                        )}
                        {currentUser && (
                            <Flex justifyContent={'space-between'} alignItems={'center'} mt={2} borderBottom={'1px solid #e2e8f0'} pb={3}>
                                <Flex justifyContent={'center'} alignItems={'center'} textTransform={'uppercase'} fontWeight={500} width={'47%'} py={2} rounded={'md'} bg={'gray.800'} color={'white'} _hover={{ bg: 'gray.800' }}>
                                    <Link to={`/profile/${currentUser._id}`}>My Account</Link>
                                </Flex>
                                <Flex justifyContent={'center'} alignItems={'center'} textTransform={'uppercase'} fontWeight={500} width={'47%'} py={2} rounded={'md'} bg={'pink.500'} color='white' _hover={{bg: ''}}>
                                    <Link to={'/view-wislist'}>My WishLists</Link>
                                </Flex>
                            </Flex>
                        )}
                        <Box mt={8} rounded={'lg'} p={0} bg={'white'}>
                            <Text mb={{ md: 0, base: 5 }} display={{ md: 'none', base: 'block' }} fontWeight={'500'} fontSize={20}>Categories</Text>
                            <div className="flex justify-start flex-col items-start gap-1">
                                {categories.map((category, index) => (
                                    <Box key={index} className='py-3 px-2 hover:translate-x-3 duration-200 w-full' borderBottom={'1px solid #e2e8f0'} borderRadius={'md'} _hover={{ bg: 'pink.50' }}>
                                        <Link to={`/category?category=${category}`} className='text-md hover:text-pink-500 duration-200 text-[14px]'>
                                            {category}
                                        </Link>
                                    </Box>
                                ))}
                            </div>
                        </Box>
                        <Box my={4} py={3} bg={'white'} px={3} rounded={'md'}>
                            <Link to={'/contact'} className='flex items-center gap-2 text-sm'><IoCallOutline /> Contact Us</Link>
                        </Box>
                    </DrawerBody>
                    <DrawerFooter borderTopWidth='1px'></DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
