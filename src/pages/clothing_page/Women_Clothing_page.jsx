import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import React, { createContext, Suspense, useEffect, useState } from 'react'
import { FaAngleRight } from 'react-icons/fa';
import { PiGreaterThan } from 'react-icons/pi';

export const Women_ClothingContext = createContext();
export const Female_Context = createContext();
export const TopShirts_Context = createContext();
export const TopShoes_Context = createContext();
export const TopJewellery_Context = createContext();
export const TopBags_Context = createContext();

const Women_Clothing = React.lazy(() => import('../../components/clothing/Women_Clothing.jsx'));
const TopShirts = React.lazy(() => import('../../components/shirt/TopShirts.jsx'));
const TopShoes = React.lazy(() => import('../../components/Shoes/TopShoes.jsx'));
const TopJewellery = React.lazy(() => import('../../components/JeweComp/TopJewellery.jsx'));
const TopBags = React.lazy(() => import('../../components/Bags/TopBags.jsx'));

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      <Box bg={'green.500'} width={'30px'} height={'30px'} rounded={'full'}
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
import Home_banner4 from '../../components/banners/Home_banner4.jsx';
import Header from '../../components/Header.jsx';
import Loading from '../../components/loader/Loading.jsx';
import Adverts from '../../components/Adverts/Adverts.jsx';
import Footer from '../../components/footer/Footer.jsx';
import WomenCategory from '../../components/Bottom_Categories/WomenCategory.jsx';
import FemaleSalesBanner from '../../components/banners/FemaleSalesBanner.jsx';
import MaleSalesBanner from '../../components/banners/MaleSalesBanner.jsx';
// import Females from '';

import { useColorModeValue } from '@chakra-ui/react';

const SuggestedSection = () => {
  return (
    <Box maxW={{ '2xl': '80%', xl: '95%', lg: '100%', base: '97%' }} mx="auto" bg={useColorModeValue('white', 'gray.800')} p={{ base: 4, md: 6 }} mt={6} rounded="2xl" boxShadow="lg">
      <Heading fontSize={{ base: 'xl', md: '2xl' }} color="gray.800" borderBottom="1px solid" borderColor="gray.300" pb={3} mb={4} position="relative" _after={{
          content: '""',
          position: 'absolute',
          bottom: '-2px',
          left: 0,
          width: '50px',
          height: '4px',
          bgGradient: 'linear(to-r, pink.500, gray.800)',
        }}>
        You may also like
      </Heading>

      <Box bg={useColorModeValue('gray.100', 'gray.700')} p={{ base: 3, md: 4 }} rounded="lg" boxShadow="md" transition="all 0.3s" _hover={{ transform: 'scale(1.01)', boxShadow: 'xl' }}>
        <MaleSalesBanner />
      </Box>
    </Box>
  );
};

