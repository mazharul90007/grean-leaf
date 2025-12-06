import { fileUploadrer } from "../../../helpers/fileUpload.js";
import prisma from "../../../shared/prisma.js";
//==========================Create Specialties===========================
const insertIntoDB = async (req) => {
    const file = req?.file;
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
const deleteSpecialtiesById = async (id) => {
    const result = await prisma.specialties.delete({
        where: {
            id,
        },
    });
    return result;
};
export const specialtiesService = {
    insertIntoDB,
    getAllSpecialties,
    deleteSpecialtiesById,
};
//# sourceMappingURL=specialties.service.js.map