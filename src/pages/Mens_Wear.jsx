import { Box, Heading, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import React, { createContext, Suspense, useEffect, useState } from 'react'
import Header from '../components/Header';

export const MensWearProductsContext = createContext();

const Mens_wear_products = React.lazy(() => import('../components/mens_wear/Mens_wear_products'))

export default function Mens_Wear() {
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

        <Box className="bg-white p-2 shadow-md">
            <Box className="flex gap-1 items-center">
                <Link to={'/'} className='text-[13px]'>Back to home page</Link>
                <PiGreaterThan className='text-[13px] pt-1 text-gray-400'/>
                <Link to={'/menswear'} className='text-[13px]'>Men's Fashion</Link>
            </Box>
            <Box mt={4} className='flex gap-2 items-center'>
                {/* <div className="flex items-center gap-1 bg-pink-200 py-1 px-2 rounded-r-xl w-[140px]">
                    <FaSmileBeam className='text-sm text-pink-600'/>
                    <Heading fontSize={13} fontFamily={'revert'} className='font-medium uppercase'>Ade<span className="text-pink-600">X</span>ify <span className="black">Now</span></Heading>
                </div> */}
                <Heading fontWeight={500} fontSize={25}>Men's Wear</Heading>
            </Box>
        </Box>
        <Box my={'10'} p={5} bg={'white'}>
            <Box>
                <div className="py-3 px-2 grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
                    {
                        products.map((product) => (
                            product.gender === "male" ? (
                                <>
                                    <MensWearProductsContext.Provider value={product}>
                                        <Suspense fallback={<div className='text-black'>Loading...</div>}>
                                            <Mens_wear_products product={product}/>
                                        </Suspense>
                                    </MensWearProductsContext.Provider>
                                </>
                            ) : ''
                        ))
                    }
                </div>
            </Box>
        </Box>
    </Box>
  )
}
