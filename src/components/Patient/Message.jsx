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
            className="flex h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}
        >
            {/* ── Sidebar ── */}
            <Sidebar
                active={active}
                setActive={setActive}
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
            />

            {/* ── Main Area ── */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden pb-[64px]">
                
                {/* Header Navbar */}
                <header className="h-[76px] flex items-center justify-between px-[24px] md:px-[48px] shrink-0 border-b border-white/5 mb-[8px] z-20">
                    <div className="flex-1 max-w-[280px]">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-white/10 border border-white/10 rounded-full py-[10px] px-[20px] text-white placeholder-white/40 text-[12px] outline-none focus:ring-2 focus:ring-[#6ED4D4]/50 transition-all font-medium"
                            />
                            <svg className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex items-center gap-[32px] ml-auto">
                        <span className="text-white/80 hover:text-white text-[13px] font-medium hidden md:block select-none cursor-pointer transition-colors">Language</span>
                        <div className="flex items-center gap-[20px]">
                            <button onClick={() => setIsNotificationOpen(true)} className="text-white hover:text-[#6ED4D4] transition-colors relative">
                                <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <div className="absolute top-[2px] right-[2px] w-[6px] h-[6px] bg-[#E85B5A] rounded-full" />
                            </button>
                            <button onClick={() => navigate('/Setting')} className="text-white hover:text-[#6ED4D4] transition-colors">
                                <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                            <div onClick={() => setActiveModal('profile')} className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform"><img src={phImg} alt="User" className="w-full h-full object-cover" /></div>
                        </div>
                    </div>
                </header>

                {/* ── Messaging Arena ── */}
                <div className="flex-1 flex overflow-hidden">
                    
                    {/* LEFT: Conversation List Panel */}
                    <div className="w-[300px] md:w-[350px] bg-[#F9FBFC] flex flex-col border-r border-gray-100 shrink-0">
                        <div className="p-6 pb-2 flex items-center justify-between">
                            <h2 className="text-[#0B1F4D] text-[24px] font-semibold tracking-tight">Conversations</h2>
                            <button className="w-10 h-10 bg-[#6ED4D4] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#6ED4D4]/30 hover:scale-110 transition-transform">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar">
                            {conversations.map((conv) => (
                                <div 
                                    key={conv.id}
                                    onClick={() => setActiveConvId(conv.id)}
                                    className={`
                                        p-4 rounded-[28px] cursor-pointer transition-all duration-500
                                        flex items-center gap-4 relative
                                        ${activeConvId === conv.id 
                                            ? 'bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] scale-[1.03] ring-1 ring-black/5' 
                                            : 'hover:bg-white/60 opacity-80'
                                        }
                                    `}
                                >
                                    <div className="relative shrink-0">
                                        <div className="w-[52px] h-[52px] rounded-full overflow-hidden border-2 border-white shadow-md">
                                            <img src={conv.avatar} alt={conv.name} className="w-full h-full object-cover" />
                                        </div>
                                        {conv.online && (
                                            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-[3px] border-white shadow-sm"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <h4 className="text-[17px] font-medium text-[#0B1F4D] truncate">{conv.name}</h4>
                                            <span className="text-[10px] font-medium text-gray-400">{conv.time}</span>
                                        </div>
                                        <p className="text-[13px] font-medium text-[#1a6e78] uppercase mb-0.5 tracking-wider">{conv.specialty}</p>
                                        <p className="text-[14px] text-gray-400 truncate font-medium leading-relaxed">{conv.lastMessage}</p>
                                    </div>
                                    {conv.unread > 0 && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-[11px] font-medium border-2 border-white shadow-lg">
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
                        <div className="h-[74px] px-8 flex items-center justify-between border-b border-gray-50 bg-white/80 backdrop-blur-md z-20">
                            <div className="flex items-center gap-4">
                                <div className="w-[48px] h-[48px] rounded-full overflow-hidden border-2 border-white shadow-lg relative">
                                    <img src={activeConv.avatar} alt={activeConv.name} className="w-full h-full object-cover" />
                                    {activeConv.online && (
                                        <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 rounded-full border-[2px] border-white shadow-sm"></div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-[18px] font-medium text-[#0B1F4D] leading-tight">{activeConv.name}</h3>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <p className="text-[13px] font-medium text-[#1a6e78] uppercase tracking-widest">{activeConv.specialty}</p>
                                        <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                                        <span className="text-[13px] font-medium text-green-500">Online</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-[#0B1F4D] hover:bg-gray-100 hover:scale-105 transition-all outline-none">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </button>
                                <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-[#0B1F4D] hover:bg-gray-100 hover:scale-105 transition-all outline-none">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                </button>
                                <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-[#0B1F4D] hover:bg-gray-100 hover:scale-105 transition-all outline-none">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </button>
                            </div>
                        </div>

                        {/* Interactive Message Feed Area */}
                        <div 
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 relative no-scrollbar bg-[#F5F9FB]"
                            style={{ 
                                background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 50%, #49AAB3 100%)',
                            }}
                        >
                            <div className="flex justify-center mb-6">
                                <span className="px-6 py-2 bg-black/30 backdrop-blur-xl rounded-full text-[14px] font-medium text-white uppercase tracking-[0.3em]">Today</span>
                            </div>

                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                                    <div className={`max-w-[85%] lg:max-w-[70%] flex items-end gap-5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-xl bg-white">
                                            <img src={msg.sender === 'user' ? phImg : activeConv.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                        </div>
                                        
                                        <div className="flex flex-col gap-1.5">
                                            <div className={`px-5 py-3.5 rounded-[32px] shadow-xl text-[15px] leading-relaxed relative font-medium
                                                ${msg.sender === 'user' 
                                                    ? 'bg-[#1a6e78]/40 backdrop-blur-2xl text-white rounded-br-none border border-white/10' 
                                                    : 'bg-white text-[#0B1F4D] rounded-bl-none shadow-[0_12px_40px_rgba(0,0,0,0.04)]'
                                                }
                                            `}>
                                                {msg.text}
                                            </div>
                                            <div className={`flex items-center gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <span className={`text-[11px] font-medium ${msg.sender === 'user' ? 'text-white/60' : 'text-gray-400'}`}>{msg.time}</span>
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
                        <div className="p-6 bg-white shrink-0 border-t border-gray-50 z-20">
                            <div className="bg-[#F4F9FB] rounded-[24px] p-2 flex items-center gap-3 shadow-inner border border-gray-100">
                                <button className="w-12 h-12 bg-white rounded-full text-gray-400 hover:text-[#1a6e78] shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 group">
                                    <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m-8-8h16" /></svg>
                                </button>
                                <input 
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type your message here..."
                                    className="flex-1 bg-transparent border-none outline-none text-[15px] text-[#0B1F4D] placeholder-gray-400 font-medium px-2"
                                />
                                <button className="w-12 h-12 text-gray-400 hover:text-[#1a6e78] transition-all hover:scale-110">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </button>
                                <button 
                                    onClick={handleSendMessage}
                                    className="w-[52px] h-[52px] bg-[#319797] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#288383] hover:scale-110 active:scale-90 transition-all outline-none"
                                >
                                    <svg className="w-6 h-6 ml-1 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
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

