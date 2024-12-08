import React from 'react'
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
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

export default function Home_banner1() {
    const settings = {
        dots: false,
        infinite: true,
        focusOnSelect: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
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
    <Box maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'} rounded={'md'} bg={'white'}>
        <Box>
            <Flex alignItems={'center'} justifyContent={'center'} gap={2} px={2} py={2}>
                <Flex justifyContent={'center'} alignItems={'center'} w={{md:'50%', base: '100%'}} height={{'xl': '250px',md: '220px', base: '200px'}} bgRepeat={'no-repeat'} bgSize={'cover'} bgPos={'left'} bgBlendMode={'multiply'} rounded={'md'} className='bg-slate-400' bgImage={'/fm.jpg'} position={'relative'}>
                    <Box position={'absolute'}>
                      <Text color={'white'} fontWeight={500} textAlign={'center'}>SHOP</Text>
                      <Heading color={'white'} fontWeight={500}>Men</Heading>
                    </Box>
                </Flex>
                <Flex justifyContent={'center'} alignItems={'center'} w={{md:'50%', base: '100%'}} height={{'xl': '250px',md: '220px', base: '200px'}} bgRepeat={'no-repeat'} bgSize={'cover'} bgPos={'right'} bgBlendMode={'multiply'} rounded={'md'} className='bg-slate-400' bgImage={'/fw.jpg'} position={'relative'}>
                    <Box position={'absolute'}>
                      <Text color={'white'} fontWeight={500} textAlign={'center'}>SHOP</Text>
                      <Heading color={'white'} fontWeight={500}>Women</Heading>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    </Box>
  )
}
