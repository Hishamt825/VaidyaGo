import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUrl from '../../assets/lo.svg';
import Side_app from './Side_app';
import { AnimatePresence, motion } from 'framer-motion';

import appointmentIcon from '../../assets/appointment.svg';
import totalPatientsIcon from '../../assets/total_patients.svg';
import consultationsIcon from '../../assets/consultations.svg';
import incomeIcon from '../../assets/income.svg';
import emergencyIcon from '../../assets/emergency.svg';
import doctorImg from '../../assets/image_76.svg';
import phImg from '../../assets/ph.png';


// Reusing same navItems layout logic but with "Add Slots" added at the bottom
// Slots and other constants remain unchanged

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
const yearsList = Array.from({ length: 22 }, (_, i) => 2005 + i);
const timelineData = [
   { time: "10:30 am", label: "Patient Checkup", patient: "Natalia khan", duration: "10:30 am - 11:00 am", color: "#facc15" },
   { time: "12:00 am", label: "Treatment", patient: "Natalia khan", duration: "12:00 am - 11:00 am", color: "#f87171" },
   { time: "02:00 am", label: "Round in Patient wards", patient: "Hall no - 6", duration: "02:00 am - 03:00 am", color: "#38bdf8" },
   { time: "02:00 am", label: "Round in Patient wards", patient: "Hall no - 6", duration: "02:00 am - 03:00 am", color: "#f87171" },
];

const appRequestsData = [
   { name: "Riya madeshiya", gender: "Female", age: 30, treatment: "Regular Checkup", time: "10 am", date: "13 feb 2026" },
   { name: "Riya madeshiya", gender: "Female", age: 30, treatment: "Regular Checkup", time: "10 am", date: "13 feb 2026" },
];

const recentPatientsData = [
   { name: "Riya madeshiya", gender: "Female", weight: "50kg", disease: "Typhoid", status: "OutPatient", heartRate: "70 bpm" },
   { name: "Riya madeshiya", gender: "Female", weight: "50kg", disease: "Typhoid", status: "OutPatient", heartRate: "70 bpm" },
];

