import {
  Badge, Box, Button, Flex, Spinner, Text, useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton,
  NumberInput, NumberInputField, Select, Heading
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { getCartToken } from "../store/cart/utils/cartToken";
import { FaNairaSign } from "react-icons/fa6";
import { useCart } from "../Context_APIs/CartCountContext";

const MotionButton = motion("button");

const AddToCartButton = ({ product }) => {
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();

    const { updateCart } = useCart();
  
  const { currentUser } = useSelector((state) => state.user);
  const toast = useToast();

  const qty = quantity < 1 ? 1 : quantity; // Ensure minimum quantity of 1

  // ✅ updated to accept product, size, qty
  const handleCart = async (prod = product, size = selectedSize, qtyVal = qty) => {
    setLoadingProductId(prod._id);

    const cartItem = {
      productId: prod._id,
      name: prod.name,
      stock: prod.stock || 0,
      price: prod.price,
      discount: prod.discount || 0,
      oldprice: prod.oldprice || 0,
      deal: prod.deal || "",
      category: prod.category || "",
      image: prod.image || [],
      description: prod.description || "",
      discountType: prod.discountType || "",
      trackingId: prod.trackingId || "",
      size: prod.size || [],
      selectedSize: size || prod.size?.[0] || "",
      quantity: qtyVal,
      gender: prod.gender || "unisex",
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
        updateCart?.(data.cart);
        toast({
          title: "Success",
          description: "Item added to cart.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onClose(); // close modal if open
      } else {
        if (data.success === false) {
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

  // ✅ Corrected logic
  const openCartModal = (prod) => {
    setSelectedProduct(prod);
    if (prod.size?.length > 0) {
      onOpen(); // open modal if sizes exist
    } else {
      handleCart(prod, "", 1); // directly add if no sizes
    }
  };

  return (
    <>
      <MotionButton
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 1 }}
        animate={{
          opacity: loadingProductId === product?._id ? 0.7 : 1,
          x: product?.stock < 1 ? [0, -5, 5, -5, 5, 0] : 0, // shake if out of stock
        }}
        transition={{ duration: 0.3, type: "spring" }}
        disabled={loadingProductId === product?._id || product?.stock < 1}
        onClick={() => openCartModal(product)}
        className="w-full mt-3 border bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600"
      >
        {loadingProductId === product?._id ? (
          <>
            <Spinner size="sm" mr={2} /> Adding...
          </>
        ) : product?.stock < 1 ? (
          "Out of Stock"
        ) : (
          "Add to Cart"
        )}
      </MotionButton>

      {/* Size & Qty Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx={2}>
          <ModalHeader>Select Size & Quantity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text isTruncated mb={4}>{selectedProduct?.name}</Text>

            <Flex bg="pink.50" alignItems="center" justifyContent="space-between" mt={4} gap={3} p={2} rounded="md">
              <Heading fontSize="md" fontWeight={500} display="flex" alignItems="center">
                <FaNairaSign /> {selectedProduct?.price?.toLocaleString()}
              </Heading>
              {selectedProduct?.oldprice && (
                <Text fontSize="md" textDecor="line-through" color="gray.500" display="flex" alignItems="center">
                  <FaNairaSign /> {selectedProduct?.oldprice?.toLocaleString()}
                </Text>
              )}
            </Flex>

            <Box my={4}>
              {selectedProduct?.stock > 0 ? (
                <Badge bg="pink.500" color="white" fontWeight={500} px={2} py={1} rounded="sm">
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
                {selectedProduct?.size.map((s) => (
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
                  {(selectedProduct?.oldprice - selectedProduct?.price).toLocaleString()}
                </Text>
              </Text>
            )}

            <Flex justifyContent="space-between" fontSize="sm" rounded="md" px={3} mt={4} bg="pink.50" alignItems="center">
              <Text mt={4} mb={3} color="gray.700">
                Product Code: <span className="text-pink-600 font-medium">{selectedProduct?.trackingId}</span>
              </Text>
              <Text mt={2} mb={3} color="gray.700">
                Category: <span className="text-pink-600 font-medium">{selectedProduct?.category}</span>
              </Text>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="pink"
              onClick={() => handleCart(selectedProduct, selectedSize, quantity)}
              isDisabled={!selectedProduct?.stock}
            >
              {loadingProductId === selectedProduct?._id ? (
                <>
                  <Spinner size="sm" mr={2} /> Adding...
                </>
              ) : (
                "Add to Cart"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddToCartButton;
