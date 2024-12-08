import React, { createContext, Suspense, useEffect, useState } from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { PiGreaterThan } from 'react-icons/pi'
import { FaAngleRight } from 'react-icons/fa'
import Header from '../../components/Header'
import Footer from '../../components/footer/Footer'
import Loading from '../../components/loader/Loading'

export const JewellerryContext = createContext();

const JeweComp = React.lazy(() => import('../../components/JeweComp/JeweComp'));

export default function Jewellery_page() {
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
          <Box bg={''} py={2} className='bg-zinc-200'>
              <Box maxW={{'2xl' : '80%', xl : '90%', lg : '97%', base: '97%'}} mx={'auto'}>
                  <Box bg={''} className="flex gap-1 items-center">
                      <Link to={'/'} className='text-[13px] text-gray-500'>Home</Link>
                      <PiGreaterThan className='text-[13px] text-gray-500 pt-1'/>
                      <Link to={'/fashion'} className='text-[13px] text-gray-500'>Fashion</Link>
                      <PiGreaterThan className='text-[13px] text-gray-500 pt-1'/>
                      <Link to={'/jewellery'} className='text-[13px] text-gray-500'>Jewelleries</Link>
                  </Box>
              </Box>
              <Flex mt={5} maxW={{'2xl' : '80%', xl : '90%', lg : '97%', base: '97%'}} mx={'auto'}  justifyContent={'center'} alignItems={'center'} height={{'xl': '270px',md: '240px', base: '200px'}} bgRepeat={'no-repeat'} bgSize={'cover'} bgPos={'center'} bgBlendMode={'multiply'} rounded={'md'} className='bg-slate-400' bgImage={'/jw.jpg'} position={'relative'}>
                <Box position={'absolute'}>
                  <Text color={'white'} fontWeight={500} textAlign={'center'}>SHOP</Text>
                  <Heading color={'white'} fontWeight={500} fontSize={{md: 40, base: 30}}>Women's Jewelleries</Heading>
                </Box>
              </Flex> 
              <Box mb={'5'}>
                  <Box mt={5} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'} className=''>
                      <Flex justifyContent={'space-between'} alignItems={'center'} className='bg-pink-600 text-white py-3 rounded-t-lg px-3'>
                          <Heading fontWeight={500} fontSize={20}>Women's Shirts</Heading>
                      </Flex>            
                  </Box>
                  <Box bg={'white'} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'} roundedBottom={'md'}>
                      <Box className="py-3 px-2 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6">
                          {
                              products.map((product) => (
                                  product.gender === 'female' && product.category === 'Jewellery' ? (
                                  <JewellerryContext.Provider value={product}>
                                      <Suspense fallback={<Loading/>}>
                                          <JeweComp product={product}/>
                                      </Suspense>
                                  </JewellerryContext.Provider>
                              ) : ''
                              ))
                          }
                      </Box>
                  </Box>
              </Box>
              <Flex mt={5} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'}  justifyContent={'center'} alignItems={'center'} height={{'xl': '270px',md: '240px', base: '200px'}} bgRepeat={'no-repeat'} bgSize={'cover'} bgPos={'center'} bgBlendMode={'multiply'} rounded={'md'} className='bg-slate-400' bgImage={'/jw2.jpg'} position={'relative'}>
                <Box position={'absolute'}>
                  <Text color={'white'} fontWeight={500} textAlign={'center'}>SHOP</Text>
                  <Heading color={'white'} fontWeight={500} fontSize={{md: 40, base: 30}}>Men's Jewelleries</Heading>
                </Box>
              </Flex>
              <Box mb={'10'}>
                  <Box mt={5} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'} className=''>
                      <Flex justifyContent={'space-between'} alignItems={'center'} className='bg-pink-600 text-white py-3 rounded-t-lg px-3'>
                          <Heading fontWeight={500} fontSize={20}>Men's Shirts</Heading>
                      </Flex>            
                  </Box>
                  <Box bg={'white'} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'} roundedBottom={'md'}>
                      <Box className="py-3 px-2 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6">
                          {
                              products.map((product) => (
                                  product.gender === 'male' && product.category === 'Jewellery' ? (
                                  <JewellerryContext.Provider value={product}>
                                      <Suspense fallback={<Loading/>}>
                                          <JeweComp product={product}/>
                                      </Suspense>
                                  </JewellerryContext.Provider>
                              ) : ''
                              ))
                          }
                      </Box>
                  </Box>
              </Box>
          </Box>
      <Footer/>
  </Box>
  )
}
