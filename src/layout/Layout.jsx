import React, { createContext, useEffect, useState } from 'react';
import { MdHowToVote, MdLocalGroceryStore, MdOutlinePayment, MdSpaceDashboard } from 'react-icons/md';
import { FaStore, FaUsers, FaWhatsapp } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { Link, Outlet, useLocation } from 'react-router-dom';
import AdminLogoutButton from './AdminLogoutButton';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";

export const SidebarLinkContext = createContext();

const mainlinks = [
  { title: 'Dashboard', path: '/dashboard', icon: <MdSpaceDashboard className="text-xl" /> },
  { title: 'New Item', path: 'new-item', icon: <MdLocalGroceryStore className="text-xl" /> },
  { title: 'Items', path: 'items', icon: <FaStore className="text-xl" /> },
  { title: 'Order', path: 'order', icon: <MdLocalGroceryStore className="text-xl" /> },
  { title: 'Customers', path: 'customers', icon: <FaUsers className="text-xl" /> },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();  

  return (
    <Box position="relative">
      <Box h="100vh" overflowY="auto" pb={5} zIndex={20} bg="white" color="gray.400" position={{ base: "fixed", lg: "static" }} transition="all 0.3s" w={{ base: isOpen ? "16rem" : "0", lg: "16rem" }} sx={{ transitionProperty: "width" }}>
        {/* Header */}
        <Flex px={5} py={4} align="center" justify={{ base: "space-between", lg: "center" }} bg="pink.600" roundedBottom="2xl">
          <Link to="/">
            <Text fontSize={{ base: "xl", lg: "2xl" }} fontWeight="bold" color="white" textAlign="center">
              Hardayfunkeh
            </Text>
          </Link>
          <IconButton aria-label="Close Sidebar" icon={<IoClose />} onClick={toggleSidebar} display={{ base: "flex", lg: "none" }} bg="white" color="pink.600" rounded="xl" fontSize="2xl"/>
        </Flex>

        {/* Nav Links */}
        <VStack align="stretch" spacing={4} mt={10} mx={2}>
          {mainlinks.map((link, index) => {
            const isActive = location.pathname === `/dashboard/${link.path}`;
            return (
              <ChakraLink as={Link} key={index} to={link.path} display="flex" alignItems="center" gap={2} px={3} py={2} rounded="md" fontWeight={isActive ? "semibold" : "normal"} bg={isActive ? "pink.600" : "transparent"} color={isActive ? "white" : "gray.800"} _hover={{
                  bg: "pink.600",
                  color: "white",
                }}>
                <Box className={!isActive ? "icon" : ""} display="flex" alignItems="center">
                  {link.icon}
                </Box>
                {link.title}
              </ChakraLink>
            );
          })}
        </VStack>

        {/* Footer */}
        <Box position="absolute" bottom={0} left={0} w="full" py={3} bg="pink.600" roundedTop="3xl" textAlign="center">
          <AdminLogoutButton />
        </Box>
      </Box>
    </Box>
  );
};

const Header = ({ toggleSidebar }) => {
  const location = useLocation();
  const routeTitle = location.pathname.replace('/', '').replace('-', ' ') || 'Dashboard';

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <Box as="header" position="sticky" top="0" zIndex="10" bg="white" color="white">
      <Flex align="center" justify="space-between" px={6} py={4}>
        <Text color="gray.500" textTransform="capitalize" fontWeight="medium">
          {routeTitle}
        </Text>

        {/* Back button for large screens */}
        <Button onClick={handleBack} display={{ base: "none", lg: "inline-flex" }} py={2} px={6} bg="pink.600" color="white" rounded="md" _hover={{ bg: "pink.700" }}>
          Back
        </Button>

        {/* Sidebar toggle button for small screens */}
        <IconButton onClick={toggleSidebar} aria-label="Open Sidebar" icon={<Box as="span" fontSize="2xl">☰</Box>} p={2} fontSize="2xl" color="slate.900" display={{ base: "inline-flex", lg: "none" }} variant="ghost" _hover={{ bg: "gray.100" }} _focus={{ boxShadow: "none" }}/>
      </Flex>
    </Box>
  );
};

export default function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 992);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Flex direction="column" position="relative" maxH="100vh">
      <Flex flex="1">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Box flex="1" overflowX="hidden" overflowY="auto" h="100vh" bg="gray.200" color="black">
          <Header toggleSidebar={toggleSidebar} />
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
}
