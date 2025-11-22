import express from "express";
import { PatientController } from "./patient.controller.js";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";

const router = express.Router();

//==========================Get Patient By Id=========================

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  PatientController.getAllPatient
);

//==========================Get Patient By Id=========================

router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  PatientController.getPatientById
);

//==========================Delete Patient By Id=========================
router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  PatientController.deletePatientById
);

//==========================Delete Patient By Id=========================
router.patch(
  "/soft/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.PATIENT),
  PatientController.softDeletePatient
);

//======================Update Patient Data==========================
router.patch(
  "/update/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.PATIENT),
  PatientController.updatePatient
);

export const PatientRoutes = router;
