import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import logoUrl from '../../assets/v.png';
import img1 from '../../assets/Ellipse.svg';
import Side_app from './Side_app';







const App_Dashboard = () => {

    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('Appointment');




    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const [selectedPatientForDetails, setSelectedPatientForDetails] = useState(null);

    // Date Logic
    const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 13)); // 13 Feb 2026

    const handlePrevDay = () => {
        const prev = new Date(currentDate);
        prev.setDate(prev.getDate() - 1);
        setCurrentDate(prev);
    };

    const handleNextDay = () => {
        const next = new Date(currentDate);
        next.setDate(next.getDate() + 1);
        setCurrentDate(next);
    };

    const formattedDate = currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ');

    // Setup tabs
    const statusTabs = ['ALL', 'CONFIRMED', 'PENDING', 'CANCELLED'];
    const [activeTab, setActiveTab] = useState('CONFIRMED');
    const [tabStyle, setTabStyle] = useState({ left: 0, width: 0 });
    const tabsRef = useRef([]);

    useEffect(() => {
        // Small delay to ensure refs are attached and layout is computed on first render
        const timeoutId = setTimeout(() => {
            const activeIndex = statusTabs.indexOf(activeTab);
            const activeEl = tabsRef.current[activeIndex];
            if (activeEl) {
                setTabStyle({
                    left: activeEl.offsetLeft,
                    width: activeEl.offsetWidth,
                });
            }
        }, 10);
        return () => clearTimeout(timeoutId);
    }, [activeTab]);

    // Mock data arrays matching the screenshot
    const appointments = Array.from({ length: 15 }).map((_, index) => ({
        id: index,
        name: 'Saumya tiwari',
        gender: 'Female',
        age: 21,
        date: '14 feb 26',
        time: '2:00-3:30 am',
        status: 'Confirmed',
        img: img1,
    }));

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(appointments.map(a => a.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
            setSelectAll(false);
        } else {
            const newSelected = [...selectedRows, id];
            setSelectedRows(newSelected);
            if (newSelected.length === appointments.length) setSelectAll(true);
        }
    };

    // Draggable logic for the floating bot
    const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0, hasMoved: false });

    const handlePointerDown = (e) => {
        setIsDragging(true);
        const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
        const clientY = e.clientY ?? (e.touches && e.touches[0].clientY);

        dragRef.current = {
            startX: clientX,
            startY: clientY,
            initialX: dragPos.x,
            initialY: dragPos.y,
            hasMoved: false
        };
    };

    useEffect(() => {
        const handlePointerMove = (e) => {
            if (!isDragging) return;
            const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
            const clientY = e.clientY ?? (e.touches && e.touches[0].clientY);

            const dx = clientX - dragRef.current.startX;
            const dy = clientY - dragRef.current.startY;

            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
                dragRef.current.hasMoved = true;
            }

            setDragPos({
                x: dragRef.current.initialX + dx,
                y: dragRef.current.initialY + dy
            });
        };

        const handlePointerUp = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener('mousemove', handlePointerMove);
            window.addEventListener('mouseup', handlePointerUp);
            window.addEventListener('touchmove', handlePointerMove, { passive: false });
            window.addEventListener('touchend', handlePointerUp);
        }
        return () => {
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('mouseup', handlePointerUp);
            window.removeEventListener('touchmove', handlePointerMove);
            window.removeEventListener('touchend', handlePointerUp);
        };
    }, [isDragging]);

    return (
        <div className="flex h-screen w-full bg-white font-sans text-sm overflow-hidden text-gray-700">

            {/* Sidebar */}
            <Side_app active={activeNav} setActive={setActiveNav} />


            {/* Main Content */}
            <main className="flex-1 flex flex-col bg-white overflow-hidden">

                {/* Top Header */}
                <header className="h-[74px] flex flex-row items-center justify-between px-8 shrink-0 bg-white">

                    <div className="flex items-center flex-1 max-w-[700px] gap-[12px]">
                        {/* Hamburger */}
                        <button className="w-[38px] h-[38px] border-[1.5px] border-gray-600 rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col items-start justify-center pl-[9px] gap-[3px] bg-white hover:bg-gray-50 transition-colors shrink-0">
                            <span className="w-[17px] h-[2px] bg-[#4880b9] rounded-full"></span>
                            <span className="w-[13px] h-[2px] bg-[#89b3d0] rounded-full"></span>
                            <span className="w-[17px] h-[2px] bg-[#4880b9] rounded-full"></span>
                            <span className="w-[13px] h-[2px] bg-[#89b3d0] rounded-full"></span>
                        </button>

                        {/* Search Bar */}
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-[16px] flex items-center pointer-events-none">
                                <svg className="w-[16px] h-[16px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-[40px] pr-4 py-[9px] bg-white border border-gray-600 rounded-full text-[13.5px] text-gray-700 outline-none focus:border-[#468e9f]"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-[10px]">
                        {/* Settings Icon */}
                        <button className="w-[38px] h-[38px] bg-white border border-gray-600 rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex items-center justify-center text-black hover:bg-gray-50 transition-colors">
                            <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>

                        {/* Notification Icon */}
                        <button className="relative w-[38px] h-[38px] bg-white border border-gray-600 rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex items-center justify-center text-[#112330] hover:bg-gray-50 transition-colors">
                            <svg className="w-[19px] h-[19px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <div className="absolute top-[4px] right-[5px] bg-[#6c2da8] text-white text-[9px] font-bold w-[14px] h-[14px] flex items-center justify-center rounded-full border-none shadow-sm leading-none">
                                1
                            </div>
                        </button>

                        {/* Make Appointment Button */}
                        <button className="bg-[#94b8c0] hover:bg-[#85abb2] text-[#1c3947] font-semibold text-[13.5px] py-0 h-[38px] px-[12px] rounded-[6px] flex items-center gap-[6px] transition-colors shadow-sm ml-1">
                            <div className="w-[18px] h-[18px] bg-white rounded-full flex items-center justify-center shrink-0">
                                <svg className="w-[12px] h-[12px] text-[#94b8c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m-8-8h16" />
                                </svg>
                            </div>
                            Make Appointment
                        </button>
                    </div>
                </header>

                {/* Toolbar (Date & View tabs) */}
                <div className="px-8 py-3 shrink-0 w-full flex flex-col mt-2">

                    {/* Top Date Nav */}
                    <div className="flex items-center gap-[10px] mb-5 pl-1">
                        <button onClick={handlePrevDay} className="w-[28px] h-[28px] rounded-full bg-[#e2e8f0] flex items-center justify-center text-gray-500 hover:bg-gray-300 transition-colors">
                            <svg className="w-4 h-4 ml-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <span className="font-[600] text-[15px] text-[#555] tracking-wide relative top-[1px] min-w-[95px] text-center">{formattedDate}</span>
                        <button onClick={handleNextDay} className="w-[28px] h-[28px] rounded-full bg-[#e2e8f0] flex items-center justify-center text-gray-500 hover:bg-gray-300 transition-colors">
                            <svg className="w-4 h-4 mr-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>

                    {/* Tabs Row */}
                    <div className="bg-white border border-gray-600 rounded-full h-[46px] flex items-center px-[5px] justify-between shadow-[0_2px_10px_rgba(0,0,0,0.03)] w-full">
                        <div className="relative flex items-center h-full gap-[24px] px-[8px]">
                            {/* Animated Background */}
                            <div
                                className="absolute h-[34px] bg-[#339eb3] rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-0"
                                style={{ left: tabStyle.left, width: tabStyle.width }}
                            ></div>

                            {statusTabs.map((tab, idx) => {
                                const isActive = activeTab === tab;
                                return (
                                    <button
                                        key={tab}
                                        ref={el => tabsRef.current[idx] = el}
                                        onClick={() => setActiveTab(tab)}
                                        className={`relative z-10 font-[600] text-[13px] px-[20px] py-[6px] tracking-wider transition-colors uppercase whitespace-nowrap ${isActive ? 'text-white' : 'text-gray-600 hover:text-gray-800'}`}
                                    >
                                        {tab}
                                    </button>
                                )
                            })}
                        </div>
                        <div className="flex items-center gap-[16px] pr-[16px]">
                            {/* Grid Icon (Inactive) */}
                            <button className="text-gray-500 hover:text-gray-700 transition-colors">
                                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2.5" />
                                    <line x1="3" y1="9" x2="21" y2="9" />
                                    <line x1="3" y1="15" x2="21" y2="15" />
                                    <line x1="12" y1="9" x2="12" y2="21" />
                                </svg>
                            </button>
                            {/* List Icon (Active, Teal) */}
                            <button className="text-[#1a899f] transition-colors">
                                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2.5" />
                                    <line x1="3" y1="9" x2="21" y2="9" />
                                    <line x1="3" y1="15" x2="21" y2="15" />
                                    <rect x="6" y="5.5" width="2.5" height="2.5" fill="currentColor" stroke="none" />
                                    <rect x="6" y="11.5" width="2.5" height="2.5" fill="currentColor" stroke="none" />
                                    <rect x="6" y="17.5" width="2.5" height="2.5" fill="currentColor" stroke="none" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Area */}
                <div className="flex-1 overflow-auto p-4 pl-6 pr-6">
                    <div className="w-full border border-gray-600 rounded-[10px] overflow-hidden flex flex-col pt-1">

                        {/* Table Header */}
                        <div className="grid grid-cols-[auto_1.5fr_1fr_1fr_1fr_1.5fr_1fr_auto] gap-4 items-center px-4 py-3 border-b border-gray-600 text-[9px] font-extrabold text-black tracking-wide uppercase">
                            <div className="w-4" /> {/* Checkbox placeholder space */}
                            <div>Patient Name</div>
                            <div>Gender</div>
                            <div className="text-center">Age</div>
                            <div className="text-center">Date</div>
                            <div className="text-center">Time</div>
                            <div className="text-center">Status</div>
                            <div className="text-right pr-2">Action</div>
                        </div>

                        {/* Table Body */}
                        <div className="flex flex-col p-2 gap-[3px] bg-white">
                            {appointments.map((appt, idx) => {
                                const isSelected = selectedRows.includes(appt.id);
                                // First row looks like it is selected with black box, others are white boxes
                                const isFirstRow = idx === 0 && selectedRows.length === 0; // mimic initial screenshot look if nothing touched
                                const checkActive = isSelected || isFirstRow;

                                return (
                                    <div key={idx} className={`grid grid-cols-[auto_1.5fr_1fr_1fr_1fr_1.5fr_1fr_auto] gap-4 items-center px-2 py-[7px] min-h-[46px] text-[11px] font-semibold text-gray-800 rounded shadow-sm border border-transparent hover:border-[#bae6fd] bg-[#f2f8f9]`}>

                                        {/* Checkbox */}
                                        <div className="flex items-center justify-center pl-1">
                                            <button
                                                onClick={() => handleSelectRow(appt.id)}
                                                className={`w-3.5 h-3.5 rounded-[2px] border ${checkActive ? 'bg-black border-black text-white' : 'bg-white border-gray-600'} flex items-center justify-center focus:outline-none`}
                                            >
                                                {(checkActive) && (
                                                    <svg className="w-[9px] h-[9px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                                                )}
                                            </button>
                                        </div>

                                        {/* Content */}
                                        <div>{appt.name}</div>
                                        <div>{appt.gender}</div>
                                        <div className="text-center">{appt.age}</div>
                                        <div className="text-center">{appt.date}</div>
                                        <div className="text-center">{appt.time}</div>

                                        <div className="text-center font-bold text-[#16a34a]">
                                            {appt.status}
                                        </div>

                                        {/* Action */}
                                        <div className="text-right pr-1">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setSelectedPatientForDetails(appt);
                                                }}
                                                className="px-3 py-0.5 bg-white border border-gray-600 rounded text-[9px] text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none font-bold relative z-50 cursor-pointer"
                                            >
                                                view
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>

                {/* Floating Bot Icon */}
                <Link
                    to="/Bot"
                    className="fixed bottom-10 right-10 z-[60] touch-none select-none group cursor-pointer border-none p-0 bg-transparent outline-none no-underline"
                    style={{ transform: `translate(${dragPos.x}px, ${dragPos.y}px)` }}
                    onMouseDown={handlePointerDown}
                    onTouchStart={handlePointerDown}
                    onClick={(e) => {
                        // Prevent navigation if the user was just dragging
                        if (dragRef.current.hasMoved) {
                            e.preventDefault();
                        }
                    }}
                    title="Open Chatbot"
                >
                    <div className="w-[64px] h-[64px] bg-[#1a738c] rounded-[24px] flex flex-col justify-center items-center shadow-2xl border-[2px] border-[#a0cddb] hover:bg-[#155b70] transition-all hover:scale-110 active:scale-95 relative" style={{ borderRadius: '50% 50% 50% 12px' }}>
                        <svg className="w-[30px] h-[30px] text-white pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2a2 2 0 012 2v2h2a4 4 0 014 4v7a4 4 0 01-4 4H8a4 4 0 01-4-4v-7a4 4 0 014-4h2V4a2 2 0 012-2zm0 14a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-3.5-5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm7 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                        </svg>
                        <span className="text-white text-[8px] font-bold mt-[-2px] uppercase tracking-tighter">ChatBot</span>
                        <div className="absolute top-[2px] right-[-6px] bg-[#65d065] text-white text-[11px] font-extrabold px-[6px] py-[3.5px] rounded-[7px] rounded-bl-sm tracking-widest shadow-md border border-white/40 leading-none pointer-events-none">
                            ...
                        </div>
                    </div>
                </Link>



            </main>

            {/* Patient Details Modal */}
            {selectedPatientForDetails && (
                <div
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(1px)' }}
                    onClick={(e) => { if (e.target === e.currentTarget) setSelectedPatientForDetails(null) }}
                >
                    <div className="bg-white rounded-[16px] w-full max-w-[950px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border-[1px] border-gray-100">
                        {/* Header */}
                        <div className="px-[30px] pt-[28px] pb-[16px]">
                            <h2 className="text-[22px] font-bold text-black tracking-wide">Details</h2>
                        </div>

                        {/* Scrollable Body */}
                        <div className="px-[30px] pb-[30px] overflow-y-auto flex flex-col gap-[28px]" style={{ scrollbarWidth: 'none' }}>

                            {/* 3 Columns Section */}
                            <div className="flex gap-[20px] items-stretch">

                                {/* Col 1: Profile */}
                                <div className="w-[245px] border-[1.5px] border-[#cce5ee] rounded-[10px] p-[24px] flex flex-col items-center justify-start py-[30px] shadow-sm shrink-0 bg-white">
                                    <div className="w-[105px] h-[105px] rounded-full bg-yellow-400 p-[3px] shadow-lg overflow-hidden mb-[16px] border-[2px] border-white">
                                        <img src={selectedPatientForDetails.img} className="w-full h-full object-cover rounded-full bg-white" alt="profile" />
                                    </div>
                                    <h3 className="text-[17.5px] font-[700] text-[#333] mb-[6px] tracking-wide text-center leading-tight">
                                        {selectedPatientForDetails.name}
                                    </h3>
                                    <div className="text-[12.5px] font-[600] text-[#2db3c6] mb-[2px]">Mob. +912133218765</div>
                                    <div className="text-[11px] text-[#666] font-[400]">Email-saumya21@gmail.com</div>

                                    <div className="mt-auto pt-[40px]">
                                        <img src={logoUrl} alt="VaDyaGo" className="h-[42px] opacity-90 mix-blend-multiply" />
                                    </div>
                                </div>

                                {/* Col 2: General Information */}
                                <div className="w-[290px] border-[1.5px] border-[#cce5ee] rounded-[10px] overflow-hidden flex flex-col shadow-sm shrink-0 bg-white">
                                    <div className="px-[16px] py-[12px] font-bold text-[#111] text-[13.5px]">
                                        Genral Information
                                    </div>
                                    <div className="px-[16px] pb-[16px] flex flex-col gap-[10px] flex-1 border-t-[1.5px] border-[#cce5ee] pt-[18px]">
                                        {[
                                            { label: 'Date of birth:', value: '02-feb-2026' },
                                            { label: 'Gender:', value: selectedPatientForDetails.gender },
                                            { label: 'Blood Type:', value: 'A+' },
                                            { label: 'Height:', value: '1.78m' },
                                            { label: 'Weight:', value: '55kg' },
                                            { label: 'Patient:', value: '11A2026/033968' },
                                            { label: 'Diseases:', value: 'Diabetes,Asthma' },
                                            { label: 'Last visit:', value: '10-feb-2026' },
                                            { label: 'Register.Date:', value: '29-jan-2026' },
                                            { label: 'Address:', value: 'Gorakhpur,273015' }
                                        ].map((info, idx) => (
                                            <div key={idx} className="flex items-center text-[11.5px] justify-between border-b-[1.5px] border-gray-200/60 pb-[5px] last:border-0 last:pb-0">
                                                <span className="font-bold text-[#333] w-[100px] shrink-0">{info.label}</span>
                                                <span className="text-gray-500 font-[500] text-left flex-1 pl-[10px] truncate">{info.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Col 3: Reports */}
                                <div className="flex-1 border-[1.5px] border-[#cce5ee] rounded-[10px] overflow-hidden flex flex-col shadow-sm bg-white">
                                    <div className="px-[16px] py-[12px] flex justify-between items-center bg-white border-b-[1.5px] border-[#cce5ee]">
                                        <h4 className="font-bold text-[#111] text-[13.5px]">Reports</h4>
                                        <button className="text-[#3a8bdf] text-[11px] font-bold hover:underline tracking-wide bg-transparent border-none cursor-pointer">
                                            + Add Reports
                                        </button>
                                    </div>
                                    <div className="flex flex-col">
                                        {[
                                            { title: 'CeckUp Result', date: '13 - feb - 2026', checked: false },
                                            { title: 'Medicine prescription', date: '14 - feb - 2026', checked: false },
                                            { title: 'CeckUp Result', date: '13 - feb - 2026', checked: false },
                                            { title: 'CT Scan full body', date: '14 - feb - 2026', checked: false },
                                            { title: 'Eye Test', date: '13 - feb - 2026', checked: true },
                                            { title: 'Nipah Virus', date: '14 - feb - 2026', checked: false },
                                            { title: 'Blood Sugar', date: '13 - feb - 2026', checked: false },
                                            { title: 'Skin Check', date: '14 - feb - 2026', checked: false }
                                        ].map((rep, idx) => (
                                            <div key={idx} className={`flex items-center justify-between px-[16px] py-[10.5px] border-b border-gray-200/50 last:border-0 ${idx % 2 === 0 ? 'bg-[#e4e5e7]/40' : 'bg-white'}`}>
                                                <div className="w-[45%] text-[#555] text-[11.5px] font-[500] truncate">{rep.title}</div>
                                                <div className="w-[35%] text-[#555] text-[11.5px] font-[500]">{rep.date}</div>
                                                <div className="flex items-center gap-[10px] w-[20%] justify-end">
                                                    <button className="w-[22px] h-[22px] flex items-center justify-center border-[1.5px] border-gray-300 rounded-[5px] hover:bg-gray-100 bg-white text-gray-500 shadow-sm">
                                                        <svg className="w-[13px] h-[13px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                    <button className="w-[22px] h-[22px] flex items-center justify-center border-[1.5px] border-gray-300 rounded-[5px] hover:bg-gray-100 bg-white text-[#309bc0] shadow-sm">
                                                        {rep.checked ? (
                                                            <svg className="w-[14px] h-[14px] text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                        ) : (
                                                            <svg className="w-[13px] h-[13px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            {/* Bottom Section: Appointments */}
                            <div>
                                <div className="flex justify-between items-center mb-[14px]">
                                    <h3 className="text-[19px] font-bold text-black tracking-wide">Appointment</h3>
                                    <button className="text-[#3a8bdf] text-[12px] tracking-wide font-bold hover:underline bg-transparent border-none cursor-pointer">
                                        +Add Appointment
                                    </button>
                                </div>

                                <div className="border-[1.5px] border-[#cce5ee] rounded-[10px] overflow-hidden shadow-sm bg-white relative">
                                    {/* Header Tabs */}
                                    <div className="flex border-b-[1.5px] border-[#cce5ee]">
                                        <div className="px-[24px] py-[14px] text-[#3a8bdf] font-bold text-[14px] cursor-pointer">All Appointment</div>
                                        <div className="px-[24px] py-[14px] text-gray-500 font-bold text-[14px] cursor-pointer hover:bg-gray-50">Completed</div>
                                    </div>

                                    {/* Table Header */}
                                    <div className="flex px-[30px] py-[16px] text-[#111] font-[700] text-[13.5px] bg-white border-b border-gray-200">
                                        <div className="w-[25%] text-left">Date</div>
                                        <div className="w-[30%] text-center">Treatment Type</div>
                                        <div className="w-[25%] text-center">Booking Time</div>
                                        <div className="w-[20%] text-right font-bold">Payment</div>
                                    </div>

                                    {/* Table Rows */}
                                    <div className="flex flex-col max-h-[240px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                                        {[
                                            { date: '13 feb,2026', type: 'Regular checkUp', time: '4:00 pm', status: 'Pending' },
                                            { date: '02 feb,2026', type: 'OPD', time: '10:00 am', status: 'Complete' },
                                            { date: '20 Jan,2026', type: 'Regular checkUp', time: '12:30 pm', status: 'Complete' },
                                            { date: '19 Dec,2025', type: 'OPD', time: '9:30 am', status: 'Complete' },
                                            { date: '10 Nov,2025', type: 'Regular checkUp', time: '11:15 am', status: 'Complete' },
                                            { date: '05 Oct,2025', type: 'OPD', time: '3:45 pm', status: 'Complete' },
                                            { date: '22 Aug,2025', type: 'Regular checkUp', time: '2:00 pm', status: 'Complete' },
                                            { date: '14 Jul,2025', type: 'Skin Check', time: '10:30 am', status: 'Complete' }
                                        ].map((app, idx) => (
                                            <div key={idx} className={`flex px-[30px] py-[20px] text-[13px] items-center border-b border-gray-200/50 last:border-0 shrink-0 ${idx % 2 === 0 ? 'bg-[#e4e5e7]/40' : 'bg-white'}`}>
                                                <div className="w-[25%] text-left font-[500] text-[#666]">{app.date}</div>
                                                <div className="w-[30%] text-center font-[500] text-[#666]">{app.type}</div>
                                                <div className="w-[25%] text-center font-[500] text-[#666]">{app.time}</div>
                                                <div className={`w-[20%] text-right font-[500] tracking-wide ${app.status === 'Pending' ? 'text-orange-500' : 'text-[#42e46d]'}`}>
                                                    {app.status}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Bottom Arrow Expander */}
                                    <div className="h-[28px] bg-white flex justify-center items-center pb-[6px] pt-[6px] cursor-pointer hover:bg-gray-50 border-t border-gray-100">
                                        <svg className="w-[32px] h-[32px] text-[#555] stroke-[3.5px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default App_Dashboard;

