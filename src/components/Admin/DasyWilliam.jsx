import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DasyWilliam = ({ setOpenProfile, isDoctor = false }) => {
    const navigate = useNavigate();
    const [isThemeOpen, setIsThemeOpen] = useState(false);
    const [activeTheme, setActiveTheme] = useState('default');
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [helpView, setHelpView] = useState('menu'); // 'menu' or 'faq'
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}

                className="absolute right-0 mt-2 w-[350px] bg-white rounded-2xl 
border border-gray-200 divide-y z-[100]
shadow-[0_10px_40px_rgba(0,120,255,0.15)]"
            >


                {/* Account Section */}
                <div className="px-4 py-3">
                    <p className="text-gray-500 text-[14px] mb-2">Account</p>

                    <div className="flex items-center justify-between cursor-pointer hover:bg-gray-50 rounded-xl p-2 transition group" onClick={() => navigate('/Profile')}>
                        <div className="flex gap-3 items-center">
                            <img
                                src="/assets/ph.png"
                                alt="profile"
                                className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                            />

                            <div className="leading-tight">
                                <h2 className="font-bold text-[17px] text-gray-800 group-hover:text-[#1b738c] transition-colors">
                                    Dasy William
                                </h2>
                                <p className="text-gray-500 text-[13px]">
                                    javedtuba@gmail.com
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate('/Profile');
                            }}
                            className="p-2 rounded-lg bg-gray-50 group-hover:bg-[#1b738c]/10 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-gray-400 group-hover:text-[#1b738c]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                    </div>
                </div>

                {!isDoctor && (
                    <>
                        {/* Plan Section */}
                        <div className="px-2 py-3">
                            <p className="text-gray-600 text-[14px] mb-2 pl-2">Plan</p>
                            <button className="w-full border rounded-full py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                                <img src="/assets/plus.png" className="w-6 h-6 object-contain" />
                                <p className="text-[16px] font-medium text-gray-700">Create plan</p>
                            </button>
                        </div>
                    </>
                )}

                {/* Menu Items */}
                <div className="py-2">

                    {/* Settings */}
                    <div
                        onClick={() => navigate('/Profile')}
                        className="flex items-center justify-between py-2.5 px-4 hover:bg-gray-50 cursor-pointer transition group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-[#1b738c]/10 transition-colors">
                                <img src="/assets/settt.png" className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100" />
                            </div>
                            <p className="text-[15px] font-bold text-gray-700 group-hover:text-[#1b738c]">Settings</p>
                        </div>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </div>

                    {!isDoctor && (
                        <>
                            {/* Theme */}
                            <div>
                                <div
                                    onClick={() => setIsThemeOpen(!isThemeOpen)}
                                    className="flex items-center justify-between py-2.5 px-4 hover:bg-gray-50 cursor-pointer transition group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-[#1b738c]/10">
                                            <img src="/assets/Theme.png" className="w-5 h-5 object-contain opacity-70" />
                                        </div>
                                        <p className="text-[15px] font-bold text-gray-700">Theme</p>
                                    </div>
                                    <span className={`text-gray-400 transition-transform duration-300 ${isThemeOpen ? 'rotate-180' : ''}`}>⌄</span>
                                </div>

                                {isThemeOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        className="bg-gray-50/50 overflow-hidden"
                                    >
                                        <div className="px-4 py-2 flex flex-col gap-1">
                                            {[
                                                { id: 'default', label: 'Default', icon: '✨' },
                                                { id: 'dark', label: 'Dark', icon: '🌙' }
                                            ].map((t) => (
                                                <div
                                                    key={t.id}
                                                    onClick={() => {
                                                        setActiveTheme(t.id);
                                                        if (t.id === 'dark') {
                                                            document.documentElement.classList.add('dark');
                                                        } else {
                                                            document.documentElement.classList.remove('dark');
                                                        }
                                                    }}
                                                    className={`flex items-center justify-between py-2 px-6 rounded-xl cursor-pointer transition-all ${activeTheme === t.id ? 'bg-white shadow-sm border border-gray-100' : 'hover:bg-gray-100'}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-sm">{t.icon}</span>
                                                        <p className={`text-[13px] font-bold ${activeTheme === t.id ? 'text-[#19718A]' : 'text-gray-600'}`}>{t.label}</p>
                                                    </div>
                                                    {activeTheme === t.id && (
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#19718A]"></div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Help */}
                            <div
                                onClick={() => {
                                    setIsHelpModalOpen(true);
                                    setHelpView('menu');
                                }}
                                className="flex items-center justify-between py-2.5 px-4 hover:bg-gray-50 cursor-pointer transition group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-[#1b738c]/10">
                                        <img src="/assets/help.png" className="w-5 h-5 object-contain opacity-70" />
                                    </div>
                                    <p className="text-[15px] font-bold text-gray-700">Help & Resources</p>
                                </div>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </div>
                        </>
                    )}

                </div>


                {/* Logout */}
                <div className="p-3 hover:bg-red-50 cursor-pointer flex items-center justify-between transition group border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100">
                            <img src="/assets/log.png" className="w-4 h-4 object-contain opacity-70 group-hover:opacity-100" />
                        </div>
                        <p className="text-[15px] font-bold text-red-600">Logout</p>
                    </div>
                </div>

            </motion.div>

            {/* 🆘 HELP & RESOURCES MODAL */}
            {isHelpModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm px-4" onClick={() => setIsHelpModalOpen(false)}>
                    <div
                        className="w-full max-w-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-[#19718A] p-6 text-white flex justify-between items-center">
                            <h3 className="text-xl font-bold">Help & Resources</h3>
                            <button onClick={() => setIsHelpModalOpen(false)} className="hover:rotate-90 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-4 max-h-[70vh] overflow-y-auto">
                            {helpView === 'menu' ? (
                                <div className="space-y-4">
                                    {[
                                        { id: 'support', title: 'Contact Support', desc: 'Chat with our 24/7 support team', icon: (
                                            <svg className="w-6 h-6 text-[#19718A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        )},
                                        { id: 'faq', title: 'FAQs', desc: 'Find quick answers to common questions', icon: (
                                            <svg className="w-6 h-6 text-[#19718A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )},
                                        { id: 'docs', title: 'User Documentation', desc: 'Learn how to master the platform', icon: (
                                            <svg className="w-6 h-6 text-[#19718A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        )}
                                    ].map((item, i) => (
                                        <div 
                                            key={i} 
                                            onClick={() => { if (item.id === 'faq') setHelpView('faq'); }}
                                            className="group flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-[#19718A] hover:bg-teal-50 transition-all cursor-pointer"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-white shadow-sm transition-colors">{item.icon}</div>
                                            <div>
                                                <h4 className="font-bold text-gray-800">{item.title}</h4>
                                                <p className="text-xs text-gray-500">{item.desc}</p>
                                            </div>
                                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                                <svg className="w-5 h-5 text-[#19718A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4 animate-in slide-in-from-right duration-300">
                                    <button 
                                        onClick={() => setHelpView('menu')}
                                        className="flex items-center gap-2 text-[#19718A] font-bold mb-4 hover:underline"
                                    >
                                        <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                                        Back to Menu
                                    </button>
                                    <div className="space-y-4">
                                        {[
                                            { q: 'How do I reset my password?', a: 'Go to the login page and click on "Forgot Password". We will send you an OTP.' },
                                            { q: 'Can I add multiple doctors?', a: 'Yes, as an admin you can add as many doctors as you want through the "Add Doctor" section.' },
                                            { q: 'How to update hospital profile?', a: 'Click on your profile name in the top right corner and select "Settings".' }
                                        ].map((faq, i) => (
                                            <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                                <p className="font-bold text-gray-800 mb-2">{faq.q}</p>
                                                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button 
                                onClick={() => { if (helpView === 'menu') setIsHelpModalOpen(false); else setHelpView('menu'); }}
                                className="w-full py-4 mt-2 bg-[#89C8D9] text-[#0f3b4d] font-bold rounded-2xl hover:shadow-lg transition-all"
                            >
                                {helpView === 'menu' ? 'Back to Dashboard' : 'Back to Menu'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const MenuItem = ({ title, icon, dropdown }) => {
    return (
        <div className="flex items-center justify-between py-2 px-4 hover:bg-gray-100 cursor-pointer transition">
            <div className="flex items-center gap-3">
                <span>{icon}</span>
                <p className="text-gray-700 font-medium text-[16px]">{title}</p>
            </div>

            {dropdown && <span className="text-gray-400">⌄</span>}
        </div>
    );
};

export default DasyWilliam;
