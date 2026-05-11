import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Patient_sidebar';
import BASE_URL from '../../../baseUrl';
import apiFetch from '../../../api';
import Profile from '../Profile';
import Account from '../Account';
import Notification from '../notification';
import phImg from '../../../assets/ph.png';
import regimenBg from '../../../assets/regimen_abstract_bg.png';
import Daily_report from './Daily_report';
import Update_logs from './Update_logs';
import Schedule from './Schedule';
import NewRequest_ActivePrescription_Medication from './NewRequest_ActivePrescription_Medication';
import Past_medication from './Past_medication';
import Request_refill from './Request_refill';
import Refill_request from './Refill_request';
import Add_past from './Add_past';

const Medication1 = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState('Medications');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null); // 'profile' | 'account' | null
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isDailyReportOpen, setIsDailyReportOpen] = useState(false);
    const [isUpdateLogsOpen, setIsUpdateLogsOpen] = useState(false);
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);
    const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
    const [isPastMedicationOpen, setIsPastMedicationOpen] = useState(false);
    const [isRefillOpen, setIsRefillOpen] = useState(false);
    const [isRefillRequestOpen, setIsRefillRequestOpen] = useState(false);
    const [isAddPastOpen, setIsAddPastOpen] = useState(false);

    // State for data
    const [todaySchedule, setTodaySchedule] = useState([]);
    const [pastMedications, setPastMedications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTodaySchedule = async () => {
        const token = localStorage.getItem('token') || localStorage.getItem('access');
        if (!token) return;

        setIsLoading(true);
        try {
            const response = await apiFetch(`${BASE_URL}/today-schedule/today/`, {
                method: 'GET'
            });
            const data = await response.json();
            if (response.ok) {
                setTodaySchedule(Array.isArray(data) ? data : []);
            } else {
                setError(data.detail || 'Failed to fetch schedule');
            }
        } catch (err) {
            console.error("Fetch Schedule Error:", err);
            setError('Server error. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPastMedications = async () => {
        try {
            const response = await apiFetch(`${BASE_URL}/api/past-medications/`);
            const data = await response.json();
            if (response.ok) {
                setPastMedications(data);
            }
        } catch (err) {
            console.error("Fetch Past Medications Error:", err);
        }
    };

    const handleMarkTaken = async (id) => {
        const token = localStorage.getItem('token') || localStorage.getItem('access');
        if (!token) return;

        try {
            const response = await apiFetch(`${BASE_URL}/today-schedule/mark-taken/${id}/`, {
                method: 'PATCH'
            });
            if (response.ok) {
                fetchTodaySchedule(); // Refresh list
            }
        } catch (err) {
            console.error("Mark Taken Error:", err);
        }
    };

    const [activePrescriptions, setActivePrescriptions] = useState([]);
    const [isPrescriptionsLoading, setIsPrescriptionsLoading] = useState(true);
    const [assistantResponse, setAssistantResponse] = useState('');
    const [assistantQuery, setAssistantQuery] = useState('');

    const fetchActivePrescriptions = async () => {
        setIsPrescriptionsLoading(true);
        try {
            const response = await apiFetch(`${BASE_URL}/api/prescriptions/medications/`);
            const data = await response.json();
            if (response.ok) {
                setActivePrescriptions(data);
            }
        } catch (error) {
            console.error("Prescriptions Error:", error);
        } finally {
            setIsPrescriptionsLoading(false);
        }
    };

    useEffect(() => {
        fetchTodaySchedule();
        fetchActivePrescriptions();
        fetchPastMedications();
    }, []);

    // Helper to categorize time into Morning/Afternoon/Evening
    const getTimeLabel = (timeStr) => {
        const hour = parseInt(timeStr.split(':')[0]);
        if (hour < 12) return 'Morning';
        if (hour < 17) return 'Afternoon';
        return 'Evening';
    };

    const upcomingMedicines = todaySchedule.filter(item => !item.is_taken).slice(0, 3);
    const upcomingMedicineNames = upcomingMedicines.map((item) => item.medication_name).filter(Boolean);
    const upcomingMedicinePhrase = upcomingMedicineNames.length > 0
        ? upcomingMedicineNames.length === 1
            ? upcomingMedicineNames[0]
            : `${upcomingMedicineNames.slice(0, -1).join(', ')} and ${upcomingMedicineNames.slice(-1)}`
        : 'your upcoming medicine';

    const generateAssistantResponse = (query) => {
        const normalized = query.toLowerCase();
        if (normalized.includes('curd') || normalized.includes('dairy')) {
            return `For ${upcomingMedicinePhrase}, it is best to avoid dairy products like curd, milk, and yogurt close to the dose unless your doctor specifically says otherwise. Take the medicine with plain water and wait at least 30 minutes before eating rich dairy foods.`;
        }
        if (normalized.includes('milk') && normalized.includes('water')) {
            return `Most medicines work best with plain water, not milk. For ${upcomingMedicinePhrase}, take it with water unless the prescription explicitly instructs you to take it with milk.`;
        }
        if (normalized.includes('eat') || normalized.includes('food') || normalized.includes('take')) {
            return `For ${upcomingMedicinePhrase}, stick to light, easy-to-digest food around the dose and avoid very spicy, greasy, or heavy meals. Plain water is usually the safest option unless your doctor advises otherwise.`;
        }
        return `I can guide you on food choices for ${upcomingMedicinePhrase}. Ask about specific foods or whether to take the medicine with water, milk, or with/after meals.`;
    };

    const handleAssistantQuery = (query) => {
        setAssistantQuery(query);
        setAssistantResponse(generateAssistantResponse(query));
    };

    const handleAssistantSubmit = () => {
        if (!assistantQuery.trim()) return;
        setAssistantResponse(generateAssistantResponse(assistantQuery));
    };

    return (
        <div className="relative h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
             style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>
            
            <div className="flex h-full w-full">
                <Sidebar active={active} setActive={setActive} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

                <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden ${isDailyReportOpen || isUpdateLogsOpen || activeModal || isNotificationOpen || isScheduleOpen || isNewRequestOpen || isPastMedicationOpen || isRefillOpen || isRefillRequestOpen ? 'blur-[4px] scale-[0.98] pointer-events-none' : ''}`}>
                    {/* Top Navbar */}
                    <header className="h-[72px] flex items-center gap-4 px-6 md:px-8 shrink-0 border-b border-white/5 mb-1">
                        <button 
                            onClick={() => setIsMobileOpen(true)}
                            className="lg:hidden text-white p-2 -ml-2 hover:bg-white/10 rounded-xl transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>

                        <div className="flex-1 max-w-[280px]">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full bg-white/10 border border-white/10 rounded-full py-[10px] px-[20px] text-white placeholder-white/40 text-[12px] outline-none focus:ring-2 focus:ring-[#6ED4D4]/50 transition-all font-medium"
                                />
                                <svg className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex items-center gap-[32px] ml-auto">
                            <span className="text-white/80 hover:text-white text-[13px] font-medium hidden md:block select-none cursor-pointer transition-colors">Language</span>
                            <div className="flex items-center gap-[20px]">
                                <button onClick={() => setIsNotificationOpen(true)} className="text-white hover:text-[#6ED4D4] transition-colors relative">
                                    <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    <div className="absolute top-[2px] right-[2px] w-[6px] h-[6px] bg-[#E85B5A] rounded-full" />
                                </button>
                                <button onClick={() => navigate('/Setting')} className="text-white hover:text-[#6ED4D4] transition-colors">
                                    <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                                <div 
                                    onClick={() => setActiveModal('profile')}
                                    className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform"
                                >
                                    <img src={phImg} alt="User" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 w-full max-w-[1440px] mx-auto px-[20px] md:px-[48px] pt-[12px] pb-[64px] overflow-y-auto">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-3">
                            <h1 className="text-[28px] font-semibold text-white leading-[1.1] tracking-tight">
                                Medication Management
                            </h1>
                            <div className="w-full md:w-[260px] relative">
                                <input 
                                    type="text"
                                    placeholder="Search medications..."
                                    className="w-full bg-white/10 border border-white/10 rounded-full py-[12px] px-[24px] text-white placeholder-white/40 text-[14px] outline-none"
                                />
                                <svg className="absolute right-[20px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
                            <div className="flex flex-col gap-6">
                                <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col md:flex-row gap-8 min-h-[240px]">
                                    <div className="flex-1 z-10 relative">
                                        <h2 className="text-[28px] font-[900] text-[#0D1C2E] mb-2">Active Regimen Overview</h2>
                                        <p className="text-[#627382] text-[15px] leading-relaxed mb-6 max-w-[400px]">
                                            You have {todaySchedule.length} medications scheduled for today, and {activePrescriptions.length} prescriptions are about to end soon.
                                        </p>
                                        <div className="flex flex-wrap gap-2.5">
                                            <button 
                                                onClick={() => setIsDailyReportOpen(true)}
                                                className="flex items-center gap-2 bg-[#EAEFF2] hover:bg-[#dfe4e7] text-[#0D1C2E] px-4 py-2.5 rounded-full font-medium text-[15px] transition-all"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Daily Report
                                            </button>
                                            <button 
                                                onClick={() => setIsUpdateLogsOpen(true)}
                                                className="bg-[#1A7785] hover:bg-[#125863] text-white px-4 py-2.5 rounded-full font-medium text-[15px] transition-all shadow-lg shadow-[#1A7785]/20"
                                            >
                                                Update Logs
                                            </button>
                                        </div>
                                    </div>
                                    <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-[45%] overflow-hidden items-center justify-center p-4">
                                        <div className="w-full h-full rounded-[24px] overflow-hidden opacity-90 border-[1.5px] border-white/10">
                                            <img src={regimenBg} alt="Abstract" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>

                                {/* Today's Schedule Section */}
                                <div className="bg-white rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)] min-h-[300px]">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-[18px] font-[900] text-[#0D1C2E]">Today's Schedule</h2>
                                        <span className="text-[10px] font-medium text-[#627382] uppercase tracking-[0.2em] bg-[#EAEFF2] px-3 py-1 rounded-full">
                                            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                        </span>
                                        <button 
                                            onClick={() => setIsScheduleOpen(true)}
                                            className="flex items-center gap-1.5 bg-[#1A7785] hover:bg-[#125863] text-white px-3 py-1.5 rounded-full text-[11px] font-bold transition-all shadow-sm"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/></svg>
                                            ADD SCHEDULE
                                        </button>
                                    </div>

                                    {isLoading ? (
                                        <div className="flex items-center justify-center h-[150px]">
                                            <p className="text-[#627382] font-bold">Loading schedule...</p>
                                        </div>
                                    ) : todaySchedule.length === 0 ? (
                                        <div className="flex items-center justify-center h-[150px] bg-gray-50 rounded-[24px] border border-dashed border-gray-200">
                                            <p className="text-[#627382] font-medium">No medications scheduled for today.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                            {todaySchedule.map((item) => (
                                                <div 
                                                    key={item.id}
                                                    className={`bg-white rounded-[24px] p-5 border border-gray-200 relative transition-all group overflow-hidden ${item.is_taken ? 'opacity-70 bg-gray-50' : 'hover:shadow-lg hover:border-[#1A7785]/20'}`}
                                                >
                                                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#1A7785] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                    
                                                    <div className="flex items-center justify-between mb-4">
                                                        <span className="text-[10px] font-black text-[#627382] uppercase tracking-[0.15em]">{getTimeLabel(item.time)}</span>
                                                        <div className={`w-[24px] h-[24px] rounded-full flex items-center justify-center shadow-sm transition-all ${item.is_taken ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400 opacity-40'}`}>
                                                            <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    
                                                    <h3 className="text-[18px] font-bold text-[#0D1C2E] mb-1">{item.medication_name}</h3>
                                                    <p className="text-[14px] text-[#627382] mb-4 font-bold tracking-tight">
                                                        {item.dosage} • {item.time.slice(0, 5)}
                                                    </p>

                                                    {item.is_taken ? (
                                                        <div className="bg-green-50 text-green-600 py-2 px-4 rounded-full text-[11px] font-black text-center uppercase tracking-wider">
                                                            Taken at {item.time_taken?.slice(11, 16) || item.time.slice(0, 5)}
                                                        </div>
                                                    ) : (
                                                        <button 
                                                            onClick={() => handleMarkTaken(item.id)}
                                                            className="w-full bg-[#006A70] hover:bg-[#005a5f] text-white py-2.5 rounded-[12px] font-black text-[14px] transition-all shadow-lg shadow-[#1A7785]/20 uppercase tracking-wider"
                                                        >
                                                            Mark Taken
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Active Prescriptions Header & Grid */}
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-[18px] font-medium text-white">Active Prescriptions</h2>
                                        <button 
                                            onClick={() => setIsNewRequestOpen(true)}
                                            className="flex items-center gap-1.5 bg-[#1A7785] hover:bg-[#125863] text-white px-3.5 py-2 rounded-full text-[14px] font-bold transition-all shadow-lg shadow-[#1A7785]/20"
                                        >
                                            <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/></svg>
                                            + New Request
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {isPrescriptionsLoading ? (
                                            <div className="col-span-full py-10 flex flex-col items-center justify-center bg-white/50 backdrop-blur-md rounded-[32px] border border-dashed border-white/30">
                                                <div className="w-8 h-8 border-4 border-[#1A7785] border-t-transparent rounded-full animate-spin mb-4"></div>
                                                <p className="text-white/60 font-medium">Loading prescriptions...</p>
                                            </div>
                                        ) : activePrescriptions.length === 0 ? (
                                            <div className="col-span-full py-10 flex flex-col items-center justify-center bg-white/50 backdrop-blur-md rounded-[32px] border border-dashed border-white/30">
                                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                                                    <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <p className="text-white/60 font-medium">No active prescriptions scheduled yet.</p>
                                            </div>
                                        ) : (
                                            activePrescriptions.map((med) => (
                                                <div 
                                                    key={med.id}
                                                    onClick={() => navigate(`/${med.name}`)}
                                                    className="bg-white rounded-[32px] p-6 shadow-sm relative group overflow-hidden border border-gray-50 cursor-pointer hover:shadow-lg transition-all"
                                                >
                                                    <div className="flex justify-between items-start mb-5">
                                                        <div className="w-10 h-10 rounded-2xl bg-[#DFEEF0] flex items-center justify-center text-[#1A7785]">
                                                            <svg className="w-5 h-5 animate-pump" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                                            </svg>
                                                        </div>
                                                        <div className="text-right flex flex-col items-end">
                                                            <span className="text-[9px] font-medium text-[#627382] uppercase tracking-[0.2em] mb-0.5 opacity-70">Refills Left</span>
                                                            <span className="text-[28px] font-medium text-[#0D1C2E] leading-none">--</span>
                                                        </div>
                                                    </div>
                                                    <h3 className="text-[18px] font-medium text-[#0D1C2E] mb-1">{med.name}</h3>
                                                    <p className="text-[14px] text-[#627382] font-medium mb-6">{med.dosage || 'Dosage not set'}</p>
                                                    <div className="flex items-end justify-between">
                                                        <div>
                                                            <p className="text-[9px] font-medium text-[#627382] uppercase tracking-[0.2em] mb-0.5 opacity-70">Days Left</p>
                                                            <p className="text-[14px] font-[900] text-[#E85B5A]">{med.days_left} Days</p>
                                                        </div>
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setIsRefillOpen(true);
                                                            }}
                                                            className="bg-[#006A70] hover:bg-[#005a5f] text-white px-4 py-2.5 rounded-[14px] font-medium text-[15px] transition-all shadow-lg shadow-[#1A7785]/20"
                                                        >
                                                            Request Refill
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Sidebar Column */}
                            <div className="flex flex-col gap-6">
                                {/* Assistant AI */}
                                <div className="bg-[#0B1F4D] rounded-[32px] p-6 text-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col min-h-[300px]">
                                    <div className="flex items-center gap-[12px] mb-[24px]">
                                        <div className="w-[40px] h-[40px] rounded-xl bg-gradient-to-br from-[#49AAB3] to-[#1A7785] flex items-center justify-center">
                                            <svg className="w-[22px] h-[22px] text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M11.3 1.047a1 1 0 01.897.447L14.4 5.5l.8-.3a1 1 0 011.1.2l3 3a1 1 0 01.2 1.1l-.3.8 4 2.2a1 1 0 01.4 1.3l-2.2 4a1 1 0 01-1.3.4l-4-2.2-.8.3a1 1 0 01-1.1-.2l-3-3a1 1 0 01-.2-1.1l.3-.8-4.003-2.203a1 1 0 01-.447-.897V4a1 1 0 011-1h6.632zM10 4a1 1 0 110 2 1 1 0 010-2z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <h2 className="text-[20px] font-medium tracking-tight">Assistant AI</h2>
                                    </div>
                                    <p className="text-white/50 text-[16px] leading-relaxed mb-[24px]">
                                        I only help with food guidance around your upcoming medicines. For example, I can tell you which foods to avoid or take with a tablet, such as “do not eat curd after this tablet” or “take this tablet with milk, not water.”
                                    </p>
                                    {upcomingMedicines.length > 0 ? (
                                        <div className="mb-[24px] rounded-[24px] border border-white/10 bg-white/5 p-4">
                                            <p className="text-[12px] uppercase tracking-[0.2em] text-white/60 mb-3">Upcoming medicines</p>
                                            <ul className="space-y-2 text-[15px] text-white/90">
                                                {upcomingMedicines.map((item) => (
                                                    <li key={item.id} className="flex items-center justify-between gap-3">
                                                        <span>{item.medication_name}</span>
                                                        <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">{item.time.slice(0, 5)}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <div className="mb-[24px] rounded-[24px] border border-white/10 bg-white/5 p-4 text-[14px] text-white/70">
                                            No upcoming scheduled medicines found in reminders.
                                        </div>
                                    )}
                                    {assistantResponse && (
                                        <div className="mb-[24px] rounded-[24px] border border-white/10 bg-white/10 p-4 text-[15px] text-white/90">
                                            <p className="text-[12px] uppercase tracking-[0.2em] text-white/60 mb-3">Response</p>
                                            <p>{assistantResponse}</p>
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-[12px] mb-[32px]">
                                        <button
                                            onClick={() => handleAssistantQuery('After this tablet, can I eat curd?')}
                                            className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl px-[20px] py-[12px] text-[16px] font-medium text-white/80 transition-all uppercase tracking-wider"
                                        >
                                            "After this tablet, can I eat curd?"
                                        </button>
                                        <button
                                            onClick={() => handleAssistantQuery('Take this medicine with milk or water?')}
                                            className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl px-[20px] py-[12px] text-[16px] font-medium text-white/80 transition-all uppercase tracking-wider"
                                        >
                                            "Take this medicine with milk or water?"
                                        </button>
                                    </div>
                                    <div className="mt-auto relative">
                                        <input 
                                            type="text" 
                                            value={assistantQuery}
                                            onChange={(e) => setAssistantQuery(e.target.value)}
                                            placeholder="Type your food-related question..."
                                            className="w-full bg-white border-none rounded-2xl py-[14px] pl-[20px] pr-[52px] text-[16px] text-[#0B1423] placeholder-[#627382]/50 outline-none shadow-sm"
                                        />
                                        <button onClick={handleAssistantSubmit} className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[#1A7785] hover:text-[#49AAB3]">
                                            <svg className="w-[24px] h-[24px]" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Refills Tracker */}
                                <div className="bg-white rounded-[32px] p-6 shadow-sm flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-[18px] font-medium text-[#0D1C2E]">Refills</h2>
                                            <button className="text-[#627382] hover:animate-spin transition-all">
                                                <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2.5">
                                        {activePrescriptions.length === 0 ? (
                                            <p className="text-[12px] text-[#627382] text-center py-4">No refills pending soon.</p>
                                        ) : (
                                            activePrescriptions.map((med, idx) => (
                                                <div key={med.id} className={`bg-[#EAEFF2] bg-opacity-70 rounded-[20px] p-4 flex items-center justify-between border border-white shadow-sm ${idx > 1 ? 'hidden' : ''}`}>
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-2 h-2 rounded-full ${med.days_left <= 2 ? 'bg-[#E85B5A]' : 'bg-[#1A7785]'} shadow-[0_0_8px_rgba(26,119,133,0.4)]`} />
                                                        <div>
                                                            <p className="text-[15px] font-medium text-[#0D1C2E]">{med.name}</p>
                                                            <p className="text-[10px] text-[#627382] font-medium tracking-wide opacity-60">{med.days_left} days left</p>
                                                        </div>
                                                    </div>
                                                    <span className={`text-[9px] font-medium px-3 py-1 rounded-full uppercase tracking-widest ${med.days_left <= 2 ? 'bg-[#E85B5A] text-white' : 'bg-[#006A70] text-white'}`}>
                                                        {med.days_left <= 2 ? 'CRITICAL' : 'READY'}
                                                    </span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <button 
                                        onClick={() => setIsRefillRequestOpen(true)}
                                        className="w-full text-center pt-4 text-[11px] font-black text-[#1A7785] hover:opacity-80 flex items-center justify-center gap-[6px] tracking-[0.1em] uppercase"
                                    >
                                        VIEW ALL <svg className="w-[12px] h-[12px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                                    </button>
                                </div>

                                {/* Adherence Score */}
                                <div className="bg-[#C5E4E4] rounded-[32px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-white/50 relative overflow-hidden group">
                                    <div className="flex justify-between items-start mb-4">
                                        <h2 className="text-[10px] font-medium text-[#0B4A54] uppercase tracking-[0.2em] opacity-80">Adherence Score</h2>
                                        <span className="text-[32px] font-[900] text-[#0B4A54] leading-none">94%</span>
                                    </div>
                                    <div className="relative h-[10px] w-full bg-white/50 rounded-full mb-4 overflow-hidden">
                                        <div className="absolute top-0 left-0 h-full bg-[#006A70] rounded-full group-hover:w-[94%] transition-all duration-[2s]" style={{ width: '94%' }}></div>
                                    </div>
                                    <p className="text-[15px] text-[#1D5E66] font-medium leading-relaxed opacity-90">
                                        You've missed 2 doses in 30 days. <span className="font-medium">Great job!</span>
                                    </p>
                                    <div className="absolute -bottom-[30px] left-0 right-0 h-[80px] pointer-events-none opacity-20 transform scale-x-110">
                                        <img src={regimenBg} alt="" className="w-full h-full object-cover rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Past Medications Table */}
                        <div className="flex flex-col gap-4 mt-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-[18px] font-medium text-white">Past Medications</h2>
                                <button 
                                    onClick={() => setIsPastMedicationOpen(true)}
                                    className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-full text-[14px] font-bold transition-all border border-white/10 shadow-lg"
                                >
                                    <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/>
                                    </svg>
                                    Add Record
                                </button>
                            </div>
                            <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#EAEFF2]/30 text-[9px] font-medium text-[#627382] uppercase tracking-[0.2em]">
                                            <th className="px-6 py-4">Medication</th>
                                            <th className="px-6 py-4">Duration</th>
                                            <th className="px-6 py-4">Prescriber</th>
                                            <th className="px-6 py-4">Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[#0D1C2E] cursor-pointer">
                                        {pastMedications.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-10 text-center text-[#627382] font-medium">
                                                    No past medication history found.
                                                </td>
                                            </tr>
                                        ) : (
                                            pastMedications.map((med) => (
                                                <tr 
                                                    key={med.id}
                                                    className="border-t border-gray-50 hover:bg-gray-50 transition-colors group"
                                                >
                                                    <td className="px-6 py-4">
                                                        <p className="font-medium text-[15px]">{med.medication_name}</p>
                                                        <p className="text-[10px] text-[#627382] font-medium">{med.dosage}</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-[14px] font-medium text-[#627382]">{med.start_date} - {med.end_date}</td>
                                                    <td className="px-6 py-4 text-[14px] font-medium text-[#0D1C2E]">Dr. {med.doctor_name || med.prescribing_doctor}</td>
                                                    <td className="px-6 py-4 text-[14px] font-medium text-[#627382]">{med.reason}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </main>
                </div>
            </div>

            {/* Modals */}
            {activeModal === 'profile' && (
                <Profile 
                    onClose={() => setActiveModal(null)} 
                    onAccountSettings={() => setActiveModal('account')} 
                />
            )}
            {activeModal === 'account' && (
                <Account onClose={() => setActiveModal(null)} />
            )}
            {isNotificationOpen && <Notification onClose={() => setIsNotificationOpen(false)} />}
            
             {/* Modals - Outside the blurred container */}
            {isDailyReportOpen && (
                <div className="fixed inset-0 z-[200]">
                     <Daily_report 
                        onClose={() => setIsDailyReportOpen(false)} 
                        schedule={todaySchedule}
                    />
                </div>
            )}
            {isUpdateLogsOpen && (
                <div className="fixed inset-0 z-[200]">
                     <Update_logs 
                        onClose={() => setIsUpdateLogsOpen(false)} 
                        initialSchedule={todaySchedule}
                        refreshSchedule={fetchTodaySchedule}
                    />
                </div>
            )}
            {isScheduleOpen && (
                <Schedule onClose={() => setIsScheduleOpen(false)} onScheduleAdded={fetchTodaySchedule} />
            )}
            {isNewRequestOpen && (
                <div className="fixed inset-0 z-[200]">
                     <NewRequest_ActivePrescription_Medication onClose={() => setIsNewRequestOpen(false)} onRequestAdded={fetchActivePrescriptions} />
                </div>
            )}
            {isPastMedicationOpen && (
                <div className="fixed inset-0 z-[200]">
                     <Past_medication 
                        onClose={() => setIsPastMedicationOpen(false)} 
                        onRefreshDashboard={fetchPastMedications}
                    />
                </div>
            )}
            {isRefillOpen && (
                <div className="fixed inset-0 z-[300]">
                    <Request_refill onClose={() => setIsRefillOpen(false)} onConfirm={() => setIsRefillOpen(false)} />
                </div>
            )}
            {isRefillRequestOpen && (
                <div className="fixed inset-0 z-[400]">
                    <Refill_request onClose={() => setIsRefillRequestOpen(false)} onTrackAll={() => navigate('/Order')} />
                </div>
            )}
            {isAddPastOpen && (
                <Add_past onClose={() => setIsAddPastOpen(false)} onBack={() => setIsAddPastOpen(false)} />
            )}
        </div>
    );
};

export default Medication1;
