import React from 'react';

const AllergenAvoidancePopup = ({ onClose }) => {
  const [envControlsCalibrated, setEnvControlsCalibrated] = React.useState(false);
  return (
    <div className="popup-overlay">
      <div className="popup-container allergen-update-popup">
        <div className="popup-header">
          <h2>Allergen Avoidance Update</h2>
          <button className="popup-close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="allergen-update-body">
          {/* Date Section */}
          <div className="date-section">
            <label className="date-label">Date</label>
            <div className="date-display">
              <span className="date-text">Monday, October 28, 2024</span>
            </div>
          </div>

          {/* Maintenance Section */}
          <div className="maintenance-section">
            <h3 className="section-title">Maintenance</h3>
            <div className="maintenance-grid">
              <div className="maintenance-item">
                <div className="maintenance-header">
                  <span className="maintenance-title">HEPA Filter Status</span>
                  <span className="status-badge active">ACTIVE</span>
                </div>
                <div className="maintenance-status">
                  <div className="status-indicator checked">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="maintenance-item" onClick={() => setEnvControlsCalibrated(!envControlsCalibrated)} style={{ cursor: 'pointer' }}>
                <div className="maintenance-header">
                  <span className="maintenance-title">Env. Controls Calibrated</span>
                </div>
                <div className="maintenance-status">
                  <div className="status-indicator">
                    {envControlsCalibrated && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Exposure Section */}
          <div className="exposure-section">
            <h3 className="section-title">Exposure</h3>
            <div className="exposure-grid">
              <div className="exposure-item">
                <div className="exposure-header">
                  <span className="exposure-title">Pollen</span>
                  <span className="exposure-badge low">LOW EXPOSURE</span>
                </div>
                <div className="exposure-description">
                  <p>Seasonal pollen levels measured through outdoor air sampling</p>
                </div>
              </div>
              
              <div className="exposure-item">
                <div className="exposure-header">
                  <span className="exposure-title">Dust</span>
                </div>
                <div className="exposure-levels">
                  <div className="level-buttons">
                    <button className="level-btn">1</button>
                    <button className="level-btn">2</button>
                    <button className="level-btn active">3</button>
                    <button className="level-btn">4</button>
                    <button className="level-btn">5</button>
                  </div>
                </div>
              </div>
              
              <div className="exposure-item">
                <div className="exposure-header">
                  <span className="exposure-title">Pet Dander</span>
                </div>
                <div className="exposure-levels">
                  <div className="level-buttons">
                    <button className="level-btn">1</button>
                    <button className="level-btn">2</button>
                    <button className="level-btn">3</button>
                    <button className="level-btn">4</button>
                    <button className="level-btn">5</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Observations Section */}
          <div className="observations-section">
            <h3 className="section-title">Observations</h3>
            <div className="observations-field">
              <textarea 
                className="observations-input" 
                placeholder="Enter any observations or notes..."
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="popup-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-update">Update</button>
        </div>
      </div>
    </div>
  );
};

export default AllergenAvoidancePopup;
