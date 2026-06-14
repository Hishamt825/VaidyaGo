import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, X, Info, CalendarCheck, UserPlus, ArrowRight } from "lucide-react";
import Finallogin from "../Login-hospital/Finallogin";
import Signup1 from "../Signup-hospital/Signup1";
import Forget from "../Login-hospital/Forget";
import Otp from "../Login-hospital/Otp";
import New_pass from "../Login-hospital/New_pass";
import Logout from "../Login-hospital/Logout";
import { useLanguage } from "../../context/LanguageContext";

const HospitalNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgetModal, setShowForgetModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showNewPassModal, setShowNewPassModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { t, toggleLanguage, language } = useLanguage();

  // Trigger modals based on URL parameters (e.g. ?auth=login)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const authType = params.get('auth');
    
    if (authType === 'login') setShowLoginModal(true);
    else if (authType === 'signup') setShowSignupModal(true);
    else if (authType === 'forget') setShowForgetModal(true);
    else if (authType === 'otp') setShowOtpModal(true);
    else if (authType === 'newpass') setShowNewPassModal(true);
    else if (authType === 'logout') setShowLogoutModal(true);

    if (showSearch || showNotifications) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showSearch, showNotifications, location.search]);

  const notifications = [
    { id: 1, title: "Appointment Confirmed", desc: "Your checkup with Dr. Smith is scheduled for tomorrow.", time: "2h ago", icon: <CalendarCheck className="text-green-500" />, color: "bg-green-50" },
    { id: 2, title: "New Specialist Joined", desc: "Dr. Sarah Lee (Cardiology) is now accepting appointments.", time: "5h ago", icon: <UserPlus className="text-blue-500" />, color: "bg-blue-50" },
    { id: 3, title: "Health Tip", desc: "Stay hydrated! Drink at least 8 glasses of water daily.", time: "1d ago", icon: <Info className="text-[#19718A]" />, color: "bg-[#19718A]/10" },
  ];

  const navItems = [
    { name: "Home", path: "/MainPage" },
    { name: "About", path: "/About" },
    { name: "Our Service", path: "/Service" },
    { name: "Doctor", path: "/Makeapp" },
    { name: "FAQ", path: "/FAQ" },
  ];

  const isActive = (path) => {
    if (path === "/MainPage" && location.pathname === "/") return true;
    return location.pathname === path;
  };

  return (
    <>
      <section className="relative overflow-hidden w-full">
        {/* Navbar */}
        <header className="relative flex items-center justify-between px-4 sm:px-8 py-2.5 bg-[#19718A] border-b border-white/30 w-full z-50">
          {/* Logo Section */}
          <div className="flex items-center gap-2 cursor-pointer w-auto lg:w-[280px]" onClick={() => navigate("/MainPage")}>
            <img src="/assets/logo.png" alt="VaidyaGo Logo" className="h-8 sm:h-9 w-auto shrink-0" />
            <span className="text-white font-black text-lg sm:text-xl tracking-wider select-none hidden xs:inline-block">VaidyaGo</span>
          </div>

          {/* CENTER NAVIGATION */}
          <nav className="flex-1 hidden lg:flex items-center justify-center gap-6 xl:gap-[45px] text-[16px] xl:text-[18px]">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`relative text-white font-medium tracking-wide transition-colors duration-300 hover:text-gray-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white after:transition-all after:duration-300 ${
                  isActive(item.path) ? "after:w-full" : "after:w-0 hover:after:w-full"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* RIGHT SECTION (Icons + Contact) */}
          <div className="flex items-center justify-end gap-4 w-auto lg:min-w-[280px]">
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">

              <button 
                onClick={() => setShowSearch(true)}
                className="p-2 hover:bg-[#0C6173] rounded-full transition-all duration-300 text-white"
              >
                <Search size={20} strokeWidth={2.5} />
              </button>

              <div className="w-px h-6 bg-white/40"></div>

              <button 
                onClick={() => setShowNotifications(true)}
                className="p-2 hover:bg-[#0C6173] rounded-full transition-all duration-300 text-white relative"
              >
                <Bell size={20} strokeWidth={2.5} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#19718A]"></span>
              </button>

              <div className="w-px h-6 bg-white/40"></div>

              <button
                onClick={toggleLanguage}
                className="text-white hover:text-gray-200 text-sm font-bold uppercase tracking-wider px-2"
              >
                {language === 'English' ? 'EN' : 'HI'}
              </button>

              <button
                onClick={() => navigate("/ContactUs")}
                className={`border-[1.2px] border-white text-white px-5 py-1.5 rounded-full font-bold text-sm transform transition-all duration-300 hover:scale-105 active:scale-95 ${
                  location.pathname === "/ContactUs" ? "bg-white/10" : ""
                }`}
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
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-white font-medium hover:text-gray-300 text-left text-[18px] ${
                  isActive(item.path) ? "underline underline-offset-4" : ""
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex gap-6 mt-auto pt-6 border-t border-white/20 justify-center">
            <button 
              onClick={() => { setShowSearch(true); setIsMobileMenuOpen(false); }}
              className="p-3 hover:bg-[#0C6173] rounded-full transition-all duration-300"
            >
              <img src="/assets/search.svg" alt="Search" className="w-5 h-5 invert" />
            </button>
            <button 
              onClick={() => { setShowNotifications(true); setIsMobileMenuOpen(false); }}
              className="p-3 hover:bg-[#0C6173] rounded-full transition-all duration-300"
            >
              <img src="/assets/Bell.png" alt="Bell" className="w-5 h-5 invert" />
            </button>
          </div>

          <button
            onClick={() => {
              navigate("/ContactUs");
              setIsMobileMenuOpen(false);
            }}
            className="border-[1.2px] border-white text-white px-8 py-3 rounded-full font-bold transform transition-all duration-300 hover:scale-105 mt-6 text-[16px] w-full"
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSearch(false)}
              className="absolute inset-0 bg-[#0B2132]/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl mx-4"
            >
              <div className="bg-white rounded-[2rem] p-4 shadow-2xl flex items-center gap-4 border border-white/20">
                <div className="p-3 bg-[#E9F3F6] rounded-2xl text-[#19718A]">
                  <Search size={24} strokeWidth={2.5} />
                </div>
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search doctors, services, or health topics..." 
                  className="flex-1 bg-transparent border-none outline-none text-[#0B2132] font-semibold text-lg placeholder-gray-400"
                />
                <button 
                  onClick={() => setShowSearch(false)}
                  className="p-3 hover:bg-gray-100 rounded-2xl text-gray-400 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <span className="text-white/60 text-xs font-bold uppercase tracking-widest px-2">Popular:</span>
                {["Cardiology", "Neurology", "Checkup Plans", "Best Doctors"].map(tag => (
                  <button key={tag} className="text-white/80 hover:text-white text-xs font-bold uppercase tracking-widest hover:underline transition-all underline-offset-4">
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Notifications Dropdown */}
      <AnimatePresence>
        {showNotifications && (
          <div className="fixed inset-0 z-[120] pointer-events-none">
            <div 
              className="absolute inset-0 pointer-events-auto"
              onClick={() => setShowNotifications(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-[80px] right-4 md:right-[150px] xl:right-[300px] w-full max-w-[380px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden pointer-events-auto"
            >
              <div className="p-6 bg-[#F8FAFC] border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-[#0B2132] font-extrabold text-lg flex items-center gap-2">
                  <Bell size={20} className="text-[#19718A]" />
                  Notifications
                </h3>
                <span className="bg-[#19718A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">3 New</span>
              </div>
              <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                {notifications.map((note) => (
                  <div key={note.id} className="p-5 hover:bg-gray-50 transition-colors border-b border-gray-50 group cursor-pointer">
                    <div className="flex gap-4">
                      <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center ${note.color}`}>
                        {note.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-[#0B2132] font-bold text-sm leading-tight group-hover:text-[#19718A] transition-colors">{note.title}</h4>
                          <span className="text-gray-400 text-[10px] font-bold">{note.time}</span>
                        </div>
                        <p className="text-gray-500 text-xs font-medium leading-relaxed">{note.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-white text-center border-t border-gray-100">
                <button className="text-[#19718A] text-xs font-bold uppercase tracking-widest flex items-center gap-2 mx-auto hover:gap-3 transition-all">
                  View All Notifications
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AuthModals 
        states={{ showLoginModal, showSignupModal, showForgetModal, showOtpModal, showNewPassModal, showLogoutModal }}
        setters={{ setShowLoginModal, setShowSignupModal, setShowForgetModal, setShowOtpModal, setShowNewPassModal, setShowLogoutModal }}
      />
    </>
  );
};

/* Authentication Modals Component to keep the return clean */
const AuthModals = ({ 
  states, 
  setters 
}) => {
  const { 
    showLoginModal, showSignupModal, showForgetModal, 
    showOtpModal, showNewPassModal, showLogoutModal 
  } = states;
  const { 
    setShowLoginModal, setShowSignupModal, setShowForgetModal, 
    setShowOtpModal, setShowNewPassModal, setShowLogoutModal 
  } = setters;

  return (
    <>
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
    </>
  );
};

export default HospitalNavbar;
