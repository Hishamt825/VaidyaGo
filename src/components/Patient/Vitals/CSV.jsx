import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, FileText, Download, X } from 'lucide-react';
import duckImg from '../../../assets/duck.png';

const CSV = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleReturn = () => {
        onClose();
        navigate('/Vitals');
    };

    return (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-[420px] bg-white rounded-[40px] shadow-2xl overflow-hidden border border-white/10 p-10 flex flex-col items-center">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-300 hover:text-[#0D1C2E] transition-colors z-10"
                >
                    <X size={20} />
                </button>

                {/* Success Icon */}
                <div className="w-16 h-16 rounded-full bg-[#E0F7F9] flex items-center justify-center mb-6">
                    <div className="w-11 h-11 rounded-full bg-[#0D6D7A] flex items-center justify-center text-white shadow-lg">
                        <Check size={24} strokeWidth={3} />
                    </div>
                </div>

                {/* Text Content */}
                <h2 className="text-[#0D1C2E] text-[24px] font-black tracking-tight mb-2">Vitals Exported Successfully</h2>
                <p className="text-[#627382] text-[12px] font-bold opacity-60 leading-relaxed text-center mb-8 px-4">
                    Your vitals history has been compiled and is securely ready for download as a raw data file.
                </p>

                {/* File Preview Box */}
                <div className="w-full bg-[#F2F9FA] rounded-[24px] p-5 flex items-center gap-4 border border-[#E1EEF0] mb-8">
                    <div className="w-12 h-12 bg-[#D1E9EC] rounded-xl flex items-center justify-center text-[#0D6D7A]">
                        <FileText size={24} />
                    </div>
                    <div className="flex-1">
                        <p className="text-[#0D1C2E] text-[14px] font-black tracking-tight mb-0.5">Vitals_History_Rivera_Q3.csv</p>
                        <div className="flex items-center gap-3">
                            <span className="bg-[#0D6D7A]/10 text-[#0D6D7A] text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">Raw CSV</span>
                            <span className="text-[#627382] text-[10px] font-bold opacity-50">1.2 MB</span>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="w-full space-y-4 text-center">
                    <button 
                        onClick={onClose}
                        className="w-full h-[56px] bg-gradient-to-r from-[#125A6C] to-[#1A7785] text-white rounded-full font-bold text-[16px] shadow-xl shadow-teal-900/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        <Download size={18} strokeWidth={2.5} />
                        Download CSV Now
                    </button>
                    <button 
                        onClick={handleReturn}
                        className="text-[#1A7785] text-[16px] font-bold hover:underline underline-offset-4 transition-all"
                    >
                        Return to Dashboard
                    </button>
                </div>

                {/* Mascot Bubble - Absolute Positioned */}
                <div className="absolute -bottom-28 -right-16 hidden lg:flex items-center gap-4">
                     <div className="relative bg-white p-4 rounded-[20px] shadow-2xl border border-gray-50 max-w-[200px] mb-12">
                        <p className="text-[#627382] text-[10px] font-bold leading-tight">
                            CSV files are great for spreadsheets and advanced medical analysis!
                        </p>
                        {/* Tooltip Arrow */}
                        <div className="absolute bottom-[-8px] right-6 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45"></div>
                     </div>
                     <div className="w-24 h-24 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white flex items-center justify-center mb-8">
                        <img src={duckImg} alt="Mascot" className="w-full h-full object-contain p-1" />
                     </div>
                </div>
            </div>
        </div>
    );
};

export default CSV;
