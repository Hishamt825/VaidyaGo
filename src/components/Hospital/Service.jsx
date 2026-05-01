import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Finallogin from "../Login-hospital/Finallogin";
import Signup1 from "../Signup-hospital/Signup1";
import Forget from "../Login-hospital/Forget";
import Otp from "../Login-hospital/Otp";
import New_pass from "../Login-hospital/New_pass";
import Logout from "../Login-hospital/Logout";
import {
  Search, Bell, Activity, Heart, Smile, Brain,
  Clock, ClipboardList, Stethoscope, Calendar,
  Sparkles, FileText, MapPin, Video, Camera,
  User, Users, Hospital, Smartphone, ArrowRight, ChevronLeft, ChevronRight,
  Phone, Mail, CalendarClock, Folder, Facebook, Twitter, Instagram, Youtube
} from "lucide-react";
import care from "../../assets/care.png";
import online from "../../assets/online.png";
import service from "../../assets/service.png";
import cardi from "../../assets/cardi.png";
import renal from "../../assets/renal.png";
import liver from "../../assets/liver.png";
import neuro from "../../assets/neuro.png";
import dental from "../../assets/dental.png";
import doctorsImg from "../../assets/illustrations/doctors.png";
import hospitalImg from "../../assets/illustrations/hospital.png";
import familyImg from "../../assets/illustrations/family.png";
// import { 
//   Search, Bell, Heart, Activity, Smile, Brain, Stethoscope, 
//   User, CalendarClock, Folder, ChevronLeft, ChevronRight 
// } from 'lucide-react';

