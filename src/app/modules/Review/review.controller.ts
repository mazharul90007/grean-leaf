import type { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync.js";
import type { IAuthUser } from "../../interfaces/common.js";
import sendResponse from "../../../shared/sendResponse.js";
import status from "http-status";
import { ReviewService } from "./review.service.js";

//======================Create Review======================
const createReview = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await ReviewService.createReview(
      user as IAuthUser,
      req.body
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Review has been created successfully",
      data: result,
    });
  }
);

export const ReviewController = {
  createReview,
};
