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
import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, 
  NumberInput, NumberInputField, useDisclosure
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
import { addToCart, clearError, clearSuccess, } from "../../store/cart/cartSlice";
import { addToWishlist, clearWishlistError } from "../../store/cart/wishlistSlice";
import { getCartToken } from "../../store/cart/utils/cartToken";
import { useCart } from "../cartsPage/CartCountContext";

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
  const { updateCart } = useCart();

  const toast = useToast({ position: "top" });
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getError, setError] = useState("");
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [loadingWishlistProductId, setLoadingWishlistProductId] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  // Pagination states
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

  
  const handleAddToCart = async (product, size, qty) => {
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

  console.log(selectedProduct);

// const error = useSelector((state) => state.guestWishlist.error);

  // Handle Add to Wishlist
  const handleWishlistItem = async (product) => {
    setLoadingWishlistProductId(product._id);

    const wishlistItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image || [],
      category: product.category || '',
      brand: product.brand || '',
      gender: product.gender || '',
      description: product.description || '',
    };

    try {
      // =======================
      // Guest Wishlist
      // =======================
      if (!currentUser?._id) {
        dispatch(addToWishlist(wishlistItem));
        const count = guestWishlist.items.length;
        dispatch(setWishlistCount(count));

        if (guestWishlist.error) {
          toast({
            title: "Error",
            description: guestWishlist.error,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          dispatch(clearWishlistError());
          return;
        } else {
          toast({
            title: "Added to wishlist!",
            description: "Item saved locally. Log in to save permanently.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
        return;
      }

      // =======================
      // Logged-in Wishlist
      // =======================
      // 1. Merge guest wishlist if exists
      if (guestWishlist.items.length > 0) {
        const res = await fetch("https://adexify-api.vercel.app/api/wishlist/merge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: currentUser._id, products: guestWishlist.items }),
        });

        const data = await res.json();
        if (!res.ok || data.success === false) {
          toast({
            title: "Error",
            description: data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return;
        }

        dispatch(clearWishlist()); // clear guest wishlist after merging
      }

      // 2. Add current product to DB wishlist
      const payload = { userId: currentUser._id, product: wishlistItem };

      const res = await fetch('https://adexify-api.vercel.app/api/wishlist/add-to-wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success === true) {
        toast({
          title: 'Added to wishlist!',
          description: 'Item saved successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        // Refresh wishlist count
        const wishlistRes = await fetch('https://adexify-api.vercel.app/api/wishlist/get-wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: currentUser._id }),
        });

        const wishlistData = await wishlistRes.json();
        if (wishlistRes.ok && wishlistData.success === true) {
          const count = wishlistData.wishlist?.products?.length || 0;
          dispatch(setWishlistCount(count));
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
      setLoadingWishlistProductId(null);
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


  const openCartModal = (product) => {
    setSelectedProduct(product);
    if (product.size?.length > 0) {
      onOpen(); // open modal if sizes exist
    } else {
      handleAddToCart(product, "", 1); // directly add if no sizes
    }
  };

  return (
    <Box bg={''} className="bg-zinc-200">
      <Header />
      {/* {category === "Shirt" && <ShirtsBanner category={category} />} */}
      <ProductByCategroyBanner category={category} />
      

      <Box maxW={{md:"95%", base: 'full'}} mx="auto" my={0} bg={'white'} rounded={'lg'} p={{lg:4, base: 2}}>
        {/* Price Filter */}
        {/* <Box bg={'gray.100'} rounded={'lg'} mb={4} gap={4} py={2} px={4} display={'flex'} alignItems={'center'} justifyContent={'space-between'} flexWrap={{md:'wrap'}}>
          <Heading size={{md:"lg", base: 'sm', xs: 'sm'}} color={'gray.800'}>Browse Products in "<Text as={'span'} color={'pink.500'}>{category}</Text>"</Heading>
          <Box >
            <Select bg={'white'} value={priceRange} onChange={(e) => handlePriceFilter(e.target.value)} w={{md:"200px"}}>
              <option value="all">All Prices</option>
              <option value="below5000">Below ₦5,000</option>
              <option value="5000to10000">₦5,000 - ₦10,000</option>
              <option value="10000to20000">₦10,000 - ₦20,000</option>
              <option value="20000to50000">₦20,000 - ₦50,000</option>
              <option value="50000to100000">₦50,000 - ₦100,000</option>
              <option value="above100000">Above ₦100,000</option>
            </Select>
          </Box>
        </Box> */}

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
        {getError && <Text color="red.500">{getError}</Text>}

        {/* Product Grid */}
        <SimpleGrid columns={{ base: 2, sm: 2, md: 5, xl: 6 }} spacing={1}>
          {currentItems.map((product) => (
            <Box key={product._id} position="relative" borderWidth="1px" borderColor={'gray.50'} borderRadius="xl" p={2} bg="white">
              <VStack spacing={2} align="stretch">
                {/* <Link to={'/'} className='absolute top-0 left-0 bg-pink-200 md:px-2 md:py-0 px-2 py-1 rounded-br-md rounded-tl-md flex items-center gap-2'>
                  <Image src='/Logo.png' alt='logo' w={{md:'80px', base:'65px'}}/>
                </Link> */}

                <Link to={`/product-details/${product._id}`}>
                  <Image mx="auto" src={product.image?.[0] || "https://via.placeholder.com/150"} alt={product.name} height={'200px'} width={'full'} objectFit="cover" borderRadius="md"/>
                </Link>

                {loadingWishlistProductId === product._id ? (
                    <Flex justifyContent='center' alignItems='center' bg={'pink.600'} rounded={'full'} className="absolute top-2 right-2 w-[26px] h-[26px]">
                      <Spinner color="gray.50" size="sm" mr={2} />
                    </Flex>
                  ) : (
                    <button onClick={() => handleWishlistItem(product)} className="absolute top-2 right-2 w-[26px] h-[26px] bg-pink-200 flex justify-center items-center rounded-full">
                      <IoHeart className="text-xl text-white hover:text-pink-600" />
                    </button>
                  )}

                <Box>
                  <Text fontWeight="500" fontSize={'14'} isTruncated>{product.name}</Text>
                  {/* <Badge bg="gray.200" fontSize="10px" p={1} px={2} color="gray.800">
                    {product.category}
                  </Badge> */}
                  {/* <Text fontSize="sm" color="gray.600" isTruncated>
                    {product.description}
                  </Text> */}

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

                  <MotionButton
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: loadingProductId === product._id ? 0.7 : 1 }}
                    transition={{ duration: 0.2 }}
                    disabled={loadingProductId === product._id}
                    _hover={{ bg: 'pink.600', color: 'white' }}
                    onClick={() => openCartModal(product)}
                    w="full"
                    mt={3}
                    border={'1px solid'}
                    bg={'pink.500'}
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
      </Box>

      {/* Also interested */}
      <SuggestedSection/>
      
      <FashionCategory/>
      
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

      <Box mb={12}>
        <Adverts/>
      </Box>
      <Footer />
    </Box>
  );
};

export default ProductsByCategory;
