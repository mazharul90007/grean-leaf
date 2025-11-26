import express from "express";
import { AppointmentController } from "./appoinment.controller.js";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest.js";
import { AppointmentValidation } from "./appointment.validation.js";

const router = express.Router();

//======================Create an Appoinment================
router.post(
  "/",
  auth(UserRole.PATIENT),
  validateRequest(AppointmentValidation.createAppointment),
  AppointmentController.createAppointment
);

//======================Get My Appoinment================
router.get(
  "/my-appointment",
  auth(UserRole.DOCTOR, UserRole.PATIENT),
  AppointmentController.getMyAppointment
);

//===================Get All Appoinments===================
router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AppointmentController.getAllAppointment
);

export const AppointmentRoutes = router;
