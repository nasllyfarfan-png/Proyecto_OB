-- =====================================================
-- db.sql
-- -----------------------------------------------
-- Script de creación de la base de datos y la tabla de usuarios
-- para el backend de la app móvil. Define el esquema que usa
-- models/user.js para las operaciones CREATE y SELECT.
-- =====================================================

-- Crea la base de datos usada por config/config.js
-- (mysql.createConnection({ database: 'nodejs_base1' }))
CREATE DATABASE nodejs_base1;

-- Selecciona la base de datos recién creada como la activa
-- para las siguientes sentencias
USE nodejs_base1;

-- Elimina la tabla 'users' si ya existía, para poder recrearla
-- limpia (útil al re-ejecutar este script durante desarrollo,
-- pero destruye cualquier dato existente)
DROP TABLE IF EXISTS users;

-- Tabla principal de usuarios registrados en la app
CREATE TABLE users(

    -- Identificador único autoincremental, clave primaria
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    -- Correo electrónico: obligatorio y único (no pueden existir
    -- dos usuarios con el mismo email). Esta restricción UNIQUE
    -- es la que dispara el error 'ER_DUP_ENTRY' manejado en
    -- usersController.js -> register()
    email VARCHAR(180) NOT NULL UNIQUE,

    name VARCHAR(90) NOT NULL,

    lastname VARCHAR(90) NOT NULL,

    -- Teléfono: obligatorio y único (no pueden existir dos
    -- usuarios con el mismo número)
    phone VARCHAR(90) NOT NULL UNIQUE,

    -- Nombre/ruta de la imagen de perfil. Puede ser NULL
    -- (usuario sin foto asignada)
    image VARCHAR(255) NULL,

    -- Contraseña hasheada con bcrypt (ver models/user.js -> create()).
    -- VARCHAR(90) es suficiente porque un hash de bcrypt siempre
    -- ocupa 60 caracteres de longitud fija.
    password VARCHAR(90) NOT NULL,

    -- Fecha de creación del registro, asignada automáticamente
    -- por MySQL al insertar (no requiere que la app la envíe)
    created_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Fecha de última actualización, se actualiza automáticamente
    -- por MySQL en cada UPDATE sobre la fila
    updated_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);