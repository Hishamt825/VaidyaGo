import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, Activity, Heart, Droplets, Wind, Brain, ShieldCheck, ChevronRight, Search, Bell } from 'lucide-react';
import HospitalNavbar from './HospitalNavbar';

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

const Hos_consultation = () => {
  const navigate = useNavigate();
  const [selectedSpeciality, setSelectedSpeciality] = useState("");

  const specialities = [
    { id: 1, title: 'Cardic Care', subtitle: 'Heart Health care', iconColor: '#ffdede', type: 'cardiac', color: '#ff4d4d' },
    { id: 2, title: 'Paediatric Care', subtitle: 'Child Health Services', iconColor: '#e0f2fe', type: 'paediatric', color: '#3b82f6' },
    { id: 3, title: 'Gynaecology', subtitle: 'Gynaecological Care Solutions', iconColor: '#fce7f3', type: 'gynaecology', color: '#ec4899' },
    { id: 4, title: 'Liver Care', subtitle: 'Liver transplant & Health Care', iconColor: '#fef3c7', type: 'liver', color: '#d97706' },
    { id: 5, title: 'Orthopedics', subtitle: 'Bone & Joint Care', iconColor: '#f3f4f6', type: 'orthopedics', color: '#6b7280' },
    { id: 6, title: 'Neuroscience', subtitle: 'Brain & Nerve Care', iconColor: '#dcfce7', type: 'neuroscience', color: '#10b981' },
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
    <div className="w-full bg-white font-sans">
      <HospitalNavbar />
      
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-[40px] font-bold text-[#0E4056] font-serif mb-2 tracking-tight">
            Our Medical Specialities
          </h1>
          <p className="text-gray-500 text-[18px] max-w-2xl leading-relaxed">
            Comprehensive healthcare services with expert clinicians across all major medical departments.
          </p>
        </div>

        {/* Specialities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {specialities.map((speciality) => (
            <div 
              key={speciality.id} 
              className="bg-white p-6 rounded-[28px] border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(25,113,138,0.12)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group flex items-center gap-5"
              onClick={() => {
                setSelectedSpeciality(speciality.title);
                navigate('/Hos2_consultation', { state: { specialityName: speciality.title } });
                window.scrollTo(0, 0);
              }}
            >
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110" 
                style={{ backgroundColor: speciality.iconColor, color: speciality.color }}
              >
                <MedicalIcon type={speciality.type} />
              </div>
              <div className="flex-1">
                <h3 className="text-[17px] font-bold text-[#0E4056] mb-0.5 group-hover:text-[#19718A] transition-colors">{speciality.title}</h3>
                <p className="text-[12px] text-gray-500 font-medium leading-snug">{speciality.subtitle}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-[#19718A] group-hover:text-white transition-all">
                <ChevronRight size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="bg-[#19718A] rounded-[40px] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
           {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-2/3">
              <h2 className="text-[32px] md:text-[42px] font-bold mb-4 font-serif leading-tight">
                Ready to consult with our experts?
              </h2>
              <p className="text-white/80 text-[18px] max-w-xl leading-relaxed">
                Book an appointment today and experience healthcare excellence with our dedicated team of medical professionals.
              </p>
            </div>
            <button 
              onClick={() => navigate('/Makeapp')}
              className="bg-white text-[#19718A] px-10 py-4 rounded-full font-bold text-[16px] shadow-xl hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
            >
              Book Appointment Now
            </button>
          </div>
        </div>
      </main>

      {/* Footer copied from About.jsx for consistency */}
      <footer className="bg-[#19718A] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="flex flex-col items-start -mt-6">
            <img src="/assets/logo.png" alt="VaidyaGo Logo" className="w-56 mb-4 -ml-5" />
            <p className="text-[14px] leading-relaxed max-w-xs font-serif">
              Committed to compassionate care, advanced technology, and healthier lives serving Eastern U.P. with trust, excellence, and integrity since 1989.
            </p>
          </div>
          <div>
            <h4 className="text-[18px] font-semibold mb-4 font-serif">Quick Links</h4>
            <ul className="space-y-2 text-[16px] font-[400] font-serif">
              <li className="flex items-center gap-2 mb-4">
                <span className="text-white text-sm">▶</span>
                <button onClick={() => { navigate("/MainPage"); window.scrollTo(0, 0); }} className="hover:text-[#AEE8F5] transition-colors">Home</button>
              </li>
              <li className="flex items-center gap-2 font-serif mb-4">
                <span className="text-white text-sm">▶</span>
                <button onClick={() => { navigate("/About"); window.scrollTo(0, 0); }} className="hover:text-[#AEE8F5] transition-colors">About Us</button>
              </li>
              <li className="flex items-center gap-2 font-serif mb-4">
                <span className="text-white text-sm">▶</span>
                <button onClick={() => { navigate("/Service"); window.scrollTo(0, 0); }} className="hover:text-[#AEE8F5] transition-colors">Services</button>
              </li>
              <li className="flex items-center gap-2 font-serif mb-4">
                <span className="text-white text-sm">▶</span>
                <button onClick={() => { navigate("/FAQ"); window.scrollTo(0, 0); }} className="hover:text-[#AEE8F5] transition-colors">FAQ</button>
              </li>
              <li className="flex items-center gap-2 font-serif">
                <span className="text-white text-sm">▶</span>
                <button onClick={() => { navigate("/ContactUs"); window.scrollTo(0, 0); }} className="hover:text-[#AEE8F5] transition-colors">Contact Us</button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[18px] font-semibold mb-4 font-serif">Our Services</h4>
            <ul className="space-y-2 text-[16px] font-[400] font-serif mb-4">
              <li>Ayurvedic Treatment</li>
              <li>Herbal Consultation</li>
              <li>Health Care Programs</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[18px] font-semibold mb-4 font-serif">Contact Us</h4>
            <ul className="space-y-3 text-[16px] font-[400]">
              <li className="flex items-center gap-2 font-serif mb-4">
                <img src="/assets/cl.png" alt="icon" className="w-4 h-4" />
                <span>+91 9879877801</span>
              </li>
              <li className="flex items-center gap-2 font-serif mb-4">
                <img src="/assets/pack.png" alt="icon" className="w-4 h-4" />
                <span>vaidyaGo24@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 pt-2">
                <img src="/assets/you.png" className="w-5 cursor-pointer" />
                <img src="/assets/insta.png" className="w-5 cursor-pointer" />
                <img src="/assets/map1.png" className="w-5 cursor-pointer" />
                <img src="/assets/what.png" className="w-5 cursor-pointer" />
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hos_consultation;
