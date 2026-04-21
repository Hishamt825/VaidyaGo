import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Myrecord.css';

// Imported images
import ContainerImg from '../../../assets/Container.svg';
import AbdominalCT from '../../../assets/Abdominal CT.svg';

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
    history: <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
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
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', icon: 'overview', label: 'Dashboard' },
    { id: 'symptom', icon: 'symptom', label: 'Symptom Checker' },
    { id: 'vitals', icon: 'vitals', label: 'Vitals' },
    { id: 'meds', icon: 'meds', label: 'Medications' },
    { id: 'appointments', icon: 'appointments', label: 'Appointments' },
    { id: 'messages', icon: 'messages', label: 'Messages' },
    { id: 'reminder', icon: 'appointments', label: 'REMINDER' },
    { id: 'records', icon: 'records', label: 'MY RECORDS', active: true },
  ];

  return (
    <div className="m-layout">
      {/* Sidebar */}
      <aside className="m-sidebar">
        <div className="m-logo-area">
          <h2>VAIDYAGO</h2>
          <p>The Clinical Sanctuary</p>
        </div>
        
        <nav className="m-menu">
          {menuItems.map(item => (
            <a 
              key={item.id} 
              href="#" 
              className={`m-menu-item ${item.active ? 'active' : ''}`}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="m-main">
        {/* Header */}
        <header className="m-header">
          <div className="m-search">
            <Icon name="search" />
            <input type="text" placeholder="Search medications..." />
          </div>
          <div className="m-header-actions">
            <span>Language</span>
            <div className="m-header-icons">
              <Icon name="bell" />
              <Icon name="settings" />
            </div>
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="Profile" 
              className="m-profile-img" 
            />
          </div>
        </header>

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
  );
};

export default Myrecord;
