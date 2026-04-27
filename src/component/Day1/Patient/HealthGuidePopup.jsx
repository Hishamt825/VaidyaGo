import React from 'react';
import './HealthGuidePopup.css';

const Icon = ({ name }) => {
  const icons = {
    book: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V5A2.5 2.5 0 0 1 6.5 2.5H20M20 2.5v19.5" /></svg>,
    stress: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M3 12h3m12 0h3M12 3v3m0 12v3m-6.4-15.4 2.1 2.1m8.6 8.6 2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1"/></svg>,
    sleep: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>,
    strain: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><polyline points="20 6 9 17 4 12"/></svg>
  };
  return <div className="icon-svg-wrap">{icons[name]}</div>;
};

const HealthGuidePopup = ({ onClose }) => {
  return (
    <div className="hg-overlay" onClick={onClose}>
      <div className="hg-modal" onClick={(e) => e.stopPropagation()}>
        <header className="hg-header">
          <div className="hg-badge">
             <Icon name="book" />
             HEALTH GUIDE
          </div>
          <h1>Tension-Type Headaches</h1>
        </header>

        <main className="hg-content">
          <section className="hg-section">
            <h3 className="hg-section-title">Overview</h3>
            <p className="hg-text">
               A tension headache is generally a mild to moderate pain in your head that's often described as feeling like a tight band around your head. It is the most common type of headache, yet its causes aren't well understood. Unlike some forms of migraine, tension-type headaches aren't usually associated with visual disturbances, nausea, or vomiting.
            </p>
          </section>

          <section className="hg-section">
            <h3 className="hg-section-title">Common Triggers</h3>
            <div className="hg-triggers-grid">
               <div className="hg-trigger-card">
                  <div className="trigger-icon"><Icon name="stress" /></div>
                  <h4>Stress</h4>
                  <p>The most commonly reported trigger, including work or family pressure.</p>
               </div>
               <div className="hg-trigger-card">
                  <div className="trigger-icon"><Icon name="sleep" /></div>
                  <h4>Sleep Debt</h4>
                  <p>Irregular sleep patterns or lack of restorative rest.</p>
               </div>
               <div className="hg-trigger-card wide">
                  <div className="trigger-icon"><Icon name="strain" /></div>
                  <div className="wide-text">
                    <h4>Physical Strain</h4>
                    <p>Poor posture at desks or prolonged eye strain from digital screens.</p>
                  </div>
                  <div className="screen-indicator">
                    <Icon name="strain" />
                  </div>
               </div>
            </div>
          </section>

          <section className="hg-section" style={{ marginBottom: 0 }}>
             <h3 className="hg-section-title">Self-Care Tips</h3>
             <div className="hg-tip-item">
                <div className="tip-check"><Icon name="check" /></div>
                <span>Heat or Ice Applications</span>
             </div>
             <div className="hg-tip-item">
                <div className="tip-check"><Icon name="check" /></div>
                <span>Improve Your Posture</span>
             </div>
             <div className="hg-tip-item">
                <div className="tip-check"><Icon name="check" /></div>
                <span>Regular Physical Activity</span>
             </div>
          </section>
        </main>

        <footer className="hg-footer">
          <button className="close-hg-btn" onClick={onClose}>Close Guide</button>
        </footer>
      </div>
    </div>
  );
};

export default HealthGuidePopup;
