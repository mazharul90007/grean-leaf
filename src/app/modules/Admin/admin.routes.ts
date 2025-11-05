import express from "express";
import { AdminController } from "./admin.controller.js";
import validateRequest from "../../middlewares/validateRequest.js";
import { adminValidationSchemas } from "./admin.validation.js";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.getAllFromDB
);
router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AdminController.getAdminByID
);
router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(adminValidationSchemas.update),
  AdminController.updateIntoDbById
);
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AdminController.deleteAdminFromDB
);
router.patch(
  "/soft/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AdminController.softDeleteFromDb
);

export const AdminRoutes = router;
