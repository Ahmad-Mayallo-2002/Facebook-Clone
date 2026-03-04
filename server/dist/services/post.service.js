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
exports.PostService = void 0;
const typedi_1 = require("typedi");
const post_entity_1 = require("../entities/post.entity");
const uploaderContext_1 = require("../utils/uploaderContext");
const cloudinaryUploader_1 = require("../utils/cloudinaryUploader");
const getRepo_1 = require("../utils/getRepo");
const paginationCalculation_1 = require("../utils/paginationCalculation");
const removeResource_queue_1 = require("../bullmq/queues/removeResource.queue");
const page_service_1 = require("./page.service");
let PostService = class PostService {
    constructor(pageService) {
        this.pageService = pageService;
        this.postRepo = (0, getRepo_1.getRepo)(post_entity_1.Post);
    }
    async createPost(userId, input) {
        const files = input.media;
        if (!input.content && (!files || !files.length))
            throw new Error("Post must contain text content or media");
        const media = [];
        if (files) {
            const uploader = new uploaderContext_1.UploaderContext(new cloudinaryUploader_1.CloudinaryUploader());
            for (const file of files) {
                const { public_id, secure_url: url } = (await uploader.performStrategy(await file));
                media.push({ public_id, url });
            }
        }
        // if posting on a page, validate the page exists
        const pageId = input.pageId;
        if (pageId) {
            await this.pageService.getById(pageId);
        }
        const postData = {
            userId,
            user: { id: userId },
            content: input.content?.trim(),
            media,
        };
        if (pageId) {
            postData.pageId = pageId;
            postData.page = { id: pageId };
        }
        const post = this.postRepo.create(postData);
        return await this.postRepo.save(post);
    }
    async getPosts(take, skip) {
        const [posts, counts] = await this.postRepo.findAndCount({
            where: { isVisible: true },
            relations: { user: true, page: true },
            order: { createdAt: "DESC" },
            take,
            skip,
        });
        if (!posts.length)
            throw new Error("No posts found");
        const pagination = (0, paginationCalculation_1.paginationCalculation)({ counts, take, skip });
        return { data: posts, pagination };
    }
    async getById(id) {
        const post = await this.postRepo.findOne({
            where: { id },
            relations: {
                reacts: true,
                page: true,
                user: true,
            },
        });
        if (!post)
            throw new Error("Post not found");
        return post;
    }
    async getUserPosts(userId, take, skip) {
        const [posts, counts] = await this.postRepo.findAndCount({
            where: { userId, isVisible: true },
            relations: { user: true, page: true },
            order: { createdAt: "DESC" },
            take,
            skip,
        });
        if (!posts.length)
            throw new Error("No posts found for this user");
        const pagination = (0, paginationCalculation_1.paginationCalculation)({ counts, take, skip });
        return { data: posts, pagination };
    }
    async updatePost(id, input) {
        const post = await this.getById(id);
        const files = input.media;
        const media = [];
        if (files && files.length) {
            const public_ids = post.media.map((m) => m.public_id);
            removeResource_queue_1.removeResourceQueue.add("remove-post-media", { public_ids });
            const uploader = new uploaderContext_1.UploaderContext(new cloudinaryUploader_1.CloudinaryUploader());
            for (const file of files) {
                const { public_id, secure_url: url } = (await uploader.performStrategy(await file));
                media.push({ public_id, url });
            }
        }
        const data = {};
        if (input.content)
            data.content = input.content;
        if (media.length)
            data.media = media;
        if (input.pageId)
            data.pageId = input.pageId;
        Object.assign(post, data);
        return await this.postRepo.save(post);
    }
    async hidePost(id, visibleStatus) {
        const post = await this.getById(id);
        post.isVisible = visibleStatus;
        return await this.postRepo.save(post);
    }
    async deletePost(id) {
        const post = await this.getById(id);
        if (post.media.length) {
            const public_ids = post.media.map((m) => m.public_id);
            removeResource_queue_1.removeResourceQueue.add("remove-post-media", { public_ids });
        }
        await this.postRepo.remove(post);
        return true;
    }
    async getPagePosts(pageId, take, skip) {
        // validate page
        await this.pageService.getById(pageId);
        const [posts, counts] = await this.postRepo.findAndCount({
            where: { pageId, isVisible: true },
            relations: { user: true, page: true },
            order: { createdAt: "DESC" },
            take,
            skip,
        });
        if (!posts.length)
            throw new Error("No posts found for this page");
        const pagination = (0, paginationCalculation_1.paginationCalculation)({ counts, take, skip });
        return { data: posts, pagination };
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [page_service_1.PageService])
], PostService);
