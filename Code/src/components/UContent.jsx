import React, { useState,useEffect } from "react";
import { initialize,getPatient,setVitals,setNextAppointment,getPatientbyID,JWT,gateway } from "../backend/backend";
import {PinataSDK} from 'pinata-web3';

const pinata = new PinataSDK({
  pinataJwt: JWT,
  pinataGateway: gateway,
});

const Content = () => {
  const [showVitalForm, setShowVitalForm] = useState(false);

  const [patient, setPatient] = useState({});
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);

  const [aDate,setaDate] = useState(null);
  const [aTime,setaTime] = useState(null);

  const [vDate,setvDate] = useState(null);
  const [vTime,setvTime] = useState(null);
  const [heartRate,setHeartRate] = useState(null);
  const [bloodPressure,setBloodPressure] = useState(null);
  const [oxygenSaturation,setOxygenSaturation] = useState(null);



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
          let addr = await getPatientbyID(0,contract,setAddress);
          console.log(addr);
        }
      } catch (error) {
        console.error('Error:', error);
        alert("There was an error!");
      }
    };
    loadData();
  }, [contract]);

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
  }, [contract]);


  const setApp = async (e) => {
    e.preventDefault();
    try {
      if(contract) {
        const app = {
          date: aDate,
          time: aTime
      };
      const x = await pinata.upload.json(app);
        await setNextAppointment(web3,address,contract,x.IpfsHash);
      }
    } catch (error) {
      console.error('Error:', error);
      alert("There was an error!");
    }
  }

  const setV = async (e) => {
    e.preventDefault();
    try {
      if(contract) {
        const vitals = {
          date: vDate,
          time: vTime,
          heartRate: heartRate,
          bloodPressure: bloodPressure,
          oxygenSaturation: oxygenSaturation
      };
      const x = await pinata.upload.json(vitals);
        await setVitals(web3,address,contract,x.IpfsHash);
      }
    } catch (error) {
      console.error('Error:', error);
      alert("There was an error!");
    }
  }


  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="left">
          <div className="box">Bills</div>
          <div className="box">Reports</div>
          <div className="box">Prescription</div>
          <div className="box">Post surgery</div>
          <div className="box" onClick={() => setShowVitalForm(true)}>
            Vital entry
          </div>
        </div>

        <div className="right">
          <div className="box">
            <section> Patient contact no.</section>
            <ul className="update-ul">
              <li>{patient.phone?patient.phone:"N/A"}</li>
              <li>{patient.emergencyContact?patient.emergencyContact:"N/A"}</li>
            </ul>
          </div>
          <div className="box">
            <section>Next appointment</section>
            <form className="appointment-form">
              <label htmlFor="appointment-date">Select Date:</label>
              <input
                type="date"
                id="appointment-date"
                name="appointment-date"
                onChange={(e) => setaDate(e.target.value)}
              />
              <label>Time:</label>
              <input type="time" onChange={(e) => setaTime(e.target.value)} required />
              <button type="submit" onClick={setApp}>Submit</button>
            </form>
          </div>
        </div>
      </div>

      {/* Vitals Form Modal */}
      {showVitalForm && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="update-h3">Enter Vitals</h3>
            <form className="vital-form">
              <label>Date:</label>
              <input type="date" onChange={(e) => setvDate(e.target.value)} required />
              <label>Time:</label>
              <input type="time" onChange={(e) => setvTime(e.target.value)} required />
              <label>Heart Rate:</label>
              <input type="text" onChange={(e) => setHeartRate(e.target.value)} placeholder="BPM" />
              <label>Blood Pressure:</label>
              <input type="text" onChange={(e) => setBloodPressure(e.target.value)} placeholder="e.g. 120/80" />
              <label>Oxygen Saturation (O₂):</label>
              <input type="text" onChange={(e) => setOxygenSaturation(e.target.value)} placeholder="e.g. 98%" />
              <div className="modal-buttons">
                <button onClick={setV} type="submit">Submit</button>
                <button onClick={() => setShowVitalForm(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
