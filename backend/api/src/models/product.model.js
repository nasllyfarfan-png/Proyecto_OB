import sequelize from "../config/connect.db.js";
import { Model, DataTypes } from "sequelize";

class Product extends Model {}

Product.init({

    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    product_description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    product_price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    product_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Category",
            key: "category_id",
        }
    },
    product_status: {
    type: DataTypes.ENUM(
        "active",
        "inactive",
        "out_of_stock"
    ),
    defaultValue: "active",
   }
},{
    sequelize,
    tableName: "Product"
});

export default Product;