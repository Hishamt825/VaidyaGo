import React, { useState, useEffect } from "react";
import Vertical from "./Vertical";
import { useNavigate } from "react-router-dom";
const Form3 = () => {
  const navigate = useNavigate();

  const doctorId = localStorage.getItem("doctor_id");
  const token = localStorage.getItem("token");

  const [hospitalInfoId, setHospitalInfoId] = useState(
    localStorage.getItem("hospital_info_id")
  );
const [activeStep, setActiveStep] = useState(3);
  const [formData, setFormData] = useState({
    joining_date: "",
    employment_type: "",
    consultation_fees: "",
    leave_day: ""
  });

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleStepChange = (step) => {
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
          `https://tubajavedd.pythonanywhere.com/api/doctor/${doctor_id}/hospital-info/${hospital_info_id}/`,
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
        return;
      }

      if (!doctorId) {
        alert("Complete Form1 first.");
        return;
      }

      const baseUrl = `https://tubajavedd.pythonanywhere.com/api/doctor/${doctorId}/hospital-info/`;

      const id = localStorage.getItem("hospital_info_id");
      const isChanged = JSON.stringify(initialData) !== JSON.stringify(formData);

      if (!id) {
        // ✅ POST
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
          throw new Error(data?.detail || "Submission failed");
        }

        const newId = data.id || data.data?.id;
        if (newId) {
          localStorage.setItem("hospital_info_id", newId);
          setHospitalInfoId(newId);
        }
        alert("Saved Successfully ✅");
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

          const data = await response.json().catch(() => ({}));

          if (!response.ok) {
            throw new Error(data?.detail || "Submission failed");
          }
          alert("Updated Successfully ✏️");
        }
      } else {
        // ✅ NO CHANGES
        setTimeout(() => navigate("/Form4"), 500);
        setLoading(false);
        return;
      }

      // Always GET latest data
      const stored_hospital_info_id = localStorage.getItem("hospital_info_id");
      const getRes = await fetch(
        `https://tubajavedd.pythonanywhere.com/api/doctor/${doctorId}/hospital-info/${stored_hospital_info_id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (getRes.ok) {
        const getData = await getRes.json();
        setFormData(getData);
        setInitialData(getData);
      }
      
      setTimeout(() => navigate("/Form4"), 500);

    } catch (error) {
      console.error("Submit Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
    return (
        <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 md:px-8">
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
                                        className="w-full bg-white border border-gray-400 rounded-md px-4 py-2 text-[16px] outline-none focus:border-[#19718A]"
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
                                        className="w-full bg-white border border-gray-400 rounded-md px-4 py-2 text-[16px] outline-none focus:border-[#19718A]"
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
                                        className="w-full bg-white border border-gray-400 rounded-md px-4 py-2 text-[16px] outline-none focus:border-[#19718A]"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col">
                                <div>
                                    <label className="block text-[14px] font-semibold text-gray-800 mb-1.5">Employment Type</label>
                                    <input
                                        type="text"
                                        name="employment_type"
                                        value={formData.employment_type}
                                        onChange={handleChange}
                                        placeholder="Full Time / Part Time / Visiting"
                                        className="w-full bg-white border border-gray-400 rounded-md px-4 py-2 text-[16px] outline-none focus:border-[#19718A]"
                                        required
                                    />
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
        </div>
    );
};

export default Form3;
