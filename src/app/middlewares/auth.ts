import type { NextFunction, Request, Response } from "express";
import { jwtHelpers } from "../../helpers/jwtHelper.js";
import config from "../config/index.js";
import status from "http-status";
import ApiError from "../errors/ApiErrors.js";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(status.UNAUTHORIZED, "Your are not Authorized");
      }

      const verifiedUser = jwtHelpers.verifyToken(token, config.jwt.jwt_secret);

      req.user = verifiedUser;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(status.FORBIDDEN, "Forbidden");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
