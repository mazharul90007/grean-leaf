import { Prisma } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import status from "http-status";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = status.INTERNAL_SERVER_ERROR;
  let success = false;
  let message = error.message || "Something went wrong";
  // let error = error;

  if (error instanceof Prisma.PrismaClientValidationError) {
    message = "Validation Error";
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      message = "Duplicate key error";
    }
  }

  res.status(statusCode).json({
    success: success,
    message: message,
    error,
  });
};

export default globalErrorHandler;
