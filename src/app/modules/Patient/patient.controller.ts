import type { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync.js";
import { PatientService } from "./patient.service.js";
import sendResponse from "../../../shared/sendResponse.js";
import status from "http-status";
import { PatientFilterableFields } from "./patient.constants.js";
import pick from "../../../shared/pick.js";

//==========================Get All Patient Data======================
const getAllPatient = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, PatientFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await PatientService.getAllPatient(filters, options);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Patient data retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

//==========================Get Patient By Id=========================
const getPatientById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const result = await PatientService.PatientById(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Patient Data retrieval by Id successful",
    data: result,
  });
});

//==========================Delete Patient By Id=========================
const deletePatientById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const result = await PatientService.deletePatientById(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Patient Data deleted by Id successful",
    data: result,
  });
});

//==========================Soft Delete Patient By Id=========================
const softDeletePatient = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await PatientService.softDeletePatient(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Patient Data soft deleted by Id successful",
    data: result,
  });
});

export const PatientController = {
  getAllPatient,
  getPatientById,
  deletePatientById,
  softDeletePatient,
};
