import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUrl from '../../assets/vadyago_pat.png';
import phImg from '../../assets/ph.png';
import Sidebar from './Patient_sidebar';
import Profile from './Profile';
import Account from './Account';
import Notification from './notification';
import AllLabReportsModal from './AllLabReportsModal';

// Specific radiology images as requested
import brustImg from '../../assets/brust.png';
import ctImg from '../../assets/ct.png';

/* ─────────────────────────────────────────────
   REUSABLE SUB-COMPONENTS
───────────────────────────────────────────── */

// Lab Report Item
// Lab Report Item
const LabReportItem = ({ name, lab, date, status, iconType }) => {
    const renderIcon = () => {
        if (iconType === 'blood') return <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />;
        if (iconType === 'pill') return <path d="M19.2,2.8C18.1,1.7,16.5,1.7,15.4,2.8L2.8,15.4c-1.1,1.1-1.1,2.7,0,3.8l0,0l0,0c1.1,1.1,2.7,1.1,3.8,0L19.2,6.6C20.3,5.5,20.3,3.9,19.2,2.8z M9.1,11.9l-2.8,2.8l-1.9-1.9l2.8-2.8L9.1,11.9z" />;
        return <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M15,10h-2V8h2V10z M11,10H9V8h2V10z M11,14H9v-2h2V14z M15,14h-2v-2h2V14z" />;
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-[28px] mb-3 last:mb-0 hover:shadow-lg transition-all group">
            <div className="flex items-center gap-5">
                <div className="w-[52px] h-[52px] rounded-[18px] bg-[#E9EDF0] flex items-center justify-center text-[#1A314D]">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">{renderIcon()}</svg>
                </div>
                <div>
                    <h4 className="text-[16px] font-bold text-[#0B2132] leading-tight mb-1">{name}</h4>
                    <p className="text-[13px] text-[#627382] font-semibold">{lab} • {date}</p>
                </div>
            </div>
            <div className="flex items-center gap-10">
                <span className={`px-4 py-1.5 rounded-full text-[13px] font-bold ${status === 'Normal' ? 'bg-[#E1F1F3] text-[#1A7785]' : 'bg-[#FEECEC] text-[#D84C4C]'}`}>
                    {status}
                </span>
                <div className="flex items-center gap-6 text-[#1A314D]/40">
                    <button className="hover:text-[#1A7785] transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg></button>
                    <button className="hover:text-[#1A7785] transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
                </div>
            </div>
        </div>
    );
};

// Radiology Card
const RadiologyCard = ({ img, title, date, location }) => (
    <div className="min-w-[240px] bg-[#EEF5F8] p-3 rounded-[32px] shadow-sm group transition-all hover:shadow-xl hover:-translate-y-1">
        <div className="h-[210px] rounded-[24px] overflow-hidden relative mb-4">
            <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="px-3 pb-3">
            <h4 className="text-[15px] font-[700] text-[#0B2132] leading-tight mb-1">{title}</h4>
            <p className="text-[12px] text-[#627382] font-semibold">{date} • {location}</p>
        </div>
    </div>
);

// Timeline Event
const TimelineEvent = ({ date, type, title, description, badge, badgeColor, showLine }) => (
    <div className="relative pl-10 pb-6 last:pb-0">
        {/* Connection Line */}
        <div className="absolute left-[7px] top-[24px] bottom-0 w-[2px] bg-gray-200 last:hidden" />

        {/* Dot */}
        <div className="absolute left-0 top-1.5 w-[16px] h-[16px] rounded-full bg-white border-[3px] border-[#6ED4D4] z-10 shadow-sm" />

        <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
            <div className="flex-1">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#A9B1BB] mb-1">{date} - {type}</p>
                <h3 className="text-[18px] font-black text-[#0D1C2E] mb-2 tracking-tight">{title}</h3>
                <p className="text-[14px] text-[#627382] leading-relaxed max-w-2xl">{description}</p>
            </div>
            {badge && (
                <div className={`shrink-0 px-4 py-3 rounded-2xl border ${badgeColor || 'bg-white border-gray-100'}`}>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#94A3B8] mb-1 leading-none">Prescribed</p>
                    <p className="text-[13px] font-black text-[#0D1C2E]">{badge}</p>
                </div>
            )}
        </div>
        {showLine && <div className="h-[1px] w-full bg-gray-200 mt-6" />}
    </div>
);

/* ─────────────────────────────────────────────
   MAIN RECORD COMPONENT
───────────────────────────────────────────── */

