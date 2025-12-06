import type { IAuthUser } from "../../interfaces/common.js";
import type { IPaginationOptions } from "../../interfaces/pagination.js";
import { AppointmentStatus } from "@prisma/client";
export declare const AppointmentServices: {
    createAppointment: (user: IAuthUser, payload: any) => Promise<{
        doctor: {
            createdAt: Date;
            email: string;
            name: string;
            id: string;
            profilePhoto: string | null;
            contactNumber: string;
            isDeleted: boolean;
            updatedAt: Date;
            address: string | null;
            registrationNumber: string;
            experience: number;
            gender: import("@prisma/client").$Enums.Gender;
            appointmentFee: number;
            qualification: string;
            currentWorkingPlace: string;
            designation: string;
            averageRating: number;
        };
        patient: {
            createdAt: Date;
            email: string;
            name: string;
            id: string;
            profilePhoto: string | null;
            contactNumber: string | null;
            isDeleted: boolean;
            updatedAt: Date;
            address: string | null;
        };
        schedule: {
            createdAt: Date;
            id: string;
            updatedAt: Date;
            startDateTime: Date;
            endDateTime: Date;
        };
    } & {
        createdAt: Date;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        id: string;
        updatedAt: Date;
        doctorId: string;
        patientId: string;
        scheduleId: string;
        videoCallingId: string;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
    }>;
    getMyAppointment: (user: IAuthUser, filters: any, options: IPaginationOptions) => Promise<{
        meta: {
            total: number;
            page: number;
            limit: number;
        };
        data: ({
            schedule: {
                createdAt: Date;
                id: string;
                updatedAt: Date;
                startDateTime: Date;
                endDateTime: Date;
            };
        } & {
            createdAt: Date;
            status: import("@prisma/client").$Enums.AppointmentStatus;
            id: string;
            updatedAt: Date;
            doctorId: string;
            patientId: string;
            scheduleId: string;
            videoCallingId: string;
            paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        })[];
    }>;
    getAllAppointment: (filters: any, options: IPaginationOptions) => Promise<{
        meta: {
            total: number;
            page: number;
            limit: number;
        };
        data: ({
            doctor: {
                createdAt: Date;
                email: string;
                name: string;
                id: string;
                profilePhoto: string | null;
                contactNumber: string;
                isDeleted: boolean;
                updatedAt: Date;
                address: string | null;
                registrationNumber: string;
                experience: number;
                gender: import("@prisma/client").$Enums.Gender;
                appointmentFee: number;
                qualification: string;
                currentWorkingPlace: string;
                designation: string;
                averageRating: number;
            };
            patient: {
                createdAt: Date;
                email: string;
                name: string;
                id: string;
                profilePhoto: string | null;
                contactNumber: string | null;
                isDeleted: boolean;
                updatedAt: Date;
                address: string | null;
            };
        } & {
            createdAt: Date;
            status: import("@prisma/client").$Enums.AppointmentStatus;
            id: string;
            updatedAt: Date;
            doctorId: string;
            patientId: string;
            scheduleId: string;
            videoCallingId: string;
            paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        })[];
    }>;
    changeAppointmentStatus: (appointmentId: string, appointmentStatus: AppointmentStatus, user: IAuthUser) => Promise<{
        createdAt: Date;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        id: string;
        updatedAt: Date;
        doctorId: string;
        patientId: string;
        scheduleId: string;
        videoCallingId: string;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
    }>;
    cancelUnpaidAppointments: () => Promise<void>;
};
//# sourceMappingURL=appoinment.service.d.ts.map