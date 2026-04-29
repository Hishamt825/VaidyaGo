import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import phImg from '../../../assets/ph.png';
import './Diagnostic.css';
import Sidebar from '../../../components/Patient/Patient_sidebar';
import Profile from '../../../components/Patient/Profile';
import Account from '../../../components/Patient/Account';
import Notification from '../../../components/Patient/notification';
import Tthdiagnostic from './Tthdiagnostic';
import Cervicogenic from './Cervicogenic';
import Dseasonal from './Dseasonal';
import ConnectPopup from './ConnectPopup';
import PharmacyPopup from './PharmacyPopup';
import HealthGuidePopup from './HealthGuidePopup';

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
    video: <React.Fragment><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2" /></React.Fragment>,
    pharmacy: <path d="M12 2v20M5 12h14" />,
    book: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V5A2.5 2.5 0 0 1 6.5 2.5H20M20 2.5v19.5" />,
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
    >
      {icons[name] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};

const Diagnostic = () => {
  const navigate = useNavigate();
  const [showConnect, setShowConnect] = useState(false);
  const [showPharmacy, setShowPharmacy] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showTTH, setShowTTH] = useState(false);
  const [showCervicogenic, setShowCervicogenic] = useState(false);
  const [showDseasonal, setShowDseasonal] = useState(false);
  const [active, setActive] = useState('Dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const isPopupOpen = showConnect || showPharmacy || showGuide || showTTH || showCervicogenic || showDseasonal;

  const conditions = [
    { title: 'Tension-Type Headache', match: 85, desc: 'Most common primary headache disorder, often characterized by a pressing or tightening sensation around the head of mild to moderate intensity.' },
    { title: 'Seasonal Allergies (Rhinitis)', match: 62, desc: 'Hypersensitivity reaction to environmental triggers such as pollen or mold, contributing to sinus pressure and subsequent cephalalgia.' },
    { title: 'Cervicogenic Headache', match: 48, desc: 'Pain referred from a source in the cervical spine and its component bony, disc and/or soft tissue elements, usually accompanied by neck pain.' }
  ];

  return (
    <div className={`diagnostic-layout-wrapper ${isPopupOpen ? 'popup-active' : ''}`}>
      <div className={`diagnostic-layout ${isPopupOpen ? 'content-blur' : ''}`}>
<<<<<<< HEAD
      {/* Dynamic Sidebar */}
      <aside className="diagnostic-sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="VaidyaGo Logo" style={{ height: '42px', width: 'auto', objectFit: 'contain' }} />
        </div>
        
        <nav className="sidebar-menu">
          {menuItems.map(item => (
            <a key={item.id} href={`#${item.id}`} className={`menu-item ${item.active ? 'active' : ''}`}>
              <div className="menu-icon-wrapper">
                <Icon name={item.icon} />
              </div>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <button 
            onClick={() => navigate('/Consultation1')}
            className="new-consultation-btn"
          >
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
=======
      <Sidebar
        active={active}
        setActive={setActive}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
>>>>>>> frontend

      {/* Main Content Area */}
      <main className="diagnostic-main">
        <header className="h-[76px] flex items-center justify-between px-[24px] md:px-[48px] shrink-0 border-b border-white/5 mb-[8px] z-20">
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
                    <div onClick={() => setActiveModal('profile')} className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform"><img src={phImg} alt="User" className="w-full h-full object-cover" /></div>
                </div>
            </div>
        </header>

        <div className="diagnostic-content">
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
              <div className="card-subtitle">
                <Icon name="overview" className="mini-card-icon" />
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
            <h2 className="conditions-section-title">
              POTENTIAL CONDITIONS
              <span className="sort-label">Sort by Confidence ▾</span>
            </h2>
            
            {conditions.map((c, i) => (
              <div 
                key={i} 
                className="condition-card" 
                onClick={() => {
                  if (c.title === 'Tension-Type Headache') setShowTTH(true);
                  if (c.title === 'Seasonal Allergies (Rhinitis)') setShowDseasonal(true);
                  if (c.title === 'Cervicogenic Headache') setShowCervicogenic(true);
                }}
              >
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

            <h2 className="conditions-section-title" style={{ marginTop: 40 }}>
              ACTIONABLE NEXT STEPS
            </h2>
            <div className="actionable-row">
              <div className="action-card">
                <div className="action-icon-wrap video"><Icon name="video" /></div>
                <h4>Book a Consultation</h4>
                <p>Speak with a General Practitioner via telehealth in &lt; 15 mins.</p>
                <span 
                  onClick={() => setShowConnect(true)} 
                  className="action-link"
                >
                  Connect Now →
                </span>
              </div>
              <div className="action-card">
                <div className="action-icon-wrap pharmacy"><Icon name="pharmacy" /></div>
                <h4>Find a Pharmacy</h4>
                <p>Locate pharmacies nearby for immediate relief medications.</p>
                <span 
                  onClick={() => setShowPharmacy(true)} 
                  className="action-link"
                >
                  Open Map →
                </span>
              </div>
              <div className="action-card">
                <div className="action-icon-wrap book"><Icon name="book" /></div>
                <h4>Health Guide</h4>
                <p>Deep dive into managed care strategies for these conditions.</p>
                <span 
                  onClick={() => setShowGuide(true)} 
                  className="action-link"
                >
                  Read More →
                </span>
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
        </div>
      </main>
    </div>

    {showConnect && (
      <ConnectPopup onClose={() => setShowConnect(false)} />
    )}
    {showPharmacy && (
      <PharmacyPopup onClose={() => setShowPharmacy(false)} />
    )}
    {showGuide && (
      <HealthGuidePopup onClose={() => setShowGuide(false)} />
    )}

    {showTTH && (
      <Tthdiagnostic onClose={() => setShowTTH(false)} />
    )}

    {showCervicogenic && (
      <Cervicogenic onClose={() => setShowCervicogenic(false)} />
    )}

    {showDseasonal && (
      <Dseasonal onClose={() => setShowDseasonal(false)} />
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

export default Diagnostic;
