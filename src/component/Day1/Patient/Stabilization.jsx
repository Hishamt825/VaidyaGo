import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/VADYAGO.png';
import './Stabilization.css';
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

const Stabilization = () => {
  const navigate = useNavigate();
  const [showSymptomAudit, setShowSymptomAudit] = React.useState(false);
  const [showBaselineDetails, setShowBaselineDetails] = React.useState(false);
  const [showMedicationDose, setShowMedicationDose] = React.useState(false);

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
    <div className="stab-layout">
      {/* Dynamic Sidebar - Shared with Diagnostic.jsx */}
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
            <div className="plus-circle-blue">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                 <circle cx="12" cy="12" r="10" />
                 <line x1="12" y1="8" x2="12" y2="16" />
                 <line x1="8" y1="12" x2="16" y2="12" />
               </svg>
            </div>
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
            <input type="text" placeholder="Search medications..." />
          </div>
          <div className="top-actions">
            <span>Language</span>
            <Icon name="bell" />
            <Icon name="settings" />
            <div className="user-profile-mini">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
          </div>
        </header>

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
           
           <div className="progress-card">
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
      </main>

      {showSymptomAudit && (
        <SymptomAuditPopup onClose={() => setShowSymptomAudit(false)} />
      )}

      {showBaselineDetails && (
        <BaselineTestingPopup onClose={() => setShowBaselineDetails(false)} />
      )}

      {showMedicationDose && (
        <MedicationDosePopup onClose={() => setShowMedicationDose(false)} />
      )}
    </div>
  );
};

export default Stabilization;
