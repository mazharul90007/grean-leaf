import type { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync.js";
import { authServices } from "./auth.service.js";
import sendResponse from "../../../shared/sendResponse.js";
import status from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.loginUser(req.body);

  const { refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Logged in Successfully",
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Access token generated successfully",
    data: result,
    // data: {
    //   accessToken: result.accessToken,
    //   needPasswordChange: result.needPasswordChange,
    // },
  });
});

const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await authServices.changePassword(user, req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Password has been changed Successfully",
      data: result,
    });
  }
);

//========================Forget Password====================
const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = authServices.forgetPassword(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "A reset link has been sent to your email",
    data: result,
  });
});

//=======================Reset Password======================
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization || "";

  await authServices.resetPassword(token, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password reset successful",
    data: null,
  });
});

export const authController = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
