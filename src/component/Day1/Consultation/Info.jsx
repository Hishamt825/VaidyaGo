import React, { useState } from 'react';
import { X, ArrowLeft, ChevronLeft, ChevronRight, Sun, Sunrise, Moon } from 'lucide-react';
import pen1 from '../../../assets/pen1.png';

const Info = ({ onClose, doctor }) => {
    const [activeTab, setActiveTab] = useState('Hospital Visit');
    const [selectedDate, setSelectedDate] = useState(1);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const dates = [
        { id: 1, day: 'SUN', date: '12', month: 'Apr' },
        { id: 2, day: 'MON', date: '13', month: 'Apr' },
        { id: 3, day: 'TUE', date: '14', month: 'Apr' },
        { id: 4, day: 'WED', date: '15', month: 'Apr' },
        { id: 5, day: 'THU', date: '16', month: 'Apr' },
        { id: 6, day: 'FRI', date: '17', month: 'Apr' },
        { id: 7, day: 'SAT', date: '18', month: 'Apr' },
    ];

    const slots = {
        morning: ['09:00 AM', '09:10 AM', '09:20 AM', '09:30 AM', '09:40 AM', '09:50 AM', '10:00 AM', '10:10 AM', '10:20 AM'],
        afternoon: ['03:30 AM', '03:40 AM', '03:50 AM'],
        evening: ['03:30 AM', '03:30 AM', '03:30 AM', '03:30 AM', '03:30 AM', '03:30 AM']
    };

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" onClick={onClose} />

            {/* Slide-over Content */}
            <div className="relative w-full max-w-[420px] h-full shadow-2xl flex flex-col overflow-hidden animate-slide-in"
                 style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>
                
                {/* Header */}
                <div className="px-6 py-5 flex items-center gap-4 text-white shrink-0">
                    <button onClick={onClose} className="hover:bg-white/10 p-1.5 rounded-full transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                    <h2 className="text-[20px] font-bold">Schedule Appointment</h2>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-24 space-y-8">
                    
                    {/* Doctor Mini Profile */}
                    <div className="flex items-center gap-4 py-2">
                        <div className="w-[64px] h-[64px] rounded-xl overflow-hidden border border-white/20">
                            <img src={pen1} alt="Doctor" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-bold text-[17px] leading-tight">{doctor?.name || 'Dr. Sumaiya Javed'}</h3>
                            <p className="text-white/60 text-[13px] font-medium mb-1">10 years</p>
                            <button className="text-[#6ED4D4] text-[13px] font-bold hover:underline">View Profile</button>
                        </div>
                    </div>

                    {/* Tab Switcher */}
                    <div className="bg-white/5 p-1 rounded-xl flex border border-white/10">
                        <button 
                            onClick={() => setActiveTab('Online Consult')}
                            className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-all ${activeTab === 'Online Consult' ? 'bg-[#1A7785] text-white shadow-lg' : 'text-white/60 hover:text-white'}`}
                        >
                            Online Consult
                        </button>
                        <button 
                            onClick={() => setActiveTab('Hospital Visit')}
                            className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-all ${activeTab === 'Hospital Visit' ? 'bg-[#1A7785] text-white shadow-lg' : 'text-white/60 hover:text-white'}`}
                        >
                            Hospital Visit
                        </button>
                    </div>

                    {/* Date Selector */}
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <button className="text-white/40 hover:text-white"><ChevronLeft size={18} /></button>
                            <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
                                {dates.map(d => (
                                    <div 
                                        key={d.id}
                                        onClick={() => setSelectedDate(d.id)}
                                        className={`min-w-[54px] p-2.5 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-all ${selectedDate === d.id ? 'bg-white border-white scale-105 shadow-xl' : 'border-white/10 hover:border-white/30'}`}
                                    >
                                        <span className={`text-[11px] font-bold ${selectedDate === d.id ? 'text-[#0B1F4D]/60' : 'text-white/40'}`}>{d.day}</span>
                                        <span className={`text-[16px] font-black leading-none ${selectedDate === d.id ? 'text-[#0B1F4D]' : 'text-white'}`}>{d.date}</span>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedDate === d.id ? 'text-[#0B1F4D]/60' : 'text-white/40'}`}>{d.month}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="text-white/40 hover:text-white"><ChevronRight size={18} /></button>
                        </div>
                    </div>

                    {/* Slots Sections */}
                    <div className="space-y-8">
                        {/* Morning */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-white/40">
                                <div className="flex items-center gap-2">
                                    <Sunrise size={20} className="text-[#6ED4D4]" />
                                    <span className="text-[14px] font-bold">Morning</span>
                                </div>
                                <span className="text-[12px] font-medium">{slots.morning.length} Slots</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {slots.morning.map((time, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => setSelectedSlot(time)}
                                        className={`py-2.5 rounded-lg border font-bold text-[13px] transition-all ${selectedSlot === time ? 'bg-white border-white text-[#0B1F4D] scale-95 shadow-inner' : 'border-white/20 text-white hover:border-white/50 bg-white/5'}`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Afternoon */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-white/40">
                                <div className="flex items-center gap-2">
                                    <Sun size={20} className="text-[#FBBF24]" />
                                    <span className="text-[14px] font-bold">Afternoon</span>
                                </div>
                                <span className="text-[12px] font-medium">{slots.afternoon.length} Slots</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {slots.afternoon.map((time, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => setSelectedSlot(time)}
                                        className={`py-2.5 rounded-lg border font-bold text-[13px] transition-all ${selectedSlot === time ? 'bg-white border-white text-[#0B1F4D] scale-95 shadow-inner' : 'border-white/20 text-white hover:border-white/50 bg-white/5'}`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Evening */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-white/40">
                                <div className="flex items-center gap-2">
                                    <Moon size={20} className="text-[#818CF8]" />
                                    <span className="text-[14px] font-bold">Evening</span>
                                </div>
                                <span className="text-[12px] font-medium">{slots.evening.length} Slots</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {slots.evening.map((time, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => setSelectedSlot(time)}
                                        className={`py-2.5 rounded-lg border font-bold text-[13px] transition-all ${selectedSlot === time ? 'bg-white border-white text-[#0B1F4D] scale-95 shadow-inner' : 'border-white/20 text-white hover:border-white/50 bg-white/5'}`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="text-center pb-4">
                            <button className="text-[#6ED4D4] text-[14px] font-bold hover:underline">View More Slots</button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-white shrink-0 flex items-center justify-between border-t border-gray-100 shadow-[0_-8px_20px_-10px_rgba(0,0,0,0.1)]">
                    <div className="flex items-baseline gap-1">
                        <span className="text-[24px] font-black text-[#0B1F4D] tracking-tight">{doctor?.offlinePrice || 500}</span>
                    </div>
                    <button className="bg-[#1A7785] text-white px-10 py-3 rounded-xl font-bold text-[15px] hover:bg-[#15616D] transition-all shadow-lg active:scale-95">
                        Continue
                    </button>
                </div>
            </div>

            <style jsx>{`
                .animate-slide-in {
                    animation: slideIn 0.3s cubic-bezier(0, 0, 0.2, 1);
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default Info;
