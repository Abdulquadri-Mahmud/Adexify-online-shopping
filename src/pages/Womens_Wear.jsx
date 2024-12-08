import { Box, Heading, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import React, { createContext, Suspense, useEffect, useState } from 'react'
import { FaSmileBeam } from 'react-icons/fa';
import { PiGreaterThan } from 'react-icons/pi';
import Header from '../components/Header';
// import Womens_wear_products from '../components/womens_wear/Womens_wear_products';

export const WomensWearProductsContext = createContext();

const Womens_wear_products = React.lazy(() => import('../components/womens_wear/Womens_wear_products'))

export default function Womens_Wear() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('https://adexify-api.vercel.app/api/products/all-products');

            const data = await res.json();

            setProducts(data);
        };
        fetchProducts();
    }, []);

    // useEffect(() => {
    //     location.reload();
    // }, location.reload());

  return (
    <Box>
      <Header/>

        <Box className='bg-zinc-100'>
            <Box bg={'white'}>
                <Box maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'} className="bg-white p-2">
                    <Box className="flex gap-1 items-center">
                        <Link to={'/'} className='text-[13px]'>Back to home page</Link>
                        <PiGreaterThan className='text-[13px] pt-1 text-gray-400'/>
                        <Link to={'/'} className='text-[13px]'>Women's Fashion</Link>
                    </Box>
                    <Box mt={4} className='flex gap-2 items-center'>
                        {/* <div className="flex items-center gap-1 bg-pink-200 py-1 px-2 rounded-r-xl w-[140px]">
                            <FaSmileBeam className='text-sm text-pink-600'/>
                            <Heading fontSize={13} fontFamily={'revert'} className='font-medium uppercase'>Ade<span className="text-pink-600">X</span>ify <span className="black">Now</span></Heading>
                        </div> */}
                        <Heading fontWeight={500} fontSize={25}>Women's Wear</Heading>
                    </Box>
                </Box>
            </Box>
            <Box my={'10'} p={5} bg={'white'}>
                {/* <Box mb={2}>
                    <Text className='animate-pulse text-center text-pink-600' fontSize={'13px'} fontWeight={500}>Shop What You Desire On Adexify Now</Text>
                </Box> */}
                <Box maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} bg={'white'} mx={'auto'}>
                    <div className="py-3 px-2 grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
                        {
                            products.map((product) => (
                                product.category === "womenswear" ? (
                                    <>
                                        <WomensWearProductsContext.Provider value={product}>
                                            <Suspense fallback={<div className='text-black'>Loading...</div>}>
                                                <Womens_wear_products product={product}/>
                                            </Suspense>
                                        </WomensWearProductsContext.Provider>
                                    </>
                                ) : ''
                            ))
                        }
                    </div>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}
