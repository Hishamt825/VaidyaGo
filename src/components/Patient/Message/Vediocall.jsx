import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Mic, MicOff, Video, VideoOff, PhoneOff, MoreVertical, 
    MessageSquare, Users, Settings, Share2, Maximize2,
    Heart, Activity, Thermometer, Droplets, Send,
    ChevronLeft, Bell, Search, Info
} from 'lucide-react';
import Sidebar from '../Patient_sidebar';
import Profile from '../Profile';
import Account from '../Account';
import Notification from '../notification';

// Assets
import videoImg from '../../../assets/doctor_video.png';
import docImg from '../../../assets/doctor_video.png';
import phImg from '../../../assets/patient_self.png';

const Vediocall = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fromPath = location.state?.from;
    const [active, setActive] = useState((fromPath === '/Appointment' || fromPath === '/Clinic') ? 'Appointments' : 'Messages');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    
    const [isMicOn, setIsMicOn] = useState(true);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'doctor', text: "Hello Rahul, I'm reviewing your latest ECG results. How have you been feeling since our last visit?", time: '14:18' },
        { id: 2, sender: 'user', text: "I've been feeling better, but slightly short of breath in the mornings.", time: '14:20' },
        { id: 3, sender: 'doctor', text: "I see. Let's discuss that. I'm uploading a clinical note for you now.", time: '14:21' }
    ]);
    const [inputText, setInputText] = useState('');

    const handleSendMessage = () => {
        if (!inputText.trim()) return;
        setMessages([...messages, {
            id: Date.now(),
            sender: 'user',
            text: inputText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setInputText('');
    };

    return (
        <div className="flex h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
             style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>
            
            <Sidebar active={active} setActive={setActive} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

            <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden transition-all duration-300 ${activeModal || isNotificationOpen ? 'blur-[4px] scale-[0.98]' : ''}`}>
                
                {/* Header Navbar */}
                <header className="h-[76px] flex items-center justify-between px-[24px] md:px-[48px] shrink-0 border-b border-white/5 mb-[8px] z-20">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsMobileOpen(true)}
                            className="lg:hidden text-white p-2 -ml-2 hover:bg-white/10 rounded-xl transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                        <button 
                            onClick={() => {
                                if (location.state?.fromBook) {
                                    navigate('/Patient_dashboard1', { state: { reopenBook: true } });
                                } else {
                                    navigate(fromPath || '/Message');
                                }
                            }}
                            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all border border-white/10 shrink-0 active:scale-90"
                        >
                            <ChevronLeft size={20} strokeWidth={3} />
                        </button>
                    </div>
                    <div className="flex-1 max-w-[280px] ml-6">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-white/10 border border-white/10 rounded-full py-[10px] px-[20px] text-white placeholder-white/40 text-[12px] outline-none focus:ring-2 focus:ring-[#6ED4D4]/50 transition-all font-medium"
                            />
                            <Search className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-white/40" />
                        </div>
                    </div>

                    <div className="flex items-center gap-[32px] ml-auto">
                        <span className="text-white/80 hover:text-white text-[13px] font-medium hidden md:block select-none cursor-pointer transition-colors">Language</span>
                        <div className="flex items-center gap-[20px]">
                            <button onClick={() => setIsNotificationOpen(true)} className="text-white hover:text-[#6ED4D4] transition-colors relative">
                                <Bell size={22} />
                                <div className="absolute top-[2px] right-[2px] w-[6px] h-[6px] bg-[#E85B5A] rounded-full" />
                            </button>
                            <button onClick={() => navigate('/Setting')} className="text-white hover:text-[#6ED4D4] transition-colors">
                                <Settings size={22} />
                            </button>
                            <div onClick={() => setActiveModal('profile')} className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform">
                                <img src={phImg} alt="User" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 flex overflow-hidden p-4 gap-4">
                    
                    {/* Left: Video Canvas */}
                    <div className="flex-[0.75] bg-[#1A2B3C] rounded-[32px] relative overflow-hidden shadow-2xl group border border-white/10 shrink-0">
                        <img 
                            src={videoImg} 
                            alt="Video Stream" 
                            className="w-full h-full object-cover opacity-90" 
                        />
                        
                        {/* Live Status Overlay */}
                        <div className="absolute top-6 left-6 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-white text-[11px] font-black uppercase tracking-widest">Live Consultation: 14:22</span>
                        </div>

                        {/* Self View Floating Window */}
                        <div className="absolute top-6 right-6 w-[180px] h-[110px] bg-[#0D1C2E] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 z-10">
                            <img src={phImg} alt="You" className="w-full h-full object-cover grayscale-[0.2]" />
                            <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md text-white text-[9px] font-bold">You</div>
                        </div>

                        {/* Bottom Controls Bar */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/10 backdrop-blur-xl px-6 py-4 rounded-[28px] border border-white/20 shadow-2xl">
                            <button 
                                onClick={() => setIsMicOn(!isMicOn)}
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isMicOn ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-red-500 text-white shadow-lg shadow-red-500/20'}`}
                            >
                                {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
                            </button>
                            <button 
                                onClick={() => setIsVideoOn(!isVideoOn)}
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isVideoOn ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-red-500 text-white shadow-lg shadow-red-500/20'}`}
                            >
                                {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
                            </button>
                            <button className="w-12 h-12 bg-white/20 text-white rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all">
                                <Share2 size={20} />
                            </button>
                            <button className="w-12 h-12 bg-white/20 text-white rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all">
                                <MoreVertical size={20} />
                            </button>
                            <div className="w-[1px] h-8 bg-white/20 mx-2" />
                            <button 
                                onClick={() => {
                                    if (location.state?.fromBook) {
                                        navigate('/Patient_dashboard1', { state: { reopenBook: true } });
                                    } else {
                                        navigate(fromPath || '/Message');
                                    }
                                }}
                                className="w-[60px] h-12 bg-[#E85B5A] text-white rounded-2xl flex items-center justify-center hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 active:scale-95"
                            >
                                <PhoneOff size={22} strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>

                    {/* Right: Info & Chat Panel */}
                    <div className="flex-1 flex flex-col gap-4 overflow-y-auto no-scrollbar">
                        
                        {/* Doctor Card */}
                        <div className="bg-white rounded-[28px] p-5 shadow-lg border border-white/20 flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#1A7785]/20 shrink-0 shadow-sm">
                                <img src={docImg} alt="Dr. Arjan Singh" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="text-[#0D1C2E] text-[17px] font-black leading-tight">Dr. Marcus Chen</h3>
                                <p className="text-[#1A7785] text-[11px] font-black uppercase tracking-wider">Cardiologist • MD, FACC</p>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <div className="w-3.5 h-3.5 bg-green-500/10 rounded-full flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                    </div>
                                    <span className="text-gray-400 text-[10px] font-bold">Verified Practitioner</span>
                                </div>
                            </div>
                        </div>

                        {/* Consultation Chat */}
                        <div className="flex-1 bg-white/80 backdrop-blur-md rounded-[32px] shadow-lg border border-white/40 flex flex-col overflow-hidden min-h-[400px]">
                            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-[#0D1C2E] text-[13px] font-black uppercase tracking-widest">Consultation Chat</h4>
                                    <span className="bg-[#EBF7F8] text-[#1A7785] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-[#1A7785]/10">Active</span>
                                </div>
                                <Maximize2 size={16} className="text-gray-300 cursor-pointer hover:text-gray-500" />
                            </div>

                            <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`max-w-[85%] p-3.5 rounded-2xl text-[13px] font-medium leading-relaxed ${msg.sender === 'user' ? 'bg-[#0D1C2E] text-white rounded-tr-none' : 'bg-[#F0F7F8] text-[#0D1C2E] rounded-tl-none'}`}>
                                            {msg.text}
                                        </div>
                                        <span className="text-[9px] text-gray-400 font-bold mt-1 uppercase tracking-tighter">
                                            {msg.sender === 'user' ? `Rahul (Patient) • ${msg.time}` : `Dr. Singh • ${msg.time}`}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 pt-0">
                                <div className="bg-white rounded-2xl border border-gray-100 p-2 flex items-center gap-2 shadow-sm">
                                    <input 
                                        type="text" 
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Type a message..."
                                        className="flex-1 bg-transparent border-none outline-none px-2 text-[13px] font-medium text-[#0D1C2E] placeholder-gray-400"
                                    />
                                    <button 
                                        onClick={handleSendMessage}
                                        className="w-10 h-10 bg-[#1A7785] text-white rounded-xl flex items-center justify-center hover:bg-[#125A6C] transition-all shadow-lg shadow-[#1A7785]/20"
                                    >
                                        <Send size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Patient Vitals Grid */}
                        <div className="bg-white/40 backdrop-blur-xl rounded-[32px] p-6 border border-white/20 shadow-xl">
                            <div className="flex items-center justify-between mb-5">
                                <h4 className="text-[#0D1C2E] text-[13px] font-black uppercase tracking-widest">Patient Vitals</h4>
                                <Activity size={18} className="text-[#1A7785] opacity-40" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: 'Heart Rate', value: '72', unit: 'BPM', icon: <Heart size={14} className="text-red-500" /> },
                                    { label: 'Blood Pressure', value: '120/80', unit: '', icon: <Droplets size={14} className="text-blue-500" /> },
                                    { label: 'SpO2', value: '98', unit: '%', icon: <Activity size={14} className="text-green-500" /> },
                                    { label: 'Temp', value: '98.6', unit: '°F', icon: <Thermometer size={14} className="text-orange-500" /> }
                                ].map((vital, i) => (
                                    <div key={i} className="bg-white/60 p-4 rounded-2xl border border-white/40 shadow-sm group hover:bg-white transition-all cursor-pointer">
                                        <p className="text-gray-400 text-[9px] font-black uppercase tracking-wider mb-1">{vital.label}</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-[#0D1C2E] text-[18px] font-black">{vital.value}</span>
                                            <span className="text-[10px] font-bold text-gray-400">{vital.unit}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-5 pt-5 border-t border-white/20">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-[#1A7785]/10 rounded-lg flex items-center justify-center shrink-0">
                                        <Info size={16} className="text-[#1A7785]" />
                                    </div>
                                    <div>
                                        <p className="text-[#1A7785] text-[10px] font-black uppercase tracking-wider mb-0.5">Clinical Observation</p>
                                        <p className="text-gray-500 text-[11px] font-medium leading-relaxed italic">
                                            Patient reports mild morning dyspnea. Vital signs currently stable.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Application Modals */}
            {activeModal === 'profile' && <Profile onClose={() => setActiveModal(null)} onAccountSettings={() => setActiveModal('account')} />}
            {activeModal === 'account' && <Account onClose={() => setActiveModal(null)} />}
            {isNotificationOpen && <Notification onClose={() => setIsNotificationOpen(false)} />}
        </div>
    );
};

export default Vediocall;
