import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  RadioGroup,
  Radio,
  Stack,
  Heading,
  Flex,
  Badge,
  Spinner,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useUserQuery } from "../../../hooks/GetUserQuery";
import UserInfoModal from "./UserInfoModal";

export default function SelectAddress({ onSelect }) {
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?._id;
  const { data, isLoading, refetch } = useUserQuery(userId);
  const user = data?.user || data;

  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (user?.addresses?.length > 0) {
      const sorted = [...user.addresses].sort((a, b) =>
        b.isDefault ? 1 : 0 - (a.isDefault ? 1 : 0)
      );
      setAddresses(sorted);

      const defaultAddress = user.addresses.find((a) => a.isDefault);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress._id);
        setSelectedAddress(defaultAddress);
        onSelect({
          userInfo: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
          },
          address: defaultAddress,
        });
      }
    }
  }, [user]);

  const handleSelectAddress = (id) => {
    const addr = addresses.find((a) => a._id === id);
    setSelectedAddressId(id);
    setSelectedAddress(addr);

    onSelect({
      userInfo: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
      address: addr,
    });
  };

  if (isLoading)
    return (
      <Flex justify="center" align="center" py={10}>
        <Spinner />
      </Flex>
    );

  return (
    <Box p={4} bg="white" rounded="md" shadow="sm" border="1px solid #eee">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading fontSize="lg">Select Delivery Address</Heading>
        <Button colorScheme="pink" size="sm" onClick={onOpen}>
          Edit Info / Address
        </Button>
      </Flex>

      {addresses.length === 0 ? (
        <Text color="gray.500">No saved addresses found.</Text>
      ) : (
        <RadioGroup value={selectedAddressId} onChange={handleSelectAddress}>
          <Stack spacing={3}>
            {addresses.map((address) => (
              <Box
                key={address._id}
                borderWidth="1px"
                borderRadius="md"
                p={3}
                bg={address._id === selectedAddressId ? "pink.50" : "gray.50"}
                borderColor={
                  address._id === selectedAddressId ? "pink.200" : "gray.200"
                }
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ bg: "pink.100" }}
                onClick={() => handleSelectAddress(address._id)}
              >
                <Flex justify="space-between" align="center">
                  <Box>
                    <Radio value={address._id} colorScheme="pink">
                      <Text fontWeight="medium">
                        {address.street}, {address.city}, {address.state}
                      </Text>
                    </Radio>
                    {address.notes && (
                      <Text fontSize="sm" color="gray.600" ml={6}>
                        📝 {address.notes}
                      </Text>
                    )}
                  </Box>
                  {address.isDefault && (
                    <Badge colorScheme="green" px={2} py={1}>
                      Default
                    </Badge>
                  )}
                </Flex>
              </Box>
            ))}
          </Stack>
        </RadioGroup>
      )}

      {selectedAddress && (
        <Box mt={5} p={3} bg="gray.100" borderRadius="md">
          <Text fontSize="sm" fontWeight="medium" color="gray.600">
            Selected Address:
          </Text>
          <Text fontSize="md" fontWeight="semibold" mt={1}>
            {selectedAddress.street}, {selectedAddress.city},{" "}
            {selectedAddress.state}
          </Text>
        </Box>
      )}

      {/* User Info Modal */}
      <UserInfoModal isOpen={isOpen} onClose={onClose} user={user} refetch={refetch} />
    </Box>
  );
}
