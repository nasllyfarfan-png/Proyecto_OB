import sequelize from "../config/connect.db.js";
import { Model, DataTypes } from "sequelize";

class Category extends Model {}

Category.init({

    category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    category_description: {
        type: DataTypes.STRING,
    },
    
    category_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    category_image: {
        type: DataTypes.STRING(255)
    },

    category_code: {
        type: DataTypes.STRING(50)
    },

    category_created_by: {
        type: DataTypes.STRING(100)
    },

},{
    sequelize,
    modelName: "Category",
    tableName: "Category",
});

export default Category;