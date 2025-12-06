import express from "express";
import { DoctorScheduleController } from "./doctorSchedule.controller.js";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";
const router = express.Router();
router.post("/", auth(UserRole.DOCTOR), DoctorScheduleController.createDoctorSchedule);
//====================Get Doctors All Schedule==================
router.get("/", auth(UserRole.DOCTOR), DoctorScheduleController.getDoctorsAllSchedules);
//====================Delete Doctors Schedule==================
router.delete("/:id", auth(UserRole.DOCTOR), DoctorScheduleController.deleteDoctorSchedule);
export const DoctorScheduleRoutes = router;
//# sourceMappingURL=doctorSchedule.route.js.map