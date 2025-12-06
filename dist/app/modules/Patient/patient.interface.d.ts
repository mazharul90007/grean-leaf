import type { BloodGroup, Gender, MaritalStatus } from "@prisma/client";
export type IpatientFilterRequest = {
    searchTerm?: string | undefined;
    email?: string | undefined;
    contactNo?: string | undefined;
};
type IPatientHealthData = {
    gender: Gender;
    dateOfBirth: string;
    bloodGroup: BloodGroup;
    hasAllergies?: boolean;
    hasDiabetes?: boolean;
    height: number;
    weight: number;
    smokingStatus?: boolean;
    dietaryPreferences?: string;
    pregnancyStatus?: boolean;
    mentalHealthHistory?: string;
    immunizationStatus?: string;
    hasPastSurgeries?: boolean;
    recentAnxiety?: boolean;
    recentDepression?: boolean;
    maritalStatus?: MaritalStatus;
};
type IMedicalReport = {
    reportName: string;
    reportLink: string;
};
export type IPatientUpdate = {
    name: string;
    contactNumber: string;
    address: string;
    patientHealthData: IPatientHealthData;
    medicalReport: IMedicalReport;
};
export {};
//# sourceMappingURL=patient.interface.d.ts.map