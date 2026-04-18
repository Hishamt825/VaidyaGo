import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Patient_sidebar';
import Profile from './Profile';
import Account from './Account';
import Notification from './notification';

// Assets
import phImg from '../../assets/ph.png';
import docImg1 from '../../assets/ph.png'; // Placeholder for specific docs if not found
import docImg2 from '../../assets/Visual.png';

const Appointment = () => {
    const [active, setActive] = useState('Appointments');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null); // 'profile' | 'account' | null
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const navigate = useNavigate();

    const [currentDate, setCurrentDate] = useState(new Date(2023, 9, 1));
    const [selectedDay, setSelectedDay] = useState(12);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => {
        let day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1; // Adjust for Monday start: 0 for MO, 1 for TU... 6 for SU
    };

    const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const totalDays = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const startOffset = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
    const prevMonthDays = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth() - 1);

    const daysOffset = Array.from({ length: startOffset }, (_, i) => prevMonthDays - startOffset + i + 1);
    const monthDays = Array.from({ length: totalDays }, (_, i) => i + 1);
    
    // Always render 42 cells (6 rows) to keep height consistent
    const trailingDaysCount = 42 - (daysOffset.length + monthDays.length);
    const nextMonthDays = Array.from({ length: trailingDaysCount }, (_, i) => i + 1);

    const upcomingVisits = [
        {
            id: 1,
            type: 'NEXT PRIORITY',
            title: 'Cardiology Consult',
            doctor: 'Dr. Sarah Jenkins',
            time: '09:30 AM (Online)',
            date: 'OCT 12',
            reschedulable: true,
            actionLabel: 'Join Call',
            actionType: 'primary'
        },
        {
            id: 2,
            type: '',
            title: 'Dermatology Exam',
            doctor: 'Dr. Marcus Vane',
            time: '02:15 PM (In-Person)',
            date: 'OCT 15',
            reschedulable: true,
            actionLabel: 'Directions',
            actionType: 'secondary'
        }
    ];

    const pastConsultations = [
        {
            id: 1,
            doctor: 'Dr. Elena Ortega',
            specialty: 'General',
            date: 'Sep 24, 2023',
            status: 'Completed',
            initials: 'EO',
            color: 'bg-[#6ED4D4]'
        },
        {
            id: 2,
            doctor: 'Dr. Robert Klose',
            specialty: 'Neurology',
            date: 'Sep 10, 2023',
            status: 'Canceled',
            initials: 'RK',
            color: 'bg-[#B0C4C9]'
        },
        {
            id: 3,
            doctor: 'Dr. Simon Abas',
            specialty: 'Ophthalmology',
            date: 'Aug 28, 2023',
            status: 'Completed',
            initials: 'SA',
            color: 'bg-[#93C5FD]'
        }
    ];

    const recommendedDoctors = [
        {
            id: 1,
            name: 'Dr. Maya Angelis',
            specialty: 'Psychiatrist • 12 yrs exp.',
            rating: '4.9',
            image: docImg1
        },
        {
            id: 2,
            name: 'Dr. Julian Thorne',
            specialty: 'Orthopedist • 8 yrs exp.',
            rating: '4.7',
            image: docImg2
        }
    ];

    return (
        <div 
            className="flex h-screen w-full font-sans text-white overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}
        >
            {/* ── Sidebar ── */}
            <Sidebar
                active={active}
                setActive={setActive}
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
            />

            {/* ── Main Area ── */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Header Navbar */}
                <header className="h-[72px] flex items-center justify-between px-6 md:px-8 shrink-0 border-b border-white/5 mb-1 z-20">
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
                            <div onClick={() => setActiveModal('profile')} className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform"><img src={phImg} alt="User" className="w-full h-full object-cover" /></div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 px-[20px] md:px-[32px] pt-[16px] pb-[64px] max-w-[1500px] mx-auto w-full overflow-y-auto">
                    {/* Page Title */}
                    <div className="mb-5">
                        <h1 className="text-[28px] font-semibold text-white leading-[1.1] tracking-tight mb-1">Your Consultations</h1>
                        <p className="text-white/70 text-[14px] font-medium">Manage your health journey with editorial precision.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6">
                        
                        {/* LEFT COLUMN */}
                        <div className="space-y-6">
                            
                            {/* Upcoming Visits */}
                            <section className="bg-white rounded-[24px] p-5 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-[18px] font-medium text-[#0B1F4D]">Upcoming Visits</h2>
                                    <button className="text-[14px] font-medium text-[#0B1F4D] hover:underline">View Schedule</button>
                                </div>

                                <div className="space-y-3">
                                    {upcomingVisits.map((visit) => (
                                        <div key={visit.id} className="bg-[#F8FAFC] border border-[#EDF2F7] rounded-[20px] p-4 flex items-center justify-between">
                                            <div className="flex gap-4">
                                                {/* Date box */}
                                                <div className="w-[56px] h-[56px] bg-white rounded-[16px] shadow-sm flex flex-col items-center justify-center border border-[#EDF2F7]">
                                                    <span className="text-[9px] font-medium text-red-500 uppercase tracking-tighter">{visit.date.split(' ')[0]}</span>
                                                    <span className="text-[18px] font-medium text-[#0B1F4D] leading-none">{visit.date.split(' ')[1]}</span>
                                                </div>

                                                {/* Details */}
                                                <div>
                                                    {visit.type && (
                                                        <p className="text-[9px] font-medium text-[#1a6e78] uppercase tracking-wider mb-0.5">{visit.type}</p>
                                                    )}
                                                    <h3 className="text-[17px] font-medium text-[#0B1F4D]">{visit.title}</h3>
                                                    <p className="text-[14px] text-[#4A5568]">{visit.doctor} • {visit.time}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-[12px]">
                                                <button className="px-[16px] py-[10px] rounded-full border border-[#D7E2E4] text-[16px] font-medium text-[#0B1F4D] hover:bg-gray-50 transition-colors">
                                                    Reschedule
                                                </button>
                                                <button className={`px-[20px] py-[10px] rounded-full text-[16px] font-medium text-white shadow-md transition-all
                                                    ${visit.actionType === 'primary' ? 'bg-[#1a3048] hover:bg-[#122338]' : 'bg-[#D7E2E4] !text-[#0B1F4D] hover:bg-[#ccd7db]'}
                                                `}>
                                                    {visit.actionLabel}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Past Consultations */}
                            <section className="bg-white rounded-[24px] p-5 shadow-lg">
                                <h2 className="text-[18px] font-medium text-[#0B1F4D] mb-4">Past Consultations</h2>
                                
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-100 uppercase">
                                                <th className="pb-4 text-[11px] font-medium text-gray-400 tracking-wider">Doctor & Specialty</th>
                                                <th className="pb-4 text-[11px] font-medium text-gray-400 tracking-wider">Date</th>
                                                <th className="pb-4 text-[11px] font-medium text-gray-400 tracking-wider">Status</th>
                                                <th className="pb-4 text-[11px] font-medium text-gray-400 tracking-wider text-right">Report</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {pastConsultations.map((item) => (
                                                <tr key={item.id} className="group">
                                                    <td className="py-4">
                                                        <div className="flex items-center gap-2.5">
                                                            <div className={`w-9 h-9 ${item.color} rounded-full flex items-center justify-center text-[12px] font-medium text-white shadow-sm`}>
                                                                {item.initials}
                                                            </div>
                                                            <div>
                                                                <p className="text-[14px] font-medium text-[#0B1F4D]">{item.doctor}</p>
                                                                <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full uppercase font-medium">{item.specialty}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 text-[14px] text-gray-600">{item.date}</td>
                                                    <td className="py-4">
                                                        <div className="flex items-center gap-1.5">
                                                            <div className={`w-2 h-2 rounded-full ${item.status === 'Completed' ? 'bg-teal-500' : 'bg-red-500'}`}></div>
                                                            <span className={`text-[12px] font-medium ${item.status === 'Completed' ? 'text-teal-600' : 'text-red-600'}`}>{item.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 text-right">
                                                        {item.status === 'Completed' ? (
                                                            <button className="text-[14px] font-medium text-[#16879B] hover:underline flex items-center gap-1 ml-auto">
                                                                Download
                                                            </button>
                                                        ) : (
                                                            <span className="text-[14px] text-gray-300 font-medium">N/A</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="space-y-6">
                                    {/* Calendar */}
                            <section className="bg-white rounded-[24px] p-4 md:p-5 shadow-lg text-[#0B1F4D]">
                                <div className="flex items-center justify-between mb-3 px-1">
                                    <h3 className="text-[17px] font-bold text-[#0B1F4D]">
                                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                    </h3>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={handlePrevMonth}
                                            className="hover:bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full transition-colors border border-gray-100 shadow-sm"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={handleNextMonth}
                                            className="hover:bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full transition-colors border border-gray-100 shadow-sm"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-7 gap-y-1 text-center">
                                    {['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].map(day => (
                                        <span key={day} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{day}</span>
                                    ))}
                                    
                                    {/* Offset days from previous month */}
                                    {daysOffset.map(d => (
                                        <span key={`off-${d}`} className="text-[14px] font-medium text-gray-300 flex items-center justify-center h-9 opacity-50">{d}</span>
                                    ))}
                                    
                                    {/* Active month days */}
                                    {monthDays.map(d => {
                                        const isSelected = selectedDay === d && currentDate.getMonth() === 9 && currentDate.getFullYear() === 2023;
                                        const isClinicDay = d === 15 && currentDate.getMonth() === 9 && currentDate.getFullYear() === 2023; 
                                        
                                        return (
                                            <div 
                                                key={d} 
                                                onClick={() => setSelectedDay(d)}
                                                className={`
                                                    text-[14.5px] font-semibold h-9 w-9 mx-auto cursor-pointer rounded-full 
                                                    transition-all duration-200 ease-in-out flex items-center justify-center
                                                    ${isSelected 
                                                        ? 'bg-[#0B1F4D] text-white shadow-md' 
                                                        : isClinicDay 
                                                            ? 'bg-[#93f2f2] text-[#0B1F4D] hover:bg-[#bbf7f7]' 
                                                            : 'text-[#0B1F4D] hover:bg-[#F1F5F9] font-medium'}
                                                `}
                                                >
                                                {d}
                                            </div>
                                        );
                                    })}

                                    {/* Trailing days from next month to keep 6 rows always */}
                                    {nextMonthDays.map(d => (
                                        <span key={`next-${d}`} className="text-[14px] font-medium text-gray-300 flex items-center justify-center h-9 opacity-50">{d}</span>
                                    ))}
                                </div>

                                {/* Calendar Legend */}
                                <div className="mt-4 flex gap-4 px-1">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#0B1F4D]"></div>
                                        <span className="text-[11px] font-semibold text-gray-500">Online</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#93f2f2]"></div>
                                        <span className="text-[11px] font-semibold text-gray-500">Clinic</span>
                                    </div>
                                </div>
                            </section>

                            {/* Recommended Doctors */}
                            <section className="bg-white rounded-[24px] p-5 shadow-lg">
                                <h3 className="text-[18px] font-medium text-[#0B1F4D] mb-4">Recommended</h3>
                                
                                <div className="space-y-3 mb-6">
                                    {recommendedDoctors.map((doc) => (
                                        <div key={doc.id} className="bg-[#F8FAFC] border border-[#EDF2F7] rounded-[20px] p-3.5 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-[12px] overflow-hidden border border-white shadow-sm flex-shrink-0">
                                                <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-[14px] font-medium text-[#0B1F4D]">{doc.name}</h4>
                                                <p className="text-[10px] text-gray-400 font-medium">{doc.specialty}</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <svg className="w-3 h-3 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span className="text-[11px] font-medium text-[#0B1F4D]">{doc.rating}</span>
                                                    <button className="ml-auto text-[11px] font-medium text-[#0B1F4D] flex items-center gap-1 hover:underline">
                                                        Book Now
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full py-3 bg-[#D7E2E4]/40 hover:bg-[#D7E2E4]/60 rounded-xl text-[14px] font-medium text-[#0B1F4D] transition-colors">
                                    Find more specialists
                                </button>
                            </section>
                        </div>
                    </div>
                </main>

                {/* ── FAB ── */}
                <button
                    className="fixed bottom-[32px] right-[32px] w-[60px] h-[60px] rounded-full bg-[#1a3048] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border-4 border-white/20"
                >
                    <svg className="w-[30px] h-[30px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m-8-8h16" />
                    </svg>
                </button>
            </div>

            {/* Modals - same logic as dashboard */}
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
        </div>
    );
};

export default Appointment;

