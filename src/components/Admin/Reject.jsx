import React, { useState, useRef, useEffect } from "react";
import DasyWilliam from "./DasyWilliam";
import Profile from "./Profile";
import AdminSidebar from "./AdminSidebar";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const tabsData = [
    "ALL",
    "CARDIOLOGIST",
    "ORTHOPEDICS",
    "ONCOLOGY",
    "DERMATOLOGY",
];

const doctorsData = [
    // CARDIOLOGIST
    { id: 1, name: "Dr.Hifza Javed", role: "CARDIOLOGIST", img: "/assets/ph.png", rating: 4.7, status: "rejected" },
    { id: 5, name: "Dr.sidharth m.", role: "CARDIOLOGIST", img: "/assets/ph.png", rating: 4.6, status: "rejected" },
    { id: 6, name: "Dr.priya mehra", role: "CARDIOLOGIST", img: "/assets/ph.png", rating: 4.7, status: "rejected" },
    { id: 10, name: "Dr.Karan Johar", role: "CARDIOLOGIST", img: "/assets/ph.png", rating: 4.3, status: "rejected" },
    { id: 15, name: "Dr.Amit Shah", role: "CARDIOLOGIST", img: "/assets/ph.png", rating: 4.5, status: "rejected" },
    { id: 16, name: "Dr.Rajdeep", role: "CARDIOLOGIST", img: "/assets/ph.png", rating: 4.1, status: "rejected" },

    // NEUROLOGIST
    { id: 2, name: "Dr.Sumaiya Javed", role: "NEUROLOGIST", img: "/assets/ph.png", rating: 4.8, status: "rejected" },
    { id: 11, name: "Dr.Zoya Akhtar", role: "NEUROLOGIST", img: "/assets/ph.png", rating: 4.5, status: "rejected" },
    { id: 17, name: "Dr.Vikram", role: "NEUROLOGIST", img: "/assets/ph.png", rating: 4.6, status: "rejected" },
    { id: 18, name: "Dr.Sonia", role: "NEUROLOGIST", img: "/assets/ph.png", rating: 4.7, status: "rejected" },
    { id: 19, name: "Dr.Rohan", role: "NEUROLOGIST", img: "/assets/ph.png", rating: 4.2, status: "rejected" },

    // DERMATOLOGY
    { id: 3, name: "Dr.Ahmad", role: "DERMATOLOGY", img: "/assets/ph.png", rating: 4.5, status: "rejected" },
    { id: 8, name: "Dr.Sneha Kapoor", role: "DERMATOLOGY", img: "/assets/ph.png", rating: 4.6, status: "rejected" },
    { id: 20, name: "Dr.Manish", role: "DERMATOLOGY", img: "/assets/ph.png", rating: 4.3, status: "rejected" },
    { id: 21, name: "Dr.Kriti", role: "DERMATOLOGY", img: "/assets/ph.png", rating: 4.8, status: "rejected" },
    { id: 22, name: "Dr.Arjun", role: "DERMATOLOGY", img: "/assets/ph.png", rating: 4.4, status: "rejected" },

    // ONCOLOGY
    { id: 4, name: "Dr.Varun Mishra", role: "ONCOLOGY", img: "/assets/ph.png", rating: 4.9, status: "rejected" },
    { id: 9, name: "Dr.Rajesh Khanna", role: "ONCOLOGY", img: "/assets/ph.png", rating: 4.8, status: "rejected" },
    { id: 23, name: "Dr.Sanjay", role: "ONCOLOGY", img: "/assets/ph.png", rating: 4.7, status: "rejected" },
    { id: 24, name: "Dr.Meera", role: "ONCOLOGY", img: "/assets/ph.png", rating: 4.6, status: "rejected" },
    { id: 25, name: "Dr.Kabir", role: "ONCOLOGY", img: "/assets/ph.png", rating: 4.5, status: "rejected" },

    // ORTHOPEDICS
    { id: 7, name: "Dr.Aman Verma", role: "ORTHOPEDICS", img: "/assets/ph.png", rating: 4.4, status: "rejected" },
    { id: 12, name: "Dr.Farhan Akhtar", role: "ORTHOPEDICS", img: "/assets/ph.png", rating: 4.6, status: "rejected" },
    { id: 26, name: "Dr.Ranveer", role: "ORTHOPEDICS", img: "/assets/ph.png", rating: 4.8, status: "rejected" },
    { id: 27, name: "Dr.Deepika", role: "ORTHOPEDICS", img: "/assets/ph.png", rating: 4.7, status: "rejected" },
    { id: 28, name: "Dr.Hrithik", role: "ORTHOPEDICS", img: "/assets/ph.png", rating: 4.9, status: "rejected" },
];

