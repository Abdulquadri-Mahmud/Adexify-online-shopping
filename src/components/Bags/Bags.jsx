import { Box, Heading } from '@chakra-ui/react'
import React, { createContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';

export const BagsProductsContext = createContext();

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  
    const { className, style, onClick } = props;
    return (
      <Box bg={''} width={'30px'} height={'30px'} rounded={'full'}
      right={'1vh'}  
      className={className}
        style={{ ...style, display: "block",
          paddingTop: '5.7px', paddingLeft: '5.7px',
        }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <Box bg={'pink.600'} width={'30px'} height={'30px'} rounded={'full'}
        left={'1vh'} zIndex={'10'}
        className={className}
        style={{ ...style, display: "none", 
          paddingTop: '5.7px', paddingLeft: '5.7px',
        }}
        onClick={onClick}
      />
    );
}
import Slider from "react-slick";
import Bag from './Bag';

export default function Bags() {
    const [products, setProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(6);

    useEffect(() => {
      const fetchProducts = async () => {
          const res = await fetch('https://adexify-api.vercel.app/api/products/all-products');

          const data = await res.json();

          setProducts(data);

      };
      fetchProducts();
    }, []);

    const settings = {
      dots: false,
      infinite: true,
      focusOnSelect: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      // autoplay: true,
      autoplaySpeed: 3500,
      waitForAnimate: false,
      cssEase: "linear",
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 600,
            settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
              }
          },
          {
            breakpoint: 420,
            settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
              }
          },
      ]
    };

    const bags = [];

    if (products.length > 0) {
      products.map((pro) => {
        if (pro.category === 'Bags' && pro.price >= 5000) {
            bags.push(pro);
        }
      })
    }

  const startIndex = currentPage * postPerPage;
  const endIndex = startIndex - postPerPage;

  const currentPost = bags.slice(endIndex, startIndex);

  const paginate  = paginate => setCurrentPage(paginate);

  return (
    <Box mt={7} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'} className='md:mb-0 mb-0 bg-white rounded-lg'>
        <Box className='text-white bg-pink-600 py-3 rounded-t-lg px-3'>
            <Box className="flex justify-between items-center">
                <Heading fontWeight={500} fontSize={{md:20, base: 18}} className='text-xl '>Top Bags Collection</Heading>
                <Link to={'/'} className='text-[13px] font-medium uppercase flex items-center text-white'>See All <FaAngleRight className='text-[13px]'/></Link>
            </Box>
        </Box>
      <Box bg={'white'} p={2} roundedBottom={'md'}>
        <Slider {...settings}>
          {
              currentPost.map((product) => (
                product.deal === 'great' ? (
                  <Box key={product._id} p={1} shadow={'md'}>
                    <BagsProductsContext.Provider value={product}>
                        <Bag product={product}/>
                    </BagsProductsContext.Provider>
                  </Box>
                ) : ''
              ))
          }
        </Slider>
      </Box>
      {/* <Box pb={5} mt={4}>
        <Top_deals_pag postPerPage={postPerPage} totalPost={products.length} paginate={paginate}/>
      </Box> */}
    </Box>
  )
}
