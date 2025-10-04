import {
  Box,
  Heading,
  SimpleGrid,
  Skeleton,
  Image,
  Text,
  Badge,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AnimatePresence } from 'framer-motion';
import MotionHeart from '../motion_heart/MotionHeart';

export default function TodaysDeal() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingWishlistProductId, setLoadingWishlistProductId] = useState(null);
  const [likedItems, setLikedItems] = useState({});
  

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://adexify-api.vercel.app/api/products/all-products');
        const data = await res.json();
        setProducts(data.slice(0, 12)); // limit to 6 products
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Re-fetch on back navigation
    // window.addEventListener('popstate', fetchProducts);
    // return () => window.removeEventListener('popstate', fetchProducts);
  }, []);

    // Handle Add to Wishlist
  const handleWishlistItem = async (product) => {
    if (!product) return;
    setLoadingWishlistProductId(product._id);

    // Build wishlist item
    const wishlistItem = {
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
      selectedSize: product.size?.[0] || "",
      quantity: product?.quantity || 1,
      gender: product.gender || "unisex",
    };

    try {
      const payload = {
        userId: currentUser?._id || null,
        cartToken: currentUser?._id ? null : getCartToken(),
        product: wishlistItem,
      };

      const res = await fetch(
        "https://adexify-api.vercel.app/api/wishlist/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        // Optionally, update Redux or local state if you track wishlist count
        toast({
          title: "Added to Wishlist",
          description: "Item successfully added to wishlist.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        if (data.message?.includes("already")) {
          toast({
            title: "Notice",
            description: "Item already in wishlist.",
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
      setLoadingWishlistProductId(null);
    }
  };

  const maxStock = 100; // Upper bound of stock

  return (
    <Box className='my-10 bg-white rounded-md' maxW={{ '2xl': '80%', xl: '95%', lg: '100%', base: '97%' }} mx={'auto'}>
      <Box className='bg-white-500 pb-1 rounded-t-lg'>
        <Box bg={'pink.500'} borderBottomWidth={'1px'} borderBottom={'solid gray.300'} p={3} mx={'auto'} className=' rounded-t-lg flex justify-between items-center gap-4 '>
          <Heading fontWeight={500} fontSize={{ md: 20, base: 18 }} color={'white'} className='text-xl'>
            Today's Deals
          </Heading>
          <Link to={'/fashion'} className='text-[12px] font-medium text-white uppercase flex items-center'>
            See All <FaAngleRight className='text-[20px]' />
          </Link>
        </Box>
      </Box>

      <Box p={1}>
        <SimpleGrid columns={{ base: 2, sm: 3, md: 5, xl: 6 }} spacing={1}>
          {loading
            ? Array.from({ length: 12 }).map((_, index) => (
                <SimpleGrid bg={"white"} rounded={"xl"} gap={4} spacing={1} py={3} px={2}>
                  {[...Array(8)].map((_, index) => (
                    <SimpleGrid key={index} bg="gray.200" p={4} borderRadius="lg" border={"1px solid"} borderColor={"gray.200"} opacity={0.6}>
                      <Box h="150px" bg="gray.300" mb={4} />
                      <Box h="2" bg="gray.300" w="75%" mb={2} />
                      <Box h="2" bg="gray.300" w="50%" mb={2} />
                      <Box h="2" bg="gray.300" w="50%" />
                      <Box h="10" bg="gray.300" w="full" mt={3} />
                    </SimpleGrid>
                  ))}
                </SimpleGrid>
              ))
            : products.map((product) => (
                <Box key={product._id} borderWidth="1px" borderRadius="md" overflow="hidden" bg="white" _hover={{ shadow: 'md' }} pos={'relative'} transition="all 0.3s" className='product-card'>
                  {/* <Link to={'/'} className='absolute top-0 left-0 bg-pink-200 md:px-2 md:py-0 px-2 py-1 rounded-br-md flex items-center gap-2'>
                    <Image src='/Logo.png' alt='logo' w={{md:'80px', base:'65px'}}/>
                  </Link> */}
                  
                  <Link to={`/product-details/${product?._id}`}>
                    <LazyLoadImage src={product.image?.[0]}
                    alt={product.name} height={"10px"} width="100%" 
                    objectFit="cover" className='h-[200px]'/>
                  </Link>
                  
                  <Box p={3}>
                    <Text fontSize="14px" noOfLines={1}>{product.name}</Text>
                    <Flex justify={'space-between'} align={'center'}>
                      <Badge color="pink.600" fontSize={'16px'}>₦{product.price.toLocaleString()}.00</Badge>
                      {
                        product.oldprice && <Text fontSize={'12px'} color={'gray.400'}>₦{product.oldprice}</Text>
                      }
                    </Flex>

                    {product.stock !== undefined && (
                      <Box mt={2}>
                        <Text fontSize="xs" color="gray.500" mb={1}>
                          Stock left: {product.stock}
                        </Text>
                        <Box bg="gray.200" h="6px" w="100%" borderRadius="full" overflow="hidden">
                          <Box
                            h="100%"
                            w={`${(product.stock / maxStock) * 100}%`}
                            bg="pink.600"
                            borderRadius="full"
                            transition="width 0.3s ease"
                          />
                        </Box>
                      </Box>
                    )}

                    <AnimatePresence>
                      {loadingWishlistProductId === product._id ? (
                        <Flex justifyContent="center" alignItems="center" bg={'pink.600'} rounded={'full'} className="absolute bg-slate-500 top-2 right-2 w-[26px] h-[26px]">
                          <Spinner color="gray.50" size="sm" />
                        </Flex>
                      ) : (
                        <MotionHeart
                          isLiked={likedItems[product._id] || false}
                          onClick={() => {
                            handleWishlistItem(product);
                            setLikedItems(prev => ({ ...prev, [product._id]: !prev[product._id] }));
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </Box>
                </Box>
              ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
