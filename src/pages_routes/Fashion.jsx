import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React, { Suspense, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/footer/Footer'
import { PiGreaterThan } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import Home_banner1 from '../components/banners/Home_banner1'
import TopDeals from '../components/Top_Deals/TopDeals'
import FashionXtra from '../components/FashionXtra/FashionXtra'
import Banner1 from '../components/FashionXtra/Banner1'
import Unisex from '../components/genders/Unisex'
import Top_sneakers from '../components/top_sneakers/Top_sneakers'
import Bags from '../components/Bags/Bags'
import FashionXtraBanner from '../components/FashionXtra/FashionXtraBanner'
import { createContext } from 'react'
import { FaNairaSign } from 'react-icons/fa6'
import Loading from '../components/loader/Loading'

export const FashionContext = createContext();
const FashionComp = React.lazy(() => import('../components/fashionSearchComp/FashionComp'))

export default function Fashion() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('https://adexify-api.vercel.app/api/products/all-products');

            const data = await res.json();

            setProducts(data);
        };
        fetchProducts();
    }, []);

  return (
    <Box>
        <Header/>
        <Box pb={4} className='bg-zinc-200'>
            <Box className="p-2">
                <Box maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'}>
                    <div className="flex gap-1 items-center">
                        <Link to={'/'} className='text-[13px] text-gray-500'>Home</Link>
                        <PiGreaterThan className='text-[13px] text-gray-500 pt-1'/>
                        <Link to={'/fashion'} className='text-[13px] text-gray-500'>Fashion</Link>
                    </div>
                </Box>
            </Box>
            <Box rounded={'md'} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'} bg={'white'} py={2} mt={3} mb={5}>
                <Heading fontWeight={500} fontSize={20} textAlign={'center'}>Fashion</Heading>
            </Box>
            <Box rounded={'md'} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'} py={2} mt={3} mb={5} className='bg-pink-600'>
                <Heading color={'white'} fontWeight={500} fontSize={20} textAlign={'center'} className='flex items-center gap-1 justify-center'>CALL TO ORDER 
                    <Link to={'tel:07047594667'}>07047594667</Link>
                </Heading>
            </Box>
            <Home_banner1/>
            <Box mt={6}>
                <FashionXtra/>
            </Box>
            <TopDeals/>
            <Banner1/>
            <Unisex/>
            <FashionXtraBanner/>
            <Bags/>
            <Top_sneakers/>
            <Box mt={10} mb={10} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'}>
                <Flex gap={5} flexWrap={'wrap'}>
                    <Box width={'300px'} height={'550px'} bg={'white'} rounded={'md'}>
                        <Box p={2}>
                            <Heading fontWeight={500} mb={0} fontSize={18}>Category</Heading>
                        </Box>
                        <Link className='text-sm'>
                            <Box py={2} px={3} className='hover:bg-zinc-200 duration-150'>
                                <Text>Men's Fashion</Text>
                            </Box>
                        </Link>
                        <Box pt={2}>
                            <Box  px={3}>
                                <Heading fontWeight={500} mb={2} fontSize={15}>Clothing</Heading>
                            </Box>
                            <Box>
                                <Link className='text-sm'>
                                    <Box py={2} px={8} className='hover:bg-zinc-200 duration-150'>
                                        <Text>Men's Sportswear</Text>
                                    </Box>
                                </Link>
                                <Link className='text-sm'>
                                    <Box py={2} px={8} className='hover:bg-zinc-200 duration-150'>
                                        <Text>Fashion Hoodies & Sweatshirts</Text>
                                    </Box>
                                </Link>
                                <Link className='text-sm'>
                                    <Box py={2} px={8} className='hover:bg-zinc-200 duration-150'>
                                        <Text>Jeans</Text>
                                    </Box>
                                </Link>
                                <Link className='text-sm'>
                                    <Box py={2} px={8} className='hover:bg-zinc-200 duration-150'>
                                        <Text>Pants</Text>
                                    </Box>
                                </Link>
                                <Link className='text-sm'>
                                    <Box py={2} px={8} className='hover:bg-zinc-200 duration-150'>
                                        <Text>Shirts</Text>
                                    </Box>
                                </Link>
                                <Link className='text-sm'>
                                    <Box py={2} px={8} className='hover:bg-zinc-200 duration-150'>
                                        <Text>Underwear</Text>
                                    </Box>
                                </Link>
                                <Link className='text-sm'>
                                    <Box py={2} px={8} className='hover:bg-zinc-200 duration-150'>
                                        <Text>Shoes</Text>
                                    </Box>
                                </Link>
                                <Link className='text-sm'>
                                    <Box py={2} px={8} className='hover:bg-zinc-200 duration-150'>
                                        <Text>Sandals</Text>
                                    </Box>
                                </Link>
                                <Link className='text-sm'>
                                    <Box py={2} px={8} className='hover:bg-zinc-200 duration-150'>
                                        <Text>Socks</Text>
                                    </Box>
                                </Link>
                                <Box borderWidth={1} borderTopColor={'gray.200'} borderBottomColor={'gray.200'} borderRight={0} borderLeft={0} py={3} px={3} mt={5}>
                                    <Flex justifyContent={'space-between'} alignItems={'center'}>
                                        <Text className='flex items-center text-[16px] font-medium'>PRICE (<FaNairaSign className='text-[16px]'/>)</Text>
                                        <Box px={3} py={1} rounded={'md'} className='flex justify-center items-center bg-pink-300 hover:bg-pink-600 duration-200 hover:text-white text-black font-medium'>
                                            <Text>APPLY</Text>
                                        </Box>
                                    </Flex>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box flex={1} bg={'white'} rounded={'md'} p={2}>
                        <Box className="py-3 px-2 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-3">
                            {
                                products.map((product) => (
                                    product.gender === 'male' ? (
                                    <FashionContext.Provider value={product}>
                                        <Suspense fallback={<Loading/>}>
                                            <FashionComp key={product._id} product={product}/>
                                        </Suspense>
                                    </FashionContext.Provider>
                                ) : ''
                                ))
                            }
                        </Box>
                    </Box>
                </Flex>
            </Box>
        </Box>
        <Footer/>
    </Box>
  )
}
