import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';

import logoUrl from '../../assets/v.png';
import Side_app from '../Appoinment/Side_app';
import Profile from '../Admin/Profile';
import DasyWilliam from '../Admin/DasyWilliam';
import Notification from '../Patient/notification';
import { AnimatePresence } from 'framer-motion';

import appointmentIcon from '../../assets/appointment.svg';
import totalPatientsIcon from '../../assets/total_patients.svg';
import consultationsIcon from '../../assets/consultations.svg';
import incomeIcon from '../../assets/income.svg';
import emergencyIcon from '../../assets/emergency.svg';
import phImg from '../../assets/ph.png';

const monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const yearsList = Array.from({ length: 22 }, (_, i) => 2005 + i);
const calendarDays = ['27', '28', '29', '30', '31', '1', '2',
    '3', '4', '5', '6', '7', '8', '9',
    '10', '11', '12', '13', '14', '15', '16',
    '17', '18', '19', '20', '21', '22', '23',
    '24', '25', '26', '27', '28', '29', '30'];

const timelineData = [
    { time: "10:30 am", label: "Patient Checkup", patient: "Natalia khan", duration: "10:30 am - 11:00 am", color: "#facc15" },
    { time: "12:00 am", label: "Treatment", patient: "Natalia khan", duration: "12:00 am - 11:00 am", color: "#f87171" },
    { time: "02:00 am", label: "Round in Patient wards", patient: "Hall no - 6", duration: "02:00 am - 03:00 am", color: "#38bdf8" },
    { time: "02:00 am", label: "Round in Patient wards", patient: "Hall no - 6", duration: "02:00 am - 03:00 am", color: "#f87171" },
    { time: "02:00 am", label: "Patient Checkup", patient: "Natalia khan", duration: "10:30 am - 11:00 am", color: "#bef264" },
    { time: "02:00 am", label: "Treatment", patient: "Natalia khan", duration: "12:00 am - 11:00 am", color: "#f87171" },
    { time: "02:00 am", label: "Round in Patient wards", patient: "Hall no - 6", duration: "02:00 am - 03:00 am", color: "#38bdf8" },
    { time: "02:00 am", label: "Treatment", patient: "Natalia khan", duration: "12:00 am - 11:00 am", color: "#f87171" },
];

const activityData = [
    { month: "Jan", Consultations: 70, Patients: 50 },
    { month: "Feb", Consultations: 140, Patients: 120 },
    { month: "Mar", Consultations: 100, Patients: 80 },
    { month: "Apr", Consultations: 80, Patients: 90 },
    { month: "May", Consultations: 198, Patients: 60 },
    { month: "Jun", Consultations: 80, Patients: 70 },
    { month: "Jul", Consultations: 120, Patients: 110 },
    { month: "Aug", Consultations: 90, Patients: 100 },
    { month: "Sep", Consultations: 140, Patients: 130 },
    { month: "Oct", Consultations: 110, Patients: 105 },
    { month: "Nov", Consultations: 125, Patients: 135 },
    { month: "Dec", Consultations: 160, Patients: 150 },
];

const miniScheduleData = [
    { time: "2pm", label: "Meeting with chief physician Dr.William", completed: true },
    { time: "", label: "Consultation with Mr.White", completed: false },
    { time: "", label: "Consultation with Mrs.Misky", completed: false },
    { time: "", label: "Meeting with chief physician Dr.Warsi", completed: false },
];

const appRequestsData = [
    { name: "Riya madeshiya", gender: "Female", age: 30, treatment: "Regular Checkup", time: "10 am", date: "13 feb 2026" },
    { name: "Riya madeshiya", gender: "Female", age: 30, treatment: "Regular Checkup", time: "10 am", date: "13 feb 2026" },
    { name: "Riya madeshiya", gender: "Female", age: 30, treatment: "Regular Checkup", time: "10 am", date: "13 feb 2026" },
    { name: "Riya madeshiya", gender: "Female", age: 30, treatment: "Regular Checkup", time: "10 am", date: "13 feb 2026" },
    { name: "Riya madeshiya", gender: "Female", age: 30, treatment: "Regular Checkup", time: "10 am", date: "13 feb 2026" },
];

