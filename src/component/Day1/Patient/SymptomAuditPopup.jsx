import React, { useState } from 'react';
import './SymptomAuditPopup.css';

const SymptomAuditPopup = ({ onClose }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState(['Nasal Congestion']);
  const [severity, setSeverity] = useState(7);
  const [triggers, setTriggers] = useState(['Dust', 'Pollen']);
  const [notes, setNotes] = useState('');

  const symptoms = [
    { id: 'sneezing', label: 'Sneezing', icon: '≈' },
    { id: 'congestion', label: 'Nasal Congestion', icon: '👃' },
    { id: 'eyes', label: 'Itchy Eyes', icon: '👁️' },
    { id: 'ear', label: 'Ear Pressure', icon: '🎧' },
    { id: 'throat', label: 'Sore Throat', icon: '👂' },
    { id: 'other', label: 'Other', icon: '+', isOther: true },
  ];

  const toggleSymptom = (label) => {
    if (selectedSymptoms.includes(label)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== label));
    } else {
      setSelectedSymptoms([...selectedSymptoms, label]);
    }
  };

  const removeTrigger = (trigger) => {
    setTriggers(triggers.filter(t => t !== trigger));
  };

  return (
    <div className="sap-overlay">
      <div className="sap-modal">
        <button className="sap-close-btn" onClick={onClose}>&times;</button>
        
        <header className="sap-header">
          <h2>Symptom Audit Log</h2>
          <div className="sap-patient-info">
            <span className="sap-patient-icon">👤</span>
            <span className="sap-label">Patient Profile:</span>
            <span className="sap-value">Alex Rivera</span>
          </div>
        </header>

        <div className="sap-scroll-body">
          <section className="sap-section">
            <label className="sap-section-label">SELECT ACTIVE SYMPTOMS</label>
            <div className="sap-symptoms-grid">
              {symptoms.map((s) => (
                <div 
                  key={s.id} 
                  className={`sap-symptom-card ${selectedSymptoms.includes(s.label) ? 'active' : ''} ${s.isOther ? 'other-card' : ''}`}
                  onClick={() => !s.isOther && toggleSymptom(s.label)}
                >
                  <div className="sap-symptom-icon">{s.icon}</div>
                  <span className="sap-symptom-label">{s.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="sap-section">
            <div className="sap-severity-header">
              <label className="sap-section-label">SEVERITY LEVEL</label>
              <span className="sap-severity-value">{severity.toString().padStart(2, '0')}</span>
            </div>
            <div className="sap-slider-container">
              <input 
                type="range" 
                min="0" 
                max="10" 
                value={severity} 
                onChange={(e) => setSeverity(parseInt(e.target.value))}
                className="sap-slider"
              />
              <div className="sap-slider-labels">
                <span>MILD</span>
                <span>MODERATE</span>
                <span>ACUTE</span>
                <span>SEVERE</span>
              </div>
            </div>
          </section>

          <section className="sap-section">
            <label className="sap-section-label">ENVIRONMENTAL TRIGGERS</label>
            <div className="sap-triggers-row">
              {triggers.map(t => (
                <div key={t} className="sap-trigger-tag">
                  {t} <span className="sap-tag-close" onClick={() => removeTrigger(t)}>&times;</span>
                </div>
              ))}
              <button className="sap-add-trigger-btn">
                 <span className="plus-icon">+</span> Add Trigger
              </button>
            </div>
          </section>

          <section className="sap-section">
            <label className="sap-section-label">ADDITIONAL NOTES</label>
            <textarea 
              className="sap-notes-area"
              placeholder="Describe the context of these symptoms..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </section>
        </div>

        <footer className="sap-footer">
          <button className="sap-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="sap-save-btn" onClick={onClose}>
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="save-icon">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
             </svg>
             Save Entry
          </button>
        </footer>
      </div>
    </div>
  );
};

export default SymptomAuditPopup;
