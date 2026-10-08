import categoryModel from "../models/category.model.js";

export const createCategory = async (req, res) => {
    try {
        const dataCategory = req.body;
        await categoryModel.create(
            {
            category_name: dataCategory.category_name,
            category_description: dataCategory.category_description,
            category_status: dataCategory.category_status,
            category_image: dataCategory.category_image,
            category_code: dataCategory.category_code,
            category_created_by: dataCategory.category_created_by,
 
            }
        );
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Create Category :)",
            id: createCategory.category_id,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong in the request",
            status: 500,
        });
    }
};

export const showCategory = async (req, res) => {
    try {

        const data = await categoryModel.findAll();

        res.status(200).json({
            message: "Categories found",
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
export const showIdCategory = async (req, res) => {
    try {
        await categoryModel.sync();
        const idCategory = req.params.id;
        const showIdCategory = await categoryModel.findOne({
            where: {
                category_id: idCategory,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Show Id Category :)",
            data: showIdCategory,
        });
    } catch(error) {
        return res.status(500).json({
            message: "Something went wrong in the request",
            status: 500,
        });
    }
};

export const updateCategory = async (req, res) => {
    try {
        await categoryModel.sync();
        const dataCategory = req.body;
        const idCategory = req.params.id;
        const updateCategory = await categoryModel.update({
            category_name: dataCategory.category_name,
            category_description: dataCategory.category_description,
            category_status: dataCategory.category_status,
            category_image: dataCategory.category_image,
            category_code: dataCategory.category_code,
            category_created_by: dataCategory.category_created_by,
            product_fk: dataCategory.product_fk
            

        },{
            where: {
                category_id: idCategory,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Update Category :)",
            data: updateCategory,
        });
    } catch(error) {
        return res.status(500).json({
            message: "Something went wrong in the request",
            status: 500,
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        await categoryModel.sync();
        const idCategory = req.params.id;
        const deleteCategory = await categoryModel.destroy({
            where: {
                category_id: idCategory,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Delete Category :)",
            data: deleteCategory,
        });
    } catch(error) {
        return res.status(500).json({
            message: "Something went wrong in the request",
            status: 500,
        });

    }
};