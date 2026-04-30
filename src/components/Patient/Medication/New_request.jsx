import React, { useState, useEffect } from 'react';
import BASE_URL from '../../../baseUrl';
import apiFetch from '../../../api';

const New_request = ({ onClose, onRequestAdded }) => {
    const [deliveryType, setDeliveryType] = useState('pickup');
    const [medications, setMedications] = useState([]);
    const [pharmacies, setPharmacies] = useState([]);
    const [selectedMedication, setSelectedMedication] = useState('');
    const [selectedPharmacy, setSelectedPharmacy] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setIsFetching(true);
            try {
                // Fetch Medications
                const medRes = await apiFetch(`${BASE_URL}/api/prescriptions/medications/`);
                const medData = await medRes.json();
                if (medRes.ok) {
                    setMedications(medData);
                    if (medData.length > 0) setSelectedMedication(medData[0].id);
                }

                // Fetch Pharmacies (User said no auth needed here, apiFetch handles it gracefully)
                const pharmRes = await apiFetch(`${BASE_URL}/api/prescriptions/pharmacies/`);
                const pharmData = await pharmRes.json();
                if (pharmRes.ok) {
                    setPharmacies(pharmData);
                    if (pharmData.length > 0) setSelectedPharmacy(pharmData[0].id);
                }
            } catch (error) {
                console.error("Fetch Error:", error);
            } finally {
                setIsFetching(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedMedication || !selectedPharmacy) {
            setMessage('Please select both medication and pharmacy.');
            return;
        }

        setIsLoading(true);
        setMessage('');

        const payload = {
            medication: parseInt(selectedMedication),
            pharmacy: parseInt(selectedPharmacy),
            delivery_type: deliveryType === 'home' ? 'home_delivery' : 'pickup'
        };

        try {
            const response = await apiFetch(`${BASE_URL}/api/prescriptions/requests/create/`, {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Request submitted successfully!');
                if (onRequestAdded) onRequestAdded();
                setTimeout(() => onClose(), 1500);
            } else {
                setMessage(data.detail || 'Failed to submit request.');
            }
        } catch (error) {
            console.error("Submit Error:", error);
            setMessage('Server error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[300]">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" 
                onClick={onClose}
            ></div>
            
            {/* Modal Container */}
            <div className="bg-white rounded-[40px] w-full max-w-[440px] overflow-hidden shadow-2xl relative z-10 animate-in fade-in zoom-in duration-300">
                
                {/* Content Padding */}
                <div className="p-8 pb-4">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-[28px] font-[900] text-[#0D1C2E] mb-1">New Request</h2>
                            <p className="text-[#627382] text-[15px] font-medium">
                                Prescription Renewal for <span className="text-[#0D1C2E] font-bold">Alex Rivera</span>
                            </p>
                        </div>
                        <div className="w-[42px] h-[42px] bg-[#DFEEF0] rounded-full flex items-center justify-center text-[#1A7785]">
                            <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                    </div>

                    {message && (
                        <div className={`mb-4 p-3 rounded-xl text-center text-[13px] font-bold ${message.includes('success') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                            {message}
                        </div>
                    )}

                    {/* Form Fields */}
                    <div className="space-y-4">
                        {/* Select Medication */}
                        <div>
                            <label className="block text-[10px] font-bold text-[#627382] uppercase tracking-[0.2em] mb-2 opacity-70">
                                Select Medication
                            </label>
                            <div className="relative">
                                <select 
                                    value={selectedMedication}
                                    onChange={(e) => setSelectedMedication(e.target.value)}
                                    disabled={isFetching}
                                    className="w-full bg-[#EAEFF2] border-none rounded-[16px] py-3.5 px-5 pr-10 text-[15px] text-[#0D1C2E] appearance-none outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-medium cursor-pointer disabled:opacity-50"
                                >
                                    {isFetching ? (
                                        <option>Loading medications...</option>
                                    ) : (
                                        medications.map(med => (
                                            <option key={med.id} value={med.id}>{med.name} {med.dosage}</option>
                                        ))
                                    )}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#627382]">
                                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Preferred Pharmacy */}
                        <div>
                            <label className="block text-[10px] font-bold text-[#627382] uppercase tracking-[0.2em] mb-2 opacity-70">
                                Preferred Pharmacy
                            </label>
                            <div className="relative">
                                <select 
                                    value={selectedPharmacy}
                                    onChange={(e) => setSelectedPharmacy(e.target.value)}
                                    disabled={isFetching}
                                    className="w-full bg-[#EAEFF2] border-none rounded-[16px] py-3.5 px-5 pr-10 text-[15px] text-[#0D1C2E] appearance-none outline-none focus:ring-2 focus:ring-[#1A7785]/20 transition-all font-medium cursor-pointer disabled:opacity-50"
                                >
                                    {isFetching ? (
                                        <option>Loading pharmacies...</option>
                                    ) : (
                                        pharmacies.map(pharm => (
                                            <option key={pharm.id} value={pharm.id}>{pharm.name} - {pharm.address}</option>
                                        ))
                                    )}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#627382]">
                                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Preference */}
                        <div>
                            <label className="block text-[10px] font-bold text-[#627382] uppercase tracking-[0.2em] mb-2 opacity-70">
                                Delivery Preference
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setDeliveryType('pickup')}
                                    className={`rounded-[16px] p-4 flex flex-col items-center gap-1.5 transition-all ${deliveryType === 'pickup' ? 'bg-[#EAEFF2] border-[1.5px] border-[#1A7785]' : 'bg-[#EAEFF2] border-[1.5px] border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <svg className={`w-5 h-5 ${deliveryType === 'pickup' ? 'text-[#1A7785]' : 'text-[#627382]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-10V4m0 10V4m-4 11h.01" />
                                    </svg>
                                    <span className={`text-[14px] font-bold ${deliveryType === 'pickup' ? 'text-[#0D1C2E]' : 'text-[#627382]'}`}>Pickup</span>
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setDeliveryType('home')}
                                    className={`rounded-[16px] p-4 flex flex-col items-center gap-1.5 transition-all ${deliveryType === 'home' ? 'bg-[#EAEFF2] border-[1.5px] border-[#1A7785]' : 'bg-[#EAEFF2] border-[1.5px] border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <svg className={`w-5 h-5 ${deliveryType === 'home' ? 'text-[#1A7785]' : 'text-[#627382]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1m-4-1a1 1 0 00-1 1H9" />
                                    </svg>
                                    <span className={`text-[14px] font-bold ${deliveryType === 'home' ? 'text-[#0D1C2E]' : 'text-[#627382]'}`}>Home Delivery</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="px-8 py-6 bg-[#F8FAFB]/50 flex items-center gap-4">
                    <button 
                        type="button"
                        onClick={onClose}
                        className="flex-1 bg-white border border-gray-100 py-3.5 rounded-full text-[16px] font-bold text-[#0D1C2E] hover:bg-gray-50 transition-all shadow-sm"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSubmit}
                        disabled={isLoading || isFetching}
                        className="flex-[1.5] bg-gradient-to-r from-[#0D3442] to-[#1A7785] text-white py-3.5 rounded-full font-bold text-[16px] shadow-lg shadow-[#1A7785]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {isLoading ? 'Submitting...' : 'Submit Request'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default New_request;
