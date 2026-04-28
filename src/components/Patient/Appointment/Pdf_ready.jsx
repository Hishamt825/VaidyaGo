import React, { useState } from 'react';
import { X, Calendar, ShieldCheck, Download } from 'lucide-react';
import Generate from './Generate';

const Pdf_ready = ({ onClose }) => {
    const [dateRange, setDateRange] = useState('Current Month');
    const [isGenerating, setIsGenerating] = useState(false);
    const [content, setContent] = useState({
        schedule: true,
        notes: true,
        links: false
    });

    if (isGenerating) {
        return <Generate onClose={onClose} />;
    }

    return (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[8px]" onClick={onClose}></div>

            {/* Modal Container */}
            <div className="relative w-full max-w-[440px] bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                
                {/* Header */}
                <div className="px-6 pt-6 pb-4 flex items-start justify-between border-b border-gray-100">
                    <div>
                        <h2 className="text-[22px] font-[900] text-[#0D1C2E] leading-tight">Export PDF</h2>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mt-0.5">Schedule Manifest</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Select Date Range */}
                    <div>
                        <h3 className="text-[11px] font-black text-[#0D1C2E] uppercase tracking-[0.15em] mb-3">Select Date Range</h3>
                        <div className="flex gap-2.5">
                            {['Current Month', 'Last 3 Months', 'Custom'].map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setDateRange(range)}
                                    className={`flex-1 py-2.5 px-1 rounded-full text-[12px] font-bold border-2 transition-all flex items-center justify-center gap-1.5 ${
                                        dateRange === range 
                                            ? 'border-[#1A7785] bg-[#EBF7F8] text-[#1A7785]' 
                                            : 'border-gray-200 text-gray-400 hover:border-gray-300'
                                    }`}
                                >
                                    {range} {range === 'Custom' && <Calendar size={12} />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content to Include */}
                    <div>
                        <h3 className="text-[11px] font-black text-[#0D1C2E] uppercase tracking-[0.15em] mb-3">Content to Include</h3>
                        <div className="bg-[#F5F9FA] rounded-[20px] p-4 space-y-3">
                            {[
                                { id: 'schedule', label: 'Full Schedule' },
                                { id: 'notes', label: 'Clinical Notes' },
                                { id: 'links', label: 'Prescription Links' }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setContent(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                                    className="flex items-center gap-3.5 w-full group"
                                >
                                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                                        content[item.id] ? 'bg-[#1A7785] border-[#1A7785] text-white' : 'border-gray-300 bg-white'
                                    }`}>
                                        {content[item.id] && <X className="rotate-45" size={12} strokeWidth={4} />}
                                    </div>
                                    <span className="text-[14px] font-bold text-[#0D1C2E] group-hover:text-[#1A7785] transition-colors">
                                        {item.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Privacy & Security */}
                    <div className="bg-[#F8F9FA] rounded-[20px] p-4 flex items-start gap-3.5 border-l-4 border-[#1A7785]">
                        <div className="w-9 h-9 bg-white rounded-lg shadow-sm flex items-center justify-center text-[#1A7785] shrink-0">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <h4 className="text-[13px] font-bold text-[#0D1C2E] mb-0.5 text-left">Privacy & Security</h4>
                            <p className="text-[10.5px] text-gray-400 leading-snug font-medium text-left">
                                This document is generated with end-to-end encryption and is HIPAA compliant.
                            </p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button 
                        onClick={() => setIsGenerating(true)}
                        className="w-full bg-gradient-to-r from-[#49AAB3] to-[#1A7785] text-white py-4 rounded-[20px] font-bold text-[15px] shadow-lg shadow-[#1A7785]/20 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5"
                    >
                        <Download size={18} strokeWidth={3} /> Generate & Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pdf_ready;
