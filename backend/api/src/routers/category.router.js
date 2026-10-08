import { Router } from "express";
import verifyToken from "../middlewares/jwt.middleware.js";
import {
    createCategory,
    showCategory,
    showIdCategory,
    updateCategory,
    deleteCategory
} from "../controller/category.controller.js";

const router = Router();

router.post("/category", createCategory);
router.get("/category", verifyToken, showCategory);
router.get("/category/:id", verifyToken, showIdCategory);
router.put("/category/:id", verifyToken, updateCategory);
router.delete("/category/:id", verifyToken, deleteCategory);

export default router;