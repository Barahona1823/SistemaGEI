// src/middleware/roleMiddleware.js
const jwt = require('jsonwebtoken');

const authorizeRole = (requiredRole) => (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ error: "Token no proporcionado" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.rol !== requiredRole) {
            return res.status(403).json({ error: "No autorizado para esta acción" });
        }
        next();
    } catch (error) {
        return res.status(403).json({ error: "Token inválido" });
    }
};

module.exports = { authorizeRole };
