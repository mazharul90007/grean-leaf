import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma.js";
import type { IPaginationOptions } from "../../interfaces/pagination.js";
import type { IDoctorFilterRequest } from "./doctor.interface.js";
import calculatePagination from "../../../helpers/paginationHelpers.js";

//=============Get All Doctor from DB===============
const getAllDoctorFromDB = async (
  filters: IDoctorFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = calculatePagination(options);

  const andCondition: Prisma.DoctorWhereInput[] = [];

  const whereCondition: Prisma.DoctorWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.doctor.findMany({
    where: whereCondition,
  });
};

export const doctorService = {
  getAllDoctorFromDB,
};
