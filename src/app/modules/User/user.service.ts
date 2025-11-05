import { UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma.js";
import { fileUploadrer } from "../../../helpers/fileUpload.js";
import type { Ifile } from "../../interfaces/file.js";

const createAdmin = async (req: any) => {
  const file: Ifile = req.file;
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

export const userService = {
  createAdmin,
};
