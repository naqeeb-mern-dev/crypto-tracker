import React from 'react'
import { Navigate } from 'react-router-dom'
import { isTokenExpired } from './checkToken';

export default function AdminProtectedRoute({children}) {
  let token = localStorage.getItem("adminToken")
  if(!token) return <Navigate to={"/admin-login"} replace/>
    
  if (isTokenExpired(token)) {
    localStorage.removeItem("adminToken");
    return <Navigate to="/admin-login" replace />;
  }
  return (children)
}
