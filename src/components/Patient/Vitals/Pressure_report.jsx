import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Download } from 'lucide-react';

const Pressure_report = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const logs = [
        { date: 'OCT 24', time: '08:45 AM', value: '120/80', status: 'OPTIMAL' },
        { date: 'OCT 23', time: '09:12 AM', value: '118/76', status: 'OPTIMAL' },
        { date: 'OCT 22', time: '08:30 AM', value: '122/82', status: 'NORMAL' },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="relative w-full max-w-[720px] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/20"
                    >
                        {/* Left Sidebar - Teal Gradient */}
                        <div className="w-full md:w-[38%] bg-gradient-to-br from-[#0B3A4F] via-[#125A6C] to-[#1A7785] p-8 flex flex-col justify-between relative overflow-hidden">
                            {/* Decorative Blur */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-6 translate-x-6 pointer-events-none" />
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-8">
                                    <div className="w-8 h-1 bg-[#6ED4D4] rounded-full" />
                                    <span className="text-white text-[18px] font-black tracking-tight">VaidyaGo</span>
                                </div>
                                
                                <div className="space-y-1">
                                    <h2 className="text-white text-[28px] font-bold tracking-tight leading-tight">Pressure History</h2>
                                    <p className="text-[#6ED4D4] text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Clinical Data</p>
                                </div>

                                <div className="mt-10 flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Patient Name</p>
                                        <p className="text-white text-[16px] font-bold">Alex Rivera</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/10 rounded-[24px] p-5 mt-8 shadow-sm">
                                <p className="text-white/60 text-[9px] font-black uppercase tracking-widest mb-1">Average SYS/DIA</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-white text-[24px] font-black tracking-tight">118/76</span>
                                    <span className="text-white/50 text-[11px] font-bold">mmHg</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - White Document Style */}
                        <div className="flex-1 p-8 bg-white flex flex-col relative items-start">
                            {/* Close Button */}
                            <button 
                                onClick={onClose}
                                className="absolute top-8 right-8 text-[#627382] hover:text-[#0D1C2E] transition-colors"
                            >
                                <X size={22} />
                            </button>

                            <div className="mb-8 text-left">
                                <h1 className="text-[#0D1C2E] text-[28px] font-bold tracking-tight mb-1">Measurement Logs</h1>
                                <p className="text-[#627382] text-[12px] font-medium opacity-70">Reviewing last 30 days of telemetry</p>
                            </div>

                            {/* Logs List */}
                            <div className="flex-1 space-y-3 overflow-y-auto max-h-[240px] w-full pr-0 scrollbar-hide">
                                <style>{`
                                    .scrollbar-hide::-webkit-scrollbar { display: none; }
                                    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                                `}</style>
                                {logs.map((log, idx) => (
                                    <div key={idx} className="bg-[#F4F8FA] border border-[#E9EFF2] rounded-[24px] p-4 flex items-center justify-between group hover:border-[#1A7785]/30 transition-all">
                                        <div className="flex items-center gap-6">
                                            {/* Date Badge */}
                                            <div className="flex flex-col items-center justify-center bg-white border border-[#E9EFF2] rounded-2xl w-14 h-14 shadow-sm group-hover:shadow-md transition-all">
                                                <span className="text-[#627382] text-[8px] font-black uppercase leading-none mb-1 opacity-60">{log.date.split(' ')[0]}</span>
                                                <span className="text-[#0D1C2E] text-[20px] font-black leading-none">{log.date.split(' ')[1]}</span>
                                            </div>
                                            
                                            <div className="h-10 w-px bg-[#E9EFF2]" />

                                            <div className="text-left">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[#0D1C2E] text-[22px] font-black tracking-tight">{log.value}</span>
                                                    <span className="text-[#627382] text-[10px] font-bold opacity-60 uppercase">{log.time}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1A7785]" />
                                                    <span className="text-[#1A7785] text-[9px] font-black uppercase tracking-widest">{log.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="w-full h-px bg-[#F0F4F5] my-6" />

                            {/* Action Footer */}
                            <div className="grid grid-cols-2 gap-4 w-full">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="h-[56px] bg-[#0B1F4D] text-white rounded-full font-bold text-[14px] flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                                >
                                    <Download size={18} />
                                    Export PDF
                                </motion.button>
                                <button 
                                    onClick={onClose}
                                    className="h-[56px] border-2 border-[#F0F4F5] text-[#627382] rounded-full font-bold text-[14px] hover:bg-[#F8FAFB] transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Pressure_report;
