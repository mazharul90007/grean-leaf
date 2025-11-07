import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { specialtiesController } from "./specialties.controller.js";
import { fileUploadrer } from "../../../helpers/fileUpload.js";
import { SpecialtiesValidation } from "./specialties.validation.js";
const router = express.Router();

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

export const SpecialtiesRoutes = router;
