import { Prisma, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma.js";
import type { IPaginationOptions } from "../../interfaces/pagination.js";
import type { IDoctorFilterRequest } from "./doctor.interface.js";
import calculatePagination from "../../../helpers/paginationHelpers.js";
import { doctorSearchableFields } from "./doctor.constants.js";

//=============Get All Doctor from DB===============
const getAllDoctorFromDB = async (
  filters: IDoctorFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = calculatePagination(options);
  const { searchTerm, specialties, ...filterData } = filters;

  const andCondition: Prisma.DoctorWhereInput[] = [];

  if (searchTerm) {
    andCondition.push({
      OR: doctorSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (specialties && specialties.length > 0) {
    //corrected specialities condition
    andCondition.push({
      doctorSpecialties: {
        some: {
          specialties: {
            title: {
              contains: specialties,
              mode: "insensitive",
            },
          },
        },
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

  andCondition.push({
    isDeleted: false,
  });

  const whereCondition: Prisma.DoctorWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.doctor.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: [options.sortOrder] }
        : { createdAt: "desc" },
    include: {
      doctorSpecialties: {
        include: {
          specialties: true,
        },
      },
    },
  });

  const total = await prisma.doctor.count({
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

//=======================Get Doctor By Id==================
const getDoctorById = async (id: string) => {
  const result = await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      doctorSpecialties: {
        include: {
          specialties: true,
        },
      },
    },
  });

  return result;
};

//====================Delete Doctor data byId===============
const deleteDoctorById = async (id: string) => {
  return await prisma.$transaction(async (tx) => {
    const deleteDoctor = await tx.doctor.delete({
      where: {
        id,
      },
    });
    await tx.user.delete({
      where: {
        email: deleteDoctor.email,
      },
    });
    return deleteDoctor;
  });
};

//====================Doctor Soft Delete by Id===============
const doctorSoftDelete = async (id: string) => {
  return await prisma.$transaction(async (tx) => {
    const softDeleteDoctor = await tx.doctor.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
    await tx.user.update({
      where: {
        email: softDeleteDoctor.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return softDeleteDoctor;
  });
};

export const doctorService = {
  getAllDoctorFromDB,
  getDoctorById,
  deleteDoctorById,
  doctorSoftDelete,
};
