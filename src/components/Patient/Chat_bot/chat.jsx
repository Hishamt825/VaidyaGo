import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Plus, Volume2, History, X, Settings, Minimize2, FileText, Image, Camera, BarChart2 } from 'lucide-react';
import vaidyaBot from '../../../assets/patient.png';

const Chat = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I am VaidyaGo AI, your health assistant. How can I assist you today?",
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
            title: "Neural Architecture Research",
            time: "10:45 AM",
            snippet: "The efficiency of the multi-head attention mechanism can be improved by pruning redundant weights...",
            group: 'Today',
            iconType: 'settings'
        },
        {
            id: 'h2',
            title: "Medical Device Efficiency",
            time: "08:20 AM",
            snippet: "Based on the ISO 13485 standards, we should verify the cooling system's duty cycle...",
            group: 'Today',
            iconType: 'plus'
        },
        {
            id: 'h3',
            title: "Patient Consultation Oct 12",
            time: "Oct 12",
            snippet: "Patient reports recurring headaches following the adjustment of medication dosage...",
            group: 'Yesterday',
            iconType: 'file'
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
                text: "I am analyzing your request. Integration will be added soon!",
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
                    width: showHistory ? '1000px' : '440px'
                }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="h-[650px] max-h-[90vh] bg-white/95 backdrop-blur-xl rounded-[40px] shadow-[0_32px_80px_rgba(0,0,0,0.15)] border border-white/40 overflow-hidden flex pointer-events-auto"
            >
                {/* History Sidebar */}
                <AnimatePresence>
                    {showHistory && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: '380px', opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="h-full bg-gray-50/50 border-r border-gray-100 flex flex-col shrink-0 overflow-hidden"
                        >
                            <div className="px-8 py-10 border-b border-gray-100/50 shrink-0">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-[26px] font-black text-[#1e293b] tracking-tight">History</h2>
                                    <button
                                        onClick={() => setShowHistory(false)}
                                        className="p-2 text-gray-400 hover:text-gray-600 transition-all bg-white rounded-full shadow-sm hover:shadow-md"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                                <p className="text-[14px] text-gray-400 font-medium">Your previous health consultations</p>
                            </div>

                            <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
                                {historySessions.length > 0 ? (
                                    <div className="space-y-8">
                                        {['Today', 'Yesterday'].map(group => (
                                            <div key={group}>
                                                <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block px-2 opacity-60">{group}</span>
                                                <div className="space-y-2">
                                                    {historySessions.filter(s => s.group === group).map(session => (
                                                        <HistoryItem
                                                            key={session.id}
                                                            icon={session.iconType === 'settings' ? <Settings size={18} /> : <FileText size={18} />}
                                                            title={session.title}
                                                            time={session.time}
                                                            snippet={session.snippet}
                                                            isSmall={true}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                        <History size={40} className="text-gray-300 mb-3" />
                                        <p className="text-[15px] font-bold text-gray-400">No sessions yet</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col min-w-[440px] bg-gradient-to-b from-white to-[#F8FAFC]">
                    {/* Header */}
                    <header className="flex items-center justify-between px-8 py-6 bg-white/50 backdrop-blur-md border-b border-gray-100/80 shrink-0 z-20">
                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1A7785]/10 to-[#1A7785]/5 flex items-center justify-center overflow-visible border border-[#1A7785]/10 shadow-inner"
                                >
                                    <img src={vaidyaBot} alt="AI Avatar" className="w-12 h-12 object-contain transform scale-[1.6]" />
                                </motion.div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-[3px] border-white shadow-sm ring-4 ring-green-500/10"></div>
                            </div>
                            <div>
                                <h1 className="text-[18px] font-black text-[#1e293b] tracking-tight">VaidyaGo AI</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="flex h-2 w-2 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Active Now</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {!showHistory && (
                                <button
                                    onClick={() => setShowHistory(true)}
                                    className="p-3 text-gray-400 hover:text-[#19718A] transition-all bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100"
                                >
                                    <History size={20} />
                                </button>
                            )}
                            <button onClick={onClose} className="p-3 text-gray-400 hover:text-red-500 transition-all bg-gray-50 rounded-2xl hover:bg-red-50 hover:shadow-md border border-transparent hover:border-red-100">
                                <X size={20} />
                            </button>
                        </div>
                    </header>

                    {/* Chat Content */}
                    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 custom-scrollbar scroll-smooth">
                        <AnimatePresence>
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex gap-4 max-w-[88%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                        {msg.sender === 'ai' && (
                                            <div className="w-10 h-10 rounded-xl bg-gray-100/50 flex items-center justify-center shrink-0 mt-1 border border-gray-100 shadow-sm">
                                                <img src={vaidyaBot} alt="AI" className="w-8 h-8 object-contain transform scale-150" />
                                            </div>
                                        )}

                                        <div className={`space-y-1.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                                            <div className={`px-5 py-4 rounded-[24px] text-[15px] font-medium leading-relaxed shadow-sm transition-all duration-300 ${msg.sender === 'user'
                                                    ? 'bg-[#1e293b] text-white rounded-tr-none hover:shadow-md'
                                                    : 'bg-white text-[#334155] rounded-tl-none border border-gray-100 hover:shadow-md'
                                                }`}>
                                                <p>{msg.text}</p>

                                                {msg.sender === 'ai' && (
                                                    <motion.button
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className="flex items-center gap-2 mt-4 px-3 py-1.5 bg-[#1A7785]/5 text-[10px] font-black text-[#1A7785] uppercase tracking-wider rounded-lg hover:bg-[#1A7785]/10 transition-colors"
                                                    >
                                                        <Volume2 size={14} />
                                                        Play Response
                                                    </motion.button>
                                                )}
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter px-1">
                                                {msg.time}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Footer */}
                    <div className="bg-[#F1F5F9] border-t border-gray-200/60 p-4 space-y-3 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-20">

                        {/* Hidden Inputs for Functionality */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={(e) => console.log('File selected:', e.target.files[0])}
                        />
                        <input
                            type="file"
                            ref={imageInputRef}
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) => console.log('Image/Video selected:', e.target.files[0])}
                        />
                        <input
                            type="file"
                            ref={cameraInputRef}
                            accept="image/*"
                            capture="environment"
                            className="hidden"
                            onChange={(e) => console.log('Camera capture:', e.target.files[0])}
                        />

                        <div className="flex items-center justify-between px-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Voice Settings</span>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-[#1e293b] uppercase tracking-wider">Voice Mode</span>
                                <button
                                    onClick={() => setIsVoiceMode(!isVoiceMode)}
                                    className={`w-9 h-5 rounded-full transition-colors relative ${isVoiceMode ? 'bg-[#1A7785]' : 'bg-gray-200'}`}
                                >
                                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${isVoiceMode ? 'left-4.5' : 'left-0.5'}`}></div>
                                </button>
                            </div>
                        </div>

                        {/* Main Input Bar */}
                        <form onSubmit={handleSend} className="relative flex items-center gap-3">
                            <div className="flex-1 relative flex items-center bg-white/50 border border-gray-200/80 rounded-[24px] px-3 py-2 focus-within:border-[#1A7785] focus-within:bg-white transition-all shadow-sm">

                                {/* Attachment Menu Pop-up */}
                                <AnimatePresence>
                                    {isAttachMenuOpen && (
                                        <motion.div
                                            ref={attachMenuRef}
                                            initial={{ opacity: 0, y: 10, scale: 0.9, originX: 0, originY: 1 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                            className="absolute bottom-full left-0 mb-2 bg-white/95 backdrop-blur-md rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-white/40 p-1.5 min-w-[200px] z-[10001]"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => handleFileSelect('file')}
                                                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#1A7785]/5 rounded-[16px] transition-all group"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                                    <FileText size={16} />
                                                </div>
                                                <div className="flex flex-col items-start text-left">
                                                    <span className="text-[13px] font-bold text-gray-800 leading-none">Document</span>
                                                    <span className="text-[10px] text-gray-400 font-medium mt-1">PDF, DOC, TXT</span>
                                                </div>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleFileSelect('image')}
                                                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#1A7785]/5 rounded-[16px] transition-all group"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                                                    <Image size={16} />
                                                </div>
                                                <div className="flex flex-col items-start text-left">
                                                    <span className="text-[13px] font-bold text-gray-800 leading-none">Photo & Video</span>
                                                    <span className="text-[10px] text-gray-400 font-medium mt-1">Gallery, Media</span>
                                                </div>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleFileSelect('camera')}
                                                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#1A7785]/5 rounded-[16px] transition-all group"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm">
                                                    <Camera size={16} />
                                                </div>
                                                <div className="flex flex-col items-start text-left">
                                                    <span className="text-[13px] font-bold text-gray-800 leading-none">Camera</span>
                                                    <span className="text-[10px] text-gray-400 font-medium mt-1">Take a picture</span>
                                                </div>
                                            </button>

                                            <div className="h-[1px] bg-gray-100 my-1 mx-2 opacity-50" />

                                            <button
                                                type="button"
                                                onClick={() => setIsAttachMenuOpen(false)}
                                                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#1A7785]/5 rounded-[16px] transition-all group"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-sm">
                                                    <BarChart2 size={16} />
                                                </div>
                                                <div className="flex flex-col items-start text-left">
                                                    <span className="text-[13px] font-bold text-teal-600 leading-none">Health Analysis</span>
                                                    <span className="text-[10px] text-teal-400 font-medium mt-1">AI Scan Results</span>
                                                </div>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button
                                    type="button"
                                    onClick={() => setIsAttachMenuOpen(!isAttachMenuOpen)}
                                    className={`p-1.5 transition-all rounded-full flex items-center justify-center ${isAttachMenuOpen ? 'bg-[#1A7785] text-white rotate-45 shadow-lg' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <Plus size={20} />
                                </button>

                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Ask VaidyaGo anything..."
                                    className="flex-1 bg-transparent border-none outline-none px-2 text-[14px] text-[#334155] placeholder:text-gray-400"
                                />
                                <div className="flex items-center gap-2">
                                    <button type="button" className="p-1.5 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500/20 transition-all">
                                        <Mic size={18} />
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!inputText.trim()}
                                        className={`p-2 rounded-full shadow-md transition-all transform active:scale-90 ${inputText.trim()
                                                ? 'bg-[#1A7785] text-white hover:bg-[#165E68]'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        </form>
                        <p className="text-center text-[9px] text-gray-400 font-medium">
                            VaidyaGo AI may produce inaccurate information.
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

                {/* History Overlay removed - now integrated as Sidebar */}
            </motion.div>
        </div>
    );
};

const HistoryItem = ({ icon, title, time, snippet, isSmall }) => (
    <div className={`flex items-start gap-4 p-4 hover:bg-white rounded-[24px] transition-all cursor-pointer group border border-transparent hover:border-gray-100 hover:shadow-sm mb-2`}>
        <div className={`shrink-0 bg-white p-3 rounded-2xl shadow-sm group-hover:bg-[#19718A] group-hover:text-white transition-all duration-300 border border-gray-50`}>
            {icon}
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
                <h3 className="text-[15px] font-black text-[#1e293b] truncate tracking-tight group-hover:text-[#19718A] transition-colors">{title}</h3>
                <span className="text-[10px] font-black text-gray-300 ml-2 uppercase tracking-tighter">{time}</span>
            </div>
            <p className="text-[12px] text-gray-400 line-clamp-1 leading-relaxed font-medium group-hover:text-gray-600 transition-colors">
                {snippet}
            </p>
        </div>
    </div>
);

export default Chat;
