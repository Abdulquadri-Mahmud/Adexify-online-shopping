import { Box, Flex, Heading, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import React, { createContext, Suspense, useEffect, useState } from 'react'
import { FaAngleRight } from 'react-icons/fa';
import { PiGreaterThan } from 'react-icons/pi';

export const Men_ClothingContext = createContext();
export const Hoodies_Sweater_Context = createContext();
export const ShirtsComp_Context = createContext();
export const MenSearchComp_Context = createContext();

const Men_Clothing = React.lazy(() => import('../../components/clothing/Men_Clothing.jsx'));
const Hoodies_Sweater = React.lazy(() => import('../../hoodies&sweater/Hoodies_Sweater'));
const ShirtsComp = React.lazy(() => import('../../components/mens_wear/ShirtsComp.jsx'));

import Home_banner4 from '../../components/banners/Home_banner4.jsx';
import Header from '../../components/Header.jsx';
import Loading from '../../components/loader/Loading.jsx';
import Adverts from '../../components/Adverts/Adverts.jsx';
import Footer from '../../components/footer/Footer.jsx';
import MenCategory from '../../components/Bottom_Categories/MenCategory.jsx';
import FemaleSalesBanner from '../../components/banners/FemaleSalesBanner.jsx';
import MaleSalesBanner from '../../components/banners/MaleSalesBanner.jsx';

const SuggestedSection = () => {
  return (
    <Box maxW={{ '2xl': '80%', xl: '95%', lg: '100%', base: '97%' }} mx="auto" bg={useColorModeValue('white', 'gray.800')} p={{ base: 4, md: 6 }} mt={6} rounded="2xl" boxShadow="lg">
      <Heading fontSize={{ base: 'xl', md: '2xl' }} color="gray.800" borderBottom="1px solid" borderColor="gray.300" pb={3} mb={4} position="relative" _after={{
          content: '""',
          position: 'absolute',
          bottom: '-2px',
          left: 0,
          width: '50px',
          height: '4px',
          bgGradient: 'linear(to-r, pink.500, gray.800)',
        }}>
        You may also like
      </Heading>

      <Box bg={useColorModeValue('gray.100', 'gray.700')} p={{ base: 3, md: 4 }} rounded="lg" boxShadow="md" transition="all 0.3s" _hover={{ transform: 'scale(1.01)', boxShadow: 'xl' }}>
        <FemaleSalesBanner/>
      </Box>
    </Box>
  );
};

const MenHeader = () => {

    return (
        <>
            <Box bg={''} py={2}>
                <Box mt={4} maxW={{'2xl' : '80%', xl : '95%', lg : '97%', base: '97%'}} mx={'auto'} bg={'white'} py={4} px={6} rounded={'md'}>
                    <Box bg={''} className="flex gap-1 items-center">
                        <Link to={'/'} className='text-[13px] text-gray-500'>Home</Link>
                        <PiGreaterThan className='text-[13px] text-gray-500 pt-1'/>
                        <Link to={'/fashion'} className='text-[13px] text-gray-500'>Fashion</Link>
                        <PiGreaterThan className='text-[13px] text-gray-500 pt-1'/>
                        <Link to={'/womens-clothing'} className='text-[13px] text-gray-500'>Women's Fashion</Link>
                    </Box>
                </Box>
            </Box>
            <Box rounded={'md'} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} py={2} mt={3} mb={5} className='bg-pink-500'>
                <Heading color={'white'} fontWeight={500} fontSize={20} textAlign={'center'} className='flex items-center gap-1 justify-center'>CALL TO ORDER 
                    <Link to={'tel:07047594667'}>07047594667</Link>
                </Heading>
            </Box>
            
            <Box bg={'white'} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} rounded={'md'} p={2} mt={4}>
                <Flex justifyContent={'center'} alignItems={'center'} p={2} height={{'xl': '300px',md: '220px', base: '200px'}} bgRepeat={'no-repeat'} bgSize={'cover'} bgPos={'top'} bgBlendMode={'multiply'} className='bg-slate-400' bgImage={'/hero2.jpg'} position={'relative'}>
                    <Box position={'absolute'}>
                        <Text color={'white'} fontWeight={500} textAlign={'center'}>SHOP</Text>
                        <Heading color={'white'} fontWeight={500} fontSize={{md: 40, base: 30}}>Men's Fahion</Heading>
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default function Men_Clothing_page() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://adexify-api.vercel.app/api/products/all-products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false); // ✅ always stop loading
      }
    };

    fetchProducts();
  }, []);

  const renderSection = (title, context, Component, filterFn) => {
    const filtered = products.filter(filterFn).slice(0, 6);

    return (
      <Box maxW={{ '2xl': '80%', xl: '95%', lg: '100%', base: '97%' }} mx={'auto'} className='mt-10 bg-white rounded-lg'>
        <Box>
            <Flex color='white' bg={'pink.500'} borderBottomWidth={'1px'} borderBottom={'solid gray.300'} p={3} mx={'auto'} className=' rounded-t-lg flex justify-between items-center gap-4 '>
                <Heading fontWeight={500} fontSize={20}>{title}</Heading>
                <Link className='font-medium uppercase text-sm flex items-center'>See All <FaAngleRight className='text-[20px]' /></Link>
            </Flex>
        </Box>
        <Box p={2}>
          {loading ? (
            // 🔹 Skeleton loader grid
            <SimpleGrid bg={"white"} rounded={"xl"} gap={4} columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={3} py={3} px={2}>
              {[...Array(8)].map((_, index) => (
                <SimpleGrid key={index} bg="gray.200" p={4} borderRadius="lg" border={"1px solid"} borderColor={"gray.200"} opacity={0.6}>
                  <Box h="150px" bg="gray.300" mb={4} />
                  <Box h="2" bg="gray.300" w="75%" mb={2} />
                  <Box h="2" bg="gray.300" w="50%" mb={2} />
                  <Box h="2" bg="gray.300" w="50%" />
                  <Box h="10" bg="gray.300" w="full" mt={3} />
                </SimpleGrid>
              ))}
            </SimpleGrid>
          ) : (
            <SimpleGrid columns={{ base: 2, sm: 2, md: 5, xl: 6 }} spacing={3}>
              {filtered.map((product) => (
                <context.Provider key={product._id} value={product}>
                  {/* 🔹 Direct render, no Suspense */}
                  <Component product={product} />
                </context.Provider>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box className='bg-zinc-200'>
      <Header />

      <MenHeader/>

      <Box py={4}>
        <MaleSalesBanner />

        {renderSection('Top Picks', Men_ClothingContext, Men_Clothing, product => product.gender === 'male')}
        {renderSection('Top Shirts', ShirtsComp_Context, ShirtsComp, product => product.gender === 'male' && product.category === 'Shirt')}
        <MaleSalesBanner />
        {renderSection('Top Shoes', ShirtsComp_Context, ShirtsComp, product => product.gender === 'male' && product.category === 'Shoes')}
        {renderSection('Top Bags', ShirtsComp_Context, ShirtsComp, product => product.gender === 'male' && product.category === 'Bags')}
        <Home_banner4 />
        {renderSection('Top Pants', Hoodies_Sweater_Context, Hoodies_Sweater, product => product.gender === 'male' && product.category === 'Pants')}
        {renderSection('Top Underwear', Hoodies_Sweater_Context, Hoodies_Sweater, product => product.gender === 'male' && product.category === 'Underwear')}

        <MaleSalesBanner />
        <SuggestedSection />
        <Box my='4'/>
        <MenCategory />
        <Adverts />
      </Box>

      <Footer />
    </Box>
  );
}
