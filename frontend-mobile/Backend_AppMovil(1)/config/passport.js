/**
 * passport.js
 * -----------------------------------------------
 * Configura la estrategia de autenticación JWT para Passport.
 * Se usa para proteger rutas: cuando el cliente manda un token
 * en el header Authorization, esta estrategia lo valida y
 * carga el usuario correspondiente en req.user.
 *
 * Se invoca desde server.js con: require('./config/passport')(passport)
 */

const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Keys = require('./Keys');
const user = require('../models/user');

module.exports = (passport) => {

    // Opciones de configuración para la estrategia JWT
    const opts = {};

    // Indica de dónde extraer el token en la petición HTTP.
    // 'fromAuthHeaderWithScheme' busca un header como:
    //   Authorization: jwt <token>
    // (coincide con cómo se genera el token en el login:
    //  `JWT ${token}` en usersController.js)
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');

    // Clave secreta usada para verificar la firma del token
    // (debe ser la misma que se usó para firmarlo en jwt.sign())
    opts.secretOrKey = Keys.secretOrKey;

    // Registra la estrategia 'jwt' en Passport
    passport.use(new jwtStrategy(opts, (jwt_payLoad, done) => {

        // El payload del token trae el id y email del usuario
        // (definidos al firmar el token en el login)
        user.findByIdEmail(jwt_payLoad.id, (err, user) => {

            if (err) {
                // Error de base de datos u otro error inesperado
                return done(err, false);
            }

            if (user) {
                // Usuario encontrado: autenticación exitosa,
                // Passport adjunta este usuario a req.user
                return done(null, user);
            }

            // No se encontró el usuario: token válido pero
            // usuario inexistente (ej. fue borrado)
            return done(null, false);
        });
    }));
};