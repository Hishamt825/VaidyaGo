import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Patient_sidebar';
import Profile from '../Profile';
import Account from '../Account';
import Notification from '../notification';
import phImg from '../../../assets/ph.png';
import regimenBg from '../../../assets/regimen_abstract_bg.png';
import Daily_report from './Daily_report';
import Update_logs from './Update_logs';

const Medication1 = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState('Medications');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null); // 'profile' | 'account' | null
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isDailyReportOpen, setIsDailyReportOpen] = useState(false);
    const [isUpdateLogsOpen, setIsUpdateLogsOpen] = useState(false);

    return (
        <div className="relative h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
             style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>
            
            {/* Main Content Wrapper - This gets blurred */}
            <div className={`flex h-full w-full transition-all duration-300 ${isDailyReportOpen || isUpdateLogsOpen || activeModal || isNotificationOpen ? 'blur-[4px] scale-[0.98]' : ''}`}>
            
            <Sidebar active={active} setActive={setActive} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Top Navbar */}
                <header className="h-[72px] flex items-center justify-between px-6 md:px-8 shrink-0 border-b border-white/5 mb-1">
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


                    <div className="flex items-center gap-[32px]">
                        <span className="text-white/80 hover:text-white text-[13px] font-medium hidden md:block cursor-pointer transition-colors">Language</span>
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
                    
                    {/* Page Title & Search Bar */}
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

                    {/* Unified 2-Column Dashboard Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
                        
                        {/* Left Main Dashboard Column */}
                        <div className="flex flex-col gap-6">
                            
                            {/* Active Regimen Overview */}
                            <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col md:flex-row gap-8 min-h-[240px]">
                                <div className="flex-1 z-10 relative">
                                    <h2 className="text-[28px] font-[900] text-[#0D1C2E] mb-2">Active Regimen Overview</h2>
                                    <p className="text-[#627382] text-[15px] leading-relaxed mb-6 max-w-[400px]">
                                        You have 4 medications scheduled for today. Your next dose of <span className="font-medium text-[#0D1C2E]">Lisinopril</span> is at 2:00 PM.
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

                            {/* Today's Schedule */}
                            <div className="bg-white rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-[18px] font-[900] text-[#0D1C2E]">Today's Schedule</h2>
                                    <span className="text-[10px] font-medium text-[#627382] uppercase tracking-[0.2em] bg-[#EAEFF2] px-3 py-1 rounded-full">Mon, Oct 23</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    {/* Morning */}
                                    <div className="bg-white hover:bg-[#effafb] rounded-[24px] p-5 border border-gray-200 hover:border-[#1A7785]/20 relative transition-all hover:shadow-lg group flex overflow-hidden cursor-pointer">
                                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#1A7785] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="flex-1 pl-[4px]">
                                            <div className="flex items-center justify-between mb-[20px]">
                                                <span className="text-[10px] font-medium text-[#627382] group-hover:text-[#1A7785] uppercase tracking-[0.15em] transition-colors">Morning</span>
                                                <div className="w-[24px] h-[24px] rounded-full bg-gray-100 group-hover:bg-[#1A7785] flex items-center justify-center text-gray-400 group-hover:text-white shadow-sm transition-all">
                                                    <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <h3 className="text-[18px] font-medium text-[#0D1C2E] mb-1">Metformin</h3>
                                            <p className="text-[14px] text-[#4B707E] mb-4 font-medium tracking-tight">500mg • with food</p>
                                            <div className="bg-[#EAEFF2] group-hover:bg-[#d2eded] text-[#627382] group-hover:text-[#1A7785] py-1 px-4 rounded-full text-[10px] font-medium inline-block tracking-tight transition-colors">
                                                Taken at 8:15 AM
                                            </div>
                                        </div>
                                    </div>
                                    {/* Afternoon - Pending */}
                                    <div className="bg-white hover:bg-[#effafb] rounded-[24px] p-5 border border-gray-200 hover:border-[#1A7785]/20 shadow-[0_4px_25px_rgba(0,0,0,0.03)] transition-all hover:shadow-lg group relative overflow-hidden cursor-pointer">
                                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#1A7785] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] font-medium text-[#627382] group-hover:text-[#1A7785] uppercase tracking-[0.15em] transition-colors">Afternoon</span>
                                            <div className="w-[22px] h-[22px] rounded-full border-[2.2px] border-gray-200 group-hover:border-[#1A7785] flex items-center justify-center text-gray-300 group-hover:text-[#1A7785] transition-colors">
                                                <svg className="w-[12px] h-[12px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="text-[18px] font-medium text-[#0D1C2E] mb-1">Lisinopril</h3>
                                        <p className="text-[14px] text-[#627382] mb-4 font-medium tracking-tight">10mg • 2:00 PM</p>
                                        <button className="w-full bg-[#006A70] hover:bg-[#005a5f] text-white py-2.5 rounded-[12px] font-medium text-[15px] transition-all tracking-tight shadow-lg shadow-[#1A7785]/20">
                                            Mark Taken
                                        </button>
                                    </div>
                                    {/* Evening */}
                                    <div className="bg-white hover:bg-[#effafb] rounded-[24px] p-5 border border-gray-200 hover:border-[#1A7785]/20 shadow-sm opacity-60 hover:opacity-100 transition-all group relative overflow-hidden cursor-pointer">
                                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#1A7785] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] font-medium text-[#627382] group-hover:text-[#1A7785] uppercase tracking-[0.15em] transition-colors">Evening</span>
                                            <div className="w-[22px] h-[22px] rounded-full border-[2px] border-gray-200 group-hover:border-[#1A7785] flex items-center justify-center text-gray-300 group-hover:text-[#1A7785] transition-colors">
                                            </div>
                                        </div>
                                        <h3 className="text-[18px] font-medium text-[#0D1C2E] mb-1">Omega-3</h3>
                                        <p className="text-[14px] text-[#627382] mb-4 font-medium tracking-tight">1000mg • 7:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Active Prescriptions Header & Grid */}
                            <div className="flex flex-col gap-5">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-[18px] font-medium text-white">Active Prescriptions</h2>
                                    <button className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-full text-[14px] font-medium border border-white/10 transition-all">
                                        <svg className="w-[12px] h-[12px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/></svg>
                                        New Request
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="bg-white rounded-[32px] p-6 shadow-sm relative group overflow-hidden border border-gray-50">
                                        <div className="flex justify-between items-start mb-5">
                                            <div className="w-10 h-10 rounded-2xl bg-[#DFEEF0] flex items-center justify-center text-[#1A7785]">
                                                <svg className="w-5 h-5 animate-pump" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                            </div>
                                            <div className="text-right flex flex-col items-end">
                                                <span className="text-[9px] font-medium text-[#627382] uppercase tracking-[0.2em] mb-0.5 opacity-70">Refills Left</span>
                                                <span className="text-[28px] font-medium text-[#0D1C2E] leading-none">04</span>
                                            </div>
                                        </div>
                                        <h3 className="text-[18px] font-medium text-[#0D1C2E] mb-1">Metformin</h3>
                                        <p className="text-[14px] text-[#627382] font-medium mb-6">Type 2 Diabetes Management • Oral Tablet</p>
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <p className="text-[9px] font-medium text-[#627382] uppercase tracking-[0.2em] mb-0.5 opacity-70">Dosage</p>
                                                <p className="text-[14px] font-[900] text-[#0D1C2E]">500mg Twice Daily</p>
                                            </div>
                                            <button className="bg-[#006A70] hover:bg-[#005a5f] text-white px-4 py-2.5 rounded-[14px] font-medium text-[15px] transition-all shadow-lg shadow-[#1A7785]/20">
                                                Request Refill
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-[32px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] relative group overflow-hidden border border-gray-50">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-10 h-10 rounded-2xl bg-[#DFF4F5] flex items-center justify-center text-[#1A7785]">
                                                <svg className="w-5 h-5 animate-pump" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                            </div>
                                            <div className="text-right flex flex-col items-end">
                                                <span className="text-[9px] font-medium text-[#627382] uppercase tracking-[0.2em] mb-0.5 opacity-70">Refills Left</span>
                                                <span className="text-[28px] font-medium text-[#0D1C2E] leading-none">02</span>
                                            </div>
                                        </div>
                                        <h3 className="text-[18px] font-medium text-[#0D1C2E] mb-1">Lisinopril</h3>
                                        <p className="text-[14px] text-[#627382] font-medium mb-6">Blood Pressure Regulation • Oral Tablet</p>
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <p className="text-[9px] font-medium text-[#627382] uppercase tracking-[0.2em] mb-0.5 opacity-70">Dosage</p>
                                                <p className="text-[14px] font-[900] text-[#0D1C2E]">10mg Once Daily</p>
                                            </div>
                                            <button className="bg-[#006A70] hover:bg-[#005a5f] text-white px-4 py-2.5 rounded-[14px] font-medium text-[15px] transition-all shadow-lg shadow-[#1A7785]/20">
                                                Request Refill
                                            </button>
                                        </div>
                                    </div>
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
                                <p className="text-white/50 text-[16px] leading-relaxed mb-[32px]">
                                    Ask me about side effects, interactions, or dosage timings.
                                </p>
                                <div className="flex flex-col gap-[12px] mb-[32px]">
                                    <button className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl px-[20px] py-[12px] text-[16px] font-medium text-white/80 transition-all uppercase tracking-wider">
                                        "METFORMIN + COFFEE?"
                                    </button>
                                    <button className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl px-[20px] py-[12px] text-[16px] font-medium text-white/80 transition-all uppercase tracking-wider">
                                        "LISINOPRIL SIDE EFFECTS?"
                                    </button>
                                </div>
                                <div className="mt-auto relative">
                                    <input 
                                        type="text" 
                                        placeholder="Type your question..."
                                        className="w-full bg-white border-none rounded-2xl py-[14px] pl-[20px] pr-[52px] text-[16px] text-[#0B1423] placeholder-[#627382]/50 outline-none shadow-sm"
                                    />
                                    <button className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[#1A7785] hover:text-[#49AAB3]">
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
                                    <div className="bg-[#EAEFF2] bg-opacity-70 rounded-[20px] p-4 flex items-center justify-between border border-white shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-[#1A7785] shadow-[0_0_8px_rgba(26,119,133,0.4)]" />
                                            <div>
                                                <p className="text-[15px] font-medium text-[#0D1C2E]">Metformin</p>
                                                <p className="text-[10px] text-[#627382] font-medium tracking-wide opacity-60">#REF-6291</p>
                                            </div>
                                        </div>
                                        <span className="text-[9px] font-medium text-white bg-[#006A70] px-3 py-1 rounded-full uppercase tracking-widest">Ready</span>
                                    </div>
                                    <div className="bg-[#F8FAFB] rounded-[20px] p-4 flex items-center justify-between border border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                                            <div>
                                                <p className="text-[15px] font-medium text-[#0D1C2E]">Atorvastatin</p>
                                                <p className="text-[10px] text-[#627382] font-medium tracking-wide opacity-60">#REF-4420</p>
                                            </div>
                                        </div>
                                        <span className="text-[9px] font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-widest opacity-70">Pending</span>
                                    </div>
                                </div>
                                <button className="w-full text-center pt-4 text-[11px] font-black text-[#1A7785] hover:opacity-80 flex items-center justify-center gap-[6px] tracking-[0.1em] uppercase">
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
                        <h2 className="text-[18px] font-medium text-white">Past Medications</h2>
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
                                <tbody className="text-[#0D1C2E]">
                                    <tr className="border-t border-gray-50 hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-[15px]">Amoxicillin</p>
                                            <p className="text-[10px] text-[#627382] font-medium">500mg Capsule</p>
                                        </td>
                                        <td className="px-6 py-4 text-[14px] font-medium text-[#627382]">Jan 2023 - Feb 2023</td>
                                        <td className="px-6 py-4 text-[14px] font-medium text-[#0D1C2E]">Dr. Gregory House</td>
                                        <td className="px-6 py-4 text-[14px] font-medium text-[#627382]">Sinus Infection</td>
                                    </tr>
                                    <tr className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-[15px]">Prednisone</p>
                                            <p className="text-[10px] text-[#627382] font-medium">10mg Tablet</p>
                                        </td>
                                        <td className="px-6 py-4 text-[13px] font-medium text-[#627382]">Aug 2022 - Sept 2022</td>
                                        <td className="px-6 py-4 text-[13px] font-medium text-[#0D1C2E]">Dr. Sarah Chen</td>
                                        <td className="px-6 py-4 text-[13px] font-medium text-[#627382]">Allergic Reaction</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </main>
            </div>
        </div>

        {/* Modals - Outside the blurred content */}
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
                     <Daily_report onClose={() => setIsDailyReportOpen(false)} />
                </div>
            )}
            {isUpdateLogsOpen && (
                <div className="fixed inset-0 z-[200]">
                     <Update_logs onClose={() => setIsUpdateLogsOpen(false)} />
                </div>
            )}
        </div>
    );
};

export default Medication1;



