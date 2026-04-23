import React, { useState } from 'react';

const Download = ({ onClose }) => {
    const [format, setFormat] = useState('PDF');

    return (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 animate-in fade-in duration-300">
            {/* Backdrop with intense blur */}
            <div 
                className="absolute inset-0 bg-[#0D1C2E]/60 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Download Modal Container */}
            <div className="relative w-full max-w-[400px] bg-gradient-to-b from-[#0D1C2E] via-[#0B4A54] to-[#49AAB3] rounded-[32px] p-6 text-center shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
                
                {/* Glossy Icon container */}
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white mx-auto mb-5 shadow-2xl shrink-0">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                </div>

                {/* Content */}
                <h2 className="text-[24px] font-bold text-white mb-1.5 tracking-tight">Download Daily Report</h2>
                <p className="text-white/70 text-[12px] font-medium leading-relaxed mb-6 px-4">
                    Your comprehensive health snapshot is ready for export. Select your preferred format below.
                </p>

                {/* Format Options */}
                <div className="grid grid-cols-2 gap-3.5 mb-6">
                    <button 
                        onClick={() => setFormat('PDF')}
                        className={`p-3.5 rounded-2xl border transition-all flex flex-col items-center gap-1.5 ${
                            format === 'PDF' 
                            ? 'bg-white/20 border-white/30 text-white shadow-lg' 
                            : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                        }`}
                    >
                        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[12.5px] font-bold">PDF Format</span>
                        <span className="text-[8.5px] font-medium opacity-60 uppercase tracking-widest">Print Ready</span>
                    </button>

                    <button 
                        onClick={() => setFormat('CSV')}
                        className={`p-3.5 rounded-2xl border transition-all flex flex-col items-center gap-1.5 ${
                            format === 'CSV' 
                            ? 'bg-white/20 border-white/30 text-white shadow-lg' 
                            : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                        }`}
                    >
                        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-[12.5px] font-bold">CSV Data</span>
                        <span className="text-[8.5px] font-medium opacity-60 uppercase tracking-widest">Spreadsheet</span>
                    </button>
                </div>

                {/* Generate Button */}
                <button 
                    onClick={onClose}
                    className="w-full bg-white text-[#0D1C2E] py-3.5 rounded-full font-black text-[14px] shadow-2xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-5"
                >
                    Generate Report
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>

                {/* Encryption Info */}
                <div className="inline-flex items-center gap-2 bg-black/20 px-3.5 py-1.5 rounded-full border border-white/10 mb-5">
                    <svg className="w-2.5 h-2.5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-[8px] font-bold text-white/60 uppercase tracking-widest">Secure AES-256 Encryption Enabled</span>
                </div>

                {/* Cancel Link */}
                <div>
                    <button 
                        onClick={onClose}
                        className="text-[12px] font-bold text-white/60 hover:text-white transition-colors"
                    >
                        Cancel and return
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Download;
