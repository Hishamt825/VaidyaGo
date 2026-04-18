import React from 'react';

const NotificationItem = ({ 
    type, 
    typeColor, 
    bgColor, 
    title, 
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
                    <span className={`text-[12px] font-medium tracking-[0.1em] uppercase ${typeColor}`}>
                        {type}
                    </span>
                    <span className="text-[#9eaebc] text-[12px] italic">
                        {time}
                    </span>
                </div>
                <h3 className="text-[#0D1C2E] text-base font-medium mb-2 tracking-wide">
                    {title}
                </h3>
                
                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-[6px] text-[#4a5d6a] text-[13.5px] font-medium hover:text-[#0D1C2E] transition-colors">
                        <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                        Mark as read
                    </button>
                    <button className="flex items-center gap-[6px] text-[#4a5d6a] text-[13.5px] font-medium hover:text-[#0D1C2E] transition-colors">
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
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 font-serif antialiased">
            {/* Main Window */}
            <div className="bg-white rounded-[24px] w-full max-w-[600px] max-h-full overflow-y-auto shadow-2xl flex flex-col relative no-scrollbar">
                
                {/* Close Button top right */}
                <button 
                    onClick={onClose}
                    className="absolute top-[20px] right-[20px] z-10 w-[32px] h-[32px] bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-colors"
                >
                    <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Header */}
                <div className="px-7 pt-7 pb-5 flex items-start justify-between border-b border-[#f4f7f8]">
                    <div>
                        <h1 className="text-xl font-medium text-[#0B1423] tracking-wide mb-1">
                            Notifications
                        </h1>
                        <p className="text-[13.5px] text-[#627382] italic">
                            Keep track of your clinical activity
                        </p>
                    </div>
                    <button className="text-[#1A7785] font-medium text-[15px] pt-[8px] hover:text-[#125863] transition-colors">
                        Mark all as read
                    </button>
                </div>

                {/* Notification List */}
                <div className="flex flex-col bg-white">
                    {/* Item 1 */}
                    <NotificationItem 
                        type="APPOINTMENT REMINDER"
                        typeColor="text-[#1A7785]"
                        bgColor="bg-[#E7F0F0] text-[#1A7785]"
                        title="Dr. Elena Rodriguez at 10:00 AM"
                        time="2m ago"
                        icon={
                            <svg className="w-[24px] h-[24px]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/>
                            </svg>
                        }
                    />

                    {/* Item 2 */}
                    <NotificationItem 
                        type="NEW MESSAGE"
                        typeColor="text-[#6F8BB5]"
                        bgColor="bg-[#EAEFF5] text-[#172C50]"
                        title="New Message from Dr. Marcus Chen"
                        time="1h ago"
                        icon={
                            <svg className="w-[24px] h-[24px]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                        }
                    />

                    {/* Item 3 */}
                    <NotificationItem 
                        type="MEDICATION ALERT"
                        typeColor="text-[#1A7785]"
                        bgColor="bg-[#E7F0F0] text-[#1A7785]"
                        title="Time for your morning dose"
                        time="4h ago"
                        icon={
                            <svg className="w-[24px] h-[24px]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm6 11h-3v3h-2v-3H8v-2h3v-3h2v3h3v2z"/>
                            </svg>
                        }
                    />

                    {/* Item 4 */}
                    <NotificationItem 
                        type="HEALTH TIP"
                        typeColor="text-[#36A6A1]"
                        bgColor="bg-[#E0F7F6] text-[#298782]"
                        title="Stay hydrated throughout the day"
                        time="Yesterday"
                        showBorder={false}
                        icon={
                            <svg className="w-[24px] h-[24px]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
                            </svg>
                        }
                    />
                </div>

                {/* Footer Section */}
                <button className="w-full bg-[#EAEDEE] py-4 flex items-center justify-center hover:bg-[#dfe4e6] transition-colors mt-auto">
                    <span className="text-[#3E4C56] text-[12px] font-medium tracking-[0.15em] uppercase">
                        View All Activity History
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Notification;

