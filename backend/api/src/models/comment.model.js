import sequelize from "../config/connect.db.js";
import { Model, DataTypes } from "sequelize";

class Comment extends Model {}

Comment.init(
{
    id_comment: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    id_usuarios: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    id_productos: {
        type: DataTypes.INTEGER,
        allowNull: false

    },

    calificacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    comment: {
        type: DataTypes.STRING(300),
        allowNull: false
    },

    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },

    estado: {
        type: DataTypes.STRING(15),
        allowNull: false
    }
},
{
    sequelize,
    modelName: "Comment",
    tableName: "comment",
    timestamps: false
}
);

export default Comment;