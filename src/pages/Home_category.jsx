import React, { createContext, Suspense, useEffect, useState } from 'react';  
import { Box, Flex, Heading, Text, Select, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaNairaSign } from 'react-icons/fa6';
import Loading from '../components/loader/Loading';

export const HomeSearchCompContext = createContext();
const HomeSearchComp = React.lazy(() => import('../components/HomeSearchComp/HomeSearchComp'));

export default function Home_category() {
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(100000);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://adexify-api.vercel.app/api/products/all-products');
        const data = await res.json();
        setProducts(data);

        // Extract unique categories from the product list
        const uniqueCategories = [...new Set(data.map((item) => item.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const isPriceMatch = product.price <= priceRange;
    const isCategoryMatch =
      filter === 'All' ? product.gender === 'male' : product.category === filter && product.gender === 'male';
    return isPriceMatch && isCategoryMatch;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <Box>
      <Box bg="white" p={4} rounded={'md'}>
        <Flex gap={5} flexWrap="wrap">
          {/* Sidebar */}
          <Box width={{ md: '300px', base: '100%' }} height={'550px'} bg={'white'} rounded={'md'}>
            <Box p={2}>
              <Heading fontWeight={500} mb={0} fontSize={18}>Category</Heading>
            </Box>

            {/* Dynamic Category Links */}
            {categories.map((category, index) => (
              <Link key={index} to={`/category?category=${category}`} className="text-sm">
                <Box py={2} px={8} className="hover:bg-zinc-200 duration-150">
                  <Text>{category}</Text>
                </Box>
              </Link>
            ))}

            {/* Price Filtering */}
            <Box borderWidth={1} borderTopColor="gray.200" borderBottomColor="gray.200" borderRight={0} borderLeft={0} py={3} px={3} mt={5}>
              <Flex justifyContent="space-between" alignItems="center" mb={3}>
                <Text className="flex items-center text-[16px] font-medium">
                  PRICE (<FaNairaSign className="text-[16px]" />)
                </Text>
                <Text>{priceRange.toLocaleString()}</Text>
              </Flex>
              <Slider defaultValue={priceRange} min={0} max={100000} step={5} onChange={(value) => setPriceRange(value)}>
                <SliderTrack>
                  <SliderFilledTrack bg="green.600" />
                </SliderTrack>
                <SliderThumb boxSize={4} />
              </Slider>
            </Box>
          </Box>

          {/* Product List */}
          <Box flex={1} bg="white" rounded="md">
            <Flex justifyContent="space-between" alignItems="center" className="mb-4 border-b pb-5">
              <Box>
                <Heading fontWeight={500} fontSize={20}>
                  Men's Products
                </Heading>
                <Text color={'gray.500'} className="text-sm">
                  ({filteredProducts.length} products found)
                </Text>
              </Box>
              <Select width="200px" placeholder="Filter by Subcategory" onChange={(e) => setFilter(e.target.value)} value={filter}>
                <option value="All">All</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </Select>
            </Flex>

            <Box className="py-3 px-2 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-3">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <Suspense key={product._id} fallback={<Loading />}>
                    <HomeSearchCompContext.Provider value={product}>
                      <HomeSearchComp product={product} />
                    </HomeSearchCompContext.Provider>
                  </Suspense>
                ))
              ) : (
                <Text>No products found in this category.</Text>
              )}
            </Box>

            {/* Pagination */}
            <Flex justifyContent="center" alignItems="center" my={4} gap={2}>
              <Button onClick={handlePrevPage} disabled={currentPage === 1} bg={'gray.200'} _hover={{ bg: 'green.400' }}>
                Prev
              </Button>
              {Array.from({ length: totalPages }, (_, index) => (
                <Button key={index} onClick={() => handlePageChange(index + 1)} mx={1}
                  bg={currentPage === index + 1 ? 'green.600' : 'gray.200'}
                  color={currentPage === index + 1 ? 'white' : 'black'}
                  _hover={{ bg: 'green.400' }}
                >
                  {index + 1}
                </Button>
              ))}
              <Button onClick={handleNextPage} disabled={currentPage === totalPages} bg={'gray.200'} _hover={{ bg: 'green.400' }}>
                Next
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
