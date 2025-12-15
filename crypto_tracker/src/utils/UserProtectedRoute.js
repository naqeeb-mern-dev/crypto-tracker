import React from 'react'
import { Navigate } from 'react-router-dom'
import { isTokenExpired } from './checkToken';

export default function UserProtectedRoute({children}) {
  let token = localStorage.getItem("userToken")
  if(!token) return <Navigate to={"/login"} replace/>
    
  if (isTokenExpired(token)) {
    localStorage.removeItem("userToken");
    return <Navigate to="/login" replace />;
  }
  return (children)
}
