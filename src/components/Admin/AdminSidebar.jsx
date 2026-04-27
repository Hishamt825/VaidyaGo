import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import activeImg from "../../assets/active.png";
import pendingImg from "../../assets/pending.png";
import rejectedImg from "../../assets/rejected.png";

const AdminSidebar = ({ active = "Dashboard", activeSub: activeSubProp = "Active Doctors", setActive, isMobileOpen, setIsMobileOpen, startSubmenuOpen }) => {
  const navigate = useNavigate();
  const [activeSub, setActiveSub] = useState(activeSubProp);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(startSubmenuOpen !== undefined ? startSubmenuOpen : active === "Doctors");

  const menu = [
    { name: "Dashboard", icon: "/assets/a.png", path: "/Admin_dashboard1" },
    { name: "Doctors", icon: "/assets/doc.png", path: "/admin-doctor", hasSubmenu: true },
    { name: "Appointments", icon: "/assets/app.png", path: "/Appointment2" },
  ];
  const logo = "/assets/name.png";

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
        w-[260px] h-screen bg-white font-sans flex flex-col
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>

        {/* LOGO CONTAINER */}
        <div className={`relative w-[240px] pb-6  bg-white border-[1.8px] border-[#166E83] shadow-[0_2px_6px_rgba(0,0,0,0.12)] border-l-0 ${activeIndex === 0 ? "border-b-[1.8px] rounded-br-[20px] pb-[50px]" : "border-b-0 pb-0"
          } pt-[20px] z-10 flex justify-center transition-all`}>
          <img
            src={logo}
            alt="VDGo Logo"
            className="w-[165px] h-auto object-contain pl-[10px] mb-[2px]"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/120x40?text=Logo";
            }}
          />
        </div>

        {/* MENU ITEMS & CAPSULE CONTAINER */}
        <div className="relative w-[240px]  flex flex-col flex-1 z-10 ">

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
              <React.Fragment key={`text-${item.name}`}>
                <div className={`flex items-center h-[54px] relative ${roundedClasses} ${borderClasses} transition-all`}>
                  <button
                    onClick={() => {
                      if (setActive) setActive(item.name);
                      if (item.path) navigate(item.path);
                    }}
                    className={`w-full text-left font-semibold text-[18px] tracking-wide transition-colors pl-[60px] h-full flex items-center justify-between pr-4 ${isActive ? "text-white" : "text-[#166E83] hover:text-[#115568]"
                      }`}
                  >
                    <span>{item.name}</span>
                    {item.hasSubmenu && isActive && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsSubmenuOpen(!isSubmenuOpen);
                        }}
                        className="cursor-pointer p-1 rounded-full hover:bg-white/10 transition-colors"
                      >
                        <svg className={`w-[24px] h-[24px] text-white transform transition-transform duration-300 ${isSubmenuOpen ? "rotate-90" : "rotate-0"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>

                {/* Doctors Submenu dropdown */}
                {isActive && item.hasSubmenu && isSubmenuOpen && (
                  <div className="relative w-full bg-white border-[#166E83] flex flex-col pt-3 pb-4 z-0 h-[165px]">
                    {/* Master vertical line that stops at the last item */}
                    <div className="absolute left-[60px] top-[-15px] bottom-[30px] w-[1.5px] bg-[#166E83]"></div>

                    <div className="flex flex-col gap-[14px] w-full z-10 relative">
                      {[
                        { name: "Active Doctors", icon: activeImg },
                        { name: "Pending Doctors", icon: pendingImg },
                        { name: "Rejected Doctors", icon: rejectedImg },
                      ].map((sub, i) => {
                        const isSubActive = activeSub === sub.name;
                        return (
                          <div key={i} className="flex items-center relative pl-[60px] h-[32px]">
                            {/* Horizontal branch line */}
                            <div className="w-[14px] h-[1.5px] bg-[#166E83] shrink-0"></div>

                            {/* The Pill */}
                            <div
                              onClick={() => {
                                setActiveSub(sub.name);
                                if (sub.name === "Active Doctors") {
                                  navigate("/admin-doctor?view=active");
                                } else if (sub.name === "Pending Doctors") {
                                  navigate("/admin-doctor?view=pending");
                                } else if (sub.name === "Rejected Doctors") {
                                  navigate("/Reject");
                                }
                              }}
                              className={`border-[1.8px] border-[#166E83] rounded-full pl-[4px] pr-[16px] py-[3.5px] flex items-center gap-[10px] bg-white cursor-pointer hover:bg-teal-50 ml-0 transition-all duration-300 w-[185px] ${isSubActive ? "shadow-[0_4px_12px_rgba(22,110,131,0.35)]" : "shadow-none"}`}
                            >
                              <div className={`w-[26px] h-[26px] rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${isSubActive ? "bg-[#166E83]" : "bg-transparent border-[1.5px] border-[#166E83]"}`}>
                                <img
                                  src={sub.icon}
                                  alt={sub.name}
                                  className={`w-[14px] h-[14px] object-contain transition-all duration-300 ${isSubActive ? "invert brightness-0 saturate-200" : "brightness-0 opacity-80"}`}
                                  style={!isSubActive ? { filter: 'invert(32%) sepia(87%) saturate(464%) hue-rotate(145deg) brightness(91%) contrast(92%)' } : {}}
                                />
                              </div>
                              <span className="font-bold text-[#166E83] text-[14px] whitespace-nowrap leading-none mt-[1px]">{sub.name}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </React.Fragment>
            )
          })}

          {/* BOTTOM FILLER TO CONTINUE RIGHT BORDER TILL SCREEN BOTTOM */}
          <div className={`flex-1 w-full bg-white border-r-[1.8px] border-[#166E83] ${activeIndex === menu.length - 1 ? "border-t-[1.8px] rounded-tr-[20px] mt-[4px]" : ""
            }`}></div>

          {/* CAPSULE - Has the exact highlighted shadow over the border! */}
          <div
            className="absolute left-[1px] top-[-18px] w-[49px] bg-white border-[1.8px] border-[#166E83] rounded-[36px] flex flex-col items-center py-3 z-30"
            style={{
              boxShadow: "-1px 4px 14px rgba(22, 110, 131, 0.45)"
            }}
          >
            {menu.map((item) => {
              const isActive = active === item.name;
              return (
                <React.Fragment key={`icon-${item.name}`}>
                  <div className={`w-full flex justify-center items-center h-[54px] ${isActive ? "my-1" : ""}`}>
                    <button
                      onClick={() => {
                        if (setActive) setActive(item.name);
                        if (item.path) navigate(item.path);
                      }}
                      className={`w-[42px] h-[42px] rounded-full flex items-center justify-center transition-all ${isActive ? "bg-[#18728A] shadow-[0_2px_8px_rgba(24,114,138,0.4)]" : "bg-transparent hover:bg-gray-100"
                        }`}
                    >
                      <img
                        src={item.icon}
                        alt={item.name}
                        className={`w-[20px] h-[20px] object-contain transition-all duration-300 ${isActive ? "invert brightness-0" : ""
                          }`}
                      />
                    </button>
                  </div>
                  {/* Ensure icon column aligns with submenu height */}
                  {isActive && item.hasSubmenu && isSubmenuOpen && <div className="w-full h-[165px]"></div>}
                </React.Fragment>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminSidebar;