import { Box, Heading } from '@chakra-ui/react'
import React, { createContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';

export const FashProductsContext = createContext();

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  
    const { className, style, onClick } = props;
    return (
      <Box bg={'gray.300'} width={'30px'} height={'30px'} rounded={'full'}
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
      <Box bg={'gray.300'} width={'30px'} height={'30px'} rounded={'full'}
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
import Fash from './Fash';

export default function FashionXtra() {
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

  const startIndex = currentPage * postPerPage;
  const endIndex = startIndex - postPerPage;

  const currentPost = products.slice(endIndex, startIndex);

  return (
    <Box maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} className='mt-10 md:mb-0 mb-0 bg-white rounded-lg'>
        <Box borderBottomWidth={'1px'} borderBottom={'solid gray.300'} className='bg-white py-3 rounded-t-lg px-3 text-white'>
            <Box className="flex justify-between items-center" color={'gray.800'}>
                <Heading fontWeight={500} fontSize={{md:20, base: 18}} className='text-xl '>Fashion Xtra</Heading>
                <Link to={'/'} className='text-[13px] font-medium uppercase flex items-center'>See All <FaAngleRight className='text-[13px]'/></Link>
            </Box>
        </Box>
      <Box bg={'white'} p={2} roundedBottom={'md'}>
        <Slider {...settings}>
          {
              currentPost.map((product) => (
                product.price >= 1000 ? (
                  <Box key={product._id} p={1} shadow={'md'}>
                    <FashProductsContext.Provider value={product}>
                        <Fash product={product}/>
                    </FashProductsContext.Provider>
                  </Box>
                ) : ''
              ))
          }
        </Slider>
      </Box>
    </Box>
  )
}
