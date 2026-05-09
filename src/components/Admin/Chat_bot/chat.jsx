import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Plus, Volume2, History, X, Settings, Minimize2, FileText, Image, Camera, BarChart2 } from 'lucide-react';
import adminBot from '../../../assets/admin.png';

const Chat = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I am Admin Assistant AI. How can I help you manage the portal today?",
            sender: 'ai',
            time: '10:24 AM'
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isVoiceMode, setIsVoiceMode] = useState(false);
    const [isAttachMenuOpen, setIsAttachMenuOpen] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [historySessions, setHistorySessions] = useState([
        {
            id: 'h1',
            title: "Doctor Verification Log",
            time: "10:45 AM",
            snippet: "The new doctor application from Dr. Sarah has been reviewed and flagged for missing certification...",
            group: 'Today',
            iconType: 'settings'
        },
        {
            id: 'h2',
            title: "Appointment System Audit",
            time: "08:20 AM",
            snippet: "Optimizing the slot allocation algorithm to reduce wait times by 15%...",
            group: 'Today',
            iconType: 'plus'
        }
    ]);
    const messagesEndRef = useRef(null);
    const attachMenuRef = useRef(null);
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();

        const handleClickOutside = (event) => {
            if (attachMenuRef.current && !attachMenuRef.current.contains(event.target)) {
                setIsAttachMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [messages, isOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            text: inputText,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setInputText('');

        setTimeout(() => {
            const aiResponse = {
                id: messages.length + 2,
                text: "I am processing your administrative request. Data updates will be reflected shortly.",
                sender: 'ai',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiResponse]);
        }, 1000);
    };

    const handleFileSelect = (type) => {
        setIsAttachMenuOpen(false);
        if (type === 'file') fileInputRef.current?.click();
        if (type === 'image') imageInputRef.current?.click();
        if (type === 'camera') cameraInputRef.current?.click();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 pointer-events-none">
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    width: showHistory ? '1000px' : '420px'
                }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="h-[600px] max-h-[85vh] bg-[#F1F5F9] rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/20 overflow-hidden flex pointer-events-auto font-sans"
            >
                {/* History Sidebar */}
                <AnimatePresence>
                    {showHistory && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: '380px', opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="h-full bg-white border-r border-gray-100 flex flex-col shrink-0 overflow-hidden"
                        >
                            <div className="px-8 py-8 border-b border-gray-50 shrink-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h2 className="text-[24px] font-bold text-gray-800 tracking-tight">Admin Logs</h2>
                                    <button
                                        onClick={() => setShowHistory(false)}
                                        className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 rounded-full"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                                <p className="text-[13px] text-gray-400 font-medium truncate">Audit previous administrative sessions</p>
                            </div>

                            <div className="px-8 py-5 shrink-0">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search logs..."
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-[14px] outline-none focus:border-[#19718A] transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto px-6 py-2 custom-scrollbar text-[#1e293b]">
                                {historySessions.length > 0 ? (
                                    <div className="space-y-6">
                                        <div>
                                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-4 block px-2">Today</span>
                                            <div className="space-y-1">
                                                {historySessions.filter(s => s.group === 'Today').map(session => (
                                                    <HistoryItem
                                                        key={session.id}
                                                        icon={<Settings size={18} />}
                                                        title={session.title}
                                                        time={session.time}
                                                        snippet={session.snippet}
                                                        isSmall={true}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center px-4">
                                        <History size={32} className="text-gray-200 mb-2" />
                                        <p className="text-[13px] font-bold text-gray-400">Empty</p>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 border-t border-gray-50 bg-gray-50/30">
                                <button
                                    onClick={() => setHistorySessions([])}
                                    className="w-full py-3 bg-white border border-gray-100 rounded-xl text-[13px] font-bold text-red-500 hover:bg-red-50 transition-colors shadow-sm"
                                >
                                    Clear History
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col min-w-[420px]">
                    <header className="flex items-center justify-between px-6 py-4 bg-[#F1F5F9] border-b border-gray-200/60 shrink-0 shadow-sm z-20">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-12 h-12 flex items-center justify-center overflow-visible">
                                    <img src={adminBot} alt="Admin Avatar" className="w-full h-full object-contain transform scale-125" />
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-teal-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <h1 className="text-[16px] font-bold text-[#1e293b] leading-tight">Admin Assistant AI</h1>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active System</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {!showHistory && (
                                <button
                                    onClick={() => setShowHistory(true)}
                                    className="p-2 text-gray-400 hover:text-[#19718A] transition-colors bg-white/50 rounded-full hover:bg-white"
                                >
                                    <History size={20} />
                                </button>
                            )}
                            <button onClick={onClose} className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-white/50 rounded-full hover:bg-red-50">
                                <X size={20} />
                            </button>
                        </div>
                    </header>

                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar bg-[#F1F5F9]">
                        <AnimatePresence>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                        {msg.sender === 'ai' && (
                                            <div className="w-10 h-10 flex items-center justify-center shrink-0 mt-1 overflow-visible">
                                                <img src={adminBot} alt="AI" className="w-full h-full object-contain transform scale-125" />
                                            </div>
                                        )}

                                        <div className="space-y-1">
                                            <div className={`p-3.5 rounded-[20px] shadow-sm text-[14.5px] leading-relaxed ${msg.sender === 'user'
                                                    ? 'bg-[#18728A] text-white rounded-tr-none'
                                                    : 'bg-white text-[#1e293b] rounded-tl-none border border-white/50'
                                                }`}>
                                                <p>{msg.text}</p>
                                            </div>
                                            <p className={`text-[10px] font-bold text-gray-400 px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                                {msg.time}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="bg-[#F1F5F9] border-t border-gray-200/60 p-4 space-y-3 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-20">
                        <form onSubmit={handleSend} className="relative flex items-center gap-3">
                            <div className="flex-1 relative flex items-center bg-white/50 border border-gray-200/80 rounded-[24px] px-3 py-2 focus-within:border-[#1A7785] focus-within:bg-white transition-all shadow-sm">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Admin query or command..."
                                    className="flex-1 bg-transparent border-none outline-none px-4 text-[14px] text-[#334155] placeholder:text-gray-400"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputText.trim()}
                                    className={`p-2 rounded-full shadow-md transition-all transform active:scale-90 ${inputText.trim()
                                            ? 'bg-[#18728A] text-white hover:bg-[#165E68]'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </form>
                        <p className="text-center text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                            Administrative Console Access Active
                        </p>
                    </div>

                    <style jsx>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #cbd5e1;
                    }
                `}</style>
                </div>
            </motion.div>
        </div>
    );
};

const HistoryItem = ({ icon, title, time, snippet, isSmall }) => (
    <div className={`flex items-start gap-4 p-3 hover:bg-gray-50 rounded-[18px] transition-all cursor-pointer group border border-transparent hover:border-gray-50`}>
        <div className={`shrink-0 ${isSmall ? 'text-gray-400' : ''} bg-gray-50 p-2 rounded-xl group-hover:bg-[#18728A]/10 group-hover:text-[#18728A] transition-colors`}>
            {icon}
        </div>
        <div className="flex-1 min-w-0 text-[#1e293b]">
            <div className="flex items-center justify-between mb-0.5">
                <h3 className="text-[14px] font-bold truncate tracking-tight">{title}</h3>
                <span className="text-[10px] font-bold text-gray-300 ml-2">{time}</span>
            </div>
            <p className="text-[12px] text-gray-400 line-clamp-1 leading-relaxed font-medium">
                {snippet}
            </p>
        </div>
    </div>
);

export default Chat;
