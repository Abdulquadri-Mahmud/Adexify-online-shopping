import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { TbCurrencyNaira } from "react-icons/tb";
import { useDispatch } from "react-redux";
import {
  Box,
  Heading,
  Input,
  Text,
  Flex,
  Image,
  Button,
  Grid,
  HStack,
  SimpleGrid,
  Container,
  GridItem,
  Badge,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  DrawerOverlay,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { IoBagHandle, IoHeart } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";
import Header from "../../components/Header";
// import { addToCart } from "../../store/cart/cartsReucer";
import { addWishlist } from "../../store/wishlists/Wishlists";
import Footer from "../../components/footer/Footer";
import SearchLoader from "../../components/searchs/SearchLoader/SearchLoader";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { FiUserX } from "react-icons/fi";

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [size, setSize] = useState("");
  const [deal, setDeal] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";
  const minPrice = parseInt(searchParams.get("minPrice")) || 0;
  const maxPrice = parseInt(searchParams.get("maxPrice")) || 50000;
  const selectedSize = searchParams.get("size") || "";
  const selectedDeal = searchParams.get("deal") || "";

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
    setSize(selectedSize);
    setDeal(selectedDeal);
  }, [minPrice, maxPrice, selectedSize, selectedDeal]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          query,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          size,
          deal,
        }).toString();

        const response = await fetch(
          `https://adexify-api.vercel.app/api/search/?${queryParams}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.results);
      } catch (err) {
        setError(`Failed to load search results: ${err.message}`);
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query, priceRange, size, deal]);

  const updateFilters = (key, value) => {
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    navigate(`/search?${params.toString()}`);
  };

  const handleAddToCart = (product) => {
    const cartItem = {
      productID: product._id,
      productImage: product.image?.length > 0 ? product.image[0] : "/placeholder.png",
      productName: product.name,
      productPrice: product.price,
      quantity: 1,
    };

    dispatch(addToCart(cartItem));
  };

  const handleWishlistItem = (product) => {
    const cartItem = {
      productID: product._id || "",
      productName: product.name || [],
      productImage: product.image?.length > 0 ? product.image[0] : product.image || [],
      productPrice: product.price || "",
      stock: product.stock || [],
      quantity: 1,
    };
    dispatch(addWishlist(cartItem));
  };

  const handleBack = () => navigate(-1);

  return (
    <Box className="bg-zinc-200">
      <Header />
      <Flex color="gray.800" direction={{ base: "column", lg: "row" }} wrap="wrap" gap={6} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx="auto" py={{ base: 3, lg: 6 }}>
        <Box w={{ base: "100%", lg: "300px" }} h={{ lg: "100%" }} bg="white" p={4} rounded="xl">
          <Heading as="h3" size="md" fontWeight={500} color={'gray.700'} mb={4}>
            Advance Search
          </Heading>

          <Input value={query} onChange={(e) => updateFilters("query", e.target.value)} placeholder="Search for products" mb={4}/>

          <Box mb={4} width={'full'} display={'flex'} flexWrap={{md:'wrap', base: 'nowrap'}} gap={{base:8, md: 3}} px={2} alignItems={'center'} justifyContent={'space-between'} >
            <Box w={{base:'50%', md: '100%'}}>
              <Text fontWeight="semibold" mb={1}>
                Min Price: N{priceRange[0]}
              </Text>
              <Slider aria-label="min-price-slider" min={0} max={priceRange[1]} step={500} value={priceRange[0]} onChange={(val) => setPriceRange([val, priceRange[1]])} onChangeEnd={() => {   updateFilters("minPrice", priceRange[0]);
                }}
              >
                <SliderTrack bg="pink.300">
                  <SliderFilledTrack bg="pink.500" />
                </SliderTrack>
                <SliderThumb boxSize={6} />
              </Slider>
            </Box>
            <Box w={{base:'50%', md: '100%'}}>
              <Text fontWeight="semibold" mb={1}>
                Max Price: N{priceRange[1]}
              </Text>
              <Slider aria-label="max-price-slider" min={priceRange[0]} max={100000} step={500} value={priceRange[1]} onChange={(val) => setPriceRange([priceRange[0], val])} onChangeEnd={() => {
                  updateFilters("maxPrice", priceRange[1]);
                }}
              >
                <SliderTrack bg="pink.300">
                  <SliderFilledTrack bg="pink.500" />
                </SliderTrack>
                <SliderThumb boxSize={6} />
              </Slider>
            </Box>
          </Box>

          <Box display={'flex'} gap={{base:8, md: 3}} px={2} alignItems={'center'} flexWrap={{md:'wrap', base: 'nowrap'}} justifyContent={'space-between'} >
            <Box mb={4} width={{base:'50%', md: '100%'}}>
              <Text fontWeight="semibold" mb={1}>
                Size
              </Text>
              <Box as="select" value={size} onChange={(e) => updateFilters("size", e.target.value)} width="100%" px={3} py={2} borderWidth={1} borderRadius="md" borderColor="gray.300">
                <option value="">All Sizes</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">Extra Large</option>
              </Box>
            </Box>

            <Box mb={4} w={{base:'50%', md: '100%'}}>
              <Text fontWeight="semibold" mb={1}>
                Deals
              </Text>
              <Box as="select" value={deal} onChange={(e) => updateFilters("deal", e.target.value)} width="100%" px={3} py={2} borderWidth={1} borderRadius="md" borderColor="gray.300">
                <option value="">All Deals</option>
                <option value="good">Good</option>
                <option value="great">Great</option>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box flex="1" bg="white" rounded="2xl" p={{ base: 2, lg: 4 }} >
          <Flex wrap="wrap" justify="space-between" align="center" mb={4}>
            <Heading size={{ base: "sm", lg: "ms" }} fontWeight={500} pl={{md: 0, base: 3}} pt={{md: 0, base: 3}}>
              Search Results for: <Text as="span" color="pink.600">{query}</Text>
            </Heading>
            <Text fontSize={{ base: "xs", lg: "sm" }} color="gray.500">
              ({products.length} products found)
            </Text>
          </Flex>

          {loading && <SearchLoader />}
          {error && <Text color="red.500">{error}</Text>}
          {products.length === 0 && !loading && (
            <Text color="gray.500">No products found.</Text>
          )}

          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, xl: 5 }} bg={"white"} p={{ md: 3 }} rounded={"xl"} gap={4} spacing={3}> 
            {products.map((item) => (
              <GridItem key={item._id} bg="white" borderRadius="lg" border={"1px solid"} borderColor={"gray.200"} position="relative">
                <Link to={`/product-details/${item._id}`}>
                  <Flex  w={{ base: "full", md: "100%" }} p={2} h="150px"  mx="auto"  justify={"center"}  alignItems={"center"}>
                    <Image
                      src={item.image?.length > 0 ? item.image[0] : "/placeholder.png"}
                      alt={item.name}
                      h="full"
                      objectFit="cover"
                      borderRadius="md"
                      height={'140px'} width={'full'}
                    />
                  </Flex>
                </Link>
                <Flex zIndex={1} justifyContent={"center"} alignItems={"center"} fontSize={"2xl"} onClick={() => handleWishlistItem(item)} aria-label="Add to wishlist" position="absolute" top="2" right="2" w="30px" h="30px" bg="gray.300" color="white" rounded="full" _hover={{ color: "pink.600", bg: "gray.400" }} _active={{ color: "pink.600", bg: "gray.400" }}>
                  <IoHeart />
                </Flex>
                <Box p={2}>
                  <Heading as={"h2"} fontWeight={500} fontSize={'md'} color={"gray.600"} isTruncated className="truncate">
                    {item.name}
                  </Heading>
                  <Text color="gray.600" fontSize="12px" rounded="md" isTruncated className="truncate" mb={1}>
                    {item.description}
                  </Text>
                  <Flex justify="space-between" align="center" mt={1} w="full">
                    <Box>
                      {item.oldprice ? (
                        <Badge bg="pink.100" fontWeight={500} color="gray.800" variant="subtle" mt={2} fontSize="xs">
                          {(
                            ((item.oldprice - item.price) / item.oldprice) *
                            100
                          ).toFixed(2)}
                          % OFF
                        </Badge>
                      ) : (
                        <Badge bg="gray.100" fontWeight={500} color="gray.800" variant="subtle" fontSize="12px" mt={2}> 
                          No Discount Available
                        </Badge>
                      )}
                    </Box>

                    {/* <Badge bg="gray.100" color="gray.800" variant="subtle" fontSize="12px">
                      {item.category}
                    </Badge> */}
                  </Flex>
                  <Flex justify="space-between" mt={1}>
                    <Text display={"flex"} alignItems={"center"} fontWeight="bold" color="pink.600" fontSize="lg">
                      <TbCurrencyNaira className="" />
                      {item.price?.toLocaleString() || "N/A"}.00
                    </Text>
                    {item.oldprice && (
                      <Flex fontSize="sm" color="gray.400" textDecoration="line-through" align="center" ml="3">
                        <TbCurrencyNaira fontSize="13px" />
                        <Text ml="1">{item.oldprice}</Text>
                      </Flex>
                    )}
                  </Flex>
                  {/* <Button onClick={() => handleAddToCart(item)} mt={4} w="full" bg="pink.600" color="white" leftIcon={<IoMdCart />}>
                    Add to Cart
                  </Button> */}
                </Box>
              </GridItem>
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}
