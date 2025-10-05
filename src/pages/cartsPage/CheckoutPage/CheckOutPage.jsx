import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  SimpleGrid,
  Image,
  Stack,
  Radio,
  RadioGroup,
  Textarea,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useApi } from "../../../Context_APIs/ApiContext";
import { useUserQuery } from "../../../hooks/GetUserQuery";
import Header from "../../../components/Header";
import Footer from "../../../components/footer/Footer";
import addresses from "../../../data/address";

export default function CheckOutPage() {
  const { baseUrl } = useApi();
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = location.state || { cartItems: [] };
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?._id;
  const { data, refetch } = useUserQuery(userId);
  const user = data?.user || data;

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("Pay on Delivery");
  const [modalOpen, setModalOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    notes: "",
  });

  const [userForm, setUserForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  useEffect(() => {
    if (user) {
      setUserForm({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (user?.addresses?.length > 0) {
      const defaultAddr = user.addresses.find((a) => a.isDefault);
      setSelectedAddressId(defaultAddr?._id || user.addresses[0]._id);
    }
  }, [user]);

  const selectedAddress = user?.addresses?.find(
    (a) => a._id === selectedAddressId
  );

  const handleInput = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleUserInput = (e) =>
    setUserForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // 🔥 Add or Update Address
  const handleSaveAddress = async () => {
    try {
      setLoading(true);
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
      if (!res.ok) throw new Error(data.message);

      setForm({
        street: "",
        city: "",
        state: "",
        postalCode: "",
        notes: "",
      });
      setEditingId(null);
      setModalOpen(false);
      await refetch();

      toast({
        title: editingId ? "Address updated!" : "Address added!",
        description: editingId ? "Your address has been updated." : "New address has been added to your profile.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // 🧩 Update User Info
  const handleUpdateUserInfo = async () => {
    try {
      setUserLoading(true);
      const res = await fetch(`${baseUrl}/api/user/auth/update?userId=${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...userForm }),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.message);

      await refetch();
      toast({
        title: "Success!",
        status: "success",
        description: "Your profile information has been updated.",
        duration: 3000,
        isClosable: true,
      });
      setEditUserOpen(false);
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to update profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setUserLoading(false);
    }
  };

  const handleOrder = async () => {
    const payload = {
      userId,
      addressId: selectedAddressId,
      items: cartItems,
      paymentMethod: selectedMethod,
    };
    console.log("Checkout Payload:", payload);
  };

  const handleBack = () => navigate(-1);

  return (
    <Box bg="" className="bg-zinc-200">
      <Header />
      <Box maxW={{ base: "100%", xl: "95%", "2xl": "80%" }} px={2} mx="auto" mt="4">
        <Box bg="white" borderRadius="xl" p={2}>
          <Flex justify="space-between" align="center" flexWrap="wrap" mb={3}>
            <HStack bg={"pink.200"} roundedTopLeft={"xl"} roundedBottomRight={"xl"} py={2} px={4} spacing={1} fontSize="12px" color="gray.600">
              <Link to="/"><Text _hover={{ color: "pink.100", textDecor: "underline" }}>Home</Text></Link>
              <Text>/</Text>
              <Link to="/cart"><Text _hover={{ color: "pink.100", textDecor: "underline" }}>My Cart</Text></Link>
              <Text>/</Text>
              <Link to="/create-order"><Text _hover={{ color: "pink.100", textDecor: "underline" }}>Checkout</Text></Link>
            </HStack>
            <Button onClick={handleBack} roundedTopRight={"xl"} roundedBottomLeft={"xl"} color={"gray.600"} size="sm" bg="pink.200" leftIcon={<span>←</span>}>
              Back
            </Button>
          </Flex>
          <Heading textAlign="center" mt={3} color="pink.600">
            Checkout
          </Heading>
        </Box>

        <Flex mt={{md:5, base:3}} gap={4} flexWrap="wrap">
          {/* LEFT SECTION */}
          <Box flex="1">
            {/* 1 USER INFORMATION */}
            <Box bg="white" p={4} rounded="xl" mb={{md:5, base:3}}>
              <Heading fontSize="md" color="gray.700">
                1. USER INFORMATION
              </Heading>
              <Box mt={3} p={3} bg="gray.50" rounded="md">
                <Text fontWeight="600">{userForm.firstname} {userForm.lastname}</Text>
                <Text fontSize="sm" color="gray.600">{userForm.email}</Text>
                <Text fontSize="sm" color="gray.600">📞 {userForm.phone || "Not provided"}</Text>
                <Button mt={3} size="sm" bg="pink.100" color="pink.700" onClick={() => setEditUserOpen(true)}>
                  Edit Info
                </Button>
              </Box>
            </Box>

            {/* 2️ DELIVERY ADDRESS */}
            <Box bg="white" p={4} rounded="xl">
              <Heading fontSize="md" color="gray.700">
                2. DELIVERY ADDRESS
              </Heading>
              {user?.addresses?.length > 0 ? (
                <RadioGroup onChange={setSelectedAddressId} value={selectedAddressId} mt={3}>
                  <Stack spacing={3}>
                    {user.addresses.map((addr) => (
                      <Box key={addr._id} bg={selectedAddressId === addr._id ? "pink.50" : "gray.100"} border="1px solid"
                        borderColor={selectedAddressId === addr._id ? "pink.300" : "gray.200"} p={3} rounded="md">
                        <Radio value={addr._id}>
                          <Text fontWeight="600">{addr.street}, {addr.city}, {addr.state}</Text>
                        </Radio>
                        {addr.notes && (
                          <Text fontSize="sm" color="gray.500" mt={1}>📝 {addr.notes}</Text>
                        )}
                        {addr.isDefault && (
                          <Text fontSize="xs" color="pink.600" mt={1}>Default Address</Text>
                        )}
                        <Button mt={2} size="xs" bg="pink.100" color="pink.700"
                          onClick={() => {
                            setEditingId(addr._id);
                            setForm(addr);
                            setModalOpen(true);
                          }}>
                          Edit Address
                        </Button>
                      </Box>
                    ))}
                  </Stack>
                </RadioGroup>
              ) : (
                <Box mt={3}>
                  <Text color="gray.500">No saved address yet.</Text>
                  <Button mt={2} bg="pink.500" color="white" size="sm" onClick={() => setModalOpen(true)}>
                    Add New Address
                  </Button>
                </Box>
              )}
              {selectedAddress && (
                <Box mt={4} bg="pink.50" p={3} rounded="md">
                  <Text fontWeight="600">Selected Address:</Text>
                  <Text fontSize="sm" color="gray.600">
                    {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state}
                  </Text>
                </Box>
              )}
            </Box>

            {/* PRODUCTS */}
            <Box bg="white" p={4} rounded="xl" mt={{md:5, base:3}}>
              <Heading fontSize="md" color="gray.700">3. PRODUCTS</Heading>
              <SimpleGrid spacing={3} mt={3}>
                {cartItems.map((item) => (
                  <Flex key={item._id} bg="gray.50" p={2} rounded="md" align="center" gap={3}>
                    <Image src={item.image?.[0]} alt={item.name} boxSize="70px" rounded="md" />
                    <Box>
                      <Text fontSize="sm" fontWeight="600">{item.name}</Text>
                      <Text fontSize="xs" color="gray.600">
                        ₦{item.price.toLocaleString()} • Size: {item.selectedSize}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </SimpleGrid>
            </Box>

            {/* PAYMENT METHOD */}
            <Box bg="white" p={4} rounded="xl" mt={{md:5, base:3}}>
              <Heading fontSize="md" color="gray.700">4. PAYMENT METHOD</Heading>
              {["Pay on Delivery", "Pay Online"].map((method) => (
                <Box key={method} mt={3} p={3} bg={selectedMethod === method ? "pink.100" : "gray.100"} border="1px solid"
                  borderColor={selectedMethod === method ? "pink.200" : "gray.200"} rounded="md" cursor="pointer"
                  onClick={() => setSelectedMethod(method)}>
                  <Radio isChecked={selectedMethod === method} onChange={() => setSelectedMethod(method)}>
                    {method}
                  </Radio>
                </Box>
              ))}
            </Box>
          </Box>

          {/* SUMMARY */}
          <Box w={{ md: "350px", base: "full" }} h={{ md: "250px", base: "full" }} bg="white" p={4} rounded="xl">
            <Heading fontSize="md">Order Summary</Heading>
            <Flex justify="space-between" mt={2}>
              <Text>Subtotal</Text>
              <Text fontWeight="600">₦{total.toLocaleString()}</Text>
            </Flex>
            <Flex justify="space-between" mt={2}>
              <Text>Delivery Fee</Text>
              <Text>-</Text>
            </Flex>
            <Flex justify="space-between" mt={2} borderTop="1px solid #eee" pt={2}>
              <Text fontWeight="600">Grand Total</Text>
              <Text fontWeight="700" color="pink.600">₦{total.toLocaleString()}</Text>
            </Flex>
            <Button mt={4} w="full" bg="pink.600" color="white" _hover={{ bg: "pink.700" }} onClick={handleOrder}>
              Confirm Order
            </Button>
          </Box>
        </Flex>
      </Box>

      {/* ADDRESS MODAL */}
      {modalOpen && (
        <Box position="fixed" inset={0} bg="blackAlpha.600" display="flex" alignItems="center" justifyContent="center" zIndex={100}>
          <Box bg="white" p={6} rounded="lg" w="full" maxW="lg">
            <Heading fontSize="lg" mb={3} color="gray.700">{editingId ? "Edit Address" : "Add New Address"}</Heading>
            <SimpleGrid columns={2} spacing={3}>
              <Input placeholder="Street" name="street" value={form.street} onChange={handleInput}/>
              <Select placeholder="State" name="state" value={form.state} onChange={handleInput}>
                {addresses.map((addr) => (
                  <option key={addr.region} value={addr.region}>{addr.region}</option>
                ))}
              </Select>
              <Select placeholder="City" name="city" value={form.city} onChange={handleInput} isDisabled={!form.state}>
                {addresses.find((a) => a.region === form.state)?.cities.map((city) => (
                  <option key={city}>{city}</option>
                ))}
              </Select>
              <Input placeholder="Postal Code" name="postalCode" value={form.postalCode} onChange={handleInput}/>
            </SimpleGrid>
            <Textarea mt={3} placeholder="Delivery Notes (e.g. Leave at gate)" name="notes" value={form.notes} onChange={handleInput}/>
            <Flex justify="flex-end" mt={4} gap={3}>
              <Button bg="gray.400" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button bg="pink.500" _hover={{bg:'pink.600'}} color="white" onClick={handleSaveAddress} isLoading={loading}>
                {editingId ? "Update" : "Save"}
              </Button>
            </Flex>
          </Box>
        </Box>
      )}

      {/* USER INFO MODAL */}
      {editUserOpen && (
        <Box position="fixed" inset={0} bg="blackAlpha.600" display="flex" alignItems="center" justifyContent="center" zIndex={200}>
          <Box bg="white" p={6} rounded="lg" w="full" maxW="lg">
            <Heading fontSize="lg" mb={3} color="gray.700">Edit User Information</Heading>
            <SimpleGrid columns={2} spacing={3}>
              <Input placeholder="First Name" name="firstname" value={userForm.firstname} onChange={handleUserInput}/>
              <Input placeholder="Last Name" name="lastname" value={userForm.lastname} onChange={handleUserInput}/>
              <Input placeholder="Email" name="email" value={userForm.email} onChange={handleUserInput}/>
              <Input placeholder="Phone" name="phone" value={userForm.phone} onChange={handleUserInput}/>
            </SimpleGrid>
            <Flex justify="flex-end" mt={4} gap={3}>
              <Button bg="gray.400" onClick={() => setEditUserOpen(false)}>Cancel</Button>
              <Button bg="pink.500" _hover={{ bg: "pink.600" }} color="white" onClick={handleUpdateUserInfo} isLoading={userLoading}>
                Save Changes
              </Button>
            </Flex>
          </Box>
        </Box>
      )}

      <Footer />
    </Box>
  );
}
