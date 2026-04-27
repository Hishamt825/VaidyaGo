import React, { useState } from 'react';
import Chat from './Chat';
import Request from './Request';
import Review from './Review';

const Concierge = ({ onClose }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isRequestOpen, setIsRequestOpen] = useState(false);
    const [isReviewOpen, setIsReviewOpen] = useState(false);

    return (
        <>
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#0D1C2E]/60 backdrop-blur-md transition-opacity duration-300" 
                onClick={onClose}
            />
            
            {/* Modal Container */}
            <div className="relative w-full max-w-[500px] bg-white rounded-[32px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-300">
                
                {/* Header Section with Gradient */}
                <div className="relative h-[150px] p-6 flex flex-col justify-end overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4D] via-[#1a6e78] to-[#49AAB3]"></div>
                    
                    {/* Subtle Pattern/Blur */}
                    <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-white/10 rounded-full blur-[60px]"></div>
                    
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-all z-20 group"
                    >
                        <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="relative z-10 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white/20 shadow-xl">
                            <img 
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" 
                                alt="Sarah" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-[22px] font-bold text-white leading-tight">Connect with Concierge</h2>
                            <p className="text-white/70 text-[13px] font-medium">Sarah, Your Health Concierge</p>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 pt-5">
                    <p className="text-[13px] text-[#627382] leading-relaxed mb-6 font-medium">
                        I'm here to handle your administrative and logistical needs. From navigating insurance to coordinating prescriptions, our sanctuary is open 24/7.
                    </p>

                    <div className="space-y-3 mb-6">
                        {/* Action Cards */}
                        {[
                            {
                                title: 'Instant Chat',
                                subtitle: 'Average wait time: Under 1 minute',
                                icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
                                color: 'bg-[#B4F1F1] text-[#1A7785]'
                            },
                            {
                                title: 'Request a Callback',
                                subtitle: "We'll call you back within 15 minutes",
                                icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
                                color: 'bg-[#B4F1F1] text-[#1A7785]'
                            },
                            {
                                title: 'Schedule Care Review',
                                subtitle: 'Book a deep-dive logistical planning session',
                                icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
                                color: 'bg-[#B4F1F1] text-[#1A7785]'
                            }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-[20px] bg-[#F4F9F9] hover:bg-[#EBF5F5] border border-transparent hover:border-[#1A7785]/10 transition-all group cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center shadow-sm`}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d={item.icon} />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-[16px] font-bold text-[#0D1C2E]">{item.title}</h4>
                                        <p className="text-[12px] text-[#627382] font-medium">{item.subtitle}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => {
                                        if (item.title === 'Instant Chat') {
                                            setIsChatOpen(true);
                                        } else if (item.title === 'Request a Callback') {
                                            setIsRequestOpen(true);
                                        } else if (item.title === 'Schedule Care Review') {
                                            setIsReviewOpen(true);
                                        }
                                    }}
                                    className="px-6 py-2 rounded-full bg-[#0D1C2E] text-white text-[13px] font-bold hover:bg-[#1A7785] transition-all shadow-md"
                                >
                                    Connect
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-center gap-2 py-3 border-t border-gray-100 opacity-40">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#0D1C2E]">Secure & Encrypted Clinical Communication</span>
                    </div>
                </div>
            </div>
        </div>
            {isChatOpen && <Chat onClose={() => setIsChatOpen(false)} />}
            {isRequestOpen && <Request onClose={() => setIsRequestOpen(false)} />}
            {isReviewOpen && <Review onClose={() => setIsReviewOpen(false)} />}
        </>
    );
};

export default Concierge;
