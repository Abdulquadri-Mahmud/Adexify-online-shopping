import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  VStack,
  useToast,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useApi } from "../../../Context_APIs/ApiContext";

export default function UserInfoModal({ isOpen, onClose, user, refetch }) {
  const { baseUrl } = useApi();
  const toast = useToast();

  const [form, setForm] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/users/update/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast({
          title: "Profile updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        refetch(); // refresh user info in SelectAddress
        onClose();
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to update profile",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Network error",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Info & Address</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={3}>
            <Input
              placeholder="First Name"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
            />
            <Input
              placeholder="Last Name"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
            />
            <Input
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <Input
              placeholder="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            <Input
              placeholder="Street"
              name="street"
              value={form.street}
              onChange={handleChange}
            />
            <Input
              placeholder="City"
              name="city"
              value={form.city}
              onChange={handleChange}
            />
            <Input
              placeholder="State"
              name="state"
              value={form.state}
              onChange={handleChange}
            />
            <Input
              placeholder="Postal Code"
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
            />
            <Textarea
              placeholder="Delivery Notes (e.g. Leave at gate)"
              name="notes"
              value={form.notes}
              onChange={handleChange}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="pink" onClick={handleUpdate} isLoading={loading}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
