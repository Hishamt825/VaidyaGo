import React, { useState, useEffect } from 'react';
import apiFetch from '../../../api';
import BASE_URL from '../../../baseUrl';
import Add_past from './Add_past';

const Past_medication = ({ onClose, onRefreshDashboard }) => {
    const [isAddPastOpen, setIsAddPastOpen] = useState(false);
    const [medications, setMedications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPastMedications = async () => {
        setIsLoading(true);
        try {
            const response = await apiFetch(`${BASE_URL}/api/past-medications/`);
            const data = await response.json();
            if (response.ok) {
                setMedications(data);
            }
        } catch (err) {
            console.error("Fetch past medications error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPastMedications();
    }, []);

    const handleAddSuccess = () => {
        setIsAddPastOpen(false);
        fetchPastMedications(); // Refresh the list
    };

    const handleCloseAndRefresh = () => {
        if (onRefreshDashboard) onRefreshDashboard();
        onClose();
    };

    return (
        <>
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[300]">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" 
                onClick={onClose}
            ></div>
            
            {/* Modal Container */}
            <div className={`bg-white rounded-[32px] w-full max-w-[650px] overflow-hidden shadow-2xl relative z-10 transition-all duration-300 ${isAddPastOpen ? 'scale-[0.95] opacity-50 blur-[2px]' : 'scale-100 opacity-100 blur-0'}`}>
                
                {/* Header */}
                <div className="p-8 pb-6 flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <svg className="w-6 h-6 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 2v2m0 16v2m10-10h-2M4 10H2" />
                            </svg>
                            <h2 className="text-[24px] font-[900] text-[#0D1C2E]">Past Medications</h2>
                        </div>
                        <p className="text-[#627382] text-[14px] font-medium ml-8">
                            Complete health history and insights.
                        </p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 bg-[#F8FAFB] text-[#627382] hover:bg-gray-100 rounded-full transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="px-8 pb-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {isLoading ? (
                        <div className="py-10 flex flex-col items-center justify-center">
                            <div className="w-8 h-8 border-4 border-[#1A7785] border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-[#627382] font-medium text-[14px]">Loading history...</p>
                        </div>
                    ) : medications.length === 0 ? (
                        <div className="py-10 text-center bg-gray-50 rounded-[24px] border border-dashed border-gray-200">
                            <p className="text-[#627382] font-medium">No past medication history found.</p>
                            <p className="text-[12px] text-gray-400 mt-1">Add your first entry to start tracking.</p>
                        </div>
                    ) : (
                        medications.map((med) => (
                            <div key={med.id} className="bg-[#EFF7F8] rounded-[20px] p-6 border-l-[4px] border-[#1A7785] relative group animate-in slide-in-from-bottom-2 duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-[18px] font-bold text-[#0D1C2E] inline-block mr-2">{med.medication_name}</h3>
                                        <span className="text-[10px] font-black text-[#1A7785] uppercase tracking-widest">{med.dosage}</span>
                                    </div>
                                    <button className="bg-white/50 hover:bg-white text-[#1A7785] px-4 py-1.5 rounded-full text-[12px] font-bold shadow-sm transition-all border border-[#1A7785]/10">
                                        View Details
                                    </button>
                                </div>
                                
                                <div className="flex flex-wrap gap-x-8 gap-y-3 mb-4">
                                    <div className="flex items-center gap-2 text-[#627382]">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                        <span className="text-[13px] font-medium">{med.start_date} - {med.end_date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[#627382]">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                                        <span className="text-[13px] font-medium">Dr. {med.doctor_name || med.prescribing_doctor}</span>
                                    </div>
                                </div>

                                <div className="bg-white/40 rounded-[12px] p-3 border border-[#1A7785]/5">
                                    <div className="flex items-center gap-2 mb-1">
                                        <svg className="w-3.5 h-3.5 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                        <span className="text-[9px] font-black text-[#1A7785]/60 uppercase tracking-widest">Reason for prescription</span>
                                    </div>
                                    <p className="text-[14px] font-bold text-[#0D1C2E] ml-5">"{med.reason}"</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="p-8 py-6 bg-[#F8FAFB] flex items-center justify-between border-t border-gray-100">
                    <button className="flex items-center gap-2 text-[#0D1C2E] font-bold text-[14px] hover:opacity-70 transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Download History
                    </button>
                    <div className="flex items-center gap-8">
                        <button 
                            onClick={handleCloseAndRefresh}
                            className="text-[14px] font-bold text-[#0D1C2E] hover:opacity-70 transition-all"
                        >
                            Close Dialogue
                        </button>
                        <button 
                            onClick={() => setIsAddPastOpen(true)}
                            className="bg-gradient-to-r from-[#0D3442] to-[#1A7785] text-white px-8 py-3 rounded-full font-bold text-[15px] shadow-lg shadow-[#1A7785]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            Add New Entry
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {isAddPastOpen && (
            <Add_past 
                onClose={() => setIsAddPastOpen(false)}
                onBack={() => setIsAddPastOpen(false)}
                onSuccess={handleAddSuccess}
            />
        )}
        </>
    );
};

export default Past_medication;
