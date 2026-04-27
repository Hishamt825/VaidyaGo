import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Patient_sidebar';
import Profile from '../Profile';
import Account from '../Account';
import Notification from '../notification';
import phImg from '../../../assets/ph.png';
import wellnessImg from '../../../assets/wellness_vitals.png';
import Adddevice from './Adddevice';
import Connect from './Connect';
import Heart from './Heart';
import Pressure_heart from './Pressure_heart';
import Breathing from './Breathing';
import Genrate from './Genrate';
import Health_report from './Health_report';


/* ─────────────────────────────────────────────
   REUSABLE COMPONENTS
───────────────────────────────────────────── */

const VitalStatCard = ({ icon, label, value, unit, status, statusColor, bgColor }) => (
    <div className="bg-white rounded-[24px] p-5 flex flex-col shadow-sm border border-[#f0f4f5]">
        <div className="flex items-center justify-between mb-4">
            <div className={`w-[48px] h-[48px] rounded-full flex items-center justify-center ${bgColor}`}>
                {icon}
            </div>
            <span className={`px-[12px] py-[4px] rounded-full text-[11px] font-medium ${statusColor} bg-opacity-10 border border-current uppercase tracking-wider`}>
                {status}
            </span>
        </div>
        <p className="text-[#627382] text-[16px] font-medium uppercase tracking-widest mb-[6px]">{label}</p>
        <div className="flex items-baseline gap-[6px]">
            <span className="text-[#0D1C2E] text-[32px] font-medium">{value}</span>
            <span className="text-[#627382] text-[16px] font-medium">{unit}</span>
        </div>
    </div>
);

const HealthStatusCard = ({ label, icon, status, statusIcon, note, colorClass, borderClass, glowClass, onClick }) => (
    <div
        onClick={onClick}
        className={`bg-white rounded-[24px] p-6 flex flex-col items-center flex-1 shadow-sm border ${borderClass} group cursor-pointer hover:shadow-md transition-shadow`}
    >
        <p className="text-[#627382] text-[11px] font-medium uppercase tracking-[0.2em] mb-4">{label}</p>

        {/* Circle with glow */}
        <div className="relative mb-5">
            <div className={`absolute inset-0 rounded-full blur-[20px] opacity-40 transition-all group-hover:blur-[25px] group-hover:opacity-60 ${glowClass}`}></div>
            <div className={`relative w-[92px] h-[92px] rounded-full flex items-center justify-center text-white shadow-lg transition-transform ${colorClass}`}>
                <div className="animate-pump">
                    {icon}
                </div>
            </div>
        </div>

        <div className="flex flex-col items-center">
            <div className="flex items-center gap-[8px] mb-[6px]">
                <div className={`w-[20px] h-[20px] rounded-full flex items-center justify-center border-[1.5px] ${borderClass.replace('border-', 'text-').replace('-100', '-500')}`}>
                    {statusIcon}
                </div>
                <span className={`text-[17px] font-medium tracking-tight ${colorClass.replace('bg-', 'text-')}`}>{status}</span>
            </div>
            <p className="text-[#627382] text-[16px] font-medium leading-relaxed">{note}</p>
        </div>
    </div>
);

/* ─────────────────────────────────────────────
   MAIN VITALS PAGE
───────────────────────────────────────────── */

