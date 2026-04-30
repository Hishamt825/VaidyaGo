import React, { useState } from 'react';
import BASE_URL from '../../../baseUrl';

const Schedule = ({ onClose, onScheduleAdded }) => {
    const [medicationName, setMedicationName] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('Once Daily');
    const [time, setTime] = useState('08:00:00'); // Default time in HH:mm:ss
    const [routineType, setRoutineType] = useState('Routine');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        const token = localStorage.getItem('token') || localStorage.getItem('access');
        
        if (!token) {
            setMessage('Error: No authentication token found.');
            setIsLoading(false);
            return;
        }

        const payload = {
            medication_name: medicationName,
            dosage: dosage,
            frequency: frequency,
            time: time,
            routine_type: routineType
        };

        try {
            const response = await fetch(`${BASE_URL}/today-schedule/add/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Successfully added to schedule!');
                if (onScheduleAdded) onScheduleAdded();
                setTimeout(() => {
                    if (onClose) onClose();
                }, 1000);
            } else {
                setMessage(data.detail || 'Failed to add. Please try again.');
            }
        } catch (error) {
            console.error("Schedule Error:", error);
            setMessage('Server error. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[999]">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-md" 
                onClick={onClose}
            ></div>
            
            {/* Modal Container */}
            <div className="bg-white rounded-[40px] w-full max-w-[520px] p-10 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-[32px] font-black text-[#0D1C2E] mb-1">Schedule Task</h2>
                    <p className="text-[#627382] text-[15px] font-bold opacity-60">
                        Assigning new protocol for <span className="text-[#1A7785]">Alex Rivera</span>
                    </p>
                </div>

                {message && (
                    <div className={`mb-6 p-4 rounded-2xl text-center text-sm font-bold ${message.includes('Success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Task/Medication Name */}
                    <div>
                        <label className="block text-[11px] font-black text-[#627382] uppercase tracking-[0.2em] mb-2.5 opacity-60">
                            Task/Medication Name
                        </label>
                        <input 
                            type="text" 
                            placeholder="e.g. Lisinopril 10mg"
                            value={medicationName}
                            onChange={(e) => setMedicationName(e.target.value)}
                            required
                            className="w-full bg-[#EAEFF2] border-none rounded-[20px] py-4 px-6 text-[16px] text-[#0D1C2E] placeholder-[#627382]/30 outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-bold"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        {/* Dosage */}
                        <div>
                            <label className="block text-[11px] font-black text-[#627382] uppercase tracking-[0.2em] mb-2.5 opacity-60">
                                Dosage
                            </label>
                            <input 
                                type="text" 
                                placeholder="e.g. 1 Tablet"
                                value={dosage}
                                onChange={(e) => setDosage(e.target.value)}
                                required
                                className="w-full bg-[#EAEFF2] border-none rounded-[20px] py-4 px-6 text-[16px] text-[#0D1C2E] placeholder-[#627382]/30 outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-bold"
                            />
                        </div>
                        {/* Frequency */}
                        <div>
                            <label className="block text-[11px] font-black text-[#627382] uppercase tracking-[0.2em] mb-2.5 opacity-60">
                                Frequency
                            </label>
                            <select 
                                value={frequency}
                                onChange={(e) => setFrequency(e.target.value)}
                                className="w-full bg-[#EAEFF2] border-none rounded-[20px] py-4 px-6 text-[16px] text-[#0D1C2E] outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-bold cursor-pointer appearance-none"
                            >
                                <option>Once Daily</option>
                                <option>Twice Daily</option>
                                <option>Weekly</option>
                                <option>As Needed</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        {/* Time */}
                        <div>
                            <label className="block text-[11px] font-black text-[#627382] uppercase tracking-[0.2em] mb-2.5 opacity-60">
                                Time
                            </label>
                            <input 
                                type="time" 
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                                className="w-full bg-[#EAEFF2] border-none rounded-[20px] py-4 px-6 text-[16px] text-[#0D1C2E] outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-bold"
                            />
                        </div>
                        {/* Routine Type */}
                        <div>
                            <label className="block text-[11px] font-black text-[#627382] uppercase tracking-[0.2em] mb-2.5 opacity-60">
                                Routine Type
                            </label>
                            <div className="flex bg-[#EAEFF2] rounded-[20px] p-1.5 h-[58px]">
                                <button 
                                    type="button"
                                    onClick={() => setRoutineType('Routine')}
                                    className={`flex-1 rounded-[16px] text-[13px] font-black uppercase tracking-widest transition-all ${routineType === 'Routine' ? 'bg-[#0D3442] text-white shadow-lg' : 'text-[#627382] opacity-60 hover:opacity-100'}`}
                                >
                                    Routine
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setRoutineType('As Needed')}
                                    className={`flex-1 rounded-[16px] text-[13px] font-black uppercase tracking-widest transition-all ${routineType === 'As Needed' ? 'bg-[#0D3442] text-white shadow-lg' : 'text-[#627382] opacity-60 hover:opacity-100'}`}
                                >
                                    As Needed
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex items-center justify-end gap-8 mt-12">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="text-[16px] font-black text-[#0D1C2E] hover:opacity-60 transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#1A7785] hover:bg-[#125863] text-white px-10 py-4 rounded-[24px] font-black text-[16px] shadow-xl shadow-[#1A7785]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center min-w-[200px] disabled:opacity-50"
                        >
                            {isLoading ? 'Adding...' : 'Add to Schedule'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Schedule;
