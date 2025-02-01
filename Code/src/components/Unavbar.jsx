import React from "react";
import IMG from "../assets/caresync_logo.png";
// import { FaUserMd } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav id="sec">
      <div id="logo">
        <img src={IMG} alt="Logo" />
      </div>
      <div className="navbar-links">
        <a href="#logbook">Logbook</a>
        <a href="#calendar">Calendar</a>
      </div>
      <div id="profile">
        <img src="profile-pic-url.jpg" alt="Profile" />
      </div>
    </nav>
  );
};

export default Navbar;
