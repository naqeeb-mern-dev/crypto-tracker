import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserHeader from '../user_component/UserHeader';
import CryptoDashboard from './crypto';

export default function UserDashboard() {

    const userId = localStorage.getItem("userId");
    console.log("userId", userId)

  return (
    <div className="min-h-screen bg-gray-50">
      
      <CryptoDashboard userId={userId}/>
       
    </div>
  );
}
