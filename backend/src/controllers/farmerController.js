const { getConnection } = require('../config/db');

// Obtener todos los agricultores
const getFarmers = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.execute('SELECT * FROM agricultores');
        await connection.close();
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener agricultores:", error);
        res.status(500).json({ error: "Error al obtener agricultores" });
    }
};

// Crear un nuevo agricultor
const addFarmer = async (req, res) => {
    const { nombre, region } = req.body; // Cambiado a 'region'
    try {
        const connection = await getConnection();
        await connection.execute(
            `INSERT INTO agricultores (nombre, region) VALUES (:nombre, :region)`,
            [nombre, region],
            { autoCommit: true }
        );
        await connection.close();
        res.json({ message: "Agricultor agregado correctamente" });
    } catch (error) {
        console.error("Error al agregar agricultor:", error);
        res.status(500).json({ error: "Error al agregar agricultor" });
    }
};

// Actualizar los datos de un agricultor
const updateFarmer = async (req, res) => {
    const { id } = req.params;
    const { nombre, region } = req.body; // Cambiado a 'region'
    try {
        const connection = await getConnection();
        await connection.execute(
            `UPDATE agricultores SET nombre = :nombre, region = :region WHERE id = :id`,
            [nombre, region, id],
            { autoCommit: true }
        );
        await connection.close();
        res.json({ message: "Agricultor actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar agricultor:", error);
        res.status(500).json({ error: "Error al actualizar agricultor" });
    }
};

// Eliminar un agricultor
const deleteFarmer = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await getConnection();
        await connection.execute(
            `DELETE FROM agricultores WHERE id = :id`,
            [id],
            { autoCommit: true }
        );
        await connection.close();
        res.json({ message: "Agricultor eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar agricultor:", error);
        res.status(500).json({ error: "Error al eliminar agricultor" });
    }
};

module.exports = { getFarmers, addFarmer, updateFarmer, deleteFarmer };
