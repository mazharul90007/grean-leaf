import {
  UserRole,
  type Admin,
  type Doctor,
  type Patient,
} from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma.js";
import { fileUploadrer } from "../../../helpers/fileUpload.js";
import type { Ifile } from "../../interfaces/file.js";
import { email } from "zod";
import type { Request } from "express";

//==========================Create Admin===========================
const createAdmin = async (req: Request): Promise<Admin> => {
  const file = req.file as Ifile;
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
const createDoctor = async (req: Request): Promise<Doctor> => {
  const file = req.file as Ifile;
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
const createPatient = async (req: Request): Promise<Patient> => {
  const file = req.file as Ifile;
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

export const userService = {
  createAdmin,
  createDoctor,
  createPatient,
};
