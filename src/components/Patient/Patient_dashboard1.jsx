import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import BASE_URL from '../../baseUrl';
import apiFetch from '../../api';
import logoUrl from '../../assets/vadyago_pat.png';
import phImg from '../../assets/ph.png';
import { useLanguage } from '../../context/LanguageContext';
import Sidebar from './Patient_sidebar';
import Profile from './Profile';
import Account from './Account';
import Notification from './notification';
import Patient_sym from './Patient_sym';
import Book from './Book';
import Upload from './Upload';
import Patient_record from './Patient_record';

const Patient_dashboard1 = () => {
    const [active, setActive] = useState('Dashboard');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { t, toggleLanguage, language } = useLanguage();

    // Modal states
    const [activeModal, setActiveModal] = useState(null); // 'profile' | 'account' | null
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isSymptomOpen, setIsSymptomOpen] = useState(false);
    const [isBookOpen, setIsBookOpen] = useState(false);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [isRecordOpen, setIsRecordOpen] = useState(false);

    // Data states
    const [todaySchedule, setTodaySchedule] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [activePrescription, setActivePrescription] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [scheduleRes, prescriptionRes, activeRes] = await Promise.all([
                apiFetch(`${BASE_URL}/today-schedule/today/`),
                apiFetch(`${BASE_URL}/api/prescriptions/`),
                apiFetch(`${BASE_URL}/api/prescriptions/active/`)
            ]);

            if (scheduleRes.ok) {
                const scheduleData = await scheduleRes.json();
                setTodaySchedule(Array.isArray(scheduleData) ? scheduleData : []);
            }
            if (prescriptionRes.ok) {
                const prescriptionData = await prescriptionRes.json();
                setPrescriptions(Array.isArray(prescriptionData) ? prescriptionData : []);
            }
            if (activeRes.ok) {
                const activeData = await activeRes.json();
                setActivePrescription(activeData);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        if (location.state?.reopenBook) {
            setIsBookOpen(true);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    return (
        <div className="flex min-h-screen w-full font-sans antialiased text-[#0D1C2E]"
            style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>
            <Sidebar active={active} setActive={setActive} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

            <div className="flex-1 flex flex-col min-w-0 min-h-screen">
                {/* Top Navbar */}
                <header className="h-[72px] flex items-center justify-between px-6 md:px-8 shrink-0 border-b border-white/5 mb-1">
                    <div className="flex items-center gap-[32px] h-full">
                        <button onClick={() => setIsMobileOpen(true)} className="lg:hidden text-white w-[34px] h-[34px] flex flex-col items-center justify-center gap-[4px]">
                            <span className="w-[18px] h-[2px] bg-white rounded-full" />
                            <span className="w-[18px] h-[2px] bg-white/70 rounded-full" />
                            <span className="w-[18px] h-[2px] bg-white rounded-full" />
                        </button>
                        <div className="hidden lg:flex items-center gap-[28px] h-full relative font-medium text-[14px]">
                            <span className="text-white relative flex h-full items-center">
                                {t('dashboard')}
                                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#6ED4D4] rounded-t-sm" />
                            </span>
                            <span 
                                onClick={() => setIsRecordOpen(true)}
                                className="text-white/60 hover:text-white cursor-pointer transition-colors h-full flex items-center"
                            >
                                {t('recordsLine')}
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 max-w-[280px]">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder={t('search')}
                                className="w-full bg-white/10 border border-white/10 rounded-full py-[10px] px-[20px] text-white placeholder-white/40 text-[12px] outline-none focus:ring-2 focus:ring-[#6ED4D4]/50 transition-all font-medium"
                            />
                            <svg className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex items-center gap-[24px]">
                        <div
                            onClick={toggleLanguage}
                            className="text-white/80 hover:text-white text-[13px] font-bold hidden md:block cursor-pointer transition-colors bg-white/10 px-3 py-1 rounded-full border border-white/10 hover:bg-white/20"
                        >
                            {language === 'English' ? 'EN' : 'HI'}
                        </div>
                        <div className="flex items-center gap-[16px]">
                            <button onClick={() => setIsNotificationOpen(true)} className="text-white flex items-center justify-center cursor-pointer hover:text-[#6ED4D4] transition-colors relative">
                                <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                {/* Notification Dot */}
                                <div className="absolute top-[2px] right-[2px] w-[6px] h-[6px] bg-[#E85B5A] rounded-full" />
                            </button>
                            <button onClick={() => navigate('/Setting')} className="text-white flex items-center justify-center cursor-pointer hover:text-[#6ED4D4] transition-colors">
                                <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                            <div
                                onClick={() => setActiveModal('profile')}
                                className="w-[36px] h-[36px] rounded-full font-medium overflow-hidden border-[2px] border-[#6ED4D4] shadow-sm cursor-pointer hover:scale-110 transition-transform"
                            >
                                <img src={phImg} alt="User Profile" className="w-full h-full object-cover bg-white" />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 md:px-8 flex flex-col gap-4 overflow-y-auto pb-[64px]">

                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-[16px]">
                        <div>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('prescriptionUploaded');
                                    navigate('/Patient_dashboard');
                                }}
                                className="flex items-center gap-2 text-[#6ED4D4] hover:text-white transition-colors text-[13px] font-bold uppercase tracking-widest mb-3 group"
                            >
                                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                                </svg>
                                {t('backToDashboard')}
                            </button>
                            <p className="text-[16px] font-medium text-white/70 tracking-[0.1em] uppercase mb-[6px]">{t('welcomeBack')}, Julian</p>
                            <h1 className="text-[24px] md:text-[30px] font-semibold text-white leading-tight tracking-[-0.01em]">{t('healthDashboard')}</h1>
                        </div>
                        <div className="flex items-center gap-[12px]">
                            {/* Heart Rate Pill */}
                            <div className="bg-[#DFEEF0] bg-opacity-[0.95] backdrop-blur-md rounded-full px-[24px] py-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex flex-col items-center justify-center">
                                <div className="text-[20px] font-[800] text-[#123E4D] leading-none mb-[2px]">98<span className="text-[16px] font-medium ml-[2px]">bpm</span></div>
                                <div className="text-[16px] font-medium text-[#4B707E] tracking-wider uppercase">{t('heartRate')}</div>
                            </div>
                            {/* Blood Pressure Pill */}
                            <div className="bg-[#DFEEF0] bg-opacity-[0.95] backdrop-blur-md rounded-full px-[24px] py-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex flex-col items-center justify-center">
                                <div className="text-[20px] font-[800] text-[#1D7489] leading-none mb-[2px]">120/80</div>
                                <div className="text-[16px] font-medium text-[#4B707E] tracking-wider uppercase">{t('bloodPressure')}</div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-[24px] w-full items-start">

                        {/* LEFT COLUMN */}
                        <div className="flex flex-col gap-[24px]">

                            {/* AI Symptom Checker */}
                            <div className="bg-white rounded-[24px] p-5 shadow-[0_12px_32px_rgba(0,0,0,0.06)] flex flex-col relative overflow-hidden min-h-[340px]">
                                <div className="flex items-center justify-between mb-4 z-10 relative">
                                    <h2 className="text-[18px] font-medium tracking-tight text-[#0D1C2E]">{t('aiSymptomChecker')}</h2>
                                    <div className="bg-[#A4EFEF] px-[12px] pt-[3px] pb-[3px] rounded-full">
                                        <span className="text-[16px] font-medium text-[#0B4A54]">{t('aiActive')}</span>
                                    </div>
                                </div>

                                <div className="relative w-full h-[56px] bg-[#F2F7F9] rounded-full border border-[#Dcebf0] px-5 flex items-center justify-between mb-4 z-10 shadow-inner">
                                    <input type="text" placeholder={t('describeFeeling')} className="bg-transparent w-full outline-none text-[15px] font-medium text-[#0D1C2E] placeholder-[#8095A6]" />
                                    <div className="w-[44px] h-[44px] bg-[#1a5b6b] rounded-full shrink-0 flex items-center justify-center shadow-md cursor-pointer hover:bg-[#154a57] transition-colors ml-[12px]">
                                        <svg className="w-[20px] h-[20px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col gap-3 mt-auto relative z-10">
                                    {/* AI Chat Bubble */}
                                    <div className="flex gap-2.5 items-start w-[85%]">
                                        <div className="w-6 h-6 bg-[#121124] rounded-full shrink-0 mt-[2px] flex items-center justify-center shadow-md">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2l2.4 7.6H22l-6.2 4.6 2.4 7.6L12 17.2 5.8 21.8l2.4-7.6L2 9.6h7.6z" />
                                            </svg>
                                        </div>
                                        <div className="bg-[#F2F7F9] rounded-[18px] rounded-tl-none p-3.5 text-[14px] text-[#425565] leading-relaxed font-medium border border-[#E1EEF2]">
                                            {activePrescription 
                                                ? `${t('aiAnalysisText1')}${activePrescription.hospital_name || 'the clinic'}${t('aiAnalysisText2')}${activePrescription.medicines?.length || 0}${t('aiAnalysisText3')}${activePrescription.medicines?.[0]?.name || 'meds'}${t('aiAnalysisText4')}`
                                                : t('aiReadyText')}
                                        </div>
                                    </div>

                                    {/* User Chat Bubble */}
                                    <div className="flex gap-[12px] items-end justify-end w-[85%] self-end">
                                        <div className="bg-[#1a5b6b] rounded-[20px] rounded-br-none p-[16px] text-[16px] text-white leading-[1.6] font-medium shadow-[0_8px_16px_rgba(26,91,107,0.2)]">
                                            {t('userChatSample')}
                                        </div>
                                        <div className="w-[28px] h-[28px] bg-[#1a5b6b] rounded-full shrink-0 mb-[4px] flex items-center justify-center shadow-md">
                                            <svg className="w-[14px] h-[14px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Specialists for You */}
                            <div className="bg-white rounded-[24px] p-5 shadow-[0_12px_32px_rgba(0,0,0,0.06)] flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-[18px] font-medium tracking-tight text-[#0D1C2E]">{t('specialistsForYou')}</h2>
                                    <button className="text-[13px] font-medium tracking-widest text-[#1D7489] hover:text-[#0b4a59] uppercase transition-colors">{t('seeAll')}</button>
                                </div>
                                <div className="flex flex-col gap-[16px]">
                                    {/* Dr. Elena */}
                                    <div className="bg-[#F8FCFD] rounded-[20px] p-[16px] flex items-center justify-between border border-[#E9F3F5] transition-all hover:bg-white hover:shadow-lg group">
                                        <div className="flex items-center gap-[16px]">
                                            <div className="w-[54px] h-[54px] rounded-full bg-[#E5F3F5] overflow-hidden border-[2px] border-white shadow-sm flex items-center justify-center pt-2">
                                                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Jessica&backgroundColor=e5f3f5" alt="Dr Elena" className="w-[46px] h-[46px]" />
                                            </div>
                                            <div>
                                                <h3 className="text-[16px] font-[800] text-[#0D1C2E]">Dr. Elena Rodriguez</h3>
                                                <p className="text-[16px] font-medium text-[#64798C] mt-[2px]">{t('cardiologistExp')}</p>
                                            </div>
                                        </div>
                                        <button className="bg-[#126478] hover:bg-[#0b4a59] text-white text-[16px] font-medium px-[20px] py-[10px] rounded-full transition-colors shadow-md">
                                            {t('bookNow')}
                                        </button>
                                    </div>

                                    {/* Dr. Marcus */}
                                    <div className="bg-[#F8FCFD] rounded-[20px] p-[16px] flex items-center justify-between border border-[#E9F3F5] transition-all hover:bg-white hover:shadow-lg group">
                                        <div className="flex items-center gap-[16px]">
                                            <div className="w-[54px] h-[54px] rounded-full bg-[#E5F3F5] overflow-hidden border-[2px] border-white shadow-sm flex items-center justify-center pt-2">
                                                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Marcus&backgroundColor=e5f3f5" alt="Dr Marcus" className="w-[46px] h-[46px]" />
                                            </div>
                                            <div>
                                                <h3 className="text-[16px] font-[800] text-[#0D1C2E]">Dr. Marcus Chen</h3>
                                                <p className="text-[16px] font-medium text-[#64798C] mt-[2px]">{t('gpExp')}</p>
                                            </div>
                                        </div>
                                        <button className="bg-[#126478] hover:bg-[#0b4a59] text-white text-[16px] font-medium px-[20px] py-[10px] rounded-full transition-colors shadow-md">
                                            {t('bookNow')}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Journey */}
                            <div className="bg-white rounded-[24px] p-6 shadow-[0_12px_32px_rgba(0,0,0,0.06)] flex flex-col relative overflow-hidden">
                                <h2 className="text-[18px] font-medium tracking-tight text-[#0D1C2E] mb-5">{t('recentJourney')}</h2>
                                <div className="flex flex-col relative pl-[40px]">
                                    {/* Line */}
                                    <div className="absolute left-[8.5px] top-[14px] bottom-[20px] w-[2px] bg-[#E1EDF0]" />

                                    {/* Step 1 */}
                                    <div className="relative mb-[32px]">
                                        <div className="absolute left-[-40px] top-[4px] w-[18px] h-[18px] rounded-full border-[4px] border-[#136173] bg-white shadow-md z-10" />
                                        <p className="text-[16px] font-medium tracking-wider text-[#8A9FB2] uppercase mb-[4px]">Today, 10:45 AM</p>
                                        <h4 className="text-[20px] font-medium text-[#0D1C2E] leading-tight mb-[6px]">{t('chatConsultation')}</h4>
                                        <p className="text-[16px] text-[#5A6F82] font-medium">{t('symptomAnalysisGenerated')}</p>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="relative">
                                        <div className="absolute left-[-40px] top-[4px] w-[18px] h-[18px] rounded-full border-[4px] border-[#D1E4E7] bg-white z-10" />
                                        <p className="text-[16px] font-medium tracking-wider text-[#8A9FB2] uppercase mb-[4px]">Oct 12, 2024</p>
                                        <h4 className="text-[20px] font-medium text-[#0D1C2E] leading-tight mb-[10px]">{t('labResultsUploaded')}</h4>
                                        <div className="inline-block bg-[#A1EDEE] px-[12px] pt-[3px] pb-[3px] rounded-full shadow-sm">
                                            <span className="text-[16px] font-medium tracking-widest text-[#0D4853] uppercase">{t('actionRequired')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="flex flex-col gap-[24px]">

                            {/* Quick Actions (2x2 Grid) */}
                            <div className="grid grid-cols-2 gap-[16px]">
                                {/* 1 */}
                                <div 
                                    onClick={() => setIsSymptomOpen(true)}
                                    className="bg-white rounded-[24px] p-[24px] shadow-[0_12px_32px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center gap-[16px] transition-transform hover:-translate-y-1 cursor-pointer min-h-[160px] group active:scale-95"
                                >
                                    <div className="w-[64px] h-[64px] rounded-full bg-[#EBF7F8] flex items-center justify-center text-[#1A7785] shadow-inner border border-[#e2f2f3] group-hover:bg-[#1A7785] group-hover:text-white transition-all">
                                        <svg className="w-[28px] h-[28px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.722 2.166a2 2 0 01-2.615 1.231l-2.166-.722a2 2 0 00-2.422 1.022l-.722 1.444a2 2 0 01-3.637-1.121l.722-1.444a2 2 0 00-.12-2.166l-1.022-1.533a2 2 0 01.32-2.615l1.533-1.022a2 2 0 00.547-2.422l-.722-2.166a2 2 0 011.121-3.637l1.444.722a2 2 0 002.166-.12l1.533-1.022a2 2 0 012.615.32l1.022 1.533a2 2 0 002.422.547l2.166-.722a2 2 0 013.637 1.121l-.722 1.444a2 2 0 001.022 2.422l1.444.722a2 2 0 01.121 3.637l-1.444.722a2 2 0 00-.547 1.022z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-[16px] font-medium text-[#0D1C2E] text-center tracking-widest uppercase leading-tight">{t('symptomLine1')}<br />{t('symptomLine2')}</h3>
                                </div>
                                {/* 2 */}
                                <div 
                                    onClick={() => setIsBookOpen(true)}
                                    className="bg-white rounded-[24px] p-[24px] shadow-[0_12px_32px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center gap-[16px] transition-transform hover:-translate-y-1 cursor-pointer min-h-[160px] group active:scale-95"
                                >
                                    <div className="w-[64px] h-[64px] rounded-full bg-[#EBF0FC] flex items-center justify-center text-[#3B66C5] shadow-inner border border-[#dfe7fc] group-hover:bg-[#3B66C5] group-hover:text-white transition-all">
                                        <svg className="w-[28px] h-[28px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-[16px] font-medium text-[#0D1C2E] text-center tracking-widest uppercase leading-tight">{t('bookLine1')}<br />{t('bookLine2')}</h3>
                                </div>
                                {/* 3 */}
                                <div
                                    onClick={() => setIsUploadOpen(true)}
                                    className="bg-white rounded-[24px] p-[24px] shadow-[0_12px_32px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center gap-[16px] transition-transform hover:-translate-y-1 cursor-pointer min-h-[160px] group active:scale-95"
                                >
                                    <div className="w-[64px] h-[64px] rounded-full bg-[#E5F8ED] flex items-center justify-center text-[#1F8D58] shadow-inner border border-[#d3f4e2] group-hover:bg-[#1F8D58] group-hover:text-white transition-all">
                                        <svg className="w-[28px] h-[28px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-[16px] font-medium text-[#0D1C2E] text-center tracking-widest uppercase leading-tight">{t('uploadLine1')}<br />{t('uploadLine2')}</h3>
                                </div>
                                {/* 4 */}
                                <div
                                    onClick={() => setIsRecordOpen(true)}
                                    className="bg-white rounded-[24px] p-[24px] shadow-[0_12px_32px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center gap-[16px] transition-transform hover:-translate-y-1 cursor-pointer min-h-[160px] group active:scale-95"
                                >
                                    <div className="w-[64px] h-[64px] rounded-full bg-[#FCF0EB] flex items-center justify-center text-[#C56C3B] shadow-inner border border-[#fcebe5] group-hover:bg-[#C56C3B] group-hover:text-white transition-all">
                                        <svg className="w-[28px] h-[28px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <h3 className="text-[16px] font-medium text-[#0D1C2E] text-center tracking-widest uppercase leading-tight">{t('recordsLine')}</h3>
                                </div>
                            </div>

                            {/* Reminders */}
                            <div className="bg-white rounded-[24px] p-5 shadow-[0_12px_32px_rgba(0,0,0,0.06)] flex flex-col relative">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-[18px] font-medium tracking-tight text-[#0D1C2E]">{t('reminders')}</h2>
                                    <div className="w-5 h-5 rounded-full bg-[#FFD6D6] flex items-center justify-center">
                                        <span className="text-[14px] font-medium text-[#E5484D]">{todaySchedule.filter(s => !s.is_taken).length}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[12px] max-h-[280px] overflow-y-auto pr-1">
                                    {isLoading ? (
                                        <p className="text-gray-400 text-sm italic">{t('loadingReminders')}</p>
                                    ) : todaySchedule.length === 0 ? (
                                        <p className="text-gray-400 text-sm italic">{t('noMedsToday')}</p>
                                    ) : (
                                        todaySchedule.map((item) => (
                                            <div key={item.id} className={`bg-[#F6FAFB] rounded-[16px] p-[16px] flex items-center justify-between border border-[#EDF5F6] ${item.is_taken ? 'opacity-60' : ''}`}>
                                                <div className="flex items-center gap-[16px]">
                                                    <div className={`w-[42px] h-[42px] rounded-[12px] shadow-sm flex items-center justify-center ${item.is_taken ? 'bg-gray-400' : 'bg-[#126478]'}`}>
                                                        <svg className="w-[20px] h-[20px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 15L15 9" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-[16px] font-[800] text-[#0D1C2E]">{item.medication_name} {item.dosage}</p>
                                                        <p className={`text-[16px] font-medium tracking-wider uppercase mt-[4px] ${item.is_taken ? 'text-gray-500' : 'text-[#126478]'}`}>
                                                            {item.frequency} • {item.time.slice(0, 5)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className={`w-[8px] h-[8px] rounded-full ${item.is_taken ? 'bg-gray-300' : 'bg-[#1e8f85] shadow-[0_0_8px_rgba(30,143,133,0.5)]'}`} />
                                            </div>
                                        ))
                                    )}

                                    {/* Hydration (Static but kept for aesthetic) */}
                                    <div className="bg-[#F6FAFB] rounded-[16px] p-[16px] flex items-center justify-between border border-[#EDF5F6]">
                                        <div className="flex items-center gap-[16px]">
                                            <div className="w-[42px] h-[42px] bg-[#DCEEEF] rounded-[12px] border border-[#CAE6E8] flex items-center justify-center">
                                                <svg className="w-[20px] h-[20px] text-[#126478]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S12 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-[16px] font-[800] text-[#0D1C2E]">{t('hydrationGoal')}</p>
                                                <p className="text-[16px] font-medium tracking-wider text-[#5A6F82] uppercase mt-[4px]">Every 2 Hours</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Prescription Vault */}
                            <div className="bg-white rounded-[24px] p-5 shadow-[0_12px_32px_rgba(0,0,0,0.06)] flex flex-col">
                                <h2 className="text-[18px] font-medium tracking-tight text-[#0D1C2E] mb-4">{t('prescriptionVault')}</h2>

                                {/* Upload Box */}
                                <label className="border-[2px] border-dashed border-[#C5DCE0] bg-[#F9FCFE] rounded-[20px] p-6 flex flex-col items-center justify-center mb-4 cursor-pointer hover:bg-[#F2F8FA] hover:border-[#126478] transition-colors gap-2">
                                    <input type="file" className="hidden" accept=".pdf, .jpg, .jpeg, .png" onChange={async (e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            const file = e.target.files[0];
                                            const formData = new FormData();
                                            if (file.type.startsWith('image/')) {
                                                formData.append('image', file);
                                            } else {
                                                formData.append('file', file);
                                            }

                                            const token = localStorage.getItem('token') || localStorage.getItem('access');
                                            try {
                                                const response = await fetch(`${BASE_URL}/api/prescriptions/upload/`, {
                                                    method: 'POST',
                                                    headers: {
                                                        'Authorization': `Bearer ${token}`,
                                                    },
                                                    body: formData,
                                                });

                                                if (response.ok) {
                                                    console.log("Upload successful");
                                                    // Optionally refresh the list or show success
                                                    window.location.reload(); 
                                                } else {
                                                    console.error('Upload failed');
                                                }
                                            } catch (error) {
                                                console.error('Error:', error);
                                            }
                                        }
                                    }} />
                                    <div className="w-10 h-10 rounded-full bg-[#E1EFF2] flex items-center justify-center text-[#1A778B] shadow-inner mb-0.5">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                    </div>
                                    <h4 className="text-[16px] font-medium text-[#0D1C2E]">{t('uploadNewPrescription')}</h4>
                                    <p className="text-[16px] font-medium text-[#7D91A1] uppercase tracking-wider">{t('pdfJpgPng')}</p>
                                </label>

                                {/* Files Grid */}
                                <div className="grid grid-cols-2 gap-[12px] max-h-[200px] overflow-y-auto pr-1">
                                    {isLoading ? (
                                        <p className="text-gray-400 text-sm italic col-span-2">{t('loadingVault')}</p>
                                    ) : prescriptions.length === 0 ? (
                                        <p className="text-gray-400 text-sm italic col-span-2">{t('vaultEmpty')}</p>
                                    ) : (
                                        prescriptions.map((p) => (
                                            <div key={p.id} className="border border-[#E4EDEF] bg-white rounded-[12px] p-[12px] flex items-center gap-[12px] shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                                <div className={`w-[36px] h-[36px] rounded-[8px] flex items-center justify-center shrink-0 ${p.file ? 'bg-[#FFF0F0]' : 'bg-[#F2F4FE]'}`}>
                                                    {p.file ? (
                                                        <svg className="w-[18px] h-[18px] text-[#E5484D]" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-2 16H8v-2h4v2zm0-4H8v-2h4v2zm2-5V3.5L18.5 9H14z" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-[18px] h-[18px] text-[#4F69E9]" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[16px] font-medium text-[#0D1C2E] truncate">{p.doctor_name || 'Prescription'}</p>
                                                    <p className="text-[16px] text-[#8095A6] font-medium mt-[2px]">{p.prescription_date || (p.created_at ? p.created_at.slice(0, 10) : '')}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
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
            {isSymptomOpen && <Patient_sym onClose={() => setIsSymptomOpen(false)} />}
            {isBookOpen && <Book onClose={() => setIsBookOpen(false)} />}
            {isUploadOpen && <Upload onClose={() => setIsUploadOpen(false)} />}
            {isRecordOpen && <Patient_record onClose={() => setIsRecordOpen(false)} />}
        </div>
    );
};

export default Patient_dashboard1;
