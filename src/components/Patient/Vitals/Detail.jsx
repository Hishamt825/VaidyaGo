import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Patient_sidebar';
import Profile from '../Profile';
import Account from '../Account';
import Notification from '../notification';
import phImg from '../../../assets/ph.png';

const BPReading = ({ date, time, value, status, statusColor }) => (
    <div className="bg-white rounded-[20px] p-4 flex items-center justify-between border border-gray-50 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
        <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-[#0B1F4D] text-[18px] font-bold">{value}</span>
                <span className="text-[#627382] text-[11px] font-medium uppercase">mmHg</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[#627382] text-[11px] font-medium">{date}</span>
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-[#627382] text-[11px] font-medium">{time}</span>
            </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${statusColor} bg-opacity-10 border border-current`}>
            {status}
        </span>
    </div>
);

const Detail = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState('Vitals');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    return (
        <div className="flex h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
             style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>
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
                <header className="h-[72px] flex items-center justify-between px-6 md:px-8 shrink-0 border-b border-white/5 bg-transparent z-20">
                    <div className="flex-1 max-w-[280px]">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search reports..."
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
                                <div className="absolute top-[2px] right-[2px] w-[6px] h-[6px] bg-[#E85B5A] rounded-full shadow-sm" />
                            </button>
                            <button onClick={() => navigate('/Setting')} className="text-white hover:text-[#6ED4D4] transition-colors">
                                <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                            <div onClick={() => setActiveModal('profile')} className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform flex items-center justify-center">
                                <img src={phImg} alt="User" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto px-6 md:px-10 pt-4 pb-12 scrollbar-hide">
                    
                    {/* Hero Section */}
                    <div className="relative rounded-[40px] bg-gradient-to-r from-[#0B1F4D] via-[#12555c] to-[#1A7785] p-6 md:p-10 text-white overflow-hidden shadow-xl mb-6">
                        <div className="relative z-10 max-w-2xl">
                            <span className="text-[#6ED4D4] text-[11px] font-black uppercase tracking-[0.3em] mb-4 block opacity-80">Comprehensive Analysis</span>
                            <h1 className="text-[36px] md:text-[48px] font-bold leading-[1.1] tracking-tight mb-6 mt-2">Detailed Health<br />Reports</h1>
                            <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed max-w-xl">
                                Reviewing period: <span className="text-white font-bold">Oct 1, 2023 – Dec 31, 2023</span>. Your clinical data shows a consistent upward trend in overall cardiovascular resilience.
                            </p>
                        </div>
                        
                        <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3.5 rounded-full font-bold text-[14px] hover:bg-white/20 transition-all flex items-center gap-2 group">
                                <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                Sync New Data
                            </button>
                            <button className="bg-white text-[#0B1F4D] px-8 py-3.5 rounded-full font-bold text-[14px] shadow-lg hover:bg-gray-100 transition-all flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                                Share with Doctor
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* LEFT COLUMN - Trends */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            
                            {/* Heart Trends Card */}
                            <div className="bg-[#f0f7f8] rounded-[36px] p-6 border border-[#e2eef1]">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-cyan-500 shadow-sm border border-cyan-50">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                                        </div>
                                        <h3 className="text-[20px] font-bold text-[#0B1F4D]">Heart Health Trends</h3>
                                    </div>
                                    <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-[10px] font-black text-cyan-600 uppercase tracking-widest border border-cyan-50">
                                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                                        Live Monitoring
                                    </span>
                                </div>

                                <div className="flex flex-col md:flex-row gap-10">
                                    <div className="bg-white rounded-[28px] p-6 flex-1 border border-gray-100 shadow-sm">
                                        <p className="text-[#627382] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Avg Heart Rate</p>
                                        <div className="flex items-baseline gap-2 mb-6">
                                            <span className="text-[#0B1F4D] text-[40px] font-black">72</span>
                                            <span className="text-[#627382] text-[14px] font-bold">bpm</span>
                                        </div>
                                        {/* Simple Visual Chart Placeholder */}
                                        <div className="flex items-end justify-between h-[100px] gap-2 px-1">
                                            {[40, 60, 45, 85, 55, 70, 50].map((h, i) => (
                                                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                                                    <div 
                                                        className={`w-full rounded-t-lg transition-all duration-700 ${i === 3 ? 'bg-[#1A7785] scale-y-110' : 'bg-gray-100 group-hover:bg-gray-200'}`}
                                                        style={{ height: `${h}%` }}
                                                    />
                                                    <span className="text-[10px] text-gray-400 font-bold">{['M','T','W','T','F','S','S'][i]}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-[28px] p-6 flex-1 border border-gray-100 shadow-sm flex flex-col">
                                        <p className="text-[#627382] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Rhythm Analysis</p>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="text-cyan-500">
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                            </div>
                                            <h4 className="text-[#0B1F4D] text-[20px] font-bold">Sinus Rhythm</h4>
                                        </div>
                                        <p className="text-[#627382] text-[14px] leading-relaxed mb-6">
                                            No irregularities detected in the past 30 days. Your cardiac rhythm remains stable and healthy.
                                        </p>
                                        <div className="mt-auto flex items-center gap-2 text-emerald-600 font-bold text-[13px] bg-emerald-50 self-start px-4 py-2 rounded-xl">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                            Optimal Status
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Respiratory Analysis */}
                            <div className="bg-white rounded-[36px] p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
                                <div className="absolute -right-10 -top-10 opacity-[0.03] text-[#0B1F4D] pointer-events-none group-hover:rotate-12 group-hover:scale-110 transition-transform duration-1000">
                                    <svg className="w-[300px] h-[300px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z" /></svg>
                                </div>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 13h5.5l2-5 4 10 2-5H21" /></svg>
                                    </div>
                                    <h3 className="text-[20px] font-bold text-[#0B1F4D]">Respiratory Analysis</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                    <div>
                                        <div className="mb-8">
                                            <p className="text-[#627382] text-[11px] font-black uppercase tracking-[0.2em] mb-3">Oxygen Saturation (SPO2)</p>
                                            <div className="flex items-baseline gap-4">
                                                <span className="text-[#0B1F4D] text-[48px] font-black">98%</span>
                                                <div className="flex items-center gap-1.5 text-emerald-600 font-bold mb-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                                                    <span className="text-[14px]">Stable</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-[#627382] text-[11px] font-black uppercase tracking-[0.2em] mb-4">Breathing Quality</p>
                                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-3">
                                                <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 w-[85%] rounded-full shadow-inner" />
                                            </div>
                                            <p className="text-[#627382] text-[12px] italic">Consistency score based on nocturnal breathing patterns.</p>
                                        </div>
                                    </div>

                                    <div className="bg-[#f8fafc] rounded-[28px] p-6 border border-gray-200/50">
                                        <div className="flex items-center gap-3 mb-4">
                                            <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                            <span className="text-[#0B1F4D] text-[14px] font-bold">Physician's Note</span>
                                        </div>
                                        <p className="text-[#627382] text-[14px] leading-relaxed mb-6 font-medium">
                                            "Your lung capacity and oxygen exchange remain excellent. Minor variations during sleep are within expected athletic ranges for your age group."
                                        </p>
                                        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-white shadow-sm">
                                                <img src={phImg} alt="Doctor" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-[#0B1F4D] text-[13px] font-bold">Dr. Elena Thorne</p>
                                                <p className="text-[#627382] text-[11px] font-medium">Pulmonologist</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN - History & Reporting */}
                        <div className="flex flex-col gap-6">
                            
                            {/* BP History Card */}
                            <div className="bg-[#EBEDF0] rounded-[36px] p-6 border border-gray-200/50">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="w-10 h-10 bg-[#1A7785] text-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                        </div>
                                        <h3 className="text-[20px] font-bold text-[#0B1F4D]">BP History</h3>
                                    </div>
                                    <div className="flex items-center -space-x-2">
                                        {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-white border border-gray-100 shadow-sm" />)}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 mb-6">
                                    <BPReading value="118/76" date="OCT 28" time="09:15 AM" status="Optimal" statusColor="text-emerald-500" />
                                    <BPReading value="120/80" date="OCT 26" time="08:30 PM" status="Normal" statusColor="text-cyan-500" />
                                    <BPReading value="124/82" date="OCT 24" time="07:00 AM" status="Normal" statusColor="text-cyan-500" />
                                    <BPReading value="119/78" date="OCT 22" time="10:45 AM" status="Optimal" statusColor="text-emerald-500" />
                                </div>

                                <button className="w-full py-4 text-[#1A7785] font-black text-[13px] uppercase tracking-[0.2em] hover:bg-white/50 rounded-2xl transition-all flex items-center justify-center gap-2 group">
                                    View All Readings
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </button>
                            </div>

                            {/* Full Clinical Report Download Card */}
                            <div className="bg-[#0B1423] rounded-[36px] p-8 text-white relative overflow-hidden shadow-2xl group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#1A7785]/20 to-transparent pointer-events-none" />
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform duration-500">
                                        <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    </div>
                                    <h3 className="text-[24px] font-bold leading-tight mb-4 tracking-tight">Full Clinical Report</h3>
                                    <p className="text-white/50 text-[14px] leading-relaxed mb-8 font-medium">
                                        Download the comprehensive 12-page PDF including all diagnostic metrics and lab results.
                                    </p>
                                    <button className="w-full bg-[#6ED4D4] text-[#0B1F4D] py-4 rounded-full font-black text-[13px] uppercase tracking-[0.2em] shadow-lg hover:shadow-[#6ED4D4]/30 hover:scale-[1.02] transition-all">
                                        Download Full Report
                                    </button>
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
        </div>
    );
};

export default Detail;
