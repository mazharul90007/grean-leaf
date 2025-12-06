import { type Patient } from "@prisma/client";
import type { IPaginationOptions } from "../../interfaces/pagination.js";
import type { IpatientFilterRequest, IPatientUpdate } from "./patient.interface.js";
export declare const PatientService: {
    PatientById: (id: string) => Promise<Patient | null>;
    getAllPatient: (filters: IpatientFilterRequest, options: IPaginationOptions) => Promise<{
        meta: {
            total: number;
            page: number;
            limit: number;
        };
        data: ({
            patientHealthData: {
                createdAt: Date;
                id: string;
                updatedAt: Date;
                gender: import("@prisma/client").$Enums.Gender;
                patientId: string;
                dateOfBirth: string;
                bloodGroup: import("@prisma/client").$Enums.BloodGroup;
                hasAllergies: boolean | null;
                hasDiabetes: boolean | null;
                height: number;
                weight: number;
                smokingStatus: boolean | null;
                dietaryPreferences: string | null;
                pregnancyStatus: boolean | null;
                mentalHealthHistory: string | null;
                immunizationStatus: string | null;
                hasPastSurgeries: boolean | null;
                recentAnxiety: boolean | null;
                recentDepression: boolean | null;
                maritalStatus: import("@prisma/client").$Enums.MaritalStatus;
            } | null;
            medicalReports: {
                createdAt: Date;
                id: string;
                updatedAt: Date;
                patientId: string;
                reportName: string;
                reportLink: string;
            }[];
        } & {
            createdAt: Date;
            email: string;
            name: string;
            id: string;
            profilePhoto: string | null;
            contactNumber: string | null;
            isDeleted: boolean;
            updatedAt: Date;
            address: string | null;
        })[];
    }>;
    deletePatientById: (id: string) => Promise<Patient | null>;
    softDeletePatient: (id: string) => Promise<Patient | null>;
    updatePatient: (id: string, payload: Partial<IPatientUpdate>) => Promise<Patient | null>;
};
//# sourceMappingURL=patient.service.d.ts.map