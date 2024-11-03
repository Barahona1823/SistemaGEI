const { getConnection } = require('../config/db');

// Factores específicos para el cálculo de N₂O y CO₂
const NITROGENO_EN_UREA = 0.46; // 46% de la urea es nitrógeno
const N2O_EMISSION_FACTOR = 0.01; // 1% del nitrógeno aplicado se convierte en N₂O
const CO2_EMISSION_FACTOR = 1.57; // Emisión indirecta de CO₂ por kg de urea

// Función de cálculo de emisiones para CO₂ y N₂O
const calculateEmissions = (cantidad_fertilizante) => {
    const nitrogeno_disponible = cantidad_fertilizante * NITROGENO_EN_UREA;
    const n2o_emission = nitrogeno_disponible * N2O_EMISSION_FACTOR;
    const co2_emission = cantidad_fertilizante * CO2_EMISSION_FACTOR;

    return { co2: co2_emission, n2o: n2o_emission };
};

// Obtener todos los registros de emisiones
const getEmissions = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.execute('SELECT * FROM emisiones');
        await connection.close();
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener registros de emisiones:", error);
        res.status(500).json({ error: "Error al obtener registros de emisiones" });
    }
};

// Registrar una nueva emisión con cálculo automático de CO₂ y N₂O
const addEmission = async (req, res) => {
    const { agricultor_id, fecha, parcela_id, tipo_fertilizante, cantidad_fertilizante, area_parcela, tipo_cultivo } = req.body;

    if (!agricultor_id || !fecha || !parcela_id || !cantidad_fertilizante || !area_parcela) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    try {
        const { co2, n2o } = calculateEmissions(parseFloat(cantidad_fertilizante));
        const connection = await getConnection();
        await connection.execute(
            `INSERT INTO emisiones (agricultor_id, co2, n2o, fecha, parcela_id, tipo_fertilizante, cantidad_fertilizante, area_parcela, tipo_cultivo) 
             VALUES (:agricultor_id, :co2, :n2o, TO_DATE(:fecha, 'YYYY-MM-DD'), :parcela_id, :tipo_fertilizante, :cantidad_fertilizante, :area_parcela, :tipo_cultivo)`,
            [agricultor_id, co2, n2o, fecha, parcela_id, tipo_fertilizante, cantidad_fertilizante, area_parcela, tipo_cultivo],
            { autoCommit: true }
        );
        await connection.close();
        res.json({ message: "Emisión registrada correctamente", co2, n2o });
    } catch (error) {
        console.error("Error al registrar la emisión:", error);
        res.status(500).json({ error: `Error al registrar la emisión: ${error.message}` });
    }
};

// Editar una emisión existente
const updateEmission = async (req, res) => {
    const { id } = req.params;
    const { agricultor_id, fecha, parcela_id, tipo_fertilizante, cantidad_fertilizante, area_parcela, tipo_cultivo } = req.body;

    try {
        const { co2, n2o } = calculateEmissions(parseFloat(cantidad_fertilizante));
        const connection = await getConnection();
        await connection.execute(
            `UPDATE emisiones 
             SET agricultor_id = :agricultor_id, co2 = :co2, n2o = :n2o, fecha = TO_DATE(:fecha, 'YYYY-MM-DD'), 
                 parcela_id = :parcela_id, tipo_fertilizante = :tipo_fertilizante, cantidad_fertilizante = :cantidad_fertilizante, 
                 area_parcela = :area_parcela, tipo_cultivo = :tipo_cultivo
             WHERE id = :id`,
            [agricultor_id, co2, n2o, fecha, parcela_id, tipo_fertilizante, cantidad_fertilizante, area_parcela, tipo_cultivo, id],
            { autoCommit: true }
        );
        await connection.close();
        res.json({ message: "Emisión actualizada correctamente" });
    } catch (error) {
        console.error("Error al actualizar la emisión:", error);
        res.status(500).json({ error: `Error al actualizar la emisión: ${error.message}` });
    }
};

// Eliminar una emisión
const deleteEmission = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await getConnection();
        await connection.execute(
            `DELETE FROM emisiones WHERE id = :id`,
            [id],
            { autoCommit: true }
        );
        await connection.close();
        res.json({ message: "Emisión eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la emisión:", error);
        res.status(500).json({ error: "Error al eliminar la emisión" });
    }
};

module.exports = { getEmissions, addEmission, updateEmission, deleteEmission };
