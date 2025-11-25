import type { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import status from "http-status";
import { AppointmentServices } from "./appoinment.service.js";
import type { IAuthUser } from "../../interfaces/common.js";

//======================Create Appoinment================
const createAppointment = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await AppointmentServices.createAppointment(
      user as IAuthUser,
      req.body
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Appointment has been created successful",
      data: result,
    });
  }
);

export const AppointmentController = {
  createAppointment,
};
