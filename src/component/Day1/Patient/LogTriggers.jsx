import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogTriggers.css';
import patientPhoto from '../../../assets/Patient Photo.svg';
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
    tech: <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />,
    stress: <circle cx="12" cy="12" r="10" />,
    sleep: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
    posture: <path d="M12 5v14M7 9l5-4 5 4M7 15l5 4 5-4" />,
    check: <polyline points="20 6 9 17 4 12" />,
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

const LogTriggers = () => {
  const navigate = useNavigate();
  const [active, setActive] = React.useState('Symptom Checker');
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const [showTechNeckModal, setShowTechNeckModal] = React.useState(false);
  const [showStressModal, setShowStressModal] = React.useState(false);
  const [showSleepModal, setShowSleepModal] = React.useState(false);
  const [showPostureModal, setShowPostureModal] = React.useState(false);
  const [showStreakModal, setShowStreakModal] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [showDurationPicker, setShowDurationPicker] = React.useState(false);
  const [selectedDuration, setSelectedDuration] = React.useState('30 - 60 mins');
  const [selectedSleepQuality, setSelectedSleepQuality] = React.useState('Moderate');
  const [selectedActivity, setSelectedActivity] = React.useState('Sitting at Desk');

  const durations = [
    '0 - 15 mins',
    '15 - 30 mins',
    '30 - 60 mins',
    '1 - 2 hours',
    '2 - 4 hours',
    '4+ hours'
  ];


  const triggers = [
    { id: 'tech', label: 'Tech Neck', desc: 'Strain from prolonged screen use and poor device ergonomics.', icon: 'tech' },
    { id: 'stress', label: 'Psychological Stress', desc: 'Emotional or cognitive pressure affecting physical tension.', icon: 'stress' },
    { id: 'sleep', label: 'Sleep Ergonomics', desc: 'Discomfort arising from poor sleeping positions or pillows.', icon: 'sleep' },
    { id: 'posture', label: 'Poor Posture', desc: 'Muscle fatigue caused by slouching or uneven weight distribution.', icon: 'posture' },
  ];

  const effects = ['Sharp Pain', 'Dull Ache', 'Stiffness', 'Numbness'];

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
      <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden ${isNotificationOpen || showTechNeckModal || showStressModal || showSleepModal || showPostureModal || showStreakModal || showSuccessModal ? 'blur-[4px] scale-[0.98] pointer-events-none' : ''}`}>
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

        <div className="lt-content-grid">
          {/* Left Column */}
          <div className="lt-left-col">
            <div className="lt-top-info">
              <span className="session-tag">MORNING SESSION • OCT 24, 2023</span>
              <div className="title-row">
                <h1>Log My Triggers</h1>
                <div className="title-actions">
                   <button className="btn-log-new">+ Log New Trigger</button>
                   <div className="streak-badge" onClick={() => setShowStreakModal(true)}>
                      <div className="streak-text">
                         <span>Daily</span>
                         <span>Streak</span>
                      </div>
                      <div className="streak-val">
                         <strong>12</strong>
                         <strong>Days</strong>
                      </div>
                      <div className="streak-icon">🔥</div>
                   </div>
                </div>
              </div>
              <p className="lt-subtitle">Alex, tracking daily triggers helps us fine-tune your recovery plan. Select what's impacting you today.</p>
            </div>

            <div className="triggers-grid">
               {triggers.map(trigger => (
                 <div 
                   key={trigger.id} 
                   className="trigger-card" 
                   onClick={() => {
                     if(trigger.id === 'tech') setShowTechNeckModal(true);
                     if(trigger.id === 'stress') setShowStressModal(true);
                     if(trigger.id === 'sleep') setShowSleepModal(true);
                     if(trigger.id === 'posture') setShowPostureModal(true);
                   }}
                 >
                   <div className="trigger-card-top">
                     <div className="trigger-card-icon"><Icon name={trigger.icon} /></div>
                     <div className="check-circle"><Icon name="check" /></div>
                   </div>
                   <h4>{trigger.label}</h4>
                   <p>{trigger.desc}</p>
                 </div>
               ))}
            </div>

            <div className="impact-tracking-card">
               <h3>Impact Tracking</h3>
               <div className="intensity-header">
                 <span>Trigger Intensity</span>
                 <span className="intensity-value">Moderate (4/10)</span>
               </div>
               <div className="intensity-slider-wrap">
                 <div className="intensity-slider">
                   <div className="slider-filled" style={{ width: '40%' }}></div>
                   <div className="slider-knob" style={{ left: '40%' }}></div>
                 </div>
                 <div className="slider-labels">
                   <span>Subtle</span>
                   <span>Overwhelming</span>
                 </div>
               </div>

               <div className="effect-section">
                  <label>Immediate Effect</label>
                  <div className="effects-row">
                    {effects.map(effect => (
                      <button key={effect} className={`effect-btn ${effect === 'Stiffness' ? 'active' : ''}`}>
                        {effect}
                      </button>
                    ))}
                  </div>
               </div>

               <button className="btn-save-entry" onClick={() => setShowSuccessModal(true)}>Save Trigger Entry</button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lt-right-col">
            <div className="frequency-card">
               <div className="card-header">
                 <h3>Weekly Frequency</h3>
                 <span className="latest-tag">LATEST TRENDS</span>
               </div>
               <div className="chart-placeholder">
                  <div className="bar" style={{ height: '60%' }}></div>
                  <div className="bar" style={{ height: '70%' }}></div>
                  <div className="bar" style={{ height: '40%' }}></div>
                  <div className="bar active" style={{ height: '90%' }}></div>
                  <div className="bar" style={{ height: '55%' }}></div>
                  <div className="bar" style={{ height: '30%' }}></div>
                  <div className="bar primary" style={{ height: '80%' }}></div>
               </div>
               <div className="chart-days">
                 <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
               </div>
               <p className="chart-observation">
                 <strong>Observation:</strong> Tech Neck triggers increased by 15% this week. Consider more micro-breaks during work hours.
               </p>
            </div>

            <div className="guidance-card">
               <div className="guidance-header">
                  <div className="award-icon">🏆</div>
               </div>
               <h3>Clinical Sanctuary Guidance</h3>
               <ul>
                 <li>Identifying triggers is 40% of the recovery journey. It builds "Somatic Awareness."</li>
               </ul>
            </div>

            <div className="recent-logs-card">
               <div className="card-header-alt">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
                 <h3>Recent Logs</h3>
               </div>
               <div className="logs-list">
                 <div className="log-item-alt">
                    <div className="log-item-left">
                       <Icon name="tech" />
                       <strong>Tech Neck</strong>
                    </div>
                    <span className="log-time">2h ago</span>
                 </div>
                 <div className="log-item-alt">
                    <div className="log-item-left">
                       <Icon name="stress" />
                       <strong>Stress</strong>
                    </div>
                    <span className="log-time">Yesterday</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </main>
      </div>

      {/* Tech Neck Trigger Modal */}
      {showTechNeckModal && (
        <div className="lt-modal-overlay">
          <div className="lt-modal-content">
            <button className="lt-modal-close" onClick={() => {setShowTechNeckModal(false); setShowDurationPicker(false);}}>×</button>
            
            <header className="lt-modal-header">
               <div className="lt-modal-icon-bg">
                 <Icon name="flash" />
               </div>
               <div className="lt-modal-title">
                  <span className="lt-modal-subtitle">LOG INTERACTION</span>
                  <h2>Tech Neck Trigger</h2>
               </div>
            </header>

            <div className="lt-modal-form-grid">
               <div className="lt-input-group">
                  <label>TIME OF OCCURRENCE</label>
                  <div className="lt-input-styled">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                     <span>07:30 PM</span>
                  </div>
               </div>
               <div className="lt-input-group" style={{ position: 'relative' }}>
                  <label>DURATION OF SCREEN USE</label>
                  <div className={`lt-input-styled has-chevron ${showDurationPicker ? 'active' : ''}`} onClick={() => setShowDurationPicker(!showDurationPicker)}>
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>
                     <span>{selectedDuration}</span>
                     <Icon name="chevron" className={showDurationPicker ? 'rotate-270' : 'rotate-90'} />
                  </div>

                  {showDurationPicker && (
                    <div className="lt-duration-dropdown">
                      <div className="lt-dropdown-list">
                        {durations.map(d => (
                          <div 
                            key={d} 
                            className={`lt-dropdown-item ${selectedDuration === d ? 'selected' : ''}`}
                            onClick={() => { setSelectedDuration(d); setShowDurationPicker(false); }}
                          >
                            {d}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
               </div>
            </div>

            <div className="lt-pain-level-section">
               <div className="lt-pain-level-header">
                  <label>CURRENT PAIN LEVEL</label>
                  <div className="lt-pain-val"><strong>7</strong>/10</div>
               </div>
               <div className="lt-pain-slider">
                  <div className="lt-pain-track">
                     {[1,2,3,4,5,6,7,8,9,10].map(dot => (
                       <div key={dot} className={`lt-pain-dot ${dot <= 7 ? 'active' : ''} ${dot === 7 ? 'current' : ''}`}></div>
                     ))}
                     <div className="lt-pain-progress" style={{ width: '66%' }}></div>
                  </div>
                  <div className="lt-pain-labels">
                     <span>MILD DISCOMFORT</span>
                     <span>SEVERE PAIN</span>
                  </div>
               </div>
            </div>

            <footer className="lt-modal-footer">
               <button className="btn-modal-save" onClick={() => setShowTechNeckModal(false)}>Save Log Entry</button>
               <button className="btn-modal-discard" onClick={() => setShowTechNeckModal(false)}>Discard</button>
               <div className="lt-modal-encrypted">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/></svg>
                  <span>ENCRYPTED SANCTUARY DATA</span>
               </div>
            </footer>
          </div>
        </div>
      )}

      {/* Psychological Stress Modal */}
      {showStressModal && (
        <div className="lt-modal-overlay">
          <div className="lt-modal-content stress">
            <button className="lt-modal-close" onClick={() => setShowStressModal(false)}>×</button>
            <header className="lt-modal-header-simple">
               <h2>Log Psychological Stress</h2>
               <div className="lt-patient-tag">
                  <span className="dot-green"></span>
                  PATIENT: ALEX RIVERA
               </div>
            </header>
            
            <p className="lt-modal-desc">
              Identifying the intensity and source of stress is the first step toward restoring your neurological balance.
            </p>

            <div className="lt-stress-intensity-box">
               <div className="lt-intensity-header-alt">
                  <label>CURRENT STRESS INTENSITY</label>
                  <div className="lt-intensity-val-alt">7.0</div>
               </div>
               <div className="lt-smooth-slider">
                  <div className="lt-slider-track-alt">
                     <div className="lt-slider-progress-alt" style={{ width: '70%' }}></div>
                     <div className="lt-slider-thumb-alt" style={{ left: '70%' }}></div>
                  </div>
                  <div className="lt-slider-markers-alt">
                     <span>0 (None)</span>
                     <span>10 (Extreme)</span>
                  </div>
               </div>
            </div>

            <div className="lt-stressor-section">
               <label>PRIMARY STRESSOR</label>
               <textarea 
                 placeholder="e.g., Project deadline at work, disrupted circadian rhythm..."
                 className="lt-stressor-input"
               ></textarea>
            </div>

            <footer className="lt-modal-footer-alt">
               <button className="btn-modal-cancel" onClick={() => setShowStressModal(false)}>Cancel</button>
               <button className="btn-modal-commit" onClick={() => setShowStressModal(false)}>Commit Entry</button>
            </footer>
          </div>
        </div>
      )}

      {/* Sleep Ergonomics Modal */}
      {showSleepModal && (
        <div className="lt-modal-overlay">
          <div className="lt-modal-content sleep">
            <button className="lt-modal-close" onClick={() => setShowSleepModal(false)}>×</button>
            <header className="lt-sleep-modal-header">
               <div className="lt-wellness-tag">WELLNESS ENTRY</div>
               <h2>Sleep Ergonomics</h2>
               <p>Logging for Alex Rivera • VaidyaGo Portal</p>
            </header>

            <div className="lt-sleep-quality-section">
               <label>SLEEP QUALITY</label>
               <div className="lt-sleep-cards">
                  {['Restless', 'Moderate', 'Deep'].map(q => (
                    <div 
                      key={q} 
                      className={`lt-sleep-card ${selectedSleepQuality === q ? 'active' : ''}`}
                      onClick={() => setSelectedSleepQuality(q)}
                    >
                      <div className="lt-sleep-icon">
                        {q === 'Restless' && <Icon name="sleep" />}
                        {q === 'Moderate' && <div className="cloud-icon">☁</div>}
                        {q === 'Deep' && <div className="half-moon">🌙</div>}
                      </div>
                      <span>{q}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="lt-pillow-comfort-section">
               <label>PILLOW COMFORT</label>
               <div className="lt-pillow-select">
                  <span>Adequate Support</span>
                  <Icon name="chevron" className="rotate-90" />
               </div>
            </div>

            <div className="lt-waking-stiffness-section">
               <div className="lt-stiffness-header">
                  <label>WAKING STIFFNESS</label>
                  <span className="stiffness-tag">Mild</span>
               </div>
               <div className="lt-stiffness-slider">
                  <div className="lt-stiffness-track">
                     <div className="lt-stiffness-progress" style={{ width: '30%' }}></div>
                  </div>
                  <div className="lt-stiffness-labels">
                     <span>FLEXIBLE</span>
                     <span>VERY STIFF</span>
                  </div>
               </div>
            </div>

            <footer className="lt-sleep-footer">
               <button className="btn-confirm-sleep" onClick={() => setShowSleepModal(false)}>Confirm Log Entry</button>
               <button className="btn-history-round">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 1 0 10 10"/></svg>
               </button>
            </footer>
          </div>
        </div>
      )}

      {/* Poor Posture Modal */}
      {showPostureModal && (
        <div className="lt-modal-overlay">
          <div className="lt-modal-content posture">
            <header className="lt-posture-modal-header">
               <button className="lt-modal-close" onClick={() => setShowPostureModal(false)}>×</button>
               <h2>Poor Posture</h2>
               <p>Logging for Alex Rivera • VaidyaGo Clinical Sanctuary</p>
            </header>

            <div className="lt-modal-scroll-area">
               <div className="lt-posture-section">
                  <label>CONTEXT ACTIVITY</label>
                  <div className="lt-activity-tags">
                     {['Sitting at Desk', 'Standing', 'Mobile Device', 'Other Activity'].map(act => (
                       <div 
                         key={act} 
                         className={`lt-activity-tag ${selectedActivity === act ? 'active' : ''}`}
                         onClick={() => setSelectedActivity(act)}
                       >
                         {act}
                       </div>
                     ))}
                  </div>
               </div>

               <div className="lt-posture-section">
                  <div className="lt-strain-header">
                     <label>STRAIN LEVEL</label>
                     <span className="strain-val-text">Moderate</span>
                  </div>
                  <div className="lt-strain-slider">
                     <div className="lt-strain-track">
                        <div className="lt-strain-progress" style={{ width: '50%' }}></div>
                        <div className="lt-strain-thumb" style={{ left: '50%' }}></div>
                     </div>
                     <div className="lt-strain-labels">
                        <span>MILD</span>
                        <span>ACUTE</span>
                     </div>
                  </div>
               </div>

               <div className="lt-posture-section">
                  <label>BODY AWARENESS NOTES</label>
                  <textarea 
                    placeholder="Describe any specific sensations or areas of tension..."
                    className="lt-posture-notes"
                  ></textarea>
               </div>
            </div>

            <footer className="lt-posture-footer">
               <button className="btn-posture-cancel" onClick={() => setShowPostureModal(false)}>Cancel</button>
               <button className="btn-posture-complete" onClick={() => setShowPostureModal(false)}>Complete Log Entry</button>
            </footer>
          </div>
        </div>
      )}
      {/* Daily Streak Modal */}
      {showStreakModal && (
        <div className="lt-modal-overlay">
          <div className="lt-modal-content streak-summary">
            <button className="lt-modal-close" onClick={() => setShowStreakModal(false)}>×</button>
            
            <div className="lt-streak-header">
               <div className="lt-flame-large">🔥</div>
               <h2>12 Day Streak!</h2>
               <p>Alex, you've consistently logged your triggers for 12 days. This commitment is vital for your recovery journey.</p>
            </div>

            <div className="lt-streak-calendar">
               <label>LAST 7 DAYS</label>
               <div className="lt-calendar-track">
                  {['M','T','W','T','F','S','S'].map((day, idx) => (
                    <div key={idx} className={`lt-calendar-day ${idx < 6 ? 'completed' : 'today'}`}>
                       <span className="day-name">{day}</span>
                       <div className="day-circle">
                          {idx < 6 ? <Icon name="check" /> : idx === 6 ? '•' : ''}
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="lt-streak-achievement">
               <div className="achievement-icon">🏆</div>
               <div className="achievement-info">
                  <strong>Next Milestone: 15 Days</strong>
                  <span>3 days to unlock "Consistency Master" badge</span>
               </div>
            </div>

            <div className="lt-streak-actions">
               <button className="btn-streak-continue" onClick={() => setShowStreakModal(false)}>Continue Journey</button>
               <button className="btn-streak-history" onClick={() => setShowStreakModal(false)}>View Streak History</button>
            </div>
          </div>
        </div>
      )}
      {/* Success / Entry Secured Modal */}
      {showSuccessModal && (
        <div className="lt-modal-overlay">
          <div className="lt-modal-content success">
             <div className="lt-success-icon-wrap">
                <div className="lt-check-circle-large">
                   <Icon name="check" />
                </div>
             </div>
             
             <h2>Entry Secured</h2>
             <p className="lt-success-desc">
                Your trigger entry has been securely saved to your health profile for <span className="text-highlight">Alex Rivera</span>.
             </p>

             <div className="lt-patient-profile-card">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Alex" />
                <div className="lt-profile-info">
                   <strong>Alex Rivera</strong>
                   <span>Profile #VG-88219</span>
                </div>
                <div className="lt-active-tag">Active Record</div>
             </div>

             <div className="lt-success-footer">
                <button className="btn-view-history" onClick={() => setShowSuccessModal(false)}>View Log History</button>
                <button className="btn-dismiss" onClick={() => setShowSuccessModal(false)}>Dismiss</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogTriggers;
