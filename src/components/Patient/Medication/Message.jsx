import React, { useState } from 'react';

const Message = ({ onClose }) => {
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello. I am reviewing your recent prescription request for 'Amox-Sanctuary 500'. We need to confirm if you have any known allergies to penicillin before we dispatch the order.",
            sender: 'pharmacy',
            time: '10:46 AM',
            status: 'Delivered'
        }
    ]);

    const handleSend = () => {
        if (!msg.trim()) return;
        const newMsg = {
            id: messages.length + 1,
            text: msg,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'Read'
        };
        setMessages([...messages, newMsg]);
        setMsg('');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop Blur */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />
            
            {/* Chat Modal Card */}
            <div className="relative w-full max-w-[540px] bg-white rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col h-[640px]">
                
                {/* Header Section */}
                <div className="bg-gradient-to-r from-[#0D1C2E] via-[#144C5C] to-[#1A7785] px-8 py-6 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                                <path d="M12 8v8M8 12h8" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-[20px] font-bold text-white leading-tight">VaidyaGo</h3>
                            <p className="text-[10px] font-bold text-white/60 tracking-[0.1em]">PHARMACIST TEAM ONLINE</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-white/60 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Chat Messages Area */}
                <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 bg-[#F8FBFC] custom-scrollbar">
                    <div className="flex justify-center mb-2">
                        <span className="bg-slate-100 text-[#627382] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            Today, 10:45 AM
                        </span>
                    </div>

                    {messages.map((message) => (
                        <div key={message.id} className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'} gap-1.5`}>
                            <div className={`flex items-end gap-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                {/* Avatar/Icon */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                                    message.sender === 'user' 
                                    ? 'bg-[#0D1C2E] text-white' 
                                    : 'bg-[#6ED4D4] text-white'
                                }`}>
                                    {message.sender === 'user' ? (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.727 2.903a2 2 0 01-2.618 1.41l-2.903-.727a2 2 0 01-1.41-2.618l.727-2.903a2 2 0 00-1.414-1.96L3.12 10.428a2 2 0 00-.547 1.022l-1.414 4.243a2 2 0 001.022 2.387l4.243 1.414a2 2 0 002.387-1.022l1.414-4.243z" />
                                        </svg>
                                    )}
                                </div>

                                {/* Bubble */}
                                <div className={`px-5 py-3.5 rounded-[20px] text-[14px] leading-relaxed shadow-sm font-medium ${
                                    message.sender === 'user'
                                    ? 'bg-[#0D1C2E] text-white rounded-tr-none'
                                    : 'bg-white text-[#0D1C2E] border border-slate-100 rounded-tl-none'
                                }`}>
                                    {message.text}
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-[#627382]/60 uppercase px-11">
                                {message.sender === 'user' ? `Read • ${message.time}` : `Delivered • ${message.time}`}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Input Area Section */}
                <div className="p-6 bg-white shrink-0 border-t border-slate-50">
                    <div className="relative flex items-center gap-4">
                        <div className="flex-1 relative">
                            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1A7785]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                            <input 
                                type="text"
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your message..."
                                className="w-full bg-[#EBF1F3] border-none rounded-full py-4 pl-12 pr-12 text-[14px] text-[#0D1C2E] placeholder-[#627382]/60 focus:ring-2 focus:ring-[#1A7785]/50 transition-all font-medium"
                            />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1A7785]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                        <button 
                            onClick={handleSend}
                            className="w-14 h-14 rounded-full bg-gradient-to-br from-[#6ED4D4] to-[#1A7785] flex items-center justify-center text-white shadow-lg shadow-[#1A7785]/20 hover:scale-110 active:scale-95 transition-all group"
                        >
                            <svg className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center justify-center gap-8 mt-6">
                        <button className="flex items-center gap-2 text-[10px] font-bold text-[#627382] uppercase tracking-wider hover:text-[#1A7785] transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Attach Prescription
                        </button>
                        <button className="flex items-center gap-2 text-[10px] font-bold text-[#627382] uppercase tracking-wider hover:text-[#1A7785] transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Send Photo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
