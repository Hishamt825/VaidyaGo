import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NeckAlignment.css';
import skullAnatomy from '../../../assets/skull_anatomy.png';

const Icon = ({ name, size = 20, className }) => {
  const icons = {
    dashboard: <React.Fragment><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></React.Fragment>,
    anatomical: <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1" />,
    insights: <path d="M21 12h-4l-3 9L9 3l-3 9H2" />,
    records: <React.Fragment><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></React.Fragment>,
    journal: <React.Fragment><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></React.Fragment>,
    search: <React.Fragment><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></React.Fragment>,
    bell: <React.Fragment><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></React.Fragment>,
    settings: <React.Fragment><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></React.Fragment>,
    close: <React.Fragment><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></React.Fragment>,
    zoom: <React.Fragment><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></React.Fragment>,
    rotate: <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3" />,
    alert: <React.Fragment><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></React.Fragment>,
    check: <polyline points="20 6 9 17 4 12" />,
    pulse: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    arrow: <polyline points="9 18 15 12 9 6" />
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      {icons[name]}
    </svg>
  );
};

const AssessmentPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div className="ap-overlay">
      <div className="ap-card">
        <div className="ap-header-gradient">
          <div className="ap-icon-box">
            <Icon name="pulse" size={32} className="ap-main-icon" />
          </div>
        </div>
        
        <div className="ap-body">
          <div className="ap-time-badge">
            <Icon name="records" size={14} />
            <span>ESTIMATED TIME: 2 MINUTES</span>
          </div>

          <h2 className="ap-title">Start Your Posture Assessment</h2>
          <p className="ap-text">
            Complete this 2-minute self-assessment to identify potential cervical tension and receive a personalized rehabilitation plan.
          </p>

          <div className="ap-actions">
            <button className="ap-btn-primary" onClick={() => navigate('/PostureAnalysis')}>
              Begin Assessment <Icon name="arrow" size={18} />
            </button>
            <button className="ap-btn-secondary" onClick={onClose}>
              Skip for Now
            </button>
          </div>

          <div className="ap-encryption">
             Your clinical data is secured with AES-256 encryption.
          </div>
        </div>
      </div>
    </div>
  );
};

