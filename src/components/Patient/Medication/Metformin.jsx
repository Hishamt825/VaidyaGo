import React from 'react';
import phImg from '../../../assets/ph.png';

const Metformin = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[300]">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" 
                onClick={onClose}
            ></div>
            
            {/* Modal Container */}
            <div className="bg-white rounded-[40px] w-full max-w-[420px] overflow-hidden shadow-2xl relative z-10 animate-in fade-in zoom-in duration-300">
                
                {/* Header */}
                <div className="p-8 pb-4 flex justify-between items-start">
                    <div>
                        <span className="text-[10px] font-black text-[#1A7785] uppercase tracking-[0.25em] mb-1 block">Daily Routine</span>
                        <h2 className="text-[28px] font-[900] text-[#0D1C2E]">Morning Schedule</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-[#627382] hover:bg-gray-100 rounded-full transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="px-8 space-y-4">
                    {/* Profile Section */}
                    <div className="bg-[#EAEFF2]/50 rounded-[24px] p-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                            <img src={phImg} alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-[15px] font-bold text-[#0D1C2E]">Alex Rivera</h3>
                            <p className="text-[11px] text-[#627382] font-medium">Tuesday, Oct 24 • 08:30 AM</p>
                        </div>
                    </div>

                    {/* Medication List */}
                    <div className="space-y-3">
                        {/* Metformin Card */}
                        <div className="bg-[#EAEFF2]/50 rounded-[24px] p-5 flex items-center justify-between border border-white">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1A7785] shadow-sm">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 9a1 1 0 112 0v2a1 1 0 11-2 0V9zm5-1a1 1 0 112 0v4a1 1 0 11-2 0V8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-[16px] font-bold text-[#0D1C2E]">Metformin</h4>
                                    <p className="text-[12px] text-[#627382] font-medium mb-2">500mg • With food</p>
                                    <span className="bg-[#B7E7E8] text-[#1A7785] px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">
                                        Taken <span className="ml-1 opacity-70">8:15 AM</span>
                                    </span>
                                </div>
                            </div>
                            <div className="w-6 h-6 rounded-full border-2 border-[#1A7785] flex items-center justify-center text-[#1A7785]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>

                        {/* Omega-3 Card */}
                        <div className="bg-[#EAEFF2]/50 rounded-[24px] p-5 flex items-center justify-between border border-white opacity-80 hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#627382] shadow-sm">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 9a1 1 0 112 0v2a1 1 0 11-2 0V9zm5-1a1 1 0 112 0v4a1 1 0 11-2 0V8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-[16px] font-bold text-[#0D1C2E]">Omega-3</h4>
                                    <p className="text-[12px] text-[#627382] font-medium mb-2">1000mg • Daily Supplement</p>
                                    <span className="bg-[#FFE5E5] text-[#E85B5A] px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">
                                        Rescheduled <span className="ml-1 opacity-70">Was 7:00 PM</span>
                                    </span>
                                </div>
                            </div>
                            <div className="w-6 h-6 rounded-full border-2 border-gray-200" />
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-8 pt-6 space-y-3">
                    <button className="w-full bg-gradient-to-r from-[#0D3442] to-[#1A7785] text-white py-4 rounded-full font-bold text-[16px] shadow-lg shadow-[#1A7785]/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        Mark All Taken
                    </button>
                    <button className="w-full bg-white border-2 border-gray-100 py-4 rounded-full text-[16px] font-bold text-[#0D1C2E] hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add More
                    </button>
                </div>

                {/* Bottom Status */}
                <div className="bg-[#F8FAFB] py-4 text-center border-t border-gray-50">
                    <p className="text-[10px] text-[#627382] font-medium flex items-center justify-center gap-1.5 uppercase tracking-widest opacity-60">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Schedule synced with pharmacy records
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Metformin;
