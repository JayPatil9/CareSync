import React from 'react';
import { Menu, Plus, Grid3X3 } from 'lucide-react';
import './Doctor_Logbook.css';
import IMG from '../assets/caresync_logo.png';
import { FaCircleUser } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";


const ClassroomSquares = ({ squares = [{name:"Kartik Sharma",treatment:"Fever",bgColor:"#b6fff4",profilePic:IMG},{name:"Mr.Mehta",treatment:"Fever",bgColor:"#000000",profilePic:IMG}] }) => {
  return (
    <div className="classroom-container">
      {/* Top Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-left">
          {/* <Menu className="icon" /> */}
          <img src={IMG} alt="Classroom" className="logo" />
          <span className="title">Patient Logbook</span>
        </div>
        <div className="navbar-right">
          {/* <Plus className="icon" /> */}
          <span className="doc_nb_contents_1">Calendar</span>
          <Grid3X3 className="icon" />
          <div className="profile-pic"></div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <div className="squares-grid">
          {squares.map((square, index) => (
            <div key={index} className="square">
              <div 
                className="square-header" 
                style={{ backgroundColor: square.bgColor }}
              >
                <div className="square-text">
                  <h2 className="square-title">{square.name}</h2>
                  <p className="treatment-text">{square.treatment}</p>
                </div>
                <div className="profile-circle">
                  <img 
                    src={square.profilePic} 
                    alt={square.name} 
                    className="profile-image"
                  />
                </div>
              </div>
              <div className="square-footer">
                <button className="icon-button">
                  <FaCircleUser />
                </button>
                <button className="icon-button">
                  <CgWebsite />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassroomSquares;