import React from 'react';

const Discomfort = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop with extreme blur */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[24px] transition-opacity duration-300" onClick={onClose} />
            
            {/* Modal Container */}
            <div className="relative w-full max-w-[620px] bg-white rounded-[40px] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.12)] overflow-hidden animate-in fade-in zoom-in duration-500 border border-black/5 flex flex-col p-8">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center text-[#0B2132] transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Header Section */}
                <div className="flex items-center gap-5 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-[#F1F6F8] flex items-center justify-center text-[#1A7785] border border-[#1A7785]/10 shadow-sm">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                        <h2 className="text-[#0B2132] text-[24px] font-black tracking-tight leading-none mb-1.5">Understanding Discomfort</h2>
                        <p className="text-[#627382] text-[14px] font-bold opacity-70 tracking-tight">Clinical Guidance for Safe Rehabilitation</p>
                    </div>
                </div>

                {/* Guidance Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Red Flags Card */}
                    <div className="bg-[#FFF1F1] rounded-[28px] p-6 border border-[#FFDADA]/50">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 rounded-lg bg-[#E85B5A] flex items-center justify-center text-white">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                            </div>
                            <span className="text-[#E85B5A] text-[10px] font-black uppercase tracking-[0.15em]">Red Flags</span>
                        </div>
                        <p className="text-[#0B2132] text-[13px] font-black mb-3">Stop immediately if you feel:</p>
                        <ul className="space-y-2.5">
                            {["Sharp, stabbing pain", "Sudden swelling or heat", "Numbness or tingling"].map((item, i) => (
                                <li key={i} className="flex items-center gap-2.5 text-[#E85B5A]/80 text-[12.5px] font-bold">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#E85B5A] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Adjust Form Card */}
                    <div className="bg-[#F1FBFC] rounded-[28px] p-6 border border-[#D1EBEF]/50">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 rounded-lg bg-[#1A7785] flex items-center justify-center text-white">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </div>
                            <span className="text-[#1A7785] text-[10px] font-black uppercase tracking-[0.15em]">Adjust Form</span>
                        </div>
                        <p className="text-[#0B2132] text-[13px] font-black mb-3">Try these corrections:</p>
                        <ul className="space-y-2.5">
                            {["Reduce your range of motion", "Slow down the movement", "Focus on core engagement"].map((item, i) => (
                                <li key={i} className="flex items-center gap-2.5 text-[#1A7785]/80 text-[12.5px] font-bold">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1A7785] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Specialist Advice Card */}
                <div className="bg-[#F8FAFB] rounded-[32px] p-6 border border-gray-100 mb-8 flex gap-5">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-[2.5px] border-white shadow-md shrink-0">
                        <img src="https://ui-avatars.com/api/?name=Aris+Thorne&background=0B1F4D&color=fff" alt="Specialist" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <svg className="w-3.5 h-3.5 text-[#1A7785]" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
                            <span className="text-[#627382] text-[10px] font-black uppercase tracking-widest">Specialist Advice</span>
                        </div>
                        <p className="text-[#55697A] text-[13.5px] font-bold leading-relaxed mb-3 italic">
                            "Muscle soreness (the 'good burn') is normal, but joint pain is not. If discomfort persists more than 24 hours after an exercise, please reach out to our team."
                        </p>
                        <p className="text-[#0B2132] text-[12px] font-black tracking-tight">Dr. Aris Thorne, <span className="text-[#1A7785]">Senior Physiotherapist</span></p>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center gap-4">
                    <button className="flex-1 bg-[#0B1423] text-white h-[54px] rounded-2xl font-black text-[15px] uppercase tracking-[0.1em] flex items-center justify-center gap-3 shadow-xl hover:bg-[#1A2635] transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                        Contact Specialist
                    </button>
                    <button onClick={onClose} className="w-[120px] bg-white text-[#627382] h-[54px] rounded-2xl font-black text-[14px] uppercase tracking-[0.1em] border-[2px] border-gray-100 hover:bg-[#F8FAFB] transition-all">
                        Dismiss
                    </button>
                </div>

                {/* Sanctuary Line */}
                <p className="text-center text-[#627382]/40 text-[10px] font-bold mt-6">
                    Need urgent help? Call our 24/7 Clinical Sanctuary line: <span className="text-[#1A7785] opacity-80">1-800-VAIDYA-GO</span>
                </p>
            </div>
        </div>
    );
};

export default Discomfort;
