import React, { useState, useRef, useEffect } from "react";
import DasyWilliam from "./DasyWilliam";
import Profile from "./Profile";

import AdminSidebar from "./AdminSidebar";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Adddoctor from "./Adddoctor";


const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const monthlyData = [
    { month: "Jan", male: 40, female: 60 },
    { month: "Feb", male: 45, female: 55 },
    { month: "Mar", male: 50, female: 65 },
    { month: "Apr", male: 60, female: 75 },
    { month: "May", male: 55, female: 70 },
    { month: "Jun", male: 52, female: 68 },
    { month: "Jul", male: 48, female: 62 },
    { month: "Aug", male: 50, female: 66 },
    { month: "Sep", male: 54, female: 70 },
    { month: "Oct", male: 58, female: 72 },
    { month: "Nov", male: 53, female: 68 },
    { month: "Dec", male: 57, female: 73 },
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
const tabsData = [
    "ALL",
    "CARDIOLOGIST",
    "ORTHOPEDICS",
    "ONCOLOGY",
    "DERMATOLOGY",
    // future me aur add kar sakte ho
    // "NEUROLOGY",
    // "PEDIATRICS",
];


const AdminDoctor = () => {
    const [open, setOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const viewQuery = queryParams.get("view");
    const isSpecialView = Boolean(viewQuery);

    const [openType, setOpenType] = useState(isSpecialView ? "grid" : "list");

    useEffect(() => {
        setOpenType(isSpecialView ? "grid" : "list");
    }, [isSpecialView]);

    const [active, setActive] = useState("Doctors");
    const menuRef = useRef(null);
    const [expandedId, setExpandedId] = useState(null);
    const [activeTab, setActiveTab] = useState("ALL");
    const [activeCard, setActiveCard] = useState(null);

    const [selectedDate, setSelectedDate] = useState(13);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(2025);

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
        <div className="flex min-h-screen bg-[#F7F9FB]">

            {/* ================= SIDEBAR ================= */}
            <AdminSidebar active={active} setActive={setActive} />
            {/* ================= MAIN ================= */}
            <main className="flex-1 pt-3 pr-2 pl-4">


                {/* TOP BAR */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4 w-full max-w-[700px]">

                        <div className="relative w-16 h-12 rounded-xl bg-white border border-gray-400 shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden flex items-center justify-center">

                            {/* Image */}
                            <img src="/assets/m.png" className="w-10 relative z-10" />

                            {/* Shine overlay */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/60 via-transparent to-white/40 pointer-events-none z-20"></div>

                            {/* Border glow */}
                            <div className="absolute inset-0 rounded-xl border border-white/40 pointer-events-none z-20"></div>

                        </div>
                        <div className="flex items-center w-full bg-white border-[0.3px] border-black/50 
                                rounded-full px-10 py-3 shadow-[0_2px_6px_rgba(0,0,0,0.12)]">

                            <img
                                src="/assets/sea.png"
                                className="w-6 h-6 mr-2 opacity-70"
                            />

                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-transparent outline-none text-[18px] text-black placeholder-black opacity-80"
                            />

                        </div>
                    </div>

                    <div className="flex items-center gap-4">
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
                {!isSpecialView && (
                    <div className="grid grid-cols-10 gap-6 mt-10">
                        {/* LEFT STATS SECTION */}
                        <div className="col-span-6 h-[400px]">
                            <div className="grid grid-cols-3 gap-4 h-full auto-rows-fr">
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
                                    className="bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)] border-[0.3px] border-black/50 rounded-[20px] p-3 h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                                >
                                    <h3 className="text-[18px] font-semibold text-gray-700 mt-[-10px]">Active Doctors</h3>
                                    <div className="flex items-center justify-between flex-1 mt-1 px-0">
                                        <img src="/assets/active.png" className="h-[130px] object-contain -ml-4" />
                                        <h2 className="text-[48px] font-normal text-black leading-none ">50</h2>
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
                                    onClick={() => setActiveCard("ADD_DOCTORS")}
                                    className={`shadow-[0_2px_6px_rgba(0,0,0,0.12)] rounded-[20px] p-3 h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer ${
                                        activeCard === "ADD_DOCTORS"
                                            ? "bg-white border-[2.5px] border-[#1F2E5C]"
                                            : "bg-white border-[0.3px] border-black/50"
                                    }`}
                                >
                                    <h3 className="text-[18px] font-semibold text-gray-700 mt-[-10px]">Add Doctors</h3>
                                    <div className="flex justify-center items-center flex-1">
                                        <img src="/assets/add.png" className="h-[130px] object-contain" />
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* CALENDAR */}
                        <div className="col-span-4 bg-white border border-black rounded-[20px] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col h-[400px]">
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
                                    <span key={d} className="text-[#399CAA] font-normal text-[18px] mb-1">{d}</span>
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
                )}

                {/* ================= MAIN CONTENT OR ADD DOCTOR FORM ================= */}
                {activeCard === "ADD_DOCTORS" ? (
                    <div className="mt-6 mb-10 w-full rounded-[20px] bg-white border-[1.5px] border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
                        <Adddoctor />
                    </div>
                ) : (
                    <>
                        {/* ================= TABS CAPSULE ================= */}
                        <div className="mt-4 flex items-center justify-between bg-white border border-gray-200 rounded-full pl-2 pr-6 py-2 shadow-[0_2px_10px_rgba(0,0,0,0.04)] mx-2">
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
                        {[
                            { name: "Dr.Hifza Javed", role: "CARDIOLOGIST", img: "/assets/ph.png" },
                            { name: "Dr.Sumaiya Javed", role: "NEUROLOGIST", img: "/assets/ph.png" },
                            { name: "Dr.Ahmad", role: "DERMATOLOIST", img: "/assets/ph.png" },
                            { name: "Dr.Varun Mishra", role: "CONOLOGIST", img: "/assets/ph.png" },
                            { name: "Dr.sidharth m.", role: "CARDIOLOGIST", img: "/assets/ph.png" },
                            { name: "Dr.priya mehra", role: "CARDIOLOGIST", img: "/assets/ph.png" },
                            { name: "Dr.Sumaiya Javed", role: "NEUROLOGIST", img: "/assets/ph.png" },
                            { name: "Dr.Ahmad", role: "DERMATOLOIST", img: "/assets/ph.png" },
                            { name: "Dr.sidharth m.", role: "CARDIOLOGIST", img: "/assets/ph.png" }
                        ].map((doc, idx) => (
                            <div key={idx} className="bg-white border border-gray-200 rounded-[12px] flex flex-col items-center pt-5 overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2 relative">
                                {/* Rating Ribbon */}
                                <div className="absolute top-4 left-0 bg-[#FFEAC2] text-[#FFA800] text-[12px] font-bold pl-[6px] pr-2 py-[2px] rounded-r-sm flex items-center shadow-sm">
                                    <span className="mr-[2px]">★</span> 4.7
                                </div>
                                {/* Avatar */}
                                <div className={`w-[90px] h-[90px] md:w-[105px] md:h-[105px] rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-sm mb-3 mt-2 relative ${viewQuery === 'active' ? 'border-[4px] border-[#00DE5A]' : viewQuery === 'rejected' ? 'border-[4px] border-red-600' : viewQuery === 'pending' ? 'border-[4px] border-[#399CAA]' : 'border-[2px] border-[#00DE5A]'}`}>
                                    <img src={doc.img} className="w-[110px] h-[110px] object-cover" alt="Doctor" onError={(e) => { e.target.src = '/assets/admin.png' }} />
                                </div>
                                {/* Name */}
                                <h3 className="text-[18px] font-bold text-black leading-tight mb-[6px]">{doc.name}</h3>
                                {/* Specialty */}
                                <span className="bg-[#E4F2F3] text-[#399CAA] font-bold text-[14px] px-6 py-[5px] rounded-full uppercase tracking-widest mb-6">
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
                        {[1, 2, 3, 4, 5, 6].map((item, idx) => (
                            <div key={idx} className="bg-white border border-gray-300 px-6 py-[10px] flex items-center justify-between hover:shadow-md transition-shadow duration-200">
                                {/* Left: Avatar & Name */}
                                <div className="flex items-center gap-5 w-[280px]">
                                    <div className="w-[70px] h-[70px] rounded-full bg-[#F5B82A] flex items-center justify-center overflow-hidden shrink-0 shadow-sm border-2 border-white ring-1 ring-gray-100">
                                        <img src="/assets/ph.png" className="w-[70px] h-[70px] object-cover" alt="Doctor" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-[18px] font-bold text-black leading-tight mb-1">Dr.Hifza Javed</h3>
                                        <div className="inline-flex items-center bg-[#FFEAC2] px-2 py-[2px] rounded-full w-fit mt-1">
                                            <span className="text-[#FFA800] text-[12px] mr-1 leading-none">★</span>
                                            <span className="text-[#FFA800] text-[12px] font-bold leading-none">4.7</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Middle: Specialty */}
                                <div className="flex-1 flex justify-center items-center">
                                    <span className="bg-[#E4F2F3] text-[#399CAA] font-bold text-[14px] px-6 py-1.5 rounded-full uppercase tracking-wider">
                                        CARDIOLOGIST
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

    );
};

export default AdminDoctor;
