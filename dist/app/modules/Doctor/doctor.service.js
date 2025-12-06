import { Prisma, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma.js";
import calculatePagination from "../../../helpers/paginationHelpers.js";
import { doctorSearchableFields } from "./doctor.constants.js";
//=============Get All Doctor from DB===============
const getAllDoctorFromDB = async (filters, options) => {
    const { limit, page, skip } = calculatePagination(options);
    const { searchTerm, specialties, ...filterData } = filters;
    const andCondition = [];
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
                equals: filterData[key],
            },
        }));
        andCondition.push(...filterConditions);
    }
    andCondition.push({
        isDeleted: false,
    });
    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
    const result = await prisma.doctor.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { averageRating: "desc" },
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
const getDoctorById = async (id) => {
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
const deleteDoctorById = async (id) => {
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
const doctorSoftDelete = async (id) => {
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
//=====================Update Doctor========================
const updateDoctorData = async (id, payload) => {
    const { specialties, ...doctorData } = payload;
    console.log("Specialties:", specialties);
    console.log("Doctor:", doctorData);
    const doctorInfo = await prisma.doctor.findUniqueOrThrow({
        where: {
            id,
        },
    });
    // Update doctor data
    await prisma.$transaction(async (tx) => {
        await tx.doctor.update({
            where: {
                id,
            },
            data: doctorData,
            include: {
                doctorSpecialties: true,
            },
        });
        if (specialties && specialties.length > 0) {
            //Delete a Specialties
            const deleteSpecialtiesIds = specialties.filter((specialty) => specialty.isDeleted);
            for (const specialty of deleteSpecialtiesIds) {
                await tx.doctorSpecialties.deleteMany({
                    where: {
                        doctorId: doctorInfo.id,
                        specialtiesId: specialty.specialtiesId,
                    },
                });
            }
            //Create a Specialties
            const createSpecialtiesIds = specialties.filter((specialty) => !specialty.isDeleted);
            for (const specialty of createSpecialtiesIds) {
                await tx.doctorSpecialties.create({
                    data: {
                        doctorId: doctorInfo.id,
                        specialtiesId: specialty.specialtiesId,
                    },
                });
            }
        }
    });
    //Find Doctor
    const result = await prisma.doctor.findUnique({
        where: {
            id: doctorInfo.id,
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
export const doctorService = {
    getAllDoctorFromDB,
    getDoctorById,
    deleteDoctorById,
    doctorSoftDelete,
    updateDoctorData,
};
//# sourceMappingURL=doctor.service.js.map