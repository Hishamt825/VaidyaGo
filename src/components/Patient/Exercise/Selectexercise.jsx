import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoutineCard = ({ icon, title, description, badge, onClick }) => (
    <div 
        onClick={onClick}
        className="bg-[#E9F3F6] rounded-[24px] p-6 flex flex-col flex-1 hover:shadow-xl transition-all duration-500 group cursor-pointer border border-transparent hover:border-[#1A7785]/10"
    >
        <div className="w-[52px] h-[52px] bg-white rounded-[16px] flex items-center justify-center text-[#1A7785] mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
            {icon}
        </div>
        <h3 className="text-[#0B2132] text-[18px] font-bold leading-tight mb-2 tracking-tight">{title}</h3>
        <p className="text-[#627382] text-[14px] font-medium leading-relaxed mb-6 flex-1">{description}</p>
        
        <button className="flex items-center gap-2 text-[#1A7785] font-bold text-[13px] uppercase tracking-wider group/btn">
            {badge || 'Select Routine'}
            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </button>
    </div>
);

const Selectexercise = ({ onClose }) => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        // Prevent scrolling on body when modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Backdrop with Blur */}
            <div 
                className="absolute inset-0 bg-[#0B1423]/40 backdrop-blur-md transition-all duration-700"
                onClick={handleClose} 
            />

            {/* Modal Content */}
            <div className={`relative bg-white w-full max-w-[720px] rounded-[40px] shadow-2xl overflow-hidden transition-all duration-500 transform ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
                
                {/* Close Button */}
                <button 
                    onClick={handleClose}
                    className="absolute top-6 right-6 text-[#94A3B8] hover:text-[#0D1C2E] transition-colors z-10"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-8 pt-10">
                    <div className="mb-8">
                        <h2 className="text-[#0B2132] text-[24px] font-bold leading-tight mb-2 tracking-tight">Select Exercise Routine</h2>
                        <p className="text-[#627382] text-[15px] font-medium tracking-tight">Choose your focus area for today's clinical sanctuary session.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-5 mb-8">
                        <RoutineCard 
                            icon={
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            }
                            title="Posture Strengthening"
                            description="Focus on cervical and thoracic alignment to stabilize your spine and reduce strain."
                            badge="Select Routine"
                            onClick={() => {
                                handleClose();
                                navigate('/Strengthening');
                            }}
                        />
                        <RoutineCard 
                            icon={
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            }
                            title="Guided Movement"
                            description="Real-time range-of-motion guidance with interactive feedback for optimal flow."
                            badge="Select Routine"
                            onClick={() => {
                                handleClose();
                                navigate('/Guided');
                            }}
                        />
                    </div>
                </div>

                {/* Footer Banner */}
                <div className="bg-[#E9EDF0] px-10 py-5 flex items-center justify-center gap-3">
                    <svg className="w-5 h-5 text-[#627382]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-[#627382] text-[12px] font-bold uppercase tracking-widest">All sessions are recorded for clinical analysis</p>
                </div>
            </div>
        </div>
    );
};

export default Selectexercise;

