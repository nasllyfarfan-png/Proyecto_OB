import { Router } from "express";
import verifyToken from "../middlewares/jwt.middleware.js";
import {
    createCarrito,
    showCarrito,
    showIdCarrito,
    updateCarrito,
    deleteCarrito
} from "../controller/carrito.controller.js";

const router = Router();

router.post("/carrito",  createCarrito);
router.get("/carrito", verifyToken, showCarrito);
router.get("/carrito/:id", verifyToken, showIdCarrito);
router.put("/carrito/:id", verifyToken, updateCarrito);
router.delete("/carrito/:id", verifyToken, deleteCarrito);

export default router;