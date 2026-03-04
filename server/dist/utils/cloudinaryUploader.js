"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryUploader = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const { CLOUDINARY_NAME: cloud_name, CLOUDINARY_API_KEY: api_key, CLOUDINARY_API_SECRET: api_secret, } = process.env;
cloudinary_1.v2.config({
    cloud_name,
    api_key,
    api_secret,
});
class CloudinaryUploader {
    constructor() {
        this.upload = async (file) => {
            const { createReadStream } = file;
            return new Promise((resolve, reject) => {
                const stream = cloudinary_1.v2.uploader.upload_stream({
                    folder: 'facebook',
                    resource_type: 'auto'
                }, (error, result) => {
                    if (error)
                        return reject(error);
                    resolve(result);
                });
                createReadStream().on('error', reject).pipe(stream);
            });
        };
    }
}
exports.CloudinaryUploader = CloudinaryUploader;
