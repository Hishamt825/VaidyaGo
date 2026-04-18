import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Patient_sidebar';
import Profile from './Profile';
import Account from './Account';
import Notification from './notification';
import phImg from '../../assets/ph.png';

const Reminder1 = () => {
    const [active, setActive] = useState('Reminder');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null); // 'profile' | 'account' | null
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const navigate = useNavigate();

    const timeSlots = [
        {
            time: 'Morning',
            label: '08:00 AM',
            meds: [
                { name: 'Amoxicillin', desc: '500mg • After Food', taken: true },
                { name: 'Vitamin D3', desc: '2000 IU • Daily', taken: true }
            ]
        },
        {
            time: 'Afternoon',
            label: '01:00 PM',
            meds: [
                { name: 'Lisinopril', desc: '10mg • Heart Health', taken: true }
            ]
        },
        {
            time: 'Evening',
            label: '07:00 PM',
            meds: [],
            emptyLabel: 'No doses scheduled'
        },
        {
            time: 'Night',
            label: '10:00 PM',
            meds: [
                { name: 'Melatonin', desc: '5mg • Sleep Support', taken: false }
            ]
        }
    ];

    const weeklyData = [
        { day: 'MON', val: 60, active: true },
        { day: 'TUE', val: 75, active: true },
        { day: 'WED', val: 90, active: true },
        { day: 'THU', val: 85, active: true },
        { day: 'FRI', val: 95, active: true },
        { day: 'SAT', val: 10, active: false },
        { day: 'SUN', val: 0, active: false }
    ];

    return (
        <div className="flex h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>

            <Sidebar active={active} setActive={setActive} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Top Navbar */}
                <header className="h-[76px] flex items-center justify-between px-[24px] md:px-[48px] shrink-0 border-b border-white/5 mb-[8px]">
                    <div className="flex-1 max-w-[280px]">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search medications..."
                                className="w-full bg-white/10 border border-white/10 rounded-full py-[10px] px-[20px] text-white placeholder-white/40 text-[12px] outline-none focus:ring-2 focus:ring-[#6ED4D4]/50 transition-all font-medium"
                            />
                            <svg className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex items-center gap-[32px]">
                        <span className="text-white/80 hover:text-white text-[13px] font-medium hidden md:block cursor-pointer transition-colors">Language</span>
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

                <main className="flex-1 w-full max-w-[1440px] mx-auto px-[20px] md:px-[48px] pt-[12px] pb-[64px] overflow-y-auto">

                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-[24px]">
                        <div>
                            <h1 className="text-[30px] font-semibold text-white leading-tight tracking-tight mb-[4px]">
                                Daily Medication Schedule
                            </h1>
                            <p className="text-white/70 text-[16px] font-medium tracking-wide">
                                Today is Monday, Oct 23rd
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/Reminder')}
                            className="flex items-center gap-[10px] bg-[#1a7785] hover:bg-[#125863] text-white px-[24px] py-[14px] rounded-full font-medium text-[16px] transition-all shadow-lg shadow-[#1a7785]/20"
                        >
                            <span className="text-[20px] leading-none mb-[2px]">+</span> Add Reminder
                        </button>
                    </div>

                    {/* Time Slots Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-[20px]">
                        {timeSlots.map((slot, idx) => (
                            <div key={idx} className="bg-white/20 backdrop-blur-md rounded-[28px] p-[20px] border border-white/10 flex flex-col min-h-[260px] shadow-sm">
                                <div className="flex items-center justify-between mb-[24px]">
                                    <span className="text-[16px] font-medium text-[#14424B]">{slot.time}</span>
                                    <span className="bg-white/90 text-[#14424B] px-[10px] py-[4px] rounded-full text-[11px] font-medium tracking-wider uppercase">{slot.label}</span>
                                </div>

                                <div className="flex flex-col gap-[12px] flex-1">
                                    {slot.meds.length > 0 ? (
                                        slot.meds.map((med, mIdx) => (
                                            <div key={mIdx} className="bg-white rounded-[20px] p-[16px] flex items-center justify-between shadow-sm border border-white/40">
                                                <div>
                                                    <h3 className="text-[16px] font-medium text-[#0D1C2E] mb-[2px]">{med.name}</h3>
                                                    <p className="text-[12px] text-[#627382] font-medium">{med.desc}</p>
                                                </div>
                                                <div className={`w-[24px] h-[24px] rounded-full flex items-center justify-center border-[2px] ${med.taken ? 'bg-[#1a7785] border-[#1a7785] text-white' : 'border-gray-200 text-transparent'}`}>
                                                    <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8">
                                            <p className="text-[#14424B] text-[16px] font-medium opacity-60 italic leading-relaxed">
                                                {slot.emptyLabel}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Refill Alerts & Upcoming Dose */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-[32px] items-start mt-[40px]">

                        {/* Refill Alerts */}
                        <div className="flex flex-col gap-[24px]">
                            <h2 className="text-[20px] font-medium text-white px-2">Refill Alerts</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                                <div className="bg-white rounded-[28px] p-[16px] flex items-center gap-[20px] shadow-[0_12px_32px_rgba(0,0,0,0.06)] border border-white">
                                    <div className="w-[64px] h-[64px] rounded-2xl bg-[#FFE5E5] flex items-center justify-center text-[#E5484D] shrink-0">
                                        <svg className="w-[28px] h-[28px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-[16px] font-medium text-[#0D1C2E]">Amoxicillin</h3>
                                        <p className="text-[16px] font-medium text-[#E5484D]">3 pills left</p>
                                    </div>
                                    <button className="bg-[#1a7785] hover:bg-[#125863] text-white px-[20px] py-[10px] rounded-full font-medium text-[16px] transition-all">Refill</button>
                                </div>
                                <div className="bg-white rounded-[28px] p-[16px] flex items-center gap-[20px] shadow-[0_12px_32px_rgba(0,0,0,0.06)] border border-white">
                                    <div className="w-[64px] h-[64px] rounded-2xl bg-[#DFEEF0] flex items-center justify-center text-[#1A7785] shrink-0">
                                        <svg className="w-[28px] h-[28px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-[16px] font-medium text-[#0D1C2E]">Lisinopril</h3>
                                        <p className="text-[16px] font-medium text-[#627382]">7 pills left</p>
                                    </div>
                                    <button className="bg-[#1a7785] hover:bg-[#125863] text-white px-[20px] py-[10px] rounded-full font-medium text-[16px] transition-all">Refill</button>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Dose Side Panel */}
                        <div className="bg-[#0B1423] rounded-[32px] p-[22px] text-white shadow-[0_24px_60px_rgba(0,0,0,0.2)] flex flex-col">
                            <div className="flex items-center gap-[10px] mb-[20px]">
                                <div className="w-[34px] h-[34px] rounded-lg bg-[#1A7785] flex items-center justify-center text-white">
                                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-[12px] font-normal tracking-tight uppercase tracking-[0.2em] text-white/30">Upcoming Dose</h2>
                            </div>
 
                             <div className="flex flex-col items-center justify-center mb-[14px] py-1">
                                <span className="text-[44px] font-bold leading-none mb-[2px] tracking-tight">42:15</span>
                                <span className="text-[12px] font-light text-white/20 uppercase tracking-[0.2em]">Minutes remaining</span>
                            </div>
 
                            <div className="bg-white/5 rounded-[20px] p-[16px] mb-[20px] border border-white/5">
                                <p className="text-white/20 text-[9px] font-light uppercase tracking-widest mb-[4px]">Next medicine</p>
                                <h3 className="text-[17px] font-normal mb-[2px]">Lisinopril • 10mg</h3>
                                <div className="flex items-center gap-[6px] text-[#A4EFEF]/60">
                                    <svg className="w-[12px] h-[12px]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-[12px] font-light">01:00 PM (Today)</span>
                                </div>
                            </div>
 
                            <button className="w-full bg-[#1A7785] hover:bg-[#208a99] text-[#0B1423] py-[14px] rounded-[16px] font-medium text-[13px] uppercase tracking-widest transition-all shadow-lg hover:shadow-[#1A7785]/20">
                                I'm taking it now
                            </button>
                        </div>
                    </div>

                    {/* Weekly Insight Bottom Card */}
                    <div className="bg-white rounded-[32px] p-[24px] md:p-[28px] shadow-[0_12px_32px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center gap-[32px] mt-[40px] border border-gray-50">
                        <div className="flex-1">
                            <span className="text-[#1A7785] text-[10px] font-semibold uppercase tracking-[0.25em] mb-[8px] block px-1">Weekly Insight</span>
                            <h2 className="text-[24px] font-bold text-[#0D1C2E] mb-[12px]">You're on a 12-day streak!</h2>
                            <p className="text-[#627382] text-[14px] font-normal leading-relaxed max-w-[480px]">
                                Consistency is key to recovery. You haven't missed a dose of Amoxicillin since starting your course. Keep it up for 2 more days to complete the cycle.
                            </p>
                        </div>

                        {/* Custom SVG Bar Chart */}
                        <div className="w-full md:w-[380px] bg-white rounded-[28px] p-[28px] shadow-[0_8px_24px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col gap-[20px]">
                            <div className="flex items-end justify-between h-[110px] px-[8px]">
                                {weeklyData.map((d, i) => (
                                    <div key={i} className={`flex flex-col items-center gap-[12px] group relative h-full justify-end px-1 ${d.day === 'SAT' ? 'relative' : ''}`}>
                                        {/* Highlight Box for Saturday */}
                                        {d.day === 'SAT' && (
                                            <div className="absolute inset-y-[-8px] inset-x-[-4px] bg-[#1A7785]/5 border border-[#1A7785]/10 rounded-lg -z-0" />
                                        )}
                                        
                                        <div 
                                            className={`w-[16px] rounded-full transition-all duration-700 cursor-pointer relative z-10 ${d.active ? 'bg-[#1A7785] group-hover:bg-[#125863]' : d.val > 0 ? 'bg-[#8BBCC2]' : 'bg-[#EAEFF2]'}`} 
                                            style={{ height: d.val ? `${d.val}%` : '8px' }}
                                        >
                                            <div className="absolute -top-[30px] left-1/2 -translate-x-1/2 bg-[#0D1C2E] text-white text-[10px] font-medium py-[4px] px-[8px] rounded-md opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                                                {d.val}%
                                            </div>
                                        </div>
                                        <span className={`text-[10px] font-bold z-10 uppercase transition-colors ${d.day === 'SAT' ? 'text-[#1A7785]' : 'text-[#94A3B8]'}`}>
                                            {d.day}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </main>
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
        </div>
    );
};

export default Reminder1;

