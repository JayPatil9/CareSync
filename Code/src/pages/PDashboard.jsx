import { NavBar } from "../components/PDnavbar";
import { Content } from "../components/PDcontent";
import { Floor } from "../components/PDfloor";
import "../stylesheets/PD.css";

export const App = () => {
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
    patientInfo: { date: "2025-01-10", time: "10:00 AM" },
    vitals: {
      bloodPressure: { systolic: 120, diastolic: 80, unit: "mmHg" },
      heartRate: { value: 72, unit: "bpm" },
      oxygenSaturation: { value: 98, unit: "%" },
    }
  };

  const nextAppointment = {
    date: "2025-01-15",
    day: "Wednesday",
    time: "2:00 PM",
  };

  const doctors = ["Dr. Smith", "Dr. Johnson"];

  const floorLinks = [{ label: "Help" }, { label: "Contact Us" }];

  return (
    <>
    <div className=".pd--body">
      <NavBar menuItems={menuItems} logoSrc={logoSrc} profileSrc={profileSrc} />
      <Content
        patientUpdate={patientUpdate}
        nextAppointment={nextAppointment}
        doctors={doctors}
      />
      <Floor links={floorLinks} />
    </div>
    </>
  );
};

export default App;
