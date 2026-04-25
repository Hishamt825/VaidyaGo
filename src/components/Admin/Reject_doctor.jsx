import React, { useState, useRef, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { AnimatePresence, motion } from "framer-motion";
import DasyWilliam from "./DasyWilliam";
import Profile from "./Profile";

// Asset Imports
import docImg from "../../assets/doc.png";
import activeImg from "../../assets/active.png";
import adminImg from "../../assets/admin1.png";
import adminRejImg from "../../assets/admin_rej.png";
import anjaliImg from "../../assets/anjali.png";
import priyaImg from "../../assets/priya.png";
import redImg from "../../assets/red.png";
import recImg from "../../assets/rec.png";
import mImg from "../../assets/m.png";
import seaImg from "../../assets/sea.png";
import settImg from "../../assets/sett.png";
import imImg from "../../assets/im.png";
import phImg from "../../assets/ph.png";


// Lucide Icons
import {
    Search,
    Settings,
    Bell,
    ChevronDown,
    AlertCircle,
    XCircle,
    Info,
    Trash2,
    MessageSquare,
    MoreHorizontal
} from "lucide-react";

const Reject_doctor = () => {
    const [open, setOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const menuRef = useRef(null);
    const [active, setActive] = useState("Doctors"); // Highlight Doctors in Sidebar
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterReason, setFilterReason] = useState("All Reasons");
    const [filterDays, setFilterDays] = useState("Last 2 Days");

    const rejectedDoctors = [
        {
            id: 1,
            name: "Dr. Ahmad, MD",
            applied: "Jan 10, 2026",
            rejected: "Jan 12, 2026",
            image: adminRejImg,
            reason: "License Expired",
            reasonDetail: "License renewal document is outdated.",
            type: "expired"
        },
        {
            id: 2,
            name: "Dr. Anjali Sharma, MBBS, MD",
            applied: "Jan 12, 2026",
            rejected: "Jan 12, 2026",
            image: anjaliImg,
            reason: "Fake Information",
            reasonDetail: "Discrepancies found in submitted details.",
            type: "fake"
        },
        {
            id: 3,
            name: "Dr. Priya Kapoor, MS, ENT",
            applied: "Jan 14, 2026",
            rejected: "Jan 12, 2026",
            image: priyaImg,
            reason: "Incomplete Profile",
            reasonDetail: "Missing qualification certificates.",
            type: "incomplete"
        },
        {
            id: 4,
            name: "Dr. Ahmad, MD",
            applied: "Jan 10, 2026",
            rejected: "Jan 12, 2026",
            image: adminRejImg,
            reason: "License Expired",
            reasonDetail: "License renewal document is outdated.",
            type: "expired"
        },
        {
            id: 5,
            name: "Dr. Ahmad, MD",
            applied: "Jan 10, 2026",
            rejected: "Jan 12, 2026",
            image: adminRejImg,
            reason: "License Expired",
            reasonDetail: "License renewal document is outdated.",
            type: "expired"
        },
        {
            id: 6,
            name: "Dr. Ahmad, MD",
            applied: "Jan 10, 2026",
            rejected: "Jan 12, 2026",
            image: adminRejImg,
            reason: "License Expired",
            reasonDetail: "License renewal document is outdated.",
            type: "expired"
        },
        {
            id: 7,
            name: "Dr. Anjali Sharma, MBBS, MD",
            applied: "Jan 12, 2026",
            rejected: "Jan 12, 2026",
            image: anjaliImg,
            reason: "Fake Information",
            reasonDetail: "Discrepancies found in submitted details.",
            type: "fake"
        },
        {
            id: 8,
            name: "Dr. Anjali Sharma, MBBS, MD",
            applied: "Jan 12, 2026",
            rejected: "Jan 12, 2026",
            image: anjaliImg,
            reason: "Fake Information",
            reasonDetail: "Discrepancies found in submitted details.",
            type: "fake"
        },
        {
            id: 9,
            name: "Dr. Anjali Sharma, MBBS, MD",
            applied: "Jan 12, 2026",
            rejected: "Jan 12, 2026",
            image: anjaliImg,
            reason: "Fake Information",
            reasonDetail: "Discrepancies found in submitted details.",
            type: "fake"
        }

    ];

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
        <div className="flex h-screen bg-[#E5E5E5] overflow-hidden">
            {/* ================= SIDEBAR ================= */}
            <AdminSidebar
                active={active}
                setActive={setActive}
                isMobileOpen={isMobileSidebarOpen}
                setIsMobileOpen={setIsMobileSidebarOpen}
            />

            {/* ================= MAIN CONTENT ================= */}
            <main className="flex-1 h-full overflow-y-auto pt-3 pr-2 md:pr-4 pl-2 md:pl-4 max-w-full">

                {/* TOP BAR */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div className="flex items-center gap-4 w-full md:max-w-[700px]">
                        <button
                            onClick={() => setIsMobileSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg bg-white border border-gray-100 shadow-sm"
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <div className="relative w-12 md:w-16 h-10 md:h-12 rounded-xl bg-white border border-gray-400 shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden flex items-center justify-center shrink-0">
                            <img src={mImg} className="w-8 md:w-10 relative z-10" alt="Logo Icon" />
                        </div>

                        <div className="flex items-center w-full bg-white border-[0.3px] border-black/50 
                                rounded-full px-4 md:px-10 py-2 md:py-3 shadow-[0_2px_6px_rgba(0,0,0,0.12)]">
                            <img src={seaImg} className="w-5 h-5 md:w-6 md:h-6 mr-2 opacity-70" alt="Search" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-transparent outline-none text-[16px] text-black placeholder-black opacity-80"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between w-full md:w-auto gap-4">
                        <div className="flex items-center gap-2 md:gap-3">
                            <img src={settImg} className="w-14 md:w-18 h-10 md:h-14 opacity-80" alt="Settings" />
                            <div className="w-12 md:w-14 h-8 md:h-10 bg-white border-black/50 rounded-full shadow-[0_10px_20px_rgba(10,0,0,0.2)] rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50 transition">
                                <img src={imImg} className="w-8 md:w-10 h-6 md:h-8 opacity-80" alt="Notification" />
                            </div>
                        </div>

                        <div className="relative" ref={menuRef}>
                            <div
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-2 md:gap-4 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-xl px-2 md:px-4 py-1 cursor-pointer hover:bg-gray-50 transition-all"
                            >
                                <span className="hidden sm:inline text-[16px] md:text-[18px] font-semibold text-gray-700">Dasy William</span>
                                <img src={phImg} className="w-9 h-9 md:w-11 md:h-11 rounded-full border-black/50 shadow-[0_2px_6px_rgba(0,0,0,0.12)] object-cover" alt="User Profile" />
                            </div>

                            <AnimatePresence>
                                {open && !openProfile && (
                                    <DasyWilliam setOpenProfile={setOpenProfile} />
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div className="px-2">
                    {/* Header */}
                    <div className="mb-6 md:mb-8">
                        <h1 className="text-[24px] md:text-[32px] font-bold text-gray-900 leading-tight">Rejected Doctors</h1>
                        <p className="text-[14px] md:text-[16px] text-gray-500 font-medium">Recently rejected applications</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div className="bg-white rounded-[24px] p-4 md:p-6 flex items-center gap-4 md:gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border-[0.5px] border-black/10 transition-transform hover:scale-[1.02]">
                            <div className="w-16 md:w-20 h-16 md:h-20 rounded-full bg-[#EBF1FF] flex items-center justify-center shrink-0">
                                <img src={recImg} className="w-8 md:w-10 h-8 md:h-10 opacity-70" alt="Total Rejected Icon" />
                            </div>
                            <div>
                                <h3 className="text-[14px] md:text-[18px] font-semibold text-gray-600">Total Rejected Doctors</h3>
                                <p className="text-[32px] md:text-[40px] font-semibold text-gray-900 leading-none">150</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-[24px] p-4 md:p-6 flex items-center gap-4 md:gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border-[0.5px] border-black/10 transition-transform hover:scale-[1.02]">
                            <div className="w-16 md:w-20 h-16 md:h-20 rounded-full bg-[#FFEAEB] flex items-center justify-center shrink-0">
                                <img src={redImg} className="w-8 md:w-10 h-8 md:h-10 opacity-70 " alt="Rejected Icon" />
                            </div>
                            <div>
                                <h3 className="text-[14px] md:text-[18px] font-semibold text-gray-600">Rejected Today</h3>
                                <p className="text-[32px] md:text-[40px] font-semibold text-gray-900 leading-none">5</p>
                            </div>
                        </div>
                    </div>



                    {/* Filter Bar */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 py-6 border-y-[1px] border-black/10 mb-10">
                        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                            {/* Search Input */}
                            <div className="relative w-full lg:w-[280px]">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search doctors..."
                                    className="w-full bg-white border border-black/20 rounded-xl py-2.5 md:py-3 pl-12 pr-4 text-[14px] md:text-[16px] outline-none focus:border-[#70A5AF] transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Filter Selects */}
                            <div className="relative w-full sm:w-auto sm:min-w-[180px]">
                                <select
                                    className="w-full bg-white border border-black/20 rounded-xl py-2.5 md:py-3 px-4 pr-10 text-[14px] md:text-[16px] font-medium text-gray-700 outline-none appearance-none hover:bg-gray-50 cursor-pointer"
                                    value={filterReason}
                                    onChange={(e) => setFilterReason(e.target.value)}
                                >
                                    <option>Filter: All Reasons</option>
                                    <option>License Expired</option>
                                    <option>Fake Information</option>
                                    <option>Incomplete Profile</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                            </div>

                            <div className="relative w-full sm:w-auto sm:min-w-[160px]">
                                <select
                                    className="w-full bg-white border border-black/20 rounded-xl py-2.5 md:py-3 px-4 pr-10 text-[14px] md:text-[16px] font-medium text-gray-700 outline-none appearance-none hover:bg-gray-50 cursor-pointer"
                                    value={filterDays}
                                    onChange={(e) => setFilterDays(e.target.value)}
                                >
                                    <option>Last 2 Days</option>
                                    <option>Last 7 Days</option>
                                    <option>Last 30 Days</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                            </div>
                        </div>

                        <button className="w-12 h-12 bg-white border border-black/20 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                            <Settings className="text-gray-600 w-6 h-6" />
                        </button>
                    </div>

                    {/* Doctors Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 pb-10">
                        {rejectedDoctors.map((doc, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] border-[0.5px] border-black/10 flex flex-col group hover:shadow-xl transition-all duration-300"
                            >
                                {/* Doctor Profile Part */}
                                <div className="p-5 flex flex-col items-center">
                                    <div className="w-24 h-32 rounded-lg overflow-hidden mb-4 border border-black/5 bg-gray-50 shadow-inner">
                                        <img src={doc.image} className="w-full h-full object-cover grayscale-[20%]" alt={doc.name} />
                                    </div>
                                    <div className="w-full">
                                        <h3 className="text-[18px] font-bold text-gray-800 mb-4 truncate text-center">{doc.name}</h3>
                                        <div className="h-[1px] bg-black/10 w-full mb-4"></div>

                                        <div className="space-y-1 mb-6 px-1">
                                            <p className="text-[14px] font-semibold text-gray-500">Applied: <span className="text-gray-900 font-bold">{doc.applied}</span></p>
                                            <p className="text-[14px] font-semibold text-gray-500">Rejected: <span className="text-gray-900 font-bold">{doc.rejected}</span></p>
                                        </div>


                                        {/* Reason Box */}
                                        <div className={`
                                            rounded-xl border-[0.5px] p-2 mb-6 flex flex-col gap-1
                                            ${doc.type === 'expired' ? 'bg-[#FFF2F2] border-[#FFBDBD]' :
                                                doc.type === 'fake' ? 'bg-[#FFF2F2] border-[#FFBDBD]' :
                                                    'bg-[#FFF2F2] border-[#FFBDBD]'}
                                        `}>
                                            <div className="flex items-center gap-2">
                                                {doc.type === 'expired' ? <XCircle className="w-5 h-5 text-red-500" /> :
                                                    doc.type === 'fake' ? <AlertCircle className="w-5 h-5 text-red-500" /> :
                                                        <Info className="w-5 h-5 text-red-500" />}
                                                <span className="font-bold text-red-600 uppercase text-[13px] tracking-wide">{doc.reason}</span>
                                            </div>
                                            <p className="text-[12px] font-medium text-gray-500 leading-tight pl-7">
                                                {doc.reasonDetail}
                                            </p>

                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-3 w-full border-t border-black/10 pt-4 px-1">
                                            <button className="flex-1 py-1.5 border border-red-500 rounded-full text-red-500 text-[14px] font-bold flex items-center justify-center gap-1 hover:bg-red-50 transition-colors">
                                                <Trash2 className="w-3.5 h-3.5" />
                                                Delete
                                            </button>
                                            <button className="flex-1 py-1.5 border border-gray-400 rounded-full text-gray-700 text-[14px] font-bold flex items-center justify-center gap-1 hover:bg-gray-50 transition-colors">
                                                <MessageSquare className="w-3.5 h-3.5" />
                                                Send feedback
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Reject_doctor;
