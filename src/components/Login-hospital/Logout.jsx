import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Logout = ({ isModal, onClose, onSwitchToLogin }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    // Navigate back to previous page or close modal
    if (isModal && onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const handleLogout = () => {
    // Add logout logic here (e.g., clear tokens)
    console.log("User logged out");
    if (isModal && onSwitchToLogin) {
      onSwitchToLogin();
    } else {
      if (isModal && onClose) onClose();
      navigate('/Finallogin');
    }
  };

  const innerContent = (
    <div
      className="w-[450px] relative mt-12"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Background with Cutout */}
      <div 
        className="absolute inset-0 bg-white rounded-2xl shadow-2xl"
        style={{ 
          WebkitMaskImage: "radial-gradient(circle at 50% 0%, transparent 64px, black 65px)", 
          maskImage: "radial-gradient(circle at 50% 0%, transparent 64px, black 65px)" 
        }}
      ></div>

      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-50 cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Icon Circle */}
      <div className="absolute -top-[58px] left-1/2 -translate-x-1/2 bg-[#19718A] rounded-full h-[115px] w-[115px] flex items-center justify-center shadow-lg z-10">
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative pt-[65px] px-8 pb-10 flex flex-col items-center z-10">
        {/* Title */}
        <h2 className="text-[22px] font-bold text-gray-900 mt-4 mb-3 text-center tracking-wide">
          Are you logging out ?
        </h2>

        {/* Subtitle */}
        <p className="text-[#333] text-[13px] text-center mb-10 px-4 leading-relaxed font-medium">
          You can always log back in at any time. if you
          <br />
          just want to switch accounts,you ca add
          <br />
          another account.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 w-full justify-center">
          {/* Cancel Button */}
          <button
            onClick={handleCancel}
            className="w-[130px] h-[40px] rounded-full bg-white border border-gray-400 text-gray-700 text-[14px] font-medium hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          {/* Logout Button */}
          <div className="p-[3px] rounded-full border-[1.5px] border-gray-200 shadow-sm flex items-center justify-center">
            <button
              onClick={handleLogout}
              className="w-[124px] h-[36px] rounded-full bg-[#89C8D9] text-[#0f3b4d] text-[14px] font-bold hover:bg-[#78b7c8] hover:shadow-md transition-all flex items-center justify-center shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)] cursor-pointer"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
        {innerContent}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#252525] px-4 font-sans relative">
      {innerContent}
    </div>
  );
};

export default Logout;
