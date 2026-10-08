import { Router } from "express";
import verifyToken from "../middlewares/jwt.middleware.js";
import {
    createMetodoEnvio,
    showMetodoEnvio,
    showIdMetodoEnvio,
    updateMetodoEnvio,
    deleteMetodoEnvio
} from "../controller/metodo_envio.controller.js";

const router = Router();

router.post("/metodo_envio",  createMetodoEnvio);
router.get("/metodo_envio", verifyToken, showMetodoEnvio);
router.get("/metodo_envio/:id", verifyToken, showIdMetodoEnvio);
router.put("/metodo_envio/:id", verifyToken, updateMetodoEnvio);
router.delete("/metodo_envio/:id", verifyToken, deleteMetodoEnvio);

export default router;