const NeckAlignment = ({ onClose }) => {
  const navigate = useNavigate();
  const [showAssessment, setShowAssessment] = useState(false);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="na-overlay">
      <aside className="na-sidebar">
        <div className="na-brand">
          <div className="na-brand-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
          </div>
          <div className="na-brand-text">
            <h4>The Sanctuary</h4>
            <span>Patient Portal</span>
          </div>
        </div>

        <nav className="na-nav">
          <div className="na-nav-item">
            <Icon name="dashboard" size={18} />
            <span>Health Dashboard</span>
          </div>
          <div className="na-nav-item active">
            <Icon name="anatomical" size={18} />
            <span>Anatomical Guides</span>
          </div>
          <div className="na-nav-item">
            <Icon name="insights" size={18} />
            <span>Clinical Insights</span>
          </div>
          <div className="na-nav-item">
            <Icon name="records" size={18} />
            <span>Medical Records</span>
          </div>
          <div className="na-nav-item">
            <Icon name="journal" size={18} />
            <span>Wellness Journal</span>
          </div>
        </nav>

        <button className="na-emergency-btn">Emergency Contact</button>

        <div className="na-sidebar-footer">
          <div className="na-footer-link">Privacy</div>
          <div className="na-footer-link">Support</div>
        </div>
      </aside>

      <main className="na-main">
        <header className="na-topbar">
          <div className="na-search">
            <Icon name="search" size={18} className="na-search-icon" />
            <input type="text" placeholder="Search anatomy or symptoms..." />
          </div>
          <div className="na-user-area">
            <div className="na-top-icons">
              <Icon name="bell" size={20} />
              <Icon name="settings" size={20} />
            </div>
            <div className="na-user-profile">
              <div className="na-user-info">
                <strong>VaidyaGo</strong>
                <span>CLINICAL CARE</span>
              </div>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
            <button className="na-close-main" onClick={handleClose}>
              <Icon name="close" size={24} />
            </button>
          </div>
        </header>

        <div className="na-content">
          <div className="na-breadcrumb">
            UNDERSTANDING YOUR NECK HEALTH • <span>SERIES 01</span>
          </div>
          
          <h1 className="na-title">Neck Alignment & Movement</h1>
          <p className="na-subtitle">
            Explore the intricate biomechanics of the upper cervical spine, where precision movement meets critical protection.
          </p>

          <div className="na-grid-top">
            <div className="na-visual-card">
              <div className="na-visual-label">
                <strong>Central Hub: C1-C2</strong>
                <p>The Atlas (C1) and Axis (C2) form the most mobile part of your entire spine, allowing for a vast range of rotation.</p>
              </div>
              <div className="na-skull-render">
                <img src={skullAnatomy} alt="Skull anatomy" />
                <div className="na-render-tools">
                   <button><Icon name="zoom" size={16} /></button>
                   <button><Icon name="rotate" size={16} /></button>
                </div>
              </div>
            </div>

            <div className="na-basics-card">
              <div className="na-basics-icon">
                <Icon name="records" size={20} />
              </div>
              <h3>Alignment Basics</h3>
              
              <div className="na-basic-item">
                <span className="na-num">01</span>
                <div>
                  <strong>The Atlas Pillar</strong>
                  <p>The C1 vertebra supports the globe of the skull. Its perfect leveling is crucial for neural clarity.</p>
                </div>
              </div>

              <div className="na-basic-item">
                <span className="na-num">02</span>
                <div>
                  <strong>The Pivot Point</strong>
                  <p>The Axis (C2) features the 'Dens', a vertical peg around which the Atlas rotates freely.</p>
                </div>
              </div>

              <div className="na-basic-item">
                <span className="na-num">03</span>
                <div>
                  <strong>Ligament Integrity</strong>
                  <p>Transverse ligaments keep these structures locked in place, protecting the spinal cord.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="na-grid-bottom">
            <div className="na-clinical-card">
              <div className="na-clinical-header">
                <div className="na-alert-badge">CLINICAL ALERT</div>
                <h2>Clinical Significance</h2>
              </div>
              
              <div className="na-clinical-subgrid">
                <div className="na-sig-item">
                  <div className="na-sig-icon"><Icon name="alert" size={16} /></div>
                  <div>
                    <strong>Misalignment Impacts</strong>
                    <p>Even a minor shift in the C1-C2 complex can influence blood flow to the brain via the vertebral arteries and impact cranial nerve function.</p>
                  </div>
                </div>
                <div className="na-sig-item">
                  <div className="na-sig-icon"><Icon name="insights" size={16} /></div>
                  <div>
                    <strong>Symptom Tracking</strong>
                    <p>Symptoms like cervicogenic headaches, dizziness, or localized "stiff neck" often originate from imbalances in this specific joint system.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="na-assessment-card">
              <span>PATIENT PATH</span>
              <h3>How is your alignment today?</h3>
              <p>Complete our 2-minute posture self-assessment to identify potential upper cervical tension.</p>
              <button className="na-start-btn" onClick={() => setShowAssessment(true)}>
                Start Assessment <Icon name="check" size={16} />
              </button>
            </div>
          </div>

          <footer className="na-footer">
            <p>"Precision in structure creates freedom in movement. Understanding the sanctuary of your spine is the first step toward lasting wellness."</p>
            <div className="na-footer-meta">
              CLINICAL SANCTUARY © 2024 • EDITORIAL BOARD APPROVED
            </div>
          </footer>
        </div>
      </main>

      <AssessmentPopup 
        isOpen={showAssessment} 
        onClose={() => setShowAssessment(false)} 
      />
    </div>
  );
};

export default NeckAlignment;
