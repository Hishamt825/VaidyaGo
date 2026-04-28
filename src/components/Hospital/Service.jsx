import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Finallogin from "../Login-hospital/Finallogin";
import Signup1 from "../Signup-hospital/Signup1";
import Forget from "../Login-hospital/Forget";
import {
  Search, Bell, Activity, Heart, Smile, Brain,
  Clock, ClipboardList, Stethoscope, Calendar,
  Sparkles, FileText, MapPin, Video, Camera,
  User, Smartphone, ArrowRight, ChevronLeft, ChevronRight,
  Phone, Mail, CalendarClock, Folder, Facebook, Twitter, Instagram, Youtube
} from "lucide-react";
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
            <button onClick onClick={() => { navigate("/Service"); setIsMobileMenuOpen(false); }} className="text-white font-medium hover:text-gray-300 text-left text-[18px]">Our Service</button>
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
            <div className="absolute top-[18%] left-[12%] bg-white rounded-full px-4 py-1 text-[14px] shadow z-30">
              Cardiac Care
            </div>

            <div className="absolute top-[8%] right-[5%] bg-white rounded-full px-4 py-1 text-[14px] shadow z-30">
              Renal Care
            </div>

            <div className="absolute top-[34%] right-[8%] bg-white rounded-full px-4 py-1 text-[14px] shadow z-30">
              Liver Care
            </div>

            <div className="absolute top-[48%] left-[6%] bg-white rounded-full px-4 py-1 text-[14px] shadow z-30">
              Neuroscience
            </div>

            <div className="absolute top-[60%] right-[6%] bg-white rounded-full px-4 py-1 text-[14px] shadow z-30">
              Dentistry
            </div>

            {/* Doctor Image */}
            <img
              src="/assets/bbg1.svg"
              alt="Doctor"
              className="absolute bottom-[-100px] right-[-140px] z-50 h-[590px] object-contain pointer-events-none"
            />
          </div>
        </div>
      </section>
      {/* ======================= OVERLAPPING INFO CARDS ======================= */}
      {/* Features Section */}
      <section className="relative -mt-24 z-40">
        {/* White Card Container */}
        <div className="max-w-6xl mx-auto bg-white rounded-t-[60px] shadow-lg px-10 py-10">

          {/* Wave Top Shape */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
            <svg
              className="relative block w-full h-[60px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V46.29c47.79,22,103.59,29,158,17,70-15,136-55,207-68,73-13,146,12,218,30,69,17,138,24,209,8,36-8,69-23,104-35,55-19,113-28,170-21,41,5,80,19,119,31V0Z"
                opacity=".25"
                className="fill-white"
              ></path>
            </svg>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 items-center text-center md:text-left">

            {/* Feature 1 */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100">
                <img src="/assets/icon1.svg" alt="24/7 care" className="w-7 h-7" />
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 text-[18px]">
                  24/7 Advanced Care
                </h4>
                <p className="text-gray-500 text-[14px]">
                  Available Anytime Anywhere
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-100">
                <img src="/assets/icon2.svg" alt="results online" className="w-7 h-7" />
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 text-[18px]">
                  Get Result Online
                </h4>
                <p className="text-gray-500 text-[14px]">
                  Check Results Online
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-100">
                <img src="/assets/icon3.svg" alt="services" className="w-7 h-7" />
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 text-[18px]">
                  Specialised Services
                </h4>
                <p className="text-gray-500 text-[14px]">
                  Expert Care Services
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================= OUR SERVICES CAROUSEL ======================= */}
      <section className="py-20 relative overflow-hidden bg-white">

        {/* Background Decorative Shapes */}
        <div className="absolute top-[10%] right-[10%] w-[450px] h-[450px] bg-[#E8F3F4] rounded-full opacity-60 mix-blend-multiply blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-[0%] left-[5%] w-[350px] h-[350px] bg-[#E6EEF8] rounded-full opacity-50 mix-blend-multiply blur-2xl pointer-events-none"></div>

        {/* 4. TITLE */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-[36px] md:text-[42px] font-[900] text-black tracking-tight mb-2">OUR SERVICES</h2>
          <p className="text-gray-600 text-[16px] font-medium max-w-xl mx-auto">we offer complete healthcare to individual with various health concern</p>
        </div>

        {/* 5. SERVICE CARDS SLIDER */}
        <div className="max-w-[1400px] mx-auto relative flex items-center justify-center z-20 px-4 md:px-12 xl:px-8">

          {/* Left Arrow */}
          <button className="hidden lg:flex absolute left-0 xl:left-4 w-[50px] h-[50px] bg-white border-2 border-gray-800 rounded-full z-40 items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors shadow-sm">
            <ChevronLeft size={26} strokeWidth={2} />
          </button>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 xl:gap-8 w-full py-12">

            {/* Card 1: Appointment */}
            <div className="group bg-white rounded-[32px] p-8 flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 w-full lg:w-[260px] h-[370px] transform transition-all duration-300 hover:scale-[1.05] hover:-translate-y-2 hover:bg-gradient-to-b hover:from-[#7CBBC2] hover:to-[#6FA7AD] hover:border-transparent hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] z-10 hover:z-40 mt-0 lg:mt-4">
              <h3 className="font-extrabold text-[#1a2d30] text-[20px] mb-6 mt-2 transition-colors duration-300">Appointment</h3>
              <div className="w-[72px] h-[72px] bg-[#19718A] rounded-full flex items-center justify-center text-white mb-6 shrink-0 shadow-md transition-colors duration-300">
                <CalendarClock size={34} strokeWidth={1.5} />
              </div>
              <p className="text-[14px] text-gray-500 group-hover:text-[#1a2d30] leading-relaxed mb-6 text-center w-full flex-grow font-medium transition-colors duration-300">
                An appointment is a phone number or an online service used to schedule a meeting or appointment.
              </p>
              <button className="bg-[#19718A] hover:bg-[#106272] group-hover:bg-[#106272] text-white text-[14px] font-bold py-[12px] px-8 rounded-full transition-colors w-max tracking-wide shadow-md duration-300">
                BOOK NOW
              </button>
            </div>

            {/* Card 2: AI symptom Checker */}
            <div className="group bg-white rounded-[32px] p-8 flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 w-full lg:w-[280px] h-[390px] transform transition-all duration-300 hover:scale-[1.05] hover:-translate-y-2 hover:bg-gradient-to-b hover:from-[#7CBBC2] hover:to-[#6FA7AD] hover:border-transparent hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] z-10 hover:z-40 relative lg:-mt-0">
              <h3 className="font-extrabold text-[#1a2d30] text-[22px] leading-snug mb-6 mt-3 text-center transition-colors duration-300">AI symptom<br />Checker</h3>
              <div className="w-[84px] h-[84px] bg-[#19718A] rounded-full flex items-center justify-center text-white mb-6 shadow-md relative shrink-0 transition-colors duration-300">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 10H1 M3 14H1 M21 10H23 M21 14H23 M10 3V1 M14 3V1 M10 21V23 M14 21V23" stroke="currentColor" strokeWidth="1.5" />
                  <text x="50%" y="54%" dominantBaseline="central" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="bold" fontFamily="sans-serif">AI</text>
                </svg>
              </div>
              <p className="text-[14px] text-gray-500 group-hover:text-[#1a2d30] font-medium leading-relaxed mb-6 text-center w-full flex-grow transition-colors duration-300">
                Type symptoms and check whats the problem is.
              </p>
              <button className="bg-[#19718A] hover:bg-[#106272] group-hover:bg-[#106272] text-white text-[15px] font-bold py-[12px] px-8 rounded-full shadow-md transition-colors duration-300 w-max tracking-wide">
                find Dieases
              </button>
            </div>

            {/* Card 3: Prescription */}
            <div className="group bg-white rounded-[32px] p-8 flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 w-full lg:w-[260px] h-[370px] transform transition-all duration-300 hover:scale-[1.05] hover:-translate-y-2 hover:bg-gradient-to-b hover:from-[#7CBBC2] hover:to-[#6FA7AD] hover:border-transparent hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] z-10 hover:z-40 mt-0 lg:mt-4">
              <h3 className="font-extrabold text-[#1a2d30] text-[20px] mb-6 mt-2 transition-colors duration-300">prescription</h3>
              <div className="w-[72px] h-[72px] bg-[#19718A] rounded-full flex items-center justify-center text-white mb-6 shrink-0 shadow-md transition-colors duration-300">
                <Folder size={34} strokeWidth={1.5} />
              </div>
              <p className="text-[14px] text-gray-500 group-hover:text-[#1a2d30] leading-relaxed mb-6 text-center w-full flex-grow font-medium transition-colors duration-300">
                Upload your prescription and check and know whats the problem is?
              </p>
              <button className="bg-[#19718A] hover:bg-[#106272] group-hover:bg-[#106272] text-white text-[14px] font-bold py-[12px] px-10 rounded-full transition-colors w-max tracking-wide shadow-md duration-300">
                Upload
              </button>
            </div>

            {/* Card 4: Find Locations */}
            <div className="group bg-white rounded-[32px] p-8 flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 w-full lg:w-[260px] h-[370px] transform transition-all duration-300 hover:scale-[1.05] hover:-translate-y-2 hover:bg-gradient-to-b hover:from-[#7CBBC2] hover:to-[#6FA7AD] hover:border-transparent hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] z-10 hover:z-40 mt-0 lg:mt-4">
              <h3 className="font-extrabold text-[#1a2d30] text-[20px] mb-6 mt-2 transition-colors duration-300">Find Locations</h3>
              <div className="w-[72px] h-[72px] bg-[#19718A] rounded-full flex items-center justify-center text-white mb-6 shrink-0 relative shadow-md transition-colors duration-300">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M12 21.5c-4.2-4.5-8-8.5-8-12a8 8 0 1 1 16 0c0 3.5-3.8 7.5-8 12Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="9" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 7.5v3m-1.5-1.5h3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <p className="text-[14px] text-gray-500 group-hover:text-[#1a2d30] leading-relaxed mb-6 text-center w-full flex-grow font-medium transition-colors duration-300">
                Location can refer to several things: a search term for icons of a map pin and text, a technical term for a single line of text in a recognized block.
              </p>
              <button className="bg-[#19718A] hover:bg-[#106272] group-hover:bg-[#106272] text-white text-[16px] font-bold py-[12px] px-8 rounded-full transition-colors w-max tracking-wide shadow-md duration-300">
                Location
              </button>
            </div>

          </div>

          {/* Right Arrow */}
          <button className="hidden lg:flex absolute right-0 xl:right-4 w-[50px] h-[50px] bg-white border-2 border-gray-800 rounded-full z-40 items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors shadow-sm">
            <ChevronRight size={26} strokeWidth={2} />
          </button>
        </div>
      </section>

      {/* ======================= FACILITIES SECTION ======================= */}
      <section className="relative py-20 overflow-hidden bg-white">

        {/* Soft Background Wave for Right Side */}
        <div className="absolute right-0 bottom-0 top-0 w-full md:w-2/3 lg:w-1/2 h-full z-0 overflow-hidden pointer-events-none opacity-40">
          <svg className="absolute bottom-0 w-full h-full text-gray-100 fill-current" preserveAspectRatio="none" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 600 V300 C150 400 200 150 350 300 C500 450 600 50 800 250 V600 Z" fill="#EBF2F3" />
            <path d="M0 600 V400 C150 500 250 250 400 400 C550 550 650 150 800 350 V600 Z" fill="#F4F8F9" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

          {/* LEFT SIDE: Area of Facilities Card */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-start">

            {/* Background Light Blue Shape (Layer 1) */}
            <div className="absolute left-[5%] top-[5%] w-[80%] h-[110%] bg-[#E8F3F4] rounded-[24px] rounded-tl-none -z-10"></div>

            {/* Main Interactive Card (Layer 2) */}
            <div className="bg-white rounded-[16px] p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-teal-50 w-[90%] md:w-[85%] relative z-10 -ml-4 lg:ml-8 mt-12 bg-opacity-95 backdrop-blur-sm">

              {/* Vertical Timeline Divider */}
              <div className="absolute left-[-2px] md:left-[-24px] top-[10%] bottom-[10%] w-[2px] bg-[#1a718a]">
                <div className="absolute top-[60%] left-[-6px] w-[14px] h-[14px] bg-[#1a718a] rounded-full"></div>
              </div>

              {/* Expand Icon Box (Floating on left) */}
              <div className="absolute left-[-40px] md:left-[-70px] top-[25%] bg-[#8ABFCB] w-[46px] h-[46px] md:w-[54px] md:h-[54px] rounded-[10px] flex items-center justify-center shadow-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#1d4855" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a4b59]">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  <path d="M3 9v2M9 3h2M15 21h2M21 15v2" strokeDasharray="2 4" />
                </svg>
              </div>

              {/* Card Header */}
              <div className="flex items-center gap-3 mb-8 relative">
                <div className="w-10 h-10 bg-[#A6D1D6] rounded-full absolute -left-4 -top-2 opacity-60 mix-blend-multiply"></div>
                <h3 className="text-[20px] md:text-[22px] font-extrabold text-black relative z-10 uppercase tracking-tight ml-2">
                  Our Area of Facilities
                </h3>
              </div>

              {/* Facility List */}
              <ul className="space-y-5 md:space-y-6">

                <li className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-[#F4F8F9] rounded-full flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#E8F3F4] transition-colors">
                    <Stethoscope size={18} className="text-[#1a2d30]" strokeWidth={2} />
                  </div>
                  <span className="text-[16px] font-bold text-gray-800">Doctor</span>
                </li>

                <li className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-[#F4F8F9] rounded-full flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#E8F3F4] transition-colors relative">
                    <Folder size={18} className="text-[#64A3E3]" strokeWidth={2.5} />
                    <div className="absolute top-1 right-0 w-[14px] h-[14px] bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                      <span className="text-white text-[8px] font-bold">+</span>
                    </div>
                  </div>
                  <span className="text-[16px] font-bold text-gray-800">Upload prescription</span>
                </li>

                <li className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-[#F4F8F9] rounded-full flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#E8F3F4] transition-colors">
                    <Heart size={18} className="text-[#E8926F]" strokeWidth={2.5} />
                  </div>
                  <span className="text-[16px] font-bold text-gray-800">Medicines Suggestion from AI</span>
                </li>

                <li className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-[#F4F8F9] rounded-full flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#E8F3F4] transition-colors relative">
                    <div className="w-[20px] h-[20px] border-[2px] border-red-500 rounded-sm flex items-center justify-center relative">
                      <span className="text-[10px] font-bold text-black border-y-2 border-dashed border-gray-400 w-full text-center tracking-tighter leading-[9px]">OCR</span>
                    </div>
                  </div>
                  <span className="text-[16px] font-bold text-gray-800">Camera for OCR</span>
                </li>

                <li className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-[#F4F8F9] rounded-full flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#E8F3F4] transition-colors overflow-hidden relative">
                    <User size={18} className="text-[#4081c7] absolute left-[5px] top-[14px]" strokeWidth={2.5} />
                    <User size={16} className="text-orange-500 absolute left-[18px] top-[10px]" strokeWidth={2.5} />
                  </div>
                  <span className="text-[16px] font-bold text-gray-800">Video Call Consultation</span>
                </li>

                <li className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-[#F4F8F9] rounded-full flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#E8F3F4] transition-colors relative">
                    <CalendarClock size={18} className="text-pink-500" strokeWidth={2} />
                    <svg className="absolute bottom-[3px] right-[4px]" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1d4855" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
                  </div>
                  <span className="text-[16px] font-bold text-gray-800">Book Appointment</span>
                </li>

                <li className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-[#F4F8F9] rounded-full flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#E8F3F4] transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /><path d="M16 16l4 4" />
                    </svg>
                  </div>
                  <span className="text-[16px] font-bold text-gray-800">AI Symptom Checker</span>
                </li>

              </ul>
            </div>
          </div>

          {/* RIGHT SIDE: Statistics Text */}
          <div className="w-full lg:w-1/2 flex flex-col gap-10 mt-10 lg:mt-0 pl-0 lg:pl-[10%] relative z-10">

            {/* Stat Item 1 */}
            <div>
              <div className="inline-block relative mb-4">
                {/* Custom light blue soft shape behind text */}
                <svg className="absolute inset-0 w-full h-[150%] -left-[10%] -top-[25%] -z-10 text-[#CFE4E5]" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path fill="currentColor" d="M10,20 C10,5 30,5 50,15 C70,25 90,5 90,20 C90,35 70,35 50,25 C30,15 10,35 10,20 Z" />
                </svg>
                <h3 className="text-[30px] font-extrabold text-[#1a3a44] tracking-tight relative z-10">
                  100K+
                </h3>
              </div>
              <p className="text-gray-700 text-[16px] font-medium leading-relaxed max-w-[280px]">
                Total number of Happy Client ,They get best experience
              </p>
            </div>

            {/* Subtle Divider Line */}
            <div className="w-40 h-[1px] bg-[#6FA7AD] opacity-50 ml-2"></div>

            {/* Stat Item 2 */}
            <div className="ml-0 lg:ml-2">
              <div className="inline-block relative mb-4">
                {/* Custom light blue soft shape behind text */}
                <svg className="absolute inset-0 w-full h-[150%] -left-[10%] -top-[25%] -z-10 text-[#CFE4E5]" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path fill="currentColor" d="M10,20 C10,5 40,0 50,20 C60,40 90,35 90,20 C90,5 60,10 50,20 C40,30 10,35 10,20 Z" />
                </svg>
                <h3 className="text-[30px] font-extrabold text-[#1a3a44] tracking-tight relative z-10">
                  20K+
                </h3>
              </div>
              <p className="text-gray-700 text-[16px] md:text-[18px] font-medium leading-relaxed max-w-[280px]">
                REVIEWS of clients who were happy by using this.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ======================= 3 REASONS TO CHOOSE US ======================= */}
      <section className="py-24 relative bg-white overflow-hidden pb-40">
        {/* Background blob decorations */}
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[300px] bg-gray-100 rounded-[100px] -rotate-12 -z-10"></div>

        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">

          {/* Left Title */}
          <div className="md:w-1/3 mb-16 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              3 Reasons To <br /> Choose Us
            </h2>
          </div>

          {/* Right Graphical Cards */}
          <div className="md:w-2/3 relative h-[500px] w-full flex justify-center items-center">

            {/* Center Circle Highlight */}
            <div className="absolute w-[320px] h-[320px] bg-[#C5E1E5] rounded-full left-[20%] top-[15%] -z-[5]"></div>

            {/* Card 1 (Top Left) */}
            <div className="absolute top-[0%] left-[10%] md:left-[30%] bg-[#78BCC4] rounded-3xl p-6 shadow-xl w-48 text-center flex flex-col items-center border border-[#6ba9b1] z-10 transition-transform hover:-translate-y-2">
              {/* Avatar Group Graphic */}
              <div className="w-24 h-24 bg-white/30 rounded-full mb-4 flex items-center justify-center mt-[-40px]">
                <User size={40} className="text-white drop-shadow-md" />
              </div>
              <h3 className="font-bold text-gray-900 text-[14px] leading-snug">Professional<br />Dctors</h3>
            </div>

            {/* Card 2 (Right) */}
            <div className="absolute top-[30%] right-[5%] md:right-[15%] bg-white rounded-3xl p-6 shadow-xl w-48 text-center flex flex-col items-center border border-gray-100 z-10 transition-transform hover:-translate-y-2">
              <div className="mb-4">
                <Smartphone size={50} className="text-rose-400 drop-shadow-md" />
              </div>
              <h3 className="font-bold text-gray-900 text-[14px] leading-snug">24/7 patient<br />support</h3>
            </div>

            {/* Card 3 (Bottom Center) */}
            <div className="absolute bottom-[-5%] left-[30%] md:left-[45%] bg-white rounded-3xl p-6 shadow-xl w-48 text-center flex flex-col items-center border border-gray-100 z-10 transition-transform hover:-translate-y-2">
              <div className="mb-4 text-[#19718A]">
                <Heart size={50} className="drop-shadow-md fill-orange-200 text-orange-400" />
              </div>
              <h3 className="font-bold text-gray-900 text-[14px] leading-snug">Specialised<br />Services</h3>
            </div>

          </div>
        </div>
      </section>

      {/* ======================= FOOTER ======================= */}
      <footer className="bg-[#19718A] text-teal-50 py-16 px-6 md:px-16 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Column 1 */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-1 mb-6">
              <span className="text-3xl font-extrabold text-white tracking-tight">VaidyaGo</span>
            </div>
            <p className="text-xs text-teal-100 leading-relaxed pr-4">
              Committed to compassionate care, advanced technology, and healthier lives serving Eastern U.P. with trust, excellence, and integrity since 1989.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-teal-100">
              <li>
                <button
                  onClick={() => navigate("/MainPage")}
                  className="hover:text-white flex items-center gap-2"
                >
                  <ArrowRight size={12} /> Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/About")}
                  className="hover:text-white flex items-center gap-2"
                >
                  <ArrowRight size={12} /> About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/Service")}
                  className="hover:text-white flex items-center gap-2"
                >
                  <ArrowRight size={12} /> Services
                </button>
              </li>
              <li><a href="#" className="hover:text-white flex items-center gap-2"><ArrowRight size={12} /> Gallery</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-white font-bold mb-6">Our Services</h4>
            <ul className="space-y-3 text-sm text-teal-100">
              <li><a href="#" className="hover:text-white flex items-center gap-2"><ArrowRight size={12} /> Appointment</a></li>
              <li><a href="#" className="hover:text-white flex items-center gap-2"><ArrowRight size={12} /> AI Symptom Checker</a></li>
              <li><a href="#" className="hover:text-white flex items-center gap-2"><ArrowRight size={12} /> Camera for OCR</a></li>
              <li><a href="#" className="hover:text-white flex items-center gap-2"><ArrowRight size={12} /> Prescription</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-teal-100">
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0" /> +91 XXXXX XXXXX
              </li>
              <li className="flex items-start gap-3 break-all">
                <Mail size={16} className="mt-0.5 shrink-0" /> vaidyago24@gmail.com
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                xyz, xyz, Gorakhpur,<br />Uttar pradesh, 273015
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-[#19718A] hover:bg-white transition-colors"><Facebook size={14} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-[#19718A] hover:bg-white transition-colors"><Twitter size={14} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-[#19718A] hover:bg-white transition-colors"><Instagram size={14} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-[#19718A] hover:bg-white transition-colors"><Youtube size={14} /></a>
            </div>
          </div>

        </div>
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

export default Service;
