import express from "express";
import { doctorController } from "./doctor.controller.js";

const router = express.Router();

router.get("/", doctorController.getAllDoctorFromDB);

export const DoctorRoutes = router;
