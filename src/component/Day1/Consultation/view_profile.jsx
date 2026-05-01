import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../../components/Patient/Patient_sidebar';
import Profile from '../../../components/Patient/Profile';
import Account from '../../../components/Patient/Account';
import Notification from '../../../components/Patient/notification';
import { 
    ChevronLeft, Search, Bell, Settings, 
    Star, MapPin, Calendar, MessageSquare, 
    ShieldCheck, Quote, ExternalLink,
    Heart, Activity, Globe, Award,
    CheckCircle2, Navigation
} from 'lucide-react';

// Assets
import docImg from '../../../assets/Dr. Marcus Chen.png';
import phImg from '../../../assets/ph.png';
import mapImg from '../../../assets/map.png';

const ViewProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fromPath = location.state?.from;
    const [active, setActive] = useState((fromPath === 'Clinic' || fromPath === 'Appointment') ? 'Appointments' : '');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    return (
        <div className="flex h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
             style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>
            
            <Sidebar active={active} setActive={setActive} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

            <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden transition-all duration-300 ${activeModal || isNotificationOpen ? 'blur-[4px] scale-[0.98] pointer-events-none' : ''}`}>
                
                {/* Top Navbar */}
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
                                if (fromPath === 'Clinic') {
                                    navigate('/Clinic');
                                } else if (fromPath === 'Appointment') {
                                    navigate('/Appointment');
                                } else {
                                    navigate('/Consultation1');
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
                                placeholder="Search specialists..."
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
                            <div 
                                onClick={() => setActiveModal('profile')} 
                                className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform"
                            >
                                <img src={phImg} alt="User" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto no-scrollbar pb-[64px] px-[24px] md:px-[48px] pt-4">
                    <div className="max-w-[1440px] mx-auto grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8">
                        
                        {/* Left Column: Main Profile Info */}
                        <div className="space-y-8">
                            
                            {/* Hero Card */}
                            <div className="bg-[#0D1C2E]/30 backdrop-blur-md rounded-[40px] p-8 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-10">
                                {/* Doctor Photo */}
                                <div className="w-[280px] h-[340px] rounded-[32px] overflow-hidden border-4 border-white/10 shrink-0 relative group">
                                    <img src={docImg} alt="Dr. Marcus Chen" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" />
                                    <div className="absolute top-4 right-4 bg-[#1A7785] text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
                                        <ShieldCheck size={12} /> Verified Specialist
                                    </div>
                                </div>

                                {/* Header Info */}
                                <div className="flex-1 flex flex-col justify-center">
                                    <h1 className="text-white text-[42px] font-black tracking-tight leading-none mb-2">Dr. Marcus Chen</h1>
                                    <p className="text-[#6ED4D4] text-[18px] font-bold mb-8">Cardiology Expert & Lead Surgeon</p>
                                    
                                    <div className="flex flex-wrap gap-4 mb-8">
                                        {/* Stat Card 1 */}
                                        <div className="bg-white rounded-[24px] p-5 flex-1 min-w-[180px] shadow-xl">
                                            <p className="text-[#627382] text-[10px] font-black uppercase tracking-[0.2em] mb-1">Experience</p>
                                            <p className="text-[#0D1C2E] text-[20px] font-black">15 Years Professional</p>
                                        </div>
                                        {/* Stat Card 2 */}
                                        <div className="bg-white rounded-[24px] p-5 flex-1 min-w-[180px] shadow-xl">
                                            <p className="text-[#627382] text-[10px] font-black uppercase tracking-[0.2em] mb-1">Patient Rating</p>
                                            <div className="flex items-center gap-2">
                                                <Star size={20} className="fill-[#FBBF24] text-[#FBBF24]" />
                                                <p className="text-[#0D1C2E] text-[20px] font-black">4.9 <span className="text-gray-300 text-[13px] font-bold ml-1">(1.2k Reviews)</span></p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <button className="flex-1 h-[64px] bg-[#1A7785] text-white rounded-[24px] font-black text-[15px] uppercase tracking-widest hover:bg-[#125A6C] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#1A7785]/20">
                                            <Calendar size={20} /> Book Appointment
                                        </button>
                                        <button className="flex-1 h-[64px] bg-white text-[#0D1C2E] rounded-[24px] font-black text-[15px] uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-3 shadow-xl">
                                            <MessageSquare size={20} /> Message Doctor
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Tip/Quote Box */}
                            <div className="bg-[#6ED4D4]/10 border border-[#6ED4D4]/20 rounded-[32px] p-6 flex gap-6 items-center">
                                <div className="w-14 h-14 bg-[#6ED4D4] rounded-2xl flex items-center justify-center text-[#0D1C2E] shrink-0 shadow-lg shadow-[#6ED4D4]/20">
                                    <Quote size={24} fill="currentColor" />
                                </div>
                                <p className="text-white/80 text-[15px] font-medium leading-relaxed italic">
                                    "Dr. Chen is one of our top cardiology experts! He has successfully performed over 500 interventional procedures this year."
                                </p>
                            </div>

                            {/* Biography */}
                            <div className="bg-white rounded-[32px] p-10 shadow-xl border border-gray-100">
                                <h2 className="text-[#0D1C2E] text-[24px] font-black mb-6 flex items-center gap-3">
                                    Biography
                                </h2>
                                <div className="space-y-4 text-gray-500 text-[16px] font-medium leading-relaxed">
                                    <p>
                                        Dr. Marcus Chen is a board-certified cardiologist specializing in advanced interventional procedures and preventative heart care. With a medical degree from Johns Hopkins University, he has dedicated his 15-year career to pioneering minimally invasive techniques for heart rhythm management.
                                    </p>
                                    <p>
                                        He currently leads the Cardiology Division at Metro Heart Institute and is a frequent contributor to international medical journals on the subject of cardiovascular innovation.
                                    </p>
                                </div>
                            </div>

                            {/* Expertise */}
                            <div className="bg-white rounded-[32px] p-10 shadow-xl border border-gray-100">
                                <h2 className="text-[#0D1C2E] text-[24px] font-black mb-6">Areas of Expertise</h2>
                                <div className="flex flex-wrap gap-4">
                                    {[
                                        { icon: <Heart size={20} />, label: 'Interventional Cardiology' },
                                        { icon: <Activity size={20} />, label: 'Heart Rhythm Management' }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-[#F1FBFC] px-8 py-5 rounded-[24px] flex items-center gap-4 border border-[#D1EBEF] group hover:bg-[#1A7785] transition-all cursor-pointer">
                                            <div className="text-[#1A7785] group-hover:text-white transition-colors">{item.icon}</div>
                                            <span className="text-[#0D1C2E] font-black text-[15px] group-hover:text-white transition-colors">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Testimonials */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-white text-[24px] font-black">Patient Testimonials</h2>
                                    <button className="text-[#6ED4D4] font-black text-[13px] uppercase tracking-widest flex items-center gap-2 hover:underline">
                                        View All <ExternalLink size={14} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { name: 'Sarah Jenkins', role: 'Visited for Hypertension Treatment', text: "Dr. Chen's approach to my treatment was life-changing. He took the time to explain everything and made me feel completely at ease.", rating: 5 },
                                        { name: 'Robert Knowles', role: 'Post-Op Recovery Support', text: "Incredible expertise. The follow-up care from his team at Metro Heart was exceptional.", rating: 5 }
                                    ].map((rev, i) => (
                                        <div key={i} className="bg-white rounded-[32px] p-8 shadow-xl border border-gray-100">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gray-100 rounded-full border border-gray-200 overflow-hidden">
                                                        <img src={`https://i.pravatar.cc/150?u=${rev.name}`} alt={rev.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[#0D1C2E] font-black text-[16px]">{rev.name}</h4>
                                                        <p className="text-gray-400 text-[12px] font-bold">{rev.role}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-0.5 text-[#FBBF24]">
                                                    {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                                </div>
                                            </div>
                                            <p className="text-gray-500 font-medium italic leading-relaxed">"{rev.text}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Practice Info */}
                        <div className="space-y-8">
                            
                            {/* Practice Location */}
                            <div className="bg-white rounded-[40px] p-8 shadow-2xl border border-gray-100">
                                <h3 className="text-[#0D1C2E] text-[20px] font-black mb-6">Practice Location</h3>
                                <div className="rounded-[28px] overflow-hidden h-[180px] relative mb-6 border border-gray-100 shadow-inner">
                                    <img src={mapImg} alt="Map" className="w-full h-full object-cover opacity-60" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <MapPin size={32} className="text-[#E85B5A]" fill="currentColor" fillOpacity={0.2} />
                                    </div>
                                    <div className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-[#1A7785] shadow-sm border border-gray-100">
                                        East Wing
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-[#0D1C2E] text-[16px] font-black">Metro Heart Institute</h4>
                                        <p className="text-gray-400 text-[14px] font-medium leading-relaxed mt-1">
                                            Suite 402, East Wing<br />
                                            88 Medical Plaza Drive<br />
                                            Central District, NY 10012
                                        </p>
                                    </div>
                                    <button className="w-full h-[54px] bg-[#F1F6F8] hover:bg-[#EBF7F8] text-[#1A7785] rounded-[20px] font-black text-[13px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 group">
                                        <Navigation size={16} className="group-hover:-translate-y-1 transition-transform" /> Get Directions
                                    </button>
                                </div>
                            </div>

                            {/* Availability */}
                            <div className="bg-white rounded-[40px] p-8 shadow-2xl border border-gray-100">
                                <h3 className="text-[#0D1C2E] text-[20px] font-black mb-6 flex items-center gap-3">
                                    Availability
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { days: 'Mon - Wed', time: '08:00 AM - 04:00 PM' },
                                        { days: 'Thursday', time: '10:00 AM - 06:00 PM' },
                                        { days: 'Friday', time: '08:00 AM - 12:00 PM' },
                                        { days: 'Sat - Sun', time: 'Closed', isClosed: true }
                                    ].map((row, i) => (
                                        <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${row.isClosed ? 'bg-red-50/30 border-red-50 text-red-600/60' : 'bg-gray-50/50 border-gray-50'}`}>
                                            <span className="text-[13px] font-bold">{row.days}</span>
                                            <span className={`text-[13px] font-black ${row.isClosed ? 'text-red-500' : 'text-[#0D1C2E]'}`}>{row.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Insurance */}
                            <div className="bg-[#0B1F4D] rounded-[40px] p-8 shadow-2xl border border-white/5 relative overflow-hidden group">
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#1A7785]/10 rounded-full blur-3xl" />
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-[#6ED4D4]">
                                        <ShieldCheck size={22} />
                                    </div>
                                    <h3 className="text-white text-[16px] font-black uppercase tracking-wider">Insurance Partners</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {['BLUECROSS', 'AETNA', 'CIGNA', 'UNITEDHEALTH'].map(name => (
                                        <div key={name} className="bg-white/5 border border-white/10 p-3 rounded-xl text-[9px] font-black text-center text-white/60 tracking-widest">
                                            {name}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-white/40 text-[11px] font-medium leading-relaxed italic">
                                    Accepting 25+ major insurance plans. Check your eligibility during booking.
                                </p>
                            </div>

                        </div>

                    </div>
                </main>
            </div>

            {/* Modals */}
            {activeModal === 'profile' && <Profile onClose={() => setActiveModal(null)} onAccountSettings={() => setActiveModal('account')} />}
            {activeModal === 'account' && <Account onClose={() => setActiveModal(null)} />}
            {isNotificationOpen && <Notification onClose={() => setIsNotificationOpen(false)} />}
        </div>
    );
};

export default ViewProfile;
