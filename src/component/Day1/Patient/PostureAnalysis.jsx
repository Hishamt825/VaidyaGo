import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import patientPhoto from '../../../assets/Patient Photo.svg';
import './PostureAnalysis.css';
import Sidebar from '../../../components/Patient/Patient_sidebar';
import Profile from '../../../components/Patient/Profile';
import Account from '../../../components/Patient/Account';
import Notification from '../../../components/Patient/notification';

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
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </React.Fragment>
    ),
    camera: <React.Fragment><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></React.Fragment>,
    sun: <React.Fragment><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></React.Fragment>,
    distance: <path d="M21 21H3M21 3H3M12 3v18" />,
    latency: <path d="M5 12h14M12 5l7 7-7 7" />,
    engine: <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />,
    security: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    gallery: <React.Fragment><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></React.Fragment>,
    help: <React.Fragment><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17" /></React.Fragment>,
    skip: <React.Fragment><path d="M5 4l10 8-10 8V4z"/><rect x="17" y="4" width="2" height="16"/></React.Fragment>,
    auto: <React.Fragment><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/><path d="m12 8 .6 2.1 2.1.6-2.1.6-.6 2.1-.6-2.1-2.1-.6 2.1-.6.6-2.1Z"/></React.Fragment>,
    plusCircle: <React.Fragment><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></React.Fragment>,
    info: <React.Fragment><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></React.Fragment>,
    device: <React.Fragment><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></React.Fragment>,
    check: <React.Fragment><circle cx="12" cy="12" r="10"/><polyline points="8 12 11 15 16 10"/></React.Fragment>,
    shutter: <React.Fragment><circle cx="12" cy="12" r="11" strokeWidth="2.5"/><path d="M12 4l3 3h-6l3-3zM20 12l-3 3v-6l3 3zM12 20l-3-3h6l-3 3zM4 12l3-3v6l-3-3z" opacity="0.6"/><circle cx="12" cy="12" r="4" fill="currentColor"/></React.Fragment>,
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
      style={{ width: '100%', height: '100%' }}
    >
      {icons[name] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};

const PostureAnalysis = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('Symptom Checker');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

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
      <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden ${isNotificationOpen || activeModal ? 'blur-[4px] scale-[0.98] pointer-events-none' : ''}`}>
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

        <div className="pa-content">
          <div className="pa-top-bar">
            <div className="pa-title-area">
              <h1>Postural Analysis</h1>
              <p>Clinical precision through AI-guided skeletal mapping.</p>
            </div>
            <div className="pa-step-indicator">
              <div className="step-circle">
                <div className="circle-inner">1/3</div>
              </div>
              <div className="step-text">
                <strong>Step 1 of 3</strong>
                <span>Frontal Alignment</span>
              </div>
            </div>
          </div>

          <div className="pa-main-grid">
            <div className="pa-left-col">
              <div className="pa-prep-card">
                <h3>Preparation</h3>
                <div className="prep-item">
                  <div className="prep-icon-box"><Icon name="sun" /></div>
                  <p>Ensure the area is well-lit with a plain background.</p>
                </div>
                <div className="prep-item">
                  <div className="prep-icon-box"><Icon name="device" /></div>
                  <p>Stand 6-8 feet away from your device camera.</p>
                </div>
                <div className="prep-item">
                  <div className="prep-icon-box"><Icon name="check" /></div>
                  <p>Keep your feet shoulder-width apart and arms by your side.</p>
                </div>
              </div>

              <div className="pa-feedback-card">
                <div className="feedback-content">
                  <h4>Real-time Feedback</h4>
                  <p>Our AI will automatically guide you once you are within the frame.</p>
                </div>
                <div className="feedback-decorative-pattern">
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 80 L50 50 L80 80" />
                    <path d="M50 50 L80 20" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="pa-right-col">
              <div className="pa-camera-viewport">
                <div className="viewport-overlay">
                  <div className="instruction-toast-container">
                    <div className="instruction-toast">
                      <div className="info-icon-wrapper">
                        <Icon name="info" className="toast-icon" />
                      </div>
                      <span>Align your head and shoulders with the guide</span>
                    </div>
                  </div>

                  <div className="camera-silhouette">
                    <svg viewBox="0 0 200 200" className="silhouette-svg">
                      {/* Refined Rounded Silhouette */}
                      <circle cx="100" cy="55" r="18" fill="rgba(255,255,255,0.22)" />
                      <path 
                        d="M100 80 c-25 0-45 15-45 35 v15 h15 v40 h60 v-40 h15 v-15 c0-20-20-35-45-35z" 
                        fill="rgba(255,255,255,0.22)" 
                      />
                    </svg>
                  </div>

                  <div className="viewport-footer">
                    <div className="live-status-container">
                      <div className="live-label">
                        <span className="dot"></span>
                        <span>LIVE ANALYSIS</span>
                      </div>
                      <small>Patient: Jane Doe | ID: 9482</small>
                    </div>

                    <div className="camera-controls">
                      <div className="control-btn skip-btn">
                        <div className="control-icon-wrapper"><Icon name="skip" /></div>
                        <span>SKIP</span>
                      </div>
                      <div className="capture-outer">
                        <div className="capture-inner">
                           <Icon name="shutter" />
                        </div>
                      </div>
                      <div className="control-btn auto-btn">
                        <div className="control-icon-wrapper"><Icon name="auto" /></div>
                        <span>AUTO</span>
                      </div>
                    </div>

                    <div className="aux-controls">
                       <div className="aux-btn"><Icon name="gallery" /></div>
                       <div className="aux-btn"><Icon name="help" /></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pa-bottom-actions">
                <div className="pa-progress-bars">
                   <div className="bar active"></div>
                   <div className="bar"></div>
                   <div className="bar"></div>
                </div>
                <button className="cancel-pill-btn" onClick={() => navigate(-1)}>
                  Cancel Session
                </button>
              </div>
            </div>
          </div>

          <div className="pa-footer-stats">
            <div className="stat-box">
              <div className="stat-icon blue"><Icon name="latency" /></div>
              <div className="stat-info">
                <span>Latency</span>
                <strong>12ms</strong>
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-icon teal"><Icon name="engine" /></div>
              <div className="stat-info">
                <span>Engine</span>
                <strong>VaidyaGo Core v4.2</strong>
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-icon green"><Icon name="security" /></div>
              <div className="stat-info">
                <span>Security</span>
                <strong>End-to-End Encrypted</strong>
              </div>
            </div>
          </div>
        </div>
      </main>
      </div>
      {activeModal === 'profile' && (
        <Profile onClose={() => setActiveModal(null)} onAccountSettings={() => setActiveModal('account')} />
      )}
      {activeModal === 'account' && <Account onClose={() => setActiveModal(null)} />}
      {isNotificationOpen && <Notification onClose={() => setIsNotificationOpen(false)} />}
    </div>
  );
};

export default PostureAnalysis;
