import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../baseUrl';
import apiFetch from '../../api';
import logoUrl from '../../assets/vadyago_pat.png';
import phImg from '../../assets/ph.png';
import Sidebar from './Patient_sidebar';
import Profile from './Profile';
import Account from './Account';
import Notification from './notification';
import AllLabReportsModal from './AllLabReportsModal';
import Share from './Share';
import VaccinationCertificateModal from './VaccinationCertificateModal';
import Upload from './Upload';

// Specific radiology images as requested
import brustImg from '../../assets/brust.png';
import ctImg from '../../assets/ct.png';

/* ─────────────────────────────────────────────
   REUSABLE SUB-COMPONENTS
───────────────────────────────────────────── */

// Lab Report Item
// Lab Report Item
const LabReportItem = ({ id, name, lab, date, status, iconType, onDelete, onUpdateName }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(name);

    const handleSave = () => {
        onUpdateName(id, newName);
        setIsEditing(false);
    };

    const renderIcon = () => {
        if (iconType === 'blood') return <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />;
        if (iconType === 'pill') return <path d="M19.2,2.8C18.1,1.7,16.5,1.7,15.4,2.8L2.8,15.4c-1.1,1.1-1.1,2.7,0,3.8l0,0l0,0c1.1,1.1,2.7,1.1,3.8,0L19.2,6.6C20.3,5.5,20.3,3.9,19.2,2.8z M9.1,11.9l-2.8,2.8l-1.9-1.9l2.8-2.8L9.1,11.9z" />;
        return <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M15,10h-2V8h2V10z M11,10H9V8h2V10z M11,14H9v-2h2V14z M15,14h-2v-2h2V14z" />;
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-[28px] mb-3 last:mb-0 hover:shadow-lg transition-all group">
            <div className="flex items-center gap-5">
                <div className="w-[52px] h-[52px] rounded-[18px] bg-[#E9EDF0] flex items-center justify-center text-[#1A314D]">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">{renderIcon()}</svg>
                </div>
                <div className="max-w-[200px] md:max-w-[300px]">
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <input 
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-[14px] font-bold outline-none focus:ring-1 focus:ring-[#1A7785]"
                                autoFocus
                            />
                            <button onClick={handleSave} className="text-[#1A7785] hover:opacity-80"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg></button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 group/title">
                            <h4 className="text-[16px] font-bold text-[#0B2132] leading-tight truncate">{name}</h4>
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="opacity-0 group-hover/title:opacity-100 text-[#1A7785] transition-all"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeWidth="2.5" /></svg>
                            </button>
                        </div>
                    )}
                    <p className="text-[13px] text-[#627382] font-semibold truncate">{lab} • {date}</p>
                </div>
            </div>
            <div className="flex items-center gap-10">
                <span className={`px-4 py-1.5 rounded-full text-[13px] font-bold ${status === 'Normal' ? 'bg-[#E1F1F3] text-[#1A7785]' : 'bg-[#FEECEC] text-[#D84C4C]'}`}>
                    {status}
                </span>
                <div className="flex items-center gap-6 text-[#1A314D]/40">
                    <button className="hover:text-[#1A7785] transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg></button>
                    <button 
                        onClick={() => onDelete(id)}
                        className="hover:text-[#D84C4C] transition-colors"
                        title="Delete Record"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

// Radiology Card
const RadiologyCard = ({ id, img, title, date, location, onDelete, onUpdateName }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(title);

    const handleSave = () => {
        onUpdateName(id, newName);
        setIsEditing(false);
    };

    return (
        <div className="min-w-[280px] bg-[#EEF5F8] p-3 rounded-[32px] shadow-sm group transition-all hover:shadow-xl hover:-translate-y-1 relative">
            <div className="h-[190px] rounded-[24px] overflow-hidden relative mb-4">
                <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                
                {/* Delete Overlay */}
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#D84C4C] opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-white"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
            <div className="px-3 pb-3">
                {isEditing ? (
                    <div className="flex items-center gap-2 mb-1">
                        <input 
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-[13px] font-bold outline-none focus:ring-1 focus:ring-[#1A7785] w-full"
                            autoFocus
                        />
                        <button onClick={handleSave} className="text-[#1A7785] hover:opacity-80"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg></button>
                    </div>
                ) : (
                    <div className="flex items-center justify-between group/title mb-1">
                        <h4 className="text-[15px] font-[700] text-[#0B2132] leading-tight truncate">{title}</h4>
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="opacity-0 group-hover/title:opacity-100 text-[#1A7785] transition-all"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeWidth="2.5" /></svg>
                        </button>
                    </div>
                )}
                <p className="text-[12px] text-[#627382] font-semibold">{date} • {location}</p>
            </div>
        </div>
    );
};

// Timeline Event
const TimelineEvent = ({ id, date, type, title, description, badge, badgeColor, showLine, onDelete }) => (
    <div className="relative pl-10 pb-6 last:pb-0">
        {/* Connection Line */}
        <div className="absolute left-[7px] top-[24px] bottom-0 w-[2px] bg-gray-200 last:hidden" />

        {/* Dot */}
        <div className="absolute left-0 top-1.5 w-[16px] h-[16px] rounded-full bg-white border-[3px] border-[#6ED4D4] z-10 shadow-sm" />

        <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#A9B1BB] mb-1">{date} - {type}</p>
                    <button 
                        onClick={() => onDelete(id)}
                        className="text-[#627382]/40 hover:text-[#D84C4C] transition-colors"
                        title="Delete Record"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
                <h3 className="text-[18px] font-black text-[#0D1C2E] mb-2 tracking-tight">{title}</h3>
                <p className="text-[14px] text-[#627382] leading-relaxed max-w-2xl">{description}</p>
            </div>
            {badge && (
                <div className={`shrink-0 px-4 py-3 rounded-2xl border ${badgeColor || 'bg-white border-gray-100'}`}>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#94A3B8] mb-1 leading-none">Prescribed</p>
                    <p className="text-[13px] font-black text-[#0D1C2E]">{badge}</p>
                </div>
            )}
        </div>
        {showLine && <div className="h-[1px] w-full bg-gray-200 mt-6" />}
    </div>
);

/* ─────────────────────────────────────────────
   MAIN RECORD COMPONENT
───────────────────────────────────────────── */

const Record = () => {
    const [activeMenu, setActiveMenu] = useState('My Record');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null); // 'profile' | 'account' | null
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isAllReportsModalOpen, setIsAllReportsModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [uploadRestriction, setUploadRestriction] = useState(null);

    // Data states
    const [prescriptions, setPrescriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const fetchPrescriptions = async () => {
        setIsLoading(true);
        try {
            const response = await apiFetch(`${BASE_URL}/api/prescriptions/`);
            if (response.ok) {
                const data = await response.json();
                setPrescriptions(Array.isArray(data) ? data : []);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this record?")) return;
        
        try {
            const response = await apiFetch(`${BASE_URL}/api/prescriptions/${id}/`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setPrescriptions(prev => prev.filter(p => p.id !== id));
            } else {
                alert("Failed to delete record.");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            alert("Error deleting record.");
        }
    };

    const handleUpdateName = async (id, newName) => {
        try {
            const response = await apiFetch(`${BASE_URL}/api/prescriptions/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ document_name: newName }),
            });
            if (response.ok) {
                setPrescriptions(prev => prev.map(p => p.id === id ? { ...p, document_name: newName } : p));
            } else {
                alert("Failed to update name.");
            }
        } catch (error) {
            console.error("Update Error:", error);
            alert("Error updating name.");
        }
    };

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const labReportPrescriptions = prescriptions.filter((p) => {
        const type = (p.document_type || '').toLowerCase();
        const hasAttachment = Boolean(p.image || p.file);
        return type.includes('lab report') || (!type && hasAttachment);
    });

    return (
        <div className="flex h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>

            {/* Sidebar */}
            <Sidebar
                active={activeMenu}
                setActive={setActiveMenu}
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
            />

            {/* Content Area */}
            <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden ${activeModal || isNotificationOpen || isAllReportsModalOpen || isShareModalOpen ? 'blur-[4px] scale-[0.98] pointer-events-none' : ''}`}>

                {/* Top Navbar */}
                <header className="h-[72px] flex items-center justify-between px-6 md:px-8 shrink-0 border-b border-white/5 mb-1 z-20">
                    
                    {/* Hamburger for Mobile */}
                    <button 
                        onClick={() => setIsMobileOpen(true)}
                        className="lg:hidden text-white p-2 -ml-2 hover:bg-white/10 rounded-xl transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>

                    <div className="flex-1 max-w-[280px]">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-white/10 border border-white/10 rounded-full py-[10px] px-[20px] text-white placeholder-white/40 text-[12px] outline-none focus:ring-2 focus:ring-[#6ED4D4]/50 transition-all font-medium"
                            />
                            <svg className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex items-center gap-[32px] ml-auto">
                        <span className="text-white/80 hover:text-white text-[13px] font-medium hidden md:block select-none cursor-pointer transition-colors">Language</span>
                        <div className="flex items-center gap-[20px]">
                            <button onClick={() => setIsNotificationOpen(true)} className="text-white hover:text-[#6ED4D4] transition-colors relative">
                                <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <div className="absolute top-[2px] right-[2px] w-[6px] h-[6px] bg-[#E85B5A] rounded-full" />
                            </button>
                            <button onClick={() => navigate('/Setting')} className="text-white hover:text-[#6ED4D4] transition-colors">
                                <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                            <div onClick={() => setActiveModal('profile')} className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform"><img src={phImg} alt="User" className="w-full h-full object-cover" /></div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 px-[20px] md:px-[40px] pt-[12px] z-10 relative overflow-y-auto pb-[64px]">
                    <div className="max-w-[1240px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">

                        {/* Title Section */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
                            <div className="flex-1">
                                <h1 className="text-[30px] font-semibold text-white leading-[1.1] tracking-tight mb-2">Health Records</h1>
                                <p className="text-white/70 text-[14px] font-medium">Manage and access your full clinical history securely.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setIsShareModalOpen(true)}
                                    className="bg-white hover:bg-gray-50 text-[#0B1F4D] px-4 py-2 rounded-full font-medium text-[13px] shadow-lg flex items-center gap-2 transition-all hover:-translate-y-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                                    Share
                                </button>
                                <button 
                                    onClick={() => setIsUploadModalOpen(true)}
                                    className="bg-[#1A7785] hover:bg-[#125863] text-white px-4 py-2 rounded-full font-medium text-[13px] shadow-lg flex items-center gap-2 transition-all hover:-translate-y-1 border border-white/10"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                    Upload
                                </button>
                                <div className="hidden md:block w-[1px] h-8 bg-white/10 mx-2" />
                                <div className="w-full md:w-[280px] relative">
                                    <input 
                                        type="text"
                                        placeholder="Search records..."
                                        className="w-full bg-white/10 border border-white/10 rounded-full py-[12px] px-[24px] text-white placeholder-white/40 text-[14px] outline-none transition-all focus:ring-2 focus:ring-[#6ED4D4]/50"
                                    />
                                    <svg className="absolute right-[20px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Top Cards Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 mb-8">

                            {/* Lab Reports Section */}
                            <div className="bg-white/95 backdrop-blur-md rounded-[32px] pt-6 md:pt-8 px-6 md:px-8 pb-4 md:pb-5 shadow-xl border border-white/20">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#E1F1F3] flex items-center justify-center text-[#1A7785]">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
                                        </div>
                                        <h2 className="text-[22px] font-bold tracking-tight text-[#0B2132]">Lab Reports</h2>
                                    </div>
                                    <button 
                                        onClick={() => setIsAllReportsModalOpen(true)}
                                        className="text-[14px] font-bold text-[#1A7785] hover:underline decoration-2 underline-offset-4"
                                    >
                                        See more
                                    </button>
                                </div>

                                <div className="space-y-1">
                                    {isLoading ? (
                                        <p className="text-gray-400 text-sm italic py-4">Loading reports...</p>
                                    ) : labReportPrescriptions.length === 0 ? (
                                        <>
                                            <LabReportItem name="Comprehensive Metabolic Panel" lab="St. Luke's Diagnostic" date="Oct 24, 2023" status="Normal" iconType="blood" />
                                            <LabReportItem name="Lipid Profile & Glucose" lab="City Health Labs" date="Sep 12, 2023" status="Follow-up Required" iconType="lab" />
                                        </>
                                    ) : (
                                        labReportPrescriptions.map((report) => (
                                            <LabReportItem 
                                                key={report.id}
                                                id={report.id}
                                                name={report.document_name || report.findings?.[0] || report.extracted_patient_name || 'Medical Report'} 
                                                lab={report.hospital_name || 'Clinic'} 
                                                date={report.prescription_date || report.created_at?.slice(0, 10)} 
                                                status="Processed" 
                                                iconType="blood" 
                                                onDelete={handleDelete}
                                                onUpdateName={handleUpdateName}
                                            />
                                        ))
                                    )}
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-50 flex justify-center">
                                    <button 
                                        onClick={() => setIsAllReportsModalOpen(true)}
                                        className="flex items-center gap-2 text-[15px] font-bold text-[#1A7785] hover:gap-3 transition-all"
                                    >
                                        See more reports
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Vaccinations Section */}
                            <div className="bg-[#0B1F4D] rounded-[32px] p-6 md:p-7 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                                <div className="absolute top-[-40px] right-[-40px] w-[140px] h-[140px] bg-[#1A7785]/20 rounded-full blur-[50px] pointer-events-none" />
                                <div className="z-10">
                                    <div className="flex items-center gap-3 text-[#A9F1F1] mb-8">
                                        <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v4m0 8v4m8-8h-4M8 12H4m16 0a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
                                        <h2 className="text-[20px] font-bold tracking-tight text-white uppercase">Upload COVID-19 Image</h2>
                                    </div>

                                    <div className="space-y-6 mb-10">
                                        <p className="text-[#D4F8FF] text-[13px] leading-relaxed">Upload only COVID-19 vaccination certificates or test reports here. Other documents will not be accepted.</p>
                                        <div className="bg-white/10 border border-white/10 rounded-[24px] p-5">
                                            <p className="text-[#A9F1F1] text-[11px] font-bold uppercase tracking-[0.24em] mb-3">Accepted documents</p>
                                            <ul className="space-y-2 text-[#E2F8FF] text-[13px]">
                                                <li>• COVID-19 vaccination certificate</li>
                                                <li>• COVID-19 test report image/PDF</li>
                                                <li>• JPG, PNG, PDF only</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => {
                                        setUploadRestriction('covid');
                                        setIsUploadModalOpen(true);
                                    }}
                                    className="w-full bg-white text-[#0B1423] py-4 rounded-2xl font-bold text-[15px] shadow-lg hover:bg-gray-50 transition-all z-10"
                                >
                                    Upload COVID-19 Image
                                </button>
                            </div>
                        </div>

                        {/* Imaging & Radiology Section */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-[42px] h-[42px] rounded-xl bg-[#80C8CD] flex items-center justify-center text-[#0B2132] shadow-sm">
                                    <svg className="w-[24px] h-[24px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14h4m-2-2v4" />
                                    </svg>
                                </div>
                                <h2 className="text-[22px] font-bold tracking-tight text-white font-sans">Uploaded Image</h2>
                            </div>

                            <div className="flex items-center gap-4 w-full overflow-x-auto no-scrollbar pb-6 -mx-[4px] px-[4px]">
                                {isLoading ? (
                                    <div className="flex gap-4">
                                        {[1, 2].map(i => (
                                            <div key={i} className="min-w-[280px] h-[280px] bg-white/10 rounded-[32px] animate-pulse" />
                                        ))}
                                    </div>
                                ) : prescriptions.filter(p => p.image || p.file).length === 0 ? (
                                    <>
                                        <RadiologyCard img={brustImg} title="Chest X-Ray (PA View)" date="Nov 15, 2023" location="St. Mary's" onDelete={() => {}} />
                                        <RadiologyCard img={ctImg} title="Abdominal MRI" date="Oct 02, 2023" location="Radiance Center" onDelete={() => {}} />
                                    </>
                                ) : (
                                    prescriptions.filter(p => p.image || p.file).map((scan) => (
                                        <RadiologyCard 
                                            key={scan.id}
                                            id={scan.id}
                                            img={scan.image ?
                                                (scan.image.startsWith('http') ? scan.image : `${BASE_URL}${scan.image.startsWith('/') ? '' : '/'}${scan.image}`) :
                                                brustImg
                                            } 
                                            title={scan.document_name || scan.findings?.[0] || scan.document_type || 'Uploaded Scan'} 
                                            date={scan.prescription_date || scan.created_at?.slice(0, 10)} 
                                            location={scan.hospital_name || 'Medical Center'} 
                                            onDelete={handleDelete}
                                            onUpdateName={handleUpdateName}
                                        />
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Timeline Section */}
                        <div className="bg-white/95 backdrop-blur-md rounded-[32px] p-5 md:p-6 shadow-xl border border-white/20">
                            <div className="flex items-center gap-2 text-[#1A7785] mb-6">
                                <div className="w-[36px] h-[36px] rounded-xl bg-[#F0F7F8] flex items-center justify-center text-[#16879B]">
                                    <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                </div>
                                <h2 className="text-[20px] font-black tracking-tight text-[#0D1C2E] uppercase">Medical History & Timeline</h2>
                            </div>

                            <div className="max-w-5xl mx-auto">
                                {isLoading ? (
                                    <p className="text-gray-400 text-sm italic py-4">Loading timeline...</p>
                                ) : prescriptions.length === 0 ? (
                                    <>
                                        <TimelineEvent
                                            date="Nov 2023"
                                            type="Diagnosis"
                                            title="Seasonal Rhinitis"
                                            description="Consultation with Dr. Sarah Jenkins regarding persistent sneezing and congestion. Prescribed antihistamine regimen for 14 days."
                                            badge="Loratadine 10mg"
                                            showLine={true}
                                        />
                                        <TimelineEvent
                                            date="May 2023"
                                            type="Procedure"
                                            title="Minor Outpatient Surgery"
                                            description="Endoscopic procedure at St. Mary's Surgical Center. Recovery monitored over 48 hours without complications."
                                            badge="St. Mary's General"
                                            showLine={true}
                                        />
                                        <TimelineEvent
                                            date="Jan 2022"
                                            type="Wellness Visit"
                                            title="Annual Physical Examination"
                                            description="Comprehensive health screening. All vitals within normal range. Recommended increased vitamin D intake."
                                        />
                                    </>
                                ) : (
                                    prescriptions.map((p, index) => (
                                        <TimelineEvent
                                            key={p.id}
                                            id={p.id}
                                            date={p.prescription_date || p.created_at?.slice(0, 10)}
                                            type={p.document_type || 'Prescription'}
                                            title={p.doctor_name ? `Consultation with ${p.doctor_name}` : 'Medical Record'}
                                            description={p.summary || (p.recommendations?.length > 0 ? p.recommendations.join(', ') : 'Medical history entry from uploaded document.')}
                                            badge={p.medicines?.[0]?.name}
                                            showLine={index !== prescriptions.length - 1}
                                            onDelete={handleDelete}
                                        />
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Footer Section */}
                        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8 pb-5 opacity-60">
                            <div className="text-[12px] font-bold text-white/60 text-center md:text-left">
                                © 2024 VaidyaGo. All medical data is encrypted and HIPAA compliant.
                            </div>
                            <div className="flex gap-8 text-[12px] font-black uppercase tracking-widest text-white/50">
                                <button className="hover:text-white transition-colors">Privacy Policy</button>
                                <button className="hover:text-white transition-colors">Terms of Service</button>
                                <button className="hover:text-white transition-colors">Contact Support</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modals */}
            {activeModal === 'profile' && (
                <Profile
                    onClose={() => setActiveModal(null)}
                    onAccountSettings={() => setActiveModal('account')}
                />
            )}
            {activeModal === 'account' && (
                <Account onClose={() => setActiveModal(null)} />
            )}
            {isNotificationOpen && <Notification onClose={() => setIsNotificationOpen(false)} />}
            {isAllReportsModalOpen && (
                <AllLabReportsModal 
                    onClose={() => setIsAllReportsModalOpen(false)} 
                    onShareAll={() => {
                        setIsAllReportsModalOpen(false);
                        setIsShareModalOpen(true);
                    }}
                />
            )}
            {isShareModalOpen && <Share isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />}
            {isCertificateModalOpen && <VaccinationCertificateModal onClose={() => setIsCertificateModalOpen(false)} />}
            {isUploadModalOpen && (
                <Upload 
                    uploadRestriction={uploadRestriction}
                    onClose={() => {
                        setIsUploadModalOpen(false);
                        setUploadRestriction(null);
                    }} 
                    onSuccess={() => {
                        setIsUploadModalOpen(false);
                        setUploadRestriction(null);
                        fetchPrescriptions();
                    }}
                />
            )}
        </div>
    );
};

export default Record;
