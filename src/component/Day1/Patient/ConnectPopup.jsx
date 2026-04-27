import React from 'react';
import './ConnectPopup.css';

const Icon = ({ name }) => {
  const icons = {
    medical: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M12 11v4M10 13h4"/>
      </svg>
    ),
    video: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    chat: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
      </svg>
    ),
    chevron: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    )
  };

  return (
    <svg width="24" height="24" stroke="currentColor" strokeWidth="2.5">
       {icons[name]}
    </svg>
  );
};

const ConnectPopup = ({ onClose, conditionName = "Tension-Type Headache" }) => {
  return (
    <div className="connect-overlay" onClick={onClose}>
      <div className="connect-modal" onClick={(e) => e.stopPropagation()}>
        <header className="connect-header">
          <div className="top-icon-box">
             <Icon name="medical" />
          </div>
          <h2>Connect Now</h2>
          <p>
            Immediate clinical support is available for your <br />
            <strong>{conditionName}</strong>. Choose your preferred <br />
            way to consult.
          </p>
        </header>

        <div className="options-container">
          <div className="connect-option">
             <div className="option-icon-box">
               <Icon name="video" />
             </div>
             <div className="option-text-box">
               <h4>Book a Video Consultation</h4>
               <p>Face-to-face clinical review</p>
             </div>
             <Icon name="chevron" />
          </div>

          <div className="connect-option">
             <div className="option-icon-box">
               <Icon name="phone" />
             </div>
             <div className="option-text-box">
               <h4>Audio Call</h4>
               <p>Quick voice assessment</p>
             </div>
             <Icon name="chevron" />
          </div>

          <div className="connect-option">
             <div className="option-icon-box">
               <Icon name="chat" />
             </div>
             <div className="option-text-box">
               <h4>Chat with a Doctor</h4>
               <p>Instant messaging with medical staff</p>
             </div>
             <Icon name="chevron" />
          </div>
        </div>

        <footer className="connect-footer">
          <button className="dismiss-btn" onClick={onClose}>Dismiss</button>
          <div className="online-status">
             <div className="status-dot"></div>
             6 SPECIALISTS ONLINE
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ConnectPopup;
