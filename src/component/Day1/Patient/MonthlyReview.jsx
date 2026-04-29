import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Patient/Patient_sidebar';
import patientPhoto from '../../../assets/Patient Photo.svg';
import './MonthlyReview.css';

const Icon = ({ name }) => {
  const icons = {
    check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
    circle: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>,
    upload: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
    warning: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    target: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  };
  return icons[name] || null;
};

const MonthlyReview = ({ onClose }) => {
  const navigate = useNavigate();
  const [active, setActive] = React.useState('Symptom Checker');
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const [isObjectivesModalOpen, setIsObjectivesModalOpen] = React.useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = React.useState(false);
  const [isRescheduleConfirmedOpen, setIsRescheduleConfirmedOpen] = React.useState(false);
  const [isAttendanceConfirmedOpen, setIsAttendanceConfirmedOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(27);
  const [selectedSlot, setSelectedSlot] = React.useState('10:30 AM');

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
      <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden ${isNotificationOpen || isObjectivesModalOpen || isRescheduleModalOpen || isRescheduleConfirmedOpen || isAttendanceConfirmedOpen ? 'blur-[4px] scale-[0.98] pointer-events-none' : ''}`}>
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

        <div className="monthly-review-page-content">
          <div className="monthly-review-container">
        <header className="mr-breadcrumb">
           Care Plan › <span>Monthly Clinical Visit</span>
        </header>

        <section className="mr-hero">
           <div className="mr-hero-left">
              <span className="mr-phase-badge">PHASE 2: ACTIVE</span>
              <h1>Monthly Progress Review</h1>
              <p>A focused consultation to evaluate your rhinitis protocol response and calibrate treatment trajectory for the next 30-day cycle.</p>
           </div>
           <div className="mr-hero-right">
              <div className="info-glass-box">
                 <label>SCHEDULED FOR</label>
                 <strong>Oct 24, 2024</strong>
                 <span>10:30 AM EST</span>
              </div>
              <div className="info-glass-box specialist">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" alt="Elena" />
                 <div className="spec-text">
                    <label>ATTENDING SPECIALIST</label>
                    <strong>Dr. Elena Sterling</strong>
                 </div>
              </div>
           </div>
        </section>

        <div className="mr-content-grid">
           <div className="mr-objectives-col" style={{ cursor: 'pointer' }} onClick={() => setIsObjectivesModalOpen(true)}>
              <div className="section-title">
                 <div className="st-icon-box"><Icon name="target" /></div>
                 <h3>Clinical Objectives</h3>
              </div>
              <div className="objective-card">
                 <div className="accent-bar teal"></div>
                 <div className="obj-text">
                    <h4>Immunological Response Assessment</h4>
                    <p>Reviewing total IgE levels and specific reactivity markers following the initial Phase 1 induction.</p>
                 </div>
              </div>
              <div className="objective-card">
                 <div className="accent-bar blue"></div>
                 <div className="obj-text">
                    <h4>Dosage Curve Calibration</h4>
                    <p>Fine-tuning the immunotherapy titration based on reported symptom severity and recovery rates.</p>
                 </div>
              </div>
              <div className="objective-card">
                 <div className="accent-bar sky"></div>
                 <div className="obj-text">
                    <h4>Rhinitis Protocol Adjustment</h4>
                    <p>Modifying evening routine protocols to minimize early morning sneezing clusters.</p>
                 </div>
              </div>
           </div>

           <div className="mr-prep-col">
              <h3>Patient Preparation</h3>
              <div className="prep-list">
                 <div className="prep-item completed">
                    <div className="prep-check"><Icon name="check" /></div>
                    <span>Avoid all antihistamines for 48 hrs</span>
                 </div>
                 <div className="prep-item">
                    <div className="prep-circle"></div>
                    <span>Log your recent trigger occurrences</span>
                 </div>
                 <div className="prep-item">
                    <div className="prep-circle"></div>
                    <span>Fast for 4 hours prior (Lab Work)</span>
                 </div>
                 <div className="prep-item">
                    <div className="prep-circle"></div>
                    <span>Update current medication list</span>
                 </div>
              </div>
              <div className="prep-warning">
                 <Icon name="warning" />
                 <span>Failure to follow fasting guidelines may result in inaccurate baseline metrics.</span>
              </div>
           </div>
        </div>

        <div className="mr-snapshot-section">
           <div className="snapshot-header">
              <div className="sh-left">
                 <h3>30-Day Journey Snapshot</h3>
                 <p>Summary data from Sep 24 - Oct 23</p>
              </div>
              <div className="sh-badges">
                 <span className="badge-adherence">94% ADHERENCE</span>
                 <span className="badge-trend">IMPROVING TREND</span>
              </div>
           </div>
           <div className="snapshot-grid">
              <div className="snap-card border-left">
                 <label>PROTOCOL COMPLIANCE</label>
                 <div className="snap-val">
                    <strong>28/30</strong> <span>Days Logged</span>
                 </div>
                 <div className="snap-bar-bg"><div className="snap-bar-fill" style={{ width: '93%' }}></div></div>
              </div>
              <div className="snap-card border-left teal">
                 <label>SYMPTOM INTENSITY</label>
                 <div className="snap-val">
                    <strong>-15%</strong> <span>Vs Last Month</span>
                 </div>
                 <p className="snap-subtext">"Mild clusters in early mornings"</p>
              </div>
              <div className="snap-card border-left blue">
                 <label>REST QUALITY</label>
                 <div className="snap-val">
                    <strong>7.4</strong> <span>Avg Score</span>
                 </div>
                 <div className="rest-dots">
                    <span className="dot fill"></span>
                    <span className="dot fill"></span>
                    <span className="dot fill"></span>
                    <span className="dot fill"></span>
                    <span className="dot"></span>
                 </div>
              </div>
           </div>
        </div>

        <footer className="mr-footer">
           <p>Please confirm your availability at least 24 hours in advance.</p>
           <div className="footer-btns">
              <button className="btn-reschedule" onClick={() => setIsRescheduleModalOpen(true)}>Reschedule</button>
              <button className="btn-upload">
                 <Icon name="upload" /> Upload Recent Lab Reports
              </button>
              <button className="btn-confirm-attendance" onClick={() => setIsAttendanceConfirmedOpen(true)}>Confirm Attendance</button>
           </div>
        </footer>
      </div>
        </div>
      </main>
      </div>

      {/* Detailed Clinical Objectives Modal */}
      {isObjectivesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1f4d]/60 backdrop-blur-sm">
          <div className="bg-[#f0f4f8] rounded-[24px] w-full max-w-[600px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-white px-[24px] py-[20px] flex items-center justify-between border-b border-gray-100">
               <div className="flex items-center gap-[12px]">
                 <div className="w-[36px] h-[36px] bg-[#0B1F4D] rounded-full flex items-center justify-center text-white">
                   <Icon name="target" />
                 </div>
                 <h2 className="text-[#0B1F4D] text-[18px] font-[800]">Detailed Clinical Objectives</h2>
               </div>
               <button onClick={() => setIsObjectivesModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
               </button>
            </div>
            
            <div className="p-[24px] overflow-y-auto flex flex-col gap-[20px]">
               <div className="bg-white rounded-[16px] overflow-hidden flex border-l-[4px] border-[#1a6e78] shadow-sm">
                  <div className="p-[20px]">
                     <h4 className="text-[#1e293b] font-[800] text-[15px] mb-[8px]">Immunological Response Assessment</h4>
                     <p className="text-[#64748b] text-[13px] leading-[1.6]">Comprehensive evaluation of serum IgE levels and specific reactivity markers. This helps monitor the effectiveness of the initial Phase 1 induction, confirming if the immune system is building tolerance as expected without causing severe allergic reactions.</p>
                  </div>
               </div>

               <div className="bg-white rounded-[16px] overflow-hidden flex border-l-[4px] border-[#3b82f6] shadow-sm">
                  <div className="p-[20px]">
                     <h4 className="text-[#1e293b] font-[800] text-[15px] mb-[8px]">Dosage Curve Calibration</h4>
                     <p className="text-[#64748b] text-[13px] leading-[1.6]">Analytical review of the patient's reported symptom-to-dose ratio. This involves fine-tuning the specific immunotherapy concentration (SCIT/SLIT) to identify the optimal therapeutic window — maximizing clinical response while minimizing the risk of systemic adverse reactions.</p>
                  </div>
               </div>

               <div className="bg-white rounded-[16px] overflow-hidden flex border-l-[4px] border-[#0ea5e9] shadow-sm">
                  <div className="p-[20px]">
                     <h4 className="text-[#1e293b] font-[800] text-[15px] mb-[8px]">Rhinitis Protocol Adjustment</h4>
                     <p className="text-[#64748b] text-[13px] leading-[1.6]">Strategic modification of environmental controls and pharmacological therapies. Focuses on optimizing H1-antihistamine timing relative to the patient's circadian rhythms to ensure maximum drug efficacy during peak pollen hours, and reviewing nasal corticosteroid application techniques to reduce local irritation.</p>
                  </div>
               </div>
            </div>

            <div className="bg-white p-[20px] border-t border-gray-100 flex justify-end">
               <button onClick={() => setIsObjectivesModalOpen(false)} className="bg-[#0B1F4D] text-white px-[24px] py-[12px] rounded-[12px] font-[700] text-[14px] hover:bg-[#1a3673] transition-colors shadow-md">
                 Close Details
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Visit Modal */}
      {isRescheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1f4d]/60 backdrop-blur-sm">
          <div className="bg-white rounded-[24px] w-full max-w-[440px] shadow-2xl overflow-hidden flex flex-col p-[32px]">
            <div className="flex items-start justify-between mb-[8px]">
               <div>
                  <h2 className="text-[#0B1F4D] text-[22px] font-[800] leading-tight">Reschedule Visit</h2>
                  <p className="text-[#64748b] text-[13px] mt-[4px]">Select a new date and time for your clinical review.</p>
               </div>
               <button onClick={() => setIsRescheduleModalOpen(false)} className="text-[#94a3b8] hover:text-[#0B1F4D] transition-colors p-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
               </button>
            </div>

            <div className="mt-[24px]">
               <label className="text-[#64748b] text-[10px] font-[800] tracking-wider mb-[16px] block uppercase">Select Date</label>
               <div className="flex justify-between items-center px-[8px]">
                  {[{d: 'M', n: 24}, {d: 'T', n: 25}, {d: 'W', n: 26}, {d: 'T', n: 27}, {d: 'F', n: 28}, {d: 'S', n: 29}, {d: 'S', n: 30}].map((day, idx) => (
                     <div key={idx} className="flex flex-col items-center gap-[12px] cursor-pointer" onClick={() => setSelectedDate(day.n)}>
                        <span className={`text-[10px] font-[700] ${selectedDate === day.n ? 'text-[#0B1F4D]' : 'text-[#94a3b8]'}`}>{day.d}</span>
                        <div className={`w-[36px] h-[36px] flex items-center justify-center rounded-full text-[14px] font-[700] transition-colors ${selectedDate === day.n ? 'bg-[#0B1F4D] text-white shadow-md' : 'text-[#64748b] hover:bg-[#f1f5f9]'}`}>
                           {day.n}
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="mt-[32px]">
               <label className="text-[#64748b] text-[10px] font-[800] tracking-wider mb-[16px] block uppercase">Available Slots</label>
               <div className="grid grid-cols-2 gap-[12px]">
                  {['09:00 AM', '10:30 AM', '11:45 AM', '02:00 PM', '03:30 PM', '04:45 PM'].map((time) => (
                     <button
                        key={time}
                        onClick={() => setSelectedSlot(time)}
                        className={`py-[12px] rounded-[16px] text-[13px] font-[700] transition-all border ${
                           selectedSlot === time 
                              ? 'border-[#1a6e78] bg-[#f0f9fa] text-[#1a6e78]' 
                              : 'border-[#e2e8f0] bg-white text-[#1e293b] hover:border-[#cbd5e1]'
                        }`}
                     >
                        {time}
                     </button>
                  ))}
               </div>
            </div>

            <div className="mt-[40px]">
               <button 
                  onClick={() => {
                     setIsRescheduleModalOpen(false);
                     setIsRescheduleConfirmedOpen(true);
                  }} 
                  className="w-full py-[16px] rounded-[16px] text-white font-[800] text-[15px] shadow-[0_10px_20px_rgba(26,110,120,0.2)] transition-transform hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #0B1F4D 0%, #49AAB3 100%)' }}
               >
                  Confirm Reschedule
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Confirmed Modal */}
      {isRescheduleConfirmedOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1f4d]/60 backdrop-blur-sm">
          <div className="bg-white rounded-[24px] w-full max-w-[400px] shadow-2xl overflow-hidden flex flex-col p-[32px] items-center text-center">
            
            <div className="w-[64px] h-[64px] bg-[#eef8f8] rounded-full flex items-center justify-center mb-[20px]">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a6e78" strokeWidth="3"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>

            <h2 className="text-[#0B1F4D] text-[24px] font-[800] leading-tight mb-[8px]">Reschedule Confirmed</h2>
            <p className="text-[#64748b] text-[14px] leading-relaxed mb-[24px]">
               Your clinical progress review has been successfully updated.
            </p>

            <div className="bg-[#f4f7f9] w-full rounded-[16px] p-[20px] text-left mb-[32px]">
               <label className="text-[#1a6e78] text-[10px] font-[800] tracking-wider mb-[16px] block uppercase">New Appointment Details</label>
               
               <div className="flex flex-col gap-[16px]">
                  <div className="flex items-start gap-[12px]">
                     <svg className="mt-0.5 text-[#475569]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                     <div>
                        <span className="text-[#64748b] text-[12px] block mb-[2px]">Date</span>
                        <strong className="text-[#0B1F4D] text-[15px] font-[800]">October 27, 2024</strong>
                     </div>
                  </div>

                  <div className="flex items-start gap-[12px]">
                     <svg className="mt-0.5 text-[#475569]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                     <div>
                        <span className="text-[#64748b] text-[12px] block mb-[2px]">Time</span>
                        <strong className="text-[#0B1F4D] text-[15px] font-[800]">10:30 AM EST</strong>
                     </div>
                  </div>

                  <div className="flex items-start gap-[12px]">
                     <img src={patientPhoto} alt="Specialist" className="w-[20px] h-[20px] rounded-full object-cover mt-0.5" />
                     <div>
                        <span className="text-[#64748b] text-[12px] block mb-[2px]">Specialist</span>
                        <strong className="text-[#0B1F4D] text-[15px] font-[800]">Dr. Elena Sterling</strong>
                     </div>
                  </div>
               </div>
            </div>

            <button 
               onClick={() => setIsRescheduleConfirmedOpen(false)} 
               className="w-full py-[16px] rounded-[16px] text-white font-[800] text-[15px] shadow-[0_10px_20px_rgba(26,110,120,0.2)] transition-transform hover:-translate-y-0.5"
               style={{ background: 'linear-gradient(135deg, #0B1F4D 0%, #49AAB3 100%)' }}
            >
               Close
            </button>
          </div>
        </div>
      )}

      {/* Attendance Confirmed Modal */}
      {isAttendanceConfirmedOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1f4d]/60 backdrop-blur-sm">
          <div className="bg-white rounded-[24px] w-full max-w-[400px] shadow-2xl overflow-hidden flex flex-col">
            
            {/* Top Gradient Section */}
            <div className="pt-[40px] pb-[30px] px-[32px] text-center relative" style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #3ca0aa 100%)' }}>
               <div className="w-[48px] h-[48px] bg-white/20 rounded-full flex items-center justify-center mx-auto mb-[20px] backdrop-blur-sm border border-white/30">
                  <div className="w-[32px] h-[32px] bg-white rounded-full flex items-center justify-center">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a6e78" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
               </div>
               <h2 className="text-white text-[24px] font-[800] leading-tight mb-[8px]">Attendance Confirmed</h2>
               <p className="text-white/80 text-[13px] leading-relaxed">
                  Your appointment has been successfully confirmed.
               </p>
            </div>

            {/* Bottom White Section */}
            <div className="p-[32px] bg-white">
               <div className="bg-[#f4f7f9] w-full rounded-[16px] p-[20px] mb-[32px]">
                  <label className="text-[#64748b] text-[10px] font-[800] tracking-wider mb-[16px] block uppercase">Appointment Recap</label>
                  
                  <div className="flex flex-col gap-[20px]">
                     <div className="flex items-center gap-[16px]">
                        <div className="w-[40px] h-[40px] bg-white rounded-[12px] flex items-center justify-center shadow-sm border border-gray-100">
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B1F4D" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        </div>
                        <div>
                           <span className="text-[#64748b] text-[12px] block mb-[2px]">Date & Time</span>
                           <strong className="text-[#0B1F4D] text-[14px] font-[800]">Oct 24, 2024 at 10:30 AM EST</strong>
                        </div>
                     </div>

                     <div className="flex items-center gap-[16px]">
                        <div className="w-[40px] h-[40px] bg-white rounded-[12px] flex items-center justify-center shadow-sm border border-gray-100">
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B1F4D" strokeWidth="2"><rect x="4" y="7" width="16" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>
                        </div>
                        <div>
                           <span className="text-[#64748b] text-[12px] block mb-[2px]">Attending Specialist</span>
                           <strong className="text-[#0B1F4D] text-[14px] font-[800]">Dr. Elena Sterling</strong>
                        </div>
                     </div>
                  </div>
               </div>

               <button 
                  onClick={() => setIsAttendanceConfirmedOpen(false)} 
                  className="w-full py-[16px] rounded-[16px] text-white font-[800] text-[15px] shadow-[0_10px_20px_rgba(26,110,120,0.2)] transition-transform hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #0B1F4D 0%, #49AAB3 100%)' }}
               >
                  Close
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyReview;
