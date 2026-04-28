import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Check, Calendar, Clock, Info } from 'lucide-react';

const Booking = ({ onClose, onReturn }) => {
    const navigate = useNavigate();
    return (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[4px]" onClick={onClose}></div>

            {/* Modal Container */}
            <div className="relative w-full max-w-[420px] bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 p-6 flex flex-col items-center text-center">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                >
                    <X size={18} />
                </button>

                {/* Success Icon */}
                <div className="w-16 h-16 bg-[#E6F8F9] rounded-full flex items-center justify-center mb-4 mt-2">
                    <div className="w-11 h-11 bg-[#1A7785] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#1A7785]/30">
                        <Check size={22} strokeWidth={3} />
                    </div>
                </div>

                {/* Title & Subtitle */}
                <h2 className="text-[24px] font-[900] text-[#0D1C2E] mb-1">Booking Confirmed!</h2>
                <p className="text-gray-500 text-[14px] max-w-[280px] leading-snug mb-6">
                    Alex Rivera, your session has been secured in our system.
                </p>

                {/* Details Card */}
                <div className="w-full bg-[#F5F9FA] rounded-[24px] p-4 mb-4 text-left border border-gray-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                            <img 
                                src="https://i.pravatar.cc/150?u=elena" 
                                alt="Dr. Elena" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-[#1A7785] uppercase tracking-[0.2em] mb-0.5">Specialist</p>
                            <h3 className="text-[16px] font-[900] text-[#0D1C2E]">Dr. Elena Sterling</h3>
                        </div>
                    </div>

                    <div className="space-y-2.5 pt-3 border-t border-gray-200/50">
                        <div className="flex items-center gap-2.5 text-[#0D1C2E] font-bold text-[13px]">
                            <Calendar size={16} className="text-[#1A7785]" />
                            Monday, Oct 23, 2023
                        </div>
                        <div className="flex items-center gap-2.5 text-[#0D1C2E] font-bold text-[13px]">
                            <Clock size={16} className="text-[#1A7785]" />
                            02:00 PM (EDT)
                        </div>
                    </div>
                </div>

                {/* Notification Banner */}
                <div className="flex items-center gap-2.5 bg-gray-50 px-3.5 py-2.5 rounded-xl mb-6 w-full">
                    <Info size={14} className="text-gray-400 shrink-0" />
                    <p className="text-[11px] text-gray-500 font-medium text-left">
                        A confirmation email has been sent to you.
                    </p>
                </div>

                {/* Actions */}
                <div className="w-full space-y-3">
                    <button 
                        onClick={() => navigate('/Clinic')}
                        className="w-full bg-gradient-to-r from-[#0B1F4D] to-[#1A7785] text-white py-3.5 rounded-xl font-bold text-[15px] shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all"
                    >
                        View in My Schedule
                    </button>
                    <button 
                        onClick={onReturn}
                        className="w-full py-1.5 text-[#1A7785] font-bold text-[14px] hover:underline"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Booking;
