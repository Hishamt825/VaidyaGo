import React, { useState, useRef, useEffect } from "react";
import DasyWilliam from "./DasyWilliam";

import Profile from "./Profile";
import Notification from "../Patient/notification";
import AdminSidebar from "./AdminSidebar";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Form1 from "../Doctor/Form1";
import Form2 from "../Doctor/Form2";
import Form3 from "../Doctor/Form3";
import Form4 from "../Doctor/Form4";

import doImg from "../../assets/do.png";
import active1 from "../../assets/active1.png";
import pen1 from "../../assets/pen1.png";
import reject1 from "../../assets/reject1.png";
import add2 from "../../assets/add2.png";


const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const tabsData = [
    "ALL",
    "CARDIOLOGIST",
    "ORTHOPEDICS",
    "ONCOLOGY",
    "DERMATOLOGY",
];

const doctorsData = [
    { id: 1, name: "Dr.Hifza Javed", role: "CARDIOLOGIST", img: "/assets/ph.png", rating: 4.7, status: "active" },
    { id: 2, name: "Dr.Sumaiya Javed", role: "NEUROLOGIST", img: "/assets/ph.png", rating: 4.8, status: "active" },
    { id: 3, name: "Dr.Ahmad", role: "DERMATOLOGY", img: "/assets/ph.png", rating: 4.5, status: "pending" },
    { id: 4, name: "Dr.Varun Mishra", role: "ONCOLOGY", img: "/assets/ph.png", rating: 4.9, status: "active" },
    { id: 5, name: "Dr.sidharth m.", role: "CARDIOLOGIST", img: "/assets/ph.png", rating: 4.6, status: "active" },
    { id: 6, name: "Dr.priya mehra", role: "CARDIOLOGIST", img: "/assets/ph.png", rating: 4.7, status: "active" },
    { id: 7, name: "Dr.Aman Verma", role: "ORTHOPEDICS", img: "/assets/ph.png", rating: 4.4, status: "pending" },
    { id: 8, name: "Dr.Sneha Kapoor", role: "DERMATOLOGY", img: "/assets/ph.png", rating: 4.6, status: "active" },
    { id: 9, name: "Dr.Rajesh Khanna", role: "ONCOLOGY", img: "/assets/ph.png", rating: 4.8, status: "active" },
    { id: 10, name: "Dr.Karan Johar", role: "CARDIOLOGIST", img: "/assets/ph.png", rating: 4.3, status: "active" },
    { id: 11, name: "Dr.Zoya Akhtar", role: "NEUROLOGIST", img: "/assets/ph.png", rating: 4.5, status: "active" },
    { id: 12, name: "Dr.Farhan Akhtar", role: "ORTHOPEDICS", img: "/assets/ph.png", rating: 4.6, status: "rejected" },
    { id: 13, name: "Dr.Rohit Shetty", role: "DERMATOLOGY", img: "/assets/ph.png", rating: 4.2, status: "pending" },
    { id: 14, name: "Dr.Sanjay Leela", role: "ONCOLOGY", img: "/assets/ph.png", rating: 4.9, status: "active" },
    { id: 15, name: "Dr.Aditya Chopra", role: "CARDIOLOGIST", img: "/assets/ph.png", rating: 4.1, status: "rejected" },
    { id: 16, name: "Dr.Mahesh Bhatt", role: "ORTHOPEDICS", img: "/assets/ph.png", rating: 4.0, status: "rejected" },
];


