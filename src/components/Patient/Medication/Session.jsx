import React, { useState } from 'react';
import Calender from './Calender';

const Session = ({ onClose, date, time }) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    return (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-white/5 backdrop-blur-xl transition-opacity duration-300" 
                onClick={onClose}
            />
            
            {/* Modal Container */}
            <div className="relative w-full max-w-[420px] bg-white rounded-[32px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-300 flex flex-col">
                
                {/* Header with Gradient & Icon */}
                <div className="relative h-[110px] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4D] via-[#1a6e78] to-[#49AAB3]"></div>
                    {/* Abstract Heartbeat Pattern */}
                    <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                        <svg className="w-full h-20" viewBox="0 0 200 40">
                            <path d="M0 20 L40 20 L45 10 L50 30 L55 20 L80 20 L85 0 L90 40 L95 20 L120 20" fill="none" stroke="white" strokeWidth="2" />
                        </svg>
                    </div>
                    
                    <div className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl scale-110">
                        <div className="w-12 h-12 bg-[#1A7785] rounded-full flex items-center justify-center text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="p-5 pt-6 text-center">
                    <h2 className="text-[22px] font-bold text-[#0D1C2E] mb-1.5 leading-tight">Session Scheduled Successfully!</h2>
                    <p className="text-[#627382] text-[12px] font-medium mb-5">Your clinical sanctuary is prepared for your visit.</p>

                    {/* Details Box */}
                    <div className="bg-[#F8FAFB] rounded-[22px] p-4 text-left space-y-4 mb-5 border border-gray-50">
                        <div className="flex items-start gap-4 hover:bg-white p-2.5 -m-2.5 rounded-[18px] cursor-pointer transition-all border border-transparent hover:border-gray-100 hover:shadow-sm group">
                            <div className="w-9 h-9 rounded-xl bg-[#EBF5F5] group-hover:bg-[#1A7785] flex items-center justify-center text-[#1A7785] group-hover:text-white shrink-0 transition-colors">
                                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-[#627382] uppercase tracking-wider mb-0.5">Date & Time</p>
                                <p className="text-[15px] font-bold text-[#0D1C2E]">October {date || '6'}, 2023</p>
                                <p className="text-[12px] text-[#1A7785] font-bold">{time || '10:30 AM — 11:15 AM'} (EST)</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 hover:bg-white p-2.5 -m-2.5 rounded-[18px] cursor-pointer transition-all border border-transparent hover:border-gray-100 hover:shadow-sm group">
                            <div className="w-9 h-9 rounded-xl bg-[#EBF5F5] group-hover:bg-[#1A7785] flex items-center justify-center text-[#1A7785] group-hover:text-white shrink-0 transition-colors">
                                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-[#627382] uppercase tracking-wider mb-0.5">Format</p>
                                <p className="text-[15px] font-bold text-[#0D1C2E]">HD Virtual Sanctuary</p>
                                <p className="text-[12px] text-[#627382] font-medium opacity-60">Secure encrypted end-to-end</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2.5">
                        <button 
                            onClick={onClose}
                            className="w-full h-[48px] rounded-full bg-[#1A7785] hover:bg-[#125863] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-xl shadow-[#1A7785]/20 transition-all"
                        >
                            View Dashboard
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                        <button 
                            onClick={() => setIsCalendarOpen(true)}
                            className="w-full h-[48px] rounded-full bg-white border-2 border-gray-50 text-[#0D1C2E] font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
                        >
                            <svg className="w-4 h-4 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Add to Calendar
                        </button>
                    </div>
                </div>
            </div>
            {isCalendarOpen && <Calender onClose={() => setIsCalendarOpen(false)} />}
        </div>
    );
};

export default Session;
