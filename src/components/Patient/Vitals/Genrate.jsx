import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Table, ShieldCheck, Download } from 'lucide-react';

const Genrate = ({ isOpen, onClose, onGenerate }) => {
    const [period, setPeriod] = useState('3months');
    const [format, setFormat] = useState('pdf');

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
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
                        className="relative w-full max-w-[500px] bg-white rounded-[40px] shadow-2xl overflow-hidden border border-white/20"
                    >
                        {/* Header Gradient */}
                        <div className="relative h-[130px] bg-gradient-to-br from-[#0B3A4F] via-[#125A6C] to-[#1A7785] p-8 flex flex-col justify-center">
                            <button 
                                onClick={onClose}
                                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20 shadow-sm"
                            >
                                <X size={18} />
                            </button>
                            <span className="text-white text-[11px] font-bold tracking-[0.1em] mb-1 opacity-90 text-left">VaidyaGo ·</span>
                            <h2 className="text-white text-[28px] font-extrabold tracking-tight leading-[1.1] text-left">Download My<br />Full Report</h2>
                            
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-12 translate-x-12 pointer-events-none" />
                        </div>

                        {/* Body Content */}
                        <div className="p-6 space-y-5 bg-white relative z-10 -mt-5 rounded-t-[32px]">
                            
                            {/* Period Selection */}
                            <div className="space-y-3">
                                <label className="text-[#627382] text-[10px] font-black uppercase tracking-[0.2em] px-1">Select Period</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { id: '30days', label: 'Last 30 Days', sub: 'Standard Recap' },
                                        { id: '3months', label: 'Last 3 Months', sub: 'Quarterly Review' },
                                        { id: 'custom', label: 'Custom', sub: 'Specify Range' }
                                    ].map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setPeriod(opt.id)}
                                            className={`p-4 rounded-[20px] border text-left transition-all duration-300 ${
                                                period === opt.id 
                                                ? 'bg-[#F0F7F8] border-[#1A7785] shadow-sm transform scale-[1.02]' 
                                                : 'bg-[#F5F8F9] border-[#F5F8F9] hover:border-[#1A7785]/20'
                                            }`}
                                        >
                                            <p className={`text-[12px] font-bold mb-0.5 ${period === opt.id ? 'text-[#1A7785]' : 'text-[#0D1C2E]'}`}>{opt.label}</p>
                                            <p className="text-[#627382] text-[9px] font-medium leading-tight opacity-70">{opt.sub}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Format Selection */}
                            <div className="space-y-3">
                                <label className="text-[#627382] text-[10px] font-black uppercase tracking-[0.2em] px-1">File Format</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setFormat('pdf')}
                                        className={`flex items-center justify-between p-3 rounded-[20px] border transition-all duration-300 ${
                                            format === 'pdf' 
                                            ? 'bg-white border-[#F0F4F5] shadow-[0_8px_30px_rgb(0,0,0,0.04)] transform scale-[1.02]' 
                                            : 'bg-[#F5F8F9] border-[#F5F8F9] hover:border-[#1A7785]/20'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2.5 rounded-xl transition-colors ${format === 'pdf' ? 'text-[#1A7785]' : 'text-[#1A7785]/60'}`}>
                                                <FileText size={20} />
                                            </div>
                                            <span className={`text-[13px] font-bold ${format === 'pdf' ? 'text-[#0D1C2E]' : 'text-[#0D1C2E]/60'}`}>PDF Document</span>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${format === 'pdf' ? 'border-[#1A7785]' : 'border-[#D6E0E4]'}`}>
                                            {format === 'pdf' && <div className="w-2.5 h-2.5 rounded-full bg-[#1A7785]" />}
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setFormat('csv')}
                                        className={`flex items-center justify-between p-4 rounded-[20px] border transition-all duration-300 ${
                                            format === 'csv' 
                                            ? 'bg-white border-[#F0F4F5] shadow-[0_8px_30px_rgb(0,0,0,0.04)] transform scale-[1.02]' 
                                            : 'bg-[#F5F8F9] border-[#F5F8F9] hover:border-[#1A7785]/20'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2.5 rounded-xl transition-colors ${format === 'csv' ? 'text-[#1A7785]' : 'text-[#1A7785]/60'}`}>
                                                <Table size={20} />
                                            </div>
                                            <span className={`text-[13px] font-bold ${format === 'csv' ? 'text-[#0D1C2E]' : 'text-[#0D1C2E]/60'}`}>CSV Spreadsheet</span>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${format === 'csv' ? 'border-[#1A7785]' : 'border-[#D6E0E4]'}`}>
                                            {format === 'csv' && <div className="w-2.5 h-2.5 rounded-full bg-[#1A7785]" />}
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Security Notice Box */}
                            <div className="bg-[#F3F6F7] border border-[#E9ECEF] rounded-[24px] p-4 flex gap-4 shadow-inner shadow-slate-900/5">
                                <ShieldCheck className="text-[#627382] shrink-0 opacity-60" size={20} />
                                <p className="text-[#627382] text-[10px] font-medium leading-relaxed opacity-80">
                                    Your report is encrypted and contains sensitive health data. By downloading, you acknowledge that you are responsible for the security of this file.
                                </p>
                            </div>

                            {/* Footer Actions */}
                            <div className="space-y-3 pt-1">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        onClose();
                                        onGenerate();
                                    }}
                                    className="w-full h-[56px] bg-gradient-to-r from-[#0B1F4D] to-[#1A7785] text-white rounded-full font-bold text-[15px] shadow-xl shadow-teal-900/20 flex items-center justify-center gap-3 transition-all"
                                >
                                    <Download size={20} className="stroke-[2.5]" />
                                    Download Report
                                </motion.button>
                                <button 
                                    onClick={onClose}
                                    className="w-full text-[#627382] text-[11px] font-bold hover:text-[#0D1C2E] transition-colors text-center py-1"
                                >
                                    Cancel and return to reports
                                </button>
                            </div>
                        </div>

                        {/* Portal Footer Branding */}
                        <div className="bg-[#F8FAFB] px-8 py-3.5 flex items-center justify-between border-t border-[#F0F4F5]">
                            <span className="text-[#627382] text-[9px] font-black uppercase tracking-[0.25em] opacity-30">Secure Health Portal V4.2</span>
                            <div className="flex gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#0B1F4D]/20 transition-all group-hover:bg-[#0B1F4D]" />
                                <div className="w-1.5 h-1.5 rounded-full bg-[#0B1F4D]/20 animate-pulse delay-75" />
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1A7785] shadow-[0_0_8px_rgba(26,119,133,0.3)]" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Genrate;
