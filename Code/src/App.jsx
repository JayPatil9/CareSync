import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './pages/Home'
import Login from './pages/Login'
import SP from './pages/SignUpPage_Patient'
import SD from './pages/SignUpPage_Doctor'
import Dashboard from './pages/PDashboard'
import PProfile from './pages/patientprofile'
import DProfile from './pages/doctorProfile'
import DLogbook from './pages/Doctor_Logbook'
import PForm from './pages/PatientForm'
import Dform from './pages/DoctorForm'
import Update from './pages/UpdateVitals'
import './App.css'


createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup-patient" element={<SP />} />
        <Route exact path="/signup-doctor" element={<SD />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/patient-profile" element={<PProfile />} />
        <Route exact path="/doctor-profile" element={<DProfile />} />
        <Route exact path="/doctor-logbook" element={<DLogbook />} />
        <Route exact path="/patient-form" element={<PForm />} />
        <Route exact path="/doctor-form" element={<Dform />} />
        <Route exact path="/update-vitals" element={<Update />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </>
)