const Reject = () => {
    const [open, setOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const navigate = useNavigate();
    const [active, setActive] = useState("Doctors");
    const menuRef = useRef(null);
    const [activeTab, setActiveTab] = useState("ALL");
    const [openType, setOpenType] = useState("grid");

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

    return (
        <div className="flex h-screen bg-white overflow-hidden">
            {/* ================= SIDEBAR ================= */}
            <AdminSidebar active={active} activeSub="Rejected Doctors" setActive={setActive} startSubmenuOpen={true} />

            {/* ================= MAIN ================= */}
            <main className="flex-1 h-full overflow-y-auto pt-3 pr-2 pl-4">
                {/* TOP BAR */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4 w-full max-w-[700px]">
                        <div className="relative w-16 h-12 rounded-xl bg-white border border-gray-400 shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden flex items-center justify-center">
                            <img src="/assets/m.png" className="w-10 relative z-10" />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/60 via-transparent to-white/40 pointer-events-none z-20"></div>
                            <div className="absolute inset-0 rounded-xl border border-white/40 pointer-events-none z-20"></div>
                        </div>
                        <div className="flex items-center w-full bg-white border-[0.3px] border-black/50 rounded-full px-10 py-3 shadow-[0_2px_6px_rgba(0,0,0,0.12)]">
                            <img src="/assets/sea.png" className="w-6 h-6 mr-2 opacity-70" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-transparent outline-none text-[18px] text-black placeholder-black opacity-80"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <img src="/assets/sett.png" className="w-18 h-14 opacity-80" />
                            <div className="w-14 h-10 bg-white border-black/50 rounded-full shadow-[0_10px_20px_rgba(10,0,0,0.2)] rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50 transition">
                                <img src="/assets/im.png" className="w-10 h-8 opacity-80" />
                            </div>
                        </div>
                        <div className="relative" ref={menuRef}>
                            <div
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-4 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-xl px-4 py-1 cursor-pointer hover:bg-gray-50 transition-all"
                            >
                                <span className="text-[18px] font-semibold text-gray-700">Dasy William</span>
                                <img src="/assets/ph.png" className="w-11 h-11 rounded-full border-black/50 shadow-[0_2px_6px_rgba(0,0,0,0.12)] object-cover" />
                            </div>
                            <AnimatePresence>
                                {open && !openProfile && (
                                    <DasyWilliam setOpenProfile={setOpenProfile} />
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

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
                            .filter(doc => (activeTab === "ALL" || doc.role === activeTab))
                            .map((doc, idx) => (
                                <div key={idx} className="bg-white border border-gray-300 rounded-[12px] flex flex-col items-center pt-5 overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2 relative">
                                    {/* Rating Ribbon */}
                                    <div className="absolute top-4 left-0 bg-[#FFEAC2] text-[#FFA800] text-[12px] font-bold pl-[6px] pr-2 py-[2px] rounded-r-sm flex items-center shadow-sm">
                                        <span className="mr-[2px]">★</span> {doc.rating}
                                    </div>
                                    {/* Avatar */}
                                    <div className="w-[90px] h-[90px] md:w-[105px] md:h-[105px] rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-sm mb-3 mt-2 relative border-[4px] border-red-600">
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
                            .filter(doc => (activeTab === "ALL" || doc.role === activeTab))
                            .map((doc, idx) => (
                                <div key={idx} className="bg-white border border-gray-300 px-6 py-[10px] flex items-center justify-between hover:shadow-md transition-shadow duration-200">
                                    <div className="flex items-center gap-5 w-[280px]">
                                        <div className="w-[70px] h-[70px] rounded-full bg-[#F5B82A] flex items-center justify-center overflow-hidden shrink-0 shadow-sm border-2 border-white ring-1 ring-red-500">
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
                                    <div className="flex-1 flex justify-center items-center">
                                        <span
                                            onClick={() => setActiveTab(doc.role)}
                                            className="bg-[#E4F2F3] text-[#399CAA] font-bold text-[14px] px-6 py-1.5 rounded-full uppercase tracking-wider cursor-pointer hover:bg-[#399CAA] hover:text-white transition-all shadow-sm"
                                        >
                                            {doc.role}
                                        </span>
                                    </div>
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
            </main>
        </div>
    );
};

export default Reject;
