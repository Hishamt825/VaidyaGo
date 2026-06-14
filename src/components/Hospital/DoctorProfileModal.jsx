import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CalendarClock, Hospital, MapPin, Award, CheckCircle2, Star } from 'lucide-react';

const DoctorProfileModal = ({ doctor, isOpen, onClose }) => {
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

  if (!doctor) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0B2132]/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
            className="relative w-full max-w-4xl bg-white rounded-none md:rounded-[2.5rem] shadow-2xl overflow-y-auto md:overflow-hidden flex flex-col md:flex-row max-h-screen md:max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
            >
              <X size={20} />
            </button>

            {/* Left Side: Photo & Quick Stats */}
            <div className="md:w-2/5 bg-gradient-to-b from-[#F0F7F9] to-white p-8 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-gray-100">
              <div className="w-48 h-48 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl mb-6 mt-4">
                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#19718A]/10 rounded-full text-[#19718A] font-bold text-xs uppercase tracking-widest mb-4">
                <Star size={12} fill="currentColor" />
                Top Rated Specialist
              </div>

              <h2 className="text-2xl font-black text-[#0B2132] mb-1">{doctor.name}</h2>
              <p className="text-[#19718A] font-bold text-sm uppercase tracking-wide mb-6">{doctor.title}</p>

              <div className="grid grid-cols-2 gap-4 w-full mt-auto">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                  <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Experience</div>
                  <div className="text-[#0B2132] font-black text-lg">{doctor.experience}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                  <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Consultation</div>
                  <div className="text-[#0B2132] font-black text-lg">₹{doctor.fees}</div>
                </div>
              </div>
            </div>

            {/* Right Side: Details */}
            <div className="md:w-3/5 p-8 md:p-12 md:overflow-y-auto custom-scrollbar">
              <div className="mb-8">
                <h3 className="text-lg font-black text-[#0B2132] mb-4 flex items-center gap-2">
                  <Award size={20} className="text-[#19718A]" />
                  About Specialist
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {doctor.name} is a highly distinguished specialist at {doctor.department}. With over {doctor.experience} of dedicated service, they have consistently demonstrated clinical excellence and a deep commitment to patient-centered care.
                </p>
                {doctor.extraInfo && (
                   <p className="text-gray-500 mt-4 text-sm font-medium italic border-l-4 border-[#19718A]/20 pl-4">
                     "{doctor.extraInfo}"
                   </p>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-black text-[#0B2132] mb-4 flex items-center gap-2">
                  <Hospital size={20} className="text-[#19718A]" />
                  Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.specialties?.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 bg-[#F0F7F9] text-[#19718A] px-4 py-2 rounded-xl text-sm font-bold border border-[#19718A]/10">
                      <CheckCircle2 size={14} />
                      {spec}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-black text-[#0B2132] mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-[#19718A]" />
                  Hospital Location
                </h3>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-gray-700 font-bold text-sm mb-1">{doctor.department}</p>
                  <p className="text-gray-500 text-xs font-medium">VaidyaGo Super Speciality Center, North Zone</p>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white pt-4">
                <button className="w-full bg-[#19718A] hover:bg-[#0C6173] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-[#19718A]/20">
                  Book A Consultation Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DoctorProfileModal;
