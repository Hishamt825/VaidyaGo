import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Tthdiagnostic.css';

// Relative path to the relocated image
import headIllustration from '../../../assets/anatomical_head.png';

const Icon = ({ name, className }) => {
  const icons = {
    target: <React.Fragment><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" /></React.Fragment>,
    muscle: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm13 14V11a2 2 0 1 0-4 0v10" />,
    forbidden: <React.Fragment><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></React.Fragment>,
    printer: <React.Fragment><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></React.Fragment>
  };

  return (
    <svg 
      width="20" 
      height="20" 
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

const Tthdiagnostic = () => {
  const navigate = useNavigate();

  return (
    <div className="tth-diagnostic-container">
      <div className="tth-bg-blur"></div>
      
      <div className="tth-card">
        <button className="tth-close-btn" onClick={() => navigate(-1)}>×</button>

        <header className="tth-header">
          <div className="tth-badge-row">
            <span className="tth-insight-badge">YOUR HEALTH INSIGHT</span>
            <span className="tth-report-id">Report ID: ANALYTIC-8821-X</span>
          </div>
          <h1>Tension-Type Headache</h1>
          <div className="tth-confidence">
            Clinical Confidence Score: <span>94.2%</span>
          </div>
        </header>

        <section className="tth-section">
          <h3 className="tth-section-title">About Your Headache</h3>
          <div className="tth-about-grid">
            <div className="tth-about-col">
              <p className="tth-about-text">
                A tension-type headache is the most common kind of headache. It often feels like a tight band or a dull ache pressing on both sides of your head. Unlike migraines, these headaches usually don't cause nausea or vision changes, but they can still be quite uncomfortable.
              </p>
              <div className="tth-duration-box">
                <label>COMMON DURATION</label>
                <p>Typical episodes last 30 minutes to 7 days.</p>
              </div>
            </div>
            <div className="tth-visual-col">
              <img src={headIllustration} alt="Anatomical Illustration" />
            </div>
          </div>
        </section>

        <section className="tth-section">
          <h3 className="tth-section-title">Your Symptoms Explained</h3>
          <div className="tth-symptoms-grid">
            <div className="tth-symptom-card">
              <div className="tth-symptom-icon">
                <Icon name="target" />
              </div>
              <h4>Pressure on Both Sides</h4>
              <p>Matches your report of a 'squeezing' feeling across your forehead.</p>
            </div>
            <div className="tth-symptom-card">
              <div className="tth-symptom-icon">
                <Icon name="muscle" />
              </div>
              <h4>Muscle Sensitivity</h4>
              <p>Slight tenderness found in your neck and shoulder muscles during the exam.</p>
            </div>
            <div className="tth-symptom-card">
              <div className="tth-symptom-icon">
                <Icon name="forbidden" />
              </div>
              <h4>No Light Sensitivity</h4>
              <p>Since you aren't sensitive to light or sound, we can rule out common migraines.</p>
            </div>
          </div>
        </section>

        <section className="tth-section" style={{ marginBottom: 0 }}>
          <div className="tth-works-wrap">
            <h3 className="tth-section-title" style={{ marginBottom: 15 }}>How It Works</h3>
            <div className="tth-works-content">
              While these were once thought to be just muscle tension, we now know that <b>nerve signaling</b> in the head and neck plays a major role. Sometimes, the brain becomes extra sensitive to pain signals from your muscles, turning occasional discomfort into a more frequent headache.
            </div>
          </div>
        </section>

        <footer className="tth-footer">
          <a href="#" className="tth-print-link">
            <Icon name="printer" />
            Print Report
          </a>
          <div className="tth-actions">
            <button className="tth-btn tth-btn-outline" onClick={() => navigate('/Askspecialist')}>Ask a Specialist</button>
            <button className="tth-btn tth-btn-solid" onClick={() => navigate('/Myrecord')}>Save to My Record</button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Tthdiagnostic;
