import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecoveryJourney.css';
import Sidebar from '../../../components/Patient/Patient_sidebar';
import Profile from '../../../components/Patient/Profile';
import Account from '../../../components/Patient/Account';
import Notification from '../../../components/Patient/notification';
import patientPhoto from '../../../assets/Patient Photo.svg';
import AssessmentModal from './AssessmentModal';
import ReportModal from './ReportModal';

const Icon = ({ name }) => {
  const icons = {
    download: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    calendar: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
    roadmap: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/><path d="M5 12h14"/></svg>,
    more: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
  };
  return icons[name] || null;
};

const RecoveryJourney = () => {
  const navigate = useNavigate();
  const [active, setActive] = React.useState('Symptom Checker');
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [activeModal, setActiveModal] = React.useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);

  return (
    <div 
      className="flex h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}
    >
      <Sidebar
        active={active}
        setActive={setActive}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* ── Main Area ── */}
      <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden ${isNotificationOpen || activeModal ? 'blur-[4px] scale-[0.98] pointer-events-none' : ''}`}>
        {/* Top Navbar */}
        <header className="h-[76px] flex items-center justify-between px-[24px] md:px-[48px] shrink-0 border-b border-white/5 mb-[8px] z-20">
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
                    <div onClick={() => setActiveModal('profile')} className="w-[38px] h-[38px] rounded-full border-2 border-[#6ED4D4]/30 p-[2px] transition-transform hover:scale-105 cursor-pointer">
                        <img src={patientPhoto} className="w-full h-full rounded-full object-cover" alt="Profile" />
                    </div>
                </div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-[64px]">

        <header className="journey-header">
           <div className="header-titles">
              <h1 className='text-[#000000]'>Your Recovery Journey</h1>
              <p>Protocol Progress: Rhinitis Recovery (180-Day Plan)</p>
           </div>
           <div className="header-actions">
              <button className="btn-report" onClick={() => setActiveModal('report')}>
                 <Icon name="download" /> Download Full Progress Report
              </button>
              <button className="btn-schedule-exit" onClick={() => setActiveModal('assessment')}>
                 <Icon name="calendar" /> Schedule Exit Assessment
              </button>
           </div>
        </header>

        <div className="journey-content-scroll">
           <div className="journey-top-grid">
              <div className="hero-progress-card">
                 <div className="hero-left">
                    <div className="hero-circle-wrap">
                       <div className="hero-percent-box">
                          <strong>83%</strong>
                          <span>COMPLETED</span>
                       </div>
                       <svg viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" className="bg" />
                          <circle cx="50" cy="50" r="45" className="progress" style={{ strokeDashoffset: '52' }} />
                       </svg>
                       <div className="hero-speech-bubble">
                          "You've made incredible strides, Alex! Only 30 days left until your clinical graduation."
                       </div>
                    </div>
                 </div>

                 <div className="hero-right">
                    <div className="hero-duck-avatar">
                       <img src="https://api.dicebear.com/7.x/bottts/svg?seed=duck" alt="Duck" />
                    </div>
                    <h2 className="day-counter">Day 150 of 180</h2>
                    <p className="day-desc">
                       You are currently in the final stretch of your maintenance phase. Your consistent participation has significantly optimized your immunological response.
                    </p>
                    <div className="hero-stats-row">
                       <div className="stat-mini-card">
                          <label>TIME ELAPSED</label>
                          <strong>21 Weeks</strong>
                       </div>
                       <div className="stat-mini-card">
                          <label>STATUS</label>
                          <strong className="status-active">Active</strong>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="journey-side-cards">
                 <div className="adherence-stat-card">
                    <div className="ad-stat-header">
                       <div className="ad-icon-badge">
                          <Icon name="check" />
                       </div>
                       <span className="streak-badge">28-DAY STREAK</span>
                    </div>
                    <div className="ad-stat-val">
                       <strong>96%</strong>
                       <label>CLINICAL ADHERENCE</label>
                    </div>
                    <div className="ad-stat-progress">
                       <div className="fill" style={{ width: '96%' }}></div>
                    </div>
                 </div>

                 <div className="specialist-quote-card">
                    <div className="quote-header">
                       <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" alt="Dr. Sterling" />
                       <div className="quote-doc">
                          <strong>Dr. Elena Sterling</strong>
                          <span>IMMUNOLOGY SPECIALIST</span>
                       </div>
                    </div>
                    <p className="quote-text">
                       "Alex, your adherence levels are among the highest in our current cohort. This consistency is the primary driver for your stabilization. Keep up this momentum for the final 30 days."
                    </p>
                    <div className="quote-decoration">"</div>
                 </div>
              </div>
           </div>

           <section className="roadmap-section">
              <div className="roadmap-header">
                 <Icon name="roadmap" />
                 <h2>Protocol Phase Roadmap</h2>
              </div>

              <div className="roadmap-grid">
                 <div className="roadmap-card completed">
                    <div className="roadmap-card-header">
                       <div className="status-icon"><Icon name="check" /></div>
                       <span className="day-range">DAY 1 - 30</span>
                    </div>
                    <h3>Phase 1: Stabilization</h3>
                    <p>Symptom Baseline Established</p>
                    <span className="phase-status">COMPLETED</span>
                 </div>

                 <div className="roadmap-card completed">
                    <div className="roadmap-card-header">
                       <div className="status-icon"><Icon name="check" /></div>
                       <span className="day-range">DAY 31 - 120</span>
                    </div>
                    <h3>Phase 2: Desensitization</h3>
                    <p>Immunological Breakthrough Achieved</p>
                    <span className="phase-status">COMPLETED</span>
                 </div>

                 <div className="roadmap-card active">
                    <div className="roadmap-card-header">
                       <div className="status-icon-dots"><Icon name="more" /></div>
                       <span className="day-range">DAY 121 - 180</span>
                    </div>
                    <h3>Phase 3: Maintenance</h3>
                    <p>Routine Sustainment in Progress</p>
                    <div className="active-badge">
                       <span className="dot"></span> ACTIVE PHASE
                    </div>
                 </div>
              </div>
           </section>
        </div>
      </main>
      </div>

      {activeModal === 'profile' && <Profile isOpen={true} onClose={() => setActiveModal(null)} onOpenAccount={() => setActiveModal('account')} />}
      {activeModal === 'account' && <Account isOpen={true} onClose={() => setActiveModal(null)} />}
      {activeModal === 'assessment' && <AssessmentModal isOpen={true} onClose={() => setActiveModal(null)} />}
      {activeModal === 'report' && <ReportModal isOpen={true} onClose={() => setActiveModal(null)} />}
      {isNotificationOpen && <Notification isOpen={true} onClose={() => setIsNotificationOpen(false)} />}
    </div>
  );
};

export default RecoveryJourney;
