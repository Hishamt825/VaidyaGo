import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Patient_sidebar';
import Profile from '../Profile';
import Account from '../Account';
import Notification from '../notification';

// Assets
import phImg from '../../../assets/ph.png';
import postureImg from '../../../assets/posture.png';
import scapImg from '../../../assets/scap.png';
import proneImg from '../../../assets/prone.png';

const StatBadge = ({ icon, label, value, color }) => (
    <div className={`${color} rounded-[24px] p-4 flex items-center gap-4 flex-1 shadow-sm border border-white/10`}>
        <div className="w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center shadow-sm">
            {icon}
        </div>
        <div>
            <p className="text-[#627382] text-[11px] font-bold uppercase tracking-widest leading-none mb-1">{label}</p>
            <p className="text-[#0B2132] text-[18px] font-black tracking-tight leading-none">{value}</p>
        </div>
    </div>
);

const TipCard = ({ title, content }) => (
    <div className="bg-white/60 rounded-[20px] p-4 mb-3 last:mb-0 border border-white/40">
        <h4 className="text-[#1A7785] text-[12px] font-black uppercase tracking-widest mb-1.5">{title}</h4>
        <p className="text-[#55697A] text-[14px] font-semibold leading-relaxed italic">"{content}"</p>
    </div>
);

const ExerciseOptionCard = ({ img, title, description, badge1, badge2 }) => (
    <div className="bg-[#E9EDF0] rounded-[24px] p-3 flex flex-col flex-1 group cursor-pointer hover:shadow-lg transition-all duration-500 border border-transparent hover:border-white/40">
        <div className="h-[160px] rounded-[18px] overflow-hidden mb-3 relative shadow-sm">
            <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <div className="px-1">
            <h4 className="text-[#0B2132] text-[16px] font-black mb-1 tracking-tight">{title}</h4>
            <p className="text-[#627382] text-[13px] font-medium mb-4">{description}</p>
            <div className="flex items-center gap-3">
                <span className="bg-white px-3 py-1.5 rounded-xl text-[11px] font-black uppercase text-[#627382] shadow-sm border border-gray-100">{badge1}</span>
                <span className="bg-white px-3 py-1.5 rounded-xl text-[11px] font-black uppercase text-[#627382] shadow-sm border border-gray-100">{badge2}</span>
                <div className="ml-auto w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1A7785] shadow-sm group-hover:bg-[#1A7785] group-hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
            </div>
        </div>
    </div>
);

