import React from 'react';
import { useNavigate } from 'react-router-dom';

const Refill = ({ onClose, onReturn }) => {
    const navigate = useNavigate();
    return (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 animate-in fade-in duration-300">
            {/* Backdrop Blur */}
            <div 
                className="absolute inset-0 bg-[#0B1F4D]/40 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-[400px] bg-white rounded-[32px] p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.25)] animate-in zoom-in-95 duration-200 overflow-hidden">
                
                {/* Success Icon */}
                <div className="mb-6 relative inline-block">
                    <div className="absolute inset-0 bg-[#1A7785]/10 rounded-full scale-150 blur-2xl"></div>
                    <div className="relative w-16 h-16 bg-[#E0F2F2] rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-sm">
                        <div className="w-10 h-10 bg-[#1A7785] rounded-full flex items-center justify-center shadow-lg shadow-[#1A7785]/20">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <h2 className="text-[24px] font-black text-[#0D1C2E] mb-2 tracking-tight">Refill Request Sent</h2>
                <p className="text-[#627382] text-[13.5px] font-medium leading-relaxed mb-8 px-4">
                    Your refill request for <span className="text-[#1A7785] font-bold">12 medications</span> has been sent to <span className="text-[#0D1C2E] font-bold">Sanctuary Pharmacy</span>.
                </p>

                {/* Delivery Info Card */}
                <div className="bg-[#F4F9F9] rounded-[24px] p-4 flex items-center gap-4 mb-8 border border-[#EBF5F6] shadow-sm">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0 border border-slate-50">
                        <svg className="w-5 h-5 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011 1v2.5a.5.5 0 01-1 0V18a1 1 0 01-1-1zm1 3h4a2 2 0 002-2v-3a2 2 0 00-2-2h-3m-1-5l-4-3m4 3v2m0 4h.01" />
                        </svg>
                    </div>
                    <div className="flex-1 text-left">
                        <p className="text-[9px] font-bold text-[#627382] uppercase tracking-[0.1em] mb-0.5 opacity-70">Estimated Delivery</p>
                        <p className="text-[14px] font-bold text-[#0D1C2E]">Tomorrow, by 4:00 PM</p>
                    </div>
                    <div className="bg-[#1A7785] text-white text-[8px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm shadow-[#1A7785]/20">
                        Priority
                    </div>
                </div>

                <div className="space-y-4">
                    <button 
                        onClick={onReturn || onClose}
                        className="w-full bg-[#1A7785] hover:bg-[#125863] text-white py-4 rounded-full font-bold text-[15px] shadow-xl shadow-[#1A7785]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        Return to Dashboard
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>

                    <button 
                        onClick={() => navigate('/View_request')}
                        className="text-[12px] font-bold text-[#1A7785] hover:opacity-70 transition-opacity"
                    >
                        View Request Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Refill;
