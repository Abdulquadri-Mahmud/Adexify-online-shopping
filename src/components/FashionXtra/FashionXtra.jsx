import { Badge, Box, Flex, Heading, Image, SimpleGrid, Skeleton, Text } from '@chakra-ui/react'
import React, { createContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';

export default function FashionXtra() {
    const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://adexify-api.vercel.app/api/products/all-products');
        const data = await res.json();

        // Filter products with price > 10000, then take top 6
        const filtered = data.filter(item => item.price >= 5000).slice(0, 12);
        setProducts(filtered);

      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const maxStock = 100; // Upper bound of stock

  return (
    <Box className='my-10 bg-white rounded-md' maxW={{ '2xl': '80%', xl: '95%', lg: '100%', base: '97%' }} mx={'auto'}>
      <Box className='bg-white-500 pb-1 rounded-t-lg'>
        <Box bg={'pink.500'} borderBottomWidth={'1px'} borderBottom={'solid gray.300'} p={3} mx={'auto'} className=' rounded-t-lg flex justify-between items-center gap-4 '>
          <Heading fontWeight={500} fontSize={{ md: 20, base: 18 }} color={'white'} className='text-xl'>
            FashionXtra
          </Heading>
          <Link to={'/'} className='text-[12px] font-medium text-white uppercase flex items-center'>
            See All <FaAngleRight className='text-[20px]' />
          </Link>
        </Box>
      </Box>

      <Box p={1}>
        <SimpleGrid columns={{ base: 2, sm: 3, md: 5, xl: 6 }} spacing={1}>
          {loading
            ? Array.from({ length: 12 }).map((_, index) => (
                <SimpleGrid bg={"white"} rounded={"xl"} gap={2} spacing={1} py={3} px={2}>
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
                <Box key={product._id} borderWidth="1px" borderRadius="md" overflow="hidden" bg="white" _hover={{ shadow: 'md' }} transition="all 0.3s">
                  <Link to={`/product-details/${product?._id}`}>
                    <Image mx="auto" src={product?.image?.[0] || "https://via.placeholder.com/150"} alt={product.name} height={'200px'} width={'full'} objectFit="cover" borderRadius="md"/>
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
                  </Box>
                </Box>
              ))}
        </SimpleGrid>
      </Box>
    </Box>
  )
}
