import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Camera, Save, X, Eye, EyeOff, Shield, Bell, Palette, Globe, Lock, CheckCircle2, CheckCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { userList } from '../../admin/admin_utils/UserApi';
import axios from 'axios';
import MessageBox from '../../../components/MessageBox';
import bcrypt from "bcryptjs";


export default function UserProfile() {
    let location = useLocation();
    let userId = location.state?.userId;

    let [userData, setUserData] = useState(null);

    let [formData, setFormData] = useState({
        _id: "",
        uFullName: "",
        uEmail: "",
        uPassword: "",
        uStatus: "",
        role: "",
    });

    let [passData,setPassData] = useState({
        uPassword:"",
        newPassword: "",
        confirmPassword: ""
    })
    let [error, setError] = useState({})
    let [message, setMessage] = useState("")
 
    const [activeTab, setActiveTab] = useState("profile");
    const [showPassword, setShowPassword] = useState(false);

    // fetch user by ID
    let userListData = (userId) => {
        userList(userId).then((data) => {
            let user = data?.data[0];
            setUserData(user);

            // update formData with API data
            setFormData((prev) => ({
            ...prev,
            _id: user?._id,
            uFullName: user?.uFullName,
            uEmail: user?.uEmail,
            uPassword: user?.uPassword,
            uStatus: user?.uStatus,
            role: user?.role
            }));
        });
    };

    // handle inputs
    let getValue = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    let getValuePass = (e) => {
        setPassData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    useEffect(() => {
        if (userId) userListData(userId);
    }, []);

    const tabs = [
        { id: 'profile', name: 'Profile', icon: User },
        { id: 'security', name: 'Security', icon: Shield },
    ];

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
 

        return errors;
    };

    let validatePass = () => {
        const errors = {};       

        // current password
        if (!passData.uPassword.trim()) {
            errors.uPassword = "Current Password is required";
        }

        // new password
        if (!passData.newPassword.trim()) {
            errors.newPassword = "New Password is required";
        } else if (passData.newPassword.length < 6) {
            errors.newPassword = "Password must be at least 6 characters";
        }

        // confirm password
        if (!passData.confirmPassword.trim()) {
            errors.confirmPassword = "Confirm Password is required";
        }

        // match check
        if (passData.newPassword !== passData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        return errors;
    };


    let checkPass = async () => { 
        let cPass = await bcrypt.compare(passData.uPassword, formData.uPassword);

        if (!cPass) {
            setMessage(<MessageBox status={0} message={"Correct your Current Password"} />);
            setTimeout(() => setMessage(""), 2500);
        }
        return cPass;
    };


    let onPassUpdate= async(e)=>{
        e.preventDefault()
        const errors = validatePass() 
        setError(errors);
        if(Object.keys(errors).length>0) return;

        const passCheck = await checkPass()
        if(!passCheck) return
        axios.put(`${process.env.REACT_APP_CRYPTO_API_URL}/api/v1/user/user-update/${userId}`, passData)
        .then((res)=>{
            userListData(userId);
             setMessage(<MessageBox status={res?.data?.status} message={res?.data?.message}/>)
                       setPassData({
                          uPassword:"",
                          newPassword: "",
                          confirmPassword: ""
                        })
                      setTimeout(()=>{
                        setMessage("")
                        
                      },2500)
        }).catch((err) => { 
         
                  setMessage
                  (
                    <MessageBox status={err.response?.status || 500} message={err.response?.data?.message || "Something went wrong"}/>
                  )
                    setTimeout(()=>{
                      setMessage("")
                    },3500)   
              });
    }

    let onFormUpdate=(e)=>{
        e.preventDefault()
        const errors = validateForm() 
        setError(errors);
        if(Object.keys(errors).length>0) return;
        formData.uPassword = ""
        axios.put(`${process.env.REACT_APP_CRYPTO_API_URL}/api/v1/user/user-update/${userId}`, formData)
        .then((res)=>{
            userListData(userId);
             setMessage(<MessageBox status={res?.data?.status} message={res?.data?.message}/>)
                      setTimeout(()=>{
                        setMessage("")
                      },2500)
        }).catch((err) => { 
         
                  setMessage
                  (
                    <MessageBox status={err.response?.status || 500} message={err.response?.data?.message || "Something went wrong"}/>
                  )
                    setTimeout(()=>{
                      setMessage("")
                    },3500)   
              });
    }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">CT</span>
              </div>
              <span className="font-bold text-xl">Crypto Tracker</span>

              <Link
                              to={"/dashboard"}
                              className="text-gray-700 ml-5 hover:text-gray-900 font-medium"
                            >
                              Cryptocurrencies
                            </Link>
            </div>
            
            <button className="text-gray-600 hover:text-gray-900">
                <Link to={"/dashboard"}>
                 <X className="w-6 h-6" />
                 </Link> 
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 bg-white rounded-xl border border-gray-200 p-4 h-fit sticky top-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 px-2">Settings</h2>
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-green-50 text-green-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <form onSubmit={onFormUpdate}>
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings ({userData?.uFullName})</h1>
                  
                  {/* Profile Image */}
                  <div className="mb-8">
                    {/* <label className="block text-sm font-medium text-gray-700 mb-3">Profile Picture</label> */}
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        {/* <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center overflow-hidden"> */}
                          {/* {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-12 h-12 text-white" />
                          )} */}
                        {/* </div> */}
                        {/* <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 border border-gray-200">
                          <Camera className="w-4 h-4 text-gray-600" />
                          <input
                            type="file"
                            accept="image/*"
                            // onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label> */}
                      </div>
                      {/* <div>
                        <p className="text-sm text-gray-600 mb-1">JPG, PNG or GIF. Max size 2MB</p>
                        <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                          Remove photo
                        </button>
                      </div> */}
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName" readOnly
                        value={userData?.uFullName?.trim()?.split(" ")[0]}
                        onChange={getValue}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName" readOnly
                        value={userData?.uFullName?.trim()?.split(" ")[1]}
                        onChange={getValue}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                      <input
                        type="text"
                        name="uFullName"
                        value={formData.uFullName}
                        onChange={getValue}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      {error.uFullName && <p className="text-red-500 text-sm mt-1">{error.uFullName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          name='uEmail'
                           value={formData.uEmail}
                        onChange={getValue} 
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {error.uEmail && <p className="text-red-500 text-sm mt-1">{error.uEmail}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Status</label>
                      <div className="relative">
                        <CheckCircle className="w-5 h-5 text-green-500 absolute left-3 top-1/2 -translate-y-1/2" />

                         <input
                          type="text" 
                          name="uStatus" readOnly
                           value={formData.uStatus}
                        onChange={getValue}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                      <input
                        type="text"
                        name="role" readOnly
                        value={formData.role}
                        onChange={getValue}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                   
                  </div>

                  <div className="flex items-center justify-end gap-4 pt-6 border-t mt-8">
                    {message}
                    <Link to={"/dashboard"} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                        Cancel
                    </Link>
                    
                    <button
                    
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2"
                    >
                    <Save className="w-5 h-5" />
                    Save Changes
                    </button>
                  </div>
                </form>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h1>
                  
                  <div className="space-y-6 mb-6">
                    <form onSubmit={onPassUpdate}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                          <div className="relative">
                            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="uPassword"
                                value={passData.uPassword}
                                onChange={getValuePass}
                                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                          {error.uPassword && <p className="text-red-500 text-sm mt-1">{error.uPassword}</p>}

                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                          <div className="relative">
                            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="newPassword"
                              value={passData.newPassword}
                              onChange={getValuePass}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                         {error.newPassword && <p className="text-red-500 text-sm mt-1">{error.newPassword}</p>}

                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                          <div className="relative">
                            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="confirmPassword"
                              value={passData.confirmPassword}
                              onChange={getValuePass}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                            {error.confirmPassword && <p className="text-red-500 text-sm mt-1">{error.confirmPassword}</p>}

                        </div>
                        {message}
                        <div className="flex items-center justify-end gap-4 pt-6 border-t mt-8">
                            <Link to={"/dashboard"} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                                Cancel
                            </Link>
                            
                            <button
                            
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2"
                            >
                            <Save className="w-5 h-5" />
                            Save Changes
                            </button>
                        </div>
                      </div>
                      
                    </form>

                    {/* <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Enable 2FA</p>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="twoFactor"
                            checked={securitySettings.twoFactor}
                            onChange={(e) => handleInputChange(e, 'security')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Login Alerts</h3>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Email Login Notifications</p>
                          <p className="text-sm text-gray-600">Get notified when someone logs into your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="loginAlerts"
                            checked={securitySettings.loginAlerts}
                            onChange={(e) => handleInputChange(e, 'security')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                    </div> */}
                  </div>
                </div>
              )}
 
              {/* Action Buttons */}
              
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}; 