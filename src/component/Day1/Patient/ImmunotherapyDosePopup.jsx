import React from 'react';
import './ImmunotherapyDosePopup.css';

const ImmunotherapyDosePopup = ({ onClose }) => {
  return (
    <div className="idp-overlay">
      <div className="idp-modal">
        <button className="idp-close-btn" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="idp-modal-body">
          <div className="idp-header">
             <label className="idp-tag">CLINICAL ACTION REQUIRED</label>
             <h2>Immunotherapy Dose Entry</h2>
             <div className="idp-patient-row">
                <span className="dot teal"></span>
                <span className="idp-patient-name">Patient: Alex Rivera</span>
             </div>
          </div>

          <div className="idp-cards-row">
             <div className="idp-data-card">
                <div className="idp-card-header">
                   <div className="idp-card-icon-wrap teal">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                         <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                   </div>
                   <span className="idp-card-label">MEDICATION</span>
                </div>
                <h3>Sublingual Drops</h3>
                <p className="idp-card-sub">Concentration: 1:100</p>
             </div>

             <div className="idp-data-card">
                <div className="idp-card-header">
                   <div className="idp-card-icon-wrap teal">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                         <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                         <line x1="16" y1="2" x2="16" y2="6"/>
                         <line x1="8" y1="2" x2="8" y2="6"/>
                         <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                   </div>
                   <span className="idp-card-label">DOSE SEQUENCE</span>
                </div>
                <h3>Week 6 of 12</h3>
                <div className="idp-progress-wrap">
                   <div className="idp-progress-fill" style={{ width: '45%' }}></div>
                </div>
             </div>
          </div>

          <div className="idp-notes-section">
             <label>Clinical Notes</label>
             <textarea placeholder="Record any immediate reactions or oral sensitivity..."></textarea>
          </div>

          <div className="idp-footer">
             <button className="idp-confirm-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                   <polyline points="20 6 9 17 4 12" />
                </svg>
                Confirm Dose Taken
             </button>
             <p className="idp-disclaimer">
                By confirming, you acknowledge that the patient is currently in a safe environment for observation following the dose.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImmunotherapyDosePopup;
