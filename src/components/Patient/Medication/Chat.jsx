import React, { useState, useRef, useEffect } from 'react';

const Chat = ({ onClose }) => {
    const [message, setMessage] = useState('');
    const chatEndRef = useRef(null);
    const [chatHistory, setChatHistory] = useState([
        {
            id: 1,
            sender: 'Sarah',
            text: "Hello! I'm Sarah, your personal healthcare concierge. I've just reviewed your recent lab results from yesterday.",
            time: '10:24 AM',
            isUser: false
        },
        {
            id: 2,
            sender: 'Sarah',
            text: "Everything looks stable, but I noticed your Vitamin D levels are slightly below our target sanctuary range. Would you like to schedule a quick 5-minute briefing with Dr. Aris today to discuss a supplement plan?",
            time: '10:24 AM',
            isUser: false
        },
        {
            id: 3,
            sender: 'User',
            text: "That sounds great, Sarah. Does he have any availability around 3:00 PM?",
            time: '10:26 AM',
            isUser: true
        }
    ]);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const handleSendMessage = () => {
        if (!message.trim()) return;
        
        const newMessage = {
            id: Date.now(),
            sender: 'User',
            text: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isUser: true
        };
        
        setChatHistory([...chatHistory, newMessage]);
        setMessage('');
    };

    return (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#0D1C2E]/60 backdrop-blur-md transition-opacity duration-300" 
                onClick={onClose}
            />
            
            {/* Chat Modal Container */}
            <div className="relative w-full max-w-[500px] bg-white rounded-[32px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-300 flex flex-col max-h-[600px]">
                
                {/* Header */}
                <div className="relative h-[90px] p-4 flex items-center justify-between overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4D] via-[#1a6e78] to-[#49AAB3]"></div>
                    
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
                                <img 
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" 
                                    alt="Sarah" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#1a6e78] rounded-full"></div>
                        </div>
                        <div>
                            <h2 className="text-[18px] font-bold text-white leading-tight">Sarah</h2>
                            <p className="text-white/60 text-[11px] font-bold uppercase tracking-wider">Online • Healthcare Concierge</p>
                        </div>
                    </div>

                    <div className="relative z-10 flex items-center gap-2">
                        <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </button>
                        <button 
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all group"
                        >
                            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFB] min-h-[250px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex items-center justify-center gap-3 py-1">
                        <div className="h-[1px] flex-1 bg-gray-200"></div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Today</span>
                        <div className="h-[1px] flex-1 bg-gray-200"></div>
                    </div>

                    {chatHistory.map((msg, i) => (
                        <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                            {!msg.isUser && (
                                <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mb-3 border border-gray-200 shadow-sm">
                                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" alt="Sarah" className="w-full h-full object-cover" />
                                </div>
                            )}
                            <div className="flex flex-col gap-1 max-w-[80%]">
                                <div 
                                    className={`p-3.5 rounded-[18px] text-[13px] font-medium leading-relaxed shadow-sm ${
                                        msg.isUser 
                                        ? 'bg-gradient-to-br from-[#0B1F4D] to-[#1a6e78] text-white rounded-br-none' 
                                        : 'bg-white text-[#627382] rounded-bl-none border border-gray-100'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                                <span className={`text-[10px] font-bold text-gray-400 px-1 ${msg.isUser ? 'text-right' : 'text-left'}`}>
                                    {msg.time}
                                </span>
                            </div>
                            {msg.isUser && (
                                <div className="w-7 h-7 rounded-full bg-[#B4D9FB] flex items-center justify-center text-[#0D1C2E] text-[10px] font-bold mb-3 shadow-sm">
                                    JD
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-gradient-to-t from-[#F8FAFB] to-white border-t border-gray-100 shrink-0">
                    <div className="relative flex items-center gap-3">
                        <div className="relative flex-1">
                            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a6e78] transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                            </button>
                            <input 
                                type="text" 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Type your health query..."
                                className="w-full bg-[#F4F9F9] border-none rounded-full py-4 pl-12 pr-4 text-[14px] text-[#0D1C2E] placeholder-gray-400 outline-none shadow-inner"
                            />
                        </div>
                        <button 
                            onClick={handleSendMessage}
                            className="w-12 h-12 rounded-full bg-[#1a6e78] hover:bg-[#0B1F4D] flex items-center justify-center text-white shadow-lg transition-all group active:scale-95"
                        >
                            <svg className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center justify-between mt-4 px-1">
                        {[
                            { label: 'Book Appointment', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
                            { label: 'Request Refill', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
                            { label: 'Health History', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }
                        ].map((action, i) => (
                            <button key={i} className="flex items-center gap-1.5 text-[10px] font-bold text-[#1a6e78] uppercase tracking-wider hover:opacity-70 transition-opacity">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={action.icon} />
                                </svg>
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