const recentPatientsData = [
    { name: "Riya madeshiya", gender: "Female", weight: "50kg", disease: "Typhoid", date: "14 feb", heartRate: "70 bpm", bloodType: "AB", status: "OutPatient" },
    { name: "Riya madeshiya", gender: "Female", weight: "50kg", disease: "Typhoid", date: "14 feb", heartRate: "70 bpm", bloodType: "AB", status: "OutPatient" },
    { name: "Riya madeshiya", gender: "Female", weight: "50kg", disease: "Typhoid", date: "14 feb", heartRate: "70 bpm", bloodType: "AB", status: "OutPatient" },
];

const Doctor_dashboard = () => {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('Dashboard');
    const [open, setOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (openProfile) {
        return <Profile setOpenProfile={setOpenProfile} />;
    }

    // Dashboard States
    const [activeDateIndex, setActiveDateIndex] = useState(17); // 13th
    const [selectedMonth, setSelectedMonth] = useState('January');
    const [selectedYear, setSelectedYear] = useState(2025);
    const [isMonthOpen, setIsMonthOpen] = useState(false);
    const [isYearOpen, setIsYearOpen] = useState(false);
    const [dateStyle, setDateStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
    const dateRefs = useRef([]);
    const yearScrollRef = useRef(null);

    // Mobile Sidebar State
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Bot States
    const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0, hasMoved: false });


    useEffect(() => {
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
    }, [activeDateIndex, selectedMonth, selectedYear]);

    const handlePointerDown = (e) => {
        setIsDragging(true);
        const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
        const clientY = e.clientY ?? (e.touches && e.touches[0].clientY);
        dragRef.current = { startX: clientX, startY: clientY, initialX: dragPos.x, initialY: dragPos.y, hasMoved: false };
    };

    useEffect(() => {
        const handlePointerMove = (e) => {
            if (!isDragging) return;
            const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
            const clientY = e.clientY ?? (e.touches && e.touches[0].clientY);
            const dx = clientX - dragRef.current.startX;
            const dy = clientY - dragRef.current.startY;
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragRef.current.hasMoved = true;
            setDragPos({ x: dragRef.current.initialX + dx, y: dragRef.current.initialY + dy });
        };
        const handlePointerUp = () => setIsDragging(false);
        if (isDragging) {
            window.addEventListener('mousemove', handlePointerMove);
            window.addEventListener('mouseup', handlePointerUp);
        }
        return () => {
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('mouseup', handlePointerUp);
        };
    }, [isDragging]);

    return (
        <div className="flex flex-col lg:flex-row h-screen w-full bg-white font-sans text-sm overflow-hidden text-gray-700">
            {/* Sidebar */}
            <Side_app active={activeNav} setActive={setActiveNav} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

            {/* Main Content */}
            <main className="flex-1 flex flex-col bg-white overflow-hidden">
                {/* Top Header */}
                <header className="h-[74px] flex flex-row items-center justify-between px-4 md:px-8 shrink-0 bg-white border-b border-gray-100">
                    <div className="flex items-center flex-1 max-w-[700px] gap-[10px] md:gap-[15px]">
                        <button 
                            onClick={() => setIsMobileOpen(true)}
                            className="w-[40px] h-[40px] border border-gray-200 rounded-[8px] flex flex-col items-center justify-center gap-[4px] bg-white hover:bg-gray-50 transition-colors shrink-0 shadow-sm lg:hidden"
                        >
                            <span className="w-[18px] h-[2px] bg-[#1b738c] rounded-full"></span>
                            <span className="w-[18px] h-[2px] bg-[#1b738c] rounded-full opacity-60"></span>
                            <span className="w-[18px] h-[2px] bg-[#1b738c] rounded-full"></span>
                        </button>
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-[16px] flex items-center pointer-events-none">
                                <svg className="w-[18px] h-[18px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </div>
                            <input type="text" placeholder="Search" className="w-full pl-[40px] pr-4 py-[9px] bg-white border border-gray-200 rounded-full text-[13.5px] text-gray-700 outline-none focus:border-[#1b738c] transition-all" />
                        </div>
                    </div>
                    <div className="flex items-center gap-[8px] md:gap-[12px]">
                        {/* Settings Icon */}
                        <div 
                            onClick={() => setOpenProfile(true)}
                            className="hidden sm:flex w-14 h-11 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] items-center justify-center text-gray-700 cursor-pointer hover:bg-gray-50 transition-all">
                            <svg className="w-[24px] h-[24px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>

                        {/* Notification Icon */}
                        <div 
                            onClick={() => setIsNotificationOpen(true)}
                            className="relative w-14 h-11 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center text-gray-700 cursor-pointer hover:bg-gray-50 transition-all">
                            <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <div className="absolute -top-1 -right-1 bg-[#9367D8] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm leading-none">
                                1
                            </div>
                        </div>

                        <div className="relative ml-2" ref={menuRef}>
                            <div
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-4 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-xl px-4 py-1.5 cursor-pointer hover:bg-gray-50 transition-all"
                            >
                                <span className="text-[18px] font-semibold text-gray-700 hidden lg:inline">Dasy William</span>
                                <img src="/assets/ph.png" className="w-10 h-10 rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.12)] object-cover" />
                            </div>
                            <AnimatePresence>
                                {open && !openProfile && (
                                    <DasyWilliam setOpenProfile={setOpenProfile} />
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Dashboard Grid */}
                <div className="flex-1 overflow-auto p-4 md:px-6 bg-white min-h-0">
                    <div className="flex flex-col lg:flex-row gap-[16px] items-stretch">

                        {/* Left Column (Banner, Tiles, Timeline, Activity, Recent Patients) */}
                        <div className="flex-1 lg:flex-[6.0] flex flex-col gap-[14px] min-w-0 font-sans">
                            {/* Welcome Banner */}
                            <div className="bg-[#1b738b] rounded-xl p-[22px] flex flex-col justify-center h-[120px]">
                                <h2 className="text-[30px] font-bold text-white leading-tight">Hello Dr.John</h2>
                                <p className="text-[14px] text-[#86cfe4] font-medium leading-snug mt-[4px]">
                                    here are you important tasks and reports.<br />
                                    Please check the next appointment
                                </p>
                            </div>

                            {/* Stats Tiles */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-[10px]">
                                {[
                                    { name: 'Appointment', imgUrl: appointmentIcon },
                                    { name: 'Total Patients', imgUrl: totalPatientsIcon },
                                    { name: 'Consultations', imgUrl: consultationsIcon },
                                    { name: 'Income', imgUrl: incomeIcon },
                                    { name: 'Emergency', imgUrl: emergencyIcon }
                                ].map((t, i) => (
                                    <div key={i} className="flex flex-col items-center justify-between border-[1.5px] border-gray-600 rounded-2xl bg-white aspect-[1/0.85] shadow-sm px-[4px] py-[10px] mt-[4px]">
                                        <div className="flex-1 flex items-end justify-center w-full">
                                            <img src={t.imgUrl} alt={t.name} className="h-full max-h-[40px] md:max-h-[58px] object-contain" />
                                        </div>
                                        <span className="text-[12px] md:text-[15px] font-bold text-[#444] tracking-wide mt-[8px] text-center leading-tight">{t.name}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Timeline Section */}
                            <div className="bg-white border-[1.5px] border-gray-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col mb-[20px]">
                                <div className="p-[20px] pb-[15px]">
                                    <h3 className="text-[26px] font-bold text-[#111] mb-[15px]">Timeline</h3>
                                    <div className="h-[1px] bg-gray-100 -mx-[20px]"></div>
                                </div>

                                <div className="flex-1 p-[20px] pt-0">
                                    <div className="relative">
                                        {/* Single Vertical line for all rows */}
                                        <div className="absolute left-[94px] top-0 bottom-0 w-[1.5px] bg-gray-100"></div>

                                        <div className="flex flex-col">
                                            {timelineData.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-[15px] mb-[12px] last:mb-0 relative">
                                                    {/* Time label */}
                                                    <div className="w-[85px] text-[15px] font-bold text-gray-500 shrink-0 text-right pr-[5px] truncate">{item.time}</div>

                                                    {/* Divider (invisible but providing space correctly relative to absolute line) */}
                                                    <div className="w-[20px] shrink-0 flex justify-center z-10">
                                                        <div className="w-[10px] h-[10px] rounded-full border-[2px] border-white shadow-sm" style={{ backgroundColor: item.color }}></div>
                                                    </div>

                                                    {/* Content Block */}
                                                    <div className="flex-1 bg-[#eef7f9] rounded-xl px-[18px] py-[10px] flex justify-between items-center group hover:bg-[#e4eff1] transition-colors shadow-sm">
                                                        <div>
                                                            <div className="text-[15px] font-bold text-[#333] leading-tight">{item.label}</div>
                                                            <div className="text-[13px] text-gray-500 font-bold mt-[2px]">{item.patient}</div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-[12px] text-gray-400 font-bold tracking-tight">{item.duration}</div>
                                                            <button className="text-[#32869e] text-[12px] font-bold hover:underline mt-[1px]">View Detail</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Activity Section */}
                            <div className="bg-white border-[1.5px] border-gray-100 rounded-xl p-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col h-[340px]">
                                <div className="flex items-center justify-between mb-[20px]">
                                    <h3 className="text-[24px] font-bold text-[#111]">Activity</h3>
                                    <div className="flex items-center gap-[15px] bg-gray-50 px-3 py-1 rounded-md border border-gray-200">
                                        <select className="bg-transparent text-[14px] font-bold text-gray-600 outline-none cursor-pointer">
                                            <option>weekly</option>
                                            <option>monthly</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex-1 w-full ml-[-20px] h-[220px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={activityData} margin={{ top: 10, right: 10, left: 0, bottom: 35 }}>
                                            <defs>
                                                <linearGradient id="colorConsultations" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.15} />
                                                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.15} />
                                                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                            <XAxis dataKey="month" axisLine={false} tickLine={false} interval={0} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} dy={15} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} ticks={[0, 50, 100, 150, 200]} />
                                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 16px rgba(0,0,0,0.08)' }} />
                                            <Area type="monotone" dataKey="Consultations" stroke="#0a1d37" strokeWidth={3} fillOpacity={1} fill="url(#colorConsultations)" />
                                            <Area type="monotone" dataKey="Patients" stroke="#2c9daf" strokeWidth={3} fillOpacity={1} fill="url(#colorPatients)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex justify-center gap-[30px] mt-[10px]">
                                    <div className="flex items-center gap-[8px]">
                                        <div className="w-[12px] h-[12px] rounded-full bg-[#1e3a8a]"></div>
                                        <span className="text-[12px] font-bold text-gray-600">Consultations</span>
                                    </div>
                                    <div className="flex items-center gap-[8px]">
                                        <div className="w-[12px] h-[12px] rounded-full bg-[#06b6d4]"></div>
                                        <span className="text-[12px] font-bold text-gray-600">Patients</span>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Patients Section */}
                            <div className="bg-white border-[1.5px] border-gray-300 rounded-xl p-[20px] shadow-sm flex flex-col mb-[20px]">
                                <h3 className="text-[30px] font-bold text-[#111] mb-[15px]">Recent Patients</h3>

                                {/* Header Labels */}
                                <div className="overflow-x-auto min-w-full">
                                    <div className="flex min-w-[800px] px-[10px] mb-[8px] text-[14px] font-bold text-gray-400">
                                        <div className="w-[180px]">Name</div>
                                        <div className="w-[100px]">Gender</div>
                                        <div className="w-[100px]">Weight</div>
                                        <div className="w-[100px]">Disease</div>
                                        <div className="w-[80px]">Date</div>
                                        <div className="w-[120px]">Heart Rate</div>
                                        <div className="w-[100px]">Blood Type</div>
                                        <div className="flex-1 text-right">Status</div>
                                    </div>

                                    {/* Patient Rows */}
                                    <div className="flex flex-col gap-[8px] min-w-[800px]">
                                        {recentPatientsData.map((p, i) => (
                                            <div key={i} className="border border-gray-300 rounded-[4px] p-[8px] flex items-center text-[13.5px] font-semibold text-[#111] bg-white group hover:border-gray-400 transition-colors">
                                                <div className="w-[180px] flex items-center gap-[10px]">
                                                    <div className="w-[36px] h-[36px] rounded-full overflow-hidden shrink-0 border border-gray-100">
                                                        <img src={phImg} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                    <span className="truncate">{p.name}</span>
                                                </div>
                                                <div className="w-[100px] text-gray-600">{p.gender}</div>
                                                <div className="w-[100px] text-gray-600">59kg</div>
                                                <div className="w-[100px] text-gray-600">Typhoid</div>
                                                <div className="w-[80px] text-gray-600">14 feb</div>
                                                <div className="w-[120px] text-gray-600">59 bpm</div>
                                                <div className="w-[100px] text-gray-600">AB</div>
                                                <div className="flex-1 text-right">
                                                    <span className="text-[#111]">OutPatient</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate("/Patients")}
                                    className="text-[#32869e] text-[14px] font-bold hover:underline mt-[12px] self-end pr-[5px]"
                                >
                                    View More
                                </button>
                            </div>
                        </div>

                        {/* Right Column (Cards) */}
                        <div className="flex-1 lg:flex-[4.0] lg:min-w-[420px] flex flex-col gap-[20px]">
                            {/* Card 1: Calendar */}
                            <div className="border-[1.5px] border-gray-200 rounded-xl bg-white shadow-[0_2px_4px_rgba(0,0,0,0.02)] py-[18px] px-[20px] flex flex-col">
                                <div className="flex items-center justify-between mb-[20px]">
                                    <button
                                        onClick={() => { const i = monthsList.indexOf(selectedMonth); setSelectedMonth(monthsList[i === 0 ? 11 : i - 1]); }}
                                        className="w-[32px] h-[32px] rounded-full bg-[#e2e8f0] flex items-center justify-center text-gray-500 hover:bg-gray-300 transition-colors"
                                    >
                                        <svg className="w-4 h-4 ml-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
                                    </button>

                                    <div className="flex gap-4 items-center relative">
                                        {/* Month Selection */}
                                        <div className="relative">
                                            <div 
                                                className="flex items-center gap-[6px] cursor-pointer group" 
                                                onClick={() => { setIsMonthOpen(!isMonthOpen); setIsYearOpen(false); }}
                                            >
                                                <span className="font-[600] text-[15px] text-[#555] tracking-wide">{selectedMonth}</span>
                                                <svg className="w-[12px] h-[12px] text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                            
                                            {isMonthOpen && (
                                                <div className="absolute top-full left-0 mt-2 w-[140px] bg-white border border-gray-100 rounded-xl shadow-xl z-[100] py-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                                                    {monthsList.map(m => (
                                                        <div 
                                                            key={m}
                                                            onClick={() => { setSelectedMonth(m); setIsMonthOpen(false); }}
                                                            className={`px-4 py-2 text-[14px] cursor-pointer transition-colors ${selectedMonth === m ? 'bg-blue-50 text-[#32869e] font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                                                        >
                                                            {m}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Year Selection */}
                                        <div className="relative">
                                            <div 
                                                className="flex items-center gap-[6px] cursor-pointer group" 
                                                onClick={() => { setIsYearOpen(!isYearOpen); setIsMonthOpen(false); }}
                                            >
                                                <span className="font-[600] text-[15px] text-[#555] tracking-wide">{selectedYear}</span>
                                                <svg className="w-[12px] h-[12px] text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                                            </div>

                                            {isYearOpen && (
                                                <div className="absolute top-full left-0 mt-2 w-[100px] bg-white border border-gray-100 rounded-xl shadow-xl z-[100] py-2 max-h-[200px] overflow-y-auto custom-scrollbar">
                                                    {yearsList.map(y => (
                                                        <div 
                                                            key={y}
                                                            onClick={() => { setSelectedYear(y); setIsYearOpen(false); }}
                                                            className={`px-4 py-2 text-[14px] cursor-pointer transition-colors ${selectedYear === y ? 'bg-blue-50 text-[#32869e] font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                                                        >
                                                            {y}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => { const i = monthsList.indexOf(selectedMonth); setSelectedMonth(monthsList[i === 11 ? 0 : i + 1]); }}
                                        className="w-[32px] h-[32px] rounded-full bg-[#e2e8f0] flex items-center justify-center text-gray-500 hover:bg-gray-300 transition-colors"
                                    >
                                        <svg className="w-4 h-4 mr-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </div>

                                <div className="grid grid-cols-7 mb-4">
                                    {['S', 'M', 'T', 'W', 'Th', 'F', 'Sat'].map(d => (
                                        <div key={d} className="text-center text-[#32869e] font-bold text-[13px]">{d}</div>
                                    ))}
                                </div>
                                <div className="relative mt-1">
                                    <div className="absolute bg-[#6fa7ba] rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-0" style={{ left: dateStyle.left, top: dateStyle.top, width: dateStyle.width, height: dateStyle.height, opacity: dateStyle.opacity }} />
                                    <div className="grid grid-cols-7 gap-y-[18px] text-[11px] font-bold text-[#444444] relative z-10">
                                        {(() => {
                                            const daysInMonth = new Date(selectedYear, monthsList.indexOf(selectedMonth) + 1, 0).getDate();
                                            const firstDay = new Date(selectedYear, monthsList.indexOf(selectedMonth), 1).getDay();
                                            const daysInPrevMonth = new Date(selectedYear, monthsList.indexOf(selectedMonth), 0).getDate();

                                            const prevDays = [...Array(firstDay)].map((_, i) => {
                                                const d = daysInPrevMonth - firstDay + i + 1;
                                                return (
                                                    <div key={`prev-${i}`} className="flex justify-center items-center">
                                                        <span className="w-[29px] h-[29px] flex items-center justify-center rounded-full text-gray-300 font-medium">
                                                            {d}
                                                        </span>
                                                    </div>
                                                );
                                            });

                                            const currentDays = [...Array(daysInMonth)].map((_, i) => {
                                                const d = i + 1;
                                                const totalIndex = firstDay + i;
                                                return (
                                                    <div key={`curr-${i}`} className="flex justify-center items-center">
                                                        <span 
                                                            ref={el => dateRefs.current[totalIndex] = el}
                                                            onClick={() => setActiveDateIndex(totalIndex)}
                                                            className={`w-[29px] h-[29px] flex items-center justify-center rounded-full transition-colors cursor-pointer ${activeDateIndex === totalIndex ? 'text-white' : 'hover:bg-gray-100'}`}
                                                        >
                                                            {d}
                                                        </span>
                                                    </div>
                                                );
                                            });

                                            const nextDaysCount = 42 - (prevDays.length + currentDays.length);
                                            const nextDays = [...Array(nextDaysCount)].map((_, i) => (
                                                <div key={`next-${i}`} className="flex justify-center items-center">
                                                    <span className="w-[29px] h-[29px] flex items-center justify-center rounded-full text-gray-200 font-medium">
                                                        {i + 1}
                                                    </span>
                                                </div>
                                            ));

                                            return [...prevDays, ...currentDays, ...nextDays];
                                        })()}
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Daily Schedule */}
                            <div className="bg-white border-[1.5px] border-gray-200 rounded-xl p-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col">
                                <div className="flex items-center justify-between mb-[25px]">
                                    <h4 className="text-[16px] font-bold text-gray-800 tracking-wide">January 13</h4>
                                    <button className="text-gray-300 hover:text-gray-500 flex gap-0.5">
                                        <div className="w-[3px] h-[3px] bg-gray-300 rounded-full"></div>
                                        <div className="w-[3px] h-[3px] bg-gray-300 rounded-full"></div>
                                        <div className="w-[3px] h-[3px] bg-gray-300 rounded-full"></div>
                                    </button>
                                </div>
                                <div className="flex flex-col">
                                    {miniScheduleData.map((item, idx) => (
                                        <div key={idx} className="flex gap-[15px] group relative pb-[20px] last:pb-0">
                                            {/* Vertical Line */}
                                            {idx !== miniScheduleData.length - 1 && (
                                                <div className="absolute left-[10px] top-[20px] bottom-0 w-[2px] bg-[#10b981] opacity-30"></div>
                                            )}

                                            {/* Icon */}
                                            <div className="w-[20px] h-[40px] flex justify-center pt-[2px] shrink-0 z-10 relative bg-white">
                                                {idx === 0 ? (
                                                    <div className="w-[22px] h-[22px] rounded-full bg-[#10b981] flex items-center justify-center text-white shadow-sm">
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" /></svg>
                                                    </div>
                                                ) : (
                                                    <div className="w-[22px] h-[22px] rounded-full border-[1.5px] border-[#10b981] flex items-center justify-center text-[#10b981] bg-white">
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-[12px]">
                                                    <div className="flex items-center gap-[10px] flex-1">
                                                        {item.time && <span className="text-[15px] font-bold text-gray-800 shrink-0">{item.time}</span>}
                                                        <span className="text-[16px] font-semibold text-gray-800 flex-1 text-right">{item.label}</span>
                                                    </div>
                                                </div>
                                                {/* Horizontal Dashed Line */}
                                                <div className="border-b-2 border-dashed border-gray-300 w-full ml-[-20px] pl-[20px]"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Card 3: Appointment Request Section */}
                            <div className="bg-white border-[1.5px] border-gray-300 rounded-xl p-[12px] shadow-sm flex flex-col">
                                <h3 className="text-[24px] font-bold text-[#111] mb-[10px]">Appointment Request</h3>
                                <div className="flex flex-col gap-[6px]">
                                    {appRequestsData.map((req, i) => (
                                        <div key={i} className="border border-gray-200 rounded-[4px] p-[6px] flex flex-col gap-[2px] relative bg-white hover:border-gray-300 transition-colors">
                                            {/* Top Row */}
                                            <div className="flex justify-between items-start">
                                                <div className="flex gap-[12px] items-center">
                                                    <div className="w-[52px] h-[52px] rounded-full overflow-hidden shrink-0 border border-gray-100">
                                                        <img src={phImg} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="text-[16px] font-bold text-[#111] leading-tight">Riya madeshiya</div>
                                                        <div className="text-[13px] text-gray-400 font-bold mt-[2px]">Female , 30</div>
                                                    </div>
                                                </div>
                                                <div className="text-[11px] font-bold text-gray-400 mt-[1px] pr-[2px]">{req.date}</div>
                                            </div>

                                            {/* Bottom Row */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-[6px]">
                                                    <div className="text-[13px] font-bold text-[#32869e]">Treatment -Regular Checkup</div>
                                                    <div className="bg-[#f3f4f6] border border-gray-300 text-[11px] font-bold px-[8px] py-[2px] rounded-full text-gray-500 uppercase">10 am</div>
                                                </div>
                                                <div className="flex gap-[6px]">
                                                    <button className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-[15px] py-[3.5px] rounded-[4px] text-[12px] font-bold shadow-sm transition-all whitespace-nowrap">Accept</button>
                                                    <button className="bg-[#f87171] hover:bg-[#ef4444] text-white px-[15px] py-[3.5px] rounded-[4px] text-[12px] font-bold shadow-sm transition-all whitespace-nowrap">Decline</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="text-[#32869e] text-[13px] font-bold hover:underline mt-[6px] self-end pr-[4px]">View More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Bot Icon */}
                <Link to="/Bot" className="fixed bottom-10 right-10 z-[60] touch-none select-none group cursor-pointer border-none p-0 bg-transparent outline-none no-underline" style={{ transform: `translate(${dragPos.x}px, ${dragPos.y}px)` }} onMouseDown={handlePointerDown} onClick={(e) => { if (dragRef.current.hasMoved) e.preventDefault(); }}>
                    <div className="w-[64px] h-[64px] bg-[#1a738c] rounded-[24px] flex flex-col justify-center items-center shadow-2xl border-[2px] border-[#a0cddb] hover:bg-[#155b70] transition-all hover:scale-110 active:scale-95 relative" style={{ borderRadius: '50% 50% 50% 12px' }}>
                        <svg className="w-[30px] h-[30px] text-white pointer-events-none" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a2 2 0 012 2v2h2a4 4 0 014 4v7a4 4 0 01-4 4H8a4 4 0 01-4-4v-7a4 4 0 014-4h2V4a2 2 0 012-2zm0 14a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-3.5-5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm7 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" /></svg>
                        <span className="text-white text-[8px] font-bold mt-[-2px] uppercase tracking-tighter">ChatBot</span>
                    </div>
                </Link>
            </main>
            {isNotificationOpen && <Notification onClose={() => setIsNotificationOpen(false)} />}
        </div>
    );
};

export default Doctor_dashboard;
