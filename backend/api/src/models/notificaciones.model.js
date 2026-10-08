import { DataTypes } from "sequelize";
import sequelize from "../config/connect.db.js";

const Notificaciones = sequelize.define(
  "Notificaciones",
  {
    id_notificaciones: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    id_usuario: {
    type: DataTypes.UUID,
    allowNull: false
},
    mensaje: {
      type: DataTypes.STRING(200),
    },

    tipo: {
      type: DataTypes.STRING(20),
    },

    fecha_notificaciones: {
      type: DataTypes.DATE,
    },

    estado_notificaciones: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Notificaciones",
    timestamps: false,
  }
);

export default Notificaciones;