import React from 'react'
import '../stylesheets/SignUpPage_Patient.css';
import IMG from '../assets/bg_photo_3.jpg';


const SignUpPage2 = () => {

    // const [action, setAction] = useState ('');
    // const registerLink = () =>{
    //     setAction('active');
    // }

  return (
    <div  style={{
    fontFamily: '"Poppins", serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: `url(${IMG}) no-repeat center/cover`,
    // backgroundSize: Cover,
    // backgroundPosition: center,
  }} className= 'meow-body'>
        {/* <div className="form-box login">
            
            <form action="">    
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" 
                    placeholder='Username' required />
                </div>
                <div className="input-box">
                    <input type="password" 
                    placeholder='Password' required />
                </div>


                <div className="remember-forgot">
                    <label><input type="Checkbox" />Remember Me</label>
                    <a href="#">Forgot Password?</a>
                </div>

                <button type ="submit">Login</button>

                <div className="register-link">
                    <p>Don't have an account? <a href='#'>Register</a>
                    </p>
                </div>
            </form>
        </div> */}

<div className="form-box register">
            
            <form className="sign-patient-form" action="">   
                <h1>Registration</h1>
                <div className="input-box">
                    <input type="text"
                    placeholder='Name' required />
                </div>
                <div className="input-box">
                    <input type="email" 
                    placeholder='Email Id' required />
                </div>
                <div className="input-box">
                    <input type="tel" 
                    placeholder='Phone No.'
                    pattern='[0-9]{10}' required />
                </div>
                <div className="input-box">
                    <input type="text" 
                    placeholder='Medical Issue' required />
                </div>
                <div className="input-box">
                    <input type="password" 
                    placeholder='Password' required />
                </div>


                <div className="remember-forgot">
                    <label><input type="Checkbox" />I agree to the terms and conditions that apply</label>
                </div>

                <button type ="submit">Register</button>

                <div className="register-link">
                    <p>Already have an account? <a href='#'>Login</a>
                    </p>
                </div>
            </form>
        </div>



    </div>
  );
};

export default SignUpPage2
