import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

import { AnimatePresence, motion } from 'framer-motion';
import logoUrl from '../../assets/vadyago_pat.png';
import visulImg from '../../assets/Visual.png';
import Selectexercise from './Exercise/Selectexercise';
import Chat from './Chat_bot/chat';

/* ─────────────────────────────────────────────
   MENU ITEMS
───────────────────────────────────────────── */
const MENU = [
    {
        name: 'Dashboard',
        key: 'dashboard',
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
        key: 'symptomChecker',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        name: 'Vitals',
        key: 'yourVitals',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
    },
    {
        name: 'Medications',
        key: 'medications',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="2" />
                <path d="M8 5V3h8v2M12 10v4m-2-2h4" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: 'Appointments',
        key: 'appointments',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
                <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: 'Messages',
        key: 'messages',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        ),
    },
    {
        name: 'Reminder',
        key: 'reminder',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        name: 'My Record',
        key: 'myRecord',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V5a2 2 0 012-2h4l2 2h4a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2z" />
            </svg>
        ),
    },
    {
        name: 'Exercise',
        key: 'exercise',
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
    const location = useLocation();
    const { t, toggleLanguage, language } = useLanguage();
    const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [showSymptomPopup, setShowSymptomPopup] = useState(false);
    const [showMedicationPopup, setShowMedicationPopup] = useState(false);
    const [popupTop, setPopupTop] = useState(0);
    const [medicationPopupTop, setMedicationPopupTop] = useState(0);
    const symptomButtonRef = useRef(null);
    const medicationButtonRef = useRef(null);

    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (symptomButtonRef.current && !symptomButtonRef.current.contains(event.target)) {
                setShowSymptomPopup(false);
            }
            if (medicationButtonRef.current && !medicationButtonRef.current.contains(event.target)) {
                setShowMedicationPopup(false);
            }
        };
        if (showSymptomPopup || showMedicationPopup) {
            window.addEventListener('click', handleClickOutside);
        }
        return () => window.removeEventListener('click', handleClickOutside);
    }, [showSymptomPopup, showMedicationPopup]);

    // List of paths that belong to the "Symptom Checker" section
    const SYMPTOM_CHECKER_PATHS = [
        '/Body', '/Diagnostic', '/Diagnosticinput', '/Cervicogenic', '/Dseasonal',
        '/Tthdiagnostic', '/NeckAlignment', '/MUSCLETENSION', '/LogTriggers',
        '/Myrecord', '/PostureAnalysis', '/SteadyAscent', '/CarePlan',
        '/Stabilization', '/Phase2D', '/Phase3D', '/MaintenanceLog',
        '/RecoveryJourney', '/MonthlyReview', '/ProgressReview', '/Askspecialist',
        '/Symptom', '/Analysiscomplete', '/PostureAnalysis2'
    ];

    const MEDICATION_PATHS = ['/Medication', '/Medication1', '/medication1', '/View_request', '/Order', '/Lisinopril', '/Metformin', '/Atorvastatin', '/Amoxicillin', '/Schedule', '/Request'];

    return (
        <>
            {/* AI Chatbot Integration */}

            <AnimatePresence>
                {isChatOpen && (
                    <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
                )}
            </AnimatePresence>
            {/* Mobile overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] lg:hidden animate-in fade-in duration-300"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <aside
                className={`
        fixed lg:sticky top-0 h-screen left-0 z-[110]
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
                        let isActive = active === item.name;

                        // Force Symptom Checker to be active for its related routes
                        // but only if the user hasn't explicitly clicked something else 
                        // (handles defaults in sub-pages like Myrecord setting active="My Record")
                        const isSymptomRoute = SYMPTOM_CHECKER_PATHS.includes(location.pathname);
                        if (isSymptomRoute && (active === 'Symptom Checker' || active === 'Dashboard' || active === 'My Record' || active === '')) {
                            isActive = item.name === 'Symptom Checker';
                        }

                        const isMedicationRoute = MEDICATION_PATHS.includes(location.pathname);
                        if (isMedicationRoute && (active === 'Medications' || active === 'Dashboard' || active === '')) {
                            isActive = item.name === 'Medications';
                        }

                        return (
                                <button
                                    key={item.name}
                                    ref={
                                        item.name === 'Symptom Checker' ? symptomButtonRef : 
                                        item.name === 'Medications' ? medicationButtonRef : null
                                    }
                                    onClick={(e) => {
                                        setActive(item.name);
                                        setIsMobileOpen(false);

                                        if (item.name === 'Symptom Checker') {
                                            navigate('/Body');
                                            return;
                                        }

                                        if (item.name === 'Dashboard') {
                                            const uploaded = localStorage.getItem('prescriptionUploaded');
                                            if (uploaded === 'true') navigate('/Patient_dashboard1');
                                            else navigate('/Patient_dashboard');
                                        }
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
                                    <span className="tracking-tight">{t(item.key)}</span>

                                    {item.name === 'Symptom Checker' && (
                                        <div 
                                            className="ml-auto p-1.5 hover:bg-white/10 rounded-lg transition-colors group-hover:bg-white/10"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const rect = e.currentTarget.closest('button').getBoundingClientRect();
                                                setPopupTop(rect.top);
                                                setShowSymptomPopup(!showSymptomPopup);
                                            }}
                                        >
                                            <svg 
                                                className={`w-3.5 h-3.5 transition-transform duration-300 ${showSymptomPopup ? 'rotate-180' : ''}`} 
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    )}

                                    {item.name === 'Medications' && (
                                        <div 
                                            className="ml-auto p-1.5 hover:bg-white/10 rounded-lg transition-colors group-hover:bg-white/10"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const rect = e.currentTarget.closest('button').getBoundingClientRect();
                                                setMedicationPopupTop(rect.top);
                                                setShowMedicationPopup(!showMedicationPopup);
                                            }}
                                        >
                                            <svg 
                                                className={`w-3.5 h-3.5 transition-transform duration-300 ${showMedicationPopup ? 'rotate-180' : ''}`} 
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                        );
                    })}
                </nav>

                <AnimatePresence>
                    {showSymptomPopup && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: -10 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: -10 }}
                            className="fixed bg-[#0B1423]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[200] min-w-[190px] max-h-[300px] flex flex-col"
                            style={{ 
                                top: `${popupTop}px`,
                                left: '230px'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="px-3 py-2 border-b border-white/5 shrink-0">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{t('symptomOptions')}</span>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto no-scrollbar pr-1 mt-1">
                                <button
                                    onClick={() => {
                                        navigate('/Body');
                                        setShowSymptomPopup(false);
                                        setActive('Symptom Checker');
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:bg-white/5 transition-all text-[13.5px] font-medium"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    {t('bodyAnalyzer')}
                                </button>

                                <button
                                    onClick={() => {
                                        navigate('/Askspecialist');
                                        setShowSymptomPopup(false);
                                        setActive('Symptom Checker');
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:bg-[#1A7785]/20 hover:text-[#6ED4D4] transition-all text-[13.5px] font-medium mt-1"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#1A7785]/10 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4 text-[#6ED4D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8zm13 14v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                                        </svg>
                                    </div>
                                    {t('askSpecialist')}
                                </button>

                                <button
                                    onClick={() => {
                                        navigate('/CarePlan');
                                        setShowSymptomPopup(false);
                                        setActive('Symptom Checker');
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:bg-[#49AAB3]/20 hover:text-[#6ED4D4] transition-all text-[13.5px] font-medium mt-1"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#49AAB3]/10 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4 text-[#6ED4D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    {t('carePlan')}
                                </button>

                                <button
                                    onClick={() => {
                                        navigate('/Stabilization');
                                        setShowSymptomPopup(false);
                                        setActive('Symptom Checker');
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:bg-[#1A7785]/20 hover:text-[#6ED4D4] transition-all text-[13.5px] font-medium mt-1"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#1A7785]/10 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4 text-[#6ED4D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    {t('stabilization')}
                                </button>

                                <button
                                    onClick={() => {
                                        navigate('/ProgressReview');
                                        setShowSymptomPopup(false);
                                        setActive('Symptom Checker');
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:bg-[#49AAB3]/20 hover:text-[#6ED4D4] transition-all text-[13.5px] font-medium mt-1"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#49AAB3]/10 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4 text-[#6ED4D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    {t('progressReview')}
                                </button>

                                <button
                                    onClick={() => {
                                        navigate('/Phase2D');
                                        setShowSymptomPopup(false);
                                        setActive('Symptom Checker');
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:bg-[#1A7785]/20 hover:text-[#6ED4D4] transition-all text-[13.5px] font-medium mt-1"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#1A7785]/10 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4 text-[#6ED4D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                        </svg>
                                    </div>
                                    {t('phase2D')}
                                </button>

                                <button
                                    onClick={() => {
                                        navigate('/MonthlyReview');
                                        setShowSymptomPopup(false);
                                        setActive('Symptom Checker');
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:bg-[#49AAB3]/20 hover:text-[#6ED4D4] transition-all text-[13.5px] font-medium mt-1"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#49AAB3]/10 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4 text-[#6ED4D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    {t('monthlyReview')}
                                </button>

                                <button
                                    onClick={() => {
                                        navigate('/Phase3D');
                                        setShowSymptomPopup(false);
                                        setActive('Symptom Checker');
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:bg-[#1A7785]/20 hover:text-[#6ED4D4] transition-all text-[13.5px] font-medium mt-1"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#1A7785]/10 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4 text-[#6ED4D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                    </div>
                                    {t('phase3D')}
                                </button>

                                <button
                                    onClick={() => {
                                        navigate('/MaintenanceLog');
                                        setShowSymptomPopup(false);
                                        setActive('Symptom Checker');
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:bg-[#49AAB3]/20 hover:text-[#6ED4D4] transition-all text-[13.5px] font-medium mt-1"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#49AAB3]/10 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4 text-[#6ED4D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2zM9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    {t('maintenanceLog')}
                                </button>

                                <button
                                    onClick={() => {
                                        navigate('/RecoveryJourney');
                                        setShowSymptomPopup(false);
                                        setActive('Symptom Checker');
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:bg-[#1A7785]/20 hover:text-[#6ED4D4] transition-all text-[13.5px] font-medium mt-1"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#1A7785]/10 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4 text-[#6ED4D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    </div>
                                    {t('recoveryJourney')}
                                </button>

                                <button
                                    onClick={() => {
                                        navigate('/NeckAlignment');
                                        setShowSymptomPopup(false);
                                        setActive('Symptom Checker');
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:bg-[#49AAB3]/20 hover:text-[#6ED4D4] transition-all text-[13.5px] font-medium mt-1"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#49AAB3]/10 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4 text-[#6ED4D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    {t('neckAlignment')}
                                </button>

                                <button
                                    onClick={() => {
                                        navigate('/PostureAnalysis');
                                        setShowSymptomPopup(false);
                                        setActive('Symptom Checker');
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:bg-[#1A7785]/20 hover:text-[#6ED4D4] transition-all text-[13.5px] font-medium mt-1"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#1A7785]/10 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4 text-[#6ED4D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    {t('postureAnalysis')}
                                </button>

                                <button
                                    onClick={() => {
                                        navigate('/Analysiscomplete');
                                        setShowSymptomPopup(false);
                                        setActive('Symptom Checker');
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:bg-[#49AAB3]/20 hover:text-[#6ED4D4] transition-all text-[13.5px] font-medium mt-1"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#49AAB3]/10 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4 text-[#6ED4D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    {t('analysisComplete')}
                                </button>

                                <button
                                    onClick={() => {
                                        navigate('/PostureAnalysis2');
                                        setShowSymptomPopup(false);
                                        setActive('Symptom Checker');
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:bg-[#1A7785]/20 hover:text-[#6ED4D4] transition-all text-[13.5px] font-medium mt-1"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#1A7785]/10 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4 text-[#6ED4D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-1.17-15.696A9 9 0 003 9h9l1.106-2.212a2 2 0 000-1.788L12 3m0 0a9 9 0 0110.457 12.043M12 3v10m6 7l-6-2-6 2" />
                                        </svg>
                                    </div>
                                    {t('postureAnalysis2')}
                                </button>
                            </div>
                        </motion.div>
                    )}
                    {showMedicationPopup && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: -10 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: -10 }}
                            className="fixed bg-[#0B1423]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[200] min-w-[190px] max-h-[300px] flex flex-col"
                            style={{ 
                                top: `${medicationPopupTop}px`,
                                left: '230px'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="px-3 py-2 border-b border-white/5 shrink-0">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{t('medicationOptions')}</span>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto no-scrollbar pr-1 mt-1">
                                <button
                                    onClick={() => {
                                        navigate('/View_request');
                                        setShowMedicationPopup(false);
                                        setActive('Medications');
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:bg-white/5 transition-all text-[13.5px] font-medium"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                    {t('viewRequest')}
                                </button>

                                <button
                                    onClick={() => {
                                        navigate('/Order');
                                        setShowMedicationPopup(false);
                                        setActive('Medications');
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:bg-[#1A7785]/20 hover:text-[#6ED4D4] transition-all text-[13.5px] font-medium mt-1"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#1A7785]/10 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4 text-[#6ED4D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>
                                    {t('order')}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

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
                        {t('newConsultation')}
                    </button>
                </div>


                {/* Language Switcher */}
                <div className="px-5 py-2 border-t border-white/5 mt-auto mb-4">
                    <button
                        onClick={toggleLanguage}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl
                                   text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300"
                    >
                        <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 11.37 9.183 16.518 5 20" />
                        </svg>
                        <span className="text-[14px] font-medium">{language === 'English' ? 'English' : 'Hindi'}</span>
                    </button>
                </div>

            </aside>
            {isExerciseModalOpen && <Selectexercise onClose={() => setIsExerciseModalOpen(false)} />}
        </>
    );
};

export default Sidebar;
