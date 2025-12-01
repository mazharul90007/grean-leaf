import express from "express";
import { ScheduleController } from "./schedule.controller.js";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";

const router = express.Router();

//====================Create Schedule==================
router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  ScheduleController.createSchedule
);

//====================Get All Schedule==================
router.get(
  "/",
  auth(UserRole.DOCTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  ScheduleController.getAllSchedules
);

//====================Get Schedule by Id==========================
router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  ScheduleController.getScheduleById
);

//====================Delete Schedule by Id=======================
router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  ScheduleController.deleteScheduleById
);

export const ScheduleRoutes = router;
