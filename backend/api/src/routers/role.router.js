import { Router } from "express";
import verifyToken from "../middlewares/jwt.middleware.js";
import {
    createRole,
    showRole,
    showIdRole,
    updateRole,
    deleteRole
} from "../controller/role.controller.js";

const router = Router();

router.post("/role",  createRole);
router.get("/role", verifyToken, showRole);
router.get("/role/:id", verifyToken, showIdRole);
router.put("/role/:id", verifyToken, updateRole);
router.delete("/role/:id", verifyToken, deleteRole);

export default router;