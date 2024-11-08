import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { login } from '../../Services/adminauthService';
import Img1 from '../../Assets/Images/swigy_one.jpg';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            console.log('Login response:', response);

            // Save adminId and role in localStorage
            localStorage.setItem('adminId', response.adminId);
            localStorage.setItem('role', response.role); // Save the role if available
            setMessage('Login successful!');
            navigate(`/welcome`, { state: { adminId: response.adminId, role: response.role } }); // Pass role to welcome page
        } catch (error) {
            console.error('Login error:', error);
            setMessage('Login failed. Please check your credentials.');
        }
    };

    const handleCreateAccountClick = () => {
        navigate('/admin-signup');
    };

    const handleForgotPasswordClick = () => {
        navigate('/admin-ForgotPassword');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen p-5">
            <div className="flex w-[30vw] h-[20vh] justify-between items-center mb-5">
                <div className="flex flex-col items-start">
                    <h2 className="text-2xl text-gray-800 mb-2">Admin Login</h2>
                    <p className="text-lg text-gray-600">
                        or{' '}
                        <span
                            className="text-orange-600 cursor-pointer"
                            onClick={handleCreateAccountClick}
                        >
                            create an account
                        </span>
                    </p>
                </div>
                <div className="mb-5">
                    <img src={Img1} alt="Swigy" className="h-[100px] object-contain" />
                </div>
            </div>

            <div className="flex flex-col items-center w-[15vw] h-[20vh]">
                <form onSubmit={handleLogin} className="flex flex-col items-center">
                    <input
                        className="w-[30vw] h-[10vh] p-2 mb-5 border-none rounded-md text-lg box-border"
                        id="Email"
                        type="text"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="w-[30vw] h-[10vh] p-2 mb-5 border-none rounded-md text-lg box-border"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="w-[30vw] h-[10vh] bg-orange-600 text-white border-none rounded-md text-lg cursor-pointer overflow-hidden"
                        type="submit"
                    >
                        LOGIN
                    </button>
                </form>
                <p
                    className="text-blue-600 cursor-pointer mt-3"
                    onClick={handleForgotPasswordClick}
                >
                    Forgot your password?
                </p>
                {message && <p className="text-red-600 mt-3">{message}</p>}
            </div>
        </div>
    );
};

export default Login;
