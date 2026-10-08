import { Router } from "express";
import verifyToken from "../middlewares/jwt.middleware.js";
import {
    createProduct,
    showProduct,
    showIdProduct,
    updateProduct,
    deleteProduct
} from "../controller/product.Controller.js";

const router = Router();

router.post("/product", createProduct);
router.get("/product", verifyToken, showProduct);
router.get("/product/:id", verifyToken, showIdProduct);
router.put("/product/:id", verifyToken, updateProduct);
router.delete("/product/:id", verifyToken, deleteProduct);

export default router;