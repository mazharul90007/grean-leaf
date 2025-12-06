import { Prisma, UserStatus } from "@prisma/client";
import { adminSearchAbleFields } from "./admin.constant.js";
import calculatePagination from "../../../helpers/paginationHelpers.js";
import prisma from "../../../shared/prisma.js";
const getAllFromDB = async (params, options) => {
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);
    const { searchTerm, ...filteredData } = params;
    const andCondition = [];
    if (params.searchTerm) {
        andCondition.push({
            OR: adminSearchAbleFields.map((field) => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filteredData).length > 0) {
        andCondition.push({
            AND: Object.keys(filteredData).map((key) => ({
                [key]: {
                    equals: filteredData[key],
                },
            })),
        });
    }
    andCondition.push({
        isDeleted: false,
    });
    const whereCondition = { AND: andCondition };
    const result = await prisma.admin.findMany({
        where: whereCondition,
        skip: skip,
        take: limit,
        orderBy: sortBy && sortOrder
            ? {
                [sortBy]: sortOrder,
            }
            : { createdAt: "desc" },
    });
    const total = await prisma.admin.count({
        where: whereCondition,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
//========================Get Admin By Id==================
const getByIdFromDB = async (id) => {
    const result = await prisma.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
        },
    });
    return result;
};
//==============Update Into DB by Id=======================
const updateIntoDbById = async (id, data) => {
    await prisma.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
        },
    });
    const result = await prisma.admin.update({
        where: {
            id,
        },
        data: data,
    });
    return result;
};
//================Delete Admin From DB=====================
const deleteAdminFromDB = async (id) => {
    await prisma.admin.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = await prisma.$transaction(async (tx) => {
        const adminDeletedData = await tx.admin.delete({
            where: {
                id,
            },
        });
        await tx.user.delete({
            where: {
                email: adminDeletedData.email,
            },
        });
        return adminDeletedData;
    });
    return result;
};
//=================Admin Soft Delete =================
const softDeleteFromDb = async (id) => {
    const result = await prisma.$transaction(async (tx) => {
        const adminDeletedData = await tx.admin.update({
            where: {
                id,
                isDeleted: false,
            },
            data: {
                isDeleted: true,
            },
        });
        await tx.user.update({
            where: {
                email: adminDeletedData.email,
            },
            data: {
                status: UserStatus.DELETED,
            },
        });
    });
};
export const AdminService = {
    getAllFromDB,
    getByIdFromDB,
    updateIntoDbById,
    deleteAdminFromDB,
    softDeleteFromDb,
};
//# sourceMappingURL=admin.service.js.map