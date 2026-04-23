import React from 'react';

const History = ({ onClose }) => {
    const historyData = [
        { name: 'Lisinopril 10mg', date: 'Today', time: '08:00 AM', status: 'TAKEN', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
        { name: 'Amoxicillin 500mg', date: 'Yesterday', time: '09:15 PM', status: 'TAKEN', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
        { name: 'Multi-Vitamin', date: 'Yesterday', time: '08:05 AM', status: 'TAKEN', icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z' }
    ];

    return (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 animate-in fade-in duration-300">
            {/* Backdrop with intense blur */}
            <div 
                className="absolute inset-0 bg-[#0D1C2E]/60 backdrop-blur-md"
                onClick={onClose}
            />

            {/* History Modal Container */}
            <div className="relative w-full max-w-[550px] bg-white rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                
                {/* Header */}
                <div className="px-8 pt-8 pb-6 border-b border-slate-50 relative">
                    <button 
                        onClick={onClose}
                        className="absolute top-8 right-8 text-[#627382] hover:text-[#0D1C2E] transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-[22px] font-bold text-[#0D1C2E] tracking-tight">Medication History</h2>
                    <p className="text-[#627382] text-[13px] font-medium uppercase tracking-wider opacity-70">Patient: Alex Rivera</p>
                </div>

                {/* List Body */}
                <div className="p-8 space-y-4 overflow-y-auto max-h-[55vh]" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
                    <style>{`.overflow-y-auto::-webkit-scrollbar { display: none; }`}</style>
                    {historyData.map((item, i) => (
                        <div key={i} className="bg-[#F4F9F9] rounded-2xl p-5 flex items-center justify-between group hover:bg-[#EBF5F6] transition-all border border-transparent hover:border-[#1A7785]/10 shadow-sm hover:shadow-md">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#1A7785] shadow-sm shrink-0 border border-slate-50">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-[17px] font-bold text-[#0D1C2E] mb-1.5">{item.name}</h4>
                                    <div className="flex items-center gap-4 text-[12px] text-[#627382] font-semibold">
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            {item.date}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            {item.time}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#0D1C2E] text-white px-4 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-2 shadow-lg shadow-[#0D1C2E]/20 uppercase tracking-widest">
                                <div className="w-3 h-3 rounded-full bg-[#6ED4D4] flex items-center justify-center text-[#0D1C2E]">
                                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                {item.status}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Actions */}
                <div className="p-8 pt-4 flex items-center justify-end gap-10">
                    <button 
                        onClick={onClose}
                        className="text-[13px] font-black text-[#627382] hover:text-[#0D1C2E] uppercase tracking-widest transition-colors"
                    >
                        Close
                    </button>
                    <button className="bg-gradient-to-r from-[#0D1C2E] to-[#1A7785] text-white px-7 py-3 rounded-full font-bold text-[14px] shadow-xl shadow-[#1A7785]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1.051.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default History;
