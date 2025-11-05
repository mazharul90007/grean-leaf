import express from "express";
import { authController } from "./auth.controller.js";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";
import { AdminController } from "../Admin/admin.controller.js";
const router = express.Router();

router.post("/login", authController.loginUser);
router.get("/refresh-token", authController.refreshToken);
router.post(
  "/change-password",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  authController.changePassword
);

router.post("/forget-password", authController.forgetPassword);

router.post("/reset-password", authController.resetPassword);

export const AuthRoutes = router;
