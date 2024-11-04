// src/pages/AgricultoresPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AgricultoresPage.css';

function AgricultoresPage() {
    const [agricultores, setAgricultores] = useState([]);
    const [nombre, setNombre] = useState('');
    const [region, setRegion] = useState('');
    const [editingId, setEditingId] = useState(null); // Estado para manejar la edición

    useEffect(() => {
        fetchAgricultores();
    }, []);

    const fetchAgricultores = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/agricultores', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAgricultores(response.data);
        } catch (error) {
            console.error("Error al obtener agricultores:", error.response || error.message || error);
            alert('Hubo un error al obtener la lista de agricultores');
        }
    };

    const handleAddAgricultor = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (editingId) {
                // Actualizar agricultor existente
                await axios.put(
                    `http://localhost:5000/api/agricultores/${editingId}`,
                    { nombre, region },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setEditingId(null);
            } else {
                // Agregar un nuevo agricultor
                await axios.post(
                    'http://localhost:5000/api/agricultores',
                    { nombre, region },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }
            setNombre('');
            setRegion('');
            fetchAgricultores();
        } catch (error) {
            console.error("Error al guardar agricultor:", error.response || error.message || error);
            alert('Hubo un error al guardar el agricultor');
        }
    };

    const handleEditAgricultor = (agricultor) => {
        setNombre(agricultor[1]); // Nombre en la posición 1
        setRegion(agricultor[2]); // Región en la posición 2
        setEditingId(agricultor[0]); // ID en la posición 0
    };

    const handleDeleteAgricultor = async (id) => {
        if (window.confirm('¿Seguro que quieres eliminar este agricultor?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5000/api/agricultores/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                fetchAgricultores();
            } catch (error) {
                console.error("Error al eliminar agricultor:", error.response || error.message || error);
                alert('Hubo un error al eliminar el agricultor');
            }
        }
    };

    return (
        <div className="agricultores-container">
            <h2>Agricultores</h2>
            <form onSubmit={handleAddAgricultor} className="agricultor-form">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Región"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    required
                />
                <button type="submit">{editingId ? 'Actualizar Agricultor' : 'Agregar Agricultor'}</button>
                {editingId && (
                    <button
                        type="button"
                        onClick={() => {
                            setNombre('');
                            setRegion('');
                            setEditingId(null);
                        }}
                    >
                        Cancelar
                    </button>
                )}
            </form>
            <table className="agricultores-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Región</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {agricultores.map((agricultor) => (
                        <tr key={agricultor[0]}>
                            <td>{agricultor[1]}</td>
                            <td>{agricultor[2]}</td>
                            <td>
                                <button onClick={() => handleEditAgricultor(agricultor)}>Editar</button>
                                <button onClick={() => handleDeleteAgricultor(agricultor[0])}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/dashboard" className="back-button">Regresar</Link>
        </div>
    );
}

export default AgricultoresPage;
