import type { Request, RequestHandler, Response } from "express";
export declare const doctorController: {
    getAllDoctorFromDB: RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    getDoctorById: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    deleteDoctorById: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    doctorSoftDelete: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updatedDoctorData: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=doctor.controller.d.ts.map