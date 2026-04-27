import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import VerticalProgress1 from "./VerticalProgress1";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../baseUrl";

// import { FaUsersGear } from "react-icons/fa6";


export default function Admin_signup({ isModal, onClose }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showconfirm_password, setShowconfirm_password] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // form values
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [role, setRole] = useState("");


  // ================================
  //        HANDLE SIGNUP API
  // ================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🕵️ Debug: Request details check
      const fullUrl = `${BASE_URL}/accounts/api/admin/signup/`;
      console.log("Full Request URL:", fullUrl);
      console.log("Sending Payload:", { email, phone, password, confirm_password, role });

      // ✅ Send POST request to backend
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email,
          phone,
          password,
          confirm_password,
          role, // 🔑 Ab 'role' (Admin/Doctor) bhi backend ko jayega
        }),
      });

      // ✅ Try to parse JSON response
      let data = null;
      try {
        data = await response.json();
      } catch (err) {
        console.error("Failed to parse JSON:", err);
      }

      console.log("Backend response:", data);
      console.log("Status code:", response.status); // This comes directly from backend

      // ✅ Handle success
      if (response.status === 201) {
        // 🔐 Save token if backend sends it
        if (data?.token) {
          localStorage.setItem("token", data.token);
        }

        // ✅ Redirect admin to dashboard
        if (isModal && onClose) {
          onClose();
        } else {
          navigate("/Admin_dashboard1");
        }
      }
      // ✅ Handle validation errors (like email already exists or password mismatch)
      else if (response.status === 400) {
        // Show backend error message if available
        alert(data?.message || JSON.stringify(data));
      }
      // ✅ Handle unauthorized or other errors
      else if (response.status === 401) {
        alert("Unauthorized access. Please check your credentials.");
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
      <div className="flex flex-col items-center justify-start mr-3 ml-[21px] mt-[61px] relative z-10">
        <VerticalProgress1 activeStep={activeStep} />
      </div>

      {/* FORM UI */}
      <div className="flex-1 flex flex-col items-center relative z-10 pt-[60px] px-8 pb-6">

        {/* FORM START */}
        <form onSubmit={handleSubmit} className="w-full space-y-2">

          {/* Username */}
          <div>
            <label className="flex items-center text-[14px] font-medium">
              {/* <FaUsersGear className="mr-2 text-xl" /> */}
              User Type
            </label>

            <div
              className="flex items-center rounded-md px-3 py-2"
              style={{
                border: "2px solid #19718A",
                boxShadow: "2px 2px 4px rgba(80,78,78,0.6)",
              }}
            >
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`w-full bg-transparent text-[16px] outline-none ${role === "" ? "text-gray-400" : "text-black"
                  }`}
              >
                <option value="" disabled>
                  Select User Type
                </option>
                <option value="Admin">Admin</option>
                <option value="Doctor">Doctor</option>

              </select>

            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-[14px] font-medium">Email</label>
            <div
              className="flex items-center rounded-md px-3 py-2"
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
                onFocus={() => setActiveStep(2)}
                className="w-full bg-transparent text-[16px] outline-none"
              />
            </div>
          </div>
          {/* call */}
          <div>
            <label className="text-sm font-medium">Phone Number</label>

            <div
              className="flex items-center rounded-md px-3 py-2"
              style={{
                border: phoneError ? "2px solid red" : "2px solid #19718A",
                boxShadow: "2px 2px 4px rgba(80,78,78,0.6)",
              }}
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
                className="w-full bg-transparent text-[16px] outline-none"
              />

            </div>

            {phoneError && (
              <p className="text-[12px] text-red-500 mt-1">{phoneError}</p>
            )}
          </div>


          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div
              className="flex items-center rounded-md px-3 py-2"
              style={{
                border: "2px solid #19718A",
                boxShadow: "2px 2px 4px rgba(80,78,78,0.6)",
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setActiveStep(4)}
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

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <div
              className="flex items-center rounded-md px-3 py-2"
              style={{
                border: "2px solid #19718A",
                boxShadow: "2px 2px 4px rgba(80,78,78,0.6)",
              }}
            >
              <input
                type={showconfirm_password ? "text" : "password"}
                placeholder="Re-type Password"
                value={confirm_password}
                onChange={(e) => setconfirm_password(e.target.value)}
                onFocus={() => setActiveStep(5)}
                className="w-full text-[16px] bg-transparent outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  setShowconfirm_password(!showconfirm_password)
                }
                className="ml-2 text-gray-500"
              >
                {showconfirm_password ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.03 }}>
            <div className="flex justify-center mt-3">
              <div className="rounded-full border p-1 border-[#89C8D9] bg-white">
                <button
                  type="submit"
                  className="flex items-center pl-1 w-[186px] h-[37px] rounded-full bg-[#89C8D9] text-[#164863] font-semibold text-[16px] hover:bg-[#08374e] hover:text-white transition"
                >
                  <div className="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-[#2C7A8C] text-white">
                    <FaArrowRight size={20} />
                  </div>
                  <span className="flex-1 text-center">Create Account</span>
                </button>
              </div>
            </div>
          </motion.div>
        </form>

        <p className="text-[14px] mt-2 text-gray-600">
          Have an account?{" "}
          <Link
            to="/AdminLoginPage"
            onClick={() => isModal && onClose && onClose()}
            className="text-black font-semibold hover:underline"
          >
            LOGIN
          </Link>
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
