// src/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const { getEmissionsReport } = require('../controllers/reportController');
const authenticateToken = require('../middleware/authMiddleware');

// Ruta para generar reporte de emisiones
router.get('/emisiones', authenticateToken, getEmissionsReport);

module.exports = router;
