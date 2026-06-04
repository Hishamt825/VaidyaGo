import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';

import logoUrl from '../../assets/v.png';
import Side_app from '../Appoinment/Side_app';
import Profile from '../Admin/Profile';
import DasyWilliam from '../Admin/DasyWilliam';
import Notification from '../Patient/notification';
import { AnimatePresence, motion } from 'framer-motion';
import BASE_URL from '../../baseUrl';
import { useLanguage } from '../../context/LanguageContext';

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



// activityData moved to component state

const miniScheduleData = [
    { time: "2pm", label: "Meeting with chief physician Dr.William", completed: true },
    { time: "", label: "Consultation with Mr.White", completed: false },
    { time: "", label: "Consultation with Mrs.Misky", completed: false },
    { time: "", label: "Meeting with chief physician Dr.Warsi", completed: false },
];

const appRequestsData = [
    { name: "sita", gender: "Female", age: 30, treatment: "Regular Checkup", time: "10 am", date: "13 feb 2026" },
    { name: "sita", gender: "Female", age: 30, treatment: "Regular Checkup", time: "10 am", date: "13 feb 2026" },
    { name: "sita", gender: "Female", age: 30, treatment: "Regular Checkup", time: "10 am", date: "13 feb 2026" },
    { name: "sita", gender: "Female", age: 30, treatment: "Regular Checkup", time: "10 am", date: "13 feb 2026" },
    { name: "sita", gender: "Female", age: 30, treatment: "Regular Checkup", time: "10 am", date: "13 feb 2026" },
];



