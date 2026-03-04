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
exports.CommentResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const comment_entity_1 = require("../entities/comment.entity");
const comment_service_1 = require("../services/comment.service");
const comment_input_1 = require("../graphql/inputs/comment.input");
const checkToken_middleware_1 = require("../middlewares/checkToken.middleware");
const roles_enum_1 = require("../enums/roles.enum");
const user_entity_1 = require("../entities/user.entity");
const react_entity_1 = require("../entities/react.entity");
const commentPaginated_1 = require("../graphql/objectTypes/commentPaginated");
let CommentResolver = class CommentResolver {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async getAllComments(take, skip) {
        return await this.commentService.getAllComments(take, skip);
    }
    async getComment(id) {
        return await this.commentService.getById(id);
    }
    async getPostComments(postId, take, skip) {
        return await this.commentService.getPostComments(postId, take, skip);
    }
    async getUserComments(userId, take, skip) {
        return await this.commentService.getUserComments(userId, take, skip);
    }
    async createComment(postId, input, { session }) {
        const comment = await this.commentService.createComment(session.user.id, postId, input);
        return comment;
    }
    async updateComment(id, input) {
        return await this.commentService.updateComment(id, input);
    }
    async hideComment(id, status) {
        return await this.commentService.hideComment(id, status);
    }
    async deleteComment(id) {
        return await this.commentService.deleteComment(id);
    }
    // Field Resolver for Data Loader
    async user(comment, { idByUserLoader }) {
        return await idByUserLoader.load(comment.userId);
    }
    async reacts(comment, { reactsByCommentLoader }) {
        return await reactsByCommentLoader.load(comment.id);
    }
};
exports.CommentResolver = CommentResolver;
__decorate([
    (0, type_graphql_1.Authorized)(roles_enum_1.Roles.ADMIN),
    (0, type_graphql_1.Query)(() => commentPaginated_1.CommentPaginated),
    __param(0, (0, type_graphql_1.Arg)("take")),
    __param(1, (0, type_graphql_1.Arg)("skip")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "getAllComments", null);
__decorate([
    (0, type_graphql_1.Query)(() => comment_entity_1.Comment),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "getComment", null);
__decorate([
    (0, type_graphql_1.Query)(() => commentPaginated_1.CommentPaginated),
    __param(0, (0, type_graphql_1.Arg)("postId")),
    __param(1, (0, type_graphql_1.Arg)("take", () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "getPostComments", null);
__decorate([
    (0, type_graphql_1.Query)(() => commentPaginated_1.CommentPaginated),
    __param(0, (0, type_graphql_1.Arg)("userId")),
    __param(1, (0, type_graphql_1.Arg)("take", () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "getUserComments", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => comment_entity_1.Comment),
    __param(0, (0, type_graphql_1.Arg)("postId")),
    __param(1, (0, type_graphql_1.Arg)("input", () => comment_input_1.CommentInput)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, comment_input_1.CommentInput, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "createComment", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => comment_entity_1.Comment),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("input", () => comment_input_1.CommentInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, comment_input_1.CommentInput]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "updateComment", null);
__decorate([
    (0, type_graphql_1.Authorized)(roles_enum_1.Roles.ADMIN),
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "hideComment", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "deleteComment", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => user_entity_1.User),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_entity_1.Comment, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "user", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => [react_entity_1.React]),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_entity_1.Comment, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "reacts", null);
exports.CommentResolver = CommentResolver = __decorate([
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(() => comment_entity_1.Comment),
    (0, type_graphql_1.UseMiddleware)(checkToken_middleware_1.CheckToken),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentResolver);
