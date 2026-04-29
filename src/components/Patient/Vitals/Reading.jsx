import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Activity, Heart, ShieldCheck, X } from 'lucide-react';

const Reading = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleReturn = () => {
        onClose();
        navigate('/Vitals');
    };

    const handleViewHistory = () => {
        onClose();
        navigate('/VitalsHistory');
    };

    return (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-[390px] bg-white rounded-[40px] shadow-2xl overflow-hidden border border-white/20">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-300 hover:text-[#0D1C2E] transition-colors z-10"
                >
                    <X size={20} />
                </button>

                {/* Success Icon */}
                <div className="flex justify-center pt-8 pb-4">
                    <div className="w-14 h-14 rounded-full bg-[#B2F0F5] flex items-center justify-center shadow-inner">
                        <div className="w-9 h-9 rounded-full bg-[#1A7785] flex items-center justify-center text-white">
                            <Check size={20} strokeWidth={3} />
                        </div>
                    </div>
                </div>

                <div className="px-8 pb-8 flex flex-col items-center text-center">
                    <h1 className="text-[#0D1C2E] text-[22px] font-black tracking-tight leading-tight mb-1.5">Reading Saved Successfully!</h1>
                    <p className="text-[#627382] text-[11px] font-bold opacity-60 leading-relaxed mb-6 px-2">
                        Your vitals have been securely logged and synchronized with your medical record.
                    </p>

                    {/* Vitals Summary Card */}
                    <div className="w-full bg-[#F5FAFB] rounded-[24px] p-5 border border-[#E1EEF0] mb-6">
                        <div className="space-y-3.5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Activity size={14} className="text-[#1A7785] opacity-70" />
                                    <span className="text-[#627382] text-[9px] font-black uppercase tracking-widest">Blood Pressure</span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-[#0D1C2E] text-[17px] font-black tracking-tight">120/80</span>
                                    <span className="text-[#627382] text-[8px] font-bold opacity-50 uppercase">mmHg</span>
                                </div>
                            </div>
                            
                            <div className="h-[1px] bg-[#E1EEF0] w-full" />

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Heart size={14} className="text-[#E85B5A] opacity-70" />
                                    <span className="text-[#627382] text-[9px] font-black uppercase tracking-widest">Heart Rate</span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-[#0D1C2E] text-[17px] font-black tracking-tight">72</span>
                                    <span className="text-[#627382] text-[8px] font-bold opacity-50 uppercase">BPM</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-3.5 border-t border-[#E1EEF0]/80 flex items-center justify-between">
                            <p className="text-[#627382] text-[9px] font-bold opacity-50">Recorded at: 10:45 AM, Oct 24</p>
                            <div className="flex items-center gap-1">
                                <ShieldCheck size={11} className="text-[#1A7785]" />
                                <span className="text-[#1A7785] text-[8px] font-black uppercase tracking-widest">Verified</span>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="w-full space-y-3">
                        <button 
                            onClick={handleReturn}
                            className="w-full h-[56px] bg-[#0D4F5A] text-white rounded-full font-bold text-[16px] shadow-xl shadow-teal-900/20 flex items-center justify-center gap-2 transition-all hover:bg-[#0A3F48] active:scale-[0.98]"
                        >
                            Return to Dashboard
                            <ArrowRight size={18} strokeWidth={2.5} />
                        </button>
                        <button 
                            onClick={handleViewHistory}
                            className="w-full h-[56px] border-2 border-[#F0F4F5] text-[#1A7785] rounded-full font-bold text-[16px] hover:bg-[#F9FBFC] transition-all active:scale-[0.98]"
                        >
                            View Vitals History
                        </button>
                    </div>
                </div>

                {/* Footer Branding */}
                <div className="bg-[#F8FAFB] py-3.5 text-center border-t border-[#F0F4F5]">
                    <p className="text-[#627382] text-[8px] font-black uppercase tracking-[0.3em] opacity-30">
                        The Clinical Sanctuary — Secure Portal
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Reading;
