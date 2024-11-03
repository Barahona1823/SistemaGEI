const { getConnection } = require('../config/db');
const bcrypt = require('bcryptjs');

// Función para obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.execute('SELECT * FROM usuarios');
        await connection.close();
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
};

// Función para agregar un nuevo usuario
const addUser = async (req, res) => {
    const { nombre, email, rol, password } = req.body;
    try {
        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        const connection = await getConnection();
        await connection.execute(
            `INSERT INTO usuarios (nombre, email, rol, password) VALUES (:nombre, :email, :rol, :password)`,
            [nombre, email, rol, hashedPassword],
            { autoCommit: true }
        );
        await connection.close();
        res.json({ message: "Usuario agregado correctamente" });
    } catch (error) {
        console.error("Error al agregar usuario:", error);
        res.status(500).json({ error: `Error al agregar usuario: ${error.message}` });
    }
};

// Función para actualizar un usuario
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, rol, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const connection = await getConnection();
        await connection.execute(
            `UPDATE usuarios SET nombre = :nombre, email = :email, rol = :rol, password = :password WHERE id = :id`,
            [nombre, email, rol, hashedPassword, id],
            { autoCommit: true }
        );
        await connection.close();
        res.json({ message: "Usuario actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ error: `Error al actualizar usuario: ${error.message}` });
    }
};

// Función para eliminar un usuario
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await getConnection();
        await connection.execute(
            `DELETE FROM usuarios WHERE id = :id`,
            [id],
            { autoCommit: true }
        );
        await connection.close();
        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ error: `Error al eliminar usuario: ${error.message}` });
    }
};

module.exports = { getUsers, addUser, updateUser, deleteUser };
