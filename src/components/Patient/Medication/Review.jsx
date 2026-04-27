import React, { useState } from 'react';
import Session from './Session';

const Review = ({ onClose }) => {
    const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
    const [selectedDate, setSelectedDate] = useState(6);
    const [isSessionOpen, setIsSessionOpen] = useState(false);

    return (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-white/5 backdrop-blur-xl transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-[850px] bg-white rounded-[32px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-300 flex flex-col md:flex-row min-h-[440px]">

                {/* Left Panel: Information */}
                <div className="w-full md:w-[300px] bg-gradient-to-br from-[#0B1F4D] via-[#1a6e78] to-[#49AAB3] p-6 flex flex-col justify-between shrink-0">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 mb-5">
                            <div className="w-2 h-2 bg-[#6ED4D4] rounded-full animate-pulse shadow-[0_0_8px_#6ED4D4]"></div>
                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Secure 1:1 Session</span>
                        </div>
                        <h2 className="text-[28px] font-bold text-white leading-tight mb-3">Schedule Care Review</h2>
                        <p className="text-white/70 text-[13px] leading-relaxed font-medium mb-6">
                            Initialize a deep-dive logistical planning session with your dedicated practitioner. We will review clinical progress and calibrate upcoming milestones.
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Duration</p>
                                <p className="text-[15px] font-bold text-white">45 Minutes</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Format</p>
                                <p className="text-[15px] font-bold text-white">HD Virtual Sanctuary</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Calendar & Slots */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Calendar Mockup */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-5 px-1">
                                <h3 className="text-[17px] font-bold text-[#0D1C2E]">October 2023</h3>
                                <div className="flex gap-2">
                                    <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
                                    </button>
                                    <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-7 gap-y-3.5 text-center">
                                {['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].map(day => (
                                    <span key={day} className="text-[10px] font-bold text-gray-300 uppercase">{day}</span>
                                ))}
                                {[28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((date, i) => (
                                    <div
                                        key={i}
                                        onClick={() => date > 0 && setSelectedDate(date)}
                                        className={`w-9 h-9 flex items-center justify-center mx-auto rounded-full cursor-pointer transition-all text-[13px] font-bold ${date < 1 ? 'text-gray-100 cursor-default' :
                                                selectedDate === date ? 'bg-[#1A7785] text-white shadow-lg' : 'text-[#0D1C2E] hover:bg-gray-50'
                                            }`}
                                    >
                                        {date > 0 ? date : ''}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Slots */}
                        <div className="w-full lg:w-[240px]">
                            <h3 className="text-[16px] font-bold text-[#0D1C2E] mb-5">Available Slots</h3>
                            <div className="space-y-2.5">
                                {[
                                    { time: '09:00 AM — 09:45 AM', reserved: false },
                                    { time: '10:30 AM — 11:15 AM', reserved: false },
                                    { time: '02:15 PM — 03:00 PM', reserved: false },
                                    { time: '04:00 PM — 04:45 PM', reserved: true }
                                ].map((slot, i) => (
                                    <div
                                        key={i}
                                        onClick={() => !slot.reserved && setSelectedSlot(slot.time)}
                                        className={`p-3.5 rounded-[18px] border-2 transition-all relative cursor-pointer ${slot.reserved ? 'bg-gray-50 border-transparent opacity-50 cursor-not-allowed' :
                                                selectedSlot === slot.time ? 'bg-white border-[#1A7785] shadow-md' : 'bg-white border-gray-50 hover:border-gray-100'
                                            }`}
                                    >
                                        <p className={`text-[12px] font-bold ${selectedSlot === slot.time ? 'text-[#1A7785]' : 'text-[#0D1C2E]'}`}>{slot.time}</p>
                                        {slot.reserved && <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter absolute bottom-1 right-3">Reserved</span>}
                                        {selectedSlot === slot.time && !slot.reserved && (
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#1A7785] rounded-full flex items-center justify-center">
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
                        <button
                            onClick={onClose}
                            className="flex items-center gap-2 text-[12px] font-bold text-[#627382] uppercase tracking-wider hover:text-[#0D1C2E] transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                            Dismiss
                        </button>
                        <button
                            onClick={() => setIsSessionOpen(true)}
                            className="h-[52px] px-8 rounded-full bg-gradient-to-r from-[#0B1F4D] to-[#1A7785] text-white font-bold text-[15px] flex items-center gap-3 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            Schedule Session
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            {isSessionOpen && <Session 
                date={selectedDate}
                time={selectedSlot}
                onClose={() => {
                    setIsSessionOpen(false);
                    onClose();
                }} 
            />}
        </div>
    );
};

export default Review;
