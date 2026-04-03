import React, { useState, useRef, useEffect } from "react";
import Profile from "./Profile";
import { AnimatePresence } from "framer-motion";

const Adddoctor = () => {
    const [step, setStep] = useState(1);
    const [open, setOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const menuRef = useRef(null);

    const [docs, setDocs] = useState({
        aadhaar: null,
        pan: null,
        license: null,
        degree: null,
    });

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 3 * 1024 * 1024) {
                alert("File size exceeds 3MB limit.");
                return;
            }
            setDocs(prev => ({ ...prev, [type]: file }));
        }
    };


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (openProfile) {
        return <Profile setOpenProfile={setOpenProfile} />;
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#F7F9FB] overflow-x-hidden w-full">





            {/* ================= LAST SECTION ================= */}
            {/* ================= ADD DOCTOR FORM ================= */}
            <div className="mt-4 mb-4 w-full">

                {/* STEPPER HEADER */}
                <div className="flex items-center justify-between border-[1px] border-gray-400 bg-white p-3 h-[70px] w-[98%] max-w-[1200px] mx-auto mt-2 mb-6">
                    <div className="flex items-center space-x-3 md:space-x-5 overflow-x-auto w-full px-2">
                        {/* Step 1 */}
                        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setStep(1)}>
                            <div className={`w-8 h-8 md:w-[34px] md:h-[34px] rounded-full ${step >= 1 ? 'bg-[#1F2E5C]' : 'bg-[#6B7280]'} text-white flex items-center justify-center font-medium text-[16px]`}>1</div>
                            <span className={`${step >= 1 ? 'text-[#333]' : 'text-[#6B7280]'} font-semibold text-[16px] whitespace-nowrap`}>Personal Info</span>
                        </div>
                        <svg className="w-[18px] h-[18px] text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>

                        {/* Step 2 */}
                        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setStep(2)}>
                            <div className={`w-8 h-8 md:w-[34px] md:h-[34px] rounded-full ${step >= 2 ? 'bg-[#1F2E5C]' : 'bg-[#6B7280]'} text-white flex items-center justify-center font-medium text-[16px]`}>2</div>
                            <span className={`${step >= 2 ? 'text-[#333]' : 'text-[#6B7280]'} font-semibold text-[16px] whitespace-nowrap`}>Professional Info</span>
                        </div>
                        <svg className="w-[18px] h-[18px] text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>

                        {/* Step 3 */}
                        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setStep(3)}>
                            <div className={`w-8 h-8 md:w-[34px] md:h-[34px] rounded-full ${step >= 3 ? 'bg-[#1F2E5C]' : 'bg-[#6B7280]'} text-white flex items-center justify-center font-medium text-[16px]`}>3</div>
                            <span className={`${step >= 3 ? 'text-[#333]' : 'text-[#6B7280]'} font-semibold text-[16px] whitespace-nowrap`}>Hospital Info</span>
                        </div>
                        <svg className="w-[18px] h-[18px] text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>

                        {/* Step 4 */}
                        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setStep(4)}>
                            <div className={`w-8 h-8 md:w-[34px] md:h-[34px] rounded-full ${step >= 4 ? 'bg-[#1F2E5C]' : 'bg-[#6B7280]'} text-white flex items-center justify-center font-medium text-[16px]`}>4</div>
                            <span className={`${step >= 4 ? 'text-[#333]' : 'text-[#6B7280]'} font-semibold text-[16px] whitespace-nowrap`}>Document</span>
                        </div>
                    </div>
                    <button className="text-[#333] font-semibold text-[18px] hidden sm:block px-6 hover:text-gray-700 transition-colors">Save</button>
                </div>

                {/* personal info  */}
                {step === 1 && (
                    <div className="border-[1.2px] border-[#a0a0a0] bg-white mt-8 p-10 pt-12 relative mx-auto w-[94%] max-w-[1000px] mb-10 rounded-[2px]">
                        <div className="flex flex-col md:flex-row gap-x-12">
                            {/* LEFT SIDE - PHOTO UPLOAD */}
                            <div className="flex flex-col items-center flex-shrink-0 w-full md:w-[220px]">
                                <div className="w-[190px] h-[190px] bg-[#EFEFEF] rounded-full flex flex-col items-center justify-center cursor-pointer mb-5">
                                    <svg className="w-16 h-16 text-gray-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    <span className="text-[#555] font-medium text-[14px]">Add Photo</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-[4px] shadow-sm bg-white hover:bg-gray-50">
                                        <svg className="w-[14px] h-[14px] text-[#227487]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                    <button className="w-8 h-8 flex items-center justify-center border border-[#ffcbcb] rounded-[4px] shadow-sm bg-white hover:bg-red-50">
                                        <svg className="w-[14px] h-[14px] text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* RIGHT SIDE - FORM FIELDS */}
                            <div className="flex-1 w-full mt-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    {/* Row 1 */}
                                    <div>
                                        <label className="block text-[#333] font-semibold text-[14px] mb-2">First Name</label>
                                        <input type="text" className="w-full border-[1.2px] border-gray-400 rounded-[4px] p-2.5 outline-none focus:border-[#227487] transition-colors text-[16px]" />
                                    </div>
                                    <div>
                                        <label className="block text-[#333] font-semibold text-[14px] mb-2">Last Name</label>
                                        <input type="text" className="w-full border-[1.2px] border-gray-400 rounded-[4px] p-2.5 outline-none focus:border-[#227487] transition-colors text-[16px]" />
                                    </div>

                                    {/* Row 2 */}
                                    <div>
                                        <label className="block text-[#333] font-semibold text-[14px] mb-2">Date of Birth</label>
                                        <div className="relative">
                                            <input type="text" placeholder="DOB" className="w-full border-[1.2px] border-gray-400 rounded-[4px] p-2.5 pr-10 outline-none focus:border-[#227487] transition-colors text-gray-500 text-[16px]" />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[#333] font-semibold text-[14px] mb-2">Gender</label>
                                        <input type="text" className="w-full border-[1.2px] border-gray-400 rounded-[4px] p-2.5 outline-none focus:border-[#227487] transition-colors text-[16px]" />
                                    </div>

                                    {/* Contact Details Separator */}
                                    <div className="col-span-1 md:col-span-2 flex items-center mt-3 mb-1">
                                        <div className="flex-1 border-t-[1.2px] border-gray-400"></div>
                                        <span className="px-5 text-[#555] font-semibold text-[16px]">Contact Details</span>
                                        <div className="flex-1 border-t-[1.2px] border-gray-400"></div>
                                    </div>

                                    {/* Row 3 */}
                                    <div>
                                        <label className="block text-[#333] font-semibold text-[14px] mb-2">Mobile Number</label>
                                        <input type="text" className="w-full border-[1.2px] border-gray-400 rounded-[4px] p-2.5 outline-none focus:border-[#227487] transition-colors text-[16px]" />
                                    </div>
                                    <div>
                                        <label className="block text-[#333] font-semibold text-[14px] mb-2">Alternate Number</label>
                                        <input type="text" className="w-full border-[1.2px] border-gray-400 rounded-[4px] p-2.5 outline-none focus:border-[#227487] transition-colors text-[16px]" />
                                    </div>

                                    {/* Address Details Separator */}
                                    <div className="col-span-1 md:col-span-2 flex items-center mt-3 mb-1">
                                        <div className="flex-1 border-t-[1.2px] border-gray-400"></div>
                                        <span className="px-5 text-[#555] font-semibold text-[16px]">Address Detail</span>
                                        <div className="flex-1 border-t-[1.2px] border-gray-400"></div>
                                    </div>

                                    {/* Row 4 */}
                                    <div>
                                        <label className="block text-[#333] font-semibold text-[14px] mb-2">Country</label>
                                        <div className="relative">
                                            <select className="w-full border-[1.2px] border-gray-400 rounded-[4px] p-2.5 appearance-none outline-none focus:border-[#227487] transition-colors text-gray-500 bg-white text-[16px]">
                                                <option>Select Country</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex flex-col items-center justify-center pr-3 pointer-events-none space-y-[-2px]">
                                                <svg className="w-[10px] h-[10px] text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3l5 5H5l5-5z" /></svg>
                                                <svg className="w-[10px] h-[10px] text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 17l-5-5h10l-5 5z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-x-4">
                                        <div>
                                            <label className="block text-[#333] font-semibold text-[14px] mb-2">City</label>
                                            <div className="relative">
                                                <select className="w-full border-[1.2px] border-gray-400 rounded-[4px] p-2.5 appearance-none outline-none focus:border-[#227487] transition-colors text-gray-500 bg-white text-[16px]">
                                                    <option>Select City</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[#333] font-semibold text-[14px] mb-2">Pincode</label>
                                            <input type="text" className="w-full border-[1.2px] border-gray-400 rounded-[4px] p-2.5 outline-none focus:border-[#227487] transition-colors text-[16px]" />
                                        </div>
                                    </div>

                                    {/* Row 5 */}
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-[#333] font-semibold text-[14px] mb-2">Address</label>
                                        <textarea className="w-full border-[1.2px] border-gray-400 rounded-[4px] p-2.5 h-[90px] outline-none focus:border-[#227487] transition-colors resize-none text-[16px]"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* professional info */}
            {step === 2 && (
                <div className="border-[1.2px] border-gray-400 bg-white mt-5 p-8 md:p-12 shadow-sm relative mx-auto w-[96%] md:w-[90%] max-w-[1000px] rounded-[5px]">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {/* Row 1 */}
                        <div>
                            <label className="block text-[#333] font-bold text-[14px] mb-2 ml-0.5">Doctor Id/Employee Id</label>
                            <input type="text" className="w-full border-[1.2px] border-gray-400 rounded-[5px] p-2.5 outline-none focus:border-[#399CAA] transition-colors text-[16px]" />
                        </div>
                        <div>
                            <label className="block text-[#333] font-bold text-[14px] mb-2 ml-0.5">Department</label>
                            <div className="relative">
                                <select className="w-full border-[1.2px] border-gray-400 rounded-[5px] p-2.5 appearance-none outline-none focus:border-[#399CAA] transition-colors text-[#555] font-medium bg-white text-[16px]">
                                    <option>Select Department</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex flex-col items-center justify-center pr-3 pointer-events-none space-y-[-2px]">
                                    <svg className="w-[10px] h-[10px] text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3l5 5H5l5-5z" /></svg>
                                    <svg className="w-[10px] h-[10px] text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M10 17l-5-5h10l-5 5z" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div>
                            <label className="block text-[#333] font-bold text-[14px] mb-2 ml-0.5">Specialization</label>
                            <div className="relative">
                                <select className="w-full border-[1.2px] border-gray-400 rounded-[5px] p-2.5 appearance-none outline-none focus:border-[#399CAA] transition-colors text-[#555] font-medium bg-white text-[16px]">
                                    <option>Choose Specialization</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex flex-col items-center justify-center pr-3 pointer-events-none space-y-[-2px]">
                                    <svg className="w-[10px] h-[10px] text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3l5 5H5l5-5z" /></svg>
                                    <svg className="w-[10px] h-[10px] text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M10 17l-5-5h10l-5 5z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[#333] font-bold text-[14px] mb-2 ml-0.5">Qualification</label>
                            <input type="text" className="w-full border-[1.2px] border-gray-400 rounded-[5px] p-2.5 outline-none focus:border-[#399CAA] transition-colors text-[16px]" />
                        </div>

                        {/* Row 3 */}
                        <div>
                            <label className="block text-[#333] font-bold text-[14px] mb-2 ml-0.5">Year Of Experience</label>
                            <input type="text" className="w-full border-[1.2px] border-gray-400 rounded-[5px] p-2.5 outline-none focus:border-[#399CAA] transition-colors text-[16px]" />
                        </div>
                        <div>
                            <label className="block text-[#333] font-bold text-[14px] mb-2 ml-0.5">Medical License / Registration Number</label>
                            <input type="text" className="w-full border-[1.2px] border-gray-400 rounded-[5px] p-2.5 outline-none focus:border-[#399CAA] transition-colors text-[16px]" />
                        </div>

                        {/* Row 4 */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-[#333] font-bold text-[14px] mb-2 ml-0.5">Medical Council (State / NMC)</label>
                            <input type="text" className="w-full border-[1.2px] border-gray-400 rounded-[5px] p-2.5 outline-none focus:border-[#399CAA] transition-colors text-[16px]" />
                        </div>
                    </div>
                </div>
            )}

            {/* hospital info */}
            {step === 3 && (
                <div className="border-[1.2px] border-[#a0a0a0] bg-white mt-8 p-10 pt-12 relative mx-auto w-[94%] max-w-[1000px] mb-10 rounded-[2px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {/* Row 1 */}
                        <div>
                            <label className="block text-[#333] font-semibold text-[14px] mb-2">Joining Date</label>
                            <input type="text" className="w-full border-[1.2px] border-gray-400 rounded-[4px] p-2.5 outline-none focus:border-[#227487] transition-colors text-[16px]" />
                        </div>
                        <div>
                            <label className="block text-[#333] font-semibold text-[14px] mb-2">Employment Type</label>
                            <input type="text" placeholder="Full Time / Part Time / Visiting" className="w-full border-[1.2px] border-gray-400 rounded-[4px] p-2.5 outline-none focus:border-[#227487] transition-colors placeholder:text-[#666] placeholder:font-normal" />
                        </div>

                        {/* Row 2 */}
                        <div>
                            <label className="block text-[#333] font-semibold text-[14px] mb-2">Consultation Fee</label>
                            <input type="text" className="w-full border-[1.2px] border-gray-400 rounded-[4px] p-2.5 outline-none focus:border-[#227487] transition-colors text-[16px]" />
                        </div>
                        <div>
                            <label className="block text-[#333] font-semibold text-[14px] mb-2">OPD / Room Number</label>
                            <input type="text" className="w-full border-[1.2px] border-gray-400 rounded-[4px] p-2.5 outline-none focus:border-[#227487] transition-colors text-[16px]" />
                        </div>

                        {/* Row 3 */}
                        <div>
                            <label className="block text-[#333] font-semibold text-[14px] mb-2">Working Days</label>
                            <input type="text" className="w-full border-[1.2px] border-gray-400 rounded-[4px] p-2.5 outline-none focus:border-[#227487] transition-colors text-[16px]" />
                        </div>
                        <div className="hidden md:block"></div>

                        {/* Row 4 */}
                        <div className="col-span-1">
                            <label className="block text-[#333] font-semibold text-[14px] mb-2">Working Time</label>
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center border-[1.2px] border-gray-400 rounded-[4px] p-1.5 px-3 w-fit bg-white">
                                    <div className="bg-[#EBEBEB] text-[#555] font-medium text-[14px] px-3 py-1 rounded-[2px]">HH</div>
                                    <span className="mx-3 text-[#333] font-medium text-[16px]">:</span>
                                    <div className="bg-[#EBEBEB] text-[#555] font-medium text-[14px] px-3 py-1 rounded-[2px]">MM</div>
                                    <span className="mx-3 text-[#333] font-medium text-[16px]">:</span>
                                    <div className="bg-[#EBEBEB] text-[#555] font-medium text-[14px] px-3 py-1 rounded-[2px]">SS</div>
                                </div>
                                
                                <button className="w-[42px] h-[42px] rounded-full bg-[#1C697B] text-white flex items-center justify-center hover:bg-[#155462] transition-colors shadow-sm flex-shrink-0 ml-1">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* document info */}
            {step === 4 && (
                <div className="border-[1.2px] border-[#a0a0a0] bg-white mt-8 p-10 pt-8 relative mx-auto w-[94%] max-w-[1000px] mb-10 rounded-[2px]">
                    <h2 className="text-[20px] font-medium text-[#333] mb-8 mt-2">Upload Document</h2>
                    <div className="relative pl-10 ml-2 space-y-6 pb-2 min-h-[400px]">
                        
                        {/* THE DYNAMIC PROGRESS LINE */}
                        <div className="absolute left-[8px] top-[45px] bottom-[45px] w-[4px] bg-[#E5E5E5] rounded-full overflow-hidden">
                            {(() => {
                                let completedCount = 0;
                                if (docs.aadhaar) completedCount++;
                                if (docs.aadhaar && docs.pan) completedCount++;
                                if (docs.aadhaar && docs.pan && docs.license) completedCount++;
                                if (docs.aadhaar && docs.pan && docs.license && docs.degree) completedCount++;
                                
                                const totalSteps = 4;
                                const progressPercentage = (Math.min(completedCount, totalSteps - 1) / (totalSteps - 1)) * 100;
                                
                                return (
                                    <div 
                                        className="w-full bg-[#227487] transition-all duration-500 ease-in-out"
                                        style={{ height: `${progressPercentage}%` }}
                                    />
                                );
                            })()}
                        </div>

                        {[
                            { id: 'aadhaar', label: 'Adhaar Card' },
                            { id: 'pan', label: 'PAN Card' },
                            { id: 'license', label: 'Medical License' },
                            { id: 'degree', label: 'Medical Degree Certificate (MBBS / MD / MS)' },
                        ].map((docItem, index, arr) => {
                            const isCompleted = !!docs[docItem.id];
                            
                            // Determine the currently active step (first one without a file)
                            let activeId = 'aadhaar';
                            if (docs.aadhaar) activeId = 'pan';
                            if (docs.aadhaar && docs.pan) activeId = 'license';
                            if (docs.aadhaar && docs.pan && docs.license) activeId = 'degree';
                            if (docs.aadhaar && docs.pan && docs.license && docs.degree) activeId = 'all_done';

                            const isActive = activeId === docItem.id;

                            return (
                                <div key={docItem.id} className="relative">
                                    {/* Timeline Dot */}
                                    <div className={`absolute -left-[37px] top-[38px] w-[14px] h-[14px] rounded-full z-10 ${isActive || isCompleted ? 'bg-[#227487]' : 'bg-[#D1D5DB]'}`}></div>
                                    
                                    <span className="block text-[#333] font-semibold text-[14px] mb-2">{docItem.label}</span>
                                    
                                    <div className="flex flex-col sm:flex-row items-end sm:items-center w-full">
                                        <div className={`flex items-center flex-1 border ${isActive ? 'bg-[#F0F8F9] border-[#CDE5E9]' : 'bg-[#F2F2F2] border-transparent'} rounded-l-[4px] rounded-r-[40px] p-3 pr-8 w-full`}>
                                            <div className="mr-6 ml-3">
                                                <svg className={`w-8 h-8 ${isActive || isCompleted ? 'text-[#227487]' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 13v4h-2v-4H8l4-4 4 4h-3zm-1-8V3.5L18.5 9H12z" />
                                                </svg>
                                            </div>
                                            <div className="relative flex flex-1 items-center border-[1.2px] border-gray-300 bg-white rounded-[2px] overflow-hidden w-full max-w-[320px]">
                                                <div className="bg-[#E5E5E5] px-4 py-[6px] text-[#333] text-[14px] font-medium border-r-[1.2px] border-gray-300 cursor-pointer flex-shrink-0">Choose File</div>
                                                <div className={`px-4 py-[6px] text-[14px] truncate w-full ${isCompleted ? 'text-[#333]' : 'text-gray-400'}`}>
                                                    {isCompleted ? docs[docItem.id].name : "No Choosen File Yet"}
                                                </div>
                                                <input 
                                                    type="file" 
                                                    className="absolute inset-0 opacity-0 cursor-pointer w-full" 
                                                    onChange={(e) => handleFileChange(e, docItem.id)} 
                                                    accept=".jpg,.jpeg,.png,.pdf" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right mt-1 mr-6 text-gray-500 text-[12px] font-medium">Max file size :3MB</div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            )}

            {/* SUBMIT BUTTON */}
            <div className="mt-4 flex justify-end w-[94%] max-w-[1000px] mb-10 mx-auto">
                <button
                    onClick={() => setStep(step < 4 ? step + 1 : step)}
                    className="bg-[#1C697B] text-white px-8 py-2.5 rounded-[5px] hover:shadow-md font-medium text-[16px] hover:bg-[#155462] transition-colors"
                >
                    {step === 4 ? "Done" : "Save & Continue"}
                </button>
            </div>
        </div >
    );
};

export default Adddoctor;