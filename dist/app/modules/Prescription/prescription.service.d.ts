import { type Prescription } from "@prisma/client";
import type { IAuthUser } from "../../interfaces/common.js";
import type { IPaginationOptions } from "../../interfaces/pagination.js";
export declare const PrescriptionService: {
    createPrescription: (user: IAuthUser, payload: Partial<Prescription>) => Promise<{
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
        id: string;
        updatedAt: Date;
        doctorId: string;
        patientId: string;
        appointmentId: string;
        instructions: string;
        followUpDate: Date | null;
    }>;
    patientPrescription: (user: IAuthUser, options: IPaginationOptions) => Promise<{
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
            appointment: {
                createdAt: Date;
                status: import("@prisma/client").$Enums.AppointmentStatus;
                id: string;
                updatedAt: Date;
                doctorId: string;
                patientId: string;
                scheduleId: string;
                videoCallingId: string;
                paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
            };
        } & {
            createdAt: Date;
            id: string;
            updatedAt: Date;
            doctorId: string;
            patientId: string;
            appointmentId: string;
            instructions: string;
            followUpDate: Date | null;
        })[];
    }>;
    getAllPrescription: (filters: any, options: IPaginationOptions) => Promise<{
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
            appointment: {
                createdAt: Date;
                status: import("@prisma/client").$Enums.AppointmentStatus;
                id: string;
                updatedAt: Date;
                doctorId: string;
                patientId: string;
                scheduleId: string;
                videoCallingId: string;
                paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
            };
        } & {
            createdAt: Date;
            id: string;
            updatedAt: Date;
            doctorId: string;
            patientId: string;
            appointmentId: string;
            instructions: string;
            followUpDate: Date | null;
        })[];
    }>;
};
//# sourceMappingURL=prescription.service.d.ts.map