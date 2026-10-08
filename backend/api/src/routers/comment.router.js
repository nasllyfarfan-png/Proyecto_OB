import { Router } from "express";
import verifyToken from "../middlewares/jwt.middleware.js";
import {
    createComment,
    showComment,
    showIdComment,
    updateComment,
    deleteComment
} from "../controller/comment.controller.js";

const router = Router();

router.post("/comment",  createComment);
router.get("/comment", verifyToken, showComment);
router.get("/comment/:id", verifyToken, showIdComment);
router.put("/comment/:id", verifyToken, updateComment);
router.delete("/comment/:id", verifyToken, deleteComment);

export default router;