import React from 'react';
import './BaselineTestingPopup.css';

const BaselineTestingPopup = ({ onClose }) => {
  return (
    <div className="btp-overlay">
      <div className="btp-modal">
        <button className="btp-close-x" onClick={onClose}>&times;</button>
        
        <header className="btp-header">
          <h2>Baseline Testing Details</h2>
          <div className="btp-patient-tag">
            <span className="user-icon">👤</span>
            <span>Alex Rivera — Oct 25, Tomorrow</span>
          </div>
        </header>

        <div className="btp-content">
          <div className="btp-grid">
            <div className="btp-info-card">
              <div className="card-accent-line"></div>
              <h3 className="lung-cap-title">FITBIT_LUNG_CAPACITY</h3>
              <p>Record 3 readings at rest to establish your initial lung capacity baseline.</p>
            </div>
            <div className="btp-info-card">
              <div className="card-accent-line teal"></div>
              <div className="card-header-icon">
                <span className="flask-icon">🧪</span>
                <h3>Allergen Sensitivity Panel</h3>
              </div>
              <p>Full screening for 40 common seasonal and environmental triggers.</p>
            </div>
          </div>

          <div className="btp-prep-card">
            <div className="prep-icon-wrap">
               <span className="warning-icon">⚠️</span>
            </div>
            <div className="prep-text">
               <h4>Preparation</h4>
               <p>Avoid antihistamines 24 hours prior to testing. Fasting not required.</p>
            </div>
          </div>

          <div className="btp-location-banner">
             <div className="banner-overlay"></div>
             <div className="banner-content">
                <div className="loc-main-icon">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                   </svg>
                </div>
                <div className="loc-text">
                   <label className="loc-label">LOCATION</label>
                   <h4 className="loc-title">Sanctuary Clinical Lab</h4>
                   <p className="loc-desc">Room 402, Level 2</p>
                </div>
                <div className="loc-map-btn-wrap">
                   <button className="loc-map-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" />
                         <line x1="8" y1="4" x2="8" y2="18" />
                         <line x1="16" y1="6" x2="16" y2="20" />
                      </svg>
                   </button>
                </div>
             </div>
          </div>
        </div>

        <footer className="btp-footer">
          <button className="btn-calendar">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
             </svg>
             Add to Calendar
          </button>
          <button className="btn-close-main" onClick={onClose}>Close</button>
        </footer>
      </div>
    </div>
  );
};

export default BaselineTestingPopup;
