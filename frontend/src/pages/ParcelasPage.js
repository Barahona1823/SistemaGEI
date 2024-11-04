import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ParcelasPage.css';

function ParcelasPage() {
    const [parcelas, setParcelas] = useState([]);
    const [ubicacion, setUbicacion] = useState('');
    const [tamano, setTamano] = useState('');
    const [agricultorId, setAgricultorId] = useState('');
    const [agricultores, setAgricultores] = useState([]); // Lista de agricultores para el select
    const [editParcelId, setEditParcelId] = useState(null);

    useEffect(() => {
        fetchParcelas();
        fetchAgricultores(); // Cargar lista de agricultores
    }, []);

    const fetchParcelas = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/parcelas', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const formattedParcelas = response.data.map(item => ({
                id: item[0],
                agricultor_id: item[1],
                ubicacion: item[2],
                tamano: item[3],
            }));
            setParcelas(formattedParcelas);
        } catch (error) {
            console.error("Error al obtener parcelas:", error.response || error.message || error);
            alert('Hubo un error al obtener la lista de parcelas');
        }
    };

    const fetchAgricultores = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/agricultores', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data); // Verificar estructura de datos
            setAgricultores(response.data); // Asegúrate de que los datos tengan propiedades `id` y `nombre`
        } catch (error) {
            console.error("Error al obtener agricultores:", error.response || error.message || error);
            alert('Hubo un error al obtener la lista de agricultores');
        }
    };

    const handleAddOrEditParcel = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const newParcel = { ubicacion, tamano, agricultor_id: agricultorId };

        try {
            if (editParcelId) {
                await axios.put(`http://localhost:5000/api/parcelas/${editParcelId}`, newParcel, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEditParcelId(null);
            } else {
                await axios.post('http://localhost:5000/api/parcelas', newParcel, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            setUbicacion('');
            setTamano('');
            setAgricultorId('');
            fetchParcelas();
        } catch (error) {
            console.error("Error al agregar o editar parcela:", error.response || error.message || error);
            alert('Hubo un error al agregar o editar la parcela');
        }
    };

    const handleDeleteParcel = async (id) => {
        const confirmDelete = window.confirm("¿Seguro que quieres eliminar esta parcela?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/parcelas/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchParcelas();
        } catch (error) {
            console.error("Error al eliminar parcela:", error.response || error.message || error);
            alert('Hubo un error al eliminar la parcela');
        }
    };

    const handleEditParcel = (parcel) => {
        setUbicacion(parcel.ubicacion);
        setTamano(parcel.tamano);
        setAgricultorId(parcel.agricultor_id);
        setEditParcelId(parcel.id);
    };

    return (
        <div className="parcelas-container">
            <h2>Parcelas</h2>
            <form onSubmit={handleAddOrEditParcel} className="parcela-form">
                <select
                    value={agricultorId}
                    onChange={(e) => setAgricultorId(e.target.value)}
                    required
                >
                    <option value="">Seleccione un agricultor</option>
                    {agricultores.map((agricultor) => (
                        <option key={agricultor.id} value={agricultor.id}>
                            {agricultor.nombre}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Ubicación"
                    value={ubicacion}
                    onChange={(e) => setUbicacion(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Hectáreas"
                    value={tamano}
                    onChange={(e) => setTamano(e.target.value)}
                    required
                />
                <button type="submit">{editParcelId ? 'Actualizar Parcela' : 'Agregar Parcela'}</button>
            </form>
            <table className="parcelas-table">
                <thead>
                    <tr>
                        <th>Ubicación</th>
                        <th>Hectáreas</th>
                        <th>Agricultor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {parcelas.length > 0 ? (
                        parcelas.map((parcela) => (
                            <tr key={parcela.id}>
                                <td>{parcela.ubicacion}</td>
                                <td>{parcela.tamano}</td>
                                <td>{parcela.agricultor_id}</td>
                                <td>
                                    <button onClick={() => handleEditParcel(parcela)}>Editar</button>
                                    <button onClick={() => handleDeleteParcel(parcela.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No hay parcelas disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button className="back-button" onClick={() => window.location.href = '/dashboard'}>Regresar</button>
        </div>
    );
}

export default ParcelasPage;
