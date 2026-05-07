import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Side_app from './Side_app';
import phImg from '../../assets/ph.png';
import Profile from '../Admin/Profile';
import DasyWilliam from '../Admin/DasyWilliam';
import Notification from '../Patient/notification';
import { AnimatePresence } from 'framer-motion';

const recentPatientsData = [
    { name: "Riya madeshiya", gender: "Female", weight: "59kg", disease: "Typhoid", date: "14 feb", heartRate: "59 bpm", bloodType: "AB", status: "OutPatient" },
    { name: "Riya madeshiya", gender: "Female", weight: "59kg", disease: "Typhoid", date: "14 feb", heartRate: "59 bpm", bloodType: "AB", status: "OutPatient" },
    { name: "Riya madeshiya", gender: "Female", weight: "59kg", disease: "Typhoid", date: "14 feb", heartRate: "59 bpm", bloodType: "AB", status: "OutPatient" },
    { name: "Riya madeshiya", gender: "Female", weight: "59kg", disease: "Typhoid", date: "14 feb", heartRate: "59 bpm", bloodType: "AB", status: "OutPatient" },
    { name: "Riya madeshiya", gender: "Female", weight: "59kg", disease: "Typhoid", date: "14 feb", heartRate: "59 bpm", bloodType: "AB", status: "OutPatient" },
    { name: "Riya madeshiya", gender: "Female", weight: "59kg", disease: "Typhoid", date: "14 feb", heartRate: "59 bpm", bloodType: "AB", status: "OutPatient" },
    { name: "Riya madeshiya", gender: "Female", weight: "59kg", disease: "Typhoid", date: "14 feb", heartRate: "59 bpm", bloodType: "AB", status: "OutPatient" },
    { name: "Riya madeshiya", gender: "Female", weight: "59kg", disease: "Typhoid", date: "14 feb", heartRate: "59 bpm", bloodType: "AB", status: "OutPatient" },
    { name: "Riya madeshiya", gender: "Female", weight: "59kg", disease: "Typhoid", date: "14 feb", heartRate: "59 bpm", bloodType: "AB", status: "OutPatient" },
    { name: "Riya madeshiya", gender: "Female", weight: "59kg", disease: "Typhoid", date: "14 feb", heartRate: "59 bpm", bloodType: "AB", status: "OutPatient" },
    { name: "Riya madeshiya", gender: "Female", weight: "59kg", disease: "Typhoid", date: "14 feb", heartRate: "59 bpm", bloodType: "AB", status: "OutPatient" },
    { name: "Riya madeshiya", gender: "Female", weight: "59kg", disease: "Typhoid", date: "14 feb", heartRate: "59 bpm", bloodType: "AB", status: "OutPatient" },
    { name: "Riya madeshiya", gender: "Female", weight: "59kg", disease: "Typhoid", date: "14 feb", heartRate: "59 bpm", bloodType: "AB", status: "OutPatient" },
    { name: "Riya madeshiya", gender: "Female", weight: "59kg", disease: "Typhoid", date: "14 feb", heartRate: "59 bpm", bloodType: "AB", status: "OutPatient" },
    { name: "Riya madeshiya", gender: "Female", weight: "59kg", disease: "Typhoid", date: "14 feb", heartRate: "59 bpm", bloodType: "AB", status: "OutPatient" },
    { name: "Riya madeshiya", gender: "Female", weight: "59kg", disease: "Typhoid", date: "14 feb", heartRate: "59 bpm", bloodType: "AB", status: "OutPatient" },
    { name: "Riya madeshiya", gender: "Female", weight: "59kg", disease: "Typhoid", date: "14 feb", heartRate: "59 bpm", bloodType: "AB", status: "OutPatient" },
    { name: "Riya madeshiya", gender: "Female", weight: "59kg", disease: "Typhoid", date: "14 feb", heartRate: "59 bpm", bloodType: "AB", status: "OutPatient" },
    { name: "Riya madeshiya", gender: "Female", weight: "59kg", disease: "Typhoid", date: "14 feb", heartRate: "59 bpm", bloodType: "AB", status: "OutPatient" },
    { name: "Riya madeshiya", gender: "Female", weight: "59kg", disease: "Typhoid", date: "14 feb", heartRate: "59 bpm", bloodType: "AB", status: "OutPatient" },
];

