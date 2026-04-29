import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../../components/Patient/Patient_sidebar';
import Profile from '../../../components/Patient/Profile';
import Account from '../../../components/Patient/Account';
import Notification from '../../../components/Patient/notification';
import phImg from '../../../assets/ph.png';
import pen1 from '../../../assets/pen1.png';
import Info from './Info';
import { Search, Bell, Settings, ChevronLeft, ChevronRight, ChevronDown, Filter, MapPin } from 'lucide-react';

const Consultation_info = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const specialityName = location.state?.specialityName || 'Cardiology';
    const fromPath = location.state?.from;
    const [active, setActive] = useState(fromPath === 'Appointment' ? 'Appointments' : '');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);

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
        { id: 5, name: 'Dr. Sumaiya Javed', spec: 'Cardiologist', degree: 'MBBS, MD Physician, Post Graduate....', location: 'Gorakhpur', onlinePrice: 800, offlinePrice: 500 },
        { id: 6, name: 'Dr. Sumaiya Javed', spec: 'Cardiologist', degree: 'MBBS, MD Physician, Post Graduate....', location: 'Gorakhpur', onlinePrice: 800, offlinePrice: 500 },
    ];

    return (
        <div className="flex h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
             style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>
            
            {/* Sidebar */}
            <Sidebar 
                active={active} 
                setActive={setActive} 
                isMobileOpen={isMobileOpen} 
                setIsMobileOpen={setIsMobileOpen} 
            />

            {/* Main Content Wrapper - This gets blurred */}
            <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden transition-all duration-300 ${activeModal || isNotificationOpen || isInfoOpen ? 'blur-[4px] scale-[0.98]' : ''}`}>
                
                {/* Top Navbar */}
                <header className="h-[76px] flex items-center justify-between px-[24px] md:px-[48px] shrink-0 border-b border-white/5 mb-[8px] z-20">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsMobileOpen(true)}
                            className="lg:hidden text-white p-2 -ml-2 hover:bg-white/10 rounded-xl transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                        <button 
                            onClick={() => navigate('/Consultation1', { state: { from: fromPath } })}
                            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all border border-white/10 shrink-0 active:scale-90"
                        >
                            <ChevronLeft size={20} strokeWidth={3} />
                        </button>
                    </div>
                    <div className="flex-1 max-w-[280px] ml-6">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-white/10 border border-white/10 rounded-full py-[10px] px-[20px] text-white placeholder-white/40 text-[12px] outline-none focus:ring-2 focus:ring-[#6ED4D4]/50 transition-all font-medium"
                            />
                            <Search className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-white/40" />
                        </div>
                    </div>

                    <div className="flex items-center gap-[32px] ml-auto">
                        <span className="text-white/80 hover:text-white text-[13px] font-medium hidden md:block select-none cursor-pointer transition-colors">Language</span>
                        <div className="flex items-center gap-[20px]">
                            <button onClick={() => setIsNotificationOpen(true)} className="text-white hover:text-[#6ED4D4] transition-colors relative">
                                <Bell className="w-[22px] h-[22px]" />
                                <div className="absolute top-[2px] right-[2px] w-[6px] h-[6px] bg-[#E85B5A] rounded-full" />
                            </button>
                            <button onClick={() => navigate('/Setting')} className="text-white hover:text-[#6ED4D4] transition-colors">
                                <Settings className="w-[22px] h-[22px]" />
                            </button>
                            <div 
                                onClick={() => setActiveModal('profile')} 
                                className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform"
                            >
                                <img src={phImg} alt="User" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto no-scrollbar pb-[64px]">
                    <div className="px-[24px] md:px-[48px] pt-[12px] pb-[32px] shrink-0 w-full max-w-[1440px] mx-auto">
                        
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-white/60 text-[12px] mb-4">
                            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/Patient_dashboard')}>Home</span>
                            <ChevronRight size={12} />
                            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/Consultation1')}>Find Doctor</span>
                            <ChevronRight size={12} />
                            <span className="text-white font-bold">{specialityName}</span>
                        </div>

                        {/* Hero Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                            <div className="flex-1">
                                <h1 className="text-[32px] md:text-[36px] font-bold text-white tracking-tight leading-tight">
                                    Consult {specialityName.replace('Care', '').replace('Care', '').trim()}s Online - {specialityName.includes('Cardic') ? 'Heart' : specialityName} Specialists
                                </h1>
                            </div>
                            <div className="w-full md:w-[220px] bg-white/10 backdrop-blur-md rounded-xl p-1.5 border border-white/10 flex items-center justify-between text-white">
                                <div className="flex items-center gap-2 px-3">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                <div className="bg-white rounded-[24px] p-6 shadow-xl flex flex-col gap-6">
                                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                        <div className="flex items-center gap-2 text-[#0D1C2E]">
                                            <Filter size={18} />
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
                                    <div key={doc.id} className="bg-white rounded-[28px] p-5 shadow-xl hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-[#1A7785]/20 group flex flex-col md:flex-row gap-6 relative overflow-hidden">
                                        
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
                                    <button className="w-10 h-10 rounded-full bg-gray-200/50 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all"><ChevronLeft size={20} /></button>
                                    <button className="w-10 h-10 rounded-full bg-[#1A7785] text-white flex items-center justify-center text-[15px] font-bold shadow-lg">1</button>
                                    {[2, 3, 4, 5, 6].map(p => (
                                        <button key={p} className="w-10 h-10 rounded-full bg-transparent text-white/80 hover:bg-white/10 flex items-center justify-center text-[15px] font-bold transition-all">{p}</button>
                                    ))}
                                    <button className="w-10 h-10 rounded-full bg-gray-200/50 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all"><ChevronRight size={20} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modals */}
            {activeModal === 'profile' && (
                <Profile 
                    onClose={() => setActiveModal(null)} 
                    onAccountSettings={() => setActiveModal('account')} 
                />
            )}
            {activeModal === 'account' && (
                <Account onClose={() => setActiveModal(null)} />
            )}
            {isNotificationOpen && <Notification onClose={() => setIsNotificationOpen(false)} />}
            
            {isInfoOpen && (
                <Info 
                    doctor={selectedDoctor} 
                    onClose={() => setIsInfoOpen(false)} 
                />
            )}
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

export default Consultation_info;