const calendarDays = ['27', '28', '29', '30', '31', '1', '2',
   '3', '4', '5', '6', '7', '8', '9',
   '10', '11', '12', '13', '14', '15', '16',
   '17', '18', '19', '20', '21', '22', '23',
   '24', '25', '26', '27', '28', '29', '30'];

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

   const formattedDate = `${calendarDays[activeDateIndex].padStart(2, '0')} / ${viewMonth.slice(0, 3).toLowerCase()} / ${viewYear}`;

   return (
      <div className="relative outline-none" tabIndex={0} onBlur={(e) => {
         if (!e.currentTarget.contains(e.relatedTarget)) setIsOpen(false);
      }}>
         <div
            onClick={toggleOpen}
            className="relative flex items-center justify-between border-[1.5px] border-gray-400 rounded-[4px] px-[12px] py-[6px] w-[145px] bg-white cursor-pointer hover:bg-gray-50 transition-colors z-[10]"
         >
            <span className="text-[#333] font-[600] text-[13px]">{formattedDate}</span>
            <svg className="w-[17px] h-[17px] text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
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
                        <svg className="w-[12px] h-[12px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
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
                           <svg className="w-[12px] h-[12px] text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" /></svg>
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
                        <svg className="w-[12px] h-[12px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
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
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
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

const Addslot = () => {
   const navigate = useNavigate();
   const [activeNav, setActiveNav] = useState('Add Slots');
   const [isMobileOpen, setIsMobileOpen] = useState(false);
   const [slotItems, setSlotItems] = useState(slots.map(s => ({ ...s, isBlocked: false })));

   const toggleBlock = (id) => {
      setSlotItems(prev => prev.map(item => 
         item.id === id ? { ...item, isBlocked: !item.isBlocked } : item
      ));
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

   // Tiles Modals State
   const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
   const [isPatientsModalOpen, setIsPatientsModalOpen] = useState(false);
   const [isConsultationsModalOpen, setIsConsultationsModalOpen] = useState(false);
   const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
   const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

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
         <div 
            onClick={() => toggleBlock(slot.id)}
            className="bg-[#e4e5e7] hover:bg-[#d5d6d8] transition-colors rounded-full flex items-center h-[26px] w-[74px] relative shadow-sm cursor-pointer border border-gray-300/60 overflow-hidden"
         >
            <motion.div 
               className={`w-[19px] h-[19px] ${toggleCircleColor} rounded-full absolute left-0`}
               initial={false}
               animate={{ x: slot.isBlocked ? 51 : 3 }}
               transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
            <motion.span 
               className="text-[10px] font-bold text-[#5c5e60] absolute w-full text-center pointer-events-none"
               animate={{ x: slot.isBlocked ? -11 : 9 }}
               transition={{ duration: 0.2 }}
            >
               {slot.isBlocked ? 'Block' : 'Unblock'}
            </motion.span>
         </div>
      );

      if (slot.type === 'available') {
         return (
            <div key={slot.id} className="rounded-md border-[1.5px] border-[#c0d5db] bg-white shadow-md flex flex-col overflow-hidden h-[135px]">
               {/* Top white band */}
               <div className="px-[14px] pt-[12px] pb-[8px] flex justify-between items-center bg-white">
                  <span className="font-extrabold text-[#444] text-[16px]">{slot.time}</span>
                  <UnblockToggle />
               </div>
               {/* Middle solid blue band */}
               <div className="bg-[#bce0e9] w-full px-[14px] py-[8px] flex items-center gap-[8px]">
                  <div className="w-[12px] h-[12px] bg-[#89c5d6] rounded-sm opacity-90"></div>
                  <span className="font-bold text-[#1a5b6e] text-[16px]">{slot.title || 'Available'}</span>
               </div>
               {/* Bottom area */}
               <div className="flex-1 bg-white px-[14px] py-[10px] flex justify-end items-end">
                  <button 
                     onClick={() => setIsAddSlotModalOpen(true)}
                     className="bg-[#cee6eb] hover:bg-[#b0d9e2] transition-colors text-[#2c5361] font-bold text-[16px] px-[22px] py-[6px] rounded-md border-[1.5px] border-[#a5cbd4] tracking-wide"
                  >
                     Schedule
                  </button>
               </div>
            </div>
         );
      } else if (slot.type === 'break') {
         return (
            <div key={slot.id} className="rounded-md border-[1.5px] border-[#cac194] bg-[#fbf5d9] shadow-md flex flex-col overflow-hidden h-[135px]">
               <div className="px-[14px] pt-[12px] pb-[8px] flex justify-between items-center bg-[#c9bfa4]">
                  <span className="font-extrabold text-[#333] text-[16px]">{slot.time}</span>
                  <UnblockToggle />
               </div>
               <div className="flex-1 px-[14px] py-[8px] bg-[#fbf5d9] flex flex-col">
                  <div className="flex items-center gap-[6px]">
                     <div className="w-[12px] h-[12px] bg-[#b8b093] rounded-sm"></div>
                     <span className="font-bold text-[#444] text-[18px]">{slot.title}</span>
                  </div>
                  <div className="text-[13px] font-bold text-[#777] mt-[2px]">{slot.subtitle}</div>
                  <div className="flex justify-end mt-auto pb-[2px]">
                     <button className="bg-white hover:bg-gray-50 transition-colors text-[#444] font-bold text-[16px] px-[16px] py-[5px] rounded-md border-[1.5px] border-[#d8cdab] shadow-sm tracking-wide">
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
                  <span className="font-extrabold text-[#111] text-[16px]">{slot.time}</span>
                  <UnblockToggle />
               </div>
               <div className="flex-1 px-[14px] py-[8px] flex flex-col bg-[#e1eee2]">
                  <div className="flex items-center gap-[6px]">
                     <div className="w-[12px) h-[12px] bg-[#75b07d] rounded-sm"></div>
                     <span className="font-bold text-[#333] text-[18px]">{slot.title}</span>
                  </div>
                  <div className="text-[13px] font-bold text-[#666] mt-[2px]">{slot.subtitle}</div>
                  <div className="flex justify-between gap-[6px] mt-auto pb-[2px]">
                     <button className="flex-1 bg-white hover:bg-gray-50 transition-colors text-[#78ae80] font-bold text-[14px] py-[5px] rounded-md border-[1.5px] border-[#9bcfa3] shadow-sm tracking-wide">
                        View
                     </button>
                     <button className="flex-[1.2] bg-white hover:bg-gray-50 transition-colors text-[#666] font-bold text-[14px] py-[5px] rounded-md border-[1.5px] border-[#cdcdcd] shadow-sm tracking-wide">
                        ReSchedule
                     </button>
                     <button className="flex-[0.9] bg-white hover:bg-red-50 transition-colors text-[#ea6b6e] font-bold text-[14px] py-[5px] rounded-md border-[1.5px] border-[#e8a3a4] shadow-sm tracking-wide">
                        Cancel
                     </button>
                  </div>
               </div>
            </div>
         );
      }
      return null;
   };

   const formattedPopupDate = `${calendarDays[popupActiveDateIndex]}/${popupSelectedMonth.slice(0, 3).toLowerCase()}/${popupSelectedYear}`;

   return (
      <div className="flex h-screen w-full bg-[#f4f7fa] font-sans text-sm overflow-hidden text-gray-700">

         {/* Shared Sidebar */}
         <Side_app active={activeNav} setActive={setActiveNav} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

         {/* Main Container */}
         <main className="flex-1 flex flex-col bg-white overflow-hidden">

            {/* Header */}
            <header className="h-[74px] flex flex-row items-center justify-between px-4 md:px-8 shrink-0 bg-white">
               <div className="flex items-center flex-1 max-w-[700px] gap-[10px] md:gap-[12px]">
                  <button 
                     onClick={() => setIsMobileOpen(true)}
                     className="w-[38px] h-[38px] border-[1.5px] border-gray-200 rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col items-start justify-center pl-[9px] gap-[3px] bg-white hover:bg-gray-50 transition-colors shrink-0 lg:hidden"
                  >
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
                     <input type="text" placeholder="Search" className="w-full pl-[40px] pr-4 py-[9px] bg-white border border-gray-300/80 rounded-full text-[14px] md:text-[16px] text-gray-700 outline-none focus:border-[#468e9f]" />
                  </div>
               </div>
               <div className="flex items-center gap-[8px] md:gap-[10px]">
                  <button className="hidden sm:flex w-[38px] h-[38px] bg-white border border-gray-200 rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.03)] items-center justify-center text-black hover:bg-gray-50 transition-colors">
                     <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                     </svg>
                  </button>
                  <button className="relative w-[38px] h-[38px] bg-white border border-gray-200 rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex items-center justify-center text-[#112330] hover:bg-gray-50 transition-colors">
                     <svg className="w-[19px] h-[19px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                     </svg>
                     <div className="absolute top-[4px] right-[5px] bg-[#6c2da8] text-white text-[9px] font-bold w-[14px] h-[14px] flex items-center justify-center rounded-full border-none shadow-sm leading-none">1</div>
                  </button>
                  <button className="bg-[#94b8c0] hover:bg-[#85abb2] text-[#1c3947] font-semibold text-[14px] md:text-[16px] py-0 h-[38px] px-[10px] md:px-[12px] rounded-[6px] flex items-center gap-[6px] transition-colors shadow-sm ml-1">
                     <div className="w-[16px] md:w-[18px] h-[16px] md:h-[18px] bg-white rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-[10px] md:w-[12px] h-[10px] md:h-[12px] text-[#94b8c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m-8-8h16" /></svg>
                     </div>
                     <span className="hidden sm:inline">Make Appointment</span>
                     <span className="sm:hidden">Appt</span>
                  </button>
               </div>
            </header>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-auto p-4 px-6 bg-white min-h-0">

               <div className="flex flex-col lg:flex-row gap-[16px] items-stretch">

                  {/* Left Column */}
                  <div className="flex-1 lg:flex-[4.8] flex flex-col gap-[14px]">

                     {/* Welcome Banner */}
                     <div className="bg-[#1b738b] rounded-xl p-[22px] flex flex-col justify-center h-[105px]">
                        <h2 className="text-[22px] font-bold text-white leading-tight">Hello Dr. Iris</h2>
                        <p className="text-[12px] text-[#86cfe4] font-medium leading-snug mt-[4px]">
                           here are you important tasks and reports.<br />
                           Please check the next appointment
                        </p>
                     </div>

                     {/* Stats Tiles */}
                     <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-5 gap-[10px]">
                        {[
                           { name: 'Appointment', imgUrl: appointmentIcon },
                           { name: 'Total Patients', imgUrl: totalPatientsIcon },
                           { name: 'Consultations', imgUrl: consultationsIcon },
                           { name: 'Income', imgUrl: incomeIcon },
                           { name: 'Emergency', imgUrl: emergencyIcon }
                        ].map((t, i) => (
                           <div 
                              key={i} 
                              onClick={() => {
                                 if (t.name === 'Appointment') setIsAppointmentModalOpen(true);
                                 if (t.name === 'Total Patients') setIsPatientsModalOpen(true);
                                 if (t.name === 'Consultations') setIsConsultationsModalOpen(true);
                                 if (t.name === 'Income') setIsIncomeModalOpen(true);
                                 if (t.name === 'Emergency') setIsEmergencyModalOpen(true);
                              }}
                              className="flex flex-col items-center justify-between border-[1.5px] border-gray-600 rounded-2xl bg-white aspect-[1/0.85] shadow-sm px-[4px] py-[10px] mt-[4px] cursor-pointer hover:border-gray-400 transition-all hover:bg-gray-50/50"
                           >
                              <div className="flex-1 flex items-end justify-center w-full pointer-events-none">
                                 <img src={t.imgUrl} alt={t.name} className="h-full max-h-[58px] object-contain" />
                              </div>
                              <span className="text-[11px] md:text-[13px] font-bold text-[#444] tracking-wide mt-[8px] text-center leading-tight pointer-events-none">{t.name}</span>
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
                  <div className="flex-1 lg:flex-[2.8] border-[1.5px] border-gray-200 rounded-xl bg-white shadow-[0_2px_4px_rgba(0,0,0,0.02)] py-[18px] px-[20px] flex flex-col">
                     <div className="flex items-center justify-between mb-[20px]">
                        <button
                           onClick={() => {
                              const currentIndex = monthsList.indexOf(selectedMonth);
                              const prevIndex = currentIndex === 0 ? 11 : currentIndex - 1;
                              setSelectedMonth(monthsList[prevIndex]);
                           }}
                           className="text-[#32869e] hover:text-[#166378] transition-colors"
                        >
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
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
                                 <svg className="w-[10px] h-[10px] text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
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
                                    <svg className="w-[12px] h-[12px] text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" /></svg>
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
                                 <svg className="w-[10px] h-[10px] text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
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
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10l4-4 4 4m0 4l-4 4-4-4" />
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
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
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
                           {['27', '28', '29', '30', '31', '1', '2',
                              '3', '4', '5', '6', '7', '8', '9',
                              '10', '11', '12', '13', '14', '15', '16',
                              '17', '18', '19', '20', '21', '22', '23',
                              '24', '25', '26', '27', '28', '29', '30'].map((d, i) => {
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
                     {slotItems.map(renderSlot)}
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
                  <div className="w-[54px] h-[54px] bg-[#1a738c] rounded-[24px] flex justify-center items-center shadow-lg border-[2px] border-[#a0cddb] hover:bg-[#155b70] transition-colors relative" style={{ borderRadius: '50% 50% 50% 12px' }}>
                     <svg className="w-[28px] h-[28px] text-white pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2a2 2 0 012 2v2h2a4 4 0 014 4v7a4 4 0 01-4 4H8a4 4 0 01-4-4v-7a4 4 0 014-4h2V4a2 2 0 012-2zm0 14a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-3.5-5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm7 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                     </svg>
                     <div className="absolute top-[0px] right-[-6px] bg-[#65d065] text-white text-[10px] font-extrabold px-[6px] py-[3px] rounded-[6px] rounded-bl-sm tracking-widest shadow-sm border border-[#52af52] leading-none pointer-events-none">
                        ...
                     </div>
                  </div>
               </div>



            {/* Add Slots Modal */}
            {isAddSlotModalOpen && (
               <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                  <div className="bg-white rounded-[16px] shadow-2xl w-[620px] max-h-[95vh] overflow-hidden flex flex-col relative">

                     {/* Header */}
                     <div className="bg-white px-[26px] py-[14px] border-b border-gray-200 shrink-0">
                        <h2 className="text-[#111] font-[800] text-[18px]">Doctor Slot</h2>
                        <button
                           onClick={() => setIsAddSlotModalOpen(false)}
                           className="absolute top-[14px] right-[20px] text-gray-400 hover:text-gray-600 transition-colors"
                        >
                           <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                     </div>

                     {/* Body */}
                     <div className="px-[32px] pt-[28px] pb-[10px] flex flex-col gap-[22px] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>

                        {/* Date Range */}
                        <div className="flex flex-col gap-[14px]">
                           <h3 className="text-[#207a95] font-[800] text-[16px]">Date Range :</h3>
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
                           <h3 className="text-[#207a95] font-[800] text-[16px]">Time Range :</h3>
                           <div className="flex items-center gap-[34px] ml-[0px]">
                              <div className="flex items-center gap-[12px]">
                                 <span className="text-[#444] font-[600] text-[12.5px]">From Time :</span>
                                 <div className="relative flex items-center justify-between border-[1.5px] border-gray-400 rounded-[4px] px-[12px] py-[6px] w-[145px] bg-white overflow-hidden">
                                    <span className="text-[#333] font-[600] text-[13px] pointer-events-none">{formatModalTime(fromTime)}</span>
                                    <svg className="w-[18px] h-[18px] text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" /></svg>
                                    <input type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer" />
                                 </div>
                              </div>
                              <div className="flex items-center gap-[12px]">
                                 <span className="text-[#444] font-[600] text-[12.5px]">To Time :</span>
                                 <div className="relative flex items-center justify-between border-[1.5px] border-gray-400 rounded-[4px] px-[12px] py-[6px] w-[145px] bg-white overflow-hidden">
                                    <span className="text-[#333] font-[600] text-[13px] pointer-events-none">{formatModalTime(toTime)}</span>
                                    <svg className="w-[18px] h-[18px] text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" /></svg>
                                    <input type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer" />
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="h-[1px] bg-gray-300/80 w-full mt-[2px] mb-[2px]"></div>

                        {/* Slot Duration */}
                        <div className="flex flex-col gap-[14px] relative mb-[8px]">
                           <h3 className="text-[#207a95] font-[800] text-[16px]">Slot Duration :</h3>
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

         {/* Tiles Modals from Doctor Dashboard */}
            
         {/* Appointment Modal */}
         <AnimatePresence>
             {isAppointmentModalOpen && (
                 <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
                     <motion.div 
                         initial={{ opacity: 0, scale: 0.9, y: 20 }}
                         animate={{ opacity: 1, scale: 1, y: 0 }}
                         exit={{ opacity: 0, scale: 0.9, y: 20 }}
                         className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100"
                     >
                         <div className="p-7">
                             <div className="flex justify-between items-center mb-6">
                                 <h3 className="text-[18px] font-bold text-gray-800 tracking-tight">Recent Appointment Requests</h3>
                                 <button 
                                     onClick={() => setIsAppointmentModalOpen(false)}
                                     className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                                 >
                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                     </svg>
                                 </button>
                             </div>
                             
                             <div className="space-y-4">
                                 {appRequestsData.map((req, idx) => (
                                     <div key={idx} className="border border-gray-300 rounded-2xl p-4 bg-white hover:border-gray-400 transition-colors">
                                         <div className="flex justify-between items-start mb-4">
                                             <div className="flex gap-4 items-center">
                                                 <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                                                     <img src={phImg} alt="" className="w-full h-full object-cover" />
                                                 </div>
                                                 <div>
                                                     <p className="text-[16px] font-bold text-gray-800 leading-tight">{req.name}</p>
                                                     <p className="text-[13px] text-gray-400 font-bold mt-1">{req.gender} , {req.age}</p>
                                                 </div>
                                             </div>
                                             <div className="text-[11px] font-bold text-gray-400">{req.date}</div>
                                         </div>

                                         <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                             <div className="flex items-center gap-3">
                                                 <p className="text-[14px] font-bold text-[#32869e]">{req.treatment}</p>
                                                 <span className="bg-gray-100 border border-gray-200 text-[10px] font-bold px-2.5 py-1 rounded-full text-gray-500 uppercase">{req.time}</span>
                                             </div>
                                             <div className="flex gap-2">
                                                 <button className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-4 py-2 rounded-lg text-[12px] font-bold shadow-sm transition-all">Accept</button>
                                                 <button className="bg-[#f87171] hover:bg-[#ef4444] text-white px-4 py-2 rounded-lg text-[12px] font-bold shadow-sm transition-all">Decline</button>
                                             </div>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                             
                             <button 
                                 onClick={() => setIsAppointmentModalOpen(false)}
                                 className="w-full mt-8 bg-[#1b738c] text-white py-3.5 rounded-xl text-[15px] font-bold shadow-lg shadow-[#1b738c]/20 hover:bg-[#155b70] transition-all active:scale-[0.98]"
                             >
                                 Close
                             </button>
                         </div>
                     </motion.div>
                 </div>
             )}
         </AnimatePresence>

         {/* Total Patients Modal */}
         <AnimatePresence>
             {isPatientsModalOpen && (
                 <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
                     <motion.div 
                         initial={{ opacity: 0, scale: 0.9, y: 20 }}
                         animate={{ opacity: 1, scale: 1, y: 0 }}
                         exit={{ opacity: 0, scale: 0.9, y: 20 }}
                         className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100"
                     >
                         <div className="p-7">
                             <div className="flex justify-between items-center mb-6">
                                 <h3 className="text-[18px] font-bold text-gray-800 tracking-tight">Total Patients</h3>
                                 <button 
                                     onClick={() => setIsPatientsModalOpen(false)}
                                     className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                                 >
                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                     </svg>
                                 </button>
                             </div>
                             
                             <div className="space-y-4">
                                 {recentPatientsData.map((patient, idx) => (
                                     <div key={idx} className="flex items-center gap-4 p-4 border border-gray-300 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                         <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                                             <img src={phImg} alt="" className="w-full h-full object-cover" />
                                         </div>
                                         <div className="flex-1">
                                             <div className="flex justify-between items-start">
                                                 <p className="text-[16px] font-bold text-gray-800 leading-tight">{patient.name}</p>
                                                 <span className="text-[11px] font-bold text-[#1b738c] bg-[#1b738c]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">{patient.status}</span>
                                             </div>
                                             <p className="text-[14px] text-gray-500 font-medium mt-0.5">{patient.disease} • {patient.gender}</p>
                                             <div className="flex gap-3 mt-1">
                                                 <span className="text-[12px] text-gray-400 font-bold">Weight: {patient.weight}</span>
                                                 <span className="text-[12px] text-gray-400 font-bold">Heart: {patient.heartRate}</span>
                                             </div>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                             
                             <button 
                                 onClick={() => setIsPatientsModalOpen(false)}
                                 className="w-full mt-8 bg-[#1b738c] text-white py-3.5 rounded-xl text-[15px] font-bold shadow-lg shadow-[#1b738c]/20 hover:bg-[#155b70] transition-all active:scale-[0.98]"
                             >
                                 Close
                             </button>
                         </div>
                     </motion.div>
                 </div>
             )}
         </AnimatePresence>

         {/* Consultations Modal */}
         <AnimatePresence>
             {isConsultationsModalOpen && (
                 <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
                     <motion.div 
                         initial={{ opacity: 0, scale: 0.9, y: 20 }}
                         animate={{ opacity: 1, scale: 1, y: 0 }}
                         exit={{ opacity: 0, scale: 0.9, y: 20 }}
                         className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100"
                     >
                         <div className="p-7">
                             <div className="flex justify-between items-center mb-6">
                                 <h3 className="text-[18px] font-bold text-gray-800 tracking-tight">Consultations</h3>
                                 <button 
                                     onClick={() => setIsConsultationsModalOpen(false)}
                                     className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                                 >
                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                     </svg>
                                 </button>
                             </div>
                             
                             <div className="space-y-4">
                                 {timelineData.slice(0, 4).map((item, idx) => (
                                     <div key={idx} className="flex items-center gap-4 p-4 border border-gray-300 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                         <div className="w-3 h-12 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
                                         <div className="flex-1">
                                             <div className="flex justify-between items-start">
                                                 <p className="text-[16px] font-bold text-gray-800 leading-tight">{item.label}</p>
                                                 <span className="text-[11px] font-bold text-gray-400">{item.time}</span>
                                             </div>
                                             <p className="text-[14px] text-gray-500 font-medium mt-0.5">{item.patient}</p>
                                             <p className="text-[12px] text-[#32869e] font-bold mt-1">{item.duration}</p>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                             
                             <button 
                                 onClick={() => setIsConsultationsModalOpen(false)}
                                 className="w-full mt-8 bg-[#1b738c] text-white py-3.5 rounded-xl text-[15px] font-bold shadow-lg shadow-[#1b738c]/20 hover:bg-[#155b70] transition-all active:scale-[0.98]"
                             >
                                 Close
                             </button>
                         </div>
                     </motion.div>
                 </div>
             )}
         </AnimatePresence>

         {/* Income Modal */}
         <AnimatePresence>
             {isIncomeModalOpen && (
                 <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
                     <motion.div 
                         initial={{ opacity: 0, scale: 0.9, y: 20 }}
                         animate={{ opacity: 1, scale: 1, y: 0 }}
                         exit={{ opacity: 0, scale: 0.9, y: 20 }}
                         className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100"
                     >
                         <div className="p-7">
                             <div className="flex justify-between items-center mb-6">
                                 <h3 className="text-[18px] font-bold text-gray-800 tracking-tight">Income Summary</h3>
                                 <button 
                                     onClick={() => setIsIncomeModalOpen(false)}
                                     className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                                 >
                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                     </svg>
                                 </button>
                             </div>
                             
                             <div className="space-y-6">
                                 <div className="bg-gray-50 p-5 rounded-2xl border border-gray-300">
                                     <p className="text-[14px] text-gray-500 font-bold uppercase tracking-wider">Total Revenue</p>
                                     <h2 className="text-[48px] font-normal text-black leading-none mt-2">$142,000</h2>
                                     <div className="flex items-center gap-2 mt-4 text-green-600">
                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                         </svg>
                                         <span className="text-[14px] font-bold">+12.5% from last month</span>
                                     </div>
                                 </div>

                                 <div className="grid grid-cols-2 gap-4">
                                     <div className="p-4 border border-gray-300 rounded-2xl bg-white">
                                         <p className="text-[12px] text-gray-400 font-bold uppercase">Consultations</p>
                                         <p className="text-[20px] font-bold text-gray-800 mt-1">$98,400</p>
                                     </div>
                                     <div className="p-4 border border-gray-300 rounded-2xl bg-white">
                                         <p className="text-[12px] text-gray-400 font-bold uppercase">Treatments</p>
                                         <p className="text-[20px] font-bold text-gray-800 mt-1">$43,600</p>
                                     </div>
                                 </div>

                                 <div className="p-4 border border-gray-300 rounded-2xl bg-gray-50/50">
                                     <div className="flex justify-between items-center mb-3">
                                         <p className="text-[14px] font-bold text-gray-700">Recent Transactions</p>
                                         <button className="text-[12px] text-[#32869e] font-bold">View All</button>
                                     </div>
                                     <div className="space-y-3">
                                         {[1, 2].map(i => (
                                             <div key={i} className="flex justify-between items-center">
                                                 <div className="flex items-center gap-3">
                                                     <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                         <span className="text-[12px] font-bold">$</span>
                                                     </div>
                                                     <div>
                                                         <p className="text-[14px] font-bold text-gray-800">Patient Payment</p>
                                                         <p className="text-[11px] text-gray-400">May 12, 2025</p>
                                                     </div>
                                                 </div>
                                                 <p className="text-[14px] font-bold text-gray-800">+$250.00</p>
                                             </div>
                                         ))}
                                     </div>
                                 </div>
                             </div>
                             
                             <button 
                                 onClick={() => setIsIncomeModalOpen(false)}
                                 className="w-full mt-8 bg-[#1b738c] text-white py-3.5 rounded-xl text-[15px] font-bold shadow-lg shadow-[#1b738c]/20 hover:bg-[#155b70] transition-all active:scale-[0.98]"
                             >
                                 Close
                             </button>
                         </div>
                     </motion.div>
                 </div>
             )}
         </AnimatePresence>

         {/* Emergency Modal */}
         <AnimatePresence>
             {isEmergencyModalOpen && (
                 <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
                     <motion.div 
                         initial={{ opacity: 0, scale: 0.9, y: 20 }}
                         animate={{ opacity: 1, scale: 1, y: 0 }}
                         exit={{ opacity: 0, scale: 0.9, y: 20 }}
                         className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-red-100"
                     >
                         <div className="p-7">
                             <div className="flex justify-between items-center mb-6">
                                 <div className="flex items-center gap-3">
                                     <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 shadow-sm">
                                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                         </svg>
                                     </div>
                                     <h3 className="text-[18px] font-bold text-gray-800 tracking-tight">Emergency Alerts</h3>
                                 </div>
                                 <button 
                                     onClick={() => setIsEmergencyModalOpen(false)}
                                     className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                                 >
                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                     </svg>
                                 </button>
                             </div>
                             
                             <div className="space-y-4">
                                 <div className="p-4 border border-red-200 rounded-2xl bg-red-50/50">
                                     <div className="flex justify-between items-start mb-2">
                                         <p className="text-[16px] font-bold text-red-700">Active Emergency</p>
                                         <span className="text-[11px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-full animate-pulse">URGENT</span>
                                     </div>
                                     <p className="text-[14px] text-red-600 font-medium">Patient: Rajesh Kumar • Room 302</p>
                                     <p className="text-[12px] text-red-500 font-bold mt-1">Status: Cardiac Distress • 2 mins ago</p>
                                 </div>

                                 <div className="space-y-3">
                                     <p className="text-[13px] font-bold text-gray-500 uppercase tracking-wider ml-1">Quick Actions</p>
                                     <div className="grid grid-cols-2 gap-3">
                                         <button className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                                             <span className="text-[14px] font-bold text-gray-700">Call ER</span>
                                         </button>
                                         <button className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                                             <span className="text-[14px] font-bold text-gray-700">Dispatch Team</span>
                                         </button>
                                     </div>
                                 </div>

                                 <div className="p-4 border border-gray-300 rounded-2xl bg-gray-50/50">
                                     <p className="text-[14px] font-bold text-gray-700 mb-3">Emergency Contact List</p>
                                     <div className="space-y-3">
                                         <div className="flex justify-between items-center">
                                             <p className="text-[14px] font-bold text-gray-800">ICU Desk</p>
                                             <p className="text-[14px] font-bold text-[#1b738c]">Ext: 405</p>
                                         </div>
                                         <div className="flex justify-between items-center">
                                             <p className="text-[14px] font-bold text-gray-800">Ambulance Services</p>
                                             <p className="text-[14px] font-bold text-[#1b738c]">102</p>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             
                             <button 
                                 onClick={() => setIsEmergencyModalOpen(false)}
                                 className="w-full mt-8 bg-red-600 text-white py-3.5 rounded-xl text-[15px] font-bold shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all active:scale-[0.98]"
                             >
                                 Close
                             </button>
                         </div>
                     </motion.div>
                 </div>
             )}
         </AnimatePresence>
      </div>
   );
};

export default Addslot;

