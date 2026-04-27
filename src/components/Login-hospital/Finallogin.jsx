import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../baseUrl";

const Finallogin = ({ isModal, onClose, onSwitchToForget }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // form states (same like signup)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ================================
  //        HANDLE LOGIN API
  // ================================
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${BASE_URL}/accounts/api/admin/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            email: username, // mapping username field to email backend field
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

        // NO alert popup here, directly transition
        if (isModal && onClose) {
          onClose();
        } else {
          // If not modal, redirect somewhere
          navigate("/Admin_dashboard1"); 
        }

      } else {
        // display error from backend
        setError(data.detail || data.error || "Invalid credentials");
      }

    } catch (err) {
      console.error("Server error:", err);
      setError("Server error occurred. Check console for details.");
    }
  };

  const innerContent = (
    <div
      className="w-[450px] relative mt-12"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Background with Cutout */}
      <div 
        className="absolute inset-0 bg-white rounded-2xl shadow-2xl"
        style={{ 
          WebkitMaskImage: "radial-gradient(circle at 50% 0%, transparent 64px, black 65px)", 
          maskImage: "radial-gradient(circle at 50% 0%, transparent 64px, black 65px)" 
        }}
      ></div>

      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-50 cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      
      {/* Icon */}
      <div className="absolute -top-[58px] left-1/2 -translate-x-1/2 bg-[#19718A] rounded-full h-[115px] w-[115px] flex items-center justify-center shadow-lg z-10">
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>

      {/* FORM CONTENT */}
      <div className="relative pt-[65px] px-8 pb-6 flex flex-col items-center">
        {error && (
          <div className="w-full text-center mt-2 p-2 bg-red-100 border border-red-400 text-red-700 text-xs rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="w-full mt-3 space-y-3">
          {/* Username */}
          <div>
            <label className="flex items-center text-[14px] font-medium text-[#111] mb-1.5">
              <svg
                className="w-4 h-4 mr-2 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Username
            </label>

            <div className="rounded-md shadow-[0_2px_8px_rgba(25,113,138,0.2)]">
              <input
                type="text"
                placeholder="Enter Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full text-sm px-4 py-2.5 bg-white border border-[#19718A] rounded-md outline-none placeholder-gray-400 focus:ring-1 focus:ring-[#19718A] transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center text-[14px] font-medium text-[#111] mb-1.5">
              <svg
                className="w-4 h-4 mr-2 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Password
            </label>

            <div className="rounded-md shadow-[0_2px_8px_rgba(25,113,138,0.2)] relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm pl-4 pr-10 py-2.5 bg-white border border-[#19718A] rounded-md outline-none placeholder-gray-400 focus:ring-1 focus:ring-[#19718A] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-[12.5px]">
            <div className="flex items-center space-x-1.5 pl-1">
              <input type="checkbox" className="w-3.5 h-3.5 text-[#19718A] border-gray-300 rounded focus:ring-[#19718A]" />
              <span className="text-gray-500 font-medium">Remember Me</span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (isModal && onSwitchToForget) {
                  onSwitchToForget();
                } else {
                  if (isModal && onClose) onClose();
                  navigate("/Forget");
                }
              }}
              className="font-medium text-gray-700 hover:text-gray-900 pr-1 bg-transparent border-none cursor-pointer"
            >
              <span>Forgot your </span>
              <span className="text-[#19718A] hover:underline">Password?</span>
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <div className="flex justify-center mt-4 pt-1">
            <div className="p-1 rounded-full border-[1.5px] border-gray-200 shadow-sm">
              <button
                type="submit"
                className="w-[130px] h-[40px] rounded-full bg-[#89C8D9] text-[#0f3b4d] text-[16px] font-bold hover:bg-[#78b7c8] hover:shadow-md transition-all flex items-center justify-center shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]"
              >
                Login
              </button>
            </div>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center w-[85%] my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-[#b3b3b3] text-[12px] font-medium">Or continue with</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google */}
        <div className="flex justify-center w-full">
          <button className="flex items-center justify-center space-x-3 w-[80%] max-w-xs px-4 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-colors">
            <img
              src="https://img.icons8.com/color/36/000000/google-logo.png"
              alt="Google"
              className="w-4 h-4"
            />
            <span className="text-[#333] text-[13.5px] font-bold tracking-wide">
              Continue with Google
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
        {innerContent}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#252525] px-4 font-sans relative">
      {innerContent}
    </div>
  );
};

export default Finallogin;
