import React from 'react';
import { X, Timer, CheckCircle2, Dumbbell, Activity, Heart, Save, Play } from 'lucide-react';

const Progress = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#0B1F4D]/40 backdrop-blur-md transition-opacity duration-300" onClick={onClose} />
            
            {/* Modal Content */}
            <div className="bg-white w-full max-w-[700px] rounded-[40px] shadow-2xl relative z-10 p-8 md:p-10 animate-in fade-in zoom-in duration-300 overflow-hidden">
                
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h2 className="text-[#0D1C2E] text-[32px] font-black tracking-tight leading-none mb-2">Session Progress</h2>
                        <p className="text-[#627382] text-[14px] font-bold opacity-70 tracking-tight">Posture Strengthening • Circuit A</p>
                    </div>
                    <div className="w-[54px] h-[54px] rounded-2xl bg-[#F1F6F8] flex items-center justify-center text-[#1A7785] border border-[#1A7785]/10 shadow-sm">
                        <Timer size={28} />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
                    
                    {/* Left: Circular Progress */}
                    <div className="w-[260px] h-[260px] bg-[#F8FAFB] rounded-[32px] flex flex-col items-center justify-center relative shadow-inner border border-gray-50">
                        <div className="relative w-[180px] h-[180px] mb-4">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="90"
                                    cy="90"
                                    r="80"
                                    stroke="currentColor"
                                    strokeWidth="14"
                                    fill="transparent"
                                    className="text-gray-200"
                                />
                                <circle
                                    cx="90"
                                    cy="90"
                                    r="80"
                                    stroke="currentColor"
                                    strokeWidth="14"
                                    fill="transparent"
                                    strokeDasharray={2 * Math.PI * 80}
                                    strokeDashoffset={2 * Math.PI * 80 * (1 - 0.75)}
                                    strokeLinecap="round"
                                    className="text-[#1A7785]"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-[#0D1C2E] text-[36px] font-black leading-none">75%</span>
                                <span className="text-[#627382] text-[10px] font-black uppercase tracking-[0.2em] mt-1">Complete</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                            <CheckCircle2 size={16} className="text-[#1A7785]" />
                            <span className="text-[#1A7785] text-[12px] font-black uppercase tracking-wider">On Track</span>
                        </div>
                    </div>

                    {/* Right: Stats List */}
                    <div className="flex-1 w-full space-y-4">
                        {/* Completed Sets */}
                        <div className="bg-[#F1FBFC] rounded-[24px] p-5 flex items-center gap-4 border border-[#D1EBEF]/50 shadow-sm">
                            <div className="w-12 h-12 bg-[#1A7785] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#1A7785]/20">
                                <Dumbbell size={22} />
                            </div>
                            <div className="flex-1">
                                <p className="text-[#1A7785] text-[10px] font-black uppercase tracking-widest mb-1">Completed Sets</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-[#0D1C2E] text-[22px] font-black">06</span>
                                    <span className="text-[#627382] text-[14px] font-bold">/ 08 Total</span>
                                </div>
                            </div>
                            <CheckCircle2 size={20} className="text-[#1A7785] opacity-40" />
                        </div>

                        {/* Total Reps */}
                        <div className="bg-[#F8FAFB] rounded-[24px] p-5 flex items-center gap-4 border border-gray-100">
                            <div className="w-12 h-12 bg-[#E9EDF0] rounded-2xl flex items-center justify-center text-[#55697A]">
                                <Activity size={22} />
                            </div>
                            <div className="flex-1">
                                <p className="text-[#627382] text-[10px] font-black uppercase tracking-widest mb-1">Total Reps</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-[#0D1C2E] text-[22px] font-black">72</span>
                                    <span className="text-[#627382] text-[14px] font-bold">reps</span>
                                </div>
                            </div>
                            <span className="text-[#627382]/30 text-[10px] font-black uppercase tracking-widest">Current Phase</span>
                        </div>

                        {/* Avg Intensity */}
                        <div className="bg-[#F8FAFB] rounded-[24px] p-5 flex items-center gap-4 border border-gray-100">
                            <div className="w-12 h-12 bg-[#FFF1F1] rounded-2xl flex items-center justify-center text-[#E85B5A]">
                                <Heart size={22} />
                            </div>
                            <div className="flex-1">
                                <p className="text-[#627382] text-[10px] font-black uppercase tracking-widest mb-1">Avg Intensity</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-[#0D1C2E] text-[22px] font-black">124</span>
                                    <span className="text-[#627382] text-[14px] font-bold">bpm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onClose}
                        className="flex-1 bg-[#F1F6F8] hover:bg-[#E9EDF0] text-[#0D1C2E] h-[64px] rounded-[24px] font-black text-[15px] uppercase tracking-[0.1em] flex items-center justify-center gap-3 transition-all"
                    >
                        <Save size={18} />
                        Save and Exit
                    </button>
                    <button 
                        onClick={onClose}
                        className="flex-[1.5] bg-[#1A7785] hover:bg-[#125863] text-white h-[64px] rounded-[24px] font-black text-[15px] uppercase tracking-[0.1em] flex items-center justify-center gap-3 shadow-xl shadow-[#1A7785]/20 transition-all group"
                    >
                        Continue Session
                        <Play size={18} fill="currentColor" className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Background Decor */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#1A7785]/5 rounded-full blur-3xl -z-10" />
            </div>
        </div>
    );
};

export default Progress;
