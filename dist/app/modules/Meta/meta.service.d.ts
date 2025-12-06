import type { IAuthUser } from "../../interfaces/common.js";
export declare const MetaServices: {
    getMetaData: (user: IAuthUser) => Promise<{
        appointmentCount: number;
        patientCount: number;
        doctorCount: number;
        paymentCount: number;
        totalRevenueAmount: number | null;
        barChartData: {
            month: Date;
            count: bigint;
        }[];
        pieChartData: {
            status: import("@prisma/client").$Enums.AppointmentStatus;
            count: number;
        }[];
    } | {
        appointmentCount: number;
        patientCount: number;
        reviewCount: number;
        totalRevenue: import("@prisma/client").Prisma.GetPaymentAggregateType<{
            _sum: {
                amount: true;
            };
            where: {
                appointment: {
                    doctorId: string;
                };
                status: "PAID";
            };
        }>;
        formattedAppointmentStatusDistribution: {
            status: import("@prisma/client").$Enums.AppointmentStatus;
            count: number;
        }[];
    } | {
        appointmentCount: number;
        prescriptionCount: number;
        reviewCount: number;
        formattedAppointmentStatusDistribution: {
            status: import("@prisma/client").$Enums.AppointmentStatus;
            count: number;
        }[];
    }>;
};
//# sourceMappingURL=meta.service.d.ts.map