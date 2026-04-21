import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Diagnosticinput.css';

const Icon = ({ name, className }) => {
  const icons = {
    complaints: <path d="M16 2v4M8 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />,
    vitals: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    thermometer: <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />,
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.82-8.82 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
    plus: <path d="M12 5v14M5 12h14" />,
    edit: <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  };

  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      {icons[name]}
    </svg>
  );
};

const CustomDropdown = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="custom-dropdown-container">
      <div className="dropdown-selected" onClick={() => setIsOpen(!isOpen)}>
        {value}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`chevron ${isOpen ? 'open' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {options.map(opt => (
            <div 
              key={opt} 
              className={`dropdown-item ${value === opt ? 'active' : ''}`}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Diagnosticinput = ({ onClose }) => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([
    { id: 1, symptom: 'Persistent Headache', duration: '3 Days', severity: 'Moderate' },
    { id: 2, symptom: 'Fatigue', duration: '1 Week', severity: 'Moderate' },
    { id: 3, symptom: 'Eye Strain', duration: 'Continuous', severity: 'Mild' }
  ]);

  return (
    <div className="diagnostic-input-page">
      {/* Blurred Background Elements to match image */}
      <div className="bg-blur-container">
        <aside className="bg-sidebar">
          <div className="bg-logo">
            <h3>Sanctuary Health</h3>
            <p>Diagnostic Suite</p>
          </div>
          <nav className="bg-nav">
            <div className="bg-nav-item"><Icon name="edit" /> Dashboard</div>
            <div className="bg-nav-item"><Icon name="vitals" /> Patients</div>
            <div className="bg-nav-item active"><Icon name="complaints" /> Diagnostics</div>
            <div className="bg-nav-item"><Icon name="vitals" /> Analytics</div>
          </nav>
        </aside>
        
        <main className="bg-content">
          <header className="bg-header">
            <div className="bg-title">
              <h1>Analysis Results</h1>
              <p>Patient ID: PR-882103 | Date: April 18, 2026</p>
            </div>
            <div className="bg-profile">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Felix" />
            </div>
          </header>
        </main>

        <div className="bg-watermark">VaidyaGo</div>
      </div>

      {/* Actual Modal Overlay */}
      <div className="diagnostic-input-overlay">
        <div className="edit-summary-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <header className="modal-header">
          <div className="header-icon-box">
            <Icon name="edit" />
          </div>
          <div className="header-title">
            <h2>Edit Input Summary</h2>
            <p>Patient ID: PR-882103</p>
          </div>
        </header>

        <main className="modal-body">
          {/* Primary Complaints Section */}
          <section className="section-container">
            <div className="section-label">
              <Icon name="complaints" /> Primary Complaints
            </div>
            
            <div className="complaints-table">
              <div className="table-row-header">
                <span>Symptom</span>
                <span>Duration</span>
                <span>Severity</span>
              </div>
              
              {complaints.map(item => (
                <div key={item.id} className="complaint-row">
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Enter symptom..." 
                    defaultValue={item.symptom}
                  />
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Duration" 
                    defaultValue={item.duration}
                  />
                  <CustomDropdown 
                    value={item.severity} 
                    options={['Mild', 'Moderate', 'Severe']}
                    onChange={(val) => {
                      const newComplaints = complaints.map(c => 
                        c.id === item.id ? { ...c, severity: val } : c
                      );
                      setComplaints(newComplaints);
                    }}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Vitals Section */}
          <section className="section-container">
            <div className="section-label">
              <Icon name="vitals" /> Vitals
            </div>
            
            <div className="vitals-grid">
              <div className="vital-card">
                <div className="vital-info">
                  <span className="vital-label">Temperature</span>
                  <div className="vital-value-wrap">
                    <span className="vital-value">98.6</span>
                    <span className="vital-unit">°F</span>
                  </div>
                </div>
                <Icon name="thermometer" className="vital-icon" />
              </div>

              <div className="vital-card">
                <div className="vital-info">
                  <span className="vital-label">Heart Rate</span>
                  <div className="vital-value-wrap">
                    <span className="vital-value">72</span>
                    <span className="vital-unit">BPM</span>
                  </div>
                </div>
                <Icon name="heart" className="vital-icon" />
              </div>
            </div>
          </section>
        </main>

        <footer className="modal-footer">
          <div className="status-text">
            <span className="status-dot"></span>
            Draft Saved 12:45 PM
          </div>
          <div className="footer-actions">
            <button className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
            <button className="save-btn" onClick={() => navigate('/Savechange')}>Save Changes</button>
          </div>
        </footer>
      </div>
    </div>
  </div>
);
};

export default Diagnosticinput;
