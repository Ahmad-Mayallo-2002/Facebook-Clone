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
exports.ReactService = void 0;
const typedi_1 = require("typedi");
const getRepo_1 = require("../utils/getRepo");
const react_entity_1 = require("../entities/react.entity");
const reactType_enum_1 = require("../enums/reactType.enum");
const post_service_1 = require("./post.service");
const comment_service_1 = require("./comment.service");
const user_service_1 = require("./user.service");
const paginationCalculation_1 = require("../utils/paginationCalculation");
const notification_type_enum_1 = require("../enums/notification-type.enum");
const notification_service_1 = require("./notification.service");
let ReactService = class ReactService {
    constructor(postService, commentService, userService, notificationService) {
        this.postService = postService;
        this.commentService = commentService;
        this.userService = userService;
        this.notificationService = notificationService;
        this.reactRepo = (0, getRepo_1.getRepo)(react_entity_1.React);
    }
    async getAllReacts(take, skip) {
        const [reacts, counts] = await this.reactRepo.findAndCount({
            order: { createdAt: "DESC" },
            take,
            skip,
        });
        if (!reacts.length)
            throw new Error("No reacts found");
        const pagination = (0, paginationCalculation_1.paginationCalculation)({ counts, take, skip });
        return { data: reacts, pagination };
    }
    async getUserReacts(userId, take, skip) {
        await this.userService.getById(userId);
        const [reacts, counts] = await this.reactRepo.findAndCount({
            where: { userId },
            order: { createdAt: "DESC" },
            take,
            skip,
        });
        if (!reacts.length)
            throw new Error("No reacts found for this user");
        const pagination = (0, paginationCalculation_1.paginationCalculation)({ counts, take, skip });
        return { data: reacts, pagination };
    }
    async getPostReacts(postId, take, skip) {
        await this.postService.getById(postId);
        const [reacts, counts] = await this.reactRepo.findAndCount({
            where: { postId, type: reactType_enum_1.ReactType.POST },
            order: { createdAt: "DESC" },
            take,
            skip,
        });
        if (!reacts.length)
            throw new Error("No reacts found for this post");
        const pagination = (0, paginationCalculation_1.paginationCalculation)({ counts, take, skip });
        return { data: reacts, pagination };
    }
    async getCommentReacts(commentId, take, skip) {
        await this.commentService.getById(commentId);
        const [reacts, counts] = await this.reactRepo.findAndCount({
            where: { commentId, type: reactType_enum_1.ReactType.COMMENT },
            order: { createdAt: "DESC" },
            take,
            skip,
        });
        if (!reacts.length)
            throw new Error("No reacts found for this comment");
        const pagination = (0, paginationCalculation_1.paginationCalculation)({ counts, take, skip });
        return { data: reacts, pagination };
    }
    async getById(id) {
        const react = await this.reactRepo.findOne({
            where: { id },
        });
        if (!react)
            throw new Error("React not found");
        return react;
    }
    async getUserReactOnPost(userId, postId) {
        const react = await this.reactRepo.findOne({ where: { postId, userId } });
        if (!react)
            throw new Error("No user react on this post");
        return react;
    }
    async getUserReactOnComment(userId, commentId) {
        const react = await this.reactRepo.findOne({
            where: { commentId, userId },
        });
        if (!react)
            throw new Error("No user react on this post");
        return react;
    }
    async addRreact(userId, value, type, postId) {
        const currentReact = await this.reactRepo.findOne({ where: { postId, userId } });
        if (currentReact)
            throw new Error('You already reacted to this post');
        const newReact = this.reactRepo.create({
            type,
            value,
            postId,
            userId,
            post: { id: postId },
            user: { id: userId },
        });
        const react = await this.reactRepo.save(newReact);
        const post = await this.postService.getById(postId);
        if (post.userId !== userId)
            this.notificationService.dispatch(notification_type_enum_1.NotificationType.REACT, {
                userId,
                reactId: react.id,
                receiverId: post.userId,
            });
        return "New react added";
    }
    async updateReact(id, value) {
        const react = await this.getById(id);
        react.value = value;
        return await this.reactRepo.save(react);
    }
    async deleteReact(id) {
        const react = await this.getById(id);
        await this.reactRepo.remove(react);
        return true;
    }
};
exports.ReactService = ReactService;
exports.ReactService = ReactService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [post_service_1.PostService,
        comment_service_1.CommentService,
        user_service_1.UserService,
        notification_service_1.NotificationService])
], ReactService);
