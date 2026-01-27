import { UploadApiResponse } from "cloudinary";

export interface UploaderStrategy {
  upload: (file: Express.Multer.File) => Promise<string | UploadApiResponse>;
}