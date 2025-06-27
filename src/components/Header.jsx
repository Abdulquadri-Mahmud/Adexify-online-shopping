import { Box, Button, Flex, Icon, Image, Text, useColorModeValue } from '@chakra-ui/react';
import React, { createContext, useEffect, useState } from 'react'
import { FaFacebookF, FaInstagram, FaSmileBeam, FaTwitter } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io';
import { MdHomeFilled, MdOutlineShoppingCart, MdSearch } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { Link } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import { FaUser } from "react-icons/fa";
import { RiMenu5Line, RiTShirt2Line } from "react-icons/ri";
import { GoTag } from "react-icons/go";
import Settings from './settings/Settings';
import { GiClothes } from "react-icons/gi";
import { GrUserFemale } from "react-icons/gr";
import { IoManOutline } from "react-icons/io5";
import { BiSolidShoppingBags } from "react-icons/bi";
import { GiConverseShoe } from "react-icons/gi";
import All_category from './All_category';
import { useSelector } from 'react-redux';
import { SiPhpmyadmin } from 'react-icons/si';
import SearchInputField from './searchs/SearchInputField';

export const OpenMenuCOntext = createContext();

const Navs = () => {
  const categories = ["Shoes", "Bags", "Shirt", "Jewellery"];

  return (
    <Box p={0} display="flex" gap={4}>
      {categories.map((category) => (
        <Link key={category} to={`/category?category=${category}`}>
          {category}
        </Link>
      ))}
    </Box>
  );
};

