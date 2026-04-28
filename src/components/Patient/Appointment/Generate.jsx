import React from 'react';
import { Check, Download, FileText, ArrowLeft } from 'lucide-react';

const Generate = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[10px]" onClick={onClose}></div>

            {/* Modal Container */}
            <div className="relative w-full max-w-[420px] bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col items-center text-center p-8">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                >
                    <X size={20} />
                </button>

                {/* Success Icon Animation */}
                <div className="relative mb-6">
                    <div className="w-20 h-20 bg-[#E6F8F9] rounded-full flex items-center justify-center animate-pulse">
                        <div className="w-14 h-14 bg-[#1A7785] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#1A7785]/30">
                            <Check size={28} strokeWidth={3} />
                        </div>
                    </div>
                </div>

                {/* Title & Description */}
                <h2 className="text-[24px] font-[900] text-[#0D1C2E] mb-2 leading-tight">PDF Ready for Download</h2>
                <p className="text-gray-400 text-[14px] font-medium leading-relaxed max-w-[300px] mb-8">
                    Your clinical schedule has been successfully compiled and is ready for offline access.
                </p>

                {/* File Info Card */}
                <div className="w-full bg-[#F5F9FA] rounded-[24px] p-5 mb-8 flex items-center gap-4 text-left border border-gray-100">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#1A7785] shrink-0">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h3 className="text-[14px] font-bold text-[#0D1C2E]">Clinical_Schedule_Oct2024.pdf</h3>
                        <p className="text-[11px] text-gray-400 font-medium">Size: 1.2 MB • Generated just now</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="w-full space-y-3">
                    <button 
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-[#1A7785] to-[#49AAB3] text-white py-4 rounded-2xl font-bold text-[15px] shadow-xl shadow-[#1A7785]/20 hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5"
                    >
                        <Download size={20} /> Download Now
                    </button>
                    <button 
                        onClick={onClose}
                        className="w-full py-4 text-[#1A7785] font-bold text-[15px] border-2 border-[#E9F3F5] rounded-2xl hover:bg-[#F5F9FA] transition-all flex items-center justify-center gap-2"
                    >
                        Return to Schedule
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Generate;
