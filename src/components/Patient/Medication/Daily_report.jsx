import React, { useState, useEffect } from 'react';
import Refill from './Refill';
import Download from './Download';

const Daily_report = ({ onClose, schedule = [] }) => {
    const [isRefillOpen, setIsRefillOpen] = useState(false);
    const [isDownloadOpen, setIsDownloadOpen] = useState(false);

    const totalDoses = schedule.length;
    const takenDoses = schedule.filter(s => s.is_taken).length;
    const progress = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 0;
    
    const nextDose = schedule
        .filter(s => !s.is_taken)
        .sort((a, b) => a.time.localeCompare(b.time))[0];

    const [timeLeft, setTimeLeft] = useState('00:00:00');

    useEffect(() => {
        if (!nextDose) {
            setTimeLeft('00:00:00');
            return;
        }

        const updateTimer = () => {
            const now = new Date();
            const [hours, minutes] = nextDose.time.split(':');
            const target = new Date();
            target.setHours(parseInt(hours), parseInt(minutes), 0);

            if (target < now) {
                target.setDate(target.getDate() + 1);
            }

            const diff = target - now;
            const h = Math.floor(diff / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
        };

        updateTimer();
        const timer = setInterval(updateTimer, 1000);
        return () => clearInterval(timer);
    }, [nextDose]);

    const todayDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const statusText = progress === 100 ? 'Completed' : (progress > 50 ? 'On Track' : 'Ongoing');

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <div 
                className="absolute inset-0 bg-[#0B1F4D]/40 backdrop-blur-md"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className={`relative w-full max-w-[500px] bg-white rounded-[32px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.25)] ${isRefillOpen || isDownloadOpen ? 'blur-[8px] scale-[0.98] pointer-events-none' : ''}`}>
                
                {/* Header Gradient */}
                <div className="bg-gradient-to-b from-[#0B1F4D] via-[#0B4A54] to-[#49AAB3] p-4 md:p-5 text-white relative">
                    <button 
                        onClick={onClose}
                        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/5"
                    >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-2 mb-0.5">
                        <div className="w-5 h-5 flex items-center justify-center">
                            <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                        <h2 className="text-[17px] font-bold tracking-tight">VaidyaGo</h2>
                    </div>
                    <p className="text-white/80 text-[12px] mb-4 font-medium">Your Daily Health Summary</p>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[9px] font-bold text-white/50 uppercase tracking-[0.2em] mb-1">Date</p>
                            <p className="text-[15px] font-bold leading-tight tracking-tight">{todayDate}</p>
                        </div>
                        <div className="border-l border-white/10 pl-4 relative">
                            <p className="text-[9px] font-bold text-white/50 uppercase tracking-[0.2em] mb-1">Status</p>
                            <div className="flex items-start gap-2">
                                <div className={`w-1.5 h-3 rounded-full mt-0.5 shrink-0 opacity-80 ${progress === 100 ? 'bg-green-400' : 'bg-[#0D1C2E]'}`}></div>
                                <p className="text-[15px] font-bold leading-tight tracking-tight">{statusText}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Section */}
                <div className="p-4 md:p-5">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-[13px] font-[900] text-[#0D1C2E]">Your Progress Today</h3>
                        <span className="text-[14px] font-black text-[#1A7785]">{progress}%</span>
                    </div>
                    
                    <div className="h-1.5 w-full bg-[#EAEFF2] rounded-full mb-3 overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-[#0B4A54] to-[#1A7785] rounded-full transition-all duration-1000"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                    <p className="text-[#627382] text-[12.5px] leading-relaxed mb-4 font-medium">
                        {progress === 100 ? "Amazing! You've completed all your doses for today." : 
                         `You're doing great! You've taken ${takenDoses} out of ${totalDoses} doses on time.`}
                    </p>

                    {/* Next Step Card */}
                    {nextDose ? (
                        <div className="bg-[#F8FBFC] rounded-[20px] p-4 border border-[#E9F3F5] relative overflow-hidden shadow-sm">
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="inline-block bg-[#006A70] text-white text-[8px] font-bold px-2 py-0.5 rounded-md uppercase tracking-widest mb-2">Next Steps</span>
                                    <h4 className="text-[17px] font-bold text-[#0D1C2E]">{nextDose.medication_name}</h4>
                                    <p className="text-[12px] text-[#627382] font-medium">{nextDose.dosage}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-bold text-[#627382] uppercase tracking-wider mb-0.5">Take at {nextDose.time.slice(0, 5)}</p>
                                    <p className="text-[20px] font-black text-[#0D1C2E] leading-none mb-0.5 tracking-tight">{timeLeft}</p>
                                    <p className="text-[8px] font-bold text-[#1A7785] uppercase tracking-wider">Until next dose</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-[#F8FBFC] rounded-[20px] p-6 border border-[#E9F3F5] text-center shadow-sm">
                            <p className="text-[#627382] text-[14px] font-medium italic">No upcoming doses for today.</p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="mt-5">
                        <p className="text-[9px] font-bold text-[#627382] uppercase tracking-[0.2em] mb-3 opacity-80">Care Actions</p>
                        <div className="flex gap-3">
                             <button 
                                onClick={() => setIsRefillOpen(true)}
                                className="flex-1 bg-[#1A7785] hover:bg-[#125863] text-white py-3 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#1A7785]/20"
                            >
                                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                                Refill All
                            </button>
                             <button 
                                onClick={() => setIsDownloadOpen(true)}
                                className="flex-1 bg-white border-2 border-[#EAEFF2] hover:border-[#1A7785]/20 text-[#0D1C2E] py-3 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 transition-all shadow-sm"
                            >
                                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="bg-[#F4F9F9] px-5 py-3 flex items-center justify-between border-t border-white">
                    <p className="text-[10px] font-medium text-[#627382]">
                        Protected by VaidyaGo
                    </p>
                    <button className="text-[10px] font-black text-[#1A7785] hover:opacity-80 uppercase tracking-widest transition-opacity">
                        View History
                    </button>
                </div>

            </div>

            {/* Download Modal */}
            {isDownloadOpen && (
                <Download 
                    onClose={() => setIsDownloadOpen(false)} 
                />
            )}

            {/* Refill Success Modal */}
            {isRefillOpen && (
                <Refill 
                    onClose={() => setIsRefillOpen(false)} 
                    onReturn={() => {
                        setIsRefillOpen(false);
                        onClose();
                    }}
                />
            )}
        </div>
    );
};

export default Daily_report;
