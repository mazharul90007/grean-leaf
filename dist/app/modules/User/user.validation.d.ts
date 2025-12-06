import { z } from "zod";
export declare const userValidation: {
    createAdmin: z.ZodObject<{
        password: z.ZodString;
        admin: z.ZodObject<{
            name: z.ZodString;
            email: z.ZodString;
            contactNumber: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    createDoctor: z.ZodObject<{
        password: z.ZodString;
        doctor: z.ZodObject<{
            name: z.ZodString;
            email: z.ZodString;
            contactNumber: z.ZodString;
            address: z.ZodOptional<z.ZodString>;
            registrationNumber: z.ZodString;
            experience: z.ZodOptional<z.ZodNumber>;
            gender: z.ZodEnum<{
                MALE: "MALE";
                FEMALE: "FEMALE";
            }>;
            appointmentFee: z.ZodNumber;
            qualification: z.ZodString;
            currentWorkingPlace: z.ZodString;
            designation: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    createPatient: z.ZodObject<{
        password: z.ZodString;
        patient: z.ZodObject<{
            name: z.ZodString;
            email: z.ZodString;
            contactNumber: z.ZodString;
            address: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    updateStatus: z.ZodObject<{
        body: z.ZodObject<{
            status: z.ZodEnum<{
                ACTIVE: "ACTIVE";
                BLOCKED: "BLOCKED";
                DELETED: "DELETED";
            }>;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=user.validation.d.ts.map