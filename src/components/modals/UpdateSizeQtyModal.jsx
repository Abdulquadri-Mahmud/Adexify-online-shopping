// src/components/cart/UpdateSizeQtyModal.jsx
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
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

export default function UpdateSizeQtyModal({
  isOpen,
  onClose,
  selectedItem,
  updateCartItem,
  updateLoading,
}) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQty, setSelectedQty] = useState(1);

  // Initialize state when item changes
  useEffect(() => {
    if (selectedItem) {
      setSelectedSize(selectedItem.selectedSize || "");
      setSelectedQty(selectedItem.quantity || 1);
    }
  }, [selectedItem]);

  const handleUpdate = () => {
    if (!selectedItem || !selectedSize) return;

    updateCartItem(
      selectedItem.productId,
      selectedItem.selectedSize, // old size
      selectedSize,              // new size
      selectedQty                // new quantity
    );
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent mx={2}>
        <ModalHeader>Update Size & Quantity</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight={500} mb={3}>
            {selectedItem?.name}
          </Text>

          {/* Size */}
          <Select
            mt={2}
            placeholder="Select size"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>

          {/* Quantity */}
          <NumberInput
            mt={4}
            min={1}
            value={selectedQty}
            onChange={(val) => setSelectedQty(Number(val))}
          >
            <NumberInputField />
          </NumberInput>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="green"
            onClick={handleUpdate}
            isDisabled={!selectedSize}
          >
            {updateLoading ===
            `${selectedItem?.productId}-${selectedItem?.selectedSize}` ? (
              <>
                <Spinner size="sm" mr={2} /> Updating...
              </>
            ) : (
              "Update Cart"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
