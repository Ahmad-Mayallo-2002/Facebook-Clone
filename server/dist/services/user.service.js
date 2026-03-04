"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const typedi_1 = require("typedi");
const user_entity_1 = require("../entities/user.entity");
const uploaderContext_1 = require("../utils/uploaderContext");
const cloudinaryUploader_1 = require("../utils/cloudinaryUploader");
const cloudinary_1 = require("cloudinary");
const getRepo_1 = require("../utils/getRepo");
const paginationCalculation_1 = require("../utils/paginationCalculation");
let UserService = class UserService {
    constructor() {
        this.userRepo = (0, getRepo_1.getRepo)(user_entity_1.User);
    }
    async getAll(take, skip) {
        const [users, counts] = await this.userRepo.findAndCount({
            take,
            skip,
        });
        if (!users.length)
            throw new Error("No users found");
        const pagination = (0, paginationCalculation_1.paginationCalculation)({ counts, take, skip });
        return { data: users, pagination };
    }
    async getById(id) {
        const user = await this.userRepo.findOne({
            where: { id },
        });
        if (!user)
            throw new Error("User not found");
        return user;
    }
    async updateUser(id, input) {
        const user = await this.userRepo.findOne({
            where: { id },
        });
        if (!user)
            throw new Error("User not found");
        const { image, banner, ...rest } = input;
        const data = { ...rest };
        if (image) {
            await cloudinary_1.v2.api.delete_all_resources([user.image.public_id]);
            const file = await image;
            const uploader = new uploaderContext_1.UploaderContext(new cloudinaryUploader_1.CloudinaryUploader());
            const { secure_url: url, public_id, ...rest } = (await uploader.performStrategy(file));
            data.image = { url, public_id };
        }
        if (banner) {
            await cloudinary_1.v2.api.delete_all_resources([user.banner.public_id]);
            const file = await banner;
            const uploader = new uploaderContext_1.UploaderContext(new cloudinaryUploader_1.CloudinaryUploader());
            const { secure_url: url, public_id } = (await uploader.performStrategy(file));
            data.banner = { url, public_id };
        }
        Object.assign(user, data);
        return await this.userRepo.save(user);
    }
    async deleteUser(id) {
        const user = await this.userRepo.findOne({
            where: { id },
        });
        if (!user)
            throw new Error("User not found");
        await this.userRepo.remove(user);
        return true;
    }
    /**
     * Update only the FCM token for a user.  Used by clients after
     * obtaining the registration token from the browser.
     */
    async activeUser(id, status) {
        const user = await this.userRepo.findOne({
            where: { id },
        });
        if (!user)
            throw new Error("User not found");
        user.isActive = status;
        await this.userRepo.save(user);
        return `This user is ${status ? "active" : "unactive"}`;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, typedi_1.Service)()
], UserService);
