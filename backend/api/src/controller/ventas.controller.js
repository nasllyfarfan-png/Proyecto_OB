import ventasModel from "../models/ventas.model.js";

export const createVenta = async (req, res) => {
    try {
        const dataVenta = req.body;

        await ventasModel.create({
            id_usuario: dataVenta.id_usuario,
            id_medio_pago: dataVenta.id_medio_pago,
            id_medio_envio: dataVenta.id_medio_envio,
            telefono: dataVenta.telefono,
            direccion_envio: dataVenta.direccion_envio,
            ciudad: dataVenta.ciudad,
            fecha_venta: dataVenta.fecha_venta,
            subtotal: dataVenta.subtotal,
            costo_envio: dataVenta.costo_envio,
            total: dataVenta.total,
            estado_venta: dataVenta.estado_venta
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Create Venta :)"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const showVentas = async (req, res) => {
    try {

        const showVentas = await ventasModel.findAll();

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Show Ventas :)",
            data: showVentas
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const showIdVenta = async (req, res) => {
    try {

        const idVenta = req.params.id;

        const showIdVenta = await ventasModel.findOne({
            where: {
                id_ventas: idVenta
            }
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Show Id Venta :)",
            data: showIdVenta
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const updateVenta = async (req, res) => {
    try {

        const { id } = req.params;
        const dataVenta = req.body;

        await ventasModel.update(
            {
                id_medio_pago: dataVenta.id_medio_pago,
                id_medio_envio: dataVenta.id_medio_envio,
                telefono: dataVenta.telefono,
                direccion_envio: dataVenta.direccion_envio,
                ciudad: dataVenta.ciudad,
                subtotal: dataVenta.subtotal,
                costo_envio: dataVenta.costo_envio,
                total: dataVenta.total,
                estado_venta: dataVenta.estado_venta
            },
            {
                where: {
                    id_ventas: id
                }
            }
        );

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Update Venta :)"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const deleteVenta = async (req, res) => {
    try {

        const idVenta = req.params.id;

        const deleteVenta = await ventasModel.destroy({
            where: {
                id_ventas: idVenta
            }
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Delete Venta :)",
            data: deleteVenta
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};