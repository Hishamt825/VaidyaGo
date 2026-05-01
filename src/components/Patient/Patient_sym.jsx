import React, { useState } from 'react';
import vadoImg from '../../assets/vado_duck.png';
import { Mic, X, ArrowRight, ShieldCheck } from 'lucide-react';

const Patient_sym = ({ onClose }) => {
    const [symptom, setSymptom] = useState('');

    return (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#0B1F4D]/40 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-[540px] bg-white rounded-[32px] overflow-hidden shadow-[0_32px_120px_rgba(0,0,0,0.35)] animate-in zoom-in-95 duration-200">
                
                {/* Header Area */}
                <div className="px-8 pt-8 pb-4">
                    <div className="flex items-center justify-between mb-1">
                        <div className="inline-flex items-center gap-2 bg-[#EBF8FA] px-3 py-1 rounded-full">
                            <div className="w-1 h-1 bg-[#1A7785] rounded-full animate-pulse" />
                            <span className="text-[9px] font-black text-[#1A7785] uppercase tracking-[0.15em]">Live Symptom Check</span>
                        </div>
                        <button 
                            onClick={onClose}
                            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <h2 className="text-[28px] font-bold text-[#0D1C2E] tracking-tight">Symptom Check</h2>
                </div>

                <div className="px-8 pb-8">
                    {/* Mascot & Welcome Message */}
                    <div className="flex gap-4 mb-5">
                        <div className="relative shrink-0">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#EBF8FA] shadow-sm">
                                <img src={vadoImg} alt="Vado" className="w-full h-full object-cover scale-110" />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#6ED4D4] border-2 border-white rounded-full" />
                        </div>
                        <div className="bg-[#F0F7F9] rounded-[20px] rounded-tl-none p-4 flex-1">
                            <p className="text-[14px] font-medium text-[#4B5E6D] leading-relaxed">
                                Hello Arjun! I'm <span className="text-[#1A7785] font-bold">Vado</span>. How are you feeling today?
                            </p>
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="bg-[#E9EFF2]/50 rounded-[24px] border border-[#DCE6EA] p-5 mb-6 focus-within:ring-2 focus-within:ring-[#6ED4D4]/30 transition-all">
                        <textarea 
                            value={symptom}
                            onChange={(e) => setSymptom(e.target.value)}
                            placeholder="Describe your symptoms (e.g. 'I have a dull ache...')"
                            className="w-full h-[80px] bg-transparent border-none outline-none resize-none text-[14px] font-medium text-[#0D1C2E] placeholder-gray-400"
                        />
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between gap-5">
                        {/* Voice Control */}
                        <div className="flex flex-col items-center gap-1.5">
                            <button className="w-12 h-12 bg-[#1A7785] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#1A7785]/30 hover:scale-105 active:scale-95 transition-all">
                                <Mic size={20} fill="white" />
                            </button>
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Tap to Speak</span>
                        </div>

                        <div className="flex-1 flex gap-2.5 h-[52px]">
                            <button 
                                onClick={onClose}
                                className="flex-1 bg-[#E7EEF1] hover:bg-[#DDE6EA] text-[#4B5E6D] rounded-full font-bold text-[13px] transition-all active:scale-[0.98]"
                            >
                                Save for Later
                            </button>
                            <button 
                                className="flex-[1.5] bg-gradient-to-r from-[#1A7785] to-[#49AAB3] text-white rounded-full font-bold text-[13px] flex items-center justify-center gap-2 shadow-xl shadow-[#1A7785]/20 hover:opacity-90 transition-all active:scale-[0.98]"
                            >
                                Start Assessment
                                <ArrowRight size={16} strokeWidth={3} />
                            </button>
                        </div>
                    </div>

                    {/* Security Disclaimer */}
                    <div className="mt-6 pt-4 border-t border-gray-100 flex gap-2.5">
                        <ShieldCheck className="text-gray-300 shrink-0" size={14} />
                        <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                            Your clinical data is encrypted and managed under VaidyaGo's Clinical Sanctuary protocol.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Patient_sym;
