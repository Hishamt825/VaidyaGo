import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Finallogin from "../Login-hospital/Finallogin";
import Signup1 from "../Signup-hospital/Signup1";
import Forget from "../Login-hospital/Forget";
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
          <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="currentColor" strokeWidth="1.5"/>
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
      <section className="py-20 relative overflow-hidden bg-white">
        {/* Background Decorative Shapes */}
        <div className="absolute top-[10%] right-[10%] w-[450px] h-[450px] bg-[#E8F3F4] rounded-full opacity-60 mix-blend-multiply blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-[0%] left-[5%] w-[350px] h-[350px] bg-[#E6EEF8] rounded-full opacity-50 mix-blend-multiply blur-2xl pointer-events-none"></div>

        {/* TITLE */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-[36px] md:text-[42px] font-black text-black tracking-tight mb-2 uppercase">OUR SERVICES</h2>
          <p className="text-gray-600 text-[16px] font-medium max-w-xl mx-auto">we offer complete healthcare to individual with various health concern</p>
        </div>

        {/* SERVICE CARDS GRID */}
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {servicesData.map((service, index) => (
              <div 
                key={index}
                className="group relative rounded-[32px] p-8 flex flex-col items-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100 bg-white text-[#0B2132] transition-all duration-300 w-full h-[400px] hover:bg-[#8ABFCB] hover:border-[#8ABFCB] hover:-translate-y-2"
              >
                <h3 className="font-extrabold text-[22px] mb-6 text-center h-[60px] flex items-center">{service.title}</h3>
                
                <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-6 shrink-0 shadow-sm bg-[#19718A] text-white group-hover:bg-white group-hover:text-[#19718A] transition-all duration-300">
                  {service.icon}
                </div>

                <p className="text-[14px] leading-relaxed mb-6 text-center flex-grow font-medium text-gray-500 group-hover:text-[#0B2132]/80 transition-all duration-300">
                  {service.text}
                </p>

                <button className="text-[16px] font-bold py-[10px] px-8 rounded-full bg-[#19718A] text-white transition-all w-max tracking-wide shadow-md hover:bg-[#106272] hover:scale-105 active:scale-95 group-hover:bg-[#19718A]">
                  {service.btnText}
                </button>
              </div>
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
      <section className="py-20 relative overflow-hidden bg-white">
        
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-[#E8F3F4] rounded-full opacity-30 blur-3xl"></div>
           <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] bg-[#D4E9EC] rounded-full opacity-20 blur-3xl"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8ABFCB] rounded-full opacity-10 blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-6">
          
          {/* Left Title - More Compact */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[42px] md:text-[52px] font-black text-[#0B2132] leading-[1.1] tracking-tight mb-4">
                3 Reasons To <br /> 
                <span className="text-[#19718A] relative">
                  Choose Us
                  <svg className="absolute -bottom-1 left-0 w-full h-2 text-[#8ABFCB]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0,5 Q50,0 100,5" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                </span>
              </h2>
              <p className="text-gray-500 text-[16px] font-medium max-w-sm leading-relaxed">
                We provide the most advanced healthcare services with a human touch, ensuring your recovery is fast.
              </p>
            </motion.div>
          </div>

          {/* Right Graphical Area - Spread Out Layout */}
          <div className="md:w-1/2 relative h-[600px] w-full flex justify-center items-center">
            
            {/* Card 1: Top Left-ish */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[0%] left-[10%] md:left-[5%] z-30"
            >
              <div className="bg-[#8ABFCB] rounded-[40px] p-8 shadow-xl w-[230px] text-center border border-[#19718A]/40 group">
                 <div className="mb-4 h-[120px] flex items-center justify-center">
                    <img src={doctorsImg} alt="Doctors" className="max-h-full object-contain mix-blend-multiply" />
                 </div>
                 <h3 className="font-extrabold text-[#0B2132] text-[19px] leading-tight">Professional <br /> Doctors</h3>
              </div>
            </motion.div>

            {/* Card 2: Middle Right */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-[25%] right-[0%] md:right-[-10%] z-20"
            >
              <div className="bg-white rounded-[40px] p-8 shadow-xl w-[230px] text-center border border-gray-300 group">
                 <div className="mb-4 h-[120px] flex items-center justify-center">
                    <img src={hospitalImg} alt="Support" className="max-h-full object-contain mix-blend-multiply" />
                 </div>
                 <h3 className="font-extrabold text-gray-900 text-[19px] leading-tight">24/7 patient <br /> support</h3>
              </div>
            </motion.div>

            {/* Card 3: Bottom Left/Center */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[5%] left-[20%] md:left-[15%] z-30"
            >
              <div className="bg-white rounded-[40px] p-8 shadow-xl w-[230px] text-center border border-gray-300 group">
                 <div className="mb-4 h-[120px] flex items-center justify-center">
                    <img src={familyImg} alt="Services" className="max-h-full object-contain mix-blend-multiply" />
                 </div>
                 <h3 className="font-extrabold text-gray-900 text-[19px] leading-tight">Specialised <br /> Services</h3>
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
