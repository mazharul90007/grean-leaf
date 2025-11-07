import type { Request } from "express";
import { fileUploadrer } from "../../../helpers/fileUpload.js";
import prisma from "../../../shared/prisma.js";
import type { Ifile } from "../../interfaces/file.js";

//==========================Create Admin===========================
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

export const specialtiesService = {
  insertIntoDB,
};
