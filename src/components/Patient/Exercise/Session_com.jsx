import React from 'react';

const SessionCom = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1423]/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-[360px] rounded-[28px] shadow-2xl overflow-hidden flex flex-col">
                
                {/* Header Gradient */}
                <div className="pt-6 pb-8 px-6 bg-gradient-to-b from-[#1a6e78] via-[#49AAB3]/80 to-white relative">
                    <h2 className="text-white text-[18px] font-bold relative z-10">Session Complete</h2>
                </div>

                {/* Content */}
                <div className="px-6 pb-5 flex flex-col gap-4 mt-[-10px] relative z-10">
                    <div>
                        <h3 className="text-[#0B2132] text-[15px] font-bold mb-1">Ready to complete your session?</h3>
                        <p className="text-[#627382] text-[12px] leading-relaxed font-medium">
                            Great work today. Your progress has been logged and shared with your clinical team. You can review your detailed analytics in the portal.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#F1F6F8] rounded-[16px] py-3 flex flex-col items-center justify-center gap-1">
                            <svg className="w-5 h-5 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-[#627382] text-[9px] font-bold uppercase tracking-widest">Total Time</span>
                            <span className="text-[#0B2132] text-[18px] font-bold leading-none">08:24</span>
                        </div>
                        <div className="bg-[#F1F6F8] rounded-[16px] py-3 flex flex-col items-center justify-center gap-1">
                            <svg className="w-5 h-5 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-[#627382] text-[9px] font-bold uppercase tracking-widest">Exercises</span>
                            <span className="text-[#0B2132] text-[18px] font-bold leading-none">05/05</span>
                        </div>
                    </div>

                    {/* Milestone Card */}
                    <div className="bg-[#E4F5F5] rounded-[14px] p-3 flex items-center gap-3">
                        <div className="text-[#1A7785]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-[#1A7785] text-[12px] font-bold leading-tight">Consistency Milestone Reached</h4>
                            <p className="text-[#1A7785]/80 text-[10px] font-medium leading-tight mt-0.5">You've completed 4 sessions this week!</p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-2 mt-1">
                        <button 
                            onClick={() => {
                                onClose();
                                // Potentially navigate to dashboard
                                window.location.href = '/Patient-Dashboard';
                            }}
                            className="w-full bg-gradient-to-b from-[#0B2132] to-[#1A7785] text-white py-3 rounded-full text-[13px] font-bold shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                            Save & Exit
                        </button>
                        <button 
                            onClick={onClose}
                            className="w-full bg-white border border-[#E9F3F6] text-[#0B2132] py-3 rounded-full text-[13px] font-bold hover:bg-[#F1F6F8] transition-colors"
                        >
                            Return to Session
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-[#E9F3F6] py-2.5 px-6 flex justify-between items-center mt-auto border-t border-white">
                    <span className="text-[#627382] text-[8px] font-bold uppercase tracking-widest">Vaidyago Clinical Sanctuary</span>
                    <span className="text-[#627382] text-[8px] font-bold">Ref: VG-9942-S</span>
                </div>
            </div>
        </div>
    );
};

export default SessionCom;
