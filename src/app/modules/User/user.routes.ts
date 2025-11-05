import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { userController } from "./user.controller.js";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";
import multer from "multer";
import path from "path";
import { fileUploadrer } from "../../../helpers/fileUpload.js";
import { userValidation } from "./user.validation.js";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploadrer.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data));
    return userController.createAdmin(req, res, next);
  }
);

export const UserRoutes = router;
