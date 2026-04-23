import React, { useState } from 'react';
import Logs from './Logs';
import History from './History';

const Update_logs = ({ onClose }) => {
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    const handleFinalize = () => {
        setIsSuccessOpen(true);
    };

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <div 
                className={`absolute inset-0 bg-[#0B1F4D]/40 backdrop-blur-md transition-opacity ${isSuccessOpen || isHistoryOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className={`relative w-full max-w-[600px] bg-white rounded-[32px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.25)] animate-in zoom-in-95 duration-200 ${isSuccessOpen || isHistoryOpen ? 'blur-[8px] scale-[0.98] pointer-events-none' : ''}`}>
                
                {/* Header Section */}
                <div className="px-5 pt-5 pb-3 border-b border-gray-50 relative">
                    <button 
                        onClick={onClose}
                        className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <p className="text-[9px] font-bold text-[#1A7785] uppercase tracking-[0.2em] mb-1">VaidyaGo Log System</p>
                    <h2 className="text-[20px] font-bold text-[#0D1C2E]">Update Logs</h2>
                    <p className="text-[#627382] text-[12px] font-medium">Clinical verification of medication adherence</p>
                </div>

                <div className="px-5 py-4 max-h-[65vh] overflow-y-auto custom-scrollbar">
                    {/* Metformin Section */}
                    <div className="mb-5">
                        <div className="flex items-center gap-2.5 mb-2.5">
                            <div className="w-9 h-9 rounded-full bg-[#E0F2F2] flex items-center justify-center text-[#1A7785]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-[15px] font-bold text-[#0D1C2E]">Metformin</h4>
                                <p className="text-[11px] text-[#627382] font-medium">500mg • Oral Tablet • Morning Dose</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#F0F7F7] border border-transparent transition-all">
                                <svg className="w-5 h-5 mb-1.5 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21V10m0 0a2 2 0 10-4 0m4 0a2 2 0 114 0m-4-8V3m8 8h-3m-1 0h-1m-4 0H4m1 0H3m15 0a3 3 0 01-3 3v2a3 3 0 01-3-3v-2a3 3 0 013-3V5a3 3 0 013 3v2z" />
                                    <path d="M7 3v3m0 0a2 2 0 100 4m0-4a2 2 0 110 4m0 0v11" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                <span className="text-[8.5px] font-bold text-[#1A7785] uppercase tracking-tighter">Taken with Food</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#F4F9F9] border border-transparent transition-all">
                                <svg className="w-5 h-5 mb-1.5 text-[#627382]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-[8.5px] font-bold text-[#627382] uppercase tracking-tighter">Taken Solo</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FFF5F5] border border-[#E85B5A]/40 transition-all shadow-sm shadow-red-100">
                                <svg className="w-5 h-5 mb-1.5 text-[#E85B5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-[8.5px] font-bold text-[#E85B5A] uppercase tracking-tighter">Missed</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#F4F9F9] border border-transparent transition-all">
                                <svg className="w-5 h-5 mb-1.5 text-[#627382]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-[8.5px] font-bold text-[#627382] uppercase tracking-tighter">Delayed</span>
                            </button>
                        </div>
                    </div>

                    {/* Lisinopril Section */}
                    <div className="mb-5">
                        <div className="flex items-center gap-2.5 mb-2.5">
                            <div className="w-9 h-9 rounded-full bg-[#E0F2F2] flex items-center justify-center text-[#1A7785]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13V6a2 2 0 00-2-2H5a2 2 0 00-2 2v7m18 0v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5m18 0h-3.586a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 0014.586 11H9.414a1 1 0 00-.707.293L7.293 12.707A1 1 0 016.586 13H3" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-[15px] font-bold text-[#0D1C2E]">Lisinopril</h4>
                                <p className="text-[11px] text-[#627382] font-medium">10mg • Oral Tablet • Evening Dose</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#F4F9F9] border border-transparent transition-all">
                                <svg className="w-5 h-5 mb-1.5 text-[#627382]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-[8.5px] font-bold text-[#627382] uppercase tracking-tighter">Taken</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#C52B2B] text-white shadow-lg shadow-red-200 transition-all">
                                <svg className="w-5 h-5 mb-1.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-[8.5px] font-bold uppercase tracking-tighter">Missed</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#F4F9F9] border border-transparent transition-all">
                                <svg className="w-5 h-5 mb-1.5 text-[#627382]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-[8.5px] font-bold text-[#627382] uppercase tracking-tighter">Yesterday</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#F4F9F9] border border-transparent transition-all">
                                <svg className="w-5 h-5 mb-1.5 text-[#627382]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-[8.5px] font-bold text-[#627382] uppercase tracking-tighter">Other</span>
                            </button>
                        </div>
                    </div>

                    {/* Clinical Observations */}
                    <div className="mt-3">
                        <h4 className="text-[14px] font-bold text-[#0D1C2E] mb-2 flex items-center gap-2">
                            Clinical Observations <span className="text-[10px] font-normal text-[#627382] uppercase tracking-wider">(Optional)</span>
                        </h4>
                        <textarea 
                            className="w-full bg-[#EAEFF2]/50 border border-transparent focus:border-[#1A7785]/30 rounded-2xl p-3 text-[12.5px] text-[#0D1C2E] placeholder-[#627382]/60 outline-none transition-all resize-none h-[80px]"
                            placeholder="Note any side effects (e.g., nausea, dizziness) or clinical notes..."
                        ></textarea>
                        
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {['Nausea', 'Headache', 'Fatigue'].map(tag => (
                                <button key={tag} className="px-3 py-1 rounded-full bg-[#F4F9F9] border border-[#EAEFF2] text-[10px] font-bold text-[#627382] hover:bg-[#1A7785] hover:text-white hover:border-[#1A7785] transition-all">
                                    {tag}
                                </button>
                            ))}
                            <button className="px-3 py-1 rounded-full bg-white border border-dashed border-[#EAEFF2] text-[10px] font-bold text-[#1A7785] hover:border-[#1A7785] transition-all">
                                + Add Symptom
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="px-5 py-4 bg-[#F4F9F9]/50 border-t border-white flex gap-3">
                    <button 
                        onClick={onClose}
                        className="flex-1 px-4 py-3 rounded-full border-2 border-[#EAEFF2] text-[#1A7785] font-bold text-[13px] hover:bg-white transition-all"
                    >
                        Discard
                    </button>
                    <button 
                        onClick={handleFinalize}
                        className="flex-2 px-8 py-3 rounded-full bg-[#1A7785] text-white font-bold text-[13px] shadow-lg shadow-[#1A7785]/20 hover:bg-[#125863] transition-all flex items-center justify-center gap-2"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                        Finalize Log
                    </button>
                </div>

            </div>

            {/* Success Popup */}
            {isSuccessOpen && <Logs onClose={() => setIsSuccessOpen(false)} onViewHistory={() => setIsHistoryOpen(true)} />}

            {/* History Popup */}
            {isHistoryOpen && <History onClose={() => setIsHistoryOpen(false)} />}
        </div>
    );
};

export default Update_logs;
