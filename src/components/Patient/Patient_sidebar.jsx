import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUrl from '../../assets/vadyago_pat.png';
import visulImg from '../../assets/Visual.png';
import Selectexercise from './Exercise/Selectexercise';

/* ─────────────────────────────────────────────
   MENU ITEMS
───────────────────────────────────────────── */
const MENU = [
    {
        name: 'Dashboard',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" rx="1.5" strokeWidth="2" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" strokeWidth="2" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" strokeWidth="2" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" strokeWidth="2" />
            </svg>
        ),
    },
    {
        name: 'Symptom Checker',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        name: 'Vitals',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
    },
    {
        name: 'Medications',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="2" />
                <path d="M8 5V3h8v2M12 10v4m-2-2h4" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: 'Appointments',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
                <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: 'Messages',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        ),
    },
    {
        name: 'Reminder',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        name: 'My Record',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V5a2 2 0 012-2h4l2 2h4a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2z" />
            </svg>
        ),
    },
    {
        name: 'Exercise',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
];

/* ─────────────────────────────────────────────
   SIDEBAR COMPONENT
───────────────────────────────────────────── */
const Sidebar = ({ active, setActive, isMobileOpen, setIsMobileOpen }) => {
    const navigate = useNavigate();
    const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);

    return (
        <>
            {/* Mobile overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] lg:hidden animate-in fade-in duration-300"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <aside
                className={`
        fixed lg:static inset-y-0 left-0 z-[110]
        w-[220px] flex flex-col justify-start
        transition-transform duration-300 ease-in-out border-r border-white/5
        ${isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        bg-[#0B1423]/15 backdrop-blur-2xl
      `}
            >
                {/* Logo Area - Aligned with Header Height (72px) */}
                <div className="h-[72px] flex items-center px-6 mb-2 cursor-pointer" onClick={() => navigate('/Patient_dashboard')}>
                    <img src={logoUrl} alt="VaidyaGo" className="w-[110px] h-auto object-contain brightness-[1.1]" />
                </div>

                {/* Nav Items */}
                <nav className="flex-1 flex flex-col gap-1 px-4 overflow-y-auto custom-scrollbar">
                    {MENU.map((item) => {
                        const isActive = active === item.name;
                        return (
                            <button
                                key={item.name}
                                onClick={() => {
                                    setActive(item.name);
                                    setIsMobileOpen(false);
<<<<<<< HEAD
                                    if (item.name === 'Symptom Checker') navigate('/Body');
                                    else if (item.name === 'Dashboard') navigate('/Patient_dashboard');
=======
                                    if (item.name === 'Symptom Checker') navigate('/Symptom');
                                    else if (item.name === 'Dashboard') {
                                        const uploaded = localStorage.getItem('prescriptionUploaded');
                                        if (uploaded === 'true') navigate('/Patient_dashboard1');
                                        else navigate('/Patient_dashboard');
                                    }
>>>>>>> adiba
                                    else if (item.name === 'Vitals') navigate('/Vitals');
                                    else if (item.name === 'Appointments') navigate('/Appointment');
                                    else if (item.name === 'Medications') navigate('/Medication');
                                    else if (item.name === 'Reminder') navigate('/Reminder1');
                                    else if (item.name === 'Messages') navigate('/Message');
                                    else if (item.name === 'My Record') navigate('/Record');
                                    else if (item.name === 'Exercise') setIsExerciseModalOpen(true);
                                }}
                                className={`
                                    relative group
                                    w-full flex items-center gap-3.5 px-5 py-3 rounded-2xl
                                    text-[14.5px] font-medium text-left transition-all duration-300
                                    ${isActive
                                        ? 'bg-gradient-to-br from-[#49AAB3] to-[#1A7785] text-white shadow-lg shadow-[#1A7785]/20'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }
                                `}
                            >
                                {isActive && (
                                    <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-[4px] h-[24px] bg-[#6ED4D4] rounded-r-full shadow-[0_0_12px_#6ED4D4]" />
                                )}
                                <span className={`shrink-0 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
                                    {item.icon}
                                </span>
                                <span className="tracking-tight">{item.name}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Consultation CTA */}
                <div className="px-5 py-4">
                    <button
                        onClick={() => navigate('/Consultation1')}
                        className="w-full flex items-center justify-center gap-2 bg-white hover:bg-white/90
                                   text-[#16879B] text-[14px] font-bold py-3 rounded-full
                                   transition-all duration-300 shadow-xl active:scale-[0.98]"
                    >
                        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        New Consultation
                    </button>
                </div>


            </aside>
            {isExerciseModalOpen && <Selectexercise onClose={() => setIsExerciseModalOpen(false)} />}
        </>
    );
};

export default Sidebar;
