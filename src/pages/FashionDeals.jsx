import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Image,
  Heading,
  SimpleGrid,
  Flex,
  Spinner,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { TbCurrencyNaira } from "react-icons/tb";
import Header from "../components/Header";
import Footer from "../components/footer/Footer";
import { PiGreaterThan } from "react-icons/pi";
import { Link } from "react-router-dom";
import Adverts from "../components/Adverts/Adverts";

const FashionDeals = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 20;
  const toast = useToast();

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://adexify-api.vercel.app/api/products/all-products");
        const data = await response.json();
        const greatBagDeals = data.filter(p => p.deal === "great" && p.category === "Bags");
        setProducts(greatBagDeals);
        setFilteredProducts(greatBagDeals);
        setLoading(false);
      } catch (error) {
        toast({ title: "Error fetching products", status: "error" });
        setLoading(false);
      }
    };
    fetchProducts();
  }, [toast]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearch(term);
    if (term.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
      setPage(1);
    }
  };

  const currentItems = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box className="bg-zinc-200">
      <Header />
      <Box px={{ base: 4, md: 10 }} pt={10}>
        <Box maxW={{ '2xl': '80%', xl: '90%', lg: '100%', base: '97%' }} mx={'auto'} bg={'white'} p={4} borderRadius="lg" mb={6}>
          <div className="flex gap-1 items-center">
            <Link to={'/'} className='text-[13px] text-gray-500'>Home</Link>
            <PiGreaterThan className='text-[13px] text-gray-500 pt-1' />
            <Text className='text-[13px] text-gray-500'>Fashion Deals</Text>
          </div>
        </Box>

        <Box bgGradient="linear(to-r, green.500, green.300)" color="white" textAlign="center" py={12} borderRadius="lg" mb={10}>
          <Heading size="2xl" mb={2}>Great Fashion Deals - Bags</Heading>
          <Text fontSize="lg">Top quality bags with unbeatable discounts</Text>
        </Box>

        {/* Search Filter */}
        <Box py={4} bg={'white'} rounded={'md'} maxW={'md'} mx={'auto'} mb={6} px={4}>
          <InputGroup maxW="lg" mx="auto">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input type="text" placeholder="Search bags" value={search} onChange={handleSearch} bg="white" />
          </InputGroup>
        </Box>

        <Box bg={'white'} p={6} borderRadius="lg" mb={10}>
          {loading ? (
            <Flex justify="center" py={20}>
              <Spinner size="xl" color="green.500" />
            </Flex>
          ) : (
            <>
              <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 6 }} spacing={6}>
                {currentItems.map((product) => (
                  <Box key={product._id} bg="white" p={3} borderRadius="lg" shadow="md" _hover={{ shadow: "xl", transform: "scale(1.02)" }} transition="all 0.2s">
                    <Link to={`/product-details/${product._id}`}>
                      <Image src={product.image?.[0] || "/placeholder.png"} alt={product.name} objectFit="cover" w="full" h="150px" borderRadius="md" mb={3} />
                    </Link>
                    <Heading as="h4" size="sm" mb={1} isTruncated>{product.name}</Heading>
                    <Text fontSize="xs" color="gray.500" noOfLines={2} mb={2}>{product.description}</Text>
                    <Flex align="center" justify="space-between">
                      <Flex align="center" color="green.600" fontWeight="bold">
                        <TbCurrencyNaira />
                        <Text>{product.price?.toLocaleString()}</Text>
                      </Flex>
                      {product.oldprice && (
                        <Text fontSize="xs" color="gray.400" textDecor="line-through">
                          <TbCurrencyNaira />
                          {product.oldprice?.toLocaleString()}
                        </Text>
                      )}
                    </Flex>
                  </Box>
                ))}
              </SimpleGrid>

              {totalPages > 1 && (
                <Flex justify="center" mt={10} gap={3} wrap="wrap">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i + 1}
                      size="sm"
                      bg={page === i + 1 ? "green.600" : "gray.200"}
                      color={page === i + 1 ? "white" : "black"}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </Flex>
              )}
            </>
          )}
        </Box>
      </Box>
      <Adverts />
      <Box mb={8} />
      <Footer />
    </Box>
  );
};

export default FashionDeals;
