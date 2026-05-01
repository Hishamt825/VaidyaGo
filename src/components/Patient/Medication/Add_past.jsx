import React from 'react';

const Add_past = ({ onClose, onBack }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[400]">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-[4px]" 
                onClick={onClose}
            ></div>
            
            {/* Modal Container */}
            <div className="bg-white rounded-[32px] w-full max-w-[460px] overflow-hidden shadow-2xl relative z-10 animate-in fade-in zoom-in duration-300">
                
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0D1C2E] to-[#1A7785] p-6 pb-6 relative text-white">
                    <h2 className="text-[24px] font-[900] mb-0.5 tracking-tight">Add Past Medication</h2>
                    <p className="text-white/70 text-[13px] font-medium">Complete your health history for better insights.</p>
                    <button 
                        onClick={onClose}
                        className="absolute right-6 top-6 p-1 text-white/40 hover:text-white transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-6 space-y-3.5">
                    {/* Medication Name */}
                    <div>
                        <label className="block text-[10px] font-black text-[#1A7785] uppercase tracking-[0.2em] mb-1.5">Medication Name</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="e.g., Amoxicillin"
                                className="w-full bg-white border border-gray-200 rounded-[14px] py-3 px-5 text-[14px] text-[#0D1C2E] placeholder-[#627382]/30 outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-medium shadow-sm"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A7785]/40">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                        {/* Dosage */}
                        <div>
                            <label className="block text-[10px] font-black text-[#1A7785] uppercase tracking-[0.2em] mb-1.5">Dosage</label>
                            <input 
                                type="text" 
                                placeholder="e.g., 500mg"
                                className="w-full bg-white border border-gray-200 rounded-[14px] py-3 px-5 text-[14px] text-[#0D1C2E] placeholder-[#627382]/30 outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-medium shadow-sm"
                            />
                        </div>
                        {/* Prescribing Doctor */}
                        <div>
                            <label className="block text-[10px] font-black text-[#1A7785] uppercase tracking-[0.2em] mb-1.5">Prescribing Doctor</label>
                            <div className="relative">
                                <select className="w-full bg-white border border-gray-200 rounded-[14px] py-3 px-5 pr-10 text-[14px] text-[#0D1C2E] appearance-none outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-medium shadow-sm cursor-pointer">
                                    <option>Dr. Sarah Chen</option>
                                    <option>Dr. Gregory House</option>
                                    <option>Dr. James Wilson</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#627382]">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Treatment Period */}
                    <div>
                        <label className="block text-[10px] font-black text-[#1A7785] uppercase tracking-[0.2em] mb-1.5">Treatment Period</label>
                        <div className="flex items-center gap-3">
                            <input 
                                type="text" 
                                placeholder="mm/dd/yyyy"
                                className="flex-1 bg-white border border-gray-200 rounded-[14px] py-3 px-4 text-[14px] text-[#0D1C2E] placeholder-[#627382]/30 outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-medium shadow-sm text-center"
                            />
                            <span className="text-[#1A7785] font-bold text-[13px]">to</span>
                            <input 
                                type="text" 
                                placeholder="mm/dd/yyyy"
                                className="flex-1 bg-white border border-gray-200 rounded-[14px] py-3 px-4 text-[14px] text-[#0D1C2E] placeholder-[#627382]/30 outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-medium shadow-sm text-center"
                            />
                        </div>
                    </div>

                    {/* Reason for Prescription */}
                    <div>
                        <label className="block text-[10px] font-black text-[#1A7785] uppercase tracking-[0.2em] mb-1.5">Reason for Prescription</label>
                        <textarea 
                            placeholder="Describe why this was prescribed..."
                            className="w-full bg-white border border-gray-200 rounded-[14px] py-3 px-5 text-[14px] text-[#0D1C2E] placeholder-[#627382]/30 outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-medium shadow-sm min-h-[70px] max-h-[100px] resize-none"
                        ></textarea>
                    </div>

                    {/* Actions */}
                    <div className="pt-1 space-y-3">
                        <button className="w-full bg-[#1A7785] hover:bg-[#125863] text-white py-3.5 rounded-xl font-bold text-[15px] shadow-lg shadow-[#1A7785]/20 transition-all flex items-center justify-center">
                            Add to History
                        </button>
                        <button 
                            onClick={onBack}
                            className="w-full text-[#1A7785] font-bold text-[14px] hover:opacity-70 transition-all text-center"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add_past;
