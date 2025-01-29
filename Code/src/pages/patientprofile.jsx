import { useState,useEffect } from "react";
import 'react';
import { getPatient,initialize,gateway } from "../backend/backend";
import { useNavigate } from "react-router-dom";
import "../stylesheets/patientprofile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import IMG from "../assets/caresync_logo.png";


const ProfileCard = () => {

  const navigate = useNavigate()
  const gotoUpdate = () => {
      navigate("/patient-form")
  }

  const [patient, setPatient] = useState({});
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        await initialize(setWeb3,setContract,setAddress);
      } catch (error) {
        console.error('Error:', error);
        alert("There was an error!");
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        if(contract) {
          await getPatient(address,contract,setPatient);
        }
      } catch (error) {
        console.error('Error:', error);
        alert("There was an error!");
      }
    };
    loadData();
    // console.log("https://"+gateway+"/ipfs/"+patient.image);
  }, [contract]);


  return (
    <div className="profile--body">
    <div className="profile-card">
      <div className="profile-header">
        <img className="profilephoto" src={patient.image?"https://"+gateway+"/ipfs/"+patient.image:IMG} alt="Profile" />
        <div className="userName">
          <h1 className="profile--h1">{patient.name?patient.name:"N/A"}</h1>
        </div>
        <p className="email">{patient.email?patient.email:"N/A"}</p>
      </div>
      <div className="profile-details">
        <div className="detail">
          <span className="label">Patient ID : </span>
          <span className="value">231030069</span>
        </div>
        <div className="detail">
          <span className="label">Age : </span>
          <span className="value">
          {patient.age?patient.age:"N/A"}
          </span>
        </div>
        <div className="detail">
          <span className="label">Gender : </span>
          <span className="value">{patient.gender?patient.gender:"N/A"}</span>
        </div>
        <div className="detail">
          <span className="label">Height : </span>
          <span className="value">{patient.height?patient.height+"cm":"N/A"}</span>
        </div>
        <div className="detail">
          <span className="label">Weight : </span>
          <span className="value">{patient.weight?patient.weight+"kg":"N/A"}</span>
        </div>
        <div className="detail">
          <span className="label">Date Of Birth : </span>
          <span className="value">{patient.dob?patient.dob:"N/A"}</span>
        </div>
        <div className="detail">
          <span className="label">Type:</span>
          <span className="value">Active | No Bill Dues</span>
        </div>
        <div className="detail">
          <span className="label">Registry Date:</span>
          <span className="value">{patient.date?patient.date:"N/A"}</span>
        </div>
        <div className="detail">
          <span className="label">Blood Group : </span>
          <span className="value">{patient.bloodGroup?patient.bloodGroup:"N/A"}</span>
        </div>
        <div className="detail">
          <span className="label">Address</span>
          <span className="value">
          {patient.address?patient.address:"N/A"}
          </span>
        </div>
        <div className="detail">
          <span className="label">Contact Number</span>
          <span className="value">{patient.phone?patient.phone:"N/A"}</span>
        </div>
      </div>
      <div className="profile-footer">
        <a href="#" style={{ textDecoration: "none" }}>
          <p className="tag">
            Emergency Call <FontAwesomeIcon icon={faPhone} />
          </p>
        </a>
        <p className="profile--button" onClick={gotoUpdate}>Update</p>
        {/* <p className="category">Recent Prescriptions : </p>
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
        </div> */}
      </div>
      {/* <button className="profile--button">Update</button> */}
    </div>
    </div>
  );
};

export default ProfileCard;