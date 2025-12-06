import type { Schedule } from "@prisma/client";
import type { IFilterRequest, ISchedule } from "./schedule.interface.js";
import type { IPaginationOptions } from "../../interfaces/pagination.js";
import type { IAuthUser } from "../../interfaces/common.js";
export declare const ScheduleService: {
    createSchedule: (payload: ISchedule) => Promise<Schedule[]>;
    getAllSchedules: (filters: IFilterRequest, options: IPaginationOptions, user: IAuthUser) => Promise<{
        meta: {
            total: number;
            page: number;
            limit: number;
        };
        data: {
            createdAt: Date;
            id: string;
            updatedAt: Date;
            startDateTime: Date;
            endDateTime: Date;
        }[];
    }>;
    getScheduleById: (id: string) => Promise<Schedule | null>;
    deleteScheduleById: (id: string) => Promise<Schedule | null>;
};
//# sourceMappingURL=schedule.service.d.ts.map