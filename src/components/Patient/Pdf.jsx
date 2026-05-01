import React, { useState, useEffect } from 'react';

const PdfPopup = ({ onClose, fileName = "Vaccination_Certificate.pdf" }) => {
    const [status, setStatus] = useState('generating'); // 'generating' | 'ready'
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (status === 'generating') {
            const timer = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        setTimeout(() => setStatus('ready'), 500);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 100);
            return () => clearInterval(timer);
        }
    }, [status]);

    return (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-[32px] w-full max-w-[400px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 p-8 text-center">
                
                {/* Icon Section */}
                <div className="flex justify-center mb-6">
                    <div className={`w-20 h-20 rounded-[24px] flex items-center justify-center transition-all duration-500 ${status === 'ready' ? 'bg-[#14B8A6] text-white rotate-0' : 'bg-[#F1F5F9] text-[#1A7785] rotate-12'}`}>
                        {status === 'generating' ? (
                            <svg className="w-10 h-10 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        ) : (
                            <svg className="w-10 h-10 animate-in zoom-in" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                </div>

                {/* Text Content */}
                <h3 className="text-[22px] font-black text-[#0D1C2E] mb-2 tracking-tight">
                    {status === 'generating' ? 'Preparing Document...' : 'Document Ready!'}
                </h3>
                <p className="text-[14px] text-[#64748B] font-medium mb-8 leading-relaxed">
                    {status === 'generating' 
                        ? `Encoding clinical data for ${fileName}`
                        : `Your secure clinical record is ready for download.`}
                </p>

                {/* Progress / Success Area */}
                <div className="mb-8">
                    {status === 'generating' ? (
                        <div className="w-full bg-[#F1F5F9] h-2.5 rounded-full overflow-hidden border border-gray-100 shadow-inner">
                            <div 
                                className="bg-[#1A7785] h-full transition-all duration-300 rounded-full"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2 text-[#14B8A6] font-bold text-[13px]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4" /></svg>
                            Encrypted & Secure
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <button 
                        disabled={status === 'generating'}
                        onClick={() => {
                            // Mock download
                            alert(`Downloading ${fileName}...`);
                            onClose();
                        }}
                        className={`w-full py-4 rounded-2xl font-bold text-[15px] shadow-xl transition-all flex items-center justify-center gap-2 ${status === 'generating' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#0D1C2E] text-white hover:bg-[#1A2E44] hover:-translate-y-1'}`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Download PDF
                    </button>
                    <button 
                        onClick={onClose}
                        className="text-[14px] font-bold text-[#64748B] hover:text-[#0D1C2E] transition-colors py-2"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PdfPopup;
