import React, { useState, useEffect } from "react";
import Vertical from "./Vertical";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../baseUrl";
import Profile from '../Admin/Profile';
import DasyWilliam from '../Admin/DasyWilliam';
import Notification from '../Patient/notification';
import { AnimatePresence } from 'framer-motion';
import { useRef } from 'react';

const Form4 = ({ onNext }) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(4);
  const [loading, setLoading] = useState(false);
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
  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [activeRow, setActiveRow] = useState("aadhaar");

  const stepOrder = ["aadhaar", "pan", "license", "degree", "experience", "other"];
  const activeIndex = stepOrder.indexOf(activeRow);

  const handleRowClick = (targetRow) => {
    setActiveRow(targetRow);
  };

  const doctorId = localStorage.getItem("doctor_id");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    aadhaar: null,
    pan: null,
    license: null,
    degree: null,
    experience: null,
    other: null,
  });

  const [initialData, setInitialData] = useState({
    aadhaar: null,
    pan: null,
    license: null,
    degree: null,
    experience: null,
    other: null,
  });

  const documentTypeMap = {
    aadhaar: "aadhaar",
    pan: "pan",
    license: "medical_license",
    degree: "medical_certificate",
    experience: "experience_letter",
    other: "other",
  };

  // ✅ View All Documents
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoadingDocs(true);
    try {
      const doc_id = localStorage.getItem("document_info_id");
      if (!doc_id) {
        setLoadingDocs(false);
        return; // Only call GET if ID exists
      }

      const response = await fetch(
        `${BASE_URL}/api/doctor/${doctorId}/documents/list/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.detail || "Failed to fetch documents");
      }

      setDocuments(data);

      const fetchedData = {
        aadhaar: data.find((d) => d.document_type === "aadhaar") || null,
        pan: data.find((d) => d.document_type === "pan") || null,
        license: data.find((d) => d.document_type === "medical_license") || null,
        degree: data.find((d) => d.document_type === "medical_certificate") || null,
        experience: data.find((d) => d.document_type === "experience_letter") || null,
        other: data.find((d) => d.document_type === "other") || null,
      };

      setInitialData(fetchedData);
      setFormData(fetchedData);

    } catch (error) {
      console.error(error);
    }
    setLoadingDocs(false);
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert("File size exceeds 3MB limit.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [fileType]: file,
    }));
  };

  const handleStepChange = (step) => {
    if (onNext) {
      onNext(step);
      return;
    }
    setActiveStep(step);
    navigate(`/Form${step}`);
  };

  // ✅ Upload Documents & Final Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const id = localStorage.getItem("document_info_id");
      const isChanged = JSON.stringify(initialData) !== JSON.stringify(formData);

      if (!id) {
        // First Time POST
        for (const key of Object.keys(formData)) {
          if (!(formData[key] instanceof File)) continue;

          const formPayload = new FormData();
          formPayload.append("document_type", documentTypeMap[key]);
          formPayload.append("document_file", formData[key]);

          const response = await fetch(
            `${BASE_URL}/api/doctor/${doctorId}/documents/`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formPayload,
            }
          );

          if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data?.detail || "Upload failed");
          }
        }
      } else if (id && isChanged) {
        // PATCH existing records
        for (const key of Object.keys(formData)) {
          if (formData[key] instanceof File) {
            const formPayload = new FormData();
            formPayload.append("document_type", documentTypeMap[key]);
            formPayload.append("document_file", formData[key]);

            const method = initialData?.[key] ? "PATCH" : "POST";
            const url = initialData?.[key]
              ? `${BASE_URL}/api/doctor/${doctorId}/documents/${initialData[key].id}/`
              : `${BASE_URL}/api/doctor/${doctorId}/documents/`;

            const response = await fetch(url, {
              method: method,
              headers: { Authorization: `Bearer ${token}` },
              body: formPayload,
            });

            if (!response.ok) {
              const data = await response.json().catch(() => ({}));
              throw new Error(data?.detail || "Upload failed");
            }
          }
        }
      }

      // ✅ Final Submit Integration (Matches requested POST /api/submit/${doctorId}/)
      const submitResponse = await fetch(`${BASE_URL}/api/submit/${doctorId}/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const submitData = await submitResponse.json();

      if (submitResponse.ok) {
        alert(submitData?.msg || submitData?.message || "Registration Submitted Successfully! ✅");
        localStorage.setItem("document_info_id", "completed");
        setTimeout(() => navigate("/MainPage?auth=login"), 10);
      } else {
        throw new Error(submitData?.msg || submitData?.message || "Final submission failed");
      }

    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong.");
    }

    setLoading(false);
  };

  const hasAtLeastOneFile = Object.values(formData).some(
    (file) => file !== null
  );

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
      <div className="max-w-6xl mx-auto flex flex-col">

        {/* Stepper */}
        <div className="mb-8 w-full">
          <Vertical activeStep={activeStep} setActiveStep={handleStepChange} />
        </div>

        {/* Card Body */}
        <div className="bg-white rounded-[24px] shadow-lg border border-gray-100 p-6 md:p-10 mb-6 relative overflow-hidden min-h-[700px]">

          {/* Vertical Progress Line (Perfect overlap with dots) */}
          <div className="absolute left-[105px] top-[141px] bottom-[111px] w-[6px] bg-[#E2E8F0] z-0 overflow-hidden rounded-full">
            <div
              className="w-full bg-[#0A193B] transition-all duration-700 ease-in-out rounded-full"
              style={{ height: `${(activeIndex / (stepOrder.length - 1)) * 100}%` }}
            ></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-[20px] font-bold text-[#333333] mb-12 ml-4">
              Upload Document
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-0">

              <DocumentUploadRow
                label="Adhaar Card"
                fileType="aadhaar"
                formData={formData}
                handleFileChange={handleFileChange}
                offset="ml-[130px]"
                showDot={true}
                isFilled={!!formData.aadhaar}
                onRowClick={() => handleRowClick("aadhaar")}
              />

              <DocumentUploadRow
                label="PAN Card"
                fileType="pan"
                formData={formData}
                handleFileChange={handleFileChange}
                offset="ml-[130px]"
                showDot={true}
                isFilled={!!formData.pan}
                onRowClick={() => handleRowClick("pan")}
              />

              <DocumentUploadRow
                label="Medical License"
                fileType="license"
                formData={formData}
                handleFileChange={handleFileChange}
                offset="ml-[130px]"
                showDot={true}
                isFilled={!!formData.license}
                onRowClick={() => handleRowClick("license")}
              />

              <DocumentUploadRow
                label="Medical Degree Certificate (MBBS / MD / MS)"
                fileType="degree"
                formData={formData}
                handleFileChange={handleFileChange}
                offset="ml-[130px]"
                showDot={true}
                isFilled={!!formData.degree}
                onRowClick={() => handleRowClick("degree")}
              />

              <DocumentUploadRow
                label="Experience Certificate"
                fileType="experience"
                formData={formData}
                handleFileChange={handleFileChange}
                offset="ml-[130px]"
                showDot={true}
                isFilled={!!formData.experience}
                onRowClick={() => handleRowClick("experience")}
              />

              <DocumentUploadRow
                label="Other"
                fileType="other"
                formData={formData}
                handleFileChange={handleFileChange}
                offset="ml-[130px]"
                showDot={true}
                isFilled={!!formData.other}
                onRowClick={() => handleRowClick("other")}
              />

              <div className="flex justify-end items-end pr-6">
                <button
                  onClick={handleSubmit}
                  disabled={loading || !hasAtLeastOneFile}
                  className="bg-[#19718A] text-white px-10 py-3 rounded-[12px] hover:bg-[#0E4A5C] transition-all duration-300 font-bold text-[18px] shadow-lg active:scale-95 z-40 flex items-center justify-center min-w-[140px]"
                >
                  {loading ? "Submitting..." : "Done"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

const DocumentUploadRow = ({
  label,
  fileType,
  formData,
  handleFileChange,
  offset = "ml-0",
  showDot = false,
  isFilled = false,
  onRowClick = null,
}) => {
  const currentFile = formData[fileType];

  let displayText = "No Choosen File Yet";
  if (currentFile instanceof File) {
    displayText = currentFile.name;
  } else if (currentFile && currentFile.id) {
    displayText = `Uploaded: ${currentFile.document_type || "Document"}`;
  }

  return (
    <div
      className={`flex flex-col mb-4 w-full max-w-[850px] ${offset} transition-all duration-300 relative`}
      onClick={onRowClick}
    >

      <div className="flex items-center gap-3 mb-1 ml-4 h-[30px] relative">
        {showDot && (
          <div className="absolute left-[-90px] top-[4px] z-10 pointer-events-none">
            <div className={`w-[22px] h-[22px] rounded-full shadow-md transition-all duration-500 border-[3px] border-white flex items-center justify-center
              ${isFilled ? "bg-[#0A193B]" : "bg-[#89C8D9]"}`}>
              {isFilled && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
            </div>
          </div>
        )}
        <label className="text-[18px] font-semibold text-[#333333] transition-colors duration-500">
          {label}
        </label>
      </div>

      <div
        className={`flex items-center gap-4 p-2 rounded-[24px] border shadow-sm transition-all duration-500 relative
          ${isFilled ? "bg-[#F0FDFA] border-[#19718A] shadow-md" : "bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#19718A] hover:bg-white"}`}
      >

        {/* Icon */}
        <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center transition-all duration-500
          ${isFilled ? "bg-[#19718A] text-white" : "bg-white border border-slate-200 text-[#19718A]"}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {isFilled ? (
              <polyline points="20 6 9 17 4 12"></polyline>
            ) : (
              <path d="M12 15V3M12 3L8 7M12 3L16 7M2 17L2.621 19.485C2.721 19.884 2.942 20.241 3.247 20.497C3.553 20.753 3.931 20.89 4.319 20.885H19.681C20.069 20.89 20.447 20.753 20.753 20.497C21.058 20.241 21.279 19.884 21.379 19.485L22 17" />
            )}
          </svg>
        </div>

        {/* Custom Input Decorator */}
        <div className="relative flex-1 flex items-center rounded-[12px] border overflow-hidden h-11 bg-white border-slate-200 transition-colors group-hover:border-[#19718A]/50">
          <div className="px-5 h-full flex items-center text-[16px] font-bold text-[#475569] border-r border-slate-100 bg-slate-50 cursor-pointer">
            Browse
          </div>
          <div className="flex-1 px-4 truncate text-[14px] font-medium text-[#0D1C2E] h-full flex items-center italic">
            {displayText}
          </div>
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer w-full"
            onChange={(e) => {
              handleFileChange(e, fileType);
            }}
            accept=".jpg,.jpeg,.png,.pdf"
          />
        </div>
      </div>

      <div className="text-right mt-1.5 pr-8">
        <span className="text-[12px] text-gray-400 font-medium opacity-80">
          Max file size: 3MB
        </span>
      </div>

    </div>
  );
};

export default Form4;
