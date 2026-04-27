import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUrl from '../../../assets/logo_1.svg';
import img1 from '../../../assets/Ellipse_139.svg';
import AdminSidebar from '../../../components/Admin/AdminSidebar';
import DasyWilliam from '../../../components/Admin/DasyWilliam';
import { AnimatePresence } from 'framer-motion';


const navItems = [
  { id: 'dashboard', label: 'Dashboard', 
    icon: (
       <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <rect x="4" y="4" width="6" height="6" rx="1" strokeWidth="2" />
         <rect x="14" y="4" width="6" height="6" rx="1" strokeWidth="2" />
         <rect x="4" y="14" width="6" height="6" rx="1" strokeWidth="2" />
         <rect x="14" y="14" width="6" height="6" rx="1" strokeWidth="2" />
       </svg>
    ) 
  },
  { id: 'appointment', label: 'Appointment', 
    icon: (
       <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
         <circle cx="12" cy="13" r="2.5" strokeWidth="1.8" />
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 19c0-1.5 2-3 4-3s4 1.5 4 3" />
       </svg>
    )
  },
  { id: 'patients', label: 'Patients', 
    icon: (
       <svg className="w-[19px] h-[19px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
       </svg>
    )
  },
  { id: 'consultation', label: 'Consultation', 
    icon: (
       <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 11v6m-3-3h6" />
       </svg>
    )
  }
];

