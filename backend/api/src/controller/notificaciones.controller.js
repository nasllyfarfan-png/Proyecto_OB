import notificaciones from "../models/notificaciones.model.js";

export const createNotificaciones = async (req, res) => {
    try {
        const dataNotification = req.body;
        const newNotification = await notificaciones.create({
            id_usuario: dataNotification.id_usuario,
            mensaje: dataNotification.mensaje,
            tipo: dataNotification.tipo,
            fecha_notificaciones: dataNotification.fecha_notificaciones,
            estado_notificaciones: dataNotification.estado_notificaciones,
        });
        
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Create Notification :)",
            id: newNotification.id_notificaciones,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong in the request",
            status: 500,
            error: error.message
        });
    }
};

export const showNotificaciones = async (req, res) => {
    try {
        const data = await notificaciones.findAll();
        res.status(200).json({
            message: "Notifications found",
            data
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong in the request",
            status: 500,
            error: error.message
        });
    }
};

export const showIdNotificaciones = async (req, res) => {
    try {
        await notificaciones.sync();
        const idNotification = req.params.id;
        const notification = await notificaciones.findOne({
            where: {
                id_notificaciones: idNotification,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Show Id Notification :)",
            data: notification,
        });
    } catch(error) {
        return res.status(500).json({
            message: "Something went wrong in the request",
            status: 500,
            error: error.message
        });
    }
};

export const updateNotificaciones = async (req, res) => {
    try {
        await notificaciones.sync();
        const dataNotification = req.body;
        const idNotification = req.params.id;
        const updatedNotification = await notificaciones.update({
            id_usuario: dataNotification.id_usuario,
            mensaje: dataNotification.mensaje,
            tipo: dataNotification.tipo,
            fecha_notificaciones: dataNotification.fecha_notificaciones,
            estado_notificaciones: dataNotification.estado_notificaciones,
            Usuarios_id_usuarios: dataNotification.Usuarios_id_usuarios
        }, {
            where: {
                id_notificaciones: idNotification,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Update Notification :)",
            data: updatedNotification,
        });
    } catch(error) {
        return res.status(500).json({
            message: "Something went wrong in the request",
            status: 500,
            error: error.message
        });
    }
};

export const deleteNotificaciones = async (req, res) => {
    try {
        await notificaciones.sync();
        const idNotification = req.params.id;
        const deletedNotification = await notificaciones.destroy({
            where: {
                id_notificaciones: idNotification,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Delete Notification :)",
            data: deletedNotification,
        });
    } catch(error) {
        return res.status(500).json({
            message: "Something went wrong in the request",
            status: 500,
            error: error.message
        });
    }
};
