import type { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync.js";
import type { IAuthUser } from "../../interfaces/common.js";
import sendResponse from "../../../shared/sendResponse.js";
import status from "http-status";
import { ReviewService } from "./review.service.js";
import pick from "../../../shared/pick.js";
import { reviewFilterableFields } from "./review.constants.js";

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

//==================Get All Reviews=======================
const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, reviewFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await ReviewService.getAllReviews(filters, options);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All reviews fetched successful",
    meta: result.meta,
    data: result.data,
  });
});

export const ReviewController = {
  createReview,
  getAllReviews,
};
