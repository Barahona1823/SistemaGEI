// src/pages/EmisionesPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmisionesPage.css';

function EmisionesPage() {
    const [emisiones, setEmisiones] = useState([]);
    const [agricultorId, setAgricultorId] = useState('');
    const [parcelaId, setParcelaId] = useState('');
    const [co2, setCo2] = useState('');
    const [n2o, setN2o] = useState('');
    const [fecha, setFecha] = useState('');

    useEffect(() => {
        fetchEmisiones();
    }, []);

    const fetchEmisiones = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/emisiones', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            // Mapea la estructura de datos que se recibe en forma de array de arrays
            const formattedEmisiones = response.data.map(item => ({
                id: item[0],
                agricultor_id: item[1],
                co2: item[2],
                n2o: item[3],
                fecha: item[4],
                parcela_id: item[5],
            }));
            setEmisiones(formattedEmisiones);
        } catch (error) {
            console.error("Error al obtener emisiones:", error.response || error.message || error);
            alert('Hubo un error al obtener el registro de emisiones');
        }
    };

    const handleAddEmision = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:5000/api/emisiones',
                { agricultor_id: agricultorId, parcela_id: parcelaId, co2, n2o, fecha },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAgricultorId('');
            setParcelaId('');
            setCo2('');
            setN2o('');
            setFecha('');
            fetchEmisiones(); // Actualizar la lista de emisiones
        } catch (error) {
            console.error("Error al registrar emisión:", error.response || error.message || error);
            alert('Hubo un error al registrar la emisión');
        }
    };

    return (
        <div className="emisiones-container">
            <h2>Registro de Emisiones</h2>
            <form onSubmit={handleAddEmision} className="emision-form">
                <input
                    type="text"
                    placeholder="ID del Agricultor"
                    value={agricultorId}
                    onChange={(e) => setAgricultorId(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="ID de la Parcela"
                    value={parcelaId}
                    onChange={(e) => setParcelaId(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="CO2"
                    value={co2}
                    onChange={(e) => setCo2(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="N2O"
                    value={n2o}
                    onChange={(e) => setN2o(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                />
                <button type="submit">Registrar Emisión</button>
            </form>
            <table className="emisiones-table">
                <thead>
                    <tr>
                        <th>ID Agricultor</th>
                        <th>Parcela ID</th>
                        <th>CO2</th>
                        <th>N2O</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {emisiones.length > 0 ? (
                        emisiones.map((emision) => (
                            <tr key={emision.id}>
                                <td>{emision.agricultor_id}</td>
                                <td>{emision.parcela_id}</td>
                                <td>{emision.co2}</td>
                                <td>{emision.n2o}</td>
                                <td>{emision.fecha}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No hay emisiones registradas</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button className="back-button" onClick={() => window.location.href = '/dashboard'}>Regresar</button>
        </div>
    );
}

export default EmisionesPage;
