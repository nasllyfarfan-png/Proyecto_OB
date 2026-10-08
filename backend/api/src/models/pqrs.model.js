import sequelize from "../config/connect.db.js";
import { Model, DataTypes } from "sequelize";

class Pqrs extends Model {}

Pqrs.init({
    id_pqrs: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    id_venta: {
        type: DataTypes.INTEGER,
        allowNull: true  
    },

    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    apellido: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    correo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    telefono: {
        type: DataTypes.STRING(20),
        allowNull: false
    },

    tipo_pqrs: {
        type: DataTypes.STRING(20),
        allowNull: false
    },

    mensaje_pqrs: {
        type: DataTypes.STRING(500),
        allowNull: false
    },

    respuesta_pqrs: {
        type: DataTypes.STRING(500),
        allowNull: true
    },

    fecha_pqrs: {
        type: DataTypes.DATE,
        allowNull: false
    },

    fecha_respuesta: {
        type: DataTypes.DATE,
        allowNull: true
    },

    estado_pqrs: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
},
{
    sequelize,
    modelName: "Pqrs",
    tableName: "Pqrs",
    timestamps: false
});
export default Pqrs;