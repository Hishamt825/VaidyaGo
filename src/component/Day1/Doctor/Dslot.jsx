import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUrl from '../../../assets/logo_1.svg';

import appointmentIcon from '../../../assets/appointment.svg';
import totalPatientsIcon from '../../../assets/total_patients.svg';
import consultationsIcon from '../../../assets/consultations.svg';
import incomeIcon from '../../../assets/income.svg';
import emergencyIcon from '../../../assets/emergency.svg';
import doctorImg from '../../../assets/image_76.svg';


// Reusing same navItems layout logic but with "Add Slots" added at the bottom
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
  },
  { id: 'add_slots', label: 'Add Slots', 
    icon: (
       <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
       </svg>
    )
  }
];

const slots = [
  { id: 1, type: 'available', time: '2:00-2:20AM', switchActive: true },
  { id: 2, type: 'break', time: '2:00-2:40 AM', switchActive: false, title: 'Doctor Break', subtitle: "Reason:Doctor's Break Time" },
  { id: 3, type: 'booked', time: '2:00-3:00AM', switchActive: false, title: 'Rahul Verma', subtitle: 'Booking ID : #A234B6' },
  { id: 4, type: 'break', time: '2:00-2:40 AM', switchActive: false, title: 'Doctor Break', subtitle: "Reason:Doctor's Break Time" },
  { id: 5, type: 'available', time: '2:00-2:20AM', switchActive: true },
  { id: 6, type: 'break', time: '2:00-2:40 AM', switchActive: false, title: 'Doctor Break', subtitle: "Reason:Doctor's Break Time" },
  { id: 7, type: 'booked', time: '2:00-3:00AM', switchActive: false, title: 'Rahul Verma', subtitle: 'Booking ID : #A23468' },
  { id: 8, type: 'break', time: '2:00-2:40 AM', switchActive: false, title: 'Doctor Break', subtitle: "Reason:Doctor's Break Time" },
  { id: 9, type: 'available', time: '2:00-2:20AM', switchActive: true }, 
  { id: 10, type: 'available', time: '2:00-2:20AM', switchActive: true },
  { id: 11, type: 'booked', time: '2:00-3:00AM', switchActive: false, title: 'Rahul Verma', subtitle: 'Booking ID : #A234B6' },
  { id: 12, type: 'break', time: '2:00-2:40 AM', switchActive: false, title: 'Doctor Break', subtitle: "Reason:Doctor's Break Time" },
  { id: 13, type: 'booked', time: '2:00-3:00AM', switchActive: false, title: 'Rahul Verma', subtitle: 'Booking ID : #A234B6' },
  { id: 14, type: 'break', time: '2:00-2:40 AM', switchActive: false, title: 'Doctor Break', subtitle: "Reason:Doctor's Break Time" },
  { id: 15, type: 'available', time: '2:00-2:20AM', switchActive: true },
];


const monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const yearsList = Array.from({length: 22}, (_, i) => 2005 + i);
const calendarDays = ['27','28','29','30','31','1','2',
  '3','4','5','6','7','8','9',
  '10','11','12','13','14','15','16',
  '17','18','19','20','21','22','23',
  '24','25','26','27','28','29','30'];

