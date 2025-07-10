import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import Slider from "react-slick";

function SampleNextArrow(props) {
  
    const { className, style, onClick } = props;
    return (
      <Box bg={''} width={'30px'} height={'30px'} rounded={'full'}
      right={'1vh'}  
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
        left={'1vh'} zIndex={'10'}
        className={className}
        style={{ ...style, display: "none", 
          paddingTop: '5.5px', paddingLeft: '5.5px',
        }}
        onClick={onClick}
      />
    );
}

export default function FemaleSalesBanner() {
  const settings = {
      dots: false,
      infinite: true,
      focusOnSelect: true,
      speed: 1000,
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
              slidesToShow: 5,
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
                  slidesToShow: 4,
                  slidesToScroll: 1,
              }
          },
          {
            breakpoint: 420,
            settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
              }
          },
      ]
    };
  return (
    <Box bg={'white'} my={5} p={2} rounded={'md'} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'}>
      <Box>
          <Slider {...settings}>
            <Link to={'/fashion'}>
                <Box>
                    <Image  height={{md:'150px', base: '100px'}} width={'100%'} rounded={'md'} src="/women/cloth.jpeg" alt="" />
                    <Text fontSize={14} mt={2} textAlign={'center'}>Clothing</Text>
                </Box>
            </Link>
            <Link to={'/category?category=Bags'}>
                <Box>
                    <Image  height={{md:'150px', base: '100px'}} width={'100%'} rounded={'md'} src="/women/bags.jpeg" alt="" />
                    <Text fontSize={14} mt={2} textAlign={'center'}>Bags</Text>
                </Box>
            </Link>
            <Link to={'/category?category=Shoes'}>
                <Box>
                    <Image  height={{md:'150px', base: '100px'}} width={'100%'} rounded={'md'} src="/women/shoes.jpeg" alt="" />
                    <Text fontSize={14} mt={2} textAlign={'center'}>Shoes</Text>
                </Box>
            </Link>
            <Link to={'/category?category=Pants'}>
                <Box>
                    <Image  height={{md:'150px', base: '100px'}} width={'100%'} rounded={'md'} src="/women/pant.jpg" alt="" />
                    <Text fontSize={14} mt={2} textAlign={'center'}>Pants</Text>
                </Box>
            </Link>
            <Link to={'/category?category=Jewellery'}>
                <Box>
                    <Image  height={{md:'150px', base: '100px'}} width={'100%'} rounded={'md'} src="/women/jewellery.jpeg" alt="" />
                    <Text fontSize={14} mt={2} textAlign={'center'}>Jewelleries</Text>
                </Box>
            </Link>
            <Link to={'/category?category=Underwear'}>
                <Box>
                    <Image  height={{md:'150px', base: '100px'}} width={'100%'} rounded={'md'} src="/women/underwear.jpg" alt="" />
                    <Text fontSize={14} mt={2} textAlign={'center'}>Underwear</Text>
                </Box>
            </Link>
        </Slider>
      </Box>
    </Box>
  )
}
