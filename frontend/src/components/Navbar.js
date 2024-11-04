// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <Link to="/usuarios">Usuarios</Link> | 
            <Link to="/agricultores">Agricultores</Link> | 
            <Link to="/parcelas">Parcelas</Link> | 
            <Link to="/emisiones">Emisiones</Link>
        </nav>
    );
}

export default Navbar;
