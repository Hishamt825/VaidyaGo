import React from 'react';
import { X, Check } from 'lucide-react';
import Pressure_report from './Pressure_report';

const Pressure_heart = ({ isOpen, onClose }) => {
    const [isReportOpen, setIsReportOpen] = React.useState(false);
    
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
                className="relative w-full max-w-[520px] bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
                {/* Header with Gradient */}
                <div className="relative h-[120px] bg-gradient-to-br from-[#0B4052] via-[#125A6C] to-[#1A7785] p-6">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <svg className="w-7 h-7 text-[#125A6C]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-lg tracking-tight">VaidyaGo</span>
                                <span className="text-white/60 text-[9px] font-black uppercase tracking-[0.25em]">Health Pulse</span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 text-white"
                        >
                            <X size={16} strokeWidth={2.5} />
                        </button>
                    </div>
                    
                    {/* Decorative Blur Circle */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                </div>

                {/* Content Body */}
                <div className="px-8 pb-6 pt-5 -mt-8 bg-white rounded-t-[40px] relative z-10">
                    
                    {/* Title Section */}
                    <div className="flex justify-between items-baseline mb-4">
                        <div className="flex flex-col">
                            <span className="text-[#1A7785] text-[10px] font-black uppercase tracking-[0.2em] mb-1">Health Status</span>
                            <h2 className="text-[#0D1C2E] text-[28px] font-bold tracking-tight">Pressure</h2>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[#627382] text-[10px] font-bold uppercase tracking-wider mb-0.5">Patient</span>
                            <span className="text-[#0D1C2E] text-[15px] font-bold">Alex Rivera</span>
                        </div>
                    </div>

                    {/* Pressure Gauge Visualization */}
                    <div className="relative flex flex-col items-center justify-center mb-6 py-1">
                        <div className="relative w-[240px] h-[120px]">
                            {/* Gauge Background Arc */}
                            <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-sm">
                                <path
                                    d="M 20 90 A 80 80 0 0 1 180 90"
                                    fill="none"
                                    stroke="#E8F1F3"
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                />
                                {/* Progress Arc */}
                                <path
                                    d="M 20 90 A 80 80 0 0 1 180 90"
                                    fill="none"
                                    stroke="#0D4F5A"
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                    strokeDasharray="251.32"
                                    strokeDashoffset="62.83" // Approx position for 120/80
                                />
                                
                                {/* Tick Marks */}
                                <line x1="20" y1="90" x2="20" y2="75" stroke="#E8F1F3" strokeWidth="2" />
                                <line x1="180" y1="90" x2="180" y2="75" stroke="#E8F1F3" strokeWidth="2" />
                            </svg>
                            
                            {/* Gauge Reading */}
                            <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
                                <div 
                                    className="text-[#0D1C2E] text-[48px] font-bold tracking-tighter leading-none"
                                >
                                    120/80
                                </div>
                                <span className="text-[#627382] text-[10px] font-bold uppercase tracking-[0.2em] -mt-1 opacity-60">mmHg</span>
                            </div>
                        </div>
                    </div>

                    {/* Status Cards Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-[#E6F4F1] p-4 rounded-[24px] border border-[#D1E9E4] flex items-center gap-3">
                            <div className="w-9 h-9 bg-[#0D4F5A] rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-teal-900/10">
                                <Check className="text-white" size={20} strokeWidth={3} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[#627382] text-[9px] font-black uppercase tracking-widest leading-none mb-1">Status</span>
                                <span className="text-[#0D4F5A] text-[16px] font-bold tracking-tight">Optimal</span>
                            </div>
                        </div>
                        
                        <div className="bg-[#F4F8FA] p-4 rounded-[24px] border border-[#E2EAEE] flex items-center gap-3">
                            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-[#E2EAEE] text-[#0D1C2E]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[#627382] text-[9px] font-black uppercase tracking-widest leading-none mb-1">Checked</span>
                                <span className="text-[#0D1C2E] text-[16px] font-bold tracking-tight">2h ago</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Footer */}
                    <div className="flex items-center gap-3 w-full">
                        <button 
                            onClick={() => setIsReportOpen(true)}
                            className="flex-1 h-[56px] bg-gradient-to-r from-[#0B4052] to-[#1A7785] text-white rounded-[20px] font-bold text-[16px] shadow-xl shadow-teal-900/15 flex items-center justify-center tracking-tight transition-all active:scale-95"
                        >
                            New Measurement
                        </button>
                        <button 
                            className="w-[110px] h-[56px] rounded-[20px] border-2 border-[#F0F4F5] text-[#627382] font-bold text-[16px] bg-white transition-all active:scale-95"
                        >
                            History
                        </button>
                    </div>
                </div>
            </div>

            <Pressure_report 
                isOpen={isReportOpen} 
                onClose={() => setIsReportOpen(false)} 
            />
        </div>
    );
};

export default Pressure_heart;
