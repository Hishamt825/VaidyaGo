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
  Download,
  Plus,
  Video as VideoIcon,
  Check,
  User as ProfileIcon,
  MessageSquare,
  XCircle
} from 'lucide-react';
import Sidebar from '../Patient_sidebar';
import Profile from '../Profile';
import Account from '../Account';
import Notification from '../notification';
import Manage from './Manage';
import Pdf from './Pdf';
import Clinic_request from './Clinic_request';

// Assets
import phImg from '../../../assets/ph.png';

const Clinic = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState('Appointments');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isManageOpen, setIsManageOpen] = useState(false);
    const [isPdfOpen, setIsPdfOpen] = useState(false);
    const [isClinicRequestOpen, setIsClinicRequestOpen] = useState(false);
    const [calendarView, setCalendarView] = useState('Month');
    const [activeDropdown, setActiveDropdown] = useState(null);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className="relative h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
             style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>
            
            {/* Main Content Wrapper - This gets blurred */}
            <div className={`flex h-full w-full transition-all duration-300 ${activeModal || isNotificationOpen || isManageOpen || isPdfOpen || isClinicRequestOpen ? 'blur-[4px] scale-[0.98]' : ''}`}>
                
                <Sidebar active={active} setActive={setActive} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

                <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                    {/* Top Navbar */}
                    <header className="h-[72px] flex items-center gap-4 px-6 md:px-8 shrink-0 border-b border-white/5 mb-1">
                        <div className="flex items-center gap-4 flex-1 max-w-[340px]">
                            <button 
                                onClick={() => navigate('/Appointment')}
                                className="w-[40px] h-[40px] bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all border border-white/10 shrink-0"
                            >
                                <ChevronLeft size={20} strokeWidth={3} />
                            </button>
                            <div className="flex-1">
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
                        
                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
                            <div>
                                <h1 className="text-[32px] font-bold text-white leading-tight">
                                    Clinical Schedule
                                </h1>
                                <p className="text-white/60 text-[15px] mt-1 font-medium">Your personalized roadmap for recovery and wellness management.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => setIsPdfOpen(true)}
                                    className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full font-bold text-[13px] flex items-center gap-2 transition-all uppercase tracking-widest border border-white/10 backdrop-blur-md"
                                >
                                    <Download size={18} /> Export PDF
                                </button>
                                <button 
                                    onClick={() => setIsClinicRequestOpen(true)}
                                    className="bg-gradient-to-r from-[#1A7785] to-[#49AAB3] text-white px-6 py-2.5 rounded-full font-bold text-[13px] hover:shadow-lg hover:shadow-[#1A7785]/20 transition-all uppercase tracking-widest flex items-center gap-2"
                                >
                                    <Plus size={18} /> New Request
                                </button>
                            </div>
                        </div>

                        {/* Main Grid Layout */}
                        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8">
                            
                            {/* Left Column - Large Calendar */}
                            <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col min-h-[600px]">
                                <div className="p-8 flex items-center justify-between border-b border-gray-400">
                                    <div className="flex items-center gap-4">
                                        <h2 className="text-[24px] font-[900] text-[#0D1C2E]">October 2023</h2>
                                        <div className="flex gap-2">
                                            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
                                                <ChevronLeft size={20} />
                                            </button>
                                            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-1 rounded-xl flex">
                                        {['Month', 'Week', 'Day'].map((view) => (
                                            <button
                                                key={view}
                                                onClick={() => setCalendarView(view)}
                                                className={`px-5 py-2 rounded-lg text-[13px] font-bold transition-all ${
                                                    calendarView === view 
                                                        ? 'bg-white text-[#1A7785] shadow-sm' 
                                                        : 'text-gray-400 hover:text-gray-600'
                                                }`}
                                            >
                                                {view}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Calendar Grid */}
                                <div className="flex-1 grid grid-cols-7 grid-rows-5">
                                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                                        <div key={day} className="py-4 text-center text-[11px] font-bold text-gray-300 tracking-[0.2em] border-b border-r border-gray-400 last:border-r-0 bg-gray-50/30">
                                            {day}
                                        </div>
                                    ))}
                                    
                                    {/* Calendar Days (Mockup) */}
                                    {Array.from({ length: 35 }).map((_, i) => {
                                        const day = i - 0; // Simplified
                                        const isToday = day === 23;
                                        return (
                                            <div key={i} className={`p-4 border-b border-r border-gray-400 last:border-r-0 min-h-[100px] transition-colors hover:bg-gray-50/50 cursor-pointer ${isToday ? 'bg-[#EBF7F8]' : ''}`}>
                                                <span className={`text-[15px] font-bold ${isToday ? 'text-[#1A7785]' : 'text-gray-300'}`}>
                                                    {day > 0 && day <= 31 ? day : ''}
                                                </span>
                                                {isToday && (
                                                    <div className="mt-3 bg-[#1A7785] text-white p-2.5 rounded-xl shadow-lg shadow-[#1A7785]/20 animate-in fade-in slide-in-from-top-1">
                                                        <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">02:00 PM</p>
                                                        <p className="text-[12px] font-bold leading-tight mt-0.5">Neurology Consult</p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-[18px] font-[900] text-white">Upcoming Sessions</h2>
                                    <span className="bg-[#1A7785] text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest shadow-lg shadow-[#1A7785]/20">3 Active</span>
                                </div>

                                {/* Featured Session Card */}
                                <div className="bg-white rounded-[32px] p-6 shadow-2xl relative overflow-hidden group">
                                    {/* Status Badge */}
                                    <div className="absolute top-6 right-6">
                                        <div className="bg-[#EBF7F8] text-[#1A7785] text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-[#1A7785] rounded-full animate-pulse" /> Confirmed Clinical
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-gray-400 shadow-sm">
                                                <img src="https://i.pravatar.cc/150?u=elena" alt="Dr. Elena" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#22C55E] border-2 border-white rounded-full flex items-center justify-center shadow-sm">
                                                <Check className="text-white w-3 h-3" strokeWidth={4} />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-[20px] font-[900] text-[#0D1C2E]">Dr. Elena Sterling</h3>
                                            <p className="text-[#1A7785] font-bold text-[14px]">Neurology Specialist</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center gap-3 text-[14px] text-gray-500 font-bold">
                                            <Calendar size={18} className="text-[#1A7785]" /> Monday, Oct 23, 2023
                                        </div>
                                        <div className="flex items-center gap-3 text-[14px] text-gray-500 font-bold">
                                            <Clock size={18} className="text-[#1A7785]" /> 02:00 PM (EDT)
                                        </div>
                                        <div className="flex items-center gap-3 text-[14px] text-gray-500 font-bold">
                                            <MapPin size={18} className="text-[#1A7785]" /> Sanctuary West Wing • Rm 402
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => setIsManageOpen(true)}
                                            className="flex-1 bg-[#0B1F4D] text-white py-4 rounded-2xl font-bold text-[15px] hover:bg-[#0B1F4D]/90 transition-all shadow-xl shadow-[#0B1F4D]/20 active:scale-[0.98]"
                                        >
                                            Manage Session
                                        </button>
                                        <button 
                                            onClick={() => navigate('/Vediocall', { state: { from: '/Clinic' } })}
                                            className="w-14 h-14 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-400 active:scale-95 transition-all"
                                        >
                                            <VideoIcon size={24} />
                                        </button>
                                    </div>
                                </div>

                                {/* Compact List */}
                                <div className="space-y-3">
                                    {[
                                        { id: 'marcus', name: 'Dr. Marcus Chen', specialty: 'Cardiology Follow-up', time: 'Oct 26 • 10:15 AM', img: 'https://i.pravatar.cc/150?u=marcus' },
                                        { id: 'physio', name: 'Physiotherapy Lab', specialty: 'Rehabilitation Unit', time: 'Oct 27 • 04:00 PM', img: 'https://i.pravatar.cc/150?u=lab' }
                                    ].map((s, i) => (
                                        <div key={i} className="relative">
                                            <div 
                                                onClick={() => setActiveDropdown(activeDropdown === s.id ? null : s.id)}
                                                className={`bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-all cursor-pointer group ${activeDropdown === s.id ? 'ring-2 ring-[#6ED4D4]/50 bg-white/30' : ''}`}
                                            >
                                                <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm shrink-0">
                                                    <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-white font-bold text-[15px] truncate">{s.name}</h4>
                                                    <p className="text-white/60 text-[11px] font-medium uppercase tracking-tight truncate">{s.specialty}</p>
                                                    <p className="text-[#93f2f2] text-[11px] font-bold mt-0.5">{s.time}</p>
                                                </div>
                                                <MoreVertical className={`transition-colors ${activeDropdown === s.id ? 'text-white' : 'text-white/40 group-hover:text-white'}`} size={18} />
                                            </div>

                                            {activeDropdown === s.id && (
                                                <div className="absolute right-0 top-[calc(100%+6px)] z-40 w-[240px] bg-white rounded-[24px] shadow-2xl border border-gray-100 py-2 animate-in slide-in-from-top-2 duration-200">
                                                        <button 
                                                            onClick={() => {
                                                                setActiveDropdown(null);
                                                                navigate('/view_profile', { state: { from: 'Clinic' } });
                                                            }}
                                                            className="w-full px-4 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left group"
                                                        >
                                                            <div className="w-10 h-10 bg-[#F1F6F8] rounded-xl flex items-center justify-center text-[#1A7785] group-hover:bg-[#1A7785] group-hover:text-white transition-all">
                                                                <ProfileIcon size={18} />
                                                            </div>
                                                            <span className="text-[14px] font-bold text-[#0D1C2E]">View Profile</span>
                                                        </button>

                                                        <div className="mx-4 border-t border-gray-100"></div>

                                                        <button className="w-full px-4 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left group">
                                                            <div className="w-10 h-10 bg-[#F1F6F8] rounded-xl flex items-center justify-center text-[#1A7785] group-hover:bg-[#1A7785] group-hover:text-white transition-all">
                                                                <Calendar size={18} />
                                                            </div>
                                                            <span className="text-[14px] font-bold text-[#0D1C2E]">Reschedule Session</span>
                                                        </button>

                                                        <div className="mx-4 border-t border-gray-100"></div>

                                                        <button className="w-full px-4 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left group">
                                                            <div className="w-10 h-10 bg-[#F1F6F8] rounded-xl flex items-center justify-center text-[#1A7785] group-hover:bg-[#1A7785] group-hover:text-white transition-all">
                                                                <MessageSquare size={18} />
                                                            </div>
                                                            <span className="text-[14px] font-bold text-[#0D1C2E]">Message Doctor</span>
                                                        </button>

                                                        <div className="mx-4 border-t border-gray-100"></div>

                                                        <button className="w-full px-4 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left group">
                                                            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                                                                <XCircle size={18} />
                                                            </div>
                                                            <span className="text-[14px] font-bold text-red-600">Cancel Appointment</span>
                                                        </button>
                                                    </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Insight Card */}
                                <div className="bg-[#0D1C2E]/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 mt-2">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-[#1A7785]/20 rounded-full flex items-center justify-center">
                                            <VideoIcon size={20} className="text-[#6ED4D4]" />
                                        </div>
                                        <h4 className="text-white font-bold text-[16px]">Schedule Insight</h4>
                                    </div>
                                    <p className="text-white/60 text-[13px] leading-relaxed mb-6">
                                        You have 3 appointments this week. We recommend completing your 'Wellness Journal' entry 24 hours before your session with Dr. Sterling.
                                    </p>
                                    <button className="text-[#6ED4D4] font-bold text-[13px] hover:underline flex items-center gap-1 group">
                                        Open Journal <Plus size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* Modals */}
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
            {isPdfOpen && <Pdf onClose={() => setIsPdfOpen(false)} />}
            {isClinicRequestOpen && <Clinic_request isOpen={isClinicRequestOpen} onClose={() => setIsClinicRequestOpen(false)} />}
        </div>
    );
};

export default Clinic;
