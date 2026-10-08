import { Router } from "express";
import verifyToken from "../middlewares/jwt.middleware.js";
import {
    createCarritoItem,
    showCarritoItems,
    showIdCarritoItem,
    updateCarritoItem,
    deleteCarritoItem
} from "../controller/carrito_items.controller.js";

const router = Router();

router.post("/", createCarritoItem);
router.get("/", verifyToken, showCarritoItems);
router.get("/:id", verifyToken, showIdCarritoItem);
router.put("/:id", verifyToken, updateCarritoItem);
router.delete("/:id", verifyToken, deleteCarritoItem);

export default router;