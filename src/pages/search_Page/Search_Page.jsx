import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCartShopping, FaNairaSign } from "react-icons/fa6";
import { TbCurrencyNaira } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
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
  Badge,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, 
  NumberInput, NumberInputField, useDisclosure
} from "@chakra-ui/react";

import Header from "../../components/Header";
import { addWishlist } from "../../store/wishlists/Wishlists";
import Footer from "../../components/footer/Footer";
import SearchLoader from "../../components/searchs/SearchLoader/SearchLoader";
import { useCart } from "../../Context_APIs/CartCountContext";
import { getCartToken } from "../../store/cart/utils/cartToken";
import { motion } from "framer-motion";
import { IoHeart } from "react-icons/io5";

const MotionButton = motion.create(Button);

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [size, setSize] = useState("");
  const [deal, setDeal] = useState("");
  const { updateCart } = useCart();
  const [loadingProductId, setLoadingProductId] = useState(null); 

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toast = useToast({ position: "top" });
  const { currentUser } = useSelector((state) => state.user);

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

  const handleCart = async (product, size, qty) => {
    setLoadingProductId(product._id);

    const cartItem = {
      productId: product._id,
      name: product.name,
      stock: product.stock || 0,
      price: product.price,
      discount: product.discount || 0,
      oldprice: product.oldprice || 0,
      deal: product.deal || "",
      category: product.category || "",
      image: product.image || [],
      description: product.description || "",
      discountType: product.discountType || "",
      trackingId: product.trackingId || "",
      size: product.size || [],
      selectedSize: size || product.size?.[0] || "",
      quantity: qty || 1,
      gender: product.gender || "unisex",
    };

    try {
      const payload = {
        userId: currentUser?._id || null,
        cartToken: currentUser?._id ? null : getCartToken(),
        product: cartItem,
      };

      const res = await fetch("https://adexify-api.vercel.app/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        updateCart(data.cart); //instantly updates count everywhere
        // ✅ Backend already merges or increments item if exists
        toast({
          title: "Success",
          description: "Item added to cart.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        if (data.message?.includes("already")) {
          toast({
            title: "Notice",
            description: "Item already in cart.",
            status: "info",
            duration: 2000,
            isClosable: true,
          });
        } else {
          throw new Error(data.message);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoadingProductId(null);
    }
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

  const openCartModal = (product) => {
    setSelectedProduct(product);
    if (product.size?.length > 0) {
      onOpen(); // open modal if sizes exist
    } else {
      handleCart(product, "", 1); // directly add if no sizes
    }
  };

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

          <SimpleGrid columns={{ base: 2, sm: 2, md: 4, xl: 5 }} bg={"white"} p={{ md: 3 }} rounded={"xl"} gap={4} spacing={1}> 
            {products.map((item) => (
              <Box key={item._id} pos={'relative'} bg="white" borderRadius="lg" border={"1px solid"} borderColor={"gray.200"} position="relative">
                
                <Link to={`/product-details/${item._id}`}>
                  <Flex  w={{ base: "full", md: "100%" }} p={2} mx="auto"  justify={"center"}  alignItems={"center"}>
                    <Image
                      src={item.image?.length > 0 ? item.image[0] : "/placeholder.png"}
                      alt={item.name}
                      h="full"
                      objectFit="cover"
                      borderRadius="md"
                      height={'200px'} width={'full'}
                    />
                  </Flex>
                </Link>
                <Flex zIndex={1} justifyContent={"center"} alignItems={"center"} fontSize={"2xl"} onClick={() => handleWishlistItem(item)} aria-label="Add to wishlist" position="absolute" top="2" right="2" w="30px" h="30px" bg="gray.300" color="white" rounded="full" _hover={{ color: "pink.600", bg: "gray.400" }} _active={{ color: "pink.600", bg: "gray.400" }}>
                  <IoHeart />
                </Flex>
                <Box p={1}>
                  <Text fontWeight="500" fontSize={'14'} isTruncated>{item?.name}</Text>
                  
                    {item?.oldprice && (
                      <Box bg={'white'} pos={'absolute'} left={2} top={2} fontSize="xs" px={2} py={1} roundedRight="full" w={'60px'} color="pink.500" fontWeight="medium" display="flex" alignItems="center">
                          {((item?.oldprice - item?.price) / item?.oldprice * 100).toFixed(2)}%
                      </Box>
                    )}
  
                    <Flex justifyContent={'space-between'} alignItems="center" mt={1}>
                      <Text fontSize={'sm'} display="flex" alignItems="center" fontWeight={'600'}>
                        <FaNairaSign />
                        <span className="font-medium">{item?.price.toLocaleString()}.00</span>
                      </Text>
  
                      {item?.oldprice && (
                        <Badge fontSize="12px" fontWeight={400} color="gray.400" textDecoration="line-through">
                          <FaNairaSign className="inline-block text-[12px]" />{item?.oldprice}
                        </Badge>
                      )}
                    </Flex>
                    <MotionButton
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: loadingProductId === item._id ? 0.7 : 1 }}
                      transition={{ duration: 0.2 }}
                      disabled={loadingProductId === item._id}
                      _hover={{ bg: 'pink.600', color: 'white' }}
                      onClick={() => openCartModal(item)}
                      w="full"
                      mt={3}
                      border={'1px solid'}
                      bg={'pink.500'}
                      color="white">
                      {loadingProductId === item._id ? (
                        <>
                          <Spinner size="sm" mr={2} /> Adding...
                        </>
                      ) : (
                        'Add to Cart'
                      )}
                    </MotionButton>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent mx={3}>
            <ModalHeader>Select Size & Quantity</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text isTruncated mb={4}>{selectedProduct?.name}</Text>
              <Flex bg={'pink.50'} alignItems="center" justifyContent={"space-between"} mt={4} gap={3} width={"100%"} p={2} rounded={"md"}>
                <Heading fontSize="md" fontWeight={500} display="flex" alignItems="center">
                  <FaNairaSign /> {selectedProduct?.price?.toLocaleString()}
                </Heading>
                {selectedProduct?.oldprice && (
                  <Text fontSize="md" display={"flex"} alignItems={"center"} textDecor="line-through" color="gray.500">
                    <FaNairaSign /> {selectedProduct?.oldprice?.toLocaleString()}
                  </Text>
                )}
              </Flex>
  
              <Box my={4}>
                  {selectedProduct?.stock > 0 ? (
                    <Badge bg="pink.500" color={'white'} fontWeight={500} px={2} py={1} rounded="sm">
                      In Stock
                    </Badge>
                  ) : (
                    <Badge colorScheme="red" px={2} py={1} rounded="md">
                      Out of Stock
                    </Badge>
                  )}
                </Box>
  
              {selectedProduct?.size?.length > 0 && (
                <Select
                  placeholder="Select size"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {selectedProduct.size.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              )}
              <NumberInput mt={4} min={1} value={quantity} onChange={(val) => setQuantity(Number(val))}>
                <NumberInputField />
              </NumberInput>
  
              {selectedProduct?.oldprice && (
                <Text mt={4} display="flex" alignItems="center" gap={1} color="gray.500">
                  You save <FaNairaSign />{" "}
                  <Text as="span" fontWeight="medium" color="green.600">
                    {(selectedProduct.oldprice - selectedProduct.price).toLocaleString()}
                  </Text>
                </Text>
              )}
              <Flex justifyContent={'space-between'} fontSize={'sm'} rounded={'md'} px={3} mt={4} bg={'pink.50'} alignItems={'center'}>
                <Text mt={4} mb={3} color={"gray.700"}>
                  Product Code: <span className="text-pink-600 font-medium">{selectedProduct?.trackingId}</span>
                </Text>
                <Text mt={2} mb={3} color={"gray.700"}>
                  Category: <span className="text-pink-600 font-medium">{selectedProduct?.category}</span>
                </Text>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="pink"
                onClick={() => {
                  handleCart(selectedProduct, selectedSize, quantity);
                  onClose();
                }}
              >
                Add to Cart
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <Footer />
    </Box>
  );
}
