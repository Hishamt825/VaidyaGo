import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Share2, Download, Activity, Wind, Droplets, Heart as HeartIcon, CheckCircle2, FileText } from 'lucide-react';
import phImg from '../../../assets/ph.png';

const Health_report = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 overflow-y-auto pt-20 pb-20">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#0D1C2E]/60 backdrop-blur-2xl"
                    />

                    {/* Report Document */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-[850px] bg-white rounded-[32px] shadow-[0_32px_120px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col my-auto border border-white/20"
                    >
                        {/* Close Button */}
                        <button 
                            onClick={onClose}
                            className="absolute top-8 right-8 w-11 h-11 rounded-full bg-[#F5F8F9] flex items-center justify-center text-[#627382] hover:bg-[#E9EFF2] hover:text-[#0D1C2E] transition-all z-20 shadow-sm border border-[#F0F4F5]"
                        >
                            <X size={22} />
                        </button>

                        {/* Top Header Branding Section */}
                        <div className="p-8 border-b border-[#F0F4F5] relative overflow-hidden">
                            {/* Decorative background shape */}
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F0F7F8] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-60 pointer-events-none" />
                            
                            <div className="flex justify-between items-start mb-8 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#0D1C2E] rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-900/10">
                                        <div className="bg-[#6ED4D4] w-6 h-6 rounded-lg blur-[8px] absolute opacity-40 animate-pulse" />
                                        <Activity size={20} className="relative z-10" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[#0D1C2E] text-[20px] font-black tracking-tight leading-none mb-1">VaidyaGo</span>
                                        <span className="text-[#1A7785] text-[8px] font-black uppercase tracking-[0.2em] opacity-40">Digital Health Network</span>
                                    </div>
                                </div>
                                <div className="bg-[#F0F7F8] border border-[#E0F2F1] px-5 py-2.5 rounded-2xl flex flex-col items-end shadow-sm">
                                    <span className="text-[#1A7785] text-[9px] font-black uppercase tracking-widest leading-none mb-1 opacity-70">REPORT ID</span>
                                    <span className="text-[#0D1C2E] text-[15px] font-bold tracking-tight">RP-2023-QX44</span>
                                </div>
                            </div>
                            
                            <h1 className="text-[#0B1F4D] text-[28px] font-black tracking-tight leading-none mb-2 text-left relative z-10">Comprehensive Health Report</h1>
                            <p className="text-[#1A7785] text-[10px] font-black uppercase tracking-[0.25em] opacity-80 text-left relative z-10">QUARTERLY REVIEW • Q4 2023</p>
                        </div>

                        {/* Patient Demographics Banner */}
                        <div className="bg-[#F8FAFB] px-8 py-5 grid grid-cols-4 gap-10 border-b border-[#F0F4F5]">
                            {[
                                { label: 'Patient Name', value: 'Alex Rivera' },
                                { label: 'Date of Birth', value: '12/04/1988' },
                                { label: 'Patient ID', value: 'VG-9921' },
                                { label: 'Report Date', value: 'December 20, 2023' }
                            ].map((info) => (
                                <div key={info.label}>
                                    <p className="text-[#627382] text-[9px] font-black uppercase tracking-widest mb-1 opacity-60">{info.label}</p>
                                    <p className="text-[#0D1C2E] text-[14px] font-bold">{info.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Report Body Content */}
                        <div className="p-8 space-y-8">
                            
                            {/* Clinical Summary Section */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-lg bg-[#E0F2F1] text-[#1A7785] flex items-center justify-center">
                                        <FileText size={14} className="stroke-[2.5]" />
                                    </div>
                                    <h3 className="text-[#0B1F4D] text-[14px] font-black tracking-tight uppercase">Clinical Summary</h3>
                                </div>
                                <div className="bg-[#F0F7F8] border-l-[4px] border-[#1A7785] p-5 rounded-r-2xl shadow-sm border border-[#D0E0E2]">
                                    <p className="text-[#455A64] text-[13px] leading-relaxed font-medium">
                                        Alex continues to demonstrate excellent cardiovascular health and respiratory function. Observations over the Q4 period indicate stable vital metrics within the optimal clinical range. Blood pressure levels have remained consistently managed through lifestyle interventions. Recovery heart rate post-activity has improved by <span className="text-[#1A7785] font-black">4.2%</span> since the previous quarter, indicating a positive trend in aerobic fitness.
                                    </p>
                                </div>
                            </div>

                            {/* Key Health Metrics Section */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-lg bg-[#FBE9E7] text-[#E64A19] flex items-center justify-center">
                                        <Activity size={14} className="stroke-[2.5]" />
                                    </div>
                                    <h3 className="text-[#0B1F4D] text-[14px] font-black tracking-tight uppercase">Key Health Metrics</h3>
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    {[
                                        { label: 'Heart Rate', value: '72', unit: 'BPM', status: 'OPTIMAL', icon: <HeartIcon />, color: '#EF5350', bg: 'rgba(239, 83, 80, 0.08)' },
                                        { label: 'Blood Pressure', value: '118/76', unit: 'mmHg', status: 'NORMAL', icon: <Droplets />, color: '#1E88E5', bg: 'rgba(30, 136, 229, 0.08)' },
                                        { label: 'Oxygen Sat.', value: '99', unit: '%', status: 'OPTIMAL', icon: <Activity />, color: '#00897B', bg: 'rgba(0, 137, 123, 0.08)' },
                                        { label: 'Respiratory', value: '14', unit: 'br/m', status: 'NORMAL', icon: <Wind />, color: '#0288D1', bg: 'rgba(2, 136, 209, 0.08)' }
                                    ].map((m) => (
                                        <div key={m.label} className="p-5 rounded-[24px] border border-[#D0D7DA] hover:shadow-xl transition-all duration-300 bg-white group">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-2.5 rounded-xl transition-colors" style={{ backgroundColor: m.bg, color: m.color }}>
                                                    {React.cloneElement(m.icon, { size: 16, className: "stroke-[2.5]" })}
                                                </div>
                                                <span className={`text-[8px] font-black px-2 py-0.5 rounded-lg tracking-wider ${m.status === 'OPTIMAL' ? 'bg-[#E0F2F1] text-[#1A7785]' : 'bg-[#E3F2FD] text-[#1E88E5]'}`}>
                                                    {m.status}
                                                </span>
                                            </div>
                                            <p className="text-[#627382] text-[10px] font-bold mb-1 opacity-60">{m.label}</p>
                                            <div className="flex items-baseline gap-1.5">
                                                <span className="text-[#0D1C2E] text-[24px] font-black leading-none tracking-tight group-hover:scale-110 transition-transform origin-left">{m.value}</span>
                                                <span className="text-[#B0BEC5] text-[9px] font-extrabold">{m.unit}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Detail Trend Cards */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 bg-[#F8FAFB] rounded-[24px] space-y-3 border border-[#E0E7E9] shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-white shadow-sm border border-[#E0E7E9] flex items-center justify-center">
                                            <Activity size={14} className="text-[#1A7785]" />
                                        </div>
                                        <h4 className="text-[#0B1F4D] text-[13px] font-black uppercase tracking-tight">Heart Rate Stability</h4>
                                    </div>
                                    <p className="text-[#627382] text-[12px] leading-relaxed font-medium opacity-80">
                                        Resting heart rate has shown remarkable consistency over the last 30 days, fluctuating within a narrow 3 BPM window.
                                    </p>
                                </div>
                                <div className="p-6 bg-[#F8FAFB] rounded-[24px] space-y-3 border border-[#D0D7D9] shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-white shadow-sm border border-[#D0D7D9] flex items-center justify-center">
                                            <Activity size={14} className="text-[#0B1F4D]" />
                                        </div>
                                        <h4 className="text-[#0B1F4D] text-[13px] font-black uppercase tracking-tight">BP Trends</h4>
                                    </div>
                                    <p className="text-[#627382] text-[12px] leading-relaxed font-medium opacity-80">
                                        Systolic and diastolic pressures have stabilized compared to Q3. Morning readings show improved regulation.
                                    </p>
                                </div>
                            </div>

                            {/* Physician's Remarks Section */}
                            <div className="space-y-6 pt-6 border-t border-[#F0F4F5]">
                                <h3 className="text-[#0B1F4D] text-[15px] font-black tracking-tight uppercase">Physician's Remarks</h3>
                                <div className="flex gap-6 items-start">
                                    <div className="relative">
                                        <img src={phImg} alt="Dr. Thorne" className="w-14 h-14 rounded-[20px] object-cover shadow-xl relative z-10" />
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg z-20 border border-white">
                                            <CheckCircle2 size={12} className="text-[#1A7785]" />
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <p className="text-[#455A64] text-[13px] italic font-medium leading-relaxed bg-[#F8FAFB] p-5 rounded-2xl rounded-tl-none border-t border-white relative">
                                            "Alex, the data looks excellent. Your consistency with daily movement is reflecting well in your recovery heart rate metrics."
                                        </p>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[#0D1C2E] text-[15px] font-black">Dr. Julian Thorne, MD</p>
                                                <p className="text-[#627382] text-[10px] font-bold uppercase tracking-widest opacity-60">Chief of Cardiology</p>
                                            </div>
                                            <div className="text-right flex flex-col items-end opacity-20 translate-y-2 pointer-events-none select-none">
                                                <span className="text-[#0D1C2E] text-[20px] font-serif italic font-black text-right">J.Thorne</span>
                                                <span className="text-[9px] font-black uppercase tracking-tight">Digital Signature</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* High-Security Verified Footer Banner */}
                        <div className="bg-[#0D1C2E] p-8 flex items-center justify-between">
                            <div className="flex items-center gap-4 text-white/90">
                                <div className="w-12 h-12 rounded-[18px] bg-white/5 border border-white/10 flex items-center justify-center p-2.5 relative group">
                                    <div className="bg-white/10 w-full h-full rounded-[12px] flex items-center justify-center border border-white/10">
                                         <CheckCircle2 size={24} className="text-[#6ED4D4]" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Shield size={14} className="text-[#6ED4D4]" />
                                        <p className="text-[13px] font-black uppercase tracking-widest text-[#6ED4D4]">Digitally Verified</p>
                                    </div>
                                    <p className="text-white/40 text-[9px] font-medium leading-normal max-w-[280px]">
                                        Document cryptographically signed on the <span className="text-white/60">VaidyaGo ledger</span>.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-5 py-3 rounded-2xl font-bold text-[12px] hover:bg-white/10 transition-all">
                                    <Share2 size={16} />
                                    Share
                                </button>
                                <button className="flex items-center gap-2 bg-gradient-to-r from-[#1A7785] to-[#49AAB3] text-white px-7 py-3 rounded-2xl font-black text-[12px] shadow-lg hover:scale-105 transition-all">
                                    <Download size={16} />
                                    Export PDF
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Health_report;
