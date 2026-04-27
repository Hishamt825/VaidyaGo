import React, { useState, useEffect } from 'react';

const Timer = ({ isOpen, onClose }) => {
    const [seconds, setSeconds] = useState(60);
    const [isActive, setIsActive] = useState(true);
    const totalSeconds = 60;

    useEffect(() => {
        let interval = null;
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const formatTime = (sec) => {
        const mins = Math.floor(sec / 60);
        const s = sec % 60;
        return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const progress = ((totalSeconds - seconds) / totalSeconds) * 100;
    const circumference = 2 * Math.PI * 135; // r=135
    const offset = circumference - (progress / 100) * circumference;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop with extreme blur as requested */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[24px] transition-opacity duration-300" onClick={onClose} />
            
            {/* Modal Container */}
            <div className="relative w-full max-w-[540px] bg-white rounded-[40px] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.12)] overflow-hidden animate-in fade-in zoom-in duration-500 border border-black/5 flex flex-col">
                
                {/* Header Section */}
                <div className="pt-6 px-8 flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-[32px] h-[32px] bg-[#1A7785] rounded-lg flex items-center justify-center text-white shadow-lg">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <div>
                            <h4 className="text-[#0B2132] text-[14px] font-bold tracking-tight leading-none mb-0.5">VaidyaGo</h4>
                            <p className="text-[#1A7785] text-[8px] font-black uppercase tracking-[0.15em] opacity-60">Clinical Sanctuary</p>
                        </div>
                    </div>

                    <h2 className="text-[#0B2132] text-[24px] font-black tracking-tight mb-2">Posture Strengthening</h2>
                    <div className="flex items-center gap-2 text-[#1A7785] bg-[#E9F3F6] px-4 py-1.5 rounded-full border border-[#1A7785]/10">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-[10px] font-black uppercase tracking-widest">Active Set: 02 of 05</span>
                    </div>
                </div>

                {/* Circular Timer Section */}
                <div className="relative flex items-center justify-center my-6">
                    <div className="relative w-[260px] h-[260px]">
                        {/* Ticks / Dashed Background Track */}
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                            <circle
                                cx="130"
                                cy="130"
                                r="110"
                                fill="transparent"
                                stroke="#E2E8F0"
                                strokeWidth="1"
                                strokeDasharray="2, 6"
                                className="opacity-40"
                            />
                        </svg>

                        {/* Background Circle */}
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="130"
                                cy="130"
                                r="110"
                                fill="transparent"
                                stroke="#F1F6F8"
                                strokeWidth="18"
                            />
                            {/* Progress Circle with Gradient */}
                            <circle
                                cx="130"
                                cy="130"
                                r="110"
                                fill="transparent"
                                stroke="url(#timerGradient)"
                                strokeWidth="18"
                                strokeDasharray={2 * Math.PI * 110}
                                strokeDashoffset={(2 * Math.PI * 110) - (progress / 100) * (2 * Math.PI * 110)}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-linear shadow-lg"
                            />
                            <defs>
                                <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0B1F4D" />
                                    <stop offset="100%" stopColor="#1A7785" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Lightning Bolt Decoration */}
                        <div className="absolute top-[25px] right-[30px] w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#1A7785] shadow-lg border border-gray-50 z-10">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z" /></svg>
                        </div>

                        {/* Time Display */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-[#0B2132] text-[56px] font-black leading-none tracking-tighter">{formatTime(seconds)}</span>
                            <span className="text-[#1A7785] text-[10px] font-black uppercase tracking-[0.2em] mt-1">Seconds Left</span>
                        </div>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="px-12 mb-8 flex items-center justify-between gap-8">
                    {/* Reset Button */}
                    <button 
                        onClick={() => { setSeconds(totalSeconds); setIsActive(false); }}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <div className="w-12 h-12 rounded-full border-[2px] border-gray-100 flex items-center justify-center text-[#627382] group-hover:bg-[#F8FAFB] transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#627382]">Reset</span>
                    </button>

                    {/* Play/Pause Button */}
                    <button 
                        onClick={() => setIsActive(!isActive)}
                        className="relative flex flex-col items-center gap-3 group"
                    >
                        <div className="absolute inset-0 bg-[#1A7785] blur-[20px] opacity-20 rounded-full scale-110"></div>
                        <div className="relative w-16 h-16 bg-gradient-to-br from-[#0B1F4D] to-[#1A7785] rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-105 transition-all">
                            {isActive ? (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                            ) : (
                                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            )}
                        </div>
                        <span className="relative text-[11px] font-black uppercase tracking-[0.2em] text-[#0B2132]">{isActive ? 'Pause' : 'Resume'}</span>
                    </button>

                    {/* Finish Set Button */}
                    <button 
                        onClick={onClose}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <div className="w-12 h-12 rounded-full border-[2px] border-gray-100 flex items-center justify-center text-[#627382] group-hover:bg-[#F8FAFB] transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#627382]">Finish Set</span>
                    </button>
                </div>

                {/* Footer Tip Section */}
                <div className="bg-[#F8FAFB] p-4 flex items-center gap-4 border-t border-gray-50">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-[2px] border-white shadow-md shrink-0">
                        <img src="https://ui-avatars.com/api/?name=Dr+Thorne&background=1A7785&color=fff" alt="Therapist" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <span className="text-[#1A7785] text-[9px] font-black uppercase tracking-[0.15em] mb-0.5 block">Therapist's Tip</span>
                        <p className="text-[#0B2132] text-[13px] font-bold leading-tight">Keep your shoulders retracted and chin tucked for maximum engagement.</p>
                    </div>
                </div>

                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center text-[#0B2132] transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
        </div>
    );
};

export default Timer;
