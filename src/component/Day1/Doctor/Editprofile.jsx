import React, { useState, useRef } from 'react';
import './Editprofile.css';

const Icon = ({ name }) => {
  const icons = {
    pencil: <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    key: <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3L15.5 7.5z" />,
    clock: <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-15v5l3 3" />,
    chevronDown: <path d="m6 9 6 6 6-6" />,
  };

  return (
    <svg 
      viewBox="0 0 24 24" 
      width="20" 
      height="20" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
};

const Editprofile = () => {
  const [selectedGender, setSelectedGender] = useState("Male");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=Julian");
  const fileInputRef = useRef(null);

  const genderOptions = ["Male", "Female", "Non-binary", "Prefer not to say", "Other", "Transgender", "Genderfluid"];

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="edit-profile-container">
      <header className="edit-header reveal">
        <h1>Edit Profile</h1>
        <p>Manage your account settings and clinical preferences.</p>
      </header>

      <main className="main-edit-card reveal delay-1">
        <div className="photo-section">
          <div className="profile-img-container">
            <img 
              src={profileImage} 
              alt="Profile" 
              className="profile-main-img" 
            />
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              style={{ display: 'none' }} 
              accept="image/*"
            />
            <button className="edit-img-btn" onClick={handleImageClick}>
              <Icon name="pencil" />
            </button>
          </div>
          <h4>Profile Photo</h4>
          <span>PNG or JPG, max 5MB</span>
        </div>

        <div className="divider"></div>

        <div className="edit-form-grid">
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" defaultValue="Dr. Julian Thorne" />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input type="email" defaultValue="julian.thorne@vaidyago.com" />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input type="text" defaultValue="+1 (555) 234-8901" />
          </div>

          <div className="input-group">
            <label>Date of Birth</label>
            <input type="text" defaultValue="05/12/1985" />
          </div>

          <div className="input-group">
            <label>Gender</label>
            <div className="custom-dropdown-container">
              <div 
                className={`custom-dropdown-header ${isDropdownOpen ? 'active' : ''}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{selectedGender}</span>
                <div className={`chevron ${isDropdownOpen ? 'rotate' : ''}`}>
                  <Icon name="chevronDown" />
                </div>
              </div>
              
              {isDropdownOpen && (
                <div className="custom-dropdown-list-wrapper">
                  <ul className="custom-dropdown-list">
                    {genderOptions.map((option) => (
                      <li 
                        key={option} 
                        className={selectedGender === option ? 'selected' : ''}
                        onClick={() => {
                          setSelectedGender(option);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="input-group full-width">
            <label>Residential Address</label>
            <input type="text" defaultValue="4522 Sanctuary Lane, Medical District, Seattle, WA 98101" />
          </div>
        </div>

        <div className="divider"></div>

        <div className="emergency-section">
          <div className="emergency-header">
            <span className="asterisk">*</span>
            <h3>Emergency Contact</h3>
          </div>
          
          <div className="edit-form-grid">
            <div className="input-group">
              <label>Contact Name</label>
              <input type="text" defaultValue="Sarah Thorne" />
            </div>

            <div className="input-group">
              <label>Contact Number</label>
              <input type="text" defaultValue="+1 (555) 987-6543" />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="cancel-btn">Cancel</button>
          <button className="save-btn">Save Changes</button>
        </div>
      </main>

      <div className="stats-row reveal delay-2">
        <div className="stat-card">
          <div className="stat-icon pulse">
            <Icon name="shield" />
          </div>
          <h5>Account Verified</h5>
          <p>Credential check completed on Oct 24.</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="key" />
          </div>
          <h5>Password Last Changed</h5>
          <p>Updated 45 days ago. Keep it secure.</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="clock" />
          </div>
          <h5>Last Login</h5>
          <p>Today at 08:42 AM from Seattle, WA.</p>
        </div>
      </div>
    </div>
  );
};

export default Editprofile;
