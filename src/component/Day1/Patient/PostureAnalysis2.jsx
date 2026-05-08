import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import patientPhoto from '../../../assets/Patient Photo.svg';
import examRoomBg from '../../../assets/exam_room_bg.png';
import Sidebar from '../../../components/Patient/Patient_sidebar';
import Profile from '../../../components/Patient/Profile';
import Account from '../../../components/Patient/Account';
import Notification from '../../../components/Patient/notification';
import duckDoctor from '../../../assets/duck_doctor.png';

const PostureAnalysis2 = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState('Symptom Checker');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/Analysiscomplete');
        }, 5000); // Navigate after 5 seconds of scanning
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div 
            className="flex h-screen w-full font-sans antialiased text-[#0D1C2E] overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0B1F4D 0%, #1a6e78 33%, #49AAB3 67%, #a8bec5 100%)' }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

                .pa2-container {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    padding: 24px 40px;
                    height: 100vh;
                    overflow-y: auto;
                    font-family: 'Outfit', sans-serif;
                    color: white;
                }

                .pa2-header { margin-bottom: 24px; }
                .pa2-header h1 { font-size: 28px; font-weight: 800; margin: 0; letter-spacing: -0.5px; }
                .pa2-header p { font-size: 14px; color: #6ED4D4; margin: 4px 0 0 0; font-weight: 600; }

                .pa2-progress-section {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border-radius: 12px;
                    padding: 16px 24px;
                    margin-bottom: 24px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .pa2-progress-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
                .pa2-progress-header span { font-size: 12px; font-weight: 700; color: rgba(255, 255, 255, 0.8); }

                .pa2-bar-bg { width: 100%; height: 10px; background: rgba(255, 255, 255, 0.1); border-radius: 5px; overflow: hidden; }
                .pa2-bar-fill { height: 100%; background: #6ED4D4; border-radius: 5px; box-shadow: 0 0 15px rgba(110, 212, 212, 0.4); }

                .pa2-main-grid { display: grid; grid-template-columns: 1fr 320px; gap: 24px; flex: 1; }

                .pa2-viewport-container { position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.3); border: 1px solid rgba(255, 255, 255, 0.1); cursor: pointer; transition: transform 0.3s ease; }
                .pa2-viewport-container:hover { transform: scale(1.01); }
                .pa2-viewport-img { width: 100%; height: 100%; object-fit: cover; }
                .pa2-viewport-overlay { position: absolute; inset: 0; padding: 24px; display: flex; flex-direction: column; }

                .pa2-scan-badge { position: absolute; top: 24px; left: 24px; display: flex; gap: 8px; }
                .pa2-badge { background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(8px); padding: 6px 12px; border-radius: 6px; font-size: 10px; font-weight: 800; letter-spacing: 0.5px; }
                .pa2-badge.red { color: #FF4D4D; display: flex; align-items: center; gap: 6px; }
                .pa2-scanning-dot { width: 6px; height: 6px; background: #FF4D4D; border-radius: 50%; animation: pulse-red 1.5s infinite; }

                .pa2-skeletal-overlay { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 300px; height: 400px; pointer-events: none; }
                .pa2-skeleton-node { position: absolute; width: 14px; height: 14px; background: #6ED4D4; border: 3px solid rgba(255, 255, 255, 0.8); border-radius: 50%; box-shadow: 0 0 15px #6ED4D4; z-index: 10; }
                .pa2-skeleton-line { position: absolute; background: rgba(110, 212, 212, 0.8); height: 3px; transform-origin: left center; z-index: 5; }

                .pa2-corner { position: absolute; width: 30px; height: 30px; border-color: #6ED4D4; border-style: solid; border-width: 0; }
                .top-left { top: 24px; left: 24px; border-top-width: 3px; border-left-width: 3px; border-radius: 8px 0 0 0; }
                .top-right { top: 24px; right: 24px; border-top-width: 3px; border-right-width: 3px; border-radius: 0 8px 0 0; }
                .bottom-left { bottom: 24px; left: 24px; border-bottom-width: 3px; border-left-width: 3px; border-radius: 0 0 0 8px; }
                .bottom-right { bottom: 24px; right: 24px; border-bottom-width: 3px; border-right-width: 3px; border-radius: 0 0 8px 0; }

                .pa2-side-panel { display: flex; flex-direction: column; gap: 20px; }
                .pa2-profile-card { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(15px); border-radius: 20px; padding: 24px; border: 1px solid rgba(255, 255, 255, 0.1); text-align: center; }
                .pa2-avatar-wrapper { position: relative; width: 60px; height: 60px; margin: 0 auto 16px; }
                .pa2-avatar { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 2px solid #6ED4D4; }
                .pa2-check-badge { position: absolute; bottom: 0; right: 0; background: #6ED4D4; color: #0B1F4D; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; border: 2px solid #0B1F4D; }
                .pa2-profile-card h3 { font-size: 16px; font-weight: 700; margin: 0; }
                .pa2-profile-card span { font-size: 11px; color: rgba(255, 255, 255, 0.5); display: block; margin-top: 2px; }
                .pa2-stats-row { display: flex; justify-content: center; gap: 32px; margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.1); }
                .pa2-stat-item { display: flex; flex-direction: column; gap: 4px; }
                .pa2-stat-item label { font-size: 9px; color: rgba(255, 255, 255, 0.4); font-weight: 800; text-transform: uppercase; }
                .pa2-stat-item strong { font-size: 14px; font-weight: 700; }

                .pa2-status-card { background: white; border-radius: 20px; padding: 20px; color: #1A304E; }
                .pa2-status-card h4 { display: flex; align-items: center; gap: 10px; font-size: 11px; font-weight: 800; text-transform: uppercase; color: #718096; margin: 0 0 16px 0; }
                .pa2-processing-bar { display: flex; flex-direction: column; gap: 8px; }
                .pa2-bar-mini { width: 100%; height: 6px; background: #EDF2F7; border-radius: 3px; overflow: hidden; }
                .pa2-fill-mini { height: 100%; background: #49AAB3; border-radius: 3px; }
                .pa2-time-card { background: #EDF7F8; border-radius: 16px; padding: 16px; display: flex; align-items: center; gap: 16px; margin-top: 16px; }
                .pa2-icon-box { width: 40px; height: 40px; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #1A7785; }
                .pa2-time-info label { font-size: 9px; font-weight: 800; color: rgba(26, 48, 78, 0.4); text-transform: uppercase; display: block; }
                .pa2-time-info strong { font-size: 18px; color: #1A304E; }

                .pa2-ai-bot-section {
                    position: fixed;
                    bottom: 30px;
                    right: 40px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                    z-index: 1000;
                    pointer-events: none;
                }

                .pa2-floating-msg {
                    position: relative;
                    background: white;
                    color: #1A304E;
                    padding: 16px 20px;
                    border-radius: 20px;
                    max-width: 280px;
                    font-size: 12px;
                    font-weight: 500;
                    line-height: 1.5;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                    pointer-events: auto;
                }

                .pa2-msg-triangle {
                    position: absolute;
                    bottom: -8px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 0;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-top: 10px solid white;
                }

                .pa2-bot-avatar {
                    width: 72px;
                    height: 72px;
                    border-radius: 50%;
                    border: 4px solid white;
                    overflow: hidden;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
                    background: white;
                    pointer-events: auto;
                }

                .pa2-bot-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .pa2-cancel-container { display: flex; justify-content: center; margin-top: 24px; }
                .pa2-cancel-btn { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); color: white; padding: 10px 24px; border-radius: 50px; display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 600; cursor: pointer; transition: 0.3s; }
                .pa2-cancel-btn:hover { background: rgba(255, 255, 255, 0.2); transform: translateY(-2px); }

                @keyframes pulse-red {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.3); opacity: 0.5; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}</style>
            <Sidebar
                active={active}
                setActive={setActive}
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
            />

            {/* ── Main Area ── */}
            <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden ${isNotificationOpen || activeModal ? 'blur-[4px] scale-[0.98] pointer-events-none' : ''}`}>
                
                {/* Top Navbar */}
                <header className="h-[76px] flex items-center justify-between px-[24px] md:px-[48px] shrink-0 border-b border-white/5 mb-[8px] z-20">
                    <button 
                        onClick={() => setIsMobileOpen(true)}
                        className="lg:hidden text-white p-2 -ml-2 hover:bg-white/10 rounded-xl transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    <div className="flex items-center gap-4 flex-1">
                        <button 
                            onClick={() => navigate('/PostureAnalysis')}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95"
                            title="Back to Posture Analysis 1"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <div className="flex-1 max-w-[280px]">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-white/10 border border-white/10 rounded-full py-[10px] px-[20px] text-white placeholder-white/40 text-[12px] outline-none focus:ring-2 focus:ring-[#6ED4D4]/50 transition-all font-medium"
                            />
                            <svg className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                    <div className="flex items-center gap-[32px] ml-auto">
                        <span className="text-white/80 hover:text-white text-[13px] font-medium hidden md:block select-none cursor-pointer transition-colors">Language</span>
                        <div className="flex items-center gap-[20px]">
                            <button onClick={() => setIsNotificationOpen(true)} className="text-white hover:text-[#6ED4D4] transition-colors relative">
                                <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <div className="absolute top-[2px] right-[2px] w-[6px] h-[6px] bg-[#E85B5A] rounded-full" />
                            </button>
                            <button onClick={() => navigate('/Setting')} className="text-white hover:text-[#6ED4D4] transition-colors">
                                <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                            <div onClick={() => setActiveModal('profile')} className="w-[38px] h-[38px] rounded-full border-[2px] border-[#6ED4D4] overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform">
                                <img src={patientPhoto} alt="User" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* ── Content ── */}
                <div className="pa2-container">
                    <div className="pa2-header">
                        <h1>Postural Analysis</h1>
                        <p>Step 2: AI Autodetection</p>
                    </div>

                    <div className="pa2-progress-section">
                        <div className="pa2-progress-header">
                            <span>Total Progress</span>
                            <span>45%</span>
                        </div>
                        <div className="pa2-bar-bg">
                            <div className="pa2-bar-fill" style={{ width: '45%' }}></div>
                        </div>
                    </div>

                    <div className="pa2-main-grid">
                        {/* Camera Area */}
                        <div className="pa2-viewport-container" onClick={() => navigate('/Analysiscomplete')}>
                            <img src={examRoomBg} alt="Exam Room" className="pa2-viewport-img" />
                            <div className="pa2-viewport-overlay">
                                <div className="pa2-scan-badge">
                                    <div className="pa2-badge red">
                                        <div className="pa2-scanning-dot"></div>
                                        AI SCANNING
                                    </div>
                                    <div className="pa2-badge">CAM 01: DEPTH-L-SENSOR_924</div>
                                </div>

                                {/* Brackets */}
                                <div className="pa2-corner top-left"></div>
                                <div className="pa2-corner top-right"></div>
                                <div className="pa2-corner bottom-left"></div>
                                <div className="pa2-corner bottom-right"></div>

                                {/* Skeletal Overlay Simulation */}
                                <div className="pa2-skeletal-overlay">
                                    {/* Head */}
                                    <div className="pa2-skeleton-node" style={{ top: '10%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
                                    {/* Neck to Torso */}
                                    <div className="pa2-skeleton-line" style={{ top: '10%', left: '50%', height: '30%', width: '3px', transform: 'translateX(-50%)' }}></div>
                                    {/* Shoulders */}
                                    <div className="pa2-skeleton-line" style={{ top: '35%', left: '20%', width: '60%' }}></div>
                                    <div className="pa2-skeleton-node" style={{ top: '35%', left: '20%', transform: 'translate(-50%, -50%)' }}></div>
                                    <div className="pa2-skeleton-node" style={{ top: '35%', left: '80%', transform: 'translate(-50%, -50%)' }}></div>
                                    {/* Arms */}
                                    <div className="pa2-skeleton-line" style={{ top: '35%', left: '20%', height: '30%', width: '3px', transform: 'rotate(10deg)' }}></div>
                                    <div className="pa2-skeleton-line" style={{ top: '35%', left: '80%', height: '30%', width: '3px', transform: 'rotate(-10deg)' }}></div>
                                    <div className="pa2-skeleton-node" style={{ top: '65%', left: '15%', transform: 'translate(-50%, -50%)' }}></div>
                                    <div className="pa2-skeleton-node" style={{ top: '65%', left: '85%', transform: 'translate(-50%, -50%)' }}></div>
                                    {/* Hips */}
                                    <div className="pa2-skeleton-line" style={{ top: '95%', left: '30%', width: '40%' }}></div>
                                    <div className="pa2-skeleton-node" style={{ top: '95%', left: '30%', transform: 'translate(-50%, -50%)' }}></div>
                                    <div className="pa2-skeleton-node" style={{ top: '95%', left: '70%', transform: 'translate(-50%, -50%)' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Side Panel */}
                        <div className="pa2-side-panel">
                            {/* Profile Card */}
                            <div className="pa2-profile-card">
                                <div className="pa2-avatar-wrapper">
                                    <img src={patientPhoto} alt="Alex Rivera" className="pa2-avatar" />
                                    <div className="pa2-check-badge">
                                        <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <h3>Alex Rivera</h3>
                                <span>ID: #1028-VG</span>
                                <div className="pa2-stats-row">
                                    <div className="pa2-stat-item">
                                        <label>Age</label>
                                        <strong>28 yrs</strong>
                                    </div>
                                    <div className="pa2-stat-item">
                                        <label>Weight</label>
                                        <strong>74 kg</strong>
                                    </div>
                                </div>
                            </div>

                            {/* Scan Status Card */}
                            <div className="pa2-status-card">
                                <h4>
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Scan Status
                                </h4>
                                <div className="pa2-processing-bar">
                                    <div className="flex justify-between items-center text-[10px] font-bold text-[#718096]">
                                        <span>Processing Keypoints</span>
                                        <span className="text-[#1A304E]">12/24</span>
                                    </div>
                                    <div className="pa2-bar-mini">
                                        <div className="pa2-fill-mini" style={{ width: '50%' }}></div>
                                    </div>
                                </div>
                                <div className="pa2-time-card">
                                    <div className="pa2-icon-box">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="pa2-time-info">
                                        <label>Time Remaining</label>
                                        <strong>18s</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pa2-cancel-container">
                        <button className="pa2-cancel-btn" onClick={() => navigate(-1)}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancel Scan
                        </button>
                    </div>

                    {/* Floating Message Bot Section */}
                    <div className="pa2-ai-bot-section">
                        <div className="pa2-floating-msg">
                            "You're doing great, Alex! Just stay as still as possible for the next 18 seconds so I can get a crystal-clear map of your alignment."
                            <div className="pa2-msg-triangle"></div>
                        </div>
                        <div className="pa2-bot-avatar">
                            <img src={duckDoctor} alt="AI Bot" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {activeModal === 'profile' && (
                <Profile onClose={() => setActiveModal(null)} onAccountSettings={() => setActiveModal('account')} />
            )}
            {activeModal === 'account' && <Account onClose={() => setActiveModal(null)} />}
            {isNotificationOpen && <Notification onClose={() => setIsNotificationOpen(false)} />}
        </div>
    );
};

export default PostureAnalysis2;
