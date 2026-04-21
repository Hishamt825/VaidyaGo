import React from "react";
import logoUrl from "../../../assets/logo_1.svg";
import dashboardIcon from "../../../assets/income.svg";
import appointmentIcon from "../../../assets/appointment.svg";
import patientsIcon from "../../../assets/total_patients.svg";
import consultationIcon from "../../../assets/consultations.svg";

const Sidebar = ({ active = "Appointment", setActive }) => {
  const menu = [
    { name: "Dashboard", icon: dashboardIcon },
    { name: "Appointment", icon: appointmentIcon },
    { name: "Patients", icon: patientsIcon },
    { name: "Consultation", icon: consultationIcon },
  ];
  const logo = logoUrl;


  const activeIndex = menu.findIndex(m => m.name === active);
  const pillHeight = menu.length * 54;

  return (
    <div className="w-[240px] min-h-screen bg-transparent font-sans relative flex flex-col">

      {/* LOGO CONTAINER */}
      <div className={`relative w-[210px] pb-6 bg-white border-[1.5px] border-[#166E83] border-l-0 ${
        activeIndex === 0 ? "border-b-[1.5px] rounded-br-[22px]" : "border-b-0"
      } pt-[20px] z-20 flex justify-center transition-all`}>
        <img
          src={logo}
          alt="VDGo Logo"
          className="w-[125px] h-auto object-contain pl-[12px] mb-[12px]"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/120x40?text=Logo";
          }}
        />
      </div>

      {/* MENU ITEMS & CAPSULE CONTAINER */}
      <div className="relative w-[210px] flex flex-col flex-1 shrink-0">
        
        {/* Z-[5] MAIN LEFT PILL OUTLINE */}
        <div 
          className="absolute left-[1px] top-[0] w-[46px] border-[1.5px] border-[#166E83] rounded-full pointer-events-none z-[5]"
          style={{ height: `${pillHeight}px` }}
        ></div>

        {/* Z-10 ACTIVE BACKGROUND BLOCK */}
        {activeIndex !== -1 && (
          <div 
            className="absolute left-[2px] w-[208px] h-[54px] bg-[#18728A] rounded-l-full rounded-r-[22px] z-10 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ transform: `translateY(${activeIndex * 54}px)` }}
          >
            {/* White Arrow on the right */}
            <div className="absolute right-[14px] top-1/2 -translate-y-1/2 text-white opacity-90">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        )}

        {/* Z-20 NAV ITEMS */}
        <nav className="flex flex-col relative z-20 w-full pt-[0px]">
          {menu.map((item, index) => {
            const isActive = active === item.name;
            const isImmediatelyAbove = index === activeIndex - 1;
            const isImmediatelyBelow = index === activeIndex + 1;

            return (
              <button 
                key={`nav-${item.name}`} 
                onClick={() => setActive && setActive(item.name)}
                className="flex items-center h-[54px] w-full group focus:outline-none focus:ring-0 bg-transparent text-left"
              >
                {/* ICON AREA Base - Transparent so pill / active bg shows behind */}
                <div className="w-[48px] h-[54px] flex items-center justify-center shrink-0 transition-colors duration-200">
                  <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center transition-all ${isActive ? "" : "hover:bg-gray-100/50"}`}>
                    <img
                      src={item.icon}
                      alt={item.name}
                      className={`w-[20px] h-[20px] object-contain transition-all duration-300 relative z-30 ${isActive ? "brightness-0 invert" : ""}`}
                    />
                  </div>
                </div>
                
                {/* TEXT AREA Base */}
                <div 
                  className={`flex-1 h-full flex items-center pl-[12px] transition-all duration-300 relative
                    ${!isActive ? 'bg-white border-r-[1.5px] border-[#166E83]' : ''}
                    ${isImmediatelyAbove ? 'border-b-[1.5px] rounded-br-[22px]' : ''}
                    ${isImmediatelyBelow ? 'border-t-[1.5px] rounded-tr-[22px]' : ''}
                  `}
                >
                   <span className={`font-bold text-[15.5px] tracking-wide transition-colors duration-200 relative z-20 leading-none pb-[2px] ${isActive ? 'text-white' : 'text-[#166E83] group-hover:text-[#115568]'}`}>
                     {item.name}
                   </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* BOTTOM FILLER TO CONTINUE RIGHT BORDER TILL SCREEN BOTTOM */}
        <div className="flex-1 min-h-[500px] w-full relative z-20">
          <div className={`w-[210px] h-full bg-white border-r-[1.5px] border-[#166E83] transition-all duration-300 ${
            activeIndex === menu.length - 1 ? "border-t-[1.5px] rounded-tr-[22px]" : ""
          }`}></div>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;