const Doctor_dashboard = () => {
    // 1. ALL HOOKS FIRST
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('Dashboard');
    const [open, setOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
    const [isPatientsModalOpen, setIsPatientsModalOpen] = useState(false);
    const [isConsultationsModalOpen, setIsConsultationsModalOpen] = useState(false);
    const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
    const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
    const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
    const [selectedRescheduleRequest, setSelectedRescheduleRequest] = useState(null);
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
    const [selectedAcceptRequest, setSelectedAcceptRequest] = useState(null);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [selectedRejectRequest, setSelectedRejectRequest] = useState(null);
    const [rejectReason, setRejectReason] = useState("");
    const [rejectNotes, setRejectNotes] = useState("");
    const menuRef = useRef(null);

    // Dashboard States
    const [activeDateIndex, setActiveDateIndex] = useState(17); // 13th
    const [isApproved, setIsApproved] = useState(true); 
    const [checkingStatus, setCheckingStatus] = useState(true);
    const [showPendingModal, setShowPendingModal] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('January');
    const [selectedYear, setSelectedYear] = useState(2025);
    const [isMonthOpen, setIsMonthOpen] = useState(false);
    const [isYearOpen, setIsYearOpen] = useState(false);
    const [dateStyle, setDateStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
    const dateRefs = useRef([]);
    const yearScrollRef = useRef(null);

    // Mobile Sidebar State
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [userName, setUserName] = useState(localStorage.getItem("user_full_name") || "Doctor");
    const { t, toggleLanguage, language } = useLanguage();

    // Activity Data State
    const [activityData, setActivityData] = useState([]);
    const [loadingActivity, setLoadingActivity] = useState(true);

    const fetchActivityData = async () => {
        const docId = localStorage.getItem("doctor_id");
        const token = localStorage.getItem("token");
        if (!docId || !token) return;

        try {
            const response = await fetch(`${BASE_URL}/api/appointments/stats/?doctor_id=${docId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setActivityData(data);
            }
        } catch (err) {
            console.error("Failed to fetch activity data:", err);
        } finally {
            setLoadingActivity(false);
        }
    };

    // Appointment Integration States
    const [appointments, setAppointments] = useState([]);
    const [loadingAppointments, setLoadingAppointments] = useState(true);
    const [timeline, setTimeline] = useState([]);
    const [loadingTimeline, setLoadingTimeline] = useState(true);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed': return "#22c55e";
            case 'pending': return "#facc15";
            case 'cancelled': return "#f87171";
            case 'outpatient': return "#38bdf8";
            default: return "#38bdf8";
        }
    };

    const fetchTimeline = async () => {
        const docId = localStorage.getItem("doctor_id");
        const token = localStorage.getItem("token");
        if (!docId || !token) return;

        try {
            const response = await fetch(`${BASE_URL}/api/appointments/list/?doctor_id=${docId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                
                // Format data for timeline
                const formatted = data.map(appt => ({
                    id: appt.id,
                    status: appt.status,
                    time: formatTime(getAppointmentStartTime(appt)),
                    label: appt.appointment_type || "Appointment",
                    patient: appt.patient_name,
                    duration: `${formatTime(getAppointmentStartTime(appt))} - ${formatTime(getAppointmentEndTime(appt))}`,
                    color: getStatusColor(appt.status)
                }));
                setTimeline(formatted);
            }
        } catch (err) {
            console.error("Failed to fetch timeline:", err);
        } finally {
            setLoadingTimeline(false);
        }
    };

    const fetchAppointments = async () => {
        const docId = localStorage.getItem("doctor_id");
        const token = localStorage.getItem("token");
        if (!docId || !token) return;

        try {
            const response = await fetch(`${BASE_URL}/api/appointments/pending/?doctor_id=${docId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setAppointments(data);
            }
        } catch (err) {
            console.error("Failed to fetch appointments:", err);
        } finally {
            setLoadingAppointments(false);
        }
    };

    const [recentPatients, setRecentPatients] = useState([]);
    const [loadingRecent, setLoadingRecent] = useState(true);

    const fetchRecentPatients = async () => {
        const docId = localStorage.getItem("doctor_id");
        const token = localStorage.getItem("token");
        if (!docId || !token) return;

        try {
            const response = await fetch(`${BASE_URL}/api/appointments/recent/?doctor_id=${docId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setRecentPatients(data);
            }
        } catch (err) {
            console.error("Failed to fetch recent patients:", err);
        } finally {
            setLoadingRecent(false);
        }
    };

    useEffect(() => {
        if (isApproved) {
            fetchAppointments();
            fetchTimeline();
            fetchRecentPatients();
            fetchActivityData();
        }
    }, [isApproved]);

    const handleAccept = (req) => {
        setSelectedAcceptRequest(req);
        setIsAcceptModalOpen(true);
    };

    const confirmAccept = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${BASE_URL}/api/appointments/${id}/accept/`, {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                }
            });
            if (response.ok) {
                setIsAcceptModalOpen(false);
                fetchAppointments(); // Refresh list
                window.dispatchEvent(new CustomEvent('chatbot-action-executed', {
                    detail: {
                        action: 'accept_appointment',
                        data: { id }
                    }
                }));
            }
        } catch (err) {
            console.error("Accept failed:", err);
        }
    };

    const handleComplete = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${BASE_URL}/api/appointments/${id}/complete/`, {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                }
            });
            if (response.ok) {
                fetchTimeline();
                fetchRecentPatients();
            }
        } catch (err) {
            console.error("Complete failed:", err);
        }
    };

    const handleDecline = (req) => {
        setSelectedRejectRequest(req);
        setIsRejectModalOpen(true);
    };

    const confirmReject = async (id) => {
        const token = localStorage.getItem("token");
        const finalReason = rejectReason + (rejectNotes ? `: ${rejectNotes}` : "");
        if (!finalReason) {
            alert("Please provide a reason for rejection.");
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/api/appointments/${id}/reject/`, {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify({ reason: finalReason })
            });
            if (response.ok) {
                setIsRejectModalOpen(false);
                setRejectReason("");
                setRejectNotes("");
                fetchAppointments(); // Refresh list
            }
        } catch (err) {
            console.error("Reject failed:", err);
        }
    };

    const getAppointmentStartTime = (req) => {
        if (!req) return null;
        return req.start_time || req.slot_details?.start_time || null;
    };

    const getAppointmentEndTime = (req) => {
        if (!req) return null;
        return req.end_time || req.slot_details?.end_time || null;
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toLowerCase();
    };

    const formatTime = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
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

    useEffect(() => {
        const checkApprovalStatus = async () => {
            const docId = localStorage.getItem("doctor_id");
            const token = localStorage.getItem("token");
            if (!docId || !token) {
                navigate("/Finallogin");
                return;
            }

            try {
                const response = await fetch(`${BASE_URL}/api/doctor-personal-info/${docId}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    const status = data.status ? data.status.toLowerCase() : 'incomplete';
                    
                    // Update user_full_name in localStorage from API data
                    if (data.first_name) {
                        const fullName = `${data.first_name} ${data.last_name || ""}`.trim();
                        localStorage.setItem("user_full_name", fullName);
                        setUserName(fullName);
                    }

                    if (status === 'approved' || status === 'active') {
                        setIsApproved(true);
                        setShowPendingModal(false);
                    } else if (status === 'pending') {
                        setIsApproved(false);
                        setShowPendingModal(true);
                    } else {
                        // Status is incomplete or other
                        navigate("/Form1");
                    }
                }
            } catch (err) {
                console.error("Status check failed:", err);
            } finally {
                setCheckingStatus(false);
            }
        };

        checkApprovalStatus();
    }, [navigate]);

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





    // 2. CONDITIONAL RENDERS LAST
    if (openProfile) {
        return <Profile setOpenProfile={setOpenProfile} />;
    }

    if (checkingStatus) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#1b738c] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-bold">Verifying Account Status...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-screen w-full bg-white overflow-hidden">
            {/* Blurred Background Wrapper */}
            <div className={`flex flex-col lg:flex-row h-full w-full font-sans text-sm text-gray-700 transition-all duration-300 ${showPendingModal ? 'blur-[3px] pointer-events-none scale-[0.99]' : ''}`}>
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
                    <div className="flex items-center justify-between w-full md:w-auto gap-4">
                        <div className="flex items-center gap-3">
                            {/* Settings */}
                            <div 
                                onClick={() => navigate('/Settingpage')}
                                className="w-14 h-12 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 group">
                                <svg className="w-7 h-7 text-gray-700 group-hover:text-[#1b738c] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
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

                            {/* Language Switcher */}
                            <div
                                onClick={toggleLanguage}
                                className="w-14 h-12 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-all text-[#1b738c] font-bold"
                            >
                                {language === 'English' ? 'EN' : 'HI'}
                            </div>
                        </div>

                        <div className="relative" ref={menuRef}>

                            {/* Profile Button */}
                            <div
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-3 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-xl px-4 py-1.5 cursor-pointer hover:bg-gray-50 transition-all group"
                            >
                                <div className="flex flex-col items-end">
                                    <span className="text-[17px] font-bold text-gray-800 leading-tight">
                                        {(() => {
                                            if (userName.toLowerCase().includes("admin") || userName.toLowerCase().includes("javedtuba")) return "Doctor";
                                            return userName;
                                        })()}
                                    </span>
                                    <span className="text-[11px] font-bold text-[#1b738c]">Doctor</span>
                                </div>
                                <div className="relative">
                                    <img src="/assets/ph.png" className="w-10 h-10 rounded-full border-2 border-[#1b738c]/20 shadow-sm object-cover" />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#22c55e] rounded-full border-2 border-white"></div>
                                </div>
                                <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>

                            <AnimatePresence>
                                {open && !openProfile && (
                                    <DasyWilliam setOpenProfile={setOpenProfile} isDoctor={true} />
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
                                <h2 className="text-[30px] font-bold text-white leading-tight">
                                    Hello Dr.{(() => {
                                        if (!userName || userName.toLowerCase().includes("admin") || userName.toLowerCase().includes("javedtuba")) return "Doctor";
                                        return userName.split(' ')[0];
                                    })()}
                                </h2>
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
                                    <div 
                                        key={i} 
                                        onClick={() => {
                                            if (t.name === 'Appointment') setIsAppointmentModalOpen(true);
                                            if (t.name === 'Total Patients') setIsPatientsModalOpen(true);
                                            if (t.name === 'Consultations') setIsConsultationsModalOpen(true);
                                            if (t.name === 'Income') setIsIncomeModalOpen(true);
                                            if (t.name === 'Emergency') setIsEmergencyModalOpen(true);
                                        }}
                                        className={`flex flex-col items-center justify-between border-[1.5px] border-gray-600 rounded-2xl bg-white aspect-[1/0.85] shadow-sm px-[4px] py-[10px] mt-[4px] ${(t.name === 'Appointment' || t.name === 'Total Patients' || t.name === 'Consultations' || t.name === 'Income' || t.name === 'Emergency') ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}`}
                                    >
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
                                            {loadingTimeline ? (
                                                <div className="flex items-center justify-center py-10">
                                                    <div className="w-8 h-8 border-4 border-[#1b738c] border-t-transparent rounded-full animate-spin"></div>
                                                </div>
                                            ) : timeline.length === 0 ? (
                                                <div className="text-center py-10 text-gray-400 font-bold">No appointments for today</div>
                                            ) : (
                                                timeline.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-[15px] mb-[12px] last:mb-0 relative">
                                                        {/* Time label */}
                                                        <div className="w-[85px] text-[15px] font-bold text-gray-500 shrink-0 text-right pr-[5px] truncate">{item.time}</div>

                                                        {/* Divider */}
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
                                                                <div className="flex gap-2 justify-end mt-[2px]">
                                                                    {item.status === 'confirmed' && (
                                                                        <button 
                                                                            onClick={() => handleComplete(item.id)}
                                                                            className="text-[#10b981] text-[12px] font-bold hover:underline"
                                                                        >
                                                                            Complete
                                                                        </button>
                                                                    )}
                                                                    <button className="text-[#32869e] text-[12px] font-bold hover:underline">View Detail</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
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

                        </div>
                    </div>

                    {/* Appointment Request Section - Full Width */}
                    <div className="mt-[25px] pb-[30px]">
                        <div className="bg-white border-[1.5px] border-gray-300 rounded-2xl p-[30px] shadow-sm flex flex-col">
                            <h3 className="text-[32px] font-bold text-[#111] mb-[20px]">Appointment Request</h3>
                            <div className="flex flex-col gap-[15px]">
                                {loadingAppointments ? (
                                    <div className="flex items-center justify-center py-12">
                                        <div className="w-10 h-10 border-4 border-[#1b738c] border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                ) : appointments.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                                        <svg className="w-16 h-16 mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-[16px] font-bold">No pending requests</p>
                                    </div>
                                ) : (
                                    appointments.map((req, i) => (
                                        <div key={req.id || i} className="border border-gray-200 rounded-xl p-[20px] flex flex-col gap-[4px] relative bg-white hover:border-[#1b738c]/30 transition-all shadow-sm">
                                            {/* Date at Top Right */}
                                            <div className="absolute top-[20px] right-[25px] text-[15px] font-bold text-gray-400">{formatDate(getAppointmentStartTime(req))}</div>
                                            
                                            {/* Top Row: Image and Name/Info */}
                                            <div className="flex gap-[20px] items-center">
                                                <div className="w-[75px] h-[75px] rounded-full overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                                                    <img src={phImg} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="text-[24px] font-bold text-[#111] leading-tight">{req.patient_name}</div>
                                                    <div className="text-[15px] text-gray-500 font-bold mt-[2px]">{req.patient_gender || 'Not specified'} , {req.patient_age || '--'}</div>
                                                </div>
                                            </div>

                                            {/* Bottom Row: Treatment, Time, and Buttons */}
                                            <div className="flex items-center justify-between mt-[4px] pl-[95px]">
                                                <div className="flex items-center gap-[15px]">
                                                    <div className="text-[15px] font-bold text-[#32869e] tracking-tight">Treatment -{req.appointment_type || 'General'}</div>
                                                    <div className="bg-[#e5e7eb] text-[13px] font-bold px-[15px] py-[4px] rounded-full text-gray-600 shadow-sm">{formatTime(getAppointmentStartTime(req))}</div>
                                                </div>

                                                <div className="flex gap-[12px]">
                                                    <button 
                                                        onClick={() => {
                                                            setSelectedRescheduleRequest(req);
                                                            setIsRescheduleModalOpen(true);
                                                        }}
                                                        className="bg-[#4391a4] hover:bg-[#367a8a] text-white px-[25px] py-[7px] rounded-[8px] text-[15px] font-bold shadow-sm transition-all min-w-[110px]"
                                                    >
                                                        Schedule
                                                    </button>
                                                    <button 
                                                        onClick={() => handleAccept(req)}
                                                        className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-[25px] py-[7px] rounded-[8px] text-[15px] font-bold shadow-sm transition-all min-w-[110px]"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDecline(req)}
                                                        className="bg-[#f87171] hover:bg-[#ef4444] text-white px-[25px] py-[7px] rounded-[8px] text-[15px] font-bold shadow-sm transition-all min-w-[110px]"
                                                    >
                                                        Decline
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                                <button 
                                    onClick={() => navigate('/AppointmentRequests')}
                                    className="text-[#32869e] text-[16px] font-bold hover:underline mt-[15px] self-end pr-[10px]"
                                >
                                    View More
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Recent Patients Section - Full Width */}
                    <div className="mt-[25px]">
                        <div className="bg-white border-[1.5px] border-gray-300 rounded-2xl p-[30px] shadow-sm flex flex-col">
                            <h3 className="text-[32px] font-bold text-[#111] mb-[20px]">Recent Patients</h3>
                            
                            <div className="overflow-x-auto min-w-full">
                                <div className="flex min-w-[800px] px-[10px] mb-[12px] text-[15px] font-bold text-gray-400 border-b border-gray-100 pb-2">
                                    <div className="w-[200px]">Name</div>
                                    <div className="w-[120px]">Gender</div>
                                    <div className="w-[120px]">Weight</div>
                                    <div className="w-[120px]">Disease</div>
                                    <div className="w-[100px]">Date</div>
                                    <div className="w-[140px]">Heart Rate</div>
                                    <div className="w-[120px]">Blood Type</div>
                                    <div className="flex-1 text-right">Status</div>
                                </div>

                                <div className="flex flex-col gap-[10px]">
                                    {loadingRecent ? (
                                        <div className="flex items-center justify-center py-12">
                                            <div className="w-10 h-10 border-4 border-[#1b738c] border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    ) : recentPatients.length === 0 ? (
                                        <div className="text-center py-12 text-gray-400 font-bold">No recent patients found</div>
                                    ) : (
                                        recentPatients.map((p, i) => (
                                            <div key={p.id || i} className="border border-gray-200 rounded-xl p-[12px] flex items-center text-[15px] font-bold text-[#111] bg-white group hover:border-[#1b738c]/30 transition-all shadow-sm">
                                                <div className="w-[200px] flex items-center gap-[12px]">
                                                    <div className="w-[45px] h-[45px] rounded-full overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                                                        <img src={p.patient_photo || phImg} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                    <span className="truncate">{p.patient_name}</span>
                                                </div>
                                                <div className="w-[120px] text-gray-500">{p.patient_gender || 'Not specified'}</div>
                                                <div className="w-[120px] text-gray-500">{p.patient_weight || '--'}</div>
                                                <div className="w-[120px] text-gray-500">{p.patient_disease || 'N/A'}</div>
                                                <div className="w-[100px] text-gray-500">{formatDate(p.start_time)}</div>
                                                <div className="w-[140px] text-gray-500">{p.patient_heart_rate || '--'}</div>
                                                <div className="w-[120px] text-gray-500">{p.patient_blood_type || '--'}</div>
                                                <div className="flex-1 text-right">
                                                    <span className="text-gray-800 capitalize">{p.status}</span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => navigate("/Patients")}
                                className="text-[#32869e] text-[16px] font-bold hover:underline mt-[20px] self-end pr-[10px]"
                            >
                                View More
                            </button>
                        </div>
                    </div>

                    {/* Activity Section - Full Width */}
                    <div className="mt-[25px] pb-[30px]">
                        <div className="bg-white border-[1.5px] border-gray-300 rounded-2xl p-[30px] shadow-sm flex flex-col h-[450px]">
                            <div className="flex items-center justify-between mb-[25px]">
                                <h3 className="text-[32px] font-bold text-[#111]">Activity</h3>
                                <div className="flex items-center gap-[15px] bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
                                    <select className="bg-transparent text-[15px] font-bold text-gray-600 outline-none cursor-pointer">
                                        <option>weekly</option>
                                        <option>monthly</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex-1 w-full ml-[-20px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={activityData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
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
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} interval={0} tick={{ fontSize: 13, fontWeight: 700, fill: '#64748b' }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fontWeight: 700, fill: '#64748b' }} ticks={[0, 50, 100, 150, 200]} />
                                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }} />
                                        <Area type="monotone" dataKey="Consultations" stroke="#0a1d37" strokeWidth={4} fillOpacity={1} fill="url(#colorConsultations)" />
                                        <Area type="monotone" dataKey="Patients" stroke="#2c9daf" strokeWidth={4} fillOpacity={1} fill="url(#colorPatients)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex justify-center gap-[40px] mt-[20px]">
                                <div className="flex items-center gap-[10px]">
                                    <div className="w-[14px] h-[14px] rounded-full bg-[#1e3a8a]"></div>
                                    <span className="text-[14px] font-bold text-gray-600">Consultations</span>
                                </div>
                                <div className="flex items-center gap-[10px]">
                                    <div className="w-[14px] h-[14px] rounded-full bg-[#06b6d4]"></div>
                                    <span className="text-[14px] font-bold text-gray-600">Patients</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {isNotificationOpen && <Notification onClose={() => setIsNotificationOpen(false)} />}
            
            {/* Appointment Modal */}
            <AnimatePresence>
                {isAppointmentModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100"
                        >
                            <div className="p-7">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-[18px] font-bold text-gray-800 tracking-tight">Appointment Details</h3>
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
                                    {appRequestsData.slice(0, 3).map((req, idx) => (
                                        <div key={idx} className="flex items-center gap-4 p-4 border border-gray-300 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                                                <img src={phImg} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <p className="text-[16px] font-bold text-gray-800 leading-tight">{req.name}</p>
                                                    <span className="text-[11px] font-bold text-[#1b738c] bg-[#1b738c]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">{req.time}</span>
                                                </div>
                                                <p className="text-[14px] text-gray-500 font-medium mt-0.5">{req.treatment}</p>
                                                <p className="text-[12px] text-gray-400 font-bold mt-1">{req.date}</p>
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

            {/* Patients Modal */}
            <AnimatePresence>
                {isPatientsModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
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
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
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
                                    {loadingTimeline ? (
                                        <div className="flex items-center justify-center py-6">
                                            <div className="w-8 h-8 border-4 border-[#1b738c] border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    ) : timeline.length === 0 ? (
                                        <div className="text-center py-6 text-gray-400 font-bold italic">No recent consultations</div>
                                    ) : (
                                        timeline.slice(0, 4).map((item, idx) => (
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
                                        ))
                                    )}
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
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
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
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
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
            
            {/* Reschedule Modal */}
            <AnimatePresence>
                {isRescheduleModalOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-[2px]">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[24px] shadow-2xl w-full max-w-[700px] overflow-hidden border border-gray-100 flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-start">
                                <div>
                                    <h2 className="text-[24px] font-bold text-[#111] tracking-tight">Reschedule Appointment</h2>
                                    <p className="text-[14px] text-gray-500 font-medium mt-1">Modify the timing for Patient ID: #MR-{selectedRescheduleRequest?.id || '8821'}</p>
                                </div>
                                <button 
                                    onClick={() => setIsRescheduleModalOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="p-8 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                                {/* Current Appointment Info */}
                                <div className="bg-[#f0f9fa] border-l-[4px] border-[#1b738c] rounded-xl p-5 flex items-center gap-5">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm text-[#1b738c]">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[12px] font-bold text-[#1b738c] uppercase tracking-wider">Current Appointment</p>
                                        <p className="text-[18px] font-bold text-[#111] mt-1">
                                            {selectedRescheduleRequest ? formatDate(selectedRescheduleRequest.start_time) : 'Oct 24, 2023'} at {selectedRescheduleRequest ? formatTime(selectedRescheduleRequest.start_time).toUpperCase() : '09:30 AM'}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Mini Calendar Side */}
                                    <div className="flex flex-col gap-4">
                                        <h3 className="text-[16px] font-bold text-[#111]">Select Date</h3>
                                        <div className="border border-gray-200 rounded-2xl p-5 shadow-sm bg-white">
                                            <div className="flex justify-between items-center mb-6">
                                                <span className="text-[16px] font-bold text-gray-800">November 2023</span>
                                                <div className="flex gap-2">
                                                    <button className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-400">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                                                    </button>
                                                    <button className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-400">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-7 gap-y-4 text-center">
                                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                                                    <span key={d} className="text-[12px] font-bold text-gray-400">{d}</span>
                                                ))}
                                                {[29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((day, i) => (
                                                    <div key={i} className={`text-[14px] font-bold h-9 w-9 flex items-center justify-center mx-auto rounded-full cursor-pointer transition-all ${day === 6 ? 'bg-[#1b738c] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'} ${i < 3 ? 'text-gray-300' : ''}`}>
                                                        {day}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Slots Side */}
                                    <div className="flex flex-col gap-4">
                                        <h3 className="text-[16px] font-bold text-[#111]">Available Slots</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { time: '08:00 AM', status: 'Available' },
                                                { time: '09:30 AM', status: 'Available' },
                                                { time: '11:00 AM', status: 'Selected' },
                                                { time: '12:30 PM', status: 'Reserved' },
                                                { time: '02:00 PM', status: 'Available' },
                                                { time: '03:30 PM', status: 'Available' }
                                            ].map((slot, i) => (
                                                <div 
                                                    key={i} 
                                                    className={`p-3 border rounded-xl flex flex-col gap-0.5 cursor-pointer transition-all ${
                                                        slot.status === 'Selected' ? 'border-[#1b738c] bg-[#f0f9fa] ring-1 ring-[#1b738c]' : 
                                                        slot.status === 'Reserved' ? 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed' : 
                                                        'border-gray-200 hover:border-[#1b738c] hover:bg-gray-50'
                                                    }`}
                                                >
                                                    <span className={`text-[14px] font-bold ${slot.status === 'Selected' ? 'text-[#1b738c]' : 'text-[#333]'}`}>{slot.time}</span>
                                                    <span className={`text-[11px] font-medium ${slot.status === 'Selected' ? 'text-[#1b738c]' : 'text-gray-400'}`}>{slot.status}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Reason Area */}
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-[16px] font-bold text-[#111]">Reason for Rescheduling</h3>
                                    <textarea 
                                        placeholder="e.g., Patient requested earlier slot..."
                                        className="w-full h-24 p-5 bg-[#f3f4f6] border border-gray-200 rounded-2xl text-[14px] font-medium outline-none focus:border-[#1b738c] transition-all resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="px-8 py-6 border-t border-gray-100 flex justify-end items-center gap-6">
                                <button 
                                    onClick={() => setIsRescheduleModalOpen(false)}
                                    className="text-[15px] font-bold text-gray-500 hover:text-[#111] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button className="bg-[#006977] hover:bg-[#005a66] text-white px-8 py-3.5 rounded-xl text-[15px] font-bold shadow-lg shadow-[#006977]/20 flex items-center gap-2 transition-all active:scale-[0.98]">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Propose New Time
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Accept Appointment Modal */}
            <AnimatePresence>
                {isAcceptModalOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-[2px]">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[24px] shadow-2xl w-full max-w-[620px] overflow-hidden border border-gray-100 flex flex-col"
                        >
                            {/* Header */}
                            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-[24px] font-bold text-[#111] tracking-tight">Accept Appointment</h2>
                                <button 
                                    onClick={() => setIsAcceptModalOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="p-8 space-y-7">
                                {/* Patient Details Card */}
                                <div className="bg-[#f0f9fa] border border-[#1b738c]/20 rounded-2xl p-6 flex items-center gap-6 shadow-sm">
                                    <div className="w-[64px] h-[64px] bg-[#c8e2e9] rounded-full flex items-center justify-center text-[#1b738c] shadow-inner">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[12px] font-bold text-[#1b738c] uppercase tracking-wider mb-1">Patient Details</span>
                                        <h3 className="text-[22px] font-bold text-[#111] leading-tight">{selectedAcceptRequest?.patient_name || 'Patient Name'}</h3>
                                        <div className="flex items-center gap-4 mt-2 text-gray-500 font-bold text-[14px]">
                                            <div className="flex items-center gap-1.5">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                <span>{selectedAcceptRequest?.patient_age || '--'} years</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3v8h8a10.003 10.003 0 00-5.456-8.99l-.054-.09A10.003 10.003 0 0012 3" /></svg>
                                                <span>ID: {selectedAcceptRequest?.patient_mrn || `MRN-${selectedAcceptRequest?.id || '---'}`}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Appointment Metadata Grid */}
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest ml-1">Appointment Type</span>
                                        <div className="bg-[#f3f4f6] border border-gray-200 rounded-xl p-4 flex items-center gap-3">
                                            <div className="text-[#1b738c]">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                </svg>
                                            </div>
                                            <span className="text-[16px] font-bold text-gray-800">{selectedAcceptRequest?.appointment_type || 'Follow-up Exam'}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest ml-1">Requested Time Slot</span>
                                        <div className="bg-[#f3f4f6] border border-gray-200 rounded-xl p-4 flex items-center gap-3">
                                            <div className="text-[#1b738c]">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <span className="text-[16px] font-bold text-gray-800">
                                                {selectedAcceptRequest ? formatTime(getAppointmentStartTime(selectedAcceptRequest)) : '14:30'} - {selectedAcceptRequest ? formatTime(getAppointmentEndTime(selectedAcceptRequest)) : '15:15'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Schedule Detail Card */}
                                <div className="border-[1.5px] border-dashed border-gray-300 rounded-2xl p-6 relative">
                                    <div className="absolute top-4 right-4 bg-[#f0f9fa] text-[#1b738c] text-[11px] font-bold px-2 py-0.5 rounded-md">GMT-5</div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="text-[#1b738c]">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <span className="text-[18px] font-bold text-[#111]">
                                                {selectedAcceptRequest ? new Date(getAppointmentStartTime(selectedAcceptRequest)).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'Tuesday, October 24th, 2023'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 ml-1">
                                            <div className="text-gray-400">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <span className="text-[14px] font-bold text-gray-500">
                                                {selectedAcceptRequest?.location || 'Main Surgery Center, Wing B, Room 402'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Automation Notice */}
                                <div className="flex gap-4 p-1">
                                    <div className="w-6 h-6 shrink-0 text-gray-400 mt-0.5">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                                        Confirming this appointment will automatically notify the patient via email and update your surgical department calendar.
                                    </p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex justify-end items-center gap-6">
                                <button 
                                    onClick={() => setIsAcceptModalOpen(false)}
                                    className="text-[15px] font-bold text-gray-500 hover:text-[#111] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => confirmAccept(selectedAcceptRequest.id)}
                                    className="bg-[#006977] hover:bg-[#005a66] text-white px-8 py-3.5 rounded-xl text-[15px] font-bold shadow-lg shadow-[#006977]/20 flex items-center gap-2 transition-all active:scale-[0.98]"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Confirm Appointment
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Reject Appointment Modal */}
            <AnimatePresence>
                {isRejectModalOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-[2px]">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[24px] shadow-2xl w-full max-w-[620px] overflow-hidden border border-gray-100 flex flex-col"
                        >
                            {/* Header */}
                            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                                <div>
                                    <h2 className="text-[24px] font-bold text-[#111] tracking-tight">Reject Appointment</h2>
                                    <p className="text-[14px] text-gray-500 font-medium mt-1">Review request and provide a clinical reason</p>
                                </div>
                                <button 
                                    onClick={() => setIsRejectModalOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="p-8 space-y-7">
                                {/* Request Summary Card */}
                                <div className="bg-[#f8fafb] border border-gray-200 rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-4">
                                            <div className="w-[50px] h-[50px] bg-[#3b82f6]/10 rounded-full flex items-center justify-center text-[#3b82f6] shadow-sm">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-[20px] font-bold text-[#111]">{selectedRejectRequest?.patient_name || 'Sarah Jenkins'}</h3>
                                                <div className="flex items-center gap-2 text-gray-400 font-bold text-[14px] mt-0.5">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    <span>
                                                        {selectedRejectRequest ? new Date(selectedRejectRequest.start_time).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'October 24, 2023'} • {selectedRejectRequest ? formatTime(selectedRejectRequest.start_time).toUpperCase() : '09:15 AM'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[11px] font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Urgent Request</span>
                                    </div>
                                    
                                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                                        <p className="text-[14px] text-gray-600 italic leading-relaxed font-medium">
                                            "Persistent lower back pain for 3 days. Difficulty sleeping and radiating pain to left leg. Requesting an immediate consultation."
                                        </p>
                                    </div>
                                </div>

                                {/* Rejection Inputs */}
                                <div className="space-y-5">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[13px] font-bold text-gray-500 uppercase tracking-widest ml-1">Reason for Rejection</label>
                                        <div className="relative">
                                            <select 
                                                value={rejectReason}
                                                onChange={(e) => setRejectReason(e.target.value)}
                                                className="w-full p-4 bg-white border border-gray-200 rounded-xl text-[15px] font-bold text-gray-800 outline-none focus:border-[#ef4444] transition-all appearance-none cursor-pointer shadow-sm"
                                            >
                                                <option value="" disabled>Select a clinical reason...</option>
                                                <option value="Schedule Conflict">Schedule Conflict</option>
                                                <option value="Outside Specialty">Outside Specialty Area</option>
                                                <option value="Incomplete Records">Incomplete Medical Records</option>
                                                <option value="Capacity Full">Maximum Patient Capacity Reached</option>
                                                <option value="Other">Other (Specify below)</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <textarea 
                                            value={rejectNotes}
                                            onChange={(e) => setRejectNotes(e.target.value.slice(0, 500))}
                                            placeholder="Provide additional clinical details or specify 'Other' reason..."
                                            className="w-full h-[120px] p-5 bg-white border border-gray-200 rounded-xl text-[15px] font-medium text-gray-800 outline-none focus:border-[#ef4444] transition-all resize-none shadow-sm"
                                        ></textarea>
                                        <div className="flex justify-between items-center px-1">
                                            <span className="text-[12px] text-gray-400 font-bold">Clinical notes will be shared with the patient.</span>
                                            <span className={`text-[12px] font-bold ${rejectNotes.length >= 450 ? 'text-red-500' : 'text-gray-400'}`}>
                                                {rejectNotes.length} / 500
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
                                <button 
                                    onClick={() => setIsRejectModalOpen(false)}
                                    className="flex items-center gap-2 text-[15px] font-bold text-gray-600 hover:text-[#111] transition-all border border-gray-300 px-6 py-3 rounded-xl hover:bg-white"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                    Go Back
                                </button>
                                <button 
                                    onClick={() => confirmReject(selectedRejectRequest.id)}
                                    className="bg-[#ff5b5b] hover:bg-[#ef4444] text-white px-8 py-3.5 rounded-xl text-[15px] font-bold shadow-lg shadow-red-500/20 flex items-center gap-2 transition-all active:scale-[0.98]"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zM9 13h6" />
                                    </svg>
                                    Reject Request
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>

        {/* Notification */}
        <AnimatePresence>
            {isNotificationOpen && (
                <Notification isOpen={isNotificationOpen} setIsOpen={setIsNotificationOpen} />
            )}
        </AnimatePresence>

        {/* Pending Approval Modal */}
        <AnimatePresence>
            {showPendingModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-[32px] w-full max-w-md p-8 text-center shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#19718A]/10 rounded-full blur-2xl"></div>
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-[#F0F9FA] rounded-full flex items-center justify-center relative">
                                <div className="absolute inset-0 border-2 border-dashed border-[#19718A]/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                                <svg className="w-10 h-10 text-[#19718A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Verification Pending</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            Your account is currently under review by our Admin team. You will receive an email confirmation once your profile is approved.
                        </p>
                        <button
                            onClick={() => window.location.href = 'https://mail.google.com'}
                            className="w-full bg-[#19718A] text-white py-4 rounded-2xl font-bold hover:bg-[#0E4A5C] transition-all shadow-lg active:scale-95"
                        >
                            Back to Gmail
                        </button>
                        <div className="mt-6 text-[12px] text-gray-400 font-medium italic">
                            Usually takes 24-48 hours
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    </div>
);
};

export default Doctor_dashboard;
