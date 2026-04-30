import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Patient/Patient_sidebar';
import Profile from '../../../components/Patient/Profile';
import Account from '../../../components/Patient/Account';
import Notification from '../../../components/Patient/notification';
import patientPhoto from '../../../assets/Patient Photo.svg';
import drElena from '../../../assets/alena.png';

const ProgressReview = () => {
  const navigate = useNavigate();
  const [active, setActive] = React.useState('Symptom Checker');
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [activeModal, setActiveModal] = React.useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const [showAdherencePopup, setShowAdherencePopup] = React.useState(false);
  const [showSpecialistPopup, setShowSpecialistPopup] = React.useState(false);
  const [showChatPopup, setShowChatPopup] = React.useState(false);
  const [showBookingPopup, setShowBookingPopup] = React.useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = React.useState(false);
  const [showReportPopup, setShowReportPopup] = React.useState(false);

  const milestones = [
    { icon: '🌿', label: 'Symptom Baseline Set', date: 'Aug 01, 2024' },
    { icon: '📋', label: 'Initial Health Log Completed', date: 'Aug 05, 2024' },
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

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex text-white w-[38px] h-[38px] mr-4 bg-white/10 border border-white/5 rounded-full hover:bg-white/20 transition-all items-center justify-center shrink-0"
            title="Go Back"
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

        <main className="flex-1 overflow-y-auto pb-4">
          <div className="px-4 py-4 w-full">

            {/* Speech Bubble Row */}
            <div className="flex items-start gap-4 mb-7">
              <div className="w-16 h-16 rounded-full bg-white/15 border-2 border-white/20 overflow-hidden flex-shrink-0 flex items-center justify-center">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=duck" alt="AI assistant" className="w-full h-full object-cover" />
              </div>
              <div className="bg-white/90 text-slate-700 text-sm font-medium leading-relaxed px-5 py-4 rounded-2xl rounded-tl-sm max-w-[500px] shadow-lg">
                "Welcome, We're just beginning the Stabilization Phase. You're doing great taking these first steps."
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-[1fr_300px] gap-6 items-start">

              {/* Left: Recovery Roadmap */}
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                {/* Header */}
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Recovery Roadmap</h2>
                    <span className="text-xs text-slate-400 font-medium">Patient ID: #VR-7702</span>
                  </div>
                  <span className="bg-teal-50 text-teal-700 text-[10px] font-extrabold px-3 py-2 rounded-xl text-center leading-snug tracking-wide">
                    Active<br />Protocol
                  </span>
                </div>

                {/* Phase Timeline */}
                <div className="flex justify-between items-start mt-8 mb-7">
                  {/* Phase 1 */}
                  <div className="flex flex-col items-center flex-1 relative">
                    <div className="w-12 h-12 rounded-full bg-teal-50 border-2 border-teal-400 shadow-[0_0_0_4px_rgba(20,184,166,0.12)] flex items-center justify-center text-lg mb-2 z-10 relative">
                      🌿
                    </div>
                    {/* connector */}
                    <div className="absolute top-6 left-1/2 w-full h-[2px] bg-gradient-to-r from-teal-400 to-slate-200 z-0" />
                    <div className="text-center">
                      <span className="text-[9px] text-slate-400 font-semibold tracking-wide block">Phase 1:</span>
                      <strong className="text-[13px] font-bold text-slate-800 block mb-1">Stabilization</strong>
                      <div className="flex items-center justify-center gap-1 text-[9px] font-extrabold text-teal-700 tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
                        IN PROGRESS
                      </div>
                      <div className="w-14 h-[3px] bg-slate-200 rounded-full mt-2 mx-auto overflow-hidden">
                        <div className="h-full bg-teal-500 rounded-full" style={{ width: '15%' }} />
                      </div>
                    </div>
                  </div>

                  {/* Phase 2 */}
                  <div className="flex flex-col items-center flex-1 relative">
                    <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-400 mb-2 z-10 relative">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </div>
                    <div className="absolute top-6 left-1/2 w-full h-[2px] bg-slate-200 z-0" />
                    <div className="text-center">
                      <span className="text-[9px] text-slate-400 font-semibold tracking-wide block">Phase 2:</span>
                      <strong className="text-[13px] font-bold text-slate-800 block mb-1">Desensitization</strong>
                      <div className="text-[9px] font-extrabold text-slate-400 tracking-widest">UPCOMING</div>
                    </div>
                  </div>

                  {/* Phase 3 */}
                  <div className="flex flex-col items-center flex-1 relative">
                    <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-400 mb-2 z-10 relative">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </div>
                    <div className="text-center">
                      <span className="text-[9px] text-slate-400 font-semibold tracking-wide block">Phase 3:</span>
                      <strong className="text-[13px] font-bold text-slate-800 block mb-1">Maintenance</strong>
                      <div className="text-[9px] font-extrabold text-slate-400 tracking-widest">UPCOMING</div>
                    </div>
                  </div>
                </div>

                {/* Milestones */}
                <div className="border-t border-slate-100 pt-6">
                  <p className="text-[10px] font-extrabold text-slate-400 tracking-[1.2px] mb-4">KEY MILESTONES ACHIEVED</p>
                  <div className="flex flex-col gap-3">
                    {milestones.map((m, i) => (
                      <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
                        <div className="w-9 h-9 bg-teal-50 rounded-[10px] flex items-center justify-center text-base flex-shrink-0">
                          {m.icon}
                        </div>
                        <span className="flex-1 text-sm font-semibold text-slate-800">{m.label}</span>
                        <span className="text-xs text-slate-400 font-medium">{m.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-5">

                {/* Adherence Summary */}
                <div
                  className="bg-white rounded-3xl p-7 shadow-xl cursor-pointer hover:shadow-2xl hover:scale-[1.01] transition-all"
                  onClick={() => setShowAdherencePopup(true)}
                >
                  <h3 className="text-base font-bold text-slate-800 mb-5">Adherence Summary</h3>

                  {/* Circular Progress */}
                  <div className="relative w-[130px] h-[130px] mx-auto mb-5">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                      <circle
                        cx="50" cy="50" r="42"
                        fill="none" stroke="#14b8a6" strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="264"
                        strokeDashoffset={264 - (264 * 15) / 100}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <strong className="text-[22px] font-extrabold text-slate-900 leading-none">15%</strong>
                      <span className="text-[9px] font-bold text-slate-400 tracking-widest mt-0.5">PROGRESS</span>
                    </div>
                  </div>

                  {/* Protocol Duration */}
                  <div className="flex items-center gap-3 bg-[#0f172a] rounded-2xl px-4 py-3.5">
                    <div className="w-9 h-9 bg-white/10 rounded-[10px] flex items-center justify-center text-lg flex-shrink-0">
                      🔥
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-white/50 tracking-widest mb-0.5">PROTOCOL DURATION</label>
                      <strong className="text-[15px] font-extrabold text-white">Day 12 of 180</strong>
                    </div>
                  </div>
                </div>

                {/* Clinical Outlook */}
                <div className="rounded-3xl p-7 text-white shadow-xl" style={{ background: 'linear-gradient(135deg, #0f4c56 0%, #0e6370 100%)' }}>
                  <div className="text-[#6ED4D4] text-xl mb-3">✦</div>
                  <h3 className="text-[18px] font-extrabold text-white mb-3">Clinical Outlook</h3>
                  <p className="text-sm leading-relaxed text-white/75 mb-5">
                    Alex is in the early stages of the Stabilization Phase. Current focus is on establishing consistent logging and identifying primary environmental triggers for a refined treatment plan.
                  </p>
                  <button
                    onClick={() => setShowReportPopup(true)}
                    className="w-full py-3 bg-white text-[#0f4c56] rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 hover:bg-teal-50"
                  >
                    View Full Report
                  </button>
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

      {/* Adherence Summary Popup */}
      {showAdherencePopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowAdherencePopup(false)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-[720px] mx-4 shadow-2xl overflow-hidden flex"
            style={{ animation: 'fadeInUp 0.3s ease-out' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Left Panel */}
            <div
              className="w-[260px] flex-shrink-0 flex flex-col items-center justify-center p-8 text-white relative"
              style={{ background: 'linear-gradient(160deg, #0B2A4A 0%, #0d6e6e 60%, #14b8a6 100%)' }}
            >
              {/* Big Circle */}
              <div className="relative w-[140px] h-[140px] mb-5">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="white" strokeWidth="8"
                    strokeLinecap="round" strokeDasharray="264"
                    strokeDashoffset={264 - (264 * 96) / 100} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <strong className="text-[28px] font-extrabold text-white leading-none">96%</strong>
                  <span className="text-[9px] font-bold text-white/70 tracking-widest mt-1">CONSISTENCY</span>
                </div>
              </div>

              <h3 className="text-xl font-extrabold text-white mb-2">You're Thriving!</h3>
              <p className="text-[12px] text-white/70 text-center leading-relaxed mb-5">
                You are maintaining an elite-level adherence score this week. Keep up the great work!
              </p>
              <div className="flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-2 text-[11px] font-bold text-white">
                <span>↗</span> +4% FROM LAST WEEK
              </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 flex flex-col p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-1">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-[20px] font-extrabold text-slate-900">Your Adherence Summary</h2>
                    <span className="bg-teal-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full tracking-wider">LIVE</span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium">Reviewing your recent health routine</p>
                </div>
                <button
                  onClick={() => setShowAdherencePopup(false)}
                  className="text-slate-400 hover:text-slate-700 text-xl font-bold transition-colors"
                >×</button>
              </div>

              {/* Adherence Items */}
              <div className="flex flex-col gap-3 my-5">
                {[
                  { icon: '💊', label: 'Medications', sub: 'Twice daily routine', pct: 100, tag: 'PERFECT!', color: 'text-teal-500' },
                  { icon: '🏃', label: 'Exercises', sub: 'Physical Therapy (Set B)', pct: 85, tag: 'ALMOST THERE', color: 'text-orange-400' },
                  { icon: '📋', label: 'Daily Logs', sub: 'Pain & mood tracking', pct: 92, tag: 'VERY STEADY', color: 'text-teal-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-slate-50 rounded-2xl px-4 py-3.5">
                    <div className="w-9 h-9 bg-white rounded-xl shadow-sm flex items-center justify-center text-lg flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800">{item.label}</p>
                      <p className="text-xs text-slate-400">{item.sub}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-[18px] font-extrabold ${item.color}`}>{item.pct}%</p>
                      <p className={`text-[9px] font-extrabold tracking-wider ${item.color}`}>{item.tag}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Buddy Message */}
              <div className="bg-slate-50 rounded-2xl px-4 py-4 flex gap-3 mb-6">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=buddy"
                  alt="Buddy"
                  className="w-10 h-10 rounded-full border-2 border-teal-100 flex-shrink-0"
                />
                <div>
                  <p className="text-[10px] font-extrabold text-teal-600 tracking-wider mb-1">VAIDYAGO BUDDY <span className="text-slate-400 font-medium ml-1">· 2 mins ago</span></p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    "You're doing great! You missed a workout yesterday but recorded your mood accurately. Maybe try a lighter exercise session today?"
                  </p>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() => setShowAdherencePopup(false)}
                  className="flex-1 py-3 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => { setShowAdherencePopup(false); setShowSpecialistPopup(true); }}
                  className="flex-1 py-3 rounded-2xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #0B2A4A 0%, #0d6e6e 100%)' }}
                >
                  Ask a Specialist 🗨
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ask a Specialist Popup */}
      {showSpecialistPopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowSpecialistPopup(false)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-[580px] mx-4 shadow-2xl overflow-hidden p-8"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-[24px] font-extrabold text-slate-900 mb-2">Ask a Specialist</h2>
                <p className="text-sm text-slate-500 leading-relaxed max-w-[400px]">
                  Connect with our medical board for personalized guidance on your Rhinitis Recovery Protocol.
                </p>
              </div>
              <button
                onClick={() => setShowSpecialistPopup(false)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold transition-colors ml-4 flex-shrink-0"
              >×</button>
            </div>

            {/* Three Option Cards */}
            <div className="grid grid-cols-3 gap-4 mt-7 mb-7">
              {[
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  ),
                  title: 'Instant Clinical Chat',
                  desc: 'Quick questions about medication or daily symptoms.',
                  btn: 'Start Chat',
                  btnStyle: 'bg-[#0B2A4A] text-white hover:bg-[#0d3d5e]',
                },
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>
                    </svg>
                  ),
                  title: 'Video Consultation',
                  desc: 'In-depth 15-minute review of your monthly progress.',
                  btn: 'Book Session',
                  btnStyle: 'bg-teal-600 text-white hover:bg-teal-700',
                },
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                  ),
                  title: 'Hospital Visit',
                  desc: 'Physical assessment and diagnostic calibration at our facility.',
                  btn: 'Schedule Visit',
                  btnStyle: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
                },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-5 flex flex-col gap-3">
                  <div className="w-11 h-11 bg-white rounded-xl shadow-sm flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-1">{item.title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                  <button 
                    onClick={() => { 
                      if(item.btn === 'Start Chat') { setShowSpecialistPopup(false); setShowChatPopup(true); }
                      if(item.btn === 'Book Session') { setShowSpecialistPopup(false); setShowBookingPopup(true); }
                    }}
                    className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all mt-auto ${item.btnStyle}`}
                  >
                    {item.btn}
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-slate-400">
              Need immediate help?{' '}
              <span className="text-teal-600 font-bold cursor-pointer hover:underline">Contact Support</span>
            </div>
          </div>
        </div>
      )}

      {/* Instant Clinical Chat Popup */}
      {showChatPopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowChatPopup(false)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-[480px] mx-4 shadow-2xl overflow-hidden flex flex-col h-[600px]"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-5 flex items-center justify-between shrink-0 relative overflow-hidden" 
                 style={{ background: 'linear-gradient(90deg, #0B2A4A 0%, #0d6e6e 50%, #14b8a6 100%)' }}>
              <div className="flex items-center gap-4 relative z-10">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full border-2 border-white/30 overflow-hidden shadow-lg">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#0d4c4c] border-2 border-[#0B2A4A] rounded-full"></div>
                </div>
                <div className="text-white">
                  <h2 className="text-xl font-bold leading-tight tracking-wide">Sarah</h2>
                  <div className="flex items-center gap-1.5 opacity-80">
                    <span className="text-[10px] font-extrabold tracking-[1px] uppercase">ONLINE</span>
                    <span className="w-1 h-1 rounded-full bg-white/40"></span>
                    <span className="text-[10px] font-bold tracking-wider opacity-90">Healthcare Concierge</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 relative z-10">
                <button className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </button>
                <button
                  onClick={() => setShowChatPopup(false)}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-sm font-bold text-xl"
                >×</button>
              </div>
              
              {/* Subtle light effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none"></div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50/50">
              
              {/* Message 1 (Buddy) */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex-shrink-0 flex items-center justify-center text-teal-600">
                  <img src="https://api.dicebear.com/7.x/bottts/svg?seed=buddy" alt="Buddy" className="w-full h-full rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-slate-800">VaidyaGo Buddy</span>
                    <span className="text-[10px] text-slate-400">09:12 AM</span>
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-3.5 shadow-sm text-sm text-slate-600 leading-relaxed max-w-[280px]">
                    Welcome back, Alex! How are you feeling today?
                  </div>
                </div>
              </div>

              {/* Message 2 (Buddy) */}
              <div className="flex gap-3">
                <div className="w-8 h-8 shrink-0" />
                <div className="bg-white rounded-2xl p-3.5 shadow-sm text-sm text-slate-600 leading-relaxed max-w-[280px]">
                  I noticed your congestion was slightly higher in this morning's log.
                </div>
              </div>

              {/* Date Divider */}
              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-slate-100"></div>
                <span className="text-[10px] font-bold text-slate-300 tracking-widest uppercase">Today</span>
                <div className="flex-1 h-px bg-slate-100"></div>
              </div>

              {/* Message 3 (User) */}
              <div className="flex flex-row-reverse gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0 overflow-hidden">
                  <img src={patientPhoto} alt="Alex" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] text-slate-400">10:45 AM</span>
                    <span className="text-xs font-bold text-slate-800">You</span>
                  </div>
                  <div className="bg-[#0B2A4A] rounded-2xl rounded-tr-none p-3.5 shadow-md text-sm text-white leading-relaxed max-w-[280px]">
                    I've been experiencing mild congestion today.
                  </div>
                </div>
              </div>

              {/* Message 4 (Dr. Elena) */}
              <div className="flex gap-3 pb-4">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex-shrink-0 overflow-hidden border-2 border-white shadow-sm">
                  <img src={drElena} alt="Doctor" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-slate-800">Dr. Elena Sterling</span>
                    <span className="text-[10px] text-slate-400">10:48 AM</span>
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-3.5 shadow-sm text-sm text-slate-600 leading-relaxed max-w-[280px]">
                    Hi Alex, I see your logs. Mild congestion is expected in this phase. Are you taking your prescribed saline rinse?
                  </div>
                </div>
              </div>

            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100 shrink-0">
              <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-2 border border-slate-100 focus-within:border-teal-500/50 transition-all">
                <button className="text-slate-400 hover:text-teal-600 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.51a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                  </svg>
                </button>
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 py-2 placeholder:text-slate-400"
                />
                <button className="text-slate-400 hover:text-teal-600 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
                  </svg>
                </button>
                <button className="w-9 h-9 bg-[#0B2A4A] text-white rounded-xl flex items-center justify-center hover:bg-[#0d3d5e] transition-all shadow-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
      {/* Book Session Popup */}
      {showBookingPopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowBookingPopup(false)}
        >
          <div
            className="bg-white rounded-[32px] w-full max-w-[480px] mx-4 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {/* Doctor Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-[72px] h-[72px] rounded-[24px] overflow-hidden shadow-[0_8px_16px_rgba(0,0,0,0.1)] border border-slate-100">
                      <img src={drElena} alt="Doctor" className="w-full h-full object-cover bg-slate-100" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-[18px] h-[18px] bg-[#0d6e6e] border-[3px] border-white rounded-full shadow-sm"></div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#0d6e6e] tracking-[1.5px] uppercase">NEUROLOGY SPECIALIST</span>
                    <h2 className="text-[22px] font-extrabold text-[#0B1F4D] leading-tight mt-1">Dr. Elena Sterling</h2>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-teal-400 text-sm">★</span>
                      <span className="text-[13px] font-medium text-slate-500">4.9 (124 Reviews)</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowBookingPopup(false)}
                  className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all shadow-sm"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Select Date */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">Select Date</h3>
                  <span className="bg-teal-50 text-teal-600 text-[10px] font-bold px-3 py-1 rounded-full">October 2023</span>
                </div>
                <div className="flex gap-3">
                  {[
                    { day: 'MON', date: '23', active: true },
                    { day: 'TUE', date: '24' },
                    { day: 'WED', date: '25' },
                    { day: 'THU', date: '26' },
                    { day: 'FRI', date: '27' },
                  ].map((d, i) => (
                    <div key={i} className={`flex-1 flex flex-col items-center py-3 rounded-2xl border transition-all cursor-pointer ${d.active ? 'bg-[#0B1F4D] border-[#0B1F4D] text-white shadow-lg' : 'bg-slate-50 border-slate-50 text-slate-400 hover:border-slate-200'}`}>
                      <span className="text-[10px] font-bold mb-1 opacity-60">{d.day}</span>
                      <span className="text-lg font-extrabold">{d.date}</span>
                      {d.active && <div className="w-1 h-1 bg-teal-400 rounded-full mt-1"></div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-6">
                {/* Morning */}
                <div>
                  <div className="flex items-center gap-2 mb-3 text-slate-400">
                    <span className="text-sm">☀️</span>
                    <span className="text-xs font-bold uppercase tracking-wider">Morning</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {['09:00 AM', '10:30 AM', '11:15 AM'].map((t, i) => (
                      <button key={i} className="py-3 px-2 rounded-2xl bg-slate-50 text-slate-900 text-sm font-bold border border-transparent hover:border-teal-500/20 hover:bg-white transition-all shadow-sm">{t}</button>
                    ))}
                  </div>
                </div>

                {/* Afternoon */}
                <div>
                  <div className="flex items-center gap-2 mb-3 text-slate-400">
                    <span className="text-sm">🌤️</span>
                    <span className="text-xs font-bold uppercase tracking-wider">Afternoon</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {['02:00 PM', '03:45 PM', '04:30 PM'].map((t, i) => (
                      <button key={i} className={`py-3 px-2 rounded-2xl text-sm font-bold border transition-all shadow-sm ${t === '02:00 PM' ? 'bg-[#0B1F4D] border-[#0B1F4D] text-white shadow-lg' : 'bg-slate-50 border-transparent text-slate-900 hover:border-teal-500/20 hover:bg-white'}`}>{t}</button>
                    ))}
                  </div>
                </div>

                {/* Evening */}
                <div>
                  <div className="flex items-center gap-2 mb-3 text-slate-400">
                    <span className="text-sm">🌙</span>
                    <span className="text-xs font-bold uppercase tracking-wider">Evening</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {['06:00 PM', '07:30 PM', '08:00 PM'].map((t, i) => (
                      <button key={i} className="py-3 px-2 rounded-2xl bg-slate-50 text-slate-400 text-sm font-bold border border-transparent cursor-not-allowed opacity-60">{t}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Summary Section */}
            <div className="p-8 bg-slate-50 border-t border-slate-100">
              {/* Summary Card */}
              <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm mb-6 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">Mon, 23 Oct • 02:00 PM</p>
                    <p className="text-[11px] text-slate-400 font-medium">Video Consultation</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">TOTAL FEE</p>
                  <p className="text-xl font-extrabold text-[#0B1F4D]">$120</p>
                </div>
              </div>

              {/* Confirm Button */}
              <button 
                onClick={() => { setShowBookingPopup(false); setShowSuccessPopup(true); }}
                className="w-full py-4 rounded-3xl text-white font-extrabold text-lg flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-[1.02] active:scale-95"
                style={{ background: 'linear-gradient(135deg, #0d6e6e 0%, #0B1F4D 100%)' }}
              >
                Confirm Booking
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              
              <p className="text-center text-[10px] text-slate-400 mt-4 font-medium">
                By confirming, you agree to our patient confidentiality terms.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Booking Success Popup */}
      {showSuccessPopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowSuccessPopup(false)}
        >
          <div
            className="bg-white rounded-[32px] w-full max-w-[440px] mx-4 shadow-2xl p-6 flex flex-col items-center relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center mb-5 mt-2">
              <div className="w-14 h-14 rounded-full bg-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-600/20">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            </div>

            {/* Header Text */}
            <h2 className="text-2xl font-extrabold text-[#0B1F4D] mb-1.5 text-center">Booking Confirmed!</h2>
            <p className="text-sm text-slate-500 text-center mb-6 max-w-[300px] leading-relaxed">
              Alex Rivera, your session has been secured in our system.
            </p>

            {/* Summary Card */}
            <div className="w-full bg-slate-50 rounded-[24px] p-4 mb-4 border border-slate-200">
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-200">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <img src={drElena} alt="Doctor" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-teal-600 tracking-widest uppercase">SPECIALIST</span>
                  <h3 className="text-base font-bold text-[#0B1F4D]">Dr. Elena Sterling</h3>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-teal-600 shadow-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <span className="text-[13px] font-bold">Monday, Oct 23, 2023</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-teal-600 shadow-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <span className="text-[13px] font-bold">02:00 PM (EDT)</span>
                </div>
              </div>
            </div>

            {/* Notification Banner */}
            <div className="w-full bg-slate-50 rounded-xl p-3.5 flex items-center gap-3 mb-6 border border-slate-100">
              <div className="text-slate-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">
                A confirmation email and calendar invite have been sent to you.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="w-full space-y-3">
              <button 
                onClick={() => navigate('/Clinic')}
                className="w-full py-3.5 rounded-2xl text-white font-extrabold text-base shadow-xl shadow-teal-900/10 transition-all hover:scale-[1.02] active:scale-95"
                style={{ background: 'linear-gradient(135deg, #0B1F4D 0%, #0d6e6e 100%)' }}
              >
                View in My Schedule
              </button>
              <button 
                onClick={() => setShowSuccessPopup(false)}
                className="w-full text-center text-[13px] font-bold text-teal-600 hover:text-teal-700 transition-colors py-1"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Clinical Report Popup */}
      {showReportPopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }}
          onClick={() => setShowReportPopup(false)}
        >
          <div
            className="bg-white rounded-[40px] w-full max-w-[960px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-in zoom-in-95 duration-300"
            onClick={e => e.stopPropagation()}
          >
            {/* Left Branding Sidebar */}
            <div className="w-full md:w-[260px] bg-[#0B1F4D] p-8 flex flex-col relative shrink-0 overflow-hidden">
              {/* Background Glow */}
              <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-teal-500/20 to-transparent pointer-events-none"></div>
              
              <h2 className="text-2xl font-black text-white mb-12 tracking-tight">VaidyaGo</h2>
              
              <div className="space-y-10 relative z-10">
                <div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3">Your Profile</p>
                  <h3 className="text-xl font-bold text-white">Alex Rivera</h3>
                  <p className="text-white/60 text-sm mt-0.5">42 years · Male</p>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3">Phase Status</p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <p className="text-white/80 text-sm font-medium">You've completed Phase 1</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-8 relative z-10">
                <button className="w-full py-4 bg-white text-[#0B1F4D] rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-black/10 hover:bg-teal-50 transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download PDF
                </button>
                <p className="text-center text-[9px] font-bold text-white/30 uppercase tracking-widest mt-4">Report Generated Dec 24, 2023</p>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white custom-scrollbar">
              <div className="flex items-center justify-between mb-10">
                <h1 className="text-2xl font-[900] text-[#0B1F4D]">Your Comprehensive Clinical Report</h1>
                <button 
                  onClick={() => setShowReportPopup(false)}
                  className="w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-400 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              <div className="space-y-10">
                {/* Outcomes Section */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                    </div>
                    <h2 className="text-lg font-bold text-[#0B1F4D]">Your Phase 1 Outcomes</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Your Adherence Rate</p>
                      <div className="flex items-end gap-3 mb-4">
                        <span className="text-4xl font-black text-[#0B1F4D]">94%</span>
                        <span className="text-[13px] font-bold text-green-500 mb-1.5">+2.4% vs Avg</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>

                    <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Protocol Milestone</p>
                      <div className="flex items-end gap-3 mb-4">
                        <span className="text-4xl font-black text-[#0B1F4D]">12/12</span>
                        <span className="text-[13px] font-bold text-slate-400 mb-1.5">Tasks Completed</span>
                      </div>
                      <div className="flex gap-1.5">
                        {[1,2,3,4,5,6,7,8].map(i => (
                          <div key={i} className="h-1.5 flex-1 bg-teal-500 rounded-full"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Biometric Trends */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
                      </svg>
                    </div>
                    <h2 className="text-lg font-bold text-[#0B1F4D]">Your Biometric Trends</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="md:col-span-2 bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resting Heart Rate (RHR)</p>
                          <p className="text-xs text-teal-600 font-bold mt-1">Your heart rate shows a steady decline over 4 weeks</p>
                        </div>
                      </div>
                      <div className="flex items-end gap-2 h-32 px-2">
                        {[78, 75, 72, 74, 70, 68, 65, 66].map((val, i) => (
                          <div key={i} className="flex-1 bg-teal-500/40 rounded-t-lg hover:bg-teal-500 transition-all cursor-pointer relative group" style={{ height: `${val}%` }}>
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0B1F4D] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              {val} bpm
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-3 px-2">
                        <span className="text-[10px] font-bold text-slate-300">WEEK 1</span>
                        <span className="text-[10px] font-bold text-slate-300">WEEK 4</span>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="bg-slate-50/50 rounded-3xl p-5 border border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sleep Efficiency</p>
                          <span className="text-teal-600">🌙</span>
                        </div>
                        <div className="text-2xl font-black text-[#0B1F4D]">88%</div>
                        <div className="text-[11px] font-bold text-teal-600 mt-1">↝ +12%</div>
                      </div>
                      <div className="bg-slate-50/50 rounded-3xl p-5 border border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Activity (Steps)</p>
                          <span className="text-teal-600">🏃</span>
                        </div>
                        <div className="text-2xl font-black text-[#0B1F4D]">8.2k</div>
                        <div className="text-[11px] font-bold text-teal-600 mt-1">↝ Daily Avg</div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Physician Remarks */}
                <section className="bg-slate-50/50 rounded-[32px] p-8 border border-slate-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/>
                        </svg>
                      </div>
                      <h2 className="text-lg font-bold text-[#0B1F4D]">Your Physician's Remarks</h2>
                    </div>
                    <div className="flex items-center gap-3 text-right">
                      <div>
                        <p className="text-[13px] font-bold text-[#0B1F4D]">Dr. Sterling</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Chief Cardiologist</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-sm">
                        <img src={drElena} alt="Dr. Sterling" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed italic">
                    "Alex, you have shown exceptional commitment to your cardiovascular rehabilitation protocol during Phase 1. The stabilization of your resting heart rate from an average of 78 bpm to 65 bpm is a significant indicator of your improved cardiac efficiency. Continue focusing on consistent environmental logging in this next phase."
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressReview;


