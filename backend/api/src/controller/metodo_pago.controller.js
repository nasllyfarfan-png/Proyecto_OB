import metodosPagoModel from "../models/metodo_pago.model.js";

export const createMetodoPago = async (req, res) => {
    try {
        const dataMetodoPago = req.body;

        const createMedioPago = await metodosPagoModel.create({ // ← corregido
            nombre_metodo: dataMetodoPago.nombre_metodo,
            tipo: dataMetodoPago.tipo,
            descripcion: dataMetodoPago.descripcion,
            activo: dataMetodoPago.activo
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Create Metodo Pago :)",
            id: createMedioPago.id_medio_pago  // ← corregido
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const showMetodosPago = async (req, res) => {
    try {
        const data = await metodosPagoModel.findAll();

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Metodos de pago encontrados",
            data
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const showIdMetodoPago = async (req, res) => {
    try {
        const idMetodoPago = req.params.id;

        const metodoPago = await metodosPagoModel.findOne({
            where: { id_medio_pago: idMetodoPago }  // ← corregido
        });

        if (!metodoPago) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Metodo de pago no encontrado"
            });
        }

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Metodo de pago encontrado",
            data: metodoPago
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const updateMetodoPago = async (req, res) => {
    try {
        const dataMetodoPago = req.body;
        const idMetodoPago = req.params.id;

        const existe = await metodosPagoModel.findOne({
            where: { id_medio_pago: idMetodoPago }  // ← corregido
        });

        if (!existe) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Metodo de pago no encontrado"
            });
        }

        await metodosPagoModel.update({
            nombre_metodo: dataMetodoPago.nombre_metodo,
            tipo: dataMetodoPago.tipo,
            descripcion: dataMetodoPago.descripcion,
            activo: dataMetodoPago.activo
        }, {
            where: { id_medio_pago: idMetodoPago }  // ← corregido
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Metodo de pago actualizado exitosamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const deleteMetodoPago = async (req, res) => {
    try {
        const idMetodoPago = req.params.id;

        const existe = await metodosPagoModel.findOne({
            where: { id_medio_pago: idMetodoPago }  // ← corregido
        });

        if (!existe) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Metodo de pago no encontrado"
            });
        }

        await metodosPagoModel.destroy({
            where: { id_medio_pago: idMetodoPago }  // ← corregido
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Metodo de pago eliminado exitosamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};