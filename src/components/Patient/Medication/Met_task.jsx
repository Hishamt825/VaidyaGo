import React, { useState } from 'react';
import { X, Clock, Plus, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Met_task = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [routineType, setRoutineType] = useState('Routine');
    const [isFreqOpen, setIsFreqOpen] = useState(false);
    const [frequency, setFrequency] = useState('Once Daily');

    if (!isOpen) return null;

    const handleAddSchedule = () => {
        // Logic to add to schedule would go here
        onClose();
        navigate('/Medication');
    };

    const frequencies = ['Once Daily', 'Twice Daily', 'Three Times Daily', 'As Needed'];

    return (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-4">
            {/* Backdrop with Blur */}
            <div 
                className="absolute inset-0 bg-[#0D1C2E]/40 backdrop-blur-md transition-opacity duration-300" 
                onClick={onClose}
            />
            
            {/* Modal Container */}
            <div className="relative w-full max-w-[480px] bg-white rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-200">
                
                {/* Content Section */}
                <div className="p-10 flex flex-col">
                    
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-[#0D1C2E] text-[32px] font-black tracking-tight leading-tight mb-2">Schedule Task</h2>
                        <p className="text-[#627382] text-[15px] font-bold opacity-60">
                            Assigning new protocol for <span className="text-[#1A7785]">Alex Rivera</span>
                        </p>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                        
                        {/* Task/Medication Name */}
                        <div>
                            <p className="text-[#627382] text-[11px] font-black uppercase tracking-widest mb-2.5 opacity-60">Task/Medication Name</p>
                            <input 
                                type="text"
                                placeholder="e.g. Lisinopril 10mg"
                                className="w-full h-[56px] bg-[#E9F0F2] rounded-[18px] px-6 text-[#0D1C2E] text-[16px] font-bold placeholder-[#627382]/40 outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all border-none"
                            />
                        </div>

                        {/* Dosage & Frequency */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[#627382] text-[11px] font-black uppercase tracking-widest mb-2.5 opacity-60">Dosage</p>
                                <input 
                                    type="text"
                                    placeholder="e.g. 1 Tablet"
                                    className="w-full h-[56px] bg-[#E9F0F2] rounded-[18px] px-6 text-[#0D1C2E] text-[16px] font-bold placeholder-[#627382]/40 outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all border-none"
                                />
                            </div>
                            <div className="relative">
                                <p className="text-[#627382] text-[11px] font-black uppercase tracking-widest mb-2.5 opacity-60">Frequency</p>
                                <div 
                                    onClick={() => setIsFreqOpen(!isFreqOpen)}
                                    className="w-full h-[56px] bg-[#E9F0F2] rounded-[18px] px-6 flex items-center justify-between text-[#0D1C2E] text-[16px] font-bold cursor-pointer hover:bg-[#E1EAED] transition-colors"
                                >
                                    {frequency}
                                    <ChevronDown size={18} className={`opacity-40 transition-transform ${isFreqOpen ? 'rotate-180' : ''}`} />
                                </div>

                                {isFreqOpen && (
                                    <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-[18px] shadow-2xl border border-gray-100 overflow-hidden z-[800] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                        {frequencies.map((freq) => (
                                            <div 
                                                key={freq}
                                                onClick={() => {
                                                    setFrequency(freq);
                                                    setIsFreqOpen(false);
                                                }}
                                                className="px-6 py-3.5 text-[#0D1C2E] text-[15px] font-bold hover:bg-[#F4F9F9] hover:text-[#1A7785] cursor-pointer transition-colors"
                                            >
                                                {freq}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Time & Routine Type */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[#627382] text-[11px] font-black uppercase tracking-widest mb-2.5 opacity-60">Time</p>
                                <div className="relative">
                                    <input 
                                        type="text"
                                        defaultValue="08:00 AM"
                                        className="w-full h-[56px] bg-[#E9F0F2] rounded-[18px] px-6 text-[#0D1C2E] text-[16px] font-bold outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all border-none pr-12"
                                    />
                                    <Clock size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#0D1C2E] opacity-40" />
                                </div>
                            </div>
                            <div>
                                <p className="text-[#627382] text-[11px] font-black uppercase tracking-widest mb-2.5 opacity-60">Routine Type</p>
                                <div className="h-[56px] bg-[#E9F0F2] rounded-[18px] p-1.5 flex items-center">
                                    <button 
                                        onClick={() => setRoutineType('Routine')}
                                        className={`flex-1 h-full rounded-[14px] text-[13px] font-black uppercase tracking-widest transition-all ${routineType === 'Routine' ? 'bg-[#0D3442] text-white shadow-lg' : 'text-[#627382] opacity-60 hover:opacity-100'}`}
                                    >
                                        Routine
                                    </button>
                                    <button 
                                        onClick={() => setRoutineType('As Needed')}
                                        className={`flex-1 h-full rounded-[14px] text-[13px] font-black uppercase tracking-widest transition-all ${routineType === 'As Needed' ? 'bg-[#0D3442] text-white shadow-lg' : 'text-[#627382] opacity-60 hover:opacity-100'}`}
                                    >
                                        As Needed
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-12 flex items-center justify-end gap-6">
                        <button 
                            onClick={onClose}
                            className="text-[#0D1C2E] text-[16px] font-black hover:opacity-60 transition-opacity px-4"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleAddSchedule}
                            className="h-[64px] px-10 bg-gradient-to-r from-[#0D3442] to-[#1A7785] text-white rounded-[24px] font-black text-[16px] shadow-xl shadow-teal-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3"
                        >
                            Add to Schedule
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Met_task;
