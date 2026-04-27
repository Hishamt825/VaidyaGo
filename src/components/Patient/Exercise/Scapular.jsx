import React from 'react';
import body1Img from '../../../assets/body1.png';

const Scapular = ({ isOpen, onClose, onStart }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop with extreme blur as requested */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[24px] transition-opacity duration-300" onClick={onClose} />
            
            {/* Modal Container */}
            <div className="relative w-full max-w-[840px] bg-white rounded-[40px] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.12)] overflow-hidden animate-in fade-in zoom-in duration-500 border border-black/5 flex h-[540px]">
                
                {/* Left Side: Image & Stats */}
                <div className="relative w-[45%] h-full bg-[#F1F6F8] overflow-hidden">
                    <img src={body1Img} alt="Scapular Anatomy" className="w-full h-full object-cover" />
                    {/* Transparent Layer Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                    
                    {/* Prescribed Badge */}
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/50 shadow-lg">
                        <svg className="w-3.5 h-3.5 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        <span className="text-[#0B2132] text-[10px] font-black uppercase tracking-widest">Prescribed</span>
                    </div>

                    {/* Bottom Stats Grid */}
                    <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                        <div className="bg-white/20 backdrop-blur-xl p-4 rounded-[24px] flex-1 border border-white/30 shadow-xl">
                            <p className="text-white/60 text-[8px] font-black uppercase tracking-widest mb-1">Target Reps</p>
                            <p className="text-white text-[16px] font-black tracking-tight">12 <span className="text-[12px] opacity-60">x 3 Sets</span></p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-xl p-4 rounded-[24px] flex-1 border border-white/30 shadow-xl">
                            <p className="text-white/60 text-[8px] font-black uppercase tracking-widest mb-1">Rest Period</p>
                            <p className="text-white text-[16px] font-black tracking-tight">30 <span className="text-[12px] opacity-60">Secs</span></p>
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
                        <div className="mb-6">
                            <h2 className="text-[#0B2132] text-[28px] font-black tracking-tight mb-2">Scapular Pinches</h2>
                            <div className="flex items-center gap-2 text-[#1A7785] opacity-60">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span className="text-[12px] font-bold">Upper Thoracic Mobility & Strength</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-[#0B2132] text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-40">Preparation Guide</h4>
                            <div className="space-y-4">
                                {[
                                    "Sit or stand tall with your arms relaxed by your sides and your chin tucked slightly.",
                                    "Squeeze your shoulder blades together as if you are trying to hold a pencil between them.",
                                    "Hold the pinch for 3-5 seconds while keeping your shoulders down away from your ears."
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-7 h-7 rounded-full bg-[#E9F3F6] flex items-center justify-center shrink-0 border border-[#1A7785]/10">
                                            <span className="text-[#1A7785] text-[12px] font-black">{i + 1}</span>
                                        </div>
                                        <p className="text-[#55697A] text-[14px] font-bold leading-relaxed">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Physio Tip Box */}
                        <div className="bg-[#F4FAFB] p-4 rounded-[24px] border border-[#1A7785]/5 flex gap-4">
                            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-[#1A7785] shadow-sm shrink-0 border border-gray-50">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" /></svg>
                            </div>
                            <div>
                                <span className="text-[#1A7785] text-[10px] font-black uppercase tracking-widest mb-0.5 block">Physio Tip</span>
                                <p className="text-[#55697A] text-[12px] font-bold leading-relaxed opacity-80">Focus on moving your shoulder blades inward and downward, not upward towards your neck.</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center gap-4 mt-6">
                        <button 
                            onClick={onStart}
                            className="flex-1 bg-gradient-to-r from-[#0B1F4D] to-[#1A7785] text-white h-[54px] rounded-2xl font-black text-[15px] uppercase tracking-[0.15em] flex items-center justify-center gap-3 shadow-xl hover:translate-y-[-2px] transition-all active:translate-y-0"
                        >
                            Start Exercise
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </button>
                        <button className="w-[56px] h-[56px] rounded-2xl border-[2px] border-gray-100 flex items-center justify-center text-[#0B2132] hover:bg-[#F8FAFB] transition-colors shadow-sm">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scapular;
