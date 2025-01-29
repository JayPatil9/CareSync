import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { initialize,getPatient,getDoctor } from "../backend/backend"
import "../stylesheets/login.css"

export default function Login() {

    const [toggle,setToggle] = useState("")
    const [pemail,setPEmail] = useState("")
    const [ppassword,setPPassword] = useState("")
    const [demail,setDEmail] = useState("")
    const [dpassword,setDPassword] = useState("")

    const [patient, setPatient] = useState({});
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
            await getPatient(address,contract,setPatient);
            await getDoctor(address,contract,setDoctor);
            }
        } catch (error) {
            console.error('Error:', error);
            alert("There was an error!");
        }
        };
        loadData();
    }, [contract]);

    function changeMind() {
        setToggle((prevState) => {
            return (prevState==="")?"active":""
        })
    }

    const navigate = useNavigate()
    const gotoSignUpDoc = () => {
        navigate("/signup-doctor")
    }
    const gotoSignUpPatient = () => {
        navigate("/signup-patient")
    }

    const gotoDashboard = () => {
        if(pemail==="" || ppassword==="") {
            alert("Please fill in all the fields")
        }
        else if(patient.email!==pemail || patient.password!==ppassword) {
            console.log(patient.email,patient.password)
            alert("Invalid credentials")
        }
        else navigate("/dashboard")
    }

    const gotoDLogbook = () => {
        if(demail==="" || dpassword==="") {
            alert("Please fill in all the fields")
        }
        else if(doctor.email!==demail || doctor.password!==dpassword) {
            alert("Invalid credentials")
        }
        else navigate("/doctor-logbook")
    }

    return (
        <div className="login--body">
        <div className={"login--container "+ toggle} id="container">
        <div className="form-container sign-up">
            <form>
                <h1>Sign In</h1>
                <input onChange={(e) => setDEmail(e.target.value)} type="email" placeholder="Email" required/>
                <input onChange={(e) => setDPassword(e.target.value)} type="password" placeholder="Password" required/>
                <a href="#">Forget Your Password?</a>
                <input type="submit" className="login--button" onClick={gotoDLogbook} placeholder="Password" />
            </form>
        </div>
        <div className="form-container sign-in">
            <form>
                <h1>Sign In</h1>
                <input onChange={(e) => setPEmail(e.target.value)} id="pemail" type="email" placeholder="Email" required/>
                <input onChange={(e) => setPPassword(e.target.value)} id="ppassword" type="password" placeholder="Password" required/>
                <a href="#">Forget Your Password?</a>
                <input type="submit" className="login--button" onClick={gotoDashboard} placeholder="Password" />
            </form>
        </div>
        <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel toggle-left">
                    <h1>Hey Doc!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button onClick={gotoSignUpDoc} className="hidden" id="login">Sign Up</button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Hello, Friend!</h1>
                    <p>Register with your personal details to use all of site features</p>
                    <button onClick={gotoSignUpPatient} className="hidden" id="register">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
    <div className="tog-txt" onClick={changeMind}>
        {
        toggle===""
        ?<p>Hey Doc! <a href="#">Login here.</a></p>
        :<p><a href="#">Login</a> as a Patient.</p>
        }
    </div>
    </div>
    )
}