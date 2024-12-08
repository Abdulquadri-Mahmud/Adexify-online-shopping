import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

export default function Private_Routes() {
    const { currentUser } = useSelector((state) => state.user);
    const { currentAdmin } = useSelector((state) => state.admin);

  return currentUser || currentAdmin ? <Outlet/> : <Navigate to={'/signin'}/>
}
