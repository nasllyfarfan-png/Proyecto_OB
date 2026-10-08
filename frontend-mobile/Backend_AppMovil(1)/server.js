const express = require('express');
const passport = require('passport');

/**
 * server.js
 * -----------------------------------------------
 * Punto de entrada del backend. Configura Express, middlewares
 * globales, autenticación con Passport, rutas, y levanta el
 * servidor HTTP en la IP y puerto configurados.
 */

const app = express();
const http = require('http');
const server = http.createServer(app);

const logger = require('morgan');
const cors = require('cors');

// Registro de rutas de usuario (login/register)
const usersRoutes = require('./routes/userRoutes');

// Puerto configurable vía variable de entorno, con 3000 por defecto
const port = process.env.PORT || 3000;

// Middleware de logging de peticiones HTTP en consola (modo 'dev')
app.use(logger('dev'));

// Parsers para leer el body de las peticiones como JSON
// y como formularios URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Habilita CORS para todas las rutas (necesario para que la
// app móvil pueda hacer peticiones desde otro origen)
app.use(cors());

// Inicializa Passport (requerido antes de usar sus estrategias)
app.use(passport.initialize());

// Registra la estrategia JWT definida en config/passport.js
require('./config/passport')(passport);

// Oculta el header 'X-Powered-By: Express' por seguridad
// (no revela la tecnología usada al inspeccionar las respuestas)
app.disable('x-powered-by');

app.set('port', port);

// Ruta raíz simple, útil para verificar que el servidor responde
app.get('/', (req, res) => {
    res.send('Ruta raiz del Backend');
});

// Ruta de prueba adicional
app.get('/test', (req, res) => {
    res.send('Estas en la ruta TEST');
});

// Middleware de manejo de errores (4 argumentos: err, req, res, next).
// Express lo reconoce como error handler por esta firma específica.
// Nota: está definido ANTES de registrar las rutas de usuario
// (usersRoutes(app), más abajo) — ver observación al final.
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

// Registra las rutas POST /api/users/register y /api/users/login
usersRoutes(app);

// Levanta el servidor HTTP, escuchando específicamente en la IP
// 10.1.195.30 (la IP local de la máquina donde corre el backend)
// y el puerto configurado
server.listen(port, '10.1.195.30', () => {
    console.log(
        'Aplicación de NodeJS ' +
        process.pid +
        ' ejecutándose en ' +
        server.address().address +
        ':' +
        server.address().port
    );
});