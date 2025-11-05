import type { NextFunction, Request, Response } from "express";
import type { ZodObject, ZodRawShape } from "zod";

const validateRequest = (schema: ZodObject<ZodRawShape>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
