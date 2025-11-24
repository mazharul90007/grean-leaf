import { Prisma, UserStatus, type Patient } from "@prisma/client";
import prisma from "../../../shared/prisma.js";
import type { IPaginationOptions } from "../../interfaces/pagination.js";
import type {
  IpatientFilterRequest,
  IPatientUpdate,
} from "./patient.interface.js";
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
          mode: "insensitive",
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

  const whereCondition: Prisma.PatientWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
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
const deletePatientById = async (id: string): Promise<Patient | null> => {
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

//==========================Update Patient Data=========================
const updatePatient = async (
  id: string,
  payload: Partial<IPatientUpdate>
): Promise<Patient | null> => {
  const { patientHealthData, medicalReport, ...patientData } = payload;

  const patientInfo = await prisma.patient.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  await prisma.$transaction(async (tx) => {
    //Update Patient Data
    await tx.patient.update({
      where: {
        id,
      },
      data: patientData,
      include: {
        patientHealthData: true,
        medicalReports: true,
      },
    });

    //create or update patient health data
    if (patientHealthData) {
      await tx.patientHealthData.upsert({
        where: {
          patientId: patientInfo.id,
        },
        update: patientHealthData,
        create: { ...patientHealthData, patientId: patientInfo.id },
      });
    }

    if (medicalReport) {
      await tx.medicalReport.create({
        data: { ...medicalReport, patientId: patientInfo.id },
      });
    }
  });

  const responseData = await prisma.patient.findUnique({
    where: {
      id: patientInfo.id,
    },
    include: {
      patientHealthData: true,
      medicalReports: true,
    },
  });
  return responseData;
};

export const PatientService = {
  PatientById,
  getAllPatient,
  deletePatientById,
  softDeletePatient,
  updatePatient,
};
