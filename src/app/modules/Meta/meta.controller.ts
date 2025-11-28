import status from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { MetaServices } from "./meta.service.js";
import type { Request, Response } from "express";
import type { IAuthUser } from "../../interfaces/common.js";

const getMetaData = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await MetaServices.getMetaData(user as IAuthUser);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Meta data fetched successfully",
      data: result,
    });
  }
);

export const MetaController = {
  getMetaData,
};
