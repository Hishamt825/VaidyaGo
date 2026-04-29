import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import patientPhoto from '../../../assets/Patient Photo.svg';
import './CarePlan.css';
import Sidebar from '../../../components/Patient/Patient_sidebar';
import Profile from '../../../components/Patient/Profile';
import Account from '../../../components/Patient/Account';
import Notification from '../../../components/Patient/notification';

const Icon = ({ name, className, size = 20 }) => {
  const icons = {
    overview: (
      <React.Fragment>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </React.Fragment>
    ),
    meds: (
      <React.Fragment>
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
        <path d="m8.5 8.5 7 7" />
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
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </React.Fragment>
    ),
    bag: (
      <React.Fragment>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
      </React.Fragment>
    ),
    check: <polyline points="20 6 9 17 4 12" />,
    access: (
      <React.Fragment>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </React.Fragment>
    )
  };

  return (
    <svg 
      className={className} 
      width={size}
      height={size}
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

const CarePlan = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('Symptom Checker');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const roadmapPhases = [
    {
      number: 1,
      title: 'Phase 1: Stabilization',
      time: 'Weeks 1-4',
      desc: 'Initial focus on acute symptom control using non-sedating antihistamines and nasal corticosteroids to establish a baseline of comfort.',
      tags: ['SYMPTOM AUDIT', 'BASELINE TESTING'],
      color: '#1a2b4b'
    },
    {
      number: 2,
      title: 'Phase 2: Building Immunity',
      time: 'Months 2-4',
      desc: 'Induction phase of sublingual immunotherapy (SLIT). We gradually introduce allergen extracts to retrain your immune system\'s response.',
      tags: ['DOSE ESCALATION', 'IMMUNE MONITORING'],
      color: '#14b8a6'
    },
    {
      number: 3,
      title: 'Phase 3: Long-term Health',
      time: 'Months 5-6',
      desc: 'Transition to maintenance therapy combined with strategic allergen avoidance and environmental optimizations.',
      tags: ['MAINTENANCE', 'PEAK FLOW TRACKING'],
      color: '#4db8c0'
    }
  ];

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
      <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden ${activeModal || isNotificationOpen ? 'blur-[4px] scale-[0.98] pointer-events-none' : ''}`}>
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

        {/* Hero Section */}
        <section className="cp-hero">
          <div className="hero-badge">
             <div className="badge-icon">
                <Icon name="access" size={16} />
             </div>
             <span>CLINICAL SANCTUARY ACCESS</span>
          </div>
          <h1>Welcome to Your Personalized Care Plan</h1>
          <p>Alex, we've analyzed your seasonal allergen sensitivities to craft a path toward respiratory freedom.</p>
        </section>

        <div className="cp-content-grid">
          {/* Left Column */}
          <div className="cp-left-col">
            <div className="cp-card protocol-card">
              <div className="card-top">
                <div className="protocol-icon">
                  <Icon name="bag" size={24} />
                </div>
                <span className="active-badge">PLAN ACTIVE</span>
              </div>
              <h3>Rhinitis Recovery Protocol</h3>
              <div className="protocol-meta">
                <span className="meta-time">🕒 6-month estimated duration</span>
              </div>
              <div className="meta-table">
                <div className="meta-row">
                  <label>Focus Area</label>
                  <strong>Seasonal Allergies</strong>
                </div>
                <div className="meta-row">
                  <label>Severity</label>
                  <strong className="severity-text">Moderate-Controlled</strong>
                </div>
              </div>
            </div>

            <div className="cp-card responsibilities-card">
              <div className="resp-header">
                <div className="check-outer">
                   <Icon name="check" size={14} className="teal-text" />
                </div>
                <h3>Patient Responsibilities</h3>
              </div>
              <ul className="resp-list">
                <li>Daily logging of symptoms and triggers in the Sanctuary app.</li>
                <li>Strict adherence to the induction dosage schedule.</li>
                <li>Weekly check-ins with your care coordinator.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Roadmap */}
          <div className="cp-right-col">
            <div className="cp-card roadmap-card">
              <h2>Roadmap to Recovery</h2>
              <div className="roadmap-timeline">
                {roadmapPhases.map((phase, idx) => (
                  <div key={idx} className="roadmap-item">
                    <div className="timeline-left">
                      <div className="phase-number" style={{ background: phase.color }}>{phase.number}</div>
                      {idx !== roadmapPhases.length - 1 && <div className="timeline-line"></div>}
                    </div>
                    <div className="phase-content">
                      <div className="phase-header">
                        <h4>{phase.title}</h4>
                        <span className="phase-time">{phase.time}</span>
                      </div>
                      <p>{phase.desc}</p>
                      <div className="phase-tags">
                        {phase.tags.map(tag => (
                          <span key={tag} className="phase-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action Card */}
            <div className="cp-footer-card">
              <div className="footer-text">
                <h3>Ready to start?</h3>
                <p>Reviewing your plan is the first step toward lasting wellness.</p>
              </div>
              <button className="start-plan-btn" onClick={() => navigate('/Stabilization')}>
                start plan
              </button>
            </div>
          </div>
        </div>
      </main>
      </div>
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

export default CarePlan;
