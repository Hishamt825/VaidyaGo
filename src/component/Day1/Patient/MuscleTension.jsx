import React from 'react';
import { useNavigate } from 'react-router-dom';
import human1 from '../../../assets/human1.png';
import patientPhoto from '../../../assets/Patient Photo.svg';
import './MuscleTension.css';
import Sidebar from '../../../components/Patient/Patient_sidebar';

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
  const [active, setActive] = React.useState('Symptom Checker');
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);

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
      <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden ${isNotificationOpen ? 'blur-[4px] scale-[0.98] pointer-events-none' : ''}`}>
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
                    <div className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform">
                        <img src={patientPhoto} alt="User" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-[64px]">

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
    </div>
  );
};

export default MuscleTension;
