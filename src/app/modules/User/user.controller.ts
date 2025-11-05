import type { NextFunction, Request, Response } from "express";
import { userService } from "./user.service.js";
import catchAsync from "../../../shared/catchAsync.js";
import prisma from "../../../shared/prisma.js";
import sendResponse from "../../../shared/sendResponse.js";
import status from "http-status";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.createAdmin(req);

    res.status(200).json({
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//==========================Create Doctor=======================
const createDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userService.createDoctor(req);

    res.status(200).json({
      success: true,
      message: "Doctor created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//=====================Create Patient ==========================
const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createPatient(req);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin data fetched!",
    data: result,
  });
});

export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
};
