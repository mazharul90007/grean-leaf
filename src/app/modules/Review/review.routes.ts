import express from "express";
import { ReviewController } from "./review.controller.js";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";

const router = express.Router();

//======================Create Review======================
router.post("/", auth(UserRole.PATIENT), ReviewController.createReview);

export const ReviewRoutes = router;
