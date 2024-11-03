// src/routes/parcelRoutes.js
const express = require('express');
const router = express.Router();
const { getParcels, addParcel, updateParcel, deleteParcel } = require('../controllers/parcelController');

// Rutas para el CRUD de parcelas
router.get('/', getParcels);
router.post('/', addParcel);
router.put('/:id', updateParcel);
router.delete('/:id', deleteParcel);

module.exports = router;
