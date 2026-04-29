import React from 'react';
import './ReportModal.css';
import ReportSuccessModal from './ReportSuccessModal';

const Icon = ({ name }) => {
  const icons = {
    close: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    shield: <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 8.75-7 10-3.87-1.25-7-5.33-7-10V6.3l7-3.12z"/></svg>,
    logs: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
    biometrics: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    remarks: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    pdf: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    csv: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
    lock: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  };
  return icons[name] || null;
};

const ReportModal = ({ isOpen, onClose }) => {
  const [selectedParams, setSelectedParams] = React.useState(['logs', 'biometrics']);
  const [format, setFormat] = React.useState('pdf');
  const [isSuccess, setIsSuccess] = React.useState(false);

  if (!isOpen) return null;

  if (isSuccess) {
    return (
      <ReportSuccessModal 
        isOpen={true} 
        onClose={onClose} 
        onReturn={() => {
          setIsSuccess(false);
          onClose();
        }} 
      />
    );
  }

  const toggleParam = (param) => {
    setSelectedParams(prev => 
      prev.includes(param) ? prev.filter(p => p !== param) : [...prev, param]
    );
  };

  return (
    <div className="report-modal-overlay">
      <div className="report-modal-container">
        <button className="report-modal-close" onClick={onClose}>
           <Icon name="close" />
        </button>

        <header className="report-modal-header">
           <div className="hipaa-badge">
              <Icon name="shield" /> HIPAA Compliant
           </div>
           <h1>Download Full Progress Report</h1>
           <p>Export 180 days of recovery data for clinical review.</p>
        </header>

        <section className="report-section">
           <label className="section-label">DATA PARAMETERS</label>
           <div className="params-grid">
              <div 
                className={`param-card ${selectedParams.includes('logs') ? 'active' : ''}`}
                onClick={() => toggleParam('logs')}
              >
                 <div className="param-icon"><Icon name="logs" /></div>
                 <div className="param-info">
                    <strong>Adherence Logs</strong>
                    <span>Daily protocol completion rates</span>
                 </div>
                 <div className="param-check"></div>
              </div>

              <div 
                className={`param-card ${selectedParams.includes('biometrics') ? 'active' : ''}`}
                onClick={() => toggleParam('biometrics')}
              >
                 <div className="param-icon"><Icon name="biometrics" /></div>
                 <div className="param-info">
                    <strong>Biometric Trends</strong>
                    <span>Heart rate, sleep, & recovery cycles</span>
                 </div>
                 <div className="param-check"></div>
              </div>

              <div 
                className={`param-card wide ${selectedParams.includes('remarks') ? 'active' : ''}`}
                onClick={() => toggleParam('remarks')}
              >
                 <div className="param-icon"><Icon name="remarks" /></div>
                 <div className="param-info">
                    <strong>Physician Remarks</strong>
                    <span>Consolidated feedback from medical staff and specialists</span>
                 </div>
                 <div className="param-check"></div>
              </div>
           </div>
        </section>

        <section className="report-section">
           <label className="section-label">EXPORT FORMAT</label>
           <div className="format-toggle">
              <button 
                className={`format-btn ${format === 'pdf' ? 'active' : ''}`}
                onClick={() => setFormat('pdf')}
              >
                 <Icon name="pdf" /> Clinical PDF
              </button>
              <button 
                className={`format-btn ${format === 'csv' ? 'active' : ''}`}
                onClick={() => setFormat('csv')}
              >
                 <Icon name="csv" /> Raw CSV
              </button>
           </div>
        </section>

        <footer className="report-modal-footer">
           <button className="btn-generate-report" onClick={() => setIsSuccess(true)}>
              <Icon name="lock" /> Generate Secure Report
           </button>
           <p className="disclaimer">
              By generating this report, you acknowledge that this contains sensitive health information. Ensure you are on a secure device before downloading.
           </p>
        </footer>
      </div>
    </div>
  );
};

export default ReportModal;