const AdminDoctor = () => {
    const [open, setOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const viewQuery = queryParams.get("view");
    const isSpecialView = Boolean(viewQuery);

    const [openType, setOpenType] = useState(isSpecialView ? "grid" : "list");
    const [activeTab, setActiveTab] = useState("ALL");
    const [activeCard, setActiveCard] = useState("TOTAL_DOCTORS");
    const [adminFormStep, setAdminFormStep] = useState(1);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    useEffect(() => {
        setOpenType(isSpecialView ? "grid" : "list");
        setActiveTab("ALL");
    }, [isSpecialView, viewQuery]);

    useEffect(() => {
        if (viewQuery) {
            if (viewQuery === "active") setActiveCard("ACTIVE");
            else if (viewQuery === "pending") setActiveCard("PENDING");
            else if (viewQuery === "rejected") setActiveCard("REJECTED");
        } else if (activeCard !== "ADD_DOCTORS") {
            setActiveCard("TOTAL_DOCTORS");
        }
    }, [viewQuery]);

    const [selectedDate, setSelectedDate] = useState(13);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(2025);
    const [isMonthOpen, setIsMonthOpen] = useState(false);
    const [isYearOpen, setIsYearOpen] = useState(false);
    const [activeDateIndex, setActiveDateIndex] = useState(17); // Default selection
    const [dateStyle, setDateStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
    const dateRefs = useRef([]);
    const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const yearsList = Array.from({ length: 26 }, (_, i) => 2005 + i);

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
    }, [activeDateIndex, month, year]);

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

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

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

    const renderAdminForm = () => {
        switch (adminFormStep) {
            case 1: return <Form1 onNext={setAdminFormStep} />;
            case 2: return <Form2 onNext={setAdminFormStep} />;
            case 3: return <Form3 onNext={setAdminFormStep} />;
            case 4: return <Form4 onNext={setAdminFormStep} />;
            default: return <Form1 onNext={setAdminFormStep} />;
        }
    };

    return (
        <div className="flex h-screen bg-white overflow-hidden">
            <AdminSidebar 
                active="Doctors" 
                isMobileOpen={isMobileSidebarOpen}
                setIsMobileOpen={setIsMobileSidebarOpen}
            />

            <div className="flex-1 flex flex-col overflow-hidden pt-3 pr-2 pl-4">
                {/* TOP BAR */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-4">
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
                            <div 
                                onClick={() => setOpenProfile(true)}
                                className="w-14 h-12 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-all">
                                <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>

                            {/* Notification */}
                            <div 
                                onClick={() => setIsNotificationOpen(true)}
                                className="w-14 h-12 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-all relative">
                                <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#9367D8] rounded-full flex items-center justify-center text-white text-[11px] font-bold border-2 border-white shadow-sm">1</div>
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

                <main className="flex-1 overflow-y-auto pt-3 pr-2 pl-4 custom-scrollbar">
                    {/* TOP STATS CARDS */}

                    {/* ================= TOP GRID ================= */}
                    <div className="grid grid-cols-10 gap-6 mt-3">
                        {/* LEFT STATS SECTION */}
                        <div className="col-span-6 h-[400px]">
                            <div className="grid grid-cols-3 gap-4 h-full auto-rows-fr">
                                {/* CARD 1: Total Doctors */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    onClick={() => {
                                        setActiveCard("TOTAL_DOCTORS");
                                        navigate('/admin-doctor');
                                    }}
                                    className={`shadow-[0_2px_12px_rgba(0,0,0,0.05)] rounded-[16px] p-4 h-full flex flex-col justify-between cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-lg overflow-hidden ${
                                        activeCard === "TOTAL_DOCTORS"
                                            ? "bg-white border-[2.5px] border-[#1F2E5C]"
                                            : "bg-white border-[1.2px] border-gray-300"
                                    }`}
                                >
                                    <h3 className="text-[18px] font-semibold text-gray-700 mt-[-10px]">Total Doctors</h3>
                                    <div className="flex items-end justify-between flex-1 mt-1 px-0 relative">
                                        <img src={doImg} className="h-[140px] object-contain -ml-2 mb-[-12px]" />
                                        <h2 className="text-[48px] font-normal text-black leading-none mr-4 mb-4">100</h2>
                                    </div>
                                </motion.div>

                                {/* CARD 2: Active Doctors */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    onClick={() => {
                                        setActiveCard("ACTIVE");
                                        navigate('/admin-doctor?view=active');
                                    }}
                                    className={`shadow-[0_2px_12px_rgba(0,0,0,0.05)] rounded-[16px] p-4 h-full flex flex-col justify-between cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-lg overflow-hidden ${
                                        activeCard === "ACTIVE"
                                            ? "bg-white border-[2.5px] border-[#1F2E5C]"
                                            : "bg-white border-[1.2px] border-gray-300"
                                    }`}
                                >
                                    <h3 className="text-[18px] font-semibold text-gray-700 mt-[-10px]">Active Doctors</h3>
                                    <div className="flex items-end justify-between flex-1 mt-1 px-0 relative">
                                        <img src={active1} className="h-[130px] object-contain -ml-2 mb-[-12px]" />
                                        <h2 className="text-[48px] font-normal text-black leading-none mr-4 mb-4">50</h2>
                                    </div>
                                </motion.div>

                                {/* CARD 3: Pending Doctors */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    onClick={() => {
                                        setActiveCard("PENDING");
                                        navigate('/admin-doctor?view=pending');
                                    }}
                                    className={`shadow-[0_2px_12px_rgba(0,0,0,0.05)] rounded-[16px] p-4 h-full flex flex-col justify-between cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-lg overflow-hidden ${
                                        activeCard === "PENDING"
                                            ? "bg-white border-[2.5px] border-[#1F2E5C]"
                                            : "bg-white border-[1.2px] border-gray-300"
                                    }`}
                                >
                                    <h3 className="text-[18px] font-semibold text-gray-700 mt-[-10px]">Pending Doctors</h3>
                                    <div className="flex items-end justify-between flex-1 mt-1 px-0 relative">
                                        <img src={pen1} className="h-[130px] object-contain -ml-2 mb-[-12px]" />
                                        <h2 className="text-[48px] font-normal text-black leading-none mr-4 mb-4">50</h2>
                                    </div>
                                </motion.div>

                                {/* CARD 4: Rejected Doctors */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    onClick={() => {
                                        setActiveCard("REJECTED");
                                        navigate('/admin-doctor?view=rejected');
                                    }}
                                    className={`shadow-[0_2px_12px_rgba(0,0,0,0.05)] rounded-[16px] p-4 h-full flex flex-col justify-between cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-lg overflow-hidden ${
                                        activeCard === "REJECTED"
                                            ? "bg-white border-[2.5px] border-[#1F2E5C]"
                                            : "bg-white border-[1.2px] border-gray-300"
                                    }`}
                                >
                                    <h3 className="text-[18px] font-semibold text-gray-700 mt-[-10px]">Rejected Doctors</h3>
                                    <div className="flex items-end justify-between flex-1 mt-1 px-0 relative">
                                        <img src={reject1} className="h-[130px] object-contain -ml-2 mb-[-12px]" />
                                        <h2 className="text-[48px] font-normal text-black leading-none mr-4 mb-4">100</h2>
                                    </div>
                                </motion.div>

                                {/* CARD 5: Add Doctors */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    onClick={() => setActiveCard("ADD_DOCTORS")}
                                    className={`shadow-[0_2px_12px_rgba(0,0,0,0.05)] rounded-[16px] p-4 h-full flex flex-col justify-between cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
                                        activeCard === "ADD_DOCTORS"
                                            ? "bg-white border-[2.5px] border-[#1F2E5C]"
                                            : "bg-white border-[1.2px] border-gray-300"
                                    }`}
                                >
                                    <h3 className="text-[18px] font-semibold text-gray-700 mt-[-10px]">Add Doctors</h3>
                                    <div className="flex justify-center items-end flex-1">
                                        <img src={add2} className="h-[140px] object-contain" />
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* CALENDAR */}
                        <div className="col-span-4 bg-white border-[1.2px] border-gray-300 rounded-[16px] p-4 flex flex-col h-[400px] overflow-hidden">
                            <div className="flex justify-between items-center mb-6 px-2">
                                <button onClick={handlePrevMonth} className="text-[#399CAA] hover:text-[#104e5f] transition-all p-2 rounded-full hover:bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                                
                                <div className="flex gap-4 items-center relative">
                                    {/* Month Selection */}
                                    <div className="relative">
                                        <div 
                                            className="flex items-center gap-[6px] cursor-pointer group" 
                                            onClick={() => { setIsMonthOpen(!isMonthOpen); setIsYearOpen(false); }}
                                        >
                                            <span className="font-bold text-[16px] text-gray-700 tracking-wide">{monthsList[month]}</span>
                                            <svg className="w-[14px] h-[14px] text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                        
                                        {isMonthOpen && (
                                            <div className="absolute top-full left-0 mt-2 w-[140px] bg-white border border-gray-100 rounded-xl shadow-xl z-[100] py-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                                                {monthsList.map((m, i) => (
                                                    <div 
                                                        key={m}
                                                        onClick={() => { setMonth(i); setIsMonthOpen(false); }}
                                                        className={`px-4 py-2 text-[14px] cursor-pointer transition-colors ${month === i ? 'bg-[#7DB1BC]/10 text-[#399CAA] font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
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
                                            <span className="font-bold text-[16px] text-gray-700 tracking-wide">{year}</span>
                                            <svg className="w-[14px] h-[14px] text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                                        </div>

                                        {isYearOpen && (
                                            <div className="absolute top-full left-0 mt-2 w-[100px] bg-white border border-gray-100 rounded-xl shadow-xl z-[100] py-2 max-h-[200px] overflow-y-auto custom-scrollbar">
                                                {yearsList.map(y => (
                                                    <div 
                                                        key={y}
                                                        onClick={() => { setYear(y); setIsYearOpen(false); }}
                                                        className={`px-4 py-2 text-[14px] cursor-pointer transition-colors ${year === y ? 'bg-[#7DB1BC]/10 text-[#399CAA] font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                                                    >
                                                        {y}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button onClick={handleNextMonth} className="text-[#399CAA] hover:text-[#104e5f] transition-all p-2 rounded-full hover:bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </div>

                            <div className="grid grid-cols-7 mb-4">
                                {['S', 'M', 'T', 'W', 'Th', 'F', 'Sat'].map(d => (
                                    <div key={d} className="text-center text-[#32869e] font-bold text-[13px]">{d}</div>
                                ))}
                            </div>
                            <div className="relative mt-1 flex-1">
                                {/* Sliding Highlighter */}
                                <div 
                                    className="absolute bg-[#7DB1BC] rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-0" 
                                    style={{ 
                                        left: dateStyle.left, 
                                        top: dateStyle.top, 
                                        width: dateStyle.width, 
                                        height: dateStyle.height, 
                                        opacity: dateStyle.opacity 
                                    }} 
                                />
                                
                                <div className="grid grid-cols-7 gap-y-[18px] text-[15px] font-bold text-gray-700 relative z-10">
                                    {(() => {
                                        const daysInPrevMonth = new Date(year, month, 0).getDate();
                                        const prevDays = [...Array(firstDay)].map((_, i) => {
                                            const d = daysInPrevMonth - firstDay + i + 1;
                                            return (
                                                <div key={`prev-${i}`} className="flex justify-center items-center">
                                                    <span className="w-[32px] h-[32px] flex items-center justify-center rounded-full text-gray-300 font-medium">
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
                                                        onClick={() => {
                                                            setSelectedDate(d);
                                                            setActiveDateIndex(totalIndex);
                                                        }}
                                                        className={`w-[32px] h-[32px] flex items-center justify-center rounded-full transition-colors cursor-pointer ${activeDateIndex === totalIndex ? 'text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                                                    >
                                                        {d}
                                                    </span>
                                                </div>
                                            );
                                        });

                                        const nextDaysCount = 42 - (prevDays.length + currentDays.length);
                                        const nextDays = [...Array(nextDaysCount)].map((_, i) => (
                                            <div key={`next-${i}`} className="flex justify-center items-center">
                                                <span className="w-[32px] h-[32px] flex items-center justify-center rounded-full text-gray-300 font-medium">
                                                    {i + 1}
                                                </span>
                                            </div>
                                        ));

                                        return [...prevDays, ...currentDays, ...nextDays];
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= MAIN CONTENT OR ADD DOCTOR FORM ================= */}
                    {activeCard === "ADD_DOCTORS" ? (
                        <div className="mt-6 mb-10 w-full rounded-[20px] bg-white border-[1.5px] border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
                            {renderAdminForm()}
                        </div>
                    ) : (
                        <>
                            {/* ================= TABS CAPSULE ================= */}
                            <div className="mt-4 flex items-center justify-between bg-white border border-gray-300 rounded-full pl-2 pr-6 py-2 shadow-[0_2px_10px_rgba(0,0,0,0.04)] mx-2">
                                <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide flex-1">
                                    {tabsData.map((tab, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-6 py-2.5 rounded-full text-[16px] font-bold tracking-wide transition-all uppercase whitespace-nowrap
                                                ${activeTab === tab
                                                    ? "bg-[#399CAA] text-white shadow-md"
                                                    : "text-[#B3B3B3] hover:text-gray-600"
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}

                                    <button className="text-gray-600 ml-2 hover:text-gray-900 transition-colors flex items-center h-full pl-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-[18px] h-[18px]">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex items-center space-x-3 pl-6 ml-auto">
                                    <button onClick={() => setOpenType("grid")} className="p-1 cursor-pointer transition-all hover:scale-105">
                                        <img src="/assets/tab.png"
                                            className={`w-[22px] h-[22px] object-contain transition-all duration-300 ${openType === 'grid' ? 'opacity-100' : 'opacity-40 grayscale'}`}
                                            style={openType === 'grid' ? { filter: 'sepia(100%) hue-rotate(140deg) saturate(300%) brightness(80%)' } : {}}
                                            alt="Grid View" />
                                    </button>
                                    <button onClick={() => setOpenType("list")} className="p-1 cursor-pointer transition-all hover:scale-105">
                                        <img src="/assets/tab1.png"
                                            className={`w-[22px] h-[22px] object-contain transition-all duration-300 ${openType === 'list' ? 'opacity-100' : 'opacity-40 grayscale'}`}
                                            style={openType === 'list' ? { filter: 'sepia(100%) hue-rotate(140deg) saturate(300%) brightness(80%)' } : {}}
                                            alt="List View" />
                                    </button>
                                </div>
                            </div>

                            {/* ================= GRID VIEW ================= */}
                            {openType === "grid" && (
                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-2 mb-10 pb-4">
                                    {doctorsData
                                        .filter(doc => (activeTab === "ALL" || doc.role === activeTab) && (!viewQuery || doc.status === viewQuery))
                                        .map((doc, idx) => (
                                            <div key={idx} className="bg-white border border-gray-300 rounded-[12px] flex flex-col items-center pt-5 overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2 relative">
                                                {/* Rating Ribbon */}
                                                <div className="absolute top-4 left-0 bg-[#FFEAC2] text-[#FFA800] text-[12px] font-bold pl-[6px] pr-2 py-[2px] rounded-r-sm flex items-center shadow-sm">
                                                    <span className="mr-[2px]">★</span> {doc.rating}
                                                </div>
                                                {/* Avatar */}
                                                <div className={`w-[90px] h-[90px] md:w-[105px] md:h-[105px] rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-sm mb-3 mt-2 relative border-[4px] ${
                                                    doc.status === 'active' ? 'border-[#00DE5A]' : 
                                                    doc.status === 'rejected' ? 'border-red-600' : 
                                                    'border-[#399CAA]'
                                                }`}>
                                                    <img src={doc.img} className="w-[110px] h-[110px] object-cover" alt="Doctor" onError={(e) => { e.target.src = '/assets/admin.png' }} />
                                                </div>
                                                {/* Name */}
                                                <h3 className="text-[18px] font-bold text-black leading-tight mb-[6px]">{doc.name}</h3>
                                                {/* Specialty */}
                                                <span
                                                    onClick={() => setActiveTab(doc.role)}
                                                    className="bg-[#E4F2F3] text-[#399CAA] font-bold text-[14px] px-6 py-[5px] rounded-full uppercase tracking-widest mb-6 cursor-pointer hover:bg-[#399CAA] hover:text-white transition-all shadow-sm"
                                                >
                                                    {doc.role}
                                                </span>
                                                {/* Bottom Actions */}
                                                <div className="w-full flex">
                                                    <button className="flex-1 py-3 text-[#5A5A5A] font-semibold text-[14px] bg-[#EAEAEA] border-r border-white hover:bg-gray-200 transition-colors">
                                                        View Detail
                                                    </button>
                                                    <button className="flex-1 py-3 text-[#5A5A5A] font-semibold text-[14px] bg-[#EAEAEA] hover:bg-gray-200 transition-colors">
                                                        Make a Call
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}

                            {/* ================= LIST VIEW ================= */}
                            {openType === "list" && (
                                <div className="mt-4 flex flex-col gap-2 mx-2 mb-10">
                                    {doctorsData
                                        .filter(doc => (activeTab === "ALL" || doc.role === activeTab) && (!viewQuery || doc.status === viewQuery))
                                        .map((doc, idx) => (
                                            <div key={idx} className="bg-white border border-gray-300 px-6 py-[10px] flex items-center justify-between hover:shadow-md transition-shadow duration-200">
                                                {/* Left: Avatar & Name */}
                                                <div className="flex items-center gap-5 w-[280px]">
                                                    <div className={`w-[70px] h-[70px] rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-sm border-2 border-white ring-[3px] ${
                                                        doc.status === 'active' ? 'ring-[#00DE5A] bg-[#00DE5A]/10' : 
                                                        doc.status === 'rejected' ? 'ring-red-600 bg-red-600/10' : 
                                                        'ring-[#399CAA] bg-[#399CAA]/10'
                                                    }`}>
                                                        <img src={doc.img} className="w-[70px] h-[70px] object-cover" alt="Doctor" onError={(e) => { e.target.src = '/assets/ph.png' }} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h3 className="text-[18px] font-bold text-black leading-tight mb-1">{doc.name}</h3>
                                                        <div className="inline-flex items-center bg-[#FFEAC2] px-2 py-[2px] rounded-full w-fit mt-1">
                                                            <span className="text-[#FFA800] text-[12px] mr-1 leading-none">★</span>
                                                            <span className="text-[#FFA800] text-[12px] font-bold leading-none">{doc.rating}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Middle: Specialty */}
                                                <div className="flex-1 flex justify-center items-center">
                                                    <span
                                                        onClick={() => setActiveTab(doc.role)}
                                                        className="bg-[#E4F2F3] text-[#399CAA] font-bold text-[14px] px-6 py-1.5 rounded-full uppercase tracking-wider cursor-pointer hover:bg-[#399CAA] hover:text-white transition-all shadow-sm"
                                                    >
                                                        {doc.role}
                                                    </span>
                                                </div>

                                                {/* Right: Actions */}
                                                <div className="flex items-center gap-4 shrink-0 pr-2">
                                                    <button className="border border-gray-300 text-[#555] font-semibold px-5 py-2 rounded-full text-[14px] hover:bg-gray-50 transition-colors">
                                                        View Detail
                                                    </button>
                                                    <button className="border border-gray-300 text-[#555] font-semibold px-5 py-2 rounded-full text-[14px] hover:bg-gray-50 transition-colors">
                                                        Make a Call
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
            {isNotificationOpen && <Notification onClose={() => setIsNotificationOpen(false)} />}
        </div>
    );
};

export default AdminDoctor;
