import React from 'react';
import './MedicationDosePopup.css';

const MedicationDosePopup = ({ onClose }) => {
  return (
    <div className="mdp-overlay">
      <div className="mdp-modal">
        <button className="mdp-close-x" onClick={onClose}>&times;</button>
        
        <header className="mdp-header">
          <h2>Confirm Medication Dose</h2>
          <div className="mdp-patient-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
               <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
               <circle cx="12" cy="7" r="4" />
            </svg>
            <span>PATIENT: ALEX RIVERA</span>
          </div>
        </header>

        <div className="mdp-body">
          <div className="mdp-med-card">
            <div className="mdp-med-icon">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                  <path d="M8 12c.5 1.5 2 1.5 2.5 0" />
                  <path d="M14 12c.5 1.5 2 1.5 2.5 0" />
               </svg>
            </div>
            <div className="mdp-med-info">
              <h3>Fluticasone Propionate (Nasal Spray)</h3>
              <p>Instructions: 2 Sprays in each nostril</p>
            </div>
          </div>

          <div className="mdp-input-row">
            <div className="mdp-input-group">
              <label>TIME TAKEN</label>
              <div className="mdp-field-mock">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                   <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                <span>09:42 AM</span>
              </div>
            </div>
            <div className="mdp-input-group">
              <label>DATE</label>
              <div className="mdp-field-mock">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                   <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>Today, Oct 24</span>
              </div>
            </div>
          </div>

          <div className="mdp-input-group full">
            <label>OBSERVATION NOTES (OPTIONAL)</label>
            <textarea className="mdp-notes" placeholder="Record any immediate response or nasal sensitivity..."></textarea>
          </div>

          <div className="mdp-info-banner">
            <div className="mdp-info-icon">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
               </svg>
            </div>
            <p>Confirming this dose will update the Stabilization Phase timeline and notify the attending clinician of treatment adherence.</p>
          </div>
        </div>

        <footer className="mdp-footer">
          <button className="mdp-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="mdp-btn-confirm" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
               <polyline points="20 6 9 17 4 12" />
            </svg>
            Confirm Dose
          </button>
        </footer>
      </div>
    </div>
  );
};

export default MedicationDosePopup;
