// src/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const exampleRoutes = require('./routes/exampleRoutes'); // CRUD de usuarios
const authRoutes = require('./routes/authRoutes'); // Autenticación
const farmerRoutes = require('./routes/farmerRoutes'); // CRUD de agricultores
const parcelRoutes = require('./routes/parcelRoutes'); // CRUD de parcelas
const emissionRoutes = require('./routes/emissionRoutes'); // CRUD de emisiones
const reportRoutes = require('./routes/reportRoutes'); // Reportes de emisiones
const authenticateToken = require('./middleware/authMiddleware'); // Middleware de autenticación

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de CRUD de usuarios con protección
app.use('/api/usuarios', authenticateToken, exampleRoutes);

// Rutas de CRUD de agricultores con protección
app.use('/api/agricultores', authenticateToken, farmerRoutes);

// Rutas de CRUD de parcelas con protección
app.use('/api/parcelas', authenticateToken, parcelRoutes);

// Rutas de CRUD de emisiones con protección
app.use('/api/emisiones', authenticateToken, emissionRoutes);

// Rutas de reportes de emisiones con protección
app.use('/api/reportes', authenticateToken, reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
