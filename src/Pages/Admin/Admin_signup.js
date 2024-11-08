import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import Img1 from '../../Assets/Images/swigy_one.jpg'; 
import { signup } from '../../Services/adminauthService'; 

function Signup() {
    const navigate = useNavigate(); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin'); // Add role state
    const [message, setMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await signup(name, email, password, role); // Pass role to signup function
            setMessage('Signup successful! You can now login.');
            navigate('/admin-login'); 
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleLoginClick = () => {
        navigate('/admin-login'); 
    };

    return (
        <div className="flex flex-col items-center pt-20 px-5">
            <div className="flex flex-col items-center w-[30vw]">
                <div className="flex items-center justify-between w-full mb-5">
                    <h2 className="text-2xl text-gray-800">Signup</h2>
                    <img src={Img1} alt="Swigy" className="h-[10vh] object-contain" />
                </div>
                <p className="text-lg text-gray-600 mb-5">
                    or{' '}
                    <span
                        className="text-orange-600 cursor-pointer"
                        onClick={handleLoginClick}
                    >
                        Login to your account
                    </span>
                </p>
                <form onSubmit={handleSignup} className="flex flex-col items-center w-full">
                    <input 
                        className="w-full h-[10vh] p-2 mb-3 border border-gray-300 rounded-md text-lg box-border"
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input 
                        className="w-full h-[10vh] p-2 mb-3 border border-gray-300 rounded-md text-lg box-border"
                        id="email"
                        type="text"
                        placeholder="Enter your E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        className="w-full h-[10vh] p-2 mb-3 border border-gray-300 rounded-md text-lg box-border"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        maxLength="10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input 
                        className="w-full h-[10vh] p-2 mb-3 border border-gray-300 rounded-md text-lg box-border"
                        id="role"
                        type="text"
                        placeholder="Enter role (admin/user)"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    <p className="text-lg text-gray-600 mb-3">Have a referral code?</p>
                    <button
                        className="w-full h-[10vh] bg-orange-600 text-white border-none rounded-md text-lg cursor-pointer"
                        type="submit"
                    >
                        SIGN UP
                    </button>
                </form>
                {message && <p className="text-red-600 mt-3">{message}</p>}
            </div>
        </div>
    );
}

export default Signup;
