import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../stylesheets/login.css"

export default function Login() {

    const [toggle,setToggle] = useState("")

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
        navigate("/dashboard")
    }

    return (
        <div className="login--body">
        <div className={"login--container "+ toggle} id="container">
        <div className="form-container sign-up">
            <form>
                <h1>Sign In</h1>
                <input type="email" placeholder="Email" required/>
                <input type="password" placeholder="Password" required/>
                <a href="#">Forget Your Password?</a>
                <input type="submit" className="login--button" placeholder="Password" />
            </form>
        </div>
        <div className="form-container sign-in">
            <form>
                <h1>Sign In</h1>
                <input id="pemail" type="email" placeholder="Email" required/>
                <input id="ppassword" type="password" placeholder="Password" required/>
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