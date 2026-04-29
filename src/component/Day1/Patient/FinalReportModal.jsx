import React from 'react';
import './FinalReportModal.css';

const Icon = ({ name }) => {
  const icons = {
    close: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    verified: <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>,
    adherence: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2 2V5a2 2 0 0 1 2-2h11"/></svg>,
    heart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    bp: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
    pdf: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    info: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
  };
  return icons[name] || null;
};

const FinalReportModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="final-report-overlay">
      <div className="final-report-container">
        <button className="final-report-close" onClick={onClose}>
           <Icon name="close" />
        </button>

        <header className="final-report-header">
           <div className="milestone-badge">
              <span>RECOVERY MILESTONE</span>
              <div className="verified-tag">
                 <Icon name="verified" /> DIGITALLY VERIFIED
              </div>
           </div>
           <h1>180-Day Comprehensive Recovery Report</h1>
           <p className="report-ref">Report Reference: VR-109-180D</p>
        </header>

        <div className="report-scroll-content">
           <section className="report-section-box">
              <div className="progress-summary-row">
                 <div className="progress-text-col">
                    <label>PROGRESS SUMMARY</label>
                    <div className="progress-val">
                       <strong>180</strong> <span>/ 180 Days Completed</span>
                    </div>
                    <div className="report-progress-bar">
                       <div className="fill" style={{ width: '100%' }}></div>
                    </div>
                 </div>
                 <div className="milestone-achieved-box">
                    <strong>100%</strong>
                    <span>MILESTONE ACHIEVED</span>
                 </div>
              </div>
           </section>

           <section className="vitals-section">
              <label className="section-label">VITAL HEALTH INDICATORS</label>
              <div className="vitals-grid">
                 <div className="vital-card">
                    <div className="vital-header">
                       <div className="vital-icon-bg adherence"><Icon name="adherence" /></div>
                       <span className="vital-trend">+2.4% vs last mo.</span>
                    </div>
                    <div className="vital-main">
                       <strong>96%</strong>
                       <label>Adherence Summary</label>
                    </div>
                 </div>

                 <div className="vital-card">
                    <div className="vital-header">
                       <div className="vital-icon-bg heart"><Icon name="heart" /></div>
                       <span className="vital-tag">Optimal Range</span>
                    </div>
                    <div className="vital-main">
                       <strong>72 <span>BPM</span></strong>
                       <label>Avg Heart Rate</label>
                    </div>
                 </div>

                 <div className="vital-card">
                    <div className="vital-header">
                       <div className="vital-icon-bg bp"><Icon name="bp" /></div>
                       <span className="vital-tag">Resting Avg</span>
                    </div>
                    <div className="vital-main">
                       <strong>118/78</strong>
                       <label>Avg Blood Pressure</label>
                    </div>
                 </div>
              </div>
           </section>

           <div className="physician-note-box">
              <div className="note-quote">"</div>
              <p>
                 Alex's commitment to the prescribed protocol has been exemplary. The 180-day window shows high-fidelity stabilizing trends in cardiovascular resilience and metabolic recovery. We recommend moving to Phase 2 monitoring.
              </p>
              <div className="physician-profile">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" alt="Dr. Sterling" />
                 <div className="physician-info">
                    <strong>Dr. Elena Sterling</strong>
                    <span>CHIEF MEDICAL OFFICER</span>
                 </div>
              </div>
           </div>
        </div>

        <footer className="final-report-footer">
           <div className="footer-left">
              <Icon name="info" />
              <span>All data encrypted via HIPAA-compliant vault</span>
           </div>
           <div className="footer-right">
              <button className="btn-archive">Archive Report</button>
              <button className="btn-save-pdf" onClick={onClose}>
                 <Icon name="pdf" /> Save as PDF
              </button>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default FinalReportModal;
