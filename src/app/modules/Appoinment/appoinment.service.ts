import status from "http-status";
import prisma from "../../../shared/prisma.js";
import ApiError from "../../errors/ApiErrors.js";
import type { IAuthUser } from "../../interfaces/common.js";
import { v4 as uuidv4 } from "uuid";
import type { IPaginationOptions } from "../../interfaces/pagination.js";
import calculatePagination from "../../../helpers/paginationHelpers.js";
import { UserRole, type Prisma } from "@prisma/client";

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

    //generate payment transaction Id.  green-leaf-datetime
    const today = new Date();
    const transactionId =
      "green-leaf-" +
      today.getFullYear() +
      "-" +
      today.getMonth() +
      "-" +
      today.getDay() +
      "_" +
      today.getHours() +
      "-" +
      today.getMinutes();

    //Create Payment data
    await tx.payment.create({
      data: {
        appointtmentId: appointmentData.id,
        amount: doctorData.appointmentFee,
        transactionId,
      },
    });

    return appointmentData;
  });

  return result;
};

//======================Get My Appoinment================
const getMyAppointment = async (
  user: IAuthUser,
  filters: any,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = calculatePagination(options);
  const { ...filterData } = filters;

  const andCondition: Prisma.AppointmentWhereInput[] = [];

  if (user?.role === UserRole.PATIENT) {
    andCondition.push({
      patient: {
        email: user?.email,
      },
    });
  } else if (user?.role === UserRole.DOCTOR) {
    andCondition.push({
      doctor: {
        email: user?.email,
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.keys(filterData).map((key) => ({
      [key]: {
        equals: (filterData as any)[key],
      },
    }));
    andCondition.push(...filterConditions);
  }

  const whereCondition: Prisma.AppointmentWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.appointment.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },
    include:
      user?.role === UserRole.PATIENT
        ? { doctor: true, schedule: true }
        : {
            patient: {
              include: { medicalReports: true, patientHealthData: true },
            },
            schedule: true,
          },
  });

  const total = await prisma.appointment.count({
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

export const AppointmentServices = {
  createAppointment,
  getMyAppointment,
};
