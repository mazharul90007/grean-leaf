import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from "express";
import { AdminService } from "./admin.service.js";
import pick from "../../../shared/pick.js";
import { adminFilterableFields } from "./admin.constant.js";
import sendResponse from "../../../shared/sendResponse.js";
import { status } from "http-status";
import catchAsync from "../../../shared/catchAsync.js";

const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  // console.log(filters);
  const result = await AdminService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin data fetched!",
    meta: result.meta,
    data: result.data,
  });
});

//========================Get Admin By Id =======================
const getAdminByID = catchAsync(async (req, res) => {
  const id = req.params.id as string;

  const result = await AdminService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin data fetched by ID!",
    data: result,
  });
});

//===================Update Into DB by Id=====================
const updateIntoDbById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const data = req.body;

  const result = await AdminService.updateIntoDbById(id, data);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Updated Admin Data",
    data: result,
  });
});

//==================Delete Admin From DB======================
const deleteAdminFromDB = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await AdminService.deleteAdminFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin Data has been deleted",
    data: result,
  });
});

//================Soft Delete From DB=======================
const softDeleteFromDb = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await AdminService.softDeleteFromDb(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin Data has been deleted",
    data: result,
  });
});

export const AdminController = {
  getAllFromDB,
  getAdminByID,
  updateIntoDbById,
  deleteAdminFromDB,
  softDeleteFromDb,
};
