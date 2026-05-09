import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Side_app from '../Appoinment/Side_app';
import phImg from '../../assets/ph.png';
import { useState } from 'react';

const appRequestsData = [
    { name: "Riya madeshiya", gender: "Female", age: 30, treatment: "Regular Checkup", time: "10 am", date: "13 feb 2026" },
    { name: "Riya madeshiya", gender: "Female", age: 30, treatment: "Regular Checkup", time: "10 am", date: "13 feb 2026" },
    { name: "Riya madeshiya", gender: "Female", age: 30, treatment: "Regular Checkup", time: "10 am", date: "13 feb 2026" },
    { name: "Riya madeshiya", gender: "Female", age: 30, treatment: "Regular Checkup", time: "10 am", date: "13 feb 2026" },
    { name: "Riya madeshiya", gender: "Female", age: 30, treatment: "Regular Checkup", time: "10 am", date: "13 feb 2026" },
    { name: "Riya madeshiya", gender: "Female", age: 30, treatment: "Regular Checkup", time: "10 am", date: "13 feb 2026" },
    { name: "Riya madeshiya", gender: "Female", age: 30, treatment: "Regular Checkup", time: "10 am", date: "13 feb 2026" },
    { name: "Riya madeshiya", gender: "Female", age: 30, treatment: "Regular Checkup", time: "10 am", date: "13 feb 2026" },
];

const AppointmentRequests = () => {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('Appointment');

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans antialiased overflow-hidden">
            <Side_app activeNav={activeNav} setActiveNav={setActiveNav} />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="w-full px-4">
                        <header className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => navigate(-1)}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all shadow-sm"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <div>
                                    <h1 className="text-[24px] font-bold text-gray-800 tracking-tight">Appointment Requests</h1>
                                    <p className="text-[14px] text-gray-500 font-medium">Manage your incoming patient appointments</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-[14px] font-bold text-gray-700">{appRequestsData.length} New Requests</span>
                            </div>
                        </header>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {appRequestsData.map((req, idx) => (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    key={idx} 
                                    className="bg-white border border-gray-300 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gray-400 transition-all group"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100 shrink-0 group-hover:scale-105 transition-transform">
                                                <img src={phImg} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-[18px] font-bold text-gray-800 leading-tight">{req.name}</p>
                                                <p className="text-[14px] text-gray-400 font-bold mt-1">{req.gender} , {req.age} yrs</p>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                                            <p className="text-[11px] font-bold text-gray-400">{req.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 pt-4 border-t border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#32869e]">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#32869e]">{req.treatment}</p>
                                                    <p className="text-[12px] text-gray-400 font-bold uppercase mt-0.5">{req.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 mt-1">
                                            <button className="bg-[#22c55e] hover:bg-[#16a34a] text-white py-3 rounded-xl text-[14px] font-bold shadow-lg shadow-green-500/10 transition-all active:scale-95">
                                                Accept
                                            </button>
                                            <button className="bg-[#f87171] hover:bg-[#ef4444] text-white py-3 rounded-xl text-[14px] font-bold shadow-lg shadow-red-500/10 transition-all active:scale-95">
                                                Decline
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppointmentRequests;
