import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/VADYAGO.png';
import './Phase3D.css';

const Phase3D = () => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', icon: 'overview', label: 'Dashboard' },
    { id: 'symptom', icon: 'symptom', label: 'Symptom Checker' },
    { id: 'vitals', icon: 'vitals', label: 'Vitals' },
    { id: 'meds', icon: 'meds', label: 'Medications' },
    { id: 'appointments', icon: 'appointments', label: 'Appointments' },
    { id: 'messages', icon: 'messages', label: 'Messages' },
    { id: 'careplan', icon: 'overview', label: 'Care Plan', active: true },
    { id: 'records', icon: 'records', label: 'MY RECORDS' },
  ];

  const Icon = ({ name }) => {
    const icons = {
      overview: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
      symptom: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      vitals: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      meds: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
          <path d="m8.5 8.5 7 7" />
        </svg>
      ),
      appointments: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
      ),
      messages: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
        </svg>
      ),
      records: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
      search: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
      bell: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
      settings: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      check: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
      download: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      )
    };

    return (
      <svg 
        className="icon" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        width="20"
        height="20"
      >
        {icons[name] || <circle cx="12" cy="12" r="10" />}
      </svg>
    );
  };

  return (
    <div className="phase3d-layout">
      {/* Test content */}
      <div style={{ padding: '20px', background: 'red', color: 'white', margin: '20px' }}>
        Phase3D Component is Loading!
      </div>
      {/* Sidebar */}
      <aside className="diagnostic-sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="VaidyaGo Logo" style={{ height: '42px', width: 'auto', objectFit: 'contain' }} />
        </div>
        <nav className="sidebar-menu">
          {menuItems.map(item => (
            <div key={item.id} className={`menu-item ${item.active ? 'active' : ''}`} onClick={() => item.id === 'dashboard' && navigate('/Diagnostic')}>
              <div className="menu-icon-wrapper">
                <Icon name={item.icon} />
              </div>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="new-consultation-btn">
             <div className="plus-circle-blue">+</div>
             <span>New Consultation</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="diagnostic-main">
        {/* Header */}
        <header className="top-header">
          <div className="search-bar">
            <Icon name="search" />
            <input type="text" placeholder="Search insights..." />
          </div>
          <div className="top-actions">
            <Icon name="bell" />
            <Icon name="settings" />
            <div className="user-profile-mini">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
          </div>
        </header>

        {/* Treatment Complete Section */}
        <section className="treatment-complete-section">
          <div className="complete-header">
            <div className="success-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#10b981"/>
                <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1>Treatment Complete!</h1>
            <p className="complete-subtitle">Congratulations Alex! You have successfully completed the Rhinitis Recovery Protocol.</p>
          </div>
        </section>

        <div className="treatment-complete-content">
          {/* Treatment Summary */}
          <div className="complete-summary-card">
            <h2>Treatment Summary</h2>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Patient Name</span>
                <span className="summary-value">Alex Johnson</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Protocol</span>
                <span className="summary-value">Rhinitis Recovery</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Duration</span>
                <span className="summary-value">180 Days</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Completion Date</span>
                <span className="summary-value">October 28, 2024</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Adherence Rate</span>
                <span className="summary-value">96%</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Response Grade</span>
                <span className="summary-value">A+</span>
              </div>
            </div>
          </div>

          {/* Treatment Outcomes */}
          <div className="treatment-outcomes">
            <h2>Treatment Outcomes</h2>
            <div className="outcomes-grid">
              <div className="outcome-card">
                <div className="outcome-icon">
                  <Icon name="check" />
                </div>
                <h3>Symptom-Free</h3>
                <p>No allergic symptoms reported in the last 60 days</p>
              </div>
              <div className="outcome-card">
                <div className="outcome-icon">
                  <Icon name="check" />
                </div>
                <h3>Immune Tolerance</h3>
                <p>Full immune response achieved against common allergens</p>
              </div>
              <div className="outcome-card">
                <div className="outcome-icon">
                  <Icon name="check" />
                </div>
                <h3>Quality of Life</h3>
                <p>Significant improvement in daily functioning</p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="recommendations-card">
            <h2>Long-term Recommendations</h2>
            <ul className="recommendations-list">
              <li>Continue environmental controls and allergen avoidance</li>
              <li>Schedule annual follow-up appointments</li>
              <li>Maintain emergency action plan</li>
              <li>Monitor for any new symptoms or changes</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="btn-download-report">
              <Icon name="download" />
              Download Treatment Report
            </button>
            <button className="btn-schedule-followup">
              Schedule Follow-up Appointment
            </button>
            <button className="btn-return-dashboard">
              Return to Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Phase3D;
