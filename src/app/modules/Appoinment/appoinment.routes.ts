import express from "express";
import { AppointmentController } from "./appoinment.controller.js";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.PATIENT),
  AppointmentController.createAppointment
);

export const AppointmentRoutes = router;
