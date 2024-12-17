import { useState } from "react"

export default function NavBar() {

    const [toggle,setToggle] = useState("")

    function changeMind() {
        setToggle((prevState) => {
            return (prevState==="")?"active":""
        })
    }

    return (
        <>
        <div className={"container "+ toggle} id="container">
        <div className="form-container sign-up">
            <form>
                <h1>Sign In</h1>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <a href="#">Forget Your Password?</a>
                <button>Sign In</button>
            </form>
        </div>
        <div className="form-container sign-in">
            <form>
                <h1>Sign In</h1>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <a href="#">Forget Your Password?</a>
                <button>Sign In</button>
            </form>
        </div>
        <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel toggle-left">
                    <h1>Hey Doc!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button className="hidden" id="login">Sign Up</button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Hello, Friend!</h1>
                    <p>Register with your personal details to use all of site features</p>
                    <button className="hidden" id="register">Sign Up</button>
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
    </>
    )
}