import type { Request, RequestHandler, Response } from "express";
import pick from "../../../shared/pick.js";
import { doctorFilterableFields } from "./doctor.constants.js";
import { doctorService } from "./doctor.service.js";
import sendResponse from "../../../shared/sendResponse.js";
import status from "http-status";
import catchAsync from "../../../shared/catchAsync.js";

//=============Get All Doctor from DB===============
const getAllDoctorFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, doctorFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await doctorService.getAllDoctorFromDB(filters, options);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Doctors retrieval successful",
      meta: result.meta,
      data: result.data,
    });
  }
);

//=======================Get Doctor By Id==================
const getDoctorById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await doctorService.getDoctorById(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Doctor retrieval successful by Id",
    data: result,
  });
});

//====================Delete Doctor data byId===============
const deleteDoctorById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await doctorService.deleteDoctorById(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Doctor data hard delete successful",
    data: result,
  });
});

export const doctorController = {
  getAllDoctorFromDB,
  getDoctorById,
  deleteDoctorById,
};
