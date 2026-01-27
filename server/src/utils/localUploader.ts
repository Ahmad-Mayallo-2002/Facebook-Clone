import { UploadApiResponse } from "cloudinary";
import { UploaderStrategy } from "../interfaces/uploaderStrategy.interface";
import { extname, join } from "path";
import {  writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";

export class LocalUploader implements UploaderStrategy {
    upload = async (file: Express.Multer.File): Promise<string | UploadApiResponse> => {
        const mimetypeArray = file.mimetype.split('/');
        const fileExt = extname(file.originalname);
        const dirPath = join(__dirname, '../public/' + `${mimetypeArray[1]}`);
        
        if (!existsSync(dirPath)) mkdirSync(dirPath, { recursive: true });
        
        const fileName = `${file.fieldname}-${Date.now()}.${fileExt}`
        const path = join(__dirname, '../public/' + `/${mimetypeArray[1]}/` + fileName);
        
        await writeFile(path, file.buffer);
        
        return fileName;
    }
};