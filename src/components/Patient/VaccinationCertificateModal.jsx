import React, { useState } from 'react';
import PdfPopup from './Pdf';

const VaccinationCertificateModal = ({ onClose }) => {
    const [isPdfPopupOpen, setIsPdfPopupOpen] = useState(false);
    const certificateData = {
        patientName: "Johnathan Doe",
        patientId: "VG-8829-X",
        dateOfBirth: "March 12, 1992",
        vaccine: "COVID-19 (mRNA-1273)",
        manufacturer: "Moderna Biotech",
        doses: [
            { dose: "1st Dose", date: "Jan 12, 2022", batch: "MOD-7721", site: "VaidyaGo Internal Lab" },
            { dose: "2nd Dose", date: "Feb 15, 2022", batch: "MOD-9910", site: "VaidyaGo Internal Lab" },
            { dose: "Booster", date: "Dec 05, 2023", batch: "MOD-4420", site: "City Health Labs" },
        ]
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-xl transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-[40px] w-full max-w-[500px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                
                {/* Official Header Stripe */}
                <div className="h-2 w-full bg-gradient-to-r from-[#1A7785] via-[#49AAB3] to-[#1A7785]"></div>

                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <div className="flex items-center gap-2 mb-0.5">
                                <div className="w-5 h-5 rounded-md bg-[#E1F1F3] flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#94A3B8]">Official Document</span>
                            </div>
                            <h2 className="text-[20px] font-black text-[#0D1C2E] tracking-tight leading-none">Vaccination Record</h2>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Patient Info */}
                    <div className="bg-[#F8FAFB] rounded-[28px] p-5 mb-6 border border-gray-100 shadow-sm">
                        <div className="grid grid-cols-2 gap-y-3">
                            <div>
                                <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider mb-0.5">Patient Name</p>
                                <p className="text-[14px] font-black text-[#0D1C2E]">{certificateData.patientName}</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider mb-0.5">Patient ID</p>
                                <p className="text-[14px] font-black text-[#0D1C2E]">{certificateData.patientId}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider mb-0.5">Vaccine Type</p>
                                <p className="text-[14px] font-black text-[#1A7785] leading-tight">{certificateData.vaccine}</p>
                                <p className="text-[10px] font-bold text-[#64748B] mt-0.5">{certificateData.manufacturer}</p>
                            </div>
                        </div>
                    </div>

                    {/* Doses List */}
                    <div className="space-y-3 mb-6">
                        <p className="text-[10px] font-black text-[#0D1C2E] uppercase tracking-[0.1em] px-1">Immunization History</p>
                        {certificateData.doses.map((item, idx) => (
                            <div key={idx} className="relative pl-5 pb-1.5 last:pb-0">
                                {idx !== certificateData.doses.length - 1 && (
                                    <div className="absolute left-[6.5px] top-[14px] bottom-0 w-[1px] bg-gray-200" />
                                )}
                                <div className="absolute left-0 top-1.5 w-[13px] h-[13px] rounded-full bg-white border-[2px] border-[#1A7785] z-10" />
                                <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-gray-50 shadow-sm group hover:border-[#1A7785]/20 transition-all">
                                    <div>
                                        <h4 className="text-[12px] font-black text-[#0D1C2E] leading-tight">{item.dose}</h4>
                                        <p className="text-[10px] font-bold text-[#64748B]">{item.site} • {item.batch}</p>
                                    </div>
                                    <span className="text-[11px] font-black text-[#1A7785]">{item.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* QR & Verification */}
                    <div className="flex items-center gap-4 pt-3.5 border-t border-gray-100">
                        <div className="w-16 h-16 bg-white border border-gray-200 rounded-xl p-1.5 shadow-inner flex items-center justify-center">
                            {/* Dummy QR Code */}
                            <div className="w-full h-full bg-[#0D1C2E] opacity-10 rounded-sm relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.8)_1px,transparent_1px)] bg-[size:3px_3px]" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="text-[11px] font-bold text-[#627382] leading-snug mb-1.5">Scan to verify this digital certificate securely.</p>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-pulse" />
                                <span className="text-[9px] font-black text-[#14B8A6] uppercase tracking-widest">Verified Status</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-8 flex gap-3">
                        <button 
                            onClick={() => setIsPdfPopupOpen(true)}
                            className="flex-1 bg-[#0D1C2E] text-white py-4 rounded-2xl font-bold text-[14px] shadow-xl hover:bg-[#1A2E44] transition-all flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Download PDF
                        </button>
                        <button className="px-6 border border-gray-200 rounded-2xl font-bold text-[14px] text-[#64748B] hover:bg-gray-50 transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            {isPdfPopupOpen && <PdfPopup onClose={() => setIsPdfPopupOpen(false)} />}
        </div>
    );
};

export default VaccinationCertificateModal;
