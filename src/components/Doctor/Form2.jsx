import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Vertical from "./Vertical"; // your stepper component
import BASE_URL from "../../baseUrl";
import Profile from '../Admin/Profile';
import DasyWilliam from '../Admin/DasyWilliam';
import Notification from '../Patient/notification';
import { AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import DoctorBot from "./doctor_bot";
const Form2 = ({ onNext }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    doctor_employee_id: "",
    department: "",
    specialization: "",
    qualification: "",
    years_of_experience: "",
    medical_license_number: "",
    medical_council: "",
  });

  const [initialData, setInitialData] = useState(null); // for PATCH comparison

  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(2);
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const menuRef = useRef(null);



  useEffect(() => {
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

  const doctorId = localStorage.getItem("doctor_id");
  const [professionalInfoId, setProfessionalInfoId] = useState(
    localStorage.getItem("professional_info_id")
  );

  // ✅ GET existing data (if professionalInfoId exists)
  useEffect(() => {
    const fetchProfessionalInfo = async () => {
      const doctor_id = localStorage.getItem("doctor_id");
      const professional_info_id = localStorage.getItem("professional_info_id");

      if (!doctor_id || !professional_info_id) return;

      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(
          `${BASE_URL}/api/doctor/${doctor_id}/professional-info/${professional_info_id}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.status === 404) {
          // Stale or invalid ID, clear it so we don't try to PATCH later
          localStorage.removeItem("professional_info_id");
          setProfessionalInfoId(null);
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setFormData(data);
        setInitialData(data);
      } catch (err) {
        console.error("GET Error:", err);
      }
    };

    fetchProfessionalInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStepChange = (step) => {
    if (onNext) {
      onNext(step);
      return;
    }
    const dId = localStorage.getItem("doctor_id");
    const pId = localStorage.getItem("professional_info_id");
    const hId = localStorage.getItem("hospital_info_id");

    let maxAllowedStep = 1;
    if (dId) maxAllowedStep = 2;
    if (pId) maxAllowedStep = 3;
    if (hId) maxAllowedStep = 4;

    if (step <= maxAllowedStep) {
      setActiveStep(step);
      navigate("/Form" + step);
    }
  };

  const handleDelete = async () => {
    if (!professionalInfoId || !doctorId) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this professional info?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BASE_URL}/api/doctor/${doctorId}/professional-info/${professionalInfoId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.detail || "Delete Failed");
      }

      localStorage.removeItem("professional_info_id");
      setProfessionalInfoId(null);
      setFormData({
        doctor_employee_id: "",
        department: "",
        specialization: "",
        qualification: "",
        years_of_experience: "",
        medical_license_number: "",
        medical_council: "",
      });
      setInitialData(null);
      alert("Deleted successfully");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first.");
        setLoading(false);
        return;
      }

      if (!doctorId) {
        alert("Complete Form1 first.");
        setLoading(false);
        return;
      }

      const id = localStorage.getItem("professional_info_id");
      const isChanged = JSON.stringify(initialData) !== JSON.stringify(formData);

      const performPost = async () => {
        const response = await fetch(
          `${BASE_URL}/api/doctor/${doctorId}/professional-info/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              ...formData,
              years_of_experience: Number(formData.years_of_experience),
            }),
          }
        );
        const responseData = await response.json();
        if (response.status === 201) {
          const newId = responseData.id || (responseData.data && responseData.data.id);
          localStorage.setItem("professional_info_id", newId);
          setProfessionalInfoId(newId);
          alert("Form Submitted Successfully ✅");
          proceedToNext();
        } else {
          let errMsg = "POST Failed";
          if (typeof responseData === 'object' && responseData !== null) {
            if (responseData.detail) errMsg = responseData.detail;
            else {
               const firstKey = Object.keys(responseData)[0];
               if (Array.isArray(responseData[firstKey])) {
                   errMsg = `${firstKey.replace('_', ' ')}: ${responseData[firstKey][0]}`;
               } else {
                   errMsg = responseData[firstKey];
               }
            }
          }
          throw new Error(errMsg);
        }
      };

      const proceedToNext = async () => {
        // ✅ Always GET latest data
        const stored_professional_info_id = localStorage.getItem("professional_info_id");
        if (stored_professional_info_id) {
            const getRes = await fetch(
                `${BASE_URL}/api/doctor/${doctorId}/professional-info/${stored_professional_info_id}/`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (getRes.ok) {
                const getData = await getRes.json();
                setFormData(getData);
                setInitialData(getData);
            }
        }
        if (onNext) {
          onNext(3);
        } else {
          setActiveStep(3);
          setTimeout(() => navigate("/Form3"), 500);
        }
      };

      if (!id) {
        // ✅ POST new record
        await performPost();
        return;
      } else if (id && isChanged) {
        // ✅ PATCH existing record
        let response = await fetch(
          `${BASE_URL}/api/doctor/${doctorId}/professional-info/${id}/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              ...formData,
              years_of_experience: Number(formData.years_of_experience),
            }),
          }
        );
        
        if (response.status === 404) {
           // ID exist in local but not in DB -> Clear and retry as POST
           localStorage.removeItem("professional_info_id");
           setProfessionalInfoId(null);
           setInitialData(null);
           await performPost();
           return;
        }

        if (response.ok) {
          alert("Form Updated Successfully ");
          proceedToNext();
        } else {
          // ✅ Fallback to PUT if PATCH fails
          response = await fetch(
            `${BASE_URL}/api/doctor/${doctorId}/professional-info/${id}/`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                ...formData,
                years_of_experience: Number(formData.years_of_experience),
              }),
            }
          );
          const responseData = await response.json();
          if (!response.ok) {
            let errMsg = "PUT Fallback Failed";
            if (typeof responseData === 'object' && responseData !== null) {
              if (responseData.detail) errMsg = responseData.detail;
              else {
                 const firstKey = Object.keys(responseData)[0];
                 if (Array.isArray(responseData[firstKey])) {
                     errMsg = `${firstKey.replace('_', ' ')}: ${responseData[firstKey][0]}`;
                 } else {
                     errMsg = responseData[firstKey];
                 }
              }
            }
            throw new Error(errMsg);
          }
          alert("Form Updated Successfully ");
          proceedToNext();
        }
      } else {
        // No change, skip API call
        proceedToNext();
      }

      // ✅ Always GET latest data
      const stored_professional_info_id = localStorage.getItem("professional_info_id");
      const getRes = await fetch(
        `${BASE_URL}/api/doctor/${doctorId}/professional-info/${stored_professional_info_id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!getRes.ok) throw new Error("Failed to fetch latest data");
      const getData = await getRes.json();
      setFormData(getData);
      setInitialData(getData);

      // Navigate to Form 3
      if (onNext) {
        onNext(3);
      } else {
        setActiveStep(3);
        setTimeout(() => navigate("/Form3"), 500);
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isSubForm = !!onNext;

  return (
    <div className={`flex flex-col h-screen w-full bg-[#F8FAFC] font-sans text-sm overflow-hidden text-gray-700 ${isSubForm ? "" : ""}`}>
      
      {!isSubForm && (
        <header className="h-[74px] flex flex-row items-center justify-between px-4 md:px-8 shrink-0 bg-white border-b border-gray-100">
            <div className="flex items-center flex-1 max-w-[700px] gap-[10px] md:gap-[15px]">
                <div className="cursor-pointer" onClick={() => navigate('/Doctor_dashboard')}>
                    <img src="/assets/v.png" alt="Logo" className="h-10" />
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
                    <div 
                        onClick={() => navigate('/Settingpage')}
                        className="w-14 h-12 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 group">
                        <svg className="w-7 h-7 text-gray-700 group-hover:text-[#1b738c] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
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
                    <div
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-4 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-xl px-4 py-1 cursor-pointer hover:bg-gray-50 transition-all"
                    >
                        <span className="text-[18px] font-semibold text-gray-700 hidden lg:inline">Dasy William</span>
                        <img src="/assets/ph.png" className="w-11 h-11 rounded-full border-black/50 rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.12)] object-cover" />
                    </div>
                    <AnimatePresence>
                        {open && !openProfile && (
                            <DasyWilliam setOpenProfile={setOpenProfile} />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
      )}

      <div className={`overflow-auto flex-1 ${isSubForm ? "" : "py-10 px-4 md:px-8"}`}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 w-full">
          <Vertical activeStep={activeStep} setActiveStep={handleStepChange} />
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[12px] shadow-sm border border-gray-200 p-8 md:p-12 mb-6 min-h-[500px]">
          <form
            onSubmit={handleSubmit}
            className="border border-gray-500 rounded-md p-8 md:p-10"
          >
            {/* Grid with 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">

              {/* Doctor Id */}
              <Input
                name="doctor_employee_id"
                label="Doctor Id"
                value={formData.doctor_employee_id}
                onChange={handleChange}
                placeholder=""
              />

              {/* Department */}
              <Select
                name="department"
                label="Department"
                value={formData.department}
                onChange={handleChange}
                options={[
                  { value: "", label: "Select Department", disabled: true },
                  { value: "Cardiology", label: "Cardiology" },
                  { value: "Paediatrics", label: "Paediatrics" },
                  { value: "Gynaecology", label: "Gynaecology" },
                  { value: "Liver Care", label: "Liver Care" },
                  { value: "Orthopedics", label: "Orthopedics" },
                  { value: "Neuroscience", label: "Neuroscience" },
                  { value: "Renal Care", label: "Renal Care" },
                  { value: "Gastroscience", label: "Gastroscience" },
                  { value: "General Physician", label: "General Physician" },
                  { value: "Otolaryngologist", label: "Otolaryngologist (ENT)" },
                  { value: "Urologist", label: "Urologist" },
                  { value: "Psychiatrist", label: "Psychiatrist" },
                  { value: "Pulmonologists", label: "Pulmonologists" },
                  { value: "Endocrinologists", label: "Endocrinologists" },
                  { value: "Nephrologists", label: "Nephrologists" },
                  { value: "Neurosurgeons", label: "Neurosurgeons" },
                  { value: "Rheumatologists", label: "Rheumatologists" },
                  { value: "Ophthalmologists", label: "Ophthalmologists" },
                  { value: "Surgical Gastroenterologists", label: "Surgical Gastroenterologists" },
                  { value: "Infectious Disease", label: "Infectious Disease" },
                  { value: "Laparoscopic Surgeons", label: "Laparoscopic Surgeons" },
                  { value: "Oncologists", label: "Oncologists" },
                  { value: "Dentist", label: "Dentist" },
                ]}
              />

              {/* Specialization */}
              <Select
                name="specialization"
                label="Specialization"
                value={formData.specialization}
                onChange={handleChange}
                options={[
                  { value: "", label: "Choose Specialization", disabled: true },
                  { value: "Heart Health care", label: "Heart Health care (Cardiology)" },
                  { value: "Child Health Services", label: "Child Health Services (Paediatrics)" },
                  { value: "Gynaecological Care Solutions", label: "Gynaecological Care Solutions (Gynaecology)" },
                  { value: "Liver transplant & Health Care", label: "Liver transplant & Health Care (Liver)" },
                  { value: "Bone & Joint Care", label: "Bone & Joint Care (Orthopedics)" },
                  { value: "Brain & Nerve Care", label: "Brain & Nerve Care (Neuroscience)" },
                  { value: "Kidney Health Treatment", label: "Kidney Health Treatment (Renal)" },
                  { value: "Digestive Health Care", label: "Digestive Health Care (Gastroscience)" },
                  { value: "General Practitioner", label: "General Practitioner (General Physician)" },
                  { value: "ENT", label: "ENT (Otolaryngologist)" },
                  { value: "urinary system", label: "Urinary System (Urologist)" },
                  { value: "Mental issues", label: "Mental Issues (Psychiatrist)" },
                  { value: "Respiratory system", label: "Respiratory System (Pulmonologists)" },
                  { value: "Hormones specialist", label: "Hormones Specialist (Endocrinologists)" },
                  { value: "Kidney specialist", label: "Kidney Specialist (Nephrologists)" },
                  { value: "brain & spine system", label: "Brain & Spine System (Neurosurgeons)" },
                  { value: "Joint & autoimmune disease", label: "Joint & Autoimmune Disease (Rheumatologists)" },
                  { value: "eye specialist", label: "Eye Specialist (Ophthalmologists)" },
                  { value: "Ped's Digestive system", label: "Ped's Digestive System (Surgical Gastroenterologists)" },
                  { value: "examine infection", label: "Examine Infection (Infectious Disease)" },
                  { value: "Minimal invasive", label: "Minimal Invasive (Laparoscopic Surgeons)" },
                  { value: "Cancer diagnose", label: "Cancer Diagnose (Oncologists)" },
                  { value: "Treat Teeth", label: "Treat Teeth (Dentist)" },
                ]}
              />

              {/* Qualification */}
              <Input
                name="qualification"
                label="Qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder=""
              />

              {/* Years Of Experience */}
              <Input
                name="years_of_experience"
                label="Year Of Experience"
                value={formData.years_of_experience}
                type="number"
                onChange={handleChange}
                placeholder=""
              />

              {/* Medical License / Registration Number */}
              <Input
                name="medical_license_number"
                label="Medical License / Registration Number"
                value={formData.medical_license_number}
                onChange={handleChange}
                placeholder=""
              />

              {/* Medical Council (State / NMC) - full width */}
              <div className="md:col-span-2">
                <Input
                  name="medical_council"
                  label="Medical Council (State / NMC)"
                  value={formData.medical_council}
                  onChange={handleChange}
                  placeholder=""
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-4 w-full gap-4">
              {professionalInfoId && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition font-medium text-[16px] shadow-md"
                >
                  Delete
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="bg-[#19718A] text-white px-6 py-2 rounded-md hover:bg-[#0E4A5C] transition font-medium text-[16px] shadow-md"
              >
                {loading ? "Saving..." : "Save & Continue"}
              </button>
            </div>
          </form>
        </div>

      </div>
      <DoctorBot />
    </div>
  </div>
);
};

const Input = ({ name, label, onChange, value, type = "text", placeholder }) => (
  <div>
    <label className="block text-[14px] font-semibold text-gray-800 mb-1.5">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-white border border-gray-400 rounded-md px-4 py-2 text-[16px] text-[#0D1C2E] outline-none focus:border-[#19718A] focus:ring-1 focus:ring-[#19718A]/30"
      required
    />
  </div>
);

const Select = ({ name, label, onChange, value, options }) => (
  <div>
    <label className="block text-[14px] font-semibold text-gray-800 mb-1.5">{label}</label>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-white border border-gray-400 rounded-md px-4 py-2 text-[16px] outline-none appearance-none focus:border-[#19718A] focus:ring-1 focus:ring-[#19718A]/30 text-[#0D1C2E] cursor-pointer"
        required
      >
        {options.map(({ value: val, label: lab, disabled }, idx) => (
          <option key={idx} value={val} disabled={disabled} className="text-black">
            {lab}
          </option>
        ))}
      </select>

      {/* Dropdown arrow */}
      <div className="pointer-events-none absolute justify-center top-0 bottom-0 right-0 flex flex-col px-3 text-[#475569] gap-[2px]">
        <svg width="12" height="5" viewBox="0 0 14 6" fill="none">
          <path d="M7 0l6 6H1z" fill="#4B5563" />
        </svg>
        <svg width="12" height="5" viewBox="0 0 14 6" fill="none">
          <path d="M7 6l6-6H1z" fill="#4B5563" />
        </svg>
      </div>
    </div>
  </div>
);

export default Form2;
