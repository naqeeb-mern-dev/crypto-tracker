import React, { useState } from 'react'
import Header from '../../components/Header'
import { Link, useNavigate,useParams } from 'react-router-dom'
import Footer from '../../components/Footer';
import MessageBox from '../../components/MessageBox';
import axios from 'axios';

export default function ResetPassword() {
  const { token } = useParams();
  let [formData, setFormData] = useState({
    uPassword: ""
  });
  const [show, setShow] = useState(false);
  
  let navigate = useNavigate()
  let [error, setError] = useState({});
  let [message,setMessage] = useState("")
  let validateForm = () => {
    const errors = {};
    if (!formData.uPassword.trim()) {
      errors.uPassword = "Password is required";
    } else if (formData.uPassword.length < 6) {
      errors.uPassword = "Password must be at least 6 characters";
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

  axios.post(`${process.env.REACT_APP_CRYPTO_API_URL}/api/v1/user/user-ResetPass/${token}`, formData)
    .then((res) => { 
        // show success message
        if(res.data.status == "1")
        {
          setMessage(<MessageBox status={res.data.status} message={res.data.message} />);
          setTimeout(() => {
            setMessage("");  
            navigate("/login")
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
              <h1 className="text-3xl font-bold text-white">Reset Password</h1>
              <p className="text-indigo-100 mt-2">Not A Big Problem</p>
            </div>
           
            <form onSubmit={onSubmitForm} className="p-8 space-y-6">
              <div>
                <label htmlFor="uPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
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
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition"
              >
                Reset Password
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
