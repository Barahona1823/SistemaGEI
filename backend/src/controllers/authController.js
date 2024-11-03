const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const { getConnection } = require('../config/db');

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Establecer conexión a la base de datos
        const connection = await getConnection();

        // Buscar el usuario en la tabla de usuarios
        const result = await connection.execute(
            `SELECT * FROM usuarios WHERE email = :email`,
            [email]
        );

        // Verificar si el usuario existe
        if (result.rows.length === 0) {
            await connection.close();
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const user = result.rows[0];
        const userId = user[0];
        const userName = user[1];
        const userEmail = user[2];
        const userRole = user[3];
        const storedPasswordHash = user[4];

        // Verificación de que la contraseña existe
        if (!storedPasswordHash) {
            await connection.close();
            return res.status(500).json({ error: "Error interno: Contraseña no encontrada en la base de datos" });
        }

        // Comparar la contraseña ingresada con la almacenada
        const isPasswordCorrect = await bcrypt.compare(password, storedPasswordHash);
        if (!isPasswordCorrect) {
            await connection.close();
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: userId, rol: userRole }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Si el usuario es un agricultor, verificar su registro en la tabla agricultores
        if (userRole === 'agricultor') {
            console.log("Verificando agricultor en la tabla de agricultores...");

            const agricultorCheck = await connection.execute(
                `SELECT * FROM agricultores WHERE nombre = :nombre`,
                [userName]
            );

            if (agricultorCheck.rows.length === 0) {
                console.log("Agricultor no encontrado en la tabla de agricultores. Registrando nuevo agricultor...");

                // Intentar insertar el agricultor en la tabla de agricultores
                const insertResult = await connection.execute(
                    `INSERT INTO agricultores (nombre, region) VALUES (:nombre, :region)`,
                    [userName, 'Región predeterminada'],
                    { autoCommit: true }
                );

                console.log("Resultado de la inserción del agricultor:", insertResult);
            } else {
                console.log("Agricultor ya registrado en la tabla de agricultores.");
            }
        }

        await connection.close();

        res.json({ message: "Inicio de sesión exitoso", token, rol: userRole, nombre: userName });
    } catch (error) {
        console.error("Error en inicio de sesión:", error);
        res.status(500).json({ error: "Error en inicio de sesión" });
    }
};

module.exports = { loginUser };
