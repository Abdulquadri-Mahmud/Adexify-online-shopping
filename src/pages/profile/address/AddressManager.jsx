import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Flex,
  Button,
  Input,
  Badge,
  Spinner,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Collapse,
  useDisclosure,
  useToast,
  Text,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Textarea,
} from "@chakra-ui/react";
import { FaTrash, FaEdit, FaStar, FaEllipsisV, FaCopy } from "react-icons/fa";
import { useUserQuery } from "../../../hooks/GetUserQuery";
import { useApi } from "../../../Context_APIs/ApiContext";
import Header from "../../../components/Header";
import Footer from "../../../components/footer/Footer";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";
const MotionModalContent = motion(ModalContent);

export default function AddressManager() {
  const { baseUrl } = useApi();
  const { currentUser } = useSelector((state) => state.user);
  const toast = useToast();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);


  const userId = currentUser?._id;
  const { data, isLoading, isError, error } = useUserQuery(userId);
  const user = data?.user || data;

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    notes: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  const {
    isOpen: isMapOpen,
    onOpen: onMapOpen,
    onClose: onMapClose,
  } = useDisclosure();
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Fetch addresses
  const fetchAddresses = async () => {
    if (!userId) return;
    try {
      const res = await fetch(
        `${baseUrl}/api/users/addresses/get?userId=${userId}`
      );
      const data = await res.json();

      setAddresses(
        (data || []).sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0))
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [userId]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit address (Create/Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingId
        ? `${baseUrl}/api/users/addresses/update`
        : `${baseUrl}/api/users/addresses/add`;

      const payload = editingId
        ? { userId, addressId: editingId, ...form }
        : { userId, ...form };

      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      setForm({
        street: "",
        city: "",
        state: "",
        postalCode: "",
        type: "Home",
        notes: "",
      });
      setEditingId(null);
      fetchAddresses();
      setTabIndex(1);

      toast({
        title: editingId ? "Address updated!" : "Address added!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete address
  const handleDelete = async (addressId) => {
    try {
      await fetch(`${baseUrl}/api/users/addresses/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, addressId }),
      });
      fetchAddresses();
      toast({
        title: "Address deleted!",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
    }
  };


  // Set Default
  const handleSetDefault = async (addressId) => {
    try {
      await fetch(`${baseUrl}/api/users/addresses/set-default`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, addressId }),
      });

      // reorder instantly
      setAddresses((prev) =>
        prev.map((a) =>
          a._id === addressId
            ? { ...a, isDefault: true }
            : { ...a, isDefault: false }
        ).sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0))
      );

      toast({
        title: "Default address updated!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Edit address
  const handleEdit = (address) => {
    setForm({
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      type: address.type || "Home",
      notes: address.notes || "",
    });
    setEditingId(address._id);
    setTabIndex(0);
  };

  // Show map modal
  const handleShowMap = (address) => {
    setSelectedAddress(address);
    onMapOpen();
  };

  // Copy address
  const handleCopy = (address) => {
    navigator.clipboard.writeText(
      `${address.street}, ${address.city}, ${address.state}, ${address.postalCode}`
    );
    toast({
      title: "Copied!",
      description: "Address copied to clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  if (isError) {
    return (
      <Box textAlign="center" color="red.500" mt={10}>
        Failed to load user: {error.message}
      </Box>
    );
  }

  return (
    <Box fontFamily={''} className="bg-zinc-100">
      <Header />
      <Box maxW="5xl" mx={{ md: "auto", base: "3" }} my={10} p={5} bg="white" rounded="lg" shadow="md">
        <Heading textAlign={{md: 'start', base: 'center'}} fontWeight={500} fontSize="2xl" mb={2} color="gray.700">
          Manage Addresses for {user?.firstname}
        </Heading>
        <Text fontSize={{md:"md", base: '13px'}} color="gray.500" mb={4} textAlign={{md: 'start', base: 'center'}} fontWeight={500}>
          Save, edit and manage your delivery addresses for faster checkout.
        </Text>

        <Tabs index={tabIndex} onChange={setTabIndex} variant="enclosed" colorScheme="green">
          <TabList>
            <Tab>{editingId ? "Edit Address" : "Add Address"}</Tab>
            <Tab>My Saved Addresses</Tab>
          </TabList>

          <TabPanels>
            {/* Add/Edit Address */}
            <TabPanel>
              <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2 mb-5">
                <Input placeholder="Street" name="street" value={form.street} onChange={handleChange} className={`${isLoading ? 'bg-zinc-100 animate-pulse' : 'bg-gray-50'}`}/>
                <Input placeholder="City" name="city" value={form.city} onChange={handleChange} className={`${isLoading ? 'bg-zinc-100 animate-pulse' : 'bg-gray-50'}`}/>
                <Input placeholder="State" name="state" value={form.state} onChange={handleChange} className={`${isLoading ? 'bg-zinc-100 animate-pulse' : 'bg-gray-50'}`}/>
                <Input placeholder="Postal Code" name="postalCode" value={form.postalCode} onChange={handleChange} className={`${isLoading ? 'bg-zinc-100 animate-pulse' : 'bg-gray-50'}`}/>
                <Textarea placeholder="Delivery Notes (e.g. Leave at gate)" name="notes" value={form.notes} onChange={handleChange} className="col-span-2"/>
                <Button type="submit" colorScheme="green" isLoading={loading} className="col-span-2" >
                  {editingId ? "Update Address" : "Add Address"}
                </Button>
              </form>
            </TabPanel>

            {/* My Saved Addresses */}
            <TabPanel>
              {addresses.length === 0 ? (
                <Box textAlign="center" color="gray.500">
                  <Image src="https://cdn-icons-png.flaticon.com/512/854/854866.png" alt="empty" boxSize="120px" mx="auto" mb={3}/>
                  <Text fontSize="lg" mb={3}>
                    🚚 No saved addresses yet.
                  </Text>
                  <Button colorScheme="green" onClick={() => setTabIndex(0)}>
                    Add One Now
                  </Button>
                </Box>
              ) : (
                addresses.map((address) => (
                  <Collapse in={true} key={address._id}>
                    <Flex
                      justify="space-between"
                      align="center"
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                      mb={3}
                      bg={address.isDefault ? "pink.50" : "gray.50"}
                      border={address.isDefault ? "1 solid" : "1 solid"}
                      borderColor={address.isDefault ? "pink.100" : "gray.100"}
                      _hover={address.isDefault ? {bg:"pink.100"} : {bg: "gray.100"}}
                      transition="background-color 0.2s"
                    >
                      {/* Clickable part for map */}
                      <Box
                        flex="1"
                        onClick={() => handleShowMap(address)}
                        cursor="pointer"
                      >
                        <Box fontWeight="medium">
                          {address.street}, {address.city}, {address.state} -{" "}
                          {address.postalCode} ({address.type})
                        </Box>
                        {address.notes && (
                          <Text fontSize="sm" color="gray.600">
                            📝 {address.notes}
                          </Text>
                        )}
                        {address.isDefault && (
                          <Badge bg="green.500" color={'white'} px={2} py={1} mt={1}>
                            Default
                          </Badge>
                        )}
                      </Box>

                      {/* Quick Actions Menu */}
                      <Menu>
                        <MenuButton as={IconButton} aria-label="Options" icon={<FaEllipsisV />} bg={"white"} _hover={{ bg: "pink.50" }} onClick={(e) => e.stopPropagation()}/>
                        <MenuList onClick={(e) => e.stopPropagation()}>
                          <MenuItem icon={<FaEdit />} onClick={() => handleEdit(address)}>
                            Edit
                          </MenuItem>
                          <MenuItem icon={<FaTrash />} onClick={() => {
                              setAddressToDelete(address._id);
                              setIsDeleteOpen(true);
                            }}>
                            Delete
                          </MenuItem>
                          {!address.isDefault && (
                            <MenuItem
                              icon={<FaStar />}
                              onClick={() => handleSetDefault(address._id)}
                            >
                              Set Default
                            </MenuItem>
                          )}
                          <MenuItem icon={<FaCopy />} onClick={() => handleCopy(address)}>
                            Copy Address
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Flex>
                  </Collapse>
                ))
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      {/* Map Modal */}
      <Modal isOpen={isMapOpen} onClose={onMapClose} size="xl">
        <ModalOverlay />
        <ModalContent mx={'2'}>
          <ModalHeader>Address Location</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedAddress && (
              <iframe
                title="map"
                width="100%"
                height="400"
                frameBorder="0"
                style={{ border: 0, borderRadius: "8px" }}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  selectedAddress.street +
                    " " +
                    selectedAddress.city +
                    " " +
                    selectedAddress.state
                )}&output=embed`}
                allowFullScreen
              ></iframe>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} isCentered>
        <ModalOverlay />
        <MotionModalContent mx={'2'}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <ModalHeader>Delete Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete this address? <br />
              <b>This action cannot be undone.</b>
            </Text>

            <Flex justify="flex-end" gap={3} mt={5}>
              <Button onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDelete(addressToDelete);
                  setIsDeleteOpen(false);
                }}
              >
                Delete
              </Button>
            </Flex>
          </ModalBody>
        </MotionModalContent>
      </Modal>
      <Footer />
    </Box>
  );
}
