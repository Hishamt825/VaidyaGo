import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Side_app from './Side_app';
import phImg from '../../assets/ph.png';

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

    return (
        <div className="flex h-screen w-full bg-white font-sans text-sm overflow-hidden text-gray-700">
            {/* Sidebar */}
            <Side_app active={activeNav} setActive={setActiveNav} />

            {/* Main Content */}
            <main className="flex-1 flex flex-col bg-white overflow-hidden">
                <div className="flex-1 overflow-auto bg-[#f8fafc] p-8 min-h-0">
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
