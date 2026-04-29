import React from 'react';
import { X, User, Activity, Heart, Save } from 'lucide-react';

const NewMeasurement = ({ isOpen, onClose, onSave }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <div
                className="relative w-full max-w-[440px] bg-white rounded-[32px] shadow-2xl overflow-hidden border border-white/20"
            >
                {/* Header */}
                <div className="p-8 pb-0">
                    <div className="flex justify-between items-start mb-6">
                        <div className="space-y-1">
                            <h2 className="text-[#1A7785] text-[22px] font-bold tracking-tight">VaidyaGo</h2>
                            <h1 className="text-[#0D1C2E] text-[24px] font-bold tracking-tight leading-tight">New Measurement</h1>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="w-5 h-5 rounded-full bg-[#F4F8FA] flex items-center justify-center text-[#627382]">
                                    <User size={12} />
                                </div>
                                <span className="text-[#627382] text-[13px] font-medium">Alex Rivera</span>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-[#F4F8FA] flex items-center justify-center text-[#627382] hover:text-[#0D1C2E] transition-all"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Form Sections */}
                    <div className="space-y-6">
                        {/* Blood Pressure Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[#1A7785]">
                                <Activity size={18} strokeWidth={2.5} />
                                <span className="text-[11px] font-black uppercase tracking-[0.15em]">Blood Pressure</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[#627382] text-[11px] font-bold">Systolic (mmHg)</label>
                                    <input 
                                        type="text" 
                                        placeholder="120"
                                        className="w-full h-[52px] bg-[#E9EFF2] border-none rounded-[16px] px-5 text-[#0D1C2E] font-bold placeholder:text-[#0D1C2E]/30 focus:ring-2 focus:ring-[#1A7785]/20 transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[#627382] text-[11px] font-bold">Diastolic (mmHg)</label>
                                    <input 
                                        type="text" 
                                        placeholder="80"
                                        className="w-full h-[52px] bg-[#E9EFF2] border-none rounded-[16px] px-5 text-[#0D1C2E] font-bold placeholder:text-[#0D1C2E]/30 focus:ring-2 focus:ring-[#1A7785]/20 transition-all outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Heart Rate Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[#1A7785]">
                                <Heart size={18} strokeWidth={2.5} />
                                <span className="text-[11px] font-black uppercase tracking-[0.15em]">Heart Rate</span>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[#627382] text-[11px] font-bold">Pulse (BPM)</label>
                                <input 
                                    type="text" 
                                    placeholder="72"
                                    className="w-full h-[52px] bg-[#E9EFF2] border-none rounded-[16px] px-5 text-[#0D1C2E] font-bold placeholder:text-[#0D1C2E]/30 focus:ring-2 focus:ring-[#1A7785]/20 transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-10 pb-8 text-center">
                        <button
                            onClick={onSave}
                            className="w-full h-[56px] bg-gradient-to-r from-[#0D4F5A] to-[#1A7785] text-white rounded-full font-bold text-[16px] shadow-lg shadow-teal-900/20 flex items-center justify-center gap-3 transition-all active:scale-95"
                        >
                            <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                                <Save size={14} fill="currentColor" />
                            </div>
                            Save Reading
                        </button>
                        <p className="text-[#627382] text-[11px] font-medium opacity-60 mt-4">
                            Recorded at 10:45 AM, Oct 24
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewMeasurement;
