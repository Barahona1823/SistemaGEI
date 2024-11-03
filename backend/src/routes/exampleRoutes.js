// src/routes/exampleRoutes.js
const express = require('express');
const router = express.Router();
const { getUsers, addUser, updateUser, deleteUser } = require('../controllers/exampleController');

// Ruta de prueba para verificar la conexión
router.get('/test', (req, res) => {
    res.send("Ruta de prueba funcionando");
});

// Rutas para el CRUD de usuarios
router.get('/', getUsers);          // GET /api/usuarios
router.post('/', addUser);           // POST /api/usuarios
router.put('/:id', updateUser);      // PUT /api/usuarios/:id
router.delete('/:id', deleteUser);   // DELETE /api/usuarios/:id

module.exports = router;
