import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";

const Request = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      {/* Backdrop with Blur */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[550px] bg-white rounded-xl shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-[22px] font-bold text-[#0B2132]">Request a Call Back</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-900" strokeWidth={2.5} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="space-y-1">
              <label className="text-[13px] font-semibold text-gray-700">
                First Name<span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                type="text"
                className="w-full bg-[#F8F9FA] border border-gray-200 rounded-md py-2 px-3 text-[14px] focus:outline-none focus:border-[#19718A] transition-colors"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-1">
              <label className="text-[13px] font-semibold text-gray-700">
                Last Name<span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                type="text"
                className="w-full bg-[#F8F9FA] border border-gray-200 rounded-md py-2 px-3 text-[14px] focus:outline-none focus:border-[#19718A] transition-colors"
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div className="space-y-1">
            <label className="text-[13px] font-semibold text-gray-700">
              Mobile Number<span className="text-red-500 ml-0.5">*</span>
            </label>
            <input
              type="tel"
              className="w-full bg-[#F8F9FA] border border-gray-200 rounded-md py-2 px-3 text-[14px] focus:outline-none focus:border-[#19718A] transition-colors"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-[13px] font-semibold text-gray-700">
              Email<span className="text-red-500 ml-0.5">*</span>
            </label>
            <input
              type="email"
              className="w-full bg-[#F8F9FA] border border-gray-200 rounded-md py-2 px-3 text-[14px] focus:outline-none focus:border-[#19718A] transition-colors"
            />
          </div>

          {/* Hospital Name */}
          <div className="space-y-1">
            <label className="text-[13px] font-semibold text-gray-700">
              Hospital Name<span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="relative">
              <select className="w-full appearance-none bg-[#F8F9FA] border border-gray-200 rounded-md py-2 px-3 pr-10 text-[14px] text-gray-500 focus:outline-none focus:border-[#19718A] transition-colors cursor-pointer font-medium">
                <option value="">-Select Hospital-</option>
                <option value="h1">VaidyaGo Hospital 1</option>
                <option value="h2">VaidyaGo Hospital 2</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-1">
            <label className="text-[13px] font-semibold text-gray-700">Comments</label>
            <textarea
              rows={3}
              className="w-full bg-[#F8F9FA] border border-gray-200 rounded-md py-2 px-3 text-[14px] focus:outline-none focus:border-[#19718A] transition-colors resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            onClick={(e) => { e.preventDefault(); onClose(); }}
            className="w-full bg-[#19718A] hover:bg-[#156176] text-white font-bold py-3 rounded-md transition-all duration-200 text-[15px] shadow-md mt-2"
          >
            Request a Call Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Request;
