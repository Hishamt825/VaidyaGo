import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";

const Request = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    firstName: "", lastName: "", mobile: "", email: "", hospital: "", comments: ""
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "Please enter first name";
    if (!form.lastName.trim()) newErrors.lastName = "Please enter last name";
    if (!form.mobile.trim()) newErrors.mobile = "Please enter mobile number";
    if (!form.email.trim()) newErrors.email = "Please enter email id";
    if (!form.hospital) newErrors.hospital = "Please select hospital";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); onClose(); }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Modal Container */}
      <div className="relative w-full max-w-[800px] bg-white rounded-none md:rounded-lg shadow-2xl overflow-y-auto max-h-[90vh] font-['Poppins',sans-serif]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={28} className="text-gray-900" strokeWidth={2} />
        </button>

        <div className="p-8 md:p-12">
          {/* Title */}
          <h2 className="text-[32px] font-medium text-gray-800 mb-8 mt-4 md:mt-0">Request a Call Back</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* First Name */}
              <div className="space-y-2">
                <label className="text-[16px] font-medium text-gray-700">
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full bg-[#f8f9fa] border border-gray-200 rounded-md py-3 px-4 text-[16px] focus:outline-none focus:border-gray-300 transition-colors"
                />
                {errors.firstName && <p className="text-[#f83a3a] text-[13px] font-medium">{errors.firstName}</p>}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="text-[16px] font-medium text-gray-700">
                  Last Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full bg-[#f8f9fa] border border-gray-200 rounded-md py-3 px-4 text-[16px] focus:outline-none focus:border-gray-300 transition-colors"
                />
                {errors.lastName && <p className="text-[#f83a3a] text-[13px] font-medium">{errors.lastName}</p>}
              </div>
            </div>

            {/* Mobile Number */}
            <div className="space-y-2">
              <label className="text-[16px] font-medium text-gray-700">
                Mobile Number<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                className="w-full bg-[#f8f9fa] border border-gray-200 rounded-md py-3 px-4 text-[16px] focus:outline-none focus:border-gray-300 transition-colors"
              />
              {errors.mobile && <p className="text-[#f83a3a] text-[13px] font-medium">{errors.mobile}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[16px] font-medium text-gray-700">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-[#f8f9fa] border border-gray-200 rounded-md py-3 px-4 text-[16px] focus:outline-none focus:border-gray-300 transition-colors"
              />
              {errors.email && <p className="text-[#f83a3a] text-[13px] font-medium">{errors.email}</p>}
            </div>

            {/* Hospital Name */}
            <div className="space-y-2">
              <label className="text-[16px] font-medium text-gray-700">
                Hospital Name<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="hospital"
                  value={form.hospital}
                  onChange={handleChange}
                  className="w-full appearance-none bg-[#f8f9fa] border border-gray-200 rounded-md py-3 px-4 pr-10 text-[16px] text-gray-500 focus:outline-none focus:border-gray-300 transition-colors cursor-pointer"
                >
                  <option value="">-Select Hospital-</option>
                  <option value="h1">VaidyaGo Hospital 1</option>
                  <option value="h2">VaidyaGo Hospital 2</option>
                </select>
                <ChevronDown size={24} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              {errors.hospital && <p className="text-[#f83a3a] text-[13px] font-medium">{errors.hospital}</p>}
            </div>

            {/* Comments */}
            <div className="space-y-2">
              <label className="text-[16px] font-medium text-gray-700">Comments</label>
              <textarea
                rows={3}
                name="comments"
                value={form.comments}
                onChange={handleChange}
                className="w-full bg-[#f8f9fa] border border-gray-200 rounded-md py-3 px-4 text-[16px] focus:outline-none focus:border-gray-300 transition-colors resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#19718A] hover:bg-[#0C6173] text-white font-medium py-4 rounded-md transition-all duration-200 text-[16px] mt-6"
            >
              {submitted ? "Submitted!" : "Request a Call Back"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Request;
