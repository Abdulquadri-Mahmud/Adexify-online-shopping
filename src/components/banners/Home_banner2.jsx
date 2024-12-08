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

export default function Home_banner2() {
    const settings = {
        dots: false,
        infinite: true,
        focusOnSelect: true,
        speed: 500,
        slidesToShow: 4,
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
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
        ]
    };

  return (
    <Box bg={'white'} my={5} p={2} rounded={'md'} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'}>
        <Box display={{xl: 'block', base: 'none'}}>
            <Flex justifyContent={'center'} gap={{'2xl':5, md:3}}>
                <Link to={'/'}>
                    <Box width={{'2xl':'210px', md:'190px'}}>
                        <Image  rounded={'md'} src="/shirt.jpg" alt="" />
                        <Text textAlign={'center'}>Shirt</Text>
                    </Box>
                </Link>
                <Link to={'/'}>
                    <Box width={{'2xl':'210px', md:'190px'}}>
                        <Image  rounded={'md'} src="/pants.jpg" alt="" />
                        <Text textAlign={'center'}>Pant</Text>
                    </Box>
                </Link>
                <Link to={'/'}>
                    <Box width={{'2xl':'210px', md:'190px'}}>
                        <Image  rounded={'md'} src="/sportsweat.jpg" alt="" />
                        <Text textAlign={'center'}>Sportwear</Text>
                    </Box>
                </Link>
                <Link to={'/'}>
                    <Box width={{'2xl':'210px', md:'190px'}}>
                        <Image  rounded={'md'} src="/Jean.jpg" alt="" />
                        <Text textAlign={'center'}>Jeans</Text>
                    </Box>
                </Link>
                <Link to={'/'}>
                    <Box width={{'2xl':'210px', md:'190px'}}>
                        <Image  rounded={'md'} src="/UNDERWEAR.jpg" alt="" />
                        <Text textAlign={'center'}>Underwear</Text>
                    </Box>
                </Link>
                <Link to={'/'}>
                    <Box width={{'2xl':'210px', md:'190px'}}>
                        <Image  rounded={'md'} src="/sweatshirt.jpg" alt="" />
                        <Text textAlign={'center'}>Hoodies & Sweatshirt</Text>
                    </Box>
                </Link>
            </Flex>
        </Box>
        <Box display={{xl: 'none', lg: 'block'}}>
            <Slider {...settings}>
                <Link to={'/'}>
                    <Box>
                        <Image  rounded={'md'} src="/shirt.jpg" alt="" />
                        <Text textAlign={'center'}>Shirt</Text>
                    </Box>
                </Link>
                <Link to={'/'}>
                    <Box>
                        <Image  rounded={'md'} src="/pants.jpg" alt="" />
                        <Text textAlign={'center'}>Pant</Text>
                    </Box>
                </Link>
                <Link to={'/'}>
                    <Box>
                        <Image  rounded={'md'} src="/sportsweat.jpg" alt="" />
                        <Text textAlign={'center'}>Sportwear</Text>
                    </Box>
                </Link>
                <Link to={'/'}>
                    <Box>
                        <Image  rounded={'md'} src="/Jean.jpg" alt="" />
                        <Text textAlign={'center'}>Jeans</Text>
                    </Box>
                </Link>
                <Link to={'/'}>
                    <Box>
                        <Image  rounded={'md'} src="/UNDERWEAR.jpg" alt="" />
                        <Text textAlign={'center'}>Underwear</Text>
                    </Box>
                </Link>
                <Link to={'/'}>
                    <Box>
                        <Image  rounded={'md'} src="/sweatshirt.jpg" alt="" />
                        <Text textAlign={'center'}>Hoodies & Sweatshirt</Text>
                    </Box>
                </Link>
            </Slider>
        </Box>
    </Box>
  )
}
