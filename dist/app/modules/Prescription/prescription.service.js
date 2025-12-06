import { AppointmentStatus, PaymentStatus, Prisma, } from "@prisma/client";
import prisma from "../../../shared/prisma.js";
import ApiError from "../../errors/ApiErrors.js";
import status from "http-status";
import calculatePagination from "../../../helpers/paginationHelpers.js";
import { da } from "zod/locales";
//==================Create Prescription===================
const createPrescription = async (user, payload) => {
    if (!payload.appointmentId) {
        throw new ApiError(status.BAD_REQUEST, "Appointment ID is required");
    }
    const appointmentData = await prisma.appointment.findFirstOrThrow({
        where: {
            id: payload.appointmentId,
            status: AppointmentStatus.COMPLETED,
            paymentStatus: PaymentStatus.PAID,
        },
        include: {
            doctor: true,
        },
    });
    if (!(user?.email === appointmentData.doctor.email)) {
        throw new ApiError(status.BAD_REQUEST, "This is not your appointment");
    }
    //create Appointment
    const result = await prisma.prescription.create({
        data: {
            appointmentId: appointmentData.id,
            doctorId: appointmentData.doctorId,
            patientId: appointmentData.patientId,
            instructions: payload.instructions,
            followUpDate: payload.followUpDate || null,
        },
        include: {
            patient: true,
        },
    });
    return result;
};
//==================Patient Prescription====================
const patientPrescription = async (user, options) => {
    const { limit, page, skip } = calculatePagination(options);
    if (!user?.email) {
        throw new ApiError(status.BAD_REQUEST, "User email is required");
    }
    const result = await prisma.prescription.findMany({
        where: {
            patient: {
                email: user?.email,
            },
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { createdAt: "desc" },
        include: {
            doctor: true,
            patient: true,
            appointment: true,
        },
    });
    const total = await prisma.prescription.count({
        where: {
            patient: {
                email: user?.email,
            },
        },
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
};
//=================Get All Prescription ===================
const getAllPrescription = async (filters, options) => {
    const { limit, page, skip } = calculatePagination(options);
    const { patientEmail, doctorEmail } = filters;
    const andCondition = [];
    if (patientEmail) {
        andCondition.push({
            patient: {
                email: patientEmail,
            },
        });
    }
    if (doctorEmail) {
        andCondition.push({
            doctor: {
                email: doctorEmail,
            },
        });
    }
    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
    const result = await prisma.prescription.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { createdAt: "desc" },
        include: {
            doctor: true,
            patient: true,
            appointment: true,
        },
    });
    const total = await prisma.prescription.count({
        where: whereCondition,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
};
export const PrescriptionService = {
    createPrescription,
    patientPrescription,
    getAllPrescription,
};
//# sourceMappingURL=prescription.service.js.map