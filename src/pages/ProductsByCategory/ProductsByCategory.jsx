import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  VStack,
  useToast,
  Badge,
  Button,
  Select,
  GridItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/footer/Footer";
import { IoHeart } from "react-icons/io5";
import { FaNairaSign } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addWishlist } from "../../store/wishlists/Wishlists";
import Adverts from "../../components/Adverts/Adverts";
import { addToCart } from "../../store/cart/cartsReucer";
import FashionCategory from "../../components/Bottom_Categories/FashionCategory";
import FemaleSalesBanner from "../../components/banners/FemaleSalesBanner";
import ProductByCategroyBanner from "../clothing_page/Categories_Banner/ProductByCategroyBanner";
import MaleSalesBanner from "../../components/banners/MaleSalesBanner";

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

  const toast = useToast({ position: "top" });
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  // Handle Add to Cart
  const handleCart = (product) => {
    dispatch(
      addToCart({
        productID: product._id,
        productName: product.name,
        productImage: product.image?.[0],
        productPrice: product.price,
        items: {},
      })
    );
    toast({
      title: 'Added to cart!',
      description: "Added to cart.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle Add to Wishlist
  const handleWishlistItem = (product) => {
    dispatch(
      addWishlist({
        productID: product._id,
        productName: product.name,
        productImage: product.image?.[0],
        productPrice: product.price,
        quantity: 1,
      })
    );
    toast({
      description: "Added to wishlist.",
      duration: 3000,
      isClosable: true,
      bg: "gray.400",
    });
  };

  // Filter by price
  const handlePriceFilter = (range) => {
    setPriceRange(range);
    let filtered = [...products];

    switch (range) {
      case "below5000":
        filtered = filtered.filter(p => p.price < 5000);
        break;
      case "5000to10000":
        filtered = filtered.filter(p => p.price >= 5000 && p.price <= 10000);
        break;
      case "10000to20000":
        filtered = filtered.filter(p => p.price > 10000 && p.price <= 20000);
        break;
      case "20000to50000":
        filtered = filtered.filter(p => p.price > 20000 && p.price <= 50000);
        break;
      case "50000to100000":
        filtered = filtered.filter(p => p.price > 50000 && p.price <= 100000);
        break;
      case "above100000":
        filtered = filtered.filter(p => p.price > 100000);
        break;
      default:
        filtered = [...products];
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // reset to first page on filter change
  };

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
      
      <Box maxW={{md:"95%", base: 'full'}} mx="auto" my={6} bg={'white'} rounded={'lg'} p={{lg:4, base: 2}}>
        <Box bg={'gray.100'} rounded={'lg'} mb={4} gap={4} py={2} px={4} display={'flex'} alignItems={'center'} justifyContent={'space-between'} flexWrap={'wrap'}>
          <Heading size="lg" color={'gray.800'}>Browse Products in "<Text as={'span'} color={'pink.500'}>{category}</Text>"</Heading>

          {/* Price Filter */}
          <Box >
            <Select bg={'white'} value={priceRange} onChange={(e) => handlePriceFilter(e.target.value)} w="200px">
              <option value="all">All Prices</option>
              <option value="below5000">Below ₦5,000</option>
              <option value="5000to10000">₦5,000 - ₦10,000</option>
              <option value="10000to20000">₦10,000 - ₦20,000</option>
              <option value="20000to50000">₦20,000 - ₦50,000</option>
              <option value="50000to100000">₦50,000 - ₦100,000</option>
              <option value="above100000">Above ₦100,000</option>
            </Select>
          </Box>
        </Box>

        <SimpleGrid bg={'white'} rounded={'xl'} gap={4} columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={3} py={3} px={2}>
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
        {error && <Text color="red.500">{error}</Text>}

        {/* Product Grid */}
        <SimpleGrid columns={{ base: 2, sm: 2, md: 3, lg: 4, xl: 5, '2xl': 6 }} spacing={2}>
          {currentItems.map((product) => (
            <Box key={product._id} position="relative" borderWidth="1px" borderRadius="xl" p={2} bg="white">
              <VStack spacing={2} align="stretch">
                <Link to={`/product-details/${product._id}`}>
                  <Image mx="auto" src={product.image?.[0] || "https://via.placeholder.com/150"} alt={product.name} boxSize="150px" objectFit="cover" borderRadius="md"/>
                </Link>

                <button onClick={() => handleWishlistItem(product)} className="absolute top-2 right-2 w-[30px] h-[30px] bg-gray-200 flex justify-center items-center rounded-full">
                  <IoHeart className="text-xl text-white hover:text-gray-600" />
                </button>

                <Box>
                  <Text fontWeight="500" isTruncated>{product.name}</Text>
                  <Badge bg="gray.200" fontSize="10px" p={1} px={2} color="gray.800">
                    {product.category}
                  </Badge>
                  <Text fontSize="sm" color="gray.600" isTruncated>
                    {product.description}
                  </Text>

                  <Text display="flex" alignItems="center">
                    <FaNairaSign />
                    <span className="font-medium">{product.price.toLocaleString()}.00</span>
                  </Text>

                  {product.oldprice && (
                    <Text fontSize="sm" color="gray.400" textDecoration="line-through">
                      <FaNairaSign className="inline-block text-sm" />{product.oldprice}
                    </Text>
                  )}

                  <Button _hover={{bg: 'pink.800'}} onClick={() => handleCart(product)} w="full" mt={3} bg="pink.500" color="white">
                    Add To Cart
                  </Button>
                </Box>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box mt={8} maxW={'sm'} mx={'auto'} py={3} rounded={'lg'} display="flex" justifyContent="center" gap={4} className="bg-pink-200">
            <Button bg={'pink.500'} _hover={{bg:'pink.800'}} color={'white'} onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} isDisabled={currentPage === 1}>
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
