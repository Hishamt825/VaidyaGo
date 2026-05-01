import React, { useState } from 'react';
import { X, ArrowLeft, ChevronLeft, ChevronRight, Sun, Sunrise, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import pen1 from '../../assets/pen1.png';

const Hos_info = ({ onClose, doctor }) => {
    const navigate = useNavigate();
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
            <div className="relative w-full max-w-[420px] h-full shadow-2xl flex flex-col overflow-hidden animate-slide-in bg-white">
                
                {/* Header */}
                <div className="px-6 py-5 flex items-center gap-4 text-[#0D1C2E] shrink-0 border-b border-gray-100">
                    <button onClick={onClose} className="hover:bg-gray-100 p-1.5 rounded-full transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                    <h2 className="text-[20px] font-bold">Schedule Appointment</h2>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-24 space-y-8 pt-6">
                    
                    {/* Doctor Mini Profile */}
                    <div className="flex items-center gap-4 py-2">
                        <div className="w-[64px] h-[64px] rounded-xl overflow-hidden border border-gray-100">
                            <img src={pen1} alt="Doctor" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-[#0D1C2E] font-bold text-[17px] leading-tight">{doctor?.name || 'Dr. Sumaiya Javed'}</h3>
                            <p className="text-gray-400 text-[13px] font-medium mb-1">10 years</p>
                            <button 
                                onClick={() => navigate('/view_profile')}
                                className="text-[#1A7785] text-[13px] font-bold hover:underline"
                            >
                                View Profile
                            </button>
                        </div>
                    </div>

                    {/* Tab Switcher */}
                    <div className="bg-gray-50 p-1 rounded-full flex border border-gray-200">
                        <button 
                            onClick={() => setActiveTab('Online Consult')}
                            className={`flex-1 py-2 text-[13px] font-bold rounded-full transition-all ${activeTab === 'Online Consult' ? 'bg-white text-[#1A7785] shadow-sm' : 'text-gray-500 hover:text-[#0D1C2E]'}`}
                        >
                            Online Consult
                        </button>
                        <button 
                            onClick={() => setActiveTab('Hospital Visit')}
                            className={`flex-1 py-2 text-[13px] font-bold rounded-full transition-all ${activeTab === 'Hospital Visit' ? 'bg-[#1A7785] text-white shadow-lg' : 'text-gray-500 hover:text-[#0D1C2E]'}`}
                        >
                            Hospital Visit
                        </button>
                    </div>

                    {/* Date Selector */}
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <button className="text-gray-300 hover:text-gray-600"><ChevronLeft size={18} /></button>
                            <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
                                {dates.map(d => (
                                    <div 
                                        key={d.id}
                                        onClick={() => setSelectedDate(d.id)}
                                        className={`min-w-[54px] p-2.5 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-all ${selectedDate === d.id ? 'bg-white border-[#1A7785] scale-105 shadow-md' : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}
                                    >
                                        <span className={`text-[11px] font-bold ${selectedDate === d.id ? 'text-[#1A7785]' : 'text-gray-400'}`}>{d.day}</span>
                                        <span className={`text-[16px] font-black leading-none ${selectedDate === d.id ? 'text-[#0D1C2E]' : 'text-gray-600'}`}>{d.date}</span>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedDate === d.id ? 'text-[#1A7785]' : 'text-gray-400'}`}>{d.month}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="text-gray-300 hover:text-gray-600"><ChevronRight size={18} /></button>
                        </div>
                    </div>

                    {/* Slots Sections */}
                    <div className="space-y-8">
                        {/* Morning */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Sunrise size={20} className="text-[#1A7785]" />
                                    <span className="text-[14px] font-bold">Morning</span>
                                </div>
                                <span className="text-[12px] font-medium">{slots.morning.length} Slots</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {slots.morning.map((time, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => setSelectedSlot(time)}
                                        className={`py-2.5 rounded-lg border font-bold text-[13px] transition-all ${selectedSlot === time ? 'bg-[#98C6CD] border-[#98C6CD] text-[#0D1C2E] shadow-inner' : 'border-gray-200 text-gray-700 hover:border-[#1A7785] bg-white'}`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Afternoon */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-gray-400">
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
                                        className={`py-2.5 rounded-lg border font-bold text-[13px] transition-all ${selectedSlot === time ? 'bg-[#98C6CD] border-[#98C6CD] text-[#0D1C2E] shadow-inner' : 'border-gray-200 text-gray-700 hover:border-[#1A7785] bg-white'}`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Evening */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-gray-400">
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
                                        className={`py-2.5 rounded-lg border font-bold text-[13px] transition-all ${selectedSlot === time ? 'bg-[#98C6CD] border-[#98C6CD] text-[#0D1C2E] shadow-inner' : 'border-gray-200 text-gray-700 hover:border-[#1A7785] bg-white'}`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="text-center pb-4">
                            <button className="text-[#1A7785] text-[14px] font-bold hover:underline">View More Slots</button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-white shrink-0 flex items-center justify-between border-t border-gray-100 shadow-[0_-8px_20px_-10px_rgba(0,0,0,0.1)]">
                    <div className="flex items-baseline gap-1">
                        <span className="text-[20px] font-black text-[#0D1C2E] tracking-tight">{doctor?.offlinePrice || 500}</span>
                    </div>
                    <button className="text-[#1A7785] px-4 py-2 font-bold text-[16px] hover:underline transition-all">
                        Continue
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
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
            ` }} />
        </div>
    );
};

export default Hos_info;
