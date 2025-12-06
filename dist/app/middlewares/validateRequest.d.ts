import type { NextFunction, Request, Response } from "express";
import type { ZodObject, ZodRawShape } from "zod";
declare const validateRequest: (schema: ZodObject<ZodRawShape>) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default validateRequest;
//# sourceMappingURL=validateRequest.d.ts.map