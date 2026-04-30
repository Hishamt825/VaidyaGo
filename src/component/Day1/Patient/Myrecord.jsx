import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Myrecord.css';

// Imported components
import Sidebar from '../../../components/Patient/Patient_sidebar';
import Profile from '../../../components/Patient/Profile';
import Account from '../../../components/Patient/Account';
import Notification from '../../../components/Patient/notification';

// Imported images
import ContainerImg from '../../../assets/Container.svg';
import AbdominalCT from '../../../assets/Abdominal CT.svg';
import logoUrl from '../../../assets/vadyago_pat.png';
import phImg from '../../../assets/ph.png';

const Icon = ({ name, className }) => {
  const icons = {
    overview: <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />,
    symptom: <path d="M11 2a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 0-2 2v4a8 8 0 0 0 16 0v-4a2 2 0 0 0-2-2 2 2 0 0 1-2-2V4a2 2 0 0 0-2-2h-4z" />,
    vitals: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    meds: <path d="M9 2h6v2H9V2zm-2 4h10v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6zm3 8h4m-2-2v4" />,
    appointments: <path d="M16 2v4M8 2v4M3 10h18" />,
    messages: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />,
    records: <path d="M20 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zM4 17V7h16v10H4zM7 9h2v2H7V9zm0 4h2v2H7v-2zm4-4h6v2h-6V9zm0 4h6v2h-6v-2z" />,
    search: <React.Fragment><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3" /></React.Fragment>,
    bell: <React.Fragment><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0" /></React.Fragment>,
    settings: <React.Fragment><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></React.Fragment>,
    download: <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />,
    eye: <React.Fragment><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3" /></React.Fragment>,
    upload: <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />,
    share: <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />,
    lab: <React.Fragment><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 12h8M8 16h8" /></React.Fragment>,
    vac: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v6l2 2 2-2v-6h3v-4h-3V7a3 3 0 0 1 3-3h3V2z" />,
    imaging: <React.Fragment><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><circle cx="12" cy="12" r="3" /></React.Fragment>,
    history: <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />,
    back: <path d="M19 12H5M12 19l-7-7 7-7" />
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
      width="20"
      height="20"
    >
      {icons[name] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};

const Myrecord = () => {
  const [active, setActive] = useState('My Record');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="flex h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}
    >
      {/* ── Sidebar ── */}
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

          <div className="flex items-center gap-4 flex-1 max-w-[400px]">
            <button
              className="m-back-btn"
              onClick={() => navigate('/Diagnostic')}
              style={{ margin: 0, width: '35px', height: '35px' }}
            >
              <Icon name="back" />
            </button>
            <div className="relative group flex-1">
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
                <img src={phImg} alt="User" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-[64px] px-[24px] md:px-[48px]">

        {/* Title Section */}
        <div className="m-title-row">
          <div className="m-title-area">
            <h2>Health Records</h2>
            <p>Manage and access your full clinical history securely.</p>
          </div>
          <div className="m-title-actions">
            <button className="m-btn m-btn-share">Share Records</button>
            <button className="m-btn m-btn-upload">
              <Icon name="upload" /> Upload Document
            </button>
          </div>
        </div>

        {/* Lab & Vaccinations Grid */}
        <div className="m-top-grid">
          <div className="m-glass-card">
            <div className="m-card-header">
              <h3><Icon name="lab" /> Lab Reports</h3>
              <a href="#" className="m-view-all">View All</a>
            </div>
            
            <div className="m-reports-list">
              {[
                { name: 'Comprehensive Metabolic Panel', date: 'St. Luke\'s Diagnostic • Oct 24, 2023', status: 'Normal' },
                { name: 'Lipid Profile & Glucose', date: 'City Health Labs • Sep 12, 2023', status: 'Follow-up Required', warning: true },
                { name: 'Urine Analysis (Routine)', date: 'St. Luke\'s Diagnostic • Aug 05, 2023', status: 'Normal' }
              ].map((report, i) => (
                <div key={i} className="m-report-item">
                  <div className="m-report-icon">
                    <Icon name={i === 1 ? 'vitals' : 'lab'} />
                  </div>
                  <div className="m-report-info">
                    <h4>{report.name}</h4>
                    <p>{report.date}</p>
                  </div>
                  <span className={`m-status-pill ${report.warning ? 'warning' : ''}`}>
                    {report.status}
                  </span>
                  <div className="m-report-acts">
                    <Icon name="download" />
                    <Icon name="eye" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="m-navy-card">
            <h3><Icon name="vac" /> Vaccinations</h3>
            <div className="m-vac-list">
              <div className="m-vac-item">
                <label>Next Due</label>
                <div className="m-vac-main">
                  <span className="m-vac-name">Influenza (Annual)</span>
                  <span className="m-vac-date">Nov 2024</span>
                </div>
              </div>
              <div className="m-vac-item">
                <label>Last Completed</label>
                <div className="m-vac-main">
                  <span className="m-vac-name">Tetanus Booster</span>
                  <span className="m-vac-date">May 2023</span>
                </div>
              </div>
              <div className="m-vac-item">
                <label>Historical</label>
                <div className="m-vac-main">
                  <span className="m-vac-name">COVID-19 (3 Doses)</span>
                  <Icon name="records" style={{ color: '#1db1c2' }} />
                </div>
              </div>
            </div>
            <button className="m-cert-btn">View Certificate</button>
          </div>
        </div>

        {/* Imaging Section */}
        <h3 className="m-section-title"><Icon name="imaging" /> Imaging & Radiology</h3>
        <div className="m-scan-row">
          <div className="m-scan-card">
            <div className="m-scan-img-box">
              <img src={ContainerImg} alt="Chest X-Ray" />
            </div>
            <div className="m-scan-info">
              <h4>Chest X-Ray (PA View)</h4>
              <p>Nov 15, 2023 • St. Mary's</p>
            </div>
          </div>
          <div className="m-scan-card">
            <div className="m-scan-img-box">
              <img src={AbdominalCT} alt="Abdominal MRI" />
            </div>
            <div className="m-scan-info">
              <h4>Abdominal MRI</h4>
              <p>Oct 02, 2023 • Radiance Center</p>
            </div>
          </div>
          <div className="m-scan-card">
            <div className="m-scan-img-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Icon name="overview" style={{ opacity: 0.1, transform: 'scale(2)' }} />
            </div>
            <div className="m-scan-info">
              <h4>Dental OPG Scan</h4>
              <p style={{ color: '#3182ce', fontWeight: 600 }}>Processing Results...</p>
            </div>
          </div>
          <div className="m-request-card">
             <Icon name="imaging" style={{ marginBottom: 10, opacity: 0.5 }} />
             <b style={{ color: '#1e293b', fontSize: 13 }}>Request Older Scans</b>
             <p style={{ fontSize: 10, marginTop: 5 }}>Archives from 2020-2022 available</p>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="m-timeline-card">
          <div className="m-timeline-section-header">
            <div className="m-section-icon-box">
              <Icon name="history" />
            </div>
            <h3 className="m-section-title" style={{ marginBottom: 0 }}>Medical History & Timeline</h3>
          </div>
          
          <div className="m-timeline">
            {[
              { type: 'DIAGNOSIS', title: 'Seasonal Rhinitis', date: 'NOV 2023', desc: 'Consultation with Dr. Sarah Jenkins regarding persistent sneezing and congestion. Prescribed antihistamine regimen for 14 days.', tag: 'Prescribed', val: 'Loratadine 10mg' },
              { type: 'PROCEDURE', title: 'Minor Outpatient Surgery', date: 'MAY 2023', desc: 'Endoscopic procedure at St. Mary\'s Surgical Center. Recovery monitored over 48 hours without complications.', tag: 'Location', val: 'St. Mary\'s General' },
              { type: 'WELLNESS VISIT', title: 'Annual Physical Examination', date: 'JAN 2022', desc: 'Comprehensive health screening. All vitals within normal range. Recommended increased vitamin D intake.', tag: '', val: '' }
            ].map((item, i) => (
              <div key={i} className="m-t-item">
                <div className="m-t-dot"></div>
                <div className="m-t-content">
                  <div className="m-t-main">
                    <span className="m-t-header">{item.date} - {item.type}</span>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                  {item.tag && (
                    <div className="m-t-tag">
                      <label>{item.tag}</label>
                      <b>{item.val}</b>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="m-footer">
          <span>© 2024 VaidyaGo. All medical data is encrypted and HIPAA compliant.</span>
          <div className="m-f-links">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact Support</span>
          </div>
        </footer>
        </main>
      </div>

      {/* Modals */}
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

export default Myrecord;
