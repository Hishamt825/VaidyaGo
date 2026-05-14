import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ChevronLeft, ChevronRight, Sun, Sunrise, Moon, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import pen1 from '../../../assets/pen1.png';
import apiFetch from '../../../api';
import BASE_URL from '../../../baseUrl';

const Info = ({ onClose, doctor }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Hospital Visit');
    const [selectedDate, setSelectedDate] = useState(1);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const [slotsData, setSlotsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [groupedByDate, setGroupedByDate] = useState({});
    const [availableDates, setAvailableDates] = useState([]);
    const [activeDateStr, setActiveDateStr] = useState('');
    const [error, setError] = useState(null);
    const [fetchStatus, setFetchStatus] = useState(null);
    const [debugUrl, setDebugUrl] = useState('');
    const [rawDebug, setRawDebug] = useState('');
    const [isBooking, setIsBooking] = useState(false);

    const monthsFull = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const daysFull = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];



    useEffect(() => {
        const fetchSlots = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const doctorId = doctor?.id || 1;
                const url = `${BASE_URL}/api/doctor/${doctorId}/slots/`;
                setDebugUrl(url);
                
                const response = await apiFetch(url);
                setFetchStatus(response.status);
                
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }
 
                const resultObj = await response.json();
                const rawSlots = resultObj.slots || [];
                
                // Filter for available slots only
                const availableSlots = rawSlots.filter(slot => !slot.is_booked);
                
                const now = new Date();
                const futureSlotsOnly = availableSlots.filter(s => {
                    if (!s.start_time) return true;
                    const slotTime = new Date(s.start_time);
                    return slotTime > now;
                });

                if (futureSlotsOnly.length === 0 && availableSlots.length > 0) {
                    setRawDebug(`Available slots returned ${availableSlots.length} slots, but none are future slots.`);
                }

                setSlotsData(futureSlotsOnly);
                const data = futureSlotsOnly;

                // Group by date (using string keys directly)
                const grouped = {};
                if (Array.isArray(data)) {
                    data.forEach(slot => {
                        const dateStr = new Date(slot.start_time).toISOString().slice(0, 10);
                        if (!grouped[dateStr]) grouped[dateStr] = [];
                        grouped[dateStr].push(slot);
                    });
                }

                setGroupedByDate(grouped);

                // Generate date list for selector
                const sortedDates = Object.keys(grouped).sort();
                const formattedDates = sortedDates.map((dateStr, index) => {
                    let dObj = new Date(dateStr);

                    return {
                        id: index + 1,
                        fullDate: dateStr,
                        day: daysFull[dObj.getDay()],
                        date: dObj.getDate().toString(),
                        month: monthsFull[dObj.getMonth()]
                    };
                });

                setAvailableDates(formattedDates);
                if (formattedDates.length > 0) {
                    setActiveDateStr(formattedDates[0].fullDate);
                    setSelectedDate(1);
                }
            } catch (error) {
                console.error('Error fetching slots for Info.jsx:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSlots();
    }, [doctor]);

    const getTimeCategorizedSlots = (dateStr) => {
        const daySlots = groupedByDate[dateStr] || [];
        const result = { morning: [], afternoon: [], evening: [] };

        daySlots.forEach(slot => {
            const timeStr = slot.start_time; // ISO string like "2024-01-15T10:00:00Z"
            if (!timeStr) return;

            // Parse time directly from ISO string (UTC) to match AddSlot display
            let hour = 0;
            let minutes = '00';
            if (timeStr.includes('T')) {
                const timePart = timeStr.split('T')[1];
                const [h, m] = timePart.split(':');
                hour = parseInt(h, 10);
                minutes = m;
            }

            // Create display time
            const displayHours = hour % 12 || 12;
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const displayTime = `${displayHours}:${minutes} ${ampm}`;

            const slotWithDisplay = { 
                ...slot, 
                displayTime,
                from_time: `${hour.toString().padStart(2, '0')}:${minutes}`,
                date: dateStr
            };

            if (hour < 12) result.morning.push(slotWithDisplay);
            else if (hour < 17) result.afternoon.push(slotWithDisplay);
            else result.evening.push(slotWithDisplay);
        });

        return result;
    };

    const currentDayCategorized = getTimeCategorizedSlots(activeDateStr);



    const handleBookAppointment = async () => {
        if (!selectedSlot) {
            alert("Please select a time slot first.");
            return;
        }

        setIsBooking(true);
        try {
            const doctorId = doctor?.id || 1;
            const actualSlotId = selectedSlot.id; // Use the actual TimeSlot ID directly

            const payload = {
                doctor: doctorId,
                slot: actualSlotId,
                start_time: selectedSlot.start_time,
                end_time: selectedSlot.end_time,
                patient_name: "Demo Patient",
                patient_phone: "9876543210",
                appointment_type: activeTab
            };

            const response = await apiFetch(`${BASE_URL}/api/appointments/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("Appointment request sent to doctor successfully!");
                onClose(); // close the modal and go back
            } else {
                const err = await response.json();
                alert("Failed to book: " + (err.error || JSON.stringify(err)));
            }
        } catch (error) {
            console.error("Booking error:", error);
            alert("An error occurred while booking.");
        } finally {
            setIsBooking(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" onClick={onClose} />

            {/* Slide-over Content */}
            <div className="relative w-full max-w-[420px] h-full shadow-2xl flex flex-col overflow-hidden animate-slide-in"
                 style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}>
                 
                 {/* ... header and main content ... */}
                 
                 {/* Rest is exactly as before, until the footer */}
                 
                {/* Header */}
                <div className="px-6 py-5 flex items-center gap-4 text-white shrink-0">
                    <button onClick={onClose} className="hover:bg-white/10 p-1.5 rounded-full transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                    <h2 className="text-[20px] font-bold">Schedule Appointment</h2>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-24 space-y-8">
                    
                    {/* Doctor Mini Profile */}
                    <div className="flex items-center gap-4 py-2">
                        <div className="w-[64px] h-[64px] rounded-xl overflow-hidden border border-white/20">
                            <img src={pen1} alt="Doctor" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-bold text-[17px] leading-tight">{doctor?.name || 'Dr. Sumaiya Javed'}</h3>
                            <p className="text-white/60 text-[13px] font-medium mb-1">10 years</p>
                            <button 
                                onClick={() => navigate('/view_profile')}
                                className="text-[#6ED4D4] text-[13px] font-bold hover:underline"
                            >
                                View Profile
                            </button>
                        </div>
                    </div>

                    {/* Tab Switcher */}
                    <div className="bg-white/5 p-1 rounded-xl flex border border-white/10">
                        <button 
                            onClick={() => setActiveTab('Online Consult')}
                            className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-all ${activeTab === 'Online Consult' ? 'bg-[#1A7785] text-white shadow-lg' : 'text-white/60 hover:text-white'}`}
                        >
                            Online Consult
                        </button>
                        <button 
                            onClick={() => setActiveTab('Hospital Visit')}
                            className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-all ${activeTab === 'Hospital Visit' ? 'bg-[#1A7785] text-white shadow-lg' : 'text-white/60 hover:text-white'}`}
                        >
                            Hospital Visit
                        </button>
                    </div>

                    {/* Date Selector */}
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <button className="text-white/40 hover:text-white"><ChevronLeft size={18} /></button>
                            <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1 flex-1 px-2">
                                {availableDates.length > 0 ? (
                                    availableDates.map(d => (
                                        <div 
                                            key={d.id}
                                            onClick={() => {
                                                setSelectedDate(d.id);
                                                setActiveDateStr(d.fullDate);
                                            }}
                                            className={`min-w-[58px] p-2.5 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-all ${selectedDate === d.id ? 'bg-white border-white scale-105 shadow-xl' : 'border-white/10 hover:border-white/30'}`}
                                        >
                                            <span className={`text-[11px] font-bold ${selectedDate === d.id ? 'text-[#0B1F4D]/60' : 'text-white/40'}`}>{d.day}</span>
                                            <span className={`text-[16px] font-black leading-none ${selectedDate === d.id ? 'text-[#0B1F4D]' : 'text-white'}`}>{d.date}</span>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedDate === d.id ? 'text-[#0B1F4D]/60' : 'text-white/40'}`}>{d.month}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-white/40 text-[13px] font-medium py-2">No slots available for this doctor</div>
                                )}
                            </div>
                            <button className="text-white/40 hover:text-white"><ChevronRight size={18} /></button>
                        </div>
                    </div>

                    {/* Slots Sections */}
                    <div className="space-y-8">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-10 gap-3">
                                <div className="w-8 h-8 border-4 border-[#6ED4D4] border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-white/60 font-bold text-sm tracking-wide">Fetching Slots...</span>
                            </div>
                        ) : availableDates.length > 0 ? (
                            <>
                                {/* Morning */}
                                {currentDayCategorized.morning.length > 0 && (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-white/40">
                                            <div className="flex items-center gap-2">
                                                <Sunrise size={20} className="text-[#6ED4D4]" />
                                                <span className="text-[14px] font-bold">Morning</span>
                                            </div>
                                            <span className="text-[12px] font-medium">{currentDayCategorized.morning.length} Slots</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
                                            {currentDayCategorized.morning.map((slot, i) => (
                                                <button 
                                                    key={slot.id}
                                                    onClick={() => setSelectedSlot(slot)}
                                                    disabled={slot.is_booked}
                                                    className={`py-2.5 rounded-lg border font-bold text-[13px] transition-all relative ${selectedSlot?.id === slot.id ? 'bg-white border-white text-[#0B1F4D] scale-95 shadow-inner' : slot.is_booked ? 'opacity-40 cursor-not-allowed border-white/5 bg-black/10 text-white/20' : 'border-white/20 text-white hover:border-white/50 bg-white/5'}`}
                                                >
                                                    {slot.displayTime}
                                                    {slot.is_booked && <Clock className="absolute top-1 right-1 w-2.5 h-2.5 opacity-40" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Afternoon */}
                                {currentDayCategorized.afternoon.length > 0 && (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-white/40">
                                            <div className="flex items-center gap-2">
                                                <Sun size={20} className="text-[#FBBF24]" />
                                                <span className="text-[14px] font-bold">Afternoon</span>
                                            </div>
                                            <span className="text-[12px] font-medium">{currentDayCategorized.afternoon.length} Slots</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
                                            {currentDayCategorized.afternoon.map((slot, i) => (
                                                <button 
                                                    key={slot.id}
                                                    onClick={() => setSelectedSlot(slot)}
                                                    disabled={slot.is_booked}
                                                    className={`py-2.5 rounded-lg border font-bold text-[13px] transition-all relative ${selectedSlot?.id === slot.id ? 'bg-white border-white text-[#0B1F4D] scale-95 shadow-inner' : slot.is_booked ? 'opacity-40 cursor-not-allowed border-white/5 bg-black/10 text-white/20' : 'border-white/20 text-white hover:border-white/50 bg-white/5'}`}
                                                >
                                                    {slot.displayTime}
                                                    {slot.is_booked && <Clock className="absolute top-1 right-1 w-2.5 h-2.5 opacity-40" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Evening */}
                                {currentDayCategorized.evening.length > 0 && (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-white/40">
                                            <div className="flex items-center gap-2">
                                                <Moon size={20} className="text-[#818CF8]" />
                                                <span className="text-[14px] font-bold">Evening</span>
                                            </div>
                                            <span className="text-[12px] font-medium">{currentDayCategorized.evening.length} Slots</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
                                            {currentDayCategorized.evening.map((slot, i) => (
                                                <button 
                                                    key={slot.id}
                                                    onClick={() => setSelectedSlot(slot)}
                                                    disabled={slot.is_booked}
                                                    className={`py-2.5 rounded-lg border font-bold text-[13px] transition-all relative ${selectedSlot?.id === slot.id ? 'bg-white border-white text-[#0B1F4D] scale-95 shadow-inner' : slot.is_booked ? 'opacity-40 cursor-not-allowed border-white/5 bg-black/10 text-white/20' : 'border-white/20 text-white hover:border-white/50 bg-white/5'}`}
                                                >
                                                    {slot.displayTime}
                                                    {slot.is_booked && <Clock className="absolute top-1 right-1 w-2.5 h-2.5 opacity-40" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-white/30 text-center px-10 border border-white/5 rounded-[32px] bg-white/5">
                                <Clock size={40} className="mb-4 opacity-20" />
                                <p className="font-bold text-[16px]">No Appointments for {doctor?.name || 'this doctor'}</p>
                                <div className="text-[12px] mt-4 space-y-2 font-mono bg-black/20 p-4 rounded-xl border border-white/5">
                                    <p className="text-[#6ED4D4]">Status: {fetchStatus || 'Waiting'}</p>
                                    <p>Doctor ID: {doctor?.id || 1}</p>
                                    <p>Slots Found: {slotsData.length}</p>
                                    <p className="text-[10px] opacity-40 break-all">{debugUrl}</p>
                                    <p className="text-[10px] text-yellow-500/50 break-all">Raw: {rawDebug || 'None'}</p>
                                </div>
                                <button 
                                    onClick={() => window.location.reload()} 
                                    className="mt-6 text-[11px] font-bold py-2 px-4 rounded-full border border-[#6ED4D4] text-[#6ED4D4] hover:bg-[#6ED4D4] hover:text-[#0B1F4D] transition-all"
                                >
                                    REFRESH PAGE
                                </button>
                            </div>
                        )}

                        <div className="text-center pb-4">
                            <button className="text-[#6ED4D4] text-[14px] font-bold hover:underline">View More Slots</button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-white shrink-0 flex items-center justify-between border-t border-gray-100 shadow-[0_-8px_20px_-10px_rgba(0,0,0,0.1)]">
                    <div className="flex items-baseline gap-1">
                        <span className="text-[24px] font-black text-[#0B1F4D] tracking-tight">{doctor?.offlinePrice || 500}</span>
                    </div>
                    <button 
                        onClick={handleBookAppointment}
                        disabled={isBooking || !selectedSlot}
                        className={`px-10 py-3 rounded-xl font-bold text-[15px] transition-all shadow-lg ${isBooking || !selectedSlot ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#1A7785] text-white hover:bg-[#15616D] active:scale-95'}`}
                    >
                        {isBooking ? 'Booking...' : 'Continue'}
                    </button>
                </div>
            </div>

            <style jsx>{`
                .animate-slide-in {
                    animation: slideIn 0.3s cubic-bezier(0, 0, 0.2, 1);
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default Info;
