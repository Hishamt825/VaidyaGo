import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Phase3D.css';
import Sidebar from '../../../components/Patient/Patient_sidebar';
import patientPhoto from '../../../assets/Patient Photo.svg';

const Phase3D = () => {
  const navigate = useNavigate();
  const [active, setActive] = React.useState('Symptom Checker');
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [activeModal, setActiveModal] = React.useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const [showRoutineModal, setShowRoutineModal] = React.useState(false);
  const [showSavedModal, setShowSavedModal] = React.useState(false);
  const [showEnvironmentalModal, setShowEnvironmentalModal] = React.useState(false);
  const [showFinalizeModal, setShowFinalizeModal] = React.useState(false);
  const [showEnvSuccessModal, setShowEnvSuccessModal] = React.useState(false);
  const [showFinalReviewModal, setShowFinalReviewModal] = React.useState(false);
  const [envData, setEnvData] = React.useState({
    pollen: '',
    humidity: 45,
    mode: 'OPTIMAL'
  });

  const menuItems = [
    { id: 'dashboard', icon: 'overview', label: 'Dashboard' },
    { id: 'symptom', icon: 'symptom', label: 'Symptom Checker' },
    { id: 'vitals', icon: 'vitals', label: 'Vitals' },
    { id: 'meds', icon: 'meds', label: 'Medications' },
    { id: 'appointments', icon: 'appointments', label: 'Appointments' },
    { id: 'messages', icon: 'messages', label: 'Messages' },
    { id: 'careplan', icon: 'overview', label: 'Care Plan', active: true },
    { id: 'records', icon: 'records', label: 'MY RECORDS' },
  ];

  const Icon = ({ name }) => {
    const icons = {
      overview: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
      symptom: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      vitals: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      meds: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
          <path d="m8.5 8.5 7 7" />
        </svg>
      ),
      appointments: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
      ),
      messages: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
        </svg>
      ),
      records: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
      search: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
      bell: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
      settings: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      check: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
      download: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      ),
      leaf: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a8 8 0 0 1-10 10Z" />
          <path d="M21 2c-2 2-3.5 3-9 4" />
        </svg>
      ),
      pollen: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ),
      humidity: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5s-3 3.5-3 5.5a7 7 0 0 0 7 7z" />
        </svg>
      ),
      eco: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a8 8 0 0 1-10 10Z" />
        </svg>
      ),
      optimal: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      turbo: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m21 16-4 4-4-4" /><path d="M17 20V4" /><path d="m3 8 4-4 4 4" /><path d="M7 4v16" />
        </svg>
      ),
      submit: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      ),
      lung: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M7 3c0 3 2.5 5 2.5 9s-2.5 6-2.5 9" /><path d="M17 3c0 3-2.5 5-2.5 9s2.5 6 2.5 9" /><path d="M3 13a4 4 0 0 1 4-4h2a2 2 0 0 0 2-2V3" /><path d="M21 13a4 4 0 0 0-4-4h-2a2 2 0 0 1-2-2V3" /><path d="M12 9v12" />
        </svg>
      ),
      strategy: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /><path d="M9 2h6" />
        </svg>
      ),
      survey: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      ),
      lock: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      arrowRight: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
        </svg>
      ),
      sync: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
          <path d="M16 16h5v5" />
        </svg>
      )
    };

    return (
      <svg 
        className="icon" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        width="20"
        height="20"
      >
        {icons[name] || <circle cx="12" cy="12" r="10" />}
      </svg>
    );
  };

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
      <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden ${isNotificationOpen || showRoutineModal || showSavedModal || showEnvironmentalModal || showFinalizeModal || showEnvSuccessModal || showFinalReviewModal || activeModal ? 'blur-[4px] scale-[0.98] pointer-events-none' : ''}`}>
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

            {/* Back Button */}
            <button 
                onClick={() => navigate('/Phase2D')}
                className="flex text-white w-[38px] h-[38px] mr-4 bg-white/10 border border-white/5 rounded-full hover:bg-white/20 transition-all items-center justify-center shrink-0"
                title="Back to Phase 2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
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
                    <div onClick={() => setActiveModal('profile')} className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform">
                        <img src={patientPhoto} alt="User" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-[64px]">

        {/* Maintenance Phase Banner */}
        <section className="maintenance-hero-banner">
          <div className="m-hero-left">
            <h1 className="m-hero-title">Phase 3: Maintenance - Staying Healthy</h1>
            <p className="m-hero-subtitle">Months 5-6: Focused on long-term respiratory health and consistent routine.</p>
          </div>
          <div className="m-status-box">
             <div className="m-status-label">STATUS</div>
             <div className="m-status-value">STABILIZED</div>
          </div>
        </section>

        <div className="p2-content-grid">
           {/* Left Column */}
           <div className="p2-main-col">
              {/* Recovery Trajectory */}
              <div className="p3-trajectory-card">
                 <div className="p3-traj-header">
                    <h3>Recovery Trajectory</h3>
                    <span className="p3-active-badge">Phase 3 Active</span>
                 </div>
                 <div className="p3-timeline-wrap">
                    <div className="p3-timeline-bar">
                       <div className="p3-fill stabilization" style={{ width: '25%' }}></div>
                       <div className="p3-fill desensitization" style={{ width: '25%' }}></div>
                       <div className="p3-fill maintenance" style={{ width: '33%' }}></div>
                    </div>
                    <div className="p3-labels">
                       <span>STABILIZATION</span>
                       <span>DESENSITIZATION</span>
                       <span className="active">MAINTENANCE (CURRENT)</span>
                       <span>EXIT REVIEW</span>
                    </div>
                 </div>
              </div>

              {/* Action Cards Row */}
              <div className="p3-action-row">
                 <div className="p3-action-card">
                    <div className="p3-icon-wrap calendar">
                       <Icon name="overview" />
                    </div>
                    <h3>Sustainability Routine</h3>
                    <p>Daily reminders for maintenance doses and air quality checks in your primary environment.</p>
                    <button className="p3-btn-log" onClick={() => setShowRoutineModal(true)}>Log Routine</button>
                 </div>
                 <div className="p3-action-card">
                    <div className="p3-icon-wrap leaf">
                       <Icon name="vitals" />
                    </div>
                    <h3>Environmental Resilience</h3>
                    <p>Weekly tracking of triggers to ensure immunity remains high against seasonal shifts.</p>
                    <button className="p3-btn-update" onClick={() => setShowEnvironmentalModal(true)}>Update Report</button>
                 </div>
              </div>

              {/* Final Clinical Assessment */}
              <div className="p3-assessment-card">
                 <div className="p3-ass-header">
                    <div className="p3-doctor-info">
                       <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" alt="Dr Elena" />
                       <div className="p3-doc-text">
                          <h3>Final Clinical Assessment</h3>
                          <p>6-Month Exit Evaluation with Dr. Elena Sterling</p>
                       </div>
                    </div>
                    <div className="p3-date-badge">DATE: NOV 24, 2023</div>
                 </div>

                 <div className="p3-checklist-area">
                    <label>REQUIREMENTS CHECKLIST</label>
                    <div className="p3-checklist-grid">
                       <div className="p3-check-item completed">
                          <div className="p3-checkbox"><Icon name="check" /></div>
                          <span>Full Allergy Panel</span>
                       </div>
                       <div className="p3-check-item">
                          <div className="p3-checkbox"></div>
                          <span>Lung Function Test</span>
                       </div>
                       <div className="p3-check-item">
                          <div className="p3-checkbox"></div>
                          <span>Long-term Care Strategy</span>
                       </div>
                       <div className="p3-check-item locked">
                          <div className="p3-checkbox"><Icon name="records" /></div>
                          <span>Post-Protocol Survey</span>
                       </div>
                    </div>
                 </div>

                 <button className="p3-btn-prepare" onClick={() => setShowFinalReviewModal(true)}>Prepare for Final Review</button>
              </div>
           </div>

           {/* Right Column */}
           <div className="p2-side-col">
              {/* Protocol Progress */}
              <div className="p3-progress-card">
                 <h3>Protocol Progress</h3>
                 <div className="p3-circle-wrap">
                    <div className="p3-circle-inner">
                       <span className="p3-percent">83%</span>
                       <span className="p3-completed-text">COMPLETED</span>
                    </div>
                    <svg className="p3-progress-svg" viewBox="0 0 100 100">
                       <circle className="bg" cx="50" cy="50" r="45" />
                       <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDashoffset: 'calc(282 - (282 * 83) / 100)' }} />
                    </svg>
                 </div>
                 <div className="p3-progress-stats">
                    <div className="p3-stat">
                       <strong>150</strong>
                       <span>DAYS IN</span>
                    </div>
                    <div className="p3-stat-divider"></div>
                    <div className="p3-stat">
                       <strong>180</strong>
                       <span>TARGET</span>
                    </div>
                 </div>
              </div>

              {/* Specialist Insight */}
              <div className="p3-insight-card">
                 <div className="p3-insight-header">
                    <Icon name="vitals" />
                    <h3>Specialist Insight</h3>
                 </div>
                 <p>"The maintenance phase is where true healing is cemented. By maintaining these gentle routines, you're training your respiratory system to remain calm in a chaotic environment. This is the bridge to permanent relief."</p>
                 <div className="p3-insight-footer">
                    <div className="p3-edit-icon"><Icon name="settings" /></div>
                    <span>DR. ELENA STERLING</span>
                 </div>
              </div>

              {/* Ducktor Says */}
              <div className="p3-ducktor-card">
                 <div className="p3-duck-icon">
                    <div className="duck-emoji">🦆</div>
                 </div>
                 <div className="p3-duck-content">
                    <label>DUCKTOR SAYS:</label>
                    <p>"Keep your humidity at 45%! Your lungs love the 'just-right' moisture for long-term health."</p>
                 </div>
              </div>
           </div>
        </div>
      </main>
      </div>

      {showRoutineModal && (
        <div className="routine-popup-overlay" onClick={() => setShowRoutineModal(false)}>
          <div className="routine-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="routine-modal-header">
               <div className="header-left-row">
                  <div className="routine-header-icon">
                     <Icon name="check" />
                  </div>
                  <div className="routine-header-text">
                     <h2>Log Maintenance Routine</h2>
                     <p>Phase 3: Stabilization Sustainment</p>
                  </div>
               </div>
               <button className="routine-close-x" onClick={() => setShowRoutineModal(false)}>×</button>
            </div>

            <div className="routine-modal-body">
               <div className="routine-patient-card">
                  <div className="p-info-left">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Alex" />
                     <div className="p-id-details">
                        <label>PATIENT ID</label>
                        <strong>Alex Rivera (AR-092)</strong>
                     </div>
                  </div>
                  <div className="p-info-right">
                     <label>CURRENT CYCLE</label>
                     <strong>Day 42 of 90</strong>
                  </div>
               </div>

               <div className="routine-checklist-section">
                  <label className="section-small-label">SUSTAINABILITY CHECKLIST</label>
                  
                  <div className="routine-check-row">
                     <div className="r-check-box"></div>
                     <div className="r-check-text">
                        <strong>Air Quality Check</strong>
                        <span>HEPA validation and sensor calibration</span>
                     </div>
                     <div className="r-check-icon-mini">💨</div>
                  </div>

                  <div className="routine-check-row">
                     <div className="r-check-box"></div>
                     <div className="r-check-text">
                        <strong>Filter Maintenance</strong>
                        <span>Scheduled inspection of primary filtration units</span>
                     </div>
                     <div className="r-check-icon-mini">▽</div>
                  </div>

                  <div className="routine-check-row active">
                     <div className="r-check-box checked">
                        <Icon name="check" />
                     </div>
                     <div className="r-check-text">
                        <strong>Hydration Target</strong>
                        <span>Daily intake protocol: 3.2 Liters</span>
                     </div>
                     <div className="r-check-icon-mini">💧</div>
                  </div>
               </div>

               <div className="routine-observations-section">
                  <div className="obs-header">
                     <label>CLINICAL OBSERVATIONS</label>
                     <span>Max 500 characters</span>
                  </div>
                  <textarea 
                     placeholder="Record any environmental triggers or physiological responses observed during maintenance..."
                     className="routine-textarea"
                  ></textarea>
               </div>

               <div className="routine-modal-footer">
                  <button className="btn-routine-discard" onClick={() => setShowRoutineModal(false)}>DISCARD</button>
                  <button className="btn-routine-save" onClick={() => {
                     setShowRoutineModal(false);
                     setShowSavedModal(true);
                  }}>
                     <Icon name="records" />
                     SAVE ROUTINE
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {showSavedModal && (
        <div className="routine-popup-overlay" onClick={() => setShowSavedModal(false)}>
          <div className="saved-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="saved-success-icon">
               <div className="icon-inner">
                  <Icon name="check" />
               </div>
            </div>
            <h2 className="saved-title">Routine Log Saved</h2>
            <p className="saved-desc">
               Your maintenance activities for today have been securely synchronized with your clinical recovery plan.
            </p>

            <div className="tasks-completed-card">
               <label>COMPLETED TODAY</label>
               
               <div className="completed-task-item">
                  <div className="task-name-icon">
                     <span>💨</span>
                     <strong>Air Quality Check</strong>
                  </div>
                  <span className="task-status verified">VERIFIED</span>
               </div>

               <div className="completed-task-item">
                  <div className="task-name-icon">
                     <span>▽</span>
                     <strong>Filter Maintenance</strong>
                  </div>
                  <span className="task-status verified">VERIFIED</span>
               </div>

               <div className="completed-task-item">
                  <div className="task-name-icon">
                     <span>💧</span>
                     <strong>Hydration Target</strong>
                  </div>
                  <span className="task-status achieved">ACHIEVED</span>
               </div>
            </div>

            <div className="saved-modal-actions">
               <button className="btn-return-dash" onClick={() => setShowSavedModal(false)}>
                  Return to Dashboard
               </button>
               <button className="btn-view-log" onClick={() => navigate('/MaintenanceLog')}>
                  View Routine Log
               </button>
            </div>

            <div className="saved-footer">
               Ref ID: MNT-092-SAVED
            </div>
          </div>
        </div>
      )}

      {showEnvironmentalModal && (
        <div className="env-modal-overlay" onClick={() => setShowEnvironmentalModal(false)}>
          <div className="env-modal-container" onClick={(e) => e.stopPropagation()}>
            {/* Left Sidebar */}
            <div className="env-modal-sidebar">
              <div className="env-sidebar-top">
                <div className="env-leaf-box">
                  <Icon name="leaf" />
                </div>
                <h2 className="env-sidebar-title">Environmental<br/>Resilience Update</h2>
                <p className="env-sidebar-desc">
                  Update your surroundings to synchronize clinical protocols.
                </p>
              </div>
              <div className="env-sidebar-bottom">
                <div className="env-secure-badge">
                  <div className="env-check-mini">
                    <Icon name="check" />
                  </div>
                  <span>SECURE LINK ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Right Main Content */}
            <div className="env-modal-main">
              <button className="env-close-btn" onClick={() => setShowEnvironmentalModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="env-content-header">
                <span className="env-label-top">PROTOCOL UPDATE</span>
                <h3 className="env-main-title">Tracker Configuration</h3>
              </div>

              <div className="env-form-body">
                {/* Pollen Levels */}
                <div className="env-input-group">
                  <label className="env-input-label">POLLEN LEVELS (PPM)</label>
                  <div className="env-pollen-input-wrapper">
                    <Icon name="pollen" />
                    <input 
                      type="text" 
                      placeholder="Enter ppm value..." 
                      className="env-pollen-input"
                      value={envData.pollen}
                      onChange={(e) => setEnvData({...envData, pollen: e.target.value})}
                    />
                    <span className="env-status-indicator low">LOW</span>
                  </div>
                </div>

                {/* Humidity */}
                <div className="env-input-group">
                  <label className="env-input-label">HUMIDITY %</label>
                  <div className="env-slider-wrapper">
                    <div className="env-slider-icon">
                      <Icon name="humidity" />
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={envData.humidity}
                      onChange={(e) => setEnvData({...envData, humidity: e.target.value})}
                      className="env-range-slider"
                    />
                    <span className="env-slider-value">{envData.humidity}%</span>
                  </div>
                </div>

                {/* Air Purifier Efficiency */}
                <div className="env-input-group">
                  <label className="env-input-label">AIR PURIFIER EFFICIENCY</label>
                  <div className="env-mode-grid">
                    <button 
                      className={`env-mode-card ${envData.mode === 'ECO' ? 'active' : ''}`}
                      onClick={() => setEnvData({...envData, mode: 'ECO'})}
                    >
                      <Icon name="eco" />
                      <span>ECO</span>
                    </button>
                    <button 
                      className={`env-mode-card ${envData.mode === 'OPTIMAL' ? 'active' : ''}`}
                      onClick={() => setEnvData({...envData, mode: 'OPTIMAL'})}
                    >
                      <Icon name="optimal" />
                      <span>OPTIMAL</span>
                    </button>
                    <button 
                      className={`env-mode-card ${envData.mode === 'TURBO' ? 'active' : ''}`}
                      onClick={() => setEnvData({...envData, mode: 'TURBO'})}
                    >
                      <Icon name="turbo" />
                      <span>TURBO</span>
                    </button>
                  </div>
                </div>

                {/* Environment Status */}
                <div className="env-status-bar">
                  <div className="env-status-left">
                    <div className="env-status-dot"></div>
                    <span>Environment Balanced</span>
                  </div>
                  <div className="env-status-right">
                    <span>LIVE SENSOR SYNC</span>
                  </div>
                </div>
              </div>

              <div className="env-footer">
                <button className="env-finalize-btn" onClick={() => setShowFinalizeModal(true)}>
                  FINALIZE REPORT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showFinalizeModal && (
        <div className="env-modal-overlay" onClick={() => setShowFinalizeModal(false)}>
          <div className="finalize-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="finalize-modal-body">
              <div className="finalize-header">
                <div className="finalize-check-circle">
                  <Icon name="check" />
                </div>
                <h2 className="finalize-title">Finalize Resilience Report</h2>
              </div>

              <p className="finalize-desc">
                You are about to securely log your environmental data to your clinical record. Please confirm the details below.
              </p>

              <div className="finalize-data-summary">
                <label className="summary-label">DATA SUMMARY</label>
                
                <div className="summary-item">
                  <div className="summary-item-left">
                    <Icon name="pollen" />
                    <span>Pollen Levels</span>
                  </div>
                  <strong className="summary-value">Low</strong>
                </div>

                <div className="summary-item">
                  <div className="summary-item-left">
                    <Icon name="humidity" />
                    <span>Humidity</span>
                  </div>
                  <strong className="summary-value">{envData.humidity}%</strong>
                </div>

                <div className="summary-item">
                  <div className="summary-item-left">
                    <Icon name="optimal" />
                    <span>Air Purifier</span>
                  </div>
                  <strong className="summary-value">{envData.mode.charAt(0) + envData.mode.slice(1).toLowerCase()}</strong>
                </div>
              </div>

              <div className="finalize-actions">
                <button className="finalize-submit-btn" onClick={() => {
                  setShowFinalizeModal(false);
                  setShowEnvironmentalModal(false);
                  setShowEnvSuccessModal(true);
                }}>
                  Submit Report <Icon name="submit" />
                </button>
                <button className="finalize-cancel-link" onClick={() => setShowFinalizeModal(false)}>
                  Cancel
                </button>
              </div>
            </div>

            <div className="finalize-footer">
              <div className="footer-hub">
                <div className="hub-dot"></div>
                <span>VAIDYAGO CLINICAL HUB</span>
              </div>
              <span className="clinician-id">Clinician ID: AR-993-PH3</span>
            </div>
          </div>
        </div>
      )}
      {showEnvSuccessModal && (
        <div className="env-modal-overlay" onClick={() => setShowEnvSuccessModal(false)}>
          <div className="env-success-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="env-success-body">
              <div className="env-success-icon-wrap">
                <div className="env-success-check">
                  <Icon name="check" />
                </div>
              </div>
              
              <h2 className="env-success-title">Resilience Report Submitted</h2>
              <p className="env-success-desc">
                Your environmental data has been securely logged and is now visible to your clinical care team. Thank you for your commitment to the Maintenance Phase.
              </p>

              <div className="env-success-info-card">
                <div className="env-info-row">
                  <span className="env-info-label">REFERENCE ID</span>
                  <strong className="env-info-value">RES-993-PH3</strong>
                </div>
                <div className="env-info-row">
                  <span className="env-info-label">TIMESTAMP</span>
                  <strong className="env-info-value">Oct 24, 2024, 10:45 AM</strong>
                </div>
              </div>

              <button className="env-success-return-btn" onClick={() => setShowEnvSuccessModal(false)}>
                Return to Dashboard
              </button>

              <div className="env-success-account">
                Account: Alex Rivera
              </div>
            </div>
          </div>
        </div>
      )}
      {showFinalReviewModal && (
        <div className="env-modal-overlay" onClick={() => setShowFinalReviewModal(false)}>
          <div className="final-review-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="final-review-modal-header">
               <div className="fr-header-text">
                  <h2 className="fr-title">Final Review Preparation</h2>
                  <p className="fr-subtitle">Complete your clinical exit requirements for the Rhinitis Recovery Protocol.</p>
               </div>
               <button className="fr-close-x" onClick={() => setShowFinalReviewModal(false)}>×</button>
            </div>

            <div className="final-review-modal-body">
               {/* Patient Progress Summary */}
               <div className="fr-progress-banner">
                  <div className="fr-patient-profile">
                     <div className="fr-avatar-wrap">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Alex Rivera" />
                        <div className="fr-verified-badge">
                           <Icon name="check" />
                        </div>
                     </div>
                     <div className="fr-patient-details">
                        <h3>Alex Rivera</h3>
                        <span>ID: AR-092</span>
                     </div>
                  </div>
                  <div className="fr-progress-track">
                     <div className="fr-track-header">
                        <label>RECOVERY PROGRESS</label>
                        <span><strong>Day 150</strong> / 180</span>
                     </div>
                     <div className="fr-progress-bar-bg">
                        <div className="fr-progress-bar-fill" style={{ width: '83%' }}></div>
                     </div>
                  </div>
               </div>

               {/* Checklist Section */}
               <div className="fr-checklist-section">
                  <label className="fr-section-label">EXIT REQUIREMENTS CHECKLIST</label>
                  
                  <div className="fr-requirement-card completed">
                     <div className="fr-req-icon-box">
                        <Icon name="check" />
                     </div>
                     <div className="fr-req-info">
                        <div className="fr-req-top">
                           <h4>Full Allergy Panel</h4>
                           <span className="fr-req-date">Aug 14, 2023</span>
                        </div>
                        <span className="fr-status-badge completed">COMPLETED</span>
                     </div>
                  </div>

                  <div className="fr-requirement-card pending">
                     <div className="fr-req-icon-box grey">
                        <Icon name="lung" />
                     </div>
                     <div className="fr-req-info">
                        <div className="fr-req-top">
                           <h4>Lung Function Test</h4>
                           <button className="fr-action-link">Schedule Now</button>
                        </div>
                        <span className="fr-status-badge pending">PENDING</span>
                     </div>
                  </div>

                  <div className="fr-requirement-card in-progress">
                     <div className="fr-req-icon-box grey">
                        <Icon name="strategy" />
                     </div>
                     <div className="fr-req-info">
                        <div className="fr-req-top">
                           <h4>Long-term Care Strategy</h4>
                           <button className="fr-action-link">Continue</button>
                        </div>
                        <span className="fr-status-badge in-progress">IN PROGRESS</span>
                     </div>
                  </div>

                  <div className="fr-requirement-card locked">
                     <div className="fr-req-icon-box locked">
                        <Icon name="lock" />
                     </div>
                     <div className="fr-req-info">
                        <div className="fr-req-top">
                           <h4 className="locked">Post-Protocol Survey</h4>
                        </div>
                        <span className="fr-locked-text">Available after Day 175</span>
                     </div>
                  </div>
               </div>

               {/* Clinical Note Box */}
               <div className="fr-clinical-note-box">
                  <div className="fr-note-header">
                     <div className="fr-info-icon">i</div>
                     <label>CLINICAL NOTE</label>
                  </div>
                  <p>
                     "Your final review with <strong>Dr. Elena Sterling</strong> is the bridge to your permanent relief. Please ensure all 'Pending' items are addressed before your Day 180 evaluation."
                  </p>
               </div>

               {/* Actions */}
               <div className="fr-modal-actions">
                  <button className="fr-btn-close" onClick={() => setShowFinalReviewModal(false)}>Close</button>
                  <button className="fr-btn-submit" onClick={() => setShowFinalReviewModal(false)}>
                     Submit Preliminary Data <Icon name="arrowRight" />
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Phase3D;
