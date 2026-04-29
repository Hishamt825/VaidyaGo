import React from 'react';

const Share = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shareOptions = [
    {
      title: "Share with My Doctor",
      desc: "Direct internal sharing with your clinical care team.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      title: "Send to Family",
      desc: "Keep your loved ones updated with your latest progress.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Copy Secure Link",
      desc: "Generates a time-limited, encrypted access URL.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
    },
    {
      title: "Email as PDF",
      desc: "Sends a formalized clinical record as an attachment.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 9h1m1 0h1m-1 0v1m0 4h3m-3 4h3m-3-12l5 5" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-[40px] w-full max-w-[500px] shadow-2xl p-6 overflow-hidden border border-gray-100">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#E9F3F6] flex items-center justify-center text-[#19718A]">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h2 className="text-[24px] font-bold text-[#0D1C2E] leading-tight">Share Securely</h2>
            <p className="text-[14px] text-[#627382] font-medium mt-1">Choose how you'd like to share your health records.</p>
          </div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {shareOptions.map((option, index) => (
            <div 
              key={index}
              className="bg-[#F8FBFC] p-4 rounded-[28px] border border-gray-300 hover:border-[#19718A]/40 hover:bg-[#F0F7F8] hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#19718A] flex items-center justify-center text-white mb-3 shadow-md shadow-[#19718A]/20 group-hover:scale-110 transition-transform">
                {option.icon}
              </div>
              <h3 className="text-[16px] font-bold text-[#0D1C2E] mb-1.5">{option.title}</h3>
              <p className="text-[12px] text-[#627382] leading-relaxed font-medium">{option.desc}</p>
            </div>
          ))}
        </div>

        {/* Insight Section */}
        <div className="bg-[#E9F3F6]/50 p-3 rounded-[28px] flex items-center gap-3 mb-6 border border-[#19718A]/20">
          <div className="w-12 h-12 rounded-full bg-[#E1F1F3] shadow-inner flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-white">
             {/* Character SVG */}
             <svg className="w-8 h-8 text-[#19718A]" viewBox="0 0 64 64" fill="none">
               <circle cx="32" cy="32" r="30" fill="white" />
               <path d="M42 28c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z" fill="#E1F1F3" />
               <circle cx="28" cy="26" r="2" fill="#0D1C2E" />
               <circle cx="36" cy="26" r="2" fill="#0D1C2E" />
               <path d="M26 34s2 2 6 2 6-2 6-2" stroke="#0D1C2E" strokeWidth="2" strokeLinecap="round" />
               <path d="M32 42v10M28 46h8" stroke="#19718A" strokeWidth="2" strokeLinecap="round" />
             </svg>
          </div>
          <div className="relative bg-white p-3 rounded-[18px] rounded-bl-none text-[12px] text-[#42526E] font-semibold shadow-sm leading-snug">
            <div className="absolute -left-2 bottom-0 w-3 h-3 bg-white clip-path-triangle transform rotate-45"></div>
            "Sharing your clinical data helps your care team stay aligned on your progress!"
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-center">
          <button 
            onClick={onClose}
            className="text-[16px] font-bold text-[#627382]/60 hover:text-[#0D1C2E] transition-all py-2"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default Share;
