import sequelize from "../config/connect.db.js";
import { Model, DataTypes } from "sequelize";

class Ventas extends Model {}

Ventas.init(
{
    id_ventas: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    id_medio_pago: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    id_medio_envio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    telefono: {
        type: DataTypes.STRING(20),
        allowNull: false
    },

    direccion_envio: {
        type: DataTypes.STRING(200),
        allowNull: false
    },

    ciudad: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    fecha_venta: {
        type: DataTypes.DATE,
        allowNull: false
    },

    subtotal: {
        type: DataTypes.DECIMAL(14,2),
        allowNull: false
    },

    costo_envio: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    total: {
        type: DataTypes.DECIMAL(14,2),
        allowNull: false
    },

    estado_venta: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
},
{
    sequelize,
    modelName: "Ventas",
    tableName: "ventas", 
    timestamps: false    

});

export default Ventas;