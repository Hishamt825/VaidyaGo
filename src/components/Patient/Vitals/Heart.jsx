import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeartMetric = ({ icon, label, value, unit, status }) => (
    <div className="bg-[#f0f7f8] rounded-[24px] p-5 flex flex-col border border-[#e2eef1]">
        <div className="flex items-center gap-2 mb-3">
            <div className="text-[#1A7785]">
                {icon}
            </div>
            <span className="text-[#627382] text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
        </div>
        <div className="flex items-baseline gap-1.5">
            <span className="text-[#0B1F4D] text-[32px] font-bold leading-none">{value}</span>
            {unit && <span className="text-[#627382] text-[12px] font-bold uppercase">{unit}</span>}
            {status && (
                <div className="flex items-center gap-1.5 ml-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[#0B1F4D] text-[16px] font-bold">{status}</span>
                </div>
            )}
        </div>
    </div>
);

const Heart = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 backdrop-blur-xl bg-slate-900/40 animate-in fade-in duration-300"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white w-full max-w-[480px] rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">

                {/* Header Section */}
                <div className="relative h-[160px] bg-gradient-to-br from-[#0B1F4D] via-[#124d55] to-[#1A7785] p-8 flex flex-col justify-end overflow-hidden">
                    {/* Background Heart Icon */}
                    <div className="absolute top-6 right-6 text-white/5 pointer-events-none">
                        <svg className="w-[120px] h-[120px]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </div>

                    <div className="flex items-center gap-2.5 mb-6">
                        <div className="w-8 h-8 bg-white/10 rounded-lg backdrop-blur-md flex items-center justify-center border border-white/20">
                            <svg className="w-5 h-5 text-[#6ED4D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <span className="text-white text-[15px] font-bold tracking-tight">VaidyaGo</span>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-white text-[28px] font-bold leading-tight mb-1">Heart Health</h2>
                        <p className="text-[#6ED4D4] text-[11px] font-black uppercase tracking-[0.2em] opacity-80">Patient: Alex Rivera</p>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-6 pt-8 flex flex-col gap-6">

                    {/* ECG Visualization with scrolling animation */}
                    <div className="bg-[#f0f7f8] rounded-[24px] p-6 relative overflow-hidden border border-[#e2eef1] h-[100px] flex items-center">
                        <style>
                            {`
                                @keyframes heartScroll {
                                    0% { transform: translateX(-50%); }
                                    100% { transform: translateX(0); }
                                }
                                .animate-heart-scroll {
                                    animation: heartScroll 4s linear infinite;
                                }
                            `}
                        </style>
                        <div className="flex w-[200%] animate-heart-scroll">
                            <svg className="w-1/2 h-[64px]" viewBox="0 0 400 80" fill="none" preserveAspectRatio="none">
                                <path
                                    d="M0 40 L80 40 L90 20 L100 60 L110 40 L160 40 L170 10 L185 70 L200 40 L250 40 L260 25 L270 55 L280 40 L350 40 L360 20 L370 60 L380 40 L400 40"
                                    stroke="#1A7785"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <svg className="w-1/2 h-[64px]" viewBox="0 0 400 80" fill="none" preserveAspectRatio="none">
                                <path
                                    d="M0 40 L80 40 L90 20 L100 60 L110 40 L160 40 L170 10 L185 70 L200 40 L250 40 L260 25 L270 55 L280 40 L350 40 L360 20 L370 60 L380 40 L400 40"
                                    stroke="#1A7785"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        {/* Optional Gradient fade for smoother edges */}
                        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#f0f7f8] to-transparent z-10" />
                        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#f0f7f8] to-transparent z-10" />
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <HeartMetric
                            icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>}
                            label="Heart Rate"
                            value="72"
                            unit="BPM"
                        />
                        <HeartMetric
                            icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" /></svg>}
                            label="Rhythm"
                            status="Normal"
                        />
                    </div>

                    {/* Trend Analysis */}
                    <div className="bg-[#f0f7f8] rounded-[24px] p-5 flex items-center justify-between border border-[#e2eef1]">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1A7785] shadow-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[#627382] text-[10px] font-black uppercase tracking-[0.2em] mb-0.5">Trend Analysis</p>
                                <p className="text-[#0B1F4D] text-[17px] font-bold">Stable</p>
                            </div>
                        </div>
                        <span className="bg-cyan-100 text-cyan-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider">+0.2% Variance</span>
                    </div>

                    {/* Footer Buttons */}
                    <div className="mt-2 flex items-center gap-3">
                        <button 
                            onClick={() => {
                                onClose();
                                navigate('/VitalsDetail');
                            }}
                            className="flex-1 bg-gradient-to-r from-[#0B1F4D] to-[#1A7785] text-white py-4 rounded-full font-bold text-[15px] shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                        >
                            View Detailed Reports
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                        <button
                            onClick={onClose}
                            className="px-8 py-4 text-[#627382] font-bold text-[15px] hover:bg-gray-50 rounded-full transition-all"
                        >
                            Dismiss
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Heart;
