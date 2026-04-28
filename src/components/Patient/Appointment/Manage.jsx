import React, { useState, useRef } from 'react';
import { X, Calendar, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Booking from './Booking';

const Manage = ({ onClose }) => {
    const [selectedDate, setSelectedDate] = useState('24');
    const [selectedSlot, setSelectedSlot] = useState('11:15 AM');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 150;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const dates = [
        { day: 'MON', date: '23' },
        { day: 'TUE', date: '24' },
        { day: 'WED', date: '25' },
        { day: 'THU', date: '26' },
        { day: 'FRI', date: '27' },
        { day: 'SAT', date: '28' },
        { day: 'SUN', date: '29' },
        { day: 'MON', date: '30' },
        { day: 'TUE', date: '31' },
    ];

    const slots = [
        '09:00 AM', '10:30 AM', '11:15 AM',
        '02:00 PM', '03:30 PM', '04:45 PM'
    ];

    if (isConfirmed) {
        return <Booking onClose={onClose} onReturn={onClose} />;
    }

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            {/* Backdrop Blur - The parent should already be blurred via Appointment.jsx state, 
                but we add a semi-transparent overlay here for contrast */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" onClick={onClose}></div>

            {/* Modal Container */}
            <div className="relative w-full max-w-[500px] bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="px-8 pt-8 pb-6 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-gray-300 shadow-sm">
                            <img 
                                src="https://i.pravatar.cc/150?u=elena" 
                                alt="Dr. Elena" 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-[#22C55E] border-2 border-white rounded-full shadow-sm"></div>
                        </div>
                        <div>
                            <h2 className="text-[22px] font-[900] text-[#0D1C2E] leading-tight">Reschedule Session</h2>
                            <p className="text-[#1A7785] font-semibold text-[15px] mt-0.5">Dr. Elena Sterling</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Current Appointment Banner */}
                <div className="mx-8 mb-8 bg-[#F8FCFD] border border-[#E9F3F5] rounded-[24px] p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#1A7785]">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Current Appointment</p>
                        <p className="text-[16px] font-bold text-[#0D1C2E]">Oct 24, 2023 • 10:30 AM</p>
                    </div>
                </div>

                <div className="px-8 pb-8 space-y-8">
                    {/* Select Date */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[13px] font-[900] text-[#0D1C2E] uppercase tracking-[0.2em]">Select Date</h3>
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => scroll('left')}
                                    className="text-gray-300 hover:text-[#1A7785] transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button 
                                    onClick={() => scroll('right')}
                                    className="text-gray-300 hover:text-[#1A7785] transition-colors"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                        <div 
                            ref={scrollRef}
                            className="flex items-center overflow-x-auto no-scrollbar gap-2 scroll-smooth"
                        >
                            {dates.map((d) => (
                                <button
                                    key={`${d.date}-${d.day}`}
                                    onClick={() => setSelectedDate(d.date)}
                                    className={`
                                        flex flex-col items-center justify-center min-w-[62px] h-[76px] rounded-2xl transition-all shrink-0
                                        ${selectedDate === d.date 
                                            ? 'bg-[#1A7785] text-white shadow-lg shadow-[#1A7785]/30' 
                                            : 'bg-[#F8F9FA] text-[#0D1C2E] hover:bg-gray-100'
                                        }
                                    `}
                                >
                                    <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${selectedDate === d.date ? 'text-white/70' : 'text-gray-400'}`}>{d.day}</span>
                                    <span className="text-[18px] font-bold">{d.date}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Available Slots */}
                    <div>
                        <h3 className="text-[13px] font-[900] text-[#0D1C2E] uppercase tracking-[0.2em] mb-4">Available Slots</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {slots.map((slot) => (
                                <button
                                    key={slot}
                                    onClick={() => setSelectedSlot(slot)}
                                    className={`
                                        py-3.5 rounded-2xl text-[14px] font-bold transition-all border-2
                                        ${selectedSlot === slot 
                                            ? 'bg-[#EBF7F8] border-[#1A7785] text-[#1A7785]' 
                                            : 'bg-white border-gray-300 text-[#0D1C2E] hover:border-gray-200'
                                        }
                                    `}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4">
                        <button 
                            onClick={onClose}
                            className="text-[16px] font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest px-4"
                        >
                            Back
                        </button>
                        <button 
                            onClick={() => setIsConfirmed(true)}
                            className="bg-gradient-to-r from-[#1A7785] to-[#49AAB3] text-white px-8 py-4 rounded-2xl font-bold text-[16px] shadow-xl shadow-[#1A7785]/20 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group"
                        >
                            Confirm Reschedule <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Manage;
