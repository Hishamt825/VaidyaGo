import React, { useState, useEffect } from "react";
import Vertical from "./Vertical";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../baseUrl";
import Profile from '../Admin/Profile';
import DasyWilliam from '../Admin/DasyWilliam';
import Notification from '../Patient/notification';
import { AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import DoctorBot from "./doctor_bot";
const Form3 = ({ onNext }) => {
  const navigate = useNavigate();

  const doctorId = localStorage.getItem("doctor_id");
  const token = localStorage.getItem("token");

  const [hospitalInfoId, setHospitalInfoId] = useState(
    localStorage.getItem("hospital_info_id")
  );
const [activeStep, setActiveStep] = useState(3);
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
  const [formData, setFormData] = useState({
    joining_date: "",
    employment_type: "",
    consultation_fees: "",
    leave_day: ""
  });

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleStepChange = (step) => {
    if (onNext) {
      onNext(step);
      return;
    }
    setActiveStep(step);

    if (step === 1) navigate("/Form1");
    if (step === 2) navigate("/Form2");
    if (step === 3) navigate("/Form3");
    if (step === 4) navigate("/Form4");
  };

  // ✅ GET (Edit Mode)
  useEffect(() => {
    const fetchHospitalInfo = async () => {
      const doctor_id = localStorage.getItem("doctor_id");
      const hospital_info_id = localStorage.getItem("hospital_info_id");
      const currentToken = localStorage.getItem("token");

      if (!doctor_id || !hospital_info_id || !currentToken) return;

      try {
        const response = await fetch(
          `${BASE_URL}/api/doctor/${doctor_id}/hospital-info/${hospital_info_id}/`,
          {
            headers: {
              Authorization: `Bearer ${currentToken}`
            }
          }
        );

        if (response.status === 404) {
          localStorage.removeItem("hospital_info_id");
          setHospitalInfoId(null);
          return;
        }

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setFormData(data);
        setInitialData(data);
      } catch (error) {
        console.error("GET Error:", error);
      }
    };

    fetchHospitalInfo();
  }, []);

  // ✅ Detect changed fields (for PATCH)
  const getChangedFields = () => {
    const changed = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] != initialData?.[key]) {
        changed[key] = key === "consultation_fees"
          ? parseFloat(formData[key])
          : formData[key];
      }
    });
    return changed;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
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

      const baseUrl = `${BASE_URL}/api/doctor/${doctorId}/hospital-info/`;

      const id = localStorage.getItem("hospital_info_id");
      const isChanged = JSON.stringify(initialData) !== JSON.stringify(formData);

      const performPost = async () => {
        const payload = {
          ...formData,
          consultation_fees: parseFloat(formData.consultation_fees)
        };
        const response = await fetch(baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          let errMsg = "Submission failed";
          if (typeof data === 'object' && data !== null) {
            if (data.detail) errMsg = data.detail;
            else {
               const firstKey = Object.keys(data)[0];
               if (Array.isArray(data[firstKey])) {
                   errMsg = `${firstKey.replace('_', ' ')}: ${data[firstKey][0]}`;
               } else {
                   errMsg = data[firstKey];
               }
            }
          }
          throw new Error(errMsg);
        }

        const newId = data.id || data.data?.id;
        if (newId) {
          localStorage.setItem("hospital_info_id", newId);
          setHospitalInfoId(newId);
        }
        alert("Saved Successfully ✅");
        proceedToNext();
      };

      const proceedToNext = async () => {
        // Always GET latest data
        const stored_hospital_info_id = localStorage.getItem("hospital_info_id");
        if (stored_hospital_info_id) {
          const getRes = await fetch(
            `${BASE_URL}/api/doctor/${doctorId}/hospital-info/${stored_hospital_info_id}/`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (getRes.ok) {
            const getData = await getRes.json();
            setFormData(getData);
            setInitialData(getData);
          }
        }
        if (onNext) {
          onNext(4);
        } else {
          setTimeout(() => navigate("/Form4"), 500);
        }
      };

      if (!id) {
        // ✅ POST
        await performPost();
        return;
      } else if (id && isChanged) {
        // ✅ PATCH
        const payload = getChangedFields();
        if (Object.keys(payload).length > 0) {
          const response = await fetch(`${baseUrl}${id}/`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
          });

          if (response.status === 404) {
            // ID exist in local but not in DB -> Clear and retry as POST
            localStorage.removeItem("hospital_info_id");
            setHospitalInfoId(null);
            setInitialData(null);
            await performPost();
            return;
          }

          const data = await response.json().catch(() => ({}));

          if (!response.ok) {
            let errMsg = "Submission failed";
            if (typeof data === 'object' && data !== null) {
              if (data.detail) errMsg = data.detail;
              else {
                 const firstKey = Object.keys(data)[0];
                 if (Array.isArray(data[firstKey])) {
                     errMsg = `${firstKey.replace('_', ' ')}: ${data[firstKey][0]}`;
                 } else {
                     errMsg = data[firstKey];
                 }
              }
            }
            throw new Error(errMsg);
          }
          alert("Updated Successfully ✏️");
          proceedToNext();
        } else {
          proceedToNext();
        }
      } else {
        // ✅ NO CHANGES
        proceedToNext();
      }
    } catch (error) {
      console.error("Submit Error:", error);
      alert(error.message);
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

                {/* Stepper / Vertical */}
                <div className="mb-8 w-full">
                    <Vertical activeStep={activeStep} setActiveStep={handleStepChange} />
                </div>

                {/* Form Card (Form 3 Hospital Info Layout) */}
                <div className="bg-white rounded-[12px] shadow-sm border border-gray-200 p-8 md:p-12 mb-6 min-h-[500px]">

                    <form className="border border-gray-500 rounded-md p-8 md:p-10 min-h-[400px]" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">

                            {/* Left Column */}
                            <div className="flex flex-col gap-6">
                                <div>
                                    <label className="block text-[14px] font-semibold text-gray-800 mb-1.5">Joining Date</label>
                                    <input
                                        type="date"
                                        name="joining_date"
                                        value={formData.joining_date}

                                        onChange={handleChange}
                                        className="w-full bg-white border border-gray-400 rounded-md px-4 py-2 text-[16px] text-[#0D1C2E] outline-none focus:border-[#19718A]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-[14px] font-semibold text-gray-800 mb-1.5">Consultation Fee</label>
                                    <input
                                        type="text"
                                        name="consultation_fees"
                                        value={formData.consultation_fees}
                                        onChange={handleChange}
                                        className="w-full bg-white border border-gray-400 rounded-md px-4 py-2 text-[16px] text-[#0D1C2E] outline-none focus:border-[#19718A]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-[14px] font-semibold text-gray-800 mb-1.5">Working Days</label>
                                    <input
                                        type="text"
                                        name="leave_day"  // ✅ fixed
                                        value={formData.leave_day}
                                        onChange={handleChange}
                                        className="w-full bg-white border border-gray-400 rounded-md px-4 py-2 text-[16px] text-[#0D1C2E] outline-none focus:border-[#19718A]"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col">
                                <div>
                                    <label className="block text-[14px] font-semibold text-gray-800 mb-1.5">Employment Type</label>
                                    <div className="relative">
                                        <select
                                            name="employment_type"
                                            value={formData.employment_type}
                                            onChange={handleChange}
                                            className="w-full bg-white border border-gray-400 rounded-md px-4 py-2.5 text-[16px] outline-none appearance-none focus:border-[#19718A] cursor-pointer text-[#0D1C2E]"
                                            required
                                        >
                                            <option value="" disabled>Select Type</option>
                                            <option value="full_time">Full Time</option>
                                            <option value="part_time">Part Time</option>
                                            <option value="visiting">Visiting</option>
                                        </select>
                                        {/* Dropdown arrow */}
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </form>

                </div>

                {/* Save & Continue */}
                <div className="flex justify-end mt-4 w-full pr-1 shrink-0">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-[#19718A] text-white px-6 py-2 rounded-md hover:bg-[#0E4A5C] transition font-medium text-[16px] shadow-md"
                    >
                        {loading ? "Saving..." : "Save & Continue"}
                    </button>
                </div>

      </div>
      <DoctorBot />
    </div>
  </div>
);
};

export default Form3;
