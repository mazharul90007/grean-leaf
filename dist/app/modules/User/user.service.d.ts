import { UserStatus, type Admin, type Doctor, type Patient } from "@prisma/client";
import type { Request } from "express";
import type { IPaginationOptions } from "../../interfaces/pagination.js";
import type { IAuthUser } from "../../interfaces/common.js";
export declare const userService: {
    createAdmin: (req: Request) => Promise<Admin>;
    createDoctor: (req: Request) => Promise<Doctor>;
    createPatient: (req: Request) => Promise<Patient>;
    getAllUserFromDB: (params: any, options: IPaginationOptions) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: {
            createdAt: Date;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            status: import("@prisma/client").$Enums.UserStatus;
            admin: {
                createdAt: Date;
                email: string;
                name: string;
                id: string;
                profilePhoto: string | null;
                contactNumber: string;
                isDeleted: boolean;
                updatedAt: Date;
            } | null;
            id: string;
            updatedAt: Date;
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
            } | null;
            Patient: {
                createdAt: Date;
                email: string;
                name: string;
                id: string;
                profilePhoto: string | null;
                contactNumber: string | null;
                isDeleted: boolean;
                updatedAt: Date;
                address: string | null;
            } | null;
            needPasswordChange: boolean;
        }[];
    }>;
    updateStatus: (id: string, data: {
        status: UserStatus;
    }) => Promise<{
        createdAt: Date;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        id: string;
        updatedAt: Date;
        password: string;
        needPasswordChange: boolean;
    }>;
    getMyProfile: (user: IAuthUser) => Promise<{
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        id: string;
        needPasswordChange: boolean;
    } | {
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        id: string;
        needPasswordChange: boolean;
    } | {
        createdAt: Date;
        email: string;
        name: string;
        id: string;
        profilePhoto: string | null;
        contactNumber: string;
        isDeleted: boolean;
        updatedAt: Date;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        needPasswordChange: boolean;
    } | {
        createdAt: Date;
        email: string;
        name: string;
        id: string;
        profilePhoto: string | null;
        contactNumber: string | null;
        isDeleted: boolean;
        updatedAt: Date;
        address: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        needPasswordChange: boolean;
    }>;
    updateMyProfile: (user: IAuthUser, req: Request) => Promise<{}>;
};
//# sourceMappingURL=user.service.d.ts.map