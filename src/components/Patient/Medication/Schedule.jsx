import React from 'react';

const Schedule = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[300]">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" 
                onClick={onClose}
            ></div>
            
            {/* Modal Container */}
            <div className="bg-white rounded-[32px] w-full max-w-[480px] p-8 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-[28px] font-[900] text-[#0D1C2E] mb-1">Schedule Task</h2>
                    <p className="text-[#627382] text-[15px] font-medium">
                        Assigning new protocol for <span className="text-[#1A7785] font-bold">Alex Rivera</span>
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    {/* Task/Medication Name */}
                    <div>
                        <label className="block text-[10px] font-bold text-[#627382] uppercase tracking-[0.2em] mb-2 opacity-70">
                            Task/Medication Name
                        </label>
                        <input 
                            type="text" 
                            placeholder="e.g. Lisinopril 10mg"
                            className="w-full bg-[#EAEFF2] border-none rounded-[16px] py-3.5 px-5 text-[15px] text-[#0D1C2E] placeholder-[#627382]/40 outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-medium"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Dosage */}
                        <div>
                            <label className="block text-[10px] font-bold text-[#627382] uppercase tracking-[0.2em] mb-2 opacity-70">
                                Dosage
                            </label>
                            <input 
                                type="text" 
                                placeholder="e.g. 1 Tablet"
                                className="w-full bg-[#EAEFF2] border-none rounded-[16px] py-3.5 px-5 text-[15px] text-[#0D1C2E] placeholder-[#627382]/40 outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-medium"
                            />
                        </div>
                        {/* Frequency */}
                        <div>
                            <label className="block text-[10px] font-bold text-[#627382] uppercase tracking-[0.2em] mb-2 opacity-70">
                                Frequency
                            </label>
                            <div className="relative">
                                <select className="w-full bg-[#EAEFF2] border-none rounded-[16px] py-3.5 px-5 pr-10 text-[15px] text-[#0D1C2E] appearance-none outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-medium cursor-pointer">
                                    <option>Once Daily</option>
                                    <option>Twice Daily</option>
                                    <option>As Needed</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#627382]">
                                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Time */}
                        <div>
                            <label className="block text-[10px] font-bold text-[#627382] uppercase tracking-[0.2em] mb-2 opacity-70">
                                Time
                            </label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    defaultValue="08:00 AM"
                                    className="w-full bg-[#EAEFF2] border-none rounded-[16px] py-3.5 px-5 pr-10 text-[15px] text-[#0D1C2E] outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-medium"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0D1C2E]/60">
                                    <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {/* Routine Type */}
                        <div>
                            <label className="block text-[10px] font-bold text-[#627382] uppercase tracking-[0.2em] mb-2 opacity-70">
                                Routine Type
                            </label>
                            <div className="flex bg-[#EAEFF2] rounded-[16px] p-1.5 h-[52px]">
                                <button className="flex-1 bg-[#0D3442] text-white py-2 rounded-[12px] text-[14px] font-bold transition-all shadow-sm">
                                    Routine
                                </button>
                                <button className="flex-1 text-[#627382] py-2 text-[14px] font-bold hover:text-[#0D1C2E] transition-all">
                                    As Needed
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-10 mt-12">
                    <button 
                        onClick={onClose}
                        className="text-[16px] font-bold text-[#0D1C2E] hover:opacity-70 transition-all"
                    >
                        Cancel
                    </button>
                    <button className="bg-[#0D3442] hover:bg-[#0a2833] text-white px-8 py-3.5 rounded-full font-bold text-[16px] shadow-lg shadow-[#1A7785]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center min-w-[180px]">
                        Add to Schedule
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Schedule;
