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
exports.ReactResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const react_entity_1 = require("../entities/react.entity");
const react_service_1 = require("../services/react.service");
const emotions_enum_1 = require("../enums/emotions.enum");
const checkToken_middleware_1 = require("../middlewares/checkToken.middleware");
const roles_enum_1 = require("../enums/roles.enum");
const user_entity_1 = require("../entities/user.entity");
const reactPaginated_1 = require("../graphql/objectTypes/reactPaginated");
const reactType_enum_1 = require("../enums/reactType.enum");
let ReactResolver = class ReactResolver {
    constructor(reactService) {
        this.reactService = reactService;
    }
    async getAllReacts(take, skip) {
        return await this.reactService.getAllReacts(take, skip);
    }
    async getReact(id) {
        return await this.reactService.getById(id);
    }
    async getUserReacts(userId, take, skip) {
        return await this.reactService.getUserReacts(userId, take, skip);
    }
    async getPostReacts(postId, take, skip) {
        return await this.reactService.getPostReacts(postId, take, skip);
    }
    async getCommentReacts(commentId, take, skip) {
        return await this.reactService.getCommentReacts(commentId, take, skip);
    }
    async getUserReactOnPost({ session }, postId) {
        return await this.reactService.getUserReactOnPost(session.user.id, postId);
    }
    async getUserReactOnComment({ session }, commentId) {
        return await this.reactService.getUserReactOnComment(session.user.id, commentId);
    }
    async addReact({ session }, value, type, postId) {
        return await this.reactService.addRreact(session.user.id, value, type, postId);
    }
    async updateReact(id, value) {
        return await this.reactService.updateReact(id, value);
    }
    async deleteReact(id) {
        return await this.reactService.deleteReact(id);
    }
    // Field Resolver for Data Loader
    async user(react, { idByUserLoader }) {
        return await idByUserLoader.load(react.userId);
    }
};
exports.ReactResolver = ReactResolver;
__decorate([
    (0, type_graphql_1.Authorized)(roles_enum_1.Roles.ADMIN),
    (0, type_graphql_1.Query)(() => reactPaginated_1.ReactPaginated),
    __param(0, (0, type_graphql_1.Arg)("take", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ReactResolver.prototype, "getAllReacts", null);
__decorate([
    (0, type_graphql_1.Authorized)(roles_enum_1.Roles.ADMIN),
    (0, type_graphql_1.Query)(() => react_entity_1.React),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReactResolver.prototype, "getReact", null);
__decorate([
    (0, type_graphql_1.Query)(() => reactPaginated_1.ReactPaginated),
    __param(0, (0, type_graphql_1.Arg)("userId")),
    __param(1, (0, type_graphql_1.Arg)("take", () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], ReactResolver.prototype, "getUserReacts", null);
__decorate([
    (0, type_graphql_1.Query)(() => reactPaginated_1.ReactPaginated),
    __param(0, (0, type_graphql_1.Arg)("postId")),
    __param(1, (0, type_graphql_1.Arg)("take", () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], ReactResolver.prototype, "getPostReacts", null);
__decorate([
    (0, type_graphql_1.Query)(() => reactPaginated_1.ReactPaginated),
    __param(0, (0, type_graphql_1.Arg)("commentId")),
    __param(1, (0, type_graphql_1.Arg)("take", () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], ReactResolver.prototype, "getCommentReacts", null);
__decorate([
    (0, type_graphql_1.Query)(() => react_entity_1.React),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("postId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReactResolver.prototype, "getUserReactOnPost", null);
__decorate([
    (0, type_graphql_1.Query)(() => react_entity_1.React),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("commentId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReactResolver.prototype, "getUserReactOnComment", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("value", () => emotions_enum_1.Emotions)),
    __param(2, (0, type_graphql_1.Arg)("type", () => reactType_enum_1.ReactType)),
    __param(3, (0, type_graphql_1.Arg)("postId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], ReactResolver.prototype, "addReact", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => react_entity_1.React),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("value", () => emotions_enum_1.Emotions)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReactResolver.prototype, "updateReact", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReactResolver.prototype, "deleteReact", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => user_entity_1.User),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [react_entity_1.React, Object]),
    __metadata("design:returntype", Promise)
], ReactResolver.prototype, "user", null);
exports.ReactResolver = ReactResolver = __decorate([
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(() => react_entity_1.React),
    (0, type_graphql_1.UseMiddleware)(checkToken_middleware_1.CheckToken),
    __metadata("design:paramtypes", [react_service_1.ReactService])
], ReactResolver);
