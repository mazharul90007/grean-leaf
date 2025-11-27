import express from "express";
import { PrescriptionController } from "./prescription.controller.js";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";

const router = express.Router();

//==================Create Prescription===================
router.post(
  "/",
  auth(UserRole.DOCTOR),
  PrescriptionController.createPrescription
);

//==================Patient Prescription====================
router.get(
  "/my-prescription",
  auth(UserRole.PATIENT),
  PrescriptionController.patientPrescription
);

export const PrescriptionRoutes = router;
