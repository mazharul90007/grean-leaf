import type { NextFunction, Request, Response } from "express";
import { specialtiesService } from "./specialties.service.js";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import status from "http-status";

//====================Create Specialties==================
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

//===================Get All Specialties====================
const getAllSpecialties = catchAsync(async (req: Request, res: Response) => {
  const result = await specialtiesService.getAllSpecialties();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All Specialteis data fetched!",
    data: result,
  });
});

//=================Delete a Specialties by Id============
const deleteSpecialtiesById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await specialtiesService.deleteSpecialtiesById();

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "The Specialties has been deleted successfully",
      data: null,
    });
  }
);

export const specialtiesController = {
  insertIntoDb,
  getAllSpecialties,
  deleteSpecialtiesById,
};
