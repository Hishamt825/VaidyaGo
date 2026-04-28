import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dseasonal.css';

const Icon = ({ name, size = 20, className }) => {
  const getIconContent = () => {
    switch (name) {
      case 'wind':
        return (
          <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M4 12h12M16 12a3 3 0 1 0-3-3M4 17h8M12 17a3 3 0 1 1-3-3M4 7h15M19 7a3 3 0 1 0-3-3" />
          </g>
        );
      case 'eye':
        return (
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
            <circle cx="12" cy="12" r="3" />
          </g>
        );
      case 'nose':
        return (
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M7 10c0-3 2.5-5 5-5s5 2 5 5v2c0 2-2 4-5 4s-5-2-5-4v-2z" />
            <path d="M12 11v2" />
            <path d="M9 16c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2" />
          </g>
        );
      case 'sleep':
        return (
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
            <path d="M19 8h2M16 11h2M13 8h2" />
          </g>
        );
      case 'senses':
        return (
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </g>
        );
      case 'syringe':
        return (
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 2 4 4M13 7l9 9M9 11l3 3M5 15l-2 6 6-2 12-12-4-4z" />
          </g>
        );
      case 'capsule':
        return (
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
            <path d="m8.5 8.5 7 7" />
          </g>
        );
      case 'home':
        return (
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </g>
        );
      case 'close':
        return <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />;
      case 'arrow-right':
        return <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />;
      case 'check-circle':
        return (
          <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      {getIconContent()}
    </svg>
  );
};

const Dseasonal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const triggers = [
    { name: 'Ragweed Pollen', status: 'STRONG REACTION', type: 'strong' },
    { name: 'Tree Pollen (Birch)', status: 'MODERATE', type: 'moderate' },
    { name: 'Dust Mites', status: 'LOW IMPACT', type: 'low' },
  ];

  const habits = [
    {
      icon: 'syringe',
      title: 'Allergy Shots (Immunotherapy)',
      desc: 'Regular sessions to help your body stop overreacting to ragweed.',
      status: 'Highly Recommended',
      time: 'Starts Oct 12'
    },
    {
      icon: 'capsule',
      title: 'Daily Nasal Spray',
      desc: 'Use Fluticasone once a day to keep swelling down and breathing easy.',
      status: 'Daily Habit',
      time: 'Refill Ready'
    },
    {
      icon: 'home',
      title: 'Better Air at Home',
      desc: 'Use a high-quality air filter in your bedroom to clear out dust and pollen.',
      status: 'Home Care',
      time: 'Ongoing'
    }
  ];

  return (
    <div className={`ds-page-wrapper ${onClose ? 'is-modal' : ''}`}>
      {/* Mock Background for Visual Depth - Only show if NOT in modal mode */}
      {!onClose && (
        <div className="ds-mock-bg">
          <aside className="ds-mock-sidebar">
            <div className="ds-mock-logo-area">
              <div className="ds-mock-logo-icon">V</div>
              <div className="ds-mock-logo-text">
                <span className="ds-m-main-logo">VaidyaGo</span>
                <span className="ds-m-sub-logo">YOUR CARE PARTNER</span>
              </div>
            </div>

            <div className="ds-mock-nav">
              {[
                { t: 'My Home', active: true },
                { t: 'My Insights' },
                { t: 'Care Plan' },
                { t: 'Messages' }
              ].map(item => (
                <div key={item.t} className={`ds-mock-nav-item ${item.active ? 'ds-m-active' : ''}`}>
                  <div className="ds-mock-nav-icon"></div>
                  <span>{item.t}</span>
                </div>
              ))}
            </div>

            <div className="ds-mock-sidebar-footer">
              <button className="ds-mock-book-btn">Book Appointment</button>
            </div>
          </aside>
          
          <main className="ds-mock-main">
            <header className="ds-mock-header">
              <div className="ds-mock-search"></div>
              <div className="ds-mock-profile"></div>
            </header>
            <div className="ds-mock-grid">
              {[1, 2, 3].map(i => (
                <div key={i} className="ds-mock-card">
                  <div className="ds-mock-line-lg"></div>
                  <div className="ds-mock-line-sm"></div>
                  <div className="ds-mock-line-sm"></div>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}

      <div className="ds-overlay" onClick={handleClose}>
        <div className="ds-modal" onClick={e => e.stopPropagation()}>
          <button className="ds-close-btn" onClick={handleClose}>
            <Icon name="close" size={24} />
          </button>

          <header className="ds-header">
            <div className="ds-header-icon">
              <Icon name="wind" size={28} />
            </div>
            <div className="ds-header-text">
              <h1>Seasonal Allergies (Rhinitis)</h1>
              <div className="ds-subtitle">
                <span className="ds-pulse">
                  <Icon name="check-circle" size={14} />
                </span>
                Your Health Insight • Personalized for Alex Rivera
              </div>
            </div>
          </header>

          <main className="ds-content">
            <div className="ds-top-row">
              <div className="ds-reaction-card">
                <h2 className="ds-section-label">HOW YOUR BODY IS REACTING</h2>
                <div className="ds-reaction-main">
                  <div className="ds-stat">
                    <span className="ds-number">4.2</span>
                    <span className="ds-unit">kIU/L</span>
                  </div>
                  <div className="ds-status-box">
                    <span className="ds-status-text">Elevated Allergy Markers (IgE)</span>
                    <p className="ds-status-desc">
                      This high level explains why your symptoms have been more intense recently.
                    </p>
                  </div>
                </div>
                <div className="ds-progress-container">
                  <div className="ds-progress-track">
                    <div className="ds-progress-fill" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <p className="ds-body-text">
                  Your body's immune system is working overtime to protect you from common allergens. 
                  This causes the redness and swelling you feel in your nose, and if we don't act now, 
                  the irritation might become more stubborn.
                </p>
              </div>

              <div className="ds-triggers-card">
                <h2 className="ds-section-label">YOUR MAIN TRIGGERS</h2>
                <div className="ds-triggers-list">
                  {triggers.map((t, i) => (
                    <div key={i} className="ds-trigger-item">
                      <span className="ds-trigger-name">{t.name}</span>
                      <span className={`ds-trigger-badge ds-badge-${t.type}`}>
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="ds-trigger-hint">
                  Based on your recent tests and local pollen counts in your area.
                </p>
              </div>
            </div>

            <div className="ds-symptoms-grid">
              <div className="ds-symptom-item">
                <Icon name="eye" className="ds-symp-icon" size={20} />
                <div className="ds-symp-info">
                  <label>EYES</label>
                  <span>Itchy & Red</span>
                </div>
              </div>
              <div className="ds-symptom-item">
                <Icon name="nose" className="ds-symp-icon" size={20} />
                <div className="ds-symp-info">
                  <label>NOSE</label>
                  <span>Stuffy & Swollen</span>
                </div>
              </div>
              <div className="ds-symptom-item">
                <Icon name="sleep" className="ds-symp-icon" size={20} />
                <div className="ds-symp-info">
                  <label>REST</label>
                  <span>Poor Sleep Quality</span>
                </div>
              </div>
              <div className="ds-symptom-item">
                <Icon name="senses" className="ds-symp-icon" size={20} />
                <div className="ds-symp-info">
                  <label>SENSES</label>
                  <span>Dull Smell/Taste</span>
                </div>
              </div>
            </div>

            <section className="ds-steps-section">
              <div className="ds-steps-header">
                <h3>Steps to Feel Better</h3>
                <span className="ds-update-tag">PLAN UPDATED TODAY</span>
              </div>
              <div className="ds-habits-container">
                {habits.map((h, i) => (
                  <div key={i} className="ds-habit-row">
                    <div className="ds-habit-icon">
                      <Icon name={h.icon} size={20} />
                    </div>
                    <div className="ds-habit-details">
                      <h4>{h.title}</h4>
                      <p>{h.desc}</p>
                    </div>
                    <div className="ds-habit-meta">
                      <span className={`ds-rec-badge ds-rec-${h.status.toLowerCase().replace(' ', '-')}`}>
                        {h.status}
                      </span>
                      <span className="ds-habit-time">{h.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>

          <footer className="ds-footer">
            <div className="ds-doc-info">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena&backgroundColor=b6e3f4" 
                alt="Dr. Elena Sterling" 
                className="ds-avatar"
              />
              <div className="ds-doc-text">
                <h5>Dr. Elena Sterling</h5>
                <span>Your Specialist</span>
              </div>
            </div>
            <div className="ds-footer-btns">
              <button className="ds-btn-pdf">Save as PDF</button>
              <button className="ds-btn-start" onClick={() => navigate('/CarePlan')}>
                Start My Care Plan
                <Icon name="arrow-right" size={18} />
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Dseasonal;
