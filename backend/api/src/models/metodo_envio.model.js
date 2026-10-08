import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connect.db.js";

class metodoEnvio extends Model {}

metodoEnvio.init({
    id_metodos_envio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_metodo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(100)
    },
    costo_envio: {
        type: DataTypes.DECIMAL(10, 2)
    },
    dias_entrega_min: {
        type: DataTypes.INTEGER
    },
    activo: {
        type: DataTypes.INTEGER
    },
    prioridad: {
        type: DataTypes.INTEGER
    },
    Metodos_Enviocol: {
        type: DataTypes.STRING(45)
    }
}, {
    sequelize,
    tableName: "metodo_envio",
    timestamps: false,
    freezeTableName: true
});

export default metodoEnvio;