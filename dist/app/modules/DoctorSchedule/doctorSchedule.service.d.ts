import type { Prisma } from "@prisma/client";
import type { IAuthUser } from "../../interfaces/common.js";
import type { IPaginationOptions } from "../../interfaces/pagination.js";
export declare const DoctorScheduleService: {
    createDoctorSchedule: (user: any, payload: {
        scheduleIds: string[];
    }) => Promise<Prisma.BatchPayload>;
    getDoctorsAllSchedules: (filters: any, options: IPaginationOptions) => Promise<{
        meta: {
            total: number;
            page: number;
            limit: number;
        };
        data: {
            doctorId: string;
            scheduleId: string;
            isBooked: boolean;
            appointmentId: string | null;
        }[];
    }>;
    deleteDoctorSchedule: (scheduleId: string, user: IAuthUser) => Promise<{
        doctorId: string;
        scheduleId: string;
        isBooked: boolean;
        appointmentId: string | null;
    }>;
};
//# sourceMappingURL=doctorSchedule.service.d.ts.map