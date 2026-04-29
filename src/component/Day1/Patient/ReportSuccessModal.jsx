import React from 'react';
import './ReportSuccessModal.css';
import FinalReportModal from './FinalReportModal';

const Icon = ({ name }) => {
  const icons = {
    check: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
    pdf: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    download: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    close: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  };
  return icons[name] || null;
};

const ReportSuccessModal = ({ isOpen, onClose, onReturn }) => {
  const [isFinalReportOpen, setIsFinalReportOpen] = React.useState(false);

  if (!isOpen) return null;

  if (isFinalReportOpen) {
    return <FinalReportModal isOpen={true} onClose={() => { setIsFinalReportOpen(false); onClose(); }} />;
  }

  return (
    <div className="success-modal-overlay">
      <div className="success-modal-container">
        <button className="success-modal-close" onClick={onClose}>
           <Icon name="close" />
        </button>

        <div className="success-icon-wrapper">
           <div className="success-circle">
              <Icon name="check" />
           </div>
        </div>

        <div className="success-header">
           <h1>Report Generated Successfully</h1>
           <p>Your comprehensive recovery report has been encrypted and is ready for download.</p>
        </div>

        <div className="file-preview-card">
           <div className="file-icon-box">
              <Icon name="pdf" />
           </div>
           <div className="file-details">
              <strong>Rhinitis Protocol Progress</strong>
              <span>Clinical Summary • 180 Days Data</span>
           </div>
        </div>

        <div className="success-actions">
           <button className="btn-download-final" onClick={() => setIsFinalReportOpen(true)}>
              <Icon name="download" /> Download Report
           </button>
           <button className="btn-return-dash" onClick={onReturn}>
              Return to Dashboard
           </button>
        </div>

        <footer className="success-footer">
           SECURE HIPAA COMPLIANT TRANSFER
        </footer>
      </div>
    </div>
  );
};

export default ReportSuccessModal;
