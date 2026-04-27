import React, { useState } from 'react';

const Request = ({ onClose }) => {
    const [selectedTime, setSelectedTime] = useState('asap');

    return (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#0D1C2E]/60 backdrop-blur-md transition-opacity duration-300" 
                onClick={onClose}
            />
            
            {/* Modal Container */}
            <div className="relative w-full max-w-[440px] bg-white rounded-[32px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-300 flex flex-col">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-[#0D1C2E] transition-all z-20 group"
                >
                    <svg className="w-4 h-4 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-5">
                    {/* Header */}
                    <div className="mb-4">
                        <h2 className="text-[22px] font-bold text-[#0B1F4D] leading-tight mb-0.5">Request a Callback</h2>
                        <p className="text-[#627382] text-[12px] font-medium">Our concierge team will reach out to assist you.</p>
                    </div>

                    {/* Requested For Info */}
                    <div className="bg-[#F0F7F7] rounded-[16px] p-2.5 flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1A7785] shadow-sm">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-[#1A7785] uppercase tracking-wider mb-0.5">Requested For</p>
                            <p className="text-[16px] font-bold text-[#0D1C2E]">Alex Rivera</p>
                        </div>
                    </div>

                    {/* Phone Number Section */}
                    <div className="mb-4">
                        <p className="text-[10px] font-bold text-[#627382] uppercase tracking-[0.15em] mb-2">Confirm Phone Number</p>
                        <div className="bg-[#E9F0F2] rounded-[16px] p-3 flex items-center gap-3">
                            <svg className="w-5 h-5 text-[#627382]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="text-[15px] font-bold text-[#0D1C2E]">+1 (555) 012-3456</span>
                        </div>
                    </div>

                    {/* Preferred Time Slots */}
                    <div className="mb-5">
                        <p className="text-[10px] font-bold text-[#627382] uppercase tracking-[0.15em] mb-2.5">Preferred Callback Time</p>
                        <div className="space-y-2">
                            {[
                                { id: 'asap', title: 'As soon as possible', detail: 'Expected wait time: ~5 mins' },
                                { id: 'next30', title: 'Next 30 mins', detail: 'Scheduled window: 2:15 PM - 2:45 PM' },
                                { id: 'after2', title: 'After 2 PM', detail: 'Our team will call you after your meeting' }
                            ].map((slot) => (
                                <div 
                                    key={slot.id}
                                    onClick={() => setSelectedTime(slot.id)}
                                    className={`relative p-3 rounded-[18px] cursor-pointer transition-all border-2 ${
                                        selectedTime === slot.id 
                                        ? 'bg-white border-[#1A7785] shadow-lg' 
                                        : 'bg-[#F4F9F9] border-transparent hover:bg-[#EBF5F5]'
                                    }`}
                                >
                                    <h4 className="text-[14px] font-bold text-[#0D1C2E] mb-0.5">{slot.title}</h4>
                                    <p className="text-[11px] text-[#627382] font-medium">{slot.detail}</p>
                                    
                                    {selectedTime === slot.id && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#1A7785] rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Confirm Button */}
                    <button 
                        onClick={onClose}
                        className="w-full h-[50px] rounded-[20px] bg-gradient-to-r from-[#0B1F4D] to-[#1A7785] text-white font-bold text-[14px] flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all mb-4"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Confirm Request
                    </button>

                    {/* Footer Disclaimer */}
                    <p className="text-center text-[9px] font-bold uppercase tracking-[0.15em] text-[#627382] opacity-60">
                        Standard call rates may apply • Encrypted clinically-secure line
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Request;
