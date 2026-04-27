import React from 'react';
import './PharmacyPopup.css';
import mapPlaceholder from './abstract_city_map.png';

const Icon = ({ name }) => {
  const icons = {
    search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    location: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    navigation: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>,
    close: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 20 10.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
  };
  return <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">{icons[name]}</svg>;
};

const PharmacyPopup = ({ onClose }) => {
  const pharmacies = [
    { name: 'HealPoint Wellness', addr: '248 Market Street, Suite 100', dist: '0.4 miles away', status: 'OPEN', active: true },
    { name: 'CityCare Pharma', addr: '712 Mission St', dist: '1.2 miles away', status: 'OPEN' },
    { name: 'The Local Apothecary', addr: '105 Guerrero St', dist: '2.8 miles away', status: 'CLOSED' }
  ];

  return (
    <div className="pharmacy-overlay" onClick={onClose}>
      <div className="pharmacy-modal" onClick={(e) => e.stopPropagation()}>
        <div className="map-panel">
          <div className="map-search-wrapper">
             <div className="search-pin">
               <Icon name="pin" />
             </div>
             <span>Market St & 4th, San Francisco</span>
             <button className="clear-search-btn">
                <Icon name="close" />
             </button>
          </div>

          <div className="map-pin-circle">
             <img src={mapPlaceholder} alt="City Map" className="map-image-mock" />
          </div>

          <div className="map-zoom-controls">
            <button className="zoom-btn">+</button>
            <button className="zoom-btn">−</button>
          </div>
          
          <div style={{ position: 'absolute', bottom: 30, left: 30, color: 'white', opacity: 0.8, fontSize: 13, fontWeight: 600 }}>
             Safe for work
          </div>
        </div>

        <div className="pharmacy-info-panel">
          <button className="close-pharmacy" onClick={onClose}>
            <Icon name="close" />
          </button>
          <h2>Find a Pharmacy</h2>
          <span className="count-text">3 pharmacies found near you</span>

          <div className="pharmacy-list">
             {pharmacies.map((p, i) => (
                <div key={i} className={`pharmacy-item ${p.active ? 'active' : ''}`}>
                   <div className="pharmacy-item-header">
                      <h4>{p.name}</h4>
                      <span className={`status-badge ${p.status.toLowerCase()}`}>{p.status}</span>
                   </div>
                   <p>{p.addr}</p>
                   <div className="distance-wrap">
                      <Icon name="navigation" />
                      <span>{p.dist}</span>
                   </div>
                </div>
             ))}
          </div>

          <button className="directions-btn">
             <Icon name="navigation" />
             Get Directions
          </button>
        </div>
      </div>
    </div>
  );
};

export default PharmacyPopup;
