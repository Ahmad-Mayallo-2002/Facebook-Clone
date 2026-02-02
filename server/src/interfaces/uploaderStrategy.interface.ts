import { UploadApiResponse } from "cloudinary";
import { FileUpload } from "graphql-upload-ts";

export interface UploaderStrategy {
  upload: (file: FileUpload) => Promise<string | UploadApiResponse>;
}