import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BASE_URL from "../../baseUrl";

const Forget = ({ isModal, onClose, onSwitchToLogin, onSwitchToOtp }) => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!phone) {
      setError("Please enter your phone number");
      return;
    }

    const payload = phone.includes("@") ? { email: phone } : { phone: phone };

    try {
      const response = await fetch(`${BASE_URL}/accounts/send-otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Success: save contact for reset-password API
        localStorage.setItem("resetContact", phone);

        if (isModal && onSwitchToOtp) {
          onSwitchToOtp();
        } else {
          if (isModal && onClose) onClose();
          navigate('/Otp');
        }
      } else {
        // Error from backend
        setError(data.message || data.error || "Failed to send OTP");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      setError("Server error occurred while sending OTP");
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

      {/* Icon Circle */}
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
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative pt-[65px] px-8 pb-6 flex flex-col items-center z-10">
        {/* Title & Subtitle */}
        <h2 className="text-[28px] font-bold text-[#19718A] mt-2 mb-1 text-center leading-tight">
          Forget Password?
        </h2>
        <p className="text-gray-600 text-sm text-center mb-8 px-4 leading-snug">
          please enter the Email or Phone Number
          <br />
          to get the OTP
        </p>

        {/* Error Display */}
        {error && (
          <div className="w-full text-center mb-4 p-2 bg-red-100 border border-red-400 text-red-700 text-xs rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full">
          {/* Label */}
          <div className="mb-2">
            <label className="flex items-center text-[15px] text-[#111] font-medium mb-2">
              <svg
                className="w-5 h-5 mr-2 text-gray-700"
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
              Enter Email/Phone Number
            </label>

            {/* Input Field */}
            <div className="rounded-md shadow-[0_2px_8px_rgba(25,113,138,0.2)]">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Email/Number"
                className="w-full text-sm px-4 py-3.5 bg-white border border-[#19718A] rounded-md outline-none placeholder-gray-400 focus:ring-1 focus:ring-[#19718A] transition-all"
              />
            </div>
          </div>

          {/* Back Link */}
          <div className="mb-8 pl-1">
            <button
              type="button"
              onClick={() => {
                if (isModal && onSwitchToLogin) {
                  onSwitchToLogin();
                } else {
                  if (isModal && onClose) onClose();
                  navigate("/Finallogin");
                }
              }}
              className="text-[13px] text-gray-600 hover:text-gray-800 flex items-center transition-colors underline underline-offset-2 bg-transparent border-none cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to page
            </button>
          </div>

          {/* Send Button */}
          <div className="flex justify-center">
            <div className="p-1 rounded-full border-[1.5px] border-gray-200 shadow-sm">
              <button
                type="submit"
                className="w-[140px] h-[44px] rounded-full bg-[#89C8D9] text-[#0f3b4d] text-lg font-bold hover:bg-[#78b7c8] hover:shadow-md transition-all flex items-center justify-center shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]"
              >
                Send
              </button>
            </div>
          </div>
        </form>
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

export default Forget;
