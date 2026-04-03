import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { MdPhoneAndroid } from "react-icons/md";
const steps = [
  { id: 1, icon: <FaUser /> },
  { id: 2, icon: <FaEnvelope /> },
  { id: 3, icon: <MdPhoneAndroid size={22} />},
  { id: 4, icon: <FaLock /> },
  { id: 5, icon: <FaLock /> },
   
];

export default function VerticalProgressBar({ activeStep }) {
  return (
    <div className="flex flex-col items-center mt-[10px]"> {/* Reduced top margin */}
      {steps.map((step, index) => {
        const isActive = step.id <= activeStep;
        const isNextActive =
          steps[index + 1] && steps[index + 1].id <= activeStep;

        return (
          <div
            key={step.id}
            className="flex flex-col items-center transition-all duration-500"
          >
            {/* Circle */}
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full border-2 mb- transition-all duration-500 ${
                isActive
                  ? "bg-[#19718A] border-[#19718A] text-white scale-105"
                  : "bg-[#89C8D9] border-[#19718A] text-white"
              }`}
            >
              <span className="text-base">{step.icon}</span> {/* smaller icon */}
            </div>

            {/* Line */}
            {index !== steps.length - 1 && (
              <div
                className={`w-[9px] h-7 transition-all duration-500 ${
                  isNextActive ? "bg-[#19718A]" : "bg-[#89C8D9]"
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
