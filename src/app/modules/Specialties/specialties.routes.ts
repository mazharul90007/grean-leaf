import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { specialtiesController } from "./specialties.controller.js";
import { fileUploadrer } from "../../../helpers/fileUpload.js";
import { SpecialtiesValidation } from "./specialties.validation.js";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";
const router = express.Router();

//====================Create a Specialties================
router.post(
  "/",
  fileUploadrer.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialtiesValidation.createSpecialties.parse(
      JSON.parse(req.body.data)
    );
    return specialtiesController.insertIntoDb(req, res, next);
  }
);

//=================Get a Specialties=====================
router.get("/", specialtiesController.getAllSpecialties);

//=================Delete a Specialties by Id============
router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  specialtiesController.deleteSpecialtiesById
);

export const SpecialtiesRoutes = router;
