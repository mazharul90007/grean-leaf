import type { NextFunction, Request, Response } from "express";
import { specialtiesService } from "./specialties.service.js";

const insertIntoDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await specialtiesService.insertIntoDB(req);

    res.status(200).json({
      success: true,
      message: "Specialites created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const specialtiesController = {
  insertIntoDb,
};
