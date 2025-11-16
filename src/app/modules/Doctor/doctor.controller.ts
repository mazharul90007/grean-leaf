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

export const doctorController = {
  getAllDoctorFromDB,
};
