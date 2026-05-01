import React from 'react';
import mapImg from '../../../assets/pharmacy_map.png';
import entranceImg from '../../../assets/pharmacy_entrance.png';

const Direction = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#0B1F4D]/40 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-[440px] bg-white rounded-[32px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.3)] animate-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="bg-[#0D1C2E] p-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-[18px] font-bold text-white leading-tight">Pharmacy Directions</h2>
                        <p className="text-white/50 text-[12px] font-medium mt-0.5">1202 Healing Way • 1.2 miles away</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-4 space-y-3">
                    {/* Map View Card */}
                    <div className="relative rounded-[24px] overflow-hidden group cursor-pointer border border-gray-100 shadow-sm hover:shadow-md transition-all">
                        <img src={mapImg} alt="Map View" className="w-full h-[180px] object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-5">
                            <span className="bg-[#1A7785] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest mb-1.5 inline-block">Live Map</span>
                            <h4 className="text-white font-bold text-[14px]">Open in Google Maps</h4>
                        </div>
                    </div>

                    {/* Entrance View Card */}
                    <div className="flex gap-3">
                        <div className="flex-1 relative rounded-[24px] overflow-hidden group cursor-pointer border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <img src={entranceImg} alt="Entrance" className="w-full h-[120px] object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-3 left-4">
                                <h4 className="text-white font-bold text-[13px]">Street View</h4>
                            </div>
                        </div>
                        <div className="w-[140px] bg-[#F8FBFC] rounded-[24px] p-4 flex flex-col justify-center border border-[#1A7785]/10 group cursor-pointer hover:bg-white hover:shadow-md transition-all">
                            <div className="w-9 h-9 bg-[#EBF7F8] rounded-xl flex items-center justify-center text-[#1A7785] mb-2 group-hover:bg-[#1A7785] group-hover:text-white transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <p className="text-[11px] font-bold text-[#0D1C2E]">Call Shop</p>
                            <p className="text-[10px] text-gray-400 font-medium">(206) 555-0199</p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button 
                        onClick={() => window.open('https://maps.google.com', '_blank')}
                        className="w-full bg-[#1A7785] hover:bg-[#125A6C] text-white py-4 rounded-[20px] font-bold text-[14px] shadow-xl shadow-[#1A7785]/20 transition-all flex items-center justify-center gap-2 mt-2"
                    >
                        Start Navigation
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m3 11 19-9-9 19-2-8-8-2Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Direction;
