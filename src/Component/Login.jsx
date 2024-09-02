// src/Component/Login.js
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import '../Style/Login.css';
import Img1 from './swigy_one.jpg'; 
import { login } from '../authService'; // Import the login function

function Login() {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [ws, setWs] = useState(null); // WebSocket state

    useEffect(() => {
        // Create WebSocket connection
        const socket = new WebSocket('ws://localhost:3000/ws');

        // Set up WebSocket event handlers
        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            console.log('Message from server:', event.data);
            setMessage(event.data); // Handle incoming messages
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setWs(socket);

        // Cleanup on component unmount
        return () => {
            socket.close();
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Call the login function
            await login(email, password);
            
            // Send login data via WebSocket
            if (ws) {
                ws.send(JSON.stringify({ type: 'login', email, password }));
            }

            setMessage('Login successful!');
            navigate('/');
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleCreateAccountClick = () => {
        navigate('/signup'); 
    };

    return (
        <div className="main">
            <div className="first_part">
                <div className="head_one">
                    <h2>Login</h2>
                </div>
                <div className="image">
                    <img src={Img1} alt="Swigy" />
                </div>
            </div>
            <div className="para_one">
                <p>or <span className="create_acc" onClick={handleCreateAccountClick}>create an account</span></p>
            </div>
            <div className="input">
                <form onSubmit={handleLogin}>
                    <input 
                        className="input_login"
                        id="Email"
                        type="text"
                        placeholder="Enter your Email"
                    
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        className="input_login"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                    
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="button_login" type="submit">LOGIN</button>
                </form>
                {/* {message && <p>{message}</p>} */}
            </div>
        </div>
    );
}

export default Login;
