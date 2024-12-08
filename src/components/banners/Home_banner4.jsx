import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  
    const { className, style, onClick } = props;
    return (
      <Box bg={'gray.200'} width={'30px'} height={'30px'} rounded={'full'}
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
      <Box bg={'gray.200'} width={'30px'} height={'30px'} rounded={'full'}
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

export default function Home_banner4() {
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
            slidesToShow: 4,
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
    <Box bg={'white'} my={5} p={{md:4, base: 3}} rounded={'md'} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'}>
        <Box display={{xl: 'block', base: 'none'}}>
            <Flex gap={6} justifyContent={'center'}>
                <Link to={'/'}>
                    <Box height={'230px'} width={'200px'}>
                        <Image  rounded={'md'} src="/new-arrival.jpg" alt="" />
                        <Text fontSize={'14px'} mt={2} textAlign={'center'}>Fashion Deals</Text>
                    </Box>
                </Link>
                <Link to={'/'}>
                    <Box height={'230px'} width={'200px'}>
                        <Image  rounded={'md'} src="/men_fashion.jpg" alt="" />
                        <Text fontSize={'14px'} mt={2} textAlign={'center'}>New Arrival</Text>
                    </Box>
                </Link>
                <Link to={'/'}>
                    <Box height={'230px'} width={'200px'}>
                        <Image height={'200px'} rounded={'md'} src="/fahsion3.gif" alt="" />
                        <Text fontSize={'14px'} mt={2} textAlign={'center'}>Fashion Deals</Text>
                    </Box>
                </Link>
                <Link to={'/'}>
                    <Box height={'230px'} width={'200px'}>
                        <Image  rounded={'md'} src="/recommended.gif" alt="" />
                        <Text fontSize={'14px'} mt={2} textAlign={'center'}>Great Deals</Text>
                    </Box>
                </Link>
                <Link to={'/'}>
                    <Box height={'230px'} width={'200px'}>
                        <Image  rounded={'md'} src="/specia-offer.png" alt="" />
                        <Text fontSize={'14px'} mt={2} textAlign={'center'}>Special Offter</Text>
                    </Box>
                </Link>
            </Flex>
        </Box>
        <Box display={{xl: 'none', base: 'block'}}>
            <Slider {...settings}>
              <Link to={'/'}>
                <Box height={{xl:'230px',md:'200px', base: '150px'}} width={{md:'200px', base: '150px'}}>
                    <Image  rounded={'md'} src="/new-arrival.jpg" alt="" />
                    <Text fontSize={'14px'} mt={2} textAlign={'center'}>New Arrival</Text>
                </Box>
                </Link>
                <Link to={'/'}>
                  <Box height={{xl:'230px',md:'200px', base: '100%'}} width={{md:'200px', base: '150px'}}>
                      <Image  rounded={'md'} src="/men_fashion.jpg" alt="" />
                  </Box>
                </Link>
                <Link to={'/'}>
                  <Box height={{xl:'230px',md:'200px', base: '150px'}} width={{md:'200px', base: '150px'}}>
                      <Image height={'150px'} rounded={'md'} src="/fahsion3.gif" alt="" />
                      <Text fontSize={'14px'} mt={2} textAlign={'center'}>Fashion Deals</Text>
                  </Box>
                </Link>
                <Link to={'/'}>
                  <Box height={{xl:'230px',md:'200px', base: '150px'}} width={{md:'200px', base: '150px'}}>
                      <Image  rounded={'md'} src="/recommended.gif" alt="" />
                      <Text fontSize={'14px'} mt={2} textAlign={'center'}>Great Deals</Text>
                  </Box>
                </Link>
                <Link to={'/'}>
                  <Box height={{xl:'230px',md:'200px', base: '150px'}} width={{md:'200px', base: '150px'}}>
                      <Image  rounded={'md'} src="/specia-offer.png" alt="" />
                      <Text fontSize={'14px'} mt={2} textAlign={'center'}>Special Offter</Text>
                  </Box>
                </Link>
            </Slider>
        </Box>
    </Box>
  )
}
