import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PinataSDK } from "pinata-web3";
import { initialize,setDoctor,upload_image } from "../backend/backend";
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
    const [gender, setGender] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [addr, setAddr] = useState(null);
    const [specialization, setSpecialization] = useState(null);
    const [emergencyContact, setEmergencyContact] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

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

    const interact = async (e) => {
        e.preventDefault();
        if(password && password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }
        else if(name && image && email && phone && addr && specialization) {
            try {    
                await initialize(setWeb3,setContract,setAddress);
                const imghash = await upload_image(pinata,image);
                const patient = {
                    name: name,
                    image: imghash,
                    gender: gender,
                    email: email,
                    phone: phone,
                    caddress: addr,
                    specialization: specialization,
                    emergencyContact: emergencyContact,
                    password: password
                };
                const ipfsHash = await pinata.upload.json(patient);
                await setDoctor(web3,address,contract,ipfsHash.IpfsHash,name);
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

            <label htmlFor="specialization">*Specialization:</label>
            <input onChange={(e) => setSpecialization(e.target.value)} type="text" id="specialization" name="specialization" required></input>

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

            <label htmlFor="address">*Clinic Address:</label>
            <textarea onChange={(e) => setAddr(e.target.value)} id="address" name="address" required></textarea>

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
