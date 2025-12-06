import type { Request } from "express";
export declare const specialtiesService: {
    insertIntoDB: (req: Request) => Promise<{
        id: string;
        title: string;
        icon: string;
    }>;
    getAllSpecialties: () => Promise<{
        id: string;
        title: string;
        icon: string;
    }[]>;
    deleteSpecialtiesById: (id: string) => Promise<{
        id: string;
        title: string;
        icon: string;
    }>;
};
//# sourceMappingURL=specialties.service.d.ts.map