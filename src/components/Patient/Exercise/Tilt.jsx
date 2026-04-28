import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Patient_sidebar';
import Profile from '../Profile';
import Account from '../Account';
import Notification from '../notification';

// Assets
import phImg from '../../../assets/ph.png';
import tiltImg from '../../../assets/tilt.png'; // Assuming you have tilt.png in assets

const Tilt = () => {
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
                        
                        {/* Page Header Area */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="bg-[#6ED4D4] text-[#0B1F4D] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Active Session</span>
                                    <span className="text-white/80 text-[12px] font-medium">Target: C1-C2 Vertebrae</span>
                                </div>
                                <h1 className="text-white text-[36px] md:text-[42px] font-bold leading-tight tracking-tight">Lateral Tilt</h1>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-white rounded-full px-5 py-2.5 flex items-center gap-2 shadow-sm">
                                    <div className="w-2 h-2 bg-[#1A7785] rounded-full"></div>
                                    <span className="text-[#0B2132] font-bold text-[14px]">04:42</span>
                                    <span className="text-[#627382] text-[12px] font-medium">Elapsed</span>
                                </div>
                                <button className="bg-gradient-to-r from-[#1A7785] via-teal-600 to-[#1A7785] bg-[length:200%_auto] hover:bg-right text-white px-6 py-2.5 rounded-full text-[14px] font-bold shadow-lg transition-all">
                                    Finish & Save Session
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6">

                            {/* Left Column */}
                            <div className="flex flex-col gap-5">
                                {/* Video/Image Container */}
                                <div className="relative rounded-[32px] overflow-hidden shadow-2xl h-[400px] md:h-[480px] border-[4px] border-white/10 group bg-[#0B1423]">
                                    <img src={tiltImg} alt="Lateral Tilt" className="w-full h-full object-cover opacity-90 transition-transform duration-[3000ms] group-hover:scale-105" />
                                    
                                    {/* 42° Angle Circle */}
                                    <div className="absolute top-6 right-6 w-24 h-24 rounded-full border-[4px] border-[#1A7785] flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm">
                                        <span className="text-[#6ED4D4] text-[28px] font-bold leading-none">42&deg;</span>
                                        <span className="text-white/80 text-[9px] font-bold uppercase tracking-widest mt-1">Angle</span>
                                    </div>

                                    {/* Audio/Text Control Overlay */}
                                    <div className="absolute bottom-5 left-5 right-5 bg-white/85 backdrop-blur-xl rounded-[24px] p-4 flex items-center justify-between shadow-2xl">
                                        <div className="flex items-center gap-4">
                                            <button className="w-12 h-12 bg-[#1A7785] rounded-full flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform shrink-0">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                                            </button>
                                            <div>
                                                <h3 className="text-[#0B2132] text-[15px] font-bold">"Gently tilt your head towards your right shoulder"</h3>
                                                <p className="text-[#627382] text-[12px] font-medium mt-0.5">Maintain a neutral spine and breathe deeply.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0B2132] shadow-sm hover:bg-gray-50 transition-colors">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                                            </button>
                                            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0B2132] shadow-sm hover:bg-gray-50 transition-colors">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* 3 Cards Row */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Card 1 */}
                                    <div className="bg-white rounded-[24px] p-5 shadow-sm border border-white/40">
                                        <div className="text-[#1A7785] mb-2.5">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                        </div>
                                        <h4 className="text-[#0B2132] text-[14px] font-bold mb-1.5">Shoulder Stability</h4>
                                        <p className="text-[#627382] text-[11px] leading-relaxed">Ensure your shoulders remain down and relaxed. Do not lift them to meet your ear.</p>
                                    </div>
                                    {/* Card 2 */}
                                    <div className="bg-white rounded-[24px] p-5 shadow-sm border border-white/40">
                                        <div className="text-[#1A7785] mb-2.5">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                        </div>
                                        <h4 className="text-[#0B2132] text-[14px] font-bold mb-1.5">Tempo Control</h4>
                                        <p className="text-[#627382] text-[11px] leading-relaxed">Follow the 4-2-4 rhythm. 4s down, 2s hold, 4s back to center.</p>
                                    </div>
                                    {/* Card 3 */}
                                    <div className="bg-white rounded-[24px] p-5 shadow-sm border border-white/40">
                                        <div className="text-[#1A7785] mb-2.5">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                                        </div>
                                        <h4 className="text-[#0B2132] text-[14px] font-bold mb-1.5">Mindful Focus</h4>
                                        <p className="text-[#627382] text-[11px] leading-relaxed">Visualize space opening between your C1 and C2 vertebrae.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col gap-5">
                                {/* Live Biometrics */}
                                <div className="bg-white rounded-[28px] p-6 shadow-sm border border-white/40">
                                    <h3 className="text-[#0B2132] text-[16px] font-bold mb-5">Live Biometrics</h3>
                                    
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-[#FFF0F0] rounded-full flex items-center justify-center text-[#E85B5A]">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                            </div>
                                            <div>
                                                <div className="text-[#627382] text-[9px] font-bold uppercase tracking-widest mb-0.5">Heart Rate</div>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-[#0B2132] text-[24px] font-bold leading-none">74</span>
                                                    <span className="text-[#0B2132] text-[10px] font-bold">BPM</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Bar Chart Mock */}
                                        <div className="flex items-end gap-[3px] h-6">
                                            <div className="w-1 h-[40%] bg-[#E85B5A]/40 rounded-t-sm"></div>
                                            <div className="w-1 h-[60%] bg-[#E85B5A]/60 rounded-t-sm"></div>
                                            <div className="w-1 h-[100%] bg-[#E85B5A] rounded-t-sm"></div>
                                            <div className="w-1 h-[80%] bg-[#E85B5A]/80 rounded-t-sm"></div>
                                            <div className="w-1 h-[50%] bg-[#E85B5A]/50 rounded-t-sm"></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="w-10 h-10 bg-[#F1F6F8] rounded-full flex items-center justify-center text-[#1A7785]">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                                            </div>
                                            <div className="flex-1 flex justify-between items-end">
                                                <div>
                                                    <div className="text-[#627382] text-[9px] font-bold uppercase tracking-widest mb-0.5">ROM Target</div>
                                                    <div className="text-[#0B2132] text-[24px] font-bold leading-none">88%</div>
                                                </div>
                                                <span className="text-[#1A7785] text-[11px] font-bold">Optimal</span>
                                            </div>
                                        </div>
                                        <div className="h-2 bg-[#F1F6F8] rounded-full overflow-hidden w-full">
                                            <div className="h-full bg-[#1A7785] rounded-full w-[88%]"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Session Log */}
                                <div className="bg-[#E9F3F6] rounded-[28px] p-6 shadow-sm border border-white/40">
                                    <h3 className="text-[#0B2132] text-[16px] font-bold mb-4">Session Log</h3>
                                    
                                    <div className="flex flex-col gap-2.5 mb-5">
                                        <div className="bg-white rounded-[14px] px-4 py-3.5 flex justify-between items-center shadow-sm">
                                            <span className="text-[#627382] text-[12px] font-medium">Completed Reps</span>
                                            <span className="text-[#0B2132] text-[12px] font-bold">12 / 15</span>
                                        </div>
                                        <div className="bg-white rounded-[14px] px-4 py-3.5 flex justify-between items-center shadow-sm">
                                            <span className="text-[#627382] text-[12px] font-medium">Max Flexion</span>
                                            <span className="text-[#0B2132] text-[12px] font-bold">48&deg;</span>
                                        </div>
                                        <div className="bg-white rounded-[14px] px-4 py-3.5 flex justify-between items-center shadow-sm">
                                            <span className="text-[#627382] text-[12px] font-medium">Average Tension</span>
                                            <span className="text-[#1A7785] text-[12px] font-bold">Low</span>
                                        </div>
                                    </div>

                                    {/* Therapist Note */}
                                    <div className="bg-[#0B2132] rounded-[16px] p-4 shadow-lg">
                                        <h4 className="text-white/60 text-[9px] font-bold uppercase tracking-widest mb-1.5">Therapist Note</h4>
                                        <p className="text-white/90 text-[11px] italic leading-relaxed">
                                            "Alex, you're showing 15% better symmetry today compared to last Tuesday. Keep the chin tucked."
                                        </p>
                                    </div>
                                </div>

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

export default Tilt;
