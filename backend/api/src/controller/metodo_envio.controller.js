import metodoEnvioModel from "../models/metodo_envio.model.js";

export const createMetodoEnvio = async (req, res) => {
    try {
        const dataMetodo = req.body;

        await metodoEnvioModel.create({
            nombre_metodo: dataMetodo.nombre_metodo,
            descripcion: dataMetodo.descripcion,
            costo_envio: dataMetodo.costo_envio,
            dias_entrega_min: dataMetodo.dias_entrega_min,
            activo: dataMetodo.activo,
            prioridad: dataMetodo.prioridad,
            Metodos_Enviocol: dataMetodo.Metodos_Enviocol
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Create Metodo Envio :)"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const showMetodoEnvio = async (req, res) => {
    try {
        await metodoEnvioModel.sync();

        const metodos = await metodoEnvioModel.findAll();

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Show Metodos Envio :)",
            data: metodos
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const showIdMetodoEnvio = async (req, res) => {
    try {
        await metodoEnvioModel.sync();

        const { id } = req.params;

        const metodo = await metodoEnvioModel.findOne({
            where: {
                id_metodos_envio: id
            }
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Show Metodo Envio :)",
            data: metodo
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const updateMetodoEnvio = async (req, res) => {
    try {
        const { id } = req.params;
        const dataMetodo = req.body;

        await metodoEnvioModel.update(
            {
                nombre_metodo: dataMetodo.nombre_metodo,
                descripcion: dataMetodo.descripcion,
                costo_envio: dataMetodo.costo_envio,
                dias_entrega_min: dataMetodo.dias_entrega_min,
                activo: dataMetodo.activo,
                prioridad: dataMetodo.prioridad,
                Metodos_Enviocol: dataMetodo.Metodos_Enviocol
            },
            {
                where: {
                    id_metodos_envio: id
                }
            }
        );

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Update Metodo Envio :)"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const deleteMetodoEnvio = async (req, res) => {
    try {
        const { id } = req.params;

        const metodo = await metodoEnvioModel.destroy({
            where: {
                id_metodos_envio: id
            }
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Delete Metodo Envio :)",
            data: metodo
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};