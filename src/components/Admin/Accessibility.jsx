import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MenuItem = ({ text, img, active, onClick }) => (
  <div
    onClick={onClick}
    className={`group flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer text-[14px] font-medium transition-all duration-200
    ${active
        ? "bg-[#1b6d8a] text-white"
        : "text-gray-600 hover:bg-[#1b6d8a] hover:text-white"
      }
  `}
  >
    <img
      src={img}
      className={`w-4 h-4 transition-all duration-200 
      ${active
          ? "brightness-0 invert"
          : "group-hover:brightness-0 group-hover:invert"
        }
    `}
      alt=""
    />
    <span>{text}</span>
  </div>
);

const Accessibility = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-[#f5f8fb] overflow-hidden font-sans">
      
      {/* LEFT ICON BAR */}
      <div className="h-full w-14 bg-white flex flex-col items-center shadow-lg border-r border-[#19718A] py-4">
        <div 
          onClick={() => navigate("/Admin_dashboard1")} 
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-100 cursor-pointer hover:bg-blue-200 transition-colors"
        >
          <img src="/assets/me.png" className="w-5 h-5" alt="" />
        </div>

        <div className="mt-10 flex flex-col gap-6">
          <img src="/assets/d.png" className="w-6 h-6 cursor-pointer" alt="" />
          <img src="/assets/i.png" className="w-6 h-6 cursor-pointer" alt="" />
          <img src="/assets/app.png" className="w-6 h-6 cursor-pointer" alt="" />
        </div>
      </div>

      {/* MAIN SIDEBAR */}
      <div className="h-full w-64 bg-[#eef5f9] border-r p-6">
        <img src="/assets/v.png" className="h-12 mb-6 cursor-pointer" onClick={() => navigate("/Admin_dashboard1")} alt="" />

        <p className="text-[14px] text-gray-500 mb-3 font-medium">Personal Account</p>

        <nav className="flex flex-col gap-2">
          <MenuItem text="Your Profile" img="/assets/user.svg" active={false} onClick={() => navigate("/Profile")} />
          <MenuItem text="Login" img="/assets/right.png" active={false} />
          <MenuItem text="Accessibility" img="/assets/ad.png" active={true} onClick={() => navigate("/Accessibility")} />
          <MenuItem text="Privacy Policy" img="/assets/lo.png" active={false} />
        </nav>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 h-full overflow-y-auto bg-white px-20 py-16">
        <div className="flex flex-col items-center mb-14">
          <h2 className="text-[30px] font-semibold text-gray-800">Accessibility Settings</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {/* Example Accessibility Options */}
          <div className="p-6 border border-gray-200 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Visual Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-700">High Contrast Mode</p>
                  <p className="text-sm text-gray-500">Increase contrast for better readability</p>
                </div>
                <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <p className="font-semibold text-gray-700">Large Text</p>
                  <p className="text-sm text-gray-500">Scale up the system font size</p>
                </div>
                <div className="w-12 h-6 bg-[#19718A] rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border border-gray-200 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Navigation Helpers</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-700">Keyboard Shortcuts</p>
                  <p className="text-sm text-gray-500">Enable quick navigation via keyboard</p>
                </div>
                <div className="w-12 h-6 bg-[#19718A] rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;
