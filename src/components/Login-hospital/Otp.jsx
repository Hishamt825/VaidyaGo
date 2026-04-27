import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BASE_URL from "../../baseUrl";

const Otp = ({ isModal, onClose, onSwitchToNewPass, onSwitchToLogin }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const otpValue = otp.join("");
    
    if (otpValue.length < 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/accounts/verify-otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ otp: otpValue }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success
        if (isModal && onSwitchToNewPass) {
          onSwitchToNewPass();
        } else {
          if (isModal && onClose) onClose();
          navigate('/New_pass');
        }
      } else {
        setError(data.message || data.error || "Invalid OTP");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setError("Server error occurred while verifying OTP");
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
      <div className="relative pt-[65px] px-8 pb-8 flex flex-col items-center z-10">
        {/* Title */}
        <h2 className="text-[26px] font-bold text-[#19718A] mt-2 mb-8 text-center leading-tight">
          Forget Password?
        </h2>

        {/* Error Display */}
        {error && (
          <div className="w-full text-center mb-4 p-2 bg-red-100 border border-red-400 text-red-700 text-xs rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          {/* OTP Inputs */}
          <div className="flex gap-2 mb-8 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-bold bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#19718A] focus:border-transparent transition-all shadow-sm"
              />
            ))}
          </div>

          {/* Verify Button */}
          <div className="flex justify-center mb-6">
            <div className="p-1 rounded-full border-[1.5px] border-gray-200 shadow-sm">
              <button
                type="submit"
                className="w-[140px] h-[42px] rounded-full bg-[#89C8D9] text-[#0f3b4d] text-[16px] font-bold hover:bg-[#78b7c8] hover:shadow-md transition-all flex items-center justify-center shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]"
              >
                Verify
              </button>
            </div>
          </div>

          {/* Back Link */}
          <div>
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
              className="text-[13px] text-gray-600 hover:text-[#19718A] flex items-center transition-colors underline underline-offset-2 font-medium bg-transparent border-none cursor-pointer"
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
              Back to Login
            </button>
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

export default Otp;
