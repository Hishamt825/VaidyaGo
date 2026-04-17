import React, { useState, useEffect } from "react";
import Vertical from "./Vertical";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../baseUrl";

const Form1 = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(1);
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
  e.preventDefault();
  setLoading(true);
  setErrorMsg("");

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMsg("Please login first");
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

      const patchData = await patchResponse.json();

      if (!patchResponse.ok) {
        setErrorMsg(patchData?.detail || "PATCH Failed");
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
    setActiveStep(2);
    setTimeout(() => navigate("/Form2"), 500);

  } catch (error) {
    console.error("Error:", error);
    setErrorMsg("Something went wrong");
  } finally {
    setLoading(false);
  }
};
return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Stepper / Vertical */}
        <div className="mb-8 w-full">
          <Vertical
            activeStep={activeStep}
            setActiveStep={(step) => {
              setActiveStep(step);
              if (step === 1) navigate("/Form1");
              if (step === 2) navigate("/Form2");
              if (step === 3) navigate("/Form3");
              if (step === 4) navigate("/Form4");
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
                    className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-[16px] outline-none focus:border-[#19718A]"
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
      className="w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-[16px] outline-none focus:border-[#19718A] focus:ring-1 focus:ring-[#19718A]/30 placeholder:text-gray-500"
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
        className="w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-[16px] outline-none appearance-none focus:border-[#19718A] focus:ring-1 focus:ring-[#19718A]/30 text-gray-500 cursor-pointer"
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