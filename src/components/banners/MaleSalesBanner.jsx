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

export default function MaleSalesBanner() {
    const settings = {
        dots: false,
        infinite: true,
        focusOnSelect: true,
        speed: 500,
        slidesToShow: 6,
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
    <Box bg={'white'} my={5} p={2} rounded={'md'} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'}>
        <Box>
            <Slider {...settings}>
                <Link to={'/fashion'}>
                    <Box p={2} className='bg-zinc-100'>
                        <Image  height={'150px'} width={'100%'} rounded={'md'} src="/men/cloth.jpg" alt="cloth" />
                        <Text fontSize={14} mt={2} textAlign={'center'}>Clothing</Text>
                    </Box>
                </Link>
                <Link to={'/category?category=Bags'}>
                    <Box p={2} className='bg-zinc-100'>
                        <Image  height={'150px'} width={'100%'} rounded={'md'} src="/men/bags.gif" alt="bags" />
                        <Text fontSize={14} mt={2} textAlign={'center'}>Bags</Text>
                    </Box>
                </Link>
                <Link to={'/category?category=Shoes'}>
                    <Box p={2} className='bg-zinc-100'>
                        <Image  height={'150px'} width={'100%'} rounded={'md'} src="/men/shoes.gif" alt="shoes" />
                        <Text fontSize={14} mt={2} textAlign={'center'}>Shoes</Text>
                    </Box>
                </Link>
                <Link to={'/category?category=Pants'}>
                    <Box p={2} className='bg-zinc-100'>
                        <Image  height={'150px'} width={'100%'} rounded={'md'} src="/men/pants.gif" alt="pants" />
                        <Text fontSize={14} mt={2} textAlign={'center'}>Pants</Text>
                    </Box>
                </Link>
                <Link to={'/category?category=Jewellery'}>
                    <Box p={2} className='bg-zinc-100'>
                        <Image  height={'150px'} width={'100%'} rounded={'md'} src="/men/jewelleries.jpg" alt="jewelleries" />
                        <Text fontSize={14} mt={2} textAlign={'center'}>Jewelleries</Text>
                    </Box>
                </Link>
                <Link to={'/category?category=Underwear'}>
                    <Box p={2} className='bg-zinc-100'>
                        <Image  height={'150px'} width={'100%'} rounded={'md'} src="/men/underwear.jpg" alt="underwear" />
                        <Text fontSize={14} mt={2} textAlign={'center'}>Underwear</Text>
                    </Box>
                </Link>
            </Slider>
        </Box>
    </Box>
  )
}
