import React from 'react';
import { useNavigate } from 'react-router-dom';

const Tomorrow = ({ onClose }) => {
    const navigate = useNavigate();
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop Blur */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />
            
            {/* Modal Card */}
            <div className="relative w-full max-w-[440px] bg-white rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col">
                
                {/* Header Section (White) */}
                <div className="bg-white px-8 pt-6 pb-10 flex flex-col items-center text-center">
                    <div className="w-full flex items-center justify-between mb-4">
                        <span className="text-[15px] font-bold text-[#1A7785]">Clinical Sanctuary</span>
                        <button 
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Status Badge */}
                    <div className="bg-[#B2F5EA] text-[#006B7D] px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-5 flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#006B7D]" />
                        Ready for Pickup/Delivery
                    </div>

                    <p className="text-[12px] font-bold text-[#627382] mb-1">Estimated Availability</p>
                    <h2 className="text-[34px] font-bold text-[#0D1C2E] leading-tight">
                        Tomorrow<br />
                        <span className="text-[#1A7785]">by 4:00 PM</span>
                    </h2>
                </div>

                {/* Details Section (Light Blue-Gray) */}
                <div className="bg-[#F0F7F8] px-8 py-8 flex flex-col gap-6">
                    
                    {/* Pharmacy Info Card */}
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-[16px] bg-white flex items-center justify-center text-[#1A7785] shadow-sm shrink-0">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                                <path d="M12 8v8" />
                                <path d="M8 12h8" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <h4 className="text-[15px] font-bold text-[#0D1C2E]">Sanctuary Pharmacy</h4>
                            <p className="text-[12px] text-[#627382] leading-relaxed">
                                1202 Healing Way, Clinical District<br />
                                Suite 400 • (555) 012-3456
                            </p>
                        </div>
                    </div>

                    {/* Meta Data */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[12px] font-bold text-[#627382]">Order Reference</span>
                            <span className="text-[12px] font-bold text-[#0D1C2E]">#CS-99210-RF</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[12px] font-bold text-[#627382]">Method</span>
                            <span className="text-[12px] font-bold text-[#0D1C2E]">Express Delivery</span>
                        </div>
                    </div>

                    {/* Action Section */}
                    <div className="pt-2 flex flex-col items-center gap-4">
                        <button 
                            onClick={() => {
                                onClose();
                                navigate('/Order');
                            }}
                            className="w-full bg-gradient-to-r from-[#0D1C2E] to-[#1A7785] text-white py-4 rounded-[20px] font-bold text-[15px] flex items-center justify-center gap-2 shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            Track Order
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                        <button className="text-[14px] font-bold text-[#1A7785] hover:underline">
                            Modify Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tomorrow;
