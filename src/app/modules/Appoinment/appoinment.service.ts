import status from "http-status";
import prisma from "../../../shared/prisma.js";
import ApiError from "../../errors/ApiErrors.js";
import type { IAuthUser } from "../../interfaces/common.js";
import { v4 as uuidv4 } from "uuid";

//======================Create Appoinment================
const createAppointment = async (user: IAuthUser, payload: any) => {
  if (!user?.email) {
    throw new ApiError(status.BAD_REQUEST, "User email is missing");
  }
  //Check Patient Data
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  //Check Doctor Data
  const doctorData = await prisma.doctor.findFirstOrThrow({
    where: {
      id: payload.doctorId,
    },
  });

  //Check Doctor schedule data
  await prisma.doctorSchedule.findFirstOrThrow({
    where: {
      doctorId: doctorData.id,
      scheduleId: payload.scheduleId,
      isBooked: false,
    },
  });

  //Create a unique video calling id
  const videoCallingId: string = uuidv4();

  const result = await prisma.$transaction(async (tx) => {
    //Create an Appoinment
    const appointmentData = await tx.appointment.create({
      data: {
        patientId: patientData.id,
        doctorId: doctorData.id,
        scheduleId: payload.scheduleId,
        videoCallingId,
      },
      include: {
        patient: true,
        doctor: true,
        schedule: true,
      },
    });

    //Update Doctor Schedule data
    await tx.doctorSchedule.update({
      where: {
        doctorId_scheduleId: {
          doctorId: doctorData.id,
          scheduleId: payload.scheduleId,
        },
      },
      data: {
        isBooked: true,
        appointmentId: appointmentData.id,
      },
    });

    return appointmentData;
  });

  return result;
};

export const AppointmentServices = {
  createAppointment,
};
