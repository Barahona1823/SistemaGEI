// src/routes/farmerRoutes.js
const express = require('express');
const router = express.Router();
const { getFarmers, addFarmer, updateFarmer, deleteFarmer } = require('../controllers/farmerController');
const authenticateToken = require('../middleware/authMiddleware');

// Definir rutas con autorización
router.get('/', authenticateToken, getFarmers);
router.post('/', authenticateToken, addFarmer);
router.put('/:id', authenticateToken, updateFarmer);
router.delete('/:id', authenticateToken, deleteFarmer);

module.exports = router;
