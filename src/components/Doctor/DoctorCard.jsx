import React from 'react';

const DoctorCard = ({
  name = "dr. sameer shrivastava",
  designation = "Chairman",
  department = "Adult CTVS",
  location = "Fortis Escorts Heart Institute, Okhla Road, New Delhi",
  specialties = "Internal Medicine",
  experience = "40",
  fees = "1500",
  imageUrl = "https://via.placeholder.com/69"
}) => {
  return (
    <div className="w-[318px] bg-white rounded-[4px] shadow-[0_2px_12px_rgba(0,0,0,0.16)] transition-all duration-500 ease-out hover:shadow-[0_2px_16px_rgba(0,0,0,0.2)] font-['Montserrat',sans-serif] flex flex-col justify-between">
      <div className="flex flex-col p-[20px] pb-0">
        {/* Top Section */}
        <div className="flex">
          {/* Profile Image */}
          <div className="mr-[20px] flex-shrink-0">
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-[69px] h-[69px] rounded-full border-[0.8px] border-[#dfe2f2] object-cover"
            />
          </div>
          
          {/* Doctor Details */}
          <div className="flex flex-col flex-grow">
            <h3 className="text-[18px] font-bold text-[#221e20] leading-[25.6px] capitalize mb-[2px]">
              {name}
            </h3>
            <p className="text-[16px] leading-[22.4px] text-[#221e20]">
              <span className="font-bold">{designation}</span>
              <span className="font-normal block mt-[2px]">{department}</span>
            </p>
            
            <p className="text-[16px] font-normal text-[#221e20] leading-[22.4px] mt-[6px]">
              {location}
            </p>
          </div>
        </div>

        {/* Specialties Tag */}
        <div className="mt-[16px] mb-[12px]">
          <span className="bg-[#f5f6f9] rounded-[4px] px-[12px] py-[8px] text-[14px] text-[#221e20] inline-block font-medium">
            {specialties}
          </span>
        </div>

        {/* Experience & Fees */}
        <div className="flex flex-row gap-[20px] py-[16px] border-t border-[#f5f6f9]">
          <div className="flex items-start">
            {/* Calendar/Clock Icon */}
            <svg className="w-[13px] h-[13px] mr-[7px] mt-[1px] text-[#6f6f6f]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-[14px] font-normal text-[#6f6f6f] leading-none mb-[4px]">Experience</span>
              <span className="text-[16px] font-bold text-[#221e20]">{experience} Years</span>
            </div>
          </div>

          <div className="flex items-start">
            {/* Rupee Text Icon */}
            <span className="w-[12px] text-[16px] font-semibold text-[#6f6f6f] mr-[7px] mt-[-1px] flex items-center justify-center leading-none">₹</span>
            <div className="flex flex-col">
              <span className="text-[14px] font-normal text-[#6f6f6f] leading-none mb-[4px]">Fees</span>
              <span className="text-[16px] font-bold text-[#221e20]">₹ {fees}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex w-full h-[45px] mt-auto">
        <button className="w-1/2 bg-[#ffffff] border-[0.8px] border-[#f4d7d0] text-[#000000] text-[14px] font-medium rounded-bl-[4px] hover:bg-[#fcf5f3] transition-colors duration-300 flex items-center justify-center">
          View Full Profile
        </button>
        <button className="w-1/2 bg-[#f4d7d0] hover:bg-[#eeb9af] text-[#181515] text-[14px] font-medium rounded-br-[4px] border-[0.8px] border-[#f4d7d0] hover:border-[#eeb9af] transition-colors duration-500 ease-out flex items-center justify-center">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
