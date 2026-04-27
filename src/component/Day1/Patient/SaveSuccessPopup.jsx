import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SaveSuccessPopup.css';

const SaveSuccessPopup = ({ onClose, conditionName = "Tension-Type Headache" }) => {
  const navigate = useNavigate();

  return (
    <div className="ss-overlay" onClick={onClose}>
      <div className="ss-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ss-icon-wrap">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2>Result Saved to Record</h2>
        
        <p>
          The report for <b>{conditionName}</b> has been securely integrated into the patient's comprehensive medical history.
        </p>

        <button className="ss-btn-primary" onClick={() => navigate('/Myrecord')}>
          View in Records
        </button>
        
        <button className="ss-btn-dismiss" onClick={onClose}>
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default SaveSuccessPopup;
