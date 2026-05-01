import React from 'react';
import { X, ShieldCheck, Clock, FlaskConical, Box, Syringe, ChevronRight, Download, RefreshCw } from 'lucide-react';

const Patient_record = ({ onClose }) => {
    const records = [
        { 
            title: 'Lab Reports', 
            desc: 'Blood work, Metabolic panel, Lipid profile', 
            icon: <FlaskConical size={20} />, 
            badge: '3 New', 
            badgeColor: 'bg-[#C6F0F2] text-[#1A7785]' 
        },
        { 
            title: 'Imaging', 
            desc: 'MRI Results, X-Ray Scans, Ultrasound', 
            icon: <Box size={20} />, 
            status: 'Last updated 12 days ago' 
        },
        { 
            title: 'Vaccinations', 
            desc: 'Immunization history and booster schedules', 
            icon: <Syringe size={20} />, 
            status: 'Up to Date', 
            statusColor: 'text-[#1A7785]' 
        },
    ];

    return (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#0B1F4D]/40 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-[560px] bg-white rounded-[32px] overflow-hidden shadow-[0_32px_120px_rgba(0,0,0,0.35)] animate-in zoom-in-95 duration-200">
                
                {/* Header Area */}
                <div className="px-8 pt-8 pb-6 flex items-start justify-between">
                    <div>
                        <h2 className="text-[24px] font-bold text-[#0D1C2E]">Health Records</h2>
                        <p className="text-[13px] text-gray-400 font-medium">Serene Pulse Centralized Medical History</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="px-8 pb-8">
                    {/* Status Pills */}
                    <div className="flex gap-4 mb-8">
                        <div className="flex-1 bg-[#F1F7F9] rounded-[20px] p-4 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1A7785] shadow-sm">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Status</p>
                                <p className="text-[14px] font-bold text-[#0D1C2E]">Verified Profile</p>
                            </div>
                        </div>
                        <div className="flex-1 bg-[#F1F7F9] rounded-[20px] p-4 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-[#0B1F4D] flex items-center justify-center text-white shadow-sm">
                                <Clock size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Last Entry</p>
                                <p className="text-[14px] font-bold text-[#0D1C2E]">Oct 24, 2023</p>
                            </div>
                        </div>
                    </div>

                    {/* Record Categories */}
                    <div className="space-y-4 mb-8">
                        {records.map((record, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-[24px] hover:bg-gray-50 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-full bg-[#F1F7F9] flex items-center justify-center text-[#0D1C2E] group-hover:bg-[#0D1C2E] group-hover:text-white transition-all">
                                        {record.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-[16px] font-bold text-[#0D1C2E]">{record.title}</h4>
                                        <p className="text-[13px] text-gray-400 font-medium">{record.desc}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    {record.badge && (
                                        <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${record.badgeColor}`}>
                                            {record.badge}
                                        </span>
                                    )}
                                    {record.status && (
                                        <span className={`text-[11px] font-bold ${record.statusColor || 'text-gray-400'}`}>
                                            {record.status}
                                        </span>
                                    )}
                                    <ChevronRight size={18} className="text-gray-300 group-hover:text-[#1A7785] transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <button className="flex items-center gap-2 text-[14px] font-bold text-[#1A7785] hover:opacity-80 transition-opacity">
                            <Download size={18} />
                            Download All Records
                        </button>
                        <div className="flex items-center gap-6">
                            <button 
                                onClick={onClose}
                                className="text-[14px] font-bold text-[#4B5E6D] hover:text-[#0D1C2E] transition-colors"
                            >
                                Close
                            </button>
                            <button className="bg-gradient-to-r from-[#1A4568] to-[#1A7785] text-white px-8 py-3 rounded-full font-bold text-[14px] shadow-xl shadow-[#1A7785]/20 hover:opacity-90 transition-all flex items-center gap-2 active:scale-95">
                                <RefreshCw size={16} />
                                Sync Records
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Patient_record;
