import type { NextFunction, Request, RequestHandler, Response } from "express";
declare const catchAsync: (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default catchAsync;
//# sourceMappingURL=catchAsync.d.ts.map