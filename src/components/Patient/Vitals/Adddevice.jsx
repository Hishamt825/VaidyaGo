import React from 'react';

const DeviceTile = ({ name, subtitle, icon, isConnected }) => (
    <div className="bg-[#f0f7f8] rounded-[20px] p-4 flex items-center justify-between border border-[#e2eef1] hover:border-cyan-500/30 transition-all group cursor-pointer">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0B1F4D] shadow-sm group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div>
                <p className="text-[#0B1F4D] text-[15px] font-bold">{name}</p>
                <p className="text-[#627382] text-[10px] font-semibold uppercase tracking-wider">{subtitle}</p>
            </div>
        </div>
        <button className="bg-[#0B1F4D] text-white text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full hover:bg-[#1A7785] transition-colors">
            Connect
        </button>
    </div>
);

const Adddevice = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 backdrop-blur-xl bg-slate-900/40 animate-in fade-in duration-300"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white w-full max-w-[580px] rounded-[36px] shadow-2xl relative flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header Section */}
                <div className="p-6 md:p-8 pb-2 md:pb-4 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#1A7785]" />
                            <span className="text-[#1A7785] text-[9px] font-black uppercase tracking-[0.2em]">Device Integration</span>
                        </div>
                        <button 
                            onClick={onClose}
                            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <h1 className="text-[#0B1F4D] text-[24px] md:text-[28px] font-bold tracking-tighter leading-none mb-3">
                        Add New Device
                    </h1>
                    <p className="text-[#627382] text-[13px] md:text-[14px] font-medium leading-relaxed max-w-md">
                        Synchronize your health data by connecting your wearable device to our clinical sanctuary.
                    </p>
                </div>

                {/* Device Grid */}
                <div className="px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                    <DeviceTile 
                        name="Apple Watch" 
                        subtitle="HealthKit Enabled"
                        icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 18c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-6-8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm12 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>}
                    />
                    <DeviceTile 
                        name="Fitbit" 
                        subtitle="Full Cloud Sync"
                        icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66 2L12 11h9.34L13.66 5z"/></svg>}
                    />
                    <DeviceTile 
                        name="Garmin" 
                        subtitle="Athlete Grade Sync"
                        icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.97 4.42c-.17.1-.37.15-.5.15s-.33-.05-.5-.15L3.53 17.38c-.32-.17-.53-.5-.53-.88V7.5c0-.38.21-.71.53-.88l7.97-4.42c.17-.1.37-.15.5-.15s.33.05.5.15l7.97 4.42c.32.17.53.5.53.88v9zM12 4.1L5 7.98V15.5l7 3.88 7-3.88V7.98L12 4.1z"/></svg>}
                    />
                    <DeviceTile 
                        name="Oura" 
                        subtitle="Sleep & Readiness"
                        icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>}
                    />
                </div>

                {/* Privacy Badge */}
                <div className="mx-6 md:mx-8 bg-cyan-50/50 rounded-[24px] p-3.5 flex items-start gap-4 border border-cyan-100/50 mb-6">
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-[#1A7785] shadow-sm shrink-0">
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <div>
                        <h4 className="text-[#1A7785] text-[13px] font-bold tracking-tight">Clinical Grade Privacy</h4>
                        <p className="text-[#627382]/80 text-[11px] font-medium leading-relaxed">
                            Data synced from wearables is encrypted and used only for evaluation.
                        </p>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="px-6 md:px-8 py-5 bg-[#f9fafb]/50 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <button className="text-[#627382] text-[9px] font-black uppercase tracking-[0.2em] hover:text-[#0B1F4D] transition-colors">
                        Manual Entry
                    </button>
                    <div className="flex items-center gap-2.5 w-full md:w-auto">
                        <button 
                            onClick={onClose}
                            className="flex-1 md:flex-none px-6 py-2.5 text-[#0B1F4D] font-bold text-[13px] hover:bg-gray-100 rounded-full transition-all"
                        >
                            Cancel
                        </button>
                        <button className="flex-1 md:flex-none bg-gradient-to-r from-[#0B1F4D] to-[#1A7785] text-white px-7 py-2.5 rounded-full font-bold text-[13px] shadow-lg hover:shadow-cyan-500/20 transition-all">
                            Search Devices
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Adddevice;
