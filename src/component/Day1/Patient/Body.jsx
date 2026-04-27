import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Body.css';
import frontalBody from '../../../assets/human-body-frontal-removebg-preview 1.svg';
import patientPhoto from '../../../assets/Patient Photo.svg';

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
    plusCircle: (
      <React.Fragment>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
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
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1.51 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </React.Fragment>
    ),
    chevronRight: <path d="m9 18 6-6-6-6" />,
    target: <React.Fragment><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" /></React.Fragment>,
    rotate: <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />,
    layers: <React.Fragment><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 12 10 5 10-5"/><path d="m2 17 10 5 10-5"/></React.Fragment>,
  };

  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {icons[name] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};

const Body = () => {
  const navigate = useNavigate();
  const [activeRegion, setActiveRegion] = React.useState(null);

  const regionData = {
    Forehead: {
      tags: ['Frontal', 'Stress'],
      symptoms: [
        { title: 'Frontal Headache', severity: 'MODERATE', desc: 'Dull ache across the forehead' },
        { title: 'Pressure Sensation', severity: 'MILD', desc: 'Reported during focused tasks' }
      ]
    },
    Head: {
      tags: ['Cranial', 'Sinus'],
      symptoms: [
        { title: 'Sharp Headache', severity: 'SEVERE', desc: 'Persistent pressure for 4 hours' },
        { title: 'Dizziness', severity: 'MODERATE', desc: 'Reported during rapid movement' }
      ]
    },
    Eyes: {
      tags: ['Ocular', 'Visual'],
      symptoms: [
        { title: 'Eye Strain', severity: 'MODERATE', desc: 'Reported after prolonged screen use' },
        { title: 'Blurred Vision', severity: 'SEVERE', desc: 'Sudden onset in the left eye' }
      ]
    },
    Nose: {
      tags: ['Nasal', 'Sinus'],
      symptoms: [
        { title: 'Congestion', severity: 'MODERATE', desc: 'Difficulty breathing through nose' },
        { title: 'Sinus Pain', severity: 'MILD', desc: 'Localized pressure in nasal bridge' }
      ]
    },
    Ears: {
      tags: ['Auditory', 'Aural'],
      symptoms: [
        { title: 'Tinnitus', severity: 'MILD', desc: 'Constant ringing sound reported' },
        { title: 'Ear Ache', severity: 'MODERATE', desc: 'Pressure in the middle ear' }
      ]
    },
    Neck: {
      tags: ['Cervical', 'Spine'],
      symptoms: [
        { title: 'Stiff Neck', severity: 'MODERATE', desc: 'Reduced range of motion' },
        { title: 'Cervical Pain', severity: 'SEVERE', desc: 'Shooting pain down to shoulders' }
      ]
    },
    Shoulders: {
      tags: ['Joint', 'Deltoid'],
      symptoms: [
        { title: 'Rotator Cuff Strain', severity: 'MODERATE', desc: 'Pain when lifting arm' },
        { title: 'Muscle Stiffness', severity: 'MILD', desc: 'Reported after sleep' }
      ]
    },
    Arms: {
      tags: ['Bicep', 'Elbow'],
      symptoms: [
        { title: 'Tendonitis', severity: 'MODERATE', desc: 'Sharp pain at the elbow joint' },
        { title: 'Numbness', severity: 'MILD', desc: 'Occasional tingling in fingers' }
      ]
    },
    Hands: {
      tags: ['Manual', 'Carpal'],
      symptoms: [
        { title: 'Joint Pain', severity: 'MODERATE', desc: 'Felt in the wrist and thumb' },
        { title: 'Weak Grip', severity: 'MILD', desc: 'Difficulty holding objects' }
      ]
    },
    Thoracic: {
      tags: ['Chest', 'Lower Back'],
      symptoms: [
        { title: 'Sharp Pain', severity: 'SEVERE', desc: 'Reported onset: 2 hours ago' },
        { title: 'Dyspnea', severity: 'MODERATE', desc: 'Difficulty breathing while supine' },
        { title: 'Muscle Fatigue', severity: 'MODERATE', desc: 'Localized in upper thoracic region' }
      ]
    },
    Abdomen: {
      tags: ['Stomach', 'Core'],
      symptoms: [
        { title: 'Abdominal Cramps', severity: 'MODERATE', desc: 'Reported after meals' },
        { title: 'Muscle Fatigue', severity: 'MILD', desc: 'Localized in lower abdomen' }
      ]
    },
    Pelvis: {
      tags: ['Hip', 'Groin'],
      symptoms: [
        { title: 'Hip Discomfort', severity: 'MODERATE', desc: 'Felt during walking' },
        { title: 'Pelvic Pressure', severity: 'MILD', desc: 'Persistent mild sensation' }
      ]
    },
    Thighs: {
      tags: ['Quadricep', 'Hamstring'],
      symptoms: [
        { title: 'Muscle Strain', severity: 'SEVERE', desc: 'Sudden onset during activity' },
        { title: 'Soreness', severity: 'MILD', desc: 'General fatigue after exercise' }
      ]
    },
    Knee: {
      tags: ['Joint', 'Knee'],
      symptoms: [
        { title: 'Joint Stiffness', severity: 'MODERATE', desc: 'Worse in the morning' },
        { title: 'Sharp Pain', severity: 'MODERATE', desc: 'Felt during weight-bearing' }
      ]
    },
    Calves: {
      tags: ['Leg', 'Calf'],
      symptoms: [
        { title: 'Muscle Cramp', severity: 'MODERATE', desc: 'Reported during night sleep' },
        { title: 'Soreness', severity: 'MILD', desc: 'Localized in the gastrocnemius' }
      ]
    },
    Feet: {
      tags: ['Ankle', 'Foot'],
      symptoms: [
        { title: 'Swelling', severity: 'MODERATE', desc: 'Reported around the ankle' },
        { title: 'Sprain Suspected', severity: 'SEVERE', desc: 'Inversion injury 1 hour ago' }
      ]
    }
  };

  const sidebarItems = [
    { id: 'dashboard', icon: 'overview', label: 'Dashboard', active: true },
    { id: 'symptom', icon: 'symptom', label: 'Symptom Checker' },
    { id: 'vitals', icon: 'vitals', label: 'Vitals' },
    { id: 'meds', icon: 'meds', label: 'Medications' },
    { id: 'appointments', icon: 'appointments', label: 'Appointments' },
    { id: 'messages', icon: 'messages', label: 'Messages' },
    { id: 'reminder', icon: 'reminder', label: 'REMINDER' },
    { id: 'records', icon: 'records', label: 'MY RECORDS' },
  ];

  React.useEffect(() => {
    const observerOptions = {
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [activeRegion]);

  return (
    <div className="body-layout">
      {/* Dynamic Sidebar - Match Diagnostic.jsx */}
      <aside className="body-sidebar">
        <div className="sidebar-logo">
          <div className="logo-container">
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
               <path d="M20 5L32 12V28L20 35L8 28V12L20 5Z" stroke="#1db1c2" strokeWidth="4" />
               <circle cx="20" cy="20" r="6" fill="#1db1c2" />
            </svg>
            <h2>Vaidya<span>Go</span></h2>
          </div>
        </div>

        <nav className="sidebar-menu">
          {sidebarItems.map(item => (
            <a key={item.id} href={`#${item.id}`} className={`menu-item ${item.active ? 'active' : ''}`}>
              <div className="menu-icon-wrapper">
                <Icon name={item.icon} />
              </div>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="new-consultation-btn">
            <div className="plus-circle-blue">
               <Icon name="plusCircle" />
            </div>
            <span>New Consultation</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="body-main">
        <header className="top-header">
          <div className="search-bar">
            <Icon name="search" />
            <input type="text" placeholder="Search medications..." />
          </div>
          <div className="header-icons">
            <span className="lang-text">Language</span>
            <div className="icon-wrapper"><Icon name="bell" /></div>
            <div className="icon-wrapper"><Icon name="settings" /></div>
            <div className="profile-img-wrapper">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />
            </div>
          </div>
        </header>

        <div className="welcome-text-container">
           <h1>Welcome to VaidyaGo</h1>
        </div>

        <section className="welcome-banner">
          <div className="banner-icon">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <div className="banner-text">
            <p>Welcome back, Dr. Thorne. Please select the anatomical region where the patient reports discomfort to begin the diagnostic mapping.</p>
          </div>
        </section>

        <div className="anatomical-view">
          <div className="body-container">
            <img src={frontalBody} alt="Front Body" className="human-body-img" />
            
            <div className={`hotspot hp-forehead ${activeRegion === 'Forehead' ? 'active' : ''}`} onClick={() => setActiveRegion('Forehead')}>
              {activeRegion === 'Forehead' && <div className="hotspot-label active">Forehead</div>}
            </div>

            <div className={`hotspot hp-head ${activeRegion === 'Head' ? 'active' : ''}`} onClick={() => setActiveRegion('Head')}>
              {activeRegion === 'Head' && <div className="hotspot-label active">Skull Top</div>}
            </div>

            <div className={`hotspot hp-eyes ${activeRegion === 'Eyes' ? 'active' : ''}`} onClick={() => setActiveRegion('Eyes')}>
              {activeRegion === 'Eyes' && <div className="hotspot-label active">Eyes</div>}
            </div>

            <div className={`hotspot hp-nose ${activeRegion === 'Nose' ? 'active' : ''}`} onClick={() => setActiveRegion('Nose')}>
              {activeRegion === 'Nose' && <div className="hotspot-label active">Nose</div>}
            </div>

            <div className={`hotspot hp-ears ${activeRegion === 'Ears' ? 'active' : ''}`} onClick={() => setActiveRegion('Ears')}>
              {activeRegion === 'Ears' && <div className="hotspot-label active">Ears</div>}
            </div>

            <div className={`hotspot hp-neck ${activeRegion === 'Neck' ? 'active' : ''}`} onClick={() => setActiveRegion('Neck')}>
              {activeRegion === 'Neck' && <div className="hotspot-label active">Neck</div>}
            </div>

            <div className={`hotspot hp-shoulder-r ${activeRegion === 'Shoulders' ? 'active' : ''}`} onClick={() => setActiveRegion('Shoulders')}>
              {activeRegion === 'Shoulders' && <div className="hotspot-label active">Right Shoulder</div>}
            </div>

            <div className={`hotspot hp-shoulder-l ${activeRegion === 'Shoulders' ? 'active' : ''}`} onClick={() => setActiveRegion('Shoulders')}>
              {activeRegion === 'Shoulders' && <div className="hotspot-label active">Left Shoulder</div>}
            </div>

            <div className={`hotspot hp-arm ${activeRegion === 'Arms' ? 'active' : ''}`} onClick={() => setActiveRegion('Arms')}>
              {activeRegion === 'Arms' && <div className="hotspot-label active">Arms</div>}
            </div>

            <div className={`hotspot hp-hand ${activeRegion === 'Hands' ? 'active' : ''}`} onClick={() => setActiveRegion('Hands')}>
              {activeRegion === 'Hands' && <div className="hotspot-label active">Hands</div>}
            </div>
            
            <div className={`hotspot hp-chest ${activeRegion === 'Thoracic' ? 'active' : ''}`} onClick={() => setActiveRegion('Thoracic')}>
              {activeRegion === 'Thoracic' && <div className="hotspot-label active">Thoracic</div>}
            </div>
            
            <div className={`hotspot hp-abd ${activeRegion === 'Abdomen' ? 'active' : ''}`} onClick={() => setActiveRegion('Abdomen')}>
              {activeRegion === 'Abdomen' && <div className="hotspot-label active">Abdomen</div>}
            </div>

            <div className={`hotspot hp-pelvis ${activeRegion === 'Pelvis' ? 'active' : ''}`} onClick={() => setActiveRegion('Pelvis')}>
              {activeRegion === 'Pelvis' && <div className="hotspot-label active">Pelvis</div>}
            </div>

            <div className={`hotspot hp-thigh ${activeRegion === 'Thighs' ? 'active' : ''}`} onClick={() => setActiveRegion('Thighs')}>
              {activeRegion === 'Thighs' && <div className="hotspot-label active">Thighs</div>}
            </div>
            
            <div className={`hotspot hp-knee ${activeRegion === 'Knee' ? 'active' : ''}`} onClick={() => setActiveRegion('Knee')}>
              {activeRegion === 'Knee' && <div className="hotspot-label active">Knee</div>}
            </div>

            <div className={`hotspot hp-calf ${activeRegion === 'Calves' ? 'active' : ''}`} onClick={() => setActiveRegion('Calves')}>
              {activeRegion === 'Calves' && <div className="hotspot-label active">Calves</div>}
            </div>

            <div className={`hotspot hp-foot ${activeRegion === 'Feet' ? 'active' : ''}`} onClick={() => setActiveRegion('Feet')}>
              {activeRegion === 'Feet' && <div className="hotspot-label active">Feet</div>}
            </div>
          </div>
          
          <img src={frontalBody} alt="Back Body" className="secondary-model" style={{ transform: 'scaleX(-1)' }} />

          <div className="bottom-controls">
            <button className="control-btn"><Icon name="rotate" /></button>
            <button className="control-btn"><Icon name="search" /></button>
            <button className="control-btn"><Icon name="layers" /></button>
          </div>
        </div>
      </main>

      {/* Right Diagnostics Panel */}
      <div className="diagnostics-panel-wrapper">
        <aside className="diagnostics-panel">
          <div className="panel-header">
            <h3>Diagnostics</h3>
            <div className="upload-icon-btn">
              <Icon name="upload" />
            </div>
          </div>

          <div>
            <div className="section-label">Selected Areas</div>
            <div className="areas-row">
              {activeRegion && regionData[activeRegion].tags.map(tag => (
                <div key={tag} className="area-tag">{tag} <span className="close-tag">✕</span></div>
              ))}
            </div>
          </div>

          <div className="symptoms-section">
            <div className="section-label">Reported Symptoms</div>
            <div className="symptoms-scroll-area">
              {activeRegion ? regionData[activeRegion].symptoms.map((symptom, idx) => (
                <div key={`${activeRegion}-${idx}`} className="symptom-card scroll-reveal">
                  <div className="symptom-top">
                    <h4>{symptom.title}</h4>
                    <span className={`severity-badge ${symptom.severity.toLowerCase()}`}>
                      {symptom.severity}
                    </span>
                  </div>
                  <p>{symptom.desc}</p>
                </div>
              )) : (
                <p style={{ fontSize: '11px', opacity: 0.4, fontStyle: 'italic', textAlign: 'center', marginTop: '20px' }}>
                  Select a body region to view symptoms
                </p>
              )}
            </div>
          </div>

          <button className="start-diagnostic-btn" onClick={() => navigate('/Diagnostic')}>
            START DIAGNOSTIC <Icon name="chevronRight" />
          </button>
        </aside>

        <div className="profile-card-mini">
          <div className="profile-info">
            <img src={patientPhoto} alt="Elena" />
            <div className="profile-text">
              <h5>Elena Rodriguez</h5>
              <span>ID: PX-8920 | 64 yrs</span>
            </div>
          </div>
          <Icon name="target" className="target-icon" />
        </div>
      </div>
    </div>
  );
};

export default Body;
