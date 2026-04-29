import React from 'react';
import './AssessmentModal.css';

const Icon = ({ name }) => {
  const icons = {
    checkBadge: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    close: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    sun: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    sunset: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23 22 1 22"/></svg>,
    info: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    chevronLeft: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 18 9 12 15 6"/></svg>,
    chevronRight: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"/></svg>
  };
  return icons[name] || null;
};

const AssessmentModal = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = React.useState(10);
  const [selectedSlot, setSelectedSlot] = React.useState('morning');

  if (!isOpen) return null;

  const daysInOct = Array.from({ length: 13 }, (_, i) => i + 1);
  const prevMonthDays = [28, 29, 30];

  return (
    <div className="assessment-modal-overlay">
      <div className="assessment-modal-container">
        <div className="assessment-modal-sidebar">
          <div className="modal-sidebar-top">
            <div className="status-badge-icon">
              <Icon name="checkBadge" />
            </div>
            <h2>Schedule Exit Assessment</h2>
          </div>

          <div className="modal-sidebar-content">
             <div className="info-block">
                <label>MILESTONE</label>
                <strong>Clinical Graduation</strong>
                <p>The final step towards your verified full recovery path.</p>
             </div>
             <div className="info-block">
                <label>OBJECTIVE</label>
                <strong>Permanent Relief</strong>
                <p>Evaluation of long-term stability and metabolic baseline.</p>
             </div>
          </div>

          <div className="modal-sidebar-footer">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" alt="Dr. Sterling" className="doc-avatar" />
             <div className="doc-info">
                <strong>Dr. Elena Sterling</strong>
                <span>Lead Clinician</span>
             </div>
          </div>
        </div>

        <div className="assessment-modal-main">
          <button className="modal-close-btn" onClick={onClose}>
             <Icon name="close" />
          </button>

          <div className="modal-main-header">
             <h1>Select Assessment Slot</h1>
             <p>Patient: Alex Rivera • Protocol Phase IV</p>
          </div>

          <div className="calendar-section">
             <div className="calendar-nav">
                <strong>October 2024</strong>
                <div className="nav-arrows">
                   <button><Icon name="chevronLeft" /></button>
                   <button><Icon name="chevronRight" /></button>
                </div>
             </div>
             <div className="calendar-grid">
                <div className="day-labels">
                   <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                </div>
                <div className="days">
                   {prevMonthDays.map(d => <span key={`p-${d}`} className="other-month">{d}</span>)}
                   {daysInOct.map(d => (
                     <span 
                       key={d} 
                       className={`day ${selectedDate === d ? 'selected' : ''}`}
                       onClick={() => setSelectedDate(d)}
                     >
                       {d}
                     </span>
                   ))}
                </div>
             </div>
          </div>

          <div className="availability-section">
             <h3>Availability</h3>
             <div className="slot-cards">
                <div 
                  className={`slot-card ${selectedSlot === 'morning' ? 'selected' : ''}`}
                  onClick={() => setSelectedSlot('morning')}
                >
                   <div className="slot-card-header">
                      <Icon name="sun" />
                      <div className={`radio-circle ${selectedSlot === 'morning' ? 'active' : ''}`}></div>
                   </div>
                   <strong>Morning Slot</strong>
                   <span>09:00 AM — 11:30 AM</span>
                </div>
                <div 
                  className={`slot-card ${selectedSlot === 'afternoon' ? 'selected' : ''}`}
                  onClick={() => setSelectedSlot('afternoon')}
                >
                   <div className="slot-card-header">
                      <Icon name="sunset" />
                      <div className={`radio-circle ${selectedSlot === 'afternoon' ? 'active' : ''}`}></div>
                   </div>
                   <strong>Afternoon Slot</strong>
                   <span>02:00 PM — 04:30 PM</span>
                </div>
             </div>
          </div>

          <div className="modal-footer">
             <div className="duration-info">
                <Icon name="info" />
                <span>DURATION: 45 MINUTES</span>
             </div>
             <div className="footer-actions">
                <button className="btn-cancel" onClick={onClose}>Cancel</button>
                <button className="btn-confirm" onClick={onClose}>Confirm Appointment</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentModal;
