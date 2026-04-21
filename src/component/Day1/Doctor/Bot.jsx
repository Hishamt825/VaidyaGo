import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUrl from '../../../assets/logo_1.svg';
import img1 from '../../../assets/Ellipse_139_1.svg'; // Bot avatar
import img2 from '../../../assets/Frame 226.svg'; // User avatar
import trashIcon from '../../../assets/image_105.svg';
import docMaleImage from '../../../assets/vid_profile_removebg_preview_1.svg';
import docFemaleImage from '../../../assets/vidf_profile_removebg_preview_1.svg';
import robotImage from '../../../assets/vrobo_removebg_preview_1.svg';


const Bot = () => {
    const navigate = useNavigate();
    const [inputText, setInputText] = useState('');
    const [dynamicMessages, setDynamicMessages] = useState([]);
    const [chatHistoryList, setChatHistoryList] = useState([]);
    const messagesEndRef = useRef(null);

    // Swipe states
    const [swipedItemId, setSwipedItemId] = useState(null);
    const [dragStartX, setDragStartX] = useState(null);
    const [dragCurrentX, setDragCurrentX] = useState(null);
    const [draggingId, setDraggingId] = useState(null);

    // Create Bot Modal states
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [botName, setBotName] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(0); // 0-3 robots, 4 male doc, 5 female doc
    const [selectedPersonality, setSelectedPersonality] = useState('Friendly');
    
    // Store the "Created" bot details
    const [createdBot, setCreatedBot] = useState({ 
        name: 'Bot', 
        avatar: 0, 
        personality: 'Friendly' 
    });

    const handleCreateBot = () => {
        setCreatedBot({
            name: botName || 'DocBot',
            avatar: selectedAvatar,
            personality: selectedPersonality
        });
        setShowCreateModal(false);
    };

    const handleDragStart = (e, id) => {
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        setDragStartX(clientX);
        setDragCurrentX(clientX);
        setDraggingId(id);
    };

    const handleDragMove = (e) => {
        if (draggingId === null) return;
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        setDragCurrentX(clientX);
    };

    const handleDragEnd = () => {
        if (draggingId === null) return;
        const deltaX = dragCurrentX - dragStartX;
        if (Math.abs(deltaX) > 40) {
            setSwipedItemId(swipedItemId === draggingId ? null : draggingId);
        } else if (Math.abs(deltaX) < 5) {
            setSwipedItemId(null);
        }
        setDraggingId(null);
        setDragStartX(null);
        setDragCurrentX(null);
    };

    const handleDeleteHistory = (id) => {
        setChatHistoryList(prev => prev.filter(item => item.id !== id));
        setSwipedItemId(null);
    };

    const handleClearAll = () => {
        setDynamicMessages([]);

    };

    const generateBotReply = (text) => {
        const lowerText = text.toLowerCase();
        if (/[\u0900-\u097F]/.test(text) || /\b(kaise|kya|hai|kese|haan|nahi|mujhe|dard|doctor|mera|ko)\b/.test(lowerText)) {
            return "नमस्ते अली! मैं आपकी कैसे मदद कर सकता हूँ? कृपया मुझे अपने लक्षणों के बारे में विस्तार से बताएं।";
        }
        if (/[\u0600-\u06FF]/.test(text)) {
            return "مرحبا علي! كيف حالك؟ كيف يمكنني مساعدتك اليوم؟";
        }
        return "Thank you for sharing. Could you please provide a few more details so I can assist you better?";
    };

    const handleSend = () => {
        if (!inputText.trim()) return;
        const newText = inputText;

        setDynamicMessages(prev => [
            ...prev,
            { id: Date.now(), text: newText, sender: 'user' }
        ]);

        setChatHistoryList(prev => [
            { id: Date.now() + '_hist', text: newText, isActive: false },
            ...prev
        ]);

        setInputText('');

        if (newText.toLowerCase().includes('hey')) {
            setTimeout(() => {
                setDynamicMessages(prev => [
                    ...prev,
                    { id: Date.now() + 1, text: "hello ali ,how are you,how can i help you", sender: 'bot' }
                ]);
            }, 800);
        } else {
            setTimeout(() => {
                setDynamicMessages(prev => [
                    ...prev,
                    { id: Date.now() + 1, text: generateBotReply(newText), sender: 'bot' }
                ]);
            }, 1000);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [dynamicMessages]);

    return (
        <div className="h-screen bg-[#f0f6f9] flex flex-col font-sans text-gray-700 overflow-hidden">

            {/* Top Header */}
            <header className="flex justify-between items-center px-8 py-5 shrink-0 z-10 relative">
                <div className="flex items-center">
                    <img src={logoUrl} alt="Logo" className="h-9" />
                </div>

                <div className="flex items-center gap-5">
                    {/* Settings Button */}
                    <button className="w-[50px] h-[50px] bg-white rounded-[14px] shadow-[0_4px_12px_rgba(0,0,0,0.06)] flex items-center justify-center border-0 text-black hover:bg-gray-50 transition-colors cursor-pointer">
                        <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>

                    {/* Notification Button */}
                    <button className="relative w-[50px] h-[50px] bg-white rounded-[14px] shadow-[0_4px_12px_rgba(0,0,0,0.06)] flex items-center justify-center border-0 text-[#091a26] hover:bg-gray-50 transition-colors cursor-pointer">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <div className="absolute top-[4px] right-[4px] bg-[#3f216b] text-white text-[12px] font-bold w-[20px] h-[20px] flex items-center justify-center rounded-full shadow-sm z-10 leading-none pb-[1px] translate-x-1 -translate-y-1">
                            1
                        </div>
                    </button>

                    {/* Profile Pill */}
                    <button className="bg-white border-[2px] border-white shadow-[0_4px_15px_rgba(0,0,0,0.08)] rounded-full flex items-center pl-6 pr-0 py-0 hover:bg-gray-50 transition-colors h-[50px] ml-2 outline-none cursor-pointer">
                        <span className="font-bold text-[18px] text-black tracking-wide mr-4">Mr. Ali</span>
                        <div className="w-[46px] h-[46px] rounded-full overflow-hidden shrink-0 shadow-inner mr-[2px]">
                            <img src={img2} alt="Mr. Ali" className="w-full h-full object-cover scale-[1.03]" />
                        </div>
                    </button>
                </div>
            </header>

            {/* Main Content Layout */}
            <main className="flex-1 flex px-8 pb-8 gap-5 overflow-hidden min-h-0">

                {/* Left Side Floating Icons */}
                <div className="w-12 shrink-0 flex flex-col items-center gap-[22px] mt-[100px] z-20">

                    {/* Home Icon */}
                    <button
                        onClick={() => navigate(-1)}
                        className="w-11 h-11 bg-white border border-[#c4e0e8] rounded-full flex items-center justify-center text-[#309bc0] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all outline-none"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </button>

                    {/* Active Delete/Trash Icon with Tooltip */}
                    <div className="relative group flex items-center">
                        <div className="absolute left-full ml-3 bg-white px-3 py-1.5 rounded-full shadow-md text-[11px] font-bold text-gray-600 border border-gray-100 whitespace-nowrap hidden group-hover:block pointer-events-none before:content-[''] before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-white">
                            Clear chat
                        </div>
                        <button
                            onClick={handleClearAll}
                            className="w-11 h-11 bg-[#47a6b4] rounded-full flex items-center justify-center text-white shadow-lg border-[3px] border-white hover:bg-[#3d8e9a] transition-all outline-none z-10"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Plus Icon */}
                    <button className="w-11 h-11 bg-white border border-[#c4e0e8] rounded-full flex items-center justify-center text-[#309bc0] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>

                </div>

                {/* Center Panel (Chat Interface) */}
                <div className="flex-1 bg-white rounded-[16px] shadow-[0_0px_35px_rgba(40,120,135,0.06)] border-[1.5px] border-[#d7e9ed] flex flex-col relative overflow-hidden h-full z-10 min-h-0">

                    {/* Faded Background Icons (Abstract Pattern) */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">

                        {/* Left Overlapping Bubbles */}
                        <div className="absolute left-[12%] top-[30%] rotate-[-5deg] drop-shadow-sm">
                            {/* Large Bubble */}
                            <svg className="w-[190px] h-[190px] text-[#e3f0f4]" fill="none" viewBox="0 0 24 24">
                                <path d="M12 21.5c-1.6 0-3.15-.38-4.52-1.07L3 22l1.62-4.53A9.45 9.45 0 012.5 12c0-5.24 4.26-9.5 9.5-9.5s9.5 4.26 9.5 9.5-4.26 9.5-9.5 9.5z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="8.5" cy="12" r="1.5" fill="currentColor" />
                                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                                <circle cx="15.5" cy="12" r="1.5" fill="currentColor" />
                            </svg>
                            {/* Small Bubble intersecting */}
                            <svg className="w-[120px] h-[120px] text-[#e3f0f4] absolute bottom-[-15%] left-[-25%]" fill="none" viewBox="0 0 24 24">
                                <path d="M12 21.5c-1.6 0-3.15-.38-4.52-1.07L3 22l1.62-4.53A9.45 9.45 0 012.5 12c0-5.24 4.26-9.5 9.5-9.5s9.5 4.26 9.5 9.5-4.26 9.5-9.5 9.5z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="8.5" cy="12" r="1.5" fill="currentColor" />
                                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                                <circle cx="15.5" cy="12" r="1.5" fill="currentColor" />
                            </svg>
                        </div>

                        {/* Top Right Bubble */}
                        <div className="absolute right-[12%] top-[14%] rotate-[5deg] drop-shadow-sm">
                            <svg className="w-[160px] h-[160px] text-[#e3f0f4]" fill="none" viewBox="0 0 24 24">
                                <path d="M12 21.5c-1.6 0-3.15-.38-4.52-1.07L3 22l1.62-4.53A9.45 9.45 0 012.5 12c0-5.24 4.26-9.5 9.5-9.5s9.5 4.26 9.5 9.5-4.26 9.5-9.5 9.5z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="8.5" cy="12" r="1.5" fill="currentColor" />
                                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                                <circle cx="15.5" cy="12" r="1.5" fill="currentColor" />
                            </svg>
                        </div>

                        {/* Bottom Right Bubble */}
                        <div className="absolute right-[22%] bottom-[20%] rotate-[-8deg] drop-shadow-sm">
                            <svg className="w-[140px] h-[140px] text-[#e3f0f4]" fill="none" viewBox="0 0 24 24">
                                <path d="M12 21.5c-1.6 0-3.15-.38-4.52-1.07L3 22l1.62-4.53A9.45 9.45 0 012.5 12c0-5.24 4.26-9.5 9.5-9.5s9.5 4.26 9.5 9.5-4.26 9.5-9.5 9.5z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="8.5" cy="12" r="1.5" fill="currentColor" />
                                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                                <circle cx="15.5" cy="12" r="1.5" fill="currentColor" />
                            </svg>
                        </div>

                    </div>

                    {/* Header Title inside chat */}
                    <div className="relative z-10 px-8 py-6 pb-2">
                        <h1 className="text-[26px] font-bold text-[#b6d0d7] flex items-center gap-3">
                            Chatbot
                            {/* Small Bot Icon */}
                            <div className="w-[30px] h-[30px] bg-[#eef7fb] rounded-full flex items-center justify-center shadow-sm relative">
                                <svg className="w-4 h-4 text-[#47a6b4]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <rect x="5" y="6" width="14" height="12" rx="2" />
                                    <path d="M9 10h.01M15 10h.01M12 2v4M10 21h4M7 6V4a2 2 0 012-2h6a2 2 0 012 2v2" />
                                </svg>
                                {/* Online indicator */}
                                <span className="absolute top-[2px] right-[-2px] w-2 h-2 bg-green-400 border border-white rounded-full"></span>
                            </div>
                        </h1>
                    </div>

                    {/* Scrollable Chat History */}
                    <div className="flex-1 overflow-y-auto px-10 py-6 relative z-10 flex flex-col gap-10 scrollbar-thin scrollbar-thumb-gray-200">

                        {/* Dynamic Messages */}
                        {dynamicMessages.map(msg => {
                            if (msg.sender === 'bot') {
                                // Determine which image and filter to use for the current created bot
                                let botImgSource = robotImage;
                                let botFilter = "";
                                if (createdBot.avatar === 1) botFilter = "hue-rotate(60deg)";
                                if (createdBot.avatar === 2) botFilter = "hue-rotate(120deg) brightness(1.1)";
                                if (createdBot.avatar === 3) botFilter = "hue-rotate(190deg) saturate(1.5)";
                                if (createdBot.avatar === 4) botImgSource = docMaleImage;
                                if (createdBot.avatar === 5) botImgSource = docFemaleImage;

                                return (
                                    <div key={msg.id} className="flex w-full items-start gap-4 mt-4 pb-[10px]">
                                        <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border-[1.5px] border-[#d7e5eb] mt-1 shadow-sm bg-white">
                                            <img 
                                                src={botImgSource} 
                                                className="w-full h-full object-cover" 
                                                alt="Bot" 
                                                style={{ filter: botFilter }}
                                            />
                                        </div>
                                        <div className="max-w-[50%] min-w-[340px]">
                                            <div className="bg-white border-[1px] border-[#9bc4cf]/60 rounded-[14px] rounded-tl-none px-6 py-5 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex flex-col text-[14px] font-[500] leading-relaxed text-black tracking-wide relative">
                                                <span className="absolute -left-[7px] top-[-1px] w-[14px] h-[14px] bg-white border-l-[1px] border-t-[1px] border-[#9bc4cf]/60 rounded-tl-[4px]" style={{ transform: 'skewX(45deg) rotate(0deg)' }}></span>
                                                <p className="relative z-10">{msg.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={msg.id} className="flex w-full items-start justify-end gap-4 mt-4 pb-[10px]">
                                        <div className="max-w-[50%]">
                                            <div className="bg-[#eefcfc] border-[1px] border-[#bfe7ec] rounded-[14px] rounded-tr-none px-6 py-4 shadow-sm flex flex-col text-[14px] font-[500] leading-relaxed text-[#111] relative">
                                                <span className="absolute -right-[7px] top-[-1px] w-[14px] h-[14px] bg-[#eefcfc] border-r-[1px] border-t-[1px] border-[#bfe7ec] rounded-tr-[4px]" style={{ transform: 'skewX(-45deg) rotate(0deg)' }}></span>
                                                <p className="relative z-10">{msg.text}</p>
                                            </div>
                                        </div>
                                        <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border-[1.5px] border-[#d7e5eb] mt-0 shadow-sm">
                                            <img src={img2} className="w-full h-full object-cover" alt="User" />
                                        </div>
                                    </div>
                                );
                            }
                        })}

                        <div ref={messagesEndRef} className="h-[80px] shrink-0 w-full" />

                    </div>

                    {/* Input Chat Bottom Area */}
                    <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 w-[94%] bg-white rounded-[30px] shadow-[0_2px_15px_rgba(0,0,0,0.06)] border border-[#d6eaef] flex items-center px-2 py-1.5 z-20">

                        {/* Left Icon (Folder) */}
                        <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors rounded-full border border-gray-200 hover:bg-gray-50 shrink-0 ml-1">
                            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                        </button>

                        {/* Input Field */}
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask or search anything"
                            className="flex-1 bg-transparent px-4 py-2 text-[14px] outline-none text-gray-700 placeholder:text-[#999] font-[500]"
                        />

                        {/* Mic Icon */}
                        <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors rounded-full border border-gray-200 hover:bg-gray-50 shrink-0 mx-1">
                            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                        </button>

                        {/* Wave Lines Icon */}
                        <button className="h-9 px-[12px] flex items-center justify-center gap-[3px] rounded-full border border-gray-200 hover:bg-gray-50 shrink-0 mx-1">
                            <span className="w-[2px] h-[10px] bg-[#3990a0] rounded-full"></span>
                            <span className="w-[2px] h-[16px] bg-[#3990a0] rounded-full"></span>
                            <span className="w-[2px] h-[8px] bg-[#3990a0] rounded-full"></span>
                            <span className="w-[2px] h-[14px] bg-[#3990a0] rounded-full"></span>
                            <span className="w-[2px] h-[6px] bg-[#3990a0] rounded-full"></span>
                        </button>

                        {/* Send Button */}
                        <button
                            onClick={handleSend}
                            className="w-[52px] h-[36px] bg-[#49a0b1] rounded-full flex items-center justify-center text-[#091a1e] shadow-sm hover:bg-[#3d8c9b] transition-colors shrink-0 ml-1 cursor-pointer"
                        >
                            <svg className="w-[18px] h-[18px] ml-[-2px] mt-[1px] rotate-[-5deg]" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                        </button>

                    </div>
                    {/* Chat Background Highlight behind input */}
                    <div className="absolute bottom-[28px] left-1/2 -translate-x-1/2 w-[90%] h-[50px] bg-[#eef7fa] rounded-full z-10 hidden blur-xl"></div>

                </div>

                {/* Right Sidebar */}
                <div className="w-[280px] shrink-0 flex flex-col gap-5 h-full overflow-hidden min-h-0">

                    {/* Chat History Component */}
                    <div className="flex-1 bg-[#edf5f8] rounded-[16px] flex flex-col border border-[#cfdfe5] overflow-hidden min-h-0">
                        {/* Header */}
                        <div className="bg-[#6db4bf] text-white font-semibold flex items-center px-5 h-[48px] text-[15px] tracking-wide shrink-0">
                            Chat History
                        </div>

                        {/* Snippet List */}
                        <div className="flex-1 overflow-y-auto px-[14px] py-[14px] flex flex-col gap-[10px] scrollbar-thin overflow-x-hidden">
                            {chatHistoryList.map(hist => {
                                const isSwiped = swipedItemId === hist.id;
                                const isDragging = draggingId === hist.id;
                                let translateX = isSwiped ? -60 : 0;
                                if (isDragging && dragStartX !== null && dragCurrentX !== null) {
                                    const deltaX = dragCurrentX - dragStartX;
                                    translateX = isSwiped ? -60 + deltaX : deltaX;
                                    if (translateX < -70) translateX = -70; // max left pull
                                    if (translateX > 0) translateX = 0;     // prevent right pull
                                }

                                return (
                                    <div
                                        key={hist.id}
                                        className="relative bg-[#f8b2b2] border border-[#f0a8a8] rounded-[6px] shadow-sm flex overflow-hidden shrink-0 min-h-[64px]"
                                    >
                                        {/* Delete Background / Button */}
                                        <div
                                            className="absolute right-0 top-0 bottom-0 w-[60px] h-full flex items-center justify-center cursor-pointer hover:bg-[#ff9c9c] transition-colors"
                                            onClick={() => handleDeleteHistory(hist.id)}
                                        >
                                            <img src={trashIcon} alt="Delete" className="w-[28px] h-[28px] rotate-[-5deg] drop-shadow-sm" />
                                        </div>

                                        {/* Swiping Foreground */}
                                        <div
                                            className="absolute left-0 top-0 bottom-0 w-full bg-white border border-gray-200 rounded-[6px] p-3 cursor-grab active:cursor-grabbing flex items-center shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
                                            style={{
                                                transform: `translateX(${translateX}px)`,
                                                transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                                            }}
                                            onMouseDown={(e) => handleDragStart(e, hist.id)}
                                            onMouseMove={handleDragMove}
                                            onMouseUp={handleDragEnd}
                                            onMouseLeave={handleDragEnd}
                                            onTouchStart={(e) => handleDragStart(e, hist.id)}
                                            onTouchMove={handleDragMove}
                                            onTouchEnd={handleDragEnd}
                                        >
                                            <p className="text-[10px] text-gray-500 leading-[1.6] line-clamp-3 font-[500] pointer-events-none w-full">
                                                {hist.text}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Create Doc Bot Component */}
                    <div className="h-[280px] bg-white rounded-[16px] border-[1.5px] border-gray-200 relative overflow-hidden flex flex-col shrink-0 shadow-sm mt-1">
                        {/* Background Circles */}
                        <div className="absolute top-[-25%] right-[-30%] w-[220px] h-[220px] bg-[#e4f4f7] rounded-full z-0"></div>
                        <div className="absolute bottom-[-15%] left-[-25%] w-[260px] h-[260px] bg-[#6eb9c5] rounded-full z-0 opacity-90"></div>

                        {/* Illustration Group */}
                        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[200px] h-[130px] z-10 flex items-end justify-center">
                            {/* Female Doctor (Left) */}
                            <div className="absolute left-[0px] bottom-[5px] w-[130px] z-10 pointer-events-none">
                                <img src={docFemaleImage} alt="Female Doctor" className="w-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.08)]" />
                            </div>
                            {/* Male Doctor (Right) */}
                            <div className="absolute right-[0px] bottom-[5px] w-[105px] z-0 pointer-events-none">
                                <img src={docMaleImage} alt="Male Doctor" className="w-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.08)]" />
                            </div>
                            {/* Robot Core (Center, Front) */}
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-15px] w-[95px] z-20 pointer-events-none">
                                <img src={robotImage} alt="Robot Bot" className="w-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]" />
                            </div>
                        </div>

                        {/* Button */}
                        <button 
                            onClick={() => setShowCreateModal(true)}
                            className="absolute bottom-[20px] left-1/2 -translate-x-1/2 bg-white rounded-full px-[18px] py-[10px] font-bold tracking-wide text-[#2b8696] text-[14px] shadow-[0_8px_20px_rgba(0,0,0,0.1)] flex items-center justify-center gap-[6px] hover:bg-gray-50 transition-colors z-20 whitespace-nowrap outline-none border border-gray-100 min-w-[170px]"
                        >
                            {/* Embedded Bot Icon & Bubble */}
                            <div className="flex items-center relative mr-1">
                                <svg className="w-[20px] h-[20px] text-[#245b85]" viewBox="0 0 24 24" fill="currentColor">
                                    <rect x="4" y="6" width="16" height="12" rx="3" />
                                    <path d="M12 2v4M8 22h8M10 22v-4M14 22v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <circle cx="9" cy="11" r="1.5" fill="#58d4e7" />
                                    <circle cx="15" cy="11" r="1.5" fill="#58d4e7" />
                                </svg>
                                {/* Green Speech Bubble */}
                                <div className="absolute -top-[8px] -right-[5px] bg-[#62b962] rounded-[3px] w-[13px] h-[10px] flex items-center justify-center border-[0.5px] border-white">
                                    <div className="flex gap-[1.5px]">
                                        <span className="w-[1.5px] h-[1.5px] bg-white rounded-full"></span>
                                        <span className="w-[1.5px] h-[1.5px] bg-white rounded-full"></span>
                                        <span className="w-[1.5px] h-[1.5px] bg-white rounded-full"></span>
                                    </div>
                                    <span className="absolute bottom-[-3px] right-[2px] w-0 h-0 border-r-[4px] border-r-transparent border-l-[4px] border-l-transparent border-t-[4px] border-t-[#62b962]"></span>
                                </div>
                            </div>
                            Create doc bot
                        </button>
                    </div>

                </div>

            </main>

            {/* Create Your DOC BOT Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-[6px] z-[100] flex items-center justify-center animate-in fade-in duration-300">
                    <div className="bg-[#eefcfc] w-[580px] rounded-[30px] shadow-[0_30px_70px_rgba(0,0,0,0.2)] overflow-hidden border border-white/60 flex flex-col transform transition-all animate-in zoom-in-95 duration-300">
                        
                        {/* Modal Header */}
                        <div className="bg-white/80 py-5 px-6 flex justify-center items-center shadow-sm relative border-b border-[#aee2e9]/30">
                            <div className="flex items-center gap-3 bg-[#aee2e9]/40 px-8 py-2.5 rounded-[16px] border border-[#7ed0db]">
                                <img src={robotImage} alt="Robot Title" className="w-[32px] h-[32px] drop-shadow-sm" />
                                <h2 className="text-[23px] font-bold text-[#092a35] tracking-tight">Create Your DOC BOT</h2>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="px-12 py-8 flex flex-col gap-8">
                            <div className="text-center font-bold text-[#4a5a65] text-[16px] tracking-wide">
                                Customize Your Chatbot Character
                            </div>

                            {/* Bot Name Input */}
                            <div className="flex items-center gap-6">
                                <label className="text-[17px] font-bold text-[#2d3a43] shrink-0 min-w-[130px]">DocBot Name:</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter Name....."
                                    value={botName}
                                    onChange={(e) => setBotName(e.target.value)}
                                    className="flex-1 bg-white border border-[#c3dcde] rounded-[12px] px-5 py-3 text-[15px] outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] focus:border-[#49a0b1] focus:ring-2 focus:ring-[#49a0b1]/20 transition-all font-medium placeholder:text-gray-400"
                                />
                            </div>

                            {/* Divider Line */}
                            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#999]/20 to-transparent w-full"></div>

                            {/* Select Avatar */}
                            <div className="flex flex-col gap-5">
                                <label className="text-[17px] font-bold text-[#2d3a43]">Select Avatar:</label>
                                <div className="flex justify-between items-end px-1">
                                    {[0, 1, 2, 3, 4, 5].map((idx) => {
                                        let imgSource = robotImage;
                                        let filterStyle = "";
                                        if (idx === 1) filterStyle = "hue-rotate(60deg)";
                                        if (idx === 2) filterStyle = "hue-rotate(120deg) brightness(1.1)";
                                        if (idx === 3) filterStyle = "hue-rotate(190deg) saturate(1.5)";
                                        if (idx === 4) imgSource = docMaleImage;
                                        if (idx === 5) imgSource = docFemaleImage;

                                        return (
                                            <div 
                                                key={idx}
                                                className={`relative cursor-pointer transition-all ${selectedAvatar === idx ? 'scale-115 drop-shadow-xl z-10' : 'opacity-70 hover:opacity-100 hover:scale-110'}`}
                                                onClick={() => setSelectedAvatar(idx)}
                                            >
                                                <img 
                                                    src={imgSource} 
                                                    alt={`Avatar ${idx}`} 
                                                    className={`w-[62px] h-[62px] object-contain ${idx === 4 || idx === 5 ? 'w-[78px] h-[78px] mb-[-4px]' : ''}`}
                                                    style={{ filter: filterStyle }}
                                                />
                                                {selectedAvatar === idx && (
                                                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#fbd235] rounded-full border-[2px] border-white flex items-center justify-center shadow-md animate-in zoom-in-50">
                                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Divider Line */}
                            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#999]/20 to-transparent w-full"></div>

                            {/* Choose Personality */}
                            <div className="flex flex-col gap-5">
                                <label className="text-[17px] font-bold text-[#2d3a43]">Choose Personality:</label>
                                <div className="flex gap-5">
                                    {['Friendly', 'Helper', 'Professional'].map((type) => (
                                        <button 
                                            key={type}
                                            onClick={() => setSelectedPersonality(type)}
                                            className={`flex-1 py-3 px-2 rounded-[14px] font-bold text-[16px] border-[2.5px] transition-all
                                                ${selectedPersonality === type 
                                                    ? 'bg-[#409eb0] border-[#378c9d] text-white shadow-[0_8px_20px_rgba(64,158,176,0.35)] -translate-y-0.5' 
                                                    : 'bg-white border-white text-[#5a6a75] hover:border-[#409eb0]/20 shadow-sm'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-12 pb-10 pt-4 flex gap-8">
                            <button 
                                onClick={() => setShowCreateModal(false)}
                                className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 py-4 rounded-[20px] text-[19px] font-bold text-[#2d3a43] shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all outline-none"
                            >
                                Cancle
                            </button>
                            <button 
                                onClick={handleCreateBot}
                                className="flex-1 bg-[#47a6b4] hover:bg-[#3d8e9a] py-4 rounded-[20px] text-[18px] font-bold text-[#091a26] shadow-[0_8px_25px_rgba(71,166,180,0.4)] hover:-translate-y-1 transition-all outline-none flex items-center justify-center gap-3"
                            >
                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                    <img src={robotImage} alt="Robot Title" className="w-[16px] h-[16px] brightness-0 invert" />
                                </div>
                                Create DocBot
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Bot;
