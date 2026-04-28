import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUrl from '../../assets/vadyago_pat.png';
import phImg from '../../assets/ph.png';
import Sidebar from './Patient_sidebar';
import Profile from './Profile';
import Account from './Account';
import Notification from './notification';

/* ─────────────────────────────────────────────


/* ─────────────────────────────────────────────
   MAIN DASHBOARD
───────────────────────────────────────────── */
const Patient_dashboard = () => {
    const [active, setActive] = useState('Dashboard');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null); // 'profile' | 'account' | null
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const navigate = useNavigate();

    return (
        <div
            className="flex h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}
        >

            {/* ── Sidebar ── */}
            <Sidebar
                active={active}
                setActive={setActive}
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
            />

            {/* ── Main Area ── */}
            <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden ${activeModal || isNotificationOpen ? 'blur-[4px] scale-[0.98] pointer-events-none' : ''}`}>
                {/* Top Navbar */}
                <header className="h-[76px] flex items-center justify-between px-[24px] md:px-[48px] shrink-0 border-b border-white/5 mb-[8px] z-20">
                    
                    {/* Hamburger for Mobile */}
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
                            <div onClick={() => setActiveModal('profile')} className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform"><img src={phImg} alt="User" className="w-full h-full object-cover" /></div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto pb-[64px]">

                    {/* ── Welcome Title ── */}
                    <div className="px-[24px] md:px-[48px] pt-[12px] pb-[32px] shrink-0 w-full max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <h1 className="text-[30px] font-semibold text-white tracking-tight leading-none">
                            Welcome to VaidyaGo
                        </h1>
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

                    {/* ── Content Grid ── */}
                    <div className="flex-1 px-[20px] md:px-[28px] pb-[60px] w-full max-w-[1440px] mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-[24px] w-full">

                            {/* ════ TOP LEFT: Getting Started ════ */}
                            <div className="bg-white rounded-[40px] h-[320px] px-[48px] py-0 flex items-center justify-between shadow-md relative overflow-hidden">
                                {/* Text side */}
                                <div className="relative z-10 flex flex-col justify-center flex-1 pr-8 h-full">
                                    <div>
                                        <div className="inline-block bg-[#E8F8FA] px-[18px] py-[8px] rounded-full mt-4 mb-3">
                                            <span className="text-[13px] font-semibold text-[#16879B] tracking-[0.06em] uppercase">
                                                GETTING STARTED
                                            </span>
                                        </div>
                                        <h2 className="text-[38px] font-bold text-[#0D1C2E] leading-[1.1] mb-[16px] tracking-tight">
                                            Start Your Digital<br />Record
                                        </h2>
                                        <p className="text-[16px] font-normal text-[#5A6A7D] leading-[1.6] max-w-[380px]">
                                            Upload your first prescription or medical report. Our AI will automatically organize your health data into your timeline.
                                        </p>
                                    </div>
                                </div>

                                {/* Illustration Graphic */}
                                <div className="relative z-10 hidden sm:flex shrink-0 w-[220px] items-center justify-center mr-[4%]">
                                    <div className="w-[200px] h-[200px] bg-[#EEF5F8] rounded-[40px] flex items-center justify-center relative border border-white/50">
                                        <svg className="w-[80px] h-[80px] text-[#86C9D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>

                                        {/* QR Icon Overlapping Square */}
                                        <div className="absolute top-[24px] -right-[10px] w-[70px] h-[70px] bg-white rounded-[24px] shadow-[0_15px_30px_rgba(0,0,0,0.1)] flex items-center justify-center">
                                            <svg className="w-[36px] h-[36px] text-[#175B61]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Upload Prescription Button - Positioned on the card's right below illustration */}
                                <label className="absolute bottom-[8px] right-[80px] z-20 flex items-center gap-[10px] bg-gradient-to-r from-[#0B253D] to-[#175B61]
                    text-white text-[14px] font-semibold px-[24px] py-[12px] rounded-full shadow-[0_10px_25px_rgba(11,37,61,0.3)] hover:scale-[1.05] transition-all cursor-pointer">
                                    <input type="file" className="hidden" accept=".pdf, .jpg, .jpeg, .png" onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            navigate('/Patient_dashboard1');
                                        }
                                    }} />
                                    <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <circle cx="12" cy="13" r="3" strokeWidth="2.2" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 8h-3m1.5-1.5v3" />
                                    </svg>
                                    Upload Prescription
                                </label>
                            </div>

                            {/* ════ TOP RIGHT: Medications & Appointments ════ */}
                            <div className="flex flex-col gap-[24px]">
                                {/* Medication Reminders Card */}
                                <div className="bg-[#F2F7FA] rounded-[24px] p-5 shadow-sm flex flex-col flex-1">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-11 h-11 rounded-[12px] bg-white shadow-sm flex items-center justify-center shrink-0">
                                            <svg className="w-[22px] h-[22px] text-[#16879B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {/* Bell with a plus */}
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5M12 21a2 2 0 002-2h-4a2 2 0 002 2zM19 8v4m-2-2h4" />
                                            </svg>
                                        </div>
                                        <h4 className="text-[16px] font-bold text-[#0D1C2E]">Medication Reminders</h4>
                                    </div>
                                    <p className="text-[13.5px] text-[#5A6A7D] mt-1 leading-[1.5]">
                                        Never miss a dose. Set up your schedule and get notified on time.
                                    </p>
                                    <div className="mt-auto pt-3">
                                        <button className="text-[13px] font-bold text-[#16879B] self-start hover:text-[#0f5966] transition-colors flex items-center gap-1.5 group">
                                            Set your first reminder
                                            <svg className="w-[14px] h-[14px] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Appointments Card */}
                                <div className="bg-[#F2F7FA] rounded-[24px] p-5 shadow-sm flex flex-col flex-1">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-11 h-11 rounded-[12px] bg-white shadow-sm flex items-center justify-center shrink-0">
                                            <svg className="w-[22px] h-[22px] text-[#16879B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 14h6M9 11h6" />
                                            </svg>
                                        </div>
                                        <h4 className="text-[16px] font-bold text-[#0D1C2E]">Appointments</h4>
                                    </div>
                                    <p className="text-[13.5px] text-[#5A6A7D] mt-1 leading-[1.5]">
                                        Keep all your upcoming doctor visits in one organized view.
                                    </p>
                                    <div className="mt-auto pt-3">
                                        <button className="text-[13px] font-bold text-[#16879B] self-start hover:text-[#0f5966] transition-colors flex items-center gap-1.5 group">
                                            Schedule an appointment
                                            <svg className="w-[14px] h-[14px] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* ════ BOTTOM LEFT: Vitals ════ */}
                            <div className="bg-[#F2F7FA] rounded-[24px] p-5 shadow-sm flex flex-col min-h-[200px]">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-[18px] font-bold text-[#0D1C2E]">Your Vitals</h3>
                                    <button className="text-[#68C3CF] hover:text-[#16879B] transition-colors">
                                        <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex-1 flex flex-col items-center justify-center py-1">
                                    {/* Graphic Chart & Info */}
                                    <div className="relative w-[110px] h-[90px] flex items-end justify-center gap-[6px] mb-3 mx-auto">
                                        <div className="w-[14px] h-[30px] bg-[#DEE8EC] rounded-sm"></div>
                                        <div className="w-[14px] h-[60px] bg-[#DEE8EC] rounded-sm mb-[10px]"></div>
                                        <div className="w-[14px] h-[44px] bg-[#DEE8EC] rounded-sm"></div>
                                        <div className="absolute bottom-[-6px] left-[50%] -translate-x-[50%] w-[100px] h-[6px] bg-[#DEE8EC] rounded-md pointer-events-none"></div>
                                        <div className="absolute top-[35%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[32px] h-[32px] bg-[#F2F7FA] border-[2.5px] border-white rounded-full shadow-sm flex items-center justify-center">
                                            <svg className="w-[18px] h-[18px] text-[#144754]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="9" strokeWidth="2.5" />
                                                <path strokeLinecap="round" strokeWidth="2.5" d="M12 11v4m0-8h.01" />
                                            </svg>
                                        </div>
                                    </div>

                                    <p className="text-[17px] font-bold text-[#0D1C2E] mt-3">No data yet</p>
                                    <p className="text-[13.5px] text-[#5A6A7D] text-center mt-1.5 leading-[1.6] max-w-[280px]">
                                        Your vital trends will appear here once you start tracking metrics like BP, HR, or Weight.
                                    </p>
                                    <button className="mt-6 border-[1.5px] border-[#16879B] text-[13px] font-bold text-[#16879B] px-[28px] py-[9px] rounded-full hover:bg-white transition-colors bg-transparent shadow-sm">
                                        Log First Metric
                                    </button>
                                </div>
                            </div>

                            {/* ════ BOTTOM RIGHT: Recent Journey ════ */}
                            <div className="bg-[#F2F7FA] rounded-[24px] p-[32px] shadow-sm flex flex-col">
                                <h3 className="text-[20px] font-bold text-[#0D1C2E] mb-[32px]">Recent Journey</h3>

                                <div className="flex flex-col relative h-full">
                                    {/* Vertical Connector Line */}
                                    <div className="absolute left-[20px] top-[40px] h-[calc(100%-80px)] w-[1.5px] bg-[#D7E2E4]" />

                                    {/* 1. Account Created */}
                                    <div className="flex items-start gap-[16px] pb-[40px] relative z-10">
                                        <div className="w-[42px] h-[42px] rounded-full bg-white border border-[#D7E2E4] shadow-[0_2px_10px_rgba(0,0,0,0.06)] flex items-center justify-center shrink-0">
                                            <svg className="w-[20px] h-[20px] text-[#144754]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 8v4m2-2h-4" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0 pt-[2px]">
                                            <p className="text-[14.5px] font-[800] text-[#0D1C2E] leading-tight mb-[2px]">Account Created</p>
                                            <p className="text-[11px] text-[#869BA5] font-[500] mb-[8px]">Today, 10:24 AM</p>
                                            <p className="text-[13px] text-[#5A6A7D] leading-[1.5]">
                                                Welcome to the family! You've taken the first step towards better health management.
                                            </p>
                                        </div>
                                    </div>

                                    {/* 2. First Record */}
                                    <div className="flex items-start gap-[16px] relative z-10">
                                        <div className="w-[42px] h-[42px] rounded-full bg-transparent border-[1.5px] border-[#D7E2E4] border-dashed flex items-center justify-center shrink-0">
                                            <svg className="w-[20px] h-[20px] text-[#B0C4C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 pt-[8px]">
                                            <p className="text-[14.5px] font-[800] text-[#B0C4C9] leading-tight mb-[2px]">First Record</p>
                                            <p className="text-[11px] text-[#B0C4C9] font-[500] mb-[6px]">Pending</p>
                                            <p className="text-[13px] text-[#B0C4C9] italic">Waiting for your first upload...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ── Bottom Quote Bar ── */}
                    <div className="px-[20px] md:px-[28px] pb-[32px] pt-[8px] shrink-0">
                        <div className="flex items-center gap-[10px] w-full max-w-[600px] bg-[#fdfdfd] rounded-full px-[20px] py-[12px] shadow-sm">
                            <svg className="w-[18px] h-[18px] text-[#42b7c7] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S12 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9z" />
                            </svg>
                            <p className="text-[13.5px] text-[#175B61] italic font-medium">
                                "The greatest wealth is health. We're here to help you protect it."
                            </p>
                        </div>
                    </div>
                </main>
            </div>

            {/* ── Floating + FAB (bottom right) ── */}
            <button
                className="fixed bottom-[24px] right-[24px] z-[60] w-[46px] h-[46px] rounded-full
          bg-[#0b1f2d] hover:bg-[#091828] text-white flex items-center justify-center
          shadow-xl hover:shadow-2xl transition-all hover:scale-110 active:scale-95
          border border-white/20"
            >
                <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m-8-8h16" />
                </svg>
            </button>

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
        </div>
    );
};

export default Patient_dashboard;
