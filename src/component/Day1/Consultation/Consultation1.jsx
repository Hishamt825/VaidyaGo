import React, { useState, useRef, useEffect } from 'react';
import './Consultation1.css';
import logo from '../../../assets/logo_1.svg';
import profilePic from '../../../assets/Ellipse 134.svg';
import Sidebar from '../../../components/Patient/Patient_sidebar';
import Profile from '../../../components/Patient/Profile';
import Account from '../../../components/Patient/Account';
import Notification from '../../../components/Patient/notification';
import { useNavigate } from 'react-router-dom';
import phImg from '../../../assets/ph.png';

const CustomCalendar = ({ onSelect, initialDate }) => {
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = Array.from({ length: 20 }, (_, i) => 2020 + i);

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleMonthChange = (e) => {
    setCurrentDate(new Date(currentDate.getFullYear(), parseInt(e.target.value)));
  };

  const handleYearChange = (e) => {
    setCurrentDate(new Date(parseInt(e.target.value), currentDate.getMonth()));
  };

  const days = [];
  const totalDays = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());
  const firstDay = getFirstDayOfMonth(currentDate.getMonth(), currentDate.getFullYear());

  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`prev-${i}`} className="calendar-day empty"></div>);
  }

  for (let i = 1; i <= totalDays; i++) {
    const isSelected = initialDate && i === initialDate.getDate() && currentDate.getMonth() === initialDate.getMonth() && currentDate.getFullYear() === initialDate.getFullYear();
    days.push(
      <div 
        key={i} 
        className={`calendar-day ${isSelected ? 'selected' : ''}`}
        onClick={() => onSelect(new Date(currentDate.getFullYear(), currentDate.getMonth(), i))}
      >
        {i}
      </div>
    );
  }

  return (
    <div className="custom-calendar-popup">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>‹</button>
        <div className="header-selectors">
          <select value={currentDate.getMonth()} onChange={handleMonthChange}>
            {months.map((m, i) => <option key={m} value={i}>{m}</option>)}
          </select>
          <select value={currentDate.getFullYear()} onChange={handleYearChange}>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <button onClick={handleNextMonth}>›</button>
      </div>
      <div className="calendar-weekdays">
        <div>S</div><div>M</div><div>T</div><div>W</div><div>Th</div><div>F</div><div>Sat</div>
      </div>
      <div className="calendar-days-grid">
        {days}
      </div>
    </div>
  );
};