const Appointment2 = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('appointment');
  const activeIndex = navItems.findIndex(item => item.id === activeNav);
  const [active, setActive] = useState("Appointments");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const menuRef = useRef(null);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const [selectedPatientForDetails, setSelectedPatientForDetails] = useState(null);

  // Date Logic
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 13)); // 13 Feb 2026
  
  const handlePrevDay = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    setCurrentDate(prev);
  };

  const handleNextDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    setCurrentDate(next);
  };

  const formattedDate = currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ');

  // Setup tabs
  const statusTabs = ['ALL', 'CONFIRMED', 'PENDING', 'CANCELLED'];
  const [activeTab, setActiveTab] = useState('CONFIRMED');
  const [tabStyle, setTabStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef([]);

  useEffect(() => {
    // Small delay to ensure refs are attached and layout is computed on first render
    const timeoutId = setTimeout(() => {
      const activeIndex = statusTabs.indexOf(activeTab);
      const activeEl = tabsRef.current[activeIndex];
      if (activeEl) {
        setTabStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
        });
      }
    }, 10);
    return () => clearTimeout(timeoutId);
  }, [activeTab]);

  // Mock data arrays matching the screenshot
  // Mock data arrays matching the screenshot
  const appointments = [
    { id: 0, name: 'Saumya tiwari', gender: 'Female', age: 21, date: '14 feb 26', time: '2:00-3:30 am', status: 'Confirmed', img: img1 },
    { id: 1, name: 'Anjali Sharma', gender: 'Female', age: 24, date: '14 feb 26', time: '2:00-3:30 am', status: 'Pending', img: img1 },
    { id: 2, name: 'Vivek Kumar', gender: 'Male', age: 29, date: '14 feb 26', time: '2:00-3:30 am', status: 'Cancelled', img: img1 },
    { id: 3, name: 'Sneha Paul', gender: 'Female', age: 22, date: '14 feb 26', time: '2:00-3:30 am', status: 'Confirmed', img: img1 },
    { id: 4, name: 'Rahul Singh', gender: 'Male', age: 31, date: '14 feb 26', time: '2:00-3:30 am', status: 'Pending', img: img1 },
    { id: 5, name: 'Priya Mehra', gender: 'Female', age: 26, date: '14 feb 26', time: '2:00-3:30 am', status: 'Confirmed', img: img1 },
    { id: 6, name: 'Rajesh Khanna', gender: 'Male', age: 45, date: '14 feb 26', time: '2:00-3:30 am', status: 'Cancelled', img: img1 },
    { id: 7, name: 'Karan Johar', gender: 'Male', age: 38, date: '14 feb 26', time: '2:00-3:30 am', status: 'Confirmed', img: img1 },
    { id: 8, name: 'Zoya Akhtar', gender: 'Female', age: 35, date: '14 feb 26', time: '2:00-3:30 am', status: 'Pending', img: img1 },
    { id: 9, name: 'Amitabh B.', gender: 'Male', age: 70, date: '14 feb 26', time: '2:00-3:30 am', status: 'Confirmed', img: img1 },
    { id: 10, name: 'Deepika P.', gender: 'Female', age: 32, date: '15 feb 26', time: '10:00-11:00 am', status: 'Confirmed', img: img1 },
    { id: 11, name: 'Ranveer S.', gender: 'Male', age: 34, date: '15 feb 26', time: '11:30-12:30 pm', status: 'Pending', img: img1 },
    { id: 12, name: 'Alia Bhatt', gender: 'Female', age: 28, date: '15 feb 26', time: '1:00-2:00 pm', status: 'Cancelled', img: img1 },
    { id: 13, name: 'Shah Rukh', gender: 'Male', age: 55, date: '16 feb 26', time: '9:00-10:00 am', status: 'Confirmed', img: img1 },
    { id: 14, name: 'Salman Khan', gender: 'Male', age: 54, date: '16 feb 26', time: '4:00-5:00 pm', status: 'Pending', img: img1 },
  ];

  const filteredAppointments = appointments.filter(appt => {
    if (activeTab === 'ALL') return true;
    return appt.status.toUpperCase() === activeTab;
  });

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedRows(appointments.map(a => a.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
      setSelectAll(false);
    } else {
      const newSelected = [...selectedRows, id];
      setSelectedRows(newSelected);
      if (newSelected.length === appointments.length) setSelectAll(true);
    }
  };

  // Draggable logic for the floating bot
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0, hasMoved: false });

  const handlePointerDown = (e) => {
    setIsDragging(true);
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
    const clientY = e.clientY ?? (e.touches && e.touches[0].clientY);
    
    dragRef.current = {
      startX: clientX,
      startY: clientY,
      initialX: dragPos.x,
      initialY: dragPos.y,
      hasMoved: false
    };
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0].clientY);
      
      const dx = clientX - dragRef.current.startX;
      const dy = clientY - dragRef.current.startY;
      
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
         dragRef.current.hasMoved = true;
      }
      
      setDragPos({
        x: dragRef.current.initialX + dx,
        y: dragRef.current.initialY + dy
      });
    };

    const handlePointerUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove, { passive: false });
      window.addEventListener('touchend', handlePointerUp);
    }
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging]);

  return (
    <div className="flex h-screen w-full bg-white font-sans text-[15px] overflow-hidden text-gray-700">

      {/* Sidebar */}
      <AdminSidebar 
        active={active} 
        setActive={setActive} 
        isMobileOpen={isMobileSidebarOpen} 
        setIsMobileOpen={setIsMobileSidebarOpen} 
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-white overflow-hidden">

        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-8 pt-6 mb-6 gap-4">
          <div className="flex items-center gap-4 w-full md:max-w-[700px]">

            {/* HAMBURGER MENU (Visible only on mobile) */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-white border border-gray-100 shadow-sm"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="relative w-16 h-12 rounded-xl bg-white border border-gray-400 shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden flex items-center justify-center">
              <img src="/assets/m.png" className="w-10 relative z-10" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/60 via-transparent to-white/40 pointer-events-none z-20"></div>
              <div className="absolute inset-0 rounded-xl border border-white/40 pointer-events-none z-20"></div>
            </div>

            <div className="flex items-center w-full bg-white border-[0.3px] border-black/50 rounded-full px-4 md:px-10 py-2 md:py-3 shadow-[0_2px_6px_rgba(0,0,0,0.12)]">
              <img src="/assets/sea.png" className="w-5 h-5 md:w-6 md:h-6 mr-2 opacity-70" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent outline-none text-[16px] text-black placeholder-black opacity-80"
              />
            </div>
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <div className="flex items-center gap-3">
              <img src="/assets/sett.png" className="w-18 h-14 opacity-80" />
              <div className="w-14 h-10 bg-white border-black/50 rounded-md shadow-[0_10px_20px_rgba(10,0,0,0.2)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition">
                <img src="/assets/im.png" className="w-10 h-8 opacity-80" />
              </div>

              {/* Make Appointment Button */}
              <button className="bg-[#94b8c0] hover:bg-[#85abb2] text-[#1c3947] font-semibold text-[13.5px] py-0 h-[44px] px-[16px] rounded-xl flex items-center gap-[8px] transition-colors shadow-sm ml-2">
                <div className="w-[22px] h-[22px] bg-white rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-[14px] h-[14px] text-[#94b8c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M12 4v16m-8-8h16" />
                  </svg>
                </div>
                <span className="whitespace-nowrap">Make Appointment</span>
              </button>
            </div>

            <div className="relative" ref={menuRef}>
              <div
                onClick={() => setOpen(!open)}
                className="flex items-center gap-4 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-xl px-4 py-1 cursor-pointer hover:bg-gray-50 transition-all"
              >
                <span className="text-[18px] font-semibold text-gray-700">Dasy William</span>
                <img src="/assets/ph.png" className="w-11 h-11 rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.12)] object-cover" />
              </div>
              <AnimatePresence>
                {open && !openProfile && (
                  <DasyWilliam setOpenProfile={setOpenProfile} />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Toolbar (Date & View tabs) */}
        <div className="px-8 py-3 shrink-0 w-full flex flex-col mt-2">
          
            {/* Top Date Nav */}
            <div className="flex items-center gap-[10px] mb-5 pl-1">
               <button onClick={handlePrevDay} className="w-[32px] h-[32px] rounded-full bg-[#e2e8f0] flex items-center justify-center text-gray-500 hover:bg-gray-300 transition-colors">
                 <svg className="w-5 h-5 ml-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
               </button>
               <span className="font-bold text-[18px] text-[#333] tracking-tight relative top-[1px] min-w-[130px] text-center">{formattedDate}</span>
               <button onClick={handleNextDay} className="w-[32px] h-[32px] rounded-full bg-[#e2e8f0] flex items-center justify-center text-gray-500 hover:bg-gray-300 transition-colors">
                 <svg className="w-5 h-5 mr-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
               </button>
            </div>

            {/* Tabs Row */}
            <div className="bg-white border border-gray-600 rounded-full h-[52px] flex items-center px-[5px] justify-between shadow-[0_2px_10px_rgba(0,0,0,0.03)] w-full">
               <div className="relative flex items-center h-full gap-[24px] px-[8px]">
                  {/* Animated Background */}
                  <div 
                    className="absolute h-[40px] bg-[#339eb3] rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-0"
                    style={{ left: tabStyle.left, width: tabStyle.width }}
                  ></div>
                  
                  {statusTabs.map((tab, idx) => {
                    const isActive = activeTab === tab;
                    return (
                      <button 
                        key={tab}
                        ref={el => tabsRef.current[idx] = el}
                        onClick={() => setActiveTab(tab)}
                        className={`relative z-10 font-bold text-[15px] px-[24px] py-[8px] tracking-wide transition-colors uppercase whitespace-nowrap ${isActive ? 'text-white' : 'text-gray-600 hover:text-gray-800'}`}
                      >
                         {tab}
                      </button>
                    )
                  })}
               </div>
               <div className="flex items-center gap-[16px] pr-[16px]">
                  {/* Grid Icon (Inactive) */}
                  <button className="text-gray-500 hover:text-gray-700 transition-colors">
                     <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2.5" />
                        <line x1="3" y1="9" x2="21" y2="9" />
                        <line x1="3" y1="15" x2="21" y2="15" />
                        <line x1="12" y1="9" x2="12" y2="21" />
                     </svg>
                  </button>
                  {/* List Icon (Active, Teal) */}
                  <button className="text-[#1a899f] transition-colors">
                     <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2.5" />
                        <line x1="3" y1="9" x2="21" y2="9" />
                        <line x1="3" y1="15" x2="21" y2="15" />
                        <rect x="6" y="5.5" width="2.5" height="2.5" fill="currentColor" stroke="none" />
                        <rect x="6" y="11.5" width="2.5" height="2.5" fill="currentColor" stroke="none" />
                        <rect x="6" y="17.5" width="2.5" height="2.5" fill="currentColor" stroke="none" />
                     </svg>
                  </button>
               </div>
            </div>
        </div>

        {/* Table Area */}
        <div className="flex-1 overflow-auto p-4 pl-6 pr-6">
          <div className="w-full border border-gray-600 rounded-[10px] overflow-hidden flex flex-col pt-1">

            {/* Table Header */}
            <div className="grid grid-cols-[auto_1.5fr_1fr_1fr_1fr_1.5fr_1fr_auto] gap-4 items-center px-4 py-4 border-b border-gray-600 text-[15px] font-bold text-black tracking-wide uppercase">
              <div className="w-4" /> {/* Checkbox placeholder space */}
              <div className="text-left">Patient Name</div>
              <div className="text-center">Gender</div>
              <div className="text-center">Age</div>
              <div className="text-center">Date</div>
              <div className="text-center">Time</div>
              <div className="text-center">Status</div>
              <div className="text-right pr-2">Action</div>
            </div>

            {/* Table Body */}
            <div className="flex flex-col p-2 gap-[3px] bg-white">
              {filteredAppointments.map((appt, idx) => {
                const isSelected = selectedRows.includes(appt.id);
                // First row looks like it is selected with black box, others are white boxes
                const isFirstRow = idx === 0 && selectedRows.length === 0 && activeTab === 'ALL'; // mimic initial screenshot look if nothing touched
                const checkActive = isSelected || isFirstRow;

                return (
                  <div key={idx} className={`grid grid-cols-[auto_1.5fr_1fr_1fr_1fr_1.5fr_1fr_auto] gap-4 items-center px-2 py-[10px] min-h-[52px] text-[15px] font-semibold text-gray-800 rounded shadow-sm border border-transparent hover:border-[#bae6fd] bg-[#f2f8f9]`}>

                    {/* Checkbox */}
                    <div className="flex items-center justify-center pl-1">
                      <button
                        onClick={() => handleSelectRow(appt.id)}
                        className={`w-4 h-4 rounded-[2px] border ${checkActive ? 'bg-black border-black text-white' : 'bg-white border-gray-600'} flex items-center justify-center focus:outline-none`}
                      >
                        {(checkActive) && (
                          <svg className="w-[10px] h-[10px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                        )}
                      </button>
                    </div>

                    {/* Content */}
                    <div>{appt.name}</div>
                    <div className="text-center">{appt.gender}</div>
                    <div className="text-center">{appt.age}</div>
                    <div className="text-center">{appt.date}</div>
                    <div className="text-center">{appt.time}</div>

                    <div className={`text-center font-bold ${
                      appt.status === 'Confirmed' ? 'text-[#16a34a]' : 
                      appt.status === 'Pending' ? 'text-orange-500' : 
                      'text-red-500'
                    }`}>
                      {appt.status}
                    </div>

                    {/* Action */}
                    <div className="text-right pr-1">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedPatientForDetails(appt);
                        }}
                        className="px-3 py-0.5 bg-white border border-gray-600 rounded text-[9px] text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none font-bold relative z-50 cursor-pointer"
                      >
                        view
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>

        {/* Floating Bot Icon */}
        <div 
          className="fixed bottom-10 right-10 z-50 touch-none select-none group"
          style={{ transform: `translate(${dragPos.x}px, ${dragPos.y}px)`, cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
          onClick={(e) => {
            if (dragRef.current.hasMoved) {
              e.preventDefault();
              return;
            }
            navigate('/Bot');
          }}
        >
           <div className="w-[54px] h-[54px] bg-[#1a738c] rounded-[24px] flex justify-center items-center shadow-lg border-[2px] border-[#a0cddb] hover:bg-[#155b70] transition-colors relative" style={{ borderRadius: '50% 50% 50% 12px'}}>
              <svg className="w-[28px] h-[28px] text-white pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12 2a2 2 0 012 2v2h2a4 4 0 014 4v7a4 4 0 01-4 4H8a4 4 0 01-4-4v-7a4 4 0 014-4h2V4a2 2 0 012-2zm0 14a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-3.5-5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm7 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
              </svg>
              <div className="absolute top-[0px] right-[-6px] bg-[#65d065] text-white text-[10px] font-extrabold px-[6px] py-[3px] rounded-[6px] rounded-bl-sm tracking-widest shadow-sm border border-[#52af52] leading-none pointer-events-none">
                 ...
              </div>
           </div>
        </div>

      </main>

      {/* Patient Details Modal */}
      {selectedPatientForDetails && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(1px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedPatientForDetails(null) }}
        >
          <div className="bg-white rounded-[16px] w-full max-w-[950px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border-[1px] border-gray-100">
             {/* Header */}
             <div className="px-[30px] pt-[28px] pb-[16px]">
               <h2 className="text-[22px] font-bold text-black tracking-wide">Details</h2>
             </div>
             
             {/* Scrollable Body */}
             <div className="px-[30px] pb-[30px] overflow-y-auto flex flex-col gap-[28px]" style={{ scrollbarWidth: 'none' }}>
               
               {/* 3 Columns Section */}
               <div className="flex gap-[20px] items-stretch">
                 
                 {/* Col 1: Profile */}
                 <div className="w-[245px] border-[1.5px] border-[#cce5ee] rounded-[10px] p-[24px] flex flex-col items-center justify-start py-[30px] shadow-sm shrink-0 bg-white">
                    <div className="w-[105px] h-[105px] rounded-full bg-yellow-400 p-[3px] shadow-lg overflow-hidden mb-[16px] border-[2px] border-white">
                      <img src={selectedPatientForDetails.img} className="w-full h-full object-cover rounded-full bg-white" alt="profile" />
                    </div>
                    <h3 className="text-[17.5px] font-[700] text-[#333] mb-[6px] tracking-wide text-center leading-tight">
                      {selectedPatientForDetails.name}
                    </h3>
                    <div className="text-[12.5px] font-[600] text-[#2db3c6] mb-[2px]">Mob. +912133218765</div>
                    <div className="text-[11px] text-[#666] font-[400]">Email-saumya21@gmail.com</div>
                    
                    <div className="mt-auto pt-[40px]">
                       <img src={logoUrl} alt="VaDyaGo" className="h-[42px] opacity-90 mix-blend-multiply" />
                    </div>
                 </div>

                 {/* Col 2: General Information */}
                 <div className="w-[290px] border-[1.5px] border-[#cce5ee] rounded-[10px] overflow-hidden flex flex-col shadow-sm shrink-0 bg-white">
                    <div className="px-[16px] py-[12px] font-bold text-[#111] text-[13.5px]">
                      Genral Information
                    </div>
                    <div className="px-[16px] pb-[16px] flex flex-col gap-[10px] flex-1 border-t-[1.5px] border-[#cce5ee] pt-[18px]">
                       {[
                         { label: 'Date of birth:', value: '02-feb-2026' },
                         { label: 'Gender:', value: selectedPatientForDetails.gender },
                         { label: 'Blood Type:', value: 'A+' },
                         { label: 'Height:', value: '1.78m' },
                         { label: 'Weight:', value: '55kg' },
                         { label: 'Patient:', value: '11A2026/033968' },
                         { label: 'Diseases:', value: 'Diabetes,Asthma' },
                         { label: 'Last visit:', value: '10-feb-2026' },
                         { label: 'Register.Date:', value: '29-jan-2026' },
                         { label: 'Address:', value: 'Gorakhpur,273015' }
                       ].map((info, idx) => (
                         <div key={idx} className="flex items-center text-[11.5px] justify-between border-b-[1.5px] border-gray-200/60 pb-[5px] last:border-0 last:pb-0">
                           <span className="font-bold text-[#333] w-[100px] shrink-0">{info.label}</span>
                           <span className="text-gray-500 font-[500] text-left flex-1 pl-[10px] truncate">{info.value}</span>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Col 3: Reports */}
                 <div className="flex-1 border-[1.5px] border-[#cce5ee] rounded-[10px] overflow-hidden flex flex-col shadow-sm bg-white">
                    <div className="px-[16px] py-[12px] flex justify-between items-center bg-white border-b-[1.5px] border-[#cce5ee]">
                       <h4 className="font-bold text-[#111] text-[13.5px]">Reports</h4>
                       <button className="text-[#3a8bdf] text-[11px] font-bold hover:underline tracking-wide bg-transparent border-none cursor-pointer">
                         + Add Reports
                       </button>
                    </div>
                    <div className="flex flex-col">
                       {[
                         { title: 'CeckUp Result', date: '13 - feb - 2026', checked: false },
                         { title: 'Medicine prescription', date: '14 - feb - 2026', checked: false },
                         { title: 'CeckUp Result', date: '13 - feb - 2026', checked: false },
                         { title: 'CT Scan full body', date: '14 - feb - 2026', checked: false },
                         { title: 'Eye Test', date: '13 - feb - 2026', checked: true },
                         { title: 'Nipah Virus', date: '14 - feb - 2026', checked: false },
                         { title: 'Blood Sugar', date: '13 - feb - 2026', checked: false },
                         { title: 'Skin Check', date: '14 - feb - 2026', checked: false }
                       ].map((rep, idx) => (
                         <div key={idx} className={`flex items-center justify-between px-[16px] py-[10.5px] border-b border-gray-200/50 last:border-0 ${idx % 2 === 0 ? 'bg-[#e4e5e7]/40' : 'bg-white'}`}>
                            <div className="w-[45%] text-[#555] text-[11.5px] font-[500] truncate">{rep.title}</div>
                            <div className="w-[35%] text-[#555] text-[11.5px] font-[500]">{rep.date}</div>
                            <div className="flex items-center gap-[10px] w-[20%] justify-end">
                               <button className="w-[22px] h-[22px] flex items-center justify-center border-[1.5px] border-gray-300 rounded-[5px] hover:bg-gray-100 bg-white text-gray-500 shadow-sm">
                                 <svg className="w-[13px] h-[13px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                               </button>
                               <button className="w-[22px] h-[22px] flex items-center justify-center border-[1.5px] border-gray-300 rounded-[5px] hover:bg-gray-100 bg-white text-[#309bc0] shadow-sm">
                                 {rep.checked ? (
                                   <svg className="w-[14px] h-[14px] text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                 ) : (
                                   <svg className="w-[13px] h-[13px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                                   </svg>
                                 )}
                               </button>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

               </div>

               {/* Bottom Section: Appointments */}
               <div>
                 <div className="flex justify-between items-center mb-[14px]">
                    <h3 className="text-[19px] font-bold text-black tracking-wide">Appointment</h3>
                    <button className="text-[#3a8bdf] text-[12px] tracking-wide font-bold hover:underline bg-transparent border-none cursor-pointer">
                      +Add Appointment
                    </button>
                 </div>

                 <div className="border-[1.5px] border-[#cce5ee] rounded-[10px] overflow-hidden shadow-sm bg-white relative">
                    {/* Header Tabs */}
                    <div className="flex border-b-[1.5px] border-[#cce5ee]">
                       <div className="px-[24px] py-[14px] text-[#3a8bdf] font-bold text-[14px] cursor-pointer">All Appointment</div>
                       <div className="px-[24px] py-[14px] text-gray-500 font-bold text-[14px] cursor-pointer hover:bg-gray-50">Completed</div>
                    </div>

                    {/* Table Header */}
                    <div className="flex px-[30px] py-[16px] text-[#111] font-[700] text-[13.5px] bg-white border-b border-gray-200">
                       <div className="w-[25%] text-left">Date</div>
                       <div className="w-[30%] text-center">Treatment Type</div>
                       <div className="w-[25%] text-center">Booking Time</div>
                       <div className="w-[20%] text-right font-bold">Payment</div>
                    </div>

                    {/* Table Rows */}
                    <div className="flex flex-col max-h-[240px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                       {[
                         { date: '13 feb,2026', type: 'Regular checkUp', time: '4:00 pm', status: 'Pending' },
                         { date: '02 feb,2026', type: 'OPD', time: '10:00 am', status: 'Complete' },
                         { date: '20 Jan,2026', type: 'Regular checkUp', time: '12:30 pm', status: 'Complete' },
                         { date: '19 Dec,2025', type: 'OPD', time: '9:30 am', status: 'Complete' },
                         { date: '10 Nov,2025', type: 'Regular checkUp', time: '11:15 am', status: 'Complete' },
                         { date: '05 Oct,2025', type: 'OPD', time: '3:45 pm', status: 'Complete' },
                         { date: '22 Aug,2025', type: 'Regular checkUp', time: '2:00 pm', status: 'Complete' },
                         { date: '14 Jul,2025', type: 'Skin Check', time: '10:30 am', status: 'Complete' }
                       ].map((app, idx) => (
                         <div key={idx} className={`flex px-[30px] py-[20px] text-[13px] items-center border-b border-gray-200/50 last:border-0 shrink-0 ${idx % 2 === 0 ? 'bg-[#e4e5e7]/40' : 'bg-white'}`}>
                            <div className="w-[25%] text-left font-[500] text-[#666]">{app.date}</div>
                            <div className="w-[30%] text-center font-[500] text-[#666]">{app.type}</div>
                            <div className="w-[25%] text-center font-[500] text-[#666]">{app.time}</div>
                            <div className={`w-[20%] text-right font-[500] tracking-wide ${app.status === 'Pending' ? 'text-orange-500' : 'text-[#42e46d]'}`}>
                              {app.status}
                            </div>
                         </div>
                       ))}
                    </div>
                    
                    {/* Bottom Arrow Expander */}
                    <div className="h-[28px] bg-white flex justify-center items-center pb-[6px] pt-[6px] cursor-pointer hover:bg-gray-50 border-t border-gray-100">
                       <svg className="w-[32px] h-[32px] text-[#555] stroke-[3.5px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                    </div>
                 </div>
               </div>

             </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Appointment2;
