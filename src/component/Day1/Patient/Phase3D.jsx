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
      <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden ${isNotificationOpen || showRoutineModal || showSavedModal || activeModal ? 'blur-[4px] scale-[0.98] pointer-events-none' : ''}`}>
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
                    <button className="p3-btn-update">Update Report</button>
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

                 <button className="p3-btn-prepare">Prepare for Final Review</button>
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

             <h2 className="saved-title">Maintenance Routine Saved</h2>
             <p className="saved-desc">
                Your daily sustainability tasks have been securely logged for <strong>Day 42 of 90</strong>. Great job staying consistent with your protocol!
             </p>

             <div className="tasks-completed-card">
                <label>TASKS COMPLETED</label>
                <div className="completed-task-item">
                   <div className="task-name-icon">
                      <span>💨</span>
                      <strong>Air Quality Check</strong>
                   </div>
                   <span className="task-status verified">Verified</span>
                </div>
                <div className="completed-task-item">
                   <div className="task-name-icon">
                      <span>💧</span>
                      <strong>Hydration Target</strong>
                   </div>
                   <span className="task-status achieved">Achieved (3.2L)</span>
                </div>
             </div>

             <div className="saved-modal-actions">
                <button className="btn-return-dash" onClick={() => setShowSavedModal(false)}>Return to Dashboard</button>
                <button className="btn-view-log" onClick={() => navigate('/MaintenanceLog')}>View Maintenance Log</button>
             </div>

             <div className="saved-footer">
                <span>👤 Logged for: Alex Rivera (AR-092)</span>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Phase3D;
