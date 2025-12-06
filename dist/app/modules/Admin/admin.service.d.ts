import { type Admin } from "@prisma/client";
import type { IAdminFilterRequest } from "./admin.interface.js";
import type { IPaginationOptions } from "../../interfaces/pagination.js";
export declare const AdminService: {
    getAllFromDB: (params: IAdminFilterRequest, options: IPaginationOptions) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: {
            createdAt: Date;
            email: string;
            name: string;
            id: string;
            profilePhoto: string | null;
            contactNumber: string;
            isDeleted: boolean;
            updatedAt: Date;
        }[];
    }>;
    getByIdFromDB: (id: string) => Promise<Admin | null>;
    updateIntoDbById: (id: string, data: Partial<Admin>) => Promise<Admin | null>;
    deleteAdminFromDB: (id: string) => Promise<Admin | null>;
    softDeleteFromDb: (id: string) => Promise<void>;
};
//# sourceMappingURL=admin.service.d.ts.map