export default function Women_Clothing_page() {
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
        autoplaySpeed: 2500,
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

        <Box pb={10} className='bg-zinc-200 rounded-t-lg'>
            <Box bg={''} py={2}>
                <Box mt={4} maxW={{'2xl' : '80%', xl : '95%', lg : '97%', base: '97%'}} mx={'auto'} bg={'white'} py={4} px={6} rounded={'md'}>
                    <Box bg={''} className="flex gap-1 items-center">
                        <Link to={'/'} className='text-[13px] text-gray-500'>Home</Link>
                        <PiGreaterThan className='text-[13px] text-gray-500 pt-1'/>
                        <Link to={'/fashion'} className='text-[13px] text-gray-500'>Fashion</Link>
                        <PiGreaterThan className='text-[13px] text-gray-500 pt-1'/>
                        <Link to={'/womens-clothing'} className='text-[13px] text-gray-500'>Women's Fashion</Link>
                    </Box>
                </Box>
            </Box>

            <Box rounded={'md'} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} py={2} mt={3} mb={5} className='bg-pink-500'>
                <Heading color={'white'} fontWeight={500} fontSize={20} textAlign={'center'} className='flex items-center gap-1 justify-center'>CALL TO ORDER 
                    <Link to={'tel:07047594667'}>07047594667</Link>
                </Heading>
            </Box>
            
            <Box bg={'white'} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} p={2} rounded={'md'} mt={4}>
                <Flex justifyContent={'center'} alignItems={'center'} p={2} height={{'xl': '300px',md: '220px', base: '200px'}} bgRepeat={'no-repeat'} bgSize={'cover'} bgPos={'top'} bgBlendMode={'multiply'} className='bg-slate-400' bgImage={'/hero2.jpg'} position={'relative'}>
                    <Box position={'absolute'}>
                        <Text color={'white'} fontWeight={500} textAlign={'center'}>SHOP</Text>
                        <Heading color={'white'} fontWeight={500} fontSize={{md: 40, base: 30}}>Women's Fahion</Heading>
                    </Box>
                </Flex>
            </Box>

            {/* Female sales banner */}
            <FemaleSalesBanner/>

            <Box maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} className='mt-10 md:mb-0 mb-0 bg-white rounded-lg'>
                <Box mt={5} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} borderBottomWidth={'1px'} borderBottom={'solid gray.300'} pb={3} mx={'auto'} className=''>
                    <Flex justifyContent={'space-between'} alignItems={'center'} color={'gray.800'} className='bg-white text-white py-3 rounded-t-lg px-3'>
                        <Heading fontWeight={500} fontSize={20}>Top Picks</Heading>
                        <Link className='font-medium uppercase text-sm flex items-center'>See All <FaAngleRight className='text-[20px]'/></Link>
                    </Flex>            
                </Box>
                <Box bg={'white'} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} p={3} roundedBottom={'md'}>
                    <Box className="py-3 px-2">
                        <Slider {...settings}>
                            {
                                products.map((product) => (
                                    product.gender === 'femail' || product.gender === 'female' && product.price >= 4000 ? (
                                    <Women_ClothingContext.Provider key={product?._id} value={product}>
                                        <Suspense fallback={<Loading/>}>
                                            <Women_Clothing product={product}/>
                                        </Suspense>
                                    </Women_ClothingContext.Provider>
                                ) : ''
                            ))
                            }
                        </Slider>
                    </Box>
                </Box>
            </Box>

            <Box mt={5} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} borderBottomWidth={'1px'} borderBottom={'solid gray.300'} pb={3} mx={'auto'} rounded={'md'} bg={'white'}>
                <Box>
                    <Flex alignItems={'center'} justifyContent={'center'} gap={2} px={2} py={2}>
                        <Flex justifyContent={'center'} alignItems={'center'} w={{md:'50%', base: '100%'}} height={{'xl': '250px',md: '220px', base: '180px'}} bgRepeat={'no-repeat'} bgSize={'cover'} bgPos={'center'} bgBlendMode={'multiply'} rounded={'md'} className='bg-slate-400' bgImage={'/cloth.jpg'} position={'relative'}>
                            <Box position={'absolute'}>
                                <Text color={'white'} fontWeight={500} textAlign={'center'}>SHOP</Text>
                                <Heading color={'white'} fontWeight={500} fontSize={{md: 40, base: 30}}>Clothing</Heading>
                            </Box>
                        </Flex>
                        <Flex justifyContent={'center'} alignItems={'center'} w={{md:'50%', base: '100%'}} height={{'xl': '250px',md: '220px', base: '180px'}} bgRepeat={'no-repeat'} bgSize={'cover'} bgPos={'center'} bgBlendMode={'multiply'} rounded={'md'} className='bg-slate-400' bgImage={'/jw.jpg'} position={'relative'}>
                            <Box position={'absolute'}>
                                <Text color={'white'} fontWeight={500} textAlign={'center'}>SHOP</Text>
                                <Heading color={'white'} fontWeight={500} fontSize={{md: 40, base: 30}}>Jewelleries</Heading>
                            </Box>
                        </Flex>
                    </Flex>
                </Box>
            </Box>

            <Box maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} className='mt-10 md:mb-0 mb-0 bg-white rounded-lg'>
                <Box mt={5} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} borderBottomWidth={'1px'} borderBottom={'solid gray.300'} pb={3} mx={'auto'} className=''>
                    <Flex justifyContent={'space-between'} alignItems={'center'} color={'gray.800'} className='bg-white text-white py-3 rounded-t-lg px-3'>
                        <Heading fontWeight={500} fontSize={20}>Top Bags</Heading>
                        <Link className='font-medium uppercase text-sm flex items-center'>See All <FaAngleRight className='text-[20px]'/></Link>
                    </Flex>            
                </Box>
                <Box bg={'white'} maxW={{'2xl' : '80%', xl : '100%', lg : '100%', base: '97%'}} mx={'auto'} p={3} roundedBottom={'md'}>
                    <Box className="py-3 px-2">
                        <Slider {...settings}>
                            {
                                products.map((product) => (
                                    product.gender === 'female' && product.category === 'Bags' ? (
                                    <TopBags_Context.Provider key={product?._id} value={product}>
                                        <Suspense fallback={<Loading/>}>
                                            <TopBags product={product}/>
                                        </Suspense>
                                    </TopBags_Context.Provider>
                                ) : ''
                                ))
                            }
                        </Slider>
                    </Box>
                </Box>
            </Box>

            <Box maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} className='mt-10 md:mb-0 mb-0 bg-white rounded-lg'>
                <Box mt={5} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} borderBottomWidth={'1px'} borderBottom={'solid gray.300'} pb={3} mx={'auto'} className=''>
                    <Flex justifyContent={'space-between'} alignItems={'center'} color={'gray.800'} className='py-4 rounded-t-lg px-3 bg-white'>
                        <Heading fontWeight={500} fontSize={20}>Top Jewelleries</Heading>
                        <Link className='font-medium uppercase text-sm flex items-center'>See All <FaAngleRight className='text-[20px]'/></Link>
                    </Flex>            
                </Box>
                <Box bg={'white'} maxW={{'2xl' : '80%', xl : '100%', lg : '100%', base: '97%'}} mx={'auto'} p={3} roundedBottom={'md'}>
                    <Box className="py-3 px-2">
                        <Slider {...settings}>
                            {
                                products.map((product) => (
                                    product.gender === 'female' && product.category === 'Jewellery' ? (
                                    <TopJewellery_Context.Provider key={product?._id} value={product}>
                                        <Suspense fallback={<Loading/>}>
                                            <TopJewellery product={product}/>
                                        </Suspense>
                                    </TopJewellery_Context.Provider>
                                ) : ''
                                ))
                            }
                        </Slider>
                    </Box>
                </Box>
            </Box>
            <Box mt={5} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} borderBottomWidth={'1px'} borderBottom={'solid gray.300'} pb={3} mx={'auto'} rounded={'md'} bg={'white'}>
                <Box>
                    <Flex alignItems={'center'} justifyContent={'center'} gap={2} px={2} py={2}>
                        <Flex justifyContent={'center'} alignItems={'center'} w={{md:'50%', base: '100%'}} height={{'xl': '250px',md: '220px', base: '180px'}} bgRepeat={'no-repeat'} bgSize={'cover'} bgPos={'center'} bgBlendMode={'multiply'} rounded={'md'} className='bg-slate-400' bgImage={'/cloth.jpg'} position={'relative'}>
                            <Box position={'absolute'}>
                                <Text color={'white'} fontWeight={500} textAlign={'center'}>SHOP</Text>
                                <Heading color={'white'} fontWeight={500} fontSize={{md: 40, base: 30}}>Clothing</Heading>
                            </Box>
                        </Flex>
                        <Flex justifyContent={'center'} alignItems={'center'} w={{md:'50%', base: '100%'}} height={{'xl': '250px',md: '220px', base: '180px'}} bgRepeat={'no-repeat'} bgSize={'cover'} bgPos={'center'} bgBlendMode={'multiply'} rounded={'md'} className='bg-slate-400' bgImage={'/ws.jpg'} position={'relative'}>
                            <Box position={'absolute'}>
                                <Text color={'white'} fontWeight={500} textAlign={'center'}>SHOP</Text>
                                <Heading color={'white'} fontWeight={500} fontSize={{md: 40, base: 30}}>Shoes</Heading>
                            </Box>
                        </Flex>
                    </Flex>
                </Box>
            </Box>
            <Box maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} className='mt-10 md:mb-0 mb-0 bg-white rounded-lg'>
                <Box mt={5} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} borderBottomWidth={'1px'} borderBottom={'solid gray.300'} pb={3} mx={'auto'} className=''>
                    <Flex justifyContent={'space-between'} alignItems={'center'} color={'gray.800'} className='bg-white text-white py-3 rounded-t-lg px-3'>
                        <Heading fontWeight={500} fontSize={20}>Top Clothes</Heading>
                        <Link className='font-medium uppercase text-sm flex items-center'>See All <FaAngleRight className='text-[20px]'/></Link>
                    </Flex>            
                </Box>
                <Box bg={'white'} maxW={{'2xl' : '80%', xl : '100%', lg : '100%', base: '97%'}} mx={'auto'} p={3} roundedBottom={'md'}>
                    <Box className="py-3 px-2">
                        <Slider {...settings}>
                            {
                                products.map((product) => (
                                    product.gender === 'female' && product.category === 'Shirt' ? (
                                    <TopShirts_Context.Provider key={product?._id} value={product}>
                                        <Suspense fallback={<Loading/>}>
                                            <TopShirts product={product}/>
                                        </Suspense>
                                    </TopShirts_Context.Provider>
                                ) : ''
                                ))
                            }
                        </Slider>
                    </Box>
                </Box>
            </Box>

            <Box maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} className='mt-10 md:mb-0 mb-0 bg-white rounded-lg'>
                <Box mt={5} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} borderBottomWidth={'1px'} borderBottom={'solid gray.300'} pb={3} mx={'auto'} className=''>
                    <Flex justifyContent={'space-between'} alignItems={'center'} color={'gray.800'} className='bg-white text-white py-3 rounded-t-lg px-3'>
                        <Heading fontWeight={500} fontSize={20}>Top Shoes</Heading>
                        <Link className='font-medium uppercase text-sm flex items-center'>See All <FaAngleRight className='text-[20px]'/></Link>
                    </Flex>            
                </Box>
                <Box bg={'white'} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} p={3} roundedBottom={'md'}>
                    <Box className="py-3 px-2">
                        <Slider {...settings}>
                            {
                                products.map((product) => (
                                    product.gender === 'female' && product.category === 'Shoes' ? (
                                    <TopShoes_Context.Provider key={product?._id} value={product}>
                                        <Suspense fallback={<Loading/>}>
                                            <TopShoes product={product}/>
                                        </Suspense>
                                    </TopShoes_Context.Provider>
                                ) : ''
                                ))
                            }
                        </Slider>
                    </Box>
                </Box>
            </Box>
    
            <Home_banner4/>
            
            <SuggestedSection/>

            <WomenCategory/>
            <Adverts/>
        </Box>
        <Footer/>
    </Box>
  )
}
