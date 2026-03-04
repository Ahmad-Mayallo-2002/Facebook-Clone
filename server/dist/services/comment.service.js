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
exports.CommentService = void 0;
const typedi_1 = require("typedi");
const getRepo_1 = require("../utils/getRepo");
const comment_entity_1 = require("../entities/comment.entity");
const post_service_1 = require("./post.service");
const uploaderContext_1 = require("../utils/uploaderContext");
const cloudinaryUploader_1 = require("../utils/cloudinaryUploader");
const paginationCalculation_1 = require("../utils/paginationCalculation");
const notification_service_1 = require("./notification.service");
const user_service_1 = require("./user.service");
const notification_type_enum_1 = require("../enums/notification-type.enum");
const removeResource_queue_1 = require("../bullmq/queues/removeResource.queue");
let CommentService = class CommentService {
    constructor(postService, notificationService, userService) {
        this.postService = postService;
        this.notificationService = notificationService;
        this.userService = userService;
        this.commentRepo = (0, getRepo_1.getRepo)(comment_entity_1.Comment);
    }
    async getAllComments(take, skip) {
        const [data, counts] = await this.commentRepo.findAndCount({
            order: { createdAt: "DESC" },
            take,
            skip,
        });
        if (!data.length)
            throw new Error("No comments found");
        const pagination = (0, paginationCalculation_1.paginationCalculation)({ counts, skip, take });
        return { data, pagination };
    }
    async getById(id) {
        const comment = await this.commentRepo.findOne({
            where: { id },
        });
        if (!comment)
            throw new Error("Comment not found");
        return comment;
    }
    async getPostComments(postId, take, skip) {
        await this.postService.getById(postId);
        const [data, counts] = await this.commentRepo.findAndCount({
            where: { postId, isVisible: true },
            order: { createdAt: "desc" },
            take,
            skip,
        });
        if (!data.length)
            throw new Error("No comments found for this post");
        const pagination = (0, paginationCalculation_1.paginationCalculation)({ counts, take, skip });
        return { data, pagination };
    }
    async getUserComments(userId, take, skip) {
        const [data, counts] = await this.commentRepo.findAndCount({
            where: { userId, isVisible: true },
            order: { createdAt: "DESC" },
            take,
            skip,
        });
        if (!data.length)
            throw new Error("No comments found for this user");
        const pagination = (0, paginationCalculation_1.paginationCalculation)({ counts, take, skip });
        return { data, pagination };
    }
    async createComment(userId, postId, input) {
        const post = await this.postService.getById(postId);
        if (!input.content && (!input.media || !input.media?.length))
            throw new Error("Comment must contain text content or media");
        const files = input.media;
        const media = [];
        if (files?.length) {
            const uploader = new uploaderContext_1.UploaderContext(new cloudinaryUploader_1.CloudinaryUploader());
            for (const file of files) {
                const { public_id, secure_url: url } = (await uploader.performStrategy(await file));
                media.push({ public_id, url });
            }
        }
        const comment = this.commentRepo.create({
            userId,
            user: { id: userId },
            postId,
            post: { id: postId },
            content: input.content.trim(),
            media,
        });
        const savedComment = await this.commentRepo.save(comment);
        if (post.userId !== userId) {
            // push a job that will look up the receiver's current token
            this.notificationService.dispatch(notification_type_enum_1.NotificationType.COMMENT, {
                userId,
                postId,
                receiverId: post.userId,
            });
        }
        return savedComment;
    }
    async updateComment(id, input) {
        const comment = await this.getById(id);
        const files = input.media;
        const media = [];
        if (files?.length) {
            const public_ids = comment.media.map((m) => m.public_id);
            removeResource_queue_1.removeResourceQueue.add("remove-comment-media", { public_ids });
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
        Object.assign(comment, data);
        return await this.commentRepo.save(comment);
    }
    async hideComment(id, status) {
        const comment = await this.getById(id);
        comment.isVisible = status;
        await this.commentRepo.save(comment);
        return `Comment now is ${status ? "visible" : "hidden"}`;
    }
    async deleteComment(id) {
        const comment = await this.getById(id);
        if (comment.media.length) {
            const public_ids = comment.media.map((m) => m.public_id);
            removeResource_queue_1.removeResourceQueue.add("remove-comment-media", { public_ids });
        }
        await this.commentRepo.remove(comment);
        return true;
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [post_service_1.PostService,
        notification_service_1.NotificationService,
        user_service_1.UserService])
], CommentService);
