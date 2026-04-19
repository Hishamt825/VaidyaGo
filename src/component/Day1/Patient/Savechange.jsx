import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Savechange.css';

const Savechange = () => {
  const navigate = useNavigate();
  return (
    <div className="savechange-page">
      {/* Blurred Dashboard Background as in image */}
      <div className="sc-bg-container">
        <aside className="sc-bg-sidebar">
          <div className="sc-bg-logo">The Sanctuary</div>
          <div className="sc-bg-nav">
            <div className="sc-bg-nav-item"><div className="icon-dot"></div> Home</div>
            <div className="sc-bg-nav-item active"><div className="icon-dot"></div> Patients</div>
            <div className="sc-bg-nav-item"><div className="icon-dot"></div> Records</div>
          </div>
        </aside>
        <div className="sc-bg-content">
          <div className="sc-bg-topbar">
            <div className="sc-bg-search">Search patient records...</div>
            <div className="sc-bg-top-icons">
              <div className="icon-circle"></div>
              <div className="icon-circle"></div>
              <div className="icon-circle active"></div>
            </div>
          </div>
          <div className="sc-bg-main">
            <div className="sc-bg-profile-header">
              <h1>Edit Patient Profile</h1>
              <p>Patient ID: PR-882103 | Clinical Data Enabled</p>
            </div>
            <div className="sc-bg-editor-grid">
              <div className="sc-bg-form-cols">
                <div className="sc-bg-line"></div>
                <div className="sc-bg-line"></div>
                <div className="sc-bg-line"></div>
              </div>
              <div className="sc-bg-profile-card">
                <div className="sc-bg-circle-large"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal Overlay */}
      <div className="save-success-overlay">
        <div className="success-modal">
          <div className="checkmark-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          <h2>Changes Saved Successfully</h2>
          
          <p>
            Your patient profile and clinical data have <br /> 
            been updated across the <span>VaidyaGo network.</span>
          </p>

          <button className="done-btn" onClick={() => navigate('/Diagnostic')}>Done</button>
          
          <button className="return-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Return to Dashboard
          </button>

          <footer className="system-footer">
            <svg className="shield-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            The Sanctuary Sanctuary System
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Savechange;
