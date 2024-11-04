// src/pages/Dashboard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Eliminar el token del localStorage
        localStorage.removeItem('token');
        // Redirigir al usuario a la página de inicio de sesión
        navigate('/');
    };

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <h2>SistemaGEI</h2>
                <ul>
                    <li><Link to="/usuarios">Usuarios</Link></li>
                    <li><Link to="/agricultores">Agricultores</Link></li>
                    <li><Link to="/parcelas">Parcelas</Link></li>
                    <li><Link to="/emisiones">Emisiones</Link></li>
                    <li><Link to="/reportes">Reportes</Link></li> {/* Enlace para Reportes */}
                </ul>
                <button className="logout-button" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </aside>
            <main className="main-content">
                <h1>Bienvenido al Dashboard</h1>
                <div className="stats">
                    <div className="stat-card">
                        <h3>Usuarios</h3>
                        <p>250</p>
                    </div>
                    <div className="stat-card">
                        <h3>Agricultores</h3>
                        <p>150</p>
                    </div>
                    <div className="stat-card">
                        <h3>Parcelas</h3>
                        <p>80</p>
                    </div>
                    <div className="stat-card">
                        <h3>Emisiones Registradas</h3>
                        <p>300</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
