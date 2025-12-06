import catchAsync from "../../../shared/catchAsync.js";
import { DoctorScheduleService } from "./doctorSchedule.service.js";
import sendResponse from "../../../shared/sendResponse.js";
import status from "http-status";
import pick from "../../../shared/pick.js";
//====================Create Doctor Schedule==================
const createDoctorSchedule = catchAsync(async (req, res) => {
    const user = req.user;
    const result = await DoctorScheduleService.createDoctorSchedule(user, req.body);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Doctor Schedule has been deleted successfully",
        data: result,
    });
});
//====================Get Doctors All Schedule==================
const getDoctorsAllSchedules = catchAsync(async (req, res) => {
    const filters = pick(req.query, ["startDate", "endDate", "isBooked"]);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await DoctorScheduleService.getDoctorsAllSchedules(filters, options);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Doctores Schedule has been fetched successfully",
        data: result,
    });
});
//====================Delete Doctors Schedule==================
const deleteDoctorSchedule = catchAsync(async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const result = await DoctorScheduleService.deleteDoctorSchedule(id, user);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Doctores Schedule has been deleted successfully",
        data: result,
    });
});
export const DoctorScheduleController = {
    createDoctorSchedule,
    getDoctorsAllSchedules,
    deleteDoctorSchedule,
};
//# sourceMappingURL=doctorSchedule.controller.js.map