const Strengthening = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState('Exercise');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

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
                    <div className="flex-1 max-w-[280px]">
                        <div className="relative group">
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

                <main className="flex-1 overflow-y-auto px-6 md:px-10 pt-8 pb-2">
                    <div className="max-w-[1400px] mx-auto">

                        {/* Breadcrumbs and Title Area */}
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                                    <span>Rehabilitation</span>
                                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                                    <span>Cervical Spine</span>
                                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                                    <span className="text-[#6ED4D4]">Deep Neck Flexors</span>
                                </div>
                                <h1 className="text-white text-[28px] font-bold leading-tight tracking-tight mb-2">Posture Strengthening</h1>
                                <p className="text-white/60 text-[15px] font-medium max-w-xl leading-relaxed">
                                    Focusing on isometric activation of the deep cervical muscles to improve head carriage and reduce tension for <span className="text-[#6ED4D4] font-bold">Alex Rivera</span>.
                                </p>
                            </div>

                            <div className="flex items-center gap-2 w-full lg:w-[380px]">
                                <StatBadge
                                    icon={<svg className="w-5 h-5 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                    label="Estimated Time"
                                    value="12 Mins"
                                    color="bg-[#C9E7EA]/30"
                                />
                                <StatBadge
                                    icon={<svg className="w-5 h-5 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                                    label="Intensity"
                                    value="Low-Focus"
                                    color="bg-[#C9E7EA]/30"
                                />
                            </div>
                        </div>

                        {/* Main Exercise Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_0.8fr] gap-5 mb-8">

                            {/* Left: Main Visual */}
                            <div className="relative rounded-[32px] overflow-hidden shadow-2xl h-[560px] group border-[6px] border-white">
                                <img src={postureImg} alt="Cervical Chin Tuck" className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-[2000ms]" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-8 left-8">
                                    <span className="bg-[#6ED4D4] text-[#0B1F4D] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block">Active Now</span>
                                    <h2 className="text-white text-[28px] font-bold tracking-tight leading-tight">Cervical Chin Tuck</h2>
                                </div>
                            </div>

                            {/* Center: Instructions */}
                            <div className="bg-white rounded-[32px] p-6 md:p-8 flex flex-col h-[560px] justify-between shadow-sm border border-gray-50 overflow-hidden">
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <p className="text-[#A9B1BB] text-[10px] font-black uppercase tracking-widest mb-1">Target Area</p>
                                            <h3 className="text-[#0B2132] text-[18px] font-bold tracking-tight">Deep Flexors (C1-C4)</h3>
                                        </div>
                                        <div className="bg-[#E9F3F6] px-3 py-2 rounded-xl flex items-center gap-2 border border-[#1A7785]/10">
                                            <svg className="w-3.5 h-3.5 text-[#1A7785]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                                            <span className="text-[#1A7785] text-[11px] font-bold uppercase tracking-widest">Core Skill</span>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-[#0B2132] text-[12px] font-black uppercase tracking-[0.15em] mb-6 border-l-[3px] border-[#1A7785] pl-4">Instruction</h4>
                                        <div className="space-y-6">
                                            {[
                                                "Sit tall with shoulders relaxed and gaze forward.",
                                                "Gently draw your chin straight back, as if making a 'double chin'.",
                                                "Keep your head level; do not tilt up or down.",
                                                "Hold for 5 seconds and slowly release."
                                            ].map((step, i) => (
                                                <div key={i} className="flex gap-4 group">
                                                    <span className="text-[#1A7785]/30 text-[18px] font-black leading-tight group-hover:text-[#1A7785] transition-colors duration-500">{(i + 1).toString().padStart(2, '0')}.</span>
                                                    <p className="text-[#55697A] text-[15px] font-semibold leading-relaxed">{step}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex flex-col gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-[#F1F6F8] rounded-[24px] p-4 flex flex-col items-center flex-1 shadow-inner border border-gray-50">
                                            <span className="text-[#0B2132] text-[28px] font-bold leading-none mb-1">10</span>
                                            <span className="text-[#627382] text-[10px] font-black uppercase tracking-widest">Reps</span>
                                        </div>
                                        <div className="bg-[#F1F6F8] rounded-[24px] p-4 flex flex-col items-center flex-1 shadow-inner border border-gray-50">
                                            <span className="text-[#0B2132] text-[28px] font-bold leading-none mb-1">3</span>
                                            <span className="text-[#627382] text-[10px] font-black uppercase tracking-widest">Sets</span>
                                        </div>
                                    </div>
                                    <button className="w-full bg-[#1A7785] hover:bg-[#0B2132] text-white py-3.5 rounded-[20px] text-[15px] font-black uppercase tracking-[0.2em] shadow-xl hover:translate-y-[-4px] transition-all duration-500 mb-6">
                                        Start Timer
                                    </button>
                                </div>
                            </div>

                            {/* Right: Tips & Progress */}
                            <div className="flex flex-col gap-4">
                                <div className="bg-[#E4F5F7] rounded-[32px] p-6 border border-[#1A7785]/10">
                                    <div className="flex items-center gap-2 mb-6">
                                        <svg className="w-5 h-5 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                                        <h3 className="text-[#0B2132] text-[18px] font-bold tracking-tight">Form Tips</h3>
                                    </div>
                                    <TipCard title="The Gentle Touch" content="Imagine a string pulling the crown of your head toward the ceiling during the tuck." />
                                    <TipCard title="No Strain" content="Avoid bracing your jaw. Keep your teeth slightly apart and tongue on the roof of your mouth." />
                                </div>

                                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-[#0B2132] text-[16px] font-bold tracking-tight">Session Progress</h3>
                                        <span className="text-[#1A7785] text-[11px] font-black uppercase">40% Done</span>
                                    </div>
                                    <div className="h-1.5 bg-[#F1F6F8] rounded-full mb-6 shadow-inner overflow-hidden">
                                        <div className="h-full bg-[#1A7785] rounded-full w-[40%] transition-all duration-1000 shadow-[0_0_8px_rgba(26,119,133,0.3)]" />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between group cursor-pointer opacity-40">
                                            <div className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full bg-[#1A7785] flex items-center justify-center text-white">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                                                </div>
                                                <span className="text-[#0B2132] text-[14px] font-bold">Scapular Retraction</span>
                                            </div>
                                            <span className="text-[#627382] text-[10px] font-black tracking-widest">2/2 Sets</span>
                                        </div>
                                        <div className="flex items-center justify-between group cursor-pointer scale-105 origin-left">
                                            <div className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full border-[2px] border-[#1A7785] flex items-center justify-center">
                                                    <div className="w-2 h-2 rounded-full bg-[#1A7785] animate-pulse" />
                                                </div>
                                                <span className="text-[#0B2132] text-[14px] font-black">Cervical Chin Tuck</span>
                                            </div>
                                            <span className="text-[#1A7785] text-[10px] font-black tracking-widest">1/3 Sets</span>
                                        </div>
                                        <div className="flex items-center justify-between group cursor-pointer opacity-30">
                                            <div className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full border-[2px] border-gray-300" />
                                                <span className="text-[#627382] text-[14px] font-bold">Isometric Rotation</span>
                                            </div>
                                            <span className="text-[#627382] text-[10px] font-black tracking-widest">0/3 Sets</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_0.8fr] gap-5">
                            <ExerciseOptionCard
                                img={scapImg}
                                title="Scapular Pinches"
                                description="Focus on lower trapezius activation."
                                badge1="12 Reps"
                                badge2="2 Sets"
                            />
                            <ExerciseOptionCard
                                img={proneImg}
                                title="Prone Cobra"
                                description="Neutral spine maintenance while lying flat."
                                badge1="30 Sec"
                                badge2="3 Sets"
                            />
                            <div className="bg-[#0B1423] rounded-[32px] p-6 text-white flex flex-col justify-between relative overflow-hidden group cursor-pointer shadow-2xl">
                                <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-[#1A7785]/20 rounded-full blur-[60px] group-hover:bg-[#1A7785]/40 transition-colors duration-1000" />
                                <div className="z-10">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#6ED4D4] mb-4">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    </div>
                                    <h3 className="text-[22px] font-black mb-2 tracking-tight leading-tight">Feeling some discomfort?</h3>
                                    <p className="text-white/40 text-[14px] font-semibold leading-relaxed mb-6">Read our 'Red Flag' guide for cervical movements.</p>
                                </div>
                                <button className="text-[#6ED4D4] text-[12px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-4 transition-all w-fit z-10">
                                    Learn More
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
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
        </div>
    );
};

export default Strengthening;
