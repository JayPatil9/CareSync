import React from 'react';
import { X,Grid3X3 } from 'lucide-react';
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { initialize,getDoctor,gateway,getPatientsData,assignPatient,Filter } from "../backend/backend";
import '../stylesheets/Doctor_Logbook.css';
import IMG from '../assets/caresync_logo.png';
import BIMG from '../assets/bg_photo_3.jpg';
import Card from '../components/Card';


const Doctor_Logbook = () => {

  const [doctor, setDoctor] = useState({});
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [squares, setSquares] = useState(null);
  const [toggle, setToggle] = useState(true);
  const [assignPatientId, setAssignPatientId] = useState(null);
  const [assignTreatment, setAssignTreatment] = useState(null);

  const navigate = useNavigate();
  const gotoDProfile = () => {  
      navigate("/doctor-profile");
  };

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

  const loadData = async () => {
    try {
        if(contract) {
        await getDoctor(address,contract,setDoctor);
        const data = await getPatientsData(address,contract);
        const temp = await Filter(data,IMG);
        setSquares(temp);
        // console.log(typeof(temp));
        }
    } catch (error) {
        console.error('Error:', error);
        alert("There was an error!");
    }
    };


  useEffect(() => {
      loadData();
  }, [contract]);

  const assign = async () => {
    try {
        let flag = false;
        if(!assignPatientId || !assignTreatment) {
            alert("Please fill all the fields!");
            return;
        }
        if(contract) {
            flag = await assignPatient(web3,address,contract,assignPatientId,assignTreatment);
        }
        if(flag) {
            alert("Patient Assigned Successfully!");
            setToggle(!toggle);
            loadData();
        }
    } catch (error) {
        console.error('Error:', error);
        alert("There was an error!");
    }
  };

  if(toggle) {
  return (
    <div className="logbook-body">
    <div className="logbook-container">
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
          <div onClick={gotoDProfile} className="profile-pic">
            <img className='profile-pic' src={doctor.image?"https://"+gateway+"/ipfs/"+doctor.image:IMG} alt="Profile" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <div className="squares-grid">
          {
              squares && squares.map((square, index) => (
                  <Card key={index} square={square} index={index} />
              ))
          }
        </div>
      </div>
      <button onClick={() => setToggle(!toggle)} className="add-button">+</button>
    </div>
    </div>
  );
    } else {
    return(
      <>
      <div style={{background: `url(${BIMG}) no-repeat center/cover`}} className="assign-body">
      <div className="assign-card">
        <div className="assign-header">
          <h2 className="assign-title">Add Patient</h2>
          <X size={40} className="assign-close" onClick={() => setToggle(!toggle)} />
        </div>
        <div className="assign-form">
          <input type="number" placeholder="Patient Id" className="assign-input" onChange={(e) => setAssignPatientId(e.target.value)} required/>
          <br />
          <input type="text" placeholder="Treatment" className="assign-input" onChange={(e) => setAssignTreatment(e.target.value)} required/>
          <br />
          <button onClick={assign} className="assign-button">Assign</button>
        </div>
      </div>
    </div>
    </>
    );
  }
};

export default Doctor_Logbook;