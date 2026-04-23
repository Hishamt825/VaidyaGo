import React from 'react';

const Progress = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop Blur */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-[480px] bg-white rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">

                {/* Header */}
                <div className="flex items-center justify-between px-7 pt-7 pb-4">
                    <h3 className="text-[17px] font-bold text-[#1A7785]">Clinical Sanctuary</h3>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="px-8 pb-8 flex flex-col items-center text-center">

                    {/* Status Icon Section */}
                    <div className="relative mb-5 mt-2">
                        <div className="w-20 h-20 rounded-full bg-[#0D1C2E] flex items-center justify-center text-white shadow-xl">
                            <svg className="w-9 h-9 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#6ED4D4] border-4 border-white flex items-center justify-center text-white shadow-lg">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-[28px] font-bold text-[#0D1C2E] mb-1.5 tracking-tight">In Progress</h2>

                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#F0F9F9] text-[#1A7785] px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-5 border border-[#6ED4D4]/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1A7785]" />
                        Verifying Request
                    </div>

                    <p className="text-[13px] text-[#627382] font-medium leading-relaxed mb-6 max-w-[320px]">
                        Our clinical team is currently reviewing your medication history and insurance eligibility to ensure your safety.
                    </p>

                    {/* Completion Info Card */}
                    <div className="w-full bg-[#F0F7F8] rounded-[24px] p-4 flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1A7785] shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <p className="text-[9px] font-bold text-[#627382] uppercase tracking-[0.1em] mb-0.5 opacity-70">Estimated Completion</p>
                            <p className="text-[16px] font-bold text-[#0D1C2E]">14 hours remaining</p>
                        </div>
                    </div>

                    {/* Primary Button */}
                    <button
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-[#0D1C2E] to-[#1A7785] text-white py-3.5 rounded-[18px] font-bold text-[15px] flex items-center justify-center gap-2 shadow-xl shadow-black/5 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Return to Details
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>

                    <p className="mt-6 text-[11px] font-medium text-[#627382]">
                        Need urgent assistance? <span className="text-[#1A7785] font-bold cursor-pointer hover:underline">Contact Support</span>
                    </p>
                </div>

                {/* Bottom Progress Bar Decoration */}
                <div className="h-[6px] w-full bg-[#F1F5F9] relative">
                    <div className="absolute top-0 left-0 h-full w-[60%] bg-gradient-to-r from-[#0D1C2E] to-[#1A7785] rounded-r-full" />
                </div>
            </div>
        </div>
    );
};

export default Progress;
