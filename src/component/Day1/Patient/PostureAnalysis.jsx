import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import patientPhoto from '../../../assets/Patient Photo.svg';
import './PostureAnalysis.css';
import Sidebar from '../../../components/Patient/Patient_sidebar';
import Profile from '../../../components/Patient/Profile';
import Account from '../../../components/Patient/Account';
import Notification from '../../../components/Patient/notification';
import clinicBg from '../../../assets/clinic_bg.png';

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
            <button 
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden text-white p-2 -ml-2 hover:bg-white/10 rounded-xl transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
            <div className="flex items-center gap-4 flex-1">
                <button 
                    onClick={() => navigate('/NeckAlignment')}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95"
                    title="Back to Neck Alignment"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
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

        {/* ── Content ── */}
        <div className="pa-container">
          <div className="pa-header-new">
            <div className="pa-title-section">
              <h1>Postural Analysis</h1>
              <p>Step 1: Alignment</p>
            </div>
            <div className="pa-progress-container">
              <span className="pa-progress-text">75% COMPLETE</span>
              <div className="pa-progress-bar-bg">
                <div className="pa-progress-bar-fill" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>

          <div className="pa-main-layout">
            {/* Camera Area */}
            <div className="pa-camera-section">
              <div 
                className="pa-viewport" 
                style={{ backgroundImage: `url("${clinicBg}")` }}
              >
                <div className="pa-live-badge">
                  <div className="pa-live-dot"></div>
                  LIVE FEED: ALEX RIVERA
                </div>

                {/* Alignment Guides */}
                <div className="pa-guide-line v-line"></div>
                <div className="pa-guide-line h-line-top" style={{ borderStyle: 'dashed', borderColor: 'rgba(110, 212, 212, 0.4)', borderWidth: '1px 0 0 0', width: '50%', top: '60%', left: '25%' }}></div>
                <div className="pa-guide-line h-line-bottom" style={{ borderStyle: 'dashed', borderColor: 'rgba(110, 212, 212, 0.4)', borderWidth: '1px 0 0 0', width: '50%', top: '80%', left: '25%' }}></div>
                
                {/* Side dots */}
                <div className="pa-dot-marker" style={{ top: '35%' }}></div>
                <div className="pa-dot-marker" style={{ top: '50%' }}></div>
                <div className="pa-dot-marker" style={{ top: '65%' }}></div>

                {/* Center silhouette target */}
                <div className="pa-center-target">
                  <svg className="pa-target-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>

                {/* Calibration Toast */}
                <div className="pa-calibration-toast">
                  <div className="pa-info-circle">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="pa-calibration-text">
                    <strong>Calibration Required</strong>
                    <p>Please align your shoulders and hips with the guide. Ensure you are in a well-lit area.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Panel */}
            <div className="pa-side-panel">
              <div className="pa-card">
                <h3>Patient Profile</h3>
                <div className="pa-patient-header">
                  <div className="pa-avatar-circle">AR</div>
                  <div className="pa-patient-info">
                    <h4>Alex Rivera</h4>
                    <span>ID: #8829-VG</span>
                  </div>
                </div>
                <div className="pa-data-grid">
                  <div className="pa-data-row">
                    <span className="pa-data-label">Height:</span>
                    <span className="pa-data-value">182 cm</span>
                  </div>
                  <div className="pa-data-row">
                    <span className="pa-data-label">Weight:</span>
                    <span className="pa-data-value">78 kg</span>
                  </div>
                  <div className="pa-data-row">
                    <span className="pa-data-label">Primary Concern:</span>
                    <span className="pa-data-value teal">Lumbar<br/>Alignment</span>
                  </div>
                </div>
              </div>

              <div className="pa-card pa-action-card">
                <h3>Ready to scan?</h3>
                <button className="pa-detect-btn" onClick={() => navigate('/PostureAnalysis2')}>
                  Start Auto-Detection
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <p className="pa-detect-subtext">Wait for the indicator to turn green</p>
              </div>

              <button className="pa-manual-btn">
                Manual Placement
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'profile' && (
        <Profile onClose={() => setActiveModal(null)} onAccountSettings={() => setActiveModal('account')} />
      )}
      {activeModal === 'account' && <Account onClose={() => setActiveModal(null)} />}
      {isNotificationOpen && <Notification onClose={() => setIsNotificationOpen(false)} />}
    </div>
  );
};

export default PostureAnalysis;
