import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import React, { createContext, Suspense, useEffect, useState } from 'react'
import { FaAngleRight } from 'react-icons/fa';
import { PiGreaterThan } from 'react-icons/pi';

export const Women_ClothingContext = createContext();
export const Hoodie_Sweater2_Context = createContext();
export const Female_Context = createContext();

const Women_Clothing = React.lazy(() => import('../../components/clothing/Women_Clothing.jsx'));
const Hoodie_Sweater2 = React.lazy(() => import('../../hoodies&sweater/Hoodie_Sweater2.jsx'));
const Females = React.lazy(() => import('../../components/genders/Females.jsx'));

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
      <Box bg={'pink.300'} width={'30px'} height={'30px'} rounded={'full'}
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
import { FaNairaSign } from 'react-icons/fa6';
import Home_banner4 from '../../components/banners/Home_banner4.jsx';
import Header from '../../components/Header.jsx';
import Loading from '../../components/loader/Loading.jsx';
import Adverts from '../../components/Adverts/Adverts.jsx';
import Footer from '../../components/footer/Footer.jsx';
// import Females from '';

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

            <Box rounded={'md'} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} py={2} mt={3} mb={5} className='bg-pink-600'>
                <Heading color={'white'} fontWeight={500} fontSize={20} textAlign={'center'} className='flex items-center gap-1 justify-center'>CALL TO ORDER 
                    <Link to={'tel:07047594667'}>07047594667</Link>
                </Heading>
            </Box>
            
            <Box bg={'white'} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} p={3} rounded={'md'} p={2} mt={4}>
                <Flex justifyContent={'center'} alignItems={'center'} p={2} height={{'xl': '300px',md: '220px', base: '200px'}} bgRepeat={'no-repeat'} bgSize={'cover'} bgPos={'top'} bgBlendMode={'multiply'} className='bg-slate-400' bgImage={'/banner.jpg'} position={'relative'}>
                    <Box position={'absolute'}>
                        <Text color={'white'} fontWeight={500} textAlign={'center'}>SHOP</Text>
                        <Heading color={'white'} fontWeight={500} fontSize={{md: 40, base: 30}}>Women's Fahion</Heading>
                    </Box>
                </Flex>
            </Box>
            <Box bg={'white'} my={5} p={2} rounded={'md'} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'}>
                <Box>
                    <Slider {...settings}>
                        <Link to={'/'}>
                            <Box>
                                <Image  height={'150px'} width={'90%'} rounded={'md'} src="/women/cloth.jpeg" alt="" />
                                <Text fontSize={14} mt={2} textAlign={'center'}>Clothing</Text>
                            </Box>
                        </Link>
                        <Link to={'/'}>
                            <Box>
                                <Image  height={'150px'} width={'90%'} rounded={'md'} src="/women/bags.jpeg" alt="" />
                                <Text fontSize={14} mt={2} textAlign={'center'}>Bags</Text>
                            </Box>
                        </Link>
                        <Link to={'/'}>
                            <Box>
                                <Image  height={'150px'} width={'90%'} rounded={'md'} src="/women/shoes.jpeg" alt="" />
                                <Text fontSize={14} mt={2} textAlign={'center'}>Shoes</Text>
                            </Box>
                        </Link>
                        <Link to={'/'}>
                            <Box>
                                <Image  height={'150px'} width={'90%'} rounded={'md'} src="/women/pant.jpg" alt="" />
                                <Text fontSize={14} mt={2} textAlign={'center'}>Pants</Text>
                            </Box>
                        </Link>
                        <Link to={'/'}>
                            <Box>
                                <Image  height={'150px'} width={'90%'} rounded={'md'} src="/women/jewellery.jpeg" alt="" />
                                <Text fontSize={14} mt={2} textAlign={'center'}>Jewelleries</Text>
                            </Box>
                        </Link>
                        <Link to={'/'}>
                            <Box>
                                <Image  height={'150px'} width={'90%'} rounded={'md'} src="/women/underwear.jpg" alt="" />
                                <Text fontSize={14} mt={2} textAlign={'center'}>Underwear</Text>
                            </Box>
                        </Link>
                    </Slider>
                </Box>
            </Box>
            <Box mt={5} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} className=''>
                <Flex justifyContent={'space-between'} alignItems={'center'} className='bg-pink-600 text-white py-3 rounded-t-lg px-3'>
                    <Heading fontWeight={500} fontSize={20}>Top Picks</Heading>
                    <Link className='text-pink-600 font-medium uppercase text-sm flex items-center'>See All <FaAngleRight className='text-[20px]'/></Link>
                </Flex>            
            </Box>
            <Box bg={'white'} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} p={3} roundedBottom={'md'}>
                <Box className="py-3 px-2">
                    <Slider {...settings}>
                        {
                            products.map((product) => (
                                product.gender === 'femail' || product.gender === 'female' && product.price >= 4000 ? (
                                <Women_ClothingContext.Provider value={product}>
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

            <Box mt={5} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} rounded={'md'} bg={'white'}>
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
            <Box mb={'5'}>
                <Box mt={5} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} className=''>
                    <Flex justifyContent={'space-between'} alignItems={'center'} className='bg-pink-600 text-white py-3 rounded-t-lg px-3'>
                        <Heading fontWeight={500} fontSize={20}>Top Shirts</Heading>
                        <Link className='font-medium uppercase text-sm flex items-center'>See All <FaAngleRight className='text-[20px]'/></Link>
                    </Flex>            
                </Box>
                <Box bg={'white'} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} p={3} roundedBottom={'md'}>
                    <Box className="py-3 px-2">
                        <Slider {...settings}>
                            {
                                products.map((product) => (
                                    product.gender === 'female' && product.category === 'Shirt' ? (
                                    <Hoodie_Sweater2_Context.Provider value={product}>
                                        <Suspense fallback={<Loading/>}>
                                            <Hoodie_Sweater2 product={product}/>
                                        </Suspense>
                                    </Hoodie_Sweater2_Context.Provider>
                                ) : ''
                                ))
                            }
                        </Slider>
                    </Box>
                </Box>
            </Box>
            <Box mb={'5'}>
                <Box mt={5} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} className=''>
                    <Flex justifyContent={'space-between'} alignItems={'center'} className='py-4 rounded-t-lg px-3 bg-pink-600'>
                        <Heading fontWeight={500} fontSize={20} color={'white'}>Top Jewelleries</Heading>
                        <Link className='text-white font-medium uppercase text-sm flex items-center'>See All <FaAngleRight className='text-[20px]'/></Link>
                    </Flex>            
                </Box>
                <Box bg={'white'} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} p={3} roundedBottom={'md'}>
                    <Box className="py-3 px-2">
                        <Slider {...settings}>
                            {
                                products.map((product) => (
                                    product.gender === 'female' && product.category === 'Jewellery' ? (
                                    <Hoodie_Sweater2_Context.Provider value={product}>
                                        <Suspense fallback={<Loading/>}>
                                            <Hoodie_Sweater2 product={product}/>
                                        </Suspense>
                                    </Hoodie_Sweater2_Context.Provider>
                                ) : ''
                                ))
                            }
                        </Slider>
                    </Box>
                </Box>
            </Box>
            <Box mt={5} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} rounded={'md'} bg={'white'}>
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
            <Box mb={'10'}>
                <Box mt={5} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} className=''>
                    <Flex justifyContent={'space-between'} alignItems={'center'} className='bg-pink-600 text-white py-3 rounded-t-lg px-3'>
                        <Heading fontWeight={500} fontSize={20}>Top Clothes</Heading>
                        <Link className='font-medium uppercase text-sm flex items-center'>See All <FaAngleRight className='text-[20px]'/></Link>
                    </Flex>            
                </Box>
                <Box bg={'white'} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} p={3} roundedBottom={'md'}>
                    <Box className="py-3 px-2">
                        <Slider {...settings}>
                            {
                                products.map((product) => (
                                    product.gender === 'female' && product.category === 'Shirts' ? (
                                    <Hoodie_Sweater2_Context.Provider value={product}>
                                        <Suspense fallback={<Loading/>}>
                                            <Hoodie_Sweater2 product={product}/>
                                        </Suspense>
                                    </Hoodie_Sweater2_Context.Provider>
                                ) : ''
                                ))
                            }
                        </Slider>
                    </Box>
                </Box>
            </Box>
            <Box mb={'10'}>
                <Box mt={5} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} className=''>
                    <Flex justifyContent={'space-between'} alignItems={'center'} className='bg-pink-600 text-white py-3 rounded-t-lg px-3'>
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
                                    <Hoodie_Sweater2_Context.Provider value={product}>
                                        <Suspense fallback={<Loading/>}>
                                            <Hoodie_Sweater2 product={product}/>
                                        </Suspense>
                                    </Hoodie_Sweater2_Context.Provider>
                                ) : ''
                                ))
                            }
                        </Slider>
                    </Box>
                </Box>
            </Box>
    
            {/* <Home_banner4/> */}
            <Box mb={10} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'}>
                <Flex gap={5} flexWrap={'wrap'}>
                    <Box width={{md:'300px', base: '100%'}} height={'550px'} bg={'white'} roundedBottom={'md'}>
                        <Box p={2}>
                            <Heading fontWeight={500} mb={0} fontSize={18}>Category</Heading>
                        </Box>
                        <Link className='text-sm'>
                            <Box py={2} px={3} className='hover:bg-zinc-200 duration-150'>
                                <Text>Men's Fashion</Text>
                            </Box>
                        </Link>
                        <Box pt={2}>
                            <Box  px={3}>
                                <Heading fontWeight={500} mb={2} fontSize={15}>Clothing</Heading>
                            </Box>
                            <Box>
                                <Link className='text-sm'>
                                    <Box py={2} px={8} className='hover:bg-zinc-200 duration-150'>
                                        <Text>Men's Sportswear</Text>
                                    </Box>
                                </Link>
                                <Link className='text-sm'>
                                    <Box py={2} px={8} className='hover:bg-zinc-200 duration-150'>
                                        <Text>Fashion Hoodies & Sweatshirts</Text>
                                    </Box>
                                </Link>
                                <Link className='text-sm'>
                                    <Box py={2} px={8} className='hover:bg-zinc-200 duration-150'>
                                        <Text>Jeans</Text>
                                    </Box>
                                </Link>
                                <Link className='text-sm'>
                                    <Box py={2} px={8} className='hover:bg-zinc-200 duration-150'>
                                        <Text>Pants</Text>
                                    </Box>
                                </Link>
                                <Link className='text-sm'>
                                    <Box py={2} px={8} className='hover:bg-zinc-200 duration-150'>
                                        <Text>Shirts</Text>
                                    </Box>
                                </Link>
                                <Link className='text-sm'>
                                    <Box py={2} px={8} className='hover:bg-zinc-200 duration-150'>
                                        <Text>Underwear</Text>
                                    </Box>
                                </Link>
                                <Link className='text-sm'>
                                    <Box py={2} px={8} className='hover:bg-zinc-200 duration-150'>
                                        <Text>Shoes</Text>
                                    </Box>
                                </Link>
                                <Link className='text-sm'>
                                    <Box py={2} px={8} className='hover:bg-zinc-200 duration-150'>
                                        <Text>Sandals</Text>
                                    </Box>
                                </Link>
                                <Link className='text-sm'>
                                    <Box py={2} px={8} className='hover:bg-zinc-200 duration-150'>
                                        <Text>Socks</Text>
                                    </Box>
                                </Link>
                                <Box borderWidth={1} borderTopColor={'gray.200'} borderBottomColor={'gray.200'} borderRight={0} borderLeft={0} py={3} px={3} mt={5}>
                                    <Flex justifyContent={'space-between'} alignItems={'center'}>
                                        <Text className='flex items-center text-[16px] font-medium'>PRICE (<FaNairaSign className='text-[16px]'/>)</Text>
                                        <Box px={3} py={1} rounded={'md'} className='flex justify-center items-center bg-pink-300 hover:bg-pink-600 duration-200 hover:text-white text-black font-medium'>
                                            <Text>APPLY</Text>
                                        </Box>
                                    </Flex>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box flex={1} bg={'white'} rounded={'md'} p={2}>
                        <Box className="py-3 px-2 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-3">
                            {
                                products.map((product) => (
                                    product.gender === 'female' ? (
                                    <Female_Context.Provider value={product}>
                                        <Suspense fallback={<Loading/>}>
                                            <Females product={product}/>
                                        </Suspense>
                                    </Female_Context.Provider>
                                ) : ''
                                ))
                            }
                        </Box>
                    </Box>
                </Flex>
            </Box>
            <Adverts/>
        </Box>
        <Footer/>
    </Box>
  )
}
