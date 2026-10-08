/**
 * Keys.js
 * -----------------------------------------------
 * Almacena las claves/secretos usados por la aplicación
 * para firmar y verificar JSON Web Tokens (JWT).
 *
 * Es importado por config/passport.js (para verificar tokens
 * en rutas protegidas) y por controllers/usersController.js
 * (para firmar el token al hacer login con jwt.sign()).
 */

module.exports = {

    // Clave secreta usada para firmar y verificar los JWT.
    // Debe mantenerse privada: cualquiera que la conozca
    // podría generar tokens válidos falsificando la identidad
    // de cualquier usuario.
    secretOrKey: 'htFQ9kjNJc6F5cStYZSZ+u+zDAJfBFDkb3XMnEJ7wb0='

};