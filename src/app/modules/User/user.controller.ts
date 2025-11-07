import type { NextFunction, Request, RequestHandler, Response } from "express";
import { userService } from "./user.service.js";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import status from "http-status";
import pick from "../../../shared/pick.js";
import { userFilterAbleFields } from "./user.constant.js";
import type { IAuthUser } from "../../interfaces/common.js";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.createAdmin(req);

    res.status(200).json({
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//==========================Create Doctor=======================
const createDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userService.createDoctor(req);

    res.status(200).json({
      success: true,
      message: "Doctor created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//=====================Create Patient ==========================
const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createPatient(req);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin data fetched!",
    data: result,
  });
});

//=================Get All User from DB======================
const getAllUserFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, userFilterAbleFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    console.log(filters);
    const result = await userService.getAllUserFromDB(filters, options);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "User data fetched!",
      meta: result.meta,
      data: result.data,
    });
  }
);

//========================Update Status====================
const updateStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const result = await userService.updateStatus(id, req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "User status has been updated Successfully!",
      data: result,
    });
  }
);

//========================Get My Profile====================
const getMyProfile = catchAsync(
  async (
    req: Request & { user?: IAuthUser },
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user ?? null;
    const result = await userService.getMyProfile(user);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "My Profile data fetched",
      data: result,
    });
  }
);

//====================Update My Profile====================
const updateMyProfile = catchAsync(
  async (
    req: Request & { user?: IAuthUser },
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user ?? null;
    const result = await userService.updateMyProfile(user, req);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Profile has been Updated",
      data: result,
    });
  }
);

export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllUserFromDB,
  updateStatus,
  getMyProfile,
  updateMyProfile,
};
