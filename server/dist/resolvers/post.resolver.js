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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const post_entity_1 = require("../entities/post.entity");
const page_entity_1 = require("../entities/page.entity");
const post_service_1 = require("../services/post.service");
const page_service_1 = require("../services/page.service");
const post_input_1 = require("../graphql/inputs/post.input");
const checkToken_middleware_1 = require("../middlewares/checkToken.middleware");
const roles_enum_1 = require("../enums/roles.enum");
const user_entity_1 = require("../entities/user.entity");
const postPaginated_1 = require("../graphql/objectTypes/postPaginated");
let PostResolver = class PostResolver {
    constructor(postService, pageService) {
        this.postService = postService;
        this.pageService = pageService;
    }
    async getPosts(take, skip) {
        return await this.postService.getPosts(take, skip);
    }
    async getPagePosts(pageId, take, skip) {
        return await this.postService.getPagePosts(pageId, take, skip);
    }
    async getPost(id) {
        return await this.postService.getById(id);
    }
    async getUserPosts(userId, take, skip) {
        return await this.postService.getUserPosts(userId, take, skip);
    }
    async createPost(userId, input) {
        return await this.postService.createPost(userId, input);
    }
    async updatePost(id, input, { session }) {
        // only original author or page owner can update
        const post = await this.postService.getById(id);
        const userId = session.user.id;
        if (post.userId !== userId) {
            if (post.pageId) {
                const page = await this.pageService.getById(post.pageId);
                if (page.userId !== userId)
                    throw new Error("Not authorized");
            }
            else {
                throw new Error("Not authorized");
            }
        }
        return await this.postService.updatePost(id, input);
    }
    async hidePost(id, visibleStatus) {
        return await this.postService.hidePost(id, visibleStatus);
    }
    async deletePost(id, { session }) {
        const post = await this.postService.getById(id);
        const userId = session.user.id;
        if (post.userId !== userId) {
            if (post.pageId) {
                const page = await this.pageService.getById(post.pageId);
                if (page.userId !== userId)
                    throw new Error("Not authorized");
            }
            else {
                throw new Error("Not authorized");
            }
        }
        return await this.postService.deletePost(id);
    }
    // Field Resolver for Data Loader
    async user(post, { idByUserLoader }) {
        if (!post.userId)
            return null;
        return await idByUserLoader.load(post.userId);
    }
    async page(post) {
        if (!post.pageId)
            return null;
        return await this.pageService.getById(post.pageId);
    }
};
exports.PostResolver = PostResolver;
__decorate([
    (0, type_graphql_1.Query)(() => postPaginated_1.PostPaginated),
    __param(0, (0, type_graphql_1.Arg)("take", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getPosts", null);
__decorate([
    (0, type_graphql_1.Query)(() => postPaginated_1.PostPaginated),
    __param(0, (0, type_graphql_1.Arg)("pageId")),
    __param(1, (0, type_graphql_1.Arg)("take", () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getPagePosts", null);
__decorate([
    (0, type_graphql_1.Query)(() => post_entity_1.Post),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getPost", null);
__decorate([
    (0, type_graphql_1.Query)(() => postPaginated_1.PostPaginated),
    __param(0, (0, type_graphql_1.Arg)("userId")),
    __param(1, (0, type_graphql_1.Arg)("take", () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getUserPosts", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => post_entity_1.Post),
    __param(0, (0, type_graphql_1.Arg)("userId")),
    __param(1, (0, type_graphql_1.Arg)("input", () => post_input_1.CreatePostInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, post_input_1.CreatePostInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => post_entity_1.Post),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("input", () => post_input_1.CreatePostInput)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updatePost", null);
__decorate([
    (0, type_graphql_1.Authorized)(roles_enum_1.Roles.ADMIN),
    (0, type_graphql_1.Mutation)(() => post_entity_1.Post),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("visibleStatus")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "hidePost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => user_entity_1.User),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_entity_1.Post, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "user", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => page_entity_1.Page, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_entity_1.Post]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "page", null);
exports.PostResolver = PostResolver = __decorate([
    (0, type_graphql_1.UseMiddleware)(checkToken_middleware_1.CheckToken),
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(() => post_entity_1.Post),
    __metadata("design:paramtypes", [post_service_1.PostService,
        page_service_1.PageService])
], PostResolver);
