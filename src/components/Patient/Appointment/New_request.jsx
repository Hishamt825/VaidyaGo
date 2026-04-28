import React, { useState } from 'react';
import { X, Search, Stethoscope, ClipboardList, TestTube, ArrowRight } from 'lucide-react';

const New_request = ({ onClose }) => {
    const [selectedCategory, setSelectedCategory] = useState('General Consultation');

    const categories = [
        { id: 'General Consultation', icon: Stethoscope, title: 'General Consultation' },
        { id: 'Specialist Review', icon: ClipboardList, title: 'Specialist Review' },
        { id: 'Diagnostic Test', icon: TestTube, title: 'Diagnostic Test' }
    ];

    return (
        <div className="fixed inset-0 z-[800] flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[8px]" onClick={onClose}></div>

            {/* Modal Container */}
            <div className="relative w-full max-w-[760px] bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex">
                
                {/* Left Sidebar Branding */}
                <div className="hidden md:flex w-[90px] bg-gradient-to-b from-[#0B1F4D] via-[#1A7785] to-[#EBF7F8] flex-col items-center justify-center relative shrink-0">
                    <h2 className="text-white/20 font-black text-[36px] rotate-[270deg] whitespace-nowrap tracking-[0.3em] uppercase select-none">
                        VAIDYAGO
                    </h2>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col p-6 md:p-8 relative">
                    
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-[28px] font-[900] text-[#0D1C2E] leading-tight">New Request</h2>
                            <p className="text-gray-400 text-[14px] font-medium mt-0.5">Initiate a new clinical consultation journey.</p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors text-gray-400"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative group mb-6">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1A7785] transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Find clinicians or specialties..."
                            className="w-full bg-[#E9F1F2] border-none rounded-xl py-3.5 pl-12 pr-6 text-[14px] text-[#0D1C2E] placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-medium"
                        />
                    </div>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-3 gap-3.5 mb-6">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`
                                    p-4 rounded-[20px] text-left transition-all border-2 group
                                    ${selectedCategory === cat.id 
                                        ? 'bg-[#EBF7F8] border-[#1A7785]' 
                                        : 'bg-white border-transparent hover:border-gray-100 bg-[#F5F9FA]/50'
                                    }
                                `}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                                    selectedCategory === cat.id ? 'bg-[#1A7785] text-white' : 'bg-[#EBF7F8] text-[#1A7785]'
                                }`}>
                                    <cat.icon size={20} />
                                </div>
                                <h3 className={`text-[14px] font-bold leading-tight ${selectedCategory === cat.id ? 'text-[#1A7785]' : 'text-[#0D1C2E]'}`}>
                                    {cat.title}
                                </h3>
                            </button>
                        ))}
                    </div>

                    {/* Buddy Tip Card */}
                    <div className="bg-[#EBF7F8]/60 rounded-[24px] p-5 flex items-start gap-4 mb-8 border border-[#D9EFF1]">
                        <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 overflow-hidden border-2 border-white">
                            <img src="https://em-content.zobj.net/source/apple/354/duck_1f986.png" alt="Buddy" className="w-9 h-9 object-contain" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2.5 mb-1.5">
                                <span className="text-[12px] font-black text-[#1A7785] uppercase tracking-wider">VAIDYAGO BUDDY</span>
                                <span className="bg-[#1A7785]/10 text-[#1A7785] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">"Ducktor"</span>
                            </div>
                            <p className="text-[13px] text-[#0D1C2E] font-medium leading-snug italic">
                                "Before we start, make sure you have any recent lab reports or imaging ready. It helps me find the perfect specialist match!"
                            </p>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex flex-col items-center gap-4">
                        <button 
                            onClick={onClose}
                            className="w-full bg-[#49AAB3] text-white py-4 rounded-xl font-bold text-[16px] shadow-lg shadow-[#49AAB3]/20 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 group"
                        >
                            Proceed to Specialist Search <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                            SECURE CLINICAL REQUEST PROTOCOL ACTIVE
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default New_request;
