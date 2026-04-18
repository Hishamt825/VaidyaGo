import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Patient_sidebar';
import Profile from './Profile';
import Account from './Account';
import Notification from './notification';
import phImg from '../../assets/ph.png';
import tipImg from '../../assets/medication_tip.png';

/* ─────────────────────────────────────────────
   REUSABLE COMPONENTS
───────────────────────────────────────────── */

const TimeButton = ({ label, icon, active, onClick }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-[10px] px-[24px] py-[13px] rounded-full text-[16px] font-medium transition-all ${
            active 
            ? 'bg-[#A9F1F1] text-[#0B1F4D] shadow-md scale-105' 
            : 'bg-[#EAEFF2] text-[#627382] hover:bg-[#dfe4e7]'
        }`}
    >
        {icon}
        {label}
    </button>
);

const FormSection = ({ title, icon, children }) => (
    <div className="mb-[24px]">
        <div className="flex items-center gap-[10px] mb-[16px]">
            <div className="w-[32px] h-[32px] rounded-full bg-[#A9F1F1] flex items-center justify-center text-[#0B1F4D]">
                {icon}
            </div>
            <h3 className="text-[18px] font-medium tracking-tight text-[#0D1C2E]">{title}</h3>
        </div>
        {children}
    </div>
);

const InputField = ({ label, placeholder, type = "text", value, onChange }) => (
    <div className="flex-1">
        <p className="text-[#627382] text-[11px] font-semibold uppercase tracking-[0.15em] mb-[6px] ml-[4px]">{label}</p>
        <input 
            type={type}
            placeholder={placeholder}
            className="w-full bg-[#EAEFF2] border-none rounded-[12px] px-[16px] py-[12px] text-[#0D1C2E] placeholder-[#94A3B8] text-[15px] font-medium outline-none focus:ring-2 focus:ring-[#A9F1F1] transition-all"
            value={value}
            onChange={onChange}
        />
    </div>
);

/* ─────────────────────────────────────────────
   MAIN MEDICATION PAGE
───────────────────────────────────────────── */

const Reminder = () => {
    const [active, setActive] = useState('Reminder');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null); // 'profile' | 'account' | null
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    // Form states
    const [times, setTimes] = useState(['Morning']);

    const toggleTime = (time) => {
        if (times.includes(time)) {
            setTimes(times.filter(t => t !== time));
        } else {
            setTimes([...times, time]);
        }
    };

    return (
        <div 
            className="flex h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}
        >
            {/* Sidebar */}
            <Sidebar 
                active={active} 
                setActive={setActive} 
                isMobileOpen={isMobileOpen} 
                setIsMobileOpen={setIsMobileOpen} 
            />

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                
                {/* Header Navbar */}
                <header className="h-[76px] flex items-center justify-between px-[24px] md:px-[48px] shrink-0 border-b border-white/5 mb-[8px] z-20">
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

                <main className="flex-1 px-[20px] md:px-[60px] pt-[12px] pb-[64px] overflow-y-auto">
                    
                    {/* Page Title & Breadcrumbs */}
                    <div className="mb-[32px]">
                        <div className="flex items-center gap-[8px] text-white/60 font-medium text-[16px] uppercase tracking-[0.2em] mb-[12px]">
                            <span>Medications</span>
                            <svg className="w-[12px] h-[12px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
                            <span className="text-white">Add Reminder</span>
                        </div>
                        <h1 className="text-[30px] font-semibold text-white leading-[1.1] tracking-tight mb-[12px]">Prescription Reminder</h1>
                        <p className="text-white/80 text-[16px] leading-[1.6]">
                            Set up a precise schedule for your medication to ensure consistent clinical adherence and wellness monitoring.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-[48px]">
                        
                        {/* Form Section */}
                        <div className="flex-1 bg-white rounded-[32px] p-[24px] shadow-sm border border-gray-100 max-w-[800px]">
                            
                            <FormSection title="Clinical Details" icon={<svg className="w-[20px] h-[20px]" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/></svg>}>
                                <div className="flex flex-col md:flex-row gap-[24px]">
                                    <InputField label="Medication Name" placeholder="e.g. Amoxicillin" />
                                    <InputField label="Dosage" placeholder="e.g. 500mg" />
                                </div>
                            </FormSection>

                            <FormSection title="Schedule & Routine" icon={<svg className="w-[20px] h-[20px]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/></svg>}>
                                <div className="flex flex-col md:flex-row gap-[24px] mb-[20px]">
                                    <div className="flex-1">
                                        <p className="text-[#627382] text-[11px] font-semibold uppercase tracking-[0.15em] mb-[6px] ml-[4px]">Frequency</p>
                                        <div className="relative">
                                            <select className="w-full appearance-none bg-[#EAEFF2] border-none rounded-[12px] px-[16px] py-[12px] text-[#0D1C2E] text-[15px] font-medium outline-none focus:ring-2 focus:ring-[#A9F1F1] transition-all">
                                                <option>Daily</option>
                                                <option>Twice Weekly</option>
                                                <option>Weekly</option>
                                            </select>
                                            <svg className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#627382] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
                                        </div>
                                    </div>
                                    <InputField label="Duration" placeholder="e.g. 7 days" />
                                </div>

                                <p className="text-[#627382] text-[11px] font-semibold uppercase tracking-[0.15em] mb-[12px] ml-[4px]">Set Times</p>
                                <div className="flex flex-wrap gap-[12px] mb-[24px]">
                                    <TimeButton 
                                        label="Morning" 
                                        active={times.includes('Morning')} 
                                        onClick={() => toggleTime('Morning')}
                                        icon={<svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>}
                                    />
                                    <TimeButton 
                                        label="Afternoon" 
                                        active={times.includes('Afternoon')} 
                                        onClick={() => toggleTime('Afternoon')}
                                        icon={<svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>}
                                    />
                                    <TimeButton 
                                        label="Evening" 
                                        active={times.includes('Evening')} 
                                        onClick={() => toggleTime('Evening')}
                                        icon={<svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>}
                                    />
                                    <TimeButton 
                                        label="Night" 
                                        active={times.includes('Night')} 
                                        onClick={() => toggleTime('Night')}
                                        icon={<svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>}
                                    />
                                </div>
                            </FormSection>

                            <div className="mb-[48px]">
                                <p className="text-[#627382] text-[16px] font-medium uppercase tracking-[0.15em] mb-[10px] ml-[4px]">Instructions</p>
                                <textarea 
                                    placeholder="Take after food. Do not drink alcohol while taking this medication."
                                    rows="4"
                                    className="w-full bg-[#EAEFF2] border-none rounded-[16px] px-[24px] py-[20px] text-[#0D1C2E] placeholder-[#94A3B8] text-[16px] font-medium outline-none focus:ring-2 focus:ring-[#A9F1F1] transition-all"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-[16px]">
                                <button className="flex-1 bg-[#1A7785] hover:bg-[#125863] text-white py-[18px] rounded-[20px] font-medium text-[16px] shadow-lg shadow-[#1A7785]/20 transition-all hover:-translate-y-1">
                                    Save Reminder
                                </button>
                                <button className="flex-1 bg-[#EAEFF2] hover:bg-[#dfe4e7] text-[#627382] py-[18px] rounded-[20px] font-medium text-[16px] transition-all">
                                    Cancel
                                </button>
                            </div>
                        </div>

                        {/* Right Sidebar Section */}
                        <div className="w-full lg:w-[340px] flex flex-col gap-[32px]">
                            
                            {/* Clinical Guidance Card */}
                            <div className="bg-[#0B1423] rounded-[32px] p-[32px] text-white relative overflow-hidden">
                                <div className="absolute top-[24px] right-[24px] w-[50px] h-[50px] bg-white/5 rounded-full flex items-center justify-center">
                                    <svg className="w-[28px] h-[28px] text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                                </div>
                                <h4 className="text-[20px] font-medium mb-[16px]">Clinical Guidance</h4>
                                <p className="text-white/60 text-[16px] leading-relaxed mb-[28px]">
                                    Following your medication schedule exactly as prescribed increases treatment efficacy by up to 40%.
                                </p>
                                <div className="flex flex-col gap-[16px]">
                                    <div className="flex items-center gap-[12px] bg-white/5 p-[14px] rounded-[20px] border border-white/5 group hover:bg-white/10 transition-colors cursor-pointer">
                                        <div className="w-[10px] h-[10px] rounded-full bg-[#A9F1F1] group-hover:scale-125 transition-transform" />
                                        <span className="text-[16px] font-medium text-white/80">Accurate dosage tracking</span>
                                    </div>
                                    <div className="flex items-center gap-[12px] bg-white/5 p-[14px] rounded-[20px] border border-white/5 group hover:bg-white/10 transition-colors cursor-pointer">
                                        <div className="w-[10px] h-[10px] rounded-full bg-[#A9F1F1] group-hover:scale-125 transition-transform" />
                                        <span className="text-[16px] font-medium text-white/80">Real-time alerts</span>
                                    </div>
                                </div>
                            </div>

                            {/* Wellness Tip Card */}
                            <div className="relative rounded-[32px] h-[240px] overflow-hidden group cursor-pointer shadow-lg">
                                <img src={tipImg} alt="Pharma" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1423] via-transparent to-transparent opacity-90"></div>
                                <div className="absolute bottom-0 left-0 p-[24px]">
                                    <span className="text-white/60 text-[16px] font-medium uppercase tracking-[0.2em] mb-[6px] block">WELLNESS TIP</span>
                                    <h4 className="text-white text-[20px] font-medium leading-tight">Store medications in a<br/>cool, dry place.</h4>
                                </div>
                            </div>

                            {/* Compliance Card */}
                            <div className="bg-white rounded-[32px] p-[28px] border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between mb-[20px]">
                                    <h4 className="text-[20px] font-medium text-[#0B1423]">Compliance</h4>
                                    <span className="text-emerald-600 bg-emerald-50 px-[10px] py-[3px] rounded-full text-[11px] font-medium tracking-wide">Active</span>
                                </div>
                                <div className="w-full h-[8px] bg-gray-100 rounded-full mb-[16px] overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-[#1A7785] to-[#A9F1F1] rounded-full" style={{ width: '85%' }}></div>
                                </div>
                                <p className="text-[#627382] text-[16px] leading-relaxed">
                                    You have maintained an 85% adherence rate this month. Keep it up!
                                </p>
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

export default Reminder;

