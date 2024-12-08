import { Box, Heading } from '@chakra-ui/react'
import React, { createContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Todays_deals_pag from '../paginations/todays_deals_pag/Todays_deals_pag';
import Recommended_Products from './Recommended_Products';

export const RecommendedDealsProductsContext = createContext();

export default function Recommended() {
    const [products, setProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(12);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('https://adexify-api.vercel.app/api/products/all-products');

            const data = await res.json();

            setProducts(data);

        };
        fetchProducts();
    }, []);

    const startIndex = currentPage * postPerPage;
    const endIndex = startIndex - postPerPage;

    const currentPost = products.slice(endIndex, startIndex);

    const paginate  = paginate => setCurrentPage(paginate);

  return (
    <Box className='my-10 bg-white' maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'} rounded={'md'}>
      <Box className="sticky top-0 py-3 rounded-t-lg px-3 flex justify-between items-center gap-4">
          <Heading fontWeight={500} fontSize={{md:20, base: 18}} color={'black'} className='text-xl'>Recommended For You</Heading>
          <Link to={'/'} className='text-[12px] font-medium text-black'>See All Items</Link>
      </Box>
      <Box maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'}>
        <div className="py-3 px-2 grid 2xl:grid-cols-8 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
          {
              currentPost.length > 0 && currentPost.map((product, index) => (
                  product.price >= 10000 ? (
                      <RecommendedDealsProductsContext.Provider value={product}>
                          <Recommended_Products product={product} key={index}/>
                      </RecommendedDealsProductsContext.Provider>
                  ) : ''
              ))
          }
        </div>
        <Box pb={5}>
          <Todays_deals_pag postPerPage={postPerPage} totalPost={products.length} paginate={paginate}/>
        </Box>
      </Box>
    </Box>
  )
}
