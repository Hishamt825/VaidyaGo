import React from 'react';

const Refill_request = ({ onClose, onTrackAll }) => {
    const requests = [
        {
            name: 'Metformin',
            id: 'REF-6291',
            pharmacy: 'Sanctuary Health Pharmacy',
            status: 'READY',
            time: 'TODAY, 10:30 AM',
            color: '#6ED4D4'
        },
        {
            name: 'Atorvastatin',
            id: 'REF-4420',
            pharmacy: 'Sanctuary Health Pharmacy',
            status: 'PENDING',
            time: 'ORDERED 2D AGO',
            color: '#CBD5E0'
        },
        {
            name: 'Lisinopril',
            id: 'REF-9932',
            pharmacy: 'CVS Pharmacy #492',
            status: 'IN PROGRESS',
            time: 'ETA: TOMORROW',
            color: '#A0AEC0'
        }
    ];

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[400]">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" 
                onClick={onClose}
            ></div>
            
            {/* Modal Container */}
            <div className="bg-white rounded-[32px] w-full max-w-[540px] overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-300">
                
                {/* Gradient Header - Ported from the design style requested */}
                <div className="bg-gradient-to-r from-[#0D1C2E] to-[#1A7785] p-8 pb-10 relative">
                    <button 
                        onClick={onClose}
                        className="absolute right-6 top-6 text-white/40 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="relative z-10">
                        <p className="text-[10px] font-bold text-[#6ED4D4] uppercase tracking-[0.3em] mb-2">Prescription Status Tracker</p>
                        <h2 className="text-[32px] font-black text-white leading-none mb-2 tracking-tight">Refill Requests</h2>
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#6ED4D4] animate-pulse" />
                            <p className="text-[14px] font-bold text-white/70">Patient: Alex Rivera</p>
                        </div>
                    </div>

                    {/* Decorative Icon */}
                    <div className="absolute right-8 bottom-6 w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center text-white/20 border border-white/10">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                    </div>
                </div>

                {/* Main Content Body */}
                <div className="px-8 py-8 relative">
                    <div className="space-y-3 mb-8">
                        {requests.map((req, i) => (
                            <div key={i} className="bg-[#F8FAFB] rounded-[24px] p-4 flex items-center justify-between group hover:bg-white hover:shadow-xl hover:shadow-[#1A7785]/5 transition-all border border-gray-100 hover:border-[#1A7785]/10">
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-2xl bg-[#EBF5F6] flex items-center justify-center text-[#1A7785] shadow-sm group-hover:scale-105 transition-transform duration-300">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-[16px] font-bold text-[#0D1C2E] leading-tight mb-0.5">{req.name}</h4>
                                        <p className="text-[11px] text-[#627382] font-medium tracking-tight">
                                            {req.id} • {req.pharmacy}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-1 ${
                                        req.status === 'READY' ? 'bg-[#006A70] text-white shadow-[0_4px_12px_rgba(0,106,112,0.2)]' :
                                        req.status === 'PENDING' ? 'bg-[#CBD5E0] text-[#4A5568]' :
                                        'bg-[#0D1C2E] text-white shadow-[0_4px_12px_rgba(13,28,46,0.2)]'
                                    }`}>
                                        {req.status}
                                    </span>
                                    <p className="text-[10px] text-[#627382] font-bold tracking-tight opacity-60 uppercase">{req.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between gap-6 pt-4 border-t border-gray-100">
                        <button 
                            onClick={onClose}
                            className="text-[13px] font-black text-[#627382] hover:text-[#0D1C2E] transition-colors uppercase tracking-[0.2em]"
                        >
                            Close
                        </button>
                        <button 
                            onClick={onTrackAll}
                            className="bg-gradient-to-r from-[#0D1C2E] to-[#1A7785] text-white px-8 py-3.5 rounded-full font-bold text-[14px] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                        >
                            Track All Orders
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Refill_request;
