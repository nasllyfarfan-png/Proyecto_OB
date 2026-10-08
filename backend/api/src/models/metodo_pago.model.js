import sequelize from "../config/connect.db.js";
import { Model, DataTypes } from "sequelize";

class MetodoPago extends Model {}

MetodoPago.init({

    id_medio_pago: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nombre_metodo: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },

    tipo: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },

    descripcion: {
        type: DataTypes.STRING(200),
    },

    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

},
{
    sequelize,
    modelName: "MedioPago",
    tableName: "medio_pago",
    timestamps: false      
});

export default MetodoPago;