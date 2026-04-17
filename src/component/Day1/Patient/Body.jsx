import React from 'react';
import './Body.css';
import frontalBody from '../../../assets/human-body-frontal-removebg-preview 1.svg';

import patientPhoto from '../../../assets/Patient Photo.svg';

const Icon = ({ name }) => {
  const icons = {
    overview: <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />,
    symptom: <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4m0 4h.01" />,
    vitals: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    meds: <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />,
    appointments: <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />,
    messages: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" />,
    search: <React.Fragment><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3" /></React.Fragment>,
    bell: <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9ZM10.3 21a1.94 1.94 0 0 0 3.4 0" />,
    settings: <React.Fragment><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 1 1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3" /></React.Fragment>,
    rotate: <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />,
    layers: <React.Fragment><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 12 10 5 10-5"/><path d="m2 17 10 5 10-5"/></React.Fragment>,
    support: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    logout: <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />,
    upload: <path d="M16 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM9 2h6M10 13h4m-4 3h4m-5-8h2v2h-2V8Zm0 0V8m0 2v-2" />,
    chevronRight: <path d="m9 18 6-6-6-6" />,
    target: <React.Fragment><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" /></React.Fragment>
  };

  return (
    <svg 
      width="20" 
      height="20" 
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

const Body = () => {
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
    { id: 'overview', icon: 'overview', label: 'Overview' },
    { id: 'symptom', icon: 'symptom', label: 'Symptom Checker', active: true },
    { id: 'vitals', icon: 'vitals', label: 'Vitals' },
    { id: 'meds', icon: 'meds', label: 'Medications' },
    { id: 'appointments', icon: 'appointments', label: 'Appointments' },
    { id: 'messages', icon: 'messages', label: 'Messages' },
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
  }, [activeRegion]); // Re-run when region changes to apply animations to new cards

  return (
    <div className="body-layout">
      {/* Sidebar */}
      <aside className="body-sidebar">
        <div className="sidebar-logo">
          <h2>VADYA<span style={{ color: '#fff', opacity: 0.8 }}>Go</span></h2>
        </div>
        <nav className="sidebar-menu">
          {sidebarItems.map(item => (
            <a key={item.id} href={`#${item.id}`} className={`menu-item ${item.active ? 'active' : ''}`}>
              <Icon name={item.icon} />
              {item.label}
            </a>
          ))}
        </nav>
        <button className="new-assessment-btn">New Assessment</button>
        <div className="sidebar-footer">
          <a href="#support" className="footer-item"><Icon name="support" /> Support</a>
          <a href="#logout" className="footer-item"><Icon name="logout" /> Sign Out</a>
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
            <span>Language</span>
            <div className="icon-wrapper"><Icon name="bell" /></div>
            <div className="icon-wrapper"><Icon name="settings" /></div>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />
          </div>
        </header>

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

          <button className="start-diagnostic-btn">
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
          <Icon name="target" />
        </div>
      </div>
    </div>
  );
};

export default Body;
