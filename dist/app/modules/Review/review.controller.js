import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import status from "http-status";
import { ReviewService } from "./review.service.js";
import pick from "../../../shared/pick.js";
import { reviewFilterableFields } from "./review.constants.js";
//======================Create Review======================
const createReview = catchAsync(async (req, res) => {
    const user = req.user;
    const result = await ReviewService.createReview(user, req.body);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Review has been created successfully",
        data: result,
    });
});
//==================Get All Reviews=======================
const getAllReviews = catchAsync(async (req, res) => {
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
//# sourceMappingURL=review.controller.js.map