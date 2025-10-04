import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  VStack,
  Badge,
  Button,
  GridItem,
  useColorModeValue,
  Flex
} from "@chakra-ui/react";

import { Link, useSearchParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/footer/Footer";
import { FaNairaSign } from "react-icons/fa6";
import Adverts from "../../components/Adverts/Adverts";
import FashionCategory from "../../components/Bottom_Categories/FashionCategory";
import FemaleSalesBanner from "../../components/banners/FemaleSalesBanner";
import ProductByCategroyBanner from "../clothing_page/Categories_Banner/ProductByCategroyBanner";
import MaleSalesBanner from "../../components/banners/MaleSalesBanner";
import AddToWishlistButton from "../../hooks/AddToWishlistButton";
import AddToCartButton from "../../hooks/AddToCartButton";

const SuggestedSection = () => {
  return (
    <Box mb={8} maxW={{ '2xl': '80%', xl: '95%', lg: '100%', base: '97%' }} mx="auto" bg={useColorModeValue('white', 'gray.800')} p={{ base: 4, md: 6 }} mt={6} rounded="2xl">
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
        <FemaleSalesBanner/>
        <MaleSalesBanner/>
      </Box>
    </Box>
  );
};


const ProductsByCategory = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getError, setError] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  
  // Price filter
  const [priceRange, setPriceRange] = useState("all");
  
  // Fetch products by category
  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch(
        `https://adexify-api.vercel.app/api/all-products/products?category=${encodeURIComponent(category)}`
      );
      const data = await res.json();

      if (!res.ok || data.success === false) {
        setError(data.message || "Failed to fetch products");
        return;
      }

      setProducts(data.data || []);
      setFilteredProducts(data.data || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      fetchProducts();
    }
  }, [category]);

  // // Filter by price
  // const handlePriceFilter = (range) => {
  //   setPriceRange(range);
  //   let filtered = [...products];

  //   switch (range) {
  //     case "below5000":
  //       filtered = filtered.filter(p => p.price < 5000);
  //       break;
  //     case "5000to10000":
  //       filtered = filtered.filter(p => p.price >= 5000 && p.price <= 10000);
  //       break;
  //     case "10000to20000":
  //       filtered = filtered.filter(p => p.price > 10000 && p.price <= 20000);
  //       break;
  //     case "20000to50000":
  //       filtered = filtered.filter(p => p.price > 20000 && p.price <= 50000);
  //       break;
  //     case "50000to100000":
  //       filtered = filtered.filter(p => p.price > 50000 && p.price <= 100000);
  //       break;
  //     case "above100000":
  //       filtered = filtered.filter(p => p.price > 100000);
  //       break;
  //     default:
  //       filtered = [...products];
  //   }

  //   setFilteredProducts(filtered);
  //   setCurrentPage(1); // reset to first page on filter change
  // };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <Box bg={''} className="bg-zinc-200">
      <Header />
      {/* {category === "Shirt" && <ShirtsBanner category={category} />} */}
      <ProductByCategroyBanner category={category} />
      

      <Box maxW={{md:"95%", base: '97%'}} mx="auto" my={0} bg={'white'} rounded={'lg'} p={{lg:4, base: 2}}>
        <SimpleGrid bg={'white'} rounded={'xl'} gap={4} columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={1} py={3} px={2}>
          {
            loading && [...Array(8)].map((_, index) => (
              <GridItem key={index} bg="gray.200" p={4} borderRadius="lg" border={'1px solid'} borderColor={'gray.200'} opacity={0.6}>
                <Box h="150px" bg="gray.300" mb={4} />
                <Box h="2" bg="gray.300" w="3/4" mb={2} />
                <Box h="2" bg="gray.300" w="1/2" mb={2}/>
                <Box h="2" bg="gray.300" w="1/2" />
                <Box h="10" bg="gray.300" w="full" mt={3} />
              </GridItem>
            ))
          }
        </SimpleGrid>
        {getError && <Text color="red.500">{getError}</Text>}

        {/* Product Grid */}
        <SimpleGrid columns={{ base: 2, sm: 3, md: 5, xl: 6 }} spacing={1}>
          {currentItems.map((product) => (
            <Box key={product._id} position="relative" borderWidth="1px" borderColor={'gray.50'} borderRadius="xl" p={2} bg="white">
              <VStack spacing={2} align="stretch">
                {/* <Link to={'/'} className='absolute top-0 left-0 bg-pink-200 md:px-2 md:py-0 px-2 py-1 rounded-br-md rounded-tl-md flex items-center gap-2'>
                  <Image src='/Logo.png' alt='logo' w={{md:'80px', base:'65px'}}/>
                </Link> */}

                <Link to={`/product-details/${product._id}`}>
                  <Image mx="auto" src={product.image?.[0] || "https://via.placeholder.com/150"} alt={product.name} height={'200px'} width={'full'} objectFit="cover" borderRadius="md"/>
                </Link>
                
                <Box>
                  <Text fontWeight="500" fontSize={'14'} isTruncated>{product.name}</Text>
                  {product.stock !== undefined && (
                    <Box my={3}>
                      <Text fontSize="xs" color="gray.500" mb={1}>
                        Stock left: {product.stock}
                      </Text>
                      <Box bg="gray.200" h="6px" w="100%" borderRadius="full" overflow="hidden">
                        <Box
                          h="100%"
                          w={`${(product.stock / 100) * 100}%`}
                          bg="pink.600"
                          borderRadius="full"
                          transition="width 0.3s ease"
                        />
                      </Box>
                    </Box>
                  )}
                  {product.oldprice && (
                    <Box bg={'white'} pos={'absolute'} left={2} top={2} fontSize="xs" px={2} py={1} roundedRight="full" w={'60px'} color="pink.500" fontWeight="medium" display="flex" alignItems="center">
                        {((product.oldprice - product.price) / product.oldprice * 100).toFixed(2)}%
                    </Box>
                  )}

                  <Flex justifyContent={'space-between'} alignItems="center" mt={1}>
                    <Text fontSize={'sm'} display="flex" alignItems="center" fontWeight={'600'}>
                      <FaNairaSign />
                      <span className="font-medium">{product.price.toLocaleString()}.00</span>
                    </Text>

                    {product.oldprice && (
                      <Badge fontSize="12px" fontWeight={400} color="gray.400" textDecoration="line-through">
                        <FaNairaSign className="inline-block text-[12px]" />{product.oldprice}
                      </Badge>
                    )}
                  </Flex>

                  {/* Add to cart component */}
                  <AddToCartButton product={product}/>
                  {/* Add to wislist component */}
                  <AddToWishlistButton product={product} />

                </Box>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box mt={8} maxW={'sm'} mx={'auto'} py={3} rounded={'lg'} display="flex" justifyContent="center" gap={4} className="bg-pink-200">
            <Button bg={'pink.500'} _hover={{bg:'pink'}} color={'white'} onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} isDisabled={currentPage === 1}>
              Prev
            </Button>
            <Text color={'white'} alignSelf="center">
              Page {currentPage} of {totalPages}
            </Text>
            <Button bg={'pink.500'} _hover={{bg:'pink.800'}} color={'white'}
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              isDisabled={currentPage === totalPages}
            >
              Next
            </Button>
          </Box>
        )}
        {
          !products.length && !loading && (
            <Box textAlign="center" py={10} px={6}> 
              <Text fontSize="xl" mt={3} mb={2} color={'gray.700'}>
                No products found in "{category}" category.
              </Text>
              <Link to="/">
                <Button bg={'pink.500'} _hover={{bg:'pink.600'}} color={'white'}>Go to Home</Button>
              </Link>
            </Box>
          )
          
        }
      </Box>

      {/* Also interested */}
      <SuggestedSection/>
      
      <FashionCategory/>

      <Box mb={12}>
        <Adverts/>
      </Box>
      <Footer />
    </Box>
  );
};

export default ProductsByCategory;