export default function Header() {
    const [cartLength, setCartLength] = useState(0)
    const { currentUser } = useSelector((state) => state.user);
    const { currentAdmin } = useSelector((state) => state.admin);
    
    const { items } = useSelector((state) => state.cart);
    
    useEffect(() => {

        if (items.length >= 1) {
            setCartLength(items.length);
            return;
        }else{
            setCartLength(0);
        }
    });
    
  return (
    <div className="sticky top-0 z-20 bg-white">
        <Box className='bg-green-600 hidden md:block'>
            <Box maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'}  className="relative flex justify-between items-center px-2 md:px-6 text-white">
                <div className="flex items-center">
                    <IoMdCall/>
                    <Link to='tel:+2347047594667' className='text-[12px]'>+234-704-7594-667</Link>
                </div>
                <div className="md:max-w-[40%] max-w-[30%] mx-auto " >
                    <marquee behavior="sliding" direction="" className={'text-[12px] capitalize'}>Welcome To ADEXIFY, We Give The Best.</marquee>
                </div>
                <div className=" flex gap-x-2">
                    <Link to='#'><FaFacebookF className="text-[12px] duration-200 hover:-translate-y-1"/></Link>
                    <Link to='#'><FaInstagram className="text-[12px] duration-200 hover:-translate-y-1"/></Link>
                    <Link to='#'><FaTwitter className="text-[12px] duration-200 hover:-translate-y-1"/></Link>
                    <Link to='#'><IoLogoYoutube className="text-[12px] duration-200 hover:-translate-y-1"/></Link>
                </div>
            </Box>
        </Box>
        <Box top={0} position={'sticky'} className='bg-white text-white'>
            <Box maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '100%'}} mx={'auto'}  className='flex justify-between items-center py-2 md:px-6 px-2 md:bg-white bg-green-600'>
                <Link to={'/'} className='bg-white md:px-0 md:py-0 px-2 py-1 rounded-md flex items-center gap-2'>
                    <Image src='/Logo.png' alt='logo' w={'150px'}/>
                </Link>
                <div className="w-[30%] rounded hidden md:block">
                    <SearchInputField/>
                </div>
                <div className="flex items-center">
                    <div className="hidden md:block">
                        <Link to={'/view-carts'}>
                            <div className="bg-white text-black flex justify-between gap-2 p-1 px-3 rounded-md">
                                <Flex gap={0} alignItems={'center'}>
                                    <Text fontWeight={600} color={'gray.100'} px={3} roundedLeft={'full'} mr={-2} bg={'green.500'}>My Cart</Text>
                                    <Box bg={'green.500'} p={2} zIndex={2} rounded={'full'} color={'white'} className="md:block text-xl relative">
                                        <BsCart4 />
                                        <Box bg={'green.500'} p={2} rounded={'full'} color={'white'} zIndex={-1} className="absolute -top-3 right-0 text-sm">
                                            <Text fontWeight={'600'}>{cartLength}</Text>
                                        </Box>
                                    </Box>
                                </Flex>
                            </div>
                        </Link>
                    </div>
                    <div className="md:hidden block text-xl relative">
                        <Link to={'/view-carts'}>
                            <MdOutlineShoppingCart className='text-xl text-white'/>
                            <div className="absolute -top-5 right-0 text-white ">
                                <p className='text-[17px] font-medium'>{cartLength}</p>
                            </div>
                        </Link>
                    </div>
                    <div className="flex items-center md:gap-2 md:text-black text-white">
                        {
                            currentUser ? (
                                <Settings/>
                            ) : (
                                <Flex gap={1} ml={2}>
                                    <Link to={'/signin'} className='text-[14px]'>Signin</Link>
                                    <span>/</span>
                                    <Link to={'/signup'} className='text-[14px]'>Signup</Link>
                                </Flex>
                            )
                        }
                        {
                            currentAdmin && (
                                <Link to={'/admin-dashboard'} className='text-[14px]'><SiPhpmyadmin className='text-xl'/></Link>
                            )
                        }
                    </div>
                </div>
            </Box>
        </Box>
        <div className="hidde md:block text-black ">
            <Box maxW={{'2xl' : '50%', xl : '60%', lg : '100%', base: '100%'}} mx={'auto'} roundedTop={'10'} className="flex md:justify-center justify-between flex-wrap px-2 items-center gap-4 sm:gap-5 py-3 md:bg-green-50 md:text-black">
                <div className="">
                    <All_category/>
                </div>
                <div className="md:hidden block">
                    <div className="flex justify-center items-center flex-col hover:text-green-500 duration-200">
                        <Link to={'/'}>
                            <MdHomeFilled className='text-lg'/>
                        </Link>
                        <Link to={'/'} className='text-[10px]'>Home</Link>
                    </div>
                </div>

                <div className="md:hidden block">
                    <div className="flex justify-center items-center flex-col hover:text-green-500 duration-200">
                        <Link to={'/womens-clothing'}>
                            <GrUserFemale className='text-lg'/>
                        </Link>
                        <Link to={'/womens-clothing'} className='text-[10px]'>Women</Link>
                    </div>
                </div>
                
                <div className="md:hidden block">
                    <div className="flex justify-center items-center flex-col hover:text-green-500 duration-200">
                        <Link to={'/mens-clothing'}>
                            <IoManOutline className='text-lg'/>
                        </Link>
                        <Link to={'/mens-clothing'} className='text-[10px]'>Men</Link>
                    </div>
                </div>
                <div className="md:hidden block">
                    <div className="flex justify-center items-center flex-col hover:text-green-500 duration-200">
                        <Link to={'/category?category=Shirt'}>
                            <RiTShirt2Line className='text-lg'/>
                        </Link>
                        <Link to={'/category?category=Shirt'} className='text-[10px]'>Shirts</Link>
                    </div>
                </div>
                
                <div className="md:hidden block">
                    <div className="flex justify-center items-center flex-col hover:text-green-500 duration-200">
                        <Link to={'/category?category=Bags'}>
                            <BiSolidShoppingBags className='text-lg'/>
                        </Link>
                        <Link to={'/category?category=Bags'} className='text-[10px]'>Bags</Link>
                    </div>
                </div>
                <div className="md:hidden block remove">
                    <div className="flex justify-center items-center flex-col hover:text-green-500 duration-200">
                        <Link to={'/category?category=Shoes'}>
                            <GiConverseShoe className='text-lg'/>
                        </Link>
                        <Link to={'/category?category=Shoes'} className='text-[10px]'>Shoes</Link>
                    </div>
                </div>
                <div className="hidden md:block">
                    <div className="flex justify-center items-center gap-5 font-">
                        <Link to={'/'} className='text-[15px]'>Home</Link>
                        <Link to={'/fashion'} className='text-[15px]'>Fashions</Link>
                        <Link to={'/womens-clothing'} className='text-[15px]'>Women's Fashion</Link>
                        <Link to={'/mens-clothing'} className='text-[15px]'>Men's Fashion</Link>
                        {/* <Link to={'/category?category=Bags'} className='text-[15px] hidden md:block'>Bags</Link>
                        <Link to={'/category?category=Shoes'} className='text-[15px]'>Shoes</Link>
                        <Link to={'/category?category=Shirt'} className='text-[15px]'>Shirts</Link> */}
                        <Navs/>
                        {/* <Link to={'/category?category=Jewellery'} className='text-[15px]'>Jewelleries</Link> */}
                    </div>
                </div>
            </Box>
        </div>
    </div>
  )
}
