import type { NextFunction, Request, Response } from "express";
export declare const ScheduleController: {
    createSchedule: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllSchedules: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getScheduleById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteScheduleById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=schedule.controller.d.ts.map