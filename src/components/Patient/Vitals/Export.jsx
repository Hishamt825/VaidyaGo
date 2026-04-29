import React, { useState } from 'react';
import { X, CheckCircle2, FileText, Table, ShieldCheck, Download } from 'lucide-react';

const Export = ({ isOpen, onClose, onGenerate }) => {
    const [selectedCategories, setSelectedCategories] = useState(['Vitals', 'Medications']);
    const [dateRange, setDateRange] = useState('Last 3 Months');
    const [format, setFormat] = useState('Clinical PDF');

    if (!isOpen) return null;

    const toggleCategory = (cat) => {
        if (selectedCategories.includes(cat)) {
            setSelectedCategories(selectedCategories.filter(c => c !== cat));
        } else {
            setSelectedCategories([...selectedCategories, cat]);
        }
    };

    const categories = ['Vitals', 'Medications', 'Appointments', 'Reports'];
    const ranges = ['Last 30 Days', 'Last 3 Months', 'Last 6 Months', 'Custom Range'];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop with Blur - No Motion */}
            <div 
                className="absolute inset-0 bg-[#0B1F4D]/40 backdrop-blur-md transition-none"
                onClick={onClose}
            ></div>

            {/* Modal Card - No Motion */}
            <div className="relative bg-white w-full max-w-[500px] rounded-[32px] overflow-hidden shadow-2xl border border-white/20">
                
                {/* Header */}
                <div className="p-6 pb-2">
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-[#1A7785] text-[18px] font-black tracking-tight">VaidyaGo</h2>
                        <button 
                            onClick={onClose}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[#627382] hover:bg-[#F4F8FA] transition-all"
                        >
                            <X size={18} strokeWidth={2.5} />
                        </button>
                    </div>
                    <h1 className="text-[#0D1C2E] text-[24px] font-black leading-tight">Export History</h1>
                    <p className="text-[#627382] text-[12px] font-bold opacity-60">Patient: Alex Rivera</p>
                </div>

                <div className="px-6 pb-6 space-y-4">
                    {/* Data Categories */}
                    <div>
                        <p className="text-[#627382] text-[9px] font-black uppercase tracking-[0.2em] mb-2 opacity-60">Categories</p>
                        <div className="grid grid-cols-2 gap-2">
                            {categories.map(cat => (
                                <div 
                                    key={cat}
                                    onClick={() => toggleCategory(cat)}
                                    className={`flex items-center gap-2 p-2.5 rounded-xl border-2 transition-all cursor-pointer ${selectedCategories.includes(cat) ? 'bg-[#F0F7F8] border-[#1A7785]' : 'bg-white border-[#F0F4F5] hover:border-[#E9EFF2]'}`}
                                >
                                    <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all ${selectedCategories.includes(cat) ? 'bg-[#1A7785] border-[#1A7785]' : 'border-[#D1D9E0]'}`}>
                                        {selectedCategories.includes(cat) && <CheckCircle2 size={10} className="text-white" strokeWidth={3} />}
                                    </div>
                                    <span className={`text-[13px] font-bold ${selectedCategories.includes(cat) ? 'text-[#0D1C2E]' : 'text-[#627382]'}`}>{cat}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Date Range */}
                    <div>
                        <p className="text-[#627382] text-[9px] font-black uppercase tracking-[0.2em] mb-2 opacity-60">Date Range</p>
                        <div className="flex flex-wrap gap-1.5">
                            {ranges.map(range => (
                                <button
                                    key={range}
                                    onClick={() => setDateRange(range)}
                                    className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all border-2 ${dateRange === range ? 'bg-[#0B1F4D] border-[#0B1F4D] text-white' : 'bg-white border-[#F0F4F5] text-[#627382] hover:border-[#E9EFF2]'}`}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Output Format */}
                    <div>
                        <p className="text-[#627382] text-[9px] font-black uppercase tracking-[0.2em] mb-2 opacity-60">Format</p>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { id: 'Clinical PDF', icon: <FileText size={20} />, desc: 'For Doctors' },
                                { id: 'Raw CSV', icon: <Table size={20} />, desc: 'For Data' }
                            ].map(item => (
                                <div 
                                    key={item.id}
                                    onClick={() => setFormat(item.id)}
                                    className={`p-3 rounded-2xl border-2 flex flex-col items-center text-center transition-all cursor-pointer ${format === item.id ? 'bg-[#F0F7F8] border-[#1A7785]' : 'bg-white border-[#F0F4F5] hover:border-[#E9EFF2]'}`}
                                >
                                    <div className={`mb-1.5 ${format === item.id ? 'text-[#1A7785]' : 'text-gray-300'}`}>
                                        {item.icon}
                                    </div>
                                    <p className={`text-[13px] font-black ${format === item.id ? 'text-[#0D1C2E]' : 'text-[#627382]'}`}>{item.id}</p>
                                    <p className="text-[9px] font-bold text-gray-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* HIPAA Compliance Info */}
                    <div className="bg-[#F0F7F8] rounded-2xl p-3 border border-[#D1EEF1] flex gap-3">
                        <ShieldCheck size={18} className="text-[#1A7785] shrink-0 mt-0.5" />
                        <p className="text-[#1A7785] text-[10px] font-bold leading-tight opacity-80">
                            HIPAA Compliant: Your data is protected by 256-bit encryption and complies with healthcare privacy standards.
                        </p>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 pb-6 pt-0 flex flex-col gap-2">
                    <button 
                        onClick={onGenerate}
                        className="w-full bg-gradient-to-r from-[#1A7785] to-[#125A6C] text-white py-3 rounded-xl font-black text-[15px] shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                        <Download size={18} strokeWidth={2.5} />
                        Generate & Download
                    </button>
                    <button 
                        onClick={onClose}
                        className="w-full text-[#627382] text-[13px] font-black hover:text-[#0D1C2E] transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Export;
