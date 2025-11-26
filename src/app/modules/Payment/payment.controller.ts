import type { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync.js";
import { PaymentService } from "./payment.service.js";
import sendResponse from "../../../shared/sendResponse.js";
import status from "http-status";

//=============Initiate Payment===============
const initPayment = catchAsync(async (req: Request, res: Response) => {
  const { appointmentId } = req.params;
  const result = await PaymentService.initPayment(appointmentId as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Payment initiate successful",
    data: result,
  });
});

export const PaymentController = {
  initPayment,
};
