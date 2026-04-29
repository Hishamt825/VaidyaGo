import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Finallogin from "../Login-hospital/Finallogin";
import Signup1 from "../Signup-hospital/Signup1";
import Forget from "../Login-hospital/Forget";
import { ArrowRight, Activity, X } from "lucide-react";

const Hero1 = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgetModal, setShowForgetModal] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const serviceDetails = {
    Radiology: {
      description: "Our Radiology department is equipped with the latest diagnostic imaging technology, including high-resolution MRI, CT Scans, Ultrasound, and digital X-rays.",
      features: ["3.0 Tesla MRI", "128-Slice CT Scan", "Digital Mammography", "Interventional Radiology"],
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800"
    },
    Emergency: {
      description: "Our Emergency department provides 24/7 rapid-response critical care with a dedicated team of trauma specialists and advanced life-support ambulances.",
      features: ["24/7 Level 1 Trauma Center", "Mobile ICU Ambulances", "Cardiac Emergency Care", "Rapid Triage System"],
      image: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?auto=format&fit=crop&q=80&w=800"
    },
    Laboratory: {
      description: "The VaidyaGo Pathology Lab offers a comprehensive range of clinical tests with automated processing for high accuracy and fast turnaround times.",
      features: ["Automated Bio-Chemistry", "Molecular Diagnostics", "Hematology & Immunology", "Home Sample Collection"],
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800"
    },
    Pharmacy: {
      description: "Our fully-stocked pharmacy ensures the availability of high-quality, authentic medications and sterile preparations for all specialized treatments.",
      features: ["Authentic Medications", "24/7 Availability", "Cold-Chain Maintenance", "Pharmacist Consultation"],
      image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=800"
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
                    else if (item === "Doctor") navigate("/Makeapp");
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
      <section className="w-auto mx-auto mt-40 text-center">
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
                className="group bg-white p-10 rounded-[2.5rem] border border-gray-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_60px_rgba(25,113,138,0.1)] hover:-translate-y-3 transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedService(service.title)}
              >
                <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-[10deg] transition-transform duration-500`}>
                  <img src={service.icon} alt={service.title} className="w-8 h-8 object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-[#0E4056] mb-4">{service.title}</h3>
                <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
                  {service.text}
                </p>
                <div 
                  className="flex items-center text-[#19718A] font-bold text-sm uppercase tracking-wider group-hover:gap-2 transition-all"
                  onClick={(e) => { e.stopPropagation(); setSelectedService(service.title); }}
                >
                  Details <ArrowRight size={18} className="ml-2" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
      <div className="flex items-center w-full mt-[10px]">
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
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-16">

        <h2 className="text-[32px] font-bold text-black mb-8 font-serif">
          About Us
        </h2>

        <p className="text-gray-800 text-[16px] leading-relaxed mb-12 max-w-6xl">
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
      <section className="relative w-full max-w-7xl mx-auto px-6 py-8 lg:py-12 overflow-visible">

        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#E8F1F2]/40 rounded-full blur-[140px] -z-10"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#D1E9F1]/30 rounded-full blur-[120px] -z-10"></div>

        <div className="text-center mb-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[36px] md:text-[48px] font-bold text-[#0E4056] font-serif mb-4 tracking-tight">
              Smart Healthcare <span className="text-[#19718A]">Features</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-[17px] leading-relaxed">
              Experience the future of medicine with our integrated digital solutions designed for your comfort.
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-[#19718A] to-transparent mx-auto mt-6 rounded-full opacity-30"></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* AI Chat (ID: 1) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFeature(1)}
            className={`group relative p-8 rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.03)] border-2 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col h-full ${
              activeFeature === 1 
              ? "bg-[#19718A] border-[#19718A] shadow-[0_20px_50px_rgba(25,113,138,0.3)] scale-[1.02]" 
              : "bg-white border-gray-400 hover:border-[#19718A] hover:bg-blue-50/20"
            }`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#19718A]/5 to-transparent rounded-bl-[100px]"></div>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${
              activeFeature === 1 ? "bg-white/20 backdrop-blur-sm shadow-none" : "bg-gradient-to-br from-[#19718A] to-[#2db3c6] shadow-[#19718A]/20"
            }`}>
              <img src="/assets/ai1.png" alt="AI Chat" className="w-10 h-10 object-contain invert brightness-0" />
            </div>
            <h3 className={`text-[24px] font-bold mb-4 ${activeFeature === 1 ? "text-white" : "text-[#0E4056]"}`}>AI Chat Assistant</h3>
            <p className={`leading-relaxed text-[15.5px] ${activeFeature === 1 ? "text-blue-50/90" : "text-gray-600"}`}>
              Instant support for health queries and seamless navigation through our services using cutting-edge AI.
            </p>
          </motion.div>

          {/* Medicine Reminder (ID: 2) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFeature(2)}
            className={`group relative p-8 rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.03)] border-2 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col h-full ${
              activeFeature === 2 
              ? "bg-[#19718A] border-[#19718A] shadow-[0_20px_50px_rgba(25,113,138,0.3)] scale-[1.02]" 
              : "bg-white border-gray-400 hover:border-[#19718A] hover:bg-blue-50/20"
            }`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#19718A]/5 to-transparent rounded-bl-[100px]"></div>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${
              activeFeature === 2 ? "bg-white/20 backdrop-blur-sm shadow-none" : "bg-gradient-to-br from-[#19718A] to-[#2db3c6] shadow-[#19718A]/20"
            }`}>
              <img src="/assets/med1.png" alt="Medicine" className="w-10 h-10 object-contain invert brightness-0" />
            </div>
            <h3 className={`text-[24px] font-bold mb-4 ${activeFeature === 2 ? "text-white" : "text-[#0E4056]"}`}>Medicine Reminder</h3>
            <p className={`leading-relaxed text-[15.5px] ${activeFeature === 2 ? "text-blue-50/90" : "text-gray-600"}`}>
              Smart medication tracking to ensure you never miss a dose, helping you stay on track with your recovery.
            </p>
          </motion.div>

          {/* Prescription Upload (ID: 3) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFeature(3)}
            className={`group relative p-8 rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.03)] border-2 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col h-full ${
              activeFeature === 3 
              ? "bg-[#19718A] border-[#19718A] shadow-[0_20px_50px_rgba(25,113,138,0.3)] scale-[1.02]" 
              : "bg-white border-gray-400 hover:border-[#19718A] hover:bg-blue-50/20"
            }`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#19718A]/5 to-transparent rounded-bl-[100px]"></div>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${
              activeFeature === 3 ? "bg-white/20 backdrop-blur-sm shadow-none" : "bg-gradient-to-br from-[#19718A] to-[#2db3c6] shadow-[#19718A]/20"
            }`}>
              <img src="/assets/pre1.png" alt="Prescription" className="w-10 h-10 object-contain invert brightness-0" />
            </div>
            <h3 className={`text-[24px] font-bold mb-4 ${activeFeature === 3 ? "text-white" : "text-[#0E4056]"}`}>Prescription Upload</h3>
            <p className={`leading-relaxed text-[15.5px] ${activeFeature === 3 ? "text-blue-50/90" : "text-gray-600"}`}>
              Quick and secure submission of your prescriptions for faster diagnostic processing and pharmacy services.
            </p>
          </motion.div>

          {/* Voice Interaction (ID: 4) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFeature(4)}
            className={`group relative p-8 rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.03)] border-2 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col h-full ${
              activeFeature === 4 
              ? "bg-[#19718A] border-[#19718A] shadow-[0_20px_50px_rgba(25,113,138,0.3)] scale-[1.02]" 
              : "bg-white border-gray-400 hover:border-[#19718A] hover:bg-blue-50/20"
            }`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#19718A]/5 to-transparent rounded-bl-[100px]"></div>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${
              activeFeature === 4 ? "bg-white/20 backdrop-blur-sm shadow-none" : "bg-gradient-to-br from-[#19718A] to-[#2db3c6] shadow-[#19718A]/20"
            }`}>
              <img src="/assets/voice1.png" alt="Voice" className="w-10 h-10 object-contain invert brightness-0" />
            </div>
            <h3 className={`text-[24px] font-bold mb-4 ${activeFeature === 4 ? "text-white" : "text-[#0E4056]"}`}>Voice Interaction</h3>
            <p className={`leading-relaxed text-[15.5px] ${activeFeature === 4 ? "text-blue-50/90" : "text-gray-600"}`}>
              Intuitive hands-free control and accessibility, allowing you to interact with our platform using voice commands.
            </p>
          </motion.div>

          {/* Book Appointment (ID: 5) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFeature(5)}
            className={`group relative p-8 rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.03)] border-2 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col h-full ${
              activeFeature === 5 
              ? "bg-[#19718A] border-[#19718A] shadow-[0_20px_50px_rgba(25,113,138,0.3)] scale-[1.02]" 
              : "bg-white border-gray-400 hover:border-[#19718A] hover:bg-blue-50/20"
            }`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#19718A]/5 to-transparent rounded-bl-[100px]"></div>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${
              activeFeature === 5 ? "bg-white/20 backdrop-blur-sm shadow-none" : "bg-gradient-to-br from-[#19718A] to-[#2db3c6] shadow-[#19718A]/20"
            }`}>
              <img src="/assets/book1.png" alt="Book" className="w-10 h-10 object-contain invert brightness-0" />
            </div>
            <h3 className={`text-[24px] font-bold mb-4 ${activeFeature === 5 ? "text-white" : "text-[#0E4056]"}`}>Book Appointment</h3>
            <p className={`leading-relaxed text-[15.5px] ${activeFeature === 5 ? "text-blue-50/90" : "text-gray-600"}`}>
              Effortlessly schedule visits with our expert specialists, choosing the time and date that works best for you.
            </p>
          </motion.div>

        </div>
      </section>

      <section className="w-full px-[2%] mt-[20px] mb-32 relative z-10">

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group bg-white p-3 rounded-md shadow-md w-[260px] border border-[#A7C7D9]
hover:border-[#5DA7C2] transition-all duration-500 ease-out transform hover:shadow-[0_0_12px_rgba(93,167,194,0.3)] cursor-pointer">
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ delay: 0.1 }}
            className="group bg-white p-3 rounded-md shadow-md w-[260px] border border-[#A7C7D9]
hover:border-[#5DA7C2] transition-all duration-500 ease-out transform hover:shadow-[0_0_12px_rgba(93,167,194,0.3)] cursor-pointer"
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ delay: 0.2 }}
            className="group bg-white p-3 rounded-md shadow-md w-[260px] border border-[#A7C7D9]
hover:border-[#5DA7C2] transition-all duration-500 ease-out transform hover:shadow-[0_0_12px_rgba(93,167,194,0.3)] cursor-pointer">
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ delay: 0.3 }}
            className="group bg-white p-3 rounded-md shadow-md w-[260px] border border-[#A7C7D9]
hover:border-[#5DA7C2] transition-all duration-500 ease-out transform hover:shadow-[0_0_12px_rgba(93,167,194,0.3)] cursor-pointer"
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
          </motion.div>

        </div>
      </section>




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

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setSelectedService(null)}
          ></motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white rounded-[2rem] w-full max-w-4xl overflow-hidden shadow-2xl z-[110]"
          >
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
            
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/2 h-64 md:h-auto">
                <img 
                  src={serviceDetails[selectedService]?.image} 
                  alt={selectedService} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-[32px] font-bold text-[#0E4056] mb-6 font-serif">{selectedService} Details</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {serviceDetails[selectedService]?.description}
                </p>
                <div className="space-y-4">
                  <h4 className="font-bold text-[#19718A] uppercase tracking-wider text-sm">Key Features:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {serviceDetails[selectedService]?.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700">
                        <div className="w-2 h-2 bg-[#19718A] rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => { setSelectedService(null); navigate("/Service"); }}
                  className="mt-10 bg-[#19718A] text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  View Full Services
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Hero1;
