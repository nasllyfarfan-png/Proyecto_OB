import sequelize from "../config/connect.db.js";
import { Model, DataTypes } from "sequelize";

class DetalleVentas extends Model {}

DetalleVentas.init({
    id_detalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_venta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    talla: {
        type: DataTypes.STRING(10)
    },
    cantidad: {
        type: DataTypes.INTEGER
    },
    color: {
        type: DataTypes.STRING(30)
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(12, 2)
    },
    subtotal: {
        type: DataTypes.DECIMAL(14, 2)
    }
}, {
    sequelize,
    modelName: "DetalleVentas",
    tableName: "Detalle_Ventas",
    timestamps: false,
    freezeTableName: true
});

export default DetalleVentas;