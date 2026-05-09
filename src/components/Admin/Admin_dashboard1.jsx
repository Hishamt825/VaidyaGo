import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DasyWilliam from "./DasyWilliam";
import Profile from "./Profile";
import Notification from "../Patient/notification";
import apiFetch from "../../api";
import BASE_URL from "../../baseUrl";

import AdminSidebar from "./AdminSidebar";
import { AnimatePresence, motion } from "framer-motion";
// import plus from "../../assets/plus.png";
import ap from "../../assets/ap.png";
import admin1 from "../../assets/admin1.png";
import add2 from "../../assets/add2.png";
import doImg from "../../assets/do.png";
import active1 from "../../assets/active1.png";
import person4 from "../../assets/person4.png";
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
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const menuRef = useRef(null);
    const [showFullApproval, setShowFullApproval] = useState(false);
    const [showFullActivity, setShowFullActivity] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [expandedApprovalId, setExpandedApprovalId] = useState(1);
    const [isLoadingDoctors, setIsLoadingDoctors] = useState(true);
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState("");
    const [filterStatus, setFilterStatus] = useState("pending");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [recentActivities, setRecentActivities] = useState([
        { id: 1, date: "28-01-2026", patient: "Arti yadav", doctor: "Dr. Sumaiya Javed", status: "Completed", type: "Checkup" },
        { id: 2, date: "28-01-2026", patient: "Arti yadav", doctor: "Dr. Sumaiya Javed", status: "Completed", type: "Emergency" },
        { id: 3, date: "28-01-2026", patient: "Arti yadav", doctor: "Dr. Sumaiya Javed", status: "Completed", type: "Routine" },
        { id: 4, date: "28-01-2026", patient: "Arti yadav", doctor: "Dr. Sumaiya Javed", status: "Completed", type: "Consultation" },
        { id: 5, date: "27-01-2026", patient: "Rahul Kumar", doctor: "Dr. Vivek Sharma", status: "Cancelled", type: "Checkup" },
        { id: 6, date: "27-01-2026", patient: "Anjali Singh", doctor: "Dr. Anjali Gupta", status: "Completed", type: "Checkup" },
        { id: 7, date: "26-01-2026", patient: "Vikram Mehta", doctor: "Dr. Rahul Singh", status: "Completed", type: "Surgery" },
        { id: 8, date: "26-01-2026", patient: "Sneha Kapur", doctor: "Dr. Sneha Paul", status: "In Progress", type: "Therapy" },
    ]);
    const [month, setMonth] = useState(0); // January
    const [year, setYear] = useState(2025);
    const [selectedDate, setSelectedDate] = useState(13);
    const [active, setActive] = useState("Dashboard");
    const [selectedWeekDay, setSelectedWeekDay] = useState("Friday");
    const [activeDayIndex, setActiveDayIndex] = useState(2);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isMonthOpen, setIsMonthOpen] = useState(false);
    const [isYearOpen, setIsYearOpen] = useState(false);
    const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const yearsList = Array.from({ length: 26 }, (_, i) => 2005 + i);
    const [showRejectConfirm, setShowRejectConfirm] = useState(false);
    const [showReasonModal, setShowReasonModal] = useState(false);
    const [selectedDoctorForReject, setSelectedDoctorForReject] = useState(null);
    const [rejectionReason, setRejectionReason] = useState("Document Not Correct");
    const [rejectionFeedback, setRejectionFeedback] = useState("The documents uploaded for verification are incorrect.Please ensure all documents are complete and accurate.");
    const [attachedFile, setAttachedFile] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedDoctorForDetail, setSelectedDoctorForDetail] = useState(null);
    const [showRejectedStatusModal, setShowRejectedStatusModal] = useState(false);
    const [previewDocUrl, setPreviewDocUrl] = useState(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    
    // New states for dynamic counts and specialty filtering
    const [counts, setCounts] = useState({
        total: 0,
        active: 0,
        pending: 0,
        rejected: 0
    });
    const [approvedDoctorsList, setApprovedDoctorsList] = useState([]);
    const [activeSpecialtyTab, setActiveSpecialtyTab] = useState("ALL");
    const [openType, setOpenType] = useState("grid");
    const fileInputRef = useRef(null);
    const approvalRef = useRef(null);



    const fetchDoctors = async (status = "pending") => {
        try {
            setIsLoadingDoctors(true);
            const endpoint = status === "approved" ? "approved" : status === "rejected" ? "rejected" : "pending";
            const response = await apiFetch(`${BASE_URL}/accounts/doctors/${endpoint}/`);

            if (response.ok) {
                const data = await response.json();
                console.log(`${status} Doctors successfully fetched:`, data);
                setDoctors(data);
            } else {
                const errorText = await response.text();
                console.error(`Failed to fetch ${status} doctors. Status: ${response.status}, Response: ${errorText}`);
                if (response.status === 403) {
                    alert(`Access Denied (403): Your account does not have Admin permissions to view ${status} doctors.`);
                } else {
                    alert(`Failed to fetch ${status} doctors. Status: ${response.status}`);
                }
            }
        } catch (err) {
            console.error(`Error fetching ${status} doctors:`, err);
            alert(`Error fetching ${status} doctors: ${err.message}`);
        } finally {
            setIsLoadingDoctors(false);
        }
    };

    const fetchAllCountsAndApprovedList = async () => {
        try {
            // Fetch All, Pending, Approved, Rejected to calculate counts
            const [pendingRes, approvedRes, rejectedRes] = await Promise.all([
                apiFetch(`${BASE_URL}/accounts/doctors/pending/`),
                apiFetch(`${BASE_URL}/accounts/doctors/approved/`),
                apiFetch(`${BASE_URL}/accounts/doctors/rejected/`)
            ]);

            let pending = [], approved = [], rejected = [];
            if (pendingRes.ok) pending = await pendingRes.json();
            if (approvedRes.ok) approved = await approvedRes.json();
            if (rejectedRes.ok) rejected = await rejectedRes.json();

            setCounts({
                total: pending.length + approved.length + rejected.length,
                active: approved.length,
                pending: pending.length,
                rejected: rejected.length
            });

            setApprovedDoctorsList(approved);
        } catch (err) {
            console.error("Error fetching counts:", err);
        }
    };

    const fetchRecentActivities = async () => {
        try {
            // Fetch all appointments for today/recently to show in activities
            const url = `${BASE_URL}/api/appointments/list/`; // No filters to get recent ones
            const response = await apiFetch(url);
            if (response.ok) {
                const data = await response.json();
                const mapped = data.slice(0, 10).map(appt => ({
                    id: appt.id,
                    date: new Date(appt.start_time).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-'),
                    patient: appt.patient_name || 'N/A',
                    doctor: appt.doctor_name || 'N/A',
                    status: appt.status.charAt(0).toUpperCase() + appt.status.slice(1),
                    type: appt.appointment_type || 'General'
                }));
                setRecentActivities(mapped);
            }
        } catch (error) {
            console.error("Error fetching recent activities:", error);
        }
    };

    useEffect(() => {
        fetchDoctors(filterStatus);
        fetchAllCountsAndApprovedList();
        fetchRecentActivities();
    }, [filterStatus]);
        // Logic to restore doctor status
    const handleRestoreDoctor = (doctorId) => {
        setDoctors(prev => prev.map(doc =>
            doc.id === doctorId ? { ...doc, status: "pending" } : doc
        ));
        setShowRejectedStatusModal(false);
        setSelectedDoctorForReject(null);
        navigate('/reject_doctor');
    };

    const handleDoctorClick = (doctor) => {
        setSelectedDoctorForDetail(doctor);
        setShowDetailModal(true);
    };

    const handleApproveDoctor = async (doctor) => {
        if (!doctor) return;

        // u_* IDs are doctors who registered but haven't filled their profile forms yet
        if (String(doctor.id).startsWith('u_')) {
            alert(`Dr. ${doctor.name} has not completed their profile forms yet. Cannot approve until the profile is submitted.`);
            return;
        }

        const url = `${BASE_URL}/accounts/doctors/approve/${doctor.id}/`;

        try {
            const response = await apiFetch(url, { method: "POST" });

            if (response.ok) {
                setDoctors(prev => prev.filter(d => d.id !== doctor.id));
                alert(`Doctor ${doctor.name} approved successfully!`);
                setShowDetailModal(false);
            } else {
                const errData = await response.json().catch(() => ({}));
                alert(errData?.error || "Failed to approve doctor.");
            }
        } catch (error) {
            console.error("Approval Error:", error);
            alert("Network error occurred.");
        }
    };

    // Logic to confirm rejection and update status
    const handleRejectSubmit = async () => {
        if (!selectedDoctorForReject) return;

        // u_* IDs are doctors who registered but haven't filled their profile forms yet
        if (String(selectedDoctorForReject.id).startsWith('u_')) {
            alert(`Dr. ${selectedDoctorForReject.name} has not completed their profile forms yet. Cannot reject until the profile is submitted.`);
            setShowReasonModal(false);
            setShowRejectConfirm(false);
            return;
        }

        const url = `${BASE_URL}/accounts/doctors/reject/${selectedDoctorForReject.id}/`;

        try {
            const response = await apiFetch(url, {
                method: "POST",
                body: JSON.stringify({
                    reason: rejectionReason,
                    message: rejectionFeedback
                })
            });

            if (response.ok) {
                setDoctors(prev => prev.filter(d => d.id !== selectedDoctorForReject.id));
                setShowReasonModal(false);
                setShowRejectedStatusModal(true);
            } else {
                const errData = await response.json().catch(() => ({}));
                alert(errData?.error || "Failed to reject doctor.");
            }
        } catch (error) {
            console.error("Rejection Error:", error);
            alert("Network error occurred.");
        }
    };

    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [isUpcomingLoading, setIsUpcomingLoading] = useState(false);

    const generateUpcomingDays = () => {
        const days = [];
        const today = new Date();
        // Adjust to a reasonable range, e.g., surrounding today
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(today.getDate() + i - 2); 
            days.push({
                name: d.toLocaleDateString('en-US', { weekday: 'short' }),
                date: d.getDate() + (d.getDate() % 10 === 1 && d.getDate() !== 11 ? 'st' : d.getDate() % 10 === 2 && d.getDate() !== 12 ? 'nd' : d.getDate() % 10 === 3 && d.getDate() !== 13 ? 'rd' : 'th'),
                fullDay: d.toLocaleDateString('en-US', { weekday: 'long' }),
                fullDate: d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                isoDate: d.toISOString().split('T')[0]
            });
        }
        return days;
    };

    const [upcomingDays] = useState(generateUpcomingDays());

    const fetchUpcomingAppointments = async () => {
        setIsUpcomingLoading(true);
        try {
            const selectedDay = upcomingDays[activeDayIndex];
            const url = `${BASE_URL}/api/appointments/list/?date=${selectedDay.isoDate}`;
            const response = await apiFetch(url);
            if (response.ok) {
                const data = await response.json();
                setUpcomingAppointments(data);
            }
        } catch (error) {
            console.error("Error fetching upcoming appointments:", error);
        } finally {
            setIsUpcomingLoading(false);
        }
    };

    useEffect(() => {
        fetchUpcomingAppointments();
    }, [activeDayIndex]);

    // Adjusted initial index to match Friday (index 2)

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

    const [activeDateIndex, setActiveDateIndex] = useState(17); // Default selection
    const [dateStyle, setDateStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
    const dateRefs = useRef([]);
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
        <div className="flex h-screen bg-white overflow-hidden">

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
                                <span className="text-[18px] font-semibold text-gray-700">{localStorage.getItem("user_full_name") || "Admin"}</span>
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
                                onClick={() => navigate('/Appointment2')}
                                className="bg-[#F4E045]/10 shadow-[0_2px_12px_rgba(0,0,0,0.05)] border-[1.2px] border-gray-300 rounded-[16px] p-4 h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-lg cursor-pointer overflow-hidden"
                            >
                                <div>
                                    <div className="flex items-center gap-2 mt-[-10px]">
                                        <div className="bg-white/80 w-15 h-15 rounded-full flex items-center justify-center shadow-sm border border-[#F4E045]/20">
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

                            {/* CARD 2 - PENDING DOCTORS */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                onClick={() => navigate('/admin-doctor?view=pending')}
                                className="bg-[#E542CD]/10 shadow-[0_2px_12px_rgba(0,0,0,0.05)] border-[1.2px] border-gray-300 rounded-[16px] p-4 h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-lg cursor-pointer overflow-hidden"
                            >
                                <div>
                                    <div className="flex items-center gap-2 mt-[-10px]">
                                        <div className="bg-white/80 w-15 h-15 rounded-full flex items-center justify-center shadow-sm border border-[#E542CD]/20">
                                            <img src="/assets/pers.png" className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-[18px] font-semibold text-black">Pending Doctors</h3>
                                    </div>

                                    <h2 className="text-[48px] font-normal text-black leading-none mt-3">{counts.pending}</h2>
                                </div>

                                <div className="flex justify-between items-center mt-8">
                                    <span className="text-[14px] text-gray-600 font-medium">Awaiting Approval</span>
                                </div>
                            </motion.div>

                            {/* CARD 3 - REJECTED DOCTORS */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                onClick={() => navigate('/admin-doctor?view=rejected')}
                                className="bg-[#1CF0FE]/10 shadow-[0_2px_12px_rgba(0,0,0,0.05)] border-[1.2px] border-gray-300 rounded-[16px] p-4 h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-lg cursor-pointer overflow-hidden"
                            >
                                <div>
                                    <div className="flex items-center gap-2 mt-[-10px]">
                                        <div className="bg-white/80 w-15 h-15 rounded-full flex items-center justify-center shadow-sm border border-[#1CF0FE]/20">
                                            <img src="/assets/arr.png" className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-[18px] font-semibold text-gray-700">Rejected Doctors</h3>
                                    </div>

                                    <h2 className="text-[48px] font-normal text-black leading-none mt-3">{counts.rejected}</h2>
                                </div>

                                <div className="flex justify-between items-center mt-8">
                                    <span className="text-[14px] text-gray-600 font-medium">Action Required</span>
                                </div>
                            </motion.div>

                            {/* CARD 4 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                onClick={() => navigate('/admin-doctor')}
                                className="bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] border-[1.2px] border-gray-300 rounded-[16px] p-4 h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-lg cursor-pointer overflow-hidden"
                            >
                                <h3 className="text-[18px] font-semibold text-gray-700 mt-[-10px]">Total Doctors</h3>

                                <div className="flex items-end justify-between flex-1 mt-1 px-0 relative">
                                    <img src={doImg} className="h-[150px] object-contain -ml-3 mb-[-13px]" />
                                    <h2 className="text-[48px] font-normal text-black leading-none mr-4 mb-4">{counts.total}</h2>
                                </div>
                            </motion.div>

                            {/* CARD 5 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                onClick={() => navigate('/admin-doctor?view=active')}
                                className="bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] border-[1.2px] border-gray-300 rounded-[16px] p-4 h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-lg cursor-pointer overflow-hidden"
                            >

                                <h3 className="text-[18px] font-semibold text-gray-700 mt-[-10px]">Active Doctors</h3>

                                <div className="flex items-end justify-between flex-1 mt-1 px-0 relative">
                                    <img src={active1} className="h-[140px] object-contain -ml-3 mb-[-13px]" />
                                    <h2 className="text-[48px] font-normal text-black leading-none mr-4 mb-4">{counts.active}</h2>
                                </div>
                            </motion.div>

                            {/* CARD 6 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                onClick={() => navigate('/Adddoctor')}
                                className="bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] border-[1.2px] border-gray-300 rounded-[16px] p-4 h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-lg cursor-pointer overflow-hidden"
                            >
                                <h3 className="text-[18px] font-semibold text-gray-700 mt-[-10px]">Add Doctors</h3>

                                <div className="flex justify-center items-end flex-1">
                                    <img src={add2} className="h-[140px] object-contain" />
                                </div>
                            </motion.div>

                        </div>
                    </div>

                    {/* CALENDAR */}
                    <div className="col-span-1 lg:col-span-4 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] border-[1.2px] border-gray-300 rounded-[16px] p-4 flex flex-col min-h-[400px] overflow-hidden">
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
                                    Hello {localStorage.getItem("user_full_name") || "Admin"}
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
                            <div className="bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] border-[1.2px] border-gray-300 rounded-[16px] p-4 min-h-[200px] relative overflow-hidden">
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
                        <div className="bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] border-[1.2px] border-gray-300 rounded-[16px] p-4 flex flex-col h-full min-h-[420px] overflow-hidden">

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

                                <div className="flex-1 flex justify-around items-center h-[60px]">
                                    {upcomingDays.map((day, index) => {
                                        const isActive = index === activeDayIndex;
                                        return (
                                            <div
                                                key={index}
                                                onClick={() => setActiveDayIndex(index)}
                                                className={`cursor-pointer transition-all duration-300 flex flex-col items-center justify-center
                                                    ${isActive
                                                        ? 'px-4 py-2 rounded-lg bg-[#7DB1BC] shadow-md min-w-[150px]'
                                                        : 'opacity-50 hover:opacity-100 px-2'}`}
                                            >
                                                <p className={`font-bold transition-all ${isActive ? 'text-black text-[15px]' : 'text-gray-500 text-[14px]'}`}>
                                                    {isActive ? day.fullDay : day.name}
                                                </p>
                                                <p className={`transition-all ${isActive ? 'text-[12px] text-black font-semibold' : 'text-gray-400 text-[13px]'}`}>
                                                    {isActive ? day.fullDate : day.date}
                                                </p>
                                            </div>
                                        );
                                    })}
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
                            <div className="space-y-3 mt-6 flex-1 overflow-y-auto custom-scrollbar pr-1">
                                {isUpcomingLoading ? (
                                    <div className="flex justify-center py-10">
                                        <div className="w-8 h-8 border-4 border-[#19718A] border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                ) : upcomingAppointments.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-10 opacity-40">
                                        <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-[14px] font-bold">No appointments found</p>
                                    </div>
                                ) : (
                                    upcomingAppointments.map((appt, idx) => (
                                        <div key={appt.id || idx}
                                            className="flex items-center justify-between px-3 py-2 rounded-[12px] shadow-[0_2px_12px_rgba(0,0,0,0.05)] border-[1.2px] border-gray-300 relative overflow-hidden h-[64px]"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#19718A]/5 to-[#19718A]/10"></div>

                                            <div className="flex items-center gap-2 relative z-10">
                                                <div className="w-11 h-11 rounded-lg overflow-hidden bg-[#399CAA]">
                                                    <img src="/assets/admin.png" className="w-full h-full object-cover" alt="" />
                                                </div>

                                                <div>
                                                    <h4 className="text-[14px] font-bold text-gray-800 leading-none mb-1">
                                                        {appt.patient_name || "Unknown Patient"}
                                                    </h4>
                                                    <p className="text-[11px] font-bold text-gray-500">
                                                        {appt.appointment_type || "Regular Checkup"}
                                                    </p>
                                                    <div className="flex items-center gap-1 bg-[#19718A] text-white px-2 py-[2px] rounded-md w-fit mt-1">
                                                        <span className="text-[9px] font-bold">
                                                            {new Date(appt.start_time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm relative z-10 hover:bg-gray-50 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#19718A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeWidth={2.5} d="M3 5a2 2 0 012-2h3l2 5-2 1a11 11 0 005 5l1-2 5 2v3a2 2 0 01-2 2h-1C9 21 3 15 3 7V5z" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* VIEW MORE */}
                            <div className="text-right mt-4">
                                <button
                                    onClick={() => navigate('/Appointment2')}
                                    className="text-[14px] font-semibold text-[#19718A]"
                                >
                                    View More
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* ================= APPROVAL SECTION ================= */}
                    <div className="col-span-12 -mt-3" ref={approvalRef}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-[20px] text-gray-900 tracking-tight">
                                Approval Section
                            </h3>
                            <div className="relative">
                                <button 
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 flex items-center gap-2 border border-gray-200">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                    <span className="text-sm font-semibold capitalize">{filterStatus}</span>
                                </button>
                                
                                {isFilterOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[100]">
                                        {["pending", "approved", "rejected"].map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => {
                                                    setFilterStatus(status);
                                                    setIsFilterOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-2 text-sm font-semibold transition-colors ${filterStatus === status ? 'text-[#19718A] bg-[#19718A]/5' : 'text-gray-600 hover:bg-gray-50'}`}
                                            >
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] border-[1.2px] border-gray-300 rounded-[16px] p-4 overflow-x-auto">
                            {!showFullApproval ? (
                                <div className="min-w-[800px]">
                                    {/* HEADER */}
                                    <div className="grid grid-cols-[2.2fr_1.3fr_1fr_0.9fr_1fr] text-[14px] font-bold text-gray-500 px-4 py-2 mb-2">
                                        <div>Doctor Name</div>
                                        <div>Phone Number</div>
                                        <div className="text-center">Experience</div>
                                        <div className="text-center">Action</div>
                                        <div className="text-center">Status</div>
                                    </div>

                                    <div className="space-y-2">
                                        {isLoadingDoctors ? (
                                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                                <div className="w-12 h-12 border-4 border-[#1b738c] border-t-transparent rounded-full animate-spin"></div>
                                                <p className="text-gray-400 font-medium animate-pulse">Fetching Registration Requests...</p>
                                            </div>
                                        ) : doctors.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-20 gap-3 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
                                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                                                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <p className="text-gray-500 font-bold text-lg">No Pending Approvals</p>
                                                <p className="text-gray-400 text-sm">All registration requests have been processed.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                            <AnimatePresence>
                                                {doctors.slice(0, 3).map((doctor) => (
                                                        <motion.div
                                                        key={doctor.id}
                                                        layout
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, scale: 0.95 }}
                                                        onClick={() => {
                                                            setSelectedDoctorForDetail(doctor);
                                                            setShowDetailModal(true);
                                                        }}
                                                        className="grid grid-cols-[2.2fr_1.3fr_1fr_0.9fr_1fr] items-center px-4 py-3 border-[1.2px] border-gray-300 rounded-[16px] hover:bg-gray-50 transition-all shadow-sm cursor-pointer"
                                                    >
                                                        {/* DOCTOR */}
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-11 h-11 rounded-full overflow-hidden border transition-all">
                                                                <img src={person4} className="w-full h-full object-cover" alt="" />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-[16px] text-gray-800 leading-tight">{doctor.name || "Unknown Doctor"}</p>
                                                                <p className="text-[12px] text-gray-500">{doctor.specialization || "General Practitioner"}</p>
                                                            </div>
                                                        </div>

                                                        {/* PHONE */}
                                                        <div className="text-[14px] font-semibold text-gray-700">
                                                            {doctor.phone || "1234567890"}
                                                        </div>

                                                        {/* EXPERIENCE */}
                                                        <div className="text-[14px] font-semibold text-gray-700 text-center">
                                                            {doctor.experience || "N/A"}
                                                        </div>

                                                        {/* ACTION */}
                                                        <div className="flex justify-center gap-2">
                                                            {['pending', 'incomplete', 'new_registration'].includes(doctor.status) ? (
                                                                <>
                                                                    <button 
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleApproveDoctor(doctor);
                                                                        }}
                                                                        className="w-[38px] h-[38px] bg-white border border-gray-300 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition">
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
                                                                        className="w-[38px] h-[38px] bg-white border border-gray-300 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition">
                                                                        <svg className="w-[20px] h-[20px] text-[#EF4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                            <polyline points="3 6 5 6 21 6" />
                                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                                            <line x1="9" y1="11" x2="9" y2="17" />
                                                                            <line x1="12" y1="11" x2="12" y2="17" />
                                                                            <line x1="15" y1="11" x2="15" y2="17" />
                                                                        </svg>
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <button 
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setSelectedDoctorForDetail(doctor);
                                                                        setShowDetailModal(true);
                                                                    }}
                                                                    className="px-3 py-1 bg-white border border-[#19718A] text-[#19718A] text-[12px] font-bold rounded-lg hover:bg-[#19718A] hover:text-white transition-all shadow-sm">
                                                                    View Detail
                                                                </button>
                                                            )}
                                                        </div>

                                                        {/* STATUS */}
                                                        <div className="flex justify-center">
                                                            <span className={`px-4 py-1 text-xs font-semibold rounded-full ${
                                                                doctor.status === 'active' || doctor.status === 'approved' ? 'bg-[#22C55E]' : 
                                                                ['pending', 'incomplete', 'new_registration'].includes(doctor.status) ? 'bg-[#3B82F6]' : 'bg-[#EF4444]'
                                                            } text-white`}>
                                                                {doctor.status === 'active' || doctor.status === 'approved' ? 'Active' : 
                                                                 ['pending', 'incomplete', 'new_registration'].includes(doctor.status) ? 'Pending' : 'InActive'}
                                                            </span>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                        )}
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
                                    <div className="grid grid-cols-[2.2fr_1.3fr_1.2fr_1fr_1.1fr] text-[14px] font-bold text-gray-500 px-6 py-2 mb-2">
                                        <div>Doctor Name</div>
                                        <div>Phone Number</div>
                                        <div>Experience</div>
                                        <div className="text-center">Action</div>
                                        <div className="text-center">Status</div>
                                    </div>

                                    {/* LIST ITEMS */}
                                    <div className="space-y-4">
                                        {doctors.map((doctor) => (
                                            <div 
                                                key={doctor.id} 
                                                onClick={() => {
                                                    setSelectedDoctorForDetail(doctor);
                                                    setShowDetailModal(true);
                                                }}
                                                className={`bg-white rounded-[16px] border-[1.2px] border-gray-300 transition-all duration-300 cursor-pointer ${expandedApprovalId === doctor.id ? 'shadow-md ring-1 ring-[#19718A]/10' : 'shadow-sm hover:bg-gray-50'}`}
                                            >

                                                {/* MAIN ROW */}
                                                <div className="grid grid-cols-[2.2fr_1.3fr_1.2fr_1fr_1.1fr] items-center px-4 py-3 transition-all duration-300">

                                                    {/* Doctor Info */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-11 h-11 rounded-full overflow-hidden border border-gray-100 bg-gray-50 transition-all">
                                                            <img src={person4} className="w-full h-full object-cover" alt="" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-[15px] text-gray-800 leading-tight">{doctor.name || "Unknown Doctor"}</p>
                                                            <p className="text-[12px] text-gray-500 font-medium">{doctor.specialization || "General Practitioner"}</p>
                                                        </div>
                                                    </div>

                                                    {/* Phone */}
                                                    <div className="text-[14px] font-semibold text-gray-600">{doctor.phone || "1234567890"}</div>

                                                    {/* Experience */}
                                                    <div className="text-[14px] font-semibold text-gray-600">{doctor.experience || "N/A"}</div>

                                                    {/* Action */}
                                                    <div className="flex justify-center gap-3">
                                                        {['pending', 'incomplete', 'new_registration'].includes(doctor.status) ? (
                                                            <>
                                                                <button 
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleApproveDoctor(doctor);
                                                                    }}
                                                                    className="w-[38px] h-[38px] bg-white border border-gray-300 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition">
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
                                                                    className="w-[38px] h-[38px] bg-white border border-gray-300 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition">
                                                                    <svg className="w-[20px] h-[20px] text-[#EF4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                        <polyline points="3 6 5 6 21 6" />
                                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                                        <line x1="9" y1="11" x2="9" y2="17" />
                                                                        <line x1="12" y1="11" x2="12" y2="17" />
                                                                        <line x1="15" y1="11" x2="15" y2="17" />
                                                                    </svg>
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setSelectedDoctorForDetail(doctor);
                                                                    setShowDetailModal(true);
                                                                }}
                                                                className="px-4 py-1 bg-white border border-[#19718A] text-[#19718A] text-[13px] font-bold rounded-lg hover:bg-[#19718A] hover:text-white transition-all shadow-sm">
                                                                View Detail
                                                            </button>
                                                        )}
                                                    </div>

                                                    {/* Status */}
                                                    <div className="flex justify-center">
                                                        <span className={`px-5 py-1 text-[12px] font-bold rounded-full ${
                                                            doctor.status === 'active' || doctor.status === 'approved' ? 'bg-[#22C55E]' : 
                                                            ['pending', 'incomplete', 'new_registration'].includes(doctor.status) ? 'bg-[#3B82F6]' : 'bg-[#EF4444]'
                                                        } text-white shadow-sm`}>
                                                            {doctor.status === 'active' || doctor.status === 'approved' ? 'Active' : 
                                                             ['pending', 'incomplete', 'new_registration'].includes(doctor.status) ? 'Pending' : 'InActive'}
                                                        </span>
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
                                    </div>

                                    {/* VIEW LESS */}
                                    <div className="text-right mt-4">
                                        <button onClick={() => {
                                            setShowFullApproval(false);
                                            approvalRef.current?.scrollIntoView({ behavior: 'smooth' });
                                        }} className="text-[14px] font-bold text-gray-400 hover:text-[#19718A] transition-colors">
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
                            <div className="col-span-1 lg:col-span-7 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] border-[1.2px] border-gray-300 rounded-[16px] p-4 md:p-6 overflow-hidden">
                                <div className="flex justify-between items-center mb-6">
                                    <p className="text-[18px]  font-bold text-gray-700 tracking-tight">
                                        Patients by Gender
                                    </p>
                                    <div className="flex items-center gap-8">
                                        <div className="flex items-center gap-4 text-[14px] font-medium text-gray-600">
                                            <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-full bg-[#2A8496]"></span>Male</div>
                                            <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-full bg-[#0B1A42]"></span>Female</div>
                                        </div>
                                        <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 text-[14px] text-gray-600 font-medium bg-[#F9FAFB] hover:bg-gray-100 shadow-sm">
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
                                <div className="bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] border-[1.2px] border-gray-300 rounded-[16px] pt-5 overflow-hidden flex flex-col h-[200px] relative">
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
                                <div className="bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] border-[1.2px] border-gray-300 rounded-[16px] pt-5 overflow-hidden flex flex-col h-[200px] relative">
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

                        <div className="bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] border-[1.2px] border-gray-300 rounded-[16px] p-4 overflow-x-auto">
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
                                    {recentActivities.slice(0, 4).map((activity, i) => (
                                        <motion.div
                                            key={activity.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="grid grid-cols-[1.2fr_1.4fr_1.6fr_1fr_0.7fr] items-center px-4 py-3 border-[1.2px] border-gray-300 rounded-[16px] hover:bg-gray-50 transition-all shadow-sm"
                                        >
                                            {/* DATE */}
                                            <div className="text-[15px] font-semibold text-gray-800">
                                                {activity.date}
                                            </div>

                                            {/* PATIENT */}
                                            <div className="text-[15px] font-semibold text-gray-800">
                                                {activity.patient}
                                            </div>

                                            {/* DOCTOR */}
                                            <div className="text-[15px] font-semibold text-gray-800">
                                                {activity.doctor}
                                            </div>

                                            {/* STATUS */}
                                            <div className="flex justify-center">
                                                <span className={`px-4 py-1.5 text-xs font-bold rounded-full text-white shadow-sm ${
                                                    activity.status === "Completed" ? "bg-[#22C55E]" : 
                                                    activity.status === "Cancelled" ? "bg-[#EF4444]" : "bg-[#3B82F6]"
                                                }`}>
                                                    {activity.status}
                                                </span>
                                            </div>

                                            {/* ACTION */}
                                            <div className="flex justify-center">
                                                <button className="w-9 h-9 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm hover:scale-110 transition active:scale-95 group">
                                                    <svg className="w-5 h-5 text-[#19718A] group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                {/* VIEW MORE */}
                                <div className="text-right mt-6">
                                    <button 
                                        onClick={() => setShowFullActivity(true)}
                                        className="px-6 py-2 rounded-xl text-[14px] font-bold text-[#19718A] hover:bg-[#19718A]/5 transition-colors flex items-center gap-2 ml-auto group"
                                    >
                                        View All Activities
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= ACTIVE DOCTORS SECTION ================= */}
                    <div className="col-span-12 mt-10 mb-20">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-[22px] text-gray-900 tracking-tight">Active Doctor Specializations</h3>
                        </div>

                        {/* Specialty Tabs */}
                        <div className="flex items-center justify-between bg-white border border-gray-300 rounded-full pl-2 pr-6 py-2 shadow-[0_2px_10px_rgba(0,0,0,0.04)] mb-8">
                            <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide flex-1">
                                {["ALL", "CARDIOLOGIST", "ORTHOPEDICS", "ONCOLOGY", "DERMATOLOGY"].map((tab, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveSpecialtyTab(tab)}
                                        className={`px-6 py-2.5 rounded-full text-[16px] font-bold tracking-wide transition-all uppercase whitespace-nowrap
                                            ${activeSpecialtyTab === tab
                                                ? "bg-[#399CAA] text-white shadow-md"
                                                : "text-[#B3B3B3] hover:text-gray-600"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center space-x-3 pl-6 ml-auto border-l border-gray-200">
                                <button onClick={() => setOpenType("grid")} className="p-1 cursor-pointer transition-all hover:scale-110">
                                    <svg className={`w-6 h-6 transition-colors ${openType === 'grid' ? 'text-[#399CAA]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
                                    </svg>
                                </button>
                                <button onClick={() => setOpenType("list")} className="p-1 cursor-pointer transition-all hover:scale-110">
                                    <svg className={`w-6 h-6 transition-colors ${openType === 'list' ? 'text-[#399CAA]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Grid View */}
                        {openType === "grid" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {approvedDoctorsList
                                    .filter(doc => activeSpecialtyTab === "ALL" || doc.specialization?.toUpperCase() === activeSpecialtyTab)
                                    .map((doc, idx) => (
                                        <motion.div 
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="bg-white border border-gray-200 rounded-[20px] flex flex-col items-center pt-6 overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 relative group"
                                        >
                                            {/* Rating Ribbon */}
                                            <div className="absolute top-4 left-0 bg-[#FFEAC2] text-[#FFA800] text-[12px] font-bold pl-3 pr-4 py-1 rounded-r-full flex items-center shadow-sm">
                                                <span className="mr-1">★</span> 4.5
                                            </div>
                                            
                                            {/* Avatar */}
                                            <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-inner mb-4 mt-2 relative border-[4px] border-[#399CAA]/10 group-hover:border-[#399CAA]/30 transition-colors">
                                                <img src={doc.image || person4} className="w-full h-full object-cover" alt="Doctor" onError={(e) => { e.target.src = person4 }} />
                                            </div>

                                            {/* Name */}
                                            <h3 className="text-[19px] font-bold text-gray-900 leading-tight mb-1">{doc.name}</h3>
                                            
                                            {/* Specialty */}
                                            <span className="bg-[#E4F2F3] text-[#399CAA] font-bold text-[13px] px-5 py-1 rounded-full uppercase tracking-wider mb-6">
                                                {doc.specialization || "General"}
                                            </span>

                                            {/* Bottom Actions */}
                                            <div className="w-full flex border-t border-gray-100">
                                                <button 
                                                    onClick={() => handleDoctorClick(doc)}
                                                    className="flex-1 py-4 text-[#5A5A5A] font-bold text-[14px] hover:bg-gray-50 transition-colors border-r border-gray-100"
                                                >
                                                    View Detail
                                                </button>
                                                <button className="flex-1 py-4 text-[#399CAA] font-bold text-[14px] hover:bg-teal-50/50 transition-colors">
                                                    Make a Call
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                {approvedDoctorsList.filter(doc => activeSpecialtyTab === "ALL" || doc.specialization?.toUpperCase() === activeSpecialtyTab).length === 0 && (
                                    <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                                        <p className="text-gray-400 font-bold text-lg">No active doctors found for this specialty.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* List View */}
                        {openType === "list" && (
                            <div className="space-y-3">
                                {approvedDoctorsList
                                    .filter(doc => activeSpecialtyTab === "ALL" || doc.specialization?.toUpperCase() === activeSpecialtyTab)
                                    .map((doc, idx) => (
                                        <motion.div 
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="bg-white border border-gray-200 px-6 py-4 rounded-2xl flex items-center justify-between hover:shadow-lg transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-5 w-[300px]">
                                                <div className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-white shadow-sm ring-2 ring-[#399CAA]/20">
                                                    <img src={doc.image || person4} className="w-full h-full object-cover" alt="" onError={(e) => { e.target.src = person4 }} />
                                                </div>
                                                <div>
                                                    <h3 className="text-[17px] font-bold text-gray-900 mb-1">{doc.name}</h3>
                                                    <div className="flex items-center gap-1 text-[#FFA800] text-[12px] font-bold bg-[#FFEAC2] px-2 py-0.5 rounded-md w-fit">
                                                        <span>★</span> 4.5
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-1 text-center">
                                                <span className="bg-[#E4F2F3] text-[#399CAA] font-bold text-[13px] px-6 py-1.5 rounded-full uppercase tracking-wider">
                                                    {doc.specialization || "General"}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <button 
                                                    onClick={() => handleDoctorClick(doc)}
                                                    className="px-6 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold text-[14px] hover:bg-gray-50 transition-all"
                                                >
                                                    Detail
                                                </button>
                                                <button className="px-6 py-2 rounded-xl bg-[#399CAA] text-white font-bold text-[14px] hover:shadow-lg transition-all">
                                                    Call
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                            </div>
                        )}
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
                                            <div className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-2 w-fit gap-4 border border-gray-300 shadow-sm animate-in fade-in slide-in-from-top-1">
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

                                            <div className="bg-gray-100/80 rounded-[12px] overflow-hidden border border-gray-300">
                                                <div className="px-6 py-3 border-b border-gray-300 text-[18px] font-bold text-gray-700">
                                                    {rejectionReason}
                                                </div>
                                                <div className="p-6 text-[16px] text-gray-600 font-medium leading-relaxed">
                                                    {rejectionFeedback}
                                                </div>
                                            </div>

                                            {attachedFile && (
                                                <div className="flex items-center justify-between bg-gray-100 rounded-lg p-3 border border-gray-300">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-10 bg-white rounded border border-gray-300 overflow-hidden flex items-center justify-center">
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
                                        <div className="bg-white border border-gray-300 rounded-[20px] overflow-hidden shadow-sm">
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
                                                    { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: "Email", value: selectedDoctorForReject?.email || "N/A" },
                                                    { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", label: "Contact", value: selectedDoctorForReject?.phone || "N/A" },
                                                    { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", label: "Experience", value: selectedDoctorForReject?.experience || "N/A" },
                                                    { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", label: "Registration No", value: selectedDoctorForReject?.license_no || "N/A" }
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

                                            {/* Return Link */}
                                            <div className="p-5 pt-0">
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
                {isNotificationOpen && <Notification onClose={() => setIsNotificationOpen(false)} />}
                {/* Activity Modal */}
                <AnimatePresence>
                    {showFullActivity && (
                        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-white rounded-[32px] w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
                            >
                                {/* Header */}
                                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-[#F7F9FB]">
                                    <div>
                                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Hospital Activity Log</h2>
                                        <p className="text-gray-500 font-medium mt-1">Detailed history of all hospital interactions and appointments.</p>
                                    </div>
                                    <button 
                                        onClick={() => setShowFullActivity(false)}
                                        className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm group"
                                    >
                                        <svg className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>

                                {/* Table Header */}
                                <div className="px-8 py-4 bg-gray-50/50 border-b border-gray-100 grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1.2fr_0.8fr] gap-4 text-sm font-bold text-gray-400 uppercase tracking-wider">
                                    <div>Date</div>
                                    <div>Patient</div>
                                    <div>Doctor</div>
                                    <div>Type</div>
                                    <div className="text-center">Status</div>
                                    <div className="text-right">Details</div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 overflow-y-auto p-8 space-y-4">
                                    {recentActivities.map((activity, idx) => (
                                        <motion.div
                                            key={activity.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1.2fr_0.8fr] gap-4 items-center p-4 rounded-2xl border border-gray-100 hover:border-[#19718A] hover:bg-teal-50/30 transition-all group"
                                        >
                                            <div className="font-bold text-gray-700">{activity.date}</div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-[#19718A]/10 flex items-center justify-center text-[#19718A] font-bold">
                                                    {activity.patient.charAt(0)}
                                                </div>
                                                <span className="font-bold text-gray-800">{activity.patient}</span>
                                            </div>
                                            <div className="font-semibold text-gray-600">{activity.doctor}</div>
                                            <div>
                                                <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-500 text-xs font-bold uppercase tracking-tight">
                                                    {activity.type}
                                                </span>
                                            </div>
                                            <div className="flex justify-center">
                                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                                                    activity.status === "Completed" ? "bg-[#22C55E] text-white" : 
                                                    activity.status === "Cancelled" ? "bg-[#EF4444] text-white" : 
                                                    "bg-[#3B82F6] text-white"
                                                }`}>
                                                    {activity.status}
                                                </span>
                                            </div>
                                            <div className="flex justify-end">
                                                <button className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:border-[#19718A] transition-all">
                                                    <svg className="w-5 h-5 text-[#19718A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="p-8 border-t border-gray-100 bg-[#F7F9FB] flex justify-between items-center">
                                    <div className="text-gray-500 text-sm font-medium">
                                        Showing <span className="font-bold text-gray-800">{recentActivities.length}</span> entries
                                    </div>
                                    <button 
                                        onClick={() => setShowFullActivity(false)}
                                        className="px-8 py-3 bg-[#19718A] text-white font-bold rounded-2xl hover:shadow-lg hover:bg-[#155e73] transition-all"
                                    >
                                        Close Activity Log
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </main>
            {/* ================= DOCTOR DETAIL MODAL (Form 1-4 Info) ================= */}
            <AnimatePresence>
                {showDetailModal && selectedDoctorForDetail && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 md:p-6 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-[32px] w-full max-w-[1000px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Header */}
                            <div className="px-8 py-6 bg-gradient-to-r from-[#19718A] to-[#278AA3] text-white flex justify-between items-center shrink-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/30 shadow-lg bg-white/10">
                                        <img src={selectedDoctorForDetail.image} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div>
                                        <h2 className="text-[24px] font-bold leading-tight">{selectedDoctorForDetail.name}</h2>
                                        <p className="text-white/80 font-medium">{selectedDoctorForDetail.speciality || selectedDoctorForDetail.subTitle}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setShowDetailModal(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    
                                    {/* Section 1: Personal Information (Form 1) */}
                                    <div className="space-y-5">
                                        <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                                            <div className="w-8 h-8 bg-[#19718A]/10 rounded-lg flex items-center justify-center text-[#19718A]">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                            </div>
                                            <h3 className="text-[18px] font-bold text-gray-800">Personal Information</h3>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4">
                                            <InfoRow label="Full Name" value={selectedDoctorForDetail.name} />
                                            <InfoRow label="Email" value={selectedDoctorForDetail.email || "N/A"} />
                                            <InfoRow label="Phone" value={selectedDoctorForDetail.phone} />
                                            <InfoRow label="DOB" value={selectedDoctorForDetail.dob || "N/A"} />
                                            <InfoRow label="Gender" value={selectedDoctorForDetail.gender || "N/A"} />
                                            <InfoRow label="City" value={selectedDoctorForDetail.city || "N/A"} />
                                            <InfoRow label="Address" value={selectedDoctorForDetail.address || "N/A"} />
                                        </div>
                                    </div>

                                    {/* Section 2: Professional Details (Form 2) */}
                                    <div className="space-y-5">
                                        <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                                            <div className="w-8 h-8 bg-[#19718A]/10 rounded-lg flex items-center justify-center text-[#19718A]">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                            </div>
                                            <h3 className="text-[18px] font-bold text-gray-800">Professional Details</h3>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4">
                                            <InfoRow label="Employee ID" value={selectedDoctorForDetail.employee_id || "N/A"} />
                                            <InfoRow label="Specialization" value={selectedDoctorForDetail.specialization || "N/A"} />
                                            <InfoRow label="Qualification" value={selectedDoctorForDetail.qualification || "N/A"} />
                                            <InfoRow label="Experience" value={selectedDoctorForDetail.experience} />
                                            <InfoRow label="License No." value={selectedDoctorForDetail.license_no || "N/A"} />
                                            <InfoRow label="Medical Council" value={selectedDoctorForDetail.medical_council || "N/A"} />
                                        </div>
                                    </div>

                                    {/* Section 3: Hospital Information (Form 3) */}
                                    <div className="space-y-5">
                                        <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                                            <div className="w-8 h-8 bg-[#19718A]/10 rounded-lg flex items-center justify-center text-[#19718A]">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5" /></svg>
                                            </div>
                                            <h3 className="text-[18px] font-bold text-gray-800">Hospital & Fees</h3>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4">
                                            <InfoRow label="Joining Date" value={selectedDoctorForDetail.joining_date || "N/A"} />
                                            <InfoRow label="Employment" value={selectedDoctorForDetail.employment_type || "N/A"} />
                                            <InfoRow label="Consultation Fee" value={selectedDoctorForDetail.consultation_fees || "N/A"} />
                                            <InfoRow label="Leave Day" value={selectedDoctorForDetail.leave_day || "N/A"} />
                                        </div>
                                    </div>

                                    {/* Section 4: Verified Documents (Form 4) */}
                                    <div className="space-y-5">
                                        <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                                            <div className="w-8 h-8 bg-[#19718A]/10 rounded-lg flex items-center justify-center text-[#19718A]">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                            </div>
                                            <h3 className="text-[18px] font-bold text-gray-800">Verified Documents</h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { id: 'aadhaar', label: "Aadhaar Card" },
                                                { id: 'pan', label: "PAN Card" },
                                                { id: 'medical_license', label: "Medical License" },
                                                { id: 'medical_certificate', label: "Degree Certificate" },
                                                { id: 'experience_letter', label: "Experience Letter" }
                                            ].map((doc, idx) => {
                                                const docUrl = selectedDoctorForDetail.documents?.[doc.id];
                                                return (
                                                    <div 
                                                        key={idx} 
                                                        onClick={() => {
                                                            if (docUrl) {
                                                                setPreviewDocUrl(docUrl);
                                                                setIsPreviewOpen(true);
                                                            }
                                                        }}
                                                        className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all ${
                                                            docUrl 
                                                            ? 'bg-white border-[#19718A]/30 cursor-pointer hover:shadow-md hover:border-[#19718A]' 
                                                            : 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
                                                        }`}
                                                    >
                                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${docUrl ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                            {docUrl ? (
                                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M5 13l4 4L19 7" /></svg>
                                                            ) : (
                                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M6 18L18 6M6 6l12 12" /></svg>
                                                            )}
                                                        </div>
                                                        <span className={`text-[13px] font-bold truncate ${docUrl ? 'text-[#19718A]' : 'text-gray-400'}`}>
                                                            {doc.label}
                                                        </span>
                                                        {docUrl && (
                                                            <svg className="w-4 h-4 text-[#19718A] ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end items-center gap-4 shrink-0">
                                <button 
                                    onClick={() => setShowDetailModal(false)}
                                    className="px-8 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 font-bold text-[16px] hover:bg-gray-100 transition-all shadow-sm active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => handleApproveDoctor(selectedDoctorForDetail)}
                                    className="px-10 py-3 rounded-xl bg-[#19718A] text-white font-bold text-[16px] hover:bg-[#15616D] transition-all shadow-lg active:scale-95"
                                >
                                    Approve Doctor
                                </button>
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ================= DOCUMENT PREVIEW MODAL ================= */}
            <AnimatePresence>
                {isPreviewOpen && previewDocUrl && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-gray-800 font-bold">Document Preview</h3>
                                <button 
                                    onClick={() => setIsPreviewOpen(false)}
                                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                                >
                                    <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-gray-100">
                                {previewDocUrl.toLowerCase().endsWith('.pdf') ? (
                                    <iframe 
                                        src={previewDocUrl} 
                                        className="w-full h-full min-h-[600px] border-none rounded-xl"
                                        title="Document PDF"
                                    />
                                ) : (
                                    <img 
                                        src={previewDocUrl} 
                                        alt="Document Preview" 
                                        className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
                                    />
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-4 bg-white border-t border-gray-100 flex justify-end">
                                <button 
                                    onClick={() => setIsPreviewOpen(false)}
                                    className="px-6 py-2 bg-[#19718A] text-white font-bold rounded-xl hover:bg-[#15616D] transition-colors"
                                >
                                    Close Preview
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Helper Component for Modal Info Rows
const InfoRow = ({ label, value }) => (
    <div className="flex items-start text-[15px]">
        <div className="w-32 text-gray-400 font-bold shrink-0">{label}</div>
        <div className="w-4 text-gray-300 font-bold shrink-0">:</div>
        <div className="flex-1 text-gray-700 font-semibold">{value}</div>
    </div>
);

export default Admin_dashboard1;
