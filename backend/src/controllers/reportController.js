// src/controllers/reportController.js
const { getConnection } = require('../config/db');

const getEmissionsReport = async (req, res) => {
    const { agricultor_id, parcela_id, fecha_inicio, fecha_fin } = req.query;

    try {
        const connection = await getConnection();

        // Construir la consulta base
        let query = `SELECT * FROM emisiones WHERE 1=1`;
        const params = [];

        // Agregar condiciones opcionales
        if (agricultor_id) {
            query += ` AND agricultor_id = :agricultor_id`;
            params.push(agricultor_id);
        }

        if (parcela_id) {
            query += ` AND parcela_id = :parcela_id`;
            params.push(parcela_id);
        }

        if (fecha_inicio && fecha_fin) {
            query += ` AND fecha BETWEEN TO_DATE(:fecha_inicio, 'YYYY-MM-DD') AND TO_DATE(:fecha_fin, 'YYYY-MM-DD')`;
            params.push(fecha_inicio, fecha_fin);
        } else if (fecha_inicio) {
            query += ` AND fecha >= TO_DATE(:fecha_inicio, 'YYYY-MM-DD')`;
            params.push(fecha_inicio);
        } else if (fecha_fin) {
            query += ` AND fecha <= TO_DATE(:fecha_fin, 'YYYY-MM-DD')`;
            params.push(fecha_fin);
        }

        // Ejecutar la consulta
        const result = await connection.execute(query, params);
        await connection.close();

        res.json(result.rows);
    } catch (error) {
        console.error("Error al generar el reporte de emisiones:", error);
        res.status(500).json({ error: "Error al generar el reporte de emisiones" });
    }
};

module.exports = { getEmissionsReport };
