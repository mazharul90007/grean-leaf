import type { NextFunction, Request, RequestHandler, Response } from "express";
export declare const userController: {
    createAdmin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createDoctor: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createPatient: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllUserFromDB: RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    updateStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getMyProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateMyProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=user.controller.d.ts.map