const Record = () => {
    const [activeMenu, setActiveMenu] = useState('My Records');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null); // 'profile' | 'account' | null
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isAllReportsModalOpen, setIsAllReportsModalOpen] = useState(false);

    const navigate = useNavigate();

    return (
        <div className="flex h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>

            {/* Sidebar */}
            <Sidebar
                active={activeMenu}
                setActive={setActiveMenu}
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
            />

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

                {/* Top Navbar */}
                <header className="h-[72px] flex items-center justify-between px-6 md:px-8 shrink-0 border-b border-white/5 mb-1 z-20">
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

                <main className="flex-1 px-[20px] md:px-[40px] pt-[12px] z-10 relative overflow-y-auto pb-[64px]">
                    <div className="max-w-[1240px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">

                        {/* Title Section */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
                            <div className="flex-1">
                                <h1 className="text-[30px] font-semibold text-white leading-[1.1] tracking-tight mb-2">Health Records</h1>
                                <p className="text-white/70 text-[14px] font-medium">Manage and access your full clinical history securely.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="bg-white hover:bg-gray-50 text-[#0B1F4D] px-4 py-2 rounded-full font-medium text-[13px] shadow-lg flex items-center gap-2 transition-all hover:-translate-y-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                                    Share
                                </button>
                                <button className="bg-[#1A7785] hover:bg-[#125863] text-white px-4 py-2 rounded-full font-medium text-[13px] shadow-lg flex items-center gap-2 transition-all hover:-translate-y-1 border border-white/10">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                    Upload
                                </button>
                                <div className="hidden md:block w-[1px] h-8 bg-white/10 mx-2" />
                                <div className="w-full md:w-[280px] relative">
                                    <input 
                                        type="text"
                                        placeholder="Search records..."
                                        className="w-full bg-white/10 border border-white/10 rounded-full py-[12px] px-[24px] text-white placeholder-white/40 text-[14px] outline-none transition-all focus:ring-2 focus:ring-[#6ED4D4]/50"
                                    />
                                    <svg className="absolute right-[20px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Top Cards Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 mb-8">

                            {/* Lab Reports Section */}
                            <div className="bg-white/95 backdrop-blur-md rounded-[32px] pt-6 md:pt-8 px-6 md:px-8 pb-4 md:pb-5 shadow-xl border border-white/20">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#E1F1F3] flex items-center justify-center text-[#1A7785]">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
                                        </div>
                                        <h2 className="text-[22px] font-bold tracking-tight text-[#0B2132]">Lab Reports</h2>
                                    </div>
                                    <button 
                                        onClick={() => setIsAllReportsModalOpen(true)}
                                        className="text-[14px] font-bold text-[#1A7785] hover:underline decoration-2 underline-offset-4"
                                    >
                                        See more
                                    </button>
                                </div>

                                <LabReportItem name="Comprehensive Metabolic Panel" lab="St. Luke's Diagnostic" date="Oct 24, 2023" status="Normal" iconType="blood" />
                                <LabReportItem name="Lipid Profile & Glucose" lab="City Health Labs" date="Sep 12, 2023" status="Follow-up Required" iconType="lab" />
                                <LabReportItem name="Urine Analysis (Routine)" lab="St. Luke's Diagnostic" date="Aug 05, 2023" status="Normal" iconType="pill" />

                                <div className="mt-6 pt-4 border-t border-gray-50 flex justify-center">
                                    <button 
                                        onClick={() => setIsAllReportsModalOpen(true)}
                                        className="flex items-center gap-2 text-[15px] font-bold text-[#1A7785] hover:gap-3 transition-all"
                                    >
                                        See more reports
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Vaccinations Section */}
                            <div className="bg-[#0B1F4D] rounded-[32px] p-6 md:p-7 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                                <div className="absolute top-[-40px] right-[-40px] w-[140px] h-[140px] bg-[#1A7785]/20 rounded-full blur-[50px] pointer-events-none" />
                                <div className="z-10">
                                    <div className="flex items-center gap-3 text-[#A9F1F1] mb-8">
                                        <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                        <h2 className="text-[20px] font-bold tracking-tight text-white uppercase">Vaccinations</h2>
                                    </div>

                                    <div className="space-y-6 mb-10">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Next Due</p>
                                                <h4 className="text-[17px] font-semibold text-white leading-tight">Influenza (Annual)</h4>
                                            </div>
                                            <span className="text-[#A9F1F1] font-bold text-[14px]">Nov 2024</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Last Completed</p>
                                                <h4 className="text-[17px] font-semibold text-white leading-tight">Tetanus Booster</h4>
                                            </div>
                                            <span className="text-white/60 font-bold text-[14px]">May 2023</span>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-white/10 pt-6">
                                            <div>
                                                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Historical</p>
                                                <h4 className="text-[17px] font-semibold text-white leading-tight">COVID-19 (3 Doses)</h4>
                                            </div>
                                            <div className="w-5 h-5 bg-[#6ED4D4] rounded-full flex items-center justify-center text-[#0B1423]">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full bg-white text-[#0B1423] py-4 rounded-2xl font-bold text-[15px] shadow-lg hover:bg-gray-50 transition-all z-10">
                                    View Certificate
                                </button>
                            </div>
                        </div>

                        {/* Imaging & Radiology Section */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-[42px] h-[42px] rounded-xl bg-[#80C8CD] flex items-center justify-center text-[#0B2132] shadow-sm">
                                    <svg className="w-[24px] h-[24px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14h4m-2-2v4" />
                                    </svg>
                                </div>
                                <h2 className="text-[22px] font-bold tracking-tight text-white font-sans">Imaging & Radiology</h2>
                            </div>

                            <div className="flex justify-between w-full overflow-x-auto no-scrollbar pb-6 -mx-[4px] px-[4px]">
                                <RadiologyCard img={brustImg} title="Chest X-Ray (PA View)" date="Nov 15, 2023" location="St. Mary's" />
                                <RadiologyCard img={ctImg} title="Abdominal MRI" date="Oct 02, 2023" location="Radiance Center" />

                                <div className="min-w-[240px] bg-[#EEF5F8] rounded-[32px] p-3 shadow-sm flex flex-col group transition-all hover:shadow-xl cursor-default">
                                    <div className="h-[210px] bg-[#DAE7EB] rounded-[24px] flex flex-col items-center justify-center mb-4">
                                        <div className="w-[36px] h-[36px] rounded-full border-[2.5px] border-[#A8BCC3] flex items-center justify-center text-[#A8BCC3]">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="1.5"/>
                                                <circle cx="8" cy="12" r="1.5"/>
                                                <circle cx="16" cy="12" r="1.5"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="px-3 pb-3">
                                        <h4 className="text-[15px] font-[700] text-[#0B2132]">Dental OPG Scan</h4>
                                        <p className="text-[12px] text-[#1D7489] font-bold mt-1 italic">Processing Results...</p>
                                    </div>
                                </div>

                                <div className="min-w-[240px] bg-[#89B6BB] rounded-[32px] p-8 border-[2.5px] border-dashed border-[#A8C7CD] flex flex-col items-center justify-center transition-all hover:bg-[#80B0B5] cursor-pointer">
                                    <div className="w-[48px] h-[48px] rounded-xl bg-transparent flex items-center justify-center text-[#0B2132]/80 mb-5 border border-[#0B2132]/20 shadow-sm">
                                        <svg className="w-[28px] h-[28px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 4v16m8-8H4" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                    </div>
                                    <h4 className="text-[17px] font-[800] text-[#0B2132] text-center mb-1 leading-tight">Request Older Scans</h4>
                                    <p className="text-[12px] text-[#0B2132]/60 text-center font-semibold leading-relaxed">Archives from 2020-2022 available</p>
                                </div>
                            </div>
                        </div>

                        {/* Timeline Section */}
                        <div className="bg-white/95 backdrop-blur-md rounded-[32px] p-5 md:p-6 shadow-xl border border-white/20">
                            <div className="flex items-center gap-2 text-[#1A7785] mb-6">
                                <div className="w-[36px] h-[36px] rounded-xl bg-[#F0F7F8] flex items-center justify-center text-[#16879B]">
                                    <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                </div>
                                <h2 className="text-[20px] font-black tracking-tight text-[#0D1C2E] uppercase">Medical History & Timeline</h2>
                            </div>

                            <div className="max-w-5xl mx-auto">
                                <TimelineEvent
                                    date="Nov 2023"
                                    type="Diagnosis"
                                    title="Seasonal Rhinitis"
                                    description="Consultation with Dr. Sarah Jenkins regarding persistent sneezing and congestion. Prescribed antihistamine regimen for 14 days."
                                    badge="Loratadine 10mg"
                                    showLine={true}
                                />
                                <TimelineEvent
                                    date="May 2023"
                                    type="Procedure"
                                    title="Minor Outpatient Surgery"
                                    description="Endoscopic procedure at St. Mary's Surgical Center. Recovery monitored over 48 hours without complications."
                                    badge="St. Mary's General"
                                    showLine={true}
                                />
                                <TimelineEvent
                                    date="Jan 2022"
                                    type="Wellness Visit"
                                    title="Annual Physical Examination"
                                    description="Comprehensive health screening. All vitals within normal range. Recommended increased vitamin D intake."
                                />
                            </div>
                        </div>

                        {/* Footer Section */}
                        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8 pb-5 opacity-60">
                            <div className="text-[12px] font-bold text-white/60 text-center md:text-left">
                                © 2024 VaidyaGo. All medical data is encrypted and HIPAA compliant.
                            </div>
                            <div className="flex gap-8 text-[12px] font-black uppercase tracking-widest text-white/50">
                                <button className="hover:text-white transition-colors">Privacy Policy</button>
                                <button className="hover:text-white transition-colors">Terms of Service</button>
                                <button className="hover:text-white transition-colors">Contact Support</button>
                            </div>
                        </div>
                    </div>
                </main>
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
            {isAllReportsModalOpen && <AllLabReportsModal onClose={() => setIsAllReportsModalOpen(false)} />}
        </div>
    );
};

export default Record;
