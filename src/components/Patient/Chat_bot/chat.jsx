import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Plus, Volume2, History, X, Settings, Minimize2, FileText, Image, Camera, BarChart2, RefreshCw, Keyboard } from 'lucide-react';
import robotImage from '../../../assets/869455f37775ce0db978b4ab2fcf8919-Picsart-BackgroundRemover.jpg';
import voiceIcon from '../../../assets/voice.png';
import BASE_URL from '../../../baseUrl';

const Chat = ({ isOpen, onClose }) => {
    const userType = localStorage.getItem('user_type');
    const isAdmin = userType === 'admin' && !['/MainPage', '/About', '/ContactUs', '/Service', '/FAQ', '/Disease', '/Hos_consultation', '/Makeapp', '/'].includes(window.location.pathname);
    const isDoctor = userType === 'doctor' && !['/MainPage', '/About', '/ContactUs', '/Service', '/FAQ', '/Disease', '/Hos_consultation', '/Makeapp', '/'].includes(window.location.pathname);

    const [messages, setMessages] = useState([
        {
            id: 1,
            text: isAdmin 
                ? "Welcome back, Admin. Vado SuperAdmin systems are online. How can I assist with platform operations today?"
                : isDoctor
                    ? "Hello Doctor! I am your clinical assistant. How can I help with your patients or schedule today?"
                    : "Hello! I am VaidyaGo AI, your health assistant. How can I assist you today?",
            sender: 'ai',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isVoiceMode, setIsVoiceMode] = useState(false);
    const [voiceError, setVoiceError] = useState(false);
    const [isAttachMenuOpen, setIsAttachMenuOpen] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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

    const [sessionId, setSessionId] = useState(() => {
        const key = isAdmin ? 'admin_chat_session' : isDoctor ? 'doctor_chat_session' : 'patient_chat_session';
        return localStorage.getItem(key);
    });

    const [recognition, setRecognition] = useState(null);
    const [isListening, setIsListening] = useState(false);

    // Initialize Speech Recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recog = new SpeechRecognition();
            recog.continuous = false;
            recog.interimResults = false;
            recog.lang = 'en-US';

            recog.onstart = () => setIsListening(true);
            recog.onend = () => setIsListening(false);
            recog.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInputText(transcript);
                // Automatically send if in voice mode
                if (isVoiceMode) {
                    setTimeout(() => handleVoiceSend(transcript), 500);
                }
            };
            recog.onerror = (event) => {
                // 'aborted' usually happens when we stop/start manually, so it's not a real error
                if (event.error === 'aborted') return;
                
                console.error('Speech recognition error:', event.error);
                setVoiceError(true);
                setIsListening(false);
            };
            setRecognition(recog);
        }
    }, [isVoiceMode]);

    const handleVoiceSend = async (text) => {
        if (!text.trim()) return;
        // Do NOT set isVoiceMode to false here to keep the overlay visible
        await processChatMessage(text);
    };

    const processChatMessage = async (userText) => {
        const userType = localStorage.getItem('user_type');
        const doctorId = localStorage.getItem('doctor_id');
        const token = localStorage.getItem('token');

        const newMessage = {
            id: Date.now(),
            text: userText,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newMessage]);
        setInputText('');
        setIsLoading(true);

        try {
            const publicPages = ['/MainPage', '/About', '/ContactUs', '/Service', '/FAQ', '/Disease', '/Hos_consultation', '/Makeapp', '/'];
            const isPublicPage = publicPages.includes(window.location.pathname);
            
            const apiEndpoint = (isAdmin && !isPublicPage)
                ? `${BASE_URL}/api/vado-admin/chat/`
                : (isDoctor && !isPublicPage) 
                    ? `${BASE_URL}/api/vado-doctor/chat/` 
                    : `${BASE_URL}/api/vado/chat/`;

            const payload = {
                message: userText,
                session_id: sessionId
            };
            if (isDoctor && !isPublicPage && doctorId) payload.doctor_id = doctorId;

            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.reply || data.success === true) {
                const aiText = data.reply || (data.success ? "Action executed successfully." : "I couldn't find a response.");
                const aiResponse = {
                    id: Date.now() + 1,
                    text: aiText,
                    sender: 'ai',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    intent: data.intent,
                    action: data.action,
                    actionData: data.data,
                    audioUrl: data.audio_url
                };
                setMessages(prev => [...prev, aiResponse]);
                
                // Speak the response if voice mode is active
                if (isVoiceMode) {
                    speakText(aiText, true, data.audio_url); // Pass true to indicate we want to resume listening after
                } else if (localStorage.getItem('voice_enabled') === 'true') {
                    speakText(aiText, false, data.audio_url);
                }

                if (data.session_id) {
                    setSessionId(data.session_id);
                    const key = isAdmin && !isPublicPage ? 'admin_chat_session' : (isDoctor && !isPublicPage ? 'doctor_chat_session' : 'patient_chat_session');
                    localStorage.setItem(key, data.session_id);
                }
            } else {
                throw new Error(data.error || data.details || 'Failed to get response');
            }
        } catch (error) {
            console.error('Chat Error:', error);
            const errorMessage = {
                id: Date.now() + 2,
                text: "I'm sorry, I encountered an error. Please try again.",
                sender: 'ai',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isError: true
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async (e) => {
        if (e) e.preventDefault();
        if (!inputText.trim() || isLoading) return;
        await processChatMessage(inputText);
    };

    const speakText = (text, autoResume = false, audioUrl = null) => {
        if (audioUrl) {
            const fullUrl = audioUrl.startsWith('http') ? audioUrl : `${BASE_URL}${audioUrl}`;
            const audio = new Audio(fullUrl);
            
            if (autoResume) {
                audio.onended = () => {
                    if (isVoiceMode) startListening();
                };
            }
            
            audio.play().catch(e => {
                console.warn('Backend audio play failed, falling back to browser TTS:', e);
                playBrowserTTS(text, autoResume);
            });
        } else {
            playBrowserTTS(text, autoResume);
        }
    };

    const playBrowserTTS = (text, autoResume = false) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            
            const isHindi = /[\u0900-\u097F]/.test(text);
            const targetLang = isHindi ? 'hi-IN' : 'en-IN';
            const voices = window.speechSynthesis.getVoices();
            
            const preferredVoice = voices.find(v => v.lang === targetLang && (v.name.includes('Google') || v.name.includes('Natural'))) ||
                                 voices.find(v => v.lang === targetLang) ||
                                 voices.find(v => (v.name.includes('Google') || v.name.includes('Natural')) && v.lang.startsWith('en')) ||
                                 voices.find(v => v.lang.startsWith('en'));
            
            if (preferredVoice) utterance.voice = preferredVoice;
            utterance.lang = targetLang;
            utterance.rate = 1.0; 
            utterance.pitch = 1.0; 
            
            if (autoResume) {
                utterance.onend = () => {
                    if (isVoiceMode) startListening();
                };
            }
            window.speechSynthesis.speak(utterance);
        }
    };

    const startListening = () => {
        if (recognition) {
            setVoiceError(false);
            if (isListening) {
                recognition.stop();
            } else {
                try {
                    recognition.start();
                } catch (e) {
                    console.warn('Recognition start error:', e);
                }
            }
        } else {
            setVoiceError(true);
        }
    };

    const handleFileSelect = (type) => {
        setIsAttachMenuOpen(false);
        if (type === 'file') fileInputRef.current?.click();
        if (type === 'image') imageInputRef.current?.click();
        if (type === 'camera') cameraInputRef.current?.click();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-10 right-6 z-[10000] pointer-events-none">
            <motion.div
                layout
                initial={{ opacity: 0, y: 50, transformOrigin: 'bottom right' }}
                animate={{ 
                    opacity: 1, 
                    y: 0,
                    width: showHistory ? '850px' : '480px'
                }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="h-[680px] max-h-[85vh] bg-gradient-to-b from-[#FAD0C4] to-[#F1E1FF] rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/20 overflow-hidden flex pointer-events-auto"
            >
                {/* History Sidebar (Integrated) */}
                <AnimatePresence>
                    {showHistory && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: '380px', opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="h-full bg-white border-r border-gray-100 flex flex-col shrink-0 overflow-hidden"
                        >
                            {/* Sidebar Header */}
                            <div className="px-8 py-8 border-b border-gray-50 shrink-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h2 className="text-[24px] font-bold text-gray-800 tracking-tight">Chat History</h2>
                                    <button 
                                        onClick={() => setShowHistory(false)}
                                        className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 rounded-full"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                                <p className="text-[13px] text-gray-400 font-medium truncate">Review your previous collaborative sessions</p>
                            </div>

                            {/* Sidebar Search */}
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
                                        placeholder="Search..." 
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-[14px] outline-none focus:border-[#19718A] transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* Sidebar List */}
                            <div className="flex-1 overflow-y-auto px-6 py-2 custom-scrollbar">
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
                                        <div>
                                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-4 block px-2">Yesterday</span>
                                            <div className="space-y-1">
                                                {historySessions.filter(s => s.group === 'Yesterday').map(session => (
                                                    <HistoryItem 
                                                        key={session.id}
                                                        icon={<FileText size={18} />}
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

                            {/* Sidebar Footer */}
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
                <div className="flex-1 flex flex-col min-w-[420px] relative">
                    {/* Voice Mode Overlay */}
                    <AnimatePresence>
                        {isVoiceMode && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="absolute inset-0 z-[100] bg-gradient-to-b from-[#FAD4D4] via-[#F8E2FD] to-[#E3F2FD] flex flex-col items-center justify-between p-8"
                            >
                                {/* Top Content: Robot/Bot Icon */}
                                <div className="mt-8 flex flex-col items-center gap-6">
                                    <motion.div
                                        animate={voiceError ? {
                                            x: [0, -5, 5, -5, 5, 0],
                                        } : {}}
                                        transition={{ 
                                            duration: voiceError ? 0.4 : 0, 
                                            repeat: voiceError ? Infinity : 0,
                                            ease: "easeInOut"
                                        }}
                                        className={`w-40 h-40 flex items-center justify-center overflow-visible ${voiceError ? 'text-gray-800' : ''}`}
                                    >
                                        {voiceError ? (
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="flex gap-4 mb-1 text-[#1A7785]">
                                                    <div className="w-4 h-4 border-2 border-current rotate-45 border-l-0 border-t-0"></div>
                                                    <div className="w-4 h-4 border-2 border-current rotate-45 border-l-0 border-t-0"></div>
                                                </div>
                                                <svg width="40" height="12" viewBox="0 0 40 12" fill="none" stroke="#1A7785" strokeWidth="3" strokeLinecap="round">
                                                    <path d="M2 10 L10 2 L18 10 L26 2 L34 10" />
                                                </svg>
                                            </div>
                                        ) : (
                                            <img src={robotImage} alt="AI" className="w-full h-full object-contain" />
                                        )}
                                    </motion.div>
                                </div>

                                {/* Bottom Card */}
                                <motion.div 
                                    initial={{ y: 200 }}
                                    animate={{ y: 0 }}
                                    className="w-[94%] bg-white rounded-[40px] p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] flex flex-col items-center gap-6 mb-4"
                                >
                                    <div className="text-center px-2">
                                        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">Hi Patient!</p>
                                        {voiceError ? (
                                            <h2 className="text-gray-700 font-bold text-base leading-relaxed max-w-[240px]">
                                                Unfortunately, we curently cannot connect to the internet. Please try again.
                                            </h2>
                                        ) : (
                                            <h2 className="text-gray-800 font-bold text-2xl tracking-tight max-w-[320px] max-h-[160px] overflow-y-auto custom-scrollbar">
                                                {isLoading ? "Thinking..." : (messages.length > 0 && messages[messages.length - 1].sender === 'ai' ? messages[messages.length - 1].text : "How can I help you?")}
                                            </h2>
                                        )}
                                    </div>

                                    {/* Pulsing Mic Button / Refresh Icon */}
                                    <div className="relative">
                                        {!voiceError ? (
                                             <>
                                                 <motion.div
                                                     animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
                                                     transition={{ duration: 2, repeat: Infinity }}
                                                     className="absolute inset-0 bg-purple-500 rounded-full blur-2xl"
                                                 />
                                                 <button 
                                                     onClick={startListening}
                                                     className={`relative w-24 h-24 bg-gradient-to-tr from-[#A855F7] to-[#C084FC] rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all active:scale-95 overflow-hidden ${isListening ? 'ring-4 ring-purple-300 ring-offset-4 animate-pulse' : ''}`}
                                                 >
                                                     <img src={voiceIcon} alt="Mic" className="w-10 h-10 object-contain brightness-0 invert" />
                                                 </button>
                                             </>
                                         ) : (
                                             <div className="w-24 h-24 flex items-center justify-center">
                                                 <div className="w-full h-[2px] bg-gray-100 absolute rotate-45"></div>
                                             </div>
                                         )}
                                     </div>

                                     {!voiceError ? (
                                         <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
                                             {isLoading ? 'Thinking...' : (isListening ? 'Listening...' : 'Tap to Speak!')}
                                         </p>
                                     ) : (
                                         <div className="h-4"></div>
                                     )}

                                     {/* Actions */}
                                     <div className="w-full flex items-center justify-between mt-4 px-2">
                                         <div className="flex flex-col items-center gap-2">
                                             <button 
                                                 onClick={() => { setIsVoiceMode(false); setVoiceError(false); }}
                                                 className="w-14 h-14 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center text-[#1A7785] hover:bg-[#1A7785] hover:text-white transition-all shadow-md group"
                                             >
                                                 <Keyboard size={28} className="group-hover:scale-110 transition-transform" />
                                             </button>
                                             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Back to Chat</span>
                                         </div>
                                         
                                         <button 
                                             onClick={() => { setIsVoiceMode(false); setVoiceError(false); }}
                                             className="px-10 py-3.5 bg-gray-50/50 text-gray-500 font-bold text-sm rounded-2xl hover:bg-white hover:shadow-md transition-all border-2 border-gray-100 shadow-sm"
                                         >
                                             {voiceError ? 'Help' : 'Cancel'}
                                         </button>
                                     </div>
                                 </motion.div>
                             </motion.div>
                         )}
                     </AnimatePresence>

                     {/* Header */}
                     <header className="flex items-center justify-between px-6 py-5 bg-white/10 backdrop-blur-sm border-b border-white/20 shrink-0 z-20">
                         <div className="flex items-center gap-4">
                             <div className="relative pt-2">
                                 <div className="w-14 h-14 flex items-center justify-center overflow-visible">
                                     <img src={robotImage} alt="AI" className="w-full h-full object-contain drop-shadow-lg" />
                                 </div>
                                 <div className="absolute bottom-0 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                             </div>
                             <div>
                                 <h1 className="text-[16px] font-bold text-[#1e293b] leading-tight">
                                     {isAdmin ? "Vado SuperAdmin" : isDoctor ? "Doctor AI" : "VaidyaGo AI"}
                                 </h1>
                                 <div className="flex items-center gap-1.5 mt-0.5">
                                     <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Online</span>
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

                 {/* Chat Content */}
                 <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar">
                     <AnimatePresence>
                         {messages.map((msg) => (
                             <motion.div 
                                 key={msg.id}
                                 initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                 animate={{ opacity: 1, y: 0, scale: 1 }}
                                 className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                             >
                                 <div className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                     {/* AI avatar removed as requested */}
                                     
                                     <div className="space-y-1">
                                         <div className={`p-3.5 rounded-[20px] shadow-sm text-[14.5px] leading-relaxed ${
                                             msg.sender === 'user' 
                                             ? 'bg-[#0A1D31] text-white rounded-tr-none' 
                                             : 'bg-[#E2E8F0] text-[#1e293b] rounded-tl-none border border-white/50'
                                         }`}>
                                             <p>{msg.text}</p>
                                             
                                             {msg.sender === 'ai' && (
                                                 <button 
                                                    onClick={() => speakText(msg.text, false, msg.audioUrl)}
                                                    className="flex items-center gap-1.5 mt-3 text-[9px] font-bold text-[#1A7785] uppercase tracking-wider hover:opacity-80 transition-opacity"
                                                 >
                                                     <Volume2 size={13} />
                                                     Play Response
                                                 </button>
                                             )}
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

                {/* Input Footer */}
                <div className="bg-white/20 backdrop-blur-md border-t border-white/30 p-3 space-y-2 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-20">
                    
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
                                onClick={() => {
                                    const newState = !isVoiceMode;
                                    setIsVoiceMode(newState);
                                    if (newState) setVoiceError(false);
                                }}
                                className={`w-9 h-5 rounded-full transition-colors relative ${isVoiceMode ? 'bg-[#1A7785]' : 'bg-gray-200'}`}
                            >
                                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${isVoiceMode ? 'left-4.5' : 'left-0.5'}`}></div>
                            </button>
                        </div>
                    </div>

                {/* Main Input Bar */}
                <form onSubmit={handleSend} className="relative flex items-center gap-3">
                    <div className="flex-1 relative flex items-center bg-white/50 border border-gray-200/80 rounded-[24px] px-3 py-1.5 focus-within:border-[#1A7785] focus-within:bg-white transition-all shadow-sm">
                        
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
                            className={`p-1.5 transition-all rounded-full flex items-center justify-center ${
                                isAttachMenuOpen ? 'bg-[#1A7785] text-white rotate-45 shadow-lg' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
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
                            <button 
                                type="button" 
                                onClick={() => { setIsVoiceMode(true); setVoiceError(false); }}
                                className="p-1.5 bg-red-500/10 rounded-full hover:bg-red-500/20 transition-all flex items-center justify-center"
                            >
                                <img src={voiceIcon} alt="Mic" className="w-4 h-4 object-contain" />
                            </button>
                            <button 
                                type="submit"
                                disabled={!inputText.trim()}
                                className={`p-2 rounded-full shadow-md transition-all transform active:scale-90 ${
                                    inputText.trim() 
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
    <div className={`flex items-start gap-4 p-3 hover:bg-gray-50 rounded-[18px] transition-all cursor-pointer group border border-transparent hover:border-gray-50`}>
        <div className={`shrink-0 ${isSmall ? 'text-gray-400' : ''} bg-gray-50 p-2 rounded-xl group-hover:bg-[#19718A]/10 group-hover:text-[#19718A] transition-colors`}>
            {icon}
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
                <h3 className="text-[14px] font-bold text-gray-800 truncate tracking-tight">{title}</h3>
                <span className="text-[10px] font-bold text-gray-300 ml-2">{time}</span>
            </div>
            <p className="text-[12px] text-gray-400 line-clamp-1 leading-relaxed font-medium">
                {snippet}
            </p>
        </div>
    </div>
);

export default Chat;
