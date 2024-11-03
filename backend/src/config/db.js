const oracledb = require('oracledb');
require('dotenv').config();  // Agrega esta línea

const connectionConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
};

// Línea de depuración
console.log("Configuración de conexión a Oracle:", connectionConfig);

async function getConnection() {
    try {
        const connection = await oracledb.getConnection(connectionConfig);
        console.log('Conexión a Oracle exitosa');
        return connection;
    } catch (err) {
        console.error('Error al conectar con Oracle:', err);
        throw err;
    }
}

module.exports = { getConnection };
