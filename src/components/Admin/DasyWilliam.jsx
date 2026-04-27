import React from "react";
import { motion } from "framer-motion";

const DasyWilliam = ({ setOpenProfile }) => {
    return (
      <motion.div
  initial={{ opacity: 0, y: -40 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ type: "spring", stiffness: 260, damping: 20 }}

  className="absolute right-0 mt-2 w-[400px] bg-white rounded-2xl 
border border-gray-200 divide-y z-50
shadow-[0_10px_40px_rgba(0,120,255,0.15)]"
>


            {/* Account Section */}
            <div className="px-4 py-3">
                <p className="text-gray-500 text-[14px] mb-2">Account</p>

                <div className="flex items-center justify-between cursor-pointer hover:bg-gray-50 rounded-xl p-2 transition">
                    <div className="flex gap-3 items-center">
                        <img
                            src="/assets/ph.png"
                            alt="profile"
                            className="w-12 h-12 rounded-full object-cover"
                        />

                      <div
                        className="leading-tight cursor-pointer"
                        onClick={() => setOpenProfile(true)}
                      >
                        <h2 className="font-semibold text-[18px] text-gray-700">
                            Dasy William
                        </h2>
                        <p className="text-sky-600 text-[14px]">
                            javedtuba@gmail.com
                        </p>
                      </div>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenProfile(true);
                        }}
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                </div>
            </div>

            {/* Plan Section */}
            <div className="px-2 py-3">
                <p className="text-gray-600 text-[14px] mb-2">Plan</p>

                <button className="w-full border rounded-full py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                    <img src="/assets/plus.png" className="w-6 h-6 object-contain" />
                    <p className="text-[16px] font-medium text-gray-700">Create plan</p>
                </button>
            </div>

            {/* Menu Items */}
            <div className="py-2">

                {/* Settings */}
                <div 
                    onClick={() => setOpenProfile(true)}
                    className="flex items-center justify-between py-2 px-4 hover:bg-gray-100 cursor-pointer transition">
                    <div className="flex items-center gap-3">
                        <img src="/assets/settt.png" className="w-6 h-6 object-contain" />
                        <p className="text-[16px] font-medium text-gray-700">Settings</p>
                    </div>
                </div>

                {/* Theme */}
                <div className="flex items-center justify-between py-2 px-4 hover:bg-gray-100 cursor-pointer transition">
                    <div className="flex items-center gap-3">
                        <img src="/assets/Theme.png" className="w-6 h-6 object-contain" />
                        <p className="text-[16px] font-medium text-gray-700">Theme</p>
                    </div>

                    <span className="text-gray-400">⌄</span>
                </div>

                {/* Help */}
                <div className="flex items-center justify-between py-2 px-4 hover:bg-gray-100 cursor-pointer transition">
                    <div className="flex items-center gap-3">
                        <img src="/assets/help.png" className="w-6 h-6 object-contain" />
                        <p className="text-[16px] font-medium text-gray-700">Help & Resources</p>
                    </div>

                    <span className="text-gray-400">⌄</span>
                </div>

            </div>


            {/* Logout */}
            <div className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3 transition">

                <img src="/assets/log.png" className="w-6 h-6 object-contain" />
                <p className="text-[16px] font-medium text-gray-700">Logout</p>

            </div>

        </motion.div>

    );
};

const MenuItem = ({ title, icon, dropdown }) => {
    return (
        <div className="flex items-center justify-between py-2 px-4 hover:bg-gray-100 cursor-pointer transition">
            <div className="flex items-center gap-3">
                <span>{icon}</span>
                <p className="text-gray-700 font-medium text-[16px]">{title}</p>
            </div>

            {dropdown && <span className="text-gray-400">⌄</span>}
        </div>
    );
};

export default DasyWilliam;
