import { PaymentStatus, UserRole } from "@prisma/client";
import type { IAuthUser } from "../../interfaces/common.js";
import prisma from "../../../shared/prisma.js";

const getMetaData = async (user: IAuthUser) => {
  let metaData;
  switch (user?.role) {
    case UserRole.SUPER_ADMIN:
      metaData = getSuperAdminMetaData();
      break;
    case UserRole.ADMIN:
      metaData = getAdminMetaData();
      break;
    case UserRole.DOCTOR:
      metaData = getDoctorMetaData(user as IAuthUser);
      break;
    case UserRole.PATIENT:
      metaData = getPatientMetaData(user as IAuthUser);
      break;
    default:
      throw new Error("Invalid User Role");
  }

  return metaData;
};

const getSuperAdminMetaData = async () => {
  const appointmentCount = await prisma.appointment.count();
  const patientCount = await prisma.patient.count();
  const doctorCount = await prisma.doctor.count();
  const adminCount = await prisma.admin.count();
  const paymentCount = await prisma.payment.count();
  const totalRevenue = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: {
      status: PaymentStatus.PAID,
    },
  });
  const totalRevenueAmount = totalRevenue._sum.amount;

  return {
    appointmentCount,
    adminCount,
    patientCount,
    doctorCount,
    paymentCount,
    totalRevenueAmount,
  };
};

//=============Admin Meta Data=================
const getAdminMetaData = async () => {
  const appointmentCount = await prisma.appointment.count();
  const patientCount = await prisma.patient.count();
  const doctorCount = await prisma.doctor.count();
  const paymentCount = await prisma.payment.count();
  const totalRevenue = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: {
      status: PaymentStatus.PAID,
    },
  });
  const totalRevenueAmount = totalRevenue._sum.amount;

  return {
    appointmentCount,
    patientCount,
    doctorCount,
    paymentCount,
    totalRevenueAmount,
  };
};

//===============Doctor meta Data==============
const getDoctorMetaData = async (user: IAuthUser) => {
  //find doctor data
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user?.email as string,
    },
  });
  // find doctor Appoint count
  const appointmentCount = await prisma.appointment.count({
    where: {
      doctorId: doctorData.id,
    },
  });

  //patient count
  const patientCount = await prisma.appointment.groupBy({
    by: ["patientId"],
    _count: {
      id: true,
    },
  });

  //review count
  const reviewCount = await prisma.review.count({
    where: {
      doctorId: doctorData.id,
    },
  });

  //Doctors total Reveniew
  const totalRevenue = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      appointment: {
        doctorId: doctorData.id,
      },
      status: PaymentStatus.PAID,
    },
  });

  //Get Count by Status
  const appointmentStatusDistribution = await prisma.appointment.groupBy({
    by: ["status"],
    _count: { id: true },
    where: {
      doctorId: doctorData.id,
    },
  });

  const formattedAppointmentStatusDistribution =
    appointmentStatusDistribution.map((count) => ({
      status: count.status,
      count: Number(count._count.id),
    }));
  return {
    appointmentCount,
    patientCount: patientCount.length,
    reviewCount,
    totalRevenue,
    formattedAppointmentStatusDistribution,
  };
};

//===========Patient Meta Data==========
const getPatientMetaData = async (user: IAuthUser) => {
  //find doctor data
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user?.email as string,
    },
  });
  // find doctor Appoint count
  const appointmentCount = await prisma.appointment.count({
    where: {
      patientId: patientData.id,
    },
  });

  //patient count
  const prescriptionCount = await prisma.prescription.count({
    where: {
      patientId: patientData.id,
    },
  });

  //review count
  const reviewCount = await prisma.review.count({
    where: {
      patientId: patientData.id,
    },
  });

  //Get Count by Status
  const appointmentStatusDistribution = await prisma.appointment.groupBy({
    by: ["status"],
    _count: { id: true },
    where: {
      patientId: patientData.id,
    },
  });

  const formattedAppointmentStatusDistribution =
    appointmentStatusDistribution.map((count) => ({
      status: count.status,
      count: Number(count._count.id),
    }));

  return {
    appointmentCount,
    prescriptionCount,
    reviewCount,
    formattedAppointmentStatusDistribution,
  };
};

export const MetaServices = {
  getMetaData,
};
