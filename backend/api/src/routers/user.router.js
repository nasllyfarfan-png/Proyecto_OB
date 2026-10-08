import { Router } from "express";
import userController from '../controller/user.controller.js'
import userSchema from "../schemes/user.schema.js";
import userMiddleware from "../middlewares/user.middlewares.js";
import verifyToken from "../middlewares/jwt.middleware.js";

const router = Router();

router.post("/user", userMiddleware(userSchema.createUser), userController.createUser);
router.get("/user", verifyToken, userController.showUser);
router.get("/user/:id", verifyToken, userController.showUserId);
router.put("/user", verifyToken, userMiddleware(userSchema.updateUser), userController.updateUser);
router.delete("/user/:id", verifyToken, userController.deleteUser);
router.post("/user/login", userController.loginUser);
router.post("/user/logout", userController.logoutUser);

export default router;