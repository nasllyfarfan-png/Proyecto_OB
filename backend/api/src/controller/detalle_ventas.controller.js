import DetalleVentas from "../models/detalle_ventas.model.js";

export const createDetalleVenta = async (req, res) => {
    try {
        const detalleVenta = await DetalleVentas.create({
            id_venta: req.body.id_venta,
            id_producto: req.body.id_producto,
            talla: req.body.talla,
            cantidad: req.body.cantidad,
            color: req.body.color,
            precio_unitario: req.body.precio_unitario,
            subtotal: req.body.subtotal
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Detalle de venta creado correctamente.",
            data: detalleVenta
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const showDetalleVentas = async (req, res) => {
    try {
        const detalles = await DetalleVentas.findAll();

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Lista de detalles de ventas.",
            data: detalles
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const showIdDetalleVenta = async (req, res) => {
    try {
        const { id } = req.params;

        const detalle = await DetalleVentas.findOne({
            where: {
                id_detalle: id
            }
        });

        if (!detalle) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Detalle de venta no encontrado."
            });
        }

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Detalle de venta encontrado.",
            data: detalle
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const updateDetalleVenta = async (req, res) => {
    try {
        const { id } = req.params;

        const [updated] = await DetalleVentas.update(
            {
                id_venta: req.body.id_venta,
                id_producto: req.body.id_producto,
                talla: req.body.talla,
                cantidad: req.body.cantidad,
                color: req.body.color,
                precio_unitario: req.body.precio_unitario,
                subtotal: req.body.subtotal
            },
            {
                where: {
                    id_detalle: id
                }
            }
        );

        if (updated === 0) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Detalle de venta no encontrado."
            });
        }

        const detalleActualizado = await DetalleVentas.findOne({
            where: {
                id_detalle: id
            }
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Detalle de venta actualizado correctamente.",
            data: detalleActualizado
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const deleteDetalleVenta = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await DetalleVentas.destroy({
            where: {
                id_detalle: id
            }
        });

        if (deleted === 0) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Detalle de venta no encontrado."
            });
        }

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Detalle de venta eliminado correctamente."
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};