import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cervicogenic.css';
import SaveSuccessPopup from './SaveSuccessPopup';
import NeckAlignment from './NeckAlignment';

const Icon = ({ name, className, size = 20 }) => {
  const icons = {
    head: <path d="M12 2C7.5 2 4 5.5 4 10c0 1.2.3 2.3.8 3.3l-1.8 3.7c-.2.4 0 .9.4 1.1.1 0 .2.1.3.1h16.6c.5 0 .9-.4.9-.9 0-.1 0-.2-.1-.3l-1.8-3.7c.5-1 .8-2.1.8-3.3 0-4.5-3.5-8-8-8z" />,
    neck: <path d="M8 19c0 1.7 1.3 3 3 3h2c1.7 0 3-1.3 3-3v-2H8v2z" />,
    stiffness: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    travel: <circle cx="12" cy="12" r="10" />,
    check: <polyline points="20 6 9 17 4 12" />,
    close: <path d="M18 6L6 18M6 6l12 12" />,
    save: <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />,
    movement: <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />,
    posture: <path d="M17 20h2v2h-2zm-4-4h2v6h-2zm-4-4h2v10H9zm-4-4h2v14H5z" />,
    verified: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      {icons[name] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};

const Cervicogenic = ({ onClose }) => {
  const navigate = useNavigate();
  const [showSaved, setShowSaved] = useState(false);
  const [showNeckAlignment, setShowNeckAlignment] = useState(false);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  return (
    <React.Fragment>
      <div className="new-cg-overlay" onClick={handleClose}>
        <div className="new-cg-modal" onClick={e => e.stopPropagation()}>
          <button className="new-cg-close" onClick={handleClose}>
            <Icon name="close" size={24} />
          </button>

          <header className="new-cg-header">
            <div className="new-cg-label">
              <Icon name="head" size={16} />
              <span>ABOUT YOUR HEADACHE</span>
            </div>
            <h1>Cervicogenic Headache Insights for Alex</h1>
          </header>

          <div className="new-cg-grid">
            {/* Understanding Section */}
            <section className="new-cg-card main-info">
              <h2 className="new-cg-section-title">
                <Icon name="movement" className="title-icon" /> Understanding Your Neck Health
              </h2>
              <div className="new-cg-subgrid">
                <div className="new-cg-subcard clickable" onClick={() => setShowNeckAlignment(true)}>
                  <label>NECK ALIGNMENT & MOVEMENT</label>
                  <p>We found some stiffness where your head meets your neck (the C1-C2 area). This is likely causing the sensitivity you feel near the base of your skull.</p>
                </div>
                <div className="new-cg-subcard">
                  <label>MUSCLE TENSION</label>
                  <p>The muscles at the top of your neck and shoulders are very tight. This tension is directly contributing to the headaches you've been having.</p>
                </div>
              </div>
            </section>

            {/* Pain Travels Section */}
            <section className="new-cg-card pain-travel">
              <h2 className="new-cg-section-title">
                <Icon name="stiffness" className="title-icon" /> How Your Pain Travels
              </h2>
              <p className="pain-travel-desc">The nerves in your neck share a path with the nerves for your face, which is why you feel:</p>
              <ul className="new-cg-list">
                <li><Icon name="check" size={14} className="check-icon" /> Pain usually on one side of your head</li>
                <li><Icon name="check" size={14} className="check-icon" /> Discomfort behind your eyes or forehead</li>
                <li><Icon name="check" size={14} className="check-icon" /> Postures like looking at a screen can trigger it</li>
              </ul>
            </section>

            {/* Recovery Focus Section */}
            <section className="new-cg-card recovery-focus">
              <h2 className="new-cg-section-title">Your Recovery Focus</h2>
              
              <div className="focus-item">
                <div className="focus-header">
                  <span>Movement Freedom</span>
                  <span className="priority-badge">PRIORITY</span>
                </div>
                <div className="focus-bar">
                  <div className="focus-fill priority" style={{ width: '85%' }}></div>
                </div>
                <span className="focus-goal">Goal: Increase range by 15°</span>
              </div>

              <div className="focus-item">
                <div className="focus-header">
                  <span>Neck Sensitivity</span>
                  <span className="improving-badge">IMPROVING</span>
                </div>
                <div className="focus-bar">
                  <div className="focus-fill improving" style={{ width: '45%' }}></div>
                </div>
                <span className="focus-goal">Goal: Reduce sensitivity rating</span>
              </div>

              <div className="verified-badge">
                <div className="v-icon"><Icon name="verified" size={16} /></div>
                <div className="v-text">
                  <strong>Analysis Verified</strong>
                  <span>Personalized for Alex Rivera on June 12, 2024</span>
                </div>
              </div>
            </section>

            {/* Steps Section */}
            <section className="new-cg-card steps-recovery">
              <div className="steps-header">
                <h2 className="new-cg-section-title">
                  <Icon name="check" className="title-icon" /> Steps for Your Recovery
                </h2>
                <button className="save-plan-btn" onClick={() => setShowSaved(true)}>
                  <Icon name="save" size={14} /> Save My Plan
                </button>
              </div>
              
              <div className="steps-grid">
                <div className="step-card">
                  <div className="step-icon blue"><Icon name="movement" /></div>
                  <div className="step-info">
                    <h4>Guided Movement</h4>
                    <p>Gentle guided rotations to help unlock the stiffness in your upper neck.</p>
                  </div>
                </div>
                <div className="step-card">
                  <div className="step-icon purple"><Icon name="posture" /></div>
                  <div className="step-info">
                    <h4>Posture Strengthening</h4>
                    <p>Simple exercises to build the deep muscles that support your head.</p>
                  </div>
                </div>
              </div>

              <div className="new-cg-actions">
                <button className="btn-question">Ask a Question</button>
                <button className="btn-start">Start My Exercises</button>
              </div>
            </section>
          </div>
        </div>
      </div>

      {showSaved && (
        <SaveSuccessPopup 
          onClose={() => setShowSaved(false)} 
          conditionName="Cervicogenic Headache"
        />
      )}

      {showNeckAlignment && (
        <NeckAlignment onClose={() => setShowNeckAlignment(false)} />
      )}
    </React.Fragment>
  );
};

export default Cervicogenic;
