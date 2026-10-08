/**
 * usersController.js
 * -----------------------------------------------
 * Controlador de usuario: contiene la lógica de negocio
 * para autenticación (login) y registro (register).
 * Es invocado desde routes/userRoutes.js, que conecta
 * estas funciones con las rutas HTTP correspondientes.
 */

const User = require('../models/user');
const bcrypt = require('bcryptjs');       // Para hashear y comparar contraseñas
const jwt = require('jsonwebtoken');      // Para generar tokens de sesión (JWT)
const keys = require('../config/Keys');   // Clave secreta para firmar los JWT

module.exports = {

    /**
     * LOGIN
     * -----------------------------------------------
     * Verifica las credenciales del usuario (email + password)
     * y, si son válidas, devuelve un token JWT junto con los
     * datos básicos del usuario.
     *
     * Body esperado: { email, password }
     */
    login(req, res) {

        const email = req.body.email;
        const password = req.body.password;

        // Busca al usuario por email en la base de datos
        User.findByEmail(email, async (err, myUser) => {

            // Error de base de datos u otro error inesperado
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error al consultar el usuario',
                    error: err
                });
            }

            // No existe ningún usuario con ese email
            if (!myUser) {
                return res.status(401).json({
                    success: false,
                    message: 'El email no existe en la base de datos'
                });
            }

            // Compara la contraseña recibida (texto plano) contra
            // el hash almacenado en la base de datos
            const isPasswordValid = await bcrypt.compare(
                password,
                myUser.password
            );

            if (isPasswordValid) {

                // Contraseña correcta: genera un token JWT
                // con el id y email del usuario como payload.
                // Este token expira nunca (no se pasó 'expiresIn'
                // en las opciones {} — ver nota abajo).
                const token = jwt.sign(
                    {
                        id: myUser.id,
                        email: myUser.email
                    },
                    keys.secretOrKey,
                    {}
                );

                // Datos que se devuelven al cliente tras un login exitoso.
                // No se incluye myUser.password por seguridad.
                const data = {
                    id: myUser.id,
                    email: myUser.email,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    image: myUser.image,
                    phone: myUser.phone,
                    // Se antepone 'JWT ' porque así es como
                    // config/passport.js espera recibir el token
                    // en el header Authorization (fromAuthHeaderWithScheme('jwt'))
                    session_token: `JWT ${token}`
                };

                return res.status(200).json({
                    success: true,
                    message: 'Usuario autenticado',
                    data: data
                });

            } else {

                // La contraseña no coincide con el hash almacenado
                return res.status(401).json({
                    success: false,
                    message: 'Contraseña incorrecta'
                });
            }
        });
    },

    /**
     * REGISTER
     * -----------------------------------------------
     * Crea un nuevo usuario en la base de datos.
     *
     * Body esperado: { email, name, lastname, phone, image, password }
     */
    register(req, res) {

        const user = req.body;

        // Crea el usuario (el hasheo de la contraseña ocurre
        // dentro de User.create, en models/user.js)
        User.create(user, (err, data) => {

            if (err) {

                // Código específico de MySQL para violación de
                // restricción UNIQUE (ej. email duplicado)
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({
                        success: false,
                        message: 'El correo ya está registrado'
                    });
                }

                // Cualquier otro error de base de datos
                return res.status(500).json({
                    success: false,
                    message: 'Error al crear el usuario',
                    error: err
                });
            }

            // Usuario creado exitosamente
            return res.status(201).json({
                success: true,
                message: 'Creado el usuario',
                data: data
            });
        });
    }

};