import type { IAuthUser } from "../../interfaces/common.js";
import type { IPaginationOptions } from "../../interfaces/pagination.js";
export declare const ReviewService: {
    createReview: (user: IAuthUser, payload: any) => Promise<{
        createdAt: Date;
        id: string;
        updatedAt: Date;
        doctorId: string;
        patientId: string;
        appointmentId: string;
        rating: number;
        comment: string;
    } | {
        message: string;
    }>;
    getAllReviews: (filters: any, options: IPaginationOptions) => Promise<{
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
            id: string;
            updatedAt: Date;
            doctorId: string;
            patientId: string;
            appointmentId: string;
            rating: number;
            comment: string;
        })[];
    }>;
};
//# sourceMappingURL=review.service.d.ts.map