import type { Request, Response } from "express";
export declare const PatientController: {
    getAllPatient: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getPatientById: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    deletePatientById: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    softDeletePatient: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updatePatient: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=patient.controller.d.ts.map