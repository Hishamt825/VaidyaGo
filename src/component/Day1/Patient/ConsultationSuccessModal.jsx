import React from 'react';
import './ConsultationSuccessModal.css';
import CalendarSyncModal from './CalendarSyncModal';

const Icon = ({ name }) => {
  const icons = {
    check: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
    calendar: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    time: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    video: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
    arrow: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  };
  return icons[name] || null;
};

const ConsultationSuccessModal = ({ isOpen, onClose, onReturn }) => {
  const [isSyncOpen, setIsSyncOpen] = React.useState(false);

  if (!isOpen) return null;

  if (isSyncOpen) {
    return <CalendarSyncModal isOpen={true} onClose={() => setIsSyncOpen(false)} />;
  }

  return (
    <div className="consult-success-overlay">
      <div className="consult-success-container">
        <div className="success-icon-section">
           <div className="success-clinical-ring">
              <div className="success-clinical-circle">
                 <Icon name="check" />
              </div>
           </div>
        </div>

        <div className="success-text-header">
           <h1>Phase 3 Review Scheduled!</h1>
           <p>
              Your maintenance consultation with Dr. Sterling has been confirmed. A reminder has been set for your session.
           </p>
        </div>

        <div className="appointment-details-card">
           <div className="specialist-info-row">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" alt="Dr. Sterling" className="mini-doc-avatar" />
              <div className="mini-meta">
                 <label>SPECIALIST</label>
                 <strong>Dr. Elena Sterling</strong>
              </div>
           </div>

           <div className="date-time-grid">
              <div className="dt-item">
                 <label>DATE</label>
                 <div className="dt-val">
                    <Icon name="calendar" />
                    <span>Oct 18, 2023</span>
                 </div>
              </div>
              <div className="dt-item">
                 <label>TIME</label>
                 <div className="dt-val">
                    <Icon name="time" />
                    <span>10:30 AM</span>
                 </div>
              </div>
           </div>

           <div className="type-badge-row">
              <div className="type-val">
                 <Icon name="video" />
                 <span>Video Call</span>
              </div>
              <span className="confirmed-pill">CONFIRMED</span>
           </div>
        </div>

        <div className="success-modal-actions">
           <button className="btn-add-calendar" onClick={() => setIsSyncOpen(true)}>
              <Icon name="calendar" /> Add to Calendar
           </button>
           <button className="btn-return-maintenance-link" onClick={onReturn}>
              Return to Maintenance Log <Icon name="arrow" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationSuccessModal;
