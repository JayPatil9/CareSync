import { useState,useEffect } from "react";
import 'react';
import { getDoctor,initialize,gateway } from "../backend/backend";
import { useNavigate } from "react-router-dom";
import "../stylesheets/patientprofile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import IMG from "../assets/caresync_logo.png";


const ProfileCard = () => {

  const navigate = useNavigate()
  const gotoUpdate = () => {
      navigate("/doctor-form")
  }

  const [doctor, setDoctor] = useState({});
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
          await getDoctor(address,contract,setDoctor);
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
        <img className="profilephoto" src={doctor.image?"https://"+gateway+"/ipfs/"+doctor.image:IMG} alt="Profile" />
        <div className="userName">
          <h1 className="profile--h1">{doctor.name?doctor.name:"N/A"}</h1>
        </div>
        <p className="email">{doctor.email?doctor.email:"N/A"}</p>
      </div>
      <div className="profile-details">
        <div className="detail">
          <span className="label">Patient ID : </span>
          <span className="value">{doctor.id?doctor.id:"N/A"}</span>
        </div>
        <div className="detail">
          <span className="label">Specialization : </span>
          <span className="value">
          {doctor.specialization?doctor.specialization:"N/A"}
          </span>
        </div>
        <div className="detail">
          <span className="label">Gender : </span>
          <span className="value">{doctor.gender?doctor.gender:"Male"}</span>
        </div>
        <div className="detail">
          <span className="label">Registry Date:</span>
          <span className="value">{doctor.date?doctor.date:"N/A"}</span>
        </div>
        <div className="detail">
          <span className="label">Clinic Address</span>
          <span className="value">
          {doctor.caddress?doctor.caddress:"N/A"}
          </span>
        </div>
        <div className="detail">
          <span className="label">Contact Number</span>
          <span className="value">{doctor.phone?doctor.phone:"N/A"}</span>
        </div>
      </div>
      <div className="profile-footer">
        <a href="#" style={{ textDecoration: "none" }}>
          <p className="tag">
            Emergency Call <FontAwesomeIcon icon={faPhone} />
          </p>
        </a>
        <p className="profile--button" onClick={gotoUpdate}>Update</p>
      </div>
    </div>
    </div>
  );
};

export default ProfileCard;