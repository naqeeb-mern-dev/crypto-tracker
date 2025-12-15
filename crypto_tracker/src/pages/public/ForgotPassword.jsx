import React, { useState } from 'react'
import Header from '../../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer';
import MessageBox from '../../components/MessageBox';
import axios from 'axios';

export default function ForgotPassword() {
 let [formData, setFormData] = useState({
    uEmail: ""
  });
  
  let navigate = useNavigate()
  let [error, setError] = useState({});
  let [message,setMessage] = useState("")
  let validateForm = () => {
    const errors = {};
    if (!formData.uEmail.length > 0) {
      errors.uEmail = "Please Fill Your Email";
    }
    return errors;
  };

  let getValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
let onSubmitForm = (e) => {
  e.preventDefault();

  const errors = validateForm();
  setError(errors);
  if (Object.keys(errors).length > 0) return;

  axios.post(`${process.env.REACT_APP_CRYPTO_API_URL}/api/v1/user/user-forgotPass`, formData)
    .then((res) => { 
        // show success message
        if(res.data.status == "1")
        {
          setMessage(<MessageBox status={res.data.status} message={res.data.message} />);
          setTimeout(() => {
            setMessage("");  
          }, 2500);
        }
      })  
    .catch((err) => {
      console.log("err:", err);
      setMessage(
        <MessageBox status={err?.response?.status || 500}
                    message={err?.response?.data?.message || "Something went wrong"} />
      );
      setTimeout(() => setMessage(""), 3000);
    });
};

  
  return (
   <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
              <h1 className="text-3xl font-bold text-white">Forgot Password</h1>
              <p className="text-indigo-100 mt-2">Not A Big Problem</p>
            </div>
           
            <form onSubmit={onSubmitForm} className="p-8 space-y-6">
              <div>
                <label htmlFor="uEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                autoComplete="new-email"
                  onChange={getValue}
                  value={formData.uEmail}
                  id="uEmail"
                  name="uEmail"
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  placeholder="Enter your email"
                />
                {error.uEmail && <p className="text-red-500 text-sm mt-1">{error.uEmail}</p>}
              </div>

             

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition"
              >
                Forgot Password
              </button>

              <div className="flex items-center justify-between text-sm">
                <Link to="/login" className="text-purple-600 hover:text-purple-700">
                  Login?
                </Link>
                <Link to="/signup" className="text-purple-600 hover:text-purple-700">
                  Create Account
                </Link>
              </div>

              {message}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
