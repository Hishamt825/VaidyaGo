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
const MainPage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="font-sans text-gray-800 overflow-x-hidden w-full">
      {/* Navbar */}
      <section className="relative overflow-hidden ">
        {/* Background Image */}


        {/* Navbar */}
        <header className="relative flex items-center justify-between px-8 py-1 bg-[#19718A] border-b border-white/30">

          {/* Empty Left Space (Balance Maintain Karne Ke Liye) */}
          <div className="w-[280px]"></div>

          {/* CENTER NAVIGATION */}
          <nav className="absolute left-[500px] text-[18px] -translate-x-1/2 hidden lg:flex items-center gap-[130px]">
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
          <div className="flex items-center gap-4 lg:gap-8 justify-end w-full lg:w-auto">
            
            <div className="hidden lg:flex items-center gap-8">
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
                className="border-[1.2px] border-white text-white px-7 py-1.5 rounded-full font-bold transform transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Contact Us
              </button>
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
          className={`fixed top-0 right-0 h-full w-[280px] bg-[#19718A] z-[70] transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col py-6 px-6 shadow-2xl ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
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
          backgroundImage: "url('/assets/hero2.jpg')",
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
            <div className="absolute top-[10px] md:top-[20px] right-[5%] sm:right-[10%] md:right-[20%] lg:right-[160px] bg-[#ACD0D6] pr-[20px] sm:pr-[40px] md:pr-[60px] pl-[10px] py-[8px] md:py-[11px] rounded-xl shadow-lg flex items-center scale-75 sm:scale-90 md:scale-100 origin-right">
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

            <div className="absolute top-[60px] md:top-[86px] right-0 sm:right-[5%] md:right-[10%] lg:right-[80px] bg-[#ACD0D6] pr-[20px] sm:pr-[30px] md:pr-[50px] pl-[10px] py-[8px] md:py-[11px] rounded-xl shadow-lg flex items-center scale-75 sm:scale-90 md:scale-100 origin-right">
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

            <div className="absolute top-[110px] md:top-[166px] right-0 md:right-0 lg:right-[30px] bg-[#ACD0D6] pr-[10px] sm:pr-[30px] md:pr-[50px] pl-[5px] md:pl-0 py-[8px] md:py-[11px] rounded-xl shadow-lg flex items-center scale-75 sm:scale-90 md:scale-100 origin-right">
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

      <section className="w-full md:w-10/12 mx-auto mt-10 ">

        {/* LEFT IMAGE + RIGHT SEARCH PANEL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">

          {/* LEFT SIDE IMAGE */}
          <div className="w-full h-full flex justify-center order-2 md:order-1">
            <img
              src="/assets/side.png"
              alt="Doctor Image"
              className="rounded-3xl w-full max-w-[500px] h-auto md:h-[600px] lg:h-[700px] object-cover shadow-md md:mb-20"
            />
          </div>

          {/* RIGHT SIDE SEARCH AREA */}
          <div className="flex flex-col items-center md:mr-10 lg:mr-20 order-1 md:order-2 px-4 md:px-0">

            <h2 className="text-2xl md:text-3xl font-normal text-center">
              Search <span className="font-bold text-[#19718A]">Diseases & Conditions</span>
              <br /> of Patients
            </h2>

            {/* A–Z Buttons */}
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-4 mt-6 w-full max-w-lg">
              {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                <button
                  key={letter}
                  className="w-12 h-12 md:w-16 md:h-16 border-2 border-[#19718A] rounded-full text-[#19718A] 
      font-bold text-xl md:text-3xl flex items-center justify-center mx-auto
      hover:bg-[#19718A] hover:text-white transition"
                >
                  {letter}
                </button>
              ))}
            </div>


            {/* Search Bar */}
            <div className="flex items-center w-full mt-6 bg-white shadow-md px-4 py-2 rounded-full border-2 mb-10">
              <input
                type="text"
                placeholder="Search"
                className="w-full outline-none text-gray-900 "
              />
              <button className="w-11 h-10 bg-[#19718A] rounded-full flex items-center justify-center hover:bg-[#088395] transition">
                <img src="/assets/white.png" alt="Search" className="w-6 h-6 " />
              </button>

            </div>
          </div>
        </div>
      </section>




      {/* Why Choose Us Section */}
      <section className="px-6 md:px-20 py-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">

          {/* LEFT CONTENT */}
          <div className="md:w-1/2 space-y-6">

            <h2 className="text-[30px] font-bold text-black">
              Why Choose Us
            </h2>

            <p className="text-gray-600 leading-relaxed text-[16px] max-w-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>

            {/* Points */}
            <div className="space-y-4 pt-4">
              {["Browse Our Website", "Choose Services", "Send Message"].map((item, index) => (
                <div key={index} className="flex items-center gap-4">

                  <div className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-[#19718A]">
                    <img src="/assets/tick.png" alt="tick" className="w-4 h-4" />
                  </div>

                  <span className="text-black font-medium text-[16px]">
                    {item}
                  </span>

                </div>
              ))}
            </div>

            {/* Button */}
            <button className="mt-6 bg-[#19718A] text-white px-8 py-3 rounded-md font-medium hover:bg-[#125E70] transition duration-300">
              Know More
            </button>

          </div>

          {/* RIGHT IMAGE */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/assets/doc.svg"
              alt="Doctor checking patient"
              className="w-full max-w-[500px] h-auto object-cover"
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

    </div>
  );
};

export default MainPage;
