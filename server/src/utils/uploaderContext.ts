import { FileUpload } from "graphql-upload-ts";
import { UploaderStrategy } from "../interfaces/uploaderStrategy.interface";
import { UploadApiResponse } from 'cloudinary';

export class UploaderContext {
    constructor(public uploaderStrategy: UploaderStrategy) {
        this.uploaderStrategy = uploaderStrategy;
    }
    setStrategy(uploaderStrategy: UploaderStrategy) {
        this.uploaderStrategy = uploaderStrategy;
    }
    async performStrategy(file: FileUpload): Promise<string | UploadApiResponse> {
        return await this.uploaderStrategy.upload(file);
    }
}