import React, { useState } from 'react';
import phImg from '../../assets/ph.png';

const ToggleSwitch = ({ enabled, setEnabled }) => (
    <button
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-[24px] w-[46px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-[#16879B]' : 'bg-gray-300'
            }`}
    >
        <span
            className={`pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-[22px]' : 'translate-x-0'
                }`}
        />
    </button>
);

const Account = ({ onClose }) => {
    const [autoUpdate, setAutoUpdate] = useState(true);
    const [dataSharing, setDataSharing] = useState(false);
    
    // Editable states
    const [name, setName] = useState("Dr. Abhinav Vaidya");
    const [email, setEmail] = useState("dr.vaidya@vaidyago.com");
    const [phone, setPhone] = useState("+91 98765 43210");
    const [clinicianId, setClinicianId] = useState("VG-9921-MED");

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-[16px] sm:p-[40px]">
            <div
                className="w-full max-w-[1240px] max-h-full overflow-y-auto rounded-[24px] shadow-2xl font-sans antialiased px-[24px] py-[32px] md:px-[40px] md:py-[40px] no-scrollbar relative"
                style={{ background: 'linear-gradient(180deg, #0A1637 0%, #1D697B 38%, #49ABB5 70%, #d8e6ea 100%)' }}
            >
                {/* Close Button top right */}
                <button 
                    onClick={onClose}
                    className="absolute top-[20px] right-[20px] w-[36px] h-[36px] bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                >
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="mx-auto w-full">

                {/* ── Top Header ── */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-[32px] gap-[16px]">
                    <div>
                        <h1 className="text-[32px] font-bold text-white tracking-tight leading-tight">Account Settings</h1>
                        <p className="text-[14px] text-white/80 font-medium mt-[2px]">
                            Manage your clinical profile, security, and global preferences.
                        </p>
                    </div>
                    <div className="flex items-center gap-[16px]">
                        <button onClick={onClose} className="px-[20px] py-[10px] rounded-full border border-white/30 text-white text-[13.5px] font-semibold hover:bg-white/10 transition-colors">
                            Discard Changes
                        </button>
                        <button onClick={onClose} className="px-[20px] py-[10px] rounded-full bg-[#52BFC9] hover:bg-[#3facb6] text-white text-[13.5px] font-semibold shadow-md transition-colors">
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* ── Main Grid ── */}
                <div className="flex flex-col gap-[24px]">

                    {/* Row 1: Account Details & Preferences */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-[24px]">
                        
                        {/* Account Details Card */}
                        <div className="bg-white rounded-[24px] p-[32px] shadow-sm">
                            <div className="flex items-center gap-[10px] mb-[24px]">
                                <svg className="w-[20px] h-[20px] text-[#2C4A5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <h2 className="text-[18px] font-bold text-[#0D1C2E]">Account Details</h2>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-[32px]">
                                {/* Avatar */}
                                <div className="shrink-0 relative self-start">
                                    <div className="w-[110px] h-[110px] rounded-full overflow-hidden bg-[#0A1637] border-4 border-white shadow-md">
                                        <img src={phImg} alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                    <button className="absolute bottom-[4px] right-[4px] w-[28px] h-[28px] bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-colors">
                                        <svg className="w-[14px] h-[14px] text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Editable Fields */}
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-[20px] gap-y-[24px]">
                                    <div>
                                        <label className="block text-[11px] font-black tracking-widest text-[#5A6A7D] uppercase mb-[8px]">
                                            Full Name
                                        </label>
                                        <input 
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-[16px] py-[12px] bg-[#EEF2F6] rounded-[8px] text-[15px] font-medium text-[#0D1C2E] border border-transparent focus:border-[#16879B] focus:bg-white outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black tracking-widest text-[#5A6A7D] uppercase mb-[8px]">
                                            Email Address
                                        </label>
                                        <input 
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-[16px] py-[12px] bg-[#EEF2F6] rounded-[8px] text-[15px] font-medium text-[#0D1C2E] border border-transparent focus:border-[#16879B] focus:bg-white outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black tracking-widest text-[#5A6A7D] uppercase mb-[8px]">
                                            Phone Number
                                        </label>
                                        <input 
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full px-[16px] py-[12px] bg-[#EEF2F6] rounded-[8px] text-[15px] font-medium text-[#0D1C2E] border border-transparent focus:border-[#16879B] focus:bg-white outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black tracking-widest text-[#5A6A7D] uppercase mb-[8px]">
                                            Clinician ID
                                        </label>
                                        <input 
                                            type="text"
                                            value={clinicianId}
                                            onChange={(e) => setClinicianId(e.target.value)}
                                            className="w-full px-[16px] py-[12px] bg-[#E3E9EE] rounded-[8px] text-[15px] font-medium text-[#5A6A7D] border border-transparent focus:border-[#16879B] focus:bg-white outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Preferences Card */}
                        <div className="bg-white rounded-[24px] p-[32px] shadow-sm flex flex-col">
                            <div className="flex items-center gap-[10px] mb-[28px]">
                                <svg className="w-[20px] h-[20px] text-[#2C4A5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                                <h2 className="text-[18px] font-bold text-[#0D1C2E]">Preferences</h2>
                            </div>

                            <div className="flex flex-col gap-[28px]">
                                {/* Language */}
                                <div>
                                    <label className="block text-[11px] font-black tracking-widest text-[#5A6A7D] uppercase mb-[8px]">
                                        Language
                                    </label>
                                    <div className="relative">
                                        <select className="w-full appearance-none bg-white border border-[#D5E1E6] text-[#0D1C2E] text-[14.5px] font-medium rounded-[8px] px-[16px] py-[12px] outline-none focus:border-[#16879B] transition-colors cursor-pointer">
                                            <option>English (United Kingdom)</option>
                                            <option>English (US)</option>
                                            <option>Hindi</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-[16px] text-[#5A6A7D]">
                                            <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Timezone */}
                                <div>
                                    <label className="block text-[11px] font-black tracking-widest text-[#5A6A7D] uppercase mb-[8px]">
                                        Timezone
                                    </label>
                                    <div className="relative">
                                        <select className="w-full appearance-none bg-white border border-[#D5E1E6] text-[#0D1C2E] text-[14.5px] font-medium rounded-[8px] px-[16px] py-[12px] outline-none focus:border-[#16879B] transition-colors cursor-pointer">
                                            <option>GMT +05:30 (Mumbai, India)</option>
                                            <option>GMT +00:00 (London)</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-[16px] text-[#5A6A7D]">
                                            <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Auto Updates Toggle */}
                            <div className="mt-auto pt-[28px]">
                                <div className="flex flex-row items-center justify-between p-[16px] bg-white border border-[#D5E1E6] rounded-[12px]">
                                    <span className="text-[14px] font-bold text-[#0D1C2E]">Automatic Updates</span>
                                    <ToggleSwitch enabled={autoUpdate} setEnabled={setAutoUpdate} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Security Settings */}
                    <div className="bg-white rounded-[24px] p-[32px] shadow-sm">
                        <div className="flex items-center justify-between mb-[24px]">
                            <div className="flex items-center gap-[10px]">
                                <svg className="w-[20px] h-[20px] text-[#2C4A5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <h2 className="text-[18px] font-bold text-[#0D1C2E]">Security Settings</h2>
                            </div>
                            <span className="bg-[#E6F4F1] text-[#1D7A75] text-[12px] font-bold px-[12px] py-[4px] rounded-full">
                                Verified
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
                            {/* 2FA Card */}
                            <div className="bg-[#F4F7F9] rounded-[16px] p-[24px] flex flex-col">
                                <h3 className="text-[16px] font-bold text-[#0D1C2E] mb-[8px]">Two-Factor Authentication</h3>
                                <p className="text-[13px] text-[#5A6A7D] leading-[1.6] mb-[24px]">
                                    Add an extra layer of security to your account.
                                </p>
                                <button className="mt-auto text-[14px] font-bold text-[#16879B] flex items-center gap-[6px] hover:text-[#0f5c6b] transition-colors self-start">
                                    Manage 2FA
                                    <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </button>
                            </div>

                            {/* Password Card */}
                            <div className="bg-[#F4F7F9] rounded-[16px] p-[24px] flex flex-col">
                                <h3 className="text-[16px] font-bold text-[#0D1C2E] mb-[8px]">Update Password</h3>
                                <p className="text-[13px] text-[#5A6A7D] leading-[1.6] mb-[24px]">
                                    Change your password regularly for better security.
                                </p>
                                <button className="mt-auto text-[14px] font-bold text-[#16879B] flex items-center gap-[6px] hover:text-[#0f5c6b] transition-colors self-start">
                                    Change Password
                                    <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </button>
                            </div>

                            {/* Login History Card */}
                            <div className="bg-[#F9F4F4] rounded-[16px] p-[24px] border border-red-100/50 flex flex-col">
                                <h3 className="text-[16px] font-bold text-[#C62B2B] mb-[8px]">Login History</h3>
                                <p className="text-[13px] text-[#5A6A7D] leading-[1.6] mb-[24px]">
                                    Review your recent activity and logged-in devices.
                                </p>
                                <button className="mt-auto text-[14px] font-bold text-[#C62B2B] flex items-center gap-[6px] hover:text-[#a02222] transition-colors self-start">
                                    View Sessions
                                    <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Privacy & Data / Critical Actions */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-[24px]">
                        
                        {/* Privacy & Data Management */}
                        <div className="bg-[#DEE7EB] rounded-[24px] p-[32px] shadow-sm">
                            <div className="flex items-center gap-[10px] mb-[24px]">
                                <svg className="w-[20px] h-[20px] text-[#4A5D68]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <h2 className="text-[18px] font-bold text-[#0D1C2E]">Privacy & Data Management</h2>
                            </div>

                            <div className="flex flex-col gap-[16px]">
                                {/* Data Sharing */}
                                <div className="flex items-center justify-between p-[20px] bg-white rounded-[12px] shadow-sm">
                                    <div>
                                        <h4 className="text-[14.5px] font-bold text-[#0D1C2E]">Data Sharing</h4>
                                        <p className="text-[12.5px] text-[#5A6A7D] mt-[2px]">Allow anonymized data for research purposes.</p>
                                    </div>
                                    <ToggleSwitch enabled={dataSharing} setEnabled={setDataSharing} />
                                </div>

                                {/* Profile Visibility */}
                                <div className="flex items-center justify-between p-[20px] bg-white rounded-[12px] shadow-sm">
                                    <div>
                                        <h4 className="text-[14.5px] font-bold text-[#0D1C2E]">Profile Visibility</h4>
                                        <p className="text-[12.5px] text-[#5A6A7D] mt-[2px]">Manage who can see your clinical achievements.</p>
                                    </div>
                                    <div className="flex items-center gap-[8px] text-[13px] font-bold text-[#16879B] cursor-pointer hover:text-[#0f5c6b]">
                                        Internal Only
                                        <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>

                                {/* HIPAA Logs */}
                                <div className="flex items-center justify-between p-[20px] bg-white rounded-[12px] shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                                    <div>
                                        <h4 className="text-[14.5px] font-bold text-[#0D1C2E]">HIPAA Logs</h4>
                                        <p className="text-[12.5px] text-[#5A6A7D] mt-[2px]">Download your compliance audit logs.</p>
                                    </div>
                                    <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-[#16879B]">
                                        <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Critical Actions */}
                        <div className="bg-transparent rounded-[24px] p-[32px] flex flex-col border border-white/30 shadow-sm relative overflow-hidden">
                            {/* Subtle underglow or completely transparent */}
                            <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] pointer-events-none"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-[10px] mb-[20px]">
                                    <svg className="w-[22px] h-[22px] text-[#C62B2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h2 className="text-[20px] font-bold text-[#C62B2B]">Critical Actions</h2>
                                </div>

                                <p className="text-[14px] text-[#334c59] leading-[1.6] mb-[32px] font-medium pr-[16px]">
                                    Deactivating your account will immediately revoke access to all patient records and clinical tools. This action is reversible for 30 days.
                                </p>

                                <button className="w-full py-[14px] rounded-[12px] bg-white text-[#C62B2B] text-[15px] font-extrabold shadow-sm border border-red-100 hover:shadow-md hover:bg-red-50 transition-all mb-[20px]">
                                    Deactivate Account
                                </button>

                                <button className="w-full py-[10px] text-[#4a5c68] text-[14px] font-medium hover:text-[#334c59] transition-colors mt-auto">
                                    Request Data Deletion
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default Account;
