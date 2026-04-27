import React from 'react';
import sleepImg from '../../../assets/sleep.png';

const Prone = ({ isOpen, onClose, onStart }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop with extreme blur */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[24px] transition-opacity duration-300" onClick={onClose} />
            
            {/* Modal Container */}
            <div className="relative w-full max-w-[820px] bg-white rounded-[40px] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.12)] overflow-hidden animate-in fade-in zoom-in duration-500 border border-black/5 flex h-[560px]">
                
                {/* Left Side: Summary & Visual */}
                <div className="w-[42%] h-full bg-[#F4F9FB] p-8 flex flex-col">
                    <div className="mb-6">
                        <h2 className="text-[#0B2132] text-[30px] font-black tracking-tight mb-1">Prone Cobra</h2>
                        <p className="text-[#1A7785] text-[12px] font-bold opacity-80 uppercase tracking-widest">Lower Trapezius & Postural Stability</p>
                    </div>

                    {/* Image Card */}
                    <div className="flex-1 bg-white rounded-[32px] p-2 shadow-sm border border-gray-100 overflow-hidden mb-6 group">
                        <div className="w-full h-full rounded-[24px] overflow-hidden">
                            <img src={sleepImg} alt="Prone Cobra Exercise" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex gap-3">
                        <div className="bg-white p-4 rounded-[24px] flex-1 border border-gray-100 shadow-sm text-center">
                            <p className="text-[#0B2132] text-[18px] font-black leading-none mb-1">30 Sec</p>
                            <p className="text-[#627382] text-[9px] font-black uppercase tracking-widest">Duration</p>
                        </div>
                        <div className="bg-white p-4 rounded-[24px] flex-1 border border-gray-100 shadow-sm text-center">
                            <p className="text-[#0B2132] text-[18px] font-black leading-none mb-1">x 3 Sets</p>
                            <p className="text-[#627382] text-[9px] font-black uppercase tracking-widest">Volume</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Guide & Actions */}
                <div className="flex-1 p-8 flex flex-col justify-between relative">
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center text-[#0B2132] transition-colors z-10"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 rounded-xl bg-[#0B2132] flex items-center justify-center text-white">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" /></svg>
                            </div>
                            <h3 className="text-[#0B2132] text-[20px] font-black tracking-tight">Preparation Guide</h3>
                        </div>

                        <div className="space-y-5 mb-8">
                            {[
                                "Lie face down on the floor with your arms at your sides, palms facing down.",
                                "Squeeze your shoulder blades together and lift your chest off the floor.",
                                "Rotate your arms so your thumbs point toward the ceiling.",
                                "Hold for the prescribed duration while maintaining a neutral neck."
                            ].map((step, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="w-7 h-7 rounded-full bg-[#E9F3F6] flex items-center justify-center shrink-0 border border-[#1A7785]/10 group-hover:bg-[#1A7785] group-hover:text-white transition-colors">
                                        <span className="text-[12px] font-black">{i + 1}</span>
                                    </div>
                                    <p className="text-[#55697A] text-[14px] font-bold leading-relaxed">{step}</p>
                                </div>
                            ))}
                        </div>

                        {/* Physio Tip */}
                        <div className="bg-[#E9F3F6]/50 p-5 rounded-[24px] border-l-4 border-[#1A7785] flex gap-4">
                            <div className="text-[#1A7785] shrink-0 mt-1">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" /></svg>
                            </div>
                            <div>
                                <span className="text-[#1A7785] text-[10px] font-black uppercase tracking-widest mb-1 block">Physio Tip</span>
                                <p className="text-[#55697A] text-[13px] font-bold leading-relaxed italic">"Keep your gaze directed at the floor to avoid straining your neck."</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center gap-4 mt-4">
                        <button 
                            onClick={onStart}
                            className="flex-1 bg-gradient-to-r from-[#0B1F4D] to-[#1A7785] text-white h-[54px] rounded-2xl font-black text-[15px] uppercase tracking-[0.15em] flex items-center justify-center gap-3 shadow-xl hover:translate-y-[-2px] transition-all"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            Start Exercise
                        </button>
                        <button className="w-[54px] h-[54px] rounded-2xl border-[2px] border-gray-100 flex items-center justify-center text-[#0B2132] hover:bg-[#F8FAFB] transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Prone;
