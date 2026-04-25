import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Wind, 
  Activity, 
  FileText, 
  Download, 
  CheckCircle2, 
  Clock,
  Zap,
  ShieldCheck,
  TrendingUp,
  Waves,
  ChevronLeft
} from 'lucide-react';
import Sidebar from '../Patient_sidebar';
import Profile from '../Profile';
import Account from '../Account';
import Notification from '../notification';
import Genrate from '../Vitals/Genrate';
import Health_report from '../Vitals/Health_report';
import phImg from '../../../assets/ph.png';

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

const StatBadge = ({ text, type }) => (
    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
        type === 'active' ? 'bg-[#E0F2F2] text-[#1A7785]' : 'bg-[#EEEFF1] text-[#627382]'
    }`}>
        {type === 'active' && <div className="w-2 h-2 rounded-full bg-[#1A7785] animate-pulse" />}
        {text}
    </div>
);

const BPReadingRow = ({ date, value, status, type }) => (
    <div className="bg-white rounded-[20px] p-4 flex items-center justify-between border border-[#F0F4F5] hover:shadow-md transition-all group cursor-pointer">
        <div className="flex flex-col">
            <span className="text-[#627382] text-[10px] font-black uppercase tracking-widest mb-0.5">{date}</span>
            <span className="text-[#0D1C2E] text-[18px] font-bold tracking-tight">{value}</span>
        </div>
        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest font-mono ${
            status === 'Optimal' ? 'text-emerald-600 bg-emerald-50 border border-emerald-100' : 'text-cyan-600 bg-cyan-50 border border-cyan-100'
        }`}>
            {status}
        </span>
    </div>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

