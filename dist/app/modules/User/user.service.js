import { Prisma, UserRole, UserStatus, } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma.js";
import { fileUploadrer } from "../../../helpers/fileUpload.js";
import calculatePagination from "../../../helpers/paginationHelpers.js";
import { userSearchAbleFields } from "./user.constant.js";
//==========================Create Admin===========================
const createAdmin = async (req) => {
    const file = req.file;
    if (file) {
        const uploadToCloudinary = await fileUploadrer.uploadToCloudinary(file);
        req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = {
        email: req.body.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN,
    };
    const result = await prisma.$transaction(async (tx) => {
        const createdUserData = await tx.user.create({
            data: userData,
        });
        const createdAdminData = await tx.admin.create({
            data: req.body.admin,
        });
        return createdAdminData;
    });
    return result;
};
//========================Create Doctor=========================
const createDoctor = async (req) => {
    const file = req.file;
    if (file) {
        const uploadToCloudinary = await fileUploadrer.uploadToCloudinary(file);
        req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = {
        email: req.body.doctor.email,
        password: hashedPassword,
        role: UserRole.DOCTOR,
    };
    const result = await prisma.$transaction(async (tx) => {
        const createdUserData = await tx.user.create({
            data: userData,
        });
        const createdDoctorData = await tx.doctor.create({
            data: req.body.doctor,
        });
        return createdDoctorData;
    });
    return result;
};
//=======================Create Patient====================
const createPatient = async (req) => {
    const file = req.file;
    if (file) {
        const uploadToCloudinary = await fileUploadrer.uploadToCloudinary(file);
        req.body.patient.profilePhoto = uploadToCloudinary?.secure_url;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = {
        email: req.body.patient.email,
        password: hashedPassword,
        role: UserRole.PATIENT,
    };
    const result = await prisma.$transaction(async (tx) => {
        const createdUserData = await tx.user.create({
            data: userData,
        });
        const createdPatientData = await tx.patient.create({
            data: req.body.patient,
        });
        return createdPatientData;
    });
    return result;
};
//========================Get All User=========================
const getAllUserFromDB = async (params, options) => {
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);
    const { searchTerm, ...filteredData } = params;
    const andCondition = [];
    if (params.searchTerm) {
        andCondition.push({
            OR: userSearchAbleFields.map((field) => ({
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
    const whereCondition = { AND: andCondition };
    const result = await prisma.user.findMany({
        where: whereCondition,
        skip: skip,
        take: limit,
        orderBy: sortBy && sortOrder
            ? {
                [sortBy]: sortOrder,
            }
            : { createdAt: "desc" },
        select: {
            id: true,
            email: true,
            role: true,
            needPasswordChange: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            admin: true,
            Patient: true,
            doctor: true,
        },
    });
    const total = await prisma.user.count({
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
//===========================Update Status================
const updateStatus = async (id, data) => {
    const status = data.status;
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
    // Update user data
    const updateUserStatus = await prisma.user.update({
        where: {
            id,
        },
        data: {
            status: status,
        },
    });
    return updateUserStatus;
};
//====================Get My Profile====================
const getMyProfile = async (user) => {
    if (!user?.email) {
        throw new Error("User email is required");
    }
    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
        },
        select: {
            id: true,
            email: true,
            needPasswordChange: true,
            role: true,
            status: true,
        },
    });
    if (userInfo.status !== UserStatus.ACTIVE) {
        throw new Error("User account is not active");
    }
    let profileInfo;
    if (userInfo.role === UserRole.SUPER_ADMIN) {
        profileInfo = await prisma.admin.findUnique({
            where: {
                email: userInfo.email,
            },
        });
    }
    else if (userInfo.role === UserRole.ADMIN) {
        profileInfo = await prisma.admin.findUnique({
            where: {
                email: userInfo.email,
            },
        });
    }
    else if (userInfo.role === UserRole.DOCTOR) {
        profileInfo = await prisma.doctor.findUnique({
            where: {
                email: userInfo.email,
            },
        });
    }
    else if (userInfo.role === UserRole.PATIENT) {
        profileInfo = await prisma.patient.findUnique({
            where: {
                email: userInfo.email,
            },
        });
    }
    return { ...userInfo, ...profileInfo };
};
//====================Update My Profile====================
const updateMyProfile = async (user, req) => {
    if (!user?.email) {
        throw new Error("User email is required");
    }
    const payload = req.body;
    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
        },
    });
    if (userInfo.status !== UserStatus.ACTIVE) {
        throw new Error("User account is not active");
    }
    const file = req.file;
    if (file) {
        const uploadToCloudinary = await fileUploadrer.uploadToCloudinary(file);
        req.body.profilePhoto = uploadToCloudinary.secure_url;
    }
    let profileInfo;
    if (userInfo.role === UserRole.SUPER_ADMIN) {
        profileInfo = await prisma.admin.update({
            where: {
                email: userInfo.email,
            },
            data: payload,
        });
    }
    else if (userInfo.role === UserRole.ADMIN) {
        profileInfo = await prisma.admin.update({
            where: {
                email: userInfo.email,
            },
            data: payload,
        });
    }
    else if (userInfo.role === UserRole.DOCTOR) {
        profileInfo = await prisma.doctor.update({
            where: {
                email: userInfo.email,
            },
            data: payload,
        });
    }
    else if (userInfo.role === UserRole.PATIENT) {
        profileInfo = await prisma.patient.update({
            where: {
                email: userInfo.email,
            },
            data: payload,
        });
    }
    return { ...profileInfo };
};
export const userService = {
    createAdmin,
    createDoctor,
    createPatient,
    getAllUserFromDB,
    updateStatus,
    getMyProfile,
    updateMyProfile,
};
//# sourceMappingURL=user.service.js.map