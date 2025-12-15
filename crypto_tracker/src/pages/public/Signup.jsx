import React, { useState } from "react";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import MessageBox from "../../components/MessageBox";
import Footer from "../../components/Footer";
export default function Signup() {

  const navigate = useNavigate()
  const [show, setShow] = useState(false);

    const [loading, setLoading] = useState(false);
  

  const [formData, setFormData] = useState({
    uFullName: "",
    uEmail: "",
    uPassword: "",
  });

  const [error, setError] = useState({});

  let [message, setMessage] = useState("")
  // Get input value
  const getValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.uFullName.trim()) {
      errors.uFullName = "Full Name is required";
    } else if (formData.uFullName.trim().length < 3) {
      errors.uFullName = "Full Name must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.uEmail.trim()) {
      errors.uEmail = "Email is required";
    } else if (!emailRegex.test(formData.uEmail)) {
      errors.uEmail = "Enter a valid email address";
    }

    if (!formData.uPassword.trim()) {
      errors.uPassword = "Password is required";
    } else if (formData.uPassword.length < 6) {
      errors.uPassword = "Password must be at least 6 characters";
    }

    return errors;
  };

  // Submit form
  const onFormSubmit = (e) => {
    e.preventDefault();  
    const errors = validateForm();
    setError(errors);

    if (Object.keys(errors).length > 0) return;
 setLoading(true);
    axios
      .post(`${process.env.REACT_APP_CRYPTO_API_URL}/api/v1/user/user-registeration`, formData)
      .then((res) => {
        if(res?.data?.status == "1")
        {
          setMessage(<MessageBox status={res?.data?.status} message={res?.data?.message}/>)
          setTimeout(()=>{
            setMessage("")
             setLoading(false);
          },2500) 
          setTimeout(()=>{
            navigate("/login")
          },4000)
        }else{
          setMessage(<MessageBox status={res?.data?.status} message={res?.data?.message}/>)
          setTimeout(()=>{
            setMessage("")
             setLoading(false);
          },3000) 
        } 
      })
      .catch((err) => {
        console.log("API Error:", err);
 
          setMessage
          (
            <MessageBox status={err.response?.status || 500} message={err.response?.data?.message || "Something went wrong"}/>
          )
            setTimeout(()=>{
              setMessage("")
            },3500)  
  setLoading(false);

      });
  };

  return (
   <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
              <h1 className="text-3xl font-bold text-white">Create Account</h1>
              <p className="text-indigo-100 mt-2">Join CryptoTracker today</p>
            </div>
            
            <form onSubmit={onFormSubmit} className="p-8 space-y-6">
              <div>
                <label htmlFor="uFullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  autoComplete="new-name"
                  name="uFullName"
                  value={formData.uFullName}
                  onChange={getValue}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  placeholder="Enter your full name"
                />
                {error.uFullName && <p className="text-red-500 text-sm mt-1">{error.uFullName}</p>}
              </div>

              <div>
                <label htmlFor="uEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  autoComplete="new-email"
                  name="uEmail"
                  value={formData.uEmail}
                  onChange={getValue}
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  placeholder="Enter your email"
                />
                {error.uEmail && <p className="text-red-500 text-sm mt-1">{error.uEmail}</p>}
              </div>

              <div>
                <label htmlFor="uPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative w-full">
                  <input
                   autoComplete="new-password" 
                    value={formData.uPassword}
                    onChange={getValue}
                    name="uPassword"
                    type={show ? "text" : "password"}
                    placeholder="Create a password"
                    className="w-full border p-2 pr-10 rounded"
                  />

                  {/* Eye Icon Button */}
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                  >
                    {show ? (
                      // 👁 Show (Eye Open)
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                        className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 
                            2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 
                            0-8.268-2.943-9.542-7z" />
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ) : (
                      // 🙈 Hidden (Eye Slash)
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                        className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 
                            16.065 7.03 19 12 19c1.592 0 3.105-.293 
                            4.49-.832M6.228 6.228A10.45 10.45 0 0112 5c4.97 
                            0 8.773 2.935 10.065 7a10.528 10.528 0 01-4.293 
                            5.262M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 
                            7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 
                            10-4.243-4.243m4.243 4.243L9.879 9.88" />
                      </svg>
                    )}
                  </button>
                </div>   
                {error.uPassword && <p className="text-red-500 text-sm mt-1">{error.uPassword}</p>}
              </div>
 
               <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition flex items-center justify-center"
                disabled={loading} // disable while loading
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                ) : null}
                {loading ? "Create Account..." : "Create Account"}
              </button>
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                  Sign In
                </Link>
              </p>

              {message}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
