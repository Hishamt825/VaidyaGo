import React, { useState, useEffect } from 'react';
import { X, Clock, ChevronDown } from 'lucide-react';
import BASE_URL from '../../../baseUrl';
import apiFetch from '../../../api';

const EditReminder = ({ isOpen, onClose, reminderData, onSaveSuccess }) => {
    const [medicineName, setMedicineName] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');
    const [isFreqOpen, setIsFreqOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (reminderData) {
            setMedicineName(reminderData.medicine_name || '');
            setDosage(reminderData.dosage || '');
            setFrequency(reminderData.frequency || 'Once Daily');
        }
    }, [reminderData]);

    if (!isOpen || !reminderData) return null;

    const frequencies = ['Once Daily', 'Twice Daily', 'Thrice Daily'];

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await apiFetch(`${BASE_URL}/reminder/${reminderData.id}/update/`, {
                method: 'PATCH',
                body: JSON.stringify({
                    medicine_name: medicineName,
                    dosage: dosage,
                    frequency: frequency
                })
            });
            
            if (response.ok) {
                onSaveSuccess();
            } else {
                console.error("Failed to update reminder");
            }
        } catch (error) {
            console.error("Error updating reminder:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-[#0D1C2E]/40 backdrop-blur-md transition-opacity duration-300" 
                onClick={onClose}
            />
            
            <div className="relative w-full max-w-[480px] bg-white rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-200">
                <div className="p-10 flex flex-col">
                    <div className="mb-8">
                        <h2 className="text-[#0D1C2E] text-[32px] font-black tracking-tight leading-tight mb-2">Edit Reminder</h2>
                        <p className="text-[#627382] text-[15px] font-bold opacity-60">
                            Update your medication schedule
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <p className="text-[#627382] text-[11px] font-black uppercase tracking-widest mb-2.5 opacity-60">Medication Name</p>
                            <input 
                                type="text"
                                value={medicineName}
                                onChange={(e) => setMedicineName(e.target.value)}
                                className="w-full h-[56px] bg-[#E9F0F2] rounded-[18px] px-6 text-[#0D1C2E] text-[16px] font-bold placeholder-[#627382]/40 outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all border-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[#627382] text-[11px] font-black uppercase tracking-widest mb-2.5 opacity-60">Dosage</p>
                                <input 
                                    type="text"
                                    value={dosage}
                                    onChange={(e) => setDosage(e.target.value)}
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
                    </div>

                    <div className="mt-12 flex items-center justify-end gap-6">
                        <button 
                            onClick={onClose}
                            className="text-[#0D1C2E] text-[16px] font-black hover:opacity-60 transition-opacity px-4"
                            disabled={isSaving}
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave}
                            disabled={isSaving}
                            className="h-[64px] px-10 bg-gradient-to-r from-[#0D3442] to-[#1A7785] text-white rounded-[24px] font-black text-[16px] shadow-xl shadow-teal-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 disabled:opacity-50"
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditReminder;
