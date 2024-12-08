import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  
    const { className, style, onClick } = props;
    return (
      <Box bg={''} width={'30px'} height={'30px'} rounded={'full'}
      right={'5vh'}  
      className={className}
        style={{ ...style, display: "block",
          paddingTop: '5.5px', paddingLeft: '5.5px',
        }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <Box bg={''} width={'30px'} height={'30px'} rounded={'full'}
        left={'5vh'} zIndex={'10'}
        className={className}
        style={{ ...style, display: "block", 
          paddingTop: '5.5px', paddingLeft: '5.5px',
        }}
        onClick={onClick}
      />
    );
}
import Slider from "react-slick";


import img1 from '/img2.jpg';
import img2 from '/img3.jpg';
import img3 from '/img4.jpg';
import img4 from '/img5.jpg';
import img5 from '/img6.jpg';
import img6 from '/img7.jpg';

import { Box, Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Section1() {
    const settings = {
        dots: false,
        infinite: true,
        focusOnSelect: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        waitForAnimate: false,
        cssEase: "linear",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
              }
            },
            {
              breakpoint: 600,
              settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
              breakpoint: 420,
              settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    };

  return (
    <Box maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mt={{md:10, base: 5}} mx={'auto'} className="bg-white py-8 rounded-md mt-3">

        <div className='text-black font-medium'>
            <Heading pb={6} color={'black'} fontWeight={500} fontSize={{md: 30, base: 20}} textAlign={'center'}>Choose Department</Heading>
            <Slider {...settings}>
                <div className="p-2">
                    <Link to={"/mens-wear"}>
                        <Flex justifyContent={'center'} alignItems={'center'} color={'white'} bgImage={img1} height={'200px'} bgRepeat={'no-repeat'} bgBlendMode={'multiply'} bgPos={'top'} bgSize={'cover'} className="bg-gray-400 uppercase text-xl bbbbbbbbbbbv   rounded-md p-2">
                            <div className="">
                                <h2>Men's Wear</h2>
                            </div>
                        </Flex>
                    </Link>
                </div>
                <div className="p-2">
                    <Link to={"/womens-wear"}>
                        <Flex justifyContent={'center'} alignItems={'center'} color={'white'} bgImage={img2} height={'200px'} bgRepeat={'no-repeat'} bgBlendMode={'multiply'} bgPos={'top'} bgSize={'cover'} className="bg-gray-400 uppercase text-xl bbbbbbbbbbbv   rounded-md p-2">
                            <div className="">
                                <h2>Women's Wear</h2>
                            </div>
                        </Flex>
                    </Link>
                </div>
                <div className="p-2">
                    <Link to={"/mens-wear"}>
                        <Flex justifyContent={'center'} alignItems={'center'} color={'white'} bgImage={img1} height={'200px'} bgRepeat={'no-repeat'} bgBlendMode={'multiply'} bgPos={'top'} bgSize={'cover'} className="bg-gray-400 uppercase text-xl bbbbbbbbbbbv   rounded-md p-2">
                            <div className="">
                                <h2>Men's Bags</h2>
                            </div>
                        </Flex>
                    </Link>
                </div>
                <div className="p-2">
                    <Link to={'/'}>
                        <Flex justifyContent={'center'} alignItems={'center'} color={'white'} bgImage={img3} height={'200px'} bgRepeat={'no-repeat'} bgBlendMode={'multiply'} bgPos={'top'} bgSize={'cover'} className="bg-gray-400 uppercase text-xl bbbbbbbbbbbv   rounded-md p-2">
                            <div className="">
                                <h2>Women's Bags</h2>
                            </div>
                        </Flex>
                    </Link>
                </div>
                <div className="p-2">
                    <Link to={'/'}>
                        <Flex justifyContent={'center'} alignItems={'center'} color={'white'} bgImage={img5} height={'200px'} bgRepeat={'no-repeat'} bgBlendMode={'multiply'} bgPos={'top'} bgSize={'cover'} className="bg-gray-400 uppercase text-xl bbbbbbbbbbbv   rounded-md p-2">
                            <div className="">
                                <h2>Men's Shoes</h2>
                            </div>
                        </Flex>
                    </Link>
                </div>
                <div className="p-2">
                    <Link to={'/'}>
                        <Flex justifyContent={'center'} alignItems={'center'} color={'white'} bgImage={img4} height={'200px'} bgRepeat={'no-repeat'} bgBlendMode={'multiply'} bgPos={'top'} bgSize={'cover'} className="bg-gray-400 uppercase text-xl bbbbbbbbbbbv   rounded-md p-2">
                            <div className="">
                                <h2>Women's Shoes</h2>
                            </div>
                        </Flex>
                    </Link>
                </div>
                <div className="p-2">
                    <Link to={'/'}>
                        <Flex justifyContent={'center'} alignItems={'center'} color={'white'} bgImage={img6} height={'200px'} bgRepeat={'no-repeat'} bgBlendMode={'multiply'} bgPos={'top'} bgSize={'cover'} className="bg-gray-400 uppercase text-xl bbbbbbbbbbbv   rounded-md p-2">
                            <div className="">
                                <h2>Jewelleries</h2>
                            </div>
                        </Flex>
                    </Link>
                </div>
            </Slider>
        </div>
    </Box>
  )
}
