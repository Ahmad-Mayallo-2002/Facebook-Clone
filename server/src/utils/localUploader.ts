import { UploaderStrategy } from "../interfaces/uploaderStrategy.interface";
import { extname, join } from "path";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { FileUpload } from "graphql-upload-ts";
import { UploadApiResponse } from "cloudinary";

export class LocalUploader implements UploaderStrategy {
    async upload(file: FileUpload): Promise<string | UploadApiResponse> {
        const { createReadStream, mimetype, filename } = file;

        // Extract type (image, video, etc.)
        const [type] = mimetype.split('/');

        // Prepare directory
        const dirPath = join(process.cwd(), 'public', type);
        if (!existsSync(dirPath)) {
            mkdirSync(dirPath, { recursive: true });
        }

        // Generate filename
        const fileExt = extname(filename);
        const storedFileName = `file-${Date.now()}${fileExt}`;

        const filePath = join(dirPath, storedFileName);

        // Stream file to disk
        await new Promise<void>((resolve, reject) => {
            const readStream = createReadStream();
            const writeStream = createWriteStream(filePath);

            readStream
                .on('error', reject)
                .pipe(writeStream)
                .on('finish', resolve)
                .on('error', reject);
        });

        // Return filename (same contract as before)
        return storedFileName;
    }
}