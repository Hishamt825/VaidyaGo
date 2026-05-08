import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dsetting.css';
import logoUrl from '../../assets/v.png';
import avatarUrl from '../../assets/Ellipse.svg';
import BASE_URL from '../../baseUrl';
import Profile from '../Admin/Profile';
import DasyWilliam from '../Admin/DasyWilliam';
import Notification from '../Patient/notification';
import { AnimatePresence } from 'framer-motion';

const Settingpage = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('Personal Information');
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (openProfile) {
    return <Profile setOpenProfile={setOpenProfile} />;
  }
  
  // Data states from Form1
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    mobile_number: "",
    alternate_number: "",
    email: "",
    country: "",
    city: "",
    pincode: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const [doctorId, setDoctorId] = useState(localStorage.getItem("doctor_id") || null);

  // Professional Info states from Form2
  const [professionalFormData, setProfessionalFormData] = useState({
    doctor_employee_id: "",
    department: "",
    specialization: "",
    qualification: "",
    years_of_experience: "",
    medical_license_number: "",
    medical_council: "",
  });
  const [profInitialData, setProfInitialData] = useState(null);
  const [profLoading, setProfLoading] = useState(false);
  const [professionalInfoId, setProfessionalInfoId] = useState(localStorage.getItem("professional_info_id") || null);

  // Hospital Info states from Form3
  const [hospitalFormData, setHospitalFormData] = useState({
    joining_date: "",
    employment_type: "",
    consultation_fees: "",
    leave_day: ""
  });
  const [hospInitialData, setHospInitialData] = useState(null);
  const [hospLoading, setHospLoading] = useState(false);
  const [hospitalInfoId, setHospitalInfoId] = useState(localStorage.getItem("hospital_info_id") || null);

  // Document Uploaded states from Form4
  const [documentFormData, setDocumentFormData] = useState({
    aadhaar: null,
    pan: null,
    license: null,
    degree: null,
    experience: null,
    other: null,
  });
  const [docInitialData, setDocInitialData] = useState({
    aadhaar: null,
    pan: null,
    license: null,
    degree: null,
    experience: null,
    other: null,
  });
  const [docLoading, setDocLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [activeRow, setActiveRow] = useState("aadhaar");
  const stepOrder = ["aadhaar", "pan", "license", "degree", "experience", "other"];
  const activeIndex = stepOrder.indexOf(activeRow);

  const menuItems = [
    'Personal Information',
    'Professional Info',
    'Authentication',
    'Preference',
    'Hospital Info',
    'Document Uploaded'
  ];

  // UI Dropdown states
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('Light Mode');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);

  // Constants
  const countries = [
    { name: 'India', code: 'IN' },
    { name: 'United States', code: 'US' },
    { name: 'United Kingdom', code: 'UK' }
  ];
  const cities = [
    { name: 'Mumbai', code: 'MUM' },
    { name: 'New York', code: 'NY' },
    { name: 'Gorakhpur', code: 'GKP' }
  ];
  const languages = ['English', 'Hindi', 'Spanish', 'French'];

  // Fetch Data Logic
  useEffect(() => {
    const fetchDoctorData = async () => {
      if (!doctorId) return;
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`${BASE_URL}/api/doctor-personal-info/${doctorId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData(data);
          setInitialData(data);
          if (data.profile_image) setProfileImagePreview(data.profile_image);
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };
    fetchDoctorData();
  }, [doctorId]);

  // Fetch Professional Info Logic
  useEffect(() => {
    const fetchProfessionalInfo = async () => {
      if (!doctorId || !professionalInfoId) return;
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${BASE_URL}/api/doctor/${doctorId}/professional-info/${professionalInfoId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setProfessionalFormData(data);
          setProfInitialData(data);
        }
      } catch (err) {
        console.error("Error fetching professional info:", err);
      }
    };
    fetchProfessionalInfo();
  }, [doctorId, professionalInfoId]);

  // Fetch Hospital Info Logic
  useEffect(() => {
    const fetchHospitalInfo = async () => {
      if (!doctorId || !hospitalInfoId) return;
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`${BASE_URL}/api/doctor/${doctorId}/hospital-info/${hospitalInfoId}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setHospitalFormData(data);
          setHospInitialData(data);
        }
      } catch (error) {
        console.error("Error fetching hospital info:", error);
      }
    };
    fetchHospitalInfo();
  }, [doctorId, hospitalInfoId]);

  // Fetch Documents Logic
  useEffect(() => {
    const fetchDocuments = async () => {
      if (!doctorId || !localStorage.getItem("document_info_id")) return;
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`${BASE_URL}/api/doctor/${doctorId}/documents/list/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setDocuments(data);
          const fetchedData = {
            aadhaar: data.find((d) => d.document_type === "aadhaar") || null,
            pan: data.find((d) => d.document_type === "pan") || null,
            license: data.find((d) => d.document_type === "medical_license") || null,
            degree: data.find((d) => d.document_type === "medical_certificate") || null,
            experience: data.find((d) => d.document_type === "experience_letter") || null,
            other: data.find((d) => d.document_type === "other") || null,
          };
          setDocInitialData(fetchedData);
          setDocumentFormData(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchDocuments();
  }, [doctorId]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfChange = (e) => {
    setProfessionalFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleHospChange = (e) => {
    setHospitalFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDocChange = (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      alert("File size exceeds 3MB limit.");
      return;
    }
    setDocumentFormData(prev => ({ ...prev, [fileType]: file }));
    setActiveRow(fileType);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImagePreview(URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, profile_image: file }));
  };

  const getChangedFields = () => {
    const changed = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== initialData?.[key]) {
        changed[key] = formData[key];
      }
    });
    return changed;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMsg("Please login first");
        return;
      }

      const isChanged = JSON.stringify(initialData) !== JSON.stringify(formData);
      
      if (!doctorId) {
        // CREATE (POST)
        const response = await fetch(`${BASE_URL}/api/doctor-personal-info/`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.status === 201) {
          localStorage.setItem("doctor_id", data.id);
          setDoctorId(data.id);
          setInitialData(data);
          alert("Information Saved Successfully!");
        } else {
          setErrorMsg(data?.detail || "Save Failed");
        }
      } else if (isChanged) {
        // UPDATE (PATCH)
        const changedFields = getChangedFields();
        const response = await fetch(`${BASE_URL}/api/doctor-personal-info/${doctorId}/`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(changedFields),
        });
        const data = await response.json();
        if (response.ok) {
          setFormData(data);
          setInitialData(data);
          alert("Information Updated Successfully!");
        } else {
          setErrorMsg(data?.detail || "Update Failed");
        }
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setErrorMsg("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleProfessionalSubmit = async (e) => {
    if (e) e.preventDefault();
    setProfLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token || !doctorId) {
        alert("Please complete Personal Information first.");
        return;
      }

      const isChanged = JSON.stringify(profInitialData) !== JSON.stringify(professionalFormData);
      
      let response;
      if (!professionalInfoId) {
        // POST
        response = await fetch(`${BASE_URL}/api/doctor/${doctorId}/professional-info/`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            ...professionalFormData,
            years_of_experience: Number(professionalFormData.years_of_experience),
          }),
        });
        const data = await response.json();
        if (response.status === 201) {
          const newId = data.id || (data.data && data.data.id);
          localStorage.setItem("professional_info_id", newId);
          setProfessionalInfoId(newId);
          setProfInitialData(data);
          alert("Professional Info Saved Successfully!");
        } else {
          alert(data?.detail || "Save Failed");
        }
      } else if (isChanged) {
        // PATCH
        response = await fetch(`${BASE_URL}/api/doctor/${doctorId}/professional-info/${professionalInfoId}/`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            ...professionalFormData,
            years_of_experience: Number(professionalFormData.years_of_experience),
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setProfessionalFormData(data);
          setProfInitialData(data);
          alert("Professional Info Updated Successfully!");
        } else {
          alert(data?.detail || "Update Failed");
        }
      }
    } catch (error) {
      console.error("Error saving professional info:", error);
      alert("Something went wrong");
    } finally {
      setProfLoading(false);
    }
  };

  const handleHospitalSubmit = async (e) => {
    if (e) e.preventDefault();
    setHospLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token || !doctorId) {
        alert("Please complete Personal Information first.");
        return;
      }

      const isChanged = JSON.stringify(hospInitialData) !== JSON.stringify(hospitalFormData);
      const baseUrl = `${BASE_URL}/api/doctor/${doctorId}/hospital-info/`;

      if (!hospitalInfoId) {
        // POST
        const response = await fetch(baseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            ...hospitalFormData,
            consultation_fees: parseFloat(hospitalFormData.consultation_fees)
          }),
        });
        const data = await response.json();
        if (response.status === 201) {
          const newId = data.id || data.data?.id;
          localStorage.setItem("hospital_info_id", newId);
          setHospitalInfoId(newId);
          setHospInitialData(data);
          alert("Hospital Info Saved Successfully!");
        } else {
          alert(data?.detail || "Save Failed");
        }
      } else if (isChanged) {
        // PATCH
        const response = await fetch(`${baseUrl}${hospitalInfoId}/`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            ...hospitalFormData,
            consultation_fees: parseFloat(hospitalFormData.consultation_fees)
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setHospitalFormData(data);
          setHospInitialData(data);
          alert("Hospital Info Updated Successfully!");
        } else {
          alert(data?.detail || "Update Failed");
        }
      }
    } catch (error) {
      console.error("Error saving hospital info:", error);
      alert("Something went wrong");
    } finally {
      setHospLoading(false);
    }
  };

  const handleDocumentSubmit = async (e) => {
    if (e) e.preventDefault();
    setDocLoading(true);

    const documentTypeMap = {
      aadhaar: "aadhaar",
      pan: "pan",
      license: "medical_license",
      degree: "medical_certificate",
      experience: "experience_letter",
      other: "other",
    };

    try {
      const token = localStorage.getItem("token");
      if (!token || !doctorId) {
        alert("Please login and complete Personal Info first.");
        return;
      }

      let hasUpdates = false;
      for (const key of Object.keys(documentFormData)) {
        if (documentFormData[key] instanceof File) {
          const formPayload = new FormData();
          formPayload.append("document_type", documentTypeMap[key]);
          formPayload.append("document_file", documentFormData[key]);

          const method = docInitialData?.[key] ? "PATCH" : "POST";
          const url = docInitialData?.[key]
            ? `${BASE_URL}/api/doctor/${doctorId}/documents/${docInitialData[key].id}/`
            : `${BASE_URL}/api/doctor/${doctorId}/documents/`;

          const response = await fetch(url, {
            method: method,
            headers: { Authorization: `Bearer ${token}` },
            body: formPayload,
          });

          if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data?.detail || `Upload failed for ${key}`);
          }
          hasUpdates = true;
        }
      }

      if (hasUpdates) {
        localStorage.setItem("document_info_id", "completed");
        alert("Documents Uploaded Successfully!");
        // Refresh docs
        const getRes = await fetch(`${BASE_URL}/api/doctor/${doctorId}/documents/list/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (getRes.ok) {
          const data = await getRes.json();
          setDocuments(data);
          const fetchedData = {
            aadhaar: data.find((d) => d.document_type === "aadhaar") || null,
            pan: data.find((d) => d.document_type === "pan") || null,
            license: data.find((d) => d.document_type === "medical_license") || null,
            degree: data.find((d) => d.document_type === "medical_certificate") || null,
            experience: data.find((d) => d.document_type === "experience_letter") || null,
            other: data.find((d) => d.document_type === "other") || null,
          };
          setDocInitialData(fetchedData);
          setDocumentFormData(fetchedData);
        }
      } else {
        alert("No changes to upload.");
      }
    } catch (error) {
      console.error("Error uploading documents:", error);
      alert(error.message || "Something went wrong");
    } finally {
      setDocLoading(false);
    }
  };

  return (
    <div className={`settings-container ${selectedTheme === 'Dark Mode' ? 'dark-theme' : ''}`}>
      {/* Standardized Header */}
      <header className="h-[74px] flex flex-row items-center justify-between px-4 md:px-8 shrink-0 bg-white border-b border-gray-100 mb-4">
          <div className="flex items-center flex-1 max-w-[700px] gap-[10px] md:gap-[15px]">
              <div className="logo-wrapper cursor-pointer" onClick={() => navigate('/Doctor_dashboard')}>
                  <img src={logoUrl} alt="VaDyaGo Logo" className="h-10" />
              </div>
              <div className="relative flex-1 max-w-[400px]">
                  <div className="absolute inset-y-0 left-0 pl-[16px] flex items-center pointer-events-none">
                      <svg className="w-[18px] h-[18px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                  </div>
                  <input type="text" placeholder="Search" className="w-full pl-[40px] pr-4 py-[9px] bg-white border border-gray-200 rounded-full text-[13.5px] text-gray-700 outline-none focus:border-[#1b738c] transition-all" />
              </div>
          </div>
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <div className="flex items-center gap-3">
                  {/* Settings (Active) */}
                  <div 
                      className="w-14 h-12 bg-gray-50 border border-[#1b738c]/30 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center cursor-pointer transition-all scale-105 group">
                      <svg className="w-7 h-7 text-[#1b738c] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                  </div>

                  {/* Notification */}
                  <div 
                      onClick={() => setIsNotificationOpen(true)}
                      className="w-14 h-12 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-all relative">
                      <svg className="w-7 h-7 text-gray-700 hover:text-[#1b738c] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#9367D8] rounded-full flex items-center justify-center text-white text-[11px] font-bold border-2 border-white shadow-sm">1</div>
                  </div>
              </div>

              <div className="relative" ref={menuRef}>
                  {/* Profile Button */}
                  <div
                      onClick={() => setOpen(!open)}
                      className="flex items-center gap-4 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-xl px-4 py-1 cursor-pointer hover:bg-gray-50 transition-all"
                  >
                      <span className="text-[18px] font-semibold text-gray-700 hidden lg:inline">Dasy William</span>
                      <img src={profileImagePreview || "/assets/ph.png"} className="w-11 h-11 rounded-full border-black/50 rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.12)] object-cover" />
                  </div>

                  <AnimatePresence>
                      {open && !openProfile && (
                          <DasyWilliam setOpenProfile={setOpenProfile} />
                      )}
                  </AnimatePresence>
              </div>
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
          {activeItem === 'Personal Information' && (
            <section className="settings-section-card">
              <div className="section-header">Personal Information</div>
              <div className="profile-change-wrapper">
                <img src={profileImagePreview || avatarUrl} alt="Profile" className="profile-avatar-large" />
                <input type="file" id="profile-upload" hidden onChange={handleImageChange} accept="image/*" />
                <label htmlFor="profile-upload" className="change-btn" style={{cursor: 'pointer'}}>Change</label>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <div className="input-container">
                    <input name="first_name" type="text" value={formData.first_name} onChange={handleChange} placeholder="First Name" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <div className="input-container">
                    <input name="last_name" type="text" value={formData.last_name} onChange={handleChange} placeholder="Last Name" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email ID</label>
                  <div className="input-container">
                    <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <div className="input-container">
                    <input name="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <div className="input-container custom-dropdown">
                    <div className={`dropdown-selected ${isGenderOpen ? 'active' : ''}`} onClick={() => setIsGenderOpen(!isGenderOpen)}>
                      <span>{formData.gender || 'Select Gender'}</span>
                      <svg className={`dropdown-chevron ${isGenderOpen ? 'open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                    {isGenderOpen && (
                      <div className="dropdown-list">
                        {['male', 'female', 'other'].map((g) => (
                          <div key={g} className="dropdown-option" onClick={() => { setFormData(prev=>({...prev, gender: g})); setIsGenderOpen(false); }}>{g.charAt(0).toUpperCase() + g.slice(1)}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <div className="input-container">
                    <input name="mobile_number" type="text" value={formData.mobile_number} onChange={handleChange} placeholder="Mobile Number" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Alternate Number</label>
                  <div className="input-container">
                    <input name="alternate_number" type="text" value={formData.alternate_number} onChange={handleChange} placeholder="Alternate Number" />
                  </div>
                </div>

                <div className="form-grid triple" style={{margin: 0, gap: '10px', gridColumn: 'span 2'}}>
                  <div className="form-group">
                    <label>Country</label>
                    <div className="input-container custom-dropdown">
                      <div className={`dropdown-selected ${isCountryOpen ? 'active' : ''}`} onClick={() => setIsCountryOpen(!isCountryOpen)}>
                        <span>{countries.find(c => c.code === formData.country)?.name || 'Select Country'}</span>
                        <svg className={`dropdown-chevron ${isCountryOpen ? 'open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </div>
                      {isCountryOpen && (
                        <div className="dropdown-list">
                          {countries.map((c) => (
                            <div key={c.code} className="dropdown-option" onClick={() => { setFormData(prev=>({...prev, country: c.code})); setIsCountryOpen(false); }}>{c.name}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <div className="input-container custom-dropdown">
                      <div className={`dropdown-selected ${isCityOpen ? 'active' : ''}`} onClick={() => setIsCityOpen(!isCityOpen)}>
                        <span>{cities.find(c => c.code === formData.city)?.name || 'Select City'}</span>
                        <svg className={`dropdown-chevron ${isCityOpen ? 'open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </div>
                      {isCityOpen && (
                        <div className="dropdown-list">
                          {cities.map((c) => (
                            <div key={c.code} className="dropdown-option" onClick={() => { setFormData(prev=>({...prev, city: c.code})); setIsCityOpen(false); }}>{c.name}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Pincode</label>
                    <div className="input-container">
                      <input name="pincode" type="text" value={formData.pincode} onChange={handleChange} placeholder="Pincode" />
                    </div>
                  </div>
                </div>

                <div className="form-group full-width" style={{gridColumn: 'span 2'}}>
                  <label>Address</label>
                  <div className="input-container">
                    <textarea name="address" rows="3" value={formData.address} onChange={handleChange} style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd'}} />
                  </div>
                </div>
              </div>

              {errorMsg && <p style={{color: 'red', marginTop: '10px'}}>{errorMsg}</p>}
              
              <div className="save-btn-container" style={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
                <button className="change-btn" onClick={handleSubmit} disabled={loading} style={{background: '#19718A', color: 'white', border: 'none', padding: '10px 30px'}}>
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </section>
          )}

          {/* Authentication Section */}
          {activeItem === 'Authentication' && (
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
          )}

          {/* Preference Section */}
          {activeItem === 'Preference' && (
            <>
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
                <div className="section-header">Google Integration</div>
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
            </>
          )}

          {/* Professional Info Section */}
          {activeItem === 'Professional Info' && (
             <section className="settings-section-card">
                <div className="section-header">Professional Info</div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Doctor Employee ID</label>
                    <div className="input-container">
                      <input name="doctor_employee_id" type="text" value={professionalFormData.doctor_employee_id} onChange={handleProfChange} placeholder="Employee ID" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Department</label>
                    <div className="input-container">
                      <select name="department" value={professionalFormData.department} onChange={handleProfChange} style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd'}}>
                        <option value="" disabled>Select Department</option>
                        <option value="dept1">Department 1</option>
                        <option value="dept2">Department 2</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Specialization</label>
                    <div className="input-container">
                      <select name="specialization" value={professionalFormData.specialization} onChange={handleProfChange} style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd'}}>
                        <option value="" disabled>Choose Specialization</option>
                        <option value="spec1">Specialization 1</option>
                        <option value="spec2">Specialization 2</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Qualification</label>
                    <div className="input-container">
                      <input name="qualification" type="text" value={professionalFormData.qualification} onChange={handleProfChange} placeholder="Qualification" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Years Of Experience</label>
                    <div className="input-container">
                      <input name="years_of_experience" type="number" value={professionalFormData.years_of_experience} onChange={handleProfChange} placeholder="Experience" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Medical License Number</label>
                    <div className="input-container">
                      <input name="medical_license_number" type="text" value={professionalFormData.medical_license_number} onChange={handleProfChange} placeholder="License Number" />
                    </div>
                  </div>
                  <div className="form-group full-width" style={{gridColumn: 'span 2'}}>
                    <label>Medical Council (State / NMC)</label>
                    <div className="input-container">
                      <input name="medical_council" type="text" value={professionalFormData.medical_council} onChange={handleProfChange} placeholder="Medical Council" />
                    </div>
                  </div>
                </div>

                <div className="save-btn-container" style={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
                  <button className="change-btn" onClick={handleProfessionalSubmit} disabled={profLoading} style={{background: '#19718A', color: 'white', border: 'none', padding: '10px 30px'}}>
                    {profLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
             </section>
          )}

          {activeItem === 'Hospital Info' && (
             <section className="settings-section-card">
                <div className="section-header">Hospital Info</div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Joining Date</label>
                    <div className="input-container">
                      <input name="joining_date" type="date" value={hospitalFormData.joining_date} onChange={handleHospChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Employment Type</label>
                    <div className="input-container">
                      <select name="employment_type" value={hospitalFormData.employment_type} onChange={handleHospChange} style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd'}}>
                        <option value="" disabled>Select Type</option>
                        <option value="full_time">Full Time</option>
                        <option value="part_time">Part Time</option>
                        <option value="visiting">Visiting</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Consultation Fee</label>
                    <div className="input-container">
                      <input name="consultation_fees" type="text" value={hospitalFormData.consultation_fees} onChange={handleHospChange} placeholder="Fee" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Working Days</label>
                    <div className="input-container">
                      <input name="leave_day" type="text" value={hospitalFormData.leave_day} onChange={handleHospChange} placeholder="e.g. Mon-Fri" />
                    </div>
                  </div>
                </div>

                <div className="save-btn-container" style={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
                  <button className="change-btn" onClick={handleHospitalSubmit} disabled={hospLoading} style={{background: '#19718A', color: 'white', border: 'none', padding: '10px 30px'}}>
                    {hospLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
             </section>
          )}

          {activeItem === 'Document Uploaded' && (
             <section className="settings-section-card" style={{position: 'relative', overflow: 'hidden', paddingLeft: '80px'}}>
                <div className="section-header" style={{marginLeft: '-40px'}}>Document Uploaded</div>
                
                {/* Vertical Progress Line */}
                <div className="absolute left-[45px] top-[100px] bottom-[110px] w-[4px] bg-[#E2E8F0] z-0 overflow-hidden rounded-full">
                  <div
                    className="w-full bg-[#0A193B] transition-all duration-700 ease-in-out rounded-full"
                    style={{ height: `${(activeIndex / (stepOrder.length - 1)) * 100}%` }}
                  ></div>
                </div>

                <div className="form-grid" style={{gap: '20px', position: 'relative', zIndex: 1}}>
                  {[
                    { label: "Aadhar Card", key: "aadhaar" },
                    { label: "PAN Card", key: "pan" },
                    { label: "Medical License", key: "license" },
                    { label: "Medical Degree Certificate", key: "degree" },
                    { label: "Experience Certificate", key: "experience" },
                    { label: "Other", key: "other" }
                  ].map((doc) => {
                    const isFilled = !!docInitialData[doc.key] || documentFormData[doc.key] instanceof File;
                    return (
                      <div key={doc.key} className="form-group full-width" 
                        onClick={() => setActiveRow(doc.key)}
                        style={{
                          gridColumn: 'span 2', 
                          background: isFilled ? '#F0FDFA' : '#F8FAFC', 
                          padding: '15px', 
                          borderRadius: '16px', 
                          border: isFilled ? '1px solid #19718A' : '1px solid #E2E8F0',
                          position: 'relative',
                          cursor: 'pointer'
                        }}>
                        
                        {/* Dot on Line */}
                        <div className="absolute left-[-46px] top-[22px] z-10 pointer-events-none">
                          <div className={`w-[20px] h-[20px] rounded-full shadow-md transition-all duration-500 border-[3px] border-white flex items-center justify-center
                            ${isFilled ? "bg-[#0A193B]" : "bg-[#89C8D9]"}`}>
                            {isFilled && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                          </div>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                          <label style={{margin: 0, fontWeight: '600', fontSize: '15px', color: '#333'}}>{doc.label}</label>
                          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                            <span style={{fontSize: '12px', fontWeight: '500', color: isFilled ? '#10B981' : '#94A3B8'}}>
                              {isFilled ? "● Uploaded" : "○ Not Uploaded"}
                            </span>
                            <input type="file" id={`upload-${doc.key}`} hidden onChange={(e) => handleDocChange(e, doc.key)} />
                            <label htmlFor={`upload-${doc.key}`} className="change-btn" style={{padding: '6px 20px', fontSize: '12px', cursor: 'pointer', background: '#fff', border: '1px solid #ddd', color: '#333', borderRadius: '8px', fontWeight: '600'}}>
                              {documentFormData[doc.key] instanceof File ? documentFormData[doc.key].name : "Browse"}
                            </label>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="save-btn-container" style={{display: 'flex', justifyContent: 'flex-end', marginTop: '30px'}}>
                  <button className="change-btn" onClick={handleDocumentSubmit} disabled={docLoading} style={{background: '#19718A', color: 'white', border: 'none', padding: '12px 40px', borderRadius: '10px', fontWeight: 'bold'}}>
                    {docLoading ? "Submitting..." : "Upload All Changes"}
                  </button>
                </div>
             </section>
          )}

        </main>
      </div>
    </div>
  );
};

export default Settingpage;
