import express from "express";
import { userController } from "./user.controller.js";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";
import multer from "multer";
import path from "path";
import { fileUploadrer } from "../../../helpers/fileUpload.js";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploadrer.upload.single("file"),
  userController.createAdmin
);

export const UserRoutes = router;
