import React, { useState, useEffect } from 'react';
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
    BarChart3,
    User as ProfileIcon,
    XCircle
} from 'lucide-react';
import apiFetch from '../../../api';
import BASE_URL from '../../../baseUrl';
import Sidebar from '../Patient_sidebar';
import Profile from '../Profile';
import Account from '../Account';
import Notification from '../notification';
import Manage from './Manage';
import { useLanguage } from '../../../context/LanguageContext';

// Assets
import phImg from '../../../assets/ph.png';

const Appointment = () => {
    const navigate = useNavigate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [active, setActive] = useState('Appointments');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { t, toggleLanguage, language } = useLanguage();
    const [activeModal, setActiveModal] = useState(null);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isManageOpen, setIsManageOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loadingAppointments, setLoadingAppointments] = useState(true);
    const [appointmentsError, setAppointmentsError] = useState(null);

    // Calendar State
    const [currentDate, setCurrentDate] = useState(() => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1);
    });
    const [selectedDay, setSelectedDay] = useState(new Date().getDate());

    useEffect(() => {
        const fetchAppointments = async () => {
            setLoadingAppointments(true);
            setAppointmentsError(null);

            try {
                const response = await apiFetch(`${BASE_URL}/api/appointments/patient/appointments/`);
                if (!response.ok) {
                    throw new Error(`Unable to load appointments (${response.status})`);
                }

                const data = await response.json();
                setAppointments(Array.isArray(data.appointments) ? data.appointments : []);
            } catch (error) {
                setAppointmentsError(error.message || 'Unable to load appointments');
            } finally {
                setLoadingAppointments(false);
            }
        };

        fetchAppointments();
    }, []);

    const appointmentEvents = appointments.map((appointment) => {
        const timeStr = appointment.start_time;
        let eventDate = new Date(timeStr);
        let day = eventDate.getDate();
        let month = eventDate.getMonth();
        let year = eventDate.getFullYear();
        let timeLabel = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Parse directly from ISO string to avoid timezone shift (matching Info.jsx/AddSlot)
        let dateLabel = '';
        if (timeStr && timeStr.includes('T')) {
            const [datePart, timePart] = timeStr.split('T');
            const [y, m, d] = datePart.split('-').map(Number);
            const [h, min] = timePart.split(':').map(Number);
            
            year = y;
            month = m - 1;
            day = d;
            
            const displayHour = h % 12 || 12;
            const ampm = h >= 12 ? 'PM' : 'AM';
            timeLabel = `${displayHour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')} ${ampm}`;
            
            // Create a "neutral" date object for comparisons that doesn't shift
            eventDate = new Date(year, month, day, h, min);

            // Pre-format date label
            const tempDate = new Date(year, month, day);
            const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][tempDate.getDay()];
            const monthName = monthNames[month];
            dateLabel = `${weekday}, ${monthName} ${day}`;
        }

        return {
            ...appointment,
            eventDate,
            day,
            month,
            year,
            timeLabel,
            dateLabel,
            doctorName: appointment.doctor_details?.full_name || 'Unknown Doctor',
        };
    });

    const visibleEvents = appointmentEvents.filter((event) =>
        event.year === currentDate.getFullYear() && event.month === currentDate.getMonth()
    );

    const eventsByDay = visibleEvents.reduce((acc, event) => {
        acc[event.day] = acc[event.day] || [];
        acc[event.day].push(event);
        return acc;
    }, {});

    const upcomingAppointments = appointmentEvents
        .filter((event) => event.eventDate >= new Date())
        .sort((a, b) => a.eventDate - b.eventDate);

    const nextAppointment = upcomingAppointments[0];
    const secondaryAppointments = upcomingAppointments.slice(1, 3);


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
                            <div
                                onClick={toggleLanguage}
                                className="text-white/80 hover:text-white text-[13px] font-bold hidden md:block select-none cursor-pointer transition-colors bg-white/10 px-3 py-1 rounded-full border border-white/10 hover:bg-white/20"
                            >
                                {language === 'English' ? 'EN' : 'HI'}
                            </div>
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
                                    Clinical Schedule <span className="text-white/40 font-normal text-[24px]">{localStorage.getItem('user_full_name') || 'Patient'}</span>
                                </h1>
                                <p className="text-white/60 text-[14px] mt-1 uppercase tracking-wider font-medium">{monthNames[new Date().getMonth()]} {new Date().getFullYear()} Overview</p>
                            </div>
                            <button
                                onClick={() => navigate('/Consultation1', { state: { from: 'Appointment' } })}
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
                                        {days.map(day => {
                                            const dayEvents = eventsByDay[day] || [];
                                            const isSelected = selectedDay === day;
                                            const hasEvent = dayEvents.length > 0;

                                            return (
                                                <div key={day} className="relative flex flex-col items-center">
                                                    <div
                                                        onClick={() => setSelectedDay(day)}
                                                        className={`
                                                            w-12 h-12 flex items-center justify-center rounded-full text-[18px] font-medium cursor-pointer transition-all
                                                            ${isSelected
                                                                ? 'bg-[#93f2f2] text-[#0B1F4D] shadow-lg scale-110'
                                                                : hasEvent
                                                                    ? 'text-[#0B1F4D] bg-[#E6F3F5] hover:bg-[#D7F0F1]'
                                                                    : 'text-gray-400 hover:text-[#0B1F4D] hover:bg-gray-50'
                                                            }
                                                        `}
                                                    >
                                                        {day}
                                                    </div>

                                                    {hasEvent && (
                                                        <span className="absolute bottom-1 w-2 h-2 rounded-full bg-[#0B1F4D]" />
                                                    )}

                                                    {isSelected && dayEvents.length > 0 && (
                                                        <div className="absolute top-[110%] left-1/2 -translate-x-1/2 z-20 w-[220px] bg-[#0B1F4D] p-3 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
                                                            {dayEvents.slice(0, 2).map((event, idx) => (
                                                                <div key={event.id || idx} className="mb-3 last:mb-0">
                                                                    <div className="text-[10px] text-white/60 uppercase font-bold tracking-wider mb-1">{event.appointment_type || event.location || 'Appointment'}</div>
                                                                    <div className="text-[12px] font-bold text-white">
                                                                        {event.timeLabel} • {event.doctorName}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            {dayEvents.length > 2 && (
                                                                <div className="text-[10px] text-white/60 mt-2">+{dayEvents.length - 2} more appointment(s)</div>
                                                            )}
                                                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0B1F4D] rotate-45"></div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
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
                                    <span className="text-[12px] font-bold text-white/40 uppercase">
                                        {monthNames[new Date().getMonth()].slice(0, 3)} {new Date().getFullYear()}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {/* Featured Session Card */}
                                    {nextAppointment ? (
                                        <div className="bg-[#1a6e78] rounded-[32px] p-6 shadow-xl border border-white/10 flex flex-col gap-6">
                                            <div className="flex items-center justify-between">
                                                <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-md">{nextAppointment.status?.toUpperCase() || 'UPCOMING'}</span>
                                                <Video 
                                                    onClick={() => navigate('/Vediocall', { state: { from: '/Appointment' } })} 
                                                    className="text-white/60 w-6 h-6 cursor-pointer hover:text-white transition-colors" 
                                                />
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-full border-2 border-[#93f2f2] overflow-hidden p-1">
                                                    <div className="w-full h-full rounded-full overflow-hidden">
                                                        <img src={`https://i.pravatar.cc/150?u=${encodeURIComponent(nextAppointment.doctorName)}`} alt={nextAppointment.doctorName} className="w-full h-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="text-white">
                                                    <h3 className="text-[20px] font-bold">{nextAppointment.doctorName}</h3>
                                                    <p className="text-white/60 text-[14px]">{nextAppointment.appointment_type || 'Appointment'}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 text-[14px] text-white/80 font-medium">
                                                    <Calendar size={18} className="text-[#93f2f2]" /> {nextAppointment.dateLabel}
                                                </div>
                                                <div className="flex items-center gap-3 text-[14px] text-white/80 font-medium">
                                                    <Clock size={18} className="text-[#93f2f2]" /> {nextAppointment.timeLabel}
                                                </div>
                                                <div className="flex items-center gap-3 text-[14px] text-white/80 font-medium">
                                                    <MapPin size={18} className="text-[#93f2f2]" /> {nextAppointment.location || 'Location not set'}
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setIsManageOpen(true)}
                                                className="w-full bg-white text-[#0B1F4D] py-3.5 rounded-2xl font-bold hover:bg-white/90 transition-all text-[15px] shadow-lg"
                                            >
                                                Manage Session
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="bg-[#1a6e78] rounded-[32px] p-6 shadow-xl border border-white/10 flex flex-col gap-6">
                                            <div className="flex items-center justify-between">
                                                <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-md">No Appointments</span>
                                                <Video className="text-white/60 w-6 h-6" />
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-full border-2 border-[#93f2f2] overflow-hidden p-1">
                                                    <div className="w-full h-full rounded-full overflow-hidden bg-white/10"></div>
                                                </div>
                                                <div className="text-white">
                                                    <h3 className="text-[20px] font-bold">No upcoming sessions</h3>
                                                    <p className="text-white/60 text-[14px]">Book a new appointment to see it here.</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 text-[14px] text-white/80 font-medium">
                                                    <Calendar size={18} className="text-[#93f2f2]" /> --
                                                </div>
                                                <div className="flex items-center gap-3 text-[14px] text-white/80 font-medium">
                                                    <Clock size={18} className="text-[#93f2f2]" /> --
                                                </div>
                                                <div className="flex items-center gap-3 text-[14px] text-white/80 font-medium">
                                                    <MapPin size={18} className="text-[#93f2f2]" /> --
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => navigate('/Consultation1', { state: { from: 'Appointment' } })}
                                                className="w-full bg-white text-[#0B1F4D] py-3.5 rounded-2xl font-bold hover:bg-white/90 transition-all text-[15px] shadow-lg"
                                            >
                                                Book Session
                                            </button>
                                        </div>
                                    )}

                                    {/* Dynamic Upcoming Sessions */}
                                    {secondaryAppointments.map((session, i) => (
                                        <div key={session.id || i} className="relative">
                                            <div
                                                className="bg-white rounded-[24px] p-4 flex items-center gap-4 group hover:bg-[#E6F3F5] transition-all cursor-pointer"
                                            >
                                                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm border border-gray-100">
                                                    <img 
                                                        src={`https://i.pravatar.cc/150?u=${encodeURIComponent(session.doctorName)}`} 
                                                        alt={session.doctorName} 
                                                        className="w-full h-full object-cover" 
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-[#0B1F4D] font-bold text-[15px]">{session.doctorName}</h4>
                                                    <p className="text-gray-400 text-[12px] font-medium uppercase tracking-tight">
                                                        {session.appointment_type || 'Consultation'} • {session.dateLabel}
                                                    </p>
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
                                                <div className="absolute right-0 top-[calc(100%+6px)] z-40 w-[240px] bg-white rounded-[24px] shadow-2xl border border-gray-100 py-2 animate-in slide-in-from-top-2 duration-200">
                                                    <button 
                                                        onClick={() => {
                                                            setActiveDropdown(null);
                                                            navigate('/view_profile', { state: { from: 'Appointment' } });
                                                        }}
                                                        className="w-full px-4 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left group"
                                                    >
                                                        <div className="w-10 h-10 bg-[#F1F6F8] rounded-xl flex items-center justify-center text-[#1A7785] group-hover:bg-[#1A7785] group-hover:text-white transition-all">
                                                            <ProfileIcon size={18} />
                                                        </div>
                                                        <span className="text-[14px] font-bold text-[#0D1C2E]">View Profile</span>
                                                    </button>
                                                    
                                                    <div className="mx-4 border-t border-gray-100"></div>

                                                    <button 
                                                        onClick={() => {
                                                            setIsManageOpen(true);
                                                            setActiveDropdown(null);
                                                        }}
                                                        className="w-full px-4 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left group"
                                                    >
                                                        <div className="w-10 h-10 bg-[#F1F6F8] rounded-xl flex items-center justify-center text-[#1A7785] group-hover:bg-[#1A7785] group-hover:text-white transition-all">
                                                            <Calendar size={18} />
                                                        </div>
                                                        <span className="text-[14px] font-bold text-[#0D1C2E]">Reschedule Session</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* Fallback if no more appointments */}
                                    {secondaryAppointments.length === 0 && nextAppointment && (
                                        <p className="text-white/20 text-[12px] text-center italic py-4">No other scheduled sessions</p>
                                    )}
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
