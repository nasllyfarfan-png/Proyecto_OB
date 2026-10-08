import productModel from "../models/product.model.js";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";

export const createProduct = async (req, res) => {
    try {
        const dataProduct = req.body;
        await productModel.create(
            {
                product_name: dataProduct.product_name,
                product_description: dataProduct.product_description,
                product_price: dataProduct.product_price,
                product_stock: dataProduct.product_stock,
                product_status: dataProduct.product_status,
                category_fk: dataProduct.category_fk
            }
        );
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Create Product :)"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong in the request",
            status: 500,
            error: error.message
        });
    }
};

export const showProduct = async (req, res) => {
    try {
        await productModel.sync();
        const showProducts = await productModel.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Show Product :)",
            data: showProducts,
        });
    } catch(error) {
        return res.status(500).json({
            message: "Something went wrong in the request",
            status: 500,
        });
    }
};

export const showIdProduct = async (req, res) => {
    try {
        await productModel.sync();
        const idProduct = req.params.id;
        const showIdProduct = await productModel.findOne({
            where: {
                product_id: idProduct,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Show Id Product :)",
            data: showIdProduct,
        });
    } catch(error) {
        return res.status(500).json({
            message: "Something went wrong in the request",
            status: 500,
        });
    }
};

export const updateProduct = async (req, res) => {
    try {

        const { id } = req.params;
        const dataProduct = req.body;

        await productModel.update(
            {
                product_name: dataProduct.product_name,
                product_description: dataProduct.product_description,
                product_price: dataProduct.product_price,
                product_stock: dataProduct.product_stock,
                product_status: dataProduct.product_status
            },
            {
                where: {
                    product_id: id
                }
            }
        );

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Update Product :)"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        await productModel.sync();
        const idProduct = req.params.id;
        const deleteProduct = await productModel.destroy({
            where: {
                product_id: idProduct,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Delete Product :)",
            data: deleteProduct,
        });
    } catch(error) {
        return res.status(500).json({
            message: "Something went wrong in the request",
            status: 500,
        });
    }
};