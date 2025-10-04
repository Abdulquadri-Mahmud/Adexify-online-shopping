// src/components/cart/UpdateSizeModal.jsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Select,
  Text,
  Button,
  Spinner,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function UpdateSizeModal({
  isOpen,
  onClose,
  selectedItem,
  updateCartItem,
  updateLoading,
}) {
  const [selectedSize, setSelectedSize] = useState("");

  const handleUpdate = () => {
    if (!selectedItem || !selectedSize) return;
    updateCartItem(
      selectedItem.productId,
      selectedItem.selectedSize, // old size
      selectedSize,              // new size
      selectedItem.quantity      // keep same qty
    );
    // onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent mx={2}>
        <ModalHeader>Update Size</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight={500}>{selectedItem?.name}</Text>
          <Box
            mt={3}
            fontWeight={"600"}
            color={"pink.500"}
            bg={"pink.100"}
            width={"130px"}
            px={2}
            py={1}
            rounded={"5px"}
          >
            {selectedItem?.selectedSize
              ? `Current size: ${selectedItem.selectedSize}`
              : "No size selected"}
          </Box>
          <Select
            mt={4}
            placeholder={
              selectedItem?.selectedSize
                ? `Current: ${selectedItem.selectedSize}`
                : "Select size"
            }
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="green"
            onClick={handleUpdate}
            isDisabled={!selectedSize}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {updateLoading === `${selectedItem?.productId}-${selectedItem?.selectedSize}`
              ? (
                <>
                  <Spinner size="sm" mr={2} /> Updating...
                </>
              ) : (
                "Update Size"
              )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
