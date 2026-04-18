import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Patient_sidebar';
import Profile from './Profile';
import Account from './Account';
import Notification from './notification';
import phImg from '../../assets/ph.png';

const Setting = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState('Settings');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    
    // Modal states for navbar
    const [activeModal, setActiveModal] = useState(null); // 'profile' | 'account' | null
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    // Toggle states for settings
    const [emailNotif, setEmailNotif] = useState(true);
    const [smsNotif, setSmsNotif] = useState(false);
    const [pushNotif, setPushNotif] = useState(true);
    const [highContrast, setHighContrast] = useState(false);
    const [fontSize, setFontSize] = useState(() => {
        const saved = localStorage.getItem('app-font-size');
        return saved ? parseInt(saved) : 20;
    });

    React.useEffect(() => {
        localStorage.setItem('app-font-size', fontSize);
        document.documentElement.style.fontSize = `${(fontSize / 20) * 100}%`;
    }, [fontSize]);

    return (
        <div className="flex h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
             style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>
            
            <Sidebar active={active} setActive={setActive} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Header Navbar */}
                <header className="h-[60px] flex items-center justify-between px-6 md:px-8 shrink-0 border-b border-white/5 mb-0 z-20">
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
                            <button onClick={() => navigate('/Setting')} className="text-[#6ED4D4] transition-colors">
                                <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                            <div onClick={() => setActiveModal('profile')} className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform"><img src={phImg} alt="User" className="w-full h-full object-cover" /></div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 px-6 md:px-8 overflow-y-auto pb-[64px] pt-0 transition-all duration-300" style={{ fontSize: `${fontSize}px` }}>
                    <div className="max-w-[1200px] mx-auto space-y-4">
                        
                        {/* TOP SECTION: PROFILE & SECURITY HEALTH */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-[24px]">
                            
                            {/* Profile Overview Card */}
                            <div className="bg-white rounded-[32px] py-0 px-6 md:px-8 shadow-xl flex flex-col md:flex-row items-center gap-5 relative overflow-hidden group min-h-0">
                                <div className="relative shrink-0">
                                    <div className="w-[80px] h-[80px] rounded-[24px] overflow-hidden border-[3px] border-[#f0f4f5] shadow-md">
                                        <img src={phImg} alt="Dr. Sharma" className="w-full h-full object-cover" />
                                    </div>
                                    <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#1A7785] rounded-full border-[2px] border-white flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform cursor-pointer">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                                    </button>
                                </div>
                                
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-[22px] font-semibold text-[#0D1C2E] tracking-tight mb-0">Dr. Ananya Sharma</h2>
                                    <p className="text-[#1A7785] font-medium text-[14px] uppercase tracking-widest mb-1 shadow-none opacity-80">Senior Cardiologist • Medical License #88291</p>
                                    
                                    <div className="flex flex-wrap gap-3">
                                        <div className="bg-[#E7F0F0] px-5 py-1.5 rounded-[20px] flex-1 min-w-[200px]">
                                            <p className="text-[10px] font-medium text-[#5C858A] uppercase tracking-widest mb-1">Email Address</p>
                                            <p className="text-[15px] font-medium text-[#0D1C2E]">ananya.sharma@vaidyago.com</p>
                                        </div>
                                        <div className="bg-[#E7F0F0] px-5 py-1.5 rounded-[20px] flex-1 min-w-[200px]">
                                            <p className="text-[10px] font-medium text-[#5C858A] uppercase tracking-widest mb-1">Clinic Location</p>
                                            <p className="text-[15px] font-medium text-[#0D1C2E]">South Delhi Clinical Hub</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Security Health Card */}
                            <div className="bg-[#0D1C2E] rounded-[32px] p-6 text-white flex flex-col justify-between shadow-xl">
                                <div>
                                    <h3 className="text-[18px] font-medium mb-4 tracking-tight">Security Health</h3>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-[#2ECC71]/20 rounded-2xl flex items-center justify-center text-[#2ECC71]">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                                        </div>
                                        <div>
                                            <p className="text-[18px] font-medium text-[#2ECC71]">Robust</p>
                                            <p className="text-white/40 text-[14px] font-medium uppercase tracking-wider">Last login: 2 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2.5">
                                    <button className="w-full py-3.5 bg-white/5 hover:bg-white/10 rounded-[18px] border border-white/10 flex items-center justify-center gap-3 font-medium text-[15px] transition-all">
                                        <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                                        Change Password
                                    </button>
                                    <button className="w-full py-3.5 bg-white/5 hover:bg-white/10 rounded-[18px] border border-white/10 flex items-center justify-center gap-3 font-medium text-[15px] transition-all">
                                        <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                                        Update 2FA Settings
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* MIDDLE SECTION: NOTIFICATIONS & ACCESSIBILITY */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
                            
                            {/* Notification Preferences */}
                            <div className="bg-white rounded-[32px] p-4 md:p-5 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                    <svg className="w-5 h-5 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                                    <h3 className="text-[20px] font-medium text-[#0D1C2E]">Notification Preferences</h3>
                                </div>
                                <div className="space-y-2.5">
                                    {[
                                        { label: 'Email Notifications', desc: 'Patient reports', state: emailNotif, setter: setEmailNotif, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                                        { label: 'SMS Alerts', desc: 'Critical vitals', state: smsNotif, setter: setSmsNotif, icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
                                        { label: 'Push Notifications', desc: 'Schedule reminders', state: pushNotif, setter: setPushNotif, icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-2.5 bg-white rounded-[24px] border-[1.5px] border-[#CBD5E1] shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-[#5C858A] shadow-sm">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={item.icon}/></svg>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-[#0D1C2E] text-[15px]">{item.label}</p>
                                                    <p className="text-[14px] text-[#627382] font-medium">{item.desc}</p>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => item.setter(!item.state)}
                                                className={`w-14 h-8 rounded-full relative transition-all duration-300 ${item.state ? 'bg-[#1A7785]' : 'bg-gray-200'}`}
                                            >
                                                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${item.state ? 'left-7' : 'left-1'}`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Accessibility Settings */}
                            <div className="bg-[#E7F0F0] rounded-[32px] p-4 md:p-5 shadow-lg flex flex-col justify-start">
                                <div className="flex items-center gap-2.5 mb-3">
                                    <svg className="w-4 h-4 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14v7m-3-3h6m-3-10l-2 2m4-2l2 2"/></svg>
                                    <h3 className="text-[17px] font-bold text-[#0D1C2E]">Accessibility</h3>
                                </div>
                                <div className="space-y-2.5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-[#0D1C2E] text-[15px]">High Contrast Mode</p>
                                            <p className="text-[13px] text-[#627382] font-medium max-w-[280px]">Better visibility in bright environments.</p>
                                        </div>
                                        <button 
                                            onClick={() => setHighContrast(!highContrast)}
                                            className={`w-11 h-6 rounded-full relative transition-all duration-300 ${highContrast ? 'bg-[#1A7785]' : 'bg-gray-200'}`}
                                        >
                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${highContrast ? 'left-6' : 'left-1'}`} />
                                        </button>
                                    </div>
 
                                    <div className="bg-white rounded-[24px] p-3.5 shadow-sm border border-white/50">
                                        <p className="font-semibold text-[#0D1C2E] text-[15px] mb-2">Interface Scale (Font Size)</p>

                                        <div className="relative pt-3">
                                            <input
                                                type="range"
                                                min="1"
                                                max="3"
                                                step="1"
                                                value={fontSize <= 16 ? 1 : fontSize <= 20 ? 2 : 3}
                                                onChange={(e) => {
                                                    const val = parseInt(e.target.value);
                                                    setFontSize(val === 1 ? 16 : val === 2 ? 20 : 24);
                                                }}
                                                className="w-full h-1.5 bg-[#F0F4F5] rounded-lg appearance-none cursor-pointer accent-[#1A7785]"
                                            />
                                            <div className="flex justify-between mt-3 text-[10px] font-bold text-[#627382] uppercase tracking-widest">
                                                <span>Small</span>
                                                <span>Default</span>
                                                <span>Large</span>
                                            </div>

                                            <div className="absolute -top-3.5 right-0 text-[18px] font-medium text-[#0D1C2E]">A</div>
                                            <div className="absolute -top-3 left-0 text-[12px] font-medium text-[#0D1C2E]">A</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BOTTOM SECTION: ADVANCED SECURITY */}
                        <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-xl">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                <div>
                                    <h3 className="text-[18px] font-medium text-[#0D1C2E] mb-2">Advanced Security Control</h3>
                                    <p className="text-[14px] text-[#627382] font-medium leading-relaxed">Manage how your medical credentials and patient data are protected.</p>
                                </div>
                                <button className="px-6 py-3 bg-gradient-to-r from-[#1A7785] to-[#49AAB3] rounded-full text-white font-medium text-[15px] shadow-lg hover:shadow-xl transition-all">
                                    Audit Security Log
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 border border-[#EAEFF2] rounded-[28px] hover:border-[#1A7785] transition-colors group cursor-pointer">
                                    <div className="flex items-center gap-3 mb-3">
                                        <svg className="w-4 h-4 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                                        <h4 className="font-medium text-[#0D1C2E]">Change Password</h4>
                                    </div>
                                    <p className="text-[14px] text-[#627382] font-medium mb-4">Last changed 45 days ago. We recommend every 90 days.</p>
                                    <span className="text-[#1A7785] font-medium text-[14px] group-hover:underline">Update now ›</span>
                                </div>
                                <div className="p-6 border border-[#EAEFF2] rounded-[28px] hover:border-[#1A7785] transition-colors group cursor-pointer">
                                    <div className="flex items-center gap-3 mb-3">
                                        <svg className="w-4 h-4 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                                        <h4 className="font-medium text-[#0D1C2E]">Two-Factor Authentication</h4>
                                    </div>
                                    <p className="text-[14px] text-[#627382] font-medium mb-4">Status: <span className="text-[#2ECC71] font-medium">Enabled</span></p>
                                    <span className="text-[#1A7785] font-medium text-[14px] group-hover:underline">Manage methods ›</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-medium text-white/50 pt-8 border-t border-white/10 uppercase tracking-widest">
                            <p>© 2024 VAIDYAGO CLINICAL SYSTEMS • ENTERPRISE TIER V4.2</p>
                            <div className="flex gap-8 mt-4 sm:mt-0">
                                <span className="hover:text-white cursor-pointer transition-colors">Documentation</span>
                                <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
                                <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Navbar Modals (Local to this page too) */}
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

export default Setting;

