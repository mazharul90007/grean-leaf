import type { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync.js";
import { PrescriptionService } from "./prescription.service.js";
import sendResponse from "../../../shared/sendResponse.js";
import status from "http-status";
import type { IAuthUser } from "../../interfaces/common.js";
import pick from "../../../shared/pick.js";
import { prescriptionFilterableFields } from "./prescription.constants.js";

//==================Create Prescription===================
const createPrescription = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await PrescriptionService.createPrescription(
      user as IAuthUser,
      req.body
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Prescription created successful",
      data: result,
    });
  }
);

//==================Patient Prescription====================
const patientPrescription = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await PrescriptionService.patientPrescription(
      user as IAuthUser,
      options
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Patient Prescription fetched successful",
      meta: result.meta,
      data: result.data,
    });
  }
);

//=================Get All Prescription ===================
const getAllPrescription = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, prescriptionFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await PrescriptionService.getAllPrescription(filters, options);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Patient Prescription fetched successful",
    meta: result.meta,
    data: result.data,
  });
});

export const PrescriptionController = {
  createPrescription,
  patientPrescription,
  getAllPrescription,
};
