const express = require('express');
const router = express.Router();
const { getEmissions, addEmission, updateEmission, deleteEmission } = require('../controllers/emissionController');

// Ruta para obtener registros de emisiones
router.get('/', getEmissions);

// Ruta para registrar una nueva emisión
router.post('/', addEmission);

// Ruta para actualizar una emisión existente
router.put('/:id', updateEmission);

// Ruta para eliminar una emisión
router.delete('/:id', deleteEmission);

module.exports = router;
