import React, { useEffect, useState } from 'react';
import BASE_URL from '../../baseUrl';

const NotificationItem = ({ 
    type, 
    typeColor, 
    bgColor, 
    title, 
    message,
    time, 
    icon, 
    showBorder = true 
}) => {
    return (
        <div className={`flex px-6 py-4 hover:bg-[#fcfdfd] transition-colors ${showBorder ? 'border-b border-[#f4f7f8]' : ''}`}>
            {/* Icon */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mr-4 ${bgColor}`}>
                {icon}
            </div>

            {/* Content */}
            <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-[11px] font-bold tracking-[0.1em] uppercase ${typeColor}`}>
                        {type}
                    </span>
                    <span className="text-[#9eaebc] text-[12px] italic">
                        {time}
                    </span>
                </div>
                <h3 className="text-[#0D1C2E] text-[15px] font-bold mb-1 tracking-wide">
                    {title}
                </h3>
                <p className="text-[#5A6A7D] text-[13.5px] leading-relaxed mb-3">
                    {message}
                </p>
                
                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-[6px] text-[#4a5d6a] text-[12.5px] font-bold hover:text-[#0D1C2E] transition-colors">
                        <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                        Mark as read
                    </button>
                    <button className="flex items-center gap-[6px] text-[#4a5d6a] text-[12.5px] font-bold hover:text-[#0D1C2E] transition-colors">
                        <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
};

const Notification = ({ onClose }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const formatTimeAgo = (dateString) => {
        const now = new Date();
        const past = new Date(dateString);
        const diffInMs = now - past;
        const diffInMins = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInMins < 1) return 'Just now';
        if (diffInMins < 60) return `${diffInMins}m ago`;
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInDays === 1) return 'Yesterday';
        return `${diffInDays}d ago`;
    };

    const getIconForTitle = (title) => {
        const t = title.toLowerCase();
        if (t.includes('appointment')) return (
            <svg className="w-[20px] h-[20px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/>
            </svg>
        );
        if (t.includes('medication')) return (
            <svg className="w-[20px] h-[20px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm6 11h-3v3h-2v-3H8v-2h3v-3h2v3h3v2z"/>
            </svg>
        );
        return (
            <svg className="w-[20px] h-[20px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
        );
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            const token = localStorage.getItem('token') || localStorage.getItem('access');
            if (!token) return;

            try {
                const response = await fetch(`${BASE_URL}/notifications/list/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data);
                }
            } catch (error) {
                console.error("Fetch Notifications Error:", error);
            } finally {
                setLoading(false);
            }
        };

        const registerDevice = async () => {
            const token = localStorage.getItem('token') || localStorage.getItem('access');
            if (!token) return;

            try {
                await fetch(`${BASE_URL}/notifications/devices/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        fcm_token: "abc123token"
                    })
                });
            } catch (error) {
                console.error("Device Registration Error:", error);
            }
        };

        fetchNotifications();
        registerDevice();
    }, []);

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 font-sans antialiased">
            {/* Main Window */}
            <div className="bg-white rounded-[32px] w-full max-w-[620px] max-h-[85vh] overflow-hidden shadow-2xl flex flex-col relative">
                
                {/* Close Button top right */}
                <button 
                    onClick={onClose}
                    className="absolute top-[24px] right-[24px] z-10 w-[36px] h-[36px] bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-all hover:rotate-90"
                >
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Header */}
                <div className="px-8 pt-8 pb-6 border-b border-[#f4f7f8]">
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-[24px] font-bold text-[#0B1423] tracking-tight mb-1">
                                Notifications
                            </h1>
                            <p className="text-[14px] text-[#627382] font-medium">
                                Keep track of your clinical activity
                            </p>
                        </div>
                        <button className="text-[#1A7785] font-bold text-[14px] pb-1 hover:text-[#125863] transition-colors underline decoration-dotted underline-offset-4">
                            Mark all as read
                        </button>
                    </div>
                </div>

                {/* Notification List */}
                <div className="flex-1 overflow-y-auto no-scrollbar bg-white">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-8 h-8 border-4 border-[#1A7785]/20 border-t-[#1A7785] rounded-full animate-spin"></div>
                            <p className="text-gray-400 font-bold text-sm">Fetching updates...</p>
                        </div>
                    ) : notifications.length > 0 ? (
                        notifications.map((item, index) => (
                            <NotificationItem 
                                key={item.id}
                                type={item.title.includes('Appointment') ? 'APPOINTMENT' : 'ALERT'}
                                typeColor={item.title.includes('Appointment') ? 'text-[#1A7785]' : 'text-[#6F8BB5]'}
                                bgColor={item.title.includes('Appointment') ? 'bg-[#E7F0F0] text-[#1A7785]' : 'bg-[#EAEFF5] text-[#172C50]'}
                                title={item.title}
                                message={item.message}
                                time={formatTimeAgo(item.created_at)}
                                icon={getIconForTitle(item.title)}
                                showBorder={index !== notifications.length - 1}
                            />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 px-10 text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </div>
                            <h3 className="text-gray-900 font-bold text-lg mb-1">No new notifications</h3>
                            <p className="text-gray-500 text-sm font-medium">We'll alert you when there's an update on your appointments or care plan.</p>
                        </div>
                    )}
                </div>

                {/* Footer Section */}
                <button className="w-full bg-[#f8fafb] py-5 flex items-center justify-center hover:bg-[#f0f3f5] transition-colors border-t border-gray-100">
                    <span className="text-[#3E4C56] text-[12px] font-bold tracking-[0.15em] uppercase">
                        View All Activity History
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Notification;

