import { Box, Flex, Image, Text, Icon } from '@chakra-ui/react';
import { createContext, useEffect, useState } from 'react'
import { FaFacebookF, FaInstagram, FaLaptop, FaTwitter } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io';
import { MdHomeFilled, MdOutlineShoppingCart} from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { Link, useLocation } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import { RiTShirt2Line } from "react-icons/ri";
import Settings from './settings/Settings';
import { IoPhonePortrait } from "react-icons/io5";
import { BiSolidShoppingBags } from "react-icons/bi";
import { GiConverseShoe } from "react-icons/gi";
import All_category from './All_category';
import { useDispatch, useSelector } from 'react-redux';
import { SiPhpmyadmin } from 'react-icons/si';
import SearchInputField from './searchs/SearchInputField';
import GuestNav from './settings/GuestNav';
import MobileSearchInput from './searchs/MobileSearchInput';
import { useCart } from '../pages/cartsPage/CartCountContext';
import { FiMapPin, FiShoppingBag, FiZap } from 'react-icons/fi';
import Marquee from "react-fast-marquee";

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
    <Box display={{ md: 'none', base: 'none' }} width="100%">
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
            {/* <Link to="/womens-clothing" style={{ fontSize: '15px', display: 'inline-block' }}>
                Women's Fashion
            </Link>
            <Link to="/mens-clothing" style={{ fontSize: '15px', display: 'inline-block' }}>
                Men's Fashion
            </Link> */}

            {categories.map((category) => (
            <Link key={category} to={`/category?category=${category}`} style={{ fontSize: '15px', display: 'inline-block' }}> 
                {category}
            </Link>
            ))}
        </Box>
    </Box>
  );
};

const TopBar = () => {

  const {currentUser} = useSelector((state) => state.user);

  return(
    <Marquee gradient={true} gradientColor={'black'} speed={50} pauseOnHover>
      <Flex align="center" py={1} gap={4}>
        {/* Lightning icon */}
        <Icon as={FiZap} boxSize={5} color="pink.400" />

        {/* Marquee text */}
        <Text color="white" fontWeight="semibold" fontSize={{ base: "sm", md: "md" }} letterSpacing="wider" textAlign={{ base: "center", md: "left" }}>
          {currentUser
            ? `👋 Welcome back, ${currentUser.firstname}! We’re thrilled to see you again. Explore the latest arrivals, grab exclusive deals, and enjoy a seamless shopping experience tailored just for you.`
            : `👋 Welcome to Adexify! Your one-stop destination for fashion, gadgets, and lifestyle essentials. Discover trending products, enjoy amazing deals, and make your shopping experience simple, fast, and fun.`}
        </Text>
        {/* Location/Pin icon */}
        <Icon as={FiMapPin} boxSize={5} color="pink.400" />
      </Flex>
    </Marquee>
  )
}

