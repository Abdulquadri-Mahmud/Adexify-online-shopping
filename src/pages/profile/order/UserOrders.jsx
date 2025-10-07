import React, { useRef, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Spinner,
  SimpleGrid,
  VStack,
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
  Image,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  useDisclosure,
  ModalContent,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaNairaSign } from "react-icons/fa6";
import { useApi } from "../../../Context_APIs/ApiContext";
import Header from "../../../components/Header";
import Footer from "../../../components/footer/Footer";

const MotionModalContent = motion(ModalContent);

// ✅ Drawer Component for showing one selected order
function UserMenu({ order }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  if (!order) return null;

  console.log("Order in Drawer:", order);

  return (
    <Box pos="absolute" bottom={0} right={0} >
      <button onClick={onOpen} className="text-pink-500 hover:text-pink-600 px-2 pb-1 bg-pink-50 rounded-tl-xl rounded-br-xl"> 
        See details
      </button>

      <Drawer isOpen={isOpen} placement="left" initialFocusRef={firstField} onClose={onClose} size={{ md: "sm", base: "sm" }}>
        <DrawerOverlay />
        <DrawerContent bg="gray.100">
          <DrawerCloseButton top={3} />
          <DrawerHeader bg="white" borderBottomWidth={{ md: "0px", base: "1px" }} borderColor="gray.50"> 
            <Heading color="gray.700" fontWeight={500} fontSize="lg">
              Order Details
            </Heading>
          </DrawerHeader>

          <DrawerBody px={3}>
            <Box bg="white" px={3} py={2} rounded="xl" width="100%">
              <Text>Order nº {order?.orderId}</Text>
              <Box fontSize="sm" color="gray.600">
                <Text mt={2}>{order.items?.length} Items</Text>
                <Text>Placed on {new Date(order.createdAt).toLocaleDateString()}</Text>
                <Text display="flex" alignItems="center" gap={1}>
                  Total: <FaNairaSign /> {order?.total.toLocaleString()}
                </Text>
              </Box>
            </Box>

            {/* Items */}
            <Box mt={3} bg="white" px={3} py={2} rounded="xl" width="100%">
              <Box borderBottom={'1px solid'} borderColor="gray.300"pb={1} width="100%">
                <Text fontWeight={500}>ITEM IN YOU ORDERS</Text>
              </Box>
              <Badge
                mt={2}
                colorScheme={
                  order.orderStatus === "delivered"
                    ? "green"
                    : order.orderStatus === "shipped"
                    ? "blue"
                    : order.orderStatus === "processing"
                    ? "orange"
                    : "gray"
                }
                px={2}
                py={1}
                rounded="md"
                fontWeight={400}
                fontSize="12px"
              >
                {order.orderStatus || "Status Unknown"}
              </Badge>

              {order.items?.map((item, idx) => (
                <Flex key={idx} mt={3} gap={3} align="center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    h="70px"
                    w="70px"
                    rounded="lg"
                    objectFit="cover"
                  />
                  <Box flex="1">
                    <Text fontWeight={500}>{item.name}</Text>
                    <Text fontSize="sm">QTY: {item.quantity}</Text>
                    <Text fontSize="sm">
                      <FaNairaSign style={{ display: "inline" }} /> {item.price.toLocaleString()}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </Box>

            {/* Payment Info */}
            <Box mt={3} bg="white" px={3} py={2} rounded="xl" width="100%">
              <Box borderBottom={'1px solid'} borderColor="gray.300"pb={1} width="100%">
                <Text fontWeight={500}>PAYMENT INFORMATION</Text>
              </Box>
              <Text fontWeight={500}>Payment Method:</Text>
              <Text fontSize="sm" color="gray.600">
                {order.paymentMethod}
              </Text>
              <Text fontWeight={500} mt={2}>
                Payment Status:
              </Text>
              <Badge
                colorScheme={
                  order.paymentStatus === "paid"
                    ? "green"
                    : order.paymentStatus === "pending"
                    ? "orange"
                    : "red"
                }
                mt={1}
                px={2}
                py={1}
                rounded="md"
              >
                {order.paymentStatus}
              </Badge>
              <Text fontSize={'sm'} color={'gray.600'}>Delivery Fee: {order.deliveryFee}</Text>
              <Text fontSize={'sm'} color={'gray.600'}>Total:<FaNairaSign style={{ display: "inline" }} /> {order?.total + order?.deliveryFee}</Text>
            </Box>
            <Box mt={3} bg="white" px={3} py={2} rounded="xl" width="100%">
              <Box borderBottom={'1px solid'} borderColor="gray.300"pb={1} width="100%">
                <Text fontWeight={500}>DELIVERY INFORMATION</Text>
              </Box>
              <Box my={4}>
                <Text fontWeight={500}> Delivery Method</Text>
                <Text fontWeight={500} fontSize={'12px'} color={'gray.500'}>{order?.note}</Text>
              </Box>
              <Box>
                <Text fontWeight={500}> Shipping Address</Text>
                <Text>{order?.userInfo?.firstname} {order?.userInfo?.lastname}</Text>
                <Text fontWeight={500} fontSize={'12px'} color={'gray.500'}>
                  {order.address?.street}, {order.address?.city}, {order.address?.state}, {order.address?.zipCode}
                </Text>
              </Box>
              <Box>
                <Text mt={4}> Shipping Details</Text>
                <Text fontSize={'sm'} color={'gray.500'}>Phone: {order?.userInfo?.phone}</Text>
                <Text fontSize={'sm'} color={'gray.500'}>Email: {order?.userInfo?.email}</Text>
              </Box>
            </Box>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px"></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

// ✅ Main Orders Page
const UserOrders = () => {
  const { baseUrl } = useApi();
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?._id;
  const toast = useToast();
  const navigate = useNavigate();

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

  if (isLoading)
    return (
      <Box className="bg-zinc-100">
        <Header />
        <Box my="20" py={10} maxW="md" mx={{ md: "auto", base: 2 }} bg="white" rounded="xl" display="flex" flexDir="column" justifyContent="center" alignItems="center">
          <Spinner size="xl" color="pink.400" />
          <Text mt={4} color="gray.600">
            Loading your orders...
          </Text>
        </Box>
        <Footer />
      </Box>
    );

  if (isError) {
    toast({
      title: "Error fetching orders",
      description: error.message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }

  if (!data || data.length === 0)
    return (
      <Box>
        <Header />
        <Box my="20" maxW="md" mx={{ md: "auto", base: 2 }} bg="white" rounded="xl" textAlign="center" py={16}>
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
        <Footer />
      </Box>
    );

  return (
    <Box className="bg-zinc-100">
      <Header />

      <Box maxW="4xl" rounded="xl" mx={{ md: "auto" }} my={5} py={{ md: 5, base: 3 }} px={{ base: 2, md: 8 }} bg="white">
        <Heading mb={6} size="md" color="pink.600">
          Orders
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 1 }} spacing={3}>
          {data.map((order) => (
            <Fade in key={order._id}>
              <Box p={2} pos="relative" display="flex" borderWidth="0.1px" rounded="2xl" _hover={{ shadow: "lg", transform: "translateY(-3px)" }} transition="all 0.3s ease" className="shadow-sm">
                <Image src={order?.items?.[0]?.image} alt={order?.items?.[0]?.name || "Product Image"} h="70px" w="70px" roundedTop="2xl" objectFit="cover"/>
                <Box flex="1" ml={2}>
                  <Text fontWeight="500" fontSize="sm">
                    {order?.items?.[0]?.name || "Product Name"}
                  </Text>
                  <Text mt={1} fontSize="xs" color="gray.500">
                    Order #{order?.orderId}
                  </Text>

                  <Badge
                    mt={1}
                    colorScheme={
                      order.orderStatus === "delivered"
                        ? "green"
                        : order.orderStatus === "shipped"
                        ? "blue"
                        : order.orderStatus === "processing"
                        ? "orange"
                        : "gray"
                    }
                    px={2}
                    py={1}
                    rounded="md"
                    fontWeight={400}
                    fontSize="12px"
                  >
                    {order.orderStatus || "Status Unknown"}
                  </Badge>

                  <Text color="gray.600" mt={1} fontSize="sm">
                    Ordered on {new Date(order.createdAt).toLocaleDateString()}
                  </Text>
                </Box>

                {/* ✅ Only send the selected order to the Drawer */}
                <UserMenu order={order} />
              </Box>
            </Fade>
          ))}
        </SimpleGrid>
      </Box>

      <Footer />
    </Box>
  );
};

export default UserOrders;
