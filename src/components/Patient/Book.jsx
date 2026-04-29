import React from 'react';
import { Search, Video, MessageSquare, Calendar, ChevronRight, ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Book = ({ onClose }) => {
    const navigate = useNavigate();
    const specialists = [
        { name: 'Dr. Elena Rodriguez', specialty: 'Cardiology', exp: '12 years exp.', rating: '4.9', fee: '$120/session', img: 'https://api.dicebear.com/7.x/notionists/svg?seed=Jessica' },
        { name: 'Dr. Marcus Chen', specialty: 'Neurology', exp: '8 years exp.', rating: '4.7', fee: '$150/session', img: 'https://api.dicebear.com/7.x/notionists/svg?seed=Marcus' },
        { name: 'Dr. Sarah Jenkins', specialty: 'Pediatrics', exp: '15 years exp.', rating: '5.0', fee: '$100/session', img: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sarah' },
    ];

    return (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#0B1F4D]/40 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-[900px] h-[600px] bg-[#F1F6F8] rounded-[32px] overflow-hidden shadow-[0_32px_120px_rgba(0,0,0,0.35)] animate-in zoom-in-95 duration-200 flex">
                
                {/* Left Gradient Sidebar */}
                <div className="w-[320px] bg-gradient-to-b from-[#0D1C2E] via-[#1A7785] to-[#49AAB3] p-8 flex flex-col">
                    <button 
                        onClick={onClose}
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-[13px] font-bold uppercase tracking-widest mb-10 group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Dashboard
                    </button>
                    
                    <h2 className="text-[36px] font-bold text-white leading-tight mb-4">Book Your Specialist</h2>
                    <p className="text-white/70 text-[14px] leading-relaxed mb-auto">
                        Access world-class healthcare from the comfort of your sanctuary. Schedule consultations with top experts in seconds.
                    </p>

                    {/* Next Available Pill */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-[24px] p-5">
                        <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-2">Next Available</p>
                        <h4 className="text-white font-bold text-[16px]">Dr. Rodriguez</h4>
                        <p className="text-white/60 text-[12px] font-medium mb-4">Cardiologist • Online now</p>
                        <button 
                            onClick={() => navigate('/Vediocall', { state: { fromBook: true } })}
                            className="w-full bg-white text-[#1A7785] py-3 rounded-2xl font-bold text-[14px] shadow-lg shadow-black/5 hover:bg-white/90 transition-all"
                        >
                            Instant Video Call
                        </button>
                    </div>
                </div>

                {/* Right Main Content */}
                <div className="flex-1 p-8 overflow-y-auto no-scrollbar relative">
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 w-10 h-10 rounded-full hover:bg-white flex items-center justify-center text-gray-400 hover:text-[#0D1C2E] transition-all z-20 shadow-sm"
                    >
                        <X size={20} />
                    </button>

                    {/* Search Bar */}
                    <div className="relative mb-8 pr-12">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search by name, specialty, or clinic"
                            className="w-full bg-white rounded-2xl py-4 pl-14 pr-6 text-[14px] font-medium text-[#0D1C2E] outline-none border border-transparent focus:border-[#6ED4D4]/50 shadow-sm transition-all"
                        />
                    </div>

                    {/* Consultation Types */}
                    <div className="mb-8">
                        <h3 className="text-[16px] font-bold text-[#0D1C2E] mb-4">Consultation Type</h3>
                        <div className="flex gap-4">
                            {[
                                { label: 'Video', icon: <Video size={22} /> },
                                { label: 'Chat', icon: <MessageSquare size={22} /> },
                                { label: 'In-Person', icon: <Calendar size={22} /> },
                            ].map((type) => (
                                <div 
                                    onClick={() => navigate('/Vediocall', { state: { fromBook: true } })}
                                    key={type.label} 
                                    className="flex-1 bg-white p-5 rounded-[24px] flex flex-col items-center gap-3 cursor-pointer hover:shadow-md transition-all group border border-transparent hover:border-[#6ED4D4]/30"
                                >
                                    <div className="w-12 h-12 rounded-full bg-[#EBF8FA] flex items-center justify-center text-[#1A7785] group-hover:bg-[#1A7785] group-hover:text-white transition-all">
                                        {type.icon}
                                    </div>
                                    <span className="text-[13px] font-bold text-[#0D1C2E]">{type.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Featured Specialists */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[16px] font-bold text-[#0D1C2E]">Featured Specialists</h3>
                            <button 
                                onClick={() => navigate('/Consultation1', { state: { fromBook: true } })}
                                className="text-[12px] font-bold text-[#1A7785] hover:underline flex items-center gap-1 group"
                            >
                                View All <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {specialists.map((doc, i) => (
                                <div key={i} className="bg-white p-4 rounded-[24px] flex items-center justify-between group hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-[#6ED4D4]/30">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-14 h-14 rounded-full bg-[#F1F6F8] overflow-hidden border-2 border-white shadow-sm flex items-center justify-center pt-2">
                                                <img src={doc.img} alt={doc.name} className="w-12 h-12" />
                                            </div>
                                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#6ED4D4] border-2 border-white rounded-full" />
                                        </div>
                                        <div>
                                            <h4 className="text-[15px] font-bold text-[#0D1C2E]">{doc.name}</h4>
                                            <p className="text-[12px] text-gray-400 font-medium">{doc.specialty} • {doc.exp}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <div className="flex items-center gap-1 text-[#1A7785] text-[11px] font-black">
                                                    ★ {doc.rating}
                                                </div>
                                                <div className="text-gray-300 text-[12px] font-medium">{doc.fee}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-[#F1F6F8] flex items-center justify-center text-[#1A7785] group-hover:bg-[#1A7785] group-hover:text-white transition-all">
                                        <ChevronRight size={20} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;
