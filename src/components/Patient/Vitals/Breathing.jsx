import React from 'react';
import { Wind, X, Zap } from 'lucide-react';
import phImg from '../../../assets/ph.png';

const Breathing = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/30 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <div
                className="relative w-full max-w-[580px] bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
                {/* Header Gradient */}
                <div className="relative h-[120px] bg-gradient-to-br from-[#0B3A4F] via-[#125A6C] to-[#1A7785] p-6 flex items-start justify-between">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-1">
                            <Wind className="text-[#6ED4D4] w-6 h-6" />
                            <h2 className="text-white text-[28px] font-bold tracking-tight">Breathing Health</h2>
                        </div>
                        <p className="text-white/60 text-[10px] font-medium tracking-wide">Real-time Respiration Analysis</p>
                    </div>

                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 mb-2">
                            <div className="w-5 h-5 rounded-full overflow-hidden border border-white/40 shadow-sm">
                                <img src={phImg} alt="Alex" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-white text-[12px] font-bold">Alex Rivera</span>
                        </div>
                        <span className="text-white/50 text-[9px] font-black uppercase tracking-[0.2em] pr-2">Status: Optimized</span>
                    </div>
                    
                    {/* Decorative Blur */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-12 translate-x-12" />
                </div>

                {/* Body Content */}
                <div className="px-8 pb-8 pt-6 -mt-8 bg-white rounded-t-[40px] relative z-10">
                    
                    {/* Live Pulse Wave Visualization */}
                    <div className="bg-[#F3F9FA] border border-[#E5EFF1] rounded-[32px] p-6 mb-6 shadow-inner shadow-teal-900/5">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-[#1A7785] text-[10px] font-black uppercase tracking-[0.25em]">Live Pulse Wave</span>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[#627382] text-[10px] font-bold uppercase tracking-widest opacity-80">Synchronized</span>
                            </div>
                        </div>
                        
                        <div className="h-[80px] w-full relative overflow-hidden flex items-end">
                            {/* Wave SVG - keeping simple CSS animation for the wave itself as it's not the popup entrance */}
                            <svg width="100%" height="100%" viewBox="0 0 400 80" preserveAspectRatio="none" className="overflow-visible">
                                <path
                                    d="M-400 40 Q-350 10 -300 40 T-200 40 T-100 40 T0 40 T100 40 T200 40 T300 40 T400 40"
                                    stroke="#1A7785"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    fill="rgba(26, 119, 133, 0.08)"
                                    className="wave-animation"
                                />
                            </svg>
                            <style>{`
                                @keyframes waveMove {
                                    from { transform: translateX(0); }
                                    to { transform: translateX(400px); }
                                }
                                .wave-animation {
                                    animation: waveMove 4s linear infinite;
                                }
                            `}</style>
                            
                            {/* Center line */}
                            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#1A7785]/20 to-transparent shadow-sm" />
                        </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-white border border-[#F0F4F5] rounded-[24px] p-4 flex flex-col items-start shadow-sm transition-all hover:shadow-md">
                            <span className="text-[#627382] text-[9px] font-black uppercase tracking-widest mb-1 opacity-70">Respiration Rate</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-[28px] font-bold text-[#0D1C2E] tracking-tight">16</span>
                                <span className="text-[11px] font-bold text-[#627382] uppercase">bpm</span>
                            </div>
                            <div className="w-full h-1 bg-[#F0F4F5] rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-[#1A7785] to-[#6ED4D4] rounded-full w-[65%]" />
                            </div>
                        </div>
                        
                        <div className="bg-white border border-[#F0F4F5] rounded-[24px] p-4 flex flex-col items-start shadow-sm transition-all hover:shadow-md">
                            <span className="text-[#627382] text-[9px] font-black uppercase tracking-widest mb-1 opacity-70">Oxygen Level</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-[28px] font-bold text-[#0D1C2E] tracking-tight">98</span>
                                <span className="text-[11px] font-bold text-[#627382] uppercase">%</span>
                            </div>
                            <div className="w-full h-1 bg-[#F0F4F5] rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full w-[98%]" />
                            </div>
                        </div>

                        <div className="bg-white border border-[#F0F4F5] rounded-[24px] p-4 flex flex-col items-start shadow-sm transition-all hover:shadow-md border-l-[3px] border-l-[#1A7785]/30">
                            <span className="text-[#627382] text-[9px] font-black uppercase tracking-widest mb-1 opacity-70">Quality</span>
                            <div className="flex flex-col">
                                <span className="text-[14px] font-bold text-[#0D1C2E] leading-tight mb-0.5 tracking-tight">Deep & Steady</span>
                                <span className="text-[10px] font-medium text-emerald-600 flex items-center gap-1">
                                    <Zap size={9} fill="currentColor" />
                                    Optimum Depth
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Done Button */}
                    <div className="flex justify-start">
                        <button
                            onClick={onClose}
                            className="bg-[#0B1F4D] text-white px-8 py-3 rounded-full font-bold text-[14px] shadow-lg shadow-blue-900/20 transition-all hover:bg-[#06132D] active:scale-95 flex items-center gap-2"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Breathing;
