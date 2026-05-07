import React, { useState, useEffect } from 'react';
import apiFetch from '../../../api';
import BASE_URL from '../../../baseUrl';

const Add_past = ({ onClose, onBack, onSuccess }) => {
    const [formData, setFormData] = useState({
        medication_name: '',
        dosage: '',
        prescribing_doctor: '', 
        start_date: '',
        end_date: '',
        reason: ''
    });
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const cleanUrl = `${BASE_URL.replace(/\/$/, '')}/api/doctors/`;
                const response = await apiFetch(cleanUrl);
                const data = await response.json();
                if (response.ok && data.length > 0) {
                    setDoctors(data);
                    // Pre-select first doctor by default to avoid empty PK error
                    setFormData(prev => ({ ...prev, prescribing_doctor: data[0].full_name || data[0].username }));
                    setSelectedDoctorId(data[0].id);
                }
            } catch (err) {
                console.error("Fetch doctors error:", err);
            }
        };
        fetchDoctors();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const container = document.getElementById('doctor-dropdown-container');
            if (container && !container.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Map name to ID if not already set via selection
        let doctorId = selectedDoctorId;
        if (!doctorId) {
            const matchedDoc = doctors.find(doc => 
                (doc.full_name || doc.username).toLowerCase() === formData.prescribing_doctor.toLowerCase()
            );
            if (matchedDoc) {
                doctorId = matchedDoc.id;
            }
        }

        if (!doctorId) {
            alert("Please select a valid doctor from the list.");
            return;
        }

        setIsLoading(true);
        const submissionData = {
            ...formData,
            prescribing_doctor: parseInt(doctorId)
        };

        try {
            const response = await apiFetch(`${BASE_URL.replace(/\/$/, '')}/api/past-medications/add/`, {
                method: 'POST',
                body: JSON.stringify(submissionData)
            });
            if (response.ok) {
                if (onSuccess) onSuccess();
            } else {
                const errorData = await response.json();
                alert(JSON.stringify(errorData) || "Failed to add medication history.");
            }
        } catch (err) {
            console.error("Save history error:", err);
            alert("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[400]">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-[4px]" 
                onClick={onClose}
            ></div>
            
            {/* Modal Container */}
            <div className="bg-white rounded-[32px] w-full max-w-[460px] shadow-2xl relative z-10 animate-in fade-in zoom-in duration-300">
                
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0D1C2E] to-[#1A7785] p-6 pb-6 relative text-white rounded-t-[32px]">
                    <h2 className="text-[24px] font-[900] mb-0.5 tracking-tight">Add Past Medication</h2>
                    <p className="text-white/70 text-[13px] font-medium">Complete your health history for better insights.</p>
                    <button 
                        onClick={onClose}
                        className="absolute right-6 top-6 p-1 text-white/40 hover:text-white transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-3.5">
                    {/* Medication Name */}
                    <div>
                        <label className="block text-[10px] font-black text-[#1A7785] uppercase tracking-[0.2em] mb-1.5">Medication Name</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                name="medication_name"
                                value={formData.medication_name}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Amoxicillin"
                                className="w-full bg-white border border-gray-200 rounded-[14px] py-3 px-5 text-[14px] text-[#0D1C2E] placeholder-[#627382]/30 outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-medium shadow-sm"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A7785]/40">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                        {/* Dosage */}
                        <div>
                            <label className="block text-[10px] font-black text-[#1A7785] uppercase tracking-[0.2em] mb-1.5">Dosage</label>
                            <input 
                                type="text" 
                                name="dosage"
                                value={formData.dosage}
                                onChange={handleChange}
                                required
                                placeholder="e.g., 500mg"
                                className="w-full bg-white border border-gray-200 rounded-[14px] py-3 px-5 text-[14px] text-[#0D1C2E] placeholder-[#627382]/30 outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-medium shadow-sm"
                            />
                        </div>
                        {/* Prescribing Doctor */}
                        <div className="relative" id="doctor-dropdown-container">
                            <label className="block text-[10px] font-black text-[#1A7785] uppercase tracking-[0.2em] mb-1.5">Prescribing Doctor</label>
                            <div className="relative group">
                                <input 
                                    type="text"
                                    name="prescribing_doctor"
                                    value={formData.prescribing_doctor}
                                    onChange={(e) => {
                                        handleChange(e);
                                        setIsOpen(true);
                                    }}
                                    onClick={() => setIsOpen(!isOpen)}
                                    required
                                    placeholder="e.g., Dr. Sarah Chen"
                                    className="w-full bg-white border border-gray-200 rounded-[14px] py-3 px-5 pr-10 text-[14px] text-[#0D1C2E] placeholder-[#627382]/30 outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-medium shadow-sm cursor-text"
                                    autoComplete="off"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#627382] group-focus-within:text-[#1A7785] transition-colors">
                                    <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Custom Dropdown List */}
                            {isOpen && (
                                <div className="absolute z-[500] left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-xl max-h-[180px] overflow-y-auto custom-scrollbar py-1 animate-in fade-in slide-in-from-top-1 duration-200">
                                    {doctors
                                        .filter(doc => (doc.full_name || doc.username).toLowerCase().includes(formData.prescribing_doctor.toLowerCase()))
                                        .map(doc => (
                                            <button
                                                key={doc.id}
                                                type="button"
                                                onClick={() => {
                                                    setFormData(prev => ({ ...prev, prescribing_doctor: doc.full_name || doc.username }));
                                                    setSelectedDoctorId(doc.id);
                                                    setIsOpen(false);
                                                }}
                                                className="w-full text-left px-5 py-2.5 hover:bg-[#F4F9F9] text-[14px] text-[#0D1C2E] font-medium transition-colors border-b border-gray-50 last:border-0"
                                            >
                                                Dr. {doc.full_name || doc.username}
                                            </button>
                                        ))}
                                    {doctors.filter(doc => (doc.full_name || doc.username).toLowerCase().includes(formData.prescribing_doctor.toLowerCase())).length === 0 && (
                                        <div className="px-5 py-3 text-[13px] text-[#627382] italic">
                                            No registered doctor found matching "{formData.prescribing_doctor}"
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Treatment Period */}
                    <div>
                        <label className="block text-[10px] font-black text-[#1A7785] uppercase tracking-[0.2em] mb-1.5">Treatment Period</label>
                        <div className="flex items-center gap-3">
                            <input 
                                type="date" 
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleChange}
                                required
                                className="flex-1 bg-white border border-gray-200 rounded-[14px] py-3 px-4 text-[14px] text-[#0D1C2E] outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-medium shadow-sm"
                            />
                            <span className="text-[#1A7785] font-bold text-[13px]">to</span>
                            <input 
                                type="date" 
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleChange}
                                required
                                className="flex-1 bg-white border border-gray-200 rounded-[14px] py-3 px-4 text-[14px] text-[#0D1C2E] outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-medium shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Reason for Prescription */}
                    <div>
                        <label className="block text-[10px] font-black text-[#1A7785] uppercase tracking-[0.2em] mb-1.5">Reason for Prescription</label>
                        <textarea 
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            placeholder="Describe why this was prescribed..."
                            className="w-full bg-white border border-gray-200 rounded-[14px] py-3 px-5 text-[14px] text-[#0D1C2E] placeholder-[#627382]/30 outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-medium shadow-sm min-h-[70px] max-h-[100px] resize-none"
                        ></textarea>
                    </div>

                    {/* Actions */}
                    <div className="pt-1 space-y-3">
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-[#1A7785] hover:bg-[#125863] text-white py-3.5 rounded-xl font-bold text-[15px] shadow-lg shadow-[#1A7785]/20 transition-all flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : "Save My History"}
                        </button>
                        <button 
                            type="button"
                            onClick={onBack}
                            className="w-full text-[#1A7785] font-bold text-[14px] hover:opacity-70 transition-all text-center"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Add_past;