// Mobile screen mene
const MobileNav = () => {
  const location = useLocation();

  // Helper function to determine active route
  const isActive = (path) => (location.pathname + location.search) === path;

  return (
    <Box className="block md:hidde text-white md:bg-pink-500 bg-pink-900 py-2 px-2 md:rounded-t-xl">
      <Flex justifyContent={"space-between"} alignItems={"center"} flex={1} mx={"auto"} className="hidden md:flex">
        <All_category />
        
        {/* Home */}
        <Box className="">
          <Box className="flex justify-center items-center flex-col duration-200" style={{ color: isActive("/") ? "#ffbdde" : "inherit" }}>
            <Link to={"/"} className='flex flex-col items-center'>
              <MdHomeFilled className="md:text-2xl text-xl" />
              <Text className="text-[10px]">
                Home
              </Text>
            </Link>
          </Box>
        </Box>

        {/* Fashion */}
        <Box className="">
          <Box className="flex justify-center items-center flex-col duration-200" style={{ color: isActive("/fashion") ? "#ffbdde" : "inherit" }}>
            <Link to={"/fashion"} className='flex flex-col items-center'>
              <FiShoppingBag className="md:text-2xl text-xl" />
                <Text className="text-[10px]">
                    Fashion
                </Text>
            </Link>
          </Box>
        </Box>

        {/* Shirts */}
        <Box className="">
          <Box className="flex justify-center items-center flex-col duration-200" style={{ color: isActive("/category?category=Shirt") ? "#ffbdde" : "inherit" }} >
            <Link to={"/category?category=Shirt"} className='flex flex-col items-center'>
              <RiTShirt2Line className="md:text-2xl text-xl" />
                <Text className="text-[10px]">
                    Shirts
                </Text>
            </Link>
          </Box>
        </Box>

        {/* Bags */}
        <Box className="">
          <Box className="flex justify-center items-center flex-col duration-200" style={{ color: isActive("/category?category=Bags") ? "#ffbdde" : "inherit" }}> 
            <Link to={"/category?category=Bags"} className='flex flex-col items-center'>
              <BiSolidShoppingBags className="md:text-2xl text-xl" />
              <Text className="text-[10px]">
                Bags
              </Text>
            </Link>
          </Box>
        </Box>

        {/* Shoes */}
        <Box className=" remove">
          <Box className="flex justify-center items-center flex-col duration-200" style={{ color: isActive("/category?category=Shoes") ? "#ffbdde" : "inherit" }}>
            <Link to={"/category?category=Shoes"} className='flex flex-col items-center'>
              <GiConverseShoe className="md:text-2xl text-xl" />
                <Text className="text-[10px]">
                    Shoes
                </Text>
            </Link>
          </Box>
        </Box>

        <Box className=" remove">
          <Box className="flex justify-center items-center flex-col duration-200" style={{ color: isActive("/category?category=Laptops") ? "#ffbdde" : "inherit" }}>
            <Link to={"/category?category=Laptops"} className='flex flex-col items-center'>
              <FaLaptop className="md:text-2xl text-xl" />
              <Text className="text-[10px]">
                Laptops
              </Text>
            </Link>
          </Box>
        </Box>

        <Box className="remove">
          <Box className="flex justify-center items-center flex-col duration-200" style={{ color: isActive("/category?category=Mobiles") ? "#ffbdde" : "inherit" }}>
            <Link to={"/category?category=Mobiles"} className='flex flex-col items-center'>
              <IoPhonePortrait className="md:text-2xl text-xl" />
                <Text className="text-[10px]">
                    Mobiles
                </Text>
            </Link>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default function Header() {
    const [cartLength, setCartLength] = useState(0);
    const { currentUser } = useSelector((state) => state.user);
    const { currentAdmin } = useSelector((state) => state.admin);
    
    const { cartCount } = useCart();
    
  return (
    <Box className="sticky top-0 z-20 bg-white">
        <Box className='bg-pink-800 hidde md:block'>
          <TopBar/>
        </Box>
        <Box top={0} position={'sticky'} className='bg-white text-white'>
            <Box maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '100%'}} mx={'auto'}  className='flex justify-between items-center py-2 md:px-6 px-2 md:bg-white bg-pink-600'>
                <Link to={'/'} className='bg-white md:px-0 md:py-0 px-2 py-1 rounded-md flex items-center gap-2'>
                    <Image src='/Logo.png' alt='logo' w={{md:'150px', base:'100px'}}/>
                </Link>
                
                <Box className="w-[30%] rounded hidden md:block">
                    <SearchInputField/>
                </Box>

                <Box display={{ md: 'none', base: 'block' }}>
                    <MobileSearchInput/>
                </Box>
                <Box className="flex items-center">
                    <Box className="hidden md:block">
                        <Link to={'/view-carts'}>
                            <Box className="bg-white text-black flex justify-between gap-2 p-1 px-3 mt-1 rounded-md">
                                <Flex gap={0} alignItems={'center'}>
                                    <Text fontWeight={600} color={'gray.100'} px={3} roundedLeft={'full'} mr={-2} bg={'pink.500'}>My Cart</Text>
                                    <Box bg={'pink.500'} p={2} zIndex={2} rounded={'full'} color={'white'} className="md:block text-xl relative">
                                        <BsCart4 />
                                        <Box bg={'pink.500'} px={2} pb={3} rounded={'full'} color={'white'} zIndex={-1} className="absolute -top-4 right-0 text-[17px]">
                                            <Text fontWeight={'600'} >{cartCount}</Text>
                                        </Box>
                                    </Box>
                                </Flex>
                            </Box>
                        </Link>
                    </Box>
                    <Box className="md:hidden block text-xl relative mt-2">
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
                    </Box>
                    <Box className="flex items-center md:gap-2 md:text-black text-white">
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
                    </Box>
                </Box>
            </Box>
        </Box>
        <Box py={0} px={0} roundedTop={'xl'} bg={'white'} maxW={{'2xl' : '50%', xl : '60%', lg : '80%', base: '100%'}} mx={'auto'}>
            {/* <Navs/> */}
            <MobileNav/>
        </Box>
    </Box>
  )
}
