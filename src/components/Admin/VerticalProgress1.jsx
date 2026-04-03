import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { MdPhoneAndroid } from "react-icons/md";
const steps = [
  { id: 1, icon: <FaUser /> },
  { id: 2, icon: <FaEnvelope /> },
  { id: 3, icon: <MdPhoneAndroid size={22} />},
  { id: 4, icon: <FaLock /> },
  { id: 5, icon: <FaLock /> },
   
];

export default function VerticalProgress1({ activeStep }) {
  return (
    <div className="relative flex flex-col items-center mt-[10px]"> {/* Added relative for line positioning */}
      {/* Continuous Connecting Line - Exactly spans from center of 1st circle to center of last */}
      <div className="absolute top-[24px] bottom-[24px] left-1/2 -translate-x-1/2 w-[9px] bg-[#89C8D9] z-0 overflow-hidden">
        {/* Active colored line Fill */}
        <div
          className="w-full bg-[#19718A] transition-all duration-500 ease-in-out"
          style={{ height: `${(Math.max(0, activeStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>

      {steps.map((step, index) => {
        const isActive = step.id <= activeStep;

        return (
          <div
            key={step.id}
            className={`relative z-10 flex flex-col items-center transition-all duration-500 ${
              index !== steps.length - 1 ? "mb-7" : ""
            }`}
          >
            {/* Circle */}
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-500 ${
                isActive
                  ? "bg-[#19718A] border-[#19718A] text-white scale-105"
                  : "bg-[#89C8D9] border-[#19718A] text-white"
              }`}
            >
              <span className="text-[16px]">{step.icon}</span> {/* smaller icon */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
