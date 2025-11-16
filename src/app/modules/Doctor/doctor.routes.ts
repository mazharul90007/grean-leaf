import express from "express";
import { doctorController } from "./doctor.controller.js";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";

const router = express.Router();

//=============Get All Doctor from DB===============
router.get("/", doctorController.getAllDoctorFromDB);

//=======================Get Doctor By Id===========
router.get("/:id", doctorController.getDoctorById);

//====================Delete Doctor data byId===============
router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  doctorController.deleteDoctorById
);

export const DoctorRoutes = router;
