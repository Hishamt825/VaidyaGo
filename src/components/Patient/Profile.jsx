import phImg from '../../assets/ph.png';
 
const Profile = ({ onClose, onAccountSettings }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop with blur */}
            <div 
                className="absolute inset-0 bg-[#0B1423]/60 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            {/* Profile Card */}
            <div className="relative w-full max-w-[440px] bg-white rounded-[40px] shadow-[0_25px_80px_rgba(0,0,0,0.4)] overflow-hidden transition-all transform scale-100">
                
                {/* Header with Gradient */}
                <div className="h-[140px] bg-gradient-to-b from-[#0B1F4D] via-[#1a6e78] to-[#49AAB3] relative">
                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-all backdrop-blur-sm z-10"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Profile Image Overflow */}
                <div className="flex flex-col items-center -mt-[60px] pb-8 px-8">
                    <div className="relative">
                        <div className="w-[124px] h-[124px] rounded-full border-[5px] border-white overflow-hidden shadow-xl bg-white">
                            <img src={phImg} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <button className="absolute bottom-1 right-1 w-9 h-9 bg-[#1A7785] rounded-full border-[3.5px] border-white flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="text-center mt-5 mb-8">
                        <h2 className="text-[28px] font-black text-[#0D1C2E] tracking-tight">Dr. Ananya Sharma</h2>
                        <p className="text-[#1A7785] font-black text-[15px] uppercase tracking-widest mt-1 opacity-90">Senior Clinician</p>
                        <div className="flex items-center justify-center gap-2 mt-3 text-[#627382] font-bold text-[14px]">
                            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            ananya.sharma@vaidyago.com
                        </div>
                    </div>

                    {/* Primary Action Button */}
                    <button className="w-full h-16 bg-gradient-to-r from-[#0B1F4D] via-[#1A7785] to-[#1A7785] rounded-[24px] flex items-center justify-center gap-3 text-white font-black text-lg shadow-[0_12px_30px_rgba(26,119,133,0.3)] hover:opacity-90 transition-all mb-6">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit Profile
                    </button>

                    {/* Action Cards Grid */}
                    <div className="grid grid-cols-2 gap-4 w-full mb-8">
                        <button 
                            onClick={onAccountSettings}
                            className="p-6 bg-[#EAEFF2] rounded-[32px] flex flex-col items-center gap-3 hover:bg-gray-200 transition-all group"
                        >
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#4B5E7F] shadow-sm group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.117" />
                                </svg>
                            </div>
                            <span className="text-[#0D1C2E] font-black text-[13px] tracking-tight">Account Settings</span>
                        </button>
                        <button className="p-6 bg-[#EAEFF2] rounded-[32px] flex flex-col items-center gap-3 hover:bg-gray-200 transition-all group">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#4B5E7F] shadow-sm group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <span className="text-[#0D1C2E] font-black text-[13px] tracking-tight">Privacy</span>
                        </button>
                    </div>

                    {/* Bottom Line & Logout */}
                    <div className="w-full pt-6 border-t border-gray-100 flex justify-center">
                        <button className="flex items-center gap-3 text-[#E85B5A] font-black text-[16px] hover:opacity-70 transition-all">
                            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
