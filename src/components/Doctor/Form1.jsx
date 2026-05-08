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

const Form1 = ({ onNext }) => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(1);
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
  const [profileImage, setProfileImage] = useState(null);
  const [initialData, setInitialData] = useState(null); // for PATCH comparison
const [doctorId, setDoctorId] = useState(null);
  // const doctorId = localStorage.getItem("doctor_id");

  // Optional: fetch existing doctor data only if doctorId exists
useEffect(() => {
  const id = localStorage.getItem("doctor_id");
  if (id) setDoctorId(id);
}, []);
  useEffect(() => {
  const fetchDoctorData = async () => {
    if (!doctorId) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(
        `${BASE_URL}/api/doctor-personal-info/${doctorId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 404) {
        console.warn("Doctor ID not found on server, clearing local storage.");
        localStorage.removeItem("doctor_id");
        setDoctorId(null);
        return;
      }

      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();

      setFormData(data);
      setInitialData(data);

      if (data.profile_image) {
        setProfileImage(data.profile_image);
      }

    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

  fetchDoctorData();
}, [doctorId]);


// 🔥 Detect only changed fields
const getChangedFields = () => {
  const changed = {};

  Object.keys(formData).forEach((key) => {
    if (formData[key] !== initialData?.[key]) {
      changed[key] = formData[key];
    }
  });

  return changed;
};


const handleChange = (e) => {
  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};


const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setProfileImage(URL.createObjectURL(file));

  setFormData((prev) => ({
    ...prev,
    profile_image: file,
  }));
};


const handleSubmit = async (e) => {
  if (e) e.preventDefault();
  setLoading(true);
  setErrorMsg("");

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMsg("Please login first");
      setLoading(false);
      return;
    }

    const isChanged = JSON.stringify(initialData) !== JSON.stringify(formData);

    // ================== CREATE (POST) ==================
    if (!doctorId) {
      const postResponse = await fetch(
        `${BASE_URL}/api/doctor-personal-info/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const postData = await postResponse.json();

      if (postResponse.status === 201) {
        const newId = postData.id;

        localStorage.setItem("doctor_id", newId);
        setDoctorId(newId);

        // ✅ Immediately GET after POST
        const getResponse = await fetch(
          `${BASE_URL}/api/doctor-personal-info/${newId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const getData = await getResponse.json();

        if (getResponse.status === 200) {
          setFormData(getData);
          setInitialData(getData);
        }

        alert("Form Submitted Successfully!!");
      } else {
        setErrorMsg(postData?.detail || "POST Failed");
        setLoading(false);
        return;
      }
    }

    // ================== UPDATE (PATCH) ==================
    else if (doctorId && isChanged) {
      const changedFields = getChangedFields();

      const patchResponse = await fetch(
        `${BASE_URL}/api/doctor-personal-info/${doctorId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(changedFields),
        }
      );

      if (patchResponse.status === 404) {
        // ID exist in local but not in DB -> Clear and retry as POST
        localStorage.removeItem("doctor_id");
        setDoctorId(null);
        setInitialData(null);
        setLoading(false);
        // Call handleSubmit again to perform POST
        return handleSubmit();
      }

      const patchData = await patchResponse.json();

      if (!patchResponse.ok) {
        setErrorMsg(patchData?.detail || "PATCH Failed");
        setLoading(false);
        return;
      }

      // ✅ After PATCH, refresh data
      const getResponse = await fetch(
        `${BASE_URL}/api/doctor-personal-info/${doctorId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const getData = await getResponse.json();

      if (getResponse.status === 200) {
        setFormData(getData);
        setInitialData(getData);
      }

      alert("Form Updated Successfully!!");
    }

    // ================== NO CHANGE (Proceed to next step) ==================
    else {
      // Intentionally left blank. Form will automatically proceed to Form2.
    }

    // ✅ Common next step
    if (onNext) {
      onNext(2);
    } else {
      setActiveStep(2);
      setTimeout(() => navigate("/Form2"), 500);
    }

  } catch (error) {
    console.error("Error:", error);
    setErrorMsg("Something went wrong");
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
          <Vertical
            activeStep={activeStep}
            setActiveStep={(step) => {
              if (onNext) {
                onNext(step);
              } else {
                setActiveStep(step);
                if (step === 1) navigate("/Form1");
                if (step === 2) navigate("/Form2");
                if (step === 3) navigate("/Form3");
                if (step === 4) navigate("/Form4");
              }
            }}
          />
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="relative bg-white rounded-[20px] shadow-[0_4px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-0 overflow-hidden min-h-[640px]">

          {/* Form Content */}
          <div className="relative z-10 p-8 md:p-12 w-full">
            <div className="border-b border-gray-400 pb-3 mb-8 w-full">
              <h2 className="text-[20px] font-bold text-gray-900">
                Personal Info
              </h2>
            </div>

            <div className="flex flex-col-reverse md:grid md:grid-cols-3 gap-12">
              {/* Left Column */}
              <div className="md:col-span-2 space-y-6">
                <Input name="first_name" label="First Name" value={formData.first_name} onChange={handleChange} />
                <Input name="last_name" label="Last Name" value={formData.last_name} onChange={handleChange} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input name="date_of_birth" label="Date of Birth" type="date" value={formData.date_of_birth} onChange={handleChange} />
                  <Select name="gender" label="Gender" value={formData.gender} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input name="mobile_number" label="Mobile number" value={formData.mobile_number} onChange={handleChange} />
                  <Input name="alternate_number" label="Alternate number" value={formData.alternate_number} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input name="email" label="Email ID" type="email" value={formData.email} onChange={handleChange} />
                  <Select name="country" label="Country" value={formData.country} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Select name="city" label="City" value={formData.city} onChange={handleChange} />
                  <Input name="pincode" label="Pincode" value={formData.pincode} onChange={handleChange} />
                </div>

                <div className="pt-2">
                  <label className="block text-[14px] font-semibold text-gray-800 mb-1.5">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-[16px] text-[#0D1C2E] outline-none focus:border-[#19718A]"
                  />
                </div>

                {/* Error Message */}
                {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}

              </div>

              {/* Right Column - Photo Upload */}
              <div className="flex flex-col items-center gap-3">

                {/* Add Photo Label */}
                <span className="text-[14px] font-semibold text-gray-700">Add Photo</span>

                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  id="photoUpload"
                  className="hidden"
                  onChange={handleImageChange}
                />

                {/* Circle Avatar */}
                <label
                  htmlFor="photoUpload"
                  className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition border border-gray-300 overflow-hidden"
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                        <line x1="12" y1="5" x2="12" y2="1"/>
                        <line x1="10" y1="3" x2="14" y2="3"/>
                      </svg>
                    </div>
                  )}
                </label>

                {/* Edit & Delete Icons — directly below circle */}
                <div className="flex gap-3 mt-1">
                  {/* Edit Icon — triggers file picker */}
                  <label
                    htmlFor="photoUpload"
                    className="w-9 h-9 rounded-md border border-[#19718A]/40 bg-white flex items-center justify-center cursor-pointer hover:bg-[#E6F3F7] transition"
                    title="Edit Photo"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#19718A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </label>

                  {/* Delete Icon — clears the photo */}
                  <button
                    type="button"
                    onClick={() => {
                      setProfileImage(null);
                      setFormData(prev => ({ ...prev, profile_image: null }));
                    }}
                    className="w-9 h-9 rounded-md border border-red-300 bg-white flex items-center justify-center cursor-pointer hover:bg-red-50 transition"
                    title="Remove Photo"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                      <path d="M10 11v6"/>
                      <path d="M14 11v6"/>
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                  </button>
                </div>

              </div>

            </div>
          </div>

        </form>

        {/* Save & Continue — OUTSIDE the card */}
        <div className="flex justify-end mt-6 w-full pr-1">
          <button
            type="button"
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

const Input = ({ name, label, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-[14px] font-semibold text-gray-800 mb-1.5">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={`Enter your ${label.toLowerCase()}`}
      className="w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-[16px] text-[#0D1C2E] outline-none focus:border-[#19718A] focus:ring-1 focus:ring-[#19718A]/30 placeholder:text-gray-500"
      required
    />
  </div>
);

const Select = ({ name, label, value, onChange }) => (
  <div>
    <label className="block text-[14px] font-semibold text-gray-800 mb-1.5">{label}</label>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-[16px] outline-none appearance-none focus:border-[#19718A] focus:ring-1 focus:ring-[#19718A]/30 text-[#0D1C2E] cursor-pointer"
        required
      >
        <option value="" disabled>Select {label}</option>
        {label === "Gender" && (
          <>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </>
        )}
        {label === "Country" && (
          <>
            <option value="US">United States</option>
            <option value="IN">India</option>
          </>
        )}
        {label === "City" && (
          <>
            <option value="NY">New York</option>
            <option value="MUM">Mumbai</option>
          </>
        )}
      </select>
    </div>
  </div>
);

export default Form1;
