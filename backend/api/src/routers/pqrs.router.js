import { Router } from "express";
import verifyToken from "../middlewares/jwt.middleware.js";
import {
    createPqrs,
    showPqrs,
    showIdPqrs,
    updatePqrs,
    deletePqrs
} from "../controller/pqrs.controller.js";

const router = Router();

router.post("/pqrs", createPqrs);
router.get("/pqrs", verifyToken, showPqrs);
router.get("/pqrs/:id", verifyToken, showIdPqrs);
router.put("/pqrs/:id", verifyToken, updatePqrs);
router.delete("/pqrs/:id", verifyToken, deletePqrs);

export default router;