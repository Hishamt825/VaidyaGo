import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dsetting.css';
import logoUrl from '../../assets/v.png';
import avatarUrl from '../../assets/Ellipse.svg';

const Settingpage = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('Personal Information');
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('Select Country');

  const countries = [
    'India', 'United States', 'United Kingdom', 'Canada', 'Australia', 
    'Germany', 'France', 'Japan', 'Brazil', 'United Arab Emirates'
  ];

  const menuItems = [
    'Personal Information',
    'Professional Info',
    'Hospital Info',
    'Document Uploaded'
  ];

  // DOB States
  const [isDOBOpen, setIsDOBOpen] = useState(false);
  const [selectedDOB, setSelectedDOB] = useState('Enter Date of Birth');
  const [viewMonth, setViewMonth] = useState('January');
  const [viewYear, setViewYear] = useState(2000);
  const [isMonthSelectOpen, setIsMonthSelectOpen] = useState(false);
  const [isYearSelectOpen, setIsYearSelectOpen] = useState(false);
  const [activeDate, setActiveDate] = useState(null);

  // Theme states
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('Light Mode');

  // Language states
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // Gender states
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState('Select Gender');

  // City states
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('City');

  const cities = [
    'Gorakhpur', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 
    'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Lucknow',
    'Jaipur', 'Surat', 'Kanpur', 'Nagpur', 'Indore'
  ];

  const languages = [
    'English', 'Hindi', 'Spanish', 'French', 'German', 
    'Japanese', 'Chinese', 'Arabic', 'Russian', 'Portuguese'
  ];

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = Array.from({length: 77}, (_, i) => 1950 + i); // 1950 to 2026
  const calendarDays = Array.from({length: 31}, (_, i) => i + 1);

  return (
    <div className={`settings-container ${selectedTheme === 'Dark Mode' ? 'dark-theme' : ''}`}>
      {/* Header */}
      <header className="settings-header">
        <div className="logo-wrapper">
          <img src={logoUrl} alt="VaDyaGo Logo" onClick={() => navigate('/Doctor_dashboard')} style={{cursor: 'pointer'}} />
        </div>
        <div className="user-profile-header">
          <span className="profile-name-header">Adiba Khanam</span>
          <img src={avatarUrl} alt="Adiba Khanam" className="profile-avatar-small" />
        </div>
      </header>

      {/* Main Body */}
      <div className="settings-body">
        {/* Left Sidebar Menu */}
        <aside className="settings-sidebar">
          <h1>Settings</h1>
          <nav className="sidebar-menu">
            {menuItems.map((item) => (
              <div
                key={item}
                className={`sidebar-item ${activeItem === item ? 'active' : ''}`}
                onClick={() => setActiveItem(item)}
              >
                {item}
              </div>
            ))}
          </nav>
        </aside>

        {/* Right Main Content */}
        <main className="settings-main-content">
          <div className="back-button-wrapper">
            <button className="back-button" onClick={() => navigate(-1)}>
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Personal Information Section */}
          <section className="settings-section-card">
            <div className="section-header">Personal Information</div>
            <div className="profile-change-wrapper">
              <img src={avatarUrl} alt="Adiba Khanam" className="profile-avatar-large" />
              <button className="change-btn">Change</button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Name</label>
                <div className="input-container">
                  <input type="text" placeholder="Adiba Khanam" defaultValue="Adiba Khanam" />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <div className="input-container">
                  <input type="email" placeholder="khanamadiba@gmail.com" defaultValue="khanamadiba@gmail.com" />
                </div>
              </div>
              <div className="form-group">
                <label>DOB</label>
                <div className="input-container custom-dropdown">
                  <div 
                    className={`dropdown-selected ${isDOBOpen ? 'active' : ''}`}
                    onClick={() => setIsDOBOpen(!isDOBOpen)}
                  >
                    <span className={selectedDOB === 'Enter Date of Birth' ? 'placeholder-text' : ''}>{selectedDOB}</span>
                    <svg 
                      className={`dropdown-chevron ${isDOBOpen ? 'open' : ''}`} 
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                  
                  {isDOBOpen && (
                    <div className="calendar-dropdown">
                      {/* Calendar Header: Month and Year selectors */}
                      <div className="calendar-header">
                        <div className="month-year-nav">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const idx = months.indexOf(viewMonth);
                              setViewMonth(months[idx === 0 ? 11 : idx - 1]);
                            }}
                          >
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
                          </button>
                          
                          <div className="month-selector" onClick={(e) => { e.stopPropagation(); setIsMonthSelectOpen(!isMonthSelectOpen); }}>
                            {viewMonth}
                            {isMonthSelectOpen && (
                              <div className="dropdown-list scroll-hide">
                                {months.map(m => (
                                  <div key={m} onClick={(e) => { e.stopPropagation(); setViewMonth(m); setIsMonthSelectOpen(false); }}>{m}</div>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div className="year-selector" onClick={(e) => { e.stopPropagation(); setIsYearSelectOpen(!isYearSelectOpen); }}>
                            {viewYear}
                            {isYearSelectOpen && (
                              <div className="dropdown-list scroll-hide">
                                {years.map(y => (
                                  <div key={y} onClick={(e) => { e.stopPropagation(); setViewYear(y); setIsYearSelectOpen(false); }}>{y}</div>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const idx = months.indexOf(viewMonth);
                              setViewMonth(months[idx === 11 ? 0 : idx + 1]);
                            }}
                          >
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Days Grid */}
                      <div className="calendar-grid">
                        <div className="week-days">
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d}>{d}</div>)}
                        </div>
                        <div className="days-list">
                          {/* Placeholder for first few empty days (assuming etc) */}
                          {calendarDays.map(d => (
                            <div 
                              key={d} 
                              className={`day-item ${activeDate === d ? 'active' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveDate(d);
                                setSelectedDOB(`${d} ${viewMonth.slice(0,3)}, ${viewYear}`);
                                setIsDOBOpen(false);
                              }}
                            >
                              {d}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>Gender</label>
                <div className="input-container custom-dropdown">
                  <div 
                    className={`dropdown-selected ${isGenderOpen ? 'active' : ''}`}
                    onClick={() => setIsGenderOpen(!isGenderOpen)}
                  >
                    <span className={selectedGender === 'Select Gender' ? 'placeholder-text' : ''}>{selectedGender}</span>
                    <svg 
                      className={`dropdown-chevron ${isGenderOpen ? 'open' : ''}`} 
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                  {isGenderOpen && (
                    <div className="dropdown-list">
                      {['Male', 'Female', 'Other'].map((gender) => (
                        <div 
                          key={gender} 
                          className={`dropdown-option ${selectedGender === gender ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedGender(gender);
                            setIsGenderOpen(false);
                          }}
                        >
                          {gender}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <div className="input-container">
                  <input type="text" placeholder="Enter Phone Number" />
                </div>
              </div>
              <div className="form-grid triple" style={{margin: 0, gap: '10px'}}>
                <div className="form-group">
                  <label>Country</label>
                  <div className="input-container custom-dropdown">
                    <div 
                      className={`dropdown-selected ${isCountryOpen ? 'active' : ''}`}
                      onClick={() => setIsCountryOpen(!isCountryOpen)}
                    >
                      <span>{selectedCountry}</span>
                      <svg 
                        className={`dropdown-chevron ${isCountryOpen ? 'open' : ''}`} 
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                    {isCountryOpen && (
                      <div className="dropdown-list">
                        {countries.map((country) => (
                          <div 
                            key={country} 
                            className="dropdown-option"
                            onClick={() => {
                              setSelectedCountry(country);
                              setIsCountryOpen(false);
                            }}
                          >
                            {country}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                <label>City</label>
                <div className="input-container custom-dropdown">
                  <div 
                    className={`dropdown-selected ${isCityOpen ? 'active' : ''}`}
                    onClick={() => setIsCityOpen(!isCityOpen)}
                  >
                    <span className={selectedCity === 'City' ? 'placeholder-text' : ''}>{selectedCity}</span>
                    <svg 
                      className={`dropdown-chevron ${isCityOpen ? 'open' : ''}`} 
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                  {isCityOpen && (
                    <div className="dropdown-list">
                      {cities.map((city) => (
                        <div 
                          key={city} 
                          className={`dropdown-option ${selectedCity === city ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedCity(city);
                            setIsCityOpen(false);
                          }}
                        >
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <div className="input-container">
                    <input type="text" placeholder="Enter Pincode" />
                  </div>
                </div>
              </div>
              <div className="form-group full-width">
                <label>Address</label>
                <div className="input-container">
                  <input type="text" placeholder="Enter Address" />
                </div>
              </div>
            </div>
          </section>

          {/* Change Password Section */}
          <section className="settings-section-card">
            <div className="section-header">Change Password</div>
            <div className="form-grid triple">
               <div className="form-group">
                <label>Old Password</label>
                <div className="input-container">
                  <input type="password" placeholder="Enter your password" />
                </div>
              </div>
              <div className="form-group">
                <label>New Password</label>
                <div className="input-container">
                  <input type="password" placeholder="Enter your password" />
                </div>
              </div>
              <div className="form-group">
                <label>New Password Again</label>
                <div className="input-container">
                  <input type="password" placeholder="Enter your password" />
                </div>
              </div>
            </div>
          </section>

          {/* Preference Section */}
          <section className="settings-section-card">
            <div className="section-header">Preference</div>
            <div className="form-grid triple">
              <div className="form-group">
                <label>Theme</label>
                <div className="input-container custom-dropdown">
                  <div 
                    className={`dropdown-selected ${isThemeOpen ? 'active' : ''}`}
                    onClick={() => setIsThemeOpen(!isThemeOpen)}
                  >
                    <span>{selectedTheme}</span>
                    <svg 
                      className={`dropdown-chevron ${isThemeOpen ? 'open' : ''}`} 
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                  {isThemeOpen && (
                    <div className="dropdown-list">
                      {['Light Mode', 'Dark Mode'].map((theme) => (
                        <div 
                          key={theme} 
                          className={`dropdown-option ${selectedTheme === theme ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedTheme(theme);
                            setIsThemeOpen(false);
                          }}
                        >
                          {theme}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>Language</label>
                <div className="input-container custom-dropdown">
                  <div 
                    className={`dropdown-selected ${isLanguageOpen ? 'active' : ''}`}
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  >
                    <span>{selectedLanguage}</span>
                    <svg 
                      className={`dropdown-chevron ${isLanguageOpen ? 'open' : ''}`} 
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                  {isLanguageOpen && (
                    <div className="dropdown-list">
                      {languages.map((lang) => (
                        <div 
                          key={lang} 
                          className={`dropdown-option ${selectedLanguage === lang ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedLanguage(lang);
                            setIsLanguageOpen(false);
                          }}
                        >
                          {lang}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>Timezones</label>
                <div className="input-container">
                   <select defaultValue="">
                    <option value="" disabled>Select timezones</option>
                  </select>
                   <svg className="dropdown-icon" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* Google Integration Section */}
          <section className="settings-section-card">
            <div className="section-header">Preference</div>
            <div className="preference-section">
              <div className="google-info">
                <img 
                  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" 
                  alt="Google" 
                  className="google-logo" 
                  style={{objectFit: 'contain', width: '60px'}}
                />
                <div className="google-text">
                  <h4>Google</h4>
                  <p>Connected as khanamadiba@gmail.com</p>
                </div>
              </div>
              <button className="disconnect-btn">Disconnect</button>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default Settingpage;
