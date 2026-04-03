import React from "react";

const steps = [
  { id: 1, label: "Personal Info" },
  { id: 2, label: "Professional Info" },
  { id: 3, label: "Hospital Info" },
  { id: 4, label: "Document" },
];

export default function Vertical({ activeStep, setActiveStep }) {
  const doctorId = localStorage.getItem("doctor_id");
  const professionalInfoId = localStorage.getItem("professional_info_id");
  const hospitalInfoId = localStorage.getItem("hospital_info_id");

  let maxAllowedStep = 1;
  if (doctorId) maxAllowedStep = 2;
  if (professionalInfoId) maxAllowedStep = 3;
  if (hospitalInfoId) maxAllowedStep = 4;

  const handleStepClick = (stepId) => {
    if (stepId <= maxAllowedStep && stepId !== activeStep) {
      if (setActiveStep) {
        setActiveStep(stepId);
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 mb-10 mt-6 overflow-hidden">
      <div className="relative flex justify-between w-full">

        {/* Continuous Connecting Line - Exactly spans from center of 1st circle to center of 4th */}
        <div className="absolute top-[19px] left-[12.5%] right-[12.5%] h-[6px] bg-[#CFD4DC] z-0 overflow-hidden">
          {/* Active colored line Fill */}
          <div
            className="h-full bg-[#0A193B] transition-all duration-500 ease-in-out"
            style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>

        {steps.map((step) => {
          const isCurrent = step.id === Number(activeStep);
          // Only steps before the current one (and strictly within allowed max limits) are considered explicitly "completed" here
          const isCompleted = step.id < Number(activeStep) && step.id <= maxAllowedStep;

          let contentToShow;
          if (isCurrent) {
            contentToShow = step.id;
          } else if (isCompleted) {
            contentToShow = (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            );
          } else {
            contentToShow = step.id;
          }

          return (
            <div
              key={step.id}
              className="relative flex flex-col items-center z-10 w-1/4"
              style={{
                cursor: step.id <= maxAllowedStep ? "pointer" : "not-allowed",
                pointerEvents: step.id <= maxAllowedStep ? "auto" : "none"
              }}
              onClick={() => {
                if (step.id <= maxAllowedStep) {
                  if (setActiveStep) {
                    setActiveStep(step.id);
                  }
                }
              }}
            >
              {/* Circle */}
              <div
                className={`w-[44px] h-[44px] flex items-center justify-center rounded-full text-[18px] font-medium tracking-wide transition-all duration-300
                  ${isCurrent || isCompleted
                    ? "bg-[#0A193B] text-white border-[2px] border-[#0A193B]"
                    : "bg-white text-[#0A193B] border-[2px] border-[#0A193B]"
                  }`}
              >
                {contentToShow}
              </div>

              {/* Label */}
              <p
                className={`mt-4 text-[14px] md:text-[16px] text-center whitespace-nowrap transition-colors duration-300
                ${isCurrent || isCompleted ? "text-[#101828] font-[600]" : "text-[#475467] font-medium"
                  }`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}