import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Save, X, Phone, User, Mail, Calendar, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BASE_URL from '../../baseUrl';

const Edit_profile = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    
    // Form States
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone_number: '',
        dob: '',
        gender: 'male',
        residental_address: '',
        emergency_contact_name: '',
        emergency_contact_number: '',
        profile_photo: null
    });

    const [previewUrl, setPreviewUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

    // 1. GET: Fetch Profile Data
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/Finallogin');
                return;
            }

            try {
                const response = await fetch(`${BASE_URL}/profile/edit-profile/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        full_name: data.full_name || '',
                        email: data.email || '',
                        phone_number: data.phone_number || '',
                        dob: data.dob || '',
                        gender: data.gender || 'male',
                        residental_address: data.residental_address || '',
                        emergency_contact_name: data.emergency_contact_name || '',
                        emergency_contact_number: data.emergency_contact_number || '',
                        profile_photo: null 
                    });
                    if (data.profile_photo) {
                        setPreviewUrl(data.profile_photo.startsWith('http') ? data.profile_photo : `${BASE_URL}${data.profile_photo}`);
                    }
                } else {
                    console.error("Failed to fetch profile");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    // 2. PUT: Save Profile Changes
    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setStatusMsg({ type: '', text: '' });

        const token = localStorage.getItem('token');
        const updateData = new FormData();
        
        Object.keys(formData).forEach(key => {
            if (key === 'profile_photo') {
                if (formData[key] instanceof File) {
                    updateData.append(key, formData[key]);
                }
            } else if (formData[key] !== null && formData[key] !== undefined) {
                updateData.append(key, formData[key]);
            }
        });

        try {
            const response = await fetch(`${BASE_URL}/profile/edit-profile/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: updateData
            });

            if (response.ok) {
                setStatusMsg({ type: 'success', text: 'Profile updated successfully!' });
                setTimeout(() => setStatusMsg({ type: '', text: '' }), 3000);
            } else {
                setStatusMsg({ type: 'error', text: 'Failed to update profile.' });
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setStatusMsg({ type: 'error', text: 'Error saving changes.' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, profile_photo: file });
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0A1D31] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div 
            className="min-h-screen w-full font-sans antialiased text-[#0D1C2E] p-2 md:p-6"
            style={{ background: 'linear-gradient(180deg, #0A1D31 0%, #306D82 45%, #A8DEE0 100%)' }}
        >
            <div className="max-w-4xl mx-auto">
                {/* Header Text */}
                <div className="mb-5 mt-2">
                    <h1 className="text-[28px] font-bold text-white mb-0.5">Edit Profile</h1>
                    <p className="text-white/70 text-[13px]">Manage your account settings.</p>
                </div>

                {/* Main Content Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#BECAD7] rounded-[24px] p-5 md:p-8 shadow-2xl relative"
                >
                    {/* Close Button */}
                    <button 
                        onClick={() => navigate(-1)}
                        className="absolute top-4 right-4 p-2 bg-white/30 hover:bg-white/50 rounded-full text-[#0D1C2E] transition-all group shadow-sm z-10"
                    >
                        <X size={20} className="group-hover:scale-110 transition-transform" />
                    </button>

                    <form onSubmit={handleSave} className="space-y-6">
                        {/* Profile Image Section */}
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden bg-[#243B53] flex items-center justify-center shadow-lg">
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={50} className="text-white/20" />
                                    )}
                                </div>
                                <button 
                                    type="button"
                                    onClick={() => fileInputRef.current.click()}
                                    className="absolute bottom-0.5 right-0.5 bg-[#1A7785] p-2 rounded-full border-2 border-white shadow-md hover:bg-[#165E68] transition-all"
                                >
                                    <Camera size={14} className="text-white" />
                                </button>
                                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
                            </div>
                            <div className="text-center mt-2">
                                <p className="font-bold text-[14px] text-[#0D1C2E]">Profile Photo</p>
                                <p className="text-[#5A6A7D] text-[9px] uppercase font-bold tracking-tight">PNG or JPG, max 5MB</p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-white/20 w-full"></div>

                        {/* Fields Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[#4B5E7F] uppercase tracking-wider ml-2">Full Name</label>
                                <input 
                                    type="text"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                                    placeholder="Enter name"
                                    className="w-full bg-white border-none py-2.5 px-6 rounded-full shadow-sm text-[14px] font-medium outline-none text-[#0D1C2E]"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[#4B5E7F] uppercase tracking-wider ml-2">Email Address</label>
                                <input 
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    placeholder="Email"
                                    className="w-full bg-white border-none py-2.5 px-6 rounded-full shadow-sm text-[14px] font-medium outline-none text-[#0D1C2E]"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[#4B5E7F] uppercase tracking-wider ml-2">Phone Number</label>
                                <input 
                                    type="text"
                                    value={formData.phone_number}
                                    onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                                    placeholder="Phone"
                                    className="w-full bg-white border-none py-2.5 px-6 rounded-full shadow-sm text-[14px] font-medium outline-none text-[#0D1C2E]"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[#4B5E7F] uppercase tracking-wider ml-2">Date of Birth</label>
                                <input 
                                    type="date"
                                    value={formData.dob}
                                    onChange={(e) => setFormData({...formData, dob: e.target.value})}
                                    className="w-full bg-white border-none py-2.5 px-6 rounded-full shadow-sm text-[14px] font-medium outline-none text-[#0D1C2E] [color-scheme:light]"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[#4B5E7F] uppercase tracking-wider ml-2">Gender</label>
                                <div className="relative">
                                    <select 
                                        value={formData.gender}
                                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                        className="w-full bg-white border-none py-2.5 px-6 rounded-full shadow-sm text-[14px] font-medium outline-none text-[#0D1C2E] appearance-none cursor-pointer"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#4B5E7F]">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1 md:col-span-2">
                                <label className="text-[10px] font-bold text-[#4B5E7F] uppercase tracking-wider ml-2">Residential Address</label>
                                <input 
                                    type="text"
                                    value={formData.residental_address}
                                    onChange={(e) => setFormData({...formData, residental_address: e.target.value})}
                                    placeholder="Address"
                                    className="w-full bg-white border-none py-2.5 px-6 rounded-full shadow-sm text-[14px] font-medium outline-none text-[#0D1C2E]"
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-white/20 w-full"></div>

                        {/* Emergency Contact */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="text-red-500 font-bold text-xl leading-none">*</span>
                                <h3 className="text-[14px] font-bold text-[#0D1C2E]">Emergency Contact</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-[#4B5E7F] uppercase tracking-wider ml-2">Contact Name</label>
                                    <input 
                                        type="text"
                                        value={formData.emergency_contact_name}
                                        onChange={(e) => setFormData({...formData, emergency_contact_name: e.target.value})}
                                        placeholder="Name"
                                        className="w-full bg-white border-none py-2 px-6 rounded-full shadow-sm text-[14px] outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-[#4B5E7F] uppercase tracking-wider ml-2">Contact Number</label>
                                    <input 
                                        type="text"
                                        value={formData.emergency_contact_number}
                                        onChange={(e) => setFormData({...formData, emergency_contact_number: e.target.value})}
                                        placeholder="Number"
                                        className="w-full bg-white border-none py-2 px-6 rounded-full shadow-sm text-[14px] outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Status Alert */}
                        <AnimatePresence>
                            {statusMsg.text && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={`p-2.5 rounded-lg text-center text-xs font-bold ${statusMsg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                                >
                                    {statusMsg.text}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Actions */}
                        <div className="flex justify-end items-center gap-6 pt-2">
                            <button 
                                type="button"
                                onClick={() => navigate(-1)}
                                className="text-[#4B5E7F] font-bold text-[13px] hover:underline"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                disabled={isSaving}
                                className="px-8 py-2.5 bg-[#144D5C] text-white rounded-full font-bold text-[13px] shadow-xl hover:bg-[#0E3D4A] transition-all transform active:scale-95 flex items-center gap-2"
                            >
                                {isSaving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Bottom Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pb-6">
                    <div className="bg-[#144D5C] p-4 rounded-[16px] shadow-lg flex flex-col gap-2">
                        <CheckCircle size={18} className="text-white/60" />
                        <div>
                            <p className="text-white font-bold text-[12px]">Account Verified</p>
                            <p className="text-white/50 text-[10px]">Oct 24.</p>
                        </div>
                    </div>

                    <div className="bg-[#144D5C] p-4 rounded-[16px] shadow-lg flex flex-col gap-2">
                        <AlertCircle size={18} className="text-white/60" />
                        <div>
                            <p className="text-white font-bold text-[12px]">Security</p>
                            <p className="text-white/50 text-[10px]">Updated 45 days ago.</p>
                        </div>
                    </div>

                    <div className="bg-[#144D5C] p-4 rounded-[16px] shadow-lg flex flex-col gap-2">
                        <Calendar size={18} className="text-white/60" />
                        <div>
                            <p className="text-white font-bold text-[12px]">Last Login</p>
                            <p className="text-white/50 text-[10px]">Today at 08:42 AM.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit_profile;
