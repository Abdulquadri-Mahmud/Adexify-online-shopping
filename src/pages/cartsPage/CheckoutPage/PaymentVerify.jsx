import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Spinner, Box, Text, VStack, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { useApi } from "../../../Context_APIs/ApiContext";
import Header from "../../../components/Header";
import Footer from "../../../components/footer/Footer";


const PaymentVerify = () => {
  const [status, setStatus] = useState("verifying"); // verifying | success | failed
  const [order, setOrder] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { baseUrl } = useApi();

  const reference = searchParams.get("reference");

  // 🔍 Automatically verify payment when page loads
  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) {
        setStatus("failed");
        toast({
          title: "Invalid Reference",
          description: "No payment reference found.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      try {
        const res = await fetch(`${baseUrl}/api/orders/verify?reference=${reference}`);
        const data = await res.json();

        if (res.ok && data.success) {
          setOrder(data.order);
          setStatus("success");
          toast({
            title: "Payment Verified 🎉",
            description: "Your payment was successful!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          setStatus("failed");
          toast({
            title: "Verification Failed",
            description: data.message || "Unable to verify payment.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("failed");
        toast({
          title: "Error",
          description: "Something went wrong during verification.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    verifyPayment();
  }, [reference, baseUrl, toast]);

  // 🧩 UI States
  if (status === "verifying") {
    return (
        <Box className="bg-zinc-100">
            <Header/>
            <Box my={'20'} py={10} maxW={'md'} mx={{md:'auto', base:2}} bg={'white'} rounded={'xl'} display="flex" alignItems="center" justifyContent="center">
                <VStack spacing={4}>
                    <Spinner size="xl" color="pink.500" />
                    <Text fontSize="lg" color="gray.600">
                        Verifying your payment, please wait...
                    </Text>
                </VStack>
            </Box>
            <Footer/>
        </Box>
    );
  }

  if (status === "success") {
    return (
        <Box className="bg-zinc-100">
            <Header/>
            <Box my={'20'} py={10} maxW={'md'} mx={{md:'auto', base:2}} bg={'white'} rounded={'xl'} display="flex" alignItems="center" justifyContent="center">
                <VStack spacing={4}>
                    <CheckCircleIcon boxSize={16} color="green.400" />
                    <Text fontSize="2xl" fontWeight="bold">
                        Payment Successful 🎉
                    </Text>
                    <Text color="gray.600">
                        Your order <b>#{order?._id?.slice(-6)}</b> has been placed successfully!
                    </Text>
                    <Button colorScheme="pink" onClick={() => navigate("/my-orders")}>
                        View My Orders
                    </Button>
                </VStack>
            </Box>
            <Footer/>
        </Box>
    );
  }

  if (status === "failed") {
    return (
      <Box className="bg-zinc-100">
        <Header/>
        <Box my={'20'} py={10} maxW={'md'} mx={{md:'auto', base:2}} bg={'white'} rounded={'xl'} display="flex" alignItems="center" justifyContent="center">
            <VStack spacing={4}>
                <WarningIcon boxSize={16} color="red.400" />
                <Text fontSize="2xl" fontWeight="bold">
                    Payment Failed
                </Text>
                <Text color="gray.600">
                    Something went wrong. Please try again or contact support.
                </Text>
                <Button colorScheme="pink" onClick={() => navigate("/checkout")}>
                    Back to Checkout
                </Button>
            </VStack>
        </Box>
      </Box>
    );
  }

  return null;
};

export default PaymentVerify;
