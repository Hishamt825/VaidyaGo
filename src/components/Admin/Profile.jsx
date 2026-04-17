import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../baseUrl";

/* ✅ ADD THIS (Missing Component) */
const MenuItem = ({ text, img, active }) => (
 <div
  className={`group flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer text-[14px] font-medium transition-all duration-200
    ${
      text === "Your Profile"
        ? "bg-[#1b6d8a] text-white"
        : "text-gray-600 hover:bg-[#1b6d8a] hover:text-white"
    }
  `}
>
  <img
    src={img}
    className={`w-4 h-4 transition-all duration-200 
      ${
        text === "Your Profile"
          ? "brightness-0 invert"
          : "group-hover:brightness-0 group-hover:invert"
      }
    `}
    alt=""
  />
  <span>{text}</span>
</div>

);

const Profile = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "Tuba Javed",
    email: "javedtuba@gmail.com",
    phone_number: "1234567890",
    post: "Admin",
    language: "English",
    address: {
      country: "India",
      city: "Delhi",
      pincode: "110001",
    },
  });

  // Handle normal fields
// ✏️ EDIT PROFILE
 // ✅ Combined save function
 const handleChange = (e) => {
  const { name, value } = e.target;

  if (["country", "city", "pincode"].includes(name)) return; // handled separately

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const handleSaveProfile = async () => {
  setLoading(true);
  const token = localStorage.getItem("access");

  if (!token) {
    alert("Session expired. Please login again.");
    setLoading(false);
    return;
  }

  try {
    // 1️⃣ Call /profile/edit/ to update profile
    const editResponse = await fetch(
      `${BASE_URL}/api/admin/profile/edit/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          phone_number: formData.phone_number,
          post: formData.post,
          language: formData.language,
          address: {
            country: formData.address.country,
            city: formData.address.city,
            pincode: formData.address.pincode,
          },
        }),
      }
    );

    const editData = await editResponse.json();
    if (!editResponse.ok) {
      alert(editData.detail || "Edit profile failed");
      return;
    }

    // 2️⃣ Call /profile/ to fetch updated profile
    const profileResponse = await fetch(
      `${BASE_URL}/api/admin/profile/`,
      {
        method: "GET", // ✅ This should be GET
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    const profileData = await profileResponse.json();
    if (!profileResponse.ok) {
      alert(profileData.detail || "Fetching updated profile failed");
      return;
    }

    // ✅ Both APIs successful
    console.log("Updated profile:", profileData);
    // setFormData(profileData);
    alert("Profile fully updated ");
    setIsEditing(false);

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

  return (
    <div className="flex min-h-screen bg-[#f5f8fb]">
      
      {/* LEFT ICON BAR */}
      <div className="w-14 bg-white flex flex-col items-center shadow-lg border-r border-[#19718A] py-4 rounded-full">
        <div 
          onClick={() => navigate("/Admin_dashboard1")} 
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-100 cursor-pointer hover:bg-blue-200 transition-colors"
        >
          <img src="/assets/me.png" className="w-5 h-5" alt="" />
        </div>

        <div className="mt-10 flex flex-col gap-6">
          <img src="/assets/d.png" className="w-6 h-6 cursor-pointer" alt="" />
          <img src="/assets/i.png" className="w-6 h-6 cursor-pointer" alt="" />
          <img src="/assets/app.png" className="w-6 h-6 cursor-pointer" alt="" />
        </div>
      </div>

      {/* MAIN SIDEBAR */}
      <div className="w-64 bg-[#eef5f9] border-r p-6">
        <img src="/assets/v.png" className="h-12 mb-6" alt="" />

        <p className="text-[14px] text-gray-500 mb-3">Personal Account</p>

        <nav className="flex flex-col gap-2">
          <MenuItem text="Your Profile" img="/images/profile.png" />
          <MenuItem text="Login" img="/assets/right.png" />
          <MenuItem text="Accessibility" img="/assets/ad.png" />
          <MenuItem text="Privacy Policy" img="/assets/lo.png" />
        </nav>
      </div>

      {/* RIGHT PROFILE CONTENT */}
      <div className="flex-1 bg-white px-20 py-16">

        {/* HEADER */}
     
<div className="relative flex items-center justify-center mb-14">

  <div className="absolute left-[-60px] bottom-[52px] flex items-center gap-3">

    {/* Edit (Pen) Button - always visible */}
    <button
      onClick={() => setIsEditing(true)}
      className="bg-white border rounded-xl p-2 shadow hover:scale-105 transition"
    >
      <img src="/assets/pen.png" className="w-6 h-5" alt="Edit" />
    </button>

    {/* Update (Tick) Button - only visible when editing */}
   {isEditing && (
  <button
    onClick={handleSaveProfile} // Calls both APIs now
    disabled={loading}
    className="bg-white border rounded-xl p-2 shadow hover:scale-105 transition"
  >
    <img src="/assets/update.png" className="w-6 h-5" alt="Update" />
  </button>
)}
  </div>

  <h2 className="text-[30px] font-semibold">Your Profile</h2>
</div>




        {/* Profile Photo */}
        <div className="flex justify-between items-start pb-6 border-b border-dashed border-gray-500">
          <div>
            <p className="text-[14px] font-semibold mb-3">Profile Photo</p>
            <img
              src="/assets/ph.png"
              alt="profile"
              className="w-30 h-30 rounded-full object-cover"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button className="text-[14px] font-medium">
              Remove Photo
            </button>
            <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 transition">
              Change Photo
            </button>
          </div>
        </div>

        {/* Name */}
<div className="py-3 border-b border-dashed border-gray-500">
  <p className="text-[14px] font-semibold">Name</p>
  {isEditing ? (
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      className="mt-1 px-3 py-1.5 border rounded-md text-[16px] w-full"
    />
  ) : (
    <p className="text-[16px] text-[#19718A] mt-1">
      {formData.name}
    </p>
  )}
</div>

{/* Email */}
<div className="py-3 border-b border-dashed border-gray-500">
  <p className="text-[14px] font-semibold">Email address</p>
  {isEditing ? (
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="mt-1 px-3 py-1.5 border rounded-md text-[16px] w-full"
    />
  ) : (
    <p className="text-[16px] text-[#19718A] mt-1">
      {formData.email}
    </p>
  )}
</div>

{/* Phone */}
<div className="py-3 border-b border-dashed border-gray-500">
  <p className="text-[14px] font-semibold">Phone Number</p>
  {isEditing ? (
    <input
      type="text"
      name="phone_number"
      value={formData.phone_number}
       onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
      className="mt-1 px-3 py-1.5 border rounded-md text-[16px] w-full"
      
    />
  ) : (
    <p className="text-[16px] text-[#19718A] mt-1">
      {formData.phone_number}
    </p>
  )}
</div>

{/* Address */}
{/* Address */}
<div className="py-3 border-b border-dashed border-gray-500">
  <p className="text-[14px] font-semibold mb-1">Address</p>
  {isEditing ? (
    <div className="flex gap-2">
      <select
        name="country"
        value={formData.address.country}
        onChange={(e) =>
          setFormData({
            ...formData,
            address: { ...formData.address, country: e.target.value },
          })
        }
        className="border rounded-md px-3 py-1.5 text-[16px] text-[#19718A]"
      >
        <option value="">Country</option>
        <option value="India">India</option>
        <option value="USA">USA</option>
      </select>

      <select
        name="city"
        value={formData.address.city}
        onChange={(e) =>
          setFormData({
            ...formData,
            address: { ...formData.address, city: e.target.value },
          })
        }
        className="border rounded-md px-3 py-1.5 text-[16px] text-[#19718A]"
      >
        <option value="">City</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Delhi">Delhi</option>
      </select>

      <input
        type="text"
        name="pincode"
        value={formData.address.pincode}
        onChange={(e) =>
          setFormData({
            ...formData,
            address: { ...formData.address, pincode: e.target.value },
          })
        }
        className="px-3 py-1.5 text-sm border rounded-md w-28"
      />
    </div>
  ) : (
    <p className="text-[16px] text-[#19718A] mt-1">
      {formData.address.country}, {formData.address.city} - {formData.address.pincode}
    </p>
  )}
</div>



{/* Post */}
<div className="py-3 border-b border-dashed border-gray-500">
  <p className="text-[14px] font-semibold mb-1">Post</p>

  {isEditing ? (
    <select
      name="post"
      value={formData.post}
      onChange={handleChange}
      className="border rounded-md px-3 py-1.5 text-sm text-[#19718A]"
    >
      <option value="Admin">Admin</option>
      <option value="Manager">Manager</option>
      <option value="Staff">Staff</option>
    </select>
  ) : (
    <p className="text-[16px] text-[#19718A] mt-1">
      {formData.post}
    </p>
  )}
</div>

{/* Language */}
<div className="py-3 border-b border-dashed border-gray-500">
  <p className="text-[14px] font-semibold mb-1">Language</p>
  <select className="border rounded-md px-3 py-1.5 text-[16px]">
    <option>English (US)</option>
  </select>
</div>

{/* Connected Social Media */}
<div className="pt-3">
  <p className="text-[14px] font-semibold">
    Connected Social Media
  </p>
  <p className="text-[12px] text-gray-500 mb-2">
    Services that you use to log in to your Account
  </p>

  <div className="flex justify-between items-center border border-gray-500 rounded-lg px-3 py-2">
    <div className="flex items-center gap-2">
      <img src="/assets/google.png" className="w-7 h-7" alt="" />
      <div>
        <p className="text-[14px] font-medium">Google</p>
        <p className="text-[12px] text-[#19718A]">
          {formData.name}
        </p>
      </div>
    </div>

  <button
  type="button"  // add this
  onClick={handleDisconnectGoogle}
  className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 transition"
>
  Disconnect
</button>
  </div>
</div>


      </div>
    </div>
  );
};

export default Profile;
