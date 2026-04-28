import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    ChevronRight,
    Video,
    Calendar,
    Clock,
    MapPin,
    MoreVertical,
    ArrowUpRight,
    MessageSquare,
    Plus,
    BarChart3
} from 'lucide-react';
import Sidebar from '../Patient_sidebar';
import Profile from '../Profile';
import Account from '../Account';
import Notification from '../notification';
import Manage from './Manage';

// Assets
import phImg from '../../../assets/ph.png';

const Appointment = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState('Appointments');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isManageOpen, setIsManageOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    // Calendar State
    const [currentDate, setCurrentDate] = useState(new Date(2023, 9, 1)); // October 2023
    const [selectedDay, setSelectedDay] = useState(23);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => {
        let day = new Date(year, month, 1).getDay();
        return day; // 0 for SU, 1 for MO...
    };

    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const startOffset = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const offsetDays = Array.from({ length: startOffset }, (_, i) => null);

    return (
        <div className="relative h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>

            {/* Main Content Wrapper - This gets blurred */}
            <div className={`flex h-full w-full transition-all duration-300 ${activeModal || isNotificationOpen || isManageOpen ? 'blur-[4px] scale-[0.98]' : ''}`}>

                <Sidebar active={active} setActive={setActive} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

                <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                    {/* Top Navbar */}
                    <header className="h-[72px] flex items-center gap-4 px-6 md:px-8 shrink-0 border-b border-white/5 mb-1">
                        <div className="flex-1 max-w-[280px]">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full bg-white/10 border border-white/10 rounded-full py-[10px] px-[20px] text-white placeholder-white/40 text-[12px] outline-none focus:ring-2 focus:ring-[#6ED4D4]/50 transition-all font-medium"
                                />
                                <svg className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex items-center gap-[32px] ml-auto">
                            <span className="text-white/80 hover:text-white text-[13px] font-medium hidden md:block select-none cursor-pointer transition-colors">Language</span>
                            <div className="flex items-center gap-[20px]">
                                <button onClick={() => setIsNotificationOpen(true)} className="text-white hover:text-[#6ED4D4] transition-colors relative">
                                    <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    <div className="absolute top-[2px] right-[2px] w-[6px] h-[6px] bg-[#E85B5A] rounded-full" />
                                </button>
                                <button onClick={() => navigate('/Setting')} className="text-white hover:text-[#6ED4D4] transition-colors">
                                    <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                                <div
                                    onClick={() => setActiveModal('profile')}
                                    className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform"
                                >
                                    <img src={phImg} alt="User" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-8 py-4 overflow-y-auto no-scrollbar pb-[64px]">

                        {/* Header Section Inside Main */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
                            <div>
                                <h1 className="text-[32px] font-bold text-white flex items-center gap-3">
                                    Clinical Schedule <span className="text-white/40 font-normal text-[24px]">Alex Rivera</span>
                                </h1>
                                <p className="text-white/60 text-[14px] mt-1 uppercase tracking-wider font-medium">October 2023 Overview</p>
                            </div>
                            <button
                                onClick={() => navigate('/Consultation1')}
                                className="bg-white text-[#0B1F4D] px-8 py-3 rounded-full font-bold text-[14px] hover:bg-white/90 transition-all shadow-lg uppercase tracking-wider"
                            >
                                New Appointment
                            </button>
                        </div>

                        {/* Main Grid Layout */}
                        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8">

                            {/* Left Column - Calendar and Recommendation */}
                            <div className="flex flex-col gap-6">

                                {/* Calendar Card */}
                                <div className="bg-white rounded-[32px] p-8 min-h-[500px] flex flex-col shadow-2xl relative overflow-hidden">
                                    <div className="flex items-center justify-between mb-10">
                                        <h2 className="text-[24px] font-bold text-[#0B1F4D]">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                                        <div className="flex gap-4">
                                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#0B1F4D]">
                                                <ChevronLeft size={24} />
                                            </button>
                                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#0B1F4D]">
                                                <ChevronRight size={24} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Calendar Days Header */}
                                    <div className="grid grid-cols-7 mb-6">
                                        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                                            <div key={day} className="text-center text-[12px] font-bold text-gray-400 tracking-widest">{day}</div>
                                        ))}
                                    </div>

                                    {/* Calendar Grid */}
                                    <div className="grid grid-cols-7 flex-1 content-start gap-y-4">
                                        {offsetDays.map((_, i) => <div key={`offset-${i}`} />)}
                                        {days.map(day => (
                                            <div key={day} className="relative flex flex-col items-center">
                                                <div
                                                    onClick={() => setSelectedDay(day)}
                                                    className={`
                                                        w-12 h-12 flex items-center justify-center rounded-full text-[18px] font-medium cursor-pointer transition-all
                                                        ${selectedDay === day
                                                            ? 'bg-[#93f2f2] text-[#0B1F4D] shadow-lg scale-110'
                                                            : 'text-gray-400 hover:text-[#0B1F4D] hover:bg-gray-50'
                                                        }
                                                    `}
                                                >
                                                    {day}
                                                </div>

                                                {/* Popover for selected day (Elena Sterling) */}
                                                {day === 23 && (
                                                    <div className="absolute top-[110%] left-1/2 -translate-x-1/2 z-20 w-[180px] bg-[#0B1F4D] p-3 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
                                                        <div className="text-[10px] text-white/60 uppercase font-bold tracking-wider mb-1">Neurology Consult</div>
                                                        <div className="text-[12px] font-bold text-white">02:00 PM • Elena Sterling</div>
                                                        {/* Arrow */}
                                                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0B1F4D] rotate-45"></div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recommendation Banner */}
                                <div className="bg-[#E6F3F5] rounded-[32px] p-6 flex items-center gap-6 border border-white/20">
                                    <div className="w-14 h-14 bg-[#93f2f2] rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                                        <MessageSquare className="text-[#0B1F4D] w-7 h-7" />
                                    </div>
                                    <div className="flex-1 text-[#0B1F4D]">
                                        <h4 className="font-bold text-[18px]">VaidyaGo Buddy Recommendation</h4>
                                        <p className="text-[#0B1F4D]/70 text-[14px] leading-relaxed mt-1">
                                            It looks like your session with Dr. Sterling is approaching. We recommend creating a brief wellness journal entry focusing on your sleep patterns this week to share during your consult.
                                        </p>
                                        <button className="text-[#1A7785] font-bold text-[14px] mt-2 flex items-center gap-1 group">
                                            Open Journal <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Upcoming Sessions */}
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-[18px] font-bold uppercase tracking-widest text-white/80">Upcoming Sessions</h2>
                                    <span className="text-[12px] font-bold text-white/40 uppercase">OCT 2023</span>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {/* Featured Session Card */}
                                    <div className="bg-[#1a6e78] rounded-[32px] p-6 shadow-xl border border-white/10 flex flex-col gap-6">
                                        <div className="flex items-center justify-between">
                                            <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-md">Confirmed Clinical</span>
                                            <Video className="text-white/60 w-6 h-6" />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-full border-2 border-[#93f2f2] overflow-hidden p-1">
                                                <div className="w-full h-full rounded-full overflow-hidden">
                                                    <img src="https://i.pravatar.cc/150?u=elena" alt="Dr. Elena Sterling" className="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                            <div className="text-white">
                                                <h3 className="text-[20px] font-bold">Dr. Elena Sterling</h3>
                                                <p className="text-white/60 text-[14px]">Neurology Specialist</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-[14px] text-white/80 font-medium">
                                                <Calendar size={18} className="text-[#93f2f2]" /> Monday, Oct 23
                                            </div>
                                            <div className="flex items-center gap-3 text-[14px] text-white/80 font-medium">
                                                <Clock size={18} className="text-[#93f2f2]" /> 02:00 PM
                                            </div>
                                            <div className="flex items-center gap-3 text-[14px] text-white/80 font-medium">
                                                <MapPin size={18} className="text-[#93f2f2]" /> Sanctuary West Wing
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setIsManageOpen(true)}
                                            className="w-full bg-white text-[#0B1F4D] py-3.5 rounded-2xl font-bold hover:bg-white/90 transition-all text-[15px] shadow-lg"
                                        >
                                            Manage Session
                                        </button>
                                    </div>

                                    {/* Compact Cards */}
                                    {[
                                        { id: 'marcus', name: 'Dr. Marcus Chen', specialty: 'Cardiology • Oct 25', img: 'https://i.pravatar.cc/150?u=marcus' },
                                        { id: 'physio', name: 'Physiotherapy Lab', specialty: 'Full Assessment • Oct 28', icon: <Plus size={24} className="text-[#1A7785]" />, isIcon: true }
                                    ].map((session, i) => (
                                        <div key={i} className="relative">
                                            <div
                                                className="bg-white rounded-[24px] p-4 flex items-center gap-4 group hover:bg-[#E6F3F5] transition-all cursor-pointer"
                                            >
                                                {session.isIcon ? (
                                                    <div className="w-12 h-12 bg-[#E6F3F5] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                                                        {session.icon}
                                                    </div>
                                                ) : (
                                                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm border border-gray-100">
                                                        <img src={session.img} alt={session.name} className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <h4 className="text-[#0B1F4D] font-bold text-[15px]">{session.name}</h4>
                                                    <p className="text-gray-400 text-[12px] font-medium uppercase tracking-tight">{session.specialty}</p>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActiveDropdown(activeDropdown === session.id ? null : session.id);
                                                    }}
                                                    className={`p-2 rounded-full transition-all ${activeDropdown === session.id ? 'bg-[#0B1F4D] text-white' : 'text-gray-400 hover:text-[#0B1F4D] hover:bg-white'}`}
                                                >
                                                    <MoreVertical size={20} />
                                                </button>
                                            </div>

                                            {/* Dropdown Menu */}
                                            {activeDropdown === session.id && (
                                                <>
                                                    <div className="fixed inset-0 z-30" onClick={() => setActiveDropdown(null)}></div>
                                                    <div className="absolute right-0 top-[calc(100%+6px)] z-40 w-[220px] bg-white rounded-[20px] shadow-2xl border border-gray-100 py-1.5 animate-in slide-in-from-top-2 duration-200 overflow-hidden">
                                                        
                                                        {/* Option 1: Profile or Assessment */}
                                                        <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left group">
                                                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#EBF7F8] group-hover:text-[#1A7785] transition-colors">
                                                                {session.id === 'physio' ? (
                                                                    <BarChart3 size={16} />
                                                                ) : (
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                    </svg>
                                                                )}
                                                            </div>
                                                            <span className="text-[13px] font-bold text-[#0D1C2E]">
                                                                {session.id === 'physio' ? 'View Full Assessment' : 'View Profile'}
                                                            </span>
                                                        </button>
                                                        <div className="h-[1px] bg-gray-100 mx-4" />

                                                        {/* Option 2: Reschedule (Common) */}
                                                        <button 
                                                            onClick={() => {
                                                                setIsManageOpen(true);
                                                                setActiveDropdown(null);
                                                            }}
                                                            className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left group"
                                                        >
                                                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#EBF7F8] group-hover:text-[#1A7785] transition-colors">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            </div>
                                                            <span className="text-[13px] font-bold text-[#0D1C2E]">Reschedule Session</span>
                                                        </button>
                                                        <div className="h-[1px] bg-gray-100 mx-4" />

                                                        {/* Option 3: Message */}
                                                        <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left group">
                                                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#EBF7F8] group-hover:text-[#1A7785] transition-colors">
                                                                <MessageSquare size={16} />
                                                            </div>
                                                            <span className="text-[13px] font-bold text-[#0D1C2E]">
                                                                {session.id === 'physio' ? 'Message Lab' : 'Message Doctor'}
                                                            </span>
                                                        </button>
                                                        <div className="h-[1px] bg-gray-100 mx-4" />

                                                        {/* Option 4: Cancel (Common) */}
                                                        <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-red-50 transition-colors text-left group">
                                                            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500 group-hover:bg-red-100 transition-colors">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                            </div>
                                                            <span className="text-[13px] font-bold text-red-600">Cancel Appointment</span>
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* Modals - Outside the blurred content */}
            {activeModal === 'profile' && (
                <Profile
                    onClose={() => setActiveModal(null)}
                    onAccountSettings={() => setActiveModal('account')}
                />
            )}
            {activeModal === 'account' && (
                <Account onClose={() => setActiveModal(null)} />
            )}
            {isNotificationOpen && <Notification onClose={() => setIsNotificationOpen(false)} />}
            {isManageOpen && <Manage onClose={() => setIsManageOpen(false)} />}
        </div>
    );
};

export default Appointment;
