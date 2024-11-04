// src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                alert('Inicio de sesión exitoso');
                navigate('/dashboard'); // Redirige al Dashboard
            } else {
                alert('Error al iniciar sesión. Verifique sus credenciales.');
            }
        } catch (error) {
            console.error('Error en la solicitud de inicio de sesión:', error);
            alert('Error al iniciar sesión. Verifique sus credenciales.');
        }
    };

    return (
        <div className="login-container">
            <div 
                className="login-left" 
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL + '/login1.png'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
            </div>
            <div className="login-right">
                <form onSubmit={handleLogin} className="login-form">
                    <h2>Welcome!</h2>
                    <div className="input-group">
                        <i className="icon-user"></i>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <i className="icon-lock"></i>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <p className="forgot-password">Forgot Password?</p>
                    <button type="submit" className="login-button">LOGIN</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
