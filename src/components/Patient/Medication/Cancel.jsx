import React from 'react';

const Cancel = ({ onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop Blur */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />
            
            {/* Modal Card */}
            <div className="relative w-full max-w-[400px] bg-white rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                
                <div className="px-8 pt-10 pb-8 flex flex-col items-center text-center">
                    
                    {/* Warning Icon */}
                    <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-[22px] font-bold text-[#0D1C2E] mb-3 leading-tight">
                        Are you sure you want to cancel?
                    </h2>

                    <p className="text-[14px] text-[#627382] font-medium leading-relaxed mb-8 px-2">
                        This refill request for <span className="text-[#0D1C2E] font-bold font-sans">Amlodipine 5mg</span> is currently being processed. Cancellation cannot be undone.
                    </p>

                    {/* Action Buttons */}
                    <div className="w-full flex flex-col gap-3">
                        <button 
                            onClick={onConfirm}
                            className="w-full bg-gradient-to-r from-[#0D1C2E] to-[#144C5C] text-white py-4 rounded-[20px] font-bold text-[15px] shadow-lg shadow-[#0D1C2E]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            Cancel Request
                        </button>
                        <button 
                            onClick={onClose}
                            className="w-full bg-[#F0F7F8] text-[#0D1C2E] py-4 rounded-[20px] font-bold text-[15px] hover:bg-[#E2EFF1] transition-all"
                        >
                            Keep Order
                        </button>
                    </div>
                </div>

                {/* Footer Link Section */}
                <div className="bg-[#F8FBFC] py-5 border-t border-slate-50 flex justify-center">
                    <p className="text-[13px] font-medium text-[#627382]">
                        Need help? <span className="text-[#1A7785] font-bold cursor-pointer hover:underline">Contact Clinical Support</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Cancel;
