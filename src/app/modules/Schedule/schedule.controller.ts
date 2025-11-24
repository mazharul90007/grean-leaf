import type { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import status from "http-status";
import { ScheduleService } from "./schedule.service.js";
import pick from "../../../shared/pick.js";
import type { IAuthUser } from "../../interfaces/common.js";

//====================Create Schedule==================
const createSchedule = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await ScheduleService.createSchedule(req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Schedule has been created successfully",
      data: result,
    });
  }
);

//====================Get All Schedule==================
const getAllSchedules = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const filters = pick(req.query, ["startDate", "endDate"]);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const user = req.user;
    const result = await ScheduleService.getAllSchedules(
      filters,
      options,
      user as IAuthUser
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "All Schedule has been fetched successfully",
      data: result,
    });
  }
);

//====================Get Schedule by Id==========================
const getScheduleById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await ScheduleService.getScheduleById(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Get Schedule By Id successfully",
    data: result,
  });
});

//====================Delete Schedule by Id==========================
const deleteScheduleById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await ScheduleService.deleteScheduleById(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Delete Schedule by Id successfully",
    data: result,
  });
});

export const ScheduleController = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  deleteScheduleById,
};
