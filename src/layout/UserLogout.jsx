import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutUserSuccess } from "../store/userReducers";
import { Box, Button } from "@chakra-ui/react";

export default function UserLogoutButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(signOutUserSuccess()); // Clear user state
        navigate("/signin"); // Redirect to login page
    };
  return (
    <Box>
      <Button onClick={handleSignOut} w="150px" color="white" bg="red.600" py="2" fontWeight="semibold" textTransform="uppercase" _hover={{ color: "white", bg: "red.700" }} transition="all 0.2s">
        Log Out
      </Button>
    </Box>
  )
}
