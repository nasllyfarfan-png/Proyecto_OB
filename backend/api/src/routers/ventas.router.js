import { Router } from "express";
import verifyToken from "../middlewares/jwt.middleware.js";
import {
    createVenta,
    showVentas,
    showIdVenta,
    updateVenta,
    deleteVenta
} from "../controller/ventas.controller.js";

const router = Router();

router.post("/ventas",  createVenta);
router.get("/ventas", verifyToken, showVentas);
router.get("/ventas/:id", verifyToken, showIdVenta);
router.put("/ventas/:id", verifyToken, updateVenta);
router.delete("/ventas/:id", verifyToken, deleteVenta);

export default router;