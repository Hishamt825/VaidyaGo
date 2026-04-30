import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MaintenanceLog.css';
import Sidebar from '../../../components/Patient/Patient_sidebar';
import patientPhoto from '../../../assets/Patient Photo.svg';
import drElena from '../../../assets/alena.png';
import ConsultationModal from './ConsultationModal';

const Icon = ({ name }) => {
  const icons = {
    records: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    check: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
    streak: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    bell: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    calendar: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  };
  return icons[name] || null;
};

const MaintenanceLog = () => {
  const navigate = useNavigate();
  const [active, setActive] = React.useState('Symptom Checker');
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [activeModal, setActiveModal] = React.useState(null);
  const [showSchedulePopup, setShowSchedulePopup] = React.useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = React.useState(false);
  const [showCalendarOptionsPopup, setShowCalendarOptionsPopup] = React.useState(false);

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
      <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden ${activeModal ? 'blur-[4px] scale-[0.98] pointer-events-none' : ''}`}>
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
            
            {/* Back Button */}
            <button 
                onClick={() => navigate('/Phase3D')}
                className="flex text-white w-[38px] h-[38px] mr-4 bg-white/10 border border-white/5 rounded-full hover:bg-white/20 transition-all items-center justify-center shrink-0"
                title="Back to Phase 3"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
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
                <div className="relative group cursor-pointer p-1">
                    <Icon name="bell" />
                    <span className="absolute top-0 right-0 w-[8px] h-[8px] bg-[#6ED4D4] rounded-full border-2 border-[#0B1F4D]"></span>
                </div>
                <div className="flex items-center gap-[12px] pl-[20px] border-l border-white/10">
                    <div className="text-right hidden sm:block">
                        <p className="text-white text-[13px] font-bold leading-tight">Alex Rivera</p>
                        <p className="text-white/40 text-[10px] font-medium">Maintenance Tier</p>
                    </div>
                    <div className="w-[38px] h-[38px] rounded-full border-2 border-[#6ED4D4]/30 p-[2px] transition-transform hover:scale-105 cursor-pointer">
                        <img src={patientPhoto} className="w-full h-full rounded-full object-cover" alt="Profile" />
                    </div>
                </div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-[64px]">

        <div className="log-main-container">
          <div className="log-left-column">
            <div className="log-phase-card">
              <div className="lp-header">
                <h3>Phase 3: Maintenance</h3>
                <span className="lp-subtitle">STABILITY & LONGEVITY FOCUS</span>
              </div>
              <div className="lp-progress-row">
                <div className="lp-day-wrap">
                  <span className="lp-day-big">Day 42</span>
                  <span className="lp-day-total">/ 90</span>
                </div>
                <div className="lp-milestone">
                   <label>CURRENT MILESTONE</label>
                   <strong>Mid-Phase Assessment</strong>
                </div>
              </div>
              <div className="lp-progress-bar">
                 <div className="lp-fill" style={{ width: '46%' }}></div>
              </div>
            </div>

            <div className="log-history-section">
               <div className="history-header">
                  <h2>Log History</h2>
                  <span className="view-calendar">View Calendar <Icon name="calendar" /></span>
               </div>

               <div className="log-list">
                  <div className="log-entry today">
                     <div className="entry-header">
                        <div className="entry-date">
                           <span className="day-name">TODAY</span>
                           <strong>Wednesday, October 25</strong>
                        </div>
                        <span className="status-badge complete">COMPLETE</span>
                     </div>
                     <div className="entry-tasks-row">
                        <div className="task-pill-large">
                           <span className="pill-icon">💨</span>
                           <div className="pill-info">
                              <label>Air Quality</label>
                              <strong>Verified • HEPA Optimal</strong>
                           </div>
                        </div>
                        <div className="task-pill-large">
                           <span className="pill-icon">💧</span>
                           <div className="pill-info">
                              <label>Hydration</label>
                              <strong>Achieved 3.2L</strong>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="log-entry yesterday">
                     <div className="entry-header">
                        <div className="entry-date">
                           <span className="day-name">YESTERDAY</span>
                           <strong>Tuesday, October 24</strong>
                        </div>
                        <div className="entry-check-icon">
                           <Icon name="check" />
                        </div>
                     </div>
                     <div className="entry-pills-row">
                        <span className="entry-pill">3.0L Water</span>
                        <span className="entry-pill">10k Steps</span>
                        <span className="entry-pill">Sleep Hygiene: Yes</span>
                     </div>
                  </div>

                  <div className="log-entry">
                     <div className="entry-header">
                        <div className="entry-date">
                           <span className="day-name">MONDAY</span>
                           <strong>October 23</strong>
                        </div>
                        <div className="entry-check-icon">
                           <Icon name="check" />
                        </div>
                     </div>
                     <div className="entry-pills-row">
                        <span className="entry-pill">2.8L Water</span>
                        <span className="entry-pill">Meditation: 15m</span>
                        <span className="entry-pill">Pulse Check: 64bpm</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="log-right-column">
            <div className="log-adherence-card" onClick={() => navigate('/RecoveryJourney')}>
               <div className="ad-header">
                  <h3>Adherence Consistency</h3>
                  <span className="ad-badge">EXCELLENT</span>
               </div>
               <div className="ad-content">
                  <div className="ad-circle">
                     <div className="ad-circle-inner">
                        <span className="ad-percent">94%</span>
                        <span className="ad-label">OVERALL</span>
                     </div>
                     <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" className="bg" />
                        <circle cx="50" cy="50" r="40" className="progress" style={{ strokeDashoffset: '25' }} />
                     </svg>
                  </div>
                  <div className="ad-streak-box">
                     <div className="streak-left">
                        <div className="streak-icon-circle">
                           <Icon name="streak" />
                        </div>
                        <div className="streak-text">
                           <label>Current Streak</label>
                           <strong>12 Days</strong>
                        </div>
                     </div>
                     <div className="streak-graph-circle">📈</div>
                  </div>
               </div>
            </div>

             <div className="log-tip-card">
                <div className="tip-doc-info">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" alt="Dr. Sterling" />
                   <div className="doc-meta">
                      <strong>Dr. Sterling</strong>
                      <span>CHIEF HEALTH STRATEGIST</span>
                   </div>
                </div>
                <h3>Sustainability Tip</h3>
                <p>
                   "Maintenance isn't about perfection; it's about recovery speed. If you miss a hydration goal, don't double up tomorrow — just return to the rhythm immediately. Your cellular health thrives on consistency over intensity."
                </p>
                <button className="btn-schedule-clinical-visit" onClick={() => setShowSchedulePopup(true)}>Schedule Clinical Visit</button>
             </div>

             <div className="log-ducktor-box">
                <div className="duck-icon-box">
                   <img src="https://api.dicebear.com/7.x/bottts/svg?seed=duck" alt="Duck" />
                </div>
                <div className="duck-content">
                   <label>DUCKTOR'S LOG-IT LOGIC</label>
                   <p>"Logging takes 30 seconds but saves 30 hours of worry! Keep that 12-day streak glowing — you're doing swimmingly!"</p>
                </div>
             </div>

             <div className="upcoming-assessment-card">
                <label>Upcoming Assessment</label>
                <div className="assessment-date-row">
                   <div className="date-sq">28</div>
                   <div className="date-info">
                      <strong>Phase 3 Vital Review</strong>
                      <span>Saturday • 09:00 AM</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </main>
      </div>

      <ConsultationModal isOpen={activeModal === 'consultation'} onClose={() => setActiveModal(null)} />

      {/* Phase 3 Review Schedule Popup */}
      {showSchedulePopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }}
          onClick={() => setShowSchedulePopup(false)}
        >
          <div
            className="bg-white rounded-[40px] w-full max-w-[520px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative p-8 pb-10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4D] via-[#1A7785] to-[#49AAB3] opacity-90"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/30 shadow-lg">
                      <img src={drElena} alt="Dr. Elena Sterling" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#22C55E] border-2 border-white rounded-full flex items-center justify-center shadow-sm">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white leading-tight">Schedule Your Phase 3 Review</h2>
                    <p className="text-white/70 text-[13px] mt-0.5 font-medium">Dr. Elena Sterling</p>
                    <p className="text-[10px] font-black text-[#6ED4D4] uppercase tracking-widest mt-1">NEUROLOGY & CLINICAL STRATEGY</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowSchedulePopup(false)}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-md"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-8 space-y-8 bg-white max-h-[70vh] overflow-y-auto no-scrollbar">
              {/* Date Selection */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Select Consultation Day</h3>
                  <span className="text-[11px] font-bold text-[#1A7785]">October 2023</span>
                </div>
                <div className="flex gap-2.5">
                  {[
                    { day: 'MON', date: '16' },
                    { day: 'TUE', date: '17' },
                    { day: 'WED', date: '18', active: true },
                    { day: 'THU', date: '19' },
                    { day: 'FRI', date: '20' },
                    { day: 'SAT', date: '21' }
                  ].map((d, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 flex flex-col items-center py-4 rounded-[20px] transition-all cursor-pointer ${
                        d.active 
                        ? 'bg-teal-50 border-2 border-teal-600 shadow-sm' 
                        : 'bg-slate-50 border-2 border-transparent hover:border-slate-100'
                      }`}
                    >
                      <span className={`text-[9px] font-black uppercase tracking-widest ${d.active ? 'text-teal-600' : 'text-slate-400'}`}>{d.day}</span>
                      <span className={`text-lg font-black mt-1 ${d.active ? 'text-teal-900' : 'text-slate-800'}`}>{d.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-4 text-left">Available Time Slots</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3 text-left">Morning</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['09:00 AM', '10:30 AM', '11:30 AM'].map((time, i) => (
                        <button key={i} className={`py-3 rounded-xl text-sm font-bold transition-all ${i === 1 ? 'bg-[#0B1F4D] text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3 text-left">Afternoon</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['02:00 PM', '03:30 PM', '04:45 PM'].map((time, i) => (
                        <button key={i} className="py-3 rounded-xl bg-slate-50 text-slate-500 font-bold text-sm hover:bg-slate-100 transition-all">
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation Type */}
              <div>
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-4 text-left">Consultation Type</h3>
                <div className="flex p-1.5 bg-slate-100 rounded-2xl">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-[#1A7785] rounded-xl text-sm font-bold shadow-sm transition-all">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                    Video Call
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 text-slate-500 text-sm font-bold hover:text-slate-700 transition-all">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    Clinic Visit
                  </button>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-[#EBF7F8] rounded-3xl p-6 flex items-center justify-between border border-[#D9EFF1]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-teal-600 shadow-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#0B1F4D]">Wednesday, Oct 18</h4>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">10:30 AM • Video Call</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">CLINICAL REVIEW FEE</p>
                  <p className="text-2xl font-black text-[#0B1F4D]">$120.00</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-6 pt-4">
                <button 
                  onClick={() => { setShowSchedulePopup(false); setShowSuccessPopup(true); }}
                  className="flex-1 py-4 rounded-3xl text-white font-extrabold text-lg shadow-xl shadow-teal-900/10 transition-all hover:scale-[1.02] active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #0B1F4D 0%, #0d6e6e 100%)' }}
                >
                  Confirm & Schedule
                </button>
                <div className="flex flex-col items-center">
                  <button 
                    onClick={() => setShowSchedulePopup(false)}
                    className="text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <div className="flex items-center gap-1.5 mt-2 opacity-30 select-none">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#64748b"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99z"/></svg>
                    <span className="text-[9px] font-black text-slate-500 tracking-tighter uppercase">VaidyaGo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Phase 3 Success Popup */}
      {showSuccessPopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }}
          onClick={() => setShowSuccessPopup(false)}
        >
          <div
            className="bg-white rounded-[40px] w-full max-w-[480px] shadow-2xl p-8 flex flex-col items-center relative animate-in zoom-in-95 duration-300"
            onClick={e => e.stopPropagation()}
          >
            {/* Success Icon */}
            <div className="w-24 h-24 rounded-full bg-teal-50 flex items-center justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-600/20">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            </div>

            {/* Header Text */}
            <h2 className="text-3xl font-extrabold text-[#0B1F4D] mb-3 text-center">Phase 3 Review Scheduled!</h2>
            <p className="text-[13px] text-slate-500 text-center mb-8 max-w-[340px] leading-relaxed">
              Your maintenance consultation with Dr. Sterling has been confirmed. A reminder has been set for your session.
            </p>

            {/* Summary Card */}
            <div className="w-full bg-slate-50 rounded-[32px] p-6 mb-8 border border-slate-100">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200/50">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <img src={drElena} alt="Doctor" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-teal-600 tracking-widest uppercase">SPECIALIST</span>
                  <h3 className="text-lg font-bold text-[#0B1F4D]">Dr. Elena Sterling</h3>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-2">DATE</p>
                  <div className="flex items-center gap-2 text-[#0B1F4D]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-teal-600">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span className="text-sm font-bold">Oct 18, 2023</span>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-2">TIME</p>
                  <div className="flex items-center gap-2 text-[#0B1F4D]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-teal-600">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span className="text-sm font-bold">10:30 AM</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                  <span className="text-sm font-medium">Video Call</span>
                </div>
                <span className="bg-teal-100/50 text-teal-600 text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-tighter">CONFIRMED</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full space-y-5">
              <button 
                onClick={() => { setShowSuccessPopup(false); setShowCalendarOptionsPopup(true); }}
                className="w-full py-4 rounded-3xl text-white font-extrabold text-lg flex items-center justify-center gap-3 shadow-xl shadow-teal-900/10 transition-all hover:scale-[1.02] active:scale-95"
                style={{ background: 'linear-gradient(135deg, #0B1F4D 0%, #0d6e6e 100%)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h8"/><path d="M12 11v6"/>
                </svg>
                Add to Calendar
              </button>
              <button 
                onClick={() => setShowSuccessPopup(false)}
                className="w-full text-center text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors flex items-center justify-center gap-2"
              >
                Return to Maintenance Log
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Calendar Options Popup */}
      {showCalendarOptionsPopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }}
          onClick={() => setShowCalendarOptionsPopup(false)}
        >
          <div
            className="bg-white rounded-[40px] w-full max-w-[440px] shadow-2xl flex flex-col items-center relative animate-in zoom-in-95 duration-300 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-full p-8 flex flex-col items-center">
              {/* Header Text */}
              <h2 className="text-2xl font-extrabold text-[#0B1F4D] mb-2 text-center">Add to Calendar</h2>
              <p className="text-xs text-slate-500 text-center mb-8 max-w-[280px] leading-relaxed">
                Sync your Phase 3 Review with your preferred calendar service.
              </p>

              {/* User Summary Card */}
              <div className="w-full bg-[#EBF7F8] rounded-2xl p-4 mb-8 flex items-center gap-4 border border-[#D9EFF1]">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img src={patientPhoto} alt="Alex Rivera" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-teal-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B1F4D]">Alex Rivera</h3>
                  <p className="text-[10px] font-black text-teal-600 uppercase tracking-tighter">PHASE 3 REVIEW • OCT 18, 10:30 AM</p>
                </div>
              </div>

              {/* Calendar Services */}
              <div className="w-full space-y-3 mb-8">
                {[
                  { name: 'Google Calendar', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
                  { name: 'Outlook Calendar', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
                  { name: 'Apple iCal', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M12 14v4"/><path d="M10 16h4"/></svg> }
                ].map((s, i) => (
                  <button 
                    key={i}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${i === 0 ? 'bg-white border-teal-500 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-200'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${i === 0 ? 'bg-teal-50 text-teal-600' : 'bg-slate-50 text-slate-400'}`}>
                        {s.icon}
                      </div>
                      <span className={`text-[15px] font-bold ${i === 0 ? 'text-[#0B1F4D]' : 'text-slate-500'}`}>{s.name}</span>
                    </div>
                    {i === 0 && <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center text-white"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg></div>}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="w-full space-y-4">
                <button 
                  onClick={() => setShowCalendarOptionsPopup(false)}
                  className="w-full py-4 rounded-[28px] text-white font-extrabold text-base shadow-xl shadow-teal-900/10 transition-all hover:scale-[1.02] active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #0B1F4D 0%, #0d6e6e 100%)' }}
                >
                  Confirm Sync
                </button>
                <button 
                  onClick={() => setShowCalendarOptionsPopup(false)}
                  className="w-full text-center text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors py-1"
                >
                  Maybe Later
                </button>
              </div>
            </div>

            {/* Footer Branding */}
            <div className="w-full bg-slate-50 py-3 flex items-center justify-center gap-2 border-t border-slate-100">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="#cbd5e1"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99z"/></svg>
               <span className="text-[9px] font-black text-slate-300 tracking-[0.1em] uppercase">SECURE CLINICAL INTEGRATION</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default MaintenanceLog;
