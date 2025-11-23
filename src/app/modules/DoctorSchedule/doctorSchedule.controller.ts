import type { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync.js";
import { DoctorScheduleService } from "./doctorSchedule.service.js";
import sendResponse from "../../../shared/sendResponse.js";
import status from "http-status";
import type { IAuthUser } from "../../interfaces/common.js";

//====================Create Doctor Schedule==================
const createDoctorSchedule = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await DoctorScheduleService.createDoctorSchedule(
      user,
      req.body
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Doctor Schedule has been deleted successfully",
      data: result,
    });
  }
);

export const DoctorScheduleController = {
  createDoctorSchedule,
};
