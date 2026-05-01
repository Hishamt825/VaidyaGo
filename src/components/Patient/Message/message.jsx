import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Patient_sidebar';
import Profile from '../Profile';
import Account from '../Account';
import Notification from '../notification';

// Assets
import phImg from '../../../assets/ph.png';
import alenaImg from '../../../assets/alena.png';
import usImg from '../../../assets/marcus.png';
import amitImg from '../../../assets/amit.png';
import anjaliImg from '../../../assets/anjali.png';

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
            <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden ${activeModal || isNotificationOpen ? 'blur-[4px] scale-[0.98] pointer-events-none' : ''}`}>

                {/* Header Navbar */}
                <header className="h-[76px] flex items-center justify-between px-[24px] md:px-[48px] shrink-0 border-b border-white/5 mb-[8px] z-20">
                    
                    {/* Hamburger for Mobile */}
                    <button 
                        onClick={() => setIsMobileOpen(true)}
                        className="lg:hidden text-white p-2 -ml-2 hover:bg-white/10 rounded-xl transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
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
                    <div className="w-[300px] md:w-[350px] bg-[#F3F6F7] flex flex-col border-r border-gray-200 shrink-0">
                        <div className="p-6 pb-2 mb-2 flex items-center justify-between">
                            <h2 className="text-[#0B1F4D] text-[26px] font-bold tracking-tight">Chats</h2>
                            <button className="w-10 h-10 bg-[#6ED4D4] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#6ED4D4]/30 hover:scale-110 transition-transform">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-0.5 no-scrollbar">
                            {conversations.map((conv) => (
                                <div
                                    key={conv.id}
                                    onClick={() => setActiveConvId(conv.id)}
                                    className={`
                                        px-6 py-4 cursor-pointer transition-all duration-300
                                        flex items-center gap-4 relative border-b border-gray-100/50
                                        ${activeConvId === conv.id
                                            ? 'bg-white'
                                            : 'hover:bg-gray-200/50'
                                        }
                                    `}
                                >
                                    <div className="relative shrink-0">
                                        <div className="w-[54px] h-[54px] rounded-full overflow-hidden border border-gray-100">
                                            <img src={conv.avatar} alt={conv.name} className="w-full h-full object-cover" />
                                        </div>
                                        {conv.online && (
                                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-[2.5px] border-white shadow-sm"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="text-[16px] font-bold text-[#0B1F4D] truncate">{conv.name}</h4>
                                            <span className={`text-[11px] font-medium ${conv.unread > 0 ? 'text-green-500' : 'text-gray-400'}`}>{conv.time}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-[13.5px] text-gray-500 truncate font-medium flex-1">
                                                {conv.id % 2 === 0 && <svg className="w-3.5 h-3.5 inline mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                                                {conv.lastMessage}
                                            </p>
                                            {conv.unread > 0 && (
                                                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                                                    {conv.unread}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Chat Window Area */}
                    <div className="flex-1 flex flex-col bg-[#E5DDD5] overflow-hidden relative">
                        {/* Background pattern overlay (Subtle tiles) */}
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '15px 15px' }}></div>

                        {/* Chat Context Header */}
                        <div className="h-[72px] px-6 flex items-center justify-between border-b border-gray-200 bg-[#F0F2F3] z-20">
                            <div className="flex items-center gap-4 cursor-pointer">
                                <div className="w-[44px] h-[44px] rounded-full overflow-hidden border border-gray-200">
                                    <img src={activeConv.avatar} alt={activeConv.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-[16px] font-bold text-[#0B1F4D] leading-tight">{activeConv.name}</h3>
                                    <p className="text-[12px] font-medium text-green-600">Online</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="p-2 text-[#54656F] hover:bg-gray-200 rounded-full transition-colors outline-none">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </button>
                                <button 
                                    onClick={() => navigate('/Vediocall')}
                                    className="p-2 text-[#54656F] hover:bg-gray-200 rounded-full transition-colors outline-none"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                </button>
                                <button className="p-2 text-[#54656F] hover:bg-gray-200 rounded-full transition-colors outline-none">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                                </button>
                            </div>
                        </div>

                        {/* Interactive Message Feed Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 md:p-8 space-y-2 relative no-scrollbar"
                            style={{
                                background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 50%, #49AAB3 100%)',
                            }}
                        >
                            <div className="flex justify-center mb-6 sticky top-0 z-10">
                                <span className="px-6 py-2 bg-[#0B1F4D]/40 backdrop-blur-md border border-white/5 rounded-full text-[12px] font-bold text-white shadow-lg uppercase tracking-[0.25em]">Today</span>
                            </div>

                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4 items-end gap-3`}>
                                    {msg.sender === 'doctor' && (
                                        <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-white/20 shadow-sm mb-1">
                                            <img src={activeConv.avatar} alt="Doctor" className="w-full h-full object-cover" />
                                        </div>
                                    )}

                                    <div className={`
                                        max-w-[75%] lg:max-w-[55%] px-4 py-2.5 rounded-[20px] shadow-sm relative text-[15px] leading-relaxed
                                        ${msg.sender === 'user' 
                                            ? 'bg-[#1a6e78]/40 backdrop-blur-md text-white rounded-tr-none border border-white/10' 
                                            : 'bg-white text-[#111B21] rounded-tl-none shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
                                        }
                                    `}>
                                        {/* Tail SVG */}
                                        {msg.sender === 'user' ? (
                                            <div className="absolute top-0 -right-2 w-3 h-3 text-[#1a6e78]/40">
                                                <svg viewBox="0 0 8 13" preserveAspectRatio="none" className="w-full h-full fill-current"><path d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"/></svg>
                                            </div>
                                        ) : (
                                            <div className="absolute top-0 -left-2 w-3 h-3 text-white">
                                                <svg viewBox="0 0 8 13" preserveAspectRatio="none" className="w-full h-full fill-current scale-x-[-1]"><path d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"/></svg>
                                            </div>
                                        )}

                                        <div className="pr-12 break-words font-medium">
                                            {msg.text}
                                        </div>

                                        <div className="absolute bottom-1.5 right-2 flex items-center gap-1.5">
                                            <span className={`text-[10px] lowercase opacity-60 font-bold ${msg.sender === 'user' ? 'text-white' : 'text-[#667781]'}`}>{msg.time}</span>
                                            {msg.sender === 'user' && (
                                                <div className="flex -space-x-1">
                                                    <svg className="w-3.5 h-3.5 text-cyan-300" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* WhatsApp-style Input Hub */}
                        <div className="px-4 py-3 bg-[#F0F2F3] shrink-0 flex items-center gap-2 z-20">
                            <div className="flex items-center gap-1">
                                <button className="p-2 text-[#54656F] hover:bg-gray-200 rounded-full transition-colors outline-none scale-110">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </button>
                                <button className="p-2 text-[#54656F] hover:bg-gray-200 rounded-full transition-colors outline-none">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m-8-8h16" /></svg>
                                </button>
                            </div>

                            <div className="flex-1 bg-white rounded-full px-4 py-2.5 flex items-center shadow-sm">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type a message"
                                    className="flex-1 bg-transparent border-none outline-none text-[15px] text-[#111B21] placeholder-[#667781]"
                                />
                            </div>

                            <button
                                onClick={handleSendMessage}
                                className={`
                                    w-[46px] h-[46px] rounded-full flex items-center justify-center transition-all
                                    ${inputText.trim() ? 'bg-[#00A884] text-white' : 'text-[#8696a0] bg-transparent'}
                                `}
                            >
                                {inputText.trim() ? (
                                    <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                                )}
                            </button>
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

