import React from 'react'
import { Flex, Icon, Image, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { Box, Text, Heading, Button} from '@chakra-ui/react';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaShoppingBag } from "react-icons/fa";

function StartShoppingButton() {
  return (
    <Button size="lg" px={8} py={6} fontSize="lg" bg="pink.500" color="white" leftIcon={<Icon as={FaShoppingBag} />} _hover={{ bg: "pink.600", transform: "scale(1.05)" }} _active={{ bg: "pink.700" }} transition="all 0.3s ease" rounded="full" shadow="md">
      <Link to='/fashion'>Start Shopping Now</Link>
    </Button>
  );
}

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

const categories = [
  {
    name: "Men's Fashion",
    url: '/mens-clothing',
    image: '/img2.png',
  },
  {
    name: "Women's Fashion",
    url: '/womens-clothing',
    image: '/w-cloth.jpg',
  },
  {
    name: 'Shoes',
    url: '/category?category=Shoes',
    image: '/sneaker.gif',
  },
  {
    name: 'Jewellery',
    url: '/category?category=Jewellery',
    image: '/jewellery.gif',
  },
  {
    name: 'Mobile Devices',
    url: '/category?category=mobiles',
    image: '/mobile.webp',
  },
  {
    name: 'Electronics',
    url: '/category?category=desktops',
    image: '/electronics.jpg',
  },
];

const CategoryCards = () => {
  return (
    <SimpleGrid columns={{ base: 3, sm: 3, md: 3, lg: 2, xl: 3, '2xl': 2 }} spacing={3} justifyContent="center">
      {categories.map((cat, index) => (
        <Link key={index} to={cat.url}>
          <Box
            height={{ base: '80px', sm: '100px', md: '130px', xl: '190px', '2xl': '180px' }}
            bgImage={cat.image}
            bgPosition="center"
            bgSize="contain"
            bgRepeat="no-repeat"
            rounded="md"
            bgBlendMode="multiply"
            bgColor="gray.200"
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Box className='bg-white/80' px={4} py={1} rounded="md">
              <Text fontSize={{ base: '10px', md: '14px' }} fontWeight={500} color="pink.500">
                {cat.name}
              </Text>
            </Box>
          </Box>
        </Link>
      ))}
    </SimpleGrid>
  );0
};

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
      <Box bg={'white'} p={{md: 3, base: '2'}} rounded={'md'} className='flex gap-3 flex-wrap' height={{'xl':'100%','xl':'61vh', base:'100%'}} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'}>
        <Box overflow={'hidden'} width={{md:'60%', base: '100%'}}>
            <Slider {...settings}>
              <Box height={{'xl':'57vh', base:'100%'}} rounded={'md'} bgPos={'top'} bgImage={'/hero2.jpg'} className='md:py-10 py-6 px-2 md:px-0 bgImage bg-slate-400'>
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
                      <StartShoppingButton/>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>
              <Box height={{'xl':'57vh', base:'100%'}} rounded={'md'} bgPos={'top'} bgImage={'/hero.png'} className='md:py-10 py-6 px-2 md:px-0 bgImage bg-slate-400'>
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
                      <StartShoppingButton/>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>
              <Box height={{'xl':'57vh', base:'100%'}} rounded={'md'} bgPos={'right'} bgSize={'cover'} bgImage={'/new-arrivals.jpg'} className='md:py-10 py-6 px-2 md:px-0 bgImage bg-slate-300'>
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
                      <StartShoppingButton/>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>
            </Slider>
          </Box>
          <Box display={{md: 'block', base: 'non'}} flex={'1'} width={{md:'60%', base: '100%'}}>
            <CategoryCards/>
          </Box>
        </Box>
      </Box>
  )
}