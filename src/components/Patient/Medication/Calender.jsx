import React, { useState } from 'react';
import Sync from './Sync';

const Calender = ({ onClose }) => {
    const [selectedProvider, setSelectedProvider] = useState('google');
    const [isSyncOpen, setIsSyncOpen] = useState(false);

    return (
        <div className="fixed inset-0 z-[800] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-white/5 backdrop-blur-xl transition-opacity duration-300" 
                onClick={onClose}
            />
            
            {/* Modal Container */}
            <div className="relative w-full max-w-[420px] bg-white rounded-[32px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-300 flex flex-col">
                
                {/* Header with Gradient */}
                <div className="relative p-5 pt-7 overflow-hidden bg-gradient-to-br from-[#0B1F4D] via-[#1a6e78] to-[#49AAB3]">
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-white transition-all z-20"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-[10px] font-bold text-white/80 uppercase tracking-[0.2em]">Next Steps</span>
                        </div>
                        <h2 className="text-[28px] font-bold text-white leading-tight mb-2">Add to Calendar</h2>
                        <p className="text-white/70 text-[12px] font-medium leading-relaxed">Sync your session with Dr. Thorne to your preferred schedule.</p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-5 pt-5">
                    {/* Patient Info */}
                    <div className="bg-[#F4F9F9] rounded-[18px] p-2.5 flex items-center justify-between mb-5 border border-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" alt="Alex" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="text-[9px] font-bold text-[#627382] uppercase tracking-wider">Patient</p>
                                <p className="text-[14px] font-bold text-[#0D1C2E]">Alex Rivera</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-bold text-[#627382] uppercase tracking-wider">Status</p>
                            <p className="text-[10px] font-black text-[#1A7785] uppercase tracking-tight">Ready to Sync</p>
                        </div>
                    </div>

                    {/* Provider List */}
                    <div className="space-y-2.5 mb-6">
                        {[
                            { id: 'google', title: 'Google Calendar', detail: 'Sync to your personal Google account', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
                            { id: 'outlook', title: 'Outlook', detail: 'Connect with Microsoft Office 365', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                            { id: 'ical', title: 'iCal', detail: 'Universal calendar format for Mac & iOS', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' }
                        ].map((provider) => (
                            <div 
                                key={provider.id}
                                onClick={() => setSelectedProvider(provider.id)}
                                className={`flex items-center justify-between p-3 rounded-[20px] border-2 transition-all cursor-pointer ${
                                    selectedProvider === provider.id 
                                    ? 'bg-white border-[#1A7785] shadow-lg shadow-[#1A7785]/5' 
                                    : 'bg-white border-gray-50 hover:border-gray-100'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                                        selectedProvider === provider.id ? 'bg-[#1A7785] text-white' : 'bg-gray-50 text-[#627382]'
                                    }`}>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={provider.icon} />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-[14px] font-bold text-[#0D1C2E] leading-tight">{provider.title}</h4>
                                        <p className="text-[11px] text-[#627382] font-medium">{provider.detail}</p>
                                    </div>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                    selectedProvider === provider.id ? 'border-[#1A7785] bg-[#1A7785]' : 'border-gray-200'
                                }`}>
                                    {selectedProvider === provider.id && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]"></div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="space-y-3.5">
                        <button 
                            onClick={() => setIsSyncOpen(true)}
                            className="w-full h-[50px] rounded-full bg-gradient-to-r from-[#0B1F4D] to-[#1A7785] text-white font-bold text-[15px] flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            Confirm Sync
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                        <button 
                            onClick={onClose}
                            className="w-full text-center text-[12px] font-bold text-[#627382] hover:text-[#0D1C2E] transition-colors"
                        >
                            Not now, maybe later
                        </button>
                    </div>
                </div>

                {/* Footer Disclaimer */}
                <div className="bg-gray-50/50 py-4 border-t border-gray-100/60">
                    <p className="text-center text-[9px] font-bold uppercase tracking-[0.15em] text-[#627382] opacity-60">
                        Secure clinical scheduling by VaidyaGo Encryption
                    </p>
                </div>
            </div>
            {isSyncOpen && <Sync onClose={() => {
                setIsSyncOpen(false);
                onClose();
            }} />}
        </div>
    );
};

export default Calender;
