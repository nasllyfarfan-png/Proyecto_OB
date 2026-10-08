import { Router } from "express";
import verifyToken from "../middlewares/jwt.middleware.js";
import {
    createUserStatus,
    showUserStatus,
    showIdUserStatus,
    updateUserStatus,
    deleteUserStatus
} from "../controller/userStatus.controller.js";

const router = Router();

router.post("/userStatus", createUserStatus);
router.get("/userStatus", verifyToken, showUserStatus);
router.get("/userStatus/:id", verifyToken, showIdUserStatus);
router.put("/userStatus/:id", verifyToken, updateUserStatus);
router.delete("/userStatus/:id", verifyToken, deleteUserStatus);

export default router;