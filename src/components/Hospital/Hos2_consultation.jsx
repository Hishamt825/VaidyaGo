import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HospitalNavbar from './HospitalNavbar';
import Hos_info from './Hos_info';
import phImg from '../../assets/ph.png';
import pen1 from '../../assets/pen1.png';
import { Search, Bell, Settings, ChevronLeft, ChevronRight, ChevronDown, Filter, MapPin } from 'lucide-react';

const Hos2_consultation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const specialityName = location.state?.specialityName || 'Cardiology';
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const toggleFilter = (filter) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter(f => f !== filter));
        } else {
            setSelectedFilters([...selectedFilters, filter]);
        }
    };

    const clearFilters = () => setSelectedFilters([]);

    const doctors = [
        { id: 1, name: 'Dr. Sumaiya Javed', spec: 'Cardiologist', degree: 'MBBS, MD Physician, Post Graduate....', location: 'Gorakhpur', onlinePrice: 800, offlinePrice: 500 },
        { id: 2, name: 'Dr. Sumaiya Javed', spec: 'Cardiologist', degree: 'MBBS, MD Physician, Post Graduate....', location: 'Gorakhpur', onlinePrice: 800, offlinePrice: 500 },
        { id: 3, name: 'Dr. Sumaiya Javed', spec: 'Cardiologist', degree: 'MBBS, MD Physician, Post Graduate....', location: 'Gorakhpur', onlinePrice: 800, offlinePrice: 500 },
        { id: 4, name: 'Dr. Sumaiya Javed', spec: 'Cardiologist', degree: 'MBBS, MD Physician, Post Graduate....', location: 'Gorakhpur', onlinePrice: 800, offlinePrice: 500 },
    ];

    return (
        <div className="min-h-screen bg-white font-sans">
            <HospitalNavbar />

            <main className="max-w-[1440px] mx-auto px-[24px] md:px-[48px] py-[32px]">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-gray-400 text-[12px] mb-6">
                    <span className="hover:text-[#19718A] cursor-pointer" onClick={() => navigate('/MainPage')}>Home</span>
                    <ChevronRight size={12} />
                    <span className="hover:text-[#19718A] cursor-pointer" onClick={() => navigate('/Hos_consultation')}>Find Doctor</span>
                    <ChevronRight size={12} />
                    <span className="text-[#0D1C2E] font-bold">{specialityName}</span>
                </div>

                {/* Hero Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div className="flex-1">
                        <h1 className="text-[32px] md:text-[36px] font-bold text-[#0D1C2E] tracking-tight leading-tight">
                            Consult {specialityName.replace('Care', '').replace('Care', '').trim()}s Online - {specialityName.includes('Cardic') ? 'Heart' : specialityName} Specialists
                        </h1>
                    </div>
                    <div className="w-full md:w-[220px] bg-gray-50 rounded-xl p-1.5 border border-gray-200 flex items-center justify-between text-[#0D1C2E]">
                        <div className="flex items-center gap-2 px-3">
                            <svg className="w-4 h-4 text-[#1A7785]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                            <span className="text-[13px] font-bold">Relevance</span>
                        </div>
                        <ChevronDown size={18} className="mr-2 opacity-60" />
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                    
                    {/* Filters Sidebar */}
                    <div className="hidden lg:block space-y-4">
                        <div className="bg-white rounded-[24px] p-6 shadow-xl border border-gray-100 flex flex-col gap-6">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-2 text-[#0D1C2E]">
                                    <Filter size={18} className="text-[#1A7785]" />
                                    <h3 className="font-semibold text-[15px]">Filters</h3>
                                </div>
                                <button 
                                    onClick={clearFilters}
                                    className="text-[#1A7785] text-[12px] font-bold uppercase tracking-wider hover:underline"
                                >
                                    Clear All
                                </button>
                            </div>

                            <button className="w-full bg-[#EBF7F8] text-[#1A7785] py-3 rounded-xl font-bold text-[13px] hover:bg-[#D6EFF1] transition-all">
                                Show Doctors near me
                            </button>

                            {/* Filter Groups */}
                            <div className="space-y-6">
                                <FilterGroup title="Mode of Consult" options={['Hospital Visit', 'Online Consult']} selected={selectedFilters} onToggle={toggleFilter} />
                                <FilterGroup title="Experience(years)" options={['0-5', '5-10', '10-15', '15+']} selected={selectedFilters} onToggle={toggleFilter} />
                                <FilterGroup title="Fees (In Rupees)" options={['100', '500', '1000', '1500+']} selected={selectedFilters} onToggle={toggleFilter} />
                                <FilterGroup title="Languages" options={['English', 'Hindi']} selected={selectedFilters} onToggle={toggleFilter} />
                                <FilterGroup title="Speciality" options={['Cardiology', 'Cardiology and Electrophysiology', 'Cardiothoracic & Vascular Surgery', 'General Physician']} selected={selectedFilters} onToggle={toggleFilter} />
                                <FilterGroup title="Facility" options={['VaidyaGo Hospital', 'Other Clinic']} selected={selectedFilters} onToggle={toggleFilter} />
                            </div>
                        </div>
                    </div>

                    {/* Doctor List */}
                    <div className="space-y-4">
                        {doctors.map(doc => (
                            <div key={doc.id} className="bg-white rounded-[28px] p-5 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#1A7785]/20 group flex flex-col md:flex-row gap-6 relative overflow-hidden">
                                
                                {/* Doctor Avatar */}
                                <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-2xl bg-[#F0F7F8] flex items-center justify-center shrink-0 overflow-hidden relative">
                                    <img src={pen1} alt="Doctor" className="w-full h-full object-cover" />
                                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>

                                {/* Doctor Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="mb-2">
                                        <h3 className="text-[20px] font-bold text-[#0D1C2E] leading-tight mb-1 group-hover:text-[#1A7785] transition-colors">{doc.name}</h3>
                                        <p className="text-[#1A7785] text-[14px] font-bold">{doc.spec}</p>
                                    </div>
                                    <p className="text-gray-400 text-[13px] font-medium leading-relaxed mb-1">{doc.degree}</p>
                                    <div className="flex items-center gap-1.5 text-gray-400 text-[12px] font-bold">
                                        <MapPin size={12} className="text-[#1A7785]" />
                                        {doc.location}
                                    </div>
                                </div>

                                {/* Pricing & Actions */}
                                <div className="flex flex-col md:flex-row items-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 md:min-w-[340px]">
                                    <div className="flex-1 w-full text-center md:text-right">
                                        <div className="mb-2">
                                            <span className="text-[24px] font-bold text-[#0D1C2E]">{doc.onlinePrice}</span>
                                        </div>
                                        <button className="w-full bg-[#1A7785] text-white py-2.5 px-4 rounded-xl font-bold text-[12px] hover:bg-[#15616D] transition-all flex flex-col items-center">
                                            <span>Online Consult</span>
                                            <span className="text-[10px] opacity-70 font-medium">Available tomorrow at 10:00AM</span>
                                        </button>
                                    </div>

                                    <div className="flex-1 w-full text-center md:text-right">
                                        <div className="mb-2">
                                            <span className="text-[24px] font-bold text-[#0D1C2E]">{doc.offlinePrice}</span>
                                        </div>
                                        <button 
                                            onClick={() => {
                                                setSelectedDoctor(doc);
                                                setIsInfoOpen(true);
                                            }}
                                            className="w-full bg-white border-2 border-[#1A7785] text-[#1A7785] py-2.5 px-4 rounded-xl font-bold text-[12px] hover:bg-[#F0F7F8] transition-all flex flex-col items-center"
                                        >
                                            <span>Available Doctor</span>
                                            <span className="text-[10px] opacity-70 font-medium">Available tomorrow at 9:00AM</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Pagination */}
                        <div className="flex items-center justify-center gap-2 pt-8">
                            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-all"><ChevronLeft size={20} /></button>
                            <button className="w-10 h-10 rounded-full bg-[#1A7785] text-white flex items-center justify-center text-[15px] font-bold shadow-lg">1</button>
                            {[2, 3, 4].map(p => (
                                <button key={p} className="w-10 h-10 rounded-full bg-transparent text-gray-400 hover:bg-gray-100 flex items-center justify-center text-[15px] font-bold transition-all">{p}</button>
                            ))}
                            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-all"><ChevronRight size={20} /></button>
                        </div>
                    </div>
                </div>
            </main>

            {isInfoOpen && (
                <Hos_info 
                    doctor={selectedDoctor} 
                    onClose={() => setIsInfoOpen(false)} 
                />
            )}
            
            {/* Simple footer for consistency */}
            <footer className="bg-[#19718A] text-white py-12 mt-20">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div>
                        <img src="/assets/logo.png" alt="Logo" className="w-48 mb-4 -ml-4" />
                        <p className="text-[14px] opacity-80">Serving your health needs since 1989.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="text-[14px] space-y-2 opacity-80">
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Services</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="text-[14px] space-y-2 opacity-80">
                            <li>FAQ</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Contact</h4>
                        <p className="text-[14px] opacity-80">+91 9879877801</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FilterGroup = ({ title, options, selected, onToggle }) => (
    <div className="space-y-3">
        <h4 className="font-semibold text-[13px] text-[#0D1C2E] uppercase tracking-wider">{title}</h4>
        <div className="space-y-2.5">
            {options.map((opt, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group" onClick={() => onToggle(opt)}>
                    <div className={`w-4 h-4 rounded border-2 transition-all flex items-center justify-center ${selected.includes(opt) ? 'border-[#1A7785] bg-[#1A7785]' : 'border-gray-200 bg-white group-hover:border-[#1A7785]'}`}>
                        <div className={`w-2 h-2 rounded-sm bg-white transition-transform ${selected.includes(opt) ? 'scale-100' : 'scale-0'}`}></div>
                    </div>
                    <span className={`text-[13px] font-medium transition-colors ${selected.includes(opt) ? 'text-[#0D1C2E] font-semibold' : 'text-gray-500 group-hover:text-[#0D1C2E]'}`}>{opt}</span>
                </label>
            ))}
        </div>
    </div>
);

export default Hos2_consultation;
