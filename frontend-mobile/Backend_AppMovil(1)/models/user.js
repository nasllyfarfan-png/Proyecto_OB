const db = require('../config/config');
const bcrypt = require('bcryptjs');

/**
 * user.js
 * -----------------------------------------------
 * Modelo de datos para la tabla 'users'. Encapsula todas las
 * consultas SQL relacionadas al usuario (crear, buscar), para
 * que el controller (usersController.js) no tenga que escribir
 * SQL directamente.
 */
const User = {

    // =================================
    // CREAR USUARIO
    // =================================
    /**
     * Crea un nuevo usuario en la base de datos, hasheando su
     * contraseña antes de guardarla.
     *
     * @param user - Objeto con los datos del usuario (email, name,
     *               lastname, phone, image, password en texto plano)
     * @param callback - (err, data) donde data es el usuario creado
     *                    (sin incluir la contraseña, por seguridad)
     */
    create: (user, callback) => {

        // Hashear la contraseña antes de guardarla.
        // El costo 10 (número de rondas de bcrypt) es un balance
        // estándar entre seguridad y rendimiento.
        bcrypt.hash(user.password, 10, (err, hashedPassword) => {

            if (err) {
                return callback(err, null);
            }

            const sql = `
                INSERT INTO users
                (
                    email,
                    name,
                    lastname,
                    phone,
                    image,
                    password
                )
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            const values = [
                user.email,
                user.name,
                user.lastname,
                user.phone,
                user.image,
                hashedPassword
            ];

            db.query(sql, values, (err, result) => {

                // Aquí puede llegar el error ER_DUP_ENTRY si el
                // email o el phone ya existen (ambos son UNIQUE
                // en el esquema de la tabla)
                if (err) {
                    return callback(err, null);
                }

                // Devuelve el usuario creado, usando el id
                // autogenerado por MySQL (insertId). No incluye
                // la contraseña ni su hash en la respuesta.
                callback(null, {
                    id: result.insertId,
                    email: user.email,
                    name: user.name,
                    lastname: user.lastname,
                    phone: user.phone,
                    image: user.image
                });

            });

        });

    },


    // =================================
    // BUSCAR USUARIO POR EMAIL
    // =================================
    /**
     * Busca un usuario por su email. Se usa en el login para
     * verificar credenciales.
     *
     * @param email - Email a buscar
     * @param callback - (err, user) donde user es el registro
     *                    encontrado (incluye el hash de password,
     *                    necesario para bcrypt.compare en el login),
     *                    o null si no existe ningún usuario con
     *                    ese email
     */
    findByEmail: (email, callback) => {

        const sql = `
            SELECT
                id,
                email,
                name,
                lastname,
                phone,
                image,
                password
            FROM users
            WHERE email = ?
            LIMIT 1
        `;

        db.query(sql, [email], (err, results) => {

            if (err) {
                return callback(err, null);
            }

            if (results.length === 0) {
                return callback(null, null);
            }

            callback(null, results[0]);

        });

    }

};

module.exports = User;