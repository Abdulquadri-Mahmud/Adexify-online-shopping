import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { createContext, useEffect, useState } from 'react'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io';
import { MdHomeFilled, MdOutlineShoppingCart} from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { Link } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import { RiTShirt2Line } from "react-icons/ri";
import Settings from './settings/Settings';
import { GrUserFemale } from "react-icons/gr";
import { IoManOutline } from "react-icons/io5";
import { BiSolidShoppingBags } from "react-icons/bi";
import { GiConverseShoe } from "react-icons/gi";
import All_category from './All_category';
import { useSelector } from 'react-redux';
import { SiPhpmyadmin } from 'react-icons/si';
import SearchInputField from './searchs/SearchInputField';
import GuestNav from './settings/GuestNav';

export const OpenMenuCOntext = createContext();

const Navs = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://adexify-api.vercel.app/api/products/all-products');
        const data = await res.json();

        // Extract and deduplicate categories
        const uniqueCategories = [...new Set(data.map((item) => item.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box display={{ md: 'block', base: 'none' }} width="100%">
        <Box px={2} display="flex" alignItems="center" overflowX="auto" whiteSpace="nowrap" gap={4} css={{
            scrollbarWidth: 'thin', // Firefox
            scrollbarColor: '#c0c0c0 transparent', // Firefox

            '&::-webkit-scrollbar': {
                height: '6px',
            },
            '&::-webkit-scrollbar-track': {
                background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
                background: '#b83280',
                borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
                background: '#fbb6ce',
            },
        }}>
            <Box w="100px">
                <All_category />
            </Box>

            <Link to="/" style={{ fontSize: '15px', display: 'inline-block' }}>
                Home
            </Link>
            <Link to="/fashion" style={{ fontSize: '15px', display: 'inline-block' }}>
                Fashions
            </Link>
            <Link to="/womens-clothing" style={{ fontSize: '15px', display: 'inline-block' }}>
                Women's Fashion
            </Link>
            <Link to="/mens-clothing" style={{ fontSize: '15px', display: 'inline-block' }}>
                Men's Fashion
            </Link>

            {categories.map((category) => (
            <Link key={category} to={`/category?category=${category}`} style={{ fontSize: '15px', display: 'inline-block' }}> 
                {category}
            </Link>
            ))}
        </Box>
    </Box>
  );
};

// Mobile screen mene
const MobileNav = () => {
    return (
        <div className="block md:hidden text-black ">
            <Flex justifyContent={'space-between'} alignItems={'center'} flex={1} mx={'auto'} className="hidden md:flex">
                <All_category/>
                <div className="md:hidden block">
                    <div className="flex justify-center items-center flex-col hover:text-pink-600 duration-200">
                        <Link to={'/'}>
                            <MdHomeFilled className='text-lg'/>
                        </Link>
                        <Link to={'/'} className='text-[10px]'>Home</Link>
                    </div>
                </div>

                <div className="md:hidden block">
                    <div className="flex justify-center items-center flex-col hover:text-pink-600 duration-200">
                        <Link to={'/womens-clothing'}>
                            <GrUserFemale className='text-lg'/>
                        </Link>
                        <Link to={'/womens-clothing'} className='text-[10px]'>Women</Link>
                    </div>
                </div>
                
                <div className="md:hidden block">
                    <div className="flex justify-center items-center flex-col hover:text-pink-600 duration-200">
                        <Link to={'/mens-clothing'}>
                            <IoManOutline className='text-lg'/>
                        </Link>
                        <Link to={'/mens-clothing'} className='text-[10px]'>Men</Link>
                    </div>
                </div>
                <div className="md:hidden block">
                    <div className="flex justify-center items-center flex-col hover:text-pink-600 duration-200">
                        <Link to={'/category?category=Shirt'}>
                            <RiTShirt2Line className='text-lg'/>
                        </Link>
                        <Link to={'/category?category=Shirt'} className='text-[10px]'>Shirts</Link>
                    </div>
                </div>
                
                <div className="md:hidden block">
                    <div className="flex justify-center items-center flex-col hover:text-pink-600 duration-200">
                        <Link to={'/category?category=Bags'}>
                            <BiSolidShoppingBags className='text-lg'/>
                        </Link>
                        <Link to={'/category?category=Bags'} className='text-[10px]'>Bags</Link>
                    </div>
                </div>
                <div className="md:hidden block remove">
                    <div className="flex justify-center items-center flex-col hover:text-pink-600 duration-200">
                        <Link to={'/category?category=Shoes'}>
                            <GiConverseShoe className='text-lg'/>
                        </Link>
                        <Link to={'/category?category=Shoes'} className='text-[10px]'>Shoes</Link>
                    </div>
                </div>
            </Flex>
        </div>
    )
};

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const { currentAdmin } = useSelector((state) => state.admin);
    
    const cartCount = useSelector((state) => state.cart.count);

  return (
    <div className="sticky top-0 z-20 bg-white">
        <Box className='bg-pink-500 hidden md:block'>
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
            <Box maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '100%'}} mx={'auto'}  className='flex justify-between items-center py-2 md:px-6 px-2 md:bg-white bg-pink-600'>
                <Link to={'/'} className='bg-white md:px-0 md:py-0 px-2 py-1 rounded-md flex items-center gap-2'>
                    <Image src='/Logo.png' alt='logo' w={{md:'150px', base:'100px'}}/>
                </Link>
                <div className="w-[30%] rounded hidden md:block">
                    <SearchInputField/>
                </div>
                <div className="flex items-center">
                    <div className="hidden md:block">
                        <Link to={'/view-carts'}>
                            <div className="bg-white text-black flex justify-between gap-2 p-1 px-3 rounded-md">
                                <Flex gap={0} alignItems={'center'}>
                                    <Text fontWeight={600} color={'gray.100'} px={3} roundedLeft={'full'} mr={-2} bg={'pink.500'}>My Cart</Text>
                                    <Box bg={'pink.500'} p={2} zIndex={2} rounded={'full'} color={'white'} className="md:block text-xl relative">
                                        <BsCart4 />
                                        <Box bg={'pink.500'} px={2} pb={3} rounded={'full'} color={'white'} zIndex={-1} className="absolute -top-4 right-0 text-[17px]">
                                            <Text fontWeight={'600'} >{cartCount}</Text>
                                        </Box>
                                    </Box>
                                </Flex>
                            </div>
                        </Link>
                    </div>
                    <div className="md:hidden block text-xl relative mt-2">
                        <Link to={'/view-carts'}>
                            <Flex gap={0} alignItems={'center'}>
                                <Text fontWeight={500} fontSize={'sm'} color={'pink.500'} px={3} roundedLeft={'full'} mr={-2} bg={'white'}>My Cart</Text>
                                <Box bg={'white'} p={2} zIndex={2} rounded={'full'} color={'pink.500'} className="md:block text-xl relative">
                                    <BsCart4 />
                                    <Box bg={'white'} p={2} rounded={'full'} color={'pink.500'} zIndex={-1} className="absolute -top-3 right-0 text-sm">
                                        <Text fontWeight={'600'}>{cartCount}</Text>
                                    </Box>
                                </Box>
                            </Flex>
                        </Link>
                    </div>
                    <div className="flex items-center md:gap-2 md:text-black text-white">
                        {
                            currentUser ? (
                                <Settings/>
                            ) : (
                                <GuestNav/>
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
        <Box py={2} px={2} roundedTop={'xl'} bg={'gray.50'} maxW={{'2xl' : '50%', xl : '60%', lg : '80%', base: '100%'}} mx={'auto'}>
            <Navs/>
            <MobileNav/>
        </Box>
    </div>
  )
}
