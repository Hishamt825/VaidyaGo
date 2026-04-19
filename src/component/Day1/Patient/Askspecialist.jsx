import React, { useState } from 'react';
import './Askspecialist.css';

// Importing images
import drArjanImg from '../../../assets/dr_arjan_singh.png';
import drSarahImg from '../../../assets/dr_sarah_jenkins.png';

const Icon = ({ name, className, size = 20 }) => {
  const getIconContent = () => {
    switch (name) {
      case 'dashboard':
        return <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />;
      case 'patients':
        return <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />;
      case 'vitals':
        return <path d="M22 12h-4l-3 9L9 3l-3 9H2" />;
      case 'medications':
        return <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7ZM8.5 8.5l7 7" />;
      case 'appointments':
        return <path d="M8 2v4M16 2v4M3 10h18" />;
      case 'messages':
        return <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />;
      case 'settings':
        return <circle cx="12" cy="12" r="3" />;
      case 'search':
        return (
          <g>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </g>
        );
      case 'bell':
        return (
          <g>
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </g>
        );
      case 'help':
        return (
          <g>
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
          </g>
        );
      case 'neurology':
        return <path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.39.2.04.26-.09.26-.2v-.69L7.24 21c-.24-.42-.64-.81-1.01-1.1s-.41-.4-.1-.7c.31-.3.8-.2.9.1l.4.5c.3.4.6.5 1 .5h.3c.3 0 .5-.2.5-.5V19l-.5-.1c-.3-.1-.5-.3-.6-.6s-.1-.6.1-.8c.2-.2.5-.3.8-.2l.5.3V16l-.8-.2c-.3-.1-.5-.3-.6-.6s-.1-.6.1-.8c.2-.2.5-.3.8-.2l.8.3v-1.5l-1-.2c-.3-.1-.5-.3-.6-.6s0-.6.3-.8c.3-.2.6-.2.9-.1l1.1.2V11c0-.4.3-.8.8-.8S13 10.6 13 11v3l1.1-.2c.3-.1.6-.1.9.1.3.2.4.5.3.8s-.3.5-.6.6l-1 .2v1.5l.8-.3c.3-.1.6 0 .8.2.2.2.2.5.1.8s-.3.5-.6.6l-.8.2V18l.5-.3c.3-.1.6 0 .8.2s.2.5.1.8c-.1.3-.3.5-.6.6l-.5.1v.7c0 .3.2.5.5.5h.3c.4 0 .7-.1 1-.5l.4-.5c.1-.3.6-.4.9-.1.3.3.2.3-.1.7-.37.29-.64.68-1.01 1.1l-1.86.37v.69c0 .11.06.24.26.2A10 10 0 0 0 22 12 10 10 0 0 0 12 2z" />;
      case 'cardiology':
        return <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />;
      case 'pediatrics':
        return (
          <g>
            <path d="M18 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
            <path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
            <path d="M6 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
            <path d="M22 20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4Z" />
            <path d="M7 14v-2" />
            <path d="M12 14v-2" />
            <path d="M17 14v-2" />
          </g>
        );
      case 'ophthalmology':
        return (
          <g>
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </g>
        );
      case 'radiology':
        return (
          <g>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
            <path d="M14 2v6h6" />
            <path d="M8 13h2" />
            <path d="M8 17h2" />
            <path d="M14 13h2" />
            <path d="M14 17h2" />
          </g>
        );
      case 'chat':
        return <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" />;
      case 'audio':
        return (
          <g>
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="8" y1="22" x2="16" y2="22" />
          </g>
        );
      case 'video':
        return (
          <g>
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </g>
        );
      case 'check':
        return <polyline points="20 6 9 17 4 12" />;
      case 'star':
        return <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />;
      default:
        return <circle cx="12" cy="12" r="10" />;
    }
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
      width={size}
      height={size}
    >
      {getIconContent()}
    </svg>
  );
};


