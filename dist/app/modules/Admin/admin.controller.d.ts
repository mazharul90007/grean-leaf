import { type NextFunction, type Request, type RequestHandler, type Response } from "express";
export declare const AdminController: {
    getAllFromDB: RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    getAdminByID: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateIntoDbById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteAdminFromDB: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    softDeleteFromDb: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=admin.controller.d.ts.map