const Service = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgetModal, setShowForgetModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showNewPassModal, setShowNewPassModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const servicesData = [
    {
      title: "Appointment",
      icon: <CalendarClock size={28} />,
      text: "An appointment is a phone number or an online service used to schedule a meeting or appointment.",
      btnText: "BOOK NOW",
      color: "#19718A"
    },
    {
      title: "AI symptom Checker",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="currentColor" strokeWidth="1.5" />
          <text x="50%" y="54%" dominantBaseline="central" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="bold">AI</text>
        </svg>
      ),
      text: "Type symptoms and check whats the problem is.",
      btnText: "find Dieases",
      color: "#19718A"
    },
    {
      title: "prescription",
      icon: <Folder size={28} />,
      text: "Upload your prescription and check and know whats the problem is?",
      btnText: "Upload",
      color: "#19718A"
    },
    {
      title: "Find Locations",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      ),
      text: "Location can refer to several things: a search term for icons of a map pin and text, a technical term for a single line of text in a recognized block.",
      btnText: "Location",
      color: "#19718A"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1 >= servicesData.length * 2 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? servicesData.length * 2 - 1 : prev - 1));
  };
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">

      {/* ======================= NAVBAR ======================= */}
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
                  else if (item === "Doctor") navigate("/Makeapp");
                  else navigate(`/${item.replace(/\s+/g, "")}`);
                }}
                className={`relative text-white font-medium tracking-wide transition-colors duration-300 hover:text-gray-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white after:transition-all after:duration-300 ${item === "Our Service" ? "after:w-full" : "after:w-0 hover:after:w-full"}`}
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
            <button onClick={() => { navigate("/Makeapp"); setIsMobileMenuOpen(false); }} className="text-white font-medium hover:text-gray-300 text-left text-[18px]">Doctor</button>
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





      {/* ======================= HERO SECTION ======================= */}
      <section
        className="relative w-full h-[460px] overflow-visible bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/service.png')" }}
      >
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-[#19718A]/80"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between px-6 md:px-20 pt-10 pb-24 overflow-visible">

          {/* Left Content */}
          <div className="md:w-1/2 text-black space-y-6 -ml-40 -mt-1 relative z-20">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              What Makes Us <br />
              Better, Makes <br />
              You Better.
            </h1>

            <p className="text-white max-w-md text-[16px] leading-relaxed">
              A “cardiac care” most commonly refers to an Advanced Cardiac Life
              Support (ACLS) or Cardiac Care Ambulance that transports patients
              with serious heart conditions.
            </p>
          </div>

          {/* Right Side */}
          <div className="md:w-1/2 relative flex justify-center md:justify-end mt-12 md:mt-0 h-[500px] overflow-visible">

            {/* Floating Badges */}
            <div className="absolute top-[18%] left-[5%] md:left-[45%] bg-white rounded-full pl-5 pr-1.5 py-1.5 shadow-2xl z-40 flex items-center gap-3 border border-white/50 backdrop-blur-sm transform hover:scale-110 transition-all duration-300">
              <span className="font-bold text-[#1a3a44] text-[15px] tracking-tight">Cardiac Care</span>
              <div className="w-9 h-9 rounded-full bg-rose-500 flex items-center justify-center shadow-inner">
                <img src={cardi} alt="" className="w-6 h-6 object-contain brightness-0 invert" />
              </div>
            </div>

            <div className="absolute top-[8%] right-[-60px] md:right-[-120px] bg-white rounded-full pl-1.5 pr-5 py-1.5 shadow-2xl z-40 flex items-center gap-3 border border-white/50 backdrop-blur-sm transform hover:scale-110 transition-all duration-300">
              <div className="w-9 h-9 rounded-full bg-[#19718A] flex items-center justify-center shadow-inner">
                <img src={renal} alt="" className="w-6 h-6 object-contain brightness-0 invert" />
              </div>
              <span className="font-bold text-[#1a3a44] text-[15px] tracking-tight">Renal Care</span>
            </div>

            <div className="absolute top-[32%] right-[-80px] md:right-[-150px] bg-white rounded-full pl-1.5 pr-5 py-1.5 shadow-2xl z-40 flex items-center gap-3 border border-white/50 backdrop-blur-sm transform hover:scale-110 transition-all duration-300">
              <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center shadow-inner">
                <img src={liver} alt="" className="w-6 h-6 object-contain brightness-0 invert" />
              </div>
              <span className="font-bold text-[#1a3a44] text-[15px] tracking-tight">Liver Care</span>
            </div>

            <div className="absolute top-[48%] left-[-15%] md:left-[32%] bg-white rounded-full pl-5 pr-1.5 py-1.5 shadow-2xl z-40 flex items-center gap-3 border border-white/50 backdrop-blur-sm transform hover:scale-110 transition-all duration-300">
              <span className="font-bold text-[#1a3a44] text-[15px] tracking-tight">Neuroscience</span>
              <div className="w-9 h-9 rounded-full bg-[#0C6173] flex items-center justify-center shadow-inner">
                <img src={neuro} alt="" className="w-6 h-6 object-contain brightness-0 invert" />
              </div>
            </div>

            <div className="absolute top-[60%] right-[-100px] md:right-[-180px] bg-white rounded-full pl-1.5 pr-5 py-1.5 shadow-2xl z-40 flex items-center gap-3 border border-white/50 backdrop-blur-sm transform hover:scale-110 transition-all duration-300">
              <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center shadow-inner">
                <img src={dental} alt="" className="w-6 h-6 object-contain brightness-0 invert" />
              </div>
              <span className="font-bold text-[#1a3a44] text-[15px] tracking-tight">Dentistry</span>
            </div>

            {/* Doctor Image */}
            <img
              src="/assets/bbg1.svg"
              alt="Doctor"
              className="absolute bottom-[45px] right-[-80px] z-50 h-[500px] object-contain pointer-events-none"
            />
          </div>
        </div>
      </section>

      {/* ======================= FEATURES SECTION ======================= */}
      <section className="relative -mt-24 z-40">
        <div className="max-w-6xl ml-4 md:ml-10 lg:ml-16 bg-white rounded-t-[60px] shadow-lg px-10 py-10">
          <div className="grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100">
                <img src={care} alt="24/7 care" className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-[18px]">24/7 Advanced Care</h4>
                <p className="text-gray-500 text-[14px]">Available Anytime Anywhere</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-100">
                <img src={online} alt="results online" className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-[18px]">Get Result Online</h4>
                <p className="text-gray-500 text-[14px]">Check Results Online</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-100">
                <img src={service} alt="services" className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-[18px]">Specialised Services</h4>
                <p className="text-gray-500 text-[14px]">Expert Care Services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= OUR SERVICES SECTION ======================= */}
      <section className="py-20 relative overflow-hidden bg-[#F8FAFB]">

        {/* Background Decorative Elements - Bubbles & Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated Large Blobs */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#E1F1F3] rounded-full blur-[120px] opacity-40"
          ></motion.div>

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -30, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#E6EEF8] rounded-full blur-[100px] opacity-30"
          ></motion.div>

          {/* Defined Bubbles (Circles) - Floating Effect */}
          <motion.div
            animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[5%] w-32 h-32 bg-gray-200/30 rounded-full blur-[2px]"
          ></motion.div>

          <motion.div
            animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] left-[15%] w-20 h-20 bg-[#CFE4E5]/40 rounded-full blur-sm"
          ></motion.div>

          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[35%] right-[5%] w-28 h-28 bg-[#8ABFCB]/20 rounded-full blur-md"
          ></motion.div>

          {/* New Extra Bubbles */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[50%] left-[50%] w-12 h-12 bg-[#19718A]/10 rounded-full"
          ></motion.div>

          <motion.div
            animate={{ y: [0, -40, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[10%] right-[20%] w-16 h-16 bg-blue-100/40 rounded-full border border-blue-200/20"
          ></motion.div>

          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute top-[5%] right-[30%] w-8 h-8 bg-[#8ABFCB]/30 rounded-full"
          ></motion.div>

          <motion.div
            animate={{ x: [-20, 20, -20] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[40%] left-[8%] w-10 h-10 bg-gray-300/20 rounded-full"
          ></motion.div>

          <motion.div
            animate={{ y: [0, 50, 0], rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[60%] right-[15%] w-36 h-36 border-2 border-dashed border-[#19718A]/10 rounded-full"
          ></motion.div>

          {/* Sparkle/Dot Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(#19718A 1.5px, transparent 1.5px)`, backgroundSize: '40px 40px' }}></div>

          {/* Noise Texture Overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>

          {/* Decorative Wavy SVG Shape */}
          <div className="absolute right-[-50px] top-[15%] opacity-10">
            <svg width="200" height="400" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 0C150 100 50 200 100 300C150 400 50 500 100 600" stroke="#19718A" strokeWidth="2" strokeDasharray="10 10" />
            </svg>
          </div>
        </div>

        {/* TITLE */}
        <div className="text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[36px] md:text-[42px] font-black text-black tracking-tight mb-2 uppercase">OUR SERVICES</h2>
            <p className="text-gray-600 text-[16px] font-medium max-w-xl mx-auto">we offer complete healthcare to individual with various health concern</p>
          </motion.div>
        </div>

        {/* SERVICE CARDS GRID */}
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative rounded-[32px] p-8 flex flex-col items-center shadow-[0_15px_35px_rgba(0,0,0,0.05)] border border-gray-200/50 bg-white/80 backdrop-blur-sm text-[#0B2132] transition-all duration-500 w-full h-[420px] hover:bg-[#8ABFCB] hover:border-[#8ABFCB] hover:-translate-y-3"
              >
                <h3 className="font-extrabold text-[22px] mb-6 text-center h-[60px] flex items-center group-hover:text-white transition-colors">{service.title}</h3>

                <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center mb-6 shrink-0 shadow-md bg-[#19718A] text-white group-hover:bg-white group-hover:text-[#19718A] transition-all duration-500">
                  {service.icon}
                </div>

                <p className="text-[14px] leading-relaxed mb-6 text-center flex-grow font-medium text-gray-500 group-hover:text-white/90 transition-all duration-500">
                  {service.text}
                </p>

                <button className="text-[16px] font-bold py-[12px] px-10 rounded-full bg-[#19718A] text-white transition-all w-max tracking-wide shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group-hover:bg-white group-hover:text-[#19718A]">
                  {service.btnText}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= FACILITIES SECTION ======================= */}
      <section className="relative py-12 overflow-hidden bg-white">

        {/* Background Decorative Wavy Lines */}
        <div className="absolute right-0 top-0 bottom-0 w-full h-full pointer-events-none opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,500 C200,300 400,700 600,500 C800,300 1000,700 1000,500 L1000,1000 L0,1000 Z" fill="#CFE4E5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* LEFT SIDE: Interactive Card & Decorative Elements */}
          <div className="w-full lg:w-3/5 relative flex items-center justify-center lg:justify-start">

            {/* Soft Background Shape behind card */}
            <div className="absolute -left-10 top-0 w-[450px] h-[400px] bg-[#E8F3F4] rounded-[40px] -z-10"></div>

            {/* Vertical Teal Line with Dot */}
            <div className="absolute left-[5%] md:left-[10%] top-[10%] bottom-[10%] w-[2px] bg-[#1a718a] z-20">
              <div className="absolute top-[60%] left-[-6px] w-3.5 h-3.5 bg-[#1a718a] rounded-full border-2 border-white"></div>
            </div>

            {/* Floating Expand Badge */}
            <div className="absolute left-[0%] md:left-[2%] top-[30%] w-14 h-14 bg-[#8ABFCB] rounded-xl flex items-center justify-center shadow-lg z-30 transform -translate-x-1/2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d4855" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </div>

            {/* MAIN CARD */}
            <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-teal-50/50 w-full max-w-md ml-12 md:ml-20 relative z-10">

              {/* Header with Circle Decoration */}
              <div className="flex items-center gap-3 mb-10 relative">
                <div className="absolute -left-4 -top-3 w-10 h-10 bg-[#A6D1D6] rounded-full opacity-60"></div>
                <h3 className="text-[22px] md:text-[24px] font-black text-black relative z-10 uppercase tracking-tight">Our Area of Facilities</h3>
              </div>

              {/* List of Items */}
              <ul className="space-y-6">
                {[
                  { name: "Doctor", icon: <Stethoscope size={20} className="text-[#19718A]" /> },
                  { name: "Upload prescription", icon: <Folder size={20} className="text-[#64A3E3]" /> },
                  { name: "Medicines Suggestion from AI", icon: <Heart size={20} className="text-[#E8926F]" /> },
                  { name: "Camera for OCR", icon: <Camera size={20} className="text-[#D94F4F]" /> },
                  { name: "Video Call Consultation", icon: <Video size={20} className="text-[#4081c7]" /> },
                  { name: "Book Appointment", icon: <CalendarClock size={20} className="text-pink-500" /> },
                  { name: "AI Symptom Checker", icon: <Brain size={20} className="text-[#19718A]" /> }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 group cursor-pointer hover:translate-x-2 transition-transform duration-300">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shadow-sm group-hover:bg-teal-50">
                      {item.icon}
                    </div>
                    <span className="text-[17px] font-bold text-gray-800 group-hover:text-[#19718A]">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE: Statistics */}
          <div className="w-full lg:w-2/5 flex flex-col gap-16 relative z-10">

            {/* Stat 1 */}
            <div className="relative">
              {/* Soft Blob behind text */}
              <div className="absolute -left-6 -top-2 w-28 h-12 bg-[#CFE4E5] rounded-full opacity-60 blur-sm -z-10"></div>
              <h3 className="text-[42px] font-black text-[#1a3a44] leading-none mb-4">100K+</h3>
              <p className="text-gray-700 text-[18px] font-medium leading-relaxed max-w-[280px]">
                Total number of Happy Client ,They get best experience
              </p>
            </div>

            {/* Divider */}
            <div className="w-48 h-[1.5px] bg-[#19718A] opacity-30"></div>

            {/* Stat 2 */}
            <div className="relative">
              {/* Soft Blob behind text */}
              <div className="absolute -left-6 -top-2 w-28 h-12 bg-[#CFE4E5] rounded-full opacity-60 blur-sm -z-10"></div>
              <h3 className="text-[42px] font-black text-[#1a3a44] leading-none mb-4">20K+</h3>
              <p className="text-gray-700 text-[18px] font-medium leading-relaxed max-w-[280px]">
                REVIEWS of clients who were happy by using this.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ======================= 3 REASONS TO CHOOSE US ======================= */}
      <section className="py-24 relative overflow-visible bg-[#F8FAFB]">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Blobs */}
          <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-[#E1F1F3] rounded-full opacity-40 blur-[100px]"></div>
          <div className="absolute bottom-[10%] left-[-5%] w-[350px] h-[350px] bg-[#D4E9EC] rounded-full opacity-30 blur-[80px]"></div>

          {/* LARGE TEAL BUBBLE (From Reference) */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[5%] left-[5%] w-[450px] h-[450px] bg-[#19718A]/15 rounded-full blur-3xl shadow-[inset_0_0_100px_rgba(25,113,138,0.2)]"
          ></motion.div>

          {/* DARK PILL SHAPE (From Reference) */}
          <motion.div 
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[30%] right-[5%] w-16 h-10 bg-[#19718A]/40 rounded-full blur-sm shadow-lg"
          ></motion.div>

          {/* Animated Bubbles */}
          <motion.div
            animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[10%] w-24 h-24 bg-gray-200/20 rounded-full blur-sm"
          ></motion.div>
          <motion.div
            animate={{ y: [0, 40, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] right-[15%] w-32 h-32 bg-[#8ABFCB]/10 rounded-full blur-md"
          ></motion.div>

          {/* Noise Overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
            <filter id="noiseFilter2">
              <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter2)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">

          {/* Left Title */}
          <div className="lg:w-2/5 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-[#19718A] font-bold text-[13px] tracking-widest uppercase mb-6">
                <span className="w-2 h-2 bg-[#19718A] rounded-full animate-pulse"></span>
                Why Choose VaidyaGo
              </div>
              <h2 className="text-[48px] md:text-[64px] font-black text-[#0B2132] leading-[1.05] tracking-tight mb-6">
                3 Reasons To <br />
                <span className="text-[#19718A] relative inline-block">
                  Choose Us
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="absolute -bottom-2 left-0 w-full h-3 text-[#8ABFCB]/60"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path d="M0,5 Q50,0 100,5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                  </motion.svg>
                </span>
              </h2>
              <p className="text-gray-500 text-[18px] font-medium max-w-md leading-relaxed mx-auto lg:mx-0">
                We provide medical excellence with a compassionate touch, ensuring your recovery is our top priority.
              </p>
            </motion.div>
          </div>

          {/* Right Graphical Area */}
          <div className="lg:w-3/5 relative h-[550px] w-full flex justify-center items-center overflow-visible">

            {/* Card 1: Professional Doctors */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -15, scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="absolute top-[0%] left-[5%] md:left-[10%] z-30"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] w-[240px] text-center border border-gray-300 hover:border-[#8ABFCB]/50 transition-all duration-500 group relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#19718A] text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform">1</div>
                <div className="mb-6 h-[110px] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                  <img src={doctorsImg} alt="Doctors" className="max-h-full object-contain mix-blend-multiply" />
                </div>
                <h3 className="font-extrabold text-[#0B2132] text-[20px] leading-tight">Professional <br /> Doctors</h3>
                <div className="mt-4 w-10 h-1 bg-[#8ABFCB] mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </motion.div>

            {/* Card 2: Patient Support */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -15, scale: 1.02 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute top-[20%] right-[0%] md:right-[5%] z-20"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] w-[240px] text-center border border-gray-300 hover:border-[#19718A]/30 transition-all duration-500 group relative">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#19718A] text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform">2</div>
                <div className="mb-6 h-[110px] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                  <img src={hospitalImg} alt="Support" className="max-h-full object-contain mix-blend-multiply" />
                </div>
                <h3 className="font-extrabold text-[#0B2132] text-[20px] leading-tight">24/7 Patient <br /> Support</h3>
                <div className="mt-4 w-10 h-1 bg-[#19718A] mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </motion.div>

            {/* Card 3: Specialised Services */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -15, scale: 1.02 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute bottom-[0%] left-[25%] md:left-[30%] z-30"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] w-[240px] text-center border border-gray-300 hover:border-[#8ABFCB]/50 transition-all duration-500 group relative">
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#19718A] text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform">3</div>
                <div className="mb-6 h-[110px] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                  <img src={familyImg} alt="Services" className="max-h-full object-contain mix-blend-multiply" />
                </div>
                <h3 className="font-extrabold text-[#0B2132] text-[20px] leading-tight">Specialised <br /> Services</h3>
                <div className="mt-4 w-10 h-1 bg-[#8ABFCB] mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </motion.div>

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
                  onClick={() => { navigate("/MainPage"); window.scrollTo(0, 0); }}
                  className="hover:text-[#AEE8F5] transition-colors"
                >
                  Home
                </button>
              </li>

              <li className="flex items-center gap-2 font-serif mb-4">
                <span className="text-white text-sm">▶</span>
                <button
                  onClick={() => { navigate("/About"); window.scrollTo(0, 0); }}
                  className="hover:text-[#AEE8F5] transition-colors"
                >
                  About Us
                </button>
              </li>

              <li className="flex items-center gap-2 font-serif mb-4">
                <span className="text-white text-sm">▶</span>
                <button
                  onClick={() => { navigate("/Service"); window.scrollTo(0, 0); }}
                  className="hover:text-[#AEE8F5] transition-colors"
                >
                  Services
                </button>
              </li>
              <li className="flex items-center gap-2 font-serif mb-4">
                <span className="text-white text-sm">▶</span>
                <button
                  onClick={() => { navigate("/FAQ"); window.scrollTo(0, 0); }}
                  className="hover:text-[#AEE8F5] transition-colors"
                >
                  FAQ
                </button>
              </li>

              <li className="flex items-center gap-2 font-serif">
                <span className="text-white text-sm">▶</span>
                <button
                  onClick={() => { navigate("/ContactUs"); window.scrollTo(0, 0); }}
                  className="hover:text-[#AEE8F5] transition-colors"
                >
                  Contact Us
                </button>
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
          onSwitchToSignup={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
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
          onSwitchToOtp={() => {
            setShowForgetModal(false);
            setShowOtpModal(true);
          }}
        />
      )}

      {showOtpModal && (
        <Otp
          isModal={true}
          onClose={() => setShowOtpModal(false)}
          onSwitchToNewPass={() => {
            setShowOtpModal(false);
            setShowNewPassModal(true);
          }}
          onSwitchToLogin={() => {
            setShowOtpModal(false);
            setShowLoginModal(true);
          }}
        />
      )}

      {showNewPassModal && (
        <New_pass
          isModal={true}
          onClose={() => setShowNewPassModal(false)}
          onSwitchToLogin={() => {
            setShowNewPassModal(false);
            setShowLoginModal(true);
          }}
          onSwitchToLogout={() => {
            setShowNewPassModal(false);
            setShowLogoutModal(true);
          }}
        />
      )}

      {showLogoutModal && (
        <Logout
          isModal={true}
          onClose={() => setShowLogoutModal(false)}
          onSwitchToLogin={() => {
            setShowLogoutModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </div>
  );
};

export default Service;
