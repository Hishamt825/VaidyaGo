import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Analysiscomplete.css';
import Sidebar from '../../../components/Patient/Patient_sidebar';
import Profile from '../../../components/Patient/Profile';
import Account from '../../../components/Patient/Account';
import Notification from '../../../components/Patient/notification';

// Assets
import patientPhoto from '../../../assets/Patient Photo.svg';
import duckDoctor from '../../../assets/duck_doctor.png';
import postureScan from '../../../assets/mri_scan.png';

const Analysiscomplete = () => {
  const navigate = useNavigate();
  const [active, setActive] = React.useState('Symptom Checker');
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [activeModal, setActiveModal] = React.useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);

  return (
    <div className="analysis-layout">
      <Sidebar
        active={active}
        setActive={setActive}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* ── Main Area ── */}
      <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden ${activeModal || isNotificationOpen ? 'modal-blur' : ''}`}>
        {/* Top Navbar (Same as Body.jsx) */}
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
            <div className="flex items-center gap-4 flex-1">
                <button 
                    onClick={() => navigate('/PostureAnalysis2')}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95"
                    title="Back to Posture Analysis 2"
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

        <main className="analysis-main">
          {/* Analysis Complete Header */}
          <section className="analysis-header">
            <div className="header-title-row">
              <div className="check-icon-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h1>Analysis Complete!</h1>
            </div>
            <p className="header-subtitle">Postural mapping synchronized with Alex Rivera's clinical history.</p>
          </section>

          <div className="analysis-content-grid">
            {/* Left Column: Postural Scan Capture */}
            <div className="scan-capture-card">
              <div className="card-header">
                <h2>Postural Scan Capture</h2>
                <span className="badge-overlay">Static Map Overlay</span>
              </div>
              
              <div className="scan-image-container">
                <img src={postureScan} alt="Postural Scan" className="scan-image" />
                <div className="scan-overlays">
                  <div className="scan-data-badge">Cervical Deviation: 1.2°</div>
                  <div className="scan-data-badge">Pelvic Tilt: Neutral</div>
                </div>
              </div>

              <div className="scan-actions">
                <button className="btn-teal">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  View Full Alignment Report
                </button>
                <button className="btn-outline">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                  Retake Scan
                </button>
              </div>
            </div>

            {/* Right Column: Panel */}
            <div className="analysis-right-panel">
              {/* Patient Profile */}
              <div className="patient-profile-card">
                <h3>Patient Profile</h3>
                <div className="patient-info-row">
                  <img src={patientPhoto} alt="Alex Rivera" className="patient-avatar" />
                  <div className="patient-details">
                    <h4>Alex Rivera</h4>
                    <p>Age: 28</p>
                    <p>ID: #8929-YG</p>
                  </div>
                </div>
              </div>

              {/* Ducktor AI */}
              <div className="ducktor-card">
                <div className="ducktor-robot-icon">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="white" opacity="0.1"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7v8H3v-8a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M9 13H7v2h2v-2m8 0h-2v2h2v-2m-4 4H7v2h10v-2h-6z"/></svg>
                </div>
                <div className="ducktor-header">
                  <div className="ducktor-avatar">
                    <img src={duckDoctor} alt="Ducktor" />
                  </div>
                  <span>Ducktor AI</span>
                </div>
                <div className="ducktor-message">
                  Great work, Alex! Your postural map is ready. I've detected a few areas for improvement in your cervical and thoracic alignment. Click below to see your detailed breakdown.
                </div>
              </div>

              {/* Processing Status */}
              <div className="status-card">
                <div className="status-row">
                  <span>Processing Status</span>
                  <span>100%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '100%' }}></div>
                </div>
                <div className="data-secured">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  Data Secured
                </div>
                <div className="tags-row">
                  <span className="tag">#Physiotherapy</span>
                  <span className="tag">#Alignment</span>
                  <span className="tag">#Posture</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals (Same as Body.jsx) */}
      {activeModal === 'profile' && (
        <Profile onClose={() => setActiveModal(null)} onAccountSettings={() => setActiveModal('account')} />
      )}
      {activeModal === 'account' && <Account onClose={() => setActiveModal(null)} />}
      {isNotificationOpen && <Notification onClose={() => setIsNotificationOpen(false)} />}
    </div>
  );
};

export default Analysiscomplete;
