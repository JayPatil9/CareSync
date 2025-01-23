import { NavBar } from "../components/PDnavbar";
import { Content } from "../components/PDcontent";
import { Floor } from "../components/PDfloor";
import { initialize,getAppointments, getVitals, getMyDoctors } from "../backend/backend";
import { useEffect, useState } from "react";
import "../stylesheets/PD.css";
import { useNavigate } from "react-router-dom";

export const App = () => {

  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState(null);
  const [appointments, setAppointments] = useState(null);
  const [vitals, setVitals] = useState(null);
  const [Doctors, setDoctors] = useState(null);

    const navigate = useNavigate()
    const gotoProfile = () => {
        navigate("/patient-profile")
    }


  useEffect(() => {
    const loadWeb3 = async () => {
      await initialize(setWeb3, setContract, setAddress);
    }
    loadWeb3();
    
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await getAppointments(address,contract,setAppointments);
      await getVitals(address,contract,setVitals);
      await getMyDoctors(address,contract,setDoctors);
    }
    if (web3 && contract && address) {
      loadData();
      // console.log(appointments);
    }
  }, [web3, contract, address]);


  const menuItems = [
    { label: "Post Surgery", link: "#" },
    { label: "Bills", link: "#" },
    { label: "Prescription", link: "#" },
    { label: "Reports", link: "#" },
  ];

  const logoSrc =
    "https://marketplace-assets-production.s3-us-west-2.amazonaws.com/vault/items/preview-57bac524-6254-4fc8-a395-671c0a14153b-6MOww.jpg";
  const profileSrc =
    "https://th.bing.com/th?id=OIP.XadmtOiEEI6Zv388n5l2dQHaHx&w=244&h=256&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2";

  const patientUpdate = {
    date: "loading",
    time: "loading",
    bloodPressure: "loading",
    heartRate: "loading",
    oxygenSaturation: "loading",
  };

  const nextAppointment = {
    date: "loading",
    day: "loading",
    time: "loading",
  };



  const doctors = ["loading"];

  const floorLinks = [{ label: "Help" }, { label: "Contact Us" }];

  

  return (
    <>
    <div className=".pd--body">
      <NavBar link={gotoProfile} menuItems={menuItems} logoSrc={logoSrc} profileSrc={profileSrc} />
      <Content
        patientUpdate={vitals?vitals:patientUpdate}
        nextAppointment={appointments?appointments:nextAppointment}
        doctors={Doctors?Doctors:doctors}
      />
      <Floor links={floorLinks} />
    </div>
    </>
  );
};

export default App;
