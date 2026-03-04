"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalUploader = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
class LocalUploader {
    async upload(file) {
        const { createReadStream, mimetype, filename } = file;
        // Extract type (image, video, etc.)
        const [type] = mimetype.split('/');
        // Prepare directory
        const dirPath = (0, path_1.join)(process.cwd(), 'public', type);
        if (!(0, fs_1.existsSync)(dirPath)) {
            (0, fs_1.mkdirSync)(dirPath, { recursive: true });
        }
        // Generate filename
        const fileExt = (0, path_1.extname)(filename);
        const storedFileName = `file-${Date.now()}${fileExt}`;
        const filePath = (0, path_1.join)(dirPath, storedFileName);
        // Stream file to disk
        await new Promise((resolve, reject) => {
            const readStream = createReadStream();
            const writeStream = (0, fs_1.createWriteStream)(filePath);
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
exports.LocalUploader = LocalUploader;
