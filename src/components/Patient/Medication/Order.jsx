import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Patient_sidebar';
import Profile from '../Profile';
import Account from '../Account';
import Notification from '../notification';
import phImg from '../../../assets/ph.png';
import mapImg from '../../../assets/map.png';
import Message from './Message';
import Cancel from './Cancel';

const Order = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState('Medications');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);

    const orderItems = [
        { name: 'Lisinopril', dose: '10mg • 30 Day Supply', qty: 'x1', color: '#6ED4D4' },
        { name: 'Metformin', dose: '500mg • 60 Day Supply', qty: 'x2', color: '#1A7785' },
        { name: 'Amoxicillin', dose: '250mg • 10 Capsules', qty: 'x1', color: '#B2F5EA' },
    ];

    return (
        <div className="relative h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
             style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>
            
            {/* Main Content Wrapper - This gets blurred */}
            <div className={`flex h-full w-full transition-all duration-300 ${activeModal || isNotificationOpen || isMessageOpen || isCancelOpen ? 'blur-[4px] scale-[0.98]' : ''}`}>
                
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

                    <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-5 pb-10 overflow-y-auto custom-scrollbar">
                        
                        {/* Page Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h1 className="text-[32px] font-bold text-white leading-tight mb-1 tracking-tight">Order Tracking</h1>
                                <p className="text-white/60 text-[14px] font-medium">Real-time status of your medical essentials</p>
                            </div>
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

                        {/* Tracking Timeline Bar */}
                        <div className="bg-[#F0F9FA]/40 backdrop-blur-md rounded-[32px] p-8 mb-6 border border-white/20 shadow-sm">
                            <div className="relative flex justify-between">
                                {/* Connector Lines */}
                                <div className="absolute top-[20px] left-[40px] right-[40px] h-[2px] bg-slate-200 z-0">
                                    <div className="h-full bg-[#1A7785] w-[66%]" />
                                </div>

                                {/* Step 1: Order Placed */}
                                <div className="relative z-10 flex flex-col items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#006A70] text-white flex items-center justify-center shadow-md">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[12px] font-bold text-[#0D1C2E]">Order Placed</p>
                                        <p className="text-[10px] text-[#627382] font-medium mt-0.5 tracking-tight">Oct 24, 09:30 AM</p>
                                    </div>
                                </div>

                                {/* Step 2: Refill Processed */}
                                <div className="relative z-10 flex flex-col items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#006A70] text-white flex items-center justify-center shadow-md">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[12px] font-bold text-[#0D1C2E]">Refill Processed</p>
                                        <p className="text-[10px] text-[#627382] font-medium mt-0.5 tracking-tight">Oct 25, 11:20 AM</p>
                                    </div>
                                </div>

                                {/* Step 3: Out for Delivery */}
                                <div className="relative z-10 flex flex-col items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white text-[#1A7785] border-2 border-[#1A7785] flex items-center justify-center shadow-md">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2a1 1 0 011-1h8z" />
                                        </svg>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[12px] font-bold text-[#1A7785]">Out for Delivery</p>
                                        <p className="text-[10px] text-[#627382] font-medium mt-0.5 tracking-tight">Expected by 4:00 PM</p>
                                    </div>
                                </div>

                                {/* Step 4: Delivered */}
                                <div className="relative z-10 flex flex-col items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white text-slate-300 border-2 border-slate-100 flex items-center justify-center">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[12px] font-bold text-slate-300">Delivered</p>
                                        <p className="text-[10px] text-slate-200 font-medium mt-0.5 tracking-tight">Pending</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Grid Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
                            
                            {/* Left Column: Map */}
                            <div className="relative bg-[#A0AEC0] rounded-[28px] overflow-hidden min-h-[440px] shadow-2xl flex items-center justify-center border border-white/10">
                                {/* Map Image */}
                                <img src={mapImg} alt="Tracking Map" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                                <div className="absolute inset-0 bg-black/5" /> {/* Subtle overlay */}

                                {/* Delivery Van Indicator */}
                                <div className="absolute top-[60%] left-[28%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                    <div className="bg-[#8EF4FF] text-[#0D1C2E] px-5 py-1.5 rounded-full text-[12px] font-bold mb-1 shadow-lg shadow-black/20 whitespace-nowrap z-20">
                                        Van ID: #DX-92
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-[#1A7785]/30 scale-125 blur-[2px]" />
                                        <div className="relative w-16 h-16 rounded-full bg-[#071321] text-white flex items-center justify-center shadow-2xl z-10 border-[3px] border-white/10">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2a1 1 0 011-1h8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Destination Info Badge */}
                                <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-md rounded-[24px] p-5 shadow-2xl flex items-center gap-4 max-w-[300px] border border-slate-100">
                                    <div className="w-12 h-12 rounded-full bg-[#B2F5EA] text-[#1A7785] flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-[#627382] uppercase tracking-widest mb-0.5">Destination</p>
                                        <p className="text-[14px] font-bold text-[#0D1C2E]">122 Sanctuary Way, Suite 4</p>
                                    </div>
                                </div>

                                <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                                    <h2 className="text-[24px] font-black text-white/40 uppercase tracking-[0.5em]">Delivery</h2>
                                </div>
                            </div>

                            {/* Right Column: Order Info */}
                            <div className="flex flex-col gap-6">
                                
                                {/* Order Summary Card */}
                                <div className="bg-white rounded-[28px] p-6 shadow-xl border border-slate-50 relative overflow-hidden">
                                    <div className="flex items-center justify-between mb-5">
                                        <h3 className="text-[17px] font-bold text-[#0D1C2E]">Order Summary</h3>
                                        <span className="bg-[#EBF1F3] text-[#0D1C2E] px-3 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">#CS-99210-RF</span>
                                    </div>
                                    <div className="space-y-4">
                                        {orderItems.map((item, i) => (
                                            <div key={i} className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: item.color }}>
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.727 2.903a2 2 0 01-2.618 1.41l-2.903-.727a2 2 0 01-1.41-2.618l.727-2.903a2 2 0 00-1.414-1.96L3.12 10.428a2 2 0 00-.547 1.022l-1.414 4.243a2 2 0 001.022 2.387l4.243 1.414a2 2 0 002.387-1.022l1.414-4.243z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-[14px] font-bold text-[#0D1C2E]">{item.name}</p>
                                                        <p className="text-[11px] text-[#627382] font-medium">{item.dose}</p>
                                                    </div>
                                                </div>
                                                <span className="text-[14px] font-bold text-[#0D1C2E]">{item.qty}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Delivery Estimate Card */}
                                <div className="bg-white rounded-[28px] p-6 shadow-xl border border-slate-50">
                                    <h3 className="text-[11px] font-bold text-[#627382] uppercase tracking-[0.2em] mb-3">Delivery Estimates</h3>
                                    <div className="bg-[#F0F7F8] rounded-[18px] p-4 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1A7785] shadow-sm">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-[15px] font-bold text-[#0D1C2E]">Tomorrow, by 4:00 PM</p>
                                            <p className="text-[11px] text-[#627382] font-medium">Courier: Marc Thompson</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Origin Pharmacy Card */}
                                <div className="bg-white rounded-[28px] p-6 shadow-xl border border-slate-50">
                                    <h3 className="text-[11px] font-bold text-[#627382] uppercase tracking-[0.2em] mb-3">Origin Pharmacy</h3>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-[14px] bg-[#F0F7F8] flex items-center justify-center text-[#1A7785] shrink-0">
                                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <path d="M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                                                <path d="M12 8v8M8 12h8" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-[15px] font-bold text-[#0D1C2E]">Sanctuary Pharmacy</h4>
                                            <p className="text-[12px] text-[#627382] leading-relaxed mb-3">
                                                882 Health Center Dr.<br />
                                                Medical District, CA 94103
                                            </p>
                                            <p className="text-[14px] font-bold text-[#1A7785]">(555) 012-3456</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Links */}
                        <div className="mt-10 flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-6 text-[11px] text-white/40 font-medium">
                            <p>© 2023 VaidyaGo Health Systems. All clinical data is encrypted.</p>
                            <div className="flex items-center gap-8 mt-4 md:mt-0">
                                <span className="hover:text-white cursor-pointer transition-colors">Privacy Protocol</span>
                                <span className="hover:text-white cursor-pointer transition-colors">Terms of Care</span>
                                <span className="hover:text-white cursor-pointer transition-colors">Help Center</span>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* Modals */}
            {activeModal === 'profile' && <Profile onClose={() => setActiveModal(null)} onAccountSettings={() => setActiveModal('account')} />}
            {activeModal === 'account' && <Account onClose={() => setActiveModal(null)} />}
            {isNotificationOpen && <Notification isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />}
            {isMessageOpen && <Message onClose={() => setIsMessageOpen(false)} />}
            {isCancelOpen && <Cancel onClose={() => setIsCancelOpen(false)} onConfirm={() => setIsCancelOpen(false)} />}
        </div>
    );
};

export default Order;
