import carritoItemsModel from "../models/carrito_items.model.js";

export const createCarritoItem = async (req, res) => {
    try {
        const dataCarritoItem = req.body;

        const createCarritoItem = await carritoItemsModel.create({
            id_carrito: dataCarritoItem.id_carrito,
            id_productos: dataCarritoItem.id_productos,
            talla: dataCarritoItem.talla,
            cantidad: dataCarritoItem.cantidad,
            color: dataCarritoItem.color,
            precio_unitario: dataCarritoItem.precio_unitario,
            subtotal: dataCarritoItem.subtotal
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Create Carrito Item :)",
            id: createCarritoItem.id
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const showCarritoItems = async (req, res) => {
    try {

        const data = await carritoItemsModel.findAll();

        res.status(200).json({
            message: "Carrito Items found",
            data
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
            status: 500
        });

    }
};

export const showIdCarritoItem = async (req, res) => {
    try {

        const id = req.params.id;

        const showIdCarritoItem = await carritoItemsModel.findOne({
            where: {
                id: id
            }
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Show Id Carrito Item :)",
            data: showIdCarritoItem
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message,
            status: 500
        });

    }
};

export const updateCarritoItem = async (req, res) => {
    try {

        const dataCarritoItem = req.body;
        const id = req.params.id;

        const updateCarritoItem = await carritoItemsModel.update({

            id_carrito: dataCarritoItem.id_carrito,
            id_productos: dataCarritoItem.id_productos,
            talla: dataCarritoItem.talla,
            cantidad: dataCarritoItem.cantidad,
            color: dataCarritoItem.color,
            precio_unitario: dataCarritoItem.precio_unitario,
            subtotal: dataCarritoItem.subtotal

        }, {
            where: {
                id: id
            }
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Update Carrito Item :)",
            data: updateCarritoItem
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message,
            status: 500
        });

    }
};

export const deleteCarritoItem = async (req, res) => {
    try {

        const id = req.params.id;

        const deleteCarritoItem = await carritoItemsModel.destroy({
            where: {
                id: id
            }
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Delete Carrito Item :)",
            data: deleteCarritoItem
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message,
            status: 500
        });

    }
};