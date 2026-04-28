import React, { useState } from 'react';
import { X, FileText, Download, Check } from 'lucide-react';
import Pdf_ready from './Pdf_ready';

const Pdf = ({ onClose }) => {
    const [selectedFormat, setSelectedFormat] = useState('summary');
    const [isReady, setIsReady] = useState(false);
    const [options, setOptions] = useState({
        notes: true,
        labs: false,
        vitals: true
    });

    const formats = [
        { id: 'summary', title: 'Clinical Summary', desc: 'Brief overview of all sessions' },
        { id: 'detailed', title: 'Detailed Schedule', desc: 'Full breakdown with room info' },
        { id: 'simplified', title: 'Simplified View', desc: 'Calendar-only list format' }
    ];

    const toggleOption = (opt) => {
        setOptions(prev => ({ ...prev, [opt]: !prev[opt] }));
    };

    if (isReady) {
        return <Pdf_ready onClose={onClose} />;
    }

    return (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[6px]" onClick={onClose}></div>

            {/* Modal Container */}
            <div className="relative w-full max-w-[420px] bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
                
                {/* Header */}
                <div className="p-5 pb-3.5 flex items-center justify-between border-b border-gray-300">
                    <div>
                        <h2 className="text-[20px] font-[900] text-[#0D1C2E]">Export Schedule</h2>
                        <p className="text-gray-400 text-[12px] font-medium mt-0.5">Select format and details</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="p-5 space-y-5">
                    {/* Format Selection */}
                    <div className="space-y-2.5">
                        {formats.map((format) => (
                            <button
                                key={format.id}
                                onClick={() => setSelectedFormat(format.id)}
                                className={`w-full p-3.5 rounded-[20px] border-2 transition-all text-left flex items-center gap-3.5 group ${
                                    selectedFormat === format.id 
                                        ? 'border-[#1A7785] bg-[#EBF7F8]' 
                                        : 'border-gray-300 hover:border-gray-200 bg-white'
                                }`}
                            >
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                    selectedFormat === format.id ? 'bg-[#1A7785] text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'
                                }`}>
                                    <FileText size={18} />
                                </div>
                                <div className="flex-1">
                                    <p className={`text-[14px] font-[800] ${selectedFormat === format.id ? 'text-[#1A7785]' : 'text-[#0D1C2E]'}`}>
                                        {format.title}
                                    </p>
                                    <p className="text-[11px] text-gray-400 font-medium leading-tight">{format.desc}</p>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                    selectedFormat === format.id ? 'border-[#1A7785] bg-[#1A7785] text-white' : 'border-gray-200'
                                }`}>
                                    {selectedFormat === format.id && <Check size={12} strokeWidth={4} />}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Additional Options */}
                    <div className="space-y-2.5">
                        <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] px-1">Include in PDF</h3>
                        <div className="grid grid-cols-1 gap-2">
                            {[
                                { key: 'notes', label: 'Doctor Notes' },
                                { key: 'labs', label: 'Lab Results' },
                                { key: 'vitals', label: 'Vitals History' }
                            ].map((opt) => (
                                <button
                                    key={opt.key}
                                    onClick={() => toggleOption(opt.key)}
                                    className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-300"
                                >
                                    <span className="text-[13px] font-bold text-[#0D1C2E]">{opt.label}</span>
                                    <div className={`w-9 h-4.5 rounded-full relative transition-colors duration-200 ${options[opt.key] ? 'bg-[#1A7785]' : 'bg-gray-300'}`}>
                                        <div className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full transition-all duration-200 ${options[opt.key] ? 'left-5' : 'left-0.5'}`} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2.5 pt-1">
                        <button 
                            onClick={onClose}
                            className="flex-1 py-3.5 text-[#0D1C2E] font-bold text-[14px] hover:bg-gray-50 rounded-[20px] transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={() => setIsReady(true)}
                            className="flex-[1.5] bg-gradient-to-r from-[#1A7785] to-[#49AAB3] text-white py-3.5 rounded-[20px] font-bold text-[14px] shadow-lg shadow-[#1A7785]/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            <Download size={18} /> Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pdf;
