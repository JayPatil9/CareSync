import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PinataSDK } from "pinata-web3";
import { initialize,setPatient,upload_image } from "../backend/backend";
import "../stylesheets/patientForm.css";
import { Search } from "lucide-react";


const JWT = import.meta.env.VITE_JWT;
const gateway = import.meta.env.VITE_GATEWAY;
const pinata = new PinataSDK({
    pinataJwt: JWT,
    pinataGateway: gateway,
});

const Form = () => {

    const navigate = useNavigate()
    const gotoProfile = () => {
        navigate("/patient-profile")
    }

    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [address, setAddress] = useState(null);

    const [name, setName] = useState(null);
    const [image, setImage] = useState(null);
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [dob, setDob] = useState(null);
    const [gender, setGender] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [addr, setAddr] = useState(null);
    const [bloodGroup, setBloodGroup] = useState(null);
    const [allergies, setAllergies] = useState(null);
    const [chronicConditions, setChronicConditions] = useState(null);
    const [medications, setMedications] = useState(null);
    const [emergencyContact, setEmergencyContact] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const interact = async (e) => {
        e.preventDefault();
        if(password && password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }
        else if(name && image && height && weight && dob && email && phone && address && bloodGroup) {
            try {    
                await initialize(setWeb3,setContract,setAddress);
                const imghash = await upload_image(pinata,image);
                const patient = {
                    name: name,
                    image: imghash,
                    height: height,
                    weight: weight,
                    dob: dob,
                    gender: gender,
                    email: email,
                    phone: phone,
                    address: addr,
                    bloodGroup: bloodGroup,
                    allergies: allergies,
                    chronicConditions: chronicConditions,
                    medications: medications,
                    emergencyContact: emergencyContact,
                    password: password
                };
                const ipfsHash = await pinata.upload.json(patient);
                await setPatient(web3,address,contract,ipfsHash.IpfsHash);
                gotoProfile();
            } catch(error) {
                console.error('Error:', error);
                alert("There was an error!");
            }
        }
        else {
            alert("Please fill all the required fields");
        }
    }

    return (
        <div className="form--div">
        <form className="patient--form" action="">
            <h1 className="form--h1">Update Profile</h1>

            <label htmlFor="fullName">*Full Name:</label>
            <input onChange={(e) => setName(e.target.value)} type="text" id="fullName" name="fullName" required></input>
            
            <label htmlFor="image">*Image:</label>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" name="image" required></input>

            <label htmlFor="height">*Height (in cm):</label>
            <input
            type="number"
            id="height"
            name="height"
            step="0.1"
            onChange={(e) => setHeight(e.target.value)}
            required
            ></input>

            <label htmlFor="weight">*Weight (in kg):</label>
            <input
            type="number"
            id="weight"
            name="weight"
            step="0.1"
            onChange={(e) => setWeight(e.target.value)}
            required
            ></input>

            <label htmlFor="dob">*Date of Birth:</label>
            <input onChange={(e) => setDob(e.target.value)} type="date" id="dob" name="dob" required></input>

            <label htmlFor="gender">*Gender:</label>
            <select onChange={(e) => setGender(e.target.value)} id="gender" name="gender" required>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            </select>
            <label htmlFor="phone">*Phone No.:</label>
            <input onChange={(e) => setPhone(e.target.value)} type="tel" id="phone" name="phone" required></input>

            <label htmlFor="email">*Email:</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" required></input>

            <label htmlFor="address">*Address:</label>
            <textarea onChange={(e) => setAddr(e.target.value)} id="address" name="address" required></textarea>

            <label htmlFor="bloodGroup">*Blood Group:</label>
            <input onChange={(e) => setBloodGroup(e.target.value)} type="text" id="bloodGroup" name="bloodGroup"></input>

            <label htmlFor="allergies">Allergies:</label>
            <input onChange={(e) => setAllergies(e.target.value)} type="text" id="allergies" name="allergies"></input>

            <label htmlFor="chronicConditions">Chronic Conditions:</label>
            <input
            type="text"
            id="chronicConditions"
            name="chronicConditions"
            onChange={(e) => setChronicConditions(e.target.value)}
            ></input>

            <label htmlFor="medications">Medications:</label>
            <input onChange={(e) => setMedications(e.target.value)} type="text" id="medications" name="medications"></input>

            <label htmlFor="emergencyContact">Emergency Contact:</label>
            <input
            type="text"
            id="emergencyContact"
            name="emergencyContact"
            onChange={(e) => setEmergencyContact(e.target.value)}
            required
            ></input>

            <label htmlFor="password">*Update Password:</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" required></input>

            <label htmlFor="confirmPassword">*Confirm Password:</label>
            <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            ></input>

            <button onClick={interact} type="submit">Submit</button>
        </form>
        </div>
    );
};

export default Form;
