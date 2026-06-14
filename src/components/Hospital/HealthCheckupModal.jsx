import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, Activity, Heart, Zap, ArrowRight } from 'lucide-react';

const HealthCheckupModal = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const packages = [
    {
      title: "Basic Wellness",
      subtitle: "Essential screening for everyday health",
      price: "1,499",
      icon: <Activity size={28} className="text-[#19718A]" />,
      featured: false,
      tests: ["CBC & Blood Sugar", "Lipid Profile", "Liver Function", "Kidney Function", "Physical Consultation"]
    },
    {
      title: "Cardiac Care",
      subtitle: "Comprehensive heart & vital screening",
      price: "2,999",
      icon: <Heart size={28} className="text-red-500" />,
      featured: true,
      tests: ["Basic Wellness +", "ECG & TMT", "2D ECHO", "HbA1c (Diabetes)", "Specialist Consultation"]
    },
    {
      title: "Executive Full Body",
      subtitle: "Total health evaluation & diagnostics",
      price: "4,999",
      icon: <Zap size={28} className="text-yellow-600" />,
      featured: false,
      tests: ["Cardiac Care +", "Ultrasound Abdomen", "Chest X-Ray", "Vitamin D3 & B12", "Senior Doctor Review"]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-0 md:p-6">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
            className="relative w-full max-w-6xl bg-white rounded-none md:rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-screen md:max-h-[92vh]"
          >
            {/* Header Area */}
            <div className="relative p-8 md:px-12 md:py-10 bg-white border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="text-center md:text-left">
                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E9F3F6] text-[#19718A] mb-4">
                    <ShieldCheck size={16} />
                    <span className="text-[12px] font-bold uppercase tracking-widest">Diagnostic Packages</span>
                 </div>
                 <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#0B2132] leading-tight mb-2 tracking-tight">
                   Our Medical <span className="text-[#19718A]">Checkup Plans</span>
                 </h2>
                 <p className="text-gray-500 text-[16px] max-w-2xl leading-relaxed font-medium">
                   Comprehensive care delivered through advanced technology and expert diagnostics.
                 </p>
               </div>
               
               <button
                 onClick={onClose}
                 className="absolute top-4 right-4 md:relative md:top-auto md:right-auto p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-gray-900 border border-gray-100"
               >
                 <X size={24} />
               </button>
            </div>

            {/* Content Area */}
            <div className="p-8 md:p-12 overflow-y-auto flex-grow bg-[#F8FAFC] no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>{`
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {packages.map((pkg, idx) => (
                  <div 
                    key={idx}
                    className={`relative flex flex-col bg-white rounded-[24px] p-8 transition-all duration-300
                      ${pkg.featured 
                        ? 'border-2 border-[#19718A] shadow-[0_12px_30px_-10px_rgba(25,113,138,0.2)] scale-[1.02] z-10' 
                        : 'border border-gray-300 hover:border-[#19718A]/30 hover:-translate-y-1.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-[18px] flex items-center justify-center bg-[#F8FAFC] border border-gray-50 shadow-sm`}>
                        {pkg.icon}
                      </div>
                      {pkg.featured && (
                        <span className="bg-[#19718A] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                          Recommended
                        </span>
                      )}
                    </div>

                    <h3 className={`text-[20px] font-extrabold mb-1 ${pkg.featured ? 'text-[#19718A]' : 'text-[#0B2132]'}`}>
                      {pkg.title}
                    </h3>
                    <p className="text-gray-500 text-[14px] font-medium leading-snug mb-6">
                      {pkg.subtitle}
                    </p>

                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-[32px] font-extrabold text-[#0B2132]">₹{pkg.price}</span>
                      <span className="text-gray-400 text-[14px] font-bold">/ plan</span>
                    </div>

                    <div className="space-y-3.5 mb-10 flex-grow">
                      {pkg.tests.map((test, i) => (
                        <div key={i} className="flex items-start gap-3 text-gray-600 font-medium text-[14px]">
                          <CheckCircle2 size={18} className="text-[#19718A] shrink-0 mt-0.5" />
                          {test}
                        </div>
                      ))}
                    </div>

                    <button className={`w-full py-4 rounded-[16px] text-[14px] font-bold tracking-wide transition-all flex items-center justify-center gap-2 group
                      ${pkg.featured 
                        ? 'bg-[#19718A] text-white hover:bg-[#0C6173] shadow-lg' 
                        : 'bg-[#E9F3F6] text-[#19718A] hover:bg-[#19718A] hover:text-white'
                      }
                    `}>
                      Book Now
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Area */}
            <div className="px-12 py-8 bg-white border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
               <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-[#0B2132] font-extrabold text-[18px]">98%</span>
                    <span className="text-gray-500 text-[11px] font-bold uppercase tracking-widest">Satisfaction</span>
                  </div>
                  <div className="w-px h-8 bg-gray-100"></div>
                  <div className="flex flex-col">
                    <span className="text-[#0B2132] font-extrabold text-[18px]">24H</span>
                    <span className="text-gray-500 text-[11px] font-bold uppercase tracking-widest">Reports</span>
                  </div>
               </div>
               <p className="text-gray-400 text-[12px] font-bold uppercase tracking-widest">
                 Certified Medical Diagnostics • Trust • Accuracy
               </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default HealthCheckupModal;
