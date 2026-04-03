import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";


const AdminLoginPage = () => {
  const navigate = useNavigate();

  // 🔒 Fixed role for Admin
  const role = "Admin";
  const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [error, setError] = useState("");


  // ================================
  //        HANDLE LOGIN
  // ================================
const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await fetch(
      "https://tubajavedd.pythonanywhere.com/accounts/api/admin/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      }
    );

    const data = await response.json();

    console.log("Login response:", data);
    console.log("Status code:", response.status);

    if (response.ok) {
      if (!data.access && !data.token) {
        setError("No token received");
        return;
      }

      // If backend returns "access" token
      if (data.access) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
      }

      // If backend returns just "token"
      if (data.token) {
        localStorage.setItem("access", data.token);
      }

      alert("Login successful!");
      navigate("/Admin_dashboard1");

    } else {
      // display error from backend
      setError(data.detail || data.error || "Invalid credentials");
    }

  } catch (err) {
    console.error("Server error:", err);
    setError("Server error occurred. Check console for details.");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#A9CCDF] px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-2xl pt-[69px] px-8 w-[510px] h-[570px] flex flex-col items-center relative"
      >
        {/* Icon */}
        <div className="absolute -top-14 bg-[#19718A] p-4 rounded-full text-white h-[110px] w-[110px] flex items-center justify-center">
          <img src="/assets/Vector.svg" alt="user" className="w-14 h-14" />
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="w-full space-y-1">
          {/* Username */}
         {/* Email */}
<div className="mb-4">
  <label className="flex items-center text-[14px] font-medium text-gray-700 mb-1">
    <img src="/assets/user.svg" alt="Email" className="w-6 h-6 mr-2" />
    Email
  </label>

  <div
    className="flex items-center rounded-md px-3 py-3"
    style={{
      border: "2px solid #19718A",
      boxShadow: "2px 2px 4px rgba(80,78,78,0.6)",
    }}
  >
    <input
      type="email"
      placeholder="Enter Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full text-[16px] bg-transparent outline-none"
    />
  </div>
</div>

{/* Phone */}
<div className="mb-4">
  <label className="flex items-center text-[14px] font-medium text-gray-700 mb-1">
    <img src="/assets/phone.svg" alt="Phone" className="w-6 h-6 mr-2" />
    Phone
  </label>

  <div
    className="flex items-center rounded-md px-3 py-3"
    style={{
      border: "2px solid #19718A",
      boxShadow: "2px 2px 4px rgba(80,78,78,0.6)",
    }}
  >
    <input
      type="tel"
      placeholder="Enter Phone Number"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      className="w-full text-[16px] bg-transparent outline-none"
    />
  </div>
</div>

{/* Password */}
<div className="mb-4">
  <label className="flex items-center text-[14px] font-medium text-gray-700 mb-1">
    <FaLock className="mr-2" />
    Password
  </label>

  <div
    className="flex items-center rounded-md px-3 py-3"
    style={{
      border: "2px solid #19718A",
      boxShadow: "2px 2px 6px rgba(80,78,78,0.6)",
    }}
  >
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Enter Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full text-[16px] bg-transparent outline-none"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="ml-2 text-gray-500"
    >
      {showPassword ? <FaEye /> : <FaEyeSlash />}
    </button>
  </div>
</div>


          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-[14px]">
            <div className="flex items-center space-x-1">
              <input type="checkbox" />
              <span className="text-gray-600 text-[14px]">Remember Me</span>
            </div>

            <Link to="/signup1" className="font-medium text-[14px]">
              <span>Forgot your </span>
              <span className="text-[#0E4A68]">Password?</span>
            </Link>
          </div>

          {/* LOGIN BUTTON */}
          <motion.div whileHover={{ scale: 1.03 }}>
            <div className="flex justify-center mt-3">
              <div className="rounded-full border p-1 border-[#89C8D9]">
                <button
                  type="submit"
                  className="w-[120px] h-[40px] rounded-full bg-[#89C8D9] text-[#164863] text-[18px] font-semibold hover:bg-[#08374e] hover:text-white transition"
                >
                  Login
                </button>
              </div>
            </div>
          </motion.div>
        </form>

        {/* Divider */}
        <div className="flex items-center w-full my-2">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-2 text-gray-500 text-[14px]">or continue with</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google */}
        <div className="flex justify-center pt-2">
          <div className="flex items-center justify-center space-x-2 w-full max-w-xs px-4 py-1 border rounded-full shadow-md hover:bg-gray-100">
            <img
              src="https://img.icons8.com/color/36/000000/google-logo.png"
              alt="Google"
              className="w-6 h-6"
            />
            <span className="text-gray-700 font-medium text-[16px]">
              Continue with Google
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
