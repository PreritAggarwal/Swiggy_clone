import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import '../Style/Sign_up.css';
import Img1 from './swigy_one.jpg'; 
import { signup } from '../authService'; // Import the signup function


function Signup() {
    const navigate = useNavigate(); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await signup(name, email, password);
            setMessage('Signup successful! You can now login.');
            navigate('/login'); // Redirect to login after successful signup
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleLoginClick = () => {
        navigate('/login'); 
    };

    return (

     <div className="parent">
        <div className="main_signup">
            <div className="first_part_signup">
                <div className="head_one_signup">
                    <h2>Signup</h2>
                </div>
                <div className="image_signup">
                    <img src={Img1} alt="Swigy" />
                </div>
            </div>
            <div className="para_one_signup">
                <p>or <span className="login_link" onClick={handleLoginClick}>Login to your account</span></p>
            </div>
            <div className="input_signup">
                <form onSubmit={handleSignup}>
                    <input 
                        className="input_name"
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input 
                        className="input_email"
                        id="email"
                        type="text"
                        placeholder="Enter your E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        className="input_password"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        maxLength="10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="refferal">Have a referral code?</p>
                    <button className="button_signup" type="submit">SIGN UP</button>
                </form>
                
            </div>
        </div>
        </div>
        
    );
}

export default Signup;
