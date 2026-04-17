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

const Ptatient_rem = () => {
    const [active, setActive] = useState('Appointments');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null); // 'profile' | 'account' | null
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const navigate = useNavigate();

    const [selectedDay, setSelectedDay] = useState(12);
    const daysOffset = [25, 26, 27, 28, 29, 30];
    const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);

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
            className="flex min-h-screen w-full font-sans text-white"
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
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar">
                {/* ── Top Header ── */}
                <header className="h-[70px] flex items-center justify-between px-[20px] md:px-[32px] shrink-0">
                    {/* Hamburger (mobile only) */}
                    <button
                        onClick={() => setIsMobileOpen(true)}
                        className="w-[34px] h-[34px] rounded-[8px] flex flex-col items-center justify-center gap-[4px]
                        hover:bg-white/10 transition-colors lg:hidden mr-3"
                    >
                        <span className="w-[15px] h-[1.8px] bg-white rounded-full" />
                        <span className="w-[15px] h-[1.8px] bg-white rounded-full opacity-70" />
                        <span className="w-[15px] h-[1.8px] bg-white rounded-full" />
                    </button>

                    {/* Search */}
                    <div className="relative w-full max-w-[450px] hidden sm:block">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search appointments or doctors..."
                            className="w-full pl-[44px] pr-4 py-[10px] bg-white/10 border border-white/20 rounded-full
                            text-[14px] text-white placeholder-white/50 outline-none focus:bg-white/15 transition-all"
                        />
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-[24px] ml-auto">
                         {/* Globe icon */}
                         <button className="text-white/80 hover:text-white transition-colors">
                            <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18" />
                            </svg>
                        </button>

                        {/* Bell */}
                        <button onClick={() => setIsNotificationOpen(true)} className="relative text-white/80 hover:text-white transition-colors">
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0B1F4D]"></div>
                            <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>

                        {/* Settings */}
                        <button onClick={() => navigate('/Setting')} className="text-white/80 hover:text-white transition-colors">
                            <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>

                        {/* Avatar */}
                        <div 
                            onClick={() => setActiveModal('profile')}
                            className="w-[38px] h-[38px] rounded-full border-2 border-white/20 overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                        >
                            <img src={phImg} alt="User" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </header>

                <main className="flex-1 px-[20px] md:px-[32px] pt-[20px] pb-[40px] max-w-[1500px] mx-auto w-full">
                    {/* Page Title */}
                    <div className="mb-[32px]">
                        <h1 className="text-[32px] font-bold text-white mb-1">Your Consultations</h1>
                        <p className="text-white/60 text-[15px]">Manage your health journey with editorial precision.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-[32px]">
                        
                        {/* LEFT COLUMN */}
                        <div className="space-y-[32px]">
                            
                            {/* Upcoming Visits */}
                            <section className="bg-white rounded-[24px] p-[28px] shadow-lg">
                                <div className="flex items-center justify-between mb-[24px]">
                                    <h2 className="text-[17px] font-bold text-[#0B1F4D]">Upcoming Visits</h2>
                                    <button className="text-[14px] font-bold text-[#0B1F4D] hover:underline">View Schedule</button>
                                </div>

                                <div className="space-y-[16px]">
                                    {upcomingVisits.map((visit) => (
                                        <div key={visit.id} className="bg-[#F8FAFC] border border-[#EDF2F7] rounded-[20px] p-[20px] flex items-center justify-between">
                                            <div className="flex gap-[20px]">
                                                {/* Date box */}
                                                <div className="w-[64px] h-[64px] bg-white rounded-[16px] shadow-sm flex flex-col items-center justify-center border border-[#EDF2F7]">
                                                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">{visit.date.split(' ')[0]}</span>
                                                    <span className="text-[20px] font-black text-[#0B1F4D] leading-none">{visit.date.split(' ')[1]}</span>
                                                </div>

                                                {/* Details */}
                                                <div>
                                                    {visit.type && (
                                                        <p className="text-[10px] font-bold text-[#1a6e78] uppercase tracking-wider mb-1">{visit.type}</p>
                                                    )}
                                                    <h3 className="text-[16px] font-bold text-[#0B1F4D]">{visit.title}</h3>
                                                    <p className="text-[13px] text-[#4A5568]">{visit.doctor} • {visit.time}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-[12px]">
                                                <button className="px-[16px] py-[10px] rounded-full border border-[#D7E2E4] text-[13px] font-bold text-[#0B1F4D] hover:bg-gray-50 transition-colors">
                                                    Reschedule
                                                </button>
                                                <button className={`px-[20px] py-[10px] rounded-full text-[13px] font-bold text-white shadow-md transition-all
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
                            <section className="bg-white rounded-[24px] p-[28px] shadow-lg">
                                <h2 className="text-[20px] font-bold text-[#0B1F4D] mb-[24px]">Past Consultations</h2>
                                
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-100 uppercase">
                                                <th className="pb-4 text-[11px] font-bold text-gray-400 tracking-wider">Doctor & Specialty</th>
                                                <th className="pb-4 text-[11px] font-bold text-gray-400 tracking-wider">Date</th>
                                                <th className="pb-4 text-[11px] font-bold text-gray-400 tracking-wider">Status</th>
                                                <th className="pb-4 text-[11px] font-bold text-gray-400 tracking-wider text-right">Report</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {pastConsultations.map((item) => (
                                                <tr key={item.id} className="group">
                                                    <td className="py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-9 h-9 ${item.color} rounded-full flex items-center justify-center text-[12px] font-bold text-white shadow-sm`}>
                                                                {item.initials}
                                                            </div>
                                                            <div>
                                                                <p className="text-[14px] font-bold text-[#0B1F4D]">{item.doctor}</p>
                                                                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase font-bold">{item.specialty}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-5 text-[14px] text-gray-600">{item.date}</td>
                                                    <td className="py-5">
                                                        <div className="flex items-center gap-1.5">
                                                            <div className={`w-2 h-2 rounded-full ${item.status === 'Completed' ? 'bg-teal-500' : 'bg-red-500'}`}></div>
                                                            <span className={`text-[12px] font-bold ${item.status === 'Completed' ? 'text-teal-600' : 'text-red-600'}`}>{item.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-5 text-right">
                                                        {item.status === 'Completed' ? (
                                                            <button className="text-[13px] font-bold text-[#16879B] hover:underline flex items-center gap-1 ml-auto">
                                                                Download
                                                            </button>
                                                        ) : (
                                                            <span className="text-[13px] text-gray-300 font-medium">N/A</span>
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
                        <div className="space-y-[32px]">
                            
                            {/* Calendar */}
                            <section className="bg-white rounded-[24px] p-[28px] shadow-lg text-[#0B1F4D]">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-[17px] font-bold">October 2023</h3>
                                    <div className="flex gap-4">
                                        <button className="hover:bg-gray-100 p-1 rounded transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button className="hover:bg-gray-100 p-1 rounded transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-7 gap-y-3 text-center">
                                    {['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].map(day => (
                                        <span key={day} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{day}</span>
                                    ))}
                                    
                                    {/* Offset days */}
                                    {daysOffset.map(d => (
                                        <span key={`off-${d}`} className="text-[13px] font-medium text-gray-200 py-2">{d}</span>
                                    ))}
                                    
                                    {/* Active month days */}
                                    {monthDays.map(d => {
                                        const isSelected = selectedDay === d;
                                        const isClinicDay = d === 15; // Highlighted as 'Clinic' in design
                                        
                                        return (
                                            <div 
                                                key={d} 
                                                onClick={() => setSelectedDay(d)}
                                                className={`
                                                    text-[13px] font-bold py-2 cursor-pointer rounded-full 
                                                    transition-all duration-300 ease-in-out flex items-center justify-center
                                                    ${isSelected 
                                                        ? 'bg-[#0B1F4D] text-white shadow-md scale-105' 
                                                        : isClinicDay 
                                                            ? 'bg-[#93f2f2] text-[#0B1F4D] hover:bg-[#bbf7f7]' 
                                                            : 'text-[#0B1F4D] hover:bg-[#F1F5F9] hover:scale-105'}
                                                `}
                                            >
                                                {d}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Calendar Legend */}
                                <div className="mt-8 flex gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#0B1F4D]"></div>
                                        <span className="text-[11px] font-bold text-gray-500">Online</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#93f2f2]"></div>
                                        <span className="text-[11px] font-bold text-gray-500">Clinic</span>
                                    </div>
                                </div>
                            </section>

                            {/* Recommended Doctors */}
                            <section className="bg-white rounded-[24px] p-[28px] shadow-lg">
                                <h3 className="text-[18px] font-bold text-[#0B1F4D] mb-6">Recommended</h3>
                                
                                <div className="space-y-[16px] mb-8">
                                    {recommendedDoctors.map((doc) => (
                                        <div key={doc.id} className="bg-[#F8FAFC] border border-[#EDF2F7] rounded-[20px] p-[16px] flex items-center gap-4">
                                            <div className="w-[48px] h-[48px] rounded-[14px] overflow-hidden border border-white shadow-sm flex-shrink-0">
                                                <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-[14px] font-bold text-[#0B1F4D]">{doc.name}</h4>
                                                <p className="text-[11px] text-gray-400 font-medium">{doc.specialty}</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <svg className="w-3 h-3 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span className="text-[11px] font-bold text-[#0B1F4D]">{doc.rating}</span>
                                                    <button className="ml-auto text-[11px] font-bold text-[#0B1F4D] flex items-center gap-1 hover:underline">
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

                                <button className="w-full py-[12px] bg-[#D7E2E4]/40 hover:bg-[#D7E2E4]/60 rounded-xl text-[13px] font-bold text-[#0B1F4D] transition-colors">
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

export default Ptatient_rem;
