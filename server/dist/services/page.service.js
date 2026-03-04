"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageService = void 0;
const typedi_1 = require("typedi");
const getRepo_1 = require("../utils/getRepo");
const page_entity_1 = require("../entities/page.entity");
const uploaderContext_1 = require("../utils/uploaderContext");
const cloudinaryUploader_1 = require("../utils/cloudinaryUploader");
const cloudinary_1 = require("cloudinary");
const user_service_1 = require("./user.service");
const paginationCalculation_1 = require("../utils/paginationCalculation");
let PageService = class PageService {
    constructor(userService) {
        this.userService = userService;
        this.pageRepo = (0, getRepo_1.getRepo)(page_entity_1.Page);
    }
    async createPage(userId, input) {
        const { description, image, banner } = input;
        const imageObject = { url: "", public_id: "" };
        const bannerObject = { url: "", public_id: "" };
        if (image || banner) {
            const uploader = new uploaderContext_1.UploaderContext(new cloudinaryUploader_1.CloudinaryUploader());
            if (image) {
                const { public_id, secure_url: url } = (await uploader.performStrategy(await image));
                imageObject.url = url;
                imageObject.public_id = public_id;
            }
            if (banner) {
                const { public_id, secure_url: url } = (await uploader.performStrategy(await banner));
                bannerObject.url = url;
                bannerObject.public_id = public_id;
            }
        }
        const newPage = this.pageRepo.create({
            userId,
            description,
            image: imageObject,
            banner: bannerObject,
        });
        return await this.pageRepo.save(newPage);
    }
    async getAllPages(take, skip) {
        const [pages, counts] = await this.pageRepo.findAndCount({
            relations: ["user"],
            order: { createdAt: "DESC" },
            take,
            skip,
        });
        if (!pages.length)
            throw new Error("No pages found");
        const pagination = (0, paginationCalculation_1.paginationCalculation)({ counts, take, skip });
        return { data: pages, pagination };
    }
    async getUserPages(userId, take, skip) {
        await this.userService.getById(userId);
        const [pages, counts] = await this.pageRepo.findAndCount({
            where: { userId },
            order: { createdAt: "DESC" },
            take,
            skip,
        });
        if (!pages.length)
            throw new Error("No pages found for this user");
        const pagination = (0, paginationCalculation_1.paginationCalculation)({ counts, take, skip });
        return { data: pages, pagination };
    }
    async getById(id) {
        const page = await this.pageRepo.findOne({
            where: { id },
            relations: ["user"],
        });
        if (!page)
            throw new Error("Page not found");
        return page;
    }
    async updatePage(id, input) {
        const page = await this.getById(id);
        const { image, banner, ...rest } = input;
        const data = { ...rest };
        if (image) {
            if (page.image?.public_id)
                await cloudinary_1.v2.uploader.destroy(page.image.public_id);
            const file = await image;
            const uploader = new uploaderContext_1.UploaderContext(new cloudinaryUploader_1.CloudinaryUploader());
            const { secure_url: url, public_id } = (await uploader.performStrategy(file));
            data.image = { url, public_id };
        }
        if (banner) {
            if (page.banner?.public_id)
                await cloudinary_1.v2.uploader.destroy(page.banner.public_id);
            const file = await banner;
            const uploader = new uploaderContext_1.UploaderContext(new cloudinaryUploader_1.CloudinaryUploader());
            const { secure_url: url, public_id } = (await uploader.performStrategy(file));
            data.banner = { url, public_id };
        }
        Object.assign(page, data);
        return await this.pageRepo.save(page);
    }
    async deletePage(id) {
        const page = await this.getById(id);
        if (page.image?.public_id)
            await cloudinary_1.v2.uploader.destroy(page.image.public_id);
        if (page.banner?.public_id)
            await cloudinary_1.v2.uploader.destroy(page.banner.public_id);
        await this.pageRepo.remove(page);
        return true;
    }
};
exports.PageService = PageService;
exports.PageService = PageService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], PageService);
