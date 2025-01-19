import React from "react";
import { useNavigate } from "react-router-dom";
import '../stylesheets/landing.css'

const LandingPage = () => {

  const navigate = useNavigate();
  const gotoLogin = () => {
    navigate("/login");
  };



  return (
    <div className="landing-container">
       
      {/* Header Section */}
      <div className="landing-header">
        <h1>CareSync: Connecting Health, Simplifying Care.</h1>
        <p>
          Empowering seamless healthcare connections, ensuring secure data sharing, real-time updates, and personalized care for patients and providers.
        </p>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="cta-buttons">
        <button className="cta-btn cta-btn-primary">Contact Us</button>
        <button onClick={gotoLogin} className="cta-btn cta-btn-secondary">Sign up/Sign in</button>
      </div>

      {/* Stats Section */}
      <div className="stats">
        <div className="stat-item">
          <h3>231</h3>
          <p>Hospitals Associated with us</p>
        </div>
        <div className="stat-item">
          <h3>3441</h3>
          <p>Happy Patients</p>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="feature-item">
          <h4>Online Appointment bookings</h4>
          <p> Save your time with our hassel free appointment booking.</p>
        </div>
        <div className="feature-item">
          <h4>Digital copies of diagnostic images.</h4>
          <p>A secure copy of all your medical imaging and presciprtion at your fingertips.</p>
        </div>
        <div className="feature-item">
          <h4>Real-Time updates</h4>
          <p>No more wandering outside the ICU.Enjoy real time surgery updates keeping you at peace</p>
        </div>
        <div className="feature-item">
          <h4>Online bills and Reciepts</h4>
          <p>Have a hassle-free experience with our verified bills and reciepts valid for all official business.</p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer">
        <p>
          Fully decentralized and completely secure. You privacy is utmost important to you and so it is for us. Delve into the new age healthcare system.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
