import React, { useState } from 'react';

const Request_refill = ({ onClose, onConfirm }) => {
    const [deliveryMethod, setDeliveryMethod] = useState('Standard');

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
            {/* Backdrop with intense blur */}
            <div 
                className="absolute inset-0 bg-[#0D1C2E]/60 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-[480px] bg-white rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                
                {/* Gradient Header */}
                <div className="bg-gradient-to-r from-[#0D1C2E] to-[#1A7785] p-5 pb-7 relative">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[9px] font-bold text-white/60 uppercase tracking-[0.25em] mb-0.5">Prescription Renewal</p>
                            <h2 className="text-[22px] font-bold text-white tracking-tight">Lisinopril 10mg</h2>
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3.5 -mt-4 bg-white rounded-t-[32px] relative z-10">
                    
                    {/* Top Info Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#F4F8F9] rounded-2xl p-3">
                            <p className="text-[9px] font-bold text-[#627382] uppercase tracking-[0.15em] mb-0.5">Remaining Refills</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-[22px] font-bold text-[#0D1C2E]">04</span>
                                <span className="text-[13px] text-[#627382] font-medium">of 06</span>
                            </div>
                        </div>
                        <div className="bg-[#F4F8F9] rounded-2xl p-3">
                            <p className="text-[9px] font-bold text-[#627382] uppercase tracking-[0.15em] mb-0.5">Status</p>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1A7785]" />
                                <span className="text-[16px] font-bold text-[#0D1C2E]">Active</span>
                            </div>
                        </div>
                    </div>

                    {/* Preferred Pharmacy */}
                    <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-[#627382] uppercase tracking-[0.15em]">Preferred Pharmacy</label>
                        <div className="bg-[#F4F8F9] border border-transparent hover:border-[#1A7785]/20 rounded-2xl p-3 flex items-center justify-between transition-all cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#1A7785] shadow-sm shrink-0">
                                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[13px] font-bold text-[#0D1C2E]">VaidyaGo Pharmacy Hub</p>
                                    <p className="text-[10px] text-[#627382] font-medium tracking-tight">4521 Medical Center Dr. Suite 102</p>
                                </div>
                            </div>
                            <svg className="w-4 h-4 text-[#627382] opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                    </div>

                    {/* Delivery Method */}
                    <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-[#627382] uppercase tracking-[0.15em]">Delivery Method</label>
                        <div className="space-y-2">
                            <div 
                                onClick={() => setDeliveryMethod('Standard')}
                                className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                                    deliveryMethod === 'Standard' ? 'border-[#1A7785] bg-white shadow-lg' : 'border-[#F4F8F9] bg-[#F4F8F9]'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${deliveryMethod === 'Standard' ? 'border-[#1A7785]' : 'border-[#627382]/30'}`}>
                                        {deliveryMethod === 'Standard' && <div className="w-2 h-2 rounded-full bg-[#1A7785]" />}
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold text-[#0D1C2E]">Standard Pickup</p>
                                        <p className="text-[10px] text-[#627382] font-medium tracking-tight">Ready in 2-4 hours</p>
                                    </div>
                                </div>
                                <span className="text-[12px] font-bold text-[#1A7785]">Free</span>
                            </div>

                            <div 
                                onClick={() => setDeliveryMethod('Express')}
                                className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                                    deliveryMethod === 'Express' ? 'border-[#1A7785] bg-white shadow-lg' : 'border-[#F4F8F9] bg-[#F4F8F9]'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${deliveryMethod === 'Express' ? 'border-[#1A7785]' : 'border-[#627382]/30'}`}>
                                        {deliveryMethod === 'Express' && <div className="w-2 h-2 rounded-full bg-[#1A7785]" />}
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold text-[#0D1C2E]">Express Delivery</p>
                                        <p className="text-[10px] text-[#627382] font-medium tracking-tight">Arrives by 6:00 PM today</p>
                                    </div>
                                </div>
                                <span className="text-[12px] font-bold text-[#0D1C2E]">$12.50</span>
                            </div>
                        </div>
                    </div>

                    {/* Approval Notice */}
                    <div className="bg-[#FFF8F8] border-l-3 border-[#E85B5A] p-3 flex gap-2.5">
                        <svg className="w-4 h-4 text-[#E85B5A] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-[10px] text-[#A64444] font-medium leading-relaxed">
                            Refill requests are subject to practitioner approval. You will be notified once confirmed.
                        </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-1 flex items-center gap-4">
                        <button 
                            onClick={onConfirm}
                            className="flex-1 bg-gradient-to-r from-[#0D1C2E] to-[#1A7785] text-white py-3.5 rounded-[18px] font-bold text-[14px] shadow-lg shadow-[#1A7785]/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
                        >
                            Confirm Request
                        </button>
                        <button 
                            onClick={onClose}
                            className="text-[12px] font-black text-[#627382] hover:text-[#0D1C2E] uppercase tracking-widest transition-colors px-2"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Request_refill;
