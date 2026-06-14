import React, { useState } from 'react';

const RequestScansModal = ({ onClose }) => {
    const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'
    
    const handleRequest = () => {
        setStatus('submitting');
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => {
                onClose();
            }, 2000);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#0B2132]/60 backdrop-blur-xl transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-[40px] w-full max-w-[480px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                
                <div className="p-8">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-xl bg-[#E1F1F3] flex items-center justify-center text-[#1A7785]">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#94A3B8]">Archive Access</span>
                            </div>
                            <h2 className="text-[26px] font-black text-[#0D1C2E] tracking-tight leading-none">Upload Section</h2>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {status === 'success' ? (
                        <div className="py-12 text-center animate-in fade-in zoom-in">
                            <div className="w-20 h-20 bg-[#14B8A6] text-white rounded-[28px] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#14B8A6]/20">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-[22px] font-black text-[#0D1C2E] mb-2">Request Sent!</h3>
                            <p className="text-[15px] text-[#64748B] font-medium px-8">Our radiology department will review your request and digitize the records within 24-48 hours.</p>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-6 mb-8">
                                <div>
                                    <label className="text-[12px] font-black text-[#0D1C2E] uppercase tracking-wider mb-3 block">Archive Period</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button className="p-4 rounded-[22px] border-2 border-[#1A7785] bg-[#F0F7F8] text-[#1A7785] font-bold text-[14px] transition-all">
                                            2020 - 2022
                                        </button>
                                        <button className="p-4 rounded-[22px] border-2 border-gray-100 bg-gray-50 text-gray-400 font-bold text-[14px] hover:border-gray-200 transition-all">
                                            Pre-2020
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[12px] font-black text-[#0D1C2E] uppercase tracking-wider mb-3 block">Scan Categories</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['MRI Scans', 'CT Scans', 'X-Rays', 'Ultrasounds'].map((tag) => (
                                            <button key={tag} className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-[13px] font-bold text-[#627382] hover:border-[#1A7785] hover:text-[#1A7785] transition-all">
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-[#F8FAFB] p-4 rounded-[28px] border border-gray-100">
                                    <p className="text-[12px] text-[#64748B] font-medium leading-relaxed">
                                        <span className="font-black text-[#0D1C2E] block mb-1">Note on Archival Retrieval</span>
                                        Physical records before 2022 may take additional time to digitize and securely sync to your portal.
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <button 
                                onClick={handleRequest}
                                disabled={status === 'submitting'}
                                className="w-full bg-[#0D1C2E] text-white py-5 rounded-[24px] font-bold text-[16px] shadow-2xl shadow-[#0D2132]/20 hover:bg-[#1A2E44] transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                            >
                                {status === 'submitting' ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing Request...
                                    </>
                                ) : (
                                    <>Submit Retrieval Request</>
                                )}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RequestScansModal;
