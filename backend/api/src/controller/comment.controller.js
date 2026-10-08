import commentModel from "../models/comment.model.js";

export const createComment = async (req, res) => {
    try {
        const dataComment = req.body;

        const comment = await commentModel.create({
            id_usuarios: dataComment.id_usuarios,
            id_productos: dataComment.id_productos,
            calificacion: dataComment.calificacion,
            comment: dataComment.comment,
            fecha: dataComment.fecha,
            estado: dataComment.estado
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Comment created :)",
            id: comment.id_comment
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong in the request",
            status: 500,
            error: error.message
        });
    }
};

export const showComment = async (req, res) => {
    try {

        const data = await commentModel.findAll();

        res.status(200).json({
            message: "Comments found",
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

export const showIdComment = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("ID recibido:", id);

        const comment = await commentModel.findByPk(id);

        console.log("Comment encontrado:", comment);

        if (!comment) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Comment not found"
            });
        }

        res.status(200).json({
            ok: true,
            status: 200,
            data: comment
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Something went wrong in the request",
            error: error.message
        });
    }
};
export const updateComment = async (req, res) => {
    try {

        const idComment = req.params.id;
        const dataComment = req.body;

        const comment = await commentModel.update({
            id_usuarios: dataComment.id_usuarios,
            id_productos: dataComment.id_productos,
            calificacion: dataComment.calificacion,
            comment: dataComment.comment,
            fecha: dataComment.fecha,
            estado: dataComment.estado
        }, {
            where: {
                id_comment: idComment
            }
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Update Comment :)",
            data: comment
        });

    } catch (error) {

        res.status(500).json({
            message: "Something went wrong in the request",
            status: 500,
            error: error.message
        });

    }
};

export const deleteComment = async (req, res) => {
    try {

        const idComment = req.params.id;

        const comment = await commentModel.destroy({
            where: {
                id_comment: idComment
            }
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Delete Comment :)",
            data: comment
        });

    } catch (error) {

        res.status(500).json({
            message: "Something went wrong in the request",
            status: 500,
            error: error.message
        });

    }
};