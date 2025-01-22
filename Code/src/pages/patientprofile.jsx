import React from "react";
import "./ProfileCard.css"; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const ProfileCard = () => {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <img className="profilephoto" src="./profilephoto.jpg" alt="Profile" />
        <div className="userName">
          <h1>Yashodhan Zingade</h1>
        </div>
        <p className="email">yZ@caresync.com</p>
      </div>
      <div className="profile-details">
        <div className="detail">
          <span className="label">Patient ID : </span>
          <span className="value">231030069</span>
        </div>
        <div className="detail">
          <span className="label">Website: </span>
          <span className="value">
            <a href="https://figma.com">caresync</a>
          </span>
        </div>
        <div className="detail">
          <span className="label">Gender : </span>
          <span className="value">Male</span>
        </div>
        <div className="detail">
          <span className="label">Height : </span>
          <span className="value">170cm</span>
        </div>
        <div className="detail">
          <span className="label">Weight : </span>
          <span className="value">85kg | 187.39lbs</span>
        </div>
        <div className="detail">
          <span className="label">Date Of Birth : </span>
          <span className="value">9th October 2005</span>
        </div>
        <div className="detail">
          <span className="label">Type:</span>
          <span className="value">Active | No Bill Dues</span>
        </div>
        <div className="detail">
          <span className="label">Registry Date:</span>
          <span className="value">April 16, 2022</span>
        </div>
        <div className="detail">
          <span className="label">Blood Group : </span>
          <span className="value">B+</span>
        </div>
        <div className="detail">
          <span className="label">Address</span>
          <span className="value">
            Bhavani Peth,<br /> Solapur
          </span>
        </div>
        <div className="detail">
          <span className="label">Contact Number</span>
          <span className="value">8149414692</span>
        </div>
      </div>
      <div className="profile-footer">
        <a href="#" style={{ textDecoration: "none" }}>
          <p className="tag">
            Emergency Call <FontAwesomeIcon icon={faPhone} />
          </p>
        </a>
        <p className="category">Recent Prescriptions : </p>
        <p className="assignee">
          Samet Özkale <br />
          <span className="handle">Email: sametO@gmail.com</span>
        </p>
        <p className="date">Nov 13, 2024</p>
        <div className="pdf-container">
          <object data="path/to/your/file.pdf" type="application/pdf">
            <div className="flex">
              <h4>Recent Medication Docs</h4>
              <div className="prescription">
                <pre>
                  <a href="/Prescription.pdf">Download</a>
                </pre>
              </div>
            </div>
          </object>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;