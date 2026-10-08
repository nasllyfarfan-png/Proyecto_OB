import { Router } from "express";
import verifyToken from "../middlewares/jwt.middleware.js";
import {
    createDetalleVenta,
    showDetalleVentas,
    showIdDetalleVenta,
    updateDetalleVenta,
    deleteDetalleVenta
} from "../controller/detalle_ventas.controller.js";

const router = Router();

router.post("/detalle_ventas",  createDetalleVenta);
router.get("/detalle_ventas", verifyToken, showDetalleVentas);
router.get("/detalle_ventas/:id", verifyToken, showIdDetalleVenta);
router.put("/detalle_ventas/:id", verifyToken, updateDetalleVenta);
router.delete("/detalle_ventas/:id", verifyToken, deleteDetalleVenta);

export default router;