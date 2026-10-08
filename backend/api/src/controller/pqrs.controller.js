import pqrsModel from "../models/pqrs.model.js";

export const createPqrs = async (req, res) => {
    try {
        const dataPqrs = req.body;
        await pqrsModel.create({
            id_venta: dataPqrs.id_venta || null,   
            id_usuario: dataPqrs.id_usuario,
            nombre: dataPqrs.nombre,
            apellido: dataPqrs.apellido,
            correo: dataPqrs.correo,
            telefono: dataPqrs.telefono,
            tipo_pqrs: dataPqrs.tipo_pqrs,
            mensaje_pqrs: dataPqrs.mensaje_pqrs,
            respuesta_pqrs: dataPqrs.respuesta_pqrs || null,
            fecha_pqrs: dataPqrs.fecha_pqrs,
            fecha_respuesta: dataPqrs.fecha_respuesta || null,
            estado_pqrs: dataPqrs.estado_pqrs
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "PQRS creado exitosamente"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const showPqrs = async (req, res) => {
    try {
        const pqrs = await pqrsModel.findAll();

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Lista de PQRS",
            data: pqrs
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const showIdPqrs = async (req, res) => {
    try {
        const idPqrs = req.params.id;

        const pqrs = await pqrsModel.findOne({
            where: { id_pqrs: idPqrs }
        });

        if (!pqrs) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "PQRS no encontrado"
            });
        }

        res.status(200).json({
            ok: true,
            status: 200,
            message: "PQRS encontrado",
            data: pqrs
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const updatePqrs = async (req, res) => {
    try {
        const { id } = req.params;
        const dataPqrs = req.body;

        // Verificar que existe
        const pqrsExiste = await pqrsModel.findOne({ where: { id_pqrs: id } });
        if (!pqrsExiste) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "PQRS no encontrado"
            });
        }

        await pqrsModel.update(
            {
                nombre: dataPqrs.nombre,
                apellido: dataPqrs.apellido,
                correo: dataPqrs.correo,
                telefono: dataPqrs.telefono,
                tipo_pqrs: dataPqrs.tipo_pqrs,
                mensaje_pqrs: dataPqrs.mensaje_pqrs,
                respuesta_pqrs: dataPqrs.respuesta_pqrs || null,
                fecha_pqrs: dataPqrs.fecha_pqrs,
                fecha_respuesta: dataPqrs.fecha_respuesta || null,
                estado_pqrs: dataPqrs.estado_pqrs
            },
            { where: { id_pqrs: id } }
        );

        res.status(200).json({
            ok: true,
            status: 200,
            message: "PQRS actualizado exitosamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};

export const deletePqrs = async (req, res) => {
    try {
        const idPqrs = req.params.id;

        // Verificar que existe
        const pqrsExiste = await pqrsModel.findOne({ where: { id_pqrs: idPqrs } });
        if (!pqrsExiste) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "PQRS no encontrado"
            });
        }

        await pqrsModel.destroy({
            where: { id_pqrs: idPqrs }
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "PQRS eliminado exitosamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};