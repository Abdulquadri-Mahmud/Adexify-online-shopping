import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  
    const { className, style, onClick } = props;
    return (
      <Box bg={'gray.500'} width={'30px'} height={'30px'} rounded={'full'}
      right={'1vh'}  
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
      <Box bg={'gray.500'} width={'30px'} height={'30px'} rounded={'full'}
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

export default function Home_banner3() {
    const settings = {
        dots: false,
        infinite: true,
        focusOnSelect: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        waitForAnimate: false,
        cssEase: "linear",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

  return (
    <Box bg={'white'} my={5} p={2} rounded={'md'} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'}>
        <Box display={{md: 'block', base: 'none'}}>
            <Flex gap={{md:6, base: 2}}>
                <Box width={'50%'}>
                    <Image w={'100%'} h={'250px'} rounded={'md'} src="/big-sales.gif" alt="" />
                </Box>
                <Box width={'50%'}>
                    <Image w={'100%'} h={'250px'} rounded={'md'} src="/big-sale2.gif" alt="" />
                </Box>
            </Flex>
        </Box>
        <Box display={{md: 'none', base: 'block'}}>
            <Slider {...settings}>
                <Box>
                    <Image h={'250px'} rounded={'md'} src="/big-sales.gif" alt="" />
                </Box>
                <Box>
                    <Image h={'250px'} rounded={'md'} src="/big-sale2.gif" alt="" />
                </Box>
            </Slider>
        </Box>
    </Box>
  )
}
