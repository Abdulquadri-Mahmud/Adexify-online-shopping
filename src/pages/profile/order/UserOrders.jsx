import React from "react";
import {
  Box,
  Heading,
  Text,
  Spinner,
  SimpleGrid,
  VStack,
  HStack,
  Badge,
  Button,
  Divider,
  useToast,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Icon,
  Fade,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaCheckCircle, FaTruck, FaCreditCard } from "react-icons/fa";
import { useApi } from "../../../Context_APIs/ApiContext";
import Header from "../../../components/Header";
import Footer from "../../../components/footer/Footer";

const UserOrders = () => {
  const { baseUrl } = useApi();
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?._id;
  const toast = useToast();
  const navigate = useNavigate();
  
  // Fetch Orders with React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userOrders", userId],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/api/orders/user?userId=${userId}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to fetch orders");
      return json.orders || [];
    },
    enabled: !!userId,
  });

  console.log(data);

  if (isLoading) {
    return (
        <Box className="bg-zinc-100">
            <Header/>
                <Box my={'20'} py={10} maxW={'md'} mx={{md:'auto', base:2}} bg={'white'} rounded={'xl'} display="flex" flexDir="column" justifyContent="center" alignItems="center">
                    <Spinner size="xl" color="pink.400" />
                    <Text mt={4} color="gray.600">
                        Loading your orders...
                    </Text>
                </Box>
            <Footer/>   
        </Box>
    );
  }

  if (isError) {
    toast({
      title: "Error fetching orders",
      description: error.message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }

  if (!data || data.length === 0) {
    return (
        <Box>
            <Header />
            <Box my={'20'} py={10} maxW={'md'} mx={{md:'auto', base:2}} bg={'white'} rounded={'xl'} textAlign="center" py={16}>
                <Heading size="md" mb={3}>
                    You have no orders yet 😕
                </Heading>
                <Text color="gray.500" mb={5}>
                    Start shopping to see your orders appear here.
                </Text>
                <Button colorScheme="pink" onClick={() => navigate("/")}>
                    Start Shopping
                </Button>
            </Box>
            <Footer/>
        </Box>
    );
  }

  return (
    <Box className="bg-zinc-100">
      <Header />

      <Box maxW="6xl" mx={{md:"auto", base: 2}} rounded={'xl'} my={5} py={{md:5, base: 3}} px={{ base: 4, md: 8 }} bg={'white'}>
        <Heading mb={6} size="lg" textAlign="center" color="pink.600">
          My Orders
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {data.map((order) => (
            <Fade in key={order._id}>
              <Card
              border={'1px solid'}
              borderColor={'gray.50'}
                rounded="2xl"
                _hover={{ shadow: "lg", transform: "translateY(-3px)" }}
                transition="all 0.3s ease" className="shadow-2xl hover:shadow-3xl"
              >
                <CardHeader pb={2}>
                  <HStack justify="space-between">
                    <Text fontWeight="semibold" color="pink.500">
                      #{order._id.slice(-8).toUpperCase()}
                    </Text>
                    <Badge
                      px={3}
                      py={1}
                      rounded="full"
                      textTransform="capitalize"
                      colorScheme={
                        order.orderStatus === "delivered"
                          ? "green"
                          : order.orderStatus === "processing"
                          ? "orange"
                          : order.orderStatus === "shipped"
                          ? "blue"
                          : "gray"
                      }
                    >
                      {order.orderStatus}
                    </Badge>
                  </HStack>
                </CardHeader>

                <Divider />

                <CardBody>
                  <VStack align="start" spacing={2} fontSize="sm" color="gray.700">
                    <HStack>
                      <Icon as={FaCreditCard} color="pink.400" />
                      <Text>
                        <strong>Payment:</strong> {order.paymentMethod} ({order.paymentStatus})
                      </Text>
                    </HStack>

                    <HStack>
                      <Icon as={FaBoxOpen} color="pink.400" />
                      <Text>
                        <strong>Total:</strong> ₦{order.total?.toLocaleString()}
                      </Text>
                    </HStack>

                    <HStack>
                      <Icon as={FaTruck} color="pink.400" />
                      <Text>
                        <strong>Delivery:</strong>{" "}
                        {order.address?.street}, {order.address?.city}, {order.address?.state}
                      </Text>
                    </HStack>

                    <HStack>
                      <Icon as={FaCheckCircle} color="pink.400" />
                      <Text>
                        <strong>Items:</strong>{" "}
                        {order.items.map((item) => item.name).join(", ")}
                      </Text>
                    </HStack>
                  </VStack>
                </CardBody>

                <CardFooter justify="flex-end">
                  <Button
                    size="sm"
                    colorScheme="pink"
                    variant="solid"
                    onClick={() => navigate(`/order-details?orderId=${order._id}`)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </Fade>
          ))}
        </SimpleGrid>
      </Box>

      <Footer />
    </Box>
  );
};

export default UserOrders;
