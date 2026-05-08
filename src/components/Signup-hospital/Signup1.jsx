import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import VerticalProgressBar from "./VerticalProgressBar";
import BASE_URL from "../../baseUrl";
// import { FaUsersGear } from "react-icons/fa6";

export default function SignupForm({ isModal, onClose, onSwitchToLogin }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isModal) {
      navigate("/MainPage?auth=signup");
    }
  }, [isModal, navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const [showconfirm_password, setShowconfirm_password] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [role, setRole] = useState("");
  const [isOpen, setIsOpen] = useState(false);


  // ================================
  //        HANDLE SIGNUP API
  // ================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select a user type (Patient or Doctor)");
      return;
    }

    try {
      // 🌍 Using AWS IP for all roles to avoid local connection errors
      const fullUrl = "http://13.60.96.212:8000/accounts/api/signup/";

      console.log("Submitting Signup to Production:", fullUrl);

      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          usertype: role.toLowerCase(),
          email,
          phone: `+91${phone}`,
          password,
          confirm_password,
        }),
      });

      // Safe JSON parse
      let data = null;
      try {
        data = await response.json();
      } catch (err) {
        console.error("Failed to parse JSON:", err);
      }

      console.log("Backend response:", data);
      console.log("Status Code:", response.status);

      // ✅ Handle success
      if (response.status === 201 || response.status === 200) {
        // Clear any leftover data from previous sessions
        localStorage.removeItem("doctor_id");
        localStorage.removeItem("professional_info_id");
        localStorage.removeItem("hospital_info_id");
        localStorage.removeItem("document_info_id");
        localStorage.removeItem("prescriptionUploaded");

        if (data?.token) {
          localStorage.setItem("token", data.token);
        }

        // Save new doctor_id if it's a doctor signup
        const newDoctorId = data?.doctor_id || data?.id || data?.user?.id;
        if (newDoctorId) {
          localStorage.setItem("doctor_id", newDoctorId);
        }

        // 🚀 Role-based Redirection
        const targetDashboard =
          role === "Patient" ? "/Patient_dashboard" :
            role === "Doctor" ? "/Form1" :
              "/Finallogin";

        console.log("Signup Successful, navigating to:", targetDashboard);

        // First close the modal to clear overlays, then navigate
        if (isModal && onClose) {
          onClose();
          // Small timeout to ensure state update propagates before unmount
          setTimeout(() => {
            navigate(targetDashboard);
          }, 10);
        } else {
          navigate(targetDashboard);
        }
      }
      // ✅ Handle validation errors
      else if (response.status === 400) {
        alert(data?.message || JSON.stringify(data));
      }
      // ✅ Handle unauthorized
      else if (response.status === 401) {
        alert("Unauthorized access.");
      }
      else {
        alert(`Signup failed. Status code: ${response.status}`);
      }

    } catch (error) {
      console.error("Server error:", error);
      alert("Server error occurred. Check console for details.");
    }
  };

  const innerContent = (
    <div
      className="w-[530px] relative mt-12 flex flex-row items-start"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Background with Cutout */}
      <div
        className="absolute inset-0 bg-white rounded-xl shadow-2xl"
        style={{
          WebkitMaskImage: "radial-gradient(circle at 50% 0%, transparent 64px, black 65px)",
          maskImage: "radial-gradient(circle at 50% 0%, transparent 64px, black 65px)"
        }}
      ></div>

      {/* Icon - Moved to root to center properly */}
      <div className="absolute -top-[58px] left-1/2 -translate-x-1/2 bg-[#19718A] p-4 rounded-full text-white h-[115px] w-[115px] flex items-center justify-center shadow-lg z-20">
        <img src="/assets/sig.svg" alt="Add User Icon" className="w-14 h-14" />
      </div>

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

      {/* Progress bar */}
      <div className="flex flex-col items-center justify-start mr-0 ml-[26px] mt-[61px] relative z-10">
        <VerticalProgressBar activeStep={activeStep} />
      </div>

      {/* FORM UI */}
      <div className="flex-1 flex flex-col items-center relative z-10 pt-[60px] pr-8 pl-3 pb-6">

        {/* FORM START */}
        <form onSubmit={handleSubmit} className="w-full space-y-2">

          {/* User Type Dropdown */}
          <div className="mb-2 relative">
            <label className="text-[14px] font-medium text-gray-700 mb-1 block ml-1">
              User Type
            </label>
            <div
              onClick={() => {
                setIsOpen(!isOpen);
                setActiveStep(1);
              }}
              className="flex items-center justify-between rounded-md px-4 py-2.5 bg-white border border-[#19718A] shadow-[0_2px_8px_rgba(25,113,138,0.2)] cursor-pointer transition-all"
            >
              <span className={`text-[15px] ${role === "" ? "text-gray-400" : "text-black"}`}>
                {role || "Select Role"}
              </span>
              <svg
                className={`w-4 h-4 text-[#19718A] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-xl z-[100] overflow-hidden"
                >
                  <div
                    onClick={() => {
                      setRole("");
                      setIsOpen(false);
                    }}
                    className="px-4 py-2.5 text-[15px] text-gray-400 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                  >
                    Select Role
                  </div>
                  {["Patient", "Doctor"].map((opt) => (
                    <div
                      key={opt}
                      onClick={() => {
                        setRole(opt);
                        setIsOpen(false);
                      }}
                      className={`px-4 py-2.5 text-[15px] cursor-pointer transition-colors ${role === opt
                        ? "bg-[#19718A]/10 text-[#19718A] font-bold border-l-4 border-[#19718A]"
                        : "hover:bg-gray-50 text-gray-700"
                        }`}
                    >
                      {opt}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <div className="flex items-center rounded-md px-3 py-2.5 bg-white border border-[#19718A] shadow-[0_2px_8px_rgba(25,113,138,0.2)] focus-within:ring-1 focus-within:ring-[#19718A] transition-all">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setActiveStep(2)}
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>
          {/* call */}
          <div>
            <label className="text-sm font-medium">Phone Number</label>

            <div
              className={`flex items-center rounded-md px-3 py-2.5 bg-white border shadow-[0_2px_8px_rgba(25,113,138,0.2)] focus-within:ring-1 transition-all ${phoneError ? 'border-red-500 focus-within:ring-red-500' : 'border-[#19718A] focus-within:ring-[#19718A]'}`}
            >
              <input
                type="tel"
                placeholder="Enter Phone Number"
                value={phone}
                maxLength={10}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setPhone(value);
                }}
                onFocus={() => setActiveStep(3)}
                onClick={() => setActiveStep(3)}
                className="w-full bg-transparent text-sm outline-none"
              />

            </div>

            {phoneError && (
              <p className="text-xs text-red-500 mt-1">{phoneError}</p>
            )}
          </div>


          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="flex items-center rounded-md px-3 py-2.5 bg-white border border-[#19718A] shadow-[0_2px_8px_rgba(25,113,138,0.2)] focus-within:ring-1 focus-within:ring-[#19718A] transition-all">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setActiveStep(4)}
                className="w-full text-sm bg-transparent outline-none"
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

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <div className="flex items-center rounded-md px-3 py-2.5 bg-white border border-[#19718A] shadow-[0_2px_8px_rgba(25,113,138,0.2)] focus-within:ring-1 focus-within:ring-[#19718A] transition-all">
              <input
                type={showconfirm_password ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirm_password}
                onChange={(e) => setconfirm_password(e.target.value)}
                onFocus={() => setActiveStep(5)}
                className="w-full text-sm bg-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => setShowconfirm_password(!showconfirm_password)}
                className="ml-2 text-gray-500"
              >
                {showconfirm_password ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-24">
            <div className="rounded-full border p-1 border-[#89C8D9] bg-white shadow-sm">
              <button
                type="submit"
                className="flex items-center pl-1 w-[200px] h-[42px] rounded-full bg-[#89C8D9] text-[#08374e] font-bold hover:bg-[#08374e] hover:text-white transition-all duration-300 group"
              >
                <div className="w-[34px] h-[34px] flex items-center justify-center rounded-full bg-[#2C7A8C] text-white shadow-sm">
                  <FaArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
                <span className="flex-1 text-center pr-2">Create Account</span>
              </button>
            </div>
          </div>
        </form>

        <p className="text-sm mt-8 text-gray-500 flex items-center justify-center gap-2">
          Have an account?
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
            className="text-[#19718A] font-black hover:underline cursor-pointer ml-1"
          >
            LOGIN
          </button>
        </p>
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
    <div className="min-h-screen flex items-center justify-center bg-[#A9CCDF] relative overflow-hidden px-4">
      {innerContent}
    </div>
  );
}
