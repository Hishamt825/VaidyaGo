import { Routes, Route, Navigate } from 'react-router-dom';
import Appointment from './component/Day1/Doctor/Appointment';
import Appointment2 from './component/Day1/Doctor/Appointment2';
import Sidebar from './component/Day1/Doctor/Sidebar';
import Dslot from './component/Day1/Doctor/Dslot';
import Appointmentb from './component/Day1/Doctor/Appointmentb';
import Bot from './component/Day1/Doctor/Bot';
import Dsetting from './component/Day1/Doctor/Dsetting';
import Service from './component/Day1/Doctor/Service';
import Consultation1 from './component/Day1/Consultation/Consultation1';
import Diagnostic from './component/Day1/Patient/Diagnostic';
import Body from './component/Day1/Patient/Body';
import Editprofile from './component/Day1/Doctor/Editprofile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Consultation1" replace />} />

      <Route path="/Appointment" element={<Appointment />} />
      <Route path="/Appointment2" element={<Appointment2 />} />
      <Route path="/Sidebar" element={<Sidebar />} />

      {/* Both lowercase and uppercase for safety */}
      <Route path="/Dslot" element={<Dslot />} />
      <Route path="/dslot" element={<Dslot />} />

      <Route path="/Appointmentb" element={<Appointmentb />} />
      <Route path="/Bot" element={<Bot />} />
      <Route path="/Dsetting" element={<Dsetting />} />
      <Route path="/dsetting" element={<Dsetting />} />
      <Route path="/Service" element={<Service />} />
      <Route path="/service" element={<Service />} />

      <Route path="/Consultation1" element={<Consultation1 />} />
      <Route path="/consultation1" element={<Consultation1 />} />
      <Route path="/Diagnostic" element={<Diagnostic />} />
      <Route path="/diagnostic" element={<Diagnostic />} />
      <Route path="/Body" element={<Body />} />
      <Route path="/body" element={<Body />} />
      <Route path="/Editprofile" element={<Editprofile />} />
      <Route path="/editprofile" element={<Editprofile />} />
    </Routes>
  )
}

export default App;
