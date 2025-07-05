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
  Spinner, 
  Flex
} from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/footer/Footer";
import { IoHeart } from "react-icons/io5";
import { FaNairaSign } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist } from "../../store/wishlists/Wishlists";
import Adverts from "../../components/Adverts/Adverts";
import FashionCategory from "../../components/Bottom_Categories/FashionCategory";
import FemaleSalesBanner from "../../components/banners/FemaleSalesBanner";
import ProductByCategroyBanner from "../clothing_page/Categories_Banner/ProductByCategroyBanner";
import MaleSalesBanner from "../../components/banners/MaleSalesBanner";
import { motion } from 'framer-motion';
import { setCartCount } from "../../store/cart/cartActions";
import { setWishlistCount } from "../../store/cart/wishlishActions";

const MotionButton = motion.create(Button);
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

  const [loadingProductId, setLoadingProductId] = useState(null);
  const [loadingWishlistProductId, setLoadingWishlistProductId] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  // =====================
  // Handle Add to Cart
  // =====================
  const handleCart = async (product) => {
    // Show loading only for the current product
    setLoadingProductId(product._id);

    // Construct the payload to send to the backend
    const payload = {
      userId: currentUser._id || '',
      product: {
        productId: product._id,
        name: product.name,
        stock: product.stock || 0,
        price: product.price,
        discount: product.discount || 0,
        oldprice: product.oldprice || 0,
        deal: product.deal || '',
        category: product.category || '',
        image: product.image || [],
        description: product.description || '',
        discountType: product.discountType || '',
        trackingId: product.trackingId || '',
        size: product.size || [],
        selectedSize: product.size?.[0] || '', // Default to first size if any
        quantity: 1, // Quantity is always 1 (no quantity selection logic anymore)
        gender: product.gender || 'unisex',
        brand: product.brand || '',
      },
    };

    try {
      // Send the product to backend to add to user's cart
      const res = await fetch('https://adexify-api.vercel.app/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      // If item added successfully
      if (res.ok && data.success === true) {
        toast({
          title: 'Added to cart!',
          description: 'Item added successfully.', 
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        // Fetch updated cart from backend to get latest product count
        const cartRes = await fetch('https://adexify-api.vercel.app/api/cart/get-user-cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: currentUser._id }),
        });

        const cartData = await cartRes.json();

        if (cartRes.ok && cartData.success === true) {
          // Get the count of products in the cart
          const count = cartData.cart?.products?.length || 0;

          // Dispatch count to Redux so header badge can update immediately
          dispatch(setCartCount(count));
        }
      } else {
        // If adding to cart failed
        throw new Error(data.message || 'Failed to add to cart');
      }
    } catch (error) {
      // Handle network or server error
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      //Stop loading state for this product
      setLoadingProductId(null);
    }
  };

  // Handle Add to Wishlist
  const handleWishlistItem = async (product) => {
  // Show loading for this product (optional, but consistent with cart)
  setLoadingWishlistProductId(product._id);

  // Construct payload
  const payload = {
    userId: currentUser._id,
    product: {
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image || [],
      category: product.category || '',
      brand: product.brand || '',
      gender: product.gender || '',
      description: product.description || '',
    },
  };

  try {
    // Send product to backend
    const res = await fetch('https://adexify-api.vercel.app/api/wishlist/add-to-wishlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok && data.success === true) {
      toast({
        title: 'Added to wishlist!',
        description: 'Item saved to your wishlist.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Fetch updated wishlist to get count
      const wishlistRes = await fetch('https://adexify-api.vercel.app/api/wishlist/get-wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser._id }),
      });

      const wishlistData = await wishlistRes.json();

      console.log('Wishlist Data:', wishlistData);

      if (wishlistRes.ok && wishlistData.success === true) {
        const count = wishlistData.wishlist?.products?.length || 0;
        console.log("Wishlist count:", count); // ✅ DEBUG
        dispatch(setWishlistCount(count)); // Send to Redux
      }

    } else {
      throw new Error(data.message || 'Failed to add to wishlist');
    }
  } catch (error) {
    toast({
      title: 'Error',
      description: error.message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  } finally {
    setLoadingWishlistProductId(null); // Stop loading
  }
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
                  <Image mx="auto" src={product.image?.[0] || "https://via.placeholder.com/150"} alt={product.name} height={'200px'} width={'full'} objectFit="cover" borderRadius="md"/>
                </Link>

                {loadingWishlistProductId === product._id ? (
                    <Flex justifyContent='center' alignItems='center' bg={'pink.600'} rounded={'full'} className="absolute top-2 right-2 w-[30px] h-[30px]">
                      <Spinner color="gray.50" size="sm" mr={2} />
                    </Flex>
                  ) : (
                    <button onClick={() => handleWishlistItem(product)} className="absolute top-2 right-2 w-[30px] h-[30px] bg-gray-200 flex justify-center items-center rounded-full">
                      <IoHeart className="text-xl text-white hover:text-gray-600" />
                    </button>
                  )}

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

                  <MotionButton
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: loadingProductId === product._id ? 0.7 : 1 }}
                    transition={{ duration: 0.2 }}
                    disabled={loadingProductId === product._id}
                    _hover={{ bg: 'pink.800' }}
                    onClick={() => handleCart(product)}
                    w="full"
                    mt={3}
                    bg="pink.500"
                    color="white">
                    {loadingProductId === product._id ? (
                      <>
                        <Spinner size="sm" mr={2} /> Adding...
                      </>
                    ) : (
                      'Add to Cart'
                    )}
                  </MotionButton>

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
