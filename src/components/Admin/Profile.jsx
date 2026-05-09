import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../baseUrl";

/* ✅ ADD THIS (Missing Component) */
const MenuItem = ({ text, img, active, onClick }) => (
  <div
    onClick={onClick}
    className={`group flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer text-[14px] font-medium transition-all duration-200
    ${active
        ? "bg-[#1b6d8a] text-white"
        : "text-gray-600 hover:bg-[#d8ecf0] hover:text-[#1b6d8a]"
      }
  `}
  >
    <img
      src={img}
      className={`w-4 h-4 transition-all duration-200 
      ${active
          ? "brightness-0 invert"
          : "group-hover:brightness-0 group-hover:invert"
        }
    `}
      alt=""
    />
    <span>{text}</span>
  </div>
);

const Profile = ({ setOpenProfile }) => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "Tuba Javed",
    email: "javedtuba1@gmail.com",
    phone_number: "1234567890",
    post: "Admin",
    language: "English (US)",
    address: {
      country: "India",
      city: "Delhi",
      pincode: "110001",
    },
  });

  // 🔄 Fetch Profile Data on Mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access") || localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`${BASE_URL}/api/admin/profile/`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Admin Profile Data Received:", data);

          setFormData((prev) => ({
            ...prev,
            name: data.name || data.full_name || prev.name,
            email: data.email || prev.email,
            phone_number: data.phone_number || data.phone || prev.phone_number,
            post: data.post || prev.post,
            language: data.language || prev.language,
            address: {
              country: data.address?.country || prev.address.country,
              city: data.address?.city || prev.address.city,
              pincode: data.address?.pincode || prev.address.pincode,
            },
          }));
        }
      } catch (error) {
        console.error("Fetch profile error:", error);
      }
    };

    fetchProfile();
  }, []);

  // Centralized Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested address fields
    if (["country", "city", "pincode"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      // Handle normal fields
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    largeText: false,
    shortcuts: true
  });

  const toggleSetting = (setting) => {
    setAccessibilitySettings(prev => {
      const newVal = !prev[setting];

      // Apply global effects
      if (setting === 'highContrast') {
        document.body.classList.toggle('high-contrast', newVal);
      } else if (setting === 'largeText') {
        document.body.classList.toggle('large-text', newVal);
      }

      return { ...prev, [setting]: newVal };
    });
  };

  // ✏️ SAVE PROFILE
  const handleSaveProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem("access") || localStorage.getItem("token");

    if (!token) {
      alert("Session expired. Please login again.");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Update profile (using PATCH for partial update which is more reliable)
      const editResponse = await fetch(`${BASE_URL}/api/admin/profile/edit/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone_number: formData.phone_number,
          post: formData.post,
          language: formData.language,
          address: {
            country: formData.address.country,
            city: formData.address.city,
            pincode: formData.address.pincode,
          },
        }),
      });

      if (!editResponse.ok) {
        const editData = await editResponse.json();
        alert(editData.detail || "Edit profile failed");
        return;
      }

      // 2️⃣ Fetch updated profile
      const profileResponse = await fetch(`${BASE_URL}/api/admin/profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setFormData({
          name: profileData.name || "",
          email: profileData.email || "",
          phone_number: profileData.phone_number || "",
          post: profileData.post || "Admin",
          language: profileData.language || "English (US)",
          address: {
            country: profileData.address?.country || "",
            city: profileData.address?.city || "",
            pincode: profileData.address?.pincode || "",
          },
        });
        alert("Profile fully updated");
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error);
      alert("Network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // 🔥🔥🔥 PASTE BELOW THIS LINE
  const handleDisconnectGoogle = async () => {
    console.log("Disconnect clicked");

    const token = localStorage.getItem("access");
    console.log("Token:", token);

    if (!token) {
      alert("Session expired. Please login again.");
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/admin/profile/disconnect-google/`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      console.log("Response received");

      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        alert(data.detail || "Failed to disconnect Google");
        return;
      }

      alert(data.message || "Google account disconnected successfully");
    } catch (error) {
      console.error(error);
      // alert("Network error occurred.");
    }
  };

  const handleBackToDashboard = () => {
    const storedRole = localStorage.getItem("user_type") || 
                       localStorage.getItem("role") || 
                       localStorage.getItem("usertype") || 
                       "";
    const role = storedRole.toLowerCase().trim();
    console.log("DEBUG: handleBackToDashboard triggered. Role:", role, "setOpenProfile exists:", !!setOpenProfile);

    // 1. Try to close the overlay if it was opened from a dashboard
    if (setOpenProfile) {
      console.log("DEBUG: Closing profile overlay via setOpenProfile(false)");
      setOpenProfile(false);
      return;
    }

    // 2. Otherwise navigate explicitly
    if (role === "doctor") {
      console.log("DEBUG: Navigating to Doctor Dashboard");
      navigate("/Doctor_dashboard");
    } else if (role === "admin") {
      console.log("DEBUG: Navigating to Admin Dashboard");
      navigate("/Admin_dashboard1");
    } else if (role === "patient") {
      navigate("/Patient_dashboard");
    } else {
      console.log("DEBUG: No role found, using history back");
      navigate(-1);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/MainPage");
  };

  return (
    <div className="flex h-screen bg-[#f5f8fb] overflow-hidden">



      {/* MAIN SIDEBAR */}
      <div className="h-full w-64 bg-[#eef5f9] border-r p-6">
        <img src="/assets/v.png" className="h-12 mb-6" alt="" />

        <p className="text-[14px] text-gray-500 mb-3">Personal Account</p>

        <nav className="flex flex-col gap-2">
          <MenuItem text="Dashboard" img="/assets/d.png" active={false} onClick={handleBackToDashboard} />
          <MenuItem text="Your Profile" img="/assets/user.svg" active={true} onClick={() => navigate("/Profile")} />
          <MenuItem text="Accessibility" img="/assets/ad.png" active={false} onClick={() => setIsAccessibilityModalOpen(true)} />
          <MenuItem text="Privacy Policy" img="/assets/lo.png" active={false} onClick={() => setIsPrivacyModalOpen(true)} />
          <MenuItem text="Logout" img="/assets/right.png" active={false} onClick={handleLogout} />
        </nav>
      </div>

      {/* RIGHT PROFILE CONTENT */}
      <div className="flex-1 h-full overflow-y-auto bg-white px-20 py-16">

        {/* HEADER */}
        <div className="relative flex flex-col items-center mb-14">
          <div className="absolute left-[-60px] top-0 flex items-center gap-2">
            {/* Edit (Pen) Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="bg-white border border-gray-200 rounded-xl p-2 shadow-sm hover:bg-gray-50 transition"
            >
              <img src="/assets/pen.png" className="w-6 h-5" alt="Edit" />
            </button>

            {/* Update (Tick) Button - Only appears after clicking pencil */}
            {isEditing && (
              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="bg-white border border-gray-200 rounded-xl p-2 shadow-sm hover:bg-gray-50 transition flex items-center justify-center animate-in fade-in slide-in-from-left-2 duration-300"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-[#19718A] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <img src="/assets/update.png" className="w-6 h-5" alt="Update" />
                )}
              </button>
            )}
          </div>

          <h2 className="text-[30px] font-semibold text-gray-800">Your Profile</h2>
        </div>

        {/* Profile Photo Section */}
        <div className="flex justify-between items-start pb-8 border-b border-dashed border-gray-300">
          <div>
            <p className="text-[14px] font-bold text-gray-800 mb-4">Profile Photo</p>
            <div className="relative">
              <img
                src="/assets/ph.png"
                alt="profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-100"
              />
            </div>
          </div>

          <div className="flex gap-6 mt-10">
            <button className="text-[14px] font-bold text-gray-700 hover:text-black transition-colors">
              Remove Photo
            </button>
            <button className="px-5 py-2 text-[14px] font-bold border border-gray-300 rounded-xl hover:bg-gray-50 transition shadow-sm bg-white text-gray-800">
              Change Photo
            </button>
          </div>
        </div>

        {/* Name Field */}
        <div className="py-4 border-b border-dashed border-gray-300">
          <p className="text-[14px] font-bold text-gray-800">Name</p>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 px-3 py-2 border border-gray-300 rounded-lg text-[15px] text-gray-900 w-full outline-none focus:border-[#19718A]"
            />
          ) : (
            <p className="text-[15px] text-[#19718A] mt-2 font-medium">
              {formData.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="py-4 border-b border-dashed border-gray-300">
          <p className="text-[14px] font-bold text-gray-800">Email address</p>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 px-3 py-2 border border-gray-300 rounded-lg text-[15px] text-gray-900 w-full outline-none focus:border-[#19718A]"
            />
          ) : (
            <p className="text-[15px] text-[#19718A] mt-2 font-medium">
              {formData.email}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div className="py-4 border-b border-dashed border-gray-300">
          <p className="text-[14px] font-bold text-gray-800">Phone Number</p>
          {isEditing ? (
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="mt-2 px-3 py-2 border border-gray-300 rounded-lg text-[15px] text-gray-900 w-full outline-none focus:border-[#19718A]"
            />
          ) : (
            <p className="text-[15px] text-[#19718A] mt-2 font-medium">
              {formData.phone_number}
            </p>
          )}
        </div>

        {/* Address Field */}
        <div className="py-4 border-b border-dashed border-gray-300">
          <p className="text-[14px] font-bold text-gray-800 mb-3">Address</p>
          <div className="flex gap-3">
            <select
              name="country"
              value={formData.address.country}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-[14px] text-gray-900 w-full max-w-[200px] outline-none focus:border-[#19718A] bg-white transition-all shadow-sm"
            >
              <option value="">Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>

            <select
              name="city"
              value={formData.address.city}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-[14px] text-gray-900 w-full max-w-[200px] outline-none focus:border-[#19718A] bg-white transition-all shadow-sm"
            >
              <option value="">City</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
            </select>

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.address.pincode}
              onChange={handleChange}
              className="px-3 py-2 text-[14px] text-gray-900 border border-gray-300 rounded-lg w-full max-w-[150px] outline-none focus:border-[#19718A] shadow-sm"
            />
          </div>
        </div>

        {/* Post Field */}
        <div className="py-4 border-b border-dashed border-gray-300">
          <p className="text-[14px] font-bold text-gray-800 mb-3">Post</p>
          <select
            name="post"
            value={formData.post}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 text-[14px] text-gray-900 w-full max-w-[280px] outline-none focus:border-[#19718A] bg-white transition-all shadow-sm"
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Staff">Staff</option>
          </select>
        </div>

        {/* Language Field */}
        <div className="py-4 border-b border-dashed border-gray-300">
          <p className="text-[14px] font-bold text-gray-800 mb-3">Language</p>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 text-[14px] text-gray-900 w-full max-w-[280px] outline-none focus:border-[#19718A] bg-white transition-all shadow-sm"
          >
            <option value="English (US)">English (US)</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

        {/* Connected Social Media Section */}
        <div className="pt-8">
          <p className="text-[14px] font-bold text-gray-800 mb-1">Connected Social Media</p>
          <p className="text-[13px] text-gray-500 mb-4">Services that you use to log in to your Account</p>

          <div className="flex justify-between items-center border border-gray-300 rounded-xl px-5 py-4 bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-2 border border-gray-200 rounded-lg">
                <img src="/assets/google.png" className="w-8 h-8" alt="Google" />
              </div>
              <div>
                <p className="text-[15px] font-bold text-gray-800">Google</p>
                <p className="text-[13px] text-[#19718A] font-semibold">{formData.name}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDisconnectGoogle}
              className="px-6 py-2 text-[14px] font-bold border border-gray-300 rounded-xl hover:bg-gray-50 transition shadow-sm bg-white text-gray-800"
            >
              Disconnect
            </button>
          </div>
        </div>

      </div>

      {/* 🚀 ACCESSIBILITY MODAL */}
      {isAccessibilityModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-md px-4" onClick={() => setIsAccessibilityModalOpen(false)}>
          <div
            className="w-full max-w-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#19718A] px-8 py-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold">Accessibility Settings</h3>
              <button
                onClick={() => setIsAccessibilityModalOpen(false)}
                className="hover:rotate-90 transition-transform duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              {/* Visual Preferences */}
              <div>
                <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-4">Visual Preferences</p>
                <div className="space-y-4">
                  <div
                    className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => toggleSetting('highContrast')}
                  >
                    <div>
                      <p className="font-bold text-gray-800">High Contrast Mode</p>
                      <p className="text-xs text-gray-500">Increase contrast for better readability</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${accessibilitySettings.highContrast ? 'bg-[#19718A]' : 'bg-gray-200'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${accessibilitySettings.highContrast ? 'right-1' : 'left-1'}`}></div>
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => toggleSetting('largeText')}
                  >
                    <div>
                      <p className="font-bold text-gray-800">Large Text</p>
                      <p className="text-xs text-gray-500">Scale up the system font size</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${accessibilitySettings.largeText ? 'bg-[#19718A]' : 'bg-gray-200'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${accessibilitySettings.largeText ? 'right-1' : 'left-1'}`}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Helpers */}
              <div>
                <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-4">Navigation Helpers</p>
                <div
                  className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => toggleSetting('shortcuts')}
                >
                  <div>
                    <p className="font-bold text-gray-800">Keyboard Shortcuts</p>
                    <p className="text-xs text-gray-500">Enable quick navigation via keyboard</p>
                  </div>
                  <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${accessibilitySettings.shortcuts ? 'bg-[#19718A]' : 'bg-gray-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${accessibilitySettings.shortcuts ? 'right-1' : 'left-1'}`}></div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setIsAccessibilityModalOpen(false)}
                className="w-full py-4 mt-4 bg-[#89C8D9] text-[#0f3b4d] font-bold rounded-2xl hover:bg-[#78b7c8] transition-all shadow-lg active:scale-95"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔐 PRIVACY POLICY MODAL */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-md px-4" onClick={() => setIsPrivacyModalOpen(false)}>
          <div
            className="w-full max-w-[600px] max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden relative flex flex-col animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#19718A] px-8 py-6 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="text-xl font-bold">Privacy Policy</h3>
              </div>
              <button
                onClick={() => setIsPrivacyModalOpen(false)}
                className="hover:rotate-90 transition-transform duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p className="font-bold text-[#19718A] text-lg">Your privacy is our top priority.</p>
                <p>This Privacy Policy describes how we collect, use, and handle your personal information when you use our platform.</p>

                {/* Section 1 */}
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-2 text-[#19718A]">
                    <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <h4 className="font-bold uppercase text-[12px] tracking-widest">Information We Collect</h4>
                  </div>
                  <p>We collect basic details such as your name, email address, and phone number to provide administrative services and maintain security.</p>
                </div>

                {/* Section 2 */}
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-2 text-[#19718A]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    <h4 className="font-bold uppercase text-[12px] tracking-widest">Data Security</h4>
                  </div>
                  <p>All your data is encrypted using industry-standard protocols. We never share your personal information with third-party advertisers without your explicit consent.</p>
                </div>

                {/* Section 3 */}
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-2 text-[#19718A]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <h4 className="font-bold uppercase text-[12px] tracking-widest">Your Rights</h4>
                  </div>
                  <p>You have the right to access, correct, or delete your personal information at any time. If you wish to close your account, all personal data will be purged from our servers within 30 days.</p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setIsPrivacyModalOpen(false)}
                className="w-full py-4 bg-[#89C8D9] text-[#0f3b4d] font-bold rounded-2xl hover:bg-[#78b7c8] transition-all shadow-lg active:scale-95 shrink-0"
              >
                Agree & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