const Vitals = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState('Vitals');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null); // 'profile' | 'account' | null
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
    const [isHeartModalOpen, setIsHeartModalOpen] = useState(false);
    const [isPressureModalOpen, setIsPressureModalOpen] = useState(false);
    const [isBreathingModalOpen, setIsBreathingModalOpen] = useState(false);
    const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [isConnectOpen, setIsConnectOpen] = useState(false);

    const isAnyModalOpen = activeModal || isNotificationOpen || isAddDeviceOpen || isHeartModalOpen || isPressureModalOpen || isBreathingModalOpen || isGenerateModalOpen || isReportOpen || isConnectOpen;

    return (
        <div
            className="relative h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}
        >
            {/* Wrapper for blurring everything including sidebar */}
            <div className={`flex h-full w-full transition-all duration-500 ${isAnyModalOpen ? 'blur-md pointer-events-none' : ''}`}>
                {/* Sidebar */}
                <Sidebar
                    active={active}
                    setActive={setActive}
                    isMobileOpen={isMobileOpen}
                    setIsMobileOpen={setIsMobileOpen}
                />

                {/* Main Area */}
                <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

                    {/* Header Navbar */}
                    <header className="h-[72px] flex items-center gap-4 px-6 md:px-8 shrink-0 border-b border-white/5 mb-1 z-20">

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
                                <div onClick={() => setActiveModal('profile')} className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform"><img src={phImg} alt="User" className="w-full h-full object-cover" /></div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 px-[20px] md:px-[40px] pb-[40px] overflow-y-auto pt-[8px]">

                        {/* Hero Stats */}
                        <div className="mt-4 mb-6">
                            <p className="text-white/60 text-[14px] font-medium uppercase tracking-[0.2em] mb-1.5">Patient Vitals Overview</p>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-[24px]">
                                <div>
                                    <h2 className="text-white text-[30px] font-semibold leading-tight tracking-tight mb-[12px]">Marcus Holloway</h2>
                                    <div className="flex items-center gap-[24px] text-white/80 text-[16px]">
                                        <div className="flex items-center gap-[8px]">
                                            <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                            <span className="font-medium">42 years</span>
                                        </div>
                                        <div className="flex items-center gap-[8px]">
                                            <div className="w-[4px] h-[4px] rounded-full bg-white/40" />
                                            <span className="font-medium">182 cm</span>
                                        </div>
                                        <div className="flex items-center gap-[8px]">
                                            <div className="w-[4px] h-[4px] rounded-full bg-white/40" />
                                            <span className="font-medium">78 kg</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsGenerateModalOpen(true)}
                                    className="flex items-center gap-[10px] bg-white text-[#0B1F4D] px-[24px] py-[13px] rounded-full font-medium text-[16px] shadow-lg hover:bg-gray-100 transition-all hover:-translate-y-1"
                                >
                                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Export History
                                </button>
                            </div>
                        </div>

                        {/* Vitals Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                            <VitalStatCard
                                icon={<svg className="w-[24px] h-[24px] text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>}
                                label="Heart Rate"
                                value="72"
                                unit="bpm"
                                status="Normal"
                                statusColor="text-green-500 border-green-200"
                                bgColor="bg-red-50"
                            />
                            <VitalStatCard
                                icon={<svg className="w-[24px] h-[24px] text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" /></svg>}
                                label="Blood Pressure"
                                value="118/76"
                                unit="mmHg"
                                status="Optimal"
                                statusColor="text-green-500 border-green-200"
                                bgColor="bg-blue-50"
                            />
                            <VitalStatCard
                                icon={<svg className="w-[24px] h-[24px] text-cyan-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" /></svg>}
                                label="Oxygen Level"
                                value="98"
                                unit="% SpO2"
                                status="Excellent"
                                statusColor="text-green-500 border-green-200"
                                bgColor="bg-cyan-50"
                            />
                            <VitalStatCard
                                icon={<svg className="w-[24px] h-[24px] text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-2V5c0-.55.45-1 1-1s1 .45 1 1v6h-2z" /></svg>}
                                label="Temperature"
                                value="36.6"
                                unit="°C"
                                status="Normal"
                                statusColor="text-green-500 border-green-200"
                                bgColor="bg-indigo-50"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.4fr] gap-[32px]">

                            {/* Center Column */}
                            <div className="flex flex-col gap-[32px]">

                                {/* Today's Health Status */}
                                <div className="bg-[#f0f4f5] rounded-[32px] p-7 shadow-inner border border-white/40">
                                    <h3 className="text-[18px] font-medium tracking-tight mb-[2px]">Today's Health Status</h3>
                                    <p className="text-[#627382] text-[14px] italic mb-6">A simple look at how you're doing</p>

                                    <div className="flex flex-col md:flex-row items-center justify-between gap-[20px]">
                                        <HealthStatusCard
                                            onClick={() => setIsHeartModalOpen(true)}
                                            label="Heart"
                                            icon={<svg className="w-[36px] h-[36px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>}
                                            status="GOOD"
                                            statusIcon={<svg className="w-[12px] h-[12px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>}
                                            note="Steady beat"
                                            colorClass="bg-emerald-500"
                                            glowClass="bg-emerald-500"
                                            borderClass="border-emerald-50"
                                        />
                                        <HealthStatusCard
                                            onClick={() => setIsPressureModalOpen(true)}
                                            label="Pressure"
                                            icon={<svg className="w-[36px] h-[36px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M17 12H7m10 0l-4-4m4 4l-4 4" /></svg>}
                                            status="WATCH"
                                            statusIcon={<svg className="w-[12px] h-[12px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
                                            note="Slightly high"
                                            colorClass="bg-amber-500"
                                            glowClass="bg-amber-500"
                                            borderClass="border-amber-100"
                                        />
                                        <HealthStatusCard
                                            onClick={() => setIsBreathingModalOpen(true)}
                                            label="Breathing"
                                            icon={<svg className="w-[36px] h-[36px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 13h5.5l2-5 4 10 2-5H21" /></svg>}
                                            status="GREAT"
                                            statusIcon={<svg className="w-[12px] h-[12px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>}
                                            note="Excellent flow"
                                            colorClass="bg-emerald-500"
                                            glowClass="bg-emerald-500"
                                            borderClass="border-emerald-100"
                                        />
                                    </div>

                                    <div className="mt-[24px] flex items-center justify-center gap-[24px]">
                                        <div className="flex items-center gap-[8px]">
                                            <div className="w-[12px] h-[12px] rounded-full bg-emerald-500" />
                                            <span className="text-[14px] font-medium tracking-widest text-[#627382] uppercase">All Good</span>
                                        </div>
                                        <div className="flex items-center gap-[8px]">
                                            <div className="w-[12px] h-[12px] rounded-full bg-amber-500" />
                                            <span className="text-[14px] font-medium tracking-widest text-[#627382] uppercase">Be Careful</span>
                                        </div>
                                        <div className="flex items-center gap-[8px]">
                                            <div className="w-[10px] h-[10px] rounded-full bg-red-500" />
                                            <span className="text-[13px] font-medium tracking-widest text-[#627382] uppercase">Call Help</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Vitals History Table */}
                                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#f0f4f5]">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-[18px] font-medium tracking-tight">Vitals History</h3>
                                        <button
                                            onClick={() => navigate('/VitalsHistory')}
                                            className="text-[#1A7785] text-[14px] font-medium hover:underline"
                                        >
                                            Full Records ↗
                                        </button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-gray-100 text-[#627382] text-[11px] font-medium uppercase tracking-widest">
                                                    <th className="text-left pb-[16px]">Timestamp</th>
                                                    <th className="text-left pb-[16px]">Type</th>
                                                    <th className="text-left pb-[16px]">Value</th>
                                                    <th className="text-left pb-[16px]">Status</th>
                                                    <th className="pb-[16px]"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {[
                                                    { time: 'Oct 24, 09:12 AM', type: 'Heart Rate', value: '74 bpm', status: 'Optimal', color: 'bg-red-500' },
                                                    { time: 'Oct 24, 08:30 AM', type: 'Blood Pressure', value: '120/80 mmHg', status: 'Normal', color: 'bg-blue-500' }
                                                ].map((row, i) => (
                                                    <tr key={i} className="group hover:bg-gray-50 transition-colors cursor-pointer">
                                                        <td className="py-4 text-[14px] font-medium text-[#627382]">{row.time}</td>
                                                        <td className="py-4">
                                                            <div className="flex items-center gap-[8px]">
                                                                <div className={`w-[6px] h-[6px] rounded-full ${row.color}`} />
                                                                <span className="text-[16px] font-medium text-[#0D1C2E]">{row.type}</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 text-[14px] font-medium text-[#0D1C2E] tracking-tight">{row.value}</td>
                                                        <td className="py-4">
                                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium text-emerald-600 bg-emerald-50 border border-emerald-100">{row.status}</span>
                                                        </td>
                                                        <td className="py-4 text-right text-gray-300 group-hover:text-gray-500 transition-colors">
                                                            <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col gap-[32px]">

                                {/* Sync Wearables */}
                                <div className="bg-[#0B3A4F] rounded-[32px] p-6 text-white shadow-xl bg-gradient-to-br from-[#0B3A4F] to-[#125A6C]">
                                    <h3 className="text-[18px] font-medium mb-[2px]">Sync Wearables</h3>
                                    <p className="text-white/60 text-[14px] italic mb-5">Automate your health tracking</p>

                                    <div className="flex flex-col gap-3 mb-5">
                                        <div className="bg-white/10 p-4 rounded-[24px] flex items-center gap-3 border border-white/10 hover:bg-white/15 transition-all group cursor-pointer">
                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0B1F4D]">
                                                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-9h-4V7h-2v4H6v2h4v4h2v-4h4v-2z" /></svg>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-[16px] font-medium">Apple Watch</p>
                                                    <div className="w-[16px] h-[16px] rounded-full bg-emerald-500 flex items-center justify-center">
                                                        <svg className="w-[10px] h-[10px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                                                    </div>
                                                </div>
                                                <p className="text-white/40 text-[10px]">Last synced: 2m ago</p>
                                            </div>
                                        </div>
                                        <div className="bg-white/10 p-[16px] rounded-[24px] flex items-center gap-[12px] border border-white/10 hover:bg-white/15 transition-all group cursor-pointer opacity-70">
                                            <div className="w-[44px] h-[44px] bg-white rounded-full flex items-center justify-center text-[#0B1F4D]">
                                                <svg className="w-[20px] h-[20px]" fill="currentColor" viewBox="0 0 24 24"><path d="M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66 2L12 11h9.34L13.66 5z" /></svg>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-[16px] font-medium">Fitbit Ionic</p>
                                                    <button className="text-[10px] font-medium uppercase text-white/60 hover:text-white transition-colors">Reconnect</button>
                                                </div>
                                                <p className="text-white/40 text-[10px]">Disconnected</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setIsAddDeviceOpen(true)}
                                        className="w-full bg-white text-[#0B1F4D] py-[12px] rounded-full font-medium text-[16px] hover:bg-gray-100 transition-all shadow-md"
                                    >
                                        Add New Device
                                    </button>
                                </div>

                                {/* Health Insight */}
                                <div className="bg-[#EAEDF1] rounded-[32px] p-6 border border-white/50">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-[18px] font-medium text-[#0B1423]">Health Insight</h3>
                                        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#1A7785] shadow-sm">
                                            <svg className="w-[16px] h-[16px]" fill="currentColor" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" /></svg>
                                        </div>
                                    </div>
                                    <p className="text-[#627382] text-[14px] leading-[1.6] font-medium">
                                        Your resting heart rate has decreased by <span className="text-emerald-600 font-medium">4.2%</span> over the last 30 days. This indicates improved cardiovascular efficiency.
                                    </p>
                                </div>

                                {/* Mindful Wellness Card */}
                                <div className="relative rounded-[32px] h-[180px] overflow-hidden group cursor-pointer shadow-lg border border-white/20">
                                    <img src={wellnessImg} alt="Nature" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-5">
                                        <h4 className="text-white text-[18px] font-medium mb-[2px]">Mindful Wellness</h4>
                                        <p className="text-white/60 text-[11px] italic">A calm mind leads to stable vitals.</p>
                                    </div>
                                </div>

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

            <Adddevice
                isOpen={isAddDeviceOpen}
                onClose={() => setIsAddDeviceOpen(false)}
                onSearch={() => {
                    setIsAddDeviceOpen(false);
                    setIsConnectOpen(true);
                }}
            />

            <Connect
                isOpen={isConnectOpen}
                onClose={() => setIsConnectOpen(false)}
            />

            <Heart
                isOpen={isHeartModalOpen}
                onClose={() => setIsHeartModalOpen(false)}
            />

            <Pressure_heart
                isOpen={isPressureModalOpen}
                onClose={() => setIsPressureModalOpen(false)}
            />

            <Breathing
                isOpen={isBreathingModalOpen}
                onClose={() => setIsBreathingModalOpen(false)}
            />

            <Genrate
                isOpen={isGenerateModalOpen}
                onClose={() => setIsGenerateModalOpen(false)}
                onGenerate={() => setIsReportOpen(true)}
            />

            <Health_report
                isOpen={isReportOpen}
                onClose={() => setIsReportOpen(false)}
            />
        </div>
    );
};

export default Vitals;
