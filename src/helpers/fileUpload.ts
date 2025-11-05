import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import config from "../app/config/index.js";
import fs from "fs";
import type { ICloudinaryResponse, Ifile } from "../app/interfaces/file.js";

//==============Uploade to Multer====================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//==============Upload to Cloudinary=================

const uploadToCloudinary = async (
  file: Ifile
): Promise<ICloudinaryResponse> => {
  console.log(file);
  // Configuration
  cloudinary.config({
    cloud_name: "dp6urj3gj",
    api_key: config.cloudinary.cloudinary_api,
    api_secret: config.cloudinary.cloudinary_secret,
  });

  // console.log("File: ", { file });
  return new Promise((resolve, reject) => {
    // Upload an image
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const fileUploadrer = {
  upload,
  uploadToCloudinary,
};
