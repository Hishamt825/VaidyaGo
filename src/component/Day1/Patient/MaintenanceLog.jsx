import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MaintenanceLog.css';
import Sidebar from '../../../components/Patient/Patient_sidebar';
import patientPhoto from '../../../assets/Patient Photo.svg';
import ConsultationModal from './ConsultationModal';

const Icon = ({ name }) => {
  const icons = {
    records: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    check: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
    streak: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    bell: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    calendar: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  };
  return icons[name] || null;
};

const MaintenanceLog = () => {
  const navigate = useNavigate();
  const [active, setActive] = React.useState('Symptom Checker');
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [activeModal, setActiveModal] = React.useState(null);

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
      <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden ${activeModal ? 'blur-[4px] scale-[0.98] pointer-events-none' : ''}`}>
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
                <div className="relative group cursor-pointer p-1">
                    <Icon name="bell" />
                    <span className="absolute top-0 right-0 w-[8px] h-[8px] bg-[#6ED4D4] rounded-full border-2 border-[#0B1F4D]"></span>
                </div>
                <div className="flex items-center gap-[12px] pl-[20px] border-l border-white/10">
                    <div className="text-right hidden sm:block">
                        <p className="text-white text-[13px] font-bold leading-tight">Alex Rivera</p>
                        <p className="text-white/40 text-[10px] font-medium">Maintenance Tier</p>
                    </div>
                    <div className="w-[38px] h-[38px] rounded-full border-2 border-[#6ED4D4]/30 p-[2px] transition-transform hover:scale-105 cursor-pointer">
                        <img src={patientPhoto} className="w-full h-full rounded-full object-cover" alt="Profile" />
                    </div>
                </div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-[64px]">

        <div className="log-main-container">
          <div className="log-left-column">
            <div className="log-phase-card">
              <div className="lp-header">
                <h3>Phase 3: Maintenance</h3>
                <span className="lp-subtitle">STABILITY & LONGEVITY FOCUS</span>
              </div>
              <div className="lp-progress-row">
                <div className="lp-day-wrap">
                  <span className="lp-day-big">Day 42</span>
                  <span className="lp-day-total">/ 90</span>
                </div>
                <div className="lp-milestone">
                   <label>CURRENT MILESTONE</label>
                   <strong>Mid-Phase Assessment</strong>
                </div>
              </div>
              <div className="lp-progress-bar">
                 <div className="lp-fill" style={{ width: '46%' }}></div>
              </div>
            </div>

            <div className="log-history-section">
               <div className="history-header">
                  <h2>Log History</h2>
                  <span className="view-calendar">View Calendar <Icon name="calendar" /></span>
               </div>

               <div className="log-list">
                  <div className="log-entry today">
                     <div className="entry-header">
                        <div className="entry-date">
                           <span className="day-name">TODAY</span>
                           <strong>Wednesday, October 25</strong>
                        </div>
                        <span className="status-badge complete">COMPLETE</span>
                     </div>
                     <div className="entry-tasks-row">
                        <div className="task-pill-large">
                           <span className="pill-icon">💨</span>
                           <div className="pill-info">
                              <label>Air Quality</label>
                              <strong>Verified • HEPA Optimal</strong>
                           </div>
                        </div>
                        <div className="task-pill-large">
                           <span className="pill-icon">💧</span>
                           <div className="pill-info">
                              <label>Hydration</label>
                              <strong>Achieved 3.2L</strong>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="log-entry yesterday">
                     <div className="entry-header">
                        <div className="entry-date">
                           <span className="day-name">YESTERDAY</span>
                           <strong>Tuesday, October 24</strong>
                        </div>
                        <div className="entry-check-icon">
                           <Icon name="check" />
                        </div>
                     </div>
                     <div className="entry-pills-row">
                        <span className="entry-pill">3.0L Water</span>
                        <span className="entry-pill">10k Steps</span>
                        <span className="entry-pill">Sleep Hygiene: Yes</span>
                     </div>
                  </div>

                  <div className="log-entry">
                     <div className="entry-header">
                        <div className="entry-date">
                           <span className="day-name">MONDAY</span>
                           <strong>October 23</strong>
                        </div>
                        <div className="entry-check-icon">
                           <Icon name="check" />
                        </div>
                     </div>
                     <div className="entry-pills-row">
                        <span className="entry-pill">2.8L Water</span>
                        <span className="entry-pill">Meditation: 15m</span>
                        <span className="entry-pill">Pulse Check: 64bpm</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="log-right-column">
            <div className="log-adherence-card" onClick={() => navigate('/RecoveryJourney')}>
               <div className="ad-header">
                  <h3>Adherence Consistency</h3>
                  <span className="ad-badge">EXCELLENT</span>
               </div>
               <div className="ad-content">
                  <div className="ad-circle">
                     <div className="ad-circle-inner">
                        <span className="ad-percent">94%</span>
                        <span className="ad-label">OVERALL</span>
                     </div>
                     <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" className="bg" />
                        <circle cx="50" cy="50" r="40" className="progress" style={{ strokeDashoffset: '25' }} />
                     </svg>
                  </div>
                  <div className="ad-streak-box">
                     <div className="streak-left">
                        <div className="streak-icon-circle">
                           <Icon name="streak" />
                        </div>
                        <div className="streak-text">
                           <label>Current Streak</label>
                           <strong>12 Days</strong>
                        </div>
                     </div>
                     <div className="streak-graph-circle">📈</div>
                  </div>
               </div>
            </div>

             <div className="log-tip-card">
                <div className="tip-doc-info">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" alt="Dr. Sterling" />
                   <div className="doc-meta">
                      <strong>Dr. Sterling</strong>
                      <span>CHIEF HEALTH STRATEGIST</span>
                   </div>
                </div>
                <h3>Sustainability Tip</h3>
                <p>
                   "Maintenance isn't about perfection; it's about recovery speed. If you miss a hydration goal, don't double up tomorrow — just return to the rhythm immediately. Your cellular health thrives on consistency over intensity."
                </p>
                <button className="btn-schedule-clinical-visit" onClick={() => navigate('/MonthlyReview')}>Schedule Clinical Visit</button>
             </div>

             <div className="log-ducktor-box">
                <div className="duck-icon-box">
                   <img src="https://api.dicebear.com/7.x/bottts/svg?seed=duck" alt="Duck" />
                </div>
                <div className="duck-content">
                   <label>DUCKTOR'S LOG-IT LOGIC</label>
                   <p>"Logging takes 30 seconds but saves 30 hours of worry! Keep that 12-day streak glowing — you're doing swimmingly!"</p>
                </div>
             </div>

             <div className="upcoming-assessment-card">
                <label>Upcoming Assessment</label>
                <div className="assessment-date-row">
                   <div className="date-sq">28</div>
                   <div className="date-info">
                      <strong>Phase 3 Vital Review</strong>
                      <span>Saturday • 09:00 AM</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </main>
      </div>

      <ConsultationModal isOpen={activeModal === 'consultation'} onClose={() => setActiveModal(null)} />
    </div>
  );
};

export default MaintenanceLog;
