import React from 'react';
import './ConsultationModal.css';
import ConsultationSuccessModal from './ConsultationSuccessModal';

const Icon = ({ name }) => {
  const icons = {
    close: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    video: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
    clinic: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    calendar: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  };
  return icons[name] || null;
};

const ConsultationModal = ({ isOpen, onClose }) => {
  const [selectedDay, setSelectedDay] = React.useState(18);
  const [selectedTime, setSelectedTime] = React.useState('10:30 AM');
  const [selectedType, setSelectedType] = React.useState('video');
  const [isSuccess, setIsSuccess] = React.useState(false);

  if (!isOpen) return null;

  if (isSuccess) {
    return (
      <ConsultationSuccessModal 
        isOpen={true} 
        onClose={onClose} 
        onReturn={() => {
          setIsSuccess(false);
          onClose();
        }} 
      />
    );
  }

  const days = [
    { name: 'MON', date: 16 },
    { name: 'TUE', date: 17 },
    { name: 'WED', date: 18 },
    { name: 'THU', date: 19 },
    { name: 'FRI', date: 20 },
    { name: 'SAT', date: 21 },
  ];

  const times = {
    morning: ['09:00 AM', '10:30 AM', '11:30 AM'],
    afternoon: ['02:00 PM', '03:30 PM', '04:45 PM']
  };

  return (
    <div className="consult-modal-overlay">
      <div className="consult-modal-container">
        <header className="consult-header">
           <div className="doc-profile-row">
              <div className="doc-avatar-wrap">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" alt="Dr. Sterling" />
                 <div className="verified-check">✓</div>
              </div>
              <div className="doc-meta">
                 <h1>Schedule Your Phase 3 Review</h1>
                 <strong>Dr. Elena Sterling</strong>
                 <span>NEUROLOGY & CLINICAL STRATEGY</span>
              </div>
           </div>
           <button className="consult-close-btn" onClick={onClose}>
              <Icon name="close" />
           </button>
        </header>

        <div className="consult-scroll-body">
           <section className="consult-section">
              <div className="section-header">
                 <label>SELECT CONSULTATION DAY</label>
                 <span className="month-label">October 2023</span>
              </div>
              <div className="days-row">
                 {days.map(d => (
                   <div 
                     key={d.date} 
                     className={`day-card ${selectedDay === d.date ? 'active' : ''}`}
                     onClick={() => setSelectedDay(d.date)}
                   >
                      <span className="day-name">{d.name}</span>
                      <span className="day-date">{d.date}</span>
                   </div>
                 ))}
              </div>
           </section>

           <section className="consult-section">
              <label>AVAILABLE TIME SLOTS</label>
              
              <div className="time-group">
                 <span className="group-label">MORNING</span>
                 <div className="times-grid">
                    {times.morning.map(t => (
                      <button 
                        key={t} 
                        className={`time-pill ${selectedTime === t ? 'active' : ''}`}
                        onClick={() => setSelectedTime(t)}
                      >
                         {t}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="time-group">
                 <span className="group-label">AFTERNOON</span>
                 <div className="times-grid">
                    {times.afternoon.map(t => (
                      <button 
                        key={t} 
                        className={`time-pill ${selectedTime === t ? 'active' : ''}`}
                        onClick={() => setSelectedTime(t)}
                      >
                         {t}
                      </button>
                    ))}
                 </div>
              </div>
           </section>

           <section className="consult-section">
              <label>CONSULTATION TYPE</label>
              <div className="type-toggle">
                 <button 
                   className={`type-btn ${selectedType === 'video' ? 'active' : ''}`}
                   onClick={() => setSelectedType('video')}
                 >
                    <Icon name="video" /> Video Call
                 </button>
                 <button 
                   className={`type-btn ${selectedType === 'clinic' ? 'active' : ''}`}
                   onClick={() => setSelectedType('clinic')}
                 >
                    <Icon name="clinic" /> Clinic Visit
                 </button>
              </div>
           </section>

           <div className="summary-box">
              <div className="summary-left">
                 <div className="summary-icon">
                    <Icon name="calendar" />
                 </div>
                 <div className="summary-details">
                    <strong>Wednesday, Oct 18</strong>
                    <span>{selectedTime} • {selectedType === 'video' ? 'Video Call' : 'Clinic Visit'}</span>
                 </div>
              </div>
              <div className="summary-right">
                 <label>CLINICAL REVIEW FEE</label>
                 <strong>$120.00</strong>
              </div>
           </div>
        </div>

        <footer className="consult-footer">
           <button className="btn-confirm-schedule" onClick={() => setIsSuccess(true)}>Confirm & Schedule</button>
           <div className="footer-bottom">
              <button className="btn-cancel-consult" onClick={onClose}>Cancel</button>
              <div className="vaidya-logo">
                 <span className="logo-icon">🌿</span> VaidyaGo
              </div>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default ConsultationModal;
