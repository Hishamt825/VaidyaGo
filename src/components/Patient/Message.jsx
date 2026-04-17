import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Patient_sidebar';
import Profile from './Profile';
import Account from './Account';
import Notification from './notification';

// Assets
import phImg from '../../assets/ph.png';
import alenaImg from '../../assets/alena.png';
import usImg from '../../assets/marcus.png';
import amitImg from '../../assets/amit.png';
import anjaliImg from '../../assets/anjali.png';

const Message = () => {
    const [active, setActive] = useState('Messages');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const navigate = useNavigate();
    const scrollRef = useRef(null);

    const [conversations] = useState([
        {
            id: 1,
            name: 'Dr. Elena Rodriguez',
            specialty: 'Cardiologist',
            lastMessage: "The lab results look promising. Let'...",
            time: '10:45 AM',
            avatar: alenaImg,
            online: true,
            unread: 0
        },
        {
            id: 2,
            name: 'Dr. Marcus Chen',
            specialty: 'Neurologist',
            lastMessage: 'How has the medication been affecti...',
            time: 'Yesterday',
            avatar: usImg,
            online: false,
            unread: 0
        },
        {
            id: 3,
            name: 'Dr. Sarah Jenkins',
            specialty: 'Pediatrician',
            lastMessage: 'Confirmation of the appointm...',
            time: 'Tuesday',
            avatar: anjaliImg,
            online: true,
            unread: 1
        },
        {
            id: 4,
            name: 'Dr. Amit Patel',
            specialty: 'General Practitioner',
            lastMessage: 'Please remember to bring your previ...',
            time: 'Monday',
            avatar: amitImg,
            online: false,
            unread: 0
        }
    ]);

    const [activeConvId, setActiveConvId] = useState(1);
    const activeConv = conversations.find(c => c.id === activeConvId);

    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'doctor',
            text: "Hello! I've reviewed the latest blood work from your visit yesterday. The markers we were watching have significantly improved.",
            time: '10:42 AM'
        },
        {
            id: 2,
            sender: 'user',
            text: "That's wonderful news, Doctor! Does this mean I can start reducing the dosage of the current medication as we discussed?",
            time: '10:44 AM'
        },
        {
            id: 3,
            sender: 'doctor',
            text: "Exactly. I've updated your prescription in the portal. The new regimen is 5mg instead of 10mg. How have you been feeling overall?",
            time: '10:45 AM'
        },
        {
            id: 4,
            sender: 'user',
            text: "Feeling much better. Here is the sleep log you requested for the past two weeks.",
            time: '10:47 AM'
        }
    ]);

    const [inputText, setInputText] = useState('');

    const handleSendMessage = () => {
        if (!inputText.trim()) return;
        const newMsg = {
            id: Date.now(),
            sender: 'user',
            text: inputText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...messages, newMsg]);
        setInputText('');
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div 
            className="flex h-screen w-full font-sans overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}
        >
            {/* ── Sidebar ── */}
            <Sidebar
                active={active}
                setActive={setActive}
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
            />

            {/* ── Dashboard Layer ── */}
            <div className="flex-1 flex flex-col min-w-0 bg-white shadow-[0_22px_70px_rgba(0,0,0,0.1)] m-5 md:m-8 rounded-[40px] overflow-hidden border border-white/40">
                
                {/* Minimal Global Header */}
                <header className="h-[80px] flex items-center justify-between px-10 shrink-0 bg-white border-b border-gray-50">
                    <div className="flex items-center gap-6">
                        <button onClick={() => setIsMobileOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <svg className="w-6 h-6 text-[#0B1F4D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                        </button>
                        <h1 className="text-[#0B1F4D] text-[22px] font-bold tracking-tight">Messages</h1>
                    </div>
                    
                    <div className="flex items-center gap-8">
                        <button onClick={() => setIsNotificationOpen(true)} className="relative text-gray-400 hover:text-[#0B1F4D] transition-colors group">
                            <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white group-hover:scale-110 transition-transform"></div>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        </button>
                        <div 
                            onClick={() => setActiveModal('profile')}
                            className="w-[48px] h-[48px] rounded-full ring-2 ring-gray-50 border-2 border-white overflow-hidden cursor-pointer hover:shadow-xl hover:scale-105 transition-all"
                        >
                            <img src={phImg} alt="User" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </header>

                {/* ── Messaging Arena ── */}
                <div className="flex-1 flex overflow-hidden">
                    
                    {/* LEFT: Conversation List Panel */}
                    <div className="w-[350px] md:w-[420px] bg-[#F9FBFC] flex flex-col border-r border-gray-100 shrink-0">
                        <div className="p-8 pb-4 flex items-center justify-between">
                            <h2 className="text-[#0B1F4D] text-[28px] font-extrabold tracking-tight">Conversations</h2>
                            <button className="w-12 h-12 bg-[#6ED4D4] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#6ED4D4]/30 hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar">
                            {conversations.map((conv) => (
                                <div 
                                    key={conv.id}
                                    onClick={() => setActiveConvId(conv.id)}
                                    className={`
                                        p-5 rounded-[36px] cursor-pointer transition-all duration-500
                                        flex items-center gap-5 relative
                                        ${activeConvId === conv.id 
                                            ? 'bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] scale-[1.03] ring-1 ring-black/5' 
                                            : 'hover:bg-white/60 opacity-80'
                                        }
                                    `}
                                >
                                    <div className="relative shrink-0">
                                        <div className="w-[64px] h-[64px] rounded-full overflow-hidden border-2 border-white shadow-lg">
                                            <img src={conv.avatar} alt={conv.name} className="w-full h-full object-cover" />
                                        </div>
                                        {conv.online && (
                                            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-[3px] border-white shadow-sm"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="text-[17px] font-bold text-[#0B1F4D] truncate">{conv.name}</h4>
                                            <span className="text-[11px] font-bold text-gray-400">{conv.time}</span>
                                        </div>
                                        <p className="text-[12px] font-bold text-[#1a6e78] uppercase mb-1 tracking-wider">{conv.specialty}</p>
                                        <p className="text-[14px] text-gray-400 truncate font-medium leading-relaxed">{conv.lastMessage}</p>
                                    </div>
                                    {conv.unread > 0 && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-[11px] font-black border-2 border-white shadow-lg">
                                            {conv.unread}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Chat Window Area */}
                    <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
                        
                        {/* Chat Context Header */}
                        <div className="h-[90px] px-10 flex items-center justify-between border-b border-gray-50 bg-white/80 backdrop-blur-md z-20">
                            <div className="flex items-center gap-5">
                                <div className="w-[56px] h-[56px] rounded-full overflow-hidden border-2 border-white shadow-xl relative">
                                    <img src={activeConv.avatar} alt={activeConv.name} className="w-full h-full object-cover" />
                                    {activeConv.online && (
                                        <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-[2.5px] border-white shadow-sm"></div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-[20px] font-extrabold text-[#0B1F4D] leading-tight">{activeConv.name}</h3>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <p className="text-[13px] font-bold text-[#1a6e78] uppercase tracking-widest">{activeConv.specialty}</p>
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                        <span className="text-[13px] font-bold text-green-500">Online</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-[#0B1F4D] hover:bg-gray-100 hover:scale-105 transition-all outline-none">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </button>
                                <button className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-[#0B1F4D] hover:bg-gray-100 hover:scale-105 transition-all outline-none">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                </button>
                                <button className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-[#0B1F4D] hover:bg-gray-100 hover:scale-105 transition-all outline-none">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </button>
                            </div>
                        </div>

                        {/* Interactive Message Feed Area */}
                        <div 
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-10 md:p-14 space-y-12 relative no-scrollbar bg-[#F5F9FB]"
                            style={{ 
                                background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 50%, #49AAB3 100%)',
                            }}
                        >
                            <div className="flex justify-center mb-10">
                                <span className="px-8 py-2.5 bg-black/30 backdrop-blur-xl rounded-full text-[13px] font-black text-white uppercase tracking-[0.3em]">Today</span>
                            </div>

                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                                    <div className={`max-w-[85%] lg:max-w-[70%] flex items-end gap-5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-xl bg-white">
                                            <img src={msg.sender === 'user' ? phImg : activeConv.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                        </div>
                                        
                                        <div className="flex flex-col gap-2">
                                            <div className={`px-8 py-5 rounded-[40px] shadow-2xl text-[16px] leading-[1.7] relative font-medium
                                                ${msg.sender === 'user' 
                                                    ? 'bg-[#1a6e78]/40 backdrop-blur-2xl text-white rounded-br-none border border-white/10' 
                                                    : 'bg-white text-[#0B1F4D] rounded-bl-none shadow-[0_20px_50px_rgba(0,0,0,0.06)]'
                                                }
                                            `}>
                                                {msg.text}
                                            </div>
                                            <div className={`flex items-center gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <span className={`text-[11px] font-black ${msg.sender === 'user' ? 'text-white/60' : 'text-gray-400'}`}>{msg.time}</span>
                                                {msg.sender === 'user' && (
                                                    <div className="flex -space-x-1.5">
                                                        <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                        <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Professional Chat Input Hub */}
                        <div className="p-10 bg-white shrink-0 border-t border-gray-50 z-20">
                            <div className="bg-[#F4F9FB] rounded-[32px] p-2.5 flex items-center gap-4 shadow-inner border border-gray-100">
                                <button className="w-14 h-14 bg-white rounded-full text-gray-400 hover:text-[#1a6e78] shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 group">
                                    <svg className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m-8-8h16" /></svg>
                                </button>
                                <input 
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type your message here..."
                                    className="flex-1 bg-transparent border-none outline-none text-[18px] text-[#0B1F4D] placeholder-gray-400 font-bold px-4"
                                />
                                <button className="w-14 h-14 text-gray-400 hover:text-[#1a6e78] transition-all hover:scale-110">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </button>
                                <button 
                                    onClick={handleSendMessage}
                                    className="w-[60px] h-[60px] bg-[#319797] rounded-full flex items-center justify-center text-white shadow-[0_15px_40px_rgba(49,151,151,0.4)] hover:bg-[#288383] hover:scale-110 active:scale-90 transition-all outline-none"
                                >
                                    <svg className="w-7 h-7 ml-1 mt-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Application Modals */}
            {activeModal === 'profile' && <Profile onClose={() => setActiveModal(null)} onAccountSettings={() => setActiveModal('account')} />}
            {activeModal === 'account' && <Account onClose={() => setActiveModal(null)} />}
            {isNotificationOpen && <Notification onClose={() => setIsNotificationOpen(false)} />}
        </div>
    );
};

export default Message;
