import multer from "multer";
import type { ICloudinaryResponse, Ifile } from "../app/interfaces/file.js";
export declare const fileUploadrer: {
    upload: multer.Multer;
    uploadToCloudinary: (file: Ifile) => Promise<ICloudinaryResponse>;
};
//# sourceMappingURL=fileUpload.d.ts.map