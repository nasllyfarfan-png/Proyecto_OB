/**
 * config.js
 * -----------------------------------------------
 * Configuración y conexión a la base de datos MySQL.
 * Este módulo crea una única conexión que se reutiliza
 * en toda la aplicación (importada por los modelos, ej. user.js).
 */

const mysql = require('mysql');

// Crea la conexión a la base de datos usando el driver 'mysql'.
// createConnection() solo define los parámetros; todavía no conecta.
const db = mysql.createConnection({
    host: 'localhost',      // Servidor de la base de datos (local en este caso)
    user: 'root',           // Usuario de MySQL
    password: '',           // Contraseña del usuario (vacía = sin contraseña, típico en entornos locales)
    database: 'nodejs_base1' // Nombre de la base de datos a la que se conecta
});

// Intenta abrir la conexión realmente hacia MySQL.
// Esto es asíncrono: el callback se ejecuta cuando la conexión
// se establece (o falla).
db.connect(function (err) {

    // Si hubo un error al conectar (credenciales incorrectas,
    // servidor MySQL apagado, base de datos inexistente, etc.),
    // se lanza el error y detiene la ejecución del proceso.
    if (err) throw err;

    // Si todo salió bien, se confirma por consola.
    console.log('Base de datos conectada');
});

// Exporta la conexión ya establecida para que otros archivos
// (como los modelos en /models) puedan hacer consultas con db.query(...)
module.exports = db;