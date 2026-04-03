import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import MainPage from './components/Hospital/MainPage';
import Makeapp from './components/Hospital/Makeapp';
import About from './components/Hospital/About';
import ContactUs from './components/Hospital/ContactUs';
import Section3 from './components/Hospital/Section3';
import Service from './components/Hospital/Service';


import Finallogin from './components/Login-hospital/Finallogin';
import Admin_signup from './components/Admin/admin-signup';
import AdminLoginPage from './components/Admin/AdminLoginPage';
import VerticalProgress1 from './components/Admin/VerticalProgress1';

import Profile from './components/Admin/Profile';


import Admin_dashboard1 from './components/Admin/Admin_dashboard1';
import AdminDoctor from './components/Admin/admin-doctor';
import DasyWilliam from './components/Admin/DasyWilliam';
import AdminSidebar from './components/Admin/AdminSidebar';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import Adddoctor from './components/Admin/Adddoctor';
import Signup1 from './components/Signup-hospital/Signup1';
import VerticalProgressBar from './components/Signup-hospital/VerticalProgressBar';
import App_Dashboard from './components/Appoinment/App_Dashboard';
import Bot from './components/Appoinment/Bot';






import Form1 from './components/Doctor/Form1';
import Form2 from './components/Doctor/Form2';
import Form3 from './components/Doctor/Form3';
import Form4 from './components/Doctor/Form4';
import Vertical from './components/Doctor/Vertical';
import DoctorCard from './components/Doctor/DoctorCard';


// Debug logging to find the invalid component
const components = { MainPage, About, ContactUs, Section3, Finallogin, Admin_signup, AdminLoginPage, VerticalProgress1, Profile, Admin_dashboard1, AdminDoctor, DasyWilliam, AdminSidebar, ProtectedRoute, Signup1, VerticalProgressBar, Service, Form1, Form2, Form3, Form4, Vertical, DoctorCard, Adddoctor, Bot };


Object.entries(components).forEach(([name, comp]) => {
  if (Array.isArray(comp)) {
    console.error(`ERROR: Component ${name} is an array!`);
  } else if (!comp) {
    console.error(`ERROR: Component ${name} is undefined or null!`);
  }
});

const App = () => {
  return (

    //  <BrowserRouter> 
    <Routes>

      <Route path="/MainPage" element={<MainPage />} />
      <Route path="/Makeapp" element={<Makeapp />} />
      <Route path="/About" element={<About />} />
      <Route path="/ContactUs" element={<ContactUs />} />
      <Route path="/Section3" element={<Section3 />} />

      <Route path="/Finallogin" element={<Finallogin />} />
      <Route path="/Admin-signup" element={<Admin_signup />} />
      <Route path="/AdminLoginPage" element={<AdminLoginPage />} />
      <Route path="/Adddoctor" element={<Adddoctor />} />
      <Route path="/Profile" element={<Profile />} />

      <Route path="/Admin_dashboard1" element={<Admin_dashboard1 />} />
      <Route path="/DasyWilliam" element={<DasyWilliam />} />
      <Route path="/admin-doctor" element={<AdminDoctor />} />
      <Route path="/AdminSidebar" element={<AdminSidebar />} />
      <Route path="/ProtectedRoute" element={<ProtectedRoute />} />
      <Route path="/VerticalProgress1" element={<VerticalProgress1 />} />
      <Route path="/Signup1" element={<Signup1 />} />
      <Route path="/VerticalProgressBar" element={<VerticalProgressBar />} />

      <Route path="/Service" element={<Service />} />

      <Route path="/Form1" element={<Form1 />} />
      <Route path="/Form2" element={<Form2 />} />
      <Route path="/Form3" element={<Form3 />} />
      <Route path="/Form4" element={<Form4 />} />
      <Route path="/Vertical" element={<Vertical />} />
      <Route path="/DoctorCard" element={<div className="flex items-center justify-center min-h-screen bg-gray-100 py-10"><DoctorCard /></div>} />
      <Route path="/App_Dashboard" element={<App_Dashboard />} />
      <Route path="/Bot" element={<Bot />} />



    </Routes>


    //  </BrowserRouter> 
  );
};

export default App;