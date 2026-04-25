import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Patient_sidebar';
import Profile from '../Profile';
import Account from '../Account';
import Notification from '../notification';
import phImg from '../../../assets/ph.png';
import mapImg from '../../../assets/map.png';
import Reminder from './Reminder';
import Request_refill from './Request_refill';

const Atorvastatin = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState('Medications');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isReminderOpen, setIsReminderOpen] = useState(false);
    const [isRefillOpen, setIsRefillOpen] = useState(false);

    return (
        <div className="relative h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
             style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>
            
            {/* Main Content Wrapper */}
            <div className={`flex h-full w-full transition-all duration-300 ${activeModal || isNotificationOpen || isReminderOpen || isRefillOpen ? 'blur-[4px] scale-[0.98]' : ''}`}>
                
                <Sidebar active={active} setActive={setActive} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

                <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                    {/* Top Navbar */}
                    <header className="h-[72px] flex items-center gap-4 px-6 md:px-8 shrink-0 border-b border-white/5 mb-1">
                        <button 
                            onClick={() => navigate('/Medication')}
                            className="w-[40px] h-[40px] rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all group shrink-0"
                            title="Back to Medications"
                        >
                            <svg className="w-[20px] h-[20px] group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
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
                                <div onClick={() => setActiveModal('profile')} className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform">
                                    <img src={phImg} alt="User" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-4 pb-12 overflow-y-auto custom-scrollbar">
                        {/* Page Header Area */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                            <div className="flex-1">
                                <span className="bg-[#6ED4D4]/20 text-[#6ED4D4] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#6ED4D4]/30 mb-4 inline-block">
                                    Active Regimen
                                </span>
                                <h1 className="text-[42px] font-bold text-white leading-tight mb-2 tracking-tight">Atorvastatin 20mg Oral Tablet</h1>
                                <div className="flex items-center gap-4 text-white/50 text-[14px] font-medium">
                                    <span>Patient: Alex Rivera</span>
                                    <span className="w-1 h-1 rounded-full bg-white/20" />
                                    <span>Card No: VG-8829-X</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 mb-2">
                                <button 
                                    onClick={() => setIsRefillOpen(true)}
                                    className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[14px] font-bold transition-all backdrop-blur-md"
                                >
                                    Request Refill
                                </button>
                                <button 
                                    onClick={() => setIsReminderOpen(true)}
                                    className="px-8 py-3 rounded-full bg-[#1A7785] text-white text-[14px] font-bold hover:brightness-110 transition-all shadow-xl shadow-[#1A7785]/20"
                                >
                                    Set Reminder
                                </button>
                            </div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
                            
                            {/* Left Column */}
                            <div className="flex flex-col gap-6">
                                
                                {/* Current Dosage Card */}
                                <div className="bg-white rounded-[32px] p-8 shadow-xl relative overflow-hidden">
                                    <div className="flex items-start justify-between mb-8">
                                        <div>
                                            <h3 className="text-[11px] font-bold text-[#627382] uppercase tracking-[0.2em] mb-6">Current Dosage</h3>
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 rounded-2xl bg-[#EBF5F6] flex items-center justify-center text-[#1A7785]">
                                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h2 className="text-[28px] font-bold text-[#0D1C2E]">1 Tablet, Once Daily</h2>
                                                    <p className="text-[#627382] text-[15px] font-medium">Take at night for maximum effectiveness.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="opacity-5 absolute -right-4 -top-4">
                                            <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                                        <div>
                                            <p className="text-[9px] font-bold text-[#627382] uppercase tracking-[0.2em] mb-1">Next Dose</p>
                                            <p className="text-[15px] font-bold text-[#0D1C2E]">Today, 10:00 PM</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold text-[#627382] uppercase tracking-[0.2em] mb-1">Last Taken</p>
                                            <p className="text-[15px] font-bold text-[#0D1C2E]">Yesterday, 09:50 PM</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Prescription Details */}
                                    <div className="bg-[#F8FAFB] rounded-[32px] p-8 border border-white shadow-sm">
                                        <h3 className="text-[11px] font-bold text-[#1A7785] uppercase tracking-[0.2em] mb-6">Prescription Details</h3>
                                        <div className="space-y-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1A7785] shadow-sm shrink-0">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-[#627382] font-medium uppercase tracking-wider mb-0.5">Prescribing Physician</p>
                                                    <p className="text-[16px] font-bold text-[#0D1C2E]">Dr. Sarah Chen</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1A7785] shadow-sm shrink-0">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-[#627382] font-medium uppercase tracking-wider mb-0.5">Preferred Pharmacy</p>
                                                    <p className="text-[16px] font-bold text-[#0D1C2E]">Wellness Pharma Lab</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4 text-[#1A7785]">
                                                <div className="w-10 h-10 rounded-xl bg-[#EBF5F6] flex items-center justify-center shrink-0">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-medium uppercase tracking-wider mb-0.5 opacity-70">Refills Remaining</p>
                                                    <p className="text-[16px] font-bold">5 Refills Available</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pharmacy Map */}
                                    <div className="bg-[#F8FAFB] rounded-[32px] overflow-hidden border border-white shadow-sm flex flex-col">
                                        <div className="flex-1 relative min-h-[160px]">
                                            <img src={mapImg} alt="Pharmacy Map" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/5" />
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                <div className="w-8 h-8 rounded-full bg-[#0D1C2E] flex items-center justify-center text-white border-2 border-white shadow-lg">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <p className="text-[15px] font-bold text-[#0D1C2E]">City Health Pharma</p>
                                            <p className="text-[12px] text-[#627382] font-medium mb-4">442 Health Blvd, Ste 102</p>
                                            <button className="text-[11px] font-black text-[#1A7785] uppercase tracking-widest hover:opacity-70 flex items-center gap-2">
                                                Get Directions <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Usage Instructions */}
                                <div className="bg-white rounded-[32px] p-8 shadow-sm">
                                    <h3 className="text-[11px] font-bold text-[#1A7785] uppercase tracking-[0.2em] mb-6">Usage Instructions</h3>
                                    <div className="space-y-5">
                                        {[
                                            "Take this medication by mouth once daily, with or without food.",
                                            "The dosage is based on your medical condition and response to treatment.",
                                            "Avoid drinking large amounts of grapefruit juice while taking this medication.",
                                            "Take this medication regularly at the same time each day (usually in the evening) to get the most benefit."
                                        ].map((step, i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="w-6 h-6 rounded-full bg-[#EBF5F6] flex items-center justify-center text-[#1A7785] text-[12px] font-bold shrink-0">
                                                    {i + 1}
                                                </div>
                                                <p className="text-[14px] text-[#627382] font-medium leading-relaxed">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col gap-6">
                                
                                {/* Physical Appearance */}
                                <div className="bg-white rounded-[32px] overflow-hidden shadow-xl">
                                    <div className="h-[200px] bg-[#EBF5F6] flex items-center justify-center p-8">
                                        <div className="w-24 h-24 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-[10px] font-bold text-[#1A7785] uppercase tracking-widest">
                                            ATV 20
                                        </div>
                                    </div>
                                    <div className="p-6 text-center">
                                        <p className="text-[10px] font-bold text-[#627382] uppercase tracking-[0.2em] mb-1">Physical Appearance</p>
                                        <p className="text-[15px] font-bold text-[#0D1C2E]">White, Round, Imprint 'ATV 20'</p>
                                    </div>
                                </div>

                                {/* Clinical Profile */}
                                <div className="bg-[#0D1C2E] rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#1A7785]/20 to-transparent rounded-full -mr-16 -mt-16" />
                                    <h3 className="text-[12px] font-bold text-[#6ED4D4] uppercase tracking-[0.2em] mb-8">Clinical Profile</h3>
                                    
                                    <div className="space-y-8 relative z-10">
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <svg className="w-4 h-4 text-[#6ED4D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <p className="text-[14px] font-bold">Common Uses</p>
                                            </div>
                                            <p className="text-[13px] text-white/60 leading-relaxed">
                                                Used along with a proper diet to help lower "bad" cholesterol and fats and raise "good" cholesterol in the blood.
                                            </p>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <svg className="w-4 h-4 text-[#6ED4D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                                <p className="text-[14px] font-bold">Storage Tips</p>
                                            </div>
                                            <p className="text-[13px] text-white/60 leading-relaxed">
                                                Store at room temperature away from light and moisture.
                                            </p>
                                        </div>

                                        <div className="bg-white/5 rounded-[24px] p-6 border border-white/5">
                                            <div className="flex items-center gap-2 mb-4 text-[#FFB020]">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                                <p className="text-[12px] font-bold uppercase tracking-wider">Watch For</p>
                                            </div>
                                            <ul className="space-y-2 text-[13px] text-white/80 font-medium">
                                                <li>• Muscle pain or weakness</li>
                                                <li>• Signs of liver problems</li>
                                                <li>• Dark urine</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Adherence History */}
                                <div className="bg-white rounded-[32px] p-8 shadow-xl">
                                    <h3 className="text-[11px] font-bold text-[#627382] uppercase tracking-[0.2em] mb-6">Adherence History</h3>
                                    <div className="h-24 flex items-end gap-2 mb-4">
                                        {[60, 75, 80, 90, 85, 95].map((h, i) => (
                                            <div 
                                                key={i} 
                                                className={`flex-1 rounded-t-lg transition-all duration-1000 ${i === 5 ? 'bg-[#006A70]' : 'bg-[#49AAB3] opacity-60'}`}
                                                style={{ height: `${h}%` }}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-center text-[11px] font-black text-[#1A7785] uppercase tracking-widest">
                                        81% Compliance Rate
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* Modals */}
            {activeModal === 'profile' && <Profile onClose={() => setActiveModal(null)} onAccountSettings={() => setActiveModal('account')} />}
            {activeModal === 'account' && <Account onClose={() => setActiveModal(null)} />}
            {isNotificationOpen && <Notification isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />}
            {isReminderOpen && <Reminder onClose={() => setIsReminderOpen(false)} />}
            {isRefillOpen && <Request_refill onClose={() => setIsRefillOpen(false)} onConfirm={() => setIsRefillOpen(false)} />}
        </div>
    );
};

export default Atorvastatin;
