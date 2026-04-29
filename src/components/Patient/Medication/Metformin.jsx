import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import phImg from '../../../assets/ph.png';
import Met_task from './Met_task';

const Metformin = ({ onClose, type = "Morning" }) => {
    const [isMetTaskOpen, setIsMetTaskOpen] = useState(false);

    return (
        <>
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[300]">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#0D1C2E]/40 backdrop-blur-md transition-none" 
                onClick={onClose}
            ></div>
            
            {/* Modal Container */}
            <div className="bg-white rounded-[32px] w-full max-w-[400px] overflow-hidden shadow-2xl relative z-10 flex flex-col animate-in fade-in zoom-in duration-200">
                
                {/* Header */}
                <div className="p-6 pb-3 flex justify-between items-start">
                    <div>
                        <span className="text-[9px] font-black text-[#1A7785] uppercase tracking-[0.25em] mb-0.5 block opacity-50">Daily Routine</span>
                        <h2 className="text-[24px] font-black text-[#0D1C2E] tracking-tight">{type} Schedule</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-1.5 text-[#627382] hover:bg-gray-100 rounded-full transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="px-6 space-y-3 flex-1">
                    {/* Profile Section */}
                    <div className="bg-[#EAEFF2]/50 rounded-[20px] p-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-white shadow-sm shrink-0">
                            <img src={phImg} alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-[14px] font-black text-[#0D1C2E]">Alex Rivera</h3>
                            <p className="text-[10px] text-[#627382] font-bold opacity-50">Tuesday, Oct 24 • 08:30 AM</p>
                        </div>
                    </div>

                    {/* Medication List */}
                    <div className="space-y-2">
                        {/* Metformin Card */}
                        <div className="bg-[#EAEFF2]/50 rounded-[20px] p-4 flex items-center justify-between border border-white relative overflow-hidden group">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#1A7785] shadow-sm shrink-0">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 9a1 1 0 112 0v2a1 1 0 11-2 0V9zm5-1a1 1 0 112 0v4a1 1 0 11-2 0V8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-[15px] font-black text-[#0D1C2E]">Metformin</h4>
                                    <p className="text-[11px] text-[#627382] font-bold opacity-50 mb-1">500mg • With food</p>
                                    <span className="bg-[#B7E7E8] text-[#1A7785] px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider">
                                        Taken <span className="ml-0.5 opacity-60">8:15 AM</span>
                                    </span>
                                </div>
                            </div>
                            <div className="w-5 h-5 rounded-full border-2 border-[#1A7785] flex items-center justify-center text-[#1A7785] shrink-0">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>

                        {/* Omega-3 Card */}
                        <div className="bg-[#EAEFF2]/50 rounded-[20px] p-4 flex items-center justify-between border border-white opacity-60 hover:opacity-100 transition-all group cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#627382] shadow-sm shrink-0">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 9a1 1 0 112 0v2a1 1 0 11-2 0V9zm5-1a1 1 0 112 0v4a1 1 0 11-2 0V8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-[15px] font-black text-[#0D1C2E]">Omega-3</h4>
                                    <p className="text-[11px] text-[#627382] font-bold opacity-50 mb-1">1000mg • Supplement</p>
                                    <span className="bg-[#FFE5E5] text-[#E85B5A] px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider">
                                        Rescheduled <span className="ml-0.5 opacity-60">Was 7 PM</span>
                                    </span>
                                </div>
                            </div>
                            <div className="w-5 h-5 rounded-full border-2 border-gray-200 shrink-0" />
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-6 pt-5 space-y-3">
                    <button className="w-full bg-gradient-to-r from-[#0D3442] to-[#1A7785] text-white py-4 rounded-[18px] font-black text-[15px] shadow-lg shadow-[#1A7785]/10 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                        Mark All Taken
                    </button>
                    <button 
                        onClick={() => setIsMetTaskOpen(true)}
                        className="w-full bg-white border border-gray-100 py-4 rounded-[18px] text-[15px] font-black text-[#0D1C2E] hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                    >
                        <Plus size={18} strokeWidth={3} />
                        Add More
                    </button>
                </div>

                {/* Bottom Status */}
                <div className="bg-[#F8FAFB] py-3 text-center border-t border-gray-50">
                    <p className="text-[9px] text-[#627382] font-black flex items-center justify-center gap-2 uppercase tracking-[0.15em] opacity-30">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Schedule synced with pharmacy
                    </p>
                </div>
            </div>
        </div>
        {isMetTaskOpen && <Met_task isOpen={isMetTaskOpen} onClose={() => setIsMetTaskOpen(false)} />}
        </>
    );
};


export default Metformin;
