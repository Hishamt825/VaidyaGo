import React, { useState, useRef, useEffect } from "react";
import DasyWilliam from "./DasyWilliam";
import Profile from "./Profile";

import AdminSidebar from "./AdminSidebar";
import { AnimatePresence, motion } from "framer-motion";
// import plus from "../../assets/plus.png";
import ap from "../../assets/ap.png";
import admin1 from "../../assets/admin1.png";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    CartesianGrid
} from "recharts";


const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const monthlyData = [
    { month: "Jan", male: 40, female: 30 },
    { month: "Feb", male: 15, female: 20 },
    { month: "Mar", male: 30, female: 15 },
    { month: "Apr", male: 60, female: 25 },
    { month: "May", male: 30, female: 50 },
    { month: "Jun", male: 15, female: 20 },
    { month: "Jul", male: 10, female: 15 },
    { month: "Aug", male: 40, female: 38 },
    { month: "Sep", male: 25, female: 42 },
    { month: "Oct", male: 38, female: 55 },
    { month: "Nov", male: 20, female: 35 },
    { month: "Dec", male: 35, female: 45 },
];

const weeklyData = [
    { day: "Mon", value: 20 },
    { day: "Tue", value: 35 },
    { day: "Wed", value: 25 },
    { day: "Thu", value: 40 },
    { day: "Fri", value: 30 },
    { day: "Sat", value: 45 },
    { day: "Sun", value: 28 },
];
const Admin_dashboard1 = () => {
    const [open, setOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const menuRef = useRef(null);
    const [showFullApproval, setShowFullApproval] = useState(false);
    const [expandedApprovalId, setExpandedApprovalId] = useState(1);
    const [month, setMonth] = useState(0); // January
    const [year, setYear] = useState(2025);
    const [selectedDate, setSelectedDate] = useState(13);
    const [active, setActive] = useState("Dashboard");
    const [selectedWeekDay, setSelectedWeekDay] = useState("Friday");
    const [activeDayIndex, setActiveDayIndex] = useState(2);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [showRejectConfirm, setShowRejectConfirm] = useState(false);
    const [showReasonModal, setShowReasonModal] = useState(false);
    const [selectedDoctorForReject, setSelectedDoctorForReject] = useState(null);
    const [rejectionReason, setRejectionReason] = useState("Document Not Correct");
    const [rejectionFeedback, setRejectionFeedback] = useState("The documents uploaded for verification are incorrect.Please ensure all documents are complete and accurate.");
    const [attachedFile, setAttachedFile] = useState(null);
    const [showRejectedStatusModal, setShowRejectedStatusModal] = useState(false);
    const fileInputRef = useRef(null);
    
    const [doctors, setDoctors] = useState([
        {
            id: 1,
            name: "Dr. Sumaiya Javed",
            subTitle: "Cardiologist",
            phone: "1234567890",
            experience: "5 years",
            email: "sumaiya@gmail.com",
            status: "pending",
            image: "/assets/admin.png",
            fullImage: "/assets/de.png",
            speciality: "Cardiologist",
            documents: ["Adhaar Card", "Experience letter", "Doctor license"]
        },
        {
            id: 2,
            name: "Dr. Sumaiya Javed",
            subTitle: "Cardiologist",
            phone: "1234567890",
            experience: "5 years",
            email: "sumaiya@gmail.com",
            status: "pending",
            image: "/assets/admin.png",
            fullImage: "/assets/de.png",
            speciality: "Cardiologist",
            documents: ["Adhaar Card", "Experience letter", "Doctor license"]
        },
        {
            id: 3,
            name: "Dr. Sumaiya Javed",
            subTitle: "Cardiologist",
            phone: "1234567890",
            experience: "5 years",
            email: "sumaiya@gmail.com",
            status: "pending",
            image: "/assets/admin.png",
            fullImage: "/assets/de.png",
            speciality: "Cardiologist",
            documents: ["Adhaar Card", "Experience letter", "Doctor license"]
        },
        {
            id: 4,
            name: "Dr. Sumaiya Javed",
            subTitle: "Cardiologist",
            phone: "1234567890",
            experience: "5 years",
            email: "sumaiya@gmail.com",
            status: "pending",
            image: "/assets/admin.png",
            fullImage: "/assets/de.png",
            speciality: "Cardiologist",
            documents: ["Adhaar Card", "Experience letter", "Doctor license"]
        },
        {
            id: 5,
            name: "Dr. Sumaiya Javed",
            subTitle: "Cardiologist",
            phone: "1234567890",
            experience: "5 years",
            email: "sumaiya@gmail.com",
            status: "pending",
            image: "/assets/active.png",
            fullImage: "/assets/active.png",
            speciality: "Cardiologist",
            documents: ["Adhaar Card", "Experience letter", "Doctor license"]
        },
    ]);

    // Logic to restore doctor status
    const handleRestoreDoctor = (doctorId) => {
        setDoctors(prev => prev.map(doc => 
            doc.id === doctorId ? { ...doc, status: "pending" } : doc
        ));
        setShowRejectedStatusModal(false);
        setSelectedDoctorForReject(null);
    };

    // Logic to confirm rejection and update status
    const handleRejectSubmit = () => {
        if (selectedDoctorForReject) {
            setDoctors(prev => prev.map(doc => 
                doc.id === selectedDoctorForReject.id ? { ...doc, status: "rejected" } : doc
            ));
        }
        setShowReasonModal(false);
        setShowRejectedStatusModal(true);
    };

    const upcomingDays = [
        { name: "Wed", date: "2nd" },
        { name: "Thu", date: "3rd" },
        { name: "Friday", date: "August 4th 2023", isFull: true },
        { name: "Sat", date: "5th" },
        { name: "Sun", date: "6th" }
    ];

    const handlePrevMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    const handleNextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };

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
    const menu = [
        { name: "Dashboard", icon: "/das.png" },
        { name: "Doctor", icon: "/doc.png" },
        { name: "Appointment", icon: "/app.png" },
    ];

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    return (
        <div className="flex h-screen bg-[#F7F9FB] overflow-hidden">

            {/* ================= SIDEBAR ================= */}
            <AdminSidebar
                active={active}
                setActive={setActive}
                isMobileOpen={isMobileSidebarOpen}
                setIsMobileOpen={setIsMobileSidebarOpen}
            />

            {/* ================= MAIN ================= */}
            <main className="flex-1 h-full overflow-y-auto pt-3 pr-2 pl-4 max-w-full">

                {/* TOP BAR */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
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

                            {/* Image */}
                            <img src="/assets/m.png" className="w-10 relative z-10" />

                            {/* Shine overlay */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/60 via-transparent to-white/40 pointer-events-none z-20"></div>

                            {/* Border glow */}
                            <div className="absolute inset-0 rounded-xl border border-white/40 pointer-events-none z-20"></div>

                        </div>
                        <div className="flex items-center w-full bg-white border-[0.3px] border-black/50 
                                rounded-full px-4 md:px-10 py-2 md:py-3 shadow-[0_2px_6px_rgba(0,0,0,0.12)]">

                            <img
                                src="/assets/sea.png"
                                className="w-5 h-5 md:w-6 md:h-6 mr-2 opacity-70"
                            />

                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-transparent outline-none text-[16px] text-black placeholder-black opacity-80"
                            />

                        </div>
                    </div>

                    <div className="flex items-center justify-between w-full md:w-auto gap-4">
                        <div className="flex items-center gap-3">

                            {/* Settings */}


                            <img
                                src="/assets/sett.png"
                                className="w-18 h-14 opacity-80"
                            />



                            {/* Image / Notification */}
                            <div className="w-14 h-10 bg-white 
                             border-black/50 
                              rounded-full  shadow-[0_10px_20px_rgba(10,0,0,0.2)]
                                    rounded-md 
                                    flex items-center justify-center 
                                     cursor-pointer hover:bg-gray-50 transition">

                                <img
                                    src="/assets/im.png"
                                    className="w-10 h-8 opacity-80"
                                />

                            </div>

                        </div>

                        <div className="relative" ref={menuRef}>

                            {/* Profile Button */}
                            <div
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-4 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-xl px-4 py-1 cursor-pointer hover:bg-gray-50 transition-all"
                            >
                                <span className="text-[18px] font-semibold text-gray-700">Dasy William</span>
                                <img src="/assets/ph.png" className="w-11 h-11 rounded-full  border-black/50 
                                 rounded-full  shadow-[0_2px_6px_rgba(0,0,0,0.12)] object-cover" />
                            </div>

                            <AnimatePresence>
                                {open && !openProfile && (
                                    <DasyWilliam setOpenProfile={setOpenProfile} />
                                )}
                            </AnimatePresence>

                        </div>

                    </div>
                </div>

                {/* ================= TOP GRID ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mt-10">

                    {/* LEFT STATS SECTION */}
                    <div className="col-span-1 lg:col-span-6 lg:h-[400px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-full auto-rows-fr">

                            {/* CARD 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-[#F5EFD6] shadow-[0_2px_6px_rgba(0,0,0,0.12)] border-[0.3px] border-black/50 rounded-[20px] p-3 h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                            >
                                <div>
                                    <div className="flex items-center gap-2 mt-[-10px]">
                                        <div className="bg-white w-15 h-15 rounded-full flex items-center justify-center shadow-sm">
                                            <img src="/assets/ap.png" className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-[18px] font-semibold text-gray-700">Appointments</h3>
                                    </div>

                                    <h2 className="text-[48px] font-normal text-black leading-none mt-3">300</h2>
                                </div>

                                <div className="flex justify-between items-center mt-8">
                                    <span className="text-[14px] text-gray-600 font-medium">Last 7 days</span>
                                    <span className="text-[14px] bg-[#FFDAD6] text-red-500 px-3 py-[2px] rounded-full font-bold flex items-center gap-1">
                                        16% <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M23 18l-9-9-4 4-7-7" /></svg>
                                    </span>
                                </div>
                            </motion.div>

                            {/* CARD 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-[#EFD4E6] shadow-[0_2px_6px_rgba(0,0,0,0.12)] border-[0.3px] border-black/50 rounded-[20px] p-3 h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                            >
                                <div>
                                    <div className="flex items-center gap-2 mt-[-10px]">
                                        <div className="bg-white w-15 h-15 rounded-full flex items-center justify-center shadow-sm">
                                            <img src="/assets/pers.png" className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-[18px] font-semibold text-black-700">Patients</h3>
                                    </div>

                                    <h2 className="text-[48px] font-normal text-black leading-none mt-3">1863</h2>
                                </div>

                                <div className="flex justify-between items-center mt-8">
                                    <span className="text-[14px] text-gray-600 font-medium">Last 7 days</span>
                                    <span className="text-[14px] bg-[#FFDAD6] text-red-500 px-3 py-[2px] rounded-full font-bold flex items-center gap-1">
                                        16% <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M23 18l-9-9-4 4-7-7" /></svg>
                                    </span>
                                </div>
                            </motion.div>

                            {/* CARD 3 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-[#D6EEF2] shadow-[0_2px_6px_rgba(0,0,0,0.12)] border-[0.3px] border-black/50 rounded-[20px] p-3 h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                            >
                                <div>
                                    <div className="flex items-center gap-2 mt-[-10px]">
                                        <div className="bg-white w-15 h-15 rounded-full flex items-center justify-center shadow-sm">
                                            <img src="/assets/arr.png" className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-[18px] font-semibold text-gray-700">Income</h3>
                                    </div>

                                    <h2 className="text-[48px] font-normal text-black leading-none mt-3">$142k</h2>
                                </div>

                                <div className="flex justify-between items-center mt-8">
                                    <span className="text-[14px] text-gray-600 font-medium">Last 7 days</span>
                                    <span className="text-[14px] bg-[#D1FAE5] text-green-600 px-3 py-[2px] rounded-full font-bold flex items-center gap-1">
                                        50% <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M23 6l-9 9-4-4-7 7" /></svg>
                                    </span>
                                </div>
                            </motion.div>

                            {/* CARD 4 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-[#D6EEF2] shadow-[0_2px_6px_rgba(0,0,0,0.12)] border-[0.3px] border-black/50 rounded-[20px] p-3 h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                            >
                                <h3 className="text-[18px] font-semibold text-gray-700 mt-[-10px]">Total Doctors</h3>

                                <div className="flex items-center  flex-1 mt-1 px-0">
                                    <img src="/assets/do.png" className="h-[150px] object-contain -mb-2.5 -ml-6" />
                                    <h2 className="text-[48px] font-normal text-black leading-none mr-18">100</h2>
                                </div>
                            </motion.div>

                            {/* CARD 5 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)] border-[0.3px] border-black/50 rounded-[20px] p-3 h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                            >

                                <h3 className="text-[18px] font-semibold text-gray-700 mt-[-10px]">Active Doctors</h3>

                                <div className="flex items-center justify-between flex-1 mt-1 px-0">
                                    <img src="/assets/active.png" className="h-[130px] object-contain -ml-4" />
                                    <h2 className="text-[48px] font-normal text-black leading-none ">50</h2>
                                </div>
                            </motion.div>

                            {/* CARD 6 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)] border-[0.3px] border-black/50 rounded-[20px] p-3 h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                            >
                                <h3 className="text-[18px] font-semibold text-gray-700 mt-[-10px]">Add Doctors</h3>

                                <div className="flex justify-center items-center flex-1">
                                    <img src="/assets/add.png" className="h-[130px] object-contain" />
                                </div>
                            </motion.div>

                        </div>
                    </div>

                    {/* CALENDAR */}
                    <div className="col-span-1 lg:col-span-4 bg-white border border-black rounded-[20px] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col min-h-[400px]">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <button onClick={handlePrevMonth} className="text-[#399CAA] hover:text-[#104e5f] transition-colors p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-[18px] h-[18px]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>

                            <div className="flex gap-4">
                                <div className="relative">
                                    <select value={month} onChange={(e) => setMonth(+e.target.value)}
                                        className="appearance-none border border-gray-400 text-gray-500 rounded-full pl-6 pr-12 py-1 text-[16px] outline-none focus:border-gray-300 bg-transparent cursor-pointer hover:bg-gray-50 transition-colors">
                                        {months.map((m, i) => (
                                            <option key={i} value={i}>{m}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                                        <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>

                                <div className="relative">
                                    <select value={year} onChange={(e) => setYear(+e.target.value)}
                                        className="appearance-none border border-gray-500 text-gray-500 rounded-full pl-6 pr-12 py-1 text-[16px] outline-none focus:border-gray-500 bg-transparent cursor-pointer hover:bg-gray-50 transition-colors">
                                        {[2024, 2025, 2026, 2027].map(y => (
                                            <option key={y} value={y}>{y}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                                        <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            <button onClick={handleNextMonth} className="text-[#3992A5] hover:text-[#104e5f] transition-colors p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-[18px] h-[18px]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-y-4 text-center mt- flex-1">
                            {["S", "M", "T", "W", "Th", "F", "Sat"].map(d => (
                                <span key={d} className="text-[#399CAA] font-normal text-[16px] mb-1">{d}</span>
                            ))}
                            {(() => {
                                const daysInPrevMonth = new Date(year, month, 0).getDate();
                                const prevDays = [...Array(firstDay)].map((_, i) => (
                                    <span key={`prev-${i}`} className="flex items-center justify-center text-gray-400 text-[16px]">
                                        {daysInPrevMonth - firstDay + i + 1}
                                    </span>
                                ));
                                const currentDays = [...Array(daysInMonth)].map((_, i) => {
                                    const date = i + 1;
                                    const isSelected = date === selectedDate;
                                    return (
                                        <div key={`curr-${i}`} className="flex justify-center items-center">
                                            <span
                                                onClick={() => setSelectedDate(date)}
                                                className={`flex items-center justify-center text-black w-[36px] h-[36px] rounded-full cursor-pointer text-[16px] transition-all
                                                    ${isSelected ? 'bg-[#70A5AF] text-black font-bold shadow-md' : 'text-gray-500 hover:bg-gray-300'}
                                                `}>
                                                {date}
                                            </span>
                                        </div>
                                    );
                                });
                                return [...prevDays, ...currentDays];
                            })()}
                        </div>
                    </div>
                </div>

                {/* ================= LAST SECTION ================= */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* LEFT COLUMN: HELLO + BALANCE (65%) */}
                    <div className="col-span-1 lg:col-span-7 space-y-6">

                        {/* GREETING CARD */}
                        <div className="relative bg-gradient-to-br from-[#19718A] to-[#278AA3] rounded-[24px] p-8 w-full h-[260px] flex flex-col justify-end text-white overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)]">

                            {/* DATE PILL */}
                            <div className="absolute top-6 left-6 bg-white/95 text-gray-700
                    text-[14px] font-bold px-4 py-2 rounded-full flex items-center gap-3 shadow-sm z-20">
                                17-01-2026
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-[20px] w-[20px] text-[#19718A]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>

                            {/* TEXT CONTENT */}
                            <div className="z-10 relative mt-10 h-full flex flex-col justify-end">
                                <h1 className="text-[30px] font-bold leading-tight tracking-tight">
                                    Hello MR. Admin
                                </h1>

                                <p className="text-[16px] mt-2 font-medium opacity-90 tracking-wide">
                                    Have a nice Monday
                                </p>
                            </div>

                            {/* DOCTOR IMAGE OVERLAY */}
                            <div className="absolute -right-[50px] bottom-0 top-8 w-3/4 pointer-events-none z-0">
                                <img
                                    src={admin1}
                                    className="absolute bottom-[-10px] right-[5%] h-[118%] max-w-none object-contain object-bottom"
                                    alt="Admin Illustration"
                                />
                            </div>
                        </div>

                        {/* BALANCE SECTION */}
                        <div className="w-full overflow-hidden">
                            <h3 className="text-[24px] font-bold text-gray-800 mb-2 px-1">Balance</h3>
                            <div className="bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)] border-[0.3px] border-black/50 rounded-[4px] p-2 min-h-[200px] relative overflow-hidden">
                                <div className="flex justify-between items-start h-full">

                                    {/* Left Text */}
                                    <div className="flex flex-col justify-between h-full relative z-10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center shadow-sm ">
                                                <span className="text-[20px] font-bold text-teal-600">$</span>
                                            </div>
                                            <h2 className="text-[20px] font-bold text-gray-500">Income</h2>
                                        </div>
                                        <h2 className="text-[40px] md:text-[60px] font-semibold text-gray-900 leading-none mt-16 ml-4">
                                            $95,000
                                        </h2>
                                    </div>

                                    {/* Right Chart Area */}
                                    <div className="absolute -bottom-1 right-0 lg:left-[282px] w-full md:w-[69%] h-[60%] md:h-[95%] pointer-events-none z-0 opacity-40 md:opacity-100">
                                        <img
                                            src="/assets/graph.png"
                                            alt="Balance Graph"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: UPCOMING APPOINTMENT (35%) */}
                    <div className="col-span-12 lg:col-span-5">
                        <div className="bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)] border-[0.3px] border-black/50 rounded-[18px] p-4 flex flex-col h-full min-h-[420px]">

                            {/* HEADER */}
                            <div className="flex justify-between items-center">
                                <h3 className="text-[18px] font-bold text-gray-800">
                                    Upcoming Appointment
                                </h3>

                                <div className="flex gap-1.5">
                                    <button className="w-8 h-8 border border-black/10 rounded-md flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M5 3h4v4H5zM11 3h4v4h-4zM5 9h4v4H5zM11 9h4v4h-4z" />
                                        </svg>
                                    </button>

                                    <button className="w-8 h-8 border border-[#19718A] rounded-md flex items-center justify-center bg-[#F0F7F9] text-[#19718A]">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M3 5h14v2H3zm0 4h14v2H3zm0 4h14v2H3z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* THIN DIVIDER (tight spacing) */}
                            <div className="h-[1px] bg-black/10 mt-2 mb-3"></div>

                            {/* WEEK NAV (compact) */}
                            <div className="flex items-center justify-between mb-3 text-center">

                                <button
                                    onClick={() => setActiveDayIndex(prev => Math.max(0, prev - 1))}
                                    className={`transition-colors ${activeDayIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-black hover:text-[#19718A]'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <div className="flex-1 flex justify-around items-center text-[14px]">
                                    {upcomingDays.map((day, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setActiveDayIndex(index)}
                                            className={`cursor-pointer transition-all duration-300 ${index === activeDayIndex
                                                ? 'px-3 py-1.5 rounded-md bg-[#7DB1BC] shadow-sm'
                                                : 'opacity-60 hover:opacity-100'}`}
                                        >
                                            <p className={`font-semibold ${index === activeDayIndex ? 'text-black text-[12px]' : ''}`}>
                                                {day.name}
                                            </p>
                                            <p className={`${index === activeDayIndex ? 'text-[12px] text-black' : ''}`}>
                                                {day.date}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setActiveDayIndex(prev => Math.min(upcomingDays.length - 1, prev + 1))}
                                    className={`transition-colors ${activeDayIndex === upcomingDays.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-black hover:text-[#19718A]'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                            </div>

                            {/* APPOINTMENTS */}
                            <div className="space-y-3 mt-6">

                                {[1, 2, 3, 4].map(i => (
                                    <div key={i}
                                        className="flex items-center justify-between 
        px-3 py-2
        rounded-[5px]
        bordershadow-[0_2px_6px_rgba(0,0,0,0.12)] border-[0.3px] border-black/20 
        relative overflow-hidden
        h-[64px]">

                                        {/* RIGHT DARK GRADIENT */}
                                        <div className="absolute inset-0 
          bg-gradient-to-r 
          from-transparent 
          via-[#19718A]/20 
          to-[#19718A]/50"></div>

                                        <div className="flex items-center gap-2 relative z-10">

                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#399CAA]">
                                                <img src="/assets/admin.png"
                                                    className="w-full h-full object-cover" />
                                            </div>

                                            <div>
                                                <h4 className="text-[14px] font-semibold text-gray-700 leading-none">
                                                    Shawn Hampton
                                                </h4>

                                                <p className="text-[12px] font-bold text-black">
                                                    Emergency Appointment
                                                </p>

                                                <div className="flex items-center gap-1 
              bg-[#19718A] text-white 
              px-2 py-[2px] rounded-md w-fit mt-1">

                                                    <span className="text-[10px] font-bold">
                                                        10:00AM
                                                    </span>
                                                </div>

                                            </div>
                                        </div>

                                        {/* CALL */}
                                        <button className="w-8 h-8 bg-white rounded-full 
          flex items-center justify-center 
          shadow-sm relative z-10">

                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-[#19718A]"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path strokeWidth={2}
                                                    d="M3 5a2 2 0 012-2h3l2 5-2 1a11 11 0 005 5l1-2 5 2v3a2 2 0 01-2 2h-1C9 21 3 15 3 7V5z" />
                                            </svg>

                                        </button>

                                    </div>
                                ))}

                            </div>

                            {/* VIEW MORE */}
                            <div className="text-right mt-4">
                                <button className="text-[14px] font-semibold text-[#19718A]">
                                    View More
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* ================= APPROVAL SECTION ================= */}
                    <div className="col-span-12 -mt-3">
                        <h3 className="text-[20px] font-bold text-gray-800 mb-3 px-1">
                            Approval Section
                        </h3>

                        <div className="bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)] border-[0.3px] border-black/50 rounded-[20px] p-4 overflow-x-auto">
                            {!showFullApproval ? (
                                <div className="min-w-[800px]">
                                    {/* HEADER */}
                                    <div className="grid grid-cols-[2.2fr_1.3fr_1fr_1fr_0.9fr] text-[14px] font-bold text-gray-500 px-4 py-2 mb-2">
                                        <div>Doctor Name</div>
                                        <div>Phone Number</div>
                                        <div className="text-center">Experience</div>
                                        <div className="text-center">Action</div>
                                        <div className="text-center">Status</div>
                                    </div>

                                    <div className="space-y-2">
                                <div className="space-y-3">
                                    <AnimatePresence>
                                        {doctors.map((doctor) => (
                                            <motion.div
                                                key={doctor.id}
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="grid grid-cols-[2.2fr_1.3fr_1fr_1fr_0.9fr] items-center px-4 py-3 border border-gray-200 rounded-[14px] hover:bg-gray-50 transition-all"
                                            >
                                                {/* DOCTOR */}
                                                <div className="flex items-center gap-3">
                                                    <div className="w-11 h-11 rounded-full overflow-hidden border">
                                                        <img
                                                            src={doctor.image}
                                                            className="w-full h-full object-cover"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-[16px] text-gray-800 leading-tight">
                                                            {doctor.name}
                                                        </p>
                                                        <p className="text-[12px] text-gray-500">
                                                            {doctor.speciality}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* PHONE */}
                                                <div className="text-[14px] font-semibold text-gray-700">
                                                    {doctor.phone}
                                                </div>

                                                {/* EXPERIENCE */}
                                                <div className="text-[14px] font-semibold text-gray-700 text-center">
                                                    {doctor.experience}
                                                </div>

                                                {/* ACTION */}
                                                <div className="flex justify-center">
                                                    {doctor.status === "active" ? (
                                                        <span className="px-4 py-1 text-xs font-semibold rounded-full bg-[#22C55E] text-white">
                                                            Active
                                                        </span>
                                                    ) : doctor.status === "rejected" ? (
                                                        <span className="px-4 py-1 text-xs font-semibold rounded-full bg-[#EF4444] text-white">
                                                            Rejected
                                                        </span>
                                                    ) : (
                                                        <span className="px-4 py-1 text-xs font-semibold rounded-full bg-[#3B82F6] text-white">
                                                            Pending
                                                        </span>
                                                    )}
                                                </div>

                                                {/* STATUS */}
                                                <div className="flex justify-center gap-2">
                                                    <button className="w-[38px] h-[38px] bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition">
                                                        <svg className="w-[22px] h-[22px] text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="20 6 9 17 4 12" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedDoctorForReject(doctor);
                                                            setShowRejectConfirm(true);
                                                        }}
                                                        className="w-[38px] h-[38px] bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition">
                                                        <svg className="w-[20px] h-[20px] text-[#EF4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="3 6 5 6 21 6" />
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                            <line x1="9" y1="11" x2="9" y2="17" />
                                                            <line x1="12" y1="11" x2="12" y2="17" />
                                                            <line x1="15" y1="11" x2="15" y2="17" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                                    </div>
                                    {/* VIEW MORE */}
                                    <div className="text-right mt-4">
                                        <button onClick={() => setShowFullApproval(true)} className="text-[16px] font-semibold text-[#8FA5C2] hover:text-[#19718A]">
                                            View More
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="min-w-[800px]">
                                    {/* HEADERS FOR FULL VIEW */}
                                    <div className="grid grid-cols-[0.5fr_2.2fr_1.3fr_1.2fr_1.1fr_1fr] text-[14px] font-bold text-gray-500 px-6 py-2 mb-2">
                                        <div></div>
                                        <div>Doctor Name</div>
                                        <div>Phone Number</div>
                                        <div>Experience</div>
                                        <div className="text-center">Status</div>
                                        <div className="text-center">Action</div>
                                    </div>

                                    {/* LIST ITEMS */}
                                    <div className="space-y-4">
                                        {doctors_list.map((doctor) => (
                                            <div key={doctor.id} className={`bg-white rounded-lg border-[0.5px] border-[#A8BDC7] transition-all duration-300 ${expandedApprovalId === doctor.id ? 'shadow-md ring-1 ring-[#19718A]/10' : 'shadow-sm'}`}>

                                                {/* MAIN ROW */}
                                                <div className="grid grid-cols-[0.5fr_2.2fr_1.3fr_1.2fr_1.1fr_1fr] items-center px-4 py-3 cursor-pointer hover:bg-gray-50/30"
                                                    onClick={() => setExpandedApprovalId(expandedApprovalId === doctor.id ? null : doctor.id)}>

                                                    {/* Toggle Icon */}
                                                    <div className="text-gray-400">
                                                        {expandedApprovalId === doctor.id ? (
                                                            <svg className="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" /></svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                                                        )}
                                                    </div>

                                                    {/* Doctor Info */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-11 h-11 rounded-full overflow-hidden border border-gray-100 bg-gray-50">
                                                            <img src={doctor.image} className="w-full h-full object-cover" alt="" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-[15px] text-gray-800 leading-tight">{doctor.name}</p>
                                                            <p className="text-[12px] text-gray-500 font-medium">{doctor.subTitle}</p>
                                                        </div>
                                                    </div>

                                                    {/* Phone */}
                                                    <div className="text-[14px] font-semibold text-gray-600">{doctor.phone}</div>

                                                    {/* Experience */}
                                                    <div className="text-[14px] font-semibold text-gray-600">{doctor.experience}</div>

                                                    {/* Status */}
                                                    <div className="flex justify-center">
                                                        <span className="px-5 py-1 text-[12px] font-bold rounded-full bg-[#709BFF] text-white shadow-sm">
                                                            {doctor.status}
                                                        </span>
                                                    </div>

                                                    {/* Action */}
                                                    <div className="flex justify-center gap-3">
                                                        <button className="w-[38px] h-[38px] bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition">
                                                            <svg className="w-[22px] h-[22px] text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="20 6 9 17 4 12" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedDoctorForReject(doctor);
                                                                setShowRejectConfirm(true);
                                                            }}
                                                            className="w-[38px] h-[38px] bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition">
                                                            <svg className="w-[20px] h-[20px] text-[#EF4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="3 6 5 6 21 6" />
                                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                                <line x1="9" y1="11" x2="9" y2="17" />
                                                                <line x1="12" y1="11" x2="12" y2="17" />
                                                                <line x1="15" y1="11" x2="15" y2="17" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* EXPANDED PANEL */}
                                                <AnimatePresence>
                                                    {expandedApprovalId === doctor.id && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="px-16 py-8 bg-white border-t border-gray-100">
                                                                <div className="flex justify-between items-start gap-12">
                                                                    {/* Detailed Info */}
                                                                    <div className="flex-1 space-y-3">
                                                                        {[
                                                                            { label: "Name", value: doctor.name },
                                                                            { label: "Speciality", value: doctor.speciality },
                                                                            { label: "Experience", value: doctor.experience },
                                                                            { label: "Phone Number", value: doctor.phone },
                                                                            { label: "Email", value: doctor.email },
                                                                        ].map((info, idx) => (
                                                                            <div key={idx} className="flex text-[16px] items-center">
                                                                                <div className="w-32 font-bold text-gray-700">{info.label}</div>
                                                                                <div className="w-10 text-gray-400 font-bold">:</div>
                                                                                <div className="flex-1 text-gray-800 font-semibold">{info.value}</div>
                                                                            </div>
                                                                        ))}

                                                                        {/* Documents Info */}
                                                                        <div className="flex text-[16px] mt-2">
                                                                            <div className="w-32 font-bold text-gray-700">Documents</div>
                                                                            <div className="w-10 text-gray-400 font-bold">:</div>
                                                                            <div className="flex-1 space-y-1">
                                                                                {doctor.documents.map((doc, dIdx) => (
                                                                                    <p key={dIdx} className="text-gray-400 font-bold leading-tight">{doc}</p>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/* Large Photo */}
                                                                    <div className="relative mr-12">
                                                                        <div className="w-52 h-44 rounded-xl overflow-hidden shadow-lg border border-gray-100">
                                                                            <img src={doctor.fullImage} className="w-full h-full object-cover" alt="" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}
                                    </div>

                                    {/* VIEW LESS */}
                                    <div className="text-right mt-4">
                                        <button onClick={() => setShowFullApproval(false)} className="text-[14px] font-bold text-gray-400 hover:text-[#19718A] transition-colors">
                                            View Less
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ================= PATIENTS ANALYTICS ================= */}
                    <div className="col-span-12 mt-6">

                        <h3 className=" font-bold text-[20px] mb-4 text-gray-900 tracking-tight">
                            Patients Analytics
                        </h3>

                        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">

                            {/* LEFT BIG GRAPH */}
                            <div className="col-span-1 lg:col-span-7 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)] border-[0.3px] border-black/50 rounded-xl p-4 md:p-6 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <p className="text-[18px]  font-bold text-gray-700 tracking-tight">
                                        Patients by Gender
                                    </p>
                                    <div className="flex items-center gap-8">
                                        <div className="flex items-center gap-4 text-[14px] font-medium text-gray-600">
                                            <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-full bg-[#2A8496]"></span>Male</div>
                                            <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-full bg-[#0B1A42]"></span>Female</div>
                                        </div>
                                        <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 text-[14px] text-gray-600 font-medium bg-[#F9FAFB] hover:bg-gray-100 shadow-sm">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            weekly
                                            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </button>
                                    </div>
                                </div>

                                <ResponsiveContainer width="100%" height={320}>
                                    <AreaChart data={monthlyData} margin={{ top: 40, right: 0, left: 10, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorMale" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#2A8496" stopOpacity={0.6} />
                                                <stop offset="95%" stopColor="#2A8496" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorFemale" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0B1A42" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#0B1A42" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="month" axisLine={{ stroke: '#9CA3AF' }} tickLine={false} tick={{ fontSize: 13, fill: '#6B7280', fontWeight: 500 }} dy={10} />
                                        <YAxis axisLine={{ stroke: '#9CA3AF' }} tickLine={false} tick={false} width={40} />
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />

                                        <ReferenceLine x="Apr" stroke="#4B5563" strokeDasharray="4 4"
                                            label={{
                                                position: 'top',
                                                value: '60.02%',
                                                fill: '#374151',
                                                fontSize: 22,
                                                fontWeight: '700',
                                                offset: 15
                                            }}
                                        />

                                        <Area
                                            type="monotone"
                                            dataKey="male"
                                            stroke="#2A8496"
                                            strokeWidth={2.5}
                                            fill="url(#colorMale)"
                                            animationDuration={2000}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="female"
                                            stroke="#0B1A42"
                                            strokeWidth={2}
                                            fill="url(#colorFemale)"
                                            animationDuration={2500}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* RIGHT SIDE CARDS */}
                            <div className="col-span-1 lg:col-span-3 flex flex-col gap-6">

                                {/* MALE */}
                                <div className="bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)] border-[0.3px] border-black/50 rounded-xl pt-5 shadow-sm overflow-hidden flex flex-col h-[200px] relative">
                                    <div className="flex justify-between items-start px-5 pb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="w-3.5 h-3.5 rounded-full bg-[#2A8496]"></span>
                                            <h3 className="font-bold text-gray-800 text-[18px]">Male</h3>
                                        </div>
                                    </div>

                                    <div className="absolute top-[32px] left-[52%] flex items-end z-10">
                                        <div className="border-l-[1.5px] border-t-[1.5px] border-gray-400 h-[24px] w-[35px] rounded-tl-sm"></div>
                                        <span className="font-bold text-gray-800 text-[20px] ml-1 -translate-y-[15px] bg-white/80 px-1 leading-none tracking-tight">40.05%</span>
                                    </div>

                                    <div className="flex-1 mt-2">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="miniMale" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="#2A8496" stopOpacity={0.6} />
                                                        <stop offset="100%" stopColor="#2A8496" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid horizontal={false} vertical={true} stroke="#EFEEF1" />
                                                <XAxis dataKey="day" axisLine={{ stroke: '#9CA3AF' }} tickLine={false} tick={{ fontSize: 11, fill: '#4B5563', fontWeight: 500 }} dy={5} />
                                                <Area type="monotone" dataKey="value" stroke="#2A8496" strokeWidth={2} fill="url(#miniMale)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* FEMALE */}
                                <div className="bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)] border-[0.3px] border-black/50 rounded-xl pt-5 shadow-sm overflow-hidden flex flex-col h-[200px] relative">
                                    <div className="flex justify-between items-start px-5 pb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="w-3.5 h-3.5 rounded-full bg-[#0B1A42]"></span>
                                            <h3 className="font-bold text-gray-800 text-[18px] ">Female</h3>
                                        </div>
                                    </div>

                                    <div className="absolute top-[32px] left-[52%] flex items-end z-10">
                                        <div className="border-l-[1.5px] border-t-[1.5px] border-gray-400 h-[24px] w-[35px] rounded-tl-sm"></div>
                                        <span className="font-bold text-gray-800 text-[20px] ml-1 -translate-y-[15px] bg-white/80 px-1 leading-none tracking-tight">58.08%</span>
                                    </div>

                                    <div className="flex-1 mt-2">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="miniFemale" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="#0B1A42" stopOpacity={0.6} />
                                                        <stop offset="100%" stopColor="#0B1A42" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid horizontal={false} vertical={true} stroke="#EFEEF1" />
                                                <XAxis dataKey="day" axisLine={{ stroke: '#9CA3AF' }} tickLine={false} tick={{ fontSize: 11, fill: '#4B5563', fontWeight: 500 }} dy={5} />
                                                <Area type="monotone" dataKey="value" stroke="#0B1A42" strokeWidth={2} fill="url(#miniFemale)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* ================= RECENT ACTIVITY ================= */}
                    <div className="col-span-12 mt-5">
                        <h3 className="text-[20px] font-bold text-gray-800 mb-3 px-1">
                            Recent Activity
                        </h3>

                        <div className="bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)] border-[0.3px] border-black/50 shadow-md rounded-[20px] p-4 overflow-x-auto">
                            <div className="min-w-[800px]">
                                {/* HEADER */}
                                <div className="grid grid-cols-[1.2fr_1.4fr_1.6fr_1fr_0.7fr] text-[14px] font-bold text-gray-500 px-4 py-2 mb-2">
                                    <div>Dates</div>
                                    <div>Patients Name</div>
                                    <div>Doctors Name</div>
                                    <div className="text-center">Status</div>
                                    <div className="text-center">Action</div>
                                </div>

                                <div className="space-y-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="grid grid-cols-[1.2fr_1.4fr_1.6fr_1fr_0.7fr] items-center px-4 py-3 border border-gray-200 rounded-[14px] hover:bg-gray-50 transition-all"
                                        >
                                            {/* DATE */}
                                            <div className="text-[15px] font-semibold text-gray-800">
                                                28-01-2026
                                            </div>

                                            {/* PATIENT */}
                                            <div className="text-[15px] font-semibold text-gray-800">
                                                Arti yadav
                                            </div>

                                            {/* DOCTOR */}
                                            <div className="text-[15px] font-semibold text-gray-800">
                                                Dr. Sumaiya Javed
                                            </div>

                                            {/* STATUS */}
                                            <div className="flex justify-center">
                                                <span className="px-4 py-1 text-xs font-semibold rounded-full bg-[#22C55E] text-white">
                                                    Completed
                                                </span>
                                            </div>

                                            {/* ACTION */}
                                            <div className="flex justify-center">
                                                <button className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:scale-105 transition">
                                                    <svg className="w-5 h-5 text-[#19718A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                {/* VIEW MORE */}
                                <div className="text-right mt-4">
                                    <button className="text-[14px] font-semibold text-[#8FA5C2] hover:text-[#19718A]">
                                        View More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                {/* Confirm Reject Modal */}
                <AnimatePresence>
                    {showRejectConfirm && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-[20px] p-8 max-w-[600px] w-full mx-4 shadow-2xl relative"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-16 h-16 bg-[#FEF3C7] rounded-xl flex items-center justify-center shrink-0">
                                        <svg className="w-10 h-10 text-[#D97706]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-[24px] font-bold text-gray-900 leading-tight">
                                            Are you sure you want to reject {selectedDoctorForReject?.name} ?
                                        </h2>
                                        <p className="text-[16px] text-gray-500 font-medium mt-1">
                                            This action connect be undone.
                                        </p>
                                    </div>
                                </div>

                                <div className="h-[1px] bg-gray-100 w-full my-8"></div>

                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={() => setShowRejectConfirm(false)}
                                        className="px-10 py-3 rounded-xl bg-[#E5E7EB] text-gray-700 font-bold text-[18px] hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowRejectConfirm(false);
                                            setShowReasonModal(true);
                                        }}
                                        className="px-8 py-3 rounded-xl bg-[#EF4444] text-white font-bold text-[18px] hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
                                    >
                                        Confirm Reject
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Reason for Removal Modal */}
                <AnimatePresence>
                    {showReasonModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="bg-white rounded-[20px] max-w-[650px] w-full mx-4 shadow-2xl overflow-hidden"
                            >
                                {/* Header */}
                                <div className="flex justify-between items-center px-8 py-4 border-b border-gray-100">
                                    <h2 className="text-[22px] font-bold text-gray-800">Reason for Removal</h2>
                                    <button onClick={() => setShowReasonModal(false)} className="text-gray-400 hover:text-gray-600">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="p-8 space-y-6">
                                    <p className="text-[17px] text-gray-700 font-bold">
                                        Please select the reason for rejection <span className="font-bold">{selectedDoctorForReject?.name}</span> and provide any additional feedback:
                                    </p>

                                    {/* Reason Select */}
                                    <div className="space-y-2">
                                        <label className="text-[18px] font-bold text-gray-700 block">Reason<span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <select
                                                value={rejectionReason}
                                                onChange={(e) => setRejectionReason(e.target.value)}
                                                className="w-full appearance-none bg-white border border-gray-300 rounded-[12px] px-5 py-4 text-[17px] focus:ring-2 focus:ring-[#19718A]/20 focus:border-[#19718A] outline-none text-gray-600 font-medium"
                                            >
                                                <option>Document Not Correct</option>
                                                <option>Document Not Complete</option>
                                                <option>Fake / Invalid Certificate</option>
                                                <option>Misconduct</option>
                                                <option>Expired License</option>
                                                <option>Blurry / Unclear Documents</option>
                                                <option>Invalid Experience Details</option>
                                                <option>Contact Details Not Verified</option>
                                                <option>Other (Please specify)</option>
                                            </select>
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Feedback */}
                                    <div className="space-y-2">
                                        <label className="text-[18px] font-bold text-gray-700 block">Additional Feedback</label>
                                        <textarea
                                            value={rejectionFeedback}
                                            onChange={(e) => setRejectionFeedback(e.target.value)}
                                            placeholder="Write your feedback..."
                                            className="w-full border border-gray-300 rounded-[12px] px-5 py-4 text-[17px] h-32 focus:ring-2 focus:ring-[#19718A]/20 focus:border-[#19718A] outline-none resize-none text-gray-600 font-medium"
                                        />
                                    </div>

                                    {/* Attach File */}
                                    <div className="flex flex-col gap-3">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    setAttachedFile({
                                                        name: file.name,
                                                        url: URL.createObjectURL(file)
                                                    });
                                                }
                                            }}
                                        />
                                        <div
                                            onClick={() => fileInputRef.current.click()}
                                            className="flex items-center gap-2 text-[#19718A] font-bold cursor-pointer hover:bg-gray-50/50 p-2 rounded-lg transition-colors border border-dashed border-gray-300 w-full group"
                                        >
                                            <div className="w-[20px] h-[20px] flex items-center justify-center">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" transform="rotate(-45)">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                </svg>
                                            </div>
                                            <span className="text-[16px]">Attach file</span>
                                        </div>

                                        {attachedFile && (
                                            <div className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-2 w-fit gap-4 border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-1">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-8 rounded bg-white overflow-hidden shadow-sm border border-gray-100">
                                                        {attachedFile.url.startsWith('blob:') ? (
                                                            <img src={attachedFile.url} className="w-full h-full object-cover" alt="" />
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-[#19718A]/20 to-[#19718A]/40 flex items-center justify-center text-[10px] font-bold text-[#19718A]">DOC</div>
                                                        )}
                                                    </div>
                                                    <span className="text-[14px] font-bold text-gray-600 truncate max-w-[200px]">{attachedFile.name}</span>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setAttachedFile(null);
                                                        fileInputRef.current.value = "";
                                                    }}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer Buttons */}
                                    <div className="flex justify-end gap-4 pt-4">
                                        <button
                                            onClick={() => setShowReasonModal(false)}
                                            className="px-10 py-3 rounded-xl bg-[#E5E7EB] text-gray-700 font-bold text-[18px] hover:bg-gray-300 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleRejectSubmit}
                                            className="px-10 py-3 rounded-xl bg-[#EF4444] text-white font-bold text-[18px] hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
                                        >
                                            Rejected
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
                {/* Rejection Status Modal (Img 2) */}
                <AnimatePresence>
                    {showRejectedStatusModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] overflow-y-auto pt-10 pb-10">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 30 }}
                                className="bg-white rounded-[24px] max-w-[850px] w-full mx-4 shadow-2xl relative"
                            >
                                {/* Modal Close Button */}
                                <button
                                    onClick={() => setShowRejectedStatusModal(false)}
                                    className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 z-10"
                                >
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {/* HEADER AREA */}
                                <div className="px-8 py-5 border-b border-gray-100 flex items-center gap-5">
                                    <div className="w-14 h-14 bg-[#EF4444] rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-red-100">
                                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-[24px] font-bold text-gray-900 leading-tight">
                                            {selectedDoctorForReject?.name} has been Rejected
                                        </h2>
                                        <p className="text-[13px] text-gray-500 font-medium">
                                            Rejected by Admin on {new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>

                                {/* CONTENT GRID */}
                                <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">

                                    {/* Left Content */}
                                    <div className="space-y-6">

                                        {/* Reason for Rejection Section */}
                                        <div className="space-y-3">
                                            <h3 className="text-[18px] font-bold text-gray-800">Reason for Rejection</h3>

                                            <div className="bg-gray-100/80 rounded-[12px] overflow-hidden border border-gray-200">
                                                <div className="px-6 py-3 border-b border-gray-200 text-[18px] font-bold text-gray-700">
                                                    {rejectionReason}
                                                </div>
                                                <div className="p-6 text-[16px] text-gray-600 font-medium leading-relaxed">
                                                    {rejectionFeedback}
                                                </div>
                                            </div>

                                            {attachedFile && (
                                                <div className="flex items-center justify-between bg-gray-100 rounded-lg p-3 border border-gray-200">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-10 bg-white rounded border border-gray-200 overflow-hidden flex items-center justify-center">
                                                            {attachedFile.url.startsWith('blob:') ? (
                                                                <img src={attachedFile.url} className="w-full h-full object-cover" alt="" />
                                                            ) : (
                                                                <span className="text-[10px] font-bold text-[#19718A]">IMG</span>
                                                            )}
                                                        </div>
                                                        <span className="text-[14px] font-bold text-gray-600 truncate max-w-[150px]">{attachedFile.name}</span>
                                                        <button className="text-gray-400">
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div className="flex gap-4 text-[#19718A] font-bold text-[14px]">
                                                        <button className="hover:underline">View</button>
                                                        <span className="text-gray-300">|</span>
                                                        <button className="hover:underline">Download</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Other Options Section */}
                                        <div className="space-y-4">
                                            <h3 className="text-[18px] font-bold text-gray-800 border-b border-gray-300 pb-2">Other Options</h3>
                                            <div className="space-y-3 pt-2">
                                                {[
                                                    "Document Not Complete",
                                                    "Fake / Invalid Certificate",
                                                    "Expired License",
                                                    "Misconduct",
                                                    "Other (Please specify)"
                                                ].map((option, idx) => (
                                                    <div key={idx} className="flex items-center gap-3 group cursor-pointer">
                                                        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-white shrink-0 group-hover:bg-[#19718A] transition-colors">
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-[16px] font-medium text-gray-600">{option}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Sidebar - Doctor Card */}
                                    <div className="space-y-4">
                                        <div className="bg-white border border-gray-200 rounded-[20px] overflow-hidden shadow-sm">
                                            {/* Doctor Card Top */}
                                            <div className="relative p-5 bg-gray-50/50 flex flex-col items-center">
                                                <div className="w-20 h-20 rounded-[16px] overflow-hidden shadow-md border-2 border-white">
                                                    <img
                                                        src={selectedDoctorForReject?.image || "/assets/admin.png"}
                                                        className="w-full h-full object-cover"
                                                        alt=""
                                                    />
                                                </div>
                                                <h4 className="mt-3 text-[17px] font-bold text-gray-800 text-center leading-tight">
                                                    {selectedDoctorForReject?.name}
                                                </h4>
                                                <div className="mt-2 px-6 py-0.5 bg-red-600 text-white rounded-md text-[12px] font-bold">
                                                    Rejected
                                                </div>
                                            </div>

                                            {/* Doctor Contact Info */}
                                            <div className="p-5 space-y-3 text-[13px]">
                                                {[
                                                    { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: "Email", value: "sumaiya701@gmail.com" },
                                                    { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", label: "Contact", value: "+91 2134567883" },
                                                    { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", label: "Experience", value: "8 Years" },
                                                    { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", label: "Registration No", value: "DMC/1234" }
                                                ].map((item, idx) => (
                                                    <div key={idx} className="flex items-start gap-3">
                                                        <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                                        </svg>
                                                        <div>
                                                            <span className="text-gray-400 font-medium block leading-none mb-0.5 text-[11px]">{item.label}:</span>
                                                            <span className="text-gray-700 font-bold">{item.value}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Restore Button */}
                                            <div className="p-5 pt-0 space-y-3">
                                                <button
                                                    onClick={() => handleRestoreDoctor(selectedDoctorForReject?.id)}
                                                    className="w-full py-3 bg-[#FFD39F] text-gray-800 font-bold rounded-[14px] shadow-sm hover:bg-[#ffc885] transition-all text-[15px]"
                                                >
                                                    Restore Doctor
                                                </button>
                                                <div
                                                    onClick={() => setShowRejectedStatusModal(false)}
                                                    className="flex items-center justify-center gap-2 text-gray-400 font-bold cursor-pointer hover:text-gray-600 text-[14px]"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                    Return to Doctor List
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* MODAL FOOTER */}
                                <div className="px-8 pb-6 pt-0 mt-[-10px]">
                                    <div className="bg-[#F8F9FA] rounded-[16px] p-4 flex items-center justify-between">
                                        <p className="text-[15px] font-bold text-gray-700">
                                            Do you have any feedback? We are always ready to help.
                                        </p>
                                        <button className="text-[#19718A] font-bold text-[16px] hover:underline">
                                            Contact Support
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default Admin_dashboard1;
