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
  const [expandedSpecialty, setExpandedSpecialty] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgetModal, setShowForgetModal] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
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
                  else if (item === "Doctor") navigate("/Makeapp");
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
      <section className="w-full relative py-20 bg-white">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#F8FAFC] to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E9F3F6] text-[#19718A] mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" /></svg>
              <span className="text-[12px] font-bold uppercase tracking-widest">Departments</span>
            </div>
            <h2 className="text-[36px] md:text-[44px] font-extrabold text-[#0B2132] leading-tight mb-4 tracking-tight">
              Our Medical <span className="text-[#19718A]">Specialities</span>
            </h2>
            <p className="text-gray-500 text-[16px] max-w-2xl mx-auto leading-relaxed">
              Comprehensive care across a wide range of medical disciplines, delivered by our expert team of specialists.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {[
              { img: heart, title: "Cardiac Care", desc: "Advanced heart health and treatments", services: ["ECG & Angiography", "Heart Bypass Surgery", "Cardiac Rehabilitation"] },
              { img: dentist, title: "Dentistry", desc: "Complete dental care solutions", services: ["Teeth Whitening", "Root Canal Therapy", "Dental Implants"] },
              { img: gastro, title: "Gastroscience", desc: "Digestive and gastrointestinal health", services: ["Endoscopy", "Liver Disease Treatment", "Hernia Surgery"] },
              { img: brain, title: "Neuroscience", desc: "Expert brain and nerve care", services: ["Brain Surgery", "Stroke Management", "Neurological Exams"] },
              { img: ortho, title: "Orthopedics", desc: "Bone, joint, and spine treatments", services: ["Joint Replacement", "Spine Surgery", "Sports Injury Treatment"] },
              { img: liver, title: "Liver Care", desc: "Liver transplant and health care", services: ["Liver Transplant", "Hepatitis Treatment", "Liver Biopsy"] },
              { img: renal, title: "Renal Care", desc: "Comprehensive kidney treatments", services: ["Dialysis", "Kidney Stone Removal", "Nephrology Consultations"] },
              { img: gyno, title: "Gynaecology", desc: "Women's health and maternity care", services: ["Pregnancy Care", "Women's Health Checkup", "Infertility Treatments"] },
              { img: child, title: "Paediatric Care", desc: "Dedicated child health services", services: ["Vaccination", "Child Nutrition", "Pediatric Surgery"] },
            ].map((item, index) => (
              <div
                key={index}
                onClick={() => setExpandedSpecialty(expandedSpecialty === index ? null : index)}
                className={`group relative bg-white rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border transition-all duration-500 cursor-pointer overflow-hidden ${expandedSpecialty === index
                  ? "border-[#19718A] shadow-[0_12px_30px_-10px_rgba(25,113,138,0.2)] scale-[1.02] z-20"
                  : "border-gray-300 hover:border-[#19718A]/30 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_-10px_rgba(25,113,138,0.15)] z-10"
                  }`}
              >
                {/* Decorative hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#19718A]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="p-6 relative flex items-center gap-5 z-10">
                  <div className={`relative w-16 h-16 shrink-0 rounded-[18px] flex items-center justify-center shadow-sm transition-all duration-500 ${expandedSpecialty === index ? "bg-white border-[#19718A]/20" : "bg-[#F8FAFC] group-hover:bg-white border border-gray-50 group-hover:border-[#19718A]/10 group-hover:shadow-md"}`}>
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-8 h-8 object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className={`font-extrabold text-[18px] mb-1 transition-colors truncate ${expandedSpecialty === index ? "text-[#19718A]" : "text-[#0B2132] group-hover:text-[#19718A]"}`}>
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-[14px] leading-snug pr-4">
                      {item.desc}
                    </p>
                  </div>

                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${expandedSpecialty === index ? "bg-[#19718A] text-white rotate-90" : "bg-gray-50 text-gray-400 group-hover:bg-[#19718A] group-hover:text-white group-hover:translate-x-1"}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>

                {/* Dropdown Content Area */}
                <div
                  className={`relative z-10 overflow-hidden transition-all duration-500 ease-in-out ${expandedSpecialty === index ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100 mx-6">
                    <p className="text-[12px] font-bold text-[#19718A] uppercase tracking-widest mb-3">Key Services</p>
                    <ul className="space-y-2.5 mb-5">
                      {item.services.map((service, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-[14px] text-gray-600 font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#19718A]/50 shrink-0"></div>
                          {service}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full bg-[#E9F3F6] hover:bg-[#19718A] text-[#19718A] hover:text-white py-2.5 rounded-[12px] text-[13px] font-bold transition-colors">
                      Book Appointment
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="flex justify-center mt-14">
            <button className="bg-gradient-to-r from-[#19718A] to-[#0C6173] text-white px-10 py-4 rounded-full text-[15px] font-bold hover:shadow-[0_10px_30px_-10px_rgba(25,113,138,0.5)] transition-all duration-300 flex items-center gap-3 group">
              View All Specialities
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
            </button>
          </div>

        </div>
      </section>


      {/* ==================== Diseases & Conditions Section ===================== */}
      <section className="w-full relative py-20 mt-10 bg-gradient-to-br from-[#F8FAFC] to-[#E9F3F6] overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#19718A]/5 blur-[80px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-[#19718A]/5 blur-[60px]"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT SIDE IMAGE */}
            <div className="w-full flex justify-center lg:justify-start relative">
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#19718A]/20 to-transparent rounded-[40px] transform -rotate-3 transition-transform duration-500 hover:rotate-0"></div>
                <img
                  src="/assets/side.png"
                  alt="Doctor Image"
                  className="relative z-10 w-full max-w-[420px] object-cover rounded-[32px] shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
                />

                {/* Floating Badge */}
                <div className="absolute -right-6 bottom-12 z-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="w-12 h-12 bg-[#E9F3F6] rounded-full flex items-center justify-center text-[#19718A]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  </div>
                  <div>
                    <p className="text-[#0B2132] text-[14px] font-bold">10,000+</p>
                    <p className="text-gray-500 text-[11px] font-medium uppercase tracking-wider">Conditions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE SEARCH AREA */}
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#19718A]/10 text-[#19718A] w-fit mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                <span className="text-[12px] font-bold uppercase tracking-widest">Medical Directory</span>
              </div>

              <h2 className="text-[36px] md:text-[44px] font-extrabold text-[#0B2132] mb-4 leading-[1.15] tracking-tight">
                Search <span className="text-[#19718A] relative inline-block">Diseases<svg className="absolute w-full h-3 -bottom-1 left-0 text-[#19718A]/20" fill="currentColor" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0,10 Q50,20 100,10 L100,20 L0,20 Z" /></svg></span> & <span className="text-[#19718A]">Conditions</span> of Patients
              </h2>
              <p className="text-gray-500 text-[16px] mb-10 leading-relaxed max-w-[500px]">
                Find comprehensive information about diseases and conditions by their first letter or full medical name.
              </p>

              {/* A–Z Buttons */}
              <div className="flex flex-wrap gap-2.5 mb-10 max-w-[500px]">
                {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                  <button
                    key={letter}
                    className="w-[42px] h-[42px] rounded-[14px] bg-white shadow-sm border border-gray-300 text-[#0B2132] font-bold text-[16px] flex items-center justify-center hover:bg-[#19718A] hover:text-white hover:border-[#19718A] hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                  >
                    {letter}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="w-full max-w-[500px]">
                <p className="text-gray-400 text-[11px] uppercase tracking-widest font-bold mb-3">Or Search By Full Name</p>
                <div className="flex items-center w-full bg-white p-2 rounded-full border-2 border-transparent shadow-md focus-within:border-[#19718A]/40 focus-within:ring-4 focus-within:ring-[#19718A]/10 transition-all duration-300">
                  <input
                    type="text"
                    placeholder="E.g. Diabetes, Hypertension..."
                    className="w-full outline-none text-gray-700 bg-transparent text-[16px] px-5 py-2 placeholder-gray-400"
                  />
                  <button className="bg-[#19718A] text-white px-8 py-3 rounded-full font-bold hover:bg-[#0C6173] transition-colors shadow-sm whitespace-nowrap">
                    Search
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ==================== Why Choose Us Section ===================== */}
      <section className="w-full relative py-24 bg-white overflow-hidden mt-10">
        {/* Background Decorative Pattern */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F8FAFC] to-transparent z-0"></div>
        <div className="absolute -left-[10%] top-[20%] w-[300px] h-[300px] bg-[#19718A]/5 rounded-full blur-[80px]"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

            {/* LEFT CONTENT */}
            <div className="lg:w-1/2 flex flex-col z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E9F3F6] text-[#19718A] w-fit mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                <span className="text-[12px] font-bold uppercase tracking-widest">Our Benefits</span>
              </div>

              <h2 className="text-[38px] md:text-[48px] font-extrabold text-[#0B2132] mb-6 leading-[1.15] tracking-tight">
                Why You Should <br /> <span className="text-[#19718A]">Choose Us</span>
              </h2>

              <p className="text-gray-500 leading-relaxed text-[16px] max-w-[500px] mb-10">
                Experience world-class healthcare with our dedicated team of professionals. We combine advanced medical technology with compassionate care to ensure the best outcomes for you and your family.
              </p>

              {/* Points as Interactive Cards */}
              <div className="flex flex-col gap-4 mb-10">
                {[
                  { title: "Expert Medical Professionals", desc: "Top-certified doctors across various specialties.", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                  { title: "State-of-the-art Facilities", desc: "Equipped with the latest medical technology.", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
                  { title: "24/7 Patient Support", desc: "Round-the-clock emergency and care services.", icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-5 rounded-[20px] bg-white border border-gray-300 shadow-sm hover:shadow-lg hover:border-[#19718A]/30 hover:-translate-y-1 transition-all duration-300 group cursor-default max-w-[500px]">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-[#E9F3F6] text-[#19718A] flex items-center justify-center group-hover:bg-[#19718A] group-hover:text-white transition-colors duration-300 shadow-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-[#0B2132] font-bold text-[17px] mb-1 group-hover:text-[#19718A] transition-colors">
                        {item.title}
                      </span>
                      <span className="block text-gray-500 text-[14px]">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Button */}
              <div>
                <button
                  onClick={() => navigate("/About")}
                  className="bg-gradient-to-r from-[#19718A] to-[#0C6173] text-white px-8 py-4 rounded-full text-[15px] font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3 group"
                >
                  Discover More About Us
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </button>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="lg:w-1/2 relative flex justify-center lg:justify-end mt-12 lg:mt-0">

              {/* Dot Pattern Background */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[radial-gradient(#19718A_2px,transparent_2px)] bg-[size:16px_16px] opacity-20 z-0"></div>

              <div className="relative z-10">
                <img
                  src="/assets/doc.svg"
                  alt="Doctor checking patient"
                  className="w-full max-w-[550px] h-auto md:h-[600px] object-cover rounded-tl-[60px] rounded-br-[60px] rounded-tr-[24px] rounded-bl-[24px] shadow-2xl border-8 border-white"
                />

                {/* Overlapping Floating Card */}
                <div className="absolute -bottom-8 -left-4 md:-bottom-12 md:-left-16 bg-white p-6 rounded-[24px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-50 flex items-center gap-5 animate-pulse" style={{ animationDuration: '4s' }}>
                  <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-500 shrink-0">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[#0B2132] font-black text-[24px] leading-none mb-1">98%</div>
                    <div className="text-gray-500 text-[13px] font-bold uppercase tracking-widest leading-tight">Patient<br />Satisfaction</div>
                  </div>
                </div>

                <div className="absolute top-4 -right-4 md:top-6 md:-right-12 bg-white px-5 py-4 rounded-[20px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-50 flex items-center gap-4">
                  <div className="flex -space-x-3 shrink-0">
                    <img src="/assets/person2.png" alt="user" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" />
                    <img src="/assets/person3.png" alt="user" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" />
                    <img src="/assets/person4.png" alt="user" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" />
                  </div>
                  <div>
                    <div className="text-[#0B2132] font-bold text-[14px]">Trusted By</div>
                    <div className="text-[#19718A] text-[12px] font-bold">50k+ Patients</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      <section className="py-8">
        <div className="max-w-7xl mx-auto text-center px-2">
          {/* Section Heading */}
          <h2 className="text-[32px] md:text-[44px] font-bold text-[#0B2132] mb-12 font-serif">
            Top Three <span className="text-[#19718A]">Testimonials</span>
          </h2>

          {/* ==== 3 Boxes in a Row ==== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">

            {[
              {
                name: "Robert Brown",
                text: "A positive statement from a satisfied customer about their experience with a product or service.",
                img: "/assets/person2.png", // 👈 first image
                color: "#19718A",
                // font: "base",
              },

              {
                name: "Sarah Lee",
                text: "Excellent service! The staff was friendly, and the treatment was top-notch. Highly recommend!",
                img: "/assets/person3.png", // 👈 second image
                color: "#399CAA",
              },
              {
                name: "Jenny Wilson",
                text: "Professional and caring team. I felt comfortable throughout my entire visit!",
                img: "/assets/person4.png", // 👈 third image
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
                    onClick={() => setSelectedTestimonial(item)}
                    className="mt-4 text-white px-12 py-1.5 rounded-full transition-all duration-300 hover:scale-105"
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

      {/* Testimonial Modal */}
      {selectedTestimonial && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B2132]/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div
            className="bg-white rounded-[24px] max-w-lg w-full p-8 relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transform transition-all animate-in zoom-in-95 duration-300"
            style={{ borderTop: `6px solid ${selectedTestimonial.color}` }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedTestimonial(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 hover:bg-gray-100 p-2.5 rounded-full transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Content */}
            <div className="flex flex-col items-center text-center mt-2">
              <div className="relative">
                <img
                  src={selectedTestimonial.img}
                  alt={selectedTestimonial.name}
                  className="w-24 h-24 rounded-full border-4 shadow-lg mb-4 object-cover"
                  style={{ borderColor: selectedTestimonial.color }}
                />
                <div
                  className="absolute -bottom-1 right-1 w-8 h-8 rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm"
                  style={{ backgroundColor: selectedTestimonial.color }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                </div>
              </div>

              <h3 className="text-[24px] font-extrabold text-[#0B2132] mb-1">{selectedTestimonial.name}</h3>
              <p className="text-[13px] text-gray-500 mb-6 font-bold uppercase tracking-widest">Verified Patient</p>

              <div className="relative px-8 py-6 bg-gray-50 rounded-[20px] w-full text-left border border-gray-100 shadow-inner">
                <img src="/assets/comma.png" className="w-6 h-6 opacity-30 absolute top-6 left-6" alt="quote" />
                <p className="text-gray-700 text-[16px] leading-relaxed italic pl-8 pr-2 relative z-10 font-medium">
                  "{selectedTestimonial.text}"
                </p>
                <div className="flex text-yellow-400 text-[18px] tracking-wider mt-4 pl-8">
                  ★★★★★
                </div>
              </div>

              <button
                onClick={() => setSelectedTestimonial(null)}
                className="mt-8 w-full text-white font-bold text-[15px] py-3.5 rounded-[14px] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                style={{ backgroundColor: selectedTestimonial.color }}
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MainPage;
