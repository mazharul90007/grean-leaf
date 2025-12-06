import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import status from "http-status";
import { AppointmentServices } from "./appoinment.service.js";
import pick from "../../../shared/pick.js";
import { appointmentFilterableFields } from "./appointment.constant.js";
//======================Create Appoinment================
const createAppointment = catchAsync(async (req, res) => {
    const user = req.user;
    const result = await AppointmentServices.createAppointment(user, req.body);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Appointment has been created successful",
        data: result,
    });
});
//======================Get My Appoinment================
const getMyAppointment = catchAsync(async (req, res) => {
    const user = req.user;
    const filters = pick(req.query, ["status", "paymentStatus"]);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await AppointmentServices.getMyAppointment(user, filters, options);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "My Appointment successful",
        data: result,
    });
});
//===================Get All Appoinments===================
const getAllAppointment = catchAsync(async (req, res) => {
    const filters = pick(req.query, appointmentFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await AppointmentServices.getAllAppointment(filters, options);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "My Appointment successful",
        meta: result.meta,
        data: result.data,
    });
});
//=========================Change Appointment Status======================
const changeAppointmentStatus = catchAsync(async (req, res) => {
    const id = req.params.id;
    const appointmentStatus = req.body.status;
    const user = req.user;
    const result = await AppointmentServices.changeAppointmentStatus(id, appointmentStatus, user);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Appointment status successfully changed",
        data: result,
    });
});
export const AppointmentController = {
    createAppointment,
    getMyAppointment,
    getAllAppointment,
    changeAppointmentStatus,
};
//# sourceMappingURL=appoinment.controller.js.map