const CustomModalDatePicker = ({ initialActiveIndex, initialMonth, initialYear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDateIndex, setActiveDateIndex] = useState(initialActiveIndex);
  const [viewMonth, setViewMonth] = useState(initialMonth);
  const [viewYear, setViewYear] = useState(initialYear);
  
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  
  const [dateStyle, setDateStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const dateRefs = useRef([]);
  const yearScrollRef = useRef(null);

  useEffect(() => {
    if (isYearOpen && yearScrollRef.current) {
      const selectedEl = yearScrollRef.current.querySelector('[data-selected="true"]');
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'center' });
      }
    }
  }, [isYearOpen]);

  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        const activeEl = dateRefs.current[activeDateIndex];
        if (activeEl) {
          setDateStyle({
            left: activeEl.offsetLeft,
            top: activeEl.offsetTop,
            width: activeEl.offsetWidth,
            height: activeEl.offsetHeight,
            opacity: 1
          });
        }
      }, 30);
      return () => clearTimeout(timeoutId);
    }
  }, [activeDateIndex, isOpen]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const formattedDate = `${calendarDays[activeDateIndex].padStart(2, '0')} / ${viewMonth.slice(0,3).toLowerCase()} / ${viewYear}`;

  return (
    <div className="relative outline-none" tabIndex={0} onBlur={(e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) setIsOpen(false);
    }}>
      <div 
        onClick={toggleOpen}
        className="relative flex items-center justify-between border-[1.5px] border-gray-400 rounded-[4px] px-[12px] py-[6px] w-[145px] bg-white cursor-pointer hover:bg-gray-50 transition-colors z-[10]"
      >
        <span className="text-[#333] font-[600] text-[13px]">{formattedDate}</span>
        <svg className="w-[17px] h-[17px] text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
      </div>

      <div className={`absolute top-[110%] left-0 w-[310px] bg-white border border-gray-200 rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] z-[110] py-[16px] px-[18px] origin-top flex flex-col transition-all duration-200 ${isOpen ? 'opacity-100 scale-100 pointer-events-auto mt-[4px]' : 'opacity-0 scale-95 pointer-events-none mt-0'}`}>
          <div className="flex items-center justify-between mb-[20px]">
             <button 
               onClick={() => {
                  const currentIndex = monthsList.indexOf(viewMonth);
                  const prevIndex = currentIndex === 0 ? 11 : currentIndex - 1;
                  setViewMonth(monthsList[prevIndex]);
               }}
               className="text-[#32869e] hover:text-[#166378] transition-colors p-1"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
             </button>
             <div className="flex gap-[12px]">
                <div 
                  className="relative outline-none" 
                  tabIndex={0} 
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) setIsMonthOpen(false);
                  }}
                >
                   <div 
                     onClick={() => setIsMonthOpen(!isMonthOpen)}
                     className="flex items-center justify-between gap-[12px] bg-white border border-gray-200 rounded-[8px] px-3 py-[4px] shadow-sm cursor-pointer hover:bg-gray-50 min-w-[90px] transition-colors"
                   >
                      <span className="text-[#32869e] font-[700] text-[13px] tracking-wide">{viewMonth}</span>
                      <svg className="w-[12px] h-[12px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg>
                   </div>
                   
                   <div 
                      className={`absolute top-[-8px] left-[-8px] min-w-[130px] bg-white border border-gray-200 rounded-[12px] shadow-[0_6px_16px_rgba(0,0,0,0.08)] z-[200] overflow-hidden transition-all duration-300 origin-top
                      ${isMonthOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                   >
                      <div 
                        onClick={() => setIsMonthOpen(false)}
                        className="flex items-center justify-between px-4 pt-[10px] pb-[8px] cursor-pointer hover:bg-gray-50"
                      >
                         <span className="text-gray-800 font-[500] text-[14px]">{viewMonth}</span>
                         <svg className="w-[12px] h-[12px] text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7"/></svg>
                      </div>
                      <div className="flex flex-col max-h-[180px] overflow-y-auto pb-[10px]" style={{ scrollbarWidth: 'none' }}>
                         {monthsList.filter(m => m !== viewMonth).map(m => (
                           <div 
                             key={m}
                             onClick={() => { setViewMonth(m); setIsMonthOpen(false); }}
                             className="px-4 py-[5px] text-[13px] cursor-pointer hover:bg-gray-50 text-gray-600 font-[400]"
                           >
                              {m}
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
                <div 
                   className="relative outline-none" 
                   tabIndex={0} 
                   onBlur={(e) => {
                     if (!e.currentTarget.contains(e.relatedTarget)) setIsYearOpen(false);
                   }}
                >
                   <div 
                      onClick={() => setIsYearOpen(!isYearOpen)}
                      className="flex items-center justify-between gap-[10px] bg-white border border-gray-200 rounded-[8px] px-3 py-[4px] shadow-sm cursor-pointer hover:bg-gray-50 h-full transition-colors"
                   >
                      <span className="text-[#32869e] font-[700] text-[13px] tracking-wide">{viewYear}</span>
                      <svg className="w-[12px] h-[12px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg>
                   </div>

                   <div 
                      className={`absolute top-[-8px] right-0 min-w-[110px] bg-white border border-gray-200 rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] z-[200] overflow-hidden transition-all duration-300 origin-top
                      ${isYearOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                   >
                      <div ref={yearScrollRef} className="flex flex-col max-h-[180px] overflow-y-auto py-[10px] scroll-smooth" style={{ scrollbarWidth: 'none' }}>
                         {yearsList.map(y => {
                           const isSelected = viewYear === y;
                           if (isSelected) {
                              return (
                                 <div 
                                   key={y}
                                   data-selected="true"
                                   className="px-[10px] w-full my-[1px]"
                                   onClick={() => { setViewYear(y); setIsYearOpen(false); }}
                                 >
                                    <div className="border border-[#777] rounded-full flex items-center justify-between pl-[12px] pr-[10px] py-[4px] bg-gray-50 cursor-pointer relative">
                                       <span className="text-[#333] font-[600] text-[13px] tracking-wide">{y}</span>
                                       <svg className="w-[12px] h-[12px] text-[#444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                                       </svg>
                                    </div>
                                 </div>
                              )
                           }
                           return (
                              <div 
                                key={y}
                                onClick={() => { setViewYear(y); setIsYearOpen(false); }}
                                className="w-full pl-[24px] py-[4px] cursor-pointer hover:bg-gray-50 transition-colors text-left"
                              >
                                 <span className="text-gray-600 font-[400] text-[13px] tracking-wide">{y}</span>
                              </div>
                           )
                         })}
                      </div>
                   </div>
                </div>
             </div>
             <button 
               onClick={() => {
                  const currentIndex = monthsList.indexOf(viewMonth);
                  const nextIndex = currentIndex === 11 ? 0 : currentIndex + 1;
                  setViewMonth(monthsList[nextIndex]);
               }}
               className="text-[#32869e] hover:text-[#166378] transition-colors p-1"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
             </button>
          </div>
          
          <div className="grid grid-cols-7 mb-4 px-1">
             {['S', 'M', 'T', 'W', 'Th', 'F', 'Sat'].map(d => (
               <div key={d} className="text-center text-[#32869e] font-[700] text-[12px]">{d}</div>
             ))}
          </div>
          
          <div className="relative mt-1 px-1">
             <div 
                className="absolute bg-[#6fa7ba] rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-0"
                style={{
                   left: dateStyle.left,
                   top: dateStyle.top,
                   width: dateStyle.width,
                   height: dateStyle.height,
                   opacity: dateStyle.opacity
                }}
             />
             <div className="grid grid-cols-7 gap-y-[16px] text-[12px] font-[600] text-gray-700 relative z-10">
                {calendarDays.map((d, i) => {
                  const isPrevMonth = i < 5;
                  const isSelected = activeDateIndex === i;
                  
                  return (
                    <div key={i} className="flex justify-center items-center">
                       <span 
                         ref={el => { dateRefs.current[i] = el; }}
                         onClick={() => { setActiveDateIndex(i); setIsOpen(false); }}
                         className={`w-[26px] h-[26px] flex items-center justify-center rounded-full transition-colors cursor-pointer
                            ${isPrevMonth && !isSelected ? 'text-gray-300 font-[400]' : ''}
                            ${isSelected ? 'text-[#09151c] font-[700]' : 'hover:bg-gray-100'}
                         `}
                       >
                          {d}
                       </span>
                    </div>
                  )
                })}
             </div>
          </div>
      </div>
    </div>
  );
};

const Dslot = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('add_slots');
  const activeIndex = navItems.findIndex(item => item.id === activeNav);

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

  const [activeDateIndex, setActiveDateIndex] = useState(17); // Index 17 corresponds to day '13'
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [dateStyle, setDateStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const dateRefs = useRef([]);

  const [isYearOpen, setIsYearOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2026);
  const yearScrollRef = useRef(null);
  
  const [isPopupCalendarOpen, setIsPopupCalendarOpen] = useState(false);
  const [popupActiveDateIndex, setPopupActiveDateIndex] = useState(17);
  const [popupDateStyle, setPopupDateStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const popupDateRefs = useRef([]);

  const [isPopupMonthOpen, setIsPopupMonthOpen] = useState(false);
  const [popupSelectedMonth, setPopupSelectedMonth] = useState('January');

  const [isPopupYearOpen, setIsPopupYearOpen] = useState(false);
  const [popupSelectedYear, setPopupSelectedYear] = useState(2025);
  const popupYearScrollRef = useRef(null);

  // Modal states
  const [isAddSlotModalOpen, setIsAddSlotModalOpen] = useState(false);
  const [slotDurationOpen, setSlotDurationOpen] = useState(false);
  const [slotDuration, setSlotDuration] = useState('20 Minutes');
  const durationOptions = ['10 Minutes', '15 Minutes', '20 Minutes', '30 Minutes', '45 Minutes', '60 Minutes'];

  const [fromTime, setFromTime] = useState('09:00');
  const [toTime, setToTime] = useState('14:00');

  const formatModalTime = (t) => {
    if (!t) return '';
    const [h, m] = t.split(':');
    if (!h || !m) return t;
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    const hourStr = formattedHour < 10 && hour >= 12 ? `0${formattedHour}` : formattedHour;
    return `${hourStr}:${m} ${ampm}`;
  };


  useEffect(() => {
    if (isPopupYearOpen && popupYearScrollRef.current) {
      const selectedEl = popupYearScrollRef.current.querySelector('[data-selected="true"]');
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'center' });
      }
    }
  }, [isPopupYearOpen]);

  useEffect(() => {
    if (isPopupCalendarOpen) {
      const timeoutId = setTimeout(() => {
        const activeEl = popupDateRefs.current[popupActiveDateIndex];
        if (activeEl) {
          setPopupDateStyle({
            left: activeEl.offsetLeft,
            top: activeEl.offsetTop,
            width: activeEl.offsetWidth,
            height: activeEl.offsetHeight,
            opacity: 1
          });
        }
      }, 30);
      return () => clearTimeout(timeoutId);
    }
  }, [popupActiveDateIndex, isPopupCalendarOpen]);

  useEffect(() => {
    if (isYearOpen && yearScrollRef.current) {
      const selectedEl = yearScrollRef.current.querySelector('[data-selected="true"]');
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'center' });
      }
    }
  }, [isYearOpen]);

  useEffect(() => {
    // Small delay to ensure layout is calculated before animation style triggers
    const timeoutId = setTimeout(() => {
      const activeEl = dateRefs.current[activeDateIndex];
      if (activeEl) {
        setDateStyle({
          left: activeEl.offsetLeft,
          top: activeEl.offsetTop,
          width: activeEl.offsetWidth,
          height: activeEl.offsetHeight,
          opacity: 1
        });
      }
    }, 10);
    return () => clearTimeout(timeoutId);
  }, [activeDateIndex]);

  const renderSlot = (slot) => {
    // Shared Unblock toggle component to match image exactly
    const toggleCircleColor = slot.type === 'available' ? 'bg-[#1a5b6e]' : 'bg-[#4b4b4b]';
    const UnblockToggle = () => (
      <div className="bg-[#e4e5e7] hover:bg-[#d5d6d8] transition-colors rounded-full flex items-center h-[26px] w-[74px] relative shadow-sm cursor-pointer pr-[5px] border border-gray-300/60">
        <div className={`w-[19px] h-[19px] ${toggleCircleColor} rounded-full absolute left-[3px]`}></div>
        <span className="text-[10px] font-bold text-[#5c5e60] ml-auto leading-none pt-[1px]">Unblock</span>
      </div>
    );

    if (slot.type === 'available') {
      return (
        <div key={slot.id} className="rounded-md border-[1.5px] border-[#c0d5db] bg-white shadow-md flex flex-col overflow-hidden h-[135px]">
           {/* Top white band */}
           <div className="px-[14px] pt-[12px] pb-[8px] flex justify-between items-center bg-white">
              <span className="font-extrabold text-[#444] text-[15px]">{slot.time}</span>
              <UnblockToggle />
           </div>
           {/* Middle solid blue band */}
           <div className="bg-[#bce0e9] w-full px-[14px] py-[8px] flex items-center gap-[8px]">
              <div className="w-[12px] h-[12px] bg-[#89c5d6] rounded-sm opacity-90"></div>
              <span className="font-bold text-[#1a5b6e] text-[15px]">{slot.title || 'Available'}</span>
           </div>
           {/* Bottom area */}
           <div className="flex-1 bg-white px-[14px] py-[10px] flex justify-end items-end">
             <button className="bg-[#cee6eb] hover:bg-[#b0d9e2] transition-colors text-[#2c5361] font-bold text-[14px] px-[22px] py-[6px] rounded-md border-[1.5px] border-[#a5cbd4] tracking-wide">
                Schedule
             </button>
           </div>
        </div>
      );
    } else if (slot.type === 'break') {
      return (
        <div key={slot.id} className="rounded-md border-[1.5px] border-[#cac194] bg-[#fbf5d9] shadow-md flex flex-col overflow-hidden h-[135px]">
           <div className="px-[14px] pt-[12px] pb-[8px] flex justify-between items-center bg-[#c9bfa4]">
              <span className="font-extrabold text-[#333] text-[15px]">{slot.time}</span>
              <UnblockToggle />
           </div>
           <div className="flex-1 px-[14px] py-[8px] bg-[#fbf5d9] flex flex-col">
              <div className="flex items-center gap-[6px]">
                 <div className="w-[12px] h-[12px] bg-[#b8b093] rounded-sm"></div>
                 <span className="font-bold text-[#444] text-[16px]">{slot.title}</span>
              </div>
              <div className="text-[10px] font-bold text-[#777] mt-[2px]">{slot.subtitle}</div>
              <div className="flex justify-end mt-auto pb-[2px]">
                 <button className="bg-white hover:bg-gray-50 transition-colors text-[#444] font-bold text-[14px] px-[16px] py-[5px] rounded-md border-[1.5px] border-[#d8cdab] shadow-sm tracking-wide">
                    ReSchedule
                 </button>
              </div>
           </div>
        </div>
      );
    } else if (slot.type === 'booked') {
      return (
        <div key={slot.id} className="rounded-md border-[1.5px] border-[#6ea076] bg-[#e1eee2] shadow-md flex flex-col overflow-hidden h-[135px]">
           <div className="px-[14px] pt-[12px] pb-[8px] flex justify-between items-center bg-[#5ea365]">
              <span className="font-extrabold text-[#111] text-[15px]">{slot.time}</span>
              <UnblockToggle />
           </div>
           <div className="flex-1 px-[14px] py-[8px] flex flex-col bg-[#e1eee2]">
              <div className="flex items-center gap-[6px]">
                 <div className="w-[12px] h-[12px] bg-[#75b07d] rounded-sm"></div>
                 <span className="font-bold text-[#333] text-[16px]">{slot.title}</span>
              </div>
              <div className="text-[10px] font-bold text-[#666] mt-[2px]">{slot.subtitle}</div>
              <div className="flex justify-between gap-[6px] mt-auto pb-[2px]">
                 <button className="flex-1 bg-white hover:bg-gray-50 transition-colors text-[#78ae80] font-bold text-[13px] py-[5px] rounded-md border-[1.5px] border-[#9bcfa3] shadow-sm tracking-wide">
                    View
                 </button>
                 <button className="flex-[1.2] bg-white hover:bg-gray-50 transition-colors text-[#666] font-bold text-[13px] py-[5px] rounded-md border-[1.5px] border-[#cdcdcd] shadow-sm tracking-wide">
                    ReSchedule
                 </button>
                 <button className="flex-[0.9] bg-white hover:bg-red-50 transition-colors text-[#ea6b6e] font-bold text-[13px] py-[5px] rounded-md border-[1.5px] border-[#e8a3a4] shadow-sm tracking-wide">
                    Cancel
                 </button>
              </div>
           </div>
        </div>
      );
    }
    return null;
  };

  const formattedPopupDate = `${calendarDays[popupActiveDateIndex]}/${popupSelectedMonth.slice(0,3).toLowerCase()}/${popupSelectedYear}`;

  return (
    <div className="flex h-screen w-full bg-[#f4f7fa] font-sans text-sm overflow-hidden text-gray-700">
      
      {/* Sidebar copied from Appointment2 style */}
      <aside className="w-[200px] flex-shrink-0 flex flex-col bg-[#f4f7fa] shadow-[2px_0_5px_rgba(0,0,0,0.02)] z-10">
        <div className="h-[74px] flex items-center mt-2 relative z-20 w-full pl-[24px]">
          <div className="w-[152px] h-full flex items-center justify-center border-r-[1.5px] border-[#398499] border-t-[1.5px] bg-white rounded-tr-[18px] relative">
            <img src={logoUrl} alt="VADYAGO Logo" className="h-[36px] w-auto object-contain mr-[6px] mt-[4px]" />
          </div>
        </div>

        <div className="relative w-full shrink-0">
          <div className="absolute left-[24px] top-[10px] h-[250px] w-[42px] border-[1.5px] border-[#398499] rounded-full pointer-events-none z-0"></div>
          
          <div 
            className="absolute left-[22px] right-[14px] h-[50px] bg-[#147b93] rounded-l-full rounded-r-[16px] shadow-[0_2px_8px_rgba(20,123,147,0.4)] z-10 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ transform: `translateY(${activeIndex * 50 + 10}px)` }}
          >
            <div className="absolute left-[2px] top-[2px] w-[46px] h-[46px] bg-[#0c596d] rounded-full shadow-[inset_1px_2px_4px_rgba(0,0,0,0.2)]"></div>
            <div className="absolute right-[12px] top-1/2 -translate-y-1/2 text-white">
              <svg className="w-[18px] h-[18px] opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <nav className="flex flex-col relative z-20 w-full pl-[24px] pr-[24px] py-[10px]">
            {navItems.map((item, idx) => {
              const isActive = activeNav === item.id;
              const isImmediatelyAbove = idx === activeIndex - 1;
              const isImmediatelyBelow = idx === activeIndex + 1;

              return (
                <button 
                  key={item.id} 
                  onClick={() => setActiveNav(item.id)}
                  className="flex items-center h-[50px] w-full group focus:outline-none focus:ring-0 bg-transparent"
                >
                  <div className={`w-[42px] h-[42px] flex items-center justify-center shrink-0 transition-colors duration-200 relative z-20 ${isActive ? 'text-white' : 'text-[#398499]'}`}>
                     {item.icon}
                  </div>
                  <div 
                    className={`flex-1 h-full flex items-center pl-[12px] transition-all duration-300 relative z-20
                      ${!isActive ? 'bg-white border-r-[1.5px] border-[#398499]' : ''}
                      ${isImmediatelyAbove ? 'border-b-[1.5px] rounded-br-[18px]' : ''}
                      ${isImmediatelyBelow ? 'border-t-[1.5px] rounded-tr-[18px]' : ''}
                    `}
                  >
                     <span className={`text-[13.5px] font-semibold tracking-wide transition-colors duration-200 relative z-20 ${isActive ? 'text-white' : 'text-[#398499]'}`}>
                       {item.label}
                     </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="flex-1 w-full pl-[24px] relative z-20">
           <div className="w-[152px] h-full bg-white border-r-[1.5px] border-[#398499]"></div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col bg-white overflow-hidden">
        
        {/* Header */}
        <header className="h-[74px] flex flex-row items-center justify-between px-8 shrink-0 bg-white">
          <div className="flex items-center flex-1 max-w-[700px] gap-[12px]">
            <button className="w-[38px] h-[38px] border-[1.5px] border-gray-200 rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col items-start justify-center pl-[9px] gap-[3px] bg-white hover:bg-gray-50 transition-colors shrink-0">
              <span className="w-[17px] h-[2px] bg-[#4880b9] rounded-full"></span>
              <span className="w-[13px] h-[2px] bg-[#89b3d0] rounded-full"></span>
              <span className="w-[17px] h-[2px] bg-[#4880b9] rounded-full"></span>
              <span className="w-[13px] h-[2px] bg-[#89b3d0] rounded-full"></span>
            </button>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-[16px] flex items-center pointer-events-none">
                <svg className="w-[16px] h-[16px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <input type="text" placeholder="Search" className="w-full pl-[40px] pr-4 py-[9px] bg-white border border-gray-300/80 rounded-full text-[13.5px] text-gray-700 outline-none focus:border-[#468e9f]" />
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <button className="w-[38px] h-[38px] bg-white border border-gray-200 rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex items-center justify-center text-black hover:bg-gray-50 transition-colors">
               <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
               </svg>
            </button>
            <button className="relative w-[38px] h-[38px] bg-white border border-gray-200 rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex items-center justify-center text-[#112330] hover:bg-gray-50 transition-colors">
              <svg className="w-[19px] h-[19px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <div className="absolute top-[4px] right-[5px] bg-[#6c2da8] text-white text-[9px] font-bold w-[14px] h-[14px] flex items-center justify-center rounded-full border-none shadow-sm leading-none">1</div>
            </button>
            <button className="bg-[#94b8c0] hover:bg-[#85abb2] text-[#1c3947] font-semibold text-[13.5px] py-0 h-[38px] px-[12px] rounded-[6px] flex items-center gap-[6px] transition-colors shadow-sm ml-1">
              <div className="w-[18px] h-[18px] bg-white rounded-full flex items-center justify-center shrink-0">
                 <svg className="w-[12px] h-[12px] text-[#94b8c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m-8-8h16" /></svg>
              </div>
              Make Appointment
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-4 px-6 bg-white min-h-0">
           
           <div className="flex gap-[16px] items-stretch">
             
             {/* Left Column */}
             <div className="flex-[4.8] flex flex-col gap-[14px]">
               
               {/* Welcome Banner */}
               <div className="bg-[#1b738b] rounded-xl p-[22px] flex flex-col justify-center h-[105px]">
                  <h2 className="text-[22px] font-bold text-white leading-tight">Hello Dr. Iris</h2>
                  <p className="text-[12px] text-[#86cfe4] font-medium leading-snug mt-[4px]">
                    here are you important tasks and reports.<br/>
                    Please check the next appointment
                  </p>
               </div>

               {/* Stats Tiles */}
               <div className="flex gap-[10px]">
                 {[
                   { name: 'Appointment', imgUrl: appointmentIcon },
                   { name: 'Total Patients', imgUrl: totalPatientsIcon },
                   { name: 'Consultations', imgUrl: consultationsIcon },
                   { name: 'Income', imgUrl: incomeIcon },
                   { name: 'Emergency', imgUrl: emergencyIcon }
                 ].map((t, i) => (
                   <div key={i} className="flex-1 flex flex-col items-center justify-between border-[1.5px] border-gray-600 rounded-2xl bg-white aspect-[1/0.85] shadow-sm px-[4px] py-[10px] mt-[4px]">
                      <div className="flex-1 flex items-end justify-center w-full">
                         <img src={t.imgUrl} alt={t.name} className="h-full max-h-[58px] object-contain" />
                      </div>
                      <span className="text-[13px] font-bold text-[#444] tracking-wide mt-[8px] text-center leading-tight">{t.name}</span>
                   </div>
                 ))}
               </div>

               {/* Add Slots Large Button */}
               <div className="w-full border-[1.5px] border-[#c0dfec] rounded-xl py-[12px] flex justify-center bg-white shadow-[0_2px_4px_rgba(0,0,0,0.02)] pb-[16px]">
                  <button 
                    onClick={() => setIsAddSlotModalOpen(true)}
                    className="bg-[#1b738b] hover:bg-[#166378] text-white flex items-center gap-[6px] px-[24px] py-[8px] rounded-full font-bold text-[14px] transition-colors shadow-md mt-[6px]"
                  >
                     <div className="text-white font-extrabold text-[16px] mr-[2px] leading-none mb-[2px]">+</div>
                     <span className="tracking-wide">Add Slots</span>
                  </button>
               </div>
             </div>

             {/* Right Column (Calendar) */}
             <div className="flex-[2.8] border-[1.5px] border-gray-200 rounded-xl bg-white shadow-[0_2px_4px_rgba(0,0,0,0.02)] py-[18px] px-[20px] flex flex-col">
                <div className="flex items-center justify-between mb-[20px]">
                   <button 
                     onClick={() => {
                        const currentIndex = monthsList.indexOf(selectedMonth);
                        const prevIndex = currentIndex === 0 ? 11 : currentIndex - 1;
                        setSelectedMonth(monthsList[prevIndex]);
                     }}
                     className="text-[#32869e] hover:text-[#166378] transition-colors"
                   >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
                   </button>
                   <div className="flex gap-2">
                      <div 
                        className="relative outline-none" 
                        tabIndex={0} 
                        onBlur={(e) => {
                          if (!e.currentTarget.contains(e.relatedTarget)) setIsMonthOpen(false);
                        }}
                      >
                         {/* Trigger Button */}
                         <div 
                           onClick={() => setIsMonthOpen(!isMonthOpen)}
                           className="flex items-center justify-between gap-[10px] bg-white border border-gray-200 rounded-md px-3 py-[3px] shadow-sm cursor-pointer hover:bg-gray-50 min-w-[90px] transition-colors"
                         >
                            <span className="text-[#32869e] font-bold text-[11px] tracking-wide">{selectedMonth}</span>
                            <svg className="w-[10px] h-[10px] text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg>
                         </div>
                         
                         {/* Animated Dropdown Card Overlay */}
                         <div 
                            className={`absolute top-[-8px] left-[-8px] min-w-[130px] bg-white border-[1.5px] border-gray-200 rounded-[14px] shadow-[0_6px_16px_rgba(0,0,0,0.08)] z-50 overflow-hidden transition-all duration-300 origin-top
                            ${isMonthOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                         >
                            <div 
                              onClick={() => setIsMonthOpen(false)}
                              className="flex items-center justify-between px-4 pt-[10px] pb-[8px] cursor-pointer hover:bg-gray-50"
                            >
                               <span className="text-gray-800 font-[400] text-[14px]">{selectedMonth}</span>
                               <svg className="w-[12px] h-[12px] text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7"/></svg>
                            </div>
                            <div className="flex flex-col max-h-[220px] overflow-y-auto pb-[10px]" style={{ scrollbarWidth: 'none' }}>
                               {monthsList.filter(m => m !== selectedMonth).map(m => (
                                 <div 
                                   key={m}
                                   onClick={() => { setSelectedMonth(m); setIsMonthOpen(false); }}
                                   className="px-4 py-[4px] text-[14px] cursor-pointer hover:bg-gray-50 text-gray-600 font-[400]"
                                 >
                                    {m}
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>
                      <div 
                         className="relative outline-none" 
                         tabIndex={0} 
                         onBlur={(e) => {
                           if (!e.currentTarget.contains(e.relatedTarget)) setIsYearOpen(false);
                         }}
                      >
                         <div 
                            onClick={() => setIsYearOpen(!isYearOpen)}
                            className="flex items-center gap-[10px] bg-white border border-gray-200 rounded-md px-3 py-[3px] shadow-sm cursor-pointer hover:bg-gray-50 h-full transition-colors"
                         >
                            <span className="text-[#32869e] font-bold text-[11px] tracking-wide">{selectedYear}</span>
                            <svg className="w-[10px] h-[10px] text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg>
                         </div>

                         {/* Animated Year Dropdown Card Overlay */}
                         <div 
                            className={`absolute top-[-8px] right-0 min-w-[124px] bg-white border-[1px] border-gray-200 rounded-[18px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] z-50 overflow-hidden transition-all duration-300 origin-top
                            ${isYearOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                         >
                            <div ref={yearScrollRef} className="flex flex-col max-h-[190px] overflow-y-auto py-[12px] scroll-smooth" style={{ scrollbarWidth: 'none' }}>
                               {yearsList.map(y => {
                                 const isSelected = selectedYear === y;
                                 if (isSelected) {
                                    return (
                                       <div 
                                         key={y}
                                         data-selected="true"
                                         className="px-[12px] w-full my-[1px]"
                                         onClick={() => { setSelectedYear(y); setIsYearOpen(false); }}
                                       >
                                          <div className="border-[1px] border-[#555] rounded-full flex items-center justify-between pl-[14px] pr-[10px] py-[3px] shadow-sm bg-white cursor-pointer relative">
                                             <span className="text-[#444] font-[500] text-[15px] tracking-wide">{y}</span>
                                             <svg className="w-[13px] h-[13px] text-[#444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10l4-4 4 4m0 4l-4 4-4-4"/>
                                             </svg>
                                          </div>
                                       </div>
                                    )
                                 }
                                 return (
                                    <div 
                                      key={y}
                                      onClick={() => { setSelectedYear(y); setIsYearOpen(false); }}
                                      className="w-full pl-[28px] py-[3px] cursor-pointer hover:bg-gray-50 transition-colors"
                                    >
                                       <span className="text-[#666] font-[400] text-[15px] tracking-wide">{y}</span>
                                    </div>
                                 )
                               })}
                            </div>
                         </div>
                      </div>
                   </div>
                   <button 
                     onClick={() => {
                        const currentIndex = monthsList.indexOf(selectedMonth);
                        const nextIndex = currentIndex === 11 ? 0 : currentIndex + 1;
                        setSelectedMonth(monthsList[nextIndex]);
                     }}
                     className="text-[#32869e] hover:text-[#166378] transition-colors"
                   >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
                   </button>
                </div>
                
                <div className="grid grid-cols-7 mb-4">
                   {['S', 'M', 'T', 'W', 'Th', 'F', 'Sat'].map(d => (
                     <div key={d} className="text-center text-[#32869e] font-bold text-[13px]">{d}</div>
                   ))}
                </div>
                
                <div className="relative mt-1">
                   {/* Animated Background Pill */}
                   <div 
                      className="absolute bg-[#6fa7ba] rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-0"
                      style={{
                         left: dateStyle.left,
                         top: dateStyle.top,
                         width: dateStyle.width,
                         height: dateStyle.height,
                         opacity: dateStyle.opacity
                      }}
                   />
                   <div className="grid grid-cols-7 gap-y-[18px] text-[11px] font-bold text-[#444444] relative z-10">
                      {['27','28','29','30','31','1','2',
                        '3','4','5','6','7','8','9',
                        '10','11','12','13','14','15','16',
                        '17','18','19','20','21','22','23',
                        '24','25','26','27','28','29','30'].map((d, i) => {
                        const isPrevMonth = i < 5;
                        const isSelected = activeDateIndex === i;
                        
                        return (
                          <div key={i} className="flex justify-center items-center">
                             <span 
                               ref={el => dateRefs.current[i] = el}
                               onClick={() => setActiveDateIndex(i)}
                               className={`w-[29px] h-[29px] flex items-center justify-center rounded-full transition-colors cursor-pointer
                                  ${isPrevMonth && !isSelected ? 'text-gray-300 font-medium' : ''}
                                  ${isSelected ? 'text-[#09151c]' : 'hover:bg-gray-100'}
                               `}
                             >
                                {d}
                             </span>
                          </div>
                        )
                      })}
                   </div>
                </div>
             </div>

           </div>

           {/* View Slot Bottom Area */}
           <div className="border-[1.5px] border-gray-300 rounded-xl bg-white mt-4 flex flex-col mb-4 p-[20px] pt-[16px] shadow-[0_2px_5px_rgba(0,0,0,0.02)]">
              
              {/* Header */}
              <div className="flex justify-between items-center mb-5">
                 <h3 className="font-bold text-[15px] text-black tracking-wide">View Slot</h3>
                 <div className="flex items-center gap-[14px]">
                    <span className="font-bold text-gray-600 text-[14px]">Date</span>
                    <div 
                      className="relative outline-none" 
                      tabIndex={0} 
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) setIsPopupCalendarOpen(false);
                      }}
                    >
                      <div 
                        onClick={() => setIsPopupCalendarOpen(!isPopupCalendarOpen)}
                        className="bg-[#d2d3d6] hover:bg-[#c9cbcf] transition-colors pl-[14px] pr-[10px] py-[6px] rounded-md flex items-center gap-[16px] font-bold text-gray-800 text-[13px] shadow-sm cursor-pointer tracking-wide"
                      >
                        {formattedPopupDate}
                        <svg className="w-4 h-4 text-gray-700 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                      </div>

                      {/* Popup Calendar Overlay */}
                      <div className={`absolute top-[115%] right-0 w-[300px] bg-white border-[1px] border-gray-200 rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] z-50 p-[18px] transition-all duration-300 origin-top-right ${isPopupCalendarOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
                          
                          {/* Calendar Header */}
                          <div className="flex items-center justify-between mb-[20px]">
                             <button 
                               onClick={() => setPopupActiveDateIndex(prev => prev > 0 ? prev - 1 : 34)}
                               className="text-[#156f87] hover:text-[#0f5467] transition-colors"
                             >
                               <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
                             </button>
                             <div className="flex gap-[8px]">
                                {/* Month Dropdown */}
                                <div 
                                  className="relative outline-none"
                                  tabIndex={0}
                                  onBlur={(e) => {
                                    if (!e.currentTarget.contains(e.relatedTarget)) setIsPopupMonthOpen(false);
                                  }}
                                >
                                   <div 
                                     onClick={() => setIsPopupMonthOpen(!isPopupMonthOpen)}
                                     className="flex items-center justify-between gap-[12px] bg-white border border-gray-200 rounded-full pl-[12px] pr-[8px] py-[3px] shadow-sm cursor-pointer min-w-[85px]"
                                   >
                                      <span className="text-gray-500 font-[500] text-[11px] tracking-wide">{popupSelectedMonth}</span>
                                      <svg className={`w-[10px] h-[10px] text-gray-600 transition-transform ${isPopupMonthOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg>
                                   </div>

                                   {/* Popup Menu */}
                                   <div 
                                      className={`absolute top-[-8px] left-[-8px] min-w-[105px] bg-white border-[1px] border-gray-200 rounded-[14px] shadow-[0_6px_16px_rgba(0,0,0,0.08)] z-50 overflow-hidden transition-all duration-300 origin-top
                                      ${isPopupMonthOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                                   >
                                      <div 
                                        onClick={() => setIsPopupMonthOpen(false)}
                                        className="flex items-center justify-between px-[12px] pt-[8px] pb-[6px] cursor-pointer hover:bg-gray-50"
                                      >
                                         <span className="text-gray-600 font-[500] text-[11.5px] tracking-wide">{popupSelectedMonth}</span>
                                         <svg className="w-[10px] h-[10px] text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7"/></svg>
                                      </div>
                                      <div className="flex flex-col max-h-[160px] overflow-y-auto pb-[8px]" style={{ scrollbarWidth: 'none' }}>
                                         {monthsList.filter(m => m !== popupSelectedMonth).map(m => (
                                           <div 
                                             key={m}
                                             onClick={() => { setPopupSelectedMonth(m); setIsPopupMonthOpen(false); }}
                                             className="px-[12px] py-[4px] text-[11.5px] cursor-pointer hover:bg-gray-50 text-gray-600 font-[500] tracking-wide"
                                           >
                                              {m}
                                           </div>
                                         ))}
                                      </div>
                                   </div>
                                </div>

                                {/* Year Dropdown */}
                                <div 
                                  className="relative outline-none"
                                  tabIndex={0}
                                  onBlur={(e) => {
                                    if (!e.currentTarget.contains(e.relatedTarget)) setIsPopupYearOpen(false);
                                  }}
                                >
                                   <div 
                                     onClick={() => setIsPopupYearOpen(!isPopupYearOpen)}
                                     className="flex items-center gap-[12px] justify-between bg-white border border-gray-200 rounded-full pl-[12px] pr-[8px] py-[3px] shadow-sm cursor-pointer min-w-[75px]"
                                   >
                                      <span className="text-gray-500 font-[500] text-[11px] tracking-wide">{popupSelectedYear}</span>
                                      <svg className={`w-[10px] h-[10px] text-gray-600 transition-transform ${isPopupYearOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg>
                                   </div>

                                   {/* Year Dropdown Card Overlay */}
                                   <div 
                                      className={`absolute top-[-8px] right-0 min-w-[124px] bg-white border-[1px] border-gray-200 rounded-[18px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] z-50 overflow-hidden transition-all duration-300 origin-top
                                      ${isPopupYearOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                                   >
                                      <div ref={popupYearScrollRef} className="flex flex-col max-h-[190px] overflow-y-auto py-[12px] scroll-smooth" style={{ scrollbarWidth: 'none' }}>
                                         {yearsList.map(y => {
                                           const isSelected = popupSelectedYear === y;
                                           if (isSelected) {
                                              return (
                                                 <div 
                                                   key={y}
                                                   data-selected="true"
                                                   className="px-[12px] w-full my-[1px]"
                                                   onClick={() => { setPopupSelectedYear(y); setIsPopupYearOpen(false); }}
                                                 >
                                                    <div className="border-[1px] border-[#555] rounded-full flex items-center justify-between pl-[14px] pr-[10px] py-[3px] shadow-sm bg-white cursor-pointer relative">
                                                       <span className="text-[#444] font-[500] text-[15px] tracking-wide">{y}</span>
                                                       <svg className="w-[13px] h-[13px] text-[#444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10l4-4 4 4m0 4l-4 4-4-4"/>
                                                       </svg>
                                                    </div>
                                                 </div>
                                              )
                                           }
                                           return (
                                              <div 
                                                key={y}
                                                onClick={() => { setPopupSelectedYear(y); setIsPopupYearOpen(false); }}
                                                className="w-full pl-[28px] py-[3px] cursor-pointer hover:bg-gray-50 transition-colors"
                                              >
                                                 <span className="text-[#666] font-[400] text-[15px] tracking-wide">{y}</span>
                                              </div>
                                           )
                                         })}
                                      </div>
                                   </div>
                                </div>
                             </div>
                             <button 
                               onClick={() => setPopupActiveDateIndex(prev => prev < 34 ? prev + 1 : 0)}
                               className="text-[#156f87] hover:text-[#0f5467] transition-colors"
                             >
                               <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                             </button>
                          </div>

                          {/* Days Header */}
                          <div className="grid grid-cols-7 mb-[16px]">
                             {['S', 'M', 'T', 'W', 'Th', 'F', 'Sat'].map(d => (
                               <div key={d} className="text-center text-[#156f87] font-[400] text-[12px] px-1">{d}</div>
                             ))}
                          </div>

                          {/* Days Grid */}
                          <div className="relative mt-1">
                             {/* Animated Background Pill */}
                             <div 
                                className="absolute bg-[#6fa7ba] rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-0 shadow-sm"
                                style={{
                                   left: popupDateStyle.left,
                                   top: popupDateStyle.top,
                                   width: popupDateStyle.width,
                                   height: popupDateStyle.height,
                                   opacity: popupDateStyle.opacity
                                }}
                             />
                             <div className="grid grid-cols-7 gap-y-[16px] text-[10.5px] text-[#444] font-[500] relative z-10">
                                {['27','28','29','30','31','1','2',
                                  '3','4','5','6','7','8','9',
                                  '10','11','12','13','14','15','16',
                                  '17','18','19','20','21','22','23',
                                  '24','25','26','27','28','29','30'].map((d, i) => {
                                  const isPrevMonth = i < 5;
                                  const isSelected = i === popupActiveDateIndex;
                                  return (
                                    <div key={i} className="flex justify-center items-center">
                                       <span 
                                         ref={el => popupDateRefs.current[i] = el}
                                         onClick={() => setPopupActiveDateIndex(i)}
                                         className={`w-[26px] h-[26px] flex items-center justify-center rounded-full cursor-pointer transition-colors
                                            ${isPrevMonth && !isSelected ? 'text-gray-400 font-medium' : ''}
                                            ${isSelected ? 'text-[#09151c] font-bold' : 'hover:bg-gray-100'}
                                         `}
                                       >
                                          {d}
                                       </span>
                                    </div>
                                  )
                                })}
                             </div>
                          </div>
                      </div>
                    </div>
                    <button className="bg-[#dcdde0] hover:bg-[#d0d3d8] transition-colors p-[6px] rounded-md shadow-sm">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                    </button>
                 </div>
              </div>

              {/* Legend area */}
              <div className="flex gap-[40px] mb-5 items-center">
                 <div className="font-bold text-gray-800 text-[13px] tracking-wide">Date : &nbsp; {formattedPopupDate}</div>
                 <div className="flex gap-[28px] ml-[6px]">
                    <div className="flex items-center gap-[10px] font-bold text-gray-800 text-[13px]">
                       <div className="w-[20px] h-[14px] bg-[#a2d2e1] rounded-[2px] opacity-90"></div> Available
                    </div>
                    <div className="flex items-center gap-[10px] font-bold text-gray-800 text-[13px]">
                       <div className="w-[20px] h-[14px] bg-[#7bba84] rounded-[2px] opacity-90"></div> Booked
                    </div>
                    <div className="flex items-center gap-[10px] font-bold text-gray-800 text-[13px]">
                       <div className="w-[20px] h-[14px] bg-[#f2eaba] rounded-[2px] opacity-90"></div> Blocked/Break
                    </div>
                 </div>
              </div>

              {/* Grid of Slots */}
              <div className="grid grid-cols-3 gap-x-[20px] gap-y-[20px] pb-2 overflow-y-auto max-h-[460px] scroll-smooth px-1 pt-1" style={{ scrollbarWidth: 'thin' }}>
                 {slots.map(renderSlot)}
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

        </div>

        {/* Add Slots Modal */}
        {isAddSlotModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[16px] shadow-2xl w-[620px] max-h-[95vh] overflow-hidden flex flex-col relative">
              
              {/* Header */}
              <div className="bg-white px-[26px] py-[14px] border-b border-gray-200 shrink-0">
                <h2 className="text-[#111] font-[800] text-[15.5px]">Doctor Slot</h2>
                <button 
                  onClick={() => setIsAddSlotModalOpen(false)}
                  className="absolute top-[14px] right-[20px] text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>

              {/* Body */}
              <div className="px-[32px] pt-[28px] pb-[10px] flex flex-col gap-[22px] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                
                {/* Date Range */}
                <div className="flex flex-col gap-[14px]">
                   <h3 className="text-[#207a95] font-[800] text-[13.5px]">Date Range :</h3>
                   <div className="flex items-center gap-[34px] ml-[0px]">
                      <div className="flex items-center gap-[12px]">
                         <span className="text-[#444] font-[600] text-[12.5px]">From Date :</span>
                         <CustomModalDatePicker initialActiveIndex={17} initialMonth="February" initialYear={2026} />
                      </div>
                      <div className="flex items-center gap-[12px]">
                         <span className="text-[#444] font-[600] text-[12.5px]">To Date :</span>
                         <CustomModalDatePicker initialActiveIndex={23} initialMonth="February" initialYear={2026} />
                      </div>
                   </div>
                </div>

                <div className="h-[1px] bg-gray-300/80 w-full mt-[2px] mb-[2px]"></div>

                {/* Time Range */}
                <div className="flex flex-col gap-[14px]">
                   <h3 className="text-[#207a95] font-[800] text-[13.5px]">Time Range :</h3>
                   <div className="flex items-center gap-[34px] ml-[0px]">
                      <div className="flex items-center gap-[12px]">
                         <span className="text-[#444] font-[600] text-[12.5px]">From Time :</span>
                         <div className="relative flex items-center justify-between border-[1.5px] border-gray-400 rounded-[4px] px-[12px] py-[6px] w-[145px] bg-white overflow-hidden">
                            <span className="text-[#333] font-[600] text-[13px] pointer-events-none">{formatModalTime(fromTime)}</span>
                            <svg className="w-[18px] h-[18px] text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/></svg>
                            <input type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer" />
                         </div>
                      </div>
                      <div className="flex items-center gap-[12px]">
                         <span className="text-[#444] font-[600] text-[12.5px]">To Time :</span>
                         <div className="relative flex items-center justify-between border-[1.5px] border-gray-400 rounded-[4px] px-[12px] py-[6px] w-[145px] bg-white overflow-hidden">
                            <span className="text-[#333] font-[600] text-[13px] pointer-events-none">{formatModalTime(toTime)}</span>
                            <svg className="w-[18px] h-[18px] text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/></svg>
                            <input type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer" />
                         </div>
                      </div>
                   </div>
                </div>

                <div className="h-[1px] bg-gray-300/80 w-full mt-[2px] mb-[2px]"></div>

                {/* Slot Duration */}
                <div className="flex flex-col gap-[14px] relative mb-[8px]">
                   <h3 className="text-[#207a95] font-[800] text-[13.5px]">Slot Duration :</h3>
                   <div className="flex items-center gap-[10px] relative z-10 w-fit">
                      <span className="text-[#444] font-[600] text-[12.5px]">Slot Time :</span>
                      
                      <div 
                        className="relative outline-none ml-[2px]" 
                        tabIndex={0} 
                        onBlur={(e) => {
                          if (!e.currentTarget.contains(e.relatedTarget)) setSlotDurationOpen(false);
                        }}
                      >
                         <div 
                           onClick={() => setSlotDurationOpen(!slotDurationOpen)}
                           className="flex items-center justify-between border-[1.5px] border-gray-400 rounded-[4px] px-[12px] py-[6px] w-[145px] bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                         >
                            <span className="text-[#333] font-[600] text-[13px]">{slotDuration}</span>
                            <svg className="w-[18px] h-[18px] text-black" fill="black" viewBox="0 0 24 24"><polygon points="7,10 17,10 12,15" /></svg>
                         </div>
                         
                         {/* Dropdown Options (Animated & Scrollable) */}
                         <div 
                            className={`absolute top-full left-0 mt-[1px] w-full bg-white border-[1px] border-gray-400 z-20 transition-all duration-200 origin-top overflow-y-auto max-h-[115px]
                            ${slotDurationOpen ? 'opacity-100 scale-100 pointer-events-auto shadow-md' : 'opacity-0 scale-95 pointer-events-none shadow-none'}`}
                            style={{ scrollbarWidth: 'thin' }}
                         >
                            {durationOptions.map(opt => (
                               <div 
                                 key={opt}
                                 onClick={() => { setSlotDuration(opt); setSlotDurationOpen(false); }}
                                 className={`px-[12px] py-[6px] text-[13px] cursor-pointer font-[500] transition-colors ${slotDuration === opt ? 'bg-[#3ca4bf] text-white hover:bg-[#3492ab] font-[600]' : 'text-gray-600 hover:bg-gray-100'}`}
                               >
                                  {opt}
                               </div>
                            ))}
                         </div>
                      </div>

                   </div>

                   {/* Doctor Image Illustration */}
                   <div className="absolute right-[10px] top-[-45px] w-[175px] pointer-events-none z-0">
                      <img src={doctorImg} alt="Doctor Illustration" className="w-full h-auto object-contain" />
                   </div>
                </div>

              </div>

              {/* Footer */}
              <div className="flex justify-end px-[32px] pb-[28px] pt-[20px] bg-white mt-auto relative z-10 shrink-0">
                 <button 
                   onClick={() => setIsAddSlotModalOpen(false)}
                   className="bg-[#1b738b] hover:bg-[#166378] transition-colors text-white font-[700] text-[14px] px-[36px] py-[8px] rounded-[6px] shadow-sm tracking-wide"
                 >
                    Save
                 </button>
              </div>

            </div>
          </div>
        )}
      </main>

    </div>
  );
};

export default Dslot;
