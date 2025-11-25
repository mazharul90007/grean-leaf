import express from "express";
import { AppointmentController } from "./appoinment.controller.js";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";

const router = express.Router();

//======================Create an Appoinment================
router.post(
  "/",
  auth(UserRole.PATIENT),
  AppointmentController.createAppointment
);

//======================Get My Appoinment================
router.get(
  "/my-appointment",
  auth(UserRole.DOCTOR, UserRole.PATIENT),
  AppointmentController.getMyAppointment
);

export const AppointmentRoutes = router;
