import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, LayoutDashboard, X, ClipboardList } from 'lucide-react';

const Confirme = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleDashboard = () => {
        onClose();
        navigate('/Medication');
    };

    return (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#0D1C2E]/60 backdrop-blur-md transition-opacity duration-300" 
                onClick={onClose}
            />
            
            {/* Modal Container */}
            <div className="relative w-full max-w-[420px] bg-white rounded-[32px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] flex flex-col items-center">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-300 hover:text-[#0D1C2E] transition-colors z-10"
                >
                    <X size={18} />
                </button>

                {/* Content Section */}
                <div className="w-full p-8 pt-10 flex flex-col items-center">
                    
                    {/* Success Icon */}
                    <div className="w-16 h-16 rounded-full bg-[#E0F7F9] flex items-center justify-center mb-6">
                        <div className="w-11 h-11 rounded-full bg-[#0D6D7A] flex items-center justify-center text-white shadow-lg">
                            <Check size={24} strokeWidth={3} />
                        </div>
                    </div>

                    {/* Title & Description */}
                    <h2 className="text-[#0D1C2E] text-[24px] font-black text-center leading-tight mb-2 tracking-tight">
                        Callback Request Confirmed!
                    </h2>
                    <p className="text-[#627382] text-[13px] font-bold text-center leading-relaxed mb-6 px-4 opacity-70">
                        Our team will call you back within <span className="text-[#0D6D7A]">15 minutes</span> at <span className="text-[#0D1C2E] font-black">+1 (555) 012-3456</span>.
                    </p>

                    {/* Details Card */}
                    <div className="w-full bg-[#F2F9FA] rounded-[24px] p-4 flex items-center gap-4 border border-[#E1EEF0] mb-6">
                        <div className="w-12 h-12 bg-white rounded-[16px] flex items-center justify-center text-[#0D6D7A] shadow-sm border border-[#E1EEF0] shrink-0">
                            <ClipboardList size={22} />
                        </div>
                        <div className="flex-1">
                            <p className="text-[#0D6D7A] text-[9px] font-black uppercase tracking-widest mb-0.5 opacity-60">Request Details</p>
                            <p className="text-[#0D1C2E] text-[14px] font-black">Medical Support Specialist</p>
                            <p className="text-[#627382] text-[11px] font-bold opacity-50 tracking-tight">Reference ID: VG-99210-CB</p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="w-full space-y-3">
                        <button 
                            onClick={handleDashboard}
                            className="w-full h-[56px] bg-gradient-to-r from-[#125A6C] to-[#1A7785] text-white rounded-full font-black text-[16px] shadow-xl shadow-teal-900/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            <LayoutDashboard size={18} strokeWidth={2.5} />
                            View Dashboard
                        </button>
                        <button 
                            onClick={onClose}
                            className="w-full h-[56px] text-[#0D1C2E] rounded-full font-black text-[15px] hover:bg-gray-50 transition-all flex items-center justify-center opacity-60 hover:opacity-100"
                        >
                            Close
                        </button>
                    </div>
                </div>

                {/* Footer Bar */}
                <div className="w-full bg-[#F4F8FA] py-3 px-8 border-t border-[#E1EEF0] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0D6D7A]" />
                        <span className="text-[#0D1C2E] text-[9px] font-black uppercase tracking-widest opacity-30">VaidyaGo SECURE SESSION</span>
                    </div>
                    <span className="text-[#627382] text-[9px] font-bold opacity-30">Auto-closing in 30s</span>
                </div>
            </div>
        </div>
    );
};


export default Confirme;
