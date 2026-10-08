import sequelize from "../config/connect.db.js";

import UserStatus from "../models/userStatus.model.js";
import Role from "../models/role.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import Comment from "../models/comment.model.js";
import Pqrs from "../models/pqrs.model.js";
import Ventas from "../models/ventas.model.js";
import MetodoPago from "../models/metodo_pago.model.js";
import MetodoEnvio from "../models/metodo_envio.model.js";
import DetalleVentas from "../models/detalle_ventas.model.js";
import Carrito from "../models/carrito.model.js";
import CarritoItems from "../models/carrito_items.model.js";
import notificaciones from "../models/notificaciones.model.js";

export const modelApp = function initModels(select) {

    if (select) {
        UserStatus.hasMany(User, {
            foreignKey: {
                name: "userStatus_fk",
                field: "userStatus_fk",
                allowNull: true
            }
        });
        User.belongsTo(UserStatus, {
            foreignKey: {
                name: "userStatus_fk",
                field: "userStatus_fk",
                allowNull: true
            }
        });
        Role.hasMany(User, {
            foreignKey: {
                name: "role_fk",
                field: "role_fk",
                allowNull: true
            }
        });
        User.belongsTo(Role, {
            foreignKey: {
                name: "role_fk",
                field: "role_fk",
                allowNull: true
            }
        });
       User.hasMany(Carrito, {
            foreignKey: {
                name: "id_usuario",
                allowNull: false
            }
        });

        Carrito.belongsTo(User, {
            foreignKey: {
                name: "id_usuario",
                allowNull: false
            }
        });
        Carrito.hasMany(CarritoItems, {
            foreignKey: {
                name: "id_carrito",
                field: "id_carrito",
                allowNull: false
            }
        });
        CarritoItems.belongsTo(Carrito, {
            foreignKey: {
                name: "id_carrito",
                field: "id_carrito",
                allowNull: false
            }
        });
        Product.hasMany(CarritoItems, {
            foreignKey: {
                name: "id_productos",
                field: "id_productos",
                allowNull: false
            }
        });

       CarritoItems.belongsTo(Product, {
            foreignKey: {
                name: "id_productos",
                field: "id_productos",
                allowNull: false
            }
        });
        Category.hasMany(Product, {
            foreignKey: {
                name: "category_fk",
                field: "category_fk",
                allowNull: true
            }
        });
        Product.belongsTo(Category, {
            foreignKey: {
                name: "category_fk",
                field: "category_fk",
                allowNull: true
            }
        });
        Product.hasMany(Comment, {
            foreignKey: {
                name: "id_productos",
                field: "id_productos",
                allowNull: false
            }
        });
        Comment.belongsTo(Product, {
            foreignKey: {
                name: "id_productos",
                field: "id_productos",
                allowNull: false
            }
        });
        MetodoPago.hasMany(Ventas, {
            foreignKey: {
                name: "id_medio_pago",
                field: "id_medio_pago",
                allowNull: false
            }
        });
        Ventas.belongsTo(MetodoPago, {
            foreignKey: {
                name: "id_medio_pago",
                field: "id_medio_pago",
                allowNull: false
            }
        });
        MetodoEnvio.hasMany(Ventas, {
            foreignKey: {
                name: "id_medio_envio",
                field: "id_medio_envio",
                allowNull: false
            }
        });
        Ventas.belongsTo(MetodoEnvio, {
            foreignKey: {
                name: "id_medio_envio",
                field: "id_medio_envio",
                allowNull: false
            }
        });
        Ventas.hasMany(Pqrs, {
            foreignKey: {
                name: "id_venta",
                field: "id_venta",
                allowNull: true
            }
        });
        Pqrs.belongsTo(Ventas, {
            foreignKey: {
                name: "id_venta",
                field: "id_venta",
                allowNull: true
            }
        });
        Ventas.hasMany(DetalleVentas, {
            foreignKey: {
                name: "id_venta",
                field: "id_venta",
                allowNull: false
            }
        });
        DetalleVentas.belongsTo(Ventas, {
            foreignKey: {
                name: "id_venta",
                field: "id_venta",
                allowNull: false
            }
        });

        Product.hasMany(DetalleVentas, {
            foreignKey: {
                name: "id_producto",
                field: "id_producto",
                allowNull: false
            }
        });

        DetalleVentas.belongsTo(Product, {
            foreignKey: {
                name: "id_producto",
                field: "id_producto",
                allowNull: false
            }
        });
        User.hasMany(notificaciones, {
            foreignKey: "Usuarios_id_usuarios" 
        });

        notificaciones.belongsTo(User, {
            foreignKey: "Usuarios_id_usuarios"
        });
        sequelize.sync({
            force: false,
            alter: false
        });
    }
};
