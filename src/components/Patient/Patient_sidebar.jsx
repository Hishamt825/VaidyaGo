import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoUrl from '../../assets/vadyago_pat.png';
import visulImg from '../../assets/Visual.png';

/* ─────────────────────────────────────────────
   MENU ITEMS
───────────────────────────────────────────── */
const MENU = [
    {
        name: 'Dashboard',
        icon: (
            <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2" />
                <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2" />
                <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2" />
                <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2" />
            </svg>
        ),
    },
    {
        name: 'Symptom Checker',
        icon: (
            <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
    },
    {
        name: 'Vitals',
        icon: (
            <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
    },
    {
        name: 'Medications',
        icon: (
            <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="2" />
                <path d="M8 5V3h8v2M12 10v4m-2-2h4" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: 'Appointments',
        icon: (
            <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        name: 'Messages',
        icon: (
            <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        ),
    },
    {
        name: 'Reminder',
        icon: (
            <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14m-12-8l3 3 7-7" />
                <rect x="3" y="5" width="18" height="16" rx="2" strokeWidth="2" />
            </svg>
        ),
    },
    {
        name: 'My Records',
        icon: (
            <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                <rect x="12" y="11" width="4" height="4" rx="1" strokeWidth="2" />
            </svg>
        ),
    },
];

/* ─────────────────────────────────────────────
   SIDEBAR
───────────────────────────────────────────── */
const Sidebar = ({ active, setActive, isMobileOpen, setIsMobileOpen }) => {
    const navigate = useNavigate();
    
    return (
    <>
        {/* Mobile overlay */}
        {isMobileOpen && (
            <div
                className="fixed inset-0 bg-black/50 z-[100] lg:hidden"
                onClick={() => setIsMobileOpen(false)}
            />
        )}

        <aside
            className={`
        fixed lg:static inset-y-0 left-0 z-[110]
        w-[220px] flex flex-col justify-start
        transition-transform duration-300 ease-in-out bg-black/10
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
        >
            {/* Logo */}
            <div className="flex items-center justify-center pt-[22px] pb-[28px] px-[20px]">
                <img src={logoUrl} alt="VaidyaGo" className="w-[130px] h-auto object-contain brightness-[1.15]" />
            </div>

            {/* Nav Items */}
            <nav className="flex-1 flex flex-col gap-[4px] px-[12px]">
                {MENU.map((item) => {
                    const isActive = active === item.name;
                    return (
                        <button
                            key={item.name}
                            onClick={() => { 
                                setActive(item.name); 
                                setIsMobileOpen(false); 
                                if (item.name === 'Symptom Checker') {
                                    navigate('/Symptom');
                                } else if (item.name === 'Dashboard') {
                                    navigate('/Patient_dashboard');
                                } else if (item.name === 'Vitals') {
                                    navigate('/Vitals');
                                } else if (item.name === 'Appointments') {
                                    navigate('/Patient_rem');
                                } else if (item.name === 'Medications') {
                                    navigate('/Medication');
                                } else if (item.name === 'Reminder') {
                                    navigate('/Reminder');
                                } else if (item.name === 'Messages') {
                                    navigate('/Message');
                                } else if (item.name === 'My Records') {
                                    navigate('/Records');
                                }
                            }}
                            className={`
                w-full flex items-center gap-[10px] px-[14px] py-[10px] rounded-[10px]
                text-[13.5px] font-semibold text-left transition-all duration-200
                ${isActive
                                    ? 'bg-white/20 text-white shadow-sm'
                                    : 'text-white/70 hover:text-white hover:bg-white/10'
                                }
              `}
                        >
                            <span className={`shrink-0 ${isActive ? 'text-white' : 'text-white/60'}`}>
                                {item.icon}
                            </span>
                            {item.name}
                        </button>
                    );
                })}
            </nav>

            {/* New Assessment Button */}
            <div className="px-[16px] pb-[32px] pt-[20px]">
                <button
                    className="w-full flex items-center justify-center gap-[8px] bg-white hover:bg-[#f0f6f9]
            text-[#0B1F4D] text-[13.5px] font-bold py-[11px] rounded-full
            transition-all duration-200 shadow-md"
                >
                    <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-[#0B1F4D] flex items-center justify-center shrink-0">
                        <svg className="w-[11px] h-[11px] text-[#0B1F4D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m-8-8h16" />
                        </svg>
                    </div>
                    New Consultation
                </button>
            </div>

            {/* Profile Section at bottom */}
            <div className="mt-auto px-[16px] pb-[24px]">
                <div className="flex items-center gap-[10px] bg-white/5 p-[10px] rounded-[16px]">
                    <div className="w-[36px] h-[36px] rounded-full overflow-hidden border border-white/20">
                        <img src={visulImg} alt="Doctor" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-white text-[12px] font-bold truncate">Dr. Julianne Reed</p>
                        <p className="text-white/50 text-[10px] truncate">Lead Physician</p>
                    </div>
                </div>
            </div>
        </aside>
    </>
    );
};

export default Sidebar;