const Askspecialist = () => {
  const [activeSpec, setActiveSpec] = useState('Cardiology');

  const specialties = [
    { name: 'Neurology', icon: 'neurology' },
    { name: 'Cardiology', icon: 'cardiology' },
    { name: 'Pediatrics', icon: 'pediatrics' },
    { name: 'Ophthalmology', icon: 'ophthalmology' },
    { name: 'Radiology', icon: 'radiology' },
  ];

  return (
    <div className="ask-container">
      {/* Sidebar */}
      <aside className="ask-sidebar">
        <div className="ask-logo">
          <h1>VaidyaGo</h1>
          <p>The Clinical Sanctuary</p>
        </div>

        <nav className="ask-nav">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: 'dashboard' },
            { id: 'patients', name: 'Patients', icon: 'patients' },
            { id: 'vitals', name: 'Vitals', icon: 'vitals' },
            { id: 'medications', name: 'Medications', icon: 'medications' },
            { id: 'appointments', name: 'Appointments', icon: 'appointments' },
            { id: 'messages', name: 'Messages', icon: 'messages', active: true },
            { id: 'settings', name: 'Settings', icon: 'settings' },
          ].map(item => (
            <a href="#" key={item.id} className={`ask-nav-item ${item.active ? 'active' : ''}`}>
              <Icon name={item.icon} />
              <span>{item.name}</span>
            </a>
          ))}
        </nav>

        <div className="ask-sidebar-profile">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Profile" />
          <div className="ask-sidebar-profile-info">
            <h4>Alex Rivera</h4>
            <p>Patient ID: #8821</p>
          </div>
        </div>
      </aside>

      {/* Content Wrapper */}
      <div className="ask-content-wrapper">
        {/* Main Content */}
        <main className="ask-main">
          {/* Top Header */}
          <header className="ask-header">
            <div className="ask-search-top">
              <Icon name="search" size={18} />
              <input type="text" placeholder="Search records or doctors..." />
            </div>
            <div className="ask-header-actions">
              <div className="ask-header-icon"><Icon name="bell" /></div>
              <div className="ask-header-icon"><Icon name="help" /></div>
              <div className="ask-header-profile">
                <span>Alex Rivera</span>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Alex Rivera" />
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <div className="ask-hero">
            <span className="ask-hero-label">Specialist Portal</span>
            <h2>Ask a Specialist</h2>
            <p>
              Connect with leading medical professionals for personalized guidance. 
              Your health journey is a priority, and our experts are here to listen.
            </p>
          </div>

          {/* Browse Specialties */}
          <section>
            <h3 className="ask-section-title">Browse by Specialty</h3>
            <div className="ask-specialties">
              {specialties.map(spec => (
                <div 
                  key={spec.name} 
                  className={`ask-spec-card ${activeSpec === spec.name ? 'active' : ''}`}
                  onClick={() => setActiveSpec(spec.name)}
                >
                  <div className="ask-spec-icon">
                    <Icon name={spec.icon} size={28} />
                  </div>
                  <span>{spec.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Search specialist bar */}
          <div className="ask-search-middle">
            <Icon name="search" size={20} />
            <input type="text" placeholder="Search by specialist name or expertise..." />
          </div>

          {/* Doctors List */}
          <div className="ask-doctors-list">
            <div className="ask-doc-card">
              <img src={drArjanImg} alt="Dr. Arjan Singh" className="ask-doc-img" />
              <div className="ask-doc-info">
                <div className="ask-doc-header">
                  <div>
                    <h4 className="ask-doc-name">Dr. Arjan Singh</h4>
                    <p className="ask-doc-title">Senior Neurologist • 15 Years Experience</p>
                  </div>
                  <span className="ask-doc-badge">Highly Recommended</span>
                </div>
                <p className="ask-doc-desc">
                  Specializing in Tension-Type Headaches and Migraine management. 
                  Committed to long-term neurological wellness.
                </p>
                <div className="ask-doc-footer">
                  <div className="ask-doc-rating">
                    <Icon name="star" size={14} />
                    <span>4.9</span>
                  </div>
                  <div className="ask-doc-actions">
                    <button className="ask-btn-icon"><Icon name="chat" size={16} /> Chat</button>
                    <button className="ask-btn-icon"><Icon name="audio" size={16} /> Audio</button>
                    <button className="ask-btn-icon"><Icon name="video" size={16} /> Video</button>
                    <button className="ask-btn-primary">Book Visit</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="ask-doc-card">
              <img src={drSarahImg} alt="Dr. Sarah Jenkins" className="ask-doc-img" />
              <div className="ask-doc-info">
                <div className="ask-doc-header">
                  <div>
                    <h4 className="ask-doc-name">Dr. Sarah Jenkins</h4>
                    <p className="ask-doc-title">Consultant Cardiologist • 12 Years Experience</p>
                  </div>
                  <span className="ask-doc-badge" style={{ background: '#ecfdf5', color: '#059669' }}>Available Today</span>
                </div>
                <p className="ask-doc-desc">
                  Expert in preventative cardiology and heart health optimization. 
                  Focuses on lifestyle-based interventions.
                </p>
                <div className="ask-doc-footer">
                  <div className="ask-doc-rating">
                    <Icon name="star" size={14} />
                    <span>4.8</span>
                  </div>
                  <div className="ask-doc-actions">
                    <button className="ask-btn-icon"><Icon name="chat" size={16} /> Chat</button>
                    <button className="ask-btn-icon"><Icon name="audio" size={16} /> Audio</button>
                    <button className="ask-btn-icon"><Icon name="video" size={16} /> Video</button>
                    <button className="ask-btn-primary">Book Visit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Panel */}
        <aside className="ask-right-panel">
          <div className="ask-right-card card-diagnostic">
            <div className="ask-card-header">
              <div className="ask-card-icon"><Icon name="radiology" /></div>
              <div className="ask-card-label">
                <p>Recent Diagnostic</p>
                <span>Alex Rivera</span>
              </div>
            </div>
            
            <div className="diagnostic-box">
              <small>Condition</small>
              <h4>Tension-Type Headache</h4>
              <p>Diagnostic Date: 12 Oct 2023</p>
            </div>

            <p className="diagnostic-quote">
              "Consulting a neurologist or a general practitioner is advised for recurrent 
              tension headaches exceeding 2 sessions per week."
            </p>
          </div>

          <div className="ask-right-card card-why">
            <h3>Why VaidyaGo Specialists?</h3>
            <div className="why-list">
              <div className="why-item">
                <Icon name="check" size={18} />
                <div>
                  <h5>Verified Expertise</h5>
                  <p>Every doctor is board certified and vetted by our medical board.</p>
                </div>
              </div>
              <div className="why-item">
                <Icon name="check" size={18} />
                <div>
                  <h5>Instant Connectivity</h5>
                  <p>Connect via HD video or chat within minutes of booking.</p>
                </div>
              </div>
              <div className="why-item">
                <Icon name="check" size={18} />
                <div>
                  <h5>Holistic Records</h5>
                  <p>Doctors see your full medical history for accurate advice.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="ask-right-card card-support">
            <div className="support-icon">
              <Icon name="neurology" size={32} />
            </div>
            <h4>Need help finding?</h4>
            <p>
              Our concierge team can help you select 
              the right specialist.
            </p>
            <div className="support-btn-area">
              <button className="support-btn">Talk to Support</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Askspecialist;
