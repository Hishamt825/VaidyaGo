import React, { useState } from 'react';

const Reminder = ({ onClose }) => {
    const [frequency, setFrequency] = useState('Once Daily');
    const [notifType, setNotifType] = useState('Push');

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
            {/* Backdrop with intense blur */}
            <div 
                className="absolute inset-0 bg-[#0D1C2E]/60 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-[500px] bg-white rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                
                {/* Gradient Header */}
                <div className="bg-gradient-to-r from-[#0D1C2E] to-[#1A7785] p-8 pb-10 relative">
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-[24px] font-bold text-white tracking-tight">Set Reminder</h2>
                            <p className="text-white/60 text-[14px] font-medium">Lisinopril 10mg Oral Tablet</p>
                        </div>
                    </div>
                </div>

                {/* Body Content */}
                <div className="p-8 space-y-8 -mt-6 bg-white rounded-t-[32px] relative z-10">
                    
                    {/* Reminder Time */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-[#627382] uppercase tracking-[0.2em]">Reminder Time</label>
                        <div className="relative group">
                            <input 
                                type="text" 
                                defaultValue="08:00 AM"
                                className="w-full bg-[#F0F7F8] border-none rounded-2xl py-4 px-6 text-[18px] font-bold text-[#0D1C2E] outline-none group-hover:bg-[#E7F3F5] transition-colors"
                            />
                            <svg className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Frequency Chips */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-[#627382] uppercase tracking-[0.2em]">Frequency</label>
                        <div className="flex gap-3">
                            {['Once Daily', 'Twice Daily', 'As Needed'].map((item) => (
                                <button 
                                    key={item}
                                    onClick={() => setFrequency(item)}
                                    className={`flex-1 py-3 rounded-full text-[13px] font-bold transition-all border ${
                                        frequency === item 
                                        ? 'bg-[#1A7785] text-white border-[#1A7785] shadow-lg shadow-[#1A7785]/20' 
                                        : 'bg-[#F0F7F8] text-[#627382] border-transparent hover:bg-[#E7F3F5]'
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notification Type Cards */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-[#627382] uppercase tracking-[0.2em]">Notification Type</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => setNotifType('Push')}
                                className={`p-4 rounded-2xl flex items-center gap-4 transition-all border-2 text-left ${
                                    notifType === 'Push'
                                    ? 'bg-white border-[#1A7785] shadow-xl'
                                    : 'bg-[#F0F7F8] border-transparent'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notifType === 'Push' ? 'bg-[#EBF5F6] text-[#1A7785]' : 'bg-white text-[#627382] shadow-sm'}`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[15px] font-bold text-[#0D1C2E]">Push</p>
                                    <p className="text-[11px] text-[#627382] font-medium">Mobile App</p>
                                </div>
                            </button>
                            <button 
                                onClick={() => setNotifType('SMS')}
                                className={`p-4 rounded-2xl flex items-center gap-4 transition-all border-2 text-left ${
                                    notifType === 'SMS'
                                    ? 'bg-white border-[#1A7785] shadow-xl'
                                    : 'bg-[#F0F7F8] border-transparent'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notifType === 'SMS' ? 'bg-[#EBF5F6] text-[#1A7785]' : 'bg-white text-[#627382] shadow-sm'}`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[15px] font-bold text-[#0D1C2E]">SMS</p>
                                    <p className="text-[11px] text-[#627382] font-medium">Text Message</p>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 flex items-center justify-between gap-6">
                        <button 
                            onClick={onClose}
                            className="text-[13px] font-black text-[#627382] hover:text-[#0D1C2E] uppercase tracking-widest transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={onClose}
                            className="flex-1 bg-gradient-to-r from-[#0D1C2E] to-[#1A7785] text-white py-4 rounded-[20px] font-bold text-[15px] shadow-xl shadow-[#1A7785]/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest"
                        >
                            Save Reminder
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reminder;
