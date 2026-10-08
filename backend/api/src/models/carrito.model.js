import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connect.db.js";

class Carrito extends Model {}

Carrito.init(
  {
    id_carrito: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    id_usuario: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id_usuario",
      },
    },

    fecha_agregado: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "carrito",
    tableName: "carrito",
    timestamps: false,
    freezeTableName: true,
  }
);

export default Carrito;