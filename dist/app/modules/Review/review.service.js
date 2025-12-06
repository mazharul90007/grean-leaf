import status from "http-status";
import prisma from "../../../shared/prisma.js";
import ApiError from "../../errors/ApiErrors.js";
import calculatePagination from "../../../helpers/paginationHelpers.js";
//======================Create Review======================
const createReview = async (user, payload) => {
    if (!user?.email) {
        return {
            message: "User email is missing",
        };
    }
    const patientData = await prisma.patient.findUniqueOrThrow({
        where: {
            email: user?.email,
        },
    });
    const appointmentData = await prisma.appointment.findUniqueOrThrow({
        where: {
            id: payload.appointmentId,
        },
    });
    if (!(patientData.id === appointmentData.patientId)) {
        throw new ApiError(status.BAD_REQUEST, "This is not your appointment!");
    }
    return await prisma.$transaction(async (tx) => {
        const result = await tx.review.create({
            data: {
                appointmentId: appointmentData.id,
                doctorId: appointmentData.doctorId,
                patientId: appointmentData.patientId,
                rating: payload.rating,
                comment: payload.comment,
            },
        });
        const averageRating = await tx.review.aggregate({
            _avg: {
                rating: true,
            },
        });
        await tx.doctor.update({
            where: {
                id: result.doctorId,
            },
            data: {
                averageRating: averageRating._avg.rating,
            },
        });
        return result;
    });
};
//==================Get All Reviews=======================
const getAllReviews = async (filters, options) => {
    const { patientEmail, doctorEmail } = filters;
    const { limit, page, skip } = calculatePagination(options);
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
    const result = await prisma.review.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { createdAt: "desc" },
        include: {
            doctor: true,
            patient: true,
        },
    });
    const total = await prisma.review.count({
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
export const ReviewService = {
    createReview,
    getAllReviews,
};
//# sourceMappingURL=review.service.js.map