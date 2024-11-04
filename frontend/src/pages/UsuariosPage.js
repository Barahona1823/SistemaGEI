// src/pages/UsuariosPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UsuariosPage.css';

function UsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('');
    const [password, setPassword] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/usuarios', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const usuariosMapeados = response.data.map((usuario) => ({
                ID: usuario[0],
                NOMBRE: usuario[1],
                EMAIL: usuario[2],
                ROL: usuario[3],
                PASSWORD: usuario[4],
            }));
            setUsuarios(usuariosMapeados);
        } catch (error) {
            console.error("Error al obtener usuarios:", error.response || error.message || error);
            alert('Hubo un error al obtener la lista de usuarios');
        }
    };

    const handleAddOrUpdateUsuario = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        try {
            if (editingId) {
                await axios.put(
                    `http://localhost:5000/api/usuarios/${editingId}`,
                    { nombre, email, rol, password },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                alert('Usuario actualizado correctamente');
                setEditingId(null);
            } else {
                await axios.post(
                    'http://localhost:5000/api/usuarios',
                    { nombre, email, rol, password },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                alert('Usuario agregado correctamente');
            }

            setNombre('');
            setEmail('');
            setRol('');
            setPassword('');
            fetchUsuarios();
        } catch (error) {
            console.error("Error al agregar/actualizar usuario:", error.response || error.message || error);
            alert('Hubo un error al agregar/actualizar el usuario');
        }
    };

    const handleEditUsuario = (usuario) => {
        setNombre(usuario.NOMBRE);
        setEmail(usuario.EMAIL);
        setRol(usuario.ROL);
        setPassword('');
        setEditingId(usuario.ID);
    };

    const handleDeleteUsuario = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/usuarios/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchUsuarios();
        } catch (error) {
            console.error("Error al eliminar usuario:", error.response || error.message || error);
            alert('Hubo un error al eliminar el usuario');
        }
    };

    const cancelEdit = () => {
        setNombre('');
        setEmail('');
        setRol('');
        setPassword('');
        setEditingId(null);
    };

    return (
        <div className="usuarios-container">
            <h2>Usuarios</h2>
            <form onSubmit={handleAddOrUpdateUsuario} className="usuario-form">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Rol"
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder={editingId ? "Nueva Contraseña" : "Contraseña"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{editingId ? "Actualizar Usuario" : "Agregar Usuario"}</button>
                {editingId && <button type="button" onClick={cancelEdit}>Cancelar Edición</button>}
            </form>
            <table className="usuarios-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.length > 0 ? (
                        usuarios.map((usuario) => (
                            <tr key={usuario.ID}>
                                <td>{usuario.ID}</td>
                                <td>{usuario.NOMBRE}</td>
                                <td>{usuario.EMAIL}</td>
                                <td>{usuario.ROL}</td>
                                <td>
                                    <button onClick={() => handleEditUsuario(usuario)}>
                                        Editar
                                    </button>
                                    <button onClick={() => handleDeleteUsuario(usuario.ID)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No hay usuarios disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Link to="/dashboard" className="back-button">Regresar</Link>
        </div>
    );
}

export default UsuariosPage;
