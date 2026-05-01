import React from 'react';
import { X, Search, Stethoscope, FileText, Microscope, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import duckImg from '../../../assets/duck.png';

const Clinic_request = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    if (!isOpen) return null;

    const handleProceed = () => {
        onClose();
        navigate('/Consultation1', { state: { from: 'Clinic' } });
    };

    return (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <div 
                className="absolute inset-0 bg-[#0B1F4D]/40 backdrop-blur-[12px]" 
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            <div className="relative w-full max-w-[620px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex animate-in zoom-in-95 duration-300">
                
                {/* Left Sidebar Accent */}
                <div className="w-[80px] bg-gradient-to-b from-[#0B1F4D] via-[#1A7785] to-[#49AAB3] flex flex-col items-center justify-center relative overflow-hidden shrink-0">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] animate-pulse" />
                    </div>
                    <p className="[writing-mode:vertical-lr] rotate-180 text-white/40 text-[18px] font-black uppercase tracking-[0.4em] select-none">
                        VAIDYAGO
                    </p>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8 pb-6 relative">
                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        className="absolute right-6 top-6 w-10 h-10 rounded-full bg-[#F5F9FA] flex items-center justify-center text-[#627382] hover:bg-[#EBF7F8] hover:text-[#1A7785] transition-all border border-gray-100 shadow-sm group"
                    >
                        <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>

                    {/* Header */}
                    <div className="mb-6 pr-12">
                        <h2 className="text-[28px] font-[900] text-[#0D1C2E] leading-tight tracking-tight">New Request</h2>
                        <p className="text-[#627382] text-[14px] font-medium mt-1 opacity-80">Initiate a new clinical consultation journey.</p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Find clinicians or specialties..."
                            className="w-full h-[60px] bg-[#E9F1F3] border-none rounded-[20px] pl-14 pr-6 text-[15px] font-medium text-[#0D1C2E] placeholder-gray-400 focus:ring-2 focus:ring-[#1A7785]/20 transition-all outline-none shadow-inner"
                        />
                    </div>

                    {/* Category Cards */}
                    <div className="grid grid-cols-3 gap-3.5 mb-6">
                        {[
                            { icon: <Stethoscope size={24} />, title: 'General Consultation' },
                            { icon: <FileText size={24} />, title: 'Specialist Review' },
                            { icon: <Microscope size={24} />, title: 'Diagnostic Test' }
                        ].map((cat, i) => (
                            <div 
                                key={i}
                                className="bg-[#F0F7F8] hover:bg-white border-2 border-transparent hover:border-[#1A7785]/20 p-5 rounded-[24px] flex flex-col gap-3.5 transition-all cursor-pointer group hover:shadow-xl hover:shadow-[#1A7785]/5"
                            >
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#1A7785] shadow-sm group-hover:scale-110 transition-transform">
                                    {cat.icon}
                                </div>
                                <span className="text-[13px] font-[900] text-[#0D1C2E] leading-tight">{cat.title}</span>
                            </div>
                        ))}
                    </div>

                    {/* Buddy Tip Box */}
                    <div className="bg-[#F0F7F8] rounded-[28px] p-5 flex gap-5 mb-8 border border-white relative overflow-hidden group">
                        <div className="absolute right-0 top-0 w-24 h-24 bg-white/40 rounded-full blur-2xl -translate-y-6 translate-x-6" />
                        <div className="w-16 h-16 rounded-2xl bg-white p-2 shrink-0 shadow-sm relative z-10 flex items-center justify-center">
                            <img src={duckImg} alt="Buddy" className="w-full h-full object-contain" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-[11px] font-black text-[#1A7785] uppercase tracking-wider">Vaidyago Buddy</span>
                                <span className="text-[9px] font-bold px-2 py-0.5 bg-white rounded-full text-[#1A7785] border border-[#1A7785]/10">"Ducktor"</span>
                            </div>
                            <p className="text-[#627382] text-[12px] font-medium leading-relaxed italic">
                                "Before we start, make sure you have any recent lab reports or imaging ready. It helps me find the perfect specialist match for your case!"
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-center gap-6">
                        <button 
                            onClick={handleProceed}
                            className="w-full h-[64px] bg-gradient-to-r from-[#49AAB3] to-[#1A7785] text-white rounded-[24px] font-black text-[16px] shadow-xl shadow-[#1A7785]/20 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                        >
                            Proceed to Specialist Search <ArrowRight size={20} strokeWidth={3} />
                        </button>
                        <p className="text-[9px] font-black text-[#627382] uppercase tracking-[0.3em] opacity-40">Secure Clinical Request Protocol Active</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clinic_request;
