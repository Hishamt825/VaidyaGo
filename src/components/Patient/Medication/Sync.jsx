import React from 'react';

const Sync = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[900] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-white/5 backdrop-blur-xl transition-opacity duration-300" 
                onClick={onClose}
            />
            
            {/* Modal Container */}
            <div className="relative w-full max-w-[420px] bg-white rounded-[32px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-300 flex flex-col items-center p-6 text-center">
                
                {/* Success Icon with Glow */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-[#1A7785] blur-[30px] opacity-20 rounded-full scale-150"></div>
                    <div className="relative w-16 h-16 bg-[#F4F9F9] rounded-full flex items-center justify-center text-[#1A7785] shadow-inner">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                {/* Title & Description */}
                <h2 className="text-[24px] font-bold text-[#0D1C2E] mb-2 leading-tight">Calendar Sync Successful!</h2>
                <p className="text-[#627382] text-[12px] font-medium leading-relaxed mb-6 max-w-[300px]">
                    Your session with <span className="text-[#0D1C2E] font-bold">Dr. Thorne</span> has been added to your Google Calendar. You will receive a reminder 15 minutes before the start.
                </p>

                {/* Confirmed Slot Details */}
                <div className="w-full bg-[#F4F9F9] rounded-[20px] p-3.5 flex items-center gap-4 mb-6 border border-gray-50 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1A7785] shadow-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div className="text-left">
                        <p className="text-[9px] font-bold text-[#627382] uppercase tracking-wider mb-0.5">Confirmed Slot</p>
                        <p className="text-[14px] font-bold text-[#0D1C2E]">Oct 6, 2023 <span className="text-[#1A7785] font-black mx-1">at</span> 10:30 AM</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="w-full space-y-3.5">
                    <button 
                        onClick={onClose}
                        className="w-full h-[50px] rounded-full bg-gradient-to-r from-[#0B1F4D] to-[#1A7785] text-white font-bold text-[14px] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        BACK TO DASHBOARD
                    </button>
                    <button 
                        onClick={onClose}
                        className="text-[13px] font-bold text-[#1A7785] hover:text-[#0D1C2E] transition-colors"
                    >
                        View My Schedule
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sync;
