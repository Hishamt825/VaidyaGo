import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import assets
import logoUrl from '../../../assets/logo_1.svg';
import doctorImg from '../../../assets/image_76.svg';
import appointmentIcon from '../../../assets/appointment.svg';
import consultationsIcon from '../../../assets/consultations.svg';
import totalPatientsIcon from '../../../assets/total_patients.svg';
import incomeIcon from '../../../assets/income.svg';
import emergencyIcon from '../../../assets/emergency.svg';

const Service = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md z-50 flex items-center justify-between px-12 shadow-sm">
        <div className="flex items-center">
          <img src={logoUrl} alt="VadyGo Logo" className="h-12 w-auto" />
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['Home', 'About', 'Our Service', 'Doctor', 'FAQ'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className={`text-[15px] font-semibold transition-colors ${item === 'Our Service' ? 'text-[#1a738c]' : 'text-gray-600 hover:text-[#1a738c]'}`}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="bg-[#1a738c] text-white px-6 py-2 rounded-full font-bold text-[14px] hover:bg-[#155b70] transition-all shadow-md">
            Contact Us
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-12 overflow-hidden bg-gradient-to-br from-white via-[#f0f9fb] to-[#e6f4f7]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 z-10 text-center md:text-left">
            <h1 className="text-[56px] leading-[1.1] font-black text-[#061953] mb-6">
              What Makes Us Better,<br />Makes You Better.
            </h1>
            <p className="text-[14px] text-gray-600 max-w-[500px] mb-10 leading-relaxed font-semibold">
              A healthcare medical summary website for an Advanced Cardiac Life Support (ACLS) or Cardiac Care specialist clinic transports patients with serious heart conditions not achievable for a specialized cardiology center but the hospital has medical services required for common clinical needs.
            </p>
            
            {/* Info Badges */}
            <div className="flex flex-wrap gap-8 justify-center md:justify-start">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center p-2 border border-[#bce0e9]">
                    <img src={emergencyIcon} alt="24/7" className="w-8 h-8 rounded" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a738c] text-[13px] leading-none mb-1">24/7 Advanced Care</h4>
                    <p className="text-[10px] text-gray-500 font-bold">Available Anytime Everywhere</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center p-2 border border-[#bce0e9]">
                    <img src={incomeIcon} alt="Results" className="w-8 h-8 rounded" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a738c] text-[13px] leading-none mb-1">Get Result Online</h4>
                    <p className="text-[10px] text-gray-500 font-bold">Check Results Online</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center p-2 border border-[#bce0e9]">
                    <img src={consultationsIcon} alt="Specialized" className="w-8 h-8 rounded" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a738c] text-[13px] leading-none mb-1">Specialised Services</h4>
                    <p className="text-[10px] text-gray-500 font-bold">Expert Care Services</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="md:w-1/2 relative mt-12 md:mt-0 flex justify-center">
            {/* Floating Tags */}
            <div className="absolute top-[20%] left-[10%] bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-md text-[10px] font-bold text-[#175b61] animate-bounce duration-[2000ms] border border-[#a5d8e1]">Renal Care 🩺</div>
            <div className="absolute top-[10%] right-[10%] bg-white/90 backdrop-blur px-4 py-1.5 rounded-full shadow-lg text-[11px] font-extrabold text-[#1a738c] border border-[#a5d8e1]">Cardiac Care ❤️</div>
            <div className="absolute bottom-[40%] left-[5%] bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-md text-[10px] font-bold text-[#061953] border border-[#a5d8e1]">Neuroscience 🧠</div>
            <div className="absolute bottom-[30%] right-[5%] bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg text-[11px] font-black text-[#175b61] border border-[#a5d8e1]">Pediatrics 🧒 / Dentistry 🦷</div>

            <div className="relative w-[450px] h-[450px] bg-gradient-to-t from-[#94b8c0]/40 to-transparent rounded-full flex items-end justify-center overflow-visible">
               <img src={doctorImg} alt="Doctor" className="h-[520px] w-auto relative -bottom-4 z-10 drop-shadow-xl" />
            </div>
            
            {/* Abstract Background Shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#398499]/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 px-12 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-[34px] font-black text-[#061953] mb-2 uppercase tracking-tight">Our Services</h2>
          <div className="h-1.5 w-24 bg-[#1a738c] mx-auto rounded-full mb-4"></div>
          <p className="text-gray-500 font-bold text-[16px]">we offer complete healthcare to individual with various health concern</p>
        </div>

        <div className="max-w-7xl mx-auto relative flex items-center">
          <button className="absolute -left-6 z-10 w-12 h-12 bg-white border border-gray-100 shadow-lg rounded-full flex items-center justify-center text-gray-400 hover:text-[#1a738c] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
            {/* Appointment Card */}
            <div className="bg-white border-[1.5px] border-[#eff6f8] rounded-[24px] p-8 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden flex flex-col items-center">
               <div className="w-16 h-16 bg-[#f0f9fb] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="w-10 h-10 bg-[#398499] rounded-lg rotate-12 flex items-center justify-center p-2 shadow-inner">
                    <img src={appointmentIcon} alt="Appt" />
                  </div>
               </div>
               <h3 className="text-[18px] font-black text-[#061953] mb-4">Appointment</h3>
               <p className="text-[12px] text-gray-500 font-bold text-center leading-relaxed mb-8">An appointment is a phone number or an online service to schedule a visit for a treating or appointment.</p>
               <button className="mt-auto bg-[#1a738c] text-white px-8 py-2 rounded-full font-black text-[12px] uppercase tracking-wider hover:bg-[#155b70] transition-colors shadow-md">Book Now</button>
            </div>

            {/* AI Checker Card */}
            <div className="bg-[#94b8c0] border-[1.5px] border-[#a5d8e1] rounded-[24px] p-8 shadow-xl relative overflow-hidden flex flex-col items-center text-white scale-105 z-10 backdrop-blur-sm">
               <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-3-3v6m-9 1h18a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
               </div>
               <h3 className="text-[20px] font-black mb-4 text-center">AI symptom Checker</h3>
               <p className="text-[12px] font-bold text-center text-white/90 leading-relaxed mb-8">Type symptoms and check what's the problem is.</p>
               <button className="mt-auto bg-[#1a738c] text-white px-8 py-2 rounded-full font-black text-[12px] uppercase tracking-wider hover:bg-[#155b70]/80 transition-colors shadow-lg border border-white/30">Find Diseases</button>
            </div>

            {/* Prescription Card */}
            <div className="bg-white border-[1.5px] border-[#eff6f8] rounded-[24px] p-8 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden flex flex-col items-center">
               <div className="w-16 h-16 bg-[#f0f9fb] rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-[#398499]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
               </div>
               <h3 className="text-[18px] font-black text-[#061953] mb-4">Prescription</h3>
               <p className="text-[12px] text-gray-500 font-bold text-center leading-relaxed mb-8">Upload your prescription and check and know what's the problem is?</p>
               <button className="mt-auto bg-[#1a738c] text-white px-8 py-2 rounded-full font-black text-[12px] uppercase tracking-wider hover:bg-[#155b70] transition-colors shadow-md">Upload</button>
            </div>

            {/* Find Locations Card */}
            <div className="bg-white border-[1.5px] border-[#eff6f8] rounded-[24px] p-8 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden flex flex-col items-center">
               <div className="w-16 h-16 bg-[#f0f9fb] rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-[#398499]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
               </div>
               <h3 className="text-[18px] font-black text-[#061953] mb-4 text-center">Find Locations</h3>
               <p className="text-[12px] text-gray-500 font-bold text-center leading-relaxed mb-8">Location can refer to several things. pinpoint maps for tracks of a map pin and find, a tool that lets for a single location for a single line of text for a description.</p>
               <button className="mt-auto bg-[#1a738c] text-white px-8 py-2 rounded-full font-black text-[12px] uppercase tracking-wider hover:bg-[#155b70] transition-colors shadow-md">Location</button>
            </div>
          </div>

          <button className="absolute -right-6 z-10 w-12 h-12 bg-white border border-gray-100 shadow-lg rounded-full flex items-center justify-center text-gray-400 hover:text-[#1a738c] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </section>

      {/* Area of Facilities Section */}
      <section className="py-20 px-12 bg-[#F8FDFF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="md:w-1/2 bg-white rounded-[32px] p-10 shadow-xl border border-[#bce0e9]/30 relative">
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#1a738c]/10 rounded-full blur-2xl"></div>
             <h2 className="text-[24px] font-black text-[#061953] mb-8 relative flex items-center gap-3">
               <span className="w-2 h-8 bg-[#1a738c] rounded-full"></span>
               Our Area of Facilities
             </h2>
             
             <ul className="space-y-5">
               {[
                 { label: 'Doctor', icon: '🩺' },
                 { label: 'Upload prescription', icon: '📝' },
                 { label: 'Medicines Suggestion from AI', icon: '🤖' },
                 { label: 'Camera for OCR', icon: '📷' },
                 { label: 'Video Call Consultation', icon: '📽️' },
                 { label: 'Book Appointment', icon: '📅' },
                 { label: 'AI Symptom Checker', icon: '⚡' }
               ].map((item, idx) => (
                 <li key={idx} className="flex items-center gap-4 group cursor-pointer text-[#061953]/80 hover:text-[#1a738c] transition-colors p-2 rounded-xl hover:bg-[#f0fbff]">
                    <div className="w-10 h-10 rounded-lg bg-[#f0f9fb] flex items-center justify-center text-[18px] shadow-sm transform group-hover:rotate-12 transition-transform">{item.icon}</div>
                    <span className="text-[15px] font-bold">{item.label}</span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                    </div>
                 </li>
               ))}
             </ul>
          </div>

          <div className="md:w-1/2 flex flex-col gap-10">
             <div className="flex flex-col gap-2">
                <h3 className="text-[52px] font-black text-[#1a738c] leading-none mb-2">100K+</h3>
                <p className="text-[15px] text-gray-600 font-bold leading-relaxed">Total number of Happy Client, They get best experience</p>
                <div className="w-32 h-1 bg-[#1a738c]/20 rounded-full mt-2"></div>
             </div>
             <div className="flex flex-col gap-2">
                <h3 className="text-[52px] font-black text-[#398499] leading-none mb-2">20K+</h3>
                <p className="text-[15px] text-gray-600 font-bold leading-relaxed">REVIEWS of clients who were happy by using this.</p>
                <div className="w-32 h-1 bg-[#1a738c]/20 rounded-full mt-2"></div>
             </div>
          </div>
        </div>
        
        {/* Decorative Background Icon */}
        <div className="absolute top-1/2 left-20 -translate-y-1/2 opacity-10 -z-0">
          <svg className="w-64 h-64" viewBox="0 0 24 24" fill="currentColor text-[#1a738c]"><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"/></svg>
        </div>
      </section>

      {/* Reasons to Choose Us Section */}
      <section className="py-24 px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/3">
             <h2 className="text-[56px] leading-[1] font-black text-[#061953] mb-4">3 Reasons To Choose Us</h2>
             <div className="w-20 h-2 bg-[#1a738c] rounded-full"></div>
          </div>

          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            {/* Reason 1 */}
            <div className="relative pt-24 pb-8 px-6 bg-[#94b8c0] rounded-[32px] shadow-2xl flex flex-col items-center group">
               <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-white/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-1000"></div>
               <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40">
                  <div className="relative w-full h-full">
                    <img src={doctorImg} alt="Drs" className="w-full h-full object-contain filter drop-shadow-lg" />
                  </div>
               </div>
               <h4 className="text-[20px] font-black text-white text-center leading-tight">Professional Doctors</h4>
            </div>

            {/* Reason 2 */}
            <div className="relative pt-20 pb-10 px-8 bg-white border border-[#bce0e9] rounded-[32px] shadow-xl flex flex-col items-center group hover:-translate-y-4 transition-transform duration-500">
               <div className="w-32 h-32 mb-6">
                  <img src={totalPatientsIcon} alt="Patient Support" className="w-full h-full object-contain" />
               </div>
               <h4 className="text-[20px] font-black text-[#061953] text-center leading-tight">24/7 patient support</h4>
            </div>

            {/* Reason 3 */}
            <div className="relative pt-16 pb-12 px-6 bg-white border border-[#bce0e9] rounded-[32px] shadow-xl flex flex-col items-center group hover:-translate-y-4 transition-transform duration-500">
               <div className="w-32 h-32 mb-6">
                  <img src={consultationsIcon} alt="Services" className="w-full h-full object-contain" />
               </div>
               <h4 className="text-[20px] font-black text-[#061953] text-center leading-tight">Specialised Services</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-white pt-20 pb-8 px-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <img src={logoUrl} alt="Logo" className="h-10 mb-8" />
              <p className="text-[13px] text-gray-500 font-bold leading-relaxed mb-4">
                Committed to compassionate care, advanced technology, and healthier lives serving Eastern U.P. with trust, excellence, and integrity since 1989.
              </p>
            </div>

            <div>
              <h5 className="text-[18px] font-black text-[#061953] mb-8">Quick Links</h5>
              <ul className="space-y-4">
                {['Home', 'About Us', 'Services', 'Gallery'].map(link => (
                  <li key={link} className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-[#1a738c] group-hover:scale-150 transition-transform"></div>
                    <span className="text-[14px] text-gray-600 font-bold hover:text-[#1a738c] transition-colors">{link}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-[18px] font-black text-[#061953] mb-8">Our Services</h5>
              <ul className="space-y-4">
                {['Cardiac Care', 'Neurology', 'Pediatrics', 'Dentistry'].map(link => (
                  <li key={link} className="flex items-center gap-2 group cursor-pointer text-gray-600">
                    <span className="text-[14px] font-bold hover:text-[#1a738c] transition-colors">{link}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-[18px] font-black text-[#061953] mb-8">Contact Us</h5>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-[#1a738c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  <span className="text-[14px] font-bold">+91 XXXXX XXXXX</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-[#1a738c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  <span className="text-[14px] font-bold">vaidyago24@gmail.com</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-[#1a738c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <span className="text-[14px] font-bold">xyz, xyz, Gorakhpur, Uttar Pradesh, 273010</span>
                </li>
              </ul>
              <div className="flex gap-4 mt-8">
                <div className="w-9 h-9 bg-[#061953] flex items-center justify-center rounded-xl text-white hover:bg-[#1a738c] transition-colors cursor-pointer shadow-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </div>
                <div className="w-9 h-9 bg-[#061953] flex items-center justify-center rounded-xl text-white hover:bg-[#1a738c] transition-colors cursor-pointer shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37a4 4 0 1 1-7.63-1.63 4 4 0 0 1 7.63 1.63z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </div>
                <div className="w-9 h-9 bg-[#061953] flex items-center justify-center rounded-xl text-white hover:bg-[#1a738c] transition-colors cursor-pointer shadow-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-gray-100">
            <p className="text-[12px] text-gray-400 font-bold">© 2026 VADYAGO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Service;
