import type { Request } from "express";
import { fileUploadrer } from "../../../helpers/fileUpload.js";
import prisma from "../../../shared/prisma.js";
import type { Ifile } from "../../interfaces/file.js";

//==========================Create Specialties===========================
const insertIntoDB = async (req: Request) => {
  const file: Ifile | null | undefined = req?.file;
  if (file) {
    const uploadToCloudinary = await fileUploadrer.uploadToCloudinary(file);
    req.body.icon = uploadToCloudinary.secure_url;
  }

  const result = await prisma.specialties.create({
    data: req.body,
  });

  return result;
};

//=================Get All Specialties===================
const getAllSpecialties = async () => {
  const result = await prisma.specialties.findMany();

  return result;
};

//=================Delete a Specialties by Id============
const deleteSpecialtiesById = async () => {
  console.log("Delete a Specialties");
};

export const specialtiesService = {
  insertIntoDB,
  getAllSpecialties,
  deleteSpecialtiesById,
};
