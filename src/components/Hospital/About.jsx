import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Finallogin from "../Login-hospital/Finallogin";
import Signup1 from "../Signup-hospital/Signup1";
import Forget from "../Login-hospital/Forget";
import { ArrowRight, Activity } from "lucide-react";

const Hero1 = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgetModal, setShowForgetModal] = useState(false);
  return (
    <div className="font-sans text-gray-800 overflow-x-hidden w-full">

      {/* ================= HERO SECTION ================= */}
      <section className="relative pb-0.4">

        {/* Background Image */}
        <img
          src="/assets/bbg.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        {/* ---------------- NAVBAR ---------------- */}
        <section className="relative overflow-hidden ">
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
                  className={`relative text-white font-medium tracking-wide transition-colors duration-300 hover:text-gray-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white after:transition-all after:duration-300 ${item === "About" ? "after:w-full" : "after:w-0 hover:after:w-full"}`}
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

        {/* ---------------- HERO SECTION ---------------- */}
        <div className="relative flex flex-col md:flex-row items-center justify-center px-6 md:px-12 pt-6 md:pt-10">

          {/* Background Decorative Bubble Circles */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute left-[-50px] md:left-[-100px] top-1/3 w-40 md:w-72 h-40 md:h-72 bg-white/15 rounded-full blur-2xl border border-white/20"></div>
            <div className="absolute right-[-60px] md:right-[-120px] top-10 w-48 md:w-96 h-48 md:h-96 bg-white/10 rounded-full blur-2xl border border-white/10"></div>
            <div className="absolute right-[-40px] md:right-[-80px] bottom-0 w-40 md:w-80 h-40 md:h-80 bg-white/15 rounded-full blur-2xl border border-white/20"></div>
          </div>

          {/* Big Logo */}
          <h1 className="absolute text-[4rem] sm:text-[7rem] md:text-[11rem] font-[Playfair Display] font-extrabold text-[#08334A] opacity-90 z-0 select-none top-[18%] md:top-[12%] left-1/2 -translate-x-1/2 w-[90%] md:w-auto text-center">
            <img src="/assets/VADYAGO.png" alt="VADYAGO" className="w-full max-w-[990px] h-auto mx-auto" />
          </h1>

          {/* Doctor Image */}
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            src="/assets/bbg1.svg"
            alt="Doctor"
            className="relative z-10 w-[260px] sm:w-[310px] md:w-[320px] drop-shadow-2xl md:-mr-[95px] -mt-2 md:-mt-10 mx-auto md:mx-0"
          />

          {/* Left Text */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute left-4 sm:left-10 md:left-24 top-[20%] md:top-[50%] -translate-y-1/2 max-w-lg z-20 text-center md:text-left w-[90%] md:w-auto"
          >
            <h2 className="text-[20px] md:text-[24px] mt-0 md:-mt-16 font-extrabold text-[#08334A] leading-snug">
              Premium Treatments <br className="hidden md:block" /> for a Healthy Lifestyle
            </h2>
            <p className="text-[14px] md:text-[1rem] text-[#0E4056] font-semibold mt-2">
              Leading Integrated Healthcare <br className="hidden md:block" /> Services Provider in India.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ================= WHITE AREA BELOW HERO ================= */}
      <div className="h-9 bg-white"></div>

      {/* ===================================================== */}
      {/*               WHITE BOX + FLOATING CARDS              */}
      {/* ===================================================== */}

      <div className="w-full relative md:absolute flex justify-center mt-10 md:mt-0 md:mb-[100px] px-4 z-20">

        {/* Big White Box */}
        <div className="hidden md:flex absolute top-[-200px] bg-white rounded-3xl shadow-xl border border-red-200 h-[270px] w-full max-w-[920px] z-10"></div>

        {/* Floating Cards */}
        <div className="md:absolute md:top-[-182px] flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 w-full z-20">

          {/* --- Appointment --- */}
          <div className="w-full max-w-[260px] h-auto min-h-[230px] bg-[#FEF4AB] shadow-lg rounded-2xl p-6 text-center border border-[#F3EFA4]">
            <img src="/assets/app.png" className="w-12 mx-auto mb-1" />
            <h3 className="text-[20px] font-bold text-black">Appointment</h3>
            <p className="text-[14px] text-black mt-1">
              Book online appointment and get <br /> consultation to doctors
            </p>
            <button className="mt-4 w-full bg-white border border-[#FEF4AB] py-2 rounded-full font-semibold text-black text-[16px] hover:bg-gray-50 transition-colors">
              Make Appointment
            </button>
          </div>

          {/* --- Emergency --- */}
          <div className="w-full max-w-[260px] h-auto min-h-[230px] bg-[#399CAA] shadow-lg rounded-2xl p-6 text-center border border-[#A5DDE0]">
            <img src="/assets/light.png" className="w-12 mx-auto mb-1" />
            <h3 className="text-[20px] font-bold text-black">Emergency</h3>
            <p className="text-[14px] text-black mt-1">
              Call for Emergency <br /> +91 XXXXXXXXXX
            </p>
            <button className="mt-4 w-full bg-[#A9D3D9] border border-[#A9D3D9] py-2 rounded-full font-semibold text-black text-[16px] hover:bg-[#98C2C8] transition-colors">
              Call Now
            </button>
          </div>

          {/* --- Doctors --- */}
          <div className="w-full max-w-[260px] h-auto min-h-[230px] bg-[#FEC0AB] shadow-lg rounded-2xl p-6 text-center border border-[#F5C8B5]">
            <img src="/assets/pe.png" className="w-12 mx-auto mb-1" />
            <h3 className="text-[20px] font-bold text-black">Emergency</h3>
            <p className="text-[14px] text-black mt-1">
              Best doctor of every department
            </p>
            <button className="mt-10 w-full bg-[#FFDACE] border border-[#EBC2B0] py-2 rounded-full font-semibold text-black text-[16px] hover:bg-[#EEC9BF] transition-colors">
              Doctors
            </button>
          </div>
        </div>
      </div>


      {/* Department Category Section */}
      <section className="w-auto mx-auto mt-32 text-center">
        {/* Top Bar with Buttons */}
        <div className="flex justify-center items-center mb-8">


          <h2 className="text-[30px] font-bold tracking-[0.4em] text-gray-400 uppercase">
            DEPARTMENTS
          </h2>


        </div>

        {/* Icon Boxes */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-[100px]">
          {/* Box 1 - Liver */}
          <div className="w-28 h-28 flex justify-center items-center bg-white border rounded-md shadow-sm hover:shadow-md transition-all border-gray-300">
            <img src="/assets/liver.png" alt="Liver" className="w-20 h-20 p-2 object-contain" />
          </div>

          {/* Box 2 - Joint */}
          <div className="w-28 h-28 flex justify-center items-center bg-white border rounded-md shadow-sm hover:shadow-md transition-all border-gray-300">
            <img src="/assets/ortho.png" alt="Joint" className="w-20 h-20 object-contain p-2" />
          </div>

          {/* Box 3 - Tooth */}
          <div className="w-28 h-28 flex justify-center items-center bg-white border rounded-md shadow-sm hover:shadow-md transition-all border-gray-300">
            <img src="/assets/pic1.png" alt="Tooth" className="w-20 h-20 object-contain p-2" />
          </div>

          {/* Box 4 - Heart */}
          <div className="w-28 h-28 flex justify-center items-center bg-white border rounded-md shadow-sm hover:shadow-md transition-all border-gray-300">
            <img src="/assets/Heart.png" alt="Heart" className="w-20 h-20 object-contain p-2" />
          </div>

          {/* Box 5 - Kidney */}
          <div className="w-28 h-28 flex justify-center items-center bg-white border rounded-md shadow-sm hover:shadow-md transition-all border-gray-300">
            <img src="/assets/renal.png" alt="Kidney" className="w-20 h-20 object-contain p-2" />
          </div>

          {/* Box 6 - Brain */}
          <div className="w-28 h-28 flex justify-center items-center bg-white border rounded-md shadow-sm hover:shadow-md transition-all border-gray-300">
            <img src="/assets/about.png" alt="Brain" className="w-20 h-20 object-contain p-2" />
          </div>
        </div>
      </section>


      {/* ================= MODERN HEALTHCARE SERVICES SECTION ================= */}
      <section className="w-full bg-[#F8FDFE] py-12 lg:py-16 relative overflow-hidden">

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E1F1F3]/40 rounded-full blur-[120px] -z-10 -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E1F1F3]/30 rounded-full blur-[100px] -z-10 -ml-20 -mb-20"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="flex flex-col lg:flex-row items-center justify-between mb-12 gap-10">
            {/* Left Content */}
            <div className="lg:w-1/2 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full text-[#19718A] font-bold text-[12px] tracking-wide uppercase">
                <span className="w-2 h-2 bg-[#19718A] rounded-full"></span>
                Our Services
              </div>
              <h2 className="text-[32px] md:text-[46px] font-bold text-[#0E4056] leading-[1.15] font-serif">
                World-Class Healthcare <br className="hidden md:block" /> For You & Your Family
              </h2>
              <p className="text-gray-600 text-[16px] max-w-xl leading-relaxed">
                Experience medical excellence with our state-of-the-art facilities and a dedicated team
                committed to your well-being.
              </p>
              <button
                onClick={() => navigate("/Service")}
                className="bg-[#19718A] text-white px-8 py-3 rounded-full shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-3 font-bold text-[16px] group"
              >
                More Service
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            {/* Right Image Composition */}
            <div className="lg:w-1/2 relative flex justify-center lg:justify-end">
              <div className="relative z-10 rounded-[1.5rem] overflow-hidden shadow-lg">
                <img
                  src="/assets/more.png"
                  alt="Healthcare Excellence"
                  className="w-full max-w-[450px] h-auto object-cover transform hover:scale-105 transition-transform duration-1000"
                />
              </div>
              {/* Floating Stat Card */}
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-20 hidden md:block border border-gray-50">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                    <Activity className="text-[#19718A] w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-[28px] font-bold text-[#0E4056] leading-none">24/7</p>
                    <p className="text-gray-500 font-medium">Emergency Care</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Radiology",
                icon: "/assets/red.png",
                color: "bg-blue-50",
                text: "Precision imaging using X-rays, MRI, and ultrasound to diagnose complex conditions."
              },
              {
                title: "Emergency",
                icon: "/assets/lok.png",
                color: "bg-red-50",
                text: "Rapid-response critical care services available 24/7 for life-saving medical attention."
              },
              {
                title: "Laboratory",
                icon: "/assets/lab.png",
                color: "bg-emerald-50",
                text: "High-quality clinical testing providing precise results for accurate diagnosis and treatment."
              },
              {
                title: "Pharmacy",
                icon: "/assets/phar.png",
                color: "bg-amber-50",
                text: "Expert-led procurement and sterile preparation of essential medications for all patients."
              }
            ].map((service, idx) => (
              <div
                key={idx}
                className="group bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_60px_rgba(25,113,138,0.1)] hover:-translate-y-3 transition-all duration-500 cursor-pointer"
              >
                <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-[10deg] transition-transform duration-500`}>
                  <img src={service.icon} alt={service.title} className="w-8 h-8 object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-[#0E4056] mb-4">{service.title}</h3>
                <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
                  {service.text}
                </p>
                <div className="flex items-center text-[#19718A] font-bold text-sm uppercase tracking-wider group-hover:gap-2 transition-all">
                  Details <ArrowRight size={18} className="ml-2" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
      <div className="flex items-center w-full mt-[20px]">
        <div className="flex-1 h-[2px] bg-[#1c9bb2]"></div>

        <div className="-mx-1">
          <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
            <path d="M1 10H10L14 3L20 17L26 3L30 10H39"
              stroke="#1c9bb2" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="flex-1 h-[2px] bg-[#1c9bb2]"></div>
      </div>



      {/* ================= ABOUT US SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-32">

        <h2 className="text-[32px] font-bold text-black mb-8 font-serif">
          About Us
        </h2>

        <p className="text-gray-800 text-[16px] leading-relaxed mb-24 max-w-6xl">
          <span className="font-bold">VAIDYAGO HEALTHCARE</span> is a leading integrated healthcare
          delivery service provider in India. The healthcare verticals primarily comprise hospitals, diagnostics,
          and day care specialty facilities. Currently, the company operates 33 healthcare
          facilities across 11 states with over 5,700 operational beds and 400 diagnostics labs.
        </p>

        {/* Vision & Mission Cards Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-24 mt-10">

          {/* VISION CARD */}
          <div className="relative bg-[#D1E9F1]/40 rounded-2xl p-10 pt-20 shadow-sm border border-blue-100/50">
            {/* TOP CIRCLE ICON */}
            <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-32 h-32 bg-white rounded-full p-4 shadow-lg border border-gray-100 flex items-center justify-center">
              <img src="/assets/eye.png" alt="Vision" className="w-20 h-20 object-contain" />
            </div>
            <h3 className="text-center text-[28px] font-bold text-[#0E4056] mb-6">Vision</h3>
            <p className="text-gray-700 text-lg leading-relaxed text-center">
              To create a world-class integrated healthcare delivery system in India,
              entailing the finest medical skills combined with compassionate patient care.
            </p>
          </div>

          {/* MISSION CARD */}
          <div className="relative bg-[#FADBD8]/40 rounded-2xl p-10 pt-20 shadow-sm border border-red-100/50">
            {/* TOP CIRCLE ICON */}
            <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-32 h-32 bg-white rounded-full p-4 shadow-lg border border-gray-100 flex items-center justify-center">
              <img src="/assets/goal.png" alt="Mission" className="w-20 h-20 object-contain" />
            </div>
            <h3 className="text-center text-[28px] font-bold text-[#0E4056] mb-6">Mission</h3>
            <p className="text-gray-700 text-lg leading-relaxed text-center">
              To be a globally respected healthcare organisation known for
              Clinical Excellence and Distinctive Patient Care.
            </p>
          </div>

        </div>
      </section>


      {/* ================= KEY FEATURES SECTION ================= */}
      <section className="relative w-full max-w-7xl mx-auto px-6 py-24 lg:py-32 overflow-visible">

        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#E8F1F2]/30 blur-[100px] rounded-full -z-10"></div>

        <div className="text-center mb-20">
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#0E4056] font-serif mb-4">
            Smart Healthcare Features
          </h2>
          <div className="w-24 h-1 bg-[#19718A] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 items-start">

          {/* Column 1 */}
          <div className="flex flex-col gap-10">
            {/* AI Chat */}
            <div className="group bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_20px_60px_rgba(25,113,138,0.15)] transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#F0F7F9] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#19718A] transition-colors">
                <img src="/assets/ai1.png" alt="AI Chat" className="w-10 h-10 object-contain group-hover:invert group-hover:brightness-0 transition-all" />
              </div>
              <h3 className="text-2xl font-bold text-[#19718A] mb-3">AI Chat Assistant</h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                Instant support for health queries and seamless navigation through our hospital services using advanced AI.
              </p>
            </div>

            {/* Medicine Reminder */}
            <div className="group bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_20px_60px_rgba(25,113,138,0.15)] transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#F0F7F9] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#19718A] transition-colors">
                <img src="/assets/med1.png" alt="Medicine" className="w-10 h-10 object-contain group-hover:invert group-hover:brightness-0 transition-all" />
              </div>
              <h3 className="text-2xl font-bold text-[#19718A] mb-3">Medicine Reminder</h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                Smart medication tracking to ensure you never miss a dose, helping you stay on track with your recovery.
              </p>
            </div>
          </div>

          {/* Column 2 (Centered/Offset) */}
          <div className="flex flex-col gap-10 lg:mt-20">
            {/* Prescription Upload */}
            <div className="group bg-[#19718A] p-8 rounded-3xl shadow-[0_20px_50px_rgba(25,113,138,0.3)] border border-[#19718A] hover:shadow-[0_30px_70px_rgba(25,113,138,0.4)] transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <img src="/assets/pre1.png" alt="Prescription" className="w-10 h-10 object-contain invert brightness-0" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Prescription Upload</h3>
              <p className="text-blue-50 leading-relaxed text-[15px]">
                Quick and secure submission of your prescriptions for faster diagnostic processing and pharmacy services.
              </p>
            </div>

            {/* Voice Interaction */}
            <div className="group bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_20px_60px_rgba(25,113,138,0.15)] transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#F0F7F9] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#19718A] transition-colors">
                <img src="/assets/voice1.png" alt="Voice" className="w-10 h-10 object-contain group-hover:invert group-hover:brightness-0 transition-all" />
              </div>
              <h3 className="text-2xl font-bold text-[#19718A] mb-3">Voice Interaction</h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                Intuitive hands-free control and accessibility, allowing you to interact with our platform using simple voice commands.
              </p>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-10 lg:mt-0 lg:pt-40">
            {/* Book Appointment */}
            <div className="group bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_20px_60px_rgba(25,113,138,0.15)] transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#F0F7F9] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#19718A] transition-colors">
                <img src="/assets/book1.png" alt="Book" className="w-10 h-10 object-contain group-hover:invert group-hover:brightness-0 transition-all" />
              </div>
              <h3 className="text-2xl font-bold text-[#19718A] mb-3">Book Appointment</h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                Effortlessly schedule visits with our expert specialists, choosing the time and date that works best for you.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section className="w-full px-[2%] mt-[50px]">

        {/* HEADING */}
        <h2
          className="text-3xl font-bold text-center mb-10"
          style={{ color: "black", fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Our Facilities
        </h2>

        {/* GRID BOX */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 place-items-center">

          {/* 1 — Canteen */}
          <div
            className="group bg-white p-3 rounded-md shadow-md w-[260px] border border-[#A7C7D9]
hover:border-[#5DA7C2] transition-all duration-500 ease-out transform hover:-translate-y1 hover:scale-[1.02]
hover:shadow-[0_0_8px_rgba(93,167,194,0.3),0_0_16px_rgba(93,167,194,0.2)] cursor-pointer">
            {/* IMAGE WITH HOVER SCALE */}
            <div className="overflow-hidden rounded">
              <img
                src="/assets/canteen.png"
                alt="Canteen"
                className="w-full h-[170px] object-cover rounded transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>

            {/* TITLE */}
            <p className="text-center mt-3 font-semibold text-[#0e4056] text-[18px] transition-colors duration-300 group-hover:text-[#19718A]">
              Canteen
            </p>
          </div>

          <div
            className="group bg-white p-3 rounded-md shadow-md w-[260px] border border-[#A7C7D9]
hover:border-[#5DA7C2] transition-all duration-500 ease-out transform hover:-translate-y-1 hover:scale-[1.02]
hover:shadow-[0_0_8px_rgba(93,167,194,0.3),0_0_16px_rgba(93,167,194,0.2)] cursor-pointer"
          >
            <div className="overflow-hidden rounded">
              <img
                src="/assets/del.png"
                alt="Deluxe Room"
                className="w-full h-[170px] object-cover rounded transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>

            <p className="text-center mt-3 font-semibold text-[#0e4056] text-[18px] transition-colors duration-300 group-hover:text-[#19718A]">
              Deluxe Room
            </p>
          </div>

          <div
            className="group bg-white p-3 rounded-md shadow-md w-[260px] border border-[#A7C7D9]
hover:border-[#5DA7C2] transition-all duration-500 ease-out transform hover:-translate-y-1 hover:scale-[1.02]
hover:shadow-[0_0_8px_rgba(93,167,194,0.3),0_0_16px_rgba(93,167,194,0.2)] cursor-pointer">
            <div className="overflow-hidden rounded">
              <img
                src="/assets/nur.png"
                alt="Nursing Staff"
                className="w-full h-[170px] object-cover rounded transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>

            <p className="text-center mt-3 font-semibold text-[#0e4056] text-[18px] transition-colors duration-300 group-hover:text-[#19718A]">
              Nursing Staff
            </p>
          </div>

          <div
            className="group bg-white p-3 rounded-md shadow-md w-[260px] border border-[#A7C7D9]
hover:border-[#5DA7C2] transition-all duration-500 ease-out transform hover:-translate-y-1 hover:scale-[1.02]
hover:shadow-[0_0_8px_rgba(93,167,194,0.3),0_0_16px_rgba(93,167,194,0.2)] cursor-pointer"
          >
            <div className="overflow-hidden rounded">
              <img
                src="/assets/free.png"
                alt="Free Food"
                className="w-full h-[170px] object-cover rounded transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>

            <p className="text-center mt-3 font-semibold text-[#0e4056] text-[20px] transition-colors duration-300 group-hover:text-[#19718A]">
              Free Food for Patients
            </p>
          </div>

        </div>
      </section>


      <div className="h-9 bg-white"></div>


      {/* ===== Footer Section ===== */}
      <footer className="bg-[#19718A] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* === Logo + Description === */}
          <div className="flex flex-col items-start -mt-6">
            <img
              src="/assets/logo.png"
              alt="VaidyaGo Logo"
              className="w-56 mb-4 -ml-5"
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
        />
      )}
    </div>
  );
};

export default Hero1;
