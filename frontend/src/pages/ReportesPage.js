// src/pages/ReportesPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReportesPage.css';

function ReportesPage() {
    const [reportes, setReportes] = useState([]);

    useEffect(() => {
        fetchReportes();
    }, []);

    const fetchReportes = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/reportes/emisiones', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReportes(response.data);
        } catch (error) {
            console.error("Error al obtener reportes:", error);
            alert('Hubo un error al obtener los reportes');
        }
    };

    return (
        <div className="reportes-container">
            <h2>Reportes de Emisiones</h2>
            <table className="reportes-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Agricultor ID</th>
                        <th>CO2</th>
                        <th>N2O</th>
                        <th>Fecha</th>
                        <th>Parcela ID</th>
                    </tr>
                </thead>
                <tbody>
                    {reportes.length > 0 ? (
                        reportes.map((reporte, index) => (
                            <tr key={index}>
                                <td>{reporte[0]}</td>
                                <td>{reporte[1]}</td>
                                <td>{reporte[2]}</td>
                                <td>{reporte[3]}</td>
                                <td>{new Date(reporte[4]).toLocaleDateString()}</td>
                                <td>{reporte[5]}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No hay reportes disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ReportesPage;
