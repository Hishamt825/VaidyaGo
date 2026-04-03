import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/v.png";

const Side_app = ({ active = "Dashboard", setActive, isMobileOpen, setIsMobileOpen }) => {
  const navigate = useNavigate();

  const menu = [
    { 
      name: "Dashboard", 
      icon: (
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="4" y="4" width="6" height="6" rx="1" strokeWidth="2" />
          <rect x="14" y="4" width="6" height="6" rx="1" strokeWidth="2" />
          <rect x="4" y="14" width="6" height="6" rx="1" strokeWidth="2" />
          <rect x="14" y="14" width="6" height="6" rx="1" strokeWidth="2" />
        </svg>
      ), 
      path: "#" 
    },
    { 
      name: "Appointment", 
      icon: (
        <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          <circle cx="12" cy="13" r="2.5" strokeWidth="1.8" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 19c0-1.5 2-3 4-3s4 1.5 4 3" />
        </svg>
      ), 
      path: "/App_Dashboard" 
    },

    { 
      name: "Patients", 
      icon: (
        <svg className="w-[19px] h-[19px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ), 
      path: "/Patients" 
    },
    { 
      name: "Consultation", 
      icon: (
        <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 11v6m-3-3h6" />
        </svg>
      ), 
      path: "/Consultation" 
    },
    { 
      name: "Add Slots", 
      icon: (
        <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
        </svg>
      ), 
      path: "/AddSlots" 
    },
    { 
      name: "Chatbot", 
      icon: (
        <svg className="w-[19px] h-[19px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ), 
      path: "/Bot" 
    },
  ];


  const activeIndex = menu.findIndex(m => m.name === active);

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[40] lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className={`
        fixed lg:static inset-y-0 left-0 z-[50]
        w-[260px] min-h-screen bg-[#F7F9FB] font-sans flex flex-col
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>

        {/* LOGO CONTAINER */}
        <div className={`relative w-[240px] pb-6 bg-white border-[1.8px] border-[#166E83] shadow-[0_2px_6px_rgba(0,0,0,0.12)] border-l-0 ${activeIndex === 0 ? "border-b-[1.8px] rounded-br-[20px] pb-[50px]" : "border-b-0 pb-0"
          } pt-[20px] z-10 flex justify-center transition-all`}>
          <img
            src={logo}
            alt="VDGo Logo"
            className="w-[165px] h-auto object-contain pl-[10px] mb-[2px]"
          />
        </div>

        {/* MENU ITEMS & CAPSULE CONTAINER */}
        <div className="relative w-[240px] flex flex-col flex-1 z-10">

          {/* TEXT BLOCKS */}
          {menu.map((item, index) => {
            const isActive = active === item.name;

            let roundedClasses = "";
            let borderClasses = "border-r-[1.8px] shadow-[0_2px_6px_rgba(0,0,0,0.12)] border-[#166E83]";

            if (isActive) {
              roundedClasses = "rounded-r-[26px]";
              borderClasses = "bg-[#18728A] border-none shadow-[4px_2px_12px_rgba(24,114,138,0.2)] my-2 w-[95%]";
            } else {
              borderClasses += " bg-white w-full";

              // Top corner rounding logic (if item is right below active)
              if (index === activeIndex + 1) {
                roundedClasses += " rounded-tr-[20px]";
                borderClasses += " border-t-[1.8px] pt-[2px]";
              }
              // Bottom corner rounding logic (if item is right above active)
              if (index === activeIndex - 1) {
                roundedClasses += " rounded-br-[20px]";
                borderClasses += " border-b-[1.8px] pb-[2px]";
              }
            }

            return (
              <div key={`text-${item.name}`} className={`flex items-center h-[54px] relative ${roundedClasses} ${borderClasses} transition-all`}>
                <button
                  onClick={() => {
                    if (setActive) setActive(item.name);
                    if (item.path) navigate(item.path);
                  }}
                  className={`w-full text-left font-semibold text-[18px] tracking-wide transition-colors pl-[60px] h-full flex items-center justify-between pr-4 ${isActive ? "text-white" : "text-[#166E83] hover:text-[#115568]"
                    }`}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <svg className="w-[20px] h-[20px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </div>
            );
          })}

          {/* BOTTOM FILLER TO CONTINUE RIGHT BORDER TILL SCREEN BOTTOM */}
          <div className={`flex-1 w-full bg-white border-r-[1.8px] border-[#166E83] ${activeIndex === menu.length - 1 ? "border-t-[1.8px] rounded-tr-[20px] mt-[4px]" : ""
            }`}></div>

          {/* CAPSULE CONTAINER */}
          <div
            className="absolute left-[1px] top-[-18px] w-[50px] bg-white border-[1.8px] border-[#166E83] rounded-[36px] flex flex-col items-center py-3 z-30"
            style={{
              boxShadow: "-1px 4px 14px rgba(22, 110, 131, 0.45)"
            }}
          >
            {menu.map((item) => {
              const isActive = active === item.name;
              return (
                <div key={`icon-${item.name}`} className={`w-full flex justify-center items-center h-[54px] ${isActive ? "my-1" : ""}`}>
                  <button
                    onClick={() => {
                      if (setActive) setActive(item.name);
                      if (item.path) navigate(item.path);
                    }}
                    className={`w-[42px] h-[42px] rounded-full flex items-center justify-center transition-all ${isActive ? "bg-[#18728A] shadow-[0_2px_8px_rgba(24,114,138,0.4)] text-white" : "bg-transparent hover:bg-gray-100 text-[#166E83]"
                      }`}
                  >
                    {item.icon}
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
};

export default Side_app;
