import heart from "../../assets/heart.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dentist from "../../assets/dentist.png";
import gastro from "../../assets/gastro.png";
import brain from "../../assets/brain.png";
import ortho from "../../assets/ortho.png";
import liver from "../../assets/liver.png";
import renal from "../../assets/renal.png";
import gyno from "../../assets/gyno.png";
import child from "../../assets/child.png";
import Finallogin from "../Login-hospital/Finallogin";
import Signup1 from "../Signup-hospital/Signup1";
import Forget from "../Login-hospital/Forget";
import Otp from "../Login-hospital/Otp";
import New_pass from "../Login-hospital/New_pass";
import Logout from "../Login-hospital/Logout";

const MainPage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgetModal, setShowForgetModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showNewPassModal, setShowNewPassModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  return (
    <div className="font-sans text-gray-800 overflow-x-hidden w-full">
      {/* Navbar */}
      <section className="relative overflow-hidden ">
        {/* Background Image */}


        {/* Navbar */}
        <header className="relative flex items-center justify-between px-8 py-2.5 bg-[#19718A] border-b border-white/30">

          {/* Empty Left Space (Balance Maintain Karne Ke Liye) */}
          <div className="w-[280px]"></div>

          {/* CENTER NAVIGATION */}
          <nav className="absolute left-[420px] xl:left-[460px] text-[18px] -translate-x-1/2 hidden lg:flex items-center gap-10 xl:gap-[60px]">
            {["Home", "About", "Our Service", "Doctor", "FAQ"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === "Home") navigate("/MainPage");
                  else if (item === "Our Service") navigate("/Service");
                  else navigate(`/${item.replace(/\s+/g, "")}`);
                }}
                className={`relative text-white font-medium tracking-wide transition-colors duration-300 hover:text-gray-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white after:transition-all after:duration-300 ${item === "Home" ? "after:w-full" : "after:w-0 hover:after:w-full"}`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* RIGHT SECTION (Icons + Contact) */}
          <div className="flex items-center justify-end w-full lg:w-auto lg:mr-8 xl:mr-16">

            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              <div className="w-px h-6 bg-white/40"></div>

              <button className="p-2 hover:bg-[#0C6173] rounded-full transition-all duration-300">
                <img src="/assets/search.svg" alt="Search" className="w-5 h-5 invert" />
              </button>

              <div className="w-px h-6 bg-white/40"></div>

              <button className="p-2 hover:bg-[#0C6173] rounded-full transition-all duration-300">
                <img src="/assets/Bell.png" alt="Bell" className="w-5 h-5 invert" />
              </button>

              <button
                onClick={() => navigate("/ContactUs")}
                className="border-[1.2px] border-white text-white px-5 py-1.5 rounded-full font-bold text-sm transform transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Contact Us
              </button>

              {/* Authentication Buttons */}
              <div className="flex items-center text-white/90 text-[14px] font-medium ml-6 xl:ml-10 bg-[#0C6173]/60 px-5 py-1.5 rounded-full border border-white/20 shadow-inner">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="hover:text-white hover:scale-105 transition-all duration-300"
                >
                  Log in
                </button>
                <div className="w-[1.5px] h-3.5 bg-white/40 mx-4"></div>
                <button
                  onClick={() => setShowSignupModal(true)}
                  className="hover:text-white hover:scale-105 transition-all duration-300"
                >
                  Sign up
                </button>
              </div>
            </div>

            {/* Hamburger for mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 ml-1 text-white hover:bg-white/10 rounded-md border border-white/30 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
          </div>

        </header>

        {/* MOBILE MENU SIDEBAR (OVERLAP) */}
        {/* Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}

        {/* Sidebar Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-[280px] bg-[#19718A] z-[70] transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col py-6 px-6 shadow-2xl ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Close Button Inside Drawer */}
          <div className="flex justify-end mb-8 pb-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 text-white hover:bg-white/10 rounded-md transition-colors border border-white/30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col space-y-6 flex-1">
            <button onClick={() => { navigate("/MainPage"); setIsMobileMenuOpen(false); }} className="text-white font-medium hover:text-gray-300 text-left text-[18px]">Home</button>
            <button onClick={() => { navigate("/About"); setIsMobileMenuOpen(false); }} className="text-white font-medium hover:text-gray-300 text-left text-[18px]">About</button>
            <button onClick={() => { navigate("/Service"); setIsMobileMenuOpen(false); }} className="text-white font-medium hover:text-gray-300 text-left text-[18px]">Our Service</button>
            <button onClick={() => { setIsMobileMenuOpen(false); }} className="text-white font-medium hover:text-gray-300 text-left text-[18px]">Doctor</button>
            <button onClick={() => { setIsMobileMenuOpen(false); }} className="text-white font-medium hover:text-gray-300 text-left text-[18px]">FAQ</button>
          </div>

          <div className="flex gap-6 mt-auto pt-6 border-t border-white/20 justify-center">
            <button className="p-3 hover:bg-[#0C6173] rounded-full transition-all duration-300">
              <img src="/assets/search.svg" alt="Search" className="w-5 h-5 invert" />
            </button>
            <button className="p-3 hover:bg-[#0C6173] rounded-full transition-all duration-300">
              <img src="/assets/Bell.png" alt="Bell" className="w-5 h-5 invert" />
            </button>
          </div>

          <button
            onClick={() => { navigate("/ContactUs"); setIsMobileMenuOpen(false); }}
            className="border-[1.2px] border-white text-white px-8 py-3 rounded-full font-bold transform transition-all duration-300 hover:scale-105 mt-6 text-[16px] w-full"
          >
            Contact Us
          </button>
        </div>

      </section>



      {/* hero */}
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative bg-cover bg-[right_70%] bg-no-repeat pt-10 "
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('/assets/hero2.jpg')",
          backgroundPosition: "center -25px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}

      >

        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 pb-20 grid md:grid-cols-2 gap-12">

          {/* LEFT CONTENT */}
          <div className="-mt-10">
            <p className="text-gray-600 text-[16px] mb-2  ">
              We are here for you
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-snug md:leading-[75px] text-black mt-2">
              What Makes Us <br />
              Better, Makes <br />
              You Better.
            </h1>

            <p className="text-gray-500 text-[16px] max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <a href="/Makeapp">
              <button className="mt-8 bg-[#19718A] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#0C6173] transition-all duration-300">
                Make Appointment
              </button>
            </a>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center mt-10 md:mt-0">
            <img
              src="/assets/hero2.png"
              alt="Doctor"
              className="relative md:-top-12 h-[350px] md:h-[600px] w-auto lg:mr-40"
            />

            {/* Floating Cards */}
            <div className="absolute top-[10px] md:top-[20px] right-[5%] sm:right-[10%] md:right-[10%] lg:right-[60px] bg-[#ACD0D6] pr-[20px] sm:pr-[40px] md:pr-[60px] pl-[10px] py-[8px] md:py-[11px] rounded-xl shadow-lg flex items-center scale-75 sm:scale-90 md:scale-100 origin-right">
              {/* Icon */}
              <img
                src="/assets/but.png"
                alt="icon"
                className="w-5 md:w-6 h-5 md:h-6 object-contain ml-1"
              />
              {/* 20k */}
              <span className="text-xl md:text-3xl font-bold text-black leading-none ml-2">
                20k
              </span>
              {/* reviews */}
              <span className="text-sm md:text-base text-gray-700 lowercase ml-2 md:ml-6 whitespace-nowrap">
                reviews
              </span>
            </div>

            <div className="absolute top-[60px] md:top-[86px] right-0 sm:right-[5%] md:right-[5%] lg:-right-[10px] bg-[#ACD0D6] pr-[20px] sm:pr-[30px] md:pr-[50px] pl-[10px] py-[8px] md:py-[11px] rounded-xl shadow-lg flex items-center scale-75 sm:scale-90 md:scale-100 origin-right">
              {/* Icon */}
              <img
                src="/assets/but.png"
                alt="icon"
                className="w-5 md:w-6 h-5 md:h-6 object-contain ml-1"
              />
              {/* 20k */}
              <span className="text-xl md:text-3xl font-bold text-black leading-none ml-2">
                20k
              </span>
              {/* reviews */}
              <span className="text-sm md:text-base text-gray-700 lowercase ml-2 md:ml-6 whitespace-nowrap">
                reviews
              </span>
            </div>

            <div className="absolute top-[110px] md:top-[166px] right-0 md:right-0 lg:-right-[60px] bg-[#ACD0D6] pr-[10px] sm:pr-[30px] md:pr-[50px] pl-[5px] md:pl-0 py-[8px] md:py-[11px] rounded-xl shadow-lg flex items-center scale-75 sm:scale-90 md:scale-100 origin-right">
              {/* Icon */}
              <img
                src="/assets/but.png"
                alt="icon"
                className="w-5 md:w-6 h-5 md:h-6 object-contain ml-1 md:ml-2"
              />
              {/* 100+ */}
              <span className="text-xl md:text-3xl font-bold text-black leading-none ml-2">
                100+
              </span>
              {/* reviews */}
              <span className="text-sm md:text-base text-gray-700 lowercase ml-2 md:ml-6 whitespace-nowrap">
                Happy Client
              </span>
            </div>
          </div>
        </div>

        {/* BOOKING BAR */}
        <div className="relative -mt-10 lg:-mt-48 z-10 bg-[#19718A] py-6 md:py-8 px-4 md:px-10 max-w-7xl mx-4 xl:mx-auto rounded-xl shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <input type="text" placeholder="Enter Your Name" className="px-4 md:px-5 py-3 rounded-lg outline-none w-full text-[14px] md:text-[16px]" />
            <input type="text" placeholder="Select Your Location" className="px-4 md:px-5 py-3 rounded-lg outline-none w-full text-[14px] md:text-[16px]" />
            <input type="text" placeholder="Select Services" className="px-4 md:px-5 py-3 rounded-lg outline-none w-full text-[14px] md:text-[16px]" />
            <button className="bg-green-500 text-white font-semibold rounded-lg py-3 hover:bg-green-600 transition-all text-[14px] md:text-[16px]">
              BOOK NOW
            </button>
          </div>
        </div>

      </section>




      {/* ================= SPECIALITIES SECTION ================= */}
      <section className="w-full md:w-10/12 mx-auto mt-16 mb-20 px-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {[
            { img: heart, title: "Cardiac Care", desc: "Heart Health Care" },
            { img: dentist, title: "Dentistry", desc: "Dental Care Solutions" },
            { img: gastro, title: "Gastroscience", desc: "Digestive Health Care" },
            { img: brain, title: "Neuroscience", desc: "Brain & Nerve Care" },
            { img: ortho, title: "Orthopedics", desc: "Bone & Joint Care" },
            { img: liver, title: "Liver Care", desc: "Liver Transparent & Health Care" },
            { img: renal, title: "Renal Care", desc: "Kidney Healthy Treatment" },
            { img: gyno, title: "Gynaecology", desc: "Gynaecological Care Solution" },
            { img: child, title: "Paediatric Care", desc: "Child Health Services" },
          ]

            .map((item, index) => (
              <div
                key={index}
                className="group bg-white p-6 rounded-2xl shadow-md border border-transparent
        hover:border-[#088395] transition-all duration-500
        hover:-translate-y-2 hover:shadow-xl cursor-pointer w-full min-h-[110px]"
              >
                <div className="flex items-center gap-4">

                  <div className="relative w-12 h-12">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-contain transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#C8D9E2]/30 blur-md opacity-0 group-hover:opacity-100 transition duration-500 rounded-full"></div>
                  </div>

                  <div>
                    <h4 className="font-bold text-[20px] text-[#061953] group-hover:text-[#19718A] transition">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-[16px]">
                      {item.desc}
                    </p>
                  </div>

                </div>
              </div>
            ))}

        </div>

        <div className="flex justify-center mt-12">
          <button className="bg-[#19718A] text-white px-12 py-3 rounded-full font-medium 
    transition duration-500 hover:bg-[#088395] hover:scale-105 shadow-md">
            View All Specialities
          </button>
        </div>

      </section>


      {/* ==================== Diseases & Conditions Section ===================== */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 mt-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">

          {/* LEFT SIDE IMAGE */}
          <div className="w-full flex justify-center md:justify-start">
            <img
              src="/assets/side.png"
              alt="Doctor Image"
              className="w-full max-w-[380px] object-cover rounded-tl-[40px] rounded-tr-[40px] rounded-bl-[40px] rounded-br-[100px] shadow-lg"
            />
          </div>

          {/* RIGHT SIDE SEARCH AREA */}
          <div className="flex flex-col">
            <h2 className="text-[28px] md:text-[34px] font-bold text-black mb-1 leading-tight">
              Search <span className="text-[#19718A]">Diseases</span> & <span className="text-[#19718A]">Conditions</span> of Patients
            </h2>
            <p className="text-gray-500 text-[15px] mb-8">
              Find Diseases & conditions by first letter or full name
            </p>

            {/* A–Z Buttons */}
            <div className="grid grid-cols-7 gap-y-4 gap-x-2 w-full max-w-[400px] mb-8">
              {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                <button
                  key={letter}
                  className="w-10 h-10 md:w-[42px] md:h-[42px] rounded-full border-[1.5px] border-[#19718A] text-[#19718A] font-bold text-[18px] flex items-center justify-center hover:bg-[#19718A] hover:text-white transition-all mx-auto"
                >
                  {letter}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="w-full max-w-[450px]">
              <p className="text-gray-500 text-[14px] mb-2 font-medium">Search dieases & conditions</p>
              <div className="flex items-center w-full bg-white px-5 py-3 rounded-xl border border-[#A4C4CE] shadow-sm">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full outline-none text-gray-700 bg-transparent text-[16px]"
                />
                <button className="text-[#19718A] ml-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== Why Choose Us Section ===================== */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20 mt-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">

          {/* LEFT CONTENT */}
          <div className="md:w-1/2 flex flex-col">
            <h2 className="text-[32px] md:text-[36px] font-bold text-black mb-4">
              Why Choose Us
            </h2>

            <p className="text-gray-500 leading-relaxed text-[15px] max-w-[500px] mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>

            {/* Points */}
            <div className="flex flex-col gap-3 mb-8">
              {["Browse Our Website", "Choose Services", "Send Message"].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-[#088395]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-black font-extrabold text-[13px]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Button */}
            <div>
              <button className="bg-[#088395] text-white px-8 py-3 rounded text-[15px] font-semibold hover:bg-[#066a78] transition duration-300 shadow-md">
                Know More
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img
              src="/assets/doc.svg"
              alt="Doctor checking patient"
              className="w-full max-w-[550px] h-auto object-cover rounded-lg"

            />
          </div>

        </div>
      </section>


      <section className=" py-12 mt-3">
        <div className="max-w-7xl mx-auto text-center px-2">

          {/* ==== 3 Boxes in a Row ==== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">

            {[
              {
                name: "Robert Brown",
                text: "A positive statement from a satisfied customer about their experience with a product or service.",
                img: "/person2.png", // 👈 first image
                color: "#19718A",
                // font: "base",
              },

              {
                name: "Sarah Lee",
                text: "Excellent service! The staff was friendly, and the treatment was top-notch. Highly recommend!",
                img: "/person3.png", // 👈 second image
                color: "#399CAA",
              },
              {
                name: "Jenny Wilson",
                text: "Professional and caring team. I felt comfortable throughout my entire visit!",
                img: "/person4.png", // 👈 third image
                color: "#0F628E",
              },

            ].map((item, index) => (
              <div
                key={index}
                className="relative bg-white w-full h-[420px] max-w-sm p-12 shadow-lg rounded-2xl overflow-hidden
                     transition-all duration-500 ease-out transform hover:scale-110 hover:-translate-y-3
                     border-2 border-transparent"
              >





                {/* ==== Wavy Top Section ==== */}
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] h-[160px]">
                  <svg
                    className="relative block w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 500 160"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,80 C150,160 350,0 500,80 L500,0 L0,0 Z"
                      fill={item.color}
                    ></path>
                    <path
                      d="M0,100 C150,180 350,20 500,100 L500,0 L0,0 Z"
                      fill={item.color}
                      opacity="0.8"
                    ></path>
                  </svg>
                </div>

                {/* ==== Content ==== */}
                <div className="relative z-10 flex flex-col items-center mt-14">

                  {/* ==== Profile Image ==== */}
                  <div className="relative -mt-10">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-24 h-24 rounded-full border-4 border-white shadow-lg transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Decorative Icons */}
                  <div>
                    <img src="/assets/comma.png" alt="comma" className="absolute -left-8 -mt-10 w-7 h-7" />
                    <img src="/assets/comma1.png" alt="comma" className="absolute -right-8 -mt-10 w-7 h-7" />
                  </div>

                  <div>
                    <img src="/assets/circle.png" alt="circle" className="absolute -left-8 top-10 w-7 h-7" />
                    <img src="/assets/circle.png" alt="circle" className="absolute -right-8 top-10 w-7 h-7" />
                  </div>

                  {/* ==== Quote Box ==== */}
                  <div
                    className="relative px-1 pt-4 pb-1 -mx-5 border-l-[2px] border-r-[2px] border-b-[2px] rounded-b-2xl"
                    style={{ borderColor: item.color }}
                  >
                    <h3 className="text-[20px] font-semibold text-[#003366] mt-4">{item.name}</h3>
                    <p className="text-gray-600 text-[16px] italic leading-relaxed px-6">{item.text}</p>

                    <div className="flex justify-center text-yellow-400 text-lg tracking-widest mt-2">
                      ★★★★★
                    </div>

                    <div
                      className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-0 h-0"
                      style={{
                        borderLeft: "20px solid transparent",
                        borderRight: "20px solid transparent",
                        borderTop: `20px solid ${item.color}`,
                      }}
                    ></div>
                  </div>

                  {/* ==== Button ==== */}
                  <button
                    className="mt-4 text-white px-12 py-1.5 rounded-full transition-all duration-300"
                    style={{
                      background: `linear-gradient(to right, ${item.color}, ${item.color}cc)`,
                      boxShadow: `0 0 15px ${item.color}80`,
                    }}
                  >
                    More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Footer Section ===== */}
      <footer className="bg-[#19718A] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* === Logo + Description === */}
          <div className="flex flex-col items-start md:-mt-6">
            <img
              src="/assets/logo.png"
              alt="VaidyaGo Logo"
              className="w-48 md:w-56 mb-4 ml-[-12px] md:-ml-5"
            />

            <p className="text-[14px] leading-relaxed max-w-xs font-serif">
              Committed to compassionate care, advanced
              technology, and healthier lives serving
              Eastern U.P. with trust, excellence,
              and integrity since 1989.
            </p>
          </div>

          {/* === Quick Links === */}
          <div>
            <h4 className="text-[18px] font-semibold mb-4 font-serif">Quick Links</h4>
            <ul className="space-y-2 text-[16px] font-[400] font-serif">
              <li className="flex items-center gap-2 mb-4">
                <span className="text-white text-sm">▶</span>
                <button
                  onClick={() => navigate("/MainPage")}
                  className="hover:text-[#AEE8F5] transition-colors"
                >
                  Home
                </button>
              </li>

              <li className="flex items-center gap-2 font-serif mb-4">
                <span className="text-white text-sm">▶</span>
                <button
                  onClick={() => navigate("/About")}
                  className="hover:text-[#AEE8F5] transition-colors"
                >
                  About Us
                </button>
              </li>

              <li className="flex items-center gap-2 font-serif mb-4">
                <span className="text-white text-sm">▶</span>
                <button
                  onClick={() => navigate("/Service")}
                  className="hover:text-[#AEE8F5] transition-colors"
                >
                  Services
                </button>
              </li>

              <li className="flex items-center gap-2 font-serif">
                <span className="text-white text-sm">▶</span>
                <a href="#" className="hover:text-[#AEE8F5] transition-colors">Gallery</a>
              </li>
            </ul>
          </div>

          {/* === Our Services === */}
          <div>
            <h4 className="text-[18px] font-semibold mb-4 font-serif">Our Services</h4>
            <ul className="space-y-2 text-[16px] font-[400] font-serif mb-4">
              <li>Ayurvedic Treatment</li>
              <li>Herbal Consultation</li>
              <li>Health Care Programs</li>
            </ul>
          </div>

          {/* === Contact Us === */}
          <div>
            <h4 className="text-[18px] font-semibold mb-4 font-serif">Contact Us</h4>
            <ul className="space-y-3 text-[16px] font-[400]">

              <li className="flex items-center gap-2 font-serif mb-4">
                <img src="/assets/cl.png" alt="icon" className="w-4 h-4"></img>
                <span>+91 9879877801</span>
              </li>

              <li className="flex items-center gap-2 font-serif mb-4">
                <img src="/assets/pack.png" alt="icon" className="w-4 h-4"></img>
                <span>vaidyaGo24@gmail.com</span>

              </li>
              <li className="flex items-center gap-2 font-serif mb-4">
                <img src="/assets/pack.png" alt="icon" className="w-4 h-4"></img>
                <span>vaidyaGo247@gmail.com</span>

              </li>
              <li className="flex items-center gap-2 font-serif mb-4">
                <i className="fa fa-map-marker text-sm"></i>
                <img src="/assets/map.png" alt="icon" className="w-4 h-4"></img>
                <span>
                  xyz, xyz, Gorakhpur,<br />
                  Uttar Pradesh, 273015
                </span>
              </li>

              {/* ==== Social Icons ===== */}
              <li className="flex items-center gap-3 pt-2">
                <img src="/assets/you.png" className="w-5 cursor-pointer" />
                <img src="/assets/insta.png" className="w-5 cursor-pointer" />
                <img src="/assets/map1.png" className="w-5 cursor-pointer" />
                <img src="/assets/what.png" className="w-5 cursor-pointer" />
              </li>

            </ul>
          </div>
        </div>

        {/* === Bottom Line === */}

      </footer>

      {/* Render Modals */}
      {showLoginModal && (
        <Finallogin
          isModal={true}
          onClose={() => setShowLoginModal(false)}
          onSwitchToForget={() => {
            setShowLoginModal(false);
            setShowForgetModal(true);
          }}
        />
      )}

      {showSignupModal && (
        <Signup1
          isModal={true}
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
        />
      )}

      {showForgetModal && (
        <Forget
          isModal={true}
          onClose={() => setShowForgetModal(false)}
          onSwitchToLogin={() => {
            setShowForgetModal(false);
            setShowLoginModal(true);
          }}
        // Assuming we might need to handle OTP switch later, we can pass it if we make Otp.jsx a modal
        />
      )}

    </div>
  );
};

export default MainPage;
