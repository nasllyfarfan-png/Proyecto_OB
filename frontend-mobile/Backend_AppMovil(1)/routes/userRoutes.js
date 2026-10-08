/**
 * userRoutes.js
 * -----------------------------------------------
 * Define las rutas HTTP relacionadas a usuarios y las conecta
 * con sus funciones correspondientes en usersController.js.
 *
 * Exporta una función que recibe la instancia de Express (app)
 * y registra las rutas sobre ella. Se invoca desde server.js
 * como: usersRoutes(app)
 */

const userController = require('../controllers/usersController');

module.exports = (app) => {

    // POST /api/users/register
    // Crea un nuevo usuario. Body esperado:
    // { email, name, lastname, phone, image, password }
    app.post('/api/users/register', userController.register);

    // POST /api/users/login
    // Autentica un usuario existente. Body esperado:
    // { email, password }
    app.post('/api/users/login', userController.login);

};