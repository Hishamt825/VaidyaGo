import React from 'react';
import './CalendarSyncModal.css';

const Icon = ({ name }) => {
  const icons = {
    google: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M10 14h4v4h-4z"/></svg>,
    outlook: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    apple: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><circle cx="12" cy="16" r="2"/></svg>,
    secure: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  };
  return icons[name] || null;
};

const CalendarSyncModal = ({ isOpen, onClose }) => {
  const [selected, setSelected] = React.useState('google');

  if (!isOpen) return null;

  return (
    <div className="sync-modal-overlay">
      <div className="sync-modal-container">
        <div className="sync-header">
           <h1>Add to Calendar</h1>
           <p>Sync your Phase 3 Review with your preferred calendar service.</p>
        </div>

        <div className="sync-user-profile">
           <div className="profile-img-wrap">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Alex Rivera" />
              <div className="status-badge"></div>
           </div>
           <div className="profile-meta">
              <h3>Alex Rivera</h3>
              <p>PHASE 3 REVIEW • TODAY, 4:00 PM</p>
           </div>
        </div>

        <div className="calendar-options-list">
           <div className={`calendar-option ${selected === 'google' ? 'active' : ''}`} onClick={() => setSelected('google')}>
              <div className="cal-icon-box"><Icon name="google" /></div>
              <span>Google Calendar</span>
           </div>
           <div className={`calendar-option ${selected === 'outlook' ? 'active' : ''}`} onClick={() => setSelected('outlook')}>
              <div className="cal-icon-box"><Icon name="outlook" /></div>
              <span>Outlook Calendar</span>
           </div>
           <div className={`calendar-option ${selected === 'apple' ? 'active' : ''}`} onClick={() => setSelected('apple')}>
              <div className="cal-icon-box"><Icon name="apple" /></div>
              <span>Apple iCal</span>
           </div>
        </div>

        <div className="sync-modal-actions">
           <button className="btn-confirm-sync" onClick={onClose}>Confirm Sync</button>
           <button className="btn-maybe-later" onClick={onClose}>Maybe Later</button>
        </div>

        <div className="sync-footer">
           <Icon name="secure" />
           <span>SECURE CLINICAL INTEGRATION</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarSyncModal;
