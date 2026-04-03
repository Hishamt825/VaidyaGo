import React from "react";

const Section3 = [
  {
    title: "Cardic Care",
    subtitle: "Heart Health care",
    icon: "/icons/heart.png",
  },
  {
    title: "Dentistry",
    subtitle: "Dental Care Solutions",
    icon: "/icons/dental.png",
  },
  {
    title: "Gastroscience",
    subtitle: "Digestive Health Care",
    icon: "/icons/stomach.png",
  },
  {
    title: "Neuroscience",
    subtitle: "Brain & Nerve Care",
    icon: "/icons/brain.png",
  },
  {
    title: "Orthopedics",
    subtitle: "Bone & Join Care",
    icon: "/icons/bone.png",
  },
  {
    title: "Liver Care",
    subtitle: "Liver transparent & Health Care",
    icon: "/icons/liver.png",
  },
  {
    title: "Renal Care",
    subtitle: "Kidney Health Treatment",
    icon: "/icons/kidney.png",
  },
  {
    title: "Gynaecology",
    subtitle: "Gynaecological Care Solutions",
    icon: "/icons/woman.png",
  },
  {
    title: "Paediatric Care",
    subtitle: "Child Health Services",
    icon: "/icons/child.png",
  },
];

const Specialities = () => {
  return (
    <div className="w-full px-6 py-12 bg-white flex flex-col items-center">

      {/* Heading Box */}
      <div className="text-center mb-10">
        <h2 className="text-[30px] font-semibold">
          We Serve In Different <span className="text-blue-600">Areas For</span>
        </h2>
        <h2 className="text-[30px] font-semibold">Our Patients</h2>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">

        {specialties.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 border rounded-xl shadow-sm hover:shadow-md transition bg-white"
          >
            <img src={item.icon} alt="" className="w-12 h-12" />

            <div>
              <h3 className="text-[18px] font-bold text-gray-800">{item.title}</h3>
              <p className="text-[14px] text-gray-500">{item.subtitle}</p>
            </div>
          </div>
        ))}

      </div>

      {/* Button */}
      <button className="mt-10 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition text-[16px]">
        View All Specialities
      </button>

    </div>
  );
};

export default Specialities;