const Recent_patient = () => {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('Patients');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const menuRef = useRef(React.createRef()); // Use React.createRef if useRef is not imported from react, but it is in line 1.
    // Wait, useRef is imported in line 1? Let me check.
    // Line 1: import React, { useState } from 'react';
    // Ah, useRef is NOT imported. I'll add it.

    return (
        <div className="flex h-screen w-full bg-white font-sans text-sm overflow-hidden text-gray-700">
            {/* Sidebar */}
            <Side_app active={activeNav} setActive={setActiveNav} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

            {/* Main Content */}
            <main className="flex-1 flex flex-col bg-white overflow-hidden">
                {/* Top Header */}
                <header className="h-[74px] flex flex-row items-center justify-between px-4 md:px-8 shrink-0 bg-white border-b border-gray-100">
                    <div className="flex items-center flex-1 max-w-[700px] gap-[10px] md:gap-[15px]">
                        <button 
                            onClick={() => setIsMobileOpen(true)}
                            className="w-[40px] h-[40px] border border-gray-200 rounded-[8px] flex flex-col items-center justify-center gap-[4px] bg-white hover:bg-gray-50 transition-colors shrink-0 shadow-sm lg:hidden"
                        >
                            <span className="w-[18px] h-[2px] bg-[#1b738c] rounded-full"></span>
                            <span className="w-[18px] h-[2px] bg-[#1b738c] rounded-full opacity-60"></span>
                            <span className="w-[18px] h-[2px] bg-[#1b738c] rounded-full"></span>
                        </button>
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-[16px] flex items-center pointer-events-none">
                                <svg className="w-[18px] h-[18px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </div>
                            <input type="text" placeholder="Search" className="w-full pl-[40px] pr-4 py-[9px] bg-white border border-gray-200 rounded-full text-[13.5px] text-gray-700 outline-none focus:border-[#1b738c] transition-all" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full md:w-auto gap-4">
                        <div className="flex items-center gap-3">
                            {/* Settings */}
                            <div 
                                onClick={() => navigate('/Settingpage')}
                                className="w-14 h-12 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 group">
                                <svg className="w-7 h-7 text-gray-700 group-hover:text-[#1b738c] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>

                            {/* Notification */}
                            <div 
                                onClick={() => setIsNotificationOpen(true)}
                                className="w-14 h-12 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-all relative">
                                <svg className="w-7 h-7 text-gray-700 hover:text-[#1b738c] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#9367D8] rounded-full flex items-center justify-center text-white text-[11px] font-bold border-2 border-white shadow-sm">1</div>
                            </div>
                        </div>

                        <div className="relative" ref={menuRef}>
                            {/* Profile Button */}
                            <div
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-4 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-xl px-4 py-1 cursor-pointer hover:bg-gray-50 transition-all"
                            >
                                <span className="text-[18px] font-semibold text-gray-700 hidden lg:inline">Dasy William</span>
                                <img src="/assets/ph.png" className="w-11 h-11 rounded-full border-black/50 rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.12)] object-cover" />
                            </div>

                            <AnimatePresence>
                                {open && !openProfile && (
                                    <DasyWilliam setOpenProfile={setOpenProfile} />
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-auto bg-white p-8 min-h-0">
                    <div className="max-w-[1400px] mx-auto bg-white border border-gray-100 rounded-3xl shadow-sm p-6">
                        <div className="mb-6 px-4">
                            <h1 className="text-[30px] font-bold text-[#111] mb-4">Recent Patients</h1>
                            <div className="h-[1.5px] bg-gray-50 -mx-6"></div>
                        </div>

                        {/* Table Header Wrapper */}
                        <div className="overflow-x-auto">
                            {/* Header Labels (From App1_Dashboard) */}
                            <div className="flex px-[18px] mb-[12px] text-[15px] font-bold text-gray-400 border-b border-gray-50 pb-[10px]">
                                <div className="flex-[2] min-w-[200px]">Name</div>
                                <div className="flex-1 text-center">Gender</div>
                                <div className="flex-1 text-center">Weight</div>
                                <div className="flex-1 text-center">Disease</div>
                                <div className="flex-1 text-center">Date</div>
                                <div className="flex-1 text-center">Heart Rate</div>
                                <div className="flex-1 text-center">Blood Type</div>
                                <div className="flex-1 text-right">Status</div>
                            </div>

                            {/* Patient Rows (From App1_Dashboard, repeated multiple times) */}
                            <div className="flex flex-col gap-[8px]">
                                {Array.from({ length: 40 }).map((_, i) => (
                                    <div key={i} className="border border-gray-200 rounded-xl p-[10px] flex items-center text-[16px] font-semibold text-[#333] bg-white group hover:border-[#32869e]/30 hover:shadow-md hover:shadow-[#32869e]/5 transition-all duration-300">
                                        <div className="flex-[2] min-w-[200px] flex items-center gap-[12px]">
                                            <div className="w-[40px] h-[40px] rounded-full overflow-hidden shrink-0 border-2 border-gray-50">
                                                <img src={phImg} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <span className="truncate group-hover:text-[#32869e] transition-colors">Riya madeshiya</span>
                                        </div>
                                        <div className="flex-1 text-center text-gray-500 font-medium">Female</div>
                                        <div className="flex-1 text-center text-gray-500 font-medium">59kg</div>
                                        <div className="flex-1 text-center text-gray-500 font-medium">Typhoid</div>
                                        <div className="flex-1 text-center text-gray-500 font-medium">14 feb</div>
                                        <div className="flex-1 text-center text-gray-500 font-medium">59 bpm</div>
                                        <div className="flex-1 text-center text-gray-500 font-medium">AB</div>
                                        <div className="flex-1 text-right text-[#111] font-bold">OutPatient</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Recent_patient;
