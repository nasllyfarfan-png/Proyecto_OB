import carritoModel from "../models/carrito.model.js";

export const createCarrito = async (req, res) => {
    try {
        const dataCarrito = req.body;

        await carritoModel.create({
            id_usuario: dataCarrito.id_usuario,
            cantidad: dataCarrito.cantidad,
            fecha_agregado: dataCarrito.fecha_agregado
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Create Carrito :)"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const showCarrito = async (req, res) => {
    try {
        await carritoModel.sync();

        const carrito = await carritoModel.findAll();

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Show Carrito :)",
            data: carrito
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const showIdCarrito = async (req, res) => {
    try {
        await carritoModel.sync();

        const { id } = req.params;

        const carrito = await carritoModel.findOne({
            where: {
                id_carrito: id
            }
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Show Carrito :)",
            data: carrito
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const updateCarrito = async (req, res) => {
    try {
        const { id } = req.params;
        const dataCarrito = req.body;

        await carritoModel.update(
            {
                id_user: dataCarrito.id_usuario,
                cantidad: dataCarrito.cantidad,
                fecha_agregado: dataCarrito.fecha_agregado
            },
            {
                where: {
                    id_carrito: id
                }
            }
        );

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Update Carrito :)"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const deleteCarrito = async (req, res) => {
    try {
        const { id } = req.params;

        const carrito = await carritoModel.destroy({
            where: {
                id_carrito: id
            }
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Delete Carrito :)",
            data: carrito
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};