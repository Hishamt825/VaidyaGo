import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/VADYAGO.png';
import './CarePlan.css';

const Icon = ({ name, className, size = 20 }) => {
  const icons = {
    overview: (
      <React.Fragment>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </React.Fragment>
    ),
    meds: (
      <React.Fragment>
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
        <path d="m8.5 8.5 7 7" />
      </React.Fragment>
    ),
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
    bag: (
      <React.Fragment>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
      </React.Fragment>
    ),
    check: <polyline points="20 6 9 17 4 12" />,
    access: (
      <React.Fragment>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </React.Fragment>
    )
  };

  return (
    <svg 
      className={className} 
      width={size}
      height={size}
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {icons[name] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};

const CarePlan = () => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', icon: 'overview', label: 'Dashboard' },
    { id: 'symptom', icon: 'overview', label: 'Symptom Checker' },
    { id: 'vitals', icon: 'overview', label: 'Vitals' },
    { id: 'meds', icon: 'meds', label: 'Medications' },
    { id: 'appointments', icon: 'overview', label: 'Appointments' },
    { id: 'messages', icon: 'messages', label: 'Messages' },
    { id: 'careplan', icon: 'overview', label: 'Care Plan', active: true },
    { id: 'records', icon: 'records', label: 'MY RECORDS' },
  ];

  const roadmapPhases = [
    {
      number: 1,
      title: 'Phase 1: Stabilization',
      time: 'Weeks 1-4',
      desc: 'Initial focus on acute symptom control using non-sedating antihistamines and nasal corticosteroids to establish a baseline of comfort.',
      tags: ['SYMPTOM AUDIT', 'BASELINE TESTING'],
      color: '#1a2b4b'
    },
    {
      number: 2,
      title: 'Phase 2: Building Immunity',
      time: 'Months 2-4',
      desc: 'Induction phase of sublingual immunotherapy (SLIT). We gradually introduce allergen extracts to retrain your immune system\'s response.',
      tags: ['DOSE ESCALATION', 'IMMUNE MONITORING'],
      color: '#14b8a6'
    },
    {
      number: 3,
      title: 'Phase 3: Long-term Health',
      time: 'Months 5-6',
      desc: 'Transition to maintenance therapy combined with strategic allergen avoidance and environmental optimizations.',
      tags: ['MAINTENANCE', 'PEAK FLOW TRACKING'],
      color: '#4db8c0'
    }
  ];

  return (
    <div className="cp-container">
      {/* Shared Sidebar */}
      <aside className="diagnostic-sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="VaidyaGo Logo" style={{ height: '42px', width: 'auto' }} />
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
      <main className="cp-main">
        {/* Shared Header */}
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

        {/* Hero Section */}
        <section className="cp-hero">
          <div className="hero-badge">
             <div className="badge-icon">
                <Icon name="access" size={16} />
             </div>
             <span>CLINICAL SANCTUARY ACCESS</span>
          </div>
          <h1>Welcome to Your Personalized Care Plan</h1>
          <p>Alex, we've analyzed your seasonal allergen sensitivities to craft a path toward respiratory freedom.</p>
        </section>

        <div className="cp-content-grid">
          {/* Left Column */}
          <div className="cp-left-col">
            <div className="cp-card protocol-card">
              <div className="card-top">
                <div className="protocol-icon">
                  <Icon name="bag" size={24} />
                </div>
                <span className="active-badge">PLAN ACTIVE</span>
              </div>
              <h3>Rhinitis Recovery Protocol</h3>
              <div className="protocol-meta">
                <span className="meta-time">🕒 6-month estimated duration</span>
              </div>
              <div className="meta-table">
                <div className="meta-row">
                  <label>Focus Area</label>
                  <strong>Seasonal Allergies</strong>
                </div>
                <div className="meta-row">
                  <label>Severity</label>
                  <strong className="severity-text">Moderate-Controlled</strong>
                </div>
              </div>
            </div>

            <div className="cp-card responsibilities-card">
              <div className="resp-header">
                <div className="check-outer">
                   <Icon name="check" size={14} className="teal-text" />
                </div>
                <h3>Patient Responsibilities</h3>
              </div>
              <ul className="resp-list">
                <li>Daily logging of symptoms and triggers in the Sanctuary app.</li>
                <li>Strict adherence to the induction dosage schedule.</li>
                <li>Weekly check-ins with your care coordinator.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Roadmap */}
          <div className="cp-right-col">
            <div className="cp-card roadmap-card">
              <h2>Roadmap to Recovery</h2>
              <div className="roadmap-timeline">
                {roadmapPhases.map((phase, idx) => (
                  <div key={idx} className="roadmap-item">
                    <div className="timeline-left">
                      <div className="phase-number" style={{ background: phase.color }}>{phase.number}</div>
                      {idx !== roadmapPhases.length - 1 && <div className="timeline-line"></div>}
                    </div>
                    <div className="phase-content">
                      <div className="phase-header">
                        <h4>{phase.title}</h4>
                        <span className="phase-time">{phase.time}</span>
                      </div>
                      <p>{phase.desc}</p>
                      <div className="phase-tags">
                        {phase.tags.map(tag => (
                          <span key={tag} className="phase-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action Card */}
            <div className="cp-footer-card">
              <div className="footer-text">
                <h3>Ready to start?</h3>
                <p>Reviewing your plan is the first step toward lasting wellness.</p>
              </div>
              <button className="start-plan-btn" onClick={() => navigate('/Stabilization')}>
                start plan
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarePlan;
