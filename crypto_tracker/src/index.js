import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 

import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Signup from './pages/public/Signup';
import ForgotPassword from './pages/public/ForgotPassword';
import AdminHome from './pages/admin/admin_pages/AdminDashboard';
import AdminLogin from './pages/admin/admin_pages/AdminLogin';
import AdminProtectedRoute from './utils/AdminProtectedRoute';
import UserLogout from './utils/UserLogout';
import AdminLogout from './utils/AdminLogout';
import UserProtectedRoute from './utils/UserProtectedRoute';
import ResetPassword from './pages/public/ResetPassword';
import CryptoDashboard from './pages/user/user_pages/crypto';
import UserProfile from './pages/user/user_pages/UserProfile';
import UserDashboard from './pages/user/user_pages/UserDashboard';
import Currencies from './pages/user/user_pages/Currencies';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/admin-login",
    element:<AdminLogin/>
  },
  {
    path:"/logout",
    element:<UserLogout/>
  },
  {
    path:"/admin-logout",
    element:<AdminLogout/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/forgot-password",
    element:<ForgotPassword/>
  },
  {
    path:"/reset-password/:token",
    element:<ResetPassword/>
  },
  {
    path:"/dashboard",
    element:<UserProtectedRoute>
              <UserDashboard/>
            </UserProtectedRoute>
  },
  {
  path:"/settings",
    element:<UserProtectedRoute>
              <UserProfile/>
            </UserProtectedRoute>
  },
  {
  path:"/currencies/:slug",
    element:<UserProtectedRoute>
              <Currencies/>
            </UserProtectedRoute>
  },
  {
    path:"/admin-dashboard",
    element:<AdminProtectedRoute>
              <AdminHome/>
            </AdminProtectedRoute>
  },
])
root.render(
  // <React.StrictMode> 
    <RouterProvider router={router}/>
  // </React.StrictMode>
);
 
reportWebVitals();


