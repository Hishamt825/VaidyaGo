import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Vertical from "./Vertical"; // your stepper component
import BASE_URL from "../../baseUrl";
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

      let response;
      let responseData;

      if (!id) {
        // ✅ POST new record
        response = await fetch(
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
        responseData = await response.json();
        if (response.status === 201) {
          const newId = responseData.id || (responseData.data && responseData.data.id);
          localStorage.setItem("professional_info_id", newId);
          setProfessionalInfoId(newId);
          alert("Form Submitted Successfully ✅");
        } else {
          throw new Error(responseData?.detail || "POST Failed");
        }
      } else if (id && isChanged) {
        // ✅ PATCH existing record
        response = await fetch(
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
        
        if (response.ok) {
          responseData = await response.json();
          alert("Form Updated Successfully ");
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
          responseData = await response.json();
          if (!response.ok) {
            throw new Error(responseData?.detail || "PUT Fallback Failed");
          }
          alert("Form Updated Successfully ");
        }
      } else {
        // No change, skip API call
        if (onNext) {
          onNext(3);
        } else {
          setActiveStep(3);
          setTimeout(() => navigate("/Form3"), 500);
        }
        setLoading(false);
        return;
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


  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 md:px-8">
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
                  { value: "dept1", label: "Department 1" },
                  { value: "dept2", label: "Department 2" },
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
                  { value: "spec1", label: "Specialization 1" },
                  { value: "spec2", label: "Specialization 2" },
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
      className="w-full bg-white border border-gray-400 rounded-md px-4 py-2 text-[16px] outline-none focus:border-[#19718A] focus:ring-1 focus:ring-[#19718A]/30"
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
        className="w-full bg-white border border-gray-400 rounded-md px-4 py-2 text-[16px] outline-none appearance-none focus:border-[#19718A] focus:ring-1 focus:ring-[#19718A]/30 text-gray-600 cursor-pointer"
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