import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Clock, FlaskConical, Box, Syringe, ChevronRight, Download, RefreshCw } from 'lucide-react';
import BASE_URL from '../../baseUrl';
import apiFetch from '../../api';

const Patient_record = ({ onClose }) => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRecords = async () => {
        setIsLoading(true);
        try {
            const response = await apiFetch(`${BASE_URL}/api/prescriptions/`);
            if (response.ok) {
                const data = await response.json();
                setPrescriptions(Array.isArray(data) ? data : []);
            }
        } catch (error) {
            console.error("Error fetching records:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const lastEntryDate = prescriptions.length > 0 
        ? new Date(Math.max(...prescriptions.map(p => new Date(p.created_at)))) 
        : null;

    const formattedLastEntry = lastEntryDate 
        ? lastEntryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'No entries';

    const labReports = prescriptions.filter(p => {
        const type = (p.document_type || '').toLowerCase();
        const hasAttachment = Boolean(p.image || p.file);
        return type.includes('lab report') || (!type && hasAttachment);
    });
    const imagingReports = prescriptions.filter(p => p.document_type === 'Imaging & Radiology');
    const vaccinationReports = prescriptions.filter(p => p.document_type === 'Vaccination');

    const records = [
        { 
            title: 'Lab Reports', 
            desc: 'Blood work, Metabolic panel, Lipid profile', 
            icon: <FlaskConical size={20} />, 
            badge: labReports.length > 0 ? `${labReports.length} Total` : 'None', 
            badgeColor: labReports.length > 0 ? 'bg-[#C6F0F2] text-[#1A7785]' : 'bg-gray-100 text-gray-400'
        },
        { 
            title: 'Imaging', 
            desc: 'MRI Results, X-Ray Scans, Ultrasound', 
            icon: <Box size={20} />, 
            status: imagingReports.length > 0 ? `Updated ${Math.floor((new Date() - new Date(Math.max(...imagingReports.map(r => new Date(r.created_at))))) / (1000 * 60 * 60 * 24))} days ago` : 'No records'
        },
        { 
            title: 'Vaccinations', 
            desc: 'Immunization history and booster schedules', 
            icon: <Syringe size={20} />, 
            status: vaccinationReports.length > 0 ? 'Up to Date' : 'No records', 
            statusColor: vaccinationReports.length > 0 ? 'text-[#1A7785]' : 'text-gray-400' 
        },
    ];

    return (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#0B1F4D]/40 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-[560px] bg-white rounded-[32px] overflow-hidden shadow-[0_32px_120px_rgba(0,0,0,0.35)] animate-in zoom-in-95 duration-200">
                
                {/* Header Area */}
                <div className="px-8 pt-8 pb-6 flex items-start justify-between">
                    <div>
                        <h2 className="text-[24px] font-bold text-[#0D1C2E]">Health Records</h2>
                        <p className="text-[13px] text-gray-400 font-medium">Serene Pulse Centralized Medical History</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="px-8 pb-8">
                    {/* Status Pills */}
                    <div className="flex gap-4 mb-8">
                        <div className="flex-1 bg-[#F1F7F9] rounded-[20px] p-4 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1A7785] shadow-sm">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Status</p>
                                <p className="text-[14px] font-bold text-[#0D1C2E]">Verified Profile</p>
                            </div>
                        </div>
                        <div className="flex-1 bg-[#F1F7F9] rounded-[20px] p-4 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-[#0B1F4D] flex items-center justify-center text-white shadow-sm">
                                <Clock size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Last Entry</p>
                                <p className="text-[14px] font-bold text-[#0D1C2E]">{formattedLastEntry}</p>
                            </div>
                        </div>
                    </div>

                    {/* Record Categories */}
                    <div className="space-y-4 mb-8">
                        {isLoading ? (
                            <div className="text-center py-12 text-gray-400 font-medium">Loading health records...</div>
                        ) : records.map((record, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-[24px] hover:bg-gray-50 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-full bg-[#F1F7F9] flex items-center justify-center text-[#0D1C2E] group-hover:bg-[#0D1C2E] group-hover:text-white transition-all">
                                        {record.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-[16px] font-bold text-[#0D1C2E]">{record.title}</h4>
                                        <p className="text-[13px] text-gray-400 font-medium">{record.desc}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    {record.badge && (
                                        <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${record.badgeColor}`}>
                                            {record.badge}
                                        </span>
                                    )}
                                    {record.status && (
                                        <span className={`text-[11px] font-bold ${record.statusColor || 'text-gray-400'}`}>
                                            {record.status}
                                        </span>
                                    )}
                                    <ChevronRight size={18} className="text-gray-300 group-hover:text-[#1A7785] transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <button className="flex items-center gap-2 text-[14px] font-bold text-[#1A7785] hover:opacity-80 transition-opacity">
                            <Download size={18} />
                            Download All Records
                        </button>
                        <div className="flex items-center gap-6">
                            <button 
                                onClick={onClose}
                                className="text-[14px] font-bold text-[#4B5E6D] hover:text-[#0D1C2E] transition-colors"
                            >
                                Close
                            </button>
                            <button 
                                onClick={fetchRecords}
                                className="bg-gradient-to-r from-[#1A4568] to-[#1A7785] text-white px-8 py-3 rounded-full font-bold text-[14px] shadow-xl shadow-[#1A7785]/20 hover:opacity-90 transition-all flex items-center gap-2 active:scale-95"
                            >
                                <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                                Sync Records
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Patient_record;
