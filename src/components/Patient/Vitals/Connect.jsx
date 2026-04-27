import React from 'react';

const DeviceItem = ({ name, id, icon }) => (
    <div className="bg-[#f8fafb] rounded-[20px] p-3.5 flex items-center justify-between border border-[#edf2f4] hover:border-cyan-500/20 transition-all group">
        <div className="flex items-center gap-3">
            <div className="w-[48px] h-[48px] bg-white rounded-2xl flex items-center justify-center text-[#1A7785] shadow-sm group-hover:scale-105 transition-transform">
                {icon}
            </div>
            <div>
                <p className="text-[#0B1F4D] text-[15px] font-bold">{name}</p>
                <p className="text-[#627382] text-[10px] font-semibold uppercase tracking-wider">ID: {id}</p>
            </div>
        </div>
        <button className="bg-[#1A7785] text-white text-[10px] font-bold uppercase tracking-widest px-5 py-2 rounded-full hover:bg-[#155e69] transition-colors shadow-sm">
            Connect
        </button>
    </div>
);

const Step = ({ number, title, description }) => (
    <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20 mt-0.5">
            <span className="text-white text-[13px] font-bold">{number}</span>
        </div>
        <div>
            <h4 className="text-white text-[15px] font-bold mb-0.5 tracking-tight">{title}</h4>
            <p className="text-white/60 text-[12px] leading-relaxed font-medium">{description}</p>
        </div>
    </div>
);

const Connect = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6 backdrop-blur-xl bg-slate-900/40 animate-in fade-in duration-300"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white w-full max-w-[800px] rounded-[40px] shadow-2xl relative flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-300 min-h-[500px]">
                
                {/* Left Panel - Instructions */}
                <div className="md:w-[40%] bg-gradient-to-br from-[#0B1F4D] via-[#1A7785] to-[#49AAB3] p-8 md:p-9 flex flex-col relative overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-[-10%] right-[-10%] w-[180px] h-[180px] bg-white/10 rounded-full blur-[60px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[130px] h-[130px] bg-cyan-400/20 rounded-full blur-[50px]" />
                    
                    <div className="relative z-10">
                        <h2 className="text-white text-[24px] md:text-[28px] font-bold leading-tight tracking-tight mb-8">
                            Connect Your<br />Device
                        </h2>

                        <div className="flex flex-col gap-6">
                            <Step 
                                number="1" 
                                title="Turn on Bluetooth" 
                                description="Ensure your clinical device is powered on and discoverable."
                            />
                            <Step 
                                number="2" 
                                title="Select device" 
                                description="Choose your device from the list of detected hardware."
                            />
                            <Step 
                                number="3" 
                                title="Sync Data" 
                                description="Complete clinical handshake to start monitoring."
                            />
                        </div>
                    </div>

                    {/* Buddy's Tip */}
                    <div className="mt-auto relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-[22px] p-4">
                        <div className="flex items-center gap-3 mb-2.5">
                            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-lg border border-white/20 overflow-hidden">
                                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Buddy&backgroundColor=ffffff" alt="Buddy" className="w-6 h-6" />
                            </div>
                            <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Buddy's Tip</span>
                        </div>
                        <p className="text-white/80 text-[11px] font-medium leading-relaxed italic">
                            "Tighten the cuff securely for 99.8% data accuracy. Calibration starts automatically!"
                        </p>
                    </div>
                </div>

                {/* Right Panel - Device List */}
                <div className="flex-1 bg-white p-8 md:p-9 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[#0B1F4D] text-[11px] font-black uppercase tracking-[0.2em] opacity-50">Detected Devices</h3>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[#627382] text-[11px] font-bold">Scanning...</span>
                        </div>
                    </div>

                    {/* Device List */}
                    <div className="flex flex-col gap-2.5 flex-1">
                        <DeviceItem 
                            name="PulsePro X1" 
                            id="VG-8829-01" 
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                        />
                        <DeviceItem 
                            name="VaidyaTemp Nano" 
                            id="VG-1102-BT" 
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
                        />
                        <DeviceItem 
                            name="Sphygmo-Smart 5" 
                            id="SS-5509-X" 
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        />

                        {/* Rescan Button */}
                        <button className="mt-2 w-full py-3.5 border-2 border-dashed border-[#edf2f4] rounded-[22px] text-[#1A7785] text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-[#f8fafb] hover:border-cyan-500/30 transition-all">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            Rescan for devices
                        </button>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-6 flex gap-3">
                        <button 
                            onClick={onClose}
                            className="flex-1 py-3.5 border border-[#edf2f4] rounded-[22px] text-[#0B1F4D] text-[13px] font-bold hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            CANCEL
                        </button>
                        <button 
                            onClick={onClose}
                            className="flex-1 py-3.5 bg-[#0B1F4D] rounded-[22px] text-white text-[13px] font-bold hover:bg-[#154659] transition-all shadow-lg shadow-[#0B1F4D]/10"
                        >
                            FINISH
                        </button>
                    </div>
                </div>

                {/* Close Button Mobile */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 md:hidden w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
        </div>
    );
};

export default Connect;
