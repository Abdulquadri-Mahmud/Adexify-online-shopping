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

import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Section1() {
    const settings = {
        dots: false,
        infinite: true,
        // focusOnSelect: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        waitForAnimate: false,
        cssEase: "linear",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 3,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
              }
            },
            {
              breakpoint: 600,
              settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            }
        ]
    };

  return (
    <Box maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mt={{md:10, base: 5}} mx={'auto'} className="bg-white py-5 rounded-md mt-3">

        <div className='text-black font-medium'>
            <Heading pb={{md:6, base: '3'}} color={'black'} fontWeight={500} fontSize={{md: 30, base: 20}} textAlign={'center'}>Choose Department</Heading>
            <Slider {...settings}>
                <div className="p-2">
                    <Link to={"/mens-clothing"}>
                        <Flex justifyContent={'center'} alignItems={'center'} color={'white'} bgImage={img1} height={{md:'160px', base: '100px'}} bgRepeat={'no-repeat'} bgBlendMode={'multiply'} bgPos={'top'} bgSize={'cover'} className="bg-gray-400 uppercase text-xl bbbbbbbbbbbv   rounded-md p-2">
                            <div className="">
                                <Text fontSize={{ base: '10px', md: '14px' }}>Men's Wear</Text>
                            </div>
                        </Flex>
                    </Link>
                </div>
                <div className="p-2">
                    <Link to={"/womens-clothing"}>
                        <Flex justifyContent={'center'} alignItems={'center'} color={'white'} bgImage={img2} height={{md:'160px', base: '100px'}} bgRepeat={'no-repeat'} bgBlendMode={'multiply'} bgPos={'top'} bgSize={'cover'} className="bg-gray-400 uppercase text-xl bbbbbbbbbbbv   rounded-md p-2">
                            <div className="">
                                <Text fontSize={{ base: '10px', md: '14px' }}>Women's Wear</Text>
                            </div>
                        </Flex>
                    </Link>
                </div>
                <div className="p-2">
                    <Link to={"/category?category=Bags"}>
                        <Flex justifyContent={'center'} alignItems={'center'} color={'white'} bgImage={img1} height={{md:'160px', base: '100px'}} bgRepeat={'no-repeat'} bgBlendMode={'multiply'} bgPos={'top'} bgSize={'cover'} className="bg-gray-400 uppercase text-xl bbbbbbbbbbbv   rounded-md p-2">
                            <div className="">
                                <Text fontSize={{ base: '10px', md: '14px' }}>Men's Bags</Text>
                            </div>
                        </Flex>
                    </Link>
                </div>
                <div className="p-2">
                    <Link to={'/category?category=Bags'}>
                        <Flex justifyContent={'center'} alignItems={'center'} color={'white'} bgImage={img3} height={{md:'160px', base: '100px'}} bgRepeat={'no-repeat'} bgBlendMode={'multiply'} bgPos={'top'} bgSize={'cover'} className="bg-gray-400 uppercase text-xl bbbbbbbbbbbv   rounded-md p-2">
                            <div className="">
                                <Text fontSize={{ base: '10px', md: '14px' }}>Women's Bags</Text>
                            </div>
                        </Flex>
                    </Link>
                </div>
                <div className="p-2">
                    <Link to={'/category?category=Shoes'}>
                        <Flex justifyContent={'center'} alignItems={'center'} color={'white'} bgImage={img5} height={{md:'160px', base: '100px'}} bgRepeat={'no-repeat'} bgBlendMode={'multiply'} bgPos={'top'} bgSize={'cover'} className="bg-gray-400 uppercase text-xl bbbbbbbbbbbv   rounded-md p-2">
                            <div className="">
                                <Text fontSize={{ base: '10px', md: '14px' }}>Men's Shoes</Text>
                            </div>
                        </Flex>
                    </Link>
                </div>
                <div className="p-2">
                    <Link to={'/category?category=Shoes'}>
                        <Flex justifyContent={'center'} alignItems={'center'} color={'white'} bgImage={img4} height={{md:'160px', base: '100px'}} bgRepeat={'no-repeat'} bgBlendMode={'multiply'} bgPos={'top'} bgSize={'cover'} className="bg-gray-400 uppercase text-xl bbbbbbbbbbbv   rounded-md p-2">
                            <div className="">
                                <Text fontSize={{ base: '10px', md: '14px' }}>Women's Shoes</Text>
                            </div>
                        </Flex>
                    </Link>
                </div>
                <div className="p-2">
                    <Link to={'/category?category=Jewellery'}>
                        <Flex justifyContent={'center'} alignItems={'center'} color={'white'} bgImage={img6} height={{md:'160px', base: '100px'}} bgRepeat={'no-repeat'} bgBlendMode={'multiply'} bgPos={'top'} bgSize={'cover'} className="bg-gray-400 uppercase text-xl bbbbbbbbbbbv   rounded-md p-2">
                            <div className="">
                                <Text fontSize={{ base: '10px', md: '14px' }}>Jewelleries</Text>
                            </div>
                        </Flex>
                    </Link>
                </div>
            </Slider>
        </div>
    </Box>
  )
}
