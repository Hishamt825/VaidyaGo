import React, { useState } from 'react';
import { X, Pill, Clock, Calendar, Info, ShieldCheck, Heart } from 'lucide-react';
import tipImg from '../../assets/medication_tip.png';

const TimeButton = ({ label, icon, active, onClick }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-[10px] px-[20px] py-[10px] rounded-full text-[14px] font-medium transition-all ${
            active 
            ? 'bg-[#A9F1F1] text-[#0B1F4D] shadow-md' 
            : 'bg-[#F4F7F9] text-[#627382] hover:bg-[#EAEFF2]'
        }`}
    >
        {icon}
        {label}
    </button>
);

const FormSection = ({ title, icon, children }) => (
    <div className="mb-[20px]">
        <div className="flex items-center gap-[8px] mb-[12px]">
            <div className="w-[28px] h-[28px] rounded-full bg-[#EBFDFF] flex items-center justify-center text-[#1A7785]">
                {icon}
            </div>
            <h3 className="text-[16px] font-bold tracking-tight text-[#0D1C2E] uppercase tracking-widest">{title}</h3>
        </div>
        {children}
    </div>
);

const InputField = ({ label, placeholder, type = "text", value, onChange }) => (
    <div className="flex-1">
        <p className="text-[#627382] text-[10px] font-bold uppercase tracking-[0.15em] mb-[6px] ml-[4px]">{label}</p>
        <input 
            type={type}
            placeholder={placeholder}
            className="w-full bg-[#F4F7F9] border-none rounded-[12px] px-[16px] py-[10px] text-[#0D1C2E] placeholder-[#94A3B8] text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#A9F1F1] transition-all"
            value={value}
            onChange={onChange}
        />
    </div>
);

const Reminder_modal = ({ isOpen, onClose }) => {
    const [times, setTimes] = useState(['Morning']);

    if (!isOpen) return null;

    const toggleTime = (time) => {
        if (times.includes(time)) {
            setTimes(times.filter(t => t !== time));
        } else {
            setTimes([...times, time]);
        }
    };

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#0B1F4D]/40 backdrop-blur-md" onClick={onClose}></div>
            
            <div className="bg-white w-full max-w-[1000px] rounded-[40px] overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row h-[90vh] max-h-[750px] animate-in fade-in zoom-in duration-300">
                
                {/* Left Side: Form */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 no-scrollbar">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-[28px] font-black text-[#0D1C2E] leading-none mb-2">Prescription Reminder</h2>
                            <p className="text-gray-400 text-[13px] font-medium uppercase tracking-widest">Set clinical adherence schedule</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X size={24} className="text-[#0D1C2E]" />
                        </button>
                    </div>

                    <FormSection title="Clinical Details" icon={<Pill size={16} />}>
                        <div className="flex flex-col md:flex-row gap-[20px]">
                            <InputField label="Medication Name" placeholder="e.g. Amoxicillin" />
                            <InputField label="Dosage" placeholder="e.g. 500mg" />
                        </div>
                    </FormSection>

                    <FormSection title="Schedule & Routine" icon={<Clock size={16} />}>
                        <div className="flex flex-col md:flex-row gap-[20px] mb-[20px]">
                            <div className="flex-1">
                                <p className="text-[#627382] text-[10px] font-bold uppercase tracking-[0.15em] mb-[6px] ml-[4px]">Frequency</p>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-[#F4F7F9] border-none rounded-[12px] px-[16px] py-[10px] text-[#0D1C2E] text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#A9F1F1] transition-all">
                                        <option>Daily</option>
                                        <option>Twice Weekly</option>
                                        <option>Weekly</option>
                                    </select>
                                    <X className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#627382] pointer-events-none rotate-45" />
                                </div>
                            </div>
                            <InputField label="Duration" placeholder="e.g. 7 days" />
                        </div>

                        <p className="text-[#627382] text-[10px] font-bold uppercase tracking-[0.15em] mb-[12px] ml-[4px]">Set Times</p>
                        <div className="flex flex-wrap gap-[10px] mb-[24px]">
                            {[
                                { id: 'Morning', icon: <Clock size={14} /> },
                                { id: 'Afternoon', icon: <Clock size={14} /> },
                                { id: 'Evening', icon: <Clock size={14} /> },
                                { id: 'Night', icon: <Clock size={14} /> }
                            ].map(t => (
                                <TimeButton 
                                    key={t.id}
                                    label={t.id} 
                                    active={times.includes(t.id)} 
                                    onClick={() => toggleTime(t.id)}
                                    icon={t.icon}
                                />
                            ))}
                        </div>
                    </FormSection>

                    <div className="mb-[40px]">
                        <p className="text-[#627382] text-[10px] font-bold uppercase tracking-[0.15em] mb-[8px] ml-[4px]">Instructions</p>
                        <textarea 
                            placeholder="Take after food. Do not drink alcohol while taking this medication."
                            rows="3"
                            className="w-full bg-[#F4F7F9] border-none rounded-[16px] px-[20px] py-[16px] text-[#0D1C2E] placeholder-[#94A3B8] text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#A9F1F1] transition-all no-scrollbar resize-none"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-[16px]">
                        <button className="flex-1 bg-[#1A7785] hover:bg-[#125863] text-white py-[16px] rounded-[20px] font-bold text-[14px] uppercase tracking-widest shadow-lg shadow-[#1A7785]/20 transition-all hover:-translate-y-1 active:scale-95">
                            Save Reminder
                        </button>
                        <button onClick={onClose} className="flex-1 bg-[#F4F7F9] hover:bg-[#EAEFF2] text-[#627382] py-[16px] rounded-[20px] font-bold text-[14px] uppercase tracking-widest transition-all">
                            Cancel
                        </button>
                    </div>
                </div>

                {/* Right Side: Tips (Optional but looks premium) */}
                <div className="hidden md:flex w-[320px] bg-[#F8FBFC] border-l border-gray-100 flex-col p-8 gap-8 overflow-y-auto no-scrollbar">
                    
                    <div className="bg-[#0B1423] rounded-[32px] p-6 text-white relative overflow-hidden shrink-0">
                        <div className="absolute -right-2 -top-2 opacity-10">
                            <ShieldCheck size={80} />
                        </div>
                        <h4 className="text-[16px] font-black uppercase tracking-widest mb-4">Clinical Guidance</h4>
                        <p className="text-white/60 text-[13px] leading-relaxed mb-6 font-medium">
                            Following your medication schedule exactly as prescribed increases treatment efficacy by up to 40%.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                                <div className="w-2 h-2 rounded-full bg-[#A9F1F1]" />
                                <span className="text-[12px] font-bold text-white/80 uppercase">Accurate tracking</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                                <div className="w-2 h-2 rounded-full bg-[#A9F1F1]" />
                                <span className="text-[12px] font-bold text-white/80 uppercase">Real-time alerts</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative rounded-[32px] h-[180px] overflow-hidden group shrink-0 shadow-lg">
                        <img src={tipImg} alt="Tip" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1423] to-transparent opacity-80"></div>
                        <div className="absolute bottom-0 left-0 p-6">
                            <span className="text-white/60 text-[9px] font-black uppercase tracking-[0.2em] mb-1 block">WELLNESS TIP</span>
                            <h4 className="text-white text-[15px] font-black leading-tight">Store medications in a cool, dry place.</h4>
                        </div>
                    </div>

                    <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm shrink-0">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-[14px] font-black text-[#0B1423] uppercase tracking-widest">Compliance</h4>
                            <Heart size={16} className="text-red-500" />
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full mb-3 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#1A7785] to-[#A9F1F1] rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <p className="text-[#627382] text-[12px] leading-relaxed font-medium">
                            You've maintained an 85% adherence rate this month. Keep it up!
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Reminder_modal;