const Detail = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState('Vitals');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
    const [isReportOpen, setIsReportOpen] = useState(false);

    const isAnyModalOpen = activeModal || isNotificationOpen || isGenerateModalOpen || isReportOpen;

    return (
        <div className="flex h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
             style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>
            
            <Sidebar 
                active={active} 
                setActive={setActive} 
                isMobileOpen={isMobileOpen} 
                setIsMobileOpen={setIsMobileOpen} 
            />

            <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden transition-all duration-500 ${isAnyModalOpen ? 'blur-md pointer-events-none' : ''}`}>
                
                {/* Top Navbar standardized to Medication1 style */}
                <header className="h-[72px] flex items-center gap-4 px-6 md:px-8 shrink-0 border-b border-white/5 mb-1 z-20">
                    <button 
                        onClick={() => navigate('/Vitals')}
                        className="w-[40px] h-[40px] rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all group shrink-0"
                        title="Back to Vitals"
                    >
                        <ChevronLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
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

                <main className="flex-1 overflow-y-auto px-10 pb-10 pt-6 space-y-6">
                    
                    {/* Top Title & Badges */}
                    <div className="flex items-end justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-white text-[32px] font-bold tracking-tight leading-none mb-2">Your Health Trends</h1>
                            <p className="text-white/60 text-[14px]">Detailed physiological overview for Alex Rivera</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <StatBadge text="Active Monitoring" type="active" />
                            <StatBadge text="Updated 2h ago" type="history" />
                        </div>
                    </div>

                    {/* Main Dashboard Grid */}
                    <div className="grid grid-cols-12 gap-6 items-start">
                        
                        {/* 1. Heart Health Card */}
                        <div className="col-span-12 lg:col-span-8 bg-white rounded-[32px] p-8 border border-white/20 shadow-xl flex flex-col md:flex-row gap-8">
                            <div className="flex-initial md:w-[280px]">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex flex-col">
                                        <h3 className="text-[#0D1C2E] text-[20px] font-bold tracking-tight mb-1">My Heart Health</h3>
                                        <p className="text-[#627382] text-[11px] font-medium leading-tight opacity-75">Real-time cardiovascular pulse analysis</p>
                                    </div>
                                    <Heart className="text-emerald-500 fill-emerald-500/10" size={24} />
                                </div>

                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-[#0D1C2E] text-[64px] font-bold tracking-tighter leading-none">72</span>
                                    <span className="text-[#627382] text-[16px] font-black uppercase tracking-widest">bpm</span>
                                </div>

                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                                    <span className="text-[#0D1C2E] text-[14px] font-bold">Healthy Rhythm Detected</span>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col pt-4">
                                <div className="bg-[#F8FAFB] border border-[#F0F4F5] rounded-[24px] p-6 mb-auto">
                                    <div className="flex items-end gap-1.5 h-[120px] mb-4">
                                        {[40, 65, 50, 75, 45, 85, 55, 60, 45, 70, 50].map((h, i) => (
                                            <motion.div 
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                transition={{ duration: 0.8, delay: i * 0.05 }}
                                                className={`flex-1 rounded-t-md ${i === 8 ? 'bg-[#1A7785]' : 'bg-[#D6E0E4]'}`}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex justify-center">
                                        <span className="text-[#627382] text-[10px] font-black uppercase tracking-[0.25em]">Stability Index: 98%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Doctor Notes Card */}
                        <div className="col-span-12 lg:col-span-4 bg-[#0B1F4D] rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl h-full flex flex-col min-h-[340px]">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-12 translate-x-12" />
                            <h3 className="text-[18px] font-bold mb-8 relative z-10">Dr. Thorne's Notes</h3>
                            <div className="flex-1 italic text-white/50 text-[15px] leading-relaxed mb-10 border-l-[3px] border-white/10 pl-6 py-2 relative z-10">
                                "Alex, your cardiovascular markers are looking exceptionally stable this month. The new morning routine is clearly having a positive impact on your resting heart rate. Keep it up!"
                            </div>
                            <div className="mt-auto flex items-center gap-3 bg-white/10 backdrop-blur-md self-start px-5 py-3 rounded-2xl border border-white/10 relative z-10">
                                <ShieldCheck size={18} className="text-cyan-400" />
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">Review Verified</span>
                            </div>
                            {/* Signature Grid Pattern */}
                            <div className="absolute bottom-4 right-4 opacity-10">
                                <Activity size={80} />
                            </div>
                        </div>

                        {/* 3. BP History Card */}
                        <div className="col-span-12 lg:col-span-4 bg-[#EAEEF0] rounded-[32px] p-8 flex flex-col gap-6 shadow-lg border border-white/30 h-full">
                            <h3 className="text-[#0D1C2E] text-[20px] font-bold tracking-tight">My BP History</h3>
                            <div className="flex flex-col gap-3">
                                <BPReadingRow date="Today, 08:30" value="118/76" status="Optimal" />
                                <BPReadingRow date="Yesterday" value="120/80" status="Normal" />
                                <BPReadingRow date="22 Oct" value="122/81" status="Normal" />
                            </div>
                        </div>

                        {/* 4. Breathing Quality Card */}
                        <div className="col-span-12 lg:col-span-8 bg-white rounded-[32px] p-8 border border-white/20 shadow-xl flex flex-col md:flex-row gap-10 h-full">
                            <div className="flex-1">
                                <div className="flex flex-col mb-8">
                                    <h3 className="text-[#0D1C2E] text-[20px] font-bold tracking-tight mb-1">My Breathing Quality</h3>
                                    <p className="text-[#627382] text-[11px] font-medium opacity-75">Oxygenation & Respiratory Health</p>
                                </div>
                                
                                <div className="mb-10">
                                    <div className="flex justify-between items-baseline mb-3">
                                        <span className="text-[#627382] text-[10px] font-black uppercase tracking-widest">Oxygen Saturation</span>
                                        <span className="text-[#0D1C2E] text-[28px] font-bold">98%</span>
                                    </div>
                                    <div className="h-2 w-full bg-[#F0F4F5] rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: "98%" }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-[#1A7785] to-[#6ED4D4] rounded-full"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-10">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[#627382] text-[9px] font-black uppercase tracking-[0.2em] leading-none mb-1">Sleep Consistency</span>
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} className="text-[#0D1C2E]" />
                                            <span className="text-[#0D1C2E] text-[16px] font-bold">Excellent</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[#627382] text-[9px] font-black uppercase tracking-[0.2em] leading-none mb-1">Respiration Rate</span>
                                        <div className="flex items-center gap-2">
                                            <Waves size={16} className="text-[#0D1C2E]" />
                                            <span className="text-[#0D1C2E] text-[16px] font-bold">14 <span className="text-[12px] opacity-40">rpm</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-initial md:w-[260px] flex items-center justify-center">
                                <div className="relative w-[220px] h-[220px] bg-[#F1F6F8] rounded-full flex items-center justify-center border border-[#E5F0F3] shadow-inner">
                                    <div className="absolute inset-0 flex items-center justify-center animate-pulse opacity-40">
                                        <Waves size={100} className="text-[#1A7785]" />
                                    </div>
                                    <Waves size={50} className="text-[#1A7785] opacity-20 relative z-10" />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Footer Report Banner */}
                    <div className="bg-gradient-to-r from-[#0C4A5A] to-[#1A7785] rounded-[28px] p-8 text-white flex items-center justify-between shadow-xl mt-4">
                        <div className="flex flex-col">
                            <h3 className="text-[22px] font-bold tracking-tight mb-1">Download My Full Report</h3>
                            <p className="text-white/60 text-[13px] font-medium">Comprehensive PDF including history, clinical notes, and trends for Q4.</p>
                        </div>
                        <button 
                            onClick={() => setIsGenerateModalOpen(true)}
                            className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-[14px] hover:bg-white/20 transition-all uppercase tracking-widest shadow-lg"
                        >
                            Generate Report
                            <Download size={18} />
                        </button>
                    </div>

                </main>
            </div>

            {/* Modals */}
            {activeModal === 'profile' && <Profile onClose={() => setActiveModal(null)} onAccountSettings={() => setActiveModal('account')} />}
            {activeModal === 'account' && <Account onClose={() => setActiveModal(null)} />}
            {isNotificationOpen && <Notification onClose={() => setIsNotificationOpen(false)} />}
            
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

export default Detail;
