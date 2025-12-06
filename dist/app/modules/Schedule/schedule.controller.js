import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import status from "http-status";
import { ScheduleService } from "./schedule.service.js";
import pick from "../../../shared/pick.js";
//====================Create Schedule==================
const createSchedule = catchAsync(async (req, res, next) => {
    const result = await ScheduleService.createSchedule(req.body);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Schedule has been created successfully",
        data: result,
    });
});
//====================Get All Schedule==================
const getAllSchedules = catchAsync(async (req, res) => {
    const filters = pick(req.query, ["startDate", "endDate"]);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const user = req.user;
    const result = await ScheduleService.getAllSchedules(filters, options, user);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "All Schedule has been fetched successfully",
        data: result,
    });
});
//====================Get Schedule by Id==========================
const getScheduleById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await ScheduleService.getScheduleById(id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Get Schedule By Id successfully",
        data: result,
    });
});
//====================Delete Schedule by Id==========================
const deleteScheduleById = catchAsync(async (req, res) => {
    const id = req.params.id;
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
//# sourceMappingURL=schedule.controller.js.map