const CustomDropdown = ({ options, placeholder, value, onSelect, iconType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div className={`dropdown-select ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span className={!value ? 'placeholder' : ''}>{value || placeholder}</span>
        <div className="dropdown-icons">
          {iconType === 'location' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="dropdown-options">
          {options.map((opt, i) => (
            <div key={i} className="dropdown-option" onClick={() => { onSelect(opt); setIsOpen(false); }}>
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MedicalIcon = ({ type }) => {
  const icons = {
    cardiac: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
    paediatric: <path d="M9 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm10 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-1 2H6a2 2 0 0 1-2-2 9 9 0 0 1 18 0 2 2 0 0 1-2 2Z" />,
    gynaecology: <path d="m14.5 12.5-5 5m0-5 5 5M7 10l5 5 5-5M12 2v20" />,
    liver: <path d="M11 20A7 7 0 0 1 9.05 6.11 3.99 3.99 0 0 1 15 3a3.99 3.99 0 0 1 5.95 3.11 7 7 0 1 1-10 13.89V20Z" />,
    orthopedics: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77Z" />,
    neuroscience: <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Zm5 0A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z" />,
    renal: <path d="M7 16.3c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4Zm10 0c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4ZM12 4v16" />,
    gastro: <path d="M12 21a9 9 0 1 1 0-18c1.47 0 2.87.35 4.1 1l-2.1.3a2 2 0 0 0-2 2v.1c0 1.1.9 2 2 2h5c1.1 0 2-.9 2-2V4.3c0-1.2-1-2.1-2.2-2.1-5.5 0-10 4.5-10 10s4.5 10 10 10c2 0 3.8-.6 5.3-1.6l-1.4-1.4A7 7 0 0 0 12 21Z" />,
    physician: <path d="M4.8 2.3A.3.3 0 1 0 5 2a.3.3 0 0 0-.2.3ZM7 2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm5 15a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4h10v-4Zm10-2h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2Z" />,
    ent: <path d="M16 2a4 4 0 0 1 4 4v1a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h8zM8 12h8a4 4 0 0 1 4 4v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4a4 4 0 0 1 4-4z" />,
    urology: <path d="m7 2 4 4-4 4M17 2l-4 4 4 4M12 6v16" />,
    psychiatry: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v4m0 4h.01" />,
    pulmono: <path d="M12 21a7 7 0 0 0 7-7c0-2-3-6-7-10-4 4-7 8-7 10a7 7 0 0 0 7 7Z" />,
    endocrino: <path d="M10.5 20a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Zm8.5-8.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0ZM5 11.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Zm7.5-6.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z" />,
    nephro: <path d="M12 2v20M5 12h14M8 5l3 3 3-3M8 19l3-3 3 3" />,
    neurosurgeon: <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 14h-2v-2h2v2Zm0-4h-2V7h2v5Z" />,
    rheumato: <path d="m14.5 12.5-5 5m0-5 5 5M7 10l5 5 5-5M12 2v20" />,
    ophthalmo: <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Zm11 5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />,
    surgical: <path d="M10 21v-7a3.3 3.3 0 1 1 6.6 0v7ZM4 7h16M4 11h16M4 15h16" />,
    infectious: <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-18v3m0 10v3m7-7h3M2 12h3m13.2-5.2 2.1-2.1M3.7 18.3l2.1-2.1m12.4 2.1-2.1-2.1M3.7 5.7l2.1 2.1" />,
    laparo: <path d="M21 7L13 15M17 3L3 17a2.12 2.12 0 0 0 3 3L20 6a2.12 2.12 0 0 0-3-3l-4 4" />,
    onco: <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />,
    dentist: <path d="M7 12c.5-2 1.5-4 5-4s4.5 2 5 4c.5 2-1 6-5 6s-5.5-4-5-6Z" />
  };

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'inherit' }}>
      {icons[type] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};

const Consultation1 = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('Home');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [activeCardId, setActiveCardId] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const locations = ["New Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Kolkata"];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const cards = document.querySelectorAll('.speciality-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const specialities = [
    { id: 1, title: 'Cardic Care', subtitle: 'Heart Health care', iconColor: '#ffdede', type: 'cardiac', color: '#ff4d4d' },
    { id: 2, title: 'Paediatric Care', subtitle: 'Child Health Services', iconColor: '#e0f2fe', type: 'paediatric', color: '#3b82f6' },
    { id: 3, title: 'Gynaecology', subtitle: 'Gynaecological Care Solutions', iconColor: '#fce7f3', type: 'gynaecology', color: '#ec4899' },
    { id: 4, title: 'Liver Care', subtitle: 'Liver transplant & Health Care', iconColor: '#fef3c7', type: 'liver', color: '#d97706' },
    { id: 5, title: 'Orthopedics', subtitle: 'Bone & Joint Care', iconColor: '#f3f4f6', type: 'orthopedics', color: '#6b7280' },
    { id: 6, title: 'Neurosaince', subtitle: 'Brain & Nerve Care', iconColor: '#dcfce7', type: 'neuroscience', color: '#10b981' },
    { id: 7, title: 'Renal Care', subtitle: 'Kidney Health Treatment', iconColor: '#e0e7ff', type: 'renal', color: '#6366f1' },
    { id: 8, title: 'Gastroscience', subtitle: 'Digestive Health Care', iconColor: '#ffedd5', type: 'gastro', color: '#f97316' },
    { id: 9, title: 'General Physician', subtitle: 'General Practitioner', iconColor: '#f1f5f9', type: 'physician', color: '#334155' },
    { id: 10, title: 'Otolaryngologist', subtitle: 'ENT', iconColor: '#fdf2f8', type: 'ent', color: '#db2777' },
    { id: 11, title: 'Urologist', subtitle: 'urinary system', iconColor: '#fff7ed', type: 'urology', color: '#ea580c' },
    { id: 12, title: 'Psychiatrist', subtitle: 'Mental issues', iconColor: '#f5f3ff', type: 'psychiatry', color: '#8b5cf6' },
    { id: 13, title: 'Paediatrics', subtitle: 'Child Treatment', iconColor: '#ecfdf5', type: 'paediatric', color: '#059669' },
    { id: 14, title: 'Pulmonologists', subtitle: 'Respiratory system', iconColor: '#eff6ff', type: 'pulmono', color: '#2563eb' },
    { id: 15, title: 'Endocrinologists', subtitle: 'Hormones specialist', iconColor: '#fff1f2', type: 'endocrino', color: '#e11d48' },
    { id: 16, title: 'Nephrologists', subtitle: 'Kidney specialist', iconColor: '#f8fafc', type: 'nephro', color: '#475569' },
    { id: 17, title: 'Neurosurgeons', subtitle: 'brain & spine system', iconColor: '#e0f2fe', type: 'neurosurgeon', color: '#3b82f6' },
    { id: 18, title: 'Rheumatologists', subtitle: 'joint & autoimmune disease', iconColor: '#f0f9ff', type: 'rheumato', color: '#0ea5e9' },
    { id: 19, title: 'Ophthalmologists', subtitle: 'eye specialist', iconColor: '#fffbeb', type: 'ophthalmo', color: '#d97706' },
    { id: 20, title: 'Surgical Gastroenterologists', subtitle: "Ped's Digestive system", iconColor: '#f9fafb', type: 'surgical', color: '#111827' },
    { id: 21, title: 'Infectious Disease', subtitle: 'examine infection', iconColor: '#fef2f2', type: 'infectious', color: '#dc2626' },
    { id: 22, title: 'Laparoscopic Surgeons', subtitle: 'Minimal invasive', iconColor: '#f5f5f4', type: 'laparo', color: '#44403c' },
    { id: 23, title: 'Oncologists', subtitle: 'Cancer diagnose', iconColor: '#faf5ff', type: 'onco', color: '#9333ea' },
    { id: 24, title: 'Dentist', subtitle: 'Treat Teeth', iconColor: '#ecfeff', type: 'dentist', color: '#0891b2' }
  ];

    return (
    <div className="flex h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
         style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>
      
      {/* Sidebar remains accessible */}
      <Sidebar 
        active={active} 
        setActive={setActive} 
        isMobileOpen={isMobileOpen} 
        setIsMobileOpen={setIsMobileOpen} 
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden transition-all duration-300 ${activeModal || isNotificationOpen ? 'blur-[4px] scale-[0.98] pointer-events-none' : ''}`}>
        
        {/* Top Navbar */}
        <header className="h-[76px] flex items-center justify-between px-[24px] md:px-[48px] shrink-0 border-b border-white/5 mb-[8px] z-20">
          
          {/* Hamburger for Mobile */}
          <button 
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden text-white p-2 -ml-2 hover:bg-white/10 rounded-xl transition-colors"
          >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
          </button>
          <div className="flex-1 max-w-[280px]">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-white/10 border border-white/10 rounded-full py-[10px] px-[20px] text-white placeholder-white/40 text-[12px] outline-none focus:ring-2 focus:ring-[#6ED4D4]/50 transition-all font-medium"
              />
              <svg className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-[32px] ml-auto">
            <span className="text-white/80 hover:text-white text-[13px] font-medium hidden md:block select-none cursor-pointer transition-colors">Language</span>
            <div className="flex items-center gap-[20px]">
              <button onClick={() => setIsNotificationOpen(true)} className="text-white hover:text-[#6ED4D4] transition-colors relative">
                <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <div className="absolute top-[2px] right-[2px] w-[6px] h-[6px] bg-[#E85B5A] rounded-full" />
              </button>
              <button onClick={() => navigate('/Setting')} className="text-white hover:text-[#6ED4D4] transition-colors">
                <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <div 
                onClick={() => setActiveModal('profile')} 
                className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform"
              >
                <img src={profilePic} alt="User" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar pb-[64px]">
          {/* Welcome Title */}
          <div className="px-[24px] md:px-[48px] pt-[12px] pb-[20px] shrink-0 w-full max-w-[1440px] mx-auto">
            <h1 className="text-[30px] font-semibold text-white tracking-tight leading-none mb-2">
              Book a Consultation
            </h1>
            <p className="text-white/60 text-[15px] font-medium">Select a speciality to find the right clinician for you.</p>
          </div>

          <div className="px-[24px] md:px-[48px] pb-[60px] w-full max-w-[1440px] mx-auto">
            {/* Specialities Grid */}
            <div className="specialities-grid mb-12">
              {specialities.map((speciality) => (
                <div 
                  key={speciality.id} 
                  className={`speciality-card ${activeCardId === speciality.id ? 'selected' : ''}`}
                  onClick={() => {
                    setActiveCardId(speciality.id);
                    setSelectedSpeciality(speciality.title);
                    navigate('/Consultation_info', { state: { specialityName: speciality.title } });
                  }}
                >
                  <div 
                    className="speciality-icon" 
                    style={{ backgroundColor: speciality.iconColor, color: speciality.color }}
                  >
                    <MedicalIcon type={speciality.type} />
                  </div>
                  <div className="speciality-info">
                    <h3>{speciality.title}</h3>
                    <p>{speciality.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Search Section */}
            <section className="find-doctor-section">
              <h2 className="find-doctor-title">Find Doctor in 3 Steps</h2>
              
              <div className="search-controls">
                <CustomDropdown 
                  options={specialities.map(s => s.title)} 
                  placeholder="Select Speciality" 
                  value={selectedSpeciality} 
                  onSelect={setSelectedSpeciality} 
                />

                <div className="input-group date-picker-group" ref={calendarRef}>
                  <div className="dropdown-select" onClick={() => setShowCalendar(!showCalendar)}>
                    <span className={!selectedDate ? 'placeholder' : ''}>
                      {selectedDate ? selectedDate.toLocaleDateString('en-GB') : 'Select Date'}
                    </span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                  </div>
                  {showCalendar && (
                    <CustomCalendar 
                      initialDate={selectedDate || new Date()} 
                      onSelect={(date) => {
                        setSelectedDate(date);
                        setShowCalendar(false);
                      }} 
                    />
                  )}
                </div>

                <CustomDropdown 
                  options={locations} 
                  placeholder="Select Location" 
                  value={selectedLocation} 
                  onSelect={setSelectedLocation}
                  iconType="location"
                />

                <button className="book-btn">BOOK NOW</button>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Modals */}
      {activeModal === 'profile' && (
          <Profile 
              onClose={() => setActiveModal(null)} 
              onAccountSettings={() => setActiveModal('account')} 
          />
      )}
      {activeModal === 'account' && (
          <Account onClose={() => setActiveModal(null)} />
      )}
      {isNotificationOpen && <Notification onClose={() => setIsNotificationOpen(false)} />}
    </div>
  );
};

export default Consultation1;
