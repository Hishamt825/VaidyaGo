import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/VADYAGO.png';
import human1 from '../../../assets/human1.png';
import './MuscleTension.css';

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
    flash: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
    play: <polygon points="5 3 19 12 5 21 5 3" />,
    chevron: <polyline points="9 18 15 12 9 6" />
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

const MuscleTension = ({ onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', icon: 'overview', label: 'Dashboard', active: true },
    { id: 'symptom', icon: 'symptom', label: 'Symptom Checker' },
    { id: 'vitals', icon: 'vitals', label: 'Vitals' },
    { id: 'meds', icon: 'meds', label: 'Medications' },
    { id: 'appointments', icon: 'appointments', label: 'Appointments' },
    { id: 'messages', icon: 'messages', label: 'Messages' },
    { id: 'reminder', icon: 'reminder', label: 'REMINDER' },
    { id: 'records', icon: 'records', label: 'MY RECORDS' },
  ];

  return (
    <div className="mt-standalone-page">
      {/* Sidebar - Shared with Diagnostic.jsx */}
      <aside className="mt-sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="VaidyaGo Logo" style={{ height: '42px', width: 'auto', objectFit: 'contain' }} />
        </div>
        <nav className="sidebar-menu">
          {menuItems.map(item => (
            <div key={item.id} className={`menu-item ${item.active ? 'active' : ''}`}>
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

      {/* Main Content */}
      <main className="mt-main">
        {/* Header - Shared with Diagnostic.jsx */}
        <header className="mt-header">
          <div className="search-bar">
            <Icon name="search" />
            <input type="text" placeholder="Search medications..." />
          </div>
          <div className="top-actions">
            <button className="mt-back-btn" onClick={onClose || (() => navigate(-1))}>
               <Icon name="chevron" className="rotate-180" />
               Back to Insights
            </button>
            <span>Language</span>
            <Icon name="bell" />
            <Icon name="settings" />
            <div className="user-profile-mini">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
          </div>
        </header>

        <div className="mt-content">
          {/* Title Section */}
          <section className="mt-hero">
            <div className="hero-text">
              <h1>Muscle <br/><span>Tension</span></h1>
              <p>
                The suboccipital muscles at the base of your skull are tiny but powerful. When they tighten, 
                they don't just cause a stiff neck — they can send waves of pain through your head, 
                known as cervicogenic headaches.
              </p>
              <div className="hero-actions">
                <button className="btn-guide">Read Guide</button>
                <button className="btn-video-lite">Match Video</button>
              </div>
            </div>
            <div className="hero-image-wrap">
              <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80" alt="Meditation" />
            </div>
          </section>

          <div className="mt-grid">
            {/* Left Box: Muscle Tension Map */}
            <div className="mt-map-card">
              <h3>Muscle Tension Map</h3>
              <p className="subtitle">Identifying the primary trigger points associated with neck-originating headaches.</p>
              
              <div className="anatomical-map">
                 <img src={human1} alt="Anatomy Map" className="map-base" />
                 <div className="map-labels">
                    <div className="label-item suboccipital">
                       <span className="dot pulse"></span>
                       <span className="label-box">Suboccipital Cluster</span>
                    </div>
                    <div className="label-item levator">
                       <span className="dot pulse"></span>
                       <span className="label-box">Levator Scapulae</span>
                    </div>
                    <div className="label-item lower-trap">
                       <span className="dot pulse"></span>
                       <span className="label-box grey">Upper Trapezius</span>
                    </div>
                 </div>
              </div>

              <div className="map-legend">
                <div className="legend-item">
                  <span className="dot primary"></span>
                  <span>PRIMARY TRIGGER</span>
                </div>
                <div className="legend-item">
                  <span className="dot potential"></span>
                  <span>POTENTIAL ZONE</span>
                </div>
              </div>
            </div>

            {/* Right Box: Common Triggers */}
            <div className="mt-triggers-card">
              <div className="flash-icon"><Icon name="flash" /></div>
              <h3>Common Triggers</h3>
              <p>Subtle daily habits that contribute to cumulative tension.</p>

              <div className="triggers-list">
                <div className="trigger-item">
                  <div className="trigger-icon">D</div>
                  <div className="trigger-details">
                    <h4>Tech Neck</h4>
                    <p>Forward head posture from prolonged device use.</p>
                  </div>
                </div>
                <div className="trigger-item">
                  <div className="trigger-icon">S</div>
                  <div className="trigger-details">
                    <h4>Psychological Stress</h4>
                    <p>Unconscious jaw clenching and shoulder elevation.</p>
                  </div>
                </div>
                <div className="trigger-item">
                  <div className="trigger-icon">E</div>
                  <div className="trigger-details">
                    <h4>Sleep Ergonomics</h4>
                    <p>Inadequate cervical support during rest cycles.</p>
                  </div>
                </div>
              </div>

              <button className="btn-log-triggers" onClick={() => navigate('/LogTriggers')}>Log My Triggers</button>
            </div>
          </div>

          {/* Self-Care Relief */}
          <div className="mt-relief-section-wrapper">
          <section className="mt-relief-section">
            <h2>Self-Care Relief</h2>
            <p className="relief-desc">
              Relieving cervicogenic tension requires a gentle, consistent approach. 
              Avoid aggressive stretching, which can trigger protective spasms. 
              Instead, focus on releasing the deep suboccipital layer.
            </p>

            <div className="relief-grid">
              <div className="relief-steps">
                <div className="relief-card">
                  <div className="relief-num">01</div>
                  <div className="relief-info">
                    <h4>Cervical Retraction (Tuck)</h4>
                    <p>Sit tall, gently draw your chin straight back like a drawer. Hold for 5 seconds. Repeat 10 times.</p>
                  </div>
                </div>
                <div className="relief-card">
                  <div className="relief-num">02</div>
                  <div className="relief-info">
                    <h4>Suboccipital Release</h4>
                    <p>Place two tennis balls in a sock. Lie down with the balls at the base of your skull. Breathe deeply for 2 minutes.</p>
                  </div>
                </div>
                <div className="relief-card">
                  <div className="relief-num">03</div>
                  <div className="relief-info">
                    <h4>Diaphragmatic Breathing</h4>
                    <p>Focus on belly breathing to lower your secondary respiratory muscles (neck/shoulders) and reduce tension.</p>
                  </div>
                </div>
              </div>

              <div className="relief-video-card">
                <div className="video-thumb">
                  <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80" alt="Exercise" />
                  <div className="video-overlay">
                    <h3>Safe work</h3>
                    <div className="play-circle"><Icon name="play" /></div>
                  </div>
                </div>
                <div className="video-stats">
                  <div className="v-stat">
                    <strong>15m</strong>
                    <span>DAILY ROUTINE</span>
                  </div>
                  <div className="v-stat">
                    <strong>Low</strong>
                    <span>IMPACT LEVEL</span>
                  </div>
                  <div className="v-stat">
                    <strong>Relief</strong>
                    <span>PRIMARY GOAL</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          </div>

          {/* Chronic Pain Banner */}
          <section className="mt-banner">
             <div className="banner-content">
                <h3>Feeling Chronic Pain?</h3>
                <p>If muscle tension persists for more than 2 weeks or is accompanied by dizziness, please consult with your physical therapist or primary care physician.</p>
             </div>
             <div className="banner-actions">
                <button className="btn-find-clinic">Find a Clinic</button>
                <button className="btn-symptom-journal">Symptoms Journal</button>
             </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MuscleTension;
