import React from 'react';
import './Diagnostic.css';

const Icon = ({ name, className }) => {
  const icons = {
    overview: <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />,
    symptom: <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4m0 4h.01" />,
    vitals: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    meds: <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />,
    appointments: <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />,
    messages: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" />,
    check: <React.Fragment><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m22 4-11 11.03L9 13.06" /></React.Fragment>,
    search: <React.Fragment><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3" /></React.Fragment>,
    bell: <React.Fragment><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9ZM10.3 21a1.94 1.94 0 0 0 3.4 0" /></React.Fragment>,
    settings: <React.Fragment><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 1 1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3" /></React.Fragment>,
    book: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V3A2.5 2.5 0 0 1 6.5 5H20v14H6.5a2.5 2.5 0 0 0-2.5 2.5z" />,
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
  const menuItems = [
    { id: 'overview', icon: 'overview', label: 'Overview' },
    { id: 'symptom', icon: 'symptom', label: 'Symptom Checker', active: true },
    { id: 'vitals', icon: 'vitals', label: 'Vitals' },
    { id: 'meds', icon: 'meds', label: 'Medications' },
    { id: 'appointments', icon: 'appointments', label: 'Appointments' },
    { id: 'messages', icon: 'messages', label: 'Messages' },
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
          <h2>VADYA<span style={{ color: '#fff', opacity: 0.8 }}>Go</span></h2>
        </div>
        <nav className="sidebar-menu">
          {menuItems.map(item => (
            <a key={item.id} href={`#${item.id}`} className={`menu-item ${item.active ? 'active' : ''}`}>
              <Icon name={item.icon} />
              {item.label}
            </a>
          ))}
        </nav>
        <button className="new-assessment-btn">New Assessment</button>
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
            <div className="summary-card dark">
              <div className="card-title">
                <Icon name="overview" />
                Input Summary
              </div>
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
              <div className="vitals-bar">
                <div className="vital-box">
                  <h4>98.6°</h4>
                  <span>Temp</span>
                </div>
                <div className="vital-box">
                  <h4>72</h4>
                  <span>BPM</span>
                </div>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-title" style={{ color: '#4a5568' }}>
                <Icon name="vitals" />
                Patient Summary
              </div>
              <div className="complaints-list">
                <div className="complaint-item" style={{ color: '#1a304e', fontWeight: 600 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ color: '#1db1c2' }}>🌡️</div> Temperature
                  </div>
                  <span>98.6°F</span>
                </div>
                <div className="complaint-item" style={{ color: '#1a304e', fontWeight: 600 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ color: '#e53e3e' }}>❤️</div> Heart Rate
                  </div>
                  <span>72 BPM</span>
                </div>
                <div className="complaint-item" style={{ color: '#1a304e', fontWeight: 600 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ color: '#4299e1' }}>📈</div> SPO2
                  </div>
                  <span>98%</span>
                </div>
              </div>
              <div style={{ marginTop: 20 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#718096', textTransform: 'uppercase' }}>Primary Symptoms</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                  {['Persistent Headache', 'Photophobia', 'Fatigue'].map(tag => (
                    <span key={tag} style={{ background: '#f7fafc', padding: '4px 8px', borderRadius: 4, fontSize: 10, color: '#4a5568' }}>{tag}</span>
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
              <div key={i} className="condition-card">
                <div className="condition-header">
                  <h3>{c.title}</h3>
                  <div className="match-pct">
                    <span className="number" style={{ color: i === 0 ? '#48bb78' : i === 1 ? '#ed8936' : '#a0aec0' }}>{c.match}%</span>
                    <span className="label">Match</span>
                  </div>
                </div>
                <p>{c.desc}</p>
                <div className="clinical-data-link">
                   📁 Clinical Data <span style={{ marginLeft: 'auto' }}>›</span>
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
                 2 Clinics Nearby
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Diagnostic;
