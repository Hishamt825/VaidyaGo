import React from 'react';
import { Check, FileText, X } from 'lucide-react';
import phImg from '../../../assets/ph.png';

const VitalsDown = ({ isOpen, onClose, onReturn }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop with Blur - No Motion */}
            <div 
                className="absolute inset-0 bg-[#0B1F4D]/40 backdrop-blur-md transition-none"
                onClick={onClose}
            ></div>

            {/* Modal Card - No Motion */}
            <div className="relative bg-white w-full max-w-[440px] rounded-[32px] p-8 flex flex-col items-center text-center shadow-2xl border border-white/20">
                
                {/* Specialist Tip Bubble */}
                <div className="absolute -top-12 -right-4 flex items-center gap-3">
                    <div className="bg-white rounded-2xl p-3 shadow-xl border border-gray-100 relative max-w-[180px]">
                        <p className="text-[#0D1C2E] text-[11px] font-bold leading-tight">
                            "Keep this report handy for your next specialist visit!"
                        </p>
                        <div className="absolute bottom-[-6px] right-4 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45"></div>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-lg bg-white shrink-0">
                        <img src={phImg} alt="Specialist" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Success Icon */}
                <div className="w-16 h-16 rounded-full bg-[#E6F7F9] flex items-center justify-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#1A7785] flex items-center justify-center text-white">
                        <Check size={24} strokeWidth={3} />
                    </div>
                </div>

                <h1 className="text-[#0D1C2E] text-[26px] font-black leading-tight mb-3">History Ready for Download</h1>
                <p className="text-[#627382] text-[13px] font-bold opacity-70 leading-relaxed mb-8 max-w-[300px]">
                    Your clinical history report has been compiled and is securely ready for download.
                </p>

                {/* Report Details Info Box */}
                <div className="w-full bg-[#F0F7F8] rounded-3xl p-6 border border-[#D1EEF1] text-left mb-8 relative group">
                    <div className="flex justify-between items-start mb-5">
                        <div>
                            <p className="text-[#1A7785] text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Report Type</p>
                            <p className="text-[#0D1C2E] text-[15px] font-black">Full Clinical History</p>
                        </div>
                        <FileText size={20} className="text-[#1A7785] opacity-30" />
                    </div>
                    <div className="flex gap-12">
                        <div>
                            <p className="text-[#1A7785] text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Format</p>
                            <p className="text-[#0D1C2E] text-[13px] font-bold">PDF (Clinical Optimized)</p>
                        </div>
                        <div>
                            <p className="text-[#1A7785] text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Size</p>
                            <p className="text-[#0D1C2E] text-[13px] font-bold">2.4 MB</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="w-full space-y-4">
                    <button className="w-full bg-gradient-to-r from-[#0B1F4D] to-[#1A7785] text-white py-4 rounded-2xl font-black text-[16px] shadow-xl hover:shadow-2xl transition-all active:scale-[0.98]">
                        Download Now
                    </button>
                    <button 
                        onClick={onReturn}
                        className="text-[#1A7785] text-[14px] font-black hover:underline underline-offset-4"
                    >
                        Return to Dashboard
                    </button>
                </div>

                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 left-6 text-gray-300 hover:text-[#0D1C2E] transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};

export default VitalsDown;
