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
    const [fontSize, setFontSize] = useState(20); // Scale slider

    return (
        <div className="flex min-h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-x-hidden"
             style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>
            
            <Sidebar active={active} setActive={setActive} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

            <div className="flex-1 flex flex-col min-w-0 pb-[64px]">
                {/* Top Navbar */}
                <header className="h-[76px] flex items-center justify-between px-[24px] md:px-[48px] shrink-0 border-b border-white/5 mb-[32px]">
                    <div className="flex items-center gap-[32px]">
                        <h1 className="text-[28px] font-black text-white tracking-tight">Settings</h1>
                        <div className="hidden md:flex items-center w-[340px] bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 gap-3">
                            <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input type="text" placeholder="Search settings..." className="bg-transparent border-none outline-none text-white text-[14px] placeholder-white/40 w-full" />
                        </div>
                    </div>

                    <div className="flex items-center gap-[24px]">
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
                            <div 
                                onClick={() => setActiveModal('profile')}
                                className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform"
                            >
                                <img src={phImg} alt="User" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 px-[24px] md:px-[48px]">
                    <div className="max-w-[1200px] mx-auto space-y-8">
                        
                        {/* TOP SECTION: PROFILE & SECURITY HEALTH */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-[24px]">
                            
                            {/* Profile Overview Card */}
                            <div className="bg-white rounded-[32px] p-[40px] shadow-xl flex items-center gap-[40px] relative overflow-hidden group">
                                <div className="relative shrink-0">
                                    <div className="w-[140px] h-[140px] rounded-[40px] overflow-hidden border-[6px] border-[#f0f4f5] shadow-lg">
                                        <img src={phImg} alt="Dr. Sharma" className="w-full h-full object-cover" />
                                    </div>
                                    <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#1A7785] rounded-full border-[3px] border-white flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform cursor-pointer">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                                    </button>
                                </div>
                                
                                <div className="flex-1">
                                    <h2 className="text-[32px] font-black text-[#0D1C2E] tracking-tight mb-1">Dr. Ananya Sharma</h2>
                                    <p className="text-[#1A7785] font-black text-[14px] uppercase tracking-widest mb-6 opacity-80">Senior Cardiologist • Medical License #88291</p>
                                    
                                    <div className="flex flex-wrap gap-4">
                                        <div className="bg-[#E7F0F0] px-6 py-4 rounded-[20px] flex-1 min-w-[200px]">
                                            <p className="text-[10px] font-black text-[#5C858A] uppercase tracking-widest mb-1">Email Address</p>
                                            <p className="text-[14px] font-bold text-[#0D1C2E]">ananya.sharma@vaidyago.com</p>
                                        </div>
                                        <div className="bg-[#E7F0F0] px-6 py-4 rounded-[20px] flex-1 min-w-[200px]">
                                            <p className="text-[10px] font-black text-[#5C858A] uppercase tracking-widest mb-1">Clinic Location</p>
                                            <p className="text-[14px] font-bold text-[#0D1C2E]">South Delhi Clinical Hub</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Security Health Card */}
                            <div className="bg-[#0D1C2E] rounded-[32px] p-[32px] text-white flex flex-col justify-between shadow-xl">
                                <div>
                                    <h3 className="text-[20px] font-black mb-6 tracking-tight">Security Health</h3>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 bg-[#2ECC71]/20 rounded-2xl flex items-center justify-center text-[#2ECC71]">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                                        </div>
                                        <div>
                                            <p className="text-[18px] font-black text-[#2ECC71]">Robust</p>
                                            <p className="text-white/40 text-[12px] font-bold uppercase tracking-wider">Last login: 2 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <button className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-[18px] border border-white/10 flex items-center justify-center gap-3 font-bold text-[14px] transition-all">
                                        <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                                        Change Password
                                    </button>
                                    <button className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-[18px] border border-white/10 flex items-center justify-center gap-3 font-bold text-[14px] transition-all">
                                        <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                                        Update 2FA Settings
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* MIDDLE SECTION: NOTIFICATIONS & ACCESSIBILITY */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
                            
                            {/* Notification Preferences */}
                            <div className="bg-white rounded-[32px] p-[32px] shadow-lg">
                                <div className="flex items-center gap-3 mb-8">
                                    <svg className="w-5 h-5 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                                    <h3 className="text-[20px] font-black text-[#0D1C2E]">Notification Preferences</h3>
                                </div>
                                <div className="space-y-6">
                                    {[
                                        { label: 'Email Notifications', desc: 'Patient reports & summaries', state: emailNotif, setter: setEmailNotif, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                                        { label: 'SMS Alerts', desc: 'Emergency critical vitals', state: smsNotif, setter: setSmsNotif, icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
                                        { label: 'Push Notifications', desc: 'Daily schedule reminders', state: pushNotif, setter: setPushNotif, icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 bg-[#F8FAFB] rounded-[24px]">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#5C858A] shadow-sm">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={item.icon}/></svg>
                                                </div>
                                                <div>
                                                    <p className="font-extrabold text-[#0D1C2E] text-[15px]">{item.label}</p>
                                                    <p className="text-[12px] text-[#627382] font-medium">{item.desc}</p>
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

                            {/* Accessibility Card */}
                            <div className="bg-white rounded-[32px] p-[32px] shadow-lg flex flex-col justify-between">
                                <div className="flex items-center gap-3 mb-8">
                                    <svg className="w-5 h-5 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14v7m-3-3h6m-3-10l-2 2m4-2l2 2"/></svg>
                                    <h3 className="text-[20px] font-black text-[#0D1C2E]">Accessibility</h3>
                                </div>
                                <div className="space-y-10">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-extrabold text-[#0D1C2E] text-[16px]">High Contrast Mode</p>
                                            <p className="text-[12px] text-[#627382] font-medium max-w-[280px]">Increases contrast of UI elements for better visibility in bright environments.</p>
                                        </div>
                                        <button 
                                            onClick={() => setHighContrast(!highContrast)}
                                            className={`w-14 h-8 rounded-full relative transition-all duration-300 ${highContrast ? 'bg-[#1A7785]' : 'bg-gray-200'}`}
                                        >
                                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${highContrast ? 'left-7' : 'left-1'}`} />
                                        </button>
                                    </div>

                                    <div>
                                        <p className="font-extrabold text-[#0D1C2E] text-[16px] mb-8">Interface Scale (Font Size)</p>
                                        <div className="relative pt-4">
                                            <input 
                                                type="range" 
                                                min="12" 
                                                max="28" 
                                                value={fontSize} 
                                                onChange={(e) => setFontSize(e.target.value)}
                                                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#1A7785]"
                                            />
                                            <div className="flex justify-between mt-4 text-[10px] font-black text-[#627382] uppercase tracking-[0.1em]">
                                                <span>Default</span>
                                                <span>Large</span>
                                                <span>Extra</span>
                                                <span>Max</span>
                                            </div>
                                            <div className="absolute -top-4 right-0 text-[24px] font-black text-[#0D1C2E]">A</div>
                                            <div className="absolute -top-3 left-0 text-[14px] font-black text-[#0D1C2E]">A</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BOTTOM SECTION: ADVANCED SECURITY */}
                        <div className="bg-white rounded-[32px] p-[40px] shadow-xl">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                                <div>
                                    <h3 className="text-[22px] font-black text-[#0D1C2E] mb-2">Advanced Security Control</h3>
                                    <p className="text-[14px] text-[#627382] font-medium leading-relaxed">Manage how your medical credentials and patient data are protected.</p>
                                </div>
                                <button className="px-8 py-3.5 bg-gradient-to-r from-[#1A7785] to-[#49AAB3] rounded-full text-white font-black text-[14px] shadow-lg hover:shadow-xl transition-all">
                                    Audit Security Log
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-8 border border-[#EAEFF2] rounded-[28px] hover:border-[#1A7785] transition-colors group cursor-pointer">
                                    <div className="flex items-center gap-4 mb-4">
                                        <svg className="w-5 h-5 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                                        <h4 className="font-extrabold text-[#0D1C2E]">Change Password</h4>
                                    </div>
                                    <p className="text-[13px] text-[#627382] font-medium mb-6">Last changed 45 days ago. We recommend every 90 days.</p>
                                    <span className="text-[#1A7785] font-black text-[13px] group-hover:underline">Update now ›</span>
                                </div>
                                <div className="p-8 border border-[#EAEFF2] rounded-[28px] hover:border-[#1A7785] transition-colors group cursor-pointer">
                                    <div className="flex items-center gap-4 mb-4">
                                        <svg className="w-5 h-5 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                                        <h4 className="font-extrabold text-[#0D1C2E]">Two-Factor Authentication</h4>
                                    </div>
                                    <p className="text-[13px] text-[#627382] font-medium mb-6">Status: <span className="text-[#2ECC71] font-bold">Enabled (Authenticator App)</span></p>
                                    <span className="text-[#1A7785] font-black text-[13px] group-hover:underline">Manage methods ›</span>
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
