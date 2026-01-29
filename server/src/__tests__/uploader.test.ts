import { readFileSync } from "fs";
import { LocalUploader } from "../utils/localUploader"
import { Readable } from "stream";
import { join } from "path";
import { CloudinaryUploader } from "../utils/cloudinaryUploader";

describe("Test Uploader", () => {
    it('Test Local Uploader', async () => {
        const uploader = new LocalUploader();
        // Read the file as buffer
        const fileBuffer = readFileSync(join(__dirname, './user.test.ts'));
        // Create a fake Multer file object
        const file: Express.Multer.File = {
            fieldname: "file",
            originalname: "user.test.ts",
            encoding: "7bit",
            mimetype: "text/plain",
            size: fileBuffer.length,
            buffer: fileBuffer,
            destination: "",
            filename: "user.test.ts",
            path: "",
            stream: new Readable()
        };
        // Upload using your uploader
        console.log(await uploader.upload(file));
    })

    it('Test Cloudinary Uploader', async () => {
        const uploader = new CloudinaryUploader();
        const fileBuffer = readFileSync(join(__dirname, './user.test.ts'));
        // Create a fake Multer file object
        const file: Express.Multer.File = {
            fieldname: "file",
            originalname: "user.test.ts",
            encoding: "7bit",
            mimetype: "text/plain",
            size: fileBuffer.length,
            buffer: fileBuffer,
            destination: "",
            filename: "user.test.ts",
            path: "",
            stream: new Readable()
        };
        // Upload using your uploader
        console.log(await uploader.upload(file));
    })
})