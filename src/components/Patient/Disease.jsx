import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Patient_sidebar';
import Profile from "./Profile";
import Account from "./Account";
import Notification from "./notification";
import phImg from "../../assets/ph.png";
import fruitImg from "../../assets/fruit.png"; 
import patImg from "../../assets/human.png";

const Disease = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('Dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState(null); // 'profile' | 'account' | null
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const navLinks = ["Home", "Find Doctors", "Lab test", "Health Record", "Diet Chart", "Medicines"];

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="flex h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
         style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>
      
      <Sidebar active={'Dashboard'} setActive={setActive} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                
                {/* Header Navbar */}
                <header className="h-[72px] flex items-center justify-between px-[24px] md:px-[48px] shrink-0 border-b border-white/5 mb-[8px] z-20">
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

                <main className="flex-1 px-[24px] md:px-[48px] pb-10 overflow-y-auto">
                    {/* Hero Section */}
                    <div className="mb-8">
                        <h1 className="text-[28px] font-semibold text-white leading-[1.1] tracking-tight mb-2.5">Directory of Diseases</h1>
                        <p className="text-white/70 text-[15px] font-medium max-w-[600px]">Search by clinical classification or browse the medical encyclopedia by alphabet.</p>
                    </div>

                    {/* Search Hub */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 mb-8">
                        <div className="relative max-w-[480px]">
                            <input
                                type="text"
                                placeholder="Search clinical conditions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-[50px] pr-5 py-[14px] bg-white border border-transparent rounded-[16px] text-[15.5px] text-[#0B1F4D] placeholder-gray-400 font-medium shadow-lg focus:border-[#6ED4D4] outline-none transition-all"
                            />
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1a6e78]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Quick Action Tiles */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                        <div className="group bg-white rounded-[32px] p-6 flex flex-col gap-5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border border-[#f0f4f5]">
                            <div className="w-12 h-12 bg-[#EEF2F6] rounded-2xl flex items-center justify-center group-hover:bg-[#19718A] transition-colors">
                                <svg className="w-6 h-6 text-[#19718A] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                            <div>
                                <h3 className="text-[18px] font-medium text-[#0D1C2E] mb-0.5">Doctor Appointment</h3>
                                <p className="text-[#627382] text-[15px]">Consult with specialists.</p>
                            </div>
                            <span className="text-[14px] font-medium text-[#E8A317] tracking-widest uppercase">Book Now →</span>
                        </div>
                        <div className="group bg-white rounded-[32px] p-6 flex flex-col gap-5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border border-[#f0f4f5]">
                            <div className="w-12 h-12 bg-[#EEF2F6] rounded-2xl flex items-center justify-center group-hover:bg-[#E8A317] transition-colors">
                                <svg className="w-6 h-6 text-[#E8A317] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.503 1.508a10.003 10.003 0 01-4.445-4.445l1.508-.503a2 2 0 001.414-1.96l-.477-2.387a2 2 0 00-.547-1.022L7.877 3.754a2.001 2.001 0 00-2.828 0L3.58 5.221a2 2 0 00-.546 2.226 15 15 0 0011.753 11.753 2 2 0 002.226-.546l1.467-1.467a2 2 0 000-2.828l-1.052-1.052z" /></svg>
                            </div>
                            <div>
                                <h3 className="text-[18px] font-medium text-[#0D1C2E] mb-0.5">Tele-Consultation</h3>
                                <p className="text-[#627382] text-[15px]">Immediate digital support.</p>
                            </div>
                            <span className="text-[14px] font-medium text-[#E8A317] tracking-widest uppercase">Available Now →</span>
                        </div>
                        <div className="group bg-gradient-to-br from-[#19718A] to-[#288383] rounded-[32px] p-6 flex flex-col gap-5 shadow-xl hover:-translate-y-1 cursor-pointer transition-all">
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                            </div>
                            <div>
                                <h3 className="text-[18px] font-medium text-white mb-0.5">Laboratory Reports</h3>
                                <p className="text-white/70 text-[15px]">Access diagnostic history.</p>
                            </div>
                            <span className="text-[14px] font-medium text-white/90 tracking-widest uppercase">View Results →</span>
                        </div>
                    </div>

                    {/* Alphabet Navigator */}
                    <div className="bg-white rounded-[40px] p-8 shadow-sm border border-[#f0f4f5]">
                        <h2 className="text-[18px] font-medium text-[#0D1C2E] mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-6 bg-[#19718A] rounded-full"></span>
                            Find Condition By Initial
                        </h2>
                        <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-13 gap-3">
                            {alphabet.map((letter) => (
                                <button
                                    key={letter}
                                    className="h-11 rounded-[12px] border border-gray-100 bg-[#F9FBFC] text-[#19718A] font-medium text-[16px] flex items-center justify-center hover:bg-[#19718A] hover:text-white hover:shadow-lg transition-all active:scale-90"
                                >
                                    {letter}
                                </button>
                            ))}
                        </div>
                    </div>
                </main>
      </div>

      {activeModal === 'profile' && (
        <Profile onClose={() => setActiveModal(null)} onAccountSettings={() => setActiveModal('account')} />
      )}
      {activeModal === 'account' && (
        <Account onClose={() => setActiveModal(null)} />
      )}
      {isNotificationOpen && <Notification onClose={() => setIsNotificationOpen(false)} />}
    </div>
  );
};

export default Disease;

