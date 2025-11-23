import type { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import status from "http-status";
import { ScheduleService } from "./schedule.service.js";

//====================Create Schedule==================
const createSchedule = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await ScheduleService.createSchedule(req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Schedule has been deleted successfully",
      data: result,
    });
  }
);

export const ScheduleController = {
  createSchedule,
};
