import status from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { MetaServices } from "./meta.service.js";
const getMetaData = catchAsync(async (req, res) => {
    const user = req.user;
    const result = await MetaServices.getMetaData(user);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Meta data fetched successfully",
        data: result,
    });
});
export const MetaController = {
    getMetaData,
};
//# sourceMappingURL=meta.controller.js.map