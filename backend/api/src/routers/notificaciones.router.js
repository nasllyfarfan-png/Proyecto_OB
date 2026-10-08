import { Router } from "express";
import verifyToken from "../middlewares/jwt.middleware.js";
import {
  createNotificaciones,
  showNotificaciones,
  showIdNotificaciones,
  updateNotificaciones,
  deleteNotificaciones,
} from "../controller/notificaciones.controller.js";

const router = Router();

router.get("/", verifyToken, showNotificaciones);
router.get("/:id", verifyToken, showIdNotificaciones);
router.post("/", createNotificaciones);
router.put("/:id", verifyToken, updateNotificaciones);
router.delete("/:id", verifyToken, deleteNotificaciones);

export default router;