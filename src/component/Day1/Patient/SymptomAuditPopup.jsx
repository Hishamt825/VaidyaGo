import React, { useState } from 'react';
import './SymptomAuditPopup.css';

const SymptomAuditPopup = ({ onClose }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState(['Nasal Congestion']);
  const [severity, setSeverity] = useState(7);
  const [triggers, setTriggers] = useState(['Dust', 'Pollen']);
  const [notes, setNotes] = useState('');
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

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
          <button className="sap-save-btn" onClick={() => setIsSavedModalOpen(true)}>
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="save-icon">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
             </svg>
             Save Entry
          </button>
        </footer>
      </div>

      {isSavedModalOpen && (
        <div className="sap-overlay" style={{ zIndex: 60, backgroundColor: 'rgba(11, 31, 77, 0.5)' }}>
          <div className="bg-white rounded-[32px] w-full max-w-[420px] shadow-2xl overflow-hidden flex flex-col items-center text-center relative">
            
            <div className="w-full h-[12px] absolute top-0 left-0" style={{ background: 'linear-gradient(90deg, #0B1F4D 0%, #3ca0aa 100%)' }}></div>
            
            <div className="w-full pt-[48px] pb-[0px] px-[32px] flex flex-col items-center relative z-10" style={{ background: 'linear-gradient(180deg, #eef8f8 0%, #ffffff 40%)' }}>
               
               <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center mb-[24px] shadow-[0_10px_25px_rgba(26,110,120,0.15)] relative">
                  <div className="w-[48px] h-[48px] bg-[#1a6e78] rounded-full flex items-center justify-center text-white">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
               </div>

               <h2 className="text-[#0B1F4D] text-[24px] font-[800] leading-tight mb-[16px]">Symptom Log Saved</h2>
               <p className="text-[#64748b] text-[14px] leading-relaxed mb-[32px] px-[10px]">
                  Your symptoms and triggers have been recorded for Alex Rivera's clinical review. Our team will analyze this data for your next consultation.
               </p>

               <div className="w-full flex flex-col gap-[16px] mb-[32px]">
                  <button 
                     onClick={onClose} 
                     className="w-full py-[16px] rounded-[16px] text-white font-[700] text-[15px] shadow-[0_10px_20px_rgba(26,110,120,0.2)] transition-transform hover:-translate-y-0.5"
                     style={{ background: 'linear-gradient(135deg, #0B1F4D 0%, #1a6e78 100%)' }}
                  >
                     Review Progress
                  </button>
                  <button 
                     onClick={onClose} 
                     className="w-full py-[16px] rounded-[16px] font-[700] text-[15px] text-[#1a6e78] bg-white border border-[#e2e8f0] shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-[#f8fafc]"
                  >
                     Back to Care Schedule
                  </button>
               </div>
               
               <div className="flex gap-[8px] justify-center mb-[40px]">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#cbd5e1]"></div>
                  <div className="w-[20px] h-[6px] rounded-full bg-[#1a6e78]"></div>
                  <div className="w-[6px] h-[6px] rounded-full bg-[#cbd5e1]"></div>
               </div>
            </div>

            <div className="w-full bg-[#eef8f8]/50 py-[20px] border-t border-gray-100 flex items-center justify-center gap-[8px] relative overflow-hidden">
               <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at bottom, #3ca0aa 0%, transparent 70%)' }}></div>
               <svg className="relative z-10" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
               <span className="text-[#94a3b8] text-[10px] font-[800] uppercase tracking-widest relative z-10">Secure Clinical Data Transmission</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomAuditPopup;
