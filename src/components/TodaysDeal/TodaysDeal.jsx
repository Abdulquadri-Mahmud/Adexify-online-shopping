import { Box, Heading } from '@chakra-ui/react'
import React, { createContext, Suspense, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Todays_deals_pag from '../paginations/todays_deals_pag/Todays_deals_pag';
import { FaAngleRight } from 'react-icons/fa';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  
    const { className, style, onClick } = props;
    return (
      <Box bg={'pink.600'} width={'30px'} height={'30px'} rounded={'full'}
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
      <Box bg={'gray.100'} width={'30px'} height={'30px'} rounded={'full'}
        left={'1vh'} zIndex={'10'}
        className={className}
        style={{ ...style, display: "none", 
          paddingTop: '5.5px', paddingLeft: '5.5px',
        }}
        onClick={onClick}
      />
    );
}

import Slider from "react-slick";
import Loading from '../loader/Loading';

const TodaysDealsProducts = React.lazy(() => import('./TodaysDealsProducts'))

export const TodaysDealsProductsContext = createContext();

export default function TodaysDeal() {
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

    const settings = {
      dots: false,
      infinite: true,
      focusOnSelect: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      // autoplay: true,
      autoplaySpeed: 2500,
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

  return (
    <Box className='my-10 bg-white rounded-md' maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'}>
      <Box className='bg-pink-600 py-3 rounded-t-lg px-3 '>
        <Box maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'} className="flex justify-between items-center gap-4">
            <Heading fontWeight={500} fontSize={{md:20, base: 18}} color={'white'} className='text-xl'>Today's Deals</Heading>
            <Link to={'/'} className='text-[12px] font-medium text-white uppercase flex items-center'>See All <FaAngleRight className='text-[20px]'/></Link>
        </Box>
      </Box>
      <div className="">
        <Slider {...settings}>
          {
              currentPost.length > 0 && currentPost.map((product) => (
                  <TodaysDealsProductsContext.Provider value={product}>
                    <Suspense fallback={<Loading/>}>
                      <TodaysDealsProducts product={product}/>
                    </Suspense>
                  </TodaysDealsProductsContext.Provider>
              ))
          }
        </Slider>
      </div>
      <Box pb={5}>
        {/* <Todays_deals_pag postPerPage={postPerPage} totalPost={products.length} paginate={paginate}/> */}
      </Box>
    </Box>
  )
}
