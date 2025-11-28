import status from "http-status";
import prisma from "../../../shared/prisma.js";
import ApiError from "../../errors/ApiErrors.js";
import type { IAuthUser } from "../../interfaces/common.js";

//======================Create Review======================
const createReview = async (user: IAuthUser, payload: any) => {
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

  const result = await prisma.review.create({
    data: {
      appointmentId: appointmentData.id,
      doctorId: appointmentData.doctorId,
      patientId: appointmentData.patientId,
      rating: payload.rating,
      comment: payload.comment,
    },
  });

  return result;
};

export const ReviewService = {
  createReview,
};
