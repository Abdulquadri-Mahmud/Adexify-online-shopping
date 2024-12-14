import { Box, Flex, Heading, Text, Select, Button,Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';
// import { Box, Flex, Heading, Text, } from '@chakra-ui/react'
import React, { Suspense, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/footer/Footer'
import { PiGreaterThan } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import Home_banner1 from '../components/banners/Home_banner1'
import TopDeals from '../components/Top_Deals/TopDeals'
import FashionXtra from '../components/FashionXtra/FashionXtra'
import Banner1 from '../components/FashionXtra/Banner1'
import Unisex from '../components/genders/Unisex'
import Top_sneakers from '../components/top_sneakers/Top_sneakers'
import Bags from '../components/Bags/Bags'
import FashionXtraBanner from '../components/FashionXtra/FashionXtraBanner'
import { createContext } from 'react'
import { FaNairaSign } from 'react-icons/fa6'
import Loading from '../components/loader/Loading'

export const FashionContext = createContext();
const FashionComp = React.lazy(() => import('../components/fashionSearchComp/FashionComp'))

export default function Fashion() {
    const [products, setProducts] = useState([]);

    const clothingLinks = [
        { label: "Men's Sportswear", to: '/mens-sportwear', price: 0 },
        { label: 'Fashion Hoodies & Sweatshirts', to: '/mens-hoodies-sweatshirt', price: 0 },
        { label: 'Jeans', to: '/mens-jeans', price: 0 },
        { label: 'Pants', to: '/mens-pants', price: 0 },
        { label: 'Shirts', to: '/mens-shirts', price: 0 },
        { label: 'Underwear', to: '/mens-underwear', price: 0 },
        { label: 'Shoes', to: '/mens-shoes', price: 0 },
        { label: 'Sandals', to: '/mens-sandals', price: 0 },
        { label: 'Socks', to: '/mens-socks', price: 0 },
    ];
    
    const [priceRange, setPriceRange] = useState(100000); // State for price filtering
    const [filter, setFilter] = useState('All'); // State for category filtering
    const [currentPage, setCurrentPage] = useState(1); // State for pagination
    const productsPerPage = 20; // Number of products per page
    
      // Filter products based on category and price range
    const filteredProducts = products.filter((product) => {
        const isPriceMatch = product.price <= priceRange;
        const isCategoryMatch =
        filter === 'All' ? product.gender === 'male' : product.category === filter && product.gender === 'male';
        return isPriceMatch && isCategoryMatch;
    });

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Pagination controls
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('https://adexify-api.vercel.app/api/products/all-products');

            const data = await res.json();

            setProducts(data);
        };
        fetchProducts();
    }, []);

  return (
    <Box>
        <Header/>
        <Box pb={4} className='bg-zinc-200'>
            <Box className="p-2">
                <Box maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'}>
                    <div className="flex gap-1 items-center">
                        <Link to={'/'} className='text-[13px] text-gray-500'>Home</Link>
                        <PiGreaterThan className='text-[13px] text-gray-500 pt-1'/>
                        <Link to={'/fashion'} className='text-[13px] text-gray-500'>Fashion</Link>
                    </div>
                </Box>
            </Box>
            <Box rounded={'md'} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'} bg={'white'} py={2} mt={3} mb={5}>
                <Heading fontWeight={500} fontSize={20} textAlign={'center'}>Fashion</Heading>
            </Box>
            <Box rounded={'md'} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'} py={2} mt={3} mb={5} className='bg-pink-600'>
                <Heading color={'white'} fontWeight={500} fontSize={20} textAlign={'center'} className='flex items-center gap-1 justify-center'>CALL TO ORDER 
                    <Link to={'tel:07047594667'}>07047594667</Link>
                </Heading>
            </Box>
            <Home_banner1/>
            <Box mt={6}>
                <FashionXtra/>
            </Box>
            <TopDeals/>
            <Banner1/>
            <Unisex/>
            <FashionXtraBanner/>
            <Bags/>
            <Top_sneakers/>
            <Box mt={10} mb={10} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'}>
                <Flex gap={5} flexWrap={'wrap'}>
                    <Box width={'300px'} height={'550px'} bg={'white'} rounded={'md'}>
                        <Box p={2}>
                            <Heading fontWeight={500} mb={0} fontSize={18}>Category</Heading>
                        </Box>
                        <Link to={'/'} className='text-sm'>
                            <Box py={2} px={3} className='hover:bg-zinc-200 duration-150'>
                                <Text>Men's Fashion</Text>
                            </Box>
                        </Link>
                        <Link to={'/womens-clothing'} className='text-sm'>
                            <Box py={2} px={3} className='hover:bg-zinc-200 duration-150'>
                                <Text>Women's Fashion</Text>
                            </Box>
                        </Link>
                        <Box pt={2}>
                            <Box  px={3}>
                                <Heading fontWeight={500} mb={2} fontSize={15}>Clothing</Heading>
                            </Box>
                            <Box>
                                {/* Render Filtered Links */}
                                {clothingLinks
                                    .filter((link) => link.price <= priceRange)
                                    .map((link, index) => (
                                    <Link key={index} to={link.to} className="text-sm">
                                        <Box py={2} px={8} className="hover:bg-zinc-200 duration-150">
                                        <Text>
                                            {link.label}
                                        </Text>
                                        </Box>
                                    </Link>
                                ))}
                                <Box borderWidth={1} borderTopColor="gray.200" borderBottomColor="gray.200" borderRight={0} borderLeft={0} py={3} px={3} mt={5}>
                                    <Flex justifyContent="space-between" alignItems="center" mb={3}>
                                        <Text className="flex items-center text-[16px] font-medium">
                                            PRICE (<FaNairaSign className="text-[16px]" />)
                                        </Text>
                                        <Text>{priceRange.toLocaleString()}</Text>
                                    </Flex>
                                    <Slider defaultValue={priceRange} min={0} max={100000} step={5} onChange={(value) => setPriceRange(value)}>
                                        <SliderTrack>
                                            <SliderFilledTrack bg="pink.600" />
                                        </SliderTrack>
                                        <SliderThumb boxSize={4} />
                                    </Slider>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box flex={1} bg="white" rounded="md">
                        <Flex justifyContent="space-between" alignItems="center" className="mb-4 border-b pb-5">
                            <Box>
                                <Heading fontWeight={500} fontSize={20}>
                                    Men's Jeans
                                </Heading>
                                <Text color={'gray.500'} className="text-sm">
                                    ({filteredProducts.length} products found)
                                </Text>
                            </Box>
                            <Select width="200px" placeholder="Filter by Subcategory" onChange={(e) => setFilter(e.target.value)} value={filter}>
                                <option value="All">All</option>
                                <option value="Shoes">Shoes</option>
                                <option value="Pants">Pants</option>
                                <option value="Shirt">Shirts</option>
                                <option value="Underwear">Underwear</option>
                                <option value="Hoodies & Sweatshirts">Hoodies & Sweatshirts</option>
                            </Select>
                        </Flex>

                        <Box className="py-3 px-2 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-3">
                            {currentProducts.length > 0 ? (
                            currentProducts.map((product) => (
                                <Suspense fallback={<Loading/>}>
                                    <FashionContext.Provider value={product}>
                                        <FashionComp key={product._id} product={product} />
                                    </FashionContext.Provider>
                                </Suspense>
                            ))
                            ) : (
                            <Text>No products found in this category.</Text>
                            )}
                        </Box>

                        {/* Pagination */}
                        <Flex justifyContent="center" alignItems="center" my={4} gap={2}>
                            <Button onClick={handlePrevPage} disabled={currentPage === 1} bg={'gray.200'} _hover={{ bg: 'pink.400' }}>
                                Prev
                            </Button>
                            {Array.from({ length: totalPages }, (_, index) => (
                            <Button key={index} onClick={() => handlePageChange(index + 1)} mx={1} bg={currentPage === index + 1 ? 'pink.600' : 'gray.200'}
                                color={currentPage === index + 1 ? 'white' : 'black'}
                                _hover={{ bg: 'pink.400' }}>
                                {index + 1}
                            </Button>
                            ))}
                            <Button onClick={handleNextPage} disabled={currentPage === totalPages} bg={'gray.200'} _hover={{ bg: 'pink.400' }}>
                                Next
                            </Button>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </Box>
        <Footer/>
    </Box>
  )
}
