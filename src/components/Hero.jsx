import React from 'react'
import { Flex, Image, useColorModeValue } from '@chakra-ui/react';
import { Box, Text, Heading, Button} from '@chakra-ui/react';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from 'react-icons/md';

function SampleNextArrow(props) {
  
    const { className, style, onClick } = props;
    return (
      <Box bgGradient='linear(to-l, red.500, gray.800)'
        className={className}
        style={{ ...style, display: "none",
          paddingTop: '5.5px', paddingLeft: '5.5px',
        }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <Box bgGradient='linear(to-l, red.500, gray.800)'
        className={className}
        style={{ ...style, display: "none", 
          paddingTop: '5.5px', paddingLeft: '5.5px',
        }}
        onClick={onClick}
      />
    );
}

export default function Hero() {
    const settings = {
        dots: false,
        fade: true,
        infinite: true,
        focusOnSelect: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        waitForAnimate: true,
        cssEase: "linear",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    
  return (
    <Box pt={5}>
      <Box bg={'white'} p={3} rounded={'md'} className='flex gap-3 flex-nowrap' height={{'xl':'61vh', base:'74vh'}} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'}>
        <Box overflow={'hidden'} width={{md:'60%', base: '100%'}}>
            <Slider {...settings}>
              <Box height={{'xl':'57vh', base:'70vh'}} rounded={'md'} bgPos={'top'} bgImage={'/hero1.jpg'} className='pt-10 px-2 md:px-0 bgImage bg-slate-400'>
                <Flex justifyContent={{md:'center', base: 'center'}} alignItems={'center'} gap={3} className='flex-wrap' p={{md:0, base: 0}} maxW={{md: '100%', base: '100%'}} mx={'auto'} height={'100%'}>
                  <Flex gap={3} flexDir={'column'} color={'black'} className='p-3 md:py-7 rounded-md '>
                    <div className="flex items-center">
                      <Heading fontWeight={500} fontSize={{md: 40, base:25}} color={'white'} textAlign={'center'}>Inside Adexify: <br /> A Sneak Peek Into Our Amazing Shop</Heading>
                    </div>
                    <div className="">
                      <Text fontFamily={''} className='text-center font-medium py-2 text-white'>Shop What You Desire On ADEXIFY</Text>
                      <Text fontFamily={''} className='text-center font-medium text-white'>We are here to save your time and money</Text>
                    </div>
                    <Flex justifyContent={{md:'center', base: 'center'}}>
                      <Button bg={'pink.500'} color={'white'} border={'none'} outline={'none'} _hover={{bg:'pink.600', color: 'white'}} transitionDuration={'0.3s'} className='uppercase bg-pink-600 text-white font-medium px-6 py-2 rounded-md'>Start Shopping</Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>
              <Box height={{'xl':'57vh', base:'70vh'}} rounded={'md'} bgPos={'top'} bgImage={'/bg1.gif'} className='pt-10 px-2 md:px-0 bgImage bg-slate-400'>
                <Flex justifyContent={{md:'center', base: 'center'}} alignItems={'center'} gap={3} className='flex-wrap' p={{md:0, base: 0}} maxW={{md: '90%', base: '100%'}} mx={'auto'} height={'100%'}>
                  <Flex gap={3} flexDir={'column'} color={'black'} className='p-3 md:py-7 rounded-md '>
                    <div className="flex items-center">
                      <Heading fontWeight={500} fontSize={{md: 40, base:25}} color={'white'} textAlign={'center'}>Inside Adexify: <br /> A Sneak Peek Into Our Amazing Shop</Heading>
                    </div>
                    <div className="">
                      <Text fontFamily={''} className='text-center font-medium py-2 text-white'>Shop What You Desire On ADEXIFY</Text>
                      <Text fontFamily={''} className='text-center font-medium text-white'>We are here to save your time and money</Text>
                    </div>
                    <Flex justifyContent={{md:'center', base: 'center'}}>
                      <Button bg={'pink.500'} color={'white'} border={'none'} outline={'none'} _hover={{bg:'pink.600', color: 'white'}} transitionDuration={'0.3s'} className='uppercase bg-pink-600 text-white font-medium px-6 py-2 rounded-md'>Start Shopping</Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>
              <Box height={{'xl':'57vh', base:'70vh'}} rounded={'md'} bgPos={'right'} bgSize={'cover'} bgImage={'/hero.jpg'} className='pt-10 px-2 md:px-0 bgImage bg-slate-300'>
                <Flex justifyContent={{md:'center', base: 'center'}} alignItems={'center'} gap={3} className='flex-wrap' p={{md:0, base: 0}} maxW={{md: '90%', base: '100%'}} mx={'auto'} height={'100%'}>
                  <Flex gap={3} flexDir={'column'} color={'black'} className='p-3 md:py-7 rounded-md '>
                    <div className="flex items-center">
                      <Heading fontWeight={500} fontSize={{md: 40, base:25}} color={'white'} textAlign={'center'}>Inside Adexify: <br /> A Sneak Peek Into Our Amazing Shop</Heading>
                    </div>
                    <div className="">
                      <Text fontFamily={''} className='text-center font-medium py-2 text-white'>Shop What You Desire On ADEXIFY</Text>
                      <Text fontFamily={''} className='text-center font-medium text-white'>We are here to save your time and money</Text>
                    </div>
                    <Flex justifyContent={{md:'center', base: 'center'}}>
                      <Button bg={'pink.500'} color={'white'} border={'none'} outline={'none'} _hover={{bg:'pink.600', color: 'white'}} transitionDuration={'0.3s'} className='uppercase bg-pink-600 text-white font-medium px-6 py-2 rounded-md'>Start Shopping</Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>
            </Slider>
          </Box>
          <Box display={{md: 'block', base: 'none'}}>
            <Box className='flex flex-col flex-wrap flex-1 gap-2'>
              <Box className='flex gap-3'>
                <Link to={'/'}>
                  <Box height={{md:'190px', base: '200px'}} width={'225px'} bgImage={'/img2.png'} bgPos={'center'} bgSize={'contain'} bgRepeat={'no-repeat'} rounded={'md'} bgBlendMode={'multiply'} bgColor={'gray.200'} className='flex justify-center items-center text-black'>
                      {/* <Image height={'100%'}  rounded={'md'} src="/new-arrival.jpg" alt="" /> */}
                      <Box className='bg-pink-600 px-5 rounded-md py-1'>
                        <Text fontSize={'14px'} color={'white'} fontWeight={500} textAlign={'center'}>Men's Fashion</Text>
                      </Box>
                  </Box>
                </Link>
                <Link to={'/'}>
                    <Box height={{md:'190px', base: '200px'}} width={'225px'} bgImage={'/w-cloth.jpg'} bgPos={'center'} bgSize={'cover'} bgRepeat={'no-repeat'} rounded={'md'} bgBlendMode={'multiply'} bgColor={'gray.200'} className='flex justify-center items-center text-black'>
                      <Box className='bg-pink-600 px-5 rounded-md py-1'>
                        <Text fontSize={'14px'} color={'white'} fontWeight={500} textAlign={'center'}>Women's Fashion</Text>
                      </Box>
                    </Box>
                </Link>
              </Box>
              <Box className='flex gap-3'>
                <Link to={'/'}>
                    <Box height={{md:'190px', base: '200px'}} width={'225px'} bgImage={'/sneaker.gif'} bgPos={'center'} bgSize={'cover'} bgRepeat={'no-repeat'} rounded={'md'} bgBlendMode={'multiply'} bgColor={'gray.200'} className='flex justify-center items-center text-black'>
                      <Box className='bg-pink-600 px-5 rounded-md py-1'>
                        <Text fontSize={'14px'} color={'white'} fontWeight={500} textAlign={'center'}>Shoes</Text>
                      </Box>
                    </Box>
                </Link>
                <Link to={'/'}>
                    <Box height={{md:'190px', base: '200px'}} width={'225px'} bgImage={'/jewellery.gif'} bgPos={'center'} bgSize={'cover'} bgRepeat={'no-repeat'} rounded={'md'} bgBlendMode={'multiply'} bgColor={'gray.200'} className='flex justify-center items-center text-black'>
                      <Box className='bg-pink-600 px-5 rounded-md py-1'>
                        <Text fontSize={'14px'} color={'white'} fontWeight={500} textAlign={'center'}>Jewellery</Text>
                      </Box>
                    </Box>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
  )
}