// src/controllers/parcelController.js
const { getConnection } = require('../config/db');

// Obtener todas las parcelas
const getParcels = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.execute('SELECT * FROM parcelas');
        await connection.close();
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener parcelas:", error);
        res.status(500).json({ error: "Error al obtener parcelas" });
    }
};

// Crear una nueva parcela
const addParcel = async (req, res) => {
    const { agricultor_id, ubicacion, tamano } = req.body;
    try {
        const connection = await getConnection();
        await connection.execute(
            `INSERT INTO parcelas (AGRICULTOR_ID, UBICACION, TAMANO) VALUES (:agricultor_id, :ubicacion, :tamano)`,
            [agricultor_id, ubicacion, tamano],
            { autoCommit: true }
        );
        await connection.close();
        res.json({ message: "Parcela agregada correctamente" });
    } catch (error) {
        console.error("Error al agregar parcela:", error);
        res.status(500).json({ error: `Error al agregar parcela: ${error.message}` });
    }
};

// Actualizar los datos de una parcela
const updateParcel = async (req, res) => {
    const { id } = req.params;
    const { agricultor_id, ubicacion, tamano } = req.body;
    try {
        const connection = await getConnection();
        await connection.execute(
            `UPDATE parcelas SET agricultor_id = :agricultor_id, ubicacion = :ubicacion, tamano = :tamano WHERE id = :id`,
            [agricultor_id, ubicacion, tamano, id],
            { autoCommit: true }
        );
        await connection.close();
        res.json({ message: "Parcela actualizada correctamente" });
    } catch (error) {
        console.error("Error al actualizar parcela:", error);
        res.status(500).json({ error: "Error al actualizar parcela" });
    }
};

// Eliminar una parcela
const deleteParcel = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await getConnection();
        await connection.execute(
            `DELETE FROM parcelas WHERE id = :id`,
            [id],
            { autoCommit: true }
        );
        await connection.close();
        res.json({ message: "Parcela eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar parcela:", error);
        res.status(500).json({ error: "Error al eliminar parcela" });
    }
};

module.exports = { getParcels, addParcel, updateParcel, deleteParcel };

