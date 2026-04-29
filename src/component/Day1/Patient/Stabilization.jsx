import React from 'react';
import { useNavigate } from 'react-router-dom';
import patientPhoto from '../../../assets/Patient Photo.svg';
import './Stabilization.css';
import Sidebar from '../../../components/Patient/Patient_sidebar';
import Profile from '../../../components/Patient/Profile';
import Account from '../../../components/Patient/Account';
import Notification from '../../../components/Patient/notification';
import SymptomAuditPopup from './SymptomAuditPopup';
import BaselineTestingPopup from './BaselineTestingPopup';
import MedicationDosePopup from './MedicationDosePopup';

const Icon = ({ name, className }) => {
  const icons = {
    overview: (
      <React.Fragment>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </React.Fragment>
    ),
    symptom: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    vitals: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    meds: (
      <React.Fragment>
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
        <path d="m8.5 8.5 7 7" />
      </React.Fragment>
    ),
    appointments: (
      <React.Fragment>
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
      </React.Fragment>
    ),
    messages: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />,
    reminder: <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />,
    records: <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />,
    search: (
      <React.Fragment>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </React.Fragment>
    ),
    bell: <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />,
    settings: (
      <React.Fragment>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </React.Fragment>
    ),
    check: <polyline points="20 6 9 17 4 12" />,
    lock: (
      <React.Fragment>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </React.Fragment>
    )
  };

  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      width="20"
      height="20"
    >
      {icons[name] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};

const Stabilization = () => {
  const navigate = useNavigate();
  const [showSymptomAudit, setShowSymptomAudit] = React.useState(false);
  const [showBaselineDetails, setShowBaselineDetails] = React.useState(false);
  const [showMedicationDose, setShowMedicationDose] = React.useState(false);
  const [showProgressDetails, setShowProgressDetails] = React.useState(false);
  const [showMilestonePopup, setShowMilestonePopup] = React.useState(false);
  const [showPhase2Overview, setShowPhase2Overview] = React.useState(false);
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
      <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden ${activeModal || isNotificationOpen ? 'blur-[4px] scale-[0.98] pointer-events-none' : ''}`}>
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
        <div className="stab-page-content">
        {/* Phase Header */}
        <section className="phase-hero-section">
           <div className="phase-header-info">
             <div className="phase-top-badge">
               <span className="active-phase">ACTIVE PHASE • WEEKS 1-4</span>
               <span className="phase-dot"></span>
               <span className="protocol-name">Rhinitis Recovery Protocol</span>
             </div>
             <h1>Phase 1: Stabilization - Getting Started</h1>
             <p>Focus on acute symptom control and establishing a baseline of comfort.</p>
           </div>
           
           <div className="progress-card" onClick={() => setShowProgressDetails(true)} style={{ cursor: 'pointer' }}>
              <div className="progress-header">
                 <label>CURRENT PROGRESS</label>
                 <span>3%</span>
              </div>
              <h3>Day 1 <small>of 28</small></h3>
              <div className="progress-bar-container">
                 <div className="progress-bar-fill" style={{ width: '3%' }}></div>
                 <div className="progress-dot" style={{ left: '3%' }}></div>
              </div>
           </div>
        </section>

        <div className="stab-content-grid">
           {/* Left Actions Column */}
           <div className="stab-actions-col">
              <h2 className="section-subtitle">KEY ACTIONS FOR THIS PHASE</h2>
              
              <div className="action-item-card">
                 <div className="action-icon-box aqua">
                    <Icon name="overview" />
                 </div>
                 <div className="action-info">
                    <h3>Symptom Audit</h3>
                    <p>Log daily symptoms to identify peaks and triggers.</p>
                    <div className="action-tags">
                       <span className="tag-daily">🕒 DAILY</span>
                       <span className="tag-impact red">HIGH IMPACT</span>
                    </div>
                 </div>
                 <button className="action-btn-primary" onClick={() => setShowSymptomAudit(true)}>Log Entry</button>
              </div>

              <div className="action-item-card">
                 <div className="action-icon-box blue">
                    <Icon name="vitals" />
                 </div>
                 <div className="action-info">
                    <h3>Baseline Testing</h3>
                    <p>Complete initial peak flow and allergen sensitivity checks.</p>
                    <div className="action-tags">
                       <span className="tag-due">📅 DUE TOMORROW</span>
                       <span className="tag-type">DIAGNOSTIC</span>
                    </div>
                 </div>
                 <button className="action-btn-outline" onClick={() => setShowBaselineDetails(true)}>View Details</button>
              </div>

              <div className="action-item-card critical">
                 <div className="action-icon-box teal">
                    <Icon name="meds" />
                 </div>
                 <div className="action-info">
                    <h3>Medication Initiation</h3>
                    <p>Start non-sedating antihistamines and nasal corticosteroids as prescribed.</p>
                    <div className="action-tags">
                       <span className="tag-critical">⚠️ CRITICAL PATH</span>
                       <span className="tag-rx">💊 2 RX ITEMS</span>
                    </div>
                 </div>
                 <button className="action-btn-dark" onClick={() => setShowMedicationDose(true)}>Confirm Dose</button>
              </div>
           </div>

           {/* Right Sidebar Column */}
           <div className="stab-side-col">
              {/* Specialist Card */}
              <div className="side-card specialist-card">
                 <div className="expert-profile">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" alt="Dr Elena" />
                    <div>
                       <strong>Dr. Elena Sterling</strong>
                       <span>LEAD IMMUNOLOGIST</span>
                    </div>
                 </div>
                 <div className="specialist-quote">
                    <label>SPECIALIST INSIGHT</label>
                    <p>"Consistency in the first 2 weeks is key to reducing long-term inflammation. Don't miss the nasal corticosteroid doses even if you feel fine."</p>
                 </div>
              </div>

              {/* Phase Focus Card */}
              <div className="side-card focus-card">
                 <h3>Phase Focus</h3>
                 <ul className="focus-list">
                    <li><Icon name="check" className="check-icon" /> Reduce mucous membrane swelling</li>
                    <li><Icon name="check" className="check-icon" /> Identify 3 primary environmental triggers</li>
                    <li><Icon name="check" className="check-icon" /> Establish sleep-breathing baseline</li>
                 </ul>
                 
                 <div className="upcoming-phase">
                    <label>UPCOMING NEXT PHASE</label>
                    <div className="next-phase-box">
                       <div className="phase-dot-outline"></div>
                       <span>Phase 2: Desensitization</span>
                    </div>
                 </div>
              </div>

              {/* Help Card */}
              <div className="side-card help-card">
                 <h3>Need Help?</h3>
                 <p>Our clinical care team is available 24/7 for stabilization support.</p>
                 <button className="chat-btn">CHAT WITH SPECIALIST</button>
              </div>
           </div>
        </div>
        </div>
      </main>
      </div>

      {showProgressDetails && (
        <div className="progress-popup-overlay" onClick={() => setShowProgressDetails(false)}>
          <div className="progress-modal" onClick={(e) => e.stopPropagation()}>
            <div className="progress-modal-header">
              <div className="header-info">
                <h3>Current Clinical Progress</h3>
                <span>Patient Recovery Tracking • 180-Day Protocol</span>
              </div>
              <button className="close-x" onClick={() => setShowProgressDetails(false)}>×</button>
            </div>

            <div className="progress-modal-hero">
              <div className="progress-circle-wrap">
                <svg viewBox="0 0 100 100" className="circular-progress">
                   <circle className="bg" cx="50" cy="50" r="45" />
                   <circle className="fg" cx="50" cy="50" r="45" style={{ strokeDasharray: '283', strokeDashoffset: 'calc(283 - (283 * 3) / 100)' }} />
                   <text x="50" y="50" className="pct">3%</text>
                </svg>
              </div>
              <div className="hero-text">
                <label>OVERALL COMPLETION</label>
                <h2>Day 1 of 28</h2>
                <span>Phase 1: Stabilization Journey</span>
              </div>
            </div>

            <div className="progress-modal-body">
              <div className="section-label">RECOVERY PHASES</div>
              
              <div className="phase-item active" onClick={() => setShowMilestonePopup(true)} style={{ cursor: 'pointer' }}>
                <div className="phase-status-icon"><Icon name="check" /></div>
                <div className="phase-details">
                  <h4>Phase 1: Stabilization</h4>
                  <p>Day 1/28 — Initial physiological balancing</p>
                </div>
                <span className="phase-badge active">ACTIVE</span>
              </div>

              <div className="phase-item upcoming">
                <div className="phase-status-icon empty"></div>
                <div className="phase-details">
                  <h4>Phase 2: Desensitization</h4>
                </div>
                <span className="phase-badge upcoming">UPCOMING</span>
              </div>

              <div className="phase-item locked">
                <div className="phase-status-icon lock"><Icon name="lock" /></div>
                <div className="phase-details">
                  <h4>Phase 3: Maintenance</h4>
                </div>
                <span className="phase-badge locked">LOCKED</span>
              </div>

              <div className="milestones-box">
                 <div className="milestone-title">
                   <Icon name="overview" /> ACTIVE MILESTONES (PHASE 1)
                 </div>
                 <div className="milestone-grid">
                   <div className="m-item active"><span className="m-dot"></span> Symptom Baseline</div>
                   <div className="m-item active"><span className="m-dot"></span> Medication Initiation</div>
                   <div className="m-item"><span className="m-dot"></span> Metabolic Panel</div>
                   <div className="m-item"><span className="m-dot"></span> Stability Check</div>
                 </div>
              </div>
            </div>

            <div className="progress-modal-footer">
              <button className="roadmap-link">View Full Roadmap →</button>
              <button className="close-btn-main" onClick={() => setShowProgressDetails(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showSymptomAudit && (
        <SymptomAuditPopup onClose={() => setShowSymptomAudit(false)} />
      )}

      {showBaselineDetails && (
        <BaselineTestingPopup onClose={() => setShowBaselineDetails(false)} />
      )}

      {showMedicationDose && (
        <MedicationDosePopup onClose={() => setShowMedicationDose(false)} />
      )}
      {showMilestonePopup && (
        <div className="progress-popup-overlay" onClick={() => setShowMilestonePopup(false)}>
          <div className="milestone-modal" onClick={(e) => e.stopPropagation()}>
            <div className="milestone-content">
               <div className="milestone-success-icon">
                 <div className="icon-inner">
                    <Icon name="check" />
                 </div>
                 <div className="sparkle s1">✨</div>
                 <div className="sparkle s2">⭐</div>
                 <div className="sparkle s3">🎉</div>
               </div>

               <div className="milestone-top-tag">PHASE 1: STABILIZATION COMPLETE</div>
               <h1 className="milestone-title-main">Stabilization Milestone Reached!</h1>
               <p className="milestone-desc">
                 Exceptional progress, <strong>Alex Rivera</strong>. You've established the foundation required for the next stage of your clinical journey.
               </p>

               <div className="milestone-stats-row">
                 <div className="m-stat-card">
                    <div className="m-stat-icon"><Icon name="appointments" /></div>
                    <div className="m-stat-info">
                       <label>CONSISTENCY</label>
                       <strong>28 Days</strong>
                       <span>Daily symptom logging</span>
                    </div>
                 </div>
                 <div className="m-stat-card">
                    <div className="m-stat-icon teal"><Icon name="overview" /></div>
                    <div className="m-stat-info">
                       <label>EQUILIBRIUM</label>
                       <strong>Stability</strong>
                       <span>Core metrics achieved</span>
                    </div>
                 </div>
               </div>

               <div className="verification-area">
                  <div className="wave-bg"></div>
                  <div className="verify-line"></div>
                  <div className="verify-label">FOUNDATION VERIFIED 100%</div>
               </div>

               <button className="begin-phase-btn" onClick={() => setShowPhase2Overview(true)}>
                 Begin Phase 2: Desensitization
               </button>
            </div>
            
            <div className="milestone-footer">
               <div className="footer-brand">
                  <Icon name="records" />
                  <span>The Clinical Sanctuary</span>
               </div>
            </div>
          </div>
        </div>
      )}
      {showPhase2Overview && (
        <div className="progress-popup-overlay" onClick={() => setShowPhase2Overview(false)}>
          <div className="phase2-modal" onClick={(e) => e.stopPropagation()}>
            <div className="phase2-modal-header">
               <div className="logo-text">VaidyaGo</div>
               <button className="phase2-close" onClick={() => setShowPhase2Overview(false)}>×</button>
            </div>
            
            <div className="phase2-modal-content">
               <div className="phase2-badge">PHASE 2 INITIATION</div>
               <h1 className="phase2-title">Phase 2: Desensitization Overview</h1>
               <p className="phase2-subtitle">Transitioning from stabilization to building long-term environmental and clinical resilience.</p>

               <div className="phase2-grid">
                  <div className="phase2-left-col">
                     <div className="overview-item-card">
                        <div className="item-icon"><Icon name="meds" /></div>
                        <div className="item-info">
                           <strong>Immunotherapy Escalation</strong>
                           <span>Gradually increasing exposure to build immunity.</span>
                        </div>
                     </div>
                     <div className="overview-item-card">
                        <div className="item-icon"><Icon name="symptom" /></div>
                        <div className="item-info">
                           <strong>Environmental Resilience</strong>
                           <span>Advanced trigger tracking and management.</span>
                        </div>
                     </div>
                     <div className="overview-item-card">
                        <div className="item-icon"><Icon name="records" /></div>
                        <div className="item-info">
                           <strong>Clinical Oversight</strong>
                           <span>Bi-weekly specialist reviews.</span>
                        </div>
                     </div>
                  </div>

                  <div className="phase2-right-col">
                     <div className="duration-info">
                        <label>DURATION</label>
                        <h2>Months 2 - 4</h2>
                     </div>

                     <div className="quote-box-mini">
                        <div className="quote-icon-large">“</div>
                        <p>Phase 2 is the most critical part of your sanctuary journey. Consistency here yields lifelong results.</p>
                        <div className="expert-mini-profile">
                           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" alt="Dr Sterling" />
                           <div className="expert-mini-text">
                              <strong>Dr. Sterling</strong>
                              <span>LEAD IMMUNOLOGIST</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <button className="activate-phase-btn" onClick={() => navigate('/Phase2D')}>
                  Activate Phase 2
               </button>
            </div>
          </div>
        </div>
      )}
      {activeModal === 'profile' && (
        <Profile
          onClose={() => setActiveModal(null)}
          onAccountSettings={() => setActiveModal('account')}
        />
      )}
      {activeModal === 'account' && (
        <Account onClose={() => setActiveModal(null)} />
      )}
      {isNotificationOpen && <Notification onClose={() => setIsNotificationOpen(false)} />}
    </div>
  );
};

export default Stabilization;
