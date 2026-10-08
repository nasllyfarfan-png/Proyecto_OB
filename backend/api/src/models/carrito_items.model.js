import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connect.db.js";

class Carritoitems extends Model {}

Carritoitems.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    id_carrito: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    id_productos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    talla: {
        type: DataTypes.STRING(10),
        allowNull: false
    },

    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    color: {
        type: DataTypes.STRING(30),
        allowNull: false
    },

    precio_unitario: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false
    },

    subtotal: {
        type: DataTypes.DECIMAL(14, 2),
        allowNull: false
    }

}, {
    sequelize,
    modelName: "carrito_items",
    tableName: "carrito_items",
    timestamps: false,
    freezeTableName: true
});

export default Carritoitems;