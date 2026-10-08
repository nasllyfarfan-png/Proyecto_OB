import { Router } from "express";
import verifyToken from "../middlewares/jwt.middleware.js";
import {
    createMetodoPago,
    showMetodosPago,
    showIdMetodoPago,
    updateMetodoPago,
    deleteMetodoPago
} from "../controller/metodo_pago.controller.js";

const router = Router();

router.post("/metodo-pago",  createMetodoPago);
router.get("/metodo-pago", verifyToken, showMetodosPago);
router.get("/metodo-pago/:id", verifyToken, showIdMetodoPago);
router.put("/metodo-pago/:id", verifyToken, updateMetodoPago);
router.delete("/metodo-pago/:id", verifyToken, deleteMetodoPago);

export default router;