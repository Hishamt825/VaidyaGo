import React from 'react';

const Logs = ({ onClose, onViewHistory }) => {
    return (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 animate-in fade-in duration-300">
            {/* Backdrop with intense blur */}
            <div 
                className="absolute inset-0 bg-[#0D1C2E]/60 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Success Modal Container */}
            <div className="relative w-full max-w-[400px] bg-white rounded-[32px] p-10 text-center shadow-2xl animate-in zoom-in-95 duration-300">
                
                {/* Success Icon */}
                <div className="w-20 h-20 rounded-full bg-[#EBF5F6] flex items-center justify-center text-[#1A7785] mx-auto mb-6 shadow-sm border-4 border-white">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                {/* Content */}
                <h2 className="text-[28px] font-bold text-[#0D1C2E] mb-3 tracking-tight">Logs Finalized</h2>
                <p className="text-[#627382] text-[14px] font-medium leading-relaxed mb-10 px-4">
                    Your medication adherence logs for today have been securely updated and synchronized.
                </p>

                {/* Actions */}
                <div className="space-y-4">
                    <button 
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-[#0D1C2E] to-[#1A7785] text-white py-4 rounded-full font-bold text-[15px] shadow-xl shadow-[#1A7785]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        Return to Regimen
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                    <button 
                        onClick={() => {
                            onClose();
                            onViewHistory();
                        }}
                        className="text-[13px] font-bold text-[#1A7785] hover:opacity-70 transition-opacity"
                    >
                        View History
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logs;
