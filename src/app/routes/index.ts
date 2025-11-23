import express from "express";
import { UserRoutes } from "../modules/User/user.routes.js";
import { AdminRoutes } from "../modules/Admin/admin.routes.js";
import { AuthRoutes } from "../modules/Auth/auth.routes.js";
import { SpecialtiesRoutes } from "../modules/Specialties/specialties.routes.js";
import { DoctorRoutes } from "../modules/Doctor/doctor.routes.js";
import { PatientRoutes } from "../modules/Patient/patient.routes.js";
import { ScheduleRoutes } from "../modules/Schedule/schedule.routes.js";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/specialties",
    route: SpecialtiesRoutes,
  },
  {
    path: "/doctors",
    route: DoctorRoutes,
  },
  {
    path: "/patients",
    route: PatientRoutes,
  },
  {
    path: "/schedule",
    route: ScheduleRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
