import React from 'react';
import './AllergenUpdateModal.css';

const Icon = ({ name }) => {
  const icons = {
    close: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    leaf: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
    check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
    gear: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    chart: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    obs: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    pollen: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M19.07 4.93l-1.41 1.41"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/></svg>,
    dust: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="12" cy="19" r="1"/><circle cx="12" cy="5" r="1"/></svg>,
    pet: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 3L5 12h14l-5-9z"/><circle cx="12" cy="15" r="4"/></svg>
  };
  return icons[name] || null;
};

const AllergenUpdateModal = ({ isOpen, onClose, onSave }) => {
  const [dustLevel, setDustLevel] = React.useState(2);
  const [petLevel, setPetLevel] = React.useState(1);

  if (!isOpen) return null;

  return (
    <div className="allergen-modal-overlay">
      <div className="allergen-modal-container">
        <header className="allergen-modal-header">
           <div className="header-left">
              <div className="header-icon-box">
                 <Icon name="leaf" />
              </div>
              <div className="header-text">
                 <h2>Allergen Avoidance Update</h2>
                 <p>Environmental logging for Alex Rivera</p>
              </div>
           </div>
           <button className="modal-close-btn" onClick={onClose}>
              <Icon name="close" />
           </button>
        </header>

        <div className="allergen-modal-body">
           <section className="modal-section">
              <label className="section-label"><Icon name="gear" /> MAINTENANCE CHECK</label>
              <div className="check-grid">
                 <div className="check-item active">
                    <span>HEPA Filter Status</span>
                    <div className="status-pill">
                       ACTIVE <div className="inner-check"><Icon name="check" /></div>
                    </div>
                 </div>
                 <div className="check-item">
                    <span>Env. Controls Calibrated</span>
                    <div className="status-pill check">
                       CHECK <div className="inner-circle"></div>
                    </div>
                 </div>
              </div>
           </section>

           <section className="modal-section">
              <label className="section-label"><Icon name="chart" /> EXPOSURE LEVELS</label>
              
              <div className="pollen-card">
                 <div className="pollen-row">
                    <div className="pollen-label">
                       <Icon name="pollen" />
                       <span>Pollen</span>
                    </div>
                    <span className="exposure-badge">LOW EXPOSURE</span>
                 </div>
                 <div className="progress-track">
                    <div className="progress-fill" style={{ width: '30%' }}></div>
                 </div>
              </div>

              <div className="exposure-row">
                 <div className="exposure-mini-card">
                    <div className="mini-card-header">
                       <Icon name="dust" />
                       <span>Dust</span>
                    </div>
                    <div className="level-picker">
                       {[1, 2, 3, 4].map(num => (
                          <div 
                             key={num} 
                             className={`level-btn ${dustLevel === num ? 'active' : ''}`}
                             onClick={() => setDustLevel(num)}
                          >
                             {num}
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="exposure-mini-card">
                    <div className="mini-card-header">
                       <Icon name="pet" />
                       <span>Pet Dander</span>
                    </div>
                    <div className="level-picker">
                       {[1, 2, 3, 4].map(num => (
                          <div 
                             key={num} 
                             className={`level-btn ${petLevel === num ? 'active' : ''}`}
                             onClick={() => setPetLevel(num)}
                          >
                             {num}
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </section>

           <section className="modal-section">
              <label className="section-label"><Icon name="obs" /> OBSERVATIONS</label>
              <textarea 
                 className="observation-input" 
                 placeholder="Describe any environmental triggers encountered today..."
              ></textarea>
           </section>
        </div>

        <footer className="allergen-modal-footer">
           <button className="btn-discard" onClick={onClose}>Discard changes</button>
           <button className="btn-save-update" onClick={onSave}>Save Log Update</button>
        </footer>
      </div>
    </div>
  );
};

export default AllergenUpdateModal;
