import React, { useState } from 'react';
import apiFetch from '../../../api';
import Logs from './Logs';
import History from './History';

import BASE_URL from '../../../baseUrl';

const Update_logs = ({ onClose, initialSchedule = [], refreshSchedule }) => {
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    // Log States initialized from props
    const [medications, setMedications] = useState(
        initialSchedule.map(m => ({
            id: m.id,
            name: m.medication_name,
            strength: m.dosage,
            dose: m.time.slice(0, 5),
            status: m.is_taken ? 'taken' : 'pending'
        }))
    );
    const [clinicalObservation, setClinicalObservation] = useState('');
    const [selectedSymptoms, setSelectedSymptoms] = useState(['Nausea', 'Fatigue']);
    
    // New States for custom symptom and voice
    const [isAddingSymptom, setIsAddingSymptom] = useState(false);
    const [newSymptomText, setNewSymptomText] = useState('');
    const [isListening, setIsListening] = useState(false);

    const handleStatusChange = (id, newStatus) => {
        setMedications(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
    };

    const toggleSymptom = (symptom) => {
        setSelectedSymptoms(prev => 
            prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
        );
    };

    const handleAddCustomSymptom = () => {
        if (newSymptomText.trim()) {
            if (!selectedSymptoms.includes(newSymptomText.trim())) {
                setSelectedSymptoms(prev => [...prev, newSymptomText.trim()]);
            }
            setNewSymptomText('');
            setIsAddingSymptom(false);
        }
    };

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Voice recognition is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setNewSymptomText(transcript);
        };

        recognition.start();
    };

    const handleFinalize = async () => {
        setIsLoading(true);
        try {
            // Loop through each medication and update its status
            const promises = medications.map(med => {
                // If status is 'pending', we don't necessarily need to send an update unless user interacted
                if (med.status === 'pending') return Promise.resolve();

                const payload = {
                    today_schedule: med.id, // Linking to the schedule ID
                    status: med.status,
                    clinical_observation: clinicalObservation,
                    symptoms: selectedSymptoms
                };

                return apiFetch(`${BASE_URL}/update/create/`, {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });
            });

            await Promise.all(promises);
            
            // If any medication was marked taken, we also trigger mark-taken for UI consistency
            const takenPromises = medications
                .filter(m => m.status === 'taken' || m.status === 'taken_with_food' || m.status === 'taken_solo')
                .map(m => apiFetch(`${BASE_URL}/today-schedule/mark-taken/${m.id}/`, { method: 'PATCH' }));
            
            await Promise.all(takenPromises);

            if (refreshSchedule) refreshSchedule();
            setIsSuccessOpen(true);
        } catch (error) {
            console.error("Finalize error:", error);
            alert("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <div 
                className={`absolute inset-0 bg-[#0B1F4D]/40 backdrop-blur-md transition-opacity ${isSuccessOpen || isHistoryOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className={`relative w-full max-w-[600px] bg-white rounded-[32px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.25)] animate-in zoom-in-95 duration-200 ${isSuccessOpen || isHistoryOpen ? 'blur-[8px] scale-[0.98] pointer-events-none' : ''}`}>
                
                {/* Header Section */}
                <div className="px-5 pt-5 pb-3 border-b border-gray-50 relative">
                    <button 
                        onClick={onClose}
                        className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <p className="text-[9px] font-bold text-[#1A7785] uppercase tracking-[0.2em] mb-1">VaidyaGo Log System</p>
                    <h2 className="text-[20px] font-bold text-[#0D1C2E]">Update Logs</h2>
                    <p className="text-[#627382] text-[12px] font-medium">Clinical verification of medication adherence</p>
                </div>

                <div className="px-5 py-4 max-h-[65vh] overflow-y-auto custom-scrollbar">
                    {medications.length === 0 ? (
                        <div className="py-10 text-center">
                            <p className="text-gray-500 font-bold">No medications scheduled for today.</p>
                            <p className="text-gray-400 text-xs mt-1">Please add items to your schedule first.</p>
                        </div>
                    ) : (
                        medications.map((med, index) => (
                            <div key={med.id} className="mb-6 last:mb-2">
                                <div className="flex items-center gap-2.5 mb-2.5">
                                    <div className="w-9 h-9 rounded-full bg-[#E0F2F2] flex items-center justify-center text-[#1A7785]">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-[15px] font-bold text-[#0D1C2E]">{med.name}</h4>
                                        <p className="text-[11px] text-[#627382] font-medium">{med.strength} • Oral Tablet • {med.dose}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {[
                                        { id: 'taken', label: 'Taken', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                                        { id: 'missed', label: 'Missed', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' },
                                        { id: 'delayed', label: 'Delayed', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                                        { id: 'other', label: 'Other', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' }
                                    ].map(btn => (
                                        <button 
                                            key={btn.id}
                                            onClick={() => handleStatusChange(med.id, btn.id)}
                                            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                                                med.status === btn.id 
                                                    ? (btn.id === 'missed' ? 'bg-[#C52B2B] text-white border-[#C52B2B] shadow-lg shadow-red-200' : 'bg-[#1A7785] text-white border-[#1A7785] shadow-md shadow-[#1A7785]/20') 
                                                    : 'bg-[#F4F9F9] border-transparent text-[#627382]'
                                            }`}
                                        >
                                            <svg className={`w-5 h-5 mb-1.5 ${med.status === btn.id ? 'text-white' : (btn.id === 'missed' ? 'text-red-400' : 'text-[#627382]')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={btn.icon} />
                                            </svg>
                                            <span className="text-[8.5px] font-bold uppercase tracking-tighter">{btn.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}

                    {/* Clinical Observations */}
                    <div className="mt-3">
                        <h4 className="text-[14px] font-bold text-[#0D1C2E] mb-2 flex items-center gap-2">
                            Clinical Observations <span className="text-[10px] font-normal text-[#627382] uppercase tracking-wider">(Optional)</span>
                        </h4>
                        <textarea 
                            value={clinicalObservation}
                            onChange={(e) => setClinicalObservation(e.target.value)}
                            className="w-full bg-[#EAEFF2]/50 border border-transparent focus:border-[#1A7785]/30 rounded-2xl p-3 text-[12.5px] text-[#0D1C2E] placeholder-[#627382]/60 outline-none transition-all resize-none h-[80px]"
                            placeholder="Note any side effects (e.g., nausea, dizziness) or clinical notes..."
                        ></textarea>
                        
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {['Nausea', 'Headache', 'Fatigue', 'Dizziness', 'Dry Mouth'].map(tag => (
                                <button 
                                    key={tag} 
                                    onClick={() => toggleSymptom(tag)}
                                    className={`px-3 py-1 rounded-full border text-[10px] font-bold transition-all ${selectedSymptoms.includes(tag) ? 'bg-[#1A7785] text-white border-[#1A7785]' : 'bg-[#F4F9F9] border-[#EAEFF2] text-[#627382] hover:bg-[#E0F2F2]'}`}
                                >
                                    {tag}
                                </button>
                            ))}

                            {/* User defined custom symptoms that are not in the default list */}
                            {selectedSymptoms.filter(s => !['Nausea', 'Headache', 'Fatigue', 'Dizziness', 'Dry Mouth'].includes(s)).map(tag => (
                                <button 
                                    key={tag} 
                                    onClick={() => toggleSymptom(tag)}
                                    className="px-3 py-1 rounded-full bg-[#1A7785] text-white border border-[#1A7785] text-[10px] font-bold transition-all"
                                >
                                    {tag}
                                </button>
                            ))}

                            {isAddingSymptom ? (
                                <div className="flex items-center gap-1 bg-white border border-[#1A7785]/30 rounded-full pl-3 pr-1 py-0.5 animate-in slide-in-from-left-2 duration-200">
                                    <input 
                                        type="text"
                                        autoFocus
                                        value={newSymptomText}
                                        onChange={(e) => setNewSymptomText(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddCustomSymptom()}
                                        placeholder="Type symptom..."
                                        className="bg-transparent border-none outline-none text-[10px] font-bold text-[#0D1C2E] w-[100px] placeholder-[#627382]/40"
                                    />
                                    <button 
                                        onClick={startListening}
                                        className={`p-1 rounded-full transition-all ${isListening ? 'bg-red-50 text-red-500 animate-pulse' : 'text-[#1A7785] hover:bg-[#E0F2F2]'}`}
                                        title="Speak to add"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                        </svg>
                                    </button>
                                    <button 
                                        onClick={handleAddCustomSymptom}
                                        className="bg-[#1A7785] text-white p-1 rounded-full hover:bg-[#125863] transition-all"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => setIsAddingSymptom(true)}
                                    className="px-3 py-1 rounded-full bg-white border border-dashed border-[#EAEFF2] text-[10px] font-bold text-[#1A7785] hover:border-[#1A7785] transition-all"
                                >
                                    + Add Symptom
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="px-5 py-4 bg-[#F4F9F9]/50 border-t border-white flex gap-3">
                    <button 
                        onClick={onClose}
                        className="flex-1 px-4 py-3 rounded-full border-2 border-[#EAEFF2] text-[#1A7785] font-bold text-[13px] hover:bg-white transition-all"
                    >
                        Discard
                    </button>
                    <button 
                        onClick={handleFinalize}
                        disabled={isLoading || medications.length === 0}
                        className={`flex-2 px-8 py-3 rounded-full bg-[#1A7785] text-white font-bold text-[13px] shadow-lg shadow-[#1A7785]/20 hover:bg-[#125863] transition-all flex items-center justify-center gap-2 ${isLoading || medications.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Finalizing...
                            </span>
                        ) : (
                            <>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                                Finalize Log
                            </>
                        )}
                    </button>
                </div>

            </div>

            {/* Success Popup */}
            {isSuccessOpen && <Logs onClose={() => setIsSuccessOpen(false)} onViewHistory={() => setIsHistoryOpen(true)} />}

            {/* History Popup */}
            {isHistoryOpen && <History onClose={() => setIsHistoryOpen(false)} />}
        </div>
    );
};

export default Update_logs;
