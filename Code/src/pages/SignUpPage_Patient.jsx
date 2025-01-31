import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PinataSDK } from "pinata-web3";
import {
  gateway,
  initialize,
  addPatient,
  JWT,
  getPatient,
} from "../backend/backend";
import "../stylesheets/SignUpPage_Patient.css";
import IMG from "../assets/signuppagebg.jpg";

const PatientSignUpPage = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState(null);

  const [patient, setPatient_] = useState({});
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [medicalIssue, setMedicalIssue] = useState(null);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();
  const gotoLogin = () => {
    navigate("/login");
  };
  const gotoDashboard = () => {
    navigate("/dashboard");
  };

  const pinata = new PinataSDK({
    pinataJwt: JWT,
    pinataGateway: gateway,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        await initialize(setWeb3, setContract, setAddress);
      } catch (error) {
        console.error("Error:", error);
        alert("There was an error!");
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (contract) {
          await getPatient(address, contract, setPatient_);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    loadData();
  }, [contract]);

  const interact = async (e) => {
    e.preventDefault();

    if (patient.name) {
      alert("Patient already exists!");
      gotoLogin();
    }

    if (name && email && phone && medicalIssue && password) {
      try {
        await initialize(setWeb3, setContract, setAddress);
        const patient = {
          name: name,
          email: email,
          phone: phone,
          medicalIssue: medicalIssue,
          password: password,
        };
        const ipfsHash = await pinata.upload.json(patient);
        const flag = await addPatient(
          web3,
          address,
          contract,
          ipfsHash.IpfsHash
        );
        if (flag) {
          gotoDashboard();
        }
      } catch (error) {
        console.error("Error:", error);
        alert("There was an error!");
      }
    }
  };

  return (
    <div
      style={{
        fontFamily: '"Poppins", serif',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: `url(${IMG}) no-repeat center/cover`,
        // backgroundSize: Cover,
        // backgroundPosition: center,
      }}
      className="meow-body"
    >
      <div className="form-box register">
        <form className="sign-patient-form" action="">
          <h1>Registration</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email Id"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="tel"
              placeholder="Phone No."
              pattern="[0-9]{10}"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Medical Issue"
              onChange={(e) => setMedicalIssue(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="remember-forgot">
            <label>
              <input type="Checkbox" />I agree to the terms and conditions that
              apply
            </label>
          </div>

          <button onClick={(e) => interact(e)} type="submit">
            Register
          </button>

          <div className="register-link">
            <p>
              Already have an account? <a href="#">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientSignUpPage;
