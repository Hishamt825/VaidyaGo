import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Diagnostic.css';

const Icon = ({ name, className }) => {
  const icons = {
    overview: <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />,
    symptom: <path d="M11 2a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 0-2 2v4a8 8 0 0 0 16 0v-4a2 2 0 0 0-2-2 2 2 0 0 1-2-2V4a2 2 0 0 0-2-2h-4z" />,
    vitals: <path d="M3 12h3l3-9 4 18 4-9h4" />,
    meds: <path d="M9 2h6v2H9V2zm-2 4h10v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6zm3 8h4m-2-2v4" />,
    appointments: <React.Fragment><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18" /></React.Fragment>,
    messages: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />,
    book: <path d="M20 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zM4 17V7h16v10H4zM7 9h2v2H7V9zm0 4h2v2H7v-2zm4-4h6v2h-6V9zm0 4h6v2h-6v-2z" />,
    pharmacy: <path d="M12 2v20M5 12h14" />,
    video: <React.Fragment><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2" /></React.Fragment>
  };

  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {icons[name] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};

const Diagnostic = () => {
  const navigate = useNavigate();
  const menuItems = [
    { id: 'dashboard', icon: 'overview', label: 'Dashboard', active: true },
    { id: 'symptom', icon: 'symptom', label: 'Symptom Checker' },
    { id: 'vitals', icon: 'vitals', label: 'Vitals' },
    { id: 'meds', icon: 'meds', label: 'Medications' },
    { id: 'appointments', icon: 'appointments', label: 'Appointments' },
    { id: 'messages', icon: 'messages', label: 'Messages' },
    { id: 'reminder', icon: 'appointments', label: 'REMINDER' },
    { id: 'records', icon: 'book', label: 'MY RECORDS' },
  ];

  const conditions = [
    { title: 'Tension-Type Headache', match: 85, desc: 'Most common primary headache disorder, often characterized by a pressing or tightening sensation around the head of mild to moderate intensity.' },
    { title: 'Seasonal Allergies (Rhinitis)', match: 62, desc: 'Hypersensitivity reaction to environmental triggers such as pollen or mold, contributing to sinus pressure and subsequent cephalalgia.' },
    { title: 'Cervicogenic Headache', match: 48, desc: 'Pain referred from a source in the cervical spine and its component bony, disc and/or soft tissue elements, usually accompanied by neck pain.' }
  ];

  return (
    <div className="diagnostic-layout">
      {/* Dynamic Sidebar */}
      <aside className="diagnostic-sidebar">
        <div className="sidebar-logo">
          <div className="logo-wrapper">
            <div className="logo-v">V</div>
            <div className="logo-a">
              <svg className="leaf-icon" viewBox="0 0 24 24" fill="#fff"><path d="M12 22s-2-5-2-9c0-4 2-8 2-8s2 4 2 8c0 4-2 9-2 9zM7 18s0-5 3-7c0 0-3-1-4-4 0 0-1 4 1 11zM17 18s0-5-3-7c0 0 3-1 4-4 0 0 1 4-1 11z"/></svg>
              <span>A</span>
            </div>
            <div className="logo-d">D</div>
            <div className="logo-y">y</div>
            <div className="logo-small-a">a</div>
            <div className="logo-g">G</div>
            <div className="logo-o">o</div>
            <svg className="logo-stethoscope" viewBox="0 0 100 50" fill="none" stroke="#fff" strokeWidth="3">
              <path d="M30 10 Q 30 40 50 40 Q 70 40 70 10" />
              <circle cx="30" cy="8" r="3" fill="#1db1c2" />
              <circle cx="70" cy="8" r="3" fill="#1db1c2" />
              <circle cx="50" cy="45" r="4" fill="#1db1c2" stroke="#fff" strokeWidth="1" />
            </svg>
          </div>
        </div>
        
        <nav className="sidebar-menu">
          {menuItems.map(item => (
            <a key={item.id} href={`#${item.id}`} className={`menu-item ${item.active ? 'active' : ''}`}>
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <button className="new-consultation-btn">
            <svg className="plus-circle-svg" viewBox="0 0 24 24" fill="none" stroke="#0d2137" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <span>New Consultation</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="diagnostic-main">
        {/* Header */}
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

        {/* Diagnostic Hero Section */}
        <section className="results-header-card">
          <span className="phase-badge">Phase : Complete</span>
          <h1>Diagnostics Results</h1>
          <p>
            The clinical engine has synthesized patient data with 99.8% computational accuracy. 
            Review the conditions below for immediate action.
          </p>
          <div className="analysis-ref">
            <span>Analysis Reference</span>
            <h3>#VG-7822-XP</h3>
          </div>
        </section>

        {/* Content Structure */}
        <div className="content-grid">
          {/* Left Summary Column */}
          <div className="summary-column">
            <div className="summary-card dark info-card">
              <div className="card-title">
                <Icon name="overview" />
                Input Summary
              </div>
              
              <div className="info-section">
                <label>PRIMARY COMPLAINTS</label>
                <div className="complaints-list">
                  <div className="complaint-item">
                    <span>Persistent Headache</span>
                    <span className="value">48 hrs</span>
                  </div>
                  <div className="complaint-item">
                    <span>Fatigue</span>
                    <span className="value">Moderate</span>
                  </div>
                  <div className="complaint-item">
                    <span>Eye Strain</span>
                    <span className="value">New</span>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <label>VITALS (REPORTED)</label>
                <div className="vitals-grid">
                  <div className="vital-mini-box">
                    <h4>98.6°</h4>
                    <span>Temp</span>
                  </div>
                  <div className="vital-mini-box">
                    <h4>72</h4>
                    <span>BPM</span>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <span onClick={() => navigate('/Diagnosticinput')} className="edit-link" style={{ cursor: 'pointer' }}>Edit details ✎</span>
              </div>
            </div>

            <div className="summary-card patient-card">
              <div className="card-title">
                <Icon name="check" />
                PATIENT SUMMARY
              </div>
              <div className="patient-vitals-list">
                <div className="patient-vital-row">
                  <div className="v-icon-wrap"><Icon name="vitals" /></div>
                  <span className="v-label">Temperature</span>
                  <span className="v-value">98.6°F</span>
                </div>
                <div className="patient-vital-row">
                  <div className="v-icon-wrap heart"><Icon name="vitals" /></div>
                  <span className="v-label">Heart Rate</span>
                  <span className="v-value">72 BPM</span>
                </div>
                <div className="patient-vital-row">
                  <div className="v-icon-wrap lung"><Icon name="vitals" /></div>
                  <span className="v-label">SPO2</span>
                  <span className="v-value">98%</span>
                </div>
              </div>
              <div className="symptoms-section">
                <label>PRIMARY SYMPTOMS</label>
                <div className="symptom-tags">
                  {['Persistent Headache', 'Photophobia', 'Fatigue'].map(tag => (
                    <span key={tag} className="symptom-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="summary-card history-card">
              <div className="history-content">
                <h4>Analysis History</h4>
                <p>Compare current results with previous 6 months of diagnostic data.</p>
                <a href="#trends" className="trends-link">
                  View Trends 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Potential Conditions Column */}
          <div className="conditions-section">
            <h2>
              Potential Conditions
              <span style={{ fontSize: 12, color: '#a0aec0', cursor: 'pointer' }}>Sort by Confidence ▾</span>
            </h2>
            
            {conditions.map((c, i) => (
              <div key={i} className="condition-card" onClick={() => c.title === 'Tension-Type Headache' && navigate('/Tthdiagnostic')}>
                <div className="condition-header">
                  <div className="title-area">
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                  </div>
                  <div className="match-area">
                    <span className="match-num">{c.match}%</span>
                    <span className="match-label">MATCH</span>
                  </div>
                </div>
                <div className="condition-footer">
                  <span className="clinical-data"><Icon name="overview" className="mini-icon" /> Clinical Data</span>
                  <span className="arrow">›</span>
                </div>
              </div>
            ))}

            <h2 style={{ marginTop: 40, fontSize: 14 }}>Actionable Next Steps</h2>
            <div className="actionable-row">
              <div className="action-card">
                <Icon name="video" />
                <h4>Book a Consultation</h4>
                <p>Speak with a General Practitioner via telehealth in &lt; 15 mins.</p>
                <a href="#connect">Connect Now →</a>
              </div>
              <div className="action-card">
                <Icon name="pharmacy" />
                <h4>Find a Pharmacy</h4>
                <p>Locate pharmacies nearby for immediate relief medications.</p>
                <a href="#map">Open Map →</a>
              </div>
              <div className="action-card">
                <Icon name="book" />
                <h4>Health Guide</h4>
                <p>Deep dive into managed care strategies for these conditions.</p>
                <a href="#read">Read More →</a>
              </div>
            </div>

            <div className="bottom-map">
              <div className="map-pins">
                <div className="map-pin pin-1"><Icon name="pharmacy" /></div>
                <div className="map-pin pin-2"><Icon name="pharmacy" /></div>
                <div className="map-pin pin-3"><Icon name="pharmacy" /></div>
              </div>
              <div className="map-badge">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="#e53e3e" stroke="#e53e3e" strokeWidth="1"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3" fill="white"/></svg>
                 <span>2 Clinics Nearby</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Diagnostic;
