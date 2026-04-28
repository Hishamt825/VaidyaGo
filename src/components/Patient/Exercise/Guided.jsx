import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Patient_sidebar';
import Profile from '../Profile';
import Account from '../Account';
import Notification from '../notification';
import SessionCom from './Session_com';

// Assets
import phImg from '../../../assets/ph.png';
import guidedImg from '../../../assets/guided.png';

const FeedbackCard = ({ icon, label, value, unit, color }) => (
    <div className={`bg-white/80 rounded-[28px] p-5 flex items-center justify-between border border-white/40 shadow-sm ${color}`}>
        <div className="flex items-center gap-4">
            <div className="text-[#1A7785] bg-[#1A7785]/10 w-10 h-10 rounded-2xl flex items-center justify-center">
                {icon}
            </div>
            <span className="text-[#0B2132] text-[15px] font-semibold">{label}</span>
        </div>
        <div className="flex items-baseline gap-1">
            <span className="text-[#0B2132] text-[20px] font-bold">{value}</span>
            <span className="text-[#627382] text-[12px] font-bold uppercase tracking-widest">{unit}</span>
        </div>
    </div>
);

const Guided = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState('Exercise');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isSessionCompleteModalOpen, setIsSessionCompleteModalOpen] = useState(false);

    return (
        <div
            className="flex h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}
        >
            <Sidebar
                active={active}
                setActive={setActive}
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
            />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Header Sub-Navbar */}
                <header className="h-[72px] flex items-center justify-between px-6 md:px-10 shrink-0 border-b border-white/5 z-20">
                    <div className="flex items-center gap-4 flex-1 max-w-[340px]">
                        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all shadow-sm shrink-0">
                            <svg className="w-5 h-5 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <div className="relative group flex-1">
                            <input
                                type="text"
                                placeholder="Find exercises..."
                                className="w-full bg-white/10 border border-white/10 rounded-full py-[10px] px-[20px] text-white placeholder-white/40 text-[12px] outline-none focus:ring-2 focus:ring-[#6ED4D4]/50 transition-all font-medium"
                            />
                            <svg className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex items-center gap-[16px] ml-auto">
                        <span className="text-white/80 hover:text-white text-[12px] font-bold hidden md:block select-none cursor-pointer transition-colors uppercase tracking-widest">Language</span>
                        <div className="flex items-center gap-[12px]">
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

                <main className="flex-1 overflow-y-auto px-6 md:px-10 pt-6 pb-8">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">

                            {/* Left Column: Guidance View */}
                            <div className="flex flex-col gap-5">
                                {/* Visual Feedback Area */}
                                <div className="relative rounded-[32px] overflow-hidden shadow-2xl h-[480px] bg-[#0B1423] border-[6px] border-white group">
                                    <img src={guidedImg} alt="Guided Movement" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[3000ms]" />

                                    {/* Overlays */}
                                    <div className="absolute top-6 left-6 flex items-center gap-2 bg-[#F1F6F8]/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/50 shadow-lg">
                                        <div className="w-2 h-2 rounded-full bg-[#1A7785] animate-pulse" />
                                        <span className="text-[#0B2132] text-[11px] font-bold uppercase tracking-[0.1em]">Active Phase: Upper Neck Rotation</span>
                                    </div>

                                    <button className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white transition-all">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                                    </button>

                                    <div className="absolute bottom-6 left-6 max-w-[280px]">
                                        <div className="bg-white/90 backdrop-blur-xl rounded-[28px] p-5 flex items-center gap-5 border border-white/50 shadow-2xl scale-95 origin-bottom-left">
                                            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                                                <svg className="w-full h-full transform -rotate-90">
                                                    <circle cx="32" cy="32" r="28" fill="transparent" stroke="#E9F3F6" strokeWidth="6" />
                                                    <circle cx="32" cy="32" r="28" fill="transparent" stroke="#1A7785" strokeWidth="6" strokeDasharray={176} strokeDashoffset={176 * 0.25} />
                                                </svg>
                                                <span className="absolute text-[#0B2132] text-[15px] font-bold">75%</span>
                                            </div>
                                            <div>
                                                <h4 className="text-[#0B2132] text-[14px] font-semibold">Rotation Symmetry</h4>
                                                <p className="text-[#627382] text-[11px] font-medium leading-tight mt-1">Matching target range: 12° Left</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Instructional Cue Card */}
                                <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-gray-50 flex items-start justify-between gap-8">
                                    <div className="flex-1">
                                        <span className="text-[#1A7785] text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">Instructional Cue</span>
                                        <h2 className="text-[#0B2132] text-[22px] font-bold leading-tight tracking-tight mb-4">
                                            Gently rotate your chin towards your left shoulder.
                                        </h2>
                                        <p className="text-[#627382] text-[14px] font-medium leading-relaxed max-w-xl">
                                            Ensure your shoulders remain grounded and level. Focus on the lengthening sensation along the right side of your neck. Hold for a moment of breath before returning to center.
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center gap-3">
                                        <button className="w-20 h-20 bg-gradient-to-br from-[#1A7785] to-[#0B2132] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 transition-all group">
                                            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                        </button>
                                        <span className="text-[#627382] text-[10px] font-bold uppercase tracking-widest">Repeat 4/10</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Feedback & Progress */}
                            <div className="flex flex-col gap-4">
                                {/* Time Card */}
                                <div className="bg-[#0B1F4D] rounded-[32px] p-6 text-white relative overflow-hidden group shadow-2xl">
                                    <div className="absolute top-[-40px] right-[-40px] w-32 h-32 bg-[#1A7785]/20 rounded-full blur-[50px]" />
                                    <div className="flex items-center gap-2 mb-3 opacity-60">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Time Remaining</span>
                                    </div>
                                    <div className="text-[56px] font-bold leading-none tracking-tighter text-center w-full">04:12</div>
                                </div>

                                {/* Next Step */}
                                <div onClick={() => navigate('/Tilt')} className="bg-[#E9F3F6] rounded-[28px] p-6 flex items-center justify-between group cursor-pointer hover:bg-[#DCEBF0] transition-all border border-[#1A7785]/10">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-all">
                                            <svg className="w-6 h-6 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-[#627382] text-[10px] font-bold uppercase tracking-widest leading-none mb-1.5">Next Step</p>
                                            <h4 className="text-[#0B2132] text-[16px] font-semibold">Lateral Tilt (C1-C2)</h4>
                                        </div>
                                    </div>
                                    <svg className="w-5 h-5 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                                </div>

                                {/* Biometric Feedback */}
                                <div className="flex flex-col gap-4 mt-2">
                                    <h3 className="text-white/60 text-[11px] font-bold uppercase tracking-[0.2em] ml-2">Biometric Feedback</h3>
                                    <FeedbackCard
                                        icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>}
                                        label="Heart Rate"
                                        value="72"
                                        unit="BPM"
                                    />
                                    <FeedbackCard
                                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                                        label="Range of Motion"
                                        value="84"
                                        unit="Deg"
                                    />
                                </div>

                                {/* Session Log */}
                                <div className="bg-white/90 backdrop-blur-md rounded-[32px] p-8 border border-white/40 shadow-sm mt-2 flex flex-col gap-6">
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-[#0B2132] text-[15px] font-bold uppercase tracking-widest">Session Log</h3>
                                        </div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[#627382] text-[13px] font-bold">Exercises Completed</span>
                                            <span className="text-[#0B2132] text-[13px] font-bold">3 Exercises</span>
                                        </div>
                                        <div className="h-2 bg-[#F1F6F8] rounded-full overflow-hidden shadow-inner">
                                            <div className="h-full bg-[#1A7785] w-[45%] transition-all duration-1000 shadow-[0_0_10px_rgba(26,119,133,0.3)]" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-[#F1F6F8]">
                                        <span className="text-[#627382] text-[13px] font-bold">Intensity Score</span>
                                        <span className="text-[#1A7785] text-[13px] font-bold uppercase">Optimal (4/10)</span>
                                    </div>
                                </div>

                                {/* Finish Button */}
                                <button onClick={() => setIsSessionCompleteModalOpen(true)} className="mt-2 bg-gradient-to-r from-[#1A7785] via-teal-600 to-[#1A7785] bg-[length:200%_auto] hover:bg-right text-white py-4 rounded-[28px] text-[15px] font-bold uppercase tracking-[0.2em] shadow-xl hover:translate-y-[-4px] transition-all duration-500 flex items-center justify-center gap-3">
                                    <span>Finish & Save Session</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modals & Overlays */}
            {activeModal === 'profile' && <Profile onClose={() => setActiveModal(null)} onAccountSettings={() => setActiveModal('account')} />}
            {activeModal === 'account' && <Account onClose={() => setActiveModal(null)} />}
            {isNotificationOpen && <Notification onClose={() => setIsNotificationOpen(false)} />}
            {isSessionCompleteModalOpen && <SessionCom onClose={() => setIsSessionCompleteModalOpen(false)} />}
        </div>
    );
};

export default Guided;
