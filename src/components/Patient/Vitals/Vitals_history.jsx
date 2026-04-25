import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Patient_sidebar';
import phImg from '../../../assets/ph.png';
import { ChevronRight, Download, Filter, Search, ChevronLeft, Activity, Heart, Wind, Thermometer } from 'lucide-react';

const MetricCard = ({ icon, label, value, unit, change, color }) => (
    <div className="bg-white/80 backdrop-blur-md rounded-[24px] p-5 flex flex-col shadow-sm border border-white/40 flex-1 hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-4">
            <div className={`w-[42px] h-[42px] rounded-2xl bg-[#F4F8FA] border border-[#E9EFF2] flex items-center justify-center ${color}`}>
                {icon}
            </div>
            <p className={`text-[10px] font-black uppercase tracking-widest ${color}`}>{label}</p>
        </div>
        <div className="flex items-baseline gap-[6px]">
            <span className="text-[#0D1C2E] text-[28px] font-black tracking-tight">{value}</span>
            <span className="text-[#627382] text-[12px] font-bold opacity-60 uppercase">{unit}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
            <span className="text-[#1A7785] text-[10px] font-bold italic">{change}</span>
        </div>
    </div>
);

const VitalsHistory = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState('Vitals');
    const [selectedTab, setSelectedTab] = useState('All Vitals');
    const [currentPage, setCurrentPage] = useState(1);
    
    const allVitalsData = [
        // Page 1
        { date: 'Oct 24, 2023', time: '08:45 AM', hr: '78', bp: '120/80', spo2: '98%', temp: '36.6°C', status: 'Optimal', statusColor: 'bg-cyan-50 border-cyan-100 text-cyan-600', page: 1 },
        { date: 'Oct 23, 2023', time: '08:15 PM', hr: '82', bp: '124/82', spo2: '97%', temp: '36.8°C', status: 'Normal', statusColor: 'bg-slate-50 border-slate-100 text-slate-500', page: 1 },
        { date: 'Oct 23, 2023', time: '10:30 AM', hr: '94', bp: '138/88', spo2: '96%', temp: '37.2°C', status: 'Caution', statusColor: 'bg-rose-50 border-rose-100 text-rose-500', page: 1 },
        { date: 'Oct 22, 2023', time: '09:00 AM', hr: '74', bp: '118/76', spo2: '99%', temp: '36.5°C', status: 'Optimal', statusColor: 'bg-cyan-50 border-cyan-100 text-cyan-600', page: 1 },
        // Page 2
        { date: 'Oct 21, 2023', time: '11:20 AM', hr: '80', bp: '122/80', spo2: '98%', temp: '36.7°C', status: 'Optimal', statusColor: 'bg-cyan-50 border-cyan-100 text-cyan-600', page: 2 },
        { date: 'Oct 20, 2023', time: '07:45 PM', hr: '76', bp: '119/78', spo2: '97%', temp: '36.6°C', status: 'Normal', statusColor: 'bg-slate-50 border-slate-100 text-slate-500', page: 2 },
        { date: 'Oct 19, 2023', time: '02:30 PM', hr: '88', bp: '130/84', spo2: '96%', temp: '36.9°C', status: 'Normal', statusColor: 'bg-slate-50 border-slate-100 text-slate-500', page: 2 },
        { date: 'Oct 18, 2023', time: '10:15 AM', hr: '72', bp: '116/74', spo2: '99%', temp: '36.4°C', status: 'Optimal', statusColor: 'bg-cyan-50 border-cyan-100 text-cyan-600', page: 2 },
        // Page 3
        { date: 'Oct 17, 2023', time: '09:10 AM', hr: '79', bp: '121/79', spo2: '98%', temp: '36.7°C', status: 'Optimal', statusColor: 'bg-cyan-50 border-cyan-100 text-cyan-600', page: 3 },
        { date: 'Oct 16, 2023', time: '08:00 PM', hr: '85', bp: '128/82', spo2: '97%', temp: '36.8°C', status: 'Normal', statusColor: 'bg-slate-50 border-slate-100 text-slate-500', page: 3 },
        { date: 'Oct 15, 2023', time: '01:20 PM', hr: '92', bp: '135/86', spo2: '95%', temp: '37.1°C', status: 'Caution', statusColor: 'bg-rose-50 border-rose-100 text-rose-500', page: 3 },
        { date: 'Oct 14, 2023', time: '11:45 AM', hr: '75', bp: '117/75', spo2: '99%', temp: '36.6°C', status: 'Optimal', statusColor: 'bg-cyan-50 border-cyan-100 text-cyan-600', page: 3 },
    ];

    const vitalsData = allVitalsData.filter(item => item.page === currentPage);

    return (
        <div className="flex h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden" 
             style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>
            
            <Sidebar active={active} setActive={setActive} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Top Navbar standardized to Medication1 style */}
                <header className="h-[72px] flex items-center gap-4 px-6 md:px-8 shrink-0 border-b border-white/5 mb-1 z-20">
                    <button 
                        onClick={() => navigate('/Vitals')}
                        className="w-[40px] h-[40px] rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all group shrink-0"
                        title="Back to Vitals"
                    >
                        <ChevronLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
                    </button>

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
                            <button className="text-white hover:text-[#6ED4D4] transition-colors relative">
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
                            <div className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform"><img src={phImg} alt="User" className="w-full h-full object-cover" /></div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 px-10 pb-10 overflow-y-auto pt-6 custom-scrollbar">
                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div className="text-left">
                            <h1 className="text-white text-[42px] font-bold tracking-tight leading-tight mb-2">Patient Vitals <span className="font-medium opacity-80 underline decoration-[#6ED4D4] decoration-4 underline-offset-8">History</span></h1>
                            <p className="text-white/60 text-[14px] font-medium max-w-xl italic">A comprehensive overview of physiological health metrics over the last 90 days.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-3 rounded-2xl hover:bg-white/20 transition-all font-bold text-[13px]">
                                <Filter size={16} />
                                Last 3 Months
                            </button>
                            <button className="flex items-center gap-2 bg-[#0B1F4D] text-white px-6 py-3.5 rounded-2xl shadow-xl hover:scale-105 transition-all font-bold text-[13px]">
                                <Download size={16} />
                                Export CSV
                            </button>
                        </div>
                    </div>

                    {/* Metric Cards Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                        <MetricCard 
                            icon={<Heart size={20} />} 
                            label="Avg Heart Rate" 
                            value="72" 
                            unit="bpm" 
                            change="↘ 4% vs last period" 
                            color="text-red-500" 
                        />
                        <MetricCard 
                            icon={<Activity size={20} />} 
                            label="Avg BP" 
                            value="118/76" 
                            unit="mmHg" 
                            change="Optimal Range" 
                            color="text-blue-500" 
                        />
                        <MetricCard 
                            icon={<Wind size={20} />} 
                            label="Avg SpO2" 
                            value="98.2" 
                            unit="%" 
                            change="Stable saturation" 
                            color="text-cyan-600" 
                        />
                        <MetricCard 
                            icon={<Thermometer size={20} />} 
                            label="Avg Temp" 
                            value="36.7" 
                            unit="°C" 
                            change="Normal temperature" 
                            color="text-amber-600" 
                        />
                    </div>

                    {/* Records Table Section */}
                    <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl border border-white/20">
                        {/* Table Controls */}
                        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-50">
                            <div className="flex items-center gap-2 bg-[#F4F8FA] p-1.5 rounded-2xl border border-[#E9EFF2]">
                                {['All Vitals', 'Heart Rate', 'Blood Pressure', 'SpO2'].map(tab => (
                                    <button 
                                        key={tab}
                                        onClick={() => setSelectedTab(tab)}
                                        className={`px-5 py-2 rounded-xl text-[12px] font-black transition-all ${selectedTab === tab ? 'bg-[#0B1F4D] text-white shadow-lg' : 'text-[#627382] hover:text-[#0B1F4D]'}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[#627382] text-[11px] font-black uppercase tracking-widest opacity-60">Sort by:</span>
                                <select className="bg-white border-2 border-[#F0F4F5] rounded-xl px-4 py-2 text-[12px] font-bold outline-none focus:border-[#1A7785] transition-all cursor-pointer">
                                    <option>Newest First</option>
                                    <option>Oldest First</option>
                                </select>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[#FBFCFD] border-b border-gray-50">
                                        <th className="px-8 py-5 text-left text-[#627382] text-[10px] font-black uppercase tracking-[0.2em] opacity-60 whitespace-nowrap">Date & Time</th>
                                        {(selectedTab === 'All Vitals' || selectedTab === 'Heart Rate') && (
                                            <th className="px-8 py-5 text-left text-[#627382] text-[10px] font-black uppercase tracking-[0.2em] opacity-60 whitespace-nowrap">Heart Rate</th>
                                        )}
                                        {(selectedTab === 'All Vitals' || selectedTab === 'Blood Pressure') && (
                                            <th className="px-8 py-5 text-left text-[#627382] text-[10px] font-black uppercase tracking-[0.2em] opacity-60 whitespace-nowrap">Blood Pressure</th>
                                        )}
                                        {(selectedTab === 'All Vitals' || selectedTab === 'SpO2') && (
                                            <th className="px-8 py-5 text-left text-[#627382] text-[10px] font-black uppercase tracking-[0.2em] opacity-60 whitespace-nowrap">SpO2</th>
                                        )}
                                        <th className="px-8 py-5 text-left text-[#627382] text-[10px] font-black uppercase tracking-[0.2em] opacity-60 whitespace-nowrap">Temperature</th>
                                        <th className="px-8 py-5 text-left text-[#627382] text-[10px] font-black uppercase tracking-[0.2em] opacity-60 whitespace-nowrap">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {vitalsData.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors cursor-pointer group">
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col text-left">
                                                    <span className="text-[#0D1C2E] text-[14px] font-bold mb-0.5 whitespace-nowrap">{row.date}</span>
                                                    <span className="text-[#627382] text-[11px] font-medium opacity-60 whitespace-nowrap">{row.time}</span>
                                                </div>
                                            </td>
                                            {(selectedTab === 'All Vitals' || selectedTab === 'Heart Rate') && (
                                                <td className="px-8 py-6">
                                                    <div className="flex items-baseline gap-1">
                                                        <span className={`text-[16px] font-bold ${idx === 2 ? 'text-rose-500' : 'text-[#0D1C2E]'}`}>{row.hr}</span>
                                                        <span className="text-[10px] font-bold text-[#627382] opacity-40">BPM</span>
                                                    </div>
                                                </td>
                                            )}
                                            {(selectedTab === 'All Vitals' || selectedTab === 'Blood Pressure') && (
                                                <td className="px-8 py-6 text-[#0D1C2E] text-[14px] font-bold tracking-tight text-left">{row.bp}</td>
                                            )}
                                            {(selectedTab === 'All Vitals' || selectedTab === 'SpO2') && (
                                                <td className="px-8 py-6 text-[#0D1C2E] text-[14px] font-bold text-left">{row.spo2}</td>
                                            )}
                                            <td className="px-8 py-6 text-[#0D1C2E] text-[14px] font-bold text-left">{row.temp}</td>
                                            <td className="px-8 py-6">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border whitespace-nowrap ${row.statusColor}`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="p-6 md:px-8 border-t border-gray-50 flex items-center justify-between">
                            <p className="text-[#627382] text-[12px] font-medium opacity-60 italic">
                                Showing {(currentPage - 1) * 4 + 1} to {currentPage * 4} of 128 records
                            </p>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#627382] hover:bg-[#F4F8FA] transition-all"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                {[1, 2, 3].map(pageNum => (
                                    <button 
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-bold transition-all ${currentPage === pageNum ? 'bg-[#0B1F4D] text-white shadow-lg' : 'text-[#627382] hover:bg-[#F4F8FA]'}`}
                                    >
                                        {pageNum}
                                    </button>
                                ))}
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.min(3, prev + 1))}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#627382] hover:bg-[#F4F8FA] transition-all"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Branding Footer */}
                    <div className="mt-12 group cursor-pointer">
                        <div className="relative h-[200px] rounded-[40px] overflow-hidden bg-gradient-to-r from-[#0B3A4F] via-[#125A6C] to-[#1A7785] p-10 flex flex-col items-center justify-center text-center shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
                            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-32 -translate-y-32" />
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-x-32 translate-y-32" />
                            
                            <h2 className="relative z-10 text-white/40 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Built for Modern Care</h2>
                            <h3 className="relative z-10 text-white text-[42px] font-black tracking-tight leading-tight flex items-center gap-3">
                                VaidyaGo <span className="w-px h-10 bg-white/20" /> <span className="opacity-80">Your Health, Digitally Refined.</span>
                            </h3>
                        </div>
                    </div>
                </main>
            </div>
            
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
            `}</style>
        </div>
    );
};

export default VitalsHistory;
