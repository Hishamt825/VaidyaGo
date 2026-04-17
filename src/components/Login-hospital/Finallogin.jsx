import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../baseUrl";

const Finallogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // form states (same like signup)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ================================
  //        HANDLE LOGIN API
  // ================================
  const handleLogin = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${BASE_URL}/accounts/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            token: token,
          }),
        }
      );

      const data = await (async () => {
        try {
          return await response.json();
        } catch {
          return null;
        }
      })();

      console.log("Login Response:", data);
      console.log("Status Code:", response.status);


      if (response.status === 200) {

        if (data?.token) {
          localStorage.setItem("authToken", data.token);
        }
        if (data?.message) {
          alert(data.message);
        }
        // navigate("/Hero");
      }

    } catch (error) {
      console.error("Server error:", error);
    }
  };



  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   const token = localStorage.getItem("authToken"); // signup se token

  //   try {
  //     const response = await fetch(
  //       "https://tubajavedd.pythonanywhere.com/accounts/login/",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           // ❌ Authorization header hata diya
  //         },
  //         body: JSON.stringify({
  //           username,
  //           password,
  //           token: token, // ✅ Yaha body me token bhej rahe
  //         }),
  //       }
  //     );

  //     const data = await response.json();

  //     console.log("Response Data:", data);
  //     console.log("Response Status:", response.status);


  //       if (data?.token) {
  //         localStorage.setItem("authToken", data.token);
  //       }


  //   } catch (error) {
  //     console.error("Login Error:", error);
  //   }
  // };



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#A9CCDF] px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-2xl pt-[69px] px-8 w-[500px] h-[450px] flex flex-col items-center relative"
      >
        {/* Icon */}
        <div className="absolute -top-14 bg-[#19718A] p-4 rounded-full text-white h-[110px] w-[110px] flex items-center justify-center">
          <img src="/assets/Vector.svg" alt="user" className="w-14 h-14" />
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="w-full space-y-1">
          {/* Username */}
          <div className="mb-2">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <img src="/assets/user.svg" alt="User" className="w-6 h-6 mr-2" />
              Username
            </label>

            <div
              className="flex items-center rounded-md px-3 py-3"
              style={{
                border: "2px solid #19718A",
                boxShadow: "2px 2px 4px rgba(80,78,78,0.6)",
              }}
            >
              <input
                type="text"
                placeholder="Enter Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full text-sm bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
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

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center space-x-1">
              <input type="checkbox" />
              <span className="text-gray-600">Remember Me</span>
            </div>

            <Link to="/signup1" className="font-medium">
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
                  className="w-[120px] h-[40px] rounded-full bg-[#89C8D9] text-[#164863] text-lg font-semibold hover:bg-[#08374e] hover:text-white transition"
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
          <span className="px-2 text-gray-500 text-sm">or continue with</span>
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
            <span className="text-gray-700 font-medium">
              Continue with Google
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Finallogin;
