import React, { createContext, Suspense, useEffect, useState } from 'react'
import Hero from '../components/Hero'
import TopDeals from '../components/Top_Deals/TopDeals'
import TodaysDeal from '../components/TodaysDeal/TodaysDeal'
import Section1 from '../components/sections/Section1'
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import Home_banner2 from '../components/banners/Home_banner2'
import Home_banner3 from '../components/banners/Home_banner3'
import Home_banner4 from '../components/banners/Home_banner4'
import Header from '../components/Header'
import Footer from '../components/footer/Footer'
import Womens_wear from '../components/womens_wear/Womens_wear'
import Mens_wear from '../components/mens_wear/Mens_wear'
import Shoes from '../components/top_sneakers/Shoes'
import Jewelleries from '../Jewellery/Jewelleries'
import Banner from '../Jewellery/Banner'
import Bags from '../components/Bags/Bags'
import FashionXtraBanner from '../components/FashionXtra/FashionXtraBanner'
import { Link } from 'react-router-dom'
import Loading from '../components/loader/Loading'
import { FaNairaSign } from 'react-icons/fa6'

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

export const HomeContext = createContext();
const HomeSearchComp = React.lazy(() => import('../components/HomeSearchComp/HomeSearchComp'))

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import Home_category from './Bottom_Categories/Home_category'
import Adverts from '../components/Adverts/Adverts'

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('https://adexify-api.vercel.app/api/products/all-products');

            const data = await res.json();

            setProducts(data);
        };
        fetchProducts();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        focusOnSelect: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        // autoplay: true,
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
    <Box>
      <Header/>

      <Box pb={10} className='bg-zinc-200'>
        <Hero/>
        <Section1/>
        <TodaysDeal/>
        <Home_banner4/>

        {/* <Home_banner1/> */}
        
        <TopDeals/>
        {/* <Home_banner2/> */}
        <Box bg={'white'} my={5} p={2} rounded={'md'} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'}>
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
        {/* <Home_banner3/> */}
        <Mens_wear/>
        
        <Box bg={'white'} my={5} p={2} rounded={'md'} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'}>
            <Box>
                <Slider {...settings}>
                    <Link to={'/fashion'}>
                        <Box>
                            <Image  height={'150px'} width={'90%'} rounded={'md'} src="/women/cloth.jpeg" alt="" />
                            <Text fontSize={14} mt={2} textAlign={'center'}>Clothing</Text>
                        </Box>
                    </Link>
                    <Link to={'/category?category=Bags'}>
                        <Box>
                            <Image  height={'150px'} width={'90%'} rounded={'md'} src="/women/bags.jpeg" alt="" />
                            <Text fontSize={14} mt={2} textAlign={'center'}>Bags</Text>
                        </Box>
                    </Link>
                    <Link to={'/category?category=Shoes'}>
                        <Box>
                            <Image  height={'150px'} width={'90%'} rounded={'md'} src="/women/shoes.jpeg" alt="" />
                            <Text fontSize={14} mt={2} textAlign={'center'}>Shoes</Text>
                        </Box>
                    </Link>
                    <Link to={'/category?category=Pants'}>
                        <Box>
                            <Image  height={'150px'} width={'90%'} rounded={'md'} src="/women/pant.jpg" alt="" />
                            <Text fontSize={14} mt={2} textAlign={'center'}>Pants</Text>
                        </Box>
                    </Link>
                    <Link to={'/category?category=Jewellery'}>
                        <Box>
                            <Image  height={'150px'} width={'90%'} rounded={'md'} src="/women/jewellery.jpeg" alt="" />
                            <Text fontSize={14} mt={2} textAlign={'center'}>Jewelleries</Text>
                        </Box>
                    </Link>
                    <Link to={'/category?category=Underwear'}>
                        <Box>
                            <Image  height={'150px'} width={'90%'} rounded={'md'} src="/women/underwear.jpg" alt="" />
                            <Text fontSize={14} mt={2} textAlign={'center'}>Underwear</Text>
                        </Box>
                    </Link>
                </Slider>
            </Box>
        </Box>
        <Womens_wear/>
        <FashionXtraBanner/>
        <Bags/>
        <Shoes/>
        <Banner/>
        <Jewelleries/>
        <Box>
            <Box mt={10} mb={10} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'}>
                <Home_category/>
            </Box>
        </Box>
        <Adverts/>
      </Box>
      <Footer/>
    </Box>
  )
}
