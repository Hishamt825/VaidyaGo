import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/VADYAGO.png';
import './Phase2D.css';
import ImmunotherapyDosePopup from './ImmunotherapyDosePopup';
import AllergenAvoidancePopup from './AllergenAvoidancePopup';
import ProtocolProgressPopup from './ProtocolProgressPopup';

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
    check: <polyline points="20 6 9 17 4 12" />
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

const Phase2D = () => {
  const navigate = useNavigate();
  const [showDosePopup, setShowDosePopup] = React.useState(false);
  const [showAllergenPopup, setShowAllergenPopup] = React.useState(false);
  const [showProtocolPopup, setShowProtocolPopup] = React.useState(false);

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

  return (
    <div className="phase2-layout">
      {/* Sidebar - Shared with Diagnostic.jsx */}
      <aside className="diagnostic-sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="VaidyaGo Logo" style={{ height: '42px', width: 'auto', objectFit: 'contain' }} />
        </div>
        <nav className="sidebar-menu">
          {menuItems.map(item => (
            <div key={item.id} className={`menu-item ${item.active ? 'active' : ''}`} onClick={() => item.id === 'dashboard' && navigate('/Diagnostic')}>
              <div className="menu-icon-wrapper">
                <Icon name={item.icon} />
              </div>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="new-consultation-btn">
             <div className="plus-circle-blue">+</div>
             <span>New Consultation</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="diagnostic-main">
        {/* Header - Shared with Diagnostic.jsx */}
        <header className="top-header">
          <div className="search-bar">
            <Icon name="search" />
            <input type="text" placeholder="Search insights..." />
          </div>
          <div className="top-actions">
            <Icon name="bell" />
            <Icon name="settings" />
            <div className="user-profile-mini">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
          </div>
        </header>

        {/* Phase Header */}
        <section className="phase-hero-alt">
           <div className="p-header-left">
              <div className="p-tag-row">
                 <span className="p-active-badge">PHASE 2 ACTIVE</span>
                 <span className="p-protocol-tag">· Rhinitis Recovery Protocol</span>
              </div>
              <h1>Phase 2: Desensitization - <span className="text-teal">Building Immunity</span></h1>
              <p className="p-subtitle">Months 2-4: Focused on gradual allergen exposure and long-term stabilization.</p>
           </div>
           <div className="p-header-right">
              <button className="btn-protocol-outline">View Protocol</button>
              <button className="btn-emergency-contact">Emergency Contact</button>
           </div>
        </section>

        <div className="p2-content-grid">
           {/* Left Main Stream */}
           <div className="p2-main-col">
              <div className="p2-action-grid">
                 {/* Card 1 */}
                 <div className="p2-action-card">
                    <div className="p2-card-icon medicine">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M10 2l10 10l-1.5 1.5L8.5 3.5L10 2z"/><path d="M7 5l5 5"/><path d="M4 8l5 5"/><path d="M2.5 9.5l3 3"/>
                       </svg>
                    </div>
                    <h3>Immunotherapy Escalation</h3>
                    <p>Systematic exposure increase scheduled for Weeks 5-12. Track your daily reaction levels carefully.</p>
                    <div className="p2-card-footer">
                       <span className="p2-card-tag">WEEK 6 OF 12</span>
                       <button className="p2-btn-dark" onClick={() => setShowDosePopup(true)}>Log Dose</button>
                    </div>
                 </div>

                 {/* Card 2 */}
                 <div className="p2-action-card">
                    <div className="p2-card-icon air">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                       </svg>
                    </div>
                    <h3>Allergen Avoidance</h3>
                    <p>Weekly environmental review and HEPA filter maintenance log for clinical oversight.</p>
                    <div className="p2-card-footer">
                       <span className="p2-card-tag">NEXT DUE: SAT</span>
                       <button className="p2-btn-teal" onClick={() => setShowAllergenPopup(true)}>Update Log</button>
                    </div>
                 </div>
              </div>

              <div className="p2-review-banner">
                 <div className="review-content">
                    <label className="review-milestone">CLINICAL MILESTONE</label>
                    <h2 className="review-title">Monthly Progress Review</h2>
                    <p className="review-desc">Detailed clinical touchpoint to assess immunological response and adjust dosage curves.</p>
                    <button className="btn-schedule-visit">Schedule Clinical Visit</button>
                 </div>
                 <div className="review-illustration-wrap">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Doctor" alt="Clinician" className="doctor-img" />
                 </div>
              </div>

              {/* Recovery Trajectory */}
              <div className="p2-trajectory-section">
                 <div className="t-header">
                    <h3>Recovery Trajectory</h3>
                    <span className="t-est">Estimated Completion: Sept 2024</span>
                 </div>
                 <div className="t-timeline-box">
                    <div className="t-line-bg"></div>
                    <div className="t-progress-fill" style={{ width: '40%' }}></div>
                    <div className="t-markers">
                       <div className="t-marker active" style={{ left: '10%' }}>
                          <div className="t-label">PHASE 1</div>
                       </div>
                       <div className="t-marker current" style={{ left: '40%' }}>
                          <div className="t-dot"></div>
                          <div className="t-label">CURRENT</div>
                       </div>
                       <div className="t-marker disabled" style={{ left: '70%' }}>
                          <div className="t-label">PHASE 3</div>
                       </div>
                       <div className="t-marker disabled" style={{ left: '95%' }}>
                          <div className="t-label">PHASE 4</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right Column */}
           <div className="p2-side-col">
              {/* Protocol Progress */}
              <div className="p2-side-card progress" onClick={() => setShowProtocolPopup(true)} style={{ cursor: 'pointer' }}>
                 <label>PROTOCOL PROGRESS</label>
                 <div className="p-days">
                    <span className="p-huge">30</span>
                    <span className="p-total">/ 180 Days</span>
                 </div>
                 <p className="p-percentage">17% of total treatment completed</p>
                 <div className="p-progress-bar-wrap">
                    <div className="p-bar-fill" style={{ width: '17%' }}></div>
                 </div>
              </div>

              {/* Specialist Insight */}
              <div className="p2-side-card specialist">
                 <div className="s-header">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" alt="Elena" />
                    <div className="s-name">
                       <label>SPECIALIST INSIGHT</label>
                       <strong>Dr. Elena Sterling</strong>
                    </div>
                 </div>
                 <p className="s-quote">
                    "The desensitization phase is where the biological foundation of your long-term immunity is built. Consistency in daily micro-dosing isn't just a rule — it's the core of the sanctuary we are building for your respiratory health."
                 </p>
                 <div className="s-footer">
                    <span className="consistency-tag">✨ CONSISTENCY IS KEY</span>
                 </div>
              </div>

              {/* Phase Focus */}
              <div className="p2-side-card focus">
                 <h3>Phase Focus</h3>
                 <ul className="focus-list-alt">
                    <li>
                       <Icon name="check" className="c-icon" />
                       <span>Gradual allergen exposure <small>Controlled increases weekly</small></span>
                    </li>
                    <li>
                       <Icon name="check" className="c-icon" />
                       <span>Reduced rescue medication need <small>Tracking antihistamine doses</small></span>
                    </li>
                    <li>
                       <Icon name="check" className="c-icon" />
                       <span>Improved quality of life <small>Sleep and focus metrics</small></span>
                    </li>
                 </ul>
              </div>
           </div>
        </div>
      </main>

      {showDosePopup && <ImmunotherapyDosePopup onClose={() => setShowDosePopup(false)} />}
      {showAllergenPopup && <AllergenAvoidancePopup onClose={() => setShowAllergenPopup(false)} />}
      {showProtocolPopup && <ProtocolProgressPopup onClose={() => setShowProtocolPopup(false)} />}
    </div>
  );
};

export default Phase2D;
