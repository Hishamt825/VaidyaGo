import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProtocolProgressPopup = ({ onClose }) => {
  const navigate = useNavigate();
  return (
    <div className="popup-overlay">
      <div className="popup-container milestone-reached-popup">
        <div className="popup-header">
          <button className="popup-close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="milestone-reached-body">
          <div className="milestone-icon" style={{ display: 'flex', justifyContent: 'center' }}>
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#E0F7FA"/>
              <path d="M9 12L11 14L15 10" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h2>Phase 2 Milestone Reached!</h2>
          
          <p className="milestone-message">
            Congratulations Alex, you have completed <span className="highlight">180 days</span> of your protocol.
            Your immune response has stabilized, marking the end of your
            desensitization journey.
          </p>

          <div className="milestone-progress-card">
            <div className="milestone-days-display">
              <span className="milestone-days-completed">180</span>
              <span className="milestone-days-total">/ 180 Days</span>
              <span className="milestone-achieved">100% Milestone Achieved</span>
            </div>
            <div className="milestone-progress-bar-container">
              <div className="milestone-progress-bar-fill" style={{ width: '100%' }}></div>
            </div>
          </div>

          <div className="milestone-stats">
            <div className="stat-item">
              <span className="stat-label">CONSISTENCY</span>
              <span className="stat-value">96%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">STABILITY</span>
              <span className="stat-value">Optimal</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">IMMUNITY</span>
              <span className="stat-value">Verified</span>
            </div>
          </div>

          <button className="begin-phase3-btn" onClick={() => navigate('/Phase3D')}>Begin Phase 3: Maintenance</button>
        </div>
      </div>
    </div>
  );
};

export default ProtocolProgressPopup;
