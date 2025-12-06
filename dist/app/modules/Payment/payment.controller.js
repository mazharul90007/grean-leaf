import catchAsync from "../../../shared/catchAsync.js";
import { PaymentService } from "./payment.service.js";
import sendResponse from "../../../shared/sendResponse.js";
import status from "http-status";
//=============Initiate Payment===============
const initPayment = catchAsync(async (req, res) => {
    const { appointmentId } = req.params;
    const result = await PaymentService.initPayment(appointmentId);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Payment initiate successful",
        data: result,
    });
});
//=============Payment Validation===============
const PaymentValidation = catchAsync(async (req, res) => {
    const result = await PaymentService.PaymentValidation(req.query);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Payment validation successful",
        data: result,
    });
});
export const PaymentController = {
    initPayment,
    PaymentValidation,
};
//# sourceMappingURL=payment.controller.js.map