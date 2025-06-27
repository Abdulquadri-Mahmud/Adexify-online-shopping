import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutUserSuccess } from "../store/adminReducer";

export default function AdminLogoutButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(signOutUserSuccess()); // Clear user state
        navigate("/admin-login"); // Redirect to login page
    };
  return (
    <div className="w-full">
      <button onClick={handleSignOut} className=" w-full text-white font-semibold rounded-md uppercase hover:text-white hover:bg-[#C70039] transition duration-200">
        Log Out
      </button>
    </div>
  )
}
