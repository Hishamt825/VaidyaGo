import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/VADYAGO.png';
import './SteadyAscent.css';

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
    target: (
      <React.Fragment>
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </React.Fragment>
    ),
    trend: (
      <React.Fragment>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
      </React.Fragment>
    ),
    insight: <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />,
    calendar: (
      <React.Fragment>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </React.Fragment>
    ),
    location: (
      <React.Fragment>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
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

const SteadyAscent = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', icon: 'overview', label: 'Dashboard' },
    { id: 'symptom', icon: 'symptom', label: 'Symptom Checker' },
    { id: 'vitals', icon: 'vitals', label: 'Vitals' },
    { id: 'meds', icon: 'meds', label: 'Medications' },
    { id: 'appointments', icon: 'appointments', label: 'Appointments' },
    { id: 'messages', icon: 'messages', label: 'Messages' },
    { id: 'reminder', icon: 'reminder', label: 'REMINDER' },
    { id: 'records', icon: 'records', label: 'MY RECORDS' },
  ];

  return (
    <div className="sa-layout">
      {/* Sidebar - Same as Diagnostic.jsx */}
      <aside className="sa-sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="VaidyaGo Logo" style={{ height: '42px', width: 'auto', objectFit: 'contain' }} />
        </div>
        <nav className="sidebar-menu">
          {menuItems.map(item => (
            <div 
              key={item.id} 
              className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
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
      <main className="sa-main">
        {/* Header - Same as Diagnostic.jsx */}
        <header className="sa-header">
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

        {/* Steady Ascent Banner */}
        <section className="sa-hero">
           <div className="sa-hero-content">
              <span className="recovery-badge">RECOVERY FOCUS</span>
              <h1>Steady Ascent</h1>
              <p>Your kinetic indicators are showing consistent upward mobility. You've entered a pivotal phase of your recovery journey.</p>
           </div>
           <div className="sa-hero-stats">
              <div className="sa-stat-box">
                 <label>CONSISTENCY</label>
                 <strong>92%</strong>
              </div>
              <div className="sa-stat-box">
                 <label>PAIN INDEX</label>
                 <strong>Low</strong>
              </div>
              <div className="sa-stat-box">
                 <label>RECOVERY</label>
                 <strong>P2</strong>
              </div>
           </div>
        </section>

        {/* Content Grid */}
        <div className="sa-grid">
           {/* Left Section */}
           <div className="sa-left">
              {/* Movement Analysis Card */}
              <div className="sa-card movement-analysis">
                 <div className="card-header">
                    <div className="header-text">
                       <h3>Movement Analysis</h3>
                       <span>Tracking kinetic freedom and range</span>
                    </div>
                    <Icon name="target" className="header-icon" />
                 </div>

                 <div className="sa-metrics-row">
                    <div className="metric-item">
                       <div className="metric-header">
                          <div className="metric-title">
                             <strong>Movement Freedom</strong>
                             <span>Rotational capacity index</span>
                          </div>
                          <span className="metric-val">78%</span>
                       </div>
                       <div className="sa-progress-bar">
                          <div className="sa-progress-fill teal" style={{ width: '78%' }}></div>
                       </div>
                       <div className="metric-trend improved">
                          <Icon name="trend" className="trend-icon" />
                          <span>Improved since last assessment (+12%)</span>
                       </div>
                    </div>

                    <div className="metric-item">
                       <div className="metric-header">
                          <div className="metric-title">
                             <strong>Neck Sensitivity</strong>
                             <span>Inflammation tracking level</span>
                          </div>
                          <span className="metric-val red">4<small>/10</small></span>
                       </div>
                       {/* Bar chart visualization */}
                       <div className="sa-bar-chart">
                          {[6, 5, 8, 4, 3, 2, 1].map((h, i) => (
                             <div key={i} className="chart-bar" style={{ height: `${h * 10}%`, opacity: i < 4 ? 0.3 : 1 }}></div>
                          ))}
                       </div>
                       <div className="metric-trend highlight">
                          <Icon name="trend" className="trend-icon rotate-180" />
                          <span>Decreasing inflammation detected (-20%)</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Recent Recovery Milestones Card */}
              <div className="sa-card milestones">
                 <h3>Recent Recovery Milestones</h3>
                 <div className="milestones-list">
                    <div className="milestone-item">
                       <div className="milestone-icon check"><Icon name="check" /></div>
                       <div className="milestone-text">
                          <strong>Full Extension Achievement</strong>
                          <p>Reached 180° range of motion during the morning clinic session.</p>
                       </div>
                       <span className="milestone-date">OCT 24, <br/> 2023</span>
                    </div>
                    <div className="milestone-item">
                       <div className="milestone-icon water">💧</div>
                       <div className="milestone-text">
                          <strong>Inflammation Breakthrough</strong>
                          <p>Zero fluid retention detected in the primary thoracic joint cluster.</p>
                       </div>
                       <span className="milestone-date">OCT 20, <br/> 2023</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right Section */}
           <div className="sa-right">
              {/* Patient Insights */}
              <div className="sa-card insights">
                 <div className="card-header">
                    <Icon name="insight" className="header-icon-mini" />
                    <h3>Patient Insights</h3>
                 </div>
                 <div className="insights-list">
                    <div className="insight-item">
                       <div className="insight-bullet">📍</div>
                       <p>Morning stiffness has reduced by 45 minutes on average.</p>
                    </div>
                    <div className="insight-item">
                       <div className="insight-bullet">✅</div>
                       <p>Exercise adherence is at an all-time high (98% completion).</p>
                    </div>
                    <div className="insight-item">
                       <div className="insight-bullet">👁️</div>
                       <p>Visual postural alignment shows 5mm cervical correction.</p>
                    </div>
                 </div>
              </div>

              {/* Next Consultation Card */}
              <div className="sa-consultation-card">
                 <label className="section-label">NEXT CONSULTATION</label>
                 <div className="doctor-profile">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Erik" alt="Dr Aris" />
                    <div className="doc-info">
                       <strong>Dr. Aris Thorne</strong>
                       <span>Orthopedic Rehabilitation</span>
                    </div>
                 </div>
                 <div className="consult-details">
                    <div className="detail-item">
                       <Icon name="calendar" />
                       <span>Thursday, Nov 2nd • 10:30 AM</span>
                    </div>
                    <div className="detail-item">
                       <Icon name="location" />
                       <span>Central Wellness Wing, Floor 4</span>
                    </div>
                 </div>
                 <div className="consult-actions">
                    <button className="btn-checkin">Check-in</button>
                    <button className="btn-reschedule">Reschedule</button>
                 </div>
              </div>
           </div>
        </div>

        {/* Footer */}
        <footer className="sa-footer">
           <p>Powered by <strong>VaidyaGo Intelligence</strong> • Personal Recovery Metrics Engine v4.2</p>
        </footer>
      </main>
    </div>
  );
};

export default SteadyAscent;
