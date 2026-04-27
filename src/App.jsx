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
import Addslot from './components/Appoinment/Addslot';






import Form1 from './components/Doctor/Form1';
import Form2 from './components/Doctor/Form2';
import Form3 from './components/Doctor/Form3';
import Form4 from './components/Doctor/Form4';
import Vertical from './components/Doctor/Vertical';
import DoctorCard from './components/Doctor/DoctorCard';
import App1_Dashboard from './components/Appoinment/App1_Dashboard';
import Recent_patient from './components/Appoinment/Recent_patient';
import Settingpage from './components/Appoinment/Settingpage';
import Reject_doctor from './components/Admin/Reject_doctor';
import Disease from './components/Patient/Disease';
import Patient_dashboard from './components/Patient/Patient_dashboard';
import Patient_dashboard1 from './components/Patient/Patient_dashboard1';
import Symptom from './components/Patient/Symptom';
import Patient_sidebar from './components/Patient/Patient_sidebar';
import Account from './components/Patient/Account';
import Notification from './components/Patient/notification';
import Vitals from './components/Patient/Vitals/Vitals';
import Reminder from './components/Patient/Reminder';
import Medication1 from './components/Patient/Medication/Medication1';
import Setting from './components/Patient/Setting';
import Appointment from './components/Patient/Appointment';
import Message from './components/Patient/Message';
import Record from './components/Patient/Record';
import Reminder1 from './components/Patient/Reminder1';
import Strengthening from './components/Patient/Exercise/Strengthening';
import Guided from './components/Patient/Exercise/Guided';
import VitalsDetail from './components/Patient/Vitals/Detail';
import VitalsHistory from './components/Patient/Vitals/Vitals_history';
import View_request from './components/Patient/Medication/View_request';
import Order from './components/Patient/Medication/Order';
import Lisinopril from './components/Patient/Medication/Lisinopril';
import Metformin_detail from './components/Patient/Medication/Metformin_detail';
import Atorvastatin from './components/Patient/Medication/Atorvastatin';
import Amoxicillin from './components/Patient/Medication/Amoxicillin';
import Appointment2 from './component/Day1/Doctor/Appointment2';
import Dsetting from './component/Day1/Doctor/Dsetting';
import Dslot from './component/Day1/Doctor/Dslot';
import Editprofile from './component/Day1/Doctor/Editprofile';
import Appointmentb from './component/Day1/Doctor/Appointmentb';
import Reject from './components/Admin/Reject';



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
      <Route path="/Addslot" element={<Addslot />} />
      <Route path="/App1_Dashboard" element={<App1_Dashboard />} />
      <Route path="/Patients" element={<Recent_patient />} />
      <Route path="/Settingpage" element={<Settingpage />} />
      <Route path="/reject_doctor" element={<Reject_doctor />} />
      <Route path="/Disease" element={<Disease />} />
      <Route path="/Patient_dashboard" element={<Patient_dashboard />} />
      <Route path="/Patient_dashboard1" element={<Patient_dashboard1 />} />
      <Route path="/Symptom" element={<Symptom />} />
      <Route path="/Account" element={<Account />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/Vitals" element={<Vitals />} />
      <Route path="/Medication" element={<Medication1 />} />
      <Route path="/Medication1" element={<Medication1 />} />
      <Route path="/medication1" element={<Medication1 />} />
      <Route path="/Reminder" element={<Reminder />} />
      <Route path="/Setting" element={<Setting />} />
      <Route path="/Appointment" element={<Appointment />} />
      <Route path="/Message" element={<Message />} />
      <Route path="/Record" element={<Record />} />
      <Route path="/Reminder1" element={<Reminder1 />} />
      <Route path="/Strengthening" element={<Strengthening />} />
      <Route path="/Guided" element={<Guided />} />
      <Route path="/VitalsDetail" element={<VitalsDetail />} />
      <Route path="/VitalsHistory" element={<VitalsHistory />} />
      <Route path="/View-request" element={<View_request />} />
      <Route path="/View_request" element={<View_request />} />
      <Route path="/Order" element={<Order />} />
      <Route path="/Lisinopril" element={<Lisinopril />} />
      <Route path="/Metformin" element={<Metformin_detail />} />
      <Route path="/Atorvastatin" element={<Atorvastatin />} />
      <Route path="/Amoxicillin" element={<Amoxicillin />} />

      <Route path="/Appointment2" element={<Appointment2 />} />
      <Route path="/Dsetting" element={<Dsetting />} />
      <Route path="/Dslot" element={<Dslot />} />
      <Route path="/Editprofile" element={<Editprofile />} />
      <Route path="/Appointmentb" element={<Appointmentb />} />
      <Route path="/Reject" element={<Reject />} />

      <Route path="/Patient_sidebar" element={<div className="flex bg-[#0B1F4D] min-h-screen"><Patient_sidebar active="" setActive={() => {}} isMobileOpen={false} setIsMobileOpen={() => {}} /></div>} />

    </Routes>


    //  </BrowserRouter> 
  );
};

export default App;
