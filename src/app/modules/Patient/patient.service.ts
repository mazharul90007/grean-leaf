import { UserStatus, type Patient } from "@prisma/client";
import prisma from "../../../shared/prisma.js";
import type { IPaginationOptions } from "../../interfaces/pagination.js";
import type { IpatientFilterRequest } from "./patient.interface.js";
import calculatePagination from "../../../helpers/paginationHelpers.js";
import { patientSearchableFields } from "./patient.constants.js";

//==========================Get All Patient Data======================
const getAllPatient = async (
  filters: IpatientFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: patientSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          module: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }

  andConditions.push({
    isDeleted: false,
  });

  const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.patient.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },
    include: {
      medicalReports: true,
      patientHealthData: true,
    },
  });

  const total = await prisma.patient.count({
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

//==========================Get Patient By Id=========================
const PatientById = async (id: string): Promise<Patient | null> => {
  const result = await prisma.patient.findUnique({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      medicalReports: true,
      patientHealthData: true,
    },
  });
  return result;
};

//==========================Delete Patient By Id=========================
const deletePatientById = async (id: string) => {
  const result = await prisma.$transaction(async (tx) => {
    //delete Medical Report
    await tx.medicalReport.deleteMany({
      where: {
        patientId: id,
      },
    });

    //delete patient health data
    await tx.patientHealthData.delete({
      where: {
        patientId: id,
      },
    });

    //delete patient data
    const deletedPatient = await tx.patient.delete({
      where: { id },
    });

    //delete user
    await tx.user.delete({
      where: {
        email: deletedPatient.email,
      },
    });

    return deletedPatient;
  });

  return result;
};

//==========================Soft Delete Patient By Id=========================

const softDeletePatient = async (id: string): Promise<Patient | null> => {
  const result = await prisma.$transaction(async (tx) => {
    //update Patient status
    const updatePatientStatus = await tx.patient.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    //update User status
    await tx.user.update({
      where: {
        email: updatePatientStatus.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });
    return updatePatientStatus;
  });

  return result;
};

export const PatientService = {
  PatientById,
  getAllPatient,
  deletePatientById,
  softDeletePatient,
};
