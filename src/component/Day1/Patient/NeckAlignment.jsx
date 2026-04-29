import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NeckAlignment.css';
import skullAnatomy from '../../../assets/skull_anatomy.png';
import patientPhoto from '../../../assets/Patient Photo.svg';
import Sidebar from '../../../components/Patient/Patient_sidebar';
import Profile from '../../../components/Patient/Profile';
import Account from '../../../components/Patient/Account';
import Notification from '../../../components/Patient/notification';

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
  const [active, setActive] = useState('Symptom Checker');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  return (
    <div 
      className="flex h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}
    >
      <Sidebar
        active={active}
        setActive={setActive}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* ── Main Area ── */}
      <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden ${isNotificationOpen || showAssessment || activeModal ? 'blur-[4px] scale-[0.98] pointer-events-none' : ''}`}>
        {/* Top Navbar */}
        <header className="h-[76px] flex items-center justify-between px-[24px] md:px-[48px] shrink-0 border-b border-white/5 mb-[8px] z-20">
            {/* Hamburger for Mobile */}
            <button 
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden text-white p-2 -ml-2 hover:bg-white/10 rounded-xl transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
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
                    <div onClick={() => setActiveModal('profile')} className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform">
                        <img src={patientPhoto} alt="User" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-[64px]">

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
      </div>

      <AssessmentPopup 
        isOpen={showAssessment} 
        onClose={() => setShowAssessment(false)} 
      />
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

export default NeckAlignment;
