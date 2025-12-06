import type { IPaginationOptions } from "../../interfaces/pagination.js";
import type { IDoctorFilterRequest, IDoctorUpdate } from "./doctor.interface.js";
export declare const doctorService: {
    getAllDoctorFromDB: (filters: IDoctorFilterRequest, options: IPaginationOptions) => Promise<{
        meta: {
            total: number;
            page: number;
            limit: number;
        };
        data: ({
            doctorSpecialties: ({
                specialties: {
                    id: string;
                    title: string;
                    icon: string;
                };
            } & {
                doctorId: string;
                specialtiesId: string;
            })[];
        } & {
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
        })[];
    }>;
    getDoctorById: (id: string) => Promise<{
        doctorSpecialties: ({
            specialties: {
                id: string;
                title: string;
                icon: string;
            };
        } & {
            doctorId: string;
            specialtiesId: string;
        })[];
    } & {
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
    }>;
    deleteDoctorById: (id: string) => Promise<{
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
    }>;
    doctorSoftDelete: (id: string) => Promise<{
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
    }>;
    updateDoctorData: (id: string, payload: IDoctorUpdate) => Promise<({
        doctorSpecialties: ({
            specialties: {
                id: string;
                title: string;
                icon: string;
            };
        } & {
            doctorId: string;
            specialtiesId: string;
        })[];
    } & {
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
    }) | null>;
};
//# sourceMappingURL=doctor.service.d.ts.map