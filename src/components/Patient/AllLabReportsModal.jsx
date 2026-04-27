import React, { useState } from 'react';

const AllLabReportsModal = ({ onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('Recent');
    const [currentPage, setCurrentPage] = useState(1);

    const filters = ['Recent', 'Normal', 'Follow-up', 'Pending'];
    
    const allReports = [
        { id: 1, name: 'Thyroid Profile (T3, T4, TSH)', date: 'Oct 15, 2023', lab: 'Metropolis Labs', status: 'Normal', icon: 'lab' },
        { id: 2, name: 'Vitamin D-25 Hydroxy', date: 'Oct 12, 2023', lab: 'Quest Diagnostics', status: 'Follow-up Required', icon: 'blood' },
        { id: 3, name: 'Complete Blood Count (CBC)', date: 'Oct 10, 2023', lab: 'VaidyaGo Internal Lab', status: 'Pending', icon: 'microscope' },
        { id: 4, name: 'Lipid Profile', date: 'Sep 28, 2023', lab: 'Metro Medical Center', status: 'Normal', icon: 'lab' },
        { id: 5, name: 'HbA1c (Glycosylated Hemoglobin)', date: 'Sep 15, 2023', lab: 'Apollo Diagnostics', status: 'Normal', icon: 'blood' },
    ];

    const getIcon = (type) => {
        switch (type) {
            case 'lab': return <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M15,10h-2V8h2V10z M11,10H9V8h2V10z M11,14H9v-2h2V14z M15,14h-2v-2h2V14z" />;
            case 'blood': return <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />;
            case 'microscope': return <path d="M13,3v2h2V3H13z M13,21h2v-6h-2V21z M5,19V5h14v14H5z M7,7v10h10V7H7z" />;
            default: return <path d="M19,13H5v-2h14V13z" />;
        }
    };

    const filteredReports = allReports.filter(report => {
        const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             report.lab.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (activeFilter === 'Recent') return matchesSearch;
        if (activeFilter === 'Normal') return matchesSearch && report.status === 'Normal';
        if (activeFilter === 'Follow-up') return matchesSearch && report.status === 'Follow-up Required';
        if (activeFilter === 'Pending') return matchesSearch && report.status === 'Pending';
        return matchesSearch;
    });

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 md:px-6 py-10">
            {/* Light Blur Backdrop */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl transition-opacity duration-300" onClick={onClose} />
            
            <div className="relative w-full max-w-[820px] bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col p-6 border border-black/5">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-5">
                    <div className="text-[#0D1C2E]">
                        <h2 className="text-[22px] font-extrabold tracking-tight mb-0.5">All Lab Reports</h2>
                        <p className="opacity-60 text-[13px] font-medium">Manage and review your complete diagnostic history</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0D1C2E] px-6 py-2.5 rounded-full text-[13.5px] font-bold flex items-center gap-2 transition-all border border-gray-100 shadow-sm">
                            <svg className="w-4.5 h-4.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                            Share All
                        </button>
                        <button onClick={onClose} className="text-[#0D1C2E] hover:opacity-40 transition-all p-1">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="relative flex-1 max-w-[360px]">
                        <input 
                            type="text"
                            placeholder="Search by test or lab name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#F8FAFB] rounded-full py-2.5 px-6 text-[13.5px] outline-none shadow-sm placeholder-[#94A3B8] border border-gray-50 focus:border-[#1A7785] transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        {filters.map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all ${activeFilter === filter ? 'bg-[#0B1E3C] text-white shadow-lg' : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#CBD5E1]'}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-[10px] font-black tracking-widest text-[#64748B] uppercase opacity-60">
                                <th className="pb-3 pl-2">TEST NAME</th>
                                <th className="pb-3">DATE</th>
                                <th className="pb-3">LABORATORY</th>
                                <th className="pb-3">STATUS</th>
                                <th className="pb-3 text-right pr-2">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100/40">
                            {filteredReports.map((report) => (
                                <tr key={report.id} className="group hover:bg-[#F8FAFB]/60 transition-all cursor-default">
                                    <td className="py-2.5 pl-2 rounded-l-2xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-[38px] h-[38px] rounded-[12px] bg-[#F1F5F9] flex items-center justify-center text-[#64748B] group-hover:bg-[#E2E8F0] transition-colors border border-gray-100 shadow-sm shrink-0">
                                                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">{getIcon(report.icon)}</svg>
                                            </div>
                                            <span className="text-[14.5px] font-bold text-[#0D1C2E] group-hover:text-[#1A7785] transition-colors">{report.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-2.5">
                                        <div className="flex flex-col">
                                            <span className="text-[13px] font-bold text-[#64748B]">{report.date.split(',')[0]}</span>
                                            <span className="text-[11px] font-bold text-[#94A3B8]">{report.date.split(',')[1]}</span>
                                        </div>
                                    </td>
                                    <td className="py-2.5">
                                        <span className="text-[13px] font-bold text-[#64748B]">{report.lab}</span>
                                    </td>
                                    <td className="py-2.5">
                                        {report.status === 'Normal' ? (
                                            <span className="px-2.5 py-1 rounded-full bg-[#14B8A6] text-white text-[9px] font-black uppercase tracking-wider shadow-sm">
                                                NORMAL
                                            </span>
                                        ) : report.status === 'Pending' ? (
                                            <span className="px-2.5 py-1 rounded-full bg-[#334155] text-white text-[9px] font-black uppercase tracking-wider shadow-sm">
                                                PENDING
                                            </span>
                                        ) : (
                                            <div className="flex flex-col">
                                                <span className="w-fit px-2 py-0.5 bg-[#EF4444] text-white text-[8px] font-black uppercase tracking-wider rounded-t-md">FOLLOW-UP</span>
                                                <span className="w-fit px-2 py-0.5 bg-[#EF4444] text-white text-[8px] font-black uppercase tracking-wider rounded-b-md mt-[1px]">REQUIRED</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-2.5 text-right pr-2 rounded-r-2xl">
                                        <div className="flex items-center justify-end gap-5 text-[#94A3B8]">
                                            <button className="hover:text-[#1A7785] transition-colors scale-100"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
                                            <button className="hover:text-[#1A7785] transition-colors scale-100"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                    <p className="text-[13px] font-bold text-[#94A3B8]">Showing 1-15 of 42 reports</p>
                    <div className="flex items-center gap-3">
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-[#CBD5E1] hover:text-[#0D1C2E] transition-colors">
                            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3].map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-8 h-8 rounded-full text-[13px] font-black transition-all ${currentPage === page ? 'bg-black text-white shadow-lg shadow-black/20' : 'text-[#CBD5E1] hover:text-[#0D1C2E]'}`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-[#CBD5E1] hover:text-[#0D1C2E] transition-colors">
                            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllLabReportsModal;
