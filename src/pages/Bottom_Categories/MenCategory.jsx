import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Select,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Image,
  Badge,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaNairaSign } from 'react-icons/fa6';
import Loading from '../../components/loader/Loading';
import SearchLoader from '../../components/searchs/SearchLoader/SearchLoader';

export default function MenCategory() {
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(1000000);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://adexify-api.vercel.app/api/products/all-products');
        const data = await res.json();
        setProducts(data);
        const uniqueCategories = [...new Set(data.map((item) => item.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
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
      <Box p={4} rounded={'md'}>
        <Flex gap={3} flexWrap="wrap">
          <Box width={{ md: '300px', base: '100%' }} height={'500px'} bg={'white'} rounded={'md'}>
            <Box p={2}>
              <Heading fontWeight={500} mb={0} fontSize={18}>Category</Heading>
            </Box>
            {categories.map((category, index) => (
              <Link key={index} to={`/category?category=${category}`} className="text-sm">
                <Box py={2} px={8} className="hover:bg-green-200 rounded duration-150">
                  <Text>{category}</Text>
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
              <Slider defaultValue={priceRange} min={0} max={1000000} step={5} onChange={(value) => setPriceRange(value)}>
                <SliderTrack>
                  <SliderFilledTrack bg="green.600" />
                </SliderTrack>
                <SliderThumb boxSize={4} />
              </Slider>
            </Box>
          </Box>

          <Box flex={1} bg="white" rounded="md" p={4}>
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

            {loading ? (
              <SearchLoader />
            ) : currentProducts.length > 0 ? (
              <Box className="py-3 px-2 grid 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-3">
                {
                  currentProducts.map((product) => (
                    <Box key={product._id} bg="white" borderRadius="md" overflow="hidden" shadow="md" transition="all 0.3s" _hover={{ shadow: 'lg', transform: 'scale(1.02)' }}>
                      <Link to={`/product-details/${product._id}`}>
                        <Image src={product.image?.[0] || '/placeholder.png'} alt={product.name} objectFit="cover" width="100%" height="180px" loading="lazy"/>
                      </Link>
                      <Box p={3}>
                        <Text fontSize="md" fontWeight={500} isTruncated>{product.name}</Text>
                        <Badge bg="green.200" fontSize="10px" p={1} px={2} color="gray.800">
                          {product.category}
                        </Badge>
                        <Text fontSize="sm" color="gray.500" noOfLines={1} mt={1}>{product.description}</Text>
                        <Flex justifyContent="space-between" mt={2}>
                          <Flex align="center" color="green.600" fontWeight="bold">
                            <FaNairaSign />
                            <Text>{product.price.toLocaleString()}</Text>
                          </Flex>
                          {product.oldprice && (
                            <Text display={'flex'} alignItems={'center'} fontSize="sm" color="gray.400" textDecoration="line-through">
                              <FaNairaSign /> {product.oldprice.toLocaleString()}
                            </Text>
                          )}
                        </Flex>
                      </Box>
                    </Box>
                  ))
                }
              </Box>
            ) : (
              <Text>No products found in this category.</Text>
            )}

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
