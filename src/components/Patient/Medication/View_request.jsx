import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Patient_sidebar';
import Profile from '../Profile';
import Account from '../Account';
import Notification from '../notification';
import phImg from '../../../assets/ph.png';
import Progress from './Progress';
import Tomorrow from './Tomorrow';
import Message from './Message';
import Cancel from './Cancel';

const View_request = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState('Medications');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isProgressOpen, setIsProgressOpen] = useState(false);
    const [isTomorrowOpen, setIsTomorrowOpen] = useState(false);
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);

    const medications = [
        { name: 'Lisinopril', dose: '10mg Oral Tablet', freq: 'Once daily (morning)', qty: 30 },
        { name: 'Metformin', dose: '500mg ER Tablet', freq: 'Twice daily with meals', qty: 60 },
        { name: 'Atorvastatin', dose: '20mg Oral Tablet', freq: 'Once daily (night)', qty: 30 },
        { name: 'Amoxicillin', dose: '250mg Capsule', freq: '3 times daily / 7 days', qty: 21 },
    ];

    return (
        <div className="relative h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
             style={{ background: 'linear-gradient(180deg, #0A1A3B 0%, #144C5C 40%, #2D8A94 75%, #5FB9C1 100%)' }}>
            
            {/* Main Content Wrapper */}
            <div className={`flex h-full w-full transition-all duration-300 ${activeModal || isNotificationOpen || isProgressOpen || isTomorrowOpen || isMessageOpen || isCancelOpen ? 'blur-[8px] scale-[0.98]' : ''}`}>
                
                <Sidebar active={active} setActive={setActive} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

                <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                    {/* Top Navbar */}
                    <header className="h-[72px] flex items-center justify-between px-6 md:px-12 shrink-0 border-b border-white/5 mb-1">
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
                                <div onClick={() => setActiveModal('profile')} className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform">
                                    <img src={phImg} alt="User" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-6 pb-12 overflow-y-auto custom-scrollbar">
                        
                        {/* Page Top Actions */}
                        <div className="flex items-center justify-between mb-8">
                            <button onClick={() => navigate('/Medication')} className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-[14px] font-semibold">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to Medication Dashboard
                            </button>
                            <div className="flex items-center gap-6">
                                <button 
                                    onClick={() => setIsMessageOpen(true)}
                                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[14px] font-bold transition-all backdrop-blur-md shadow-lg"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Message Pharmacy
                                </button>
                                <button 
                                    onClick={() => setIsCancelOpen(true)}
                                    className="text-white/60 hover:text-white text-[13px] font-medium transition-colors"
                                >
                                    Cancel Request
                                </button>
                            </div>
                        </div>

                        {/* Page Header Title */}
                        <div className="mb-10">
                            <h1 className="text-[48px] font-bold text-white leading-tight tracking-tight mb-1">Refill Request Details</h1>
                            <p className="text-white/70 text-[18px] font-medium">Alex Rivera • ID #8842-RX</p>
                        </div>                        {/* Main Grid Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
                            
                            {/* Left Column: Status, Track Order, Medications */}
                            <div className="flex flex-col gap-8">
                                
                                {/* Top Info Cards */}
                                <div className="flex flex-wrap md:flex-nowrap gap-5">
                                    <div 
                                        className="w-full md:w-1/2 bg-white rounded-[32px] p-8 shadow-2xl flex flex-col justify-center min-h-[180px] cursor-pointer hover:bg-slate-50 transition-colors group/card"
                                        onClick={() => setIsProgressOpen(true)}
                                    >
                                        <p className="text-[11px] font-bold text-[#627382] uppercase tracking-[0.2em] mb-2.5">Current Status</p>
                                        <h3 className="text-[36px] font-bold text-[#0D1C2E] mb-4 leading-none tracking-tight group-hover/card:text-[#1A7785] transition-colors">In Progress</h3>
                                        <div className="inline-flex items-center gap-2 bg-[#F0F9F9] text-[#1A7785] px-4 py-2 rounded-full text-[12px] font-bold self-start border border-[#6ED4D4]/20">
                                            <div className="w-5 h-5 rounded-full bg-[#1A7785] flex items-center justify-center text-white">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            Verified by Clinician
                                        </div>
                                    </div>
                                    <div 
                                        className="w-full md:w-1/2 bg-[#0A1A3B] rounded-[32px] p-8 shadow-2xl border border-white/5 flex flex-col justify-center min-h-[180px] cursor-pointer hover:bg-[#0D1C2E] transition-colors group/card2"
                                        onClick={() => setIsTomorrowOpen(true)}
                                    >
                                        <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2.5">Estimated Availability</p>
                                        <h3 className="text-[36px] font-bold text-white mb-4 leading-none tracking-tight group-hover/card2:text-[#6ED4D4] transition-colors">Tomorrow, by 4:00 PM</h3>
                                        <div className="flex items-center gap-2 text-white/40 text-[13px] font-medium">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Processing time: 14 hours remaining
                                        </div>
                                    </div>
                                </div>

                                {/* Tracking Timeline */}
                                <div 
                                    className="bg-[#5FB9C1]/30 backdrop-blur-xl rounded-[32px] p-10 border border-white/10 shadow-2xl cursor-pointer hover:bg-[#5FB9C1]/40 transition-all group"
                                    onClick={() => navigate('/Order')}
                                >
                                    <div className="flex items-center justify-between mb-10">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-6 h-6 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                            <h2 className="text-[16px] font-bold text-white uppercase tracking-[0.2em]">Track Order</h2>
                                        </div>
                                        <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                                            <span className="text-[12px] font-bold">View Full Map</span>
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <div className="relative flex justify-between">
                                        <div className="absolute top-[22px] left-[22px] right-[22px] h-[3px] bg-white/10 z-0 rounded-full">
                                            <div className="h-full bg-[#6ED4D4] transition-all duration-1000 shadow-[0_0_15px_rgba(110,212,212,0.8)] rounded-full" style={{ width: '33.33%' }}></div>
                                        </div>
                                        
                                        {[
                                            { label: 'Request Received', date: 'Oct 24, 9:30 AM', status: 'completed', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
                                            { label: 'In Progress', date: 'Oct 24, 11:45 AM', status: 'current', icon: 'M21 13V6a2 2 0 00-2-2H5a2 2 0 00-2 2v7m18 0v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5m18 0h-3.586a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 0014.586 11H9.414a1 1 0 00-.707.293L7.293 12.707A1 1 0 016.586 13H3' },
                                            { label: 'Ready for Pickup', date: 'Estimated Oct 25', status: 'pending', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
                                            { label: 'Completed', date: 'Pending', status: 'pending', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
                                        ].map((step, i) => (
                                            <div key={i} className="relative flex flex-col items-center text-center z-10">
                                                <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-5 transition-all duration-500 ${
                                                    step.status === 'completed' ? 'bg-[#1A7785] text-white shadow-lg' : 
                                                    step.status === 'current' ? 'bg-[#0D1C2E] text-white shadow-[0_0_25px_rgba(13,28,46,0.6)] scale-110 border-2 border-[#6ED4D4]/50' : 
                                                    'bg-white/10 text-white/30 border border-white/10 backdrop-blur-md'
                                                }`}>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={step.icon} />
                                                    </svg>
                                                </div>
                                                <h4 className={`text-[13px] font-bold mb-1.5 leading-tight ${step.status === 'pending' ? 'text-white/40' : 'text-white'}`}>{step.label}</h4>
                                                <p className="text-[11px] text-white/40 font-semibold uppercase tracking-wider">{step.date}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Medication Details Card */}
                                <div className="bg-white rounded-[32px] p-8 shadow-2xl">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-[20px] font-bold text-[#0D1C2E] flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-[#F0F9F9] flex items-center justify-center text-[#1A7785]">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                </svg>
                                            </div>
                                            Medication Details (12)
                                        </h2>
                                        <button className="text-[13px] font-bold text-[#1A7785] hover:opacity-80 transition-opacity border-b-2 border-[#1A7785]/20 pb-0.5">Download Summary</button>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {medications.map((med, i) => (
                                            <div 
                                                key={i} 
                                                onClick={() => {
                                                    if (med.name === 'Lisinopril') {
                                                        navigate('/Lisinopril');
                                                    }
                                                }}
                                                className="bg-[#F8FBFC] border border-[#1A7785]/15 rounded-[28px] p-6 flex items-center justify-between group hover:border-[#1A7785]/40 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#1A7785] shadow-sm border border-[#E9F3F5] rotate-[135deg]">
                                                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
                                                            <path d="m8.5 8.5 7 7" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[17px] font-bold text-[#0D1C2E] leading-tight mb-1">{med.name}</h4>
                                                        <p className="text-[12px] text-[#627382] font-medium mb-2.5">{med.dose}</p>
                                                        <div className="bg-[#E7F5F5] px-3.5 py-1.5 rounded-lg text-[10px] font-bold text-[#1A7785] uppercase tracking-wide inline-block">
                                                            {med.freq}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-bold text-[#627382] uppercase tracking-[0.1em] mb-1">QTY</p>
                                                    <p className="text-[24px] font-bold text-[#0D1C2E] leading-none mb-1">{med.qty}</p>
                                                    <p className="text-[11px] font-bold text-[#627382]">Count</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full mt-8 py-3 text-[12px] font-bold text-[#1A7785] uppercase tracking-[0.2em] hover:bg-[#F4F9F9] rounded-2xl transition-all flex items-center justify-center gap-2 group">
                                        View 8 more medications
                                        <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Right Column: Sidebar (Pharmacy, Insurance, Help) */}
                            <div className="flex flex-col gap-6">
                                {/* Pharmacy Details Card */}
                                <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl border border-white/50">
                                    <div className="h-[180px] relative">
                                        <img src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=800" alt="Pharmacy" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                                        <div className="absolute bottom-5 left-6">
                                            <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.25em] mb-1">Pharmacy Location</p>
                                            <h4 className="text-[22px] font-bold text-white">Sanctuary Pharmacy</h4>
                                        </div>
                                    </div>
                                    <div className="p-8 space-y-6">
                                        <div className="flex items-start gap-5">
                                            <div className="w-11 h-11 rounded-full bg-[#F0F9F9] flex items-center justify-center shrink-0 text-[#1A7785]">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-[15px] font-bold text-[#0D1C2E] mb-1">1202 Healing Way</p>
                                                <p className="text-[13px] text-[#627382] font-medium leading-relaxed">Suite 100, West District<br/>Seattle, WA 98101</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-5">
                                            <div className="w-11 h-11 rounded-full bg-[#F0F9F9] flex items-center justify-center shrink-0 text-[#1A7785]">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-[15px] font-bold text-[#0D1C2E] mb-1">(206) 555-0199</p>
                                                <p className="text-[13px] text-[#627382] font-medium">Ext: Pharmacy Refills</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-5">
                                            <div className="w-11 h-11 rounded-full bg-[#F0F9F9] flex items-center justify-center shrink-0 text-[#1A7785]">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-[15px] font-bold text-[#0D1C2E] mb-1">Hours Today</p>
                                                <p className="text-[13px] text-[#627382] font-medium">08:00 AM – 09:00 PM</p>
                                            </div>
                                        </div>
                                        <button className="w-full bg-[#0D1C2E] text-white py-3.5 rounded-full font-bold text-[15px] flex items-center justify-center gap-2.5 shadow-xl hover:bg-[#152536] transition-all mt-4 group">
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m3 11 19-9-9 19-2-8-8-2Z" />
                                            </svg>
                                            Get Directions
                                        </button>
                                    </div>
                                </div>

                                {/* Insurance Status Card */}
                                <div className="bg-[#5FB9C1]/30 backdrop-blur-xl rounded-[32px] p-8 border border-white/10 shadow-2xl">
                                    <div className="flex items-center gap-3.5 mb-5">
                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h4 className="text-[16px] font-bold text-white uppercase tracking-[0.15em]">Insurance Status</h4>
                                    </div>
                                    <p className="text-white/80 text-[14px] leading-relaxed">
                                        Your primary insurance <span className="text-white font-bold">(BlueShield - Preferred)</span> has been successfully verified for all 12 items. Co-pay estimate: <span className="text-white font-bold text-[20px] ml-1.5">$14.50</span>.
                                    </p>
                                </div>

                                {/* Help Card */}
                                <div className="bg-white/90 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl text-center border border-white">
                                    <h4 className="text-[18px] font-bold text-[#0D1C2E] mb-3">Need help with this request?</h4>
                                    <p className="text-[13px] text-[#627382] font-medium leading-relaxed mb-8 px-2">
                                        Our medical concierge team is available 24/7 for order inquiries.
                                    </p>
                                    <button className="text-[14px] font-bold text-[#1A7785] hover:opacity-80 transition-opacity flex items-center justify-center gap-2.5 mx-auto group">
                                        Connect with Concierge
                                        <svg className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </button>
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
            {isProgressOpen && <Progress onClose={() => setIsProgressOpen(false)} />}
            {isTomorrowOpen && <Tomorrow onClose={() => setIsTomorrowOpen(false)} />}
            {isMessageOpen && <Message onClose={() => setIsMessageOpen(false)} />}
            {isCancelOpen && <Cancel onClose={() => setIsCancelOpen(false)} onConfirm={() => setIsCancelOpen(false)} />}
        </div>
    );
};

export default View_request;
