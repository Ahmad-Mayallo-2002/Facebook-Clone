import { UploadApiResponse, v2 } from 'cloudinary';
import { UploaderStrategy } from "../interfaces/uploaderStrategy.interface";
import { config } from 'dotenv';
import { FileUpload } from 'graphql-upload-ts';

config();

const {
    CLOUDINARY_NAME: cloud_name,
    CLOUDINARY_API_KEY: api_key,
    CLOUDINARY_API_SECRET: api_secret,
} = process.env;

v2.config({
    cloud_name,
    api_key,
    api_secret,
});

export class CloudinaryUploader implements UploaderStrategy {
    upload = async (file: FileUpload): Promise<UploadApiResponse> => {
        const { createReadStream } = file;

        return new Promise((resolve, reject) => {
            const stream = v2.uploader.upload_stream({
                folder: 'facebook',
                resource_type: 'auto'
            }, (error, result) => {
                if (error) return reject(error);
                resolve(result as UploadApiResponse);
            });

            createReadStream().on('error', reject).pipe(stream)
        })
    }
}