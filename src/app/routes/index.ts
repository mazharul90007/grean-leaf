import express from "express";
import { UserRoutes } from "../modules/User/user.routes.js";
import { AdminRoutes } from "../modules/Admin/admin.routes.js";
import { AuthRoutes } from "../modules/Auth/auth.routes.js";
import { SpecialtiesRoutes } from "../modules/Specialties/specialties.routes.js";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
