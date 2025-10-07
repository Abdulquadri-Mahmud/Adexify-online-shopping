import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  Image,
  Badge,
  Spinner,
  Button,
  Icon,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaTruck, FaCreditCard, FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useApi } from "../../../Context_APIs/ApiContext";
import Header from "../../../components/Header";
import Footer from "../../../components/footer/Footer";

const OrderDetails = () => {
  const { baseUrl } = useApi();
  const navigate = useNavigate();
  const toast = useToast();
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?._id;

  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  // ✅ Fetch single order via query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["singleOrder", orderId],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/api/orders/order?orderId=${orderId}&userId=${userId}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to fetch order");
      return json.order;
    },
    enabled: !!orderId && !!userId,
  });

  if (isLoading)
    return (
      <Box minH="80vh" display="flex" justifyContent="center" alignItems="center" flexDir="column">
        <Spinner size="xl" color="pink.400" />
        <Text mt={3}>Loading order details...</Text>
      </Box>
    );

  if (isError) {
    toast({
      title: "Error loading order",
      description: error.message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    return null;
  }

  const order = data;

  return (
    <Box>
      <Header />

      <Box maxW="5xl" mx="auto" py={10} px={{ base: 4, md: 8 }}>
        <Button mb={4} variant="ghost" colorScheme="pink" onClick={() => navigate(-1)}>
          ← Back to Orders
        </Button>

        <Heading size="lg" mb={6}>
          Order #{order._id.slice(-8).toUpperCase()}
        </Heading>

        <Box borderWidth="1px" rounded="2xl" shadow="md" p={6} bg="white" _hover={{ shadow: "lg" }}>
          <VStack align="start" spacing={4}>
            <HStack justify="space-between" w="full">
              <Badge
                colorScheme={
                  order.orderStatus === "delivered"
                    ? "green"
                    : order.orderStatus === "processing"
                    ? "orange"
                    : "gray"
                }
                fontSize="0.9em"
                px={3}
                py={1}
                rounded="full"
              >
                {order.orderStatus}
              </Badge>

              <Text fontWeight="semibold" color="pink.600">
                ₦{order.total?.toLocaleString()}
              </Text>
            </HStack>

            <HStack>
              <Icon as={FaCreditCard} color="pink.400" />
              <Text>
                <strong>Payment:</strong> {order.paymentMethod} ({order.paymentStatus})
              </Text>
            </HStack>

            <HStack>
              <Icon as={FaMapMarkerAlt} color="pink.400" />
              <Text>
                <strong>Address:</strong> {order.address?.street}, {order.address?.city},{" "}
                {order.address?.state}
              </Text>
            </HStack>

            <HStack>
              <Icon as={FaTruck} color="pink.400" />
              <Text>
                <strong>Delivery:</strong> {order.deliveryMethod || "Standard"}
              </Text>
            </HStack>

            <Divider />

            <Heading size="md" mt={4} mb={3}>
              Ordered Items
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {order.items.map((item, idx) => (
                <HStack
                  key={idx}
                  borderWidth="1px"
                  rounded="lg"
                  p={3}
                  shadow="xs"
                  align="start"
                  spacing={4}
                >
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    boxSize="70px"
                    objectFit="cover"
                    rounded="md"
                  />
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="semibold">{item.name}</Text>
                    <Text color="gray.600" fontSize="sm">
                      Qty: {item.quantity}
                    </Text>
                    <Text color="pink.500" fontWeight="medium">
                      ₦{item.price?.toLocaleString()}
                    </Text>
                  </VStack>
                </HStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </Box>

      {/* <Footer /> */}
    </Box>
  );
};

export default